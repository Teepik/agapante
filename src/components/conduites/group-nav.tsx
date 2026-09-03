"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconCalendar, IconScale, IconHome, IconSettings } from "./icons";

const tabs = (slug: string, isAdmin: boolean) => [
  { href: `/conduites/g/${slug}`, label: "Planning", icon: IconCalendar, exact: false, match: (p: string) => p === `/conduites/g/${slug}` || p.startsWith(`/conduites/g/${slug}/trajet`) },
  { href: `/conduites/g/${slug}/equite`, label: "Équité", icon: IconScale, match: (p: string) => p.startsWith(`/conduites/g/${slug}/equite`) },
  { href: `/conduites/g/${slug}/famille`, label: "Famille", icon: IconHome, match: (p: string) => p.startsWith(`/conduites/g/${slug}/famille`) },
  ...(isAdmin ? [{ href: `/conduites/g/${slug}/admin`, label: "Réglages", icon: IconSettings, match: (p: string) => p.startsWith(`/conduites/g/${slug}/admin`) }] : []),
];

export function GroupNav({ slug, isAdmin, variant }: { slug: string; isAdmin: boolean; variant: "top" | "bottom" }) {
  const pathname = usePathname();
  const items = tabs(slug, isAdmin);
  if (variant === "top") return (
      <nav className="flex items-center gap-1" aria-label="Navigation du groupe">
        {items.map(t => {
          const active = t.match(pathname);
          return (
            <Link key={t.href} href={t.href} aria-current={active ? "page" : undefined}
              className={`inline-flex h-9 items-center gap-2 rounded-[10px] px-3 text-[14px] font-medium transition ${active ? "bg-accent-soft text-accent-ink" : "text-ink-2 hover:bg-raised hover:text-ink"}`}>
              <t.icon width={17} height={17} /> {t.label}
            </Link>
          );
        })}
      </nav>
  );
  return (
      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface/90 backdrop-blur" style={{ paddingBottom: "env(safe-area-inset-bottom)" }} aria-label="Navigation du groupe">
        <ul className="mx-auto flex max-w-[560px]">
          {items.map(t => {
            const active = t.match(pathname);
            return (
              <li key={t.href} className="flex-1">
                <Link href={t.href} aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition ${active ? "text-accent" : "text-ink-3"}`}>
                  <t.icon width={22} height={22} strokeWidth={active ? 2.2 : 1.8} /> {t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
  );
}
