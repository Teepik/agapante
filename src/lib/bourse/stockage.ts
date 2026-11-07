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
        CREATE TABLE IF NOT EXISTS bourse_histo (
          semaine DATE NOT NULL, id TEXT NOT NULL, type CHAR(1) NOT NULL,
          px REAL, mcap REAL, per REAL, per_f REAL, pb REAL, ev_ebitda REAL, dy REAL, payout REAL, fcf_y REAL, roe REAL, opm REAL, gm REAL, nde REAL,
          rev_g REAL, eps_g REAL, g1 REAL, ltg REAL, rev90 REAL, upside REAL, reco REAL, n_ana SMALLINT, liq REAL, vol REAL, beta REAL,
          mom12 REAL, mom3 REAL, dd1y REAL, mu_r REAL,
          s_v SMALLINT, s_g SMALLINT, s_q SMALLINT, s_m SMALLINT, s_d SMALLINT, s_y SMALLINT, s_s SMALLINT,
          cat TEXT, pg TEXT, conf SMALLINT, aum REAL, ter REAL,
          PRIMARY KEY (semaine, id)
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS bourse_histo_id_idx ON bourse_histo (id, semaine)`;
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
  // L'univers fait foi : un titre retiré de la liste quitte la base (doublons, symboles abandonnés).
  if (entrees.length > 1000) await sql`DELETE FROM bourse_titres WHERE NOT (cle = ANY(${entrees.map((e) => e.cle)}::text[]))`;
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
  // Historique trop court (fonds récent) ou titre absent de Yahoo : inutile de réessayer avant deux semaines.
  const definitif = /historique insuffisant|no data found|symbole introuvable|delisted/i.test(erreur);
  await getSql()`
    UPDATE bourse_titres SET essai = now(), echecs = CASE WHEN ${definitif} THEN GREATEST(echecs + 1, 3) ELSE echecs + 1 END,
      erreur = ${erreur.slice(0, 300)}, sym = COALESCE(${sym ?? null}, sym)
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

/* ---------------- Historique hebdomadaire des notes et chiffres clés ---------------- */
/** Colonnes de bourse_histo et champ correspondant des fiches calculées. */
export const HISTO_COLS: [string, string, "real" | "smallint" | "text"][] = [
  ["px", "px", "real"], ["mcap", "mcap", "real"], ["per", "per", "real"], ["per_f", "perF", "real"], ["pb", "pb", "real"], ["ev_ebitda", "evEbitda", "real"],
  ["dy", "dy", "real"], ["payout", "payout", "real"], ["fcf_y", "fcfY", "real"], ["roe", "roe", "real"], ["opm", "opm", "real"], ["gm", "gm", "real"], ["nde", "nde", "real"],
  ["rev_g", "revG", "real"], ["eps_g", "epsG", "real"], ["g1", "g1", "real"], ["ltg", "ltg", "real"], ["rev90", "rev90", "real"], ["upside", "upside", "real"],
  ["reco", "reco", "real"], ["n_ana", "nAna", "smallint"], ["liq", "liq", "real"], ["vol", "vol", "real"], ["beta", "beta", "real"], ["mom12", "mom12", "real"],
  ["mom3", "mom3", "real"], ["dd1y", "dd1y", "real"], ["mu_r", "muR", "real"],
  ["s_v", "sc.v", "smallint"], ["s_g", "sc.g", "smallint"], ["s_q", "sc.q", "smallint"], ["s_m", "sc.m", "smallint"], ["s_d", "sc.d", "smallint"], ["s_y", "sc.y", "smallint"], ["s_s", "sc.s", "smallint"],
  ["cat", "cat", "text"], ["pg", "pg", "text"], ["conf", "conf", "smallint"], ["aum", "aum", "real"], ["ter", "ter", "real"],
];
type Fiche = Record<string, unknown>;
const valeurHisto = (o: Fiche, champ: string, t: string): unknown => {
  let v: unknown = champ.startsWith("sc.") ? (o.sc as Record<string, unknown> | undefined)?.[champ.slice(3)] : o[champ];
  if (champ === "pg") v = Array.isArray(v) && v.length ? (v as string[][]).map((p) => p[0]).join("|") : null;
  if (t === "text") return typeof v === "string" ? v : null;
  if (typeof v !== "number" || !Number.isFinite(v)) return null;
  return t === "smallint" ? Math.max(-32000, Math.min(32000, Math.round(v))) : v;
};
export async function ecrireHisto(semaine: string, lignes: { type: "a" | "e"; o: Fiche }[]) {
  const sql = getSql();
  const noms = HISTO_COLS.map((c) => c[0]);
  const texte = `
    INSERT INTO bourse_histo (semaine, id, type, ${noms.join(", ")})
    SELECT $1::date, u.* FROM unnest($2::text[], $3::text[], ${HISTO_COLS.map((c, i) => `$${i + 4}::${c[2]}[]`).join(", ")})
      AS u(id, type, ${noms.join(", ")})
    ON CONFLICT (semaine, id) DO UPDATE SET type = EXCLUDED.type, ${noms.map((n) => `${n} = EXCLUDED.${n}`).join(", ")}`;
  for (let i = 0; i < lignes.length; i += 800) {
    const lot = lignes.slice(i, i + 800);
    const params: unknown[] = [semaine, lot.map((l) => String(l.o.id)), lot.map((l) => l.type)];
    for (const [, champ, t] of HISTO_COLS) params.push(lot.map((l) => valeurHisto(l.o, champ, t)));
    await sql.query(texte, params);
  }
}
/** Notes d'une semaine passée (la plus récente au plus tard à la date donnée) : id → notes, catégorie, pièges. */
export async function notesAnterieures(jours: number): Promise<{ semaine: string | null; notes: Map<string, { sc: (number | null)[]; cat: string | null; pg: string | null }> }> {
  const sql = getSql();
  const r = (await sql`SELECT max(semaine)::text AS s FROM bourse_histo WHERE semaine <= current_date - ${jours}::int`) as unknown as { s: string | null }[];
  const semaine = r[0]?.s ?? null;
  const notes = new Map<string, { sc: (number | null)[]; cat: string | null; pg: string | null }>();
  if (!semaine) return { semaine, notes };
  const rows = (await sql`SELECT id, s_v, s_g, s_q, s_m, s_d, s_y, s_s, cat, pg FROM bourse_histo WHERE semaine = ${semaine}::date AND type = 'a'`) as unknown as Record<string, unknown>[];
  for (const x of rows) notes.set(String(x.id), { sc: ["s_v", "s_g", "s_q", "s_m", "s_d", "s_y", "s_s"].map((k) => (x[k] as number | null) ?? null), cat: (x.cat as string) ?? null, pg: (x.pg as string) ?? null });
  return { semaine, notes };
}
export async function lireHisto(id: string) {
  return getSql()`SELECT semaine::text AS semaine, * FROM bourse_histo WHERE id = ${id} ORDER BY semaine`;
}
export async function semainesHisto() {
  return getSql()`SELECT semaine::text AS semaine, count(*)::int AS titres FROM bourse_histo GROUP BY semaine ORDER BY semaine`;
}
export async function lireSemaine(semaine: string) {
  return getSql()`SELECT * FROM bourse_histo WHERE semaine = ${semaine}::date`;
}
