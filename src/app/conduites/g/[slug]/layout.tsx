import Link from "next/link";
import { requireGroup } from "@/lib/conduites/auth";
import { listUserGroups } from "@/lib/conduites/db";
import { logout } from "@/lib/conduites/actions";
import { GroupNav } from "@/components/conduites/group-nav";
import { Avatar } from "@/components/conduites/avatar";
import { Logo } from "@/components/conduites/brand";
import { IconLogout, IconChevron } from "@/components/conduites/icons";

export default async function GroupLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { user, group, isAdmin } = await requireGroup(slug);
  const groups = await listUserGroups(user.id);

  return (
    <div className="min-h-dvh pb-24 sm:pb-10">
      <header className="sticky top-0 z-20 border-b border-line bg-canvas/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[720px] items-center gap-3 px-4 sm:px-6">
          <Link href="/conduites" className="shrink-0" aria-label="Mes groupes"><Logo /></Link>
          <div className="min-w-0 flex-1">
            {groups.length > 1 ? (
              <details className="relative">
                <summary className="flex cursor-pointer list-none items-center gap-1 truncate font-semibold [&::-webkit-details-marker]:hidden">
                  {group.name} <IconChevron width={16} height={16} className="rotate-90 text-ink-3" />
                </summary>
                <ul className="card absolute left-0 top-full z-30 mt-2 w-64 overflow-hidden py-1 shadow-pop animate-fade">
                  {groups.map(g => (
                    <li key={g.id}><Link href={`/conduites/g/${g.slug}`} className={`block px-4 py-2.5 text-[14px] hover:bg-raised ${g.id === group.id ? "font-semibold" : ""}`}>{g.name}</Link></li>
                  ))}
                  <li className="border-t border-line"><Link href="/conduites" className="block px-4 py-2.5 text-[14px] text-ink-2 hover:bg-raised">Tous mes groupes</Link></li>
                </ul>
              </details>
            ) : (
              <div className="truncate font-semibold">{group.name}</div>
            )}
            {group.destination && <div className="truncate text-[12px] text-ink-3 -mt-0.5">{group.destination}</div>}
          </div>
          <details className="relative">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full [&::-webkit-details-marker]:hidden">
              <Avatar name={`${user.first_name} ${user.last_name}`} size={34} />
            </summary>
            <div className="card absolute right-0 top-full z-30 mt-2 w-60 overflow-hidden py-1 shadow-pop animate-fade">
              <div className="px-4 py-2.5">
                <div className="truncate text-[14px] font-medium">{user.first_name} {user.last_name}</div>
                <div className="truncate text-[12px] text-ink-3">{user.email}</div>
              </div>
              <Link href={`/conduites/g/${slug}/famille`} className="block border-t border-line px-4 py-2.5 text-[14px] hover:bg-raised">Ma famille</Link>
              <Link href="/conduites" className="block px-4 py-2.5 text-[14px] hover:bg-raised">Mes groupes</Link>
              <form action={logout}><button className="flex w-full items-center gap-2 border-t border-line px-4 py-2.5 text-left text-[14px] text-ink-2 hover:bg-raised"><IconLogout width={16} height={16} /> Déconnexion</button></form>
            </div>
          </details>
        </div>
        <div className="mx-auto hidden max-w-[720px] px-4 pb-2 sm:block sm:px-6">
          <GroupNav slug={slug} isAdmin={isAdmin} variant="top" />
        </div>
      </header>
      <main className="mx-auto max-w-[720px] px-4 py-5 sm:px-6 sm:py-7">{children}</main>
      <div className="sm:hidden"><GroupNav slug={slug} isAdmin={isAdmin} variant="bottom" /></div>
    </div>
  );
}
