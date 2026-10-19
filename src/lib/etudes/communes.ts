/**
 * Les communes de France, pour chercher « ta ville » : nom, codes postaux, coordonnées.
 *
 * public/etudes-data/communes.json se construit hors ligne à partir de l'annuaire de l'éducation
 * (Licence Ouverte) : chaque commune qui compte au moins une école, un collège ou un lycée, placée au
 * centre de ses établissements. Le fichier se charge à la demande, puis reste sur l'appareil.
 */

export const COMMUNES_URL = "/etudes-data/communes.json";

export type Commune = {
  name: string;
  cps: string[];
  lat: number;
  lon: number;
  /** Nombre d'écoles, collèges et lycées : sert à classer les villes par taille. */
  n: number;
  dep: string;
  depName: string;
  key: string;
};

export type Communes = { list: Commune[]; deps: Record<string, string> };

type Raw = {
  v: number;
  deps: Record<string, string>;
  /** Une commune par ligne : nom|codes postaux|lat×1000|lon×1000|écoles|département. */
  communes: string;
};

/** Clé de recherche : sans accents ni ponctuation, « saint » et « st » se valent. */
export function cle(s: string): string {
  return s
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bsainte\b/g, "ste")
    .replace(/\bsaint\b/g, "st")
    .trim();
}

function depDuCodePostal(cp: string): string {
  if (!cp) return "";
  if (cp.startsWith("97")) return cp.slice(0, 3);
  if (cp.startsWith("20")) return Number(cp) < 20200 ? "2A" : "2B";
  return cp.slice(0, 2);
}

function decode(raw: Raw): Communes {
  const list = raw.communes.split("\n").map((line): Commune => {
    const [name, cps, lat, lon, n, dep] = line.split("|");
    const codes = cps ? cps.split(",") : [];
    const d = dep || depDuCodePostal(codes[0] ?? "");
    return {
      name,
      cps: codes,
      lat: Number(lat) / 1000,
      lon: Number(lon) / 1000,
      n: n ? Number(n) : 1,
      dep: d,
      depName: raw.deps[d] ?? "",
      key: cle(name),
    };
  });
  return { list, deps: raw.deps };
}

let pending: Promise<Communes> | null = null;

/** Charge les communes une seule fois (environ 230 Ko compressés). */
export function chargerCommunes(): Promise<Communes> {
  pending ??= fetch(COMMUNES_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`communes : ${res.status}`);
      return res.json() as Promise<Raw>;
    })
    .then(decode)
    .catch((err: unknown) => {
      pending = null;
      throw err;
    });
  return pending;
}

/** Les communes qui répondent à une recherche : nom ou début de code postal. */
export function chercherCommunes(data: Communes, query: string, max = 7): Commune[] {
  const q = query.trim();
  if (!q) return [];
  if (/^\d{2,5}$/.test(q)) {
    let hits = data.list.filter((c) => c.cps.some((cp) => cp.startsWith(q)));
    // Un code postal sans école : les communes dont le code commence pareil
    if (!hits.length && q.length === 5)
      hits = data.list.filter((c) => c.cps.some((cp) => cp.startsWith(q.slice(0, 4))));
    return hits.sort((a, b) => b.n - a.n).slice(0, max);
  }
  const k = cle(q);
  if (k.length < 2) return [];
  const scored: { c: Commune; s: number }[] = [];
  for (const c of data.list) {
    const s = c.key === k ? 0 : c.key.startsWith(k) ? 1 : c.key.includes(` ${k}`) ? 2 : -1;
    if (s >= 0) scored.push({ c, s });
  }
  return scored
    .sort((a, b) => a.s - b.s || b.c.n - a.c.n || a.c.name.localeCompare(b.c.name, "fr"))
    .slice(0, max)
    .map((x) => x.c);
}

/** La commune la plus proche d'un point (pour nommer « ta position »). */
export function communeLaPlusProche(data: Communes, lat: number, lon: number): Commune | null {
  let best: Commune | null = null;
  let d = Infinity;
  for (const c of data.list) {
    const x = distanceKm(lat, lon, c.lat, c.lon);
    if (x < d) {
      d = x;
      best = c;
    }
  }
  return best;
}

/** Distance à vol d'oiseau, en kilomètres. */
export function distanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const r = Math.PI / 180;
  const dLat = (lat2 - lat1) * r;
  const dLon = (lon2 - lon1) * r;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * r) * Math.cos(lat2 * r) * Math.sin(dLon / 2) ** 2;
  return 12742 * Math.asin(Math.min(1, Math.sqrt(a)));
}

/** « à 3 km », « à moins d'1 km » */
export function distanceTexte(d: number): string {
  return d < 1 ? "à moins d'1 km" : `à ${Math.round(d)} km`;
}
