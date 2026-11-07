import "server-only";
import { isAuthenticated } from "@/lib/auth";

/** Accès à /bourse : session d'administration d'Agapante. */
export async function accesBourse(): Promise<boolean> {
  try {
    return await isAuthenticated();
  } catch {
    return false;
  }
}

/** Collecte : Vercel Cron (CRON_SECRET), session d'administration, ou déploiement de prévisualisation (protégé par Vercel). */
export async function accesCollecte(req: Request): Promise<boolean> {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  const fromVercelCron = req.headers.get("user-agent")?.startsWith("vercel-cron/") ?? false;
  if (secret ? auth === `Bearer ${secret}` : fromVercelCron) return true;
  if (process.env.VERCEL_ENV === "preview") return true;
  return accesBourse();
}

export const ENTETES_PRIVEES = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow",
} as const;
