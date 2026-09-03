import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/conduites/auth";
import { getGroupByCode } from "@/lib/conduites/db";
import { register } from "@/lib/conduites/actions";
import { ActionForm, SubmitButton, Field } from "@/components/conduites/ui";
import { AuthShell } from "@/components/conduites/brand";

export const metadata = { title: "Créer un compte" };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ next?: string; code?: string }> }) {
  if (await getCurrentUser()) redirect("/conduites");
  const { next, code } = await searchParams;
  const group = code ? await getGroupByCode(code) : undefined;
  return (
    <AuthShell
      title={group ? `Rejoindre ${group.name}` : "Créer un compte"}
      subtitle={group ? "Un compte par famille. Vous pourrez ensuite ajouter vos enfants et vous positionner sur les trajets." : "Un compte par famille. Vous pourrez ensuite créer un groupe ou en rejoindre un avec un code."}
      footer={<>Déjà un compte ? <Link href={next ? `/conduites/login?next=${encodeURIComponent(next)}` : "/conduites/login"} className="font-medium text-accent">Se connecter</Link></>}>
      <ActionForm action={register}>
        <input type="hidden" name="next" value={next ?? ""} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Prénom"><input name="firstName" required autoComplete="given-name" autoFocus className="field" /></Field>
          <Field label="Nom de famille"><input name="lastName" required autoComplete="family-name" className="field" /></Field>
        </div>
        <Field label="E-mail"><input name="email" type="email" required autoComplete="email" className="field" /></Field>
        <Field label="Mot de passe" hint="8 caractères minimum."><input name="password" type="password" required minLength={8} autoComplete="new-password" className="field" /></Field>
        <Field label="Code d'invitation" hint={group ? undefined : "Facultatif : laissez vide si vous créez votre propre groupe."}>
          <input name="code" defaultValue={code ?? ""} readOnly={!!group} className={`field font-mono uppercase tracking-[0.15em] ${group ? "bg-raised" : ""}`} placeholder="ABC123" />
        </Field>
        <SubmitButton size="lg" className="w-full">{group ? "Créer mon compte et rejoindre" : "Créer mon compte"}</SubmitButton>
      </ActionForm>
    </AuthShell>
  );
}
