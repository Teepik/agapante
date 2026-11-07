import "server-only";
import { getSql } from "@/lib/db";

/** Série hebdomadaire : lundis (AAAA-MM-JJ), cours ajustés des dividendes et divisions, volumes. */
export type Serie = { t: string[]; c: number[]; v?: number[] };
export type TypeTitre = "action" | "etf" | "proxy" | "fx";
export type EntreeUnivers = { s?: string; isin?: string; n?: string | null; x?: string; r?: string; p?: string };
export type Ligne = {
  cle: string;
  sym: string | null;
  type: TypeTitre;
  univ: EntreeUnivers | null;
  fiche: Record<string, unknown> | null;
  serie: Serie | null;
  maj?: string | null;
  maj_fiche?: string | null;
};

let pret: Promise<void> | null = null;
export function schemaBourse(): Promise<void> {
  if (!pret) {
    pret = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS bourse_titres (
          cle     TEXT PRIMARY KEY,
          sym     TEXT,
          type    TEXT NOT NULL,
          univ    JSONB,
          fiche   JSONB,
          serie   JSONB,
          maj     TIMESTAMPTZ,
          essai   TIMESTAMPTZ,
          echecs  INT NOT NULL DEFAULT 0,
          erreur  TEXT
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS bourse_titres_maj_idx ON bourse_titres (maj NULLS FIRST)`;
      await sql`ALTER TABLE bourse_titres ADD COLUMN IF NOT EXISTS maj_fiche TIMESTAMPTZ`;
      await sql`UPDATE bourse_titres SET maj_fiche = maj WHERE maj_fiche IS NULL AND fiche IS NOT NULL`;
      await sql`
        CREATE TABLE IF NOT EXISTS bourse_rets (
          id  TEXT PRIMARY KEY,
          r   TEXT NOT NULL
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS bourse_donnees (
          cle      TEXT PRIMARY KEY,
          contenu  JSONB NOT NULL,
          maj      TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })().catch((e) => {
      pret = null;
      throw e;
    });
  }
  return pret;
}

/** Inscrit l'univers : chaque titre absent de la table y entre, sans toucher aux données déjà collectées. */
export async function inscrireUnivers(entrees: { cle: string; type: TypeTitre; univ: EntreeUnivers | null; sym: string | null }[]) {
  const sql = getSql();
  for (let i = 0; i < entrees.length; i += 400) {
    const lot = entrees.slice(i, i + 400);
    await sql`
      INSERT INTO bourse_titres (cle, type, univ, sym)
      SELECT u.cle, u.type, u.univ::jsonb, NULLIF(u.sym, '')
      FROM unnest(${lot.map((e) => e.cle)}::text[], ${lot.map((e) => e.type)}::text[],
                  ${lot.map((e) => JSON.stringify(e.univ))}::text[], ${lot.map((e) => e.sym ?? "")}::text[]) AS u(cle, type, univ, sym)
      ON CONFLICT (cle) DO UPDATE SET univ = EXCLUDED.univ, type = EXCLUDED.type
    `;
  }
}

/** Titres à relever : devises et indices d'abord, puis les plus anciens. Les petits ETF et les petites sociétés sont relus moins souvent ;
    un titre en échec répété attend deux semaines. */
export async function titresARelever(limite: number, ageHeures: number): Promise<Ligne[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT cle, sym, type, univ, maj, maj_fiche FROM bourse_titres
    WHERE (maj IS NULL OR maj < now() - CASE
        WHEN type = 'etf' AND COALESCE((fiche->>'totalAssets')::float8, 1e15) < 2e7 THEN interval '14 days'
        WHEN type = 'action' AND COALESCE((fiche->>'marketCap')::float8, 1e15) < 3e8 THEN interval '7 days'
        ELSE make_interval(hours => ${ageHeures}) END)
      AND (essai IS NULL OR essai < now() - CASE WHEN echecs >= 3 THEN interval '14 days' ELSE interval '3 hours' END)
    ORDER BY (type IN ('fx', 'proxy')) DESC, maj NULLS FIRST, cle
    LIMIT ${limite}
  `;
  return rows as unknown as Ligne[];
}

export async function marquerEssai(cles: string[]) {
  if (!cles.length) return;
  await getSql()`UPDATE bourse_titres SET essai = now() WHERE cle = ANY(${cles}::text[])`;
}

export async function enregistrerTitre(cle: string, sym: string, fiche: Record<string, unknown> | null, serie: Serie, vol13: number | null = null) {
  const sql = getSql();
  if (fiche) {
    await sql`
      UPDATE bourse_titres SET sym = ${sym}, fiche = ${JSON.stringify(fiche)}::jsonb, serie = ${JSON.stringify(serie)}::jsonb,
        maj = now(), maj_fiche = now(), essai = now(), echecs = 0, erreur = NULL
      WHERE cle = ${cle}
    `;
  } else {
    await sql`
      UPDATE bourse_titres SET sym = ${sym}, serie = ${JSON.stringify(serie)}::jsonb,
        fiche = CASE WHEN ${vol13}::float8 IS NULL THEN fiche ELSE jsonb_set(COALESCE(fiche, '{}'::jsonb), '{vol13}', to_jsonb(${vol13}::float8)) END,
        maj = now(), essai = now(), echecs = 0, erreur = NULL
      WHERE cle = ${cle}
    `;
  }
}

export async function libererEssai(cles: string[]) {
  if (!cles.length) return;
  await getSql()`UPDATE bourse_titres SET essai = NULL WHERE cle = ANY(${cles}::text[])`;
}

export async function enregistrerEchec(cle: string, erreur: string, sym?: string | null) {
  await getSql()`
    UPDATE bourse_titres SET essai = now(), echecs = echecs + 1, erreur = ${erreur.slice(0, 300)}, sym = COALESCE(${sym ?? null}, sym)
    WHERE cle = ${cle}
  `;
}

/** Lecture complète par lots (pour le traitement). */
export async function lireTout(): Promise<Ligne[]> {
  const sql = getSql();
  const out: Ligne[] = [];
  let apres = "";
  for (;;) {
    const rows = (await sql`
      SELECT cle, sym, type, univ, fiche, serie, maj FROM bourse_titres
      WHERE serie IS NOT NULL AND cle > ${apres}
      ORDER BY cle LIMIT 250
    `) as unknown as Ligne[];
    out.push(...rows);
    if (rows.length < 250) break;
    apres = rows[rows.length - 1].cle;
  }
  return out;
}

export async function etatCollecte() {
  const rows = await getSql()`
    SELECT type, count(*)::int AS n, count(maj)::int AS releves,
      count(*) FILTER (WHERE maj > now() - interval '8 days')::int AS recents,
      count(*) FILTER (WHERE echecs >= 3)::int AS echecs, min(maj) AS plus_ancien, max(maj) AS plus_recent
    FROM bourse_titres GROUP BY type ORDER BY type
  `;
  return rows;
}

export async function erreursRecentes(limite = 30) {
  return getSql()`
    SELECT cle, sym, type, echecs, erreur, essai FROM bourse_titres WHERE erreur IS NOT NULL ORDER BY essai DESC NULLS LAST LIMIT ${limite}
  `;
}

export async function lireDonnee<T = unknown>(cle: string): Promise<{ contenu: T; maj: string } | null> {
  const rows = await getSql()`SELECT contenu, maj FROM bourse_donnees WHERE cle = ${cle}`;
  return rows.length ? (rows[0] as { contenu: T; maj: string }) : null;
}

export async function lireDonnees(prefixe: string): Promise<{ cle: string; contenu: unknown; maj: string }[]> {
  return (await getSql()`SELECT cle, contenu, maj FROM bourse_donnees WHERE cle LIKE ${prefixe + "%"} ORDER BY cle`) as unknown as {
    cle: string;
    contenu: unknown;
    maj: string;
  }[];
}

export async function ecrireDonnee(cle: string, contenu: unknown) {
  await getSql()`
    INSERT INTO bourse_donnees (cle, contenu, maj) VALUES (${cle}, ${JSON.stringify(contenu)}::jsonb, now())
    ON CONFLICT (cle) DO UPDATE SET contenu = EXCLUDED.contenu, maj = now()
  `;
}

/** Remet en file les titres jamais relevés (après une correction de la collecte). */
export async function reessayerEchecs(): Promise<number> {
  const r = await getSql()`UPDATE bourse_titres SET essai = NULL, echecs = 0 WHERE maj IS NULL AND essai IS NOT NULL RETURNING cle`;
  return r.length;
}

/** Rendements hebdomadaires par titre (base64 d'entiers 16 bits, unité 1e-4), lus à la demande par l'interface. */
export async function ecrireRets(r: Record<string, string>) {
  const sql = getSql();
  const ids = Object.keys(r);
  for (let i = 0; i < ids.length; i += 500) {
    const lot = ids.slice(i, i + 500);
    await sql`
      INSERT INTO bourse_rets (id, r) SELECT u.id, u.r FROM unnest(${lot}::text[], ${lot.map((k) => r[k])}::text[]) AS u(id, r)
      ON CONFLICT (id) DO UPDATE SET r = EXCLUDED.r
    `;
  }
  if (ids.length) await sql`DELETE FROM bourse_rets WHERE NOT (id = ANY(${ids}::text[]))`;
}
export async function lireRets(ids: string[]): Promise<Record<string, string>> {
  if (!ids.length) return {};
  const rows = (await getSql()`SELECT id, r FROM bourse_rets WHERE id = ANY(${ids}::text[])`) as unknown as { id: string; r: string }[];
  return Object.fromEntries(rows.map((x) => [x.id, x.r]));
}
export async function lireFiche(sym: string): Promise<Record<string, unknown> | null> {
  const rows = (await getSql()`SELECT fiche FROM bourse_titres WHERE sym = ${sym} LIMIT 1`) as unknown as { fiche: Record<string, unknown> | null }[];
  return rows.length ? rows[0].fiche : null;
}
