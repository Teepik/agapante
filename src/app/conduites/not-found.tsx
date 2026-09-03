import Link from "next/link";
import { buttonCls } from "@/components/conduites/styles";
import { AuthShell } from "@/components/conduites/brand";

export default function NotFound() {
  return (
    <AuthShell title="Page introuvable" subtitle="Le trajet ou la page demandée n'existe plus.">
      <Link href="/conduites" className={buttonCls("secondary", "lg")}>Retour à l'accueil</Link>
    </AuthShell>
  );
}
