"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/lib/site";
import { Wordmark } from "./Logo";
import { Arrow } from "./ui";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-ink-700/80 bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-[4.6rem] items-center justify-between gap-6">
        <Link href="/" aria-label="Agapante — accueil" className="shrink-0">
          <Wordmark />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.9rem] transition-colors ${
                    isActive(item.href) ? "text-chalk" : "text-chalk-dim hover:text-chalk"
                  }`}
                >
                  {item.label}
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 opacity-60" aria-hidden="true">
                    <path
                      d="M2 4.5 6 8.5l4-4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <div className="invisible absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="surface-card overflow-hidden p-1.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-[12px] px-3.5 py-3 transition-colors hover:bg-iris-400/[0.09]"
                      >
                        <span className="flex items-center justify-between gap-3 text-[0.92rem] font-medium text-chalk">
                          {child.label}
                          <Arrow className="opacity-40" />
                        </span>
                        {child.description ? (
                          <span className="mt-1 block text-[0.8rem] leading-relaxed text-mute">
                            {child.description}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-[0.9rem] transition-colors ${
                  isActive(item.href) ? "text-chalk" : "text-chalk-dim hover:text-chalk"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-full bg-chalk px-5 py-2.5 text-[0.88rem] font-medium text-ink-950 transition-colors hover:bg-iris-100 sm:inline-flex"
          >
            Parler de votre projet
            <Arrow />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-chalk transition-colors hover:border-iris-400/60 lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-4 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={`overflow-hidden border-t border-ink-700/70 bg-ink-950/95 backdrop-blur-xl transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-[80vh] overflow-y-auto" : "max-h-0"
        }`}
      >
        <nav aria-label="Navigation mobile" className="container-x py-6">
          <ul className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-ink-800 last:border-0">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => (v === item.href ? null : item.href))}
                      aria-expanded={expanded === item.href}
                      className="flex w-full items-center justify-between py-3.5 text-left text-[1.02rem] text-chalk"
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 12 12"
                        className={`h-3 w-3 transition-transform duration-300 ${
                          expanded === item.href ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <path
                          d="M2 4.5 6 8.5l4-4"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-[max-height] duration-300 ${
                        expanded === item.href ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <ul className="flex flex-col gap-1 pb-3 pl-3">
                        <li>
                          <Link
                            href={item.href}
                            className="block py-2 text-[0.9rem] text-iris-300"
                          >
                            Vue d&apos;ensemble
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block py-2 text-[0.9rem] text-mute transition-colors hover:text-chalk"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className="block py-3.5 text-[1.02rem] text-chalk">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-chalk px-5 py-3.5 text-[0.95rem] font-medium text-ink-950"
          >
            Parler de votre projet
            <Arrow />
          </Link>
        </nav>
      </div>
    </header>
  );
}
