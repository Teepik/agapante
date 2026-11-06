import "server-only";
import { q, one, MAX_ANNONCES, type Annonce } from "./db";

/** Champs acceptés pour une annonce : tout le reste est ignoré. */
const TEXT = ["titre", "url", "src", "cp", "ville", "code", "type", "dpe", "notes", "op", "statut", "archiveRaison", "ajouteLe", "verifieLe", "archiveLe", "publie", "vu", "etape", "visiteLe"] as const;
const NUM = ["prix", "surface", "pieces", "terrain", "lat", "lon", "travaux", "loyer", "chambres", "loyerCh", "nuit", "occ", "prixRev", "offrePrix", "apport", "taux", "duree", "tmi"] as const;

export function cleanId(id: unknown): string | null {
  const s = String(id ?? "").trim();
  return /^[A-Za-z0-9_.:-]{1,80}$/.test(s) ? s : null;
}

export function sanitize(input: Record<string, unknown>): Annonce | null {
  const id = cleanId(input.id);
  if (!id) return null;
  const out: Annonce = { id };
  for (const k of TEXT) {
    const v = input[k];
    if (v == null || v === "") continue;
    out[k] = String(v).slice(0, k === "notes" ? 5000 : k === "url" ? 1000 : 300);
  }
  if (out.url && !/^https?:\/\//i.test(String(out.url))) delete out.url;
  for (const k of NUM) {
    const v = typeof input[k] === "number" ? (input[k] as number) : parseFloat(String(input[k] ?? "").replace(",", "."));
    if (Number.isFinite(v)) out[k] = v;
  }
  if (input.indispo === true) out.indispo = true;
  if (Array.isArray(input.historique)) {
    out.historique = input.historique.slice(-50).map(h => {
      const o = h as { date?: unknown; prix?: unknown };
      return { date: String(o?.date ?? "").slice(0, 40), prix: Number(o?.prix) };
    }).filter(h => Number.isFinite(h.prix));
  }
  if (input.postes && typeof input.postes === "object" && !Array.isArray(input.postes)) {
    const ps: Record<string, { e?: number; m?: number; n?: string }> = {};
    for (const [k, v] of Object.entries(input.postes as Record<string, unknown>).slice(0, 30)) {
      if (!/^[a-z]{1,12}$/.test(k) || !v || typeof v !== "object") continue;
      const o = v as { e?: unknown; m?: unknown; n?: unknown }, p: { e?: number; m?: number; n?: string } = {};
      if (o.e === 0 || o.e === 1 || o.e === 2) p.e = o.e;
      if (typeof o.m === "number" && Number.isFinite(o.m)) p.m = o.m;
      if (o.n) p.n = String(o.n).slice(0, 300);
      if (Object.keys(p).length) ps[k] = p;
    }
    if (Object.keys(ps).length) out.postes = ps;
  }
  out.statut = out.statut === "archivee" ? "archivee" : "active";
  return out;
}

export async function listAnnonces(userId: string): Promise<Annonce[]> {
  const rows = await q<{ data: Annonce }>("SELECT data FROM atlas_annonces WHERE user_id = $1 ORDER BY updated_at DESC LIMIT $2", [userId, MAX_ANNONCES]);
  return rows.map(r => r.data);
}

export async function saveAnnonce(userId: string, a: Annonce): Promise<void> {
  const exists = await one("SELECT 1 FROM atlas_annonces WHERE user_id = $1 AND id = $2", [userId, a.id]);
  if (!exists) {
    const n = await one<{ n: string }>("SELECT count(*) AS n FROM atlas_annonces WHERE user_id = $1", [userId]);
    if (Number(n?.n ?? 0) >= MAX_ANNONCES) throw new Error("limite");
  }
  await q(
    `INSERT INTO atlas_annonces (user_id, id, data, statut) VALUES ($1, $2, $3::jsonb, $4)
     ON CONFLICT (user_id, id) DO UPDATE SET data = EXCLUDED.data, statut = EXCLUDED.statut, updated_at = now()`,
    [userId, a.id, JSON.stringify(a), a.statut ?? "active"],
  );
}

export async function deleteAnnonce(userId: string, id: string): Promise<void> {
  await q("DELETE FROM atlas_annonces WHERE user_id = $1 AND id = $2", [userId, id]);
}

const base = (u?: unknown) => (u ? String(u).split("?")[0].split("#")[0] : "");

export type IngestResult = { etat: "ajoutee" | "prix" | "verifiee" | "archivee" | "indisponible"; annonce: Annonce; ancienPrix?: number };

/**
 * Ajout depuis le favori ou par collage : une annonce déjà connue (même identifiant ou même lien)
 * voit son prix et sa date de vérification mis à jour, et passe en archive si elle n'est plus en ligne.
 */
export async function ingest(userId: string, d: Annonce): Promise<IngestResult> {
  const now = new Date().toISOString();
  const all = await listAnnonces(userId);
  const old = all.find(x => x.id === d.id || (d.url && x.url && base(x.url) === base(d.url)));
  if (old) {
    const upd: Annonce = { ...old, verifieLe: now };
    let etat: IngestResult["etat"] = "verifiee";
    let ancienPrix: number | undefined;
    const prix = d.prix as number | undefined;
    if (prix && prix !== old.prix) {
      ancienPrix = old.prix as number;
      upd.historique = [...((old.historique as unknown[]) || []), { date: now, prix }];
      upd.prix = prix;
      etat = "prix";
    }
    if (d.indispo) { upd.statut = "archivee"; upd.archiveLe = now; upd.archiveRaison = "Retirée de la vente"; etat = "archivee"; }
    // Complète les informations manquantes de l'annonce enregistrée
    for (const k of ["lat", "lon", "cp", "ville", "code", "dpe", "surface", "pieces"]) if (upd[k] == null && d[k] != null) upd[k] = d[k];
    delete upd.indispo;
    await saveAnnonce(userId, upd);
    return { etat, annonce: upd, ancienPrix };
  }
  if (d.indispo) return { etat: "indisponible", annonce: d };
  const neu: Annonce = { ...d, statut: "active", ajouteLe: now, verifieLe: now, op: d.op || "auto", historique: d.prix ? [{ date: now, prix: d.prix }] : [] };
  delete neu.indispo;
  await saveAnnonce(userId, neu);
  return { etat: "ajoutee", annonce: neu };
}
