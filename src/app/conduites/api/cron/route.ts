import { runReminders } from "@/lib/conduites/reminders";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Rappels quotidiens. Appelé par Vercel Cron (vercel.json) avec `Authorization: Bearer CRON_SECRET`,
 * ou manuellement avec `?key=CRON_SECRET`. Idempotent : chaque rappel ne part qu'une fois.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get("authorization");
  const key = new URL(req.url).searchParams.get("key");
  const fromVercelCron = req.headers.get("user-agent")?.startsWith("vercel-cron/") ?? false;
  const ok = secret ? auth === `Bearer ${secret}` || key === secret : fromVercelCron;
  if (!ok) return new Response("Non autorisé", { status: 401 });
  return Response.json(await runReminders());
}
