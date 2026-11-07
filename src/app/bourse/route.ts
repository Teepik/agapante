import { redirect } from "next/navigation";
import { accesBourse } from "@/lib/bourse/acces";
import { APPLI_HTML } from "@/lib/bourse/appli.generated";

export const dynamic = "force-dynamic";

/** /bourse : outil personnel (atlas, classement des actions, portefeuilles fictifs, constructeur). Réservé à l'administrateur. */
export async function GET() {
  if (!(await accesBourse())) redirect("/admin?suite=/bourse");
  return new Response(APPLI_HTML, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
