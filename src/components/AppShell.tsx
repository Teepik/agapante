"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function AppShell({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const bare = pathname.startsWith("/admin") || pathname.startsWith("/vitrine");

  return (
    <>
      {bare ? null : header}
      <main id="contenu" className={bare ? "" : "pt-[4.6rem]"}>
        {children}
      </main>
      {bare ? null : footer}
    </>
  );
}
