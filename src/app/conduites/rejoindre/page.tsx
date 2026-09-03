import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/conduites/auth";
import { getGroupByCode } from "@/lib/conduites/db";
import { joinByCode } from "@/lib/conduites/actions";
import { ActionForm, SubmitButton, Field } from "@/components/conduites/ui";
import { AuthShell } from "@/components/conduites/brand";

export const metadata = { title: "Rejoindre un groupe" };

export default async function JoinPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const { code } = await searchParams;
  const user = await getCurrentUser();
  // Lien d'invitation reçu sans compte : on passe par l'inscription, code pré-rempli.
  if (!user) redirect(code ? `/conduites/inscription?code=${encodeURIComponent(code)}` : "/conduites/login?next=/conduites/rejoindre");
  const group = code ? await getGroupByCode(code) : undefined;
  return (
    <AuthShell title={group ? `Rejoindre ${group.name}` : "Rejoindre un groupe"}
      subtitle={group ? "Confirmez pour accéder au planning du groupe." : "Saisissez le code d'invitation transmis par le groupe."}
      footer={<Link href="/conduites" className="font-medium text-accent">← Mes groupes</Link>}>
      <ActionForm action={joinByCode}>
        <Field label="Code d'invitation">
          <input name="code" defaultValue={code ?? ""} required autoFocus={!group} className="field font-mono uppercase tracking-[0.15em]" placeholder="ABC123" />
        </Field>
        <SubmitButton size="lg" className="w-full">Rejoindre</SubmitButton>
      </ActionForm>
    </AuthShell>
  );
}
