import { one, type User } from "@/lib/conduites/db";
import { buildIcal } from "@/lib/conduites/ical";
import { appUrl } from "@/lib/conduites/mail";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const clean = token.replace(/\.ics$/i, "");
  const user = await one<User>("SELECT * FROM conduites_users WHERE ical_token = $1", [clean]);
  if (!user) return new Response("Flux introuvable", { status: 404 });
  return new Response(await buildIcal(user, appUrl(req)), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="conduites.ics"',
      "Cache-Control": "private, max-age=900",
    },
  });
}
