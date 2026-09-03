import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/conduites/auth";
import { listUserGroups, getGroupBySlug } from "@/lib/conduites/db";
import { logout } from "@/lib/conduites/actions";
import { buttonCls } from "@/components/conduites/styles";
import { Avatar } from "@/components/conduites/avatar";
import { Logo, Wordmark } from "@/components/conduites/brand";
import { IconChevron, IconPlus, IconUsers, IconLogout } from "@/components/conduites/icons";
import { plural } from "@/lib/conduites/dates";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ groupe?: string }> }) {
  const user = await getCurrentUser();
  if (!user) return <Landing />;
  const { groupe } = await searchParams;
  const groups = await listUserGroups(user.id);
  if (groups.length === 1 && !groupe) redirect(`/conduites/g/${groups[0].slug}`);
  const wanted = groupe ? await getGroupBySlug(groupe) : undefined;

  return (
    <div className="mx-auto w-full max-w-[560px] px-5 py-6 sm:py-10">
      <header className="mb-8 flex items-center justify-between">
        <Wordmark />
        <form action={logout}>
          <button className={buttonCls("ghost", "sm")}><IconLogout width={16} height={16} /> Déconnexion</button>
        </form>
      </header>

      <div className="mb-6 flex items-center gap-3">
        <Avatar name={`${user.first_name} ${user.last_name}`} size={44} />
        <div>
          <h1 className="h2">Bonjour {user.first_name}</h1>
          <p className="text-[14px] text-ink-2">{groups.length ? "Choisissez un groupe." : "Vous n'êtes encore dans aucun groupe."}</p>
        </div>
      </div>

      {wanted && !groups.some(g => g.id === wanted.id) && (
        <div className="mb-5 rounded-[14px] bg-warn-soft px-4 py-3 text-[14px] text-warn">
          Vous n'êtes pas membre de <strong>{wanted.name}</strong>. Demandez le code d'invitation à un membre du groupe.
        </div>
      )}

      {groups.length > 0 && (
        <ul className="card divide-rows mb-4 overflow-hidden animate-rise">
          {groups.map(g => (
            <li key={g.id}>
              <Link href={`/conduites/g/${g.slug}`} className="flex items-center gap-4 px-4 py-4 transition hover:bg-raised">
                <Avatar name={g.name} size={40} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{g.name}</div>
                  <div className="text-[13px] text-ink-2">
                    {plural(g.members, "famille")}
                    {g.open_trips > 0 && <> · <span className="text-warn">{plural(g.open_trips, "trajet à pourvoir", "trajets à pourvoir")}</span></>}
                    {g.role !== "member" && <> · {g.role === "owner" ? "créateur" : "admin"}</>}
                  </div>
                </div>
                <IconChevron className="text-ink-3" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/conduites/rejoindre" className="card card-pad group flex items-center gap-3 transition hover:bg-raised">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-[14px] bg-accent-soft text-accent-ink"><IconUsers /></span>
          <span><span className="block font-medium">Rejoindre un groupe</span><span className="block text-[13px] text-ink-2">Avec un code d'invitation</span></span>
        </Link>
        <Link href="/conduites/nouveau-groupe" className="card card-pad flex items-center gap-3 transition hover:bg-raised">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-[14px] bg-accent-soft text-accent-ink"><IconPlus /></span>
          <span><span className="block font-medium">Créer un groupe</span><span className="block text-[13px] text-ink-2">Pour votre école ou votre trajet</span></span>
        </Link>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[560px] flex-col px-5 py-8 sm:py-14">
      <Wordmark />
      <div className="my-auto py-12 animate-rise">
        <Logo size={56} />
        <h1 className="h1 mt-6">Le planning de covoiturage<br />de votre groupe de familles.</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-ink-2">
          Qui conduit vendredi ? Combien d'enfants dimanche ? Chaque famille se positionne en un geste, déclare ses absences, et le compteur d'équité garde la balance juste toute l'année.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/conduites/inscription" className={buttonCls("primary", "lg")}>Créer un compte</Link>
          <Link href="/conduites/login" className={buttonCls("secondary", "lg")}>Se connecter</Link>
        </div>
        <p className="mt-6 text-[13px] text-ink-3">Vous avez reçu un code d'invitation ? Il vous sera demandé à l'inscription.</p>
      </div>
    </div>
  );
}
