import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/conduites/auth";
import { login } from "@/lib/conduites/actions";
import { ActionForm, SubmitButton, Field } from "@/components/conduites/ui";
import { AuthShell } from "@/components/conduites/brand";

export const metadata = { title: "Connexion" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  if (await getCurrentUser()) redirect("/conduites");
  const { next } = await searchParams;
  return (
    <AuthShell title="Bon retour" subtitle="Connectez-vous pour retrouver le planning de votre groupe."
      footer={<>Nouveau ici ? <Link href={next ? `/conduites/inscription?next=${encodeURIComponent(next)}` : "/conduites/inscription"} className="font-medium text-accent">Créer un compte</Link></>}>
      <ActionForm action={login}>
        <input type="hidden" name="next" value={next ?? ""} />
        <Field label="E-mail"><input name="email" type="email" required autoComplete="email" autoFocus className="field" /></Field>
        <Field label="Mot de passe"><input name="password" type="password" required autoComplete="current-password" className="field" /></Field>
        <SubmitButton size="lg" className="w-full">Se connecter</SubmitButton>
      </ActionForm>
    </AuthShell>
  );
}
