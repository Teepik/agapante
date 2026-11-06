import "server-only";

/**
 * Ventes immobilières détaillées (DVF géolocalisées, Etalab) d'une commune.
 * Fichiers publics par commune et par année : https://files.data.gouv.fr/geo-dvf/latest/csv/
 * Une vente = une mutation ; seules les ventes d'un seul logement (maison ou appartement) sont gardées,
 * car le prix d'une vente groupée ne se rattache à aucun logement en particulier.
 */

const BASE = process.env.DVF_BASE || "https://files.data.gouv.fr/geo-dvf/latest/csv";

/** [date, prix, surface, type M|A, pièces, terrain, lat, lon, adresse, nature V|F|J] */
export type Vente = [string, number, number, "M" | "A", number | null, number | null, number | null, number | null, string, "V" | "F" | "J"];

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cur = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; }
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n") { row.push(cur.replace(/\r$/, "")); rows.push(row); row = []; cur = ""; }
    else cur += c;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

const dep = (code: string) => (code.startsWith("97") ? code.slice(0, 3) : code.slice(0, 2));
const n = (s: string | undefined) => { const v = parseFloat(String(s ?? "").replace(",", ".")); return Number.isFinite(v) ? v : null; };

async function year(code: string, y: number): Promise<string | null> {
  const r = await fetch(`${BASE}/${y}/communes/${dep(code)}/${code}.csv`, { cache: "no-store", signal: AbortSignal.timeout(20000) });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`DVF ${y} : ${r.status}`);
  return r.text();
}

export async function ventesCommune(code: string): Promise<{ ventes: Vente[]; annees: number[] }> {
  const now = new Date().getFullYear();
  const years = [now - 5, now - 4, now - 3, now - 2, now - 1, now];
  const texts = await Promise.all(years.map(y => year(code, y).catch(() => null)));
  const muts = new Map<string, { date: string; prix: number; nature: string; logements: { t: "M" | "A"; s: number; p: number | null }[]; parcelles: Map<string, number>; lat: number | null; lon: number | null; adr: string }>();
  const annees: number[] = [];
  texts.forEach((t, i) => {
    if (!t) return;
    annees.push(years[i]);
    const rows = parseCsv(t);
    const h = rows.shift() ?? [];
    const c = (name: string) => h.indexOf(name);
    const I = {
      id: c("id_mutation"), date: c("date_mutation"), nat: c("nature_mutation"), val: c("valeur_fonciere"),
      num: c("adresse_numero"), suf: c("adresse_suffixe"), voie: c("adresse_nom_voie"), parc: c("id_parcelle"),
      type: c("type_local"), surf: c("surface_reelle_bati"), pieces: c("nombre_pieces_principales"),
      terrain: c("surface_terrain"), lon: c("longitude"), lat: c("latitude"),
    };
    if (I.id < 0 || I.val < 0) return;
    for (const r of rows) {
      const id = r[I.id]; if (!id) continue;
      let m = muts.get(id);
      if (!m) {
        const prix = n(r[I.val]);
        if (!prix) continue;
        m = { date: r[I.date], prix, nature: r[I.nat] ?? "", logements: [], parcelles: new Map(), lat: n(r[I.lat]), lon: n(r[I.lon]), adr: [r[I.num], r[I.suf], r[I.voie]].filter(Boolean).join(" ").trim() };
        muts.set(id, m);
      }
      const type = r[I.type];
      if (type === "Maison" || type === "Appartement") {
        const s = n(r[I.surf]);
        if (s) { m.logements.push({ t: type === "Maison" ? "M" : "A", s, p: n(r[I.pieces]) }); if (m.lat == null) { m.lat = n(r[I.lat]); m.lon = n(r[I.lon]); } }
      }
      const pid = r[I.parc], ts = n(r[I.terrain]);
      if (pid && ts) m.parcelles.set(pid, Math.max(m.parcelles.get(pid) ?? 0, ts));
    }
  });
  const ventes: Vente[] = [];
  for (const m of muts.values()) {
    if (m.logements.length !== 1) continue;
    const nat = /futur/i.test(m.nature) ? "F" : /adjudication/i.test(m.nature) ? "J" : /^vente$/i.test(m.nature) ? "V" : null;
    if (!nat) continue;
    const l = m.logements[0];
    const pm2 = m.prix / l.s;
    if (pm2 < 100 || pm2 > 40000) continue;
    const terrain = [...m.parcelles.values()].reduce((a, b) => a + b, 0) || null;
    const r5 = (v: number | null) => (v == null ? null : Math.round(v * 1e5) / 1e5);
    ventes.push([m.date, Math.round(m.prix), l.s, l.t, l.p, terrain, r5(m.lat), r5(m.lon), m.adr.slice(0, 80), nat]);
  }
  ventes.sort((a, b) => (a[0] < b[0] ? 1 : -1));
  return { ventes, annees };
}
