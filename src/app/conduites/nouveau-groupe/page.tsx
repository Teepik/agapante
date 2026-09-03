import Link from "next/link";
import { requireUser } from "@/lib/conduites/auth";
import { createGroup } from "@/lib/conduites/actions";
import { ActionForm, SubmitButton, Field } from "@/components/conduites/ui";
import { AuthShell } from "@/components/conduites/brand";

export const metadata = { title: "Nouveau groupe" };

export default async function NewGroupPage() {
  await requireUser("/conduites/nouveau-groupe");
  return (
    <AuthShell title="Créer un groupe" subtitle="Vous en serez le créateur : vous pourrez inviter des familles et nommer des administrateurs."
      footer={<Link href="/conduites" className="font-medium text-accent">← Mes groupes</Link>}>
      <ActionForm action={createGroup}>
        <Field label="Nom du groupe" hint="Par exemple le nom de l'école ou du trajet."><input name="name" required autoFocus className="field" placeholder="Conduites Liesse" /></Field>
        <Field label="Destination" hint="Facultatif."><input name="destination" className="field" placeholder="Académie de Liesse" /></Field>
        <SubmitButton size="lg" className="w-full">Créer le groupe</SubmitButton>
      </ActionForm>
    </AuthShell>
  );
}
