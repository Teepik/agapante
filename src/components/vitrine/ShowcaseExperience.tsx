"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import { Mark } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { showcaseAccent, showcaseHostname } from "@/lib/showcase";

export type ShowcaseCardData = {
  id: number;
  url: string;
  description: string;
};

function ShowcaseCard({ item, index }: { item: ShowcaseCardData; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const accent = showcaseAccent(item.url);
  const hostname = showcaseHostname(item.url);

  const onMove = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    node.style.setProperty("--mouse-x", `${x}%`);
    node.style.setProperty("--mouse-y", `${y}%`);
  }, []);

  return (
    <Reveal delay={80 + index * 70} className="vitrine-grid-item h-full">
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full"
        onMouseMove={onMove}
      >
        <article
          ref={cardRef}
          className="vitrine-card flex h-full flex-col"
          style={
            {
              "--accent-from": accent.from,
              "--accent-to": accent.to,
            } as React.CSSProperties
          }
        >
          <div className="vitrine-card-accent" />
          <div className="relative z-10 flex flex-1 flex-col p-7 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.16em] text-mute-dim">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="display mt-3 text-[clamp(1.55rem,2.8vw,2.35rem)] text-chalk transition-colors group-hover:text-gradient">
                  {hostname}
                </h2>
              </div>
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-600 bg-ink-900/80 text-chalk-dim transition-all duration-300 group-hover:border-iris-400/50 group-hover:bg-iris-400/10 group-hover:text-chalk">
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path
                    d="M5 15 15 5M15 5H7M15 5v8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>

            <p className="mt-6 flex-1 text-[0.98rem] leading-relaxed text-mute transition-colors group-hover:text-chalk-dim">
              {item.description}
            </p>

            <p className="mt-8 text-[0.78rem] tracking-[0.08em] text-mute-dim uppercase">
              Visiter le projet
            </p>
          </div>
        </article>
      </a>
    </Reveal>
  );
}

export function ShowcaseExperience({ items }: { items: ShowcaseCardData[] }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-950">
      <div className="vitrine-orbit vitrine-orbit-a" />
      <div className="vitrine-orbit vitrine-orbit-b" />
      <div className="vitrine-orbit vitrine-orbit-c" />
      <div className="grid-veil" />
      <div className="noise" />

      <header className="relative z-20 border-b border-ink-700/60 bg-ink-950/70 backdrop-blur-xl">
        <div className="container-x flex h-[4.5rem] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Agapante — accueil">
            <Mark className="h-7 w-7" />
            <span className="display text-[1.2rem] text-chalk">Agapante</span>
          </Link>
          <p className="hidden text-[0.78rem] uppercase tracking-[0.18em] text-mute sm:block">
            Vitrine privée
          </p>
        </div>
      </header>

      <main className="relative z-10">
        <section className="container-x pb-10 pt-16 sm:pt-20 lg:pb-14 lg:pt-24">
          <Reveal>
            <p className="eyebrow">Réalisations</p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="display mt-6 max-w-[16ch] text-[clamp(2.6rem,7vw,5.2rem)] text-chalk">
              Sites et applications web
            </h1>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-8 max-w-2xl text-[1.08rem] leading-relaxed text-mute md:text-[1.18rem]">
              Projets livrés pour des clients ou en interne — vitrines, outils métier, webapps.
              La liste est volontairement courte et mise à jour au fil des missions.
            </p>
          </Reveal>
          <Reveal delay={230}>
            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-ink-600 bg-ink-900/60 px-5 py-2.5 text-[0.84rem] text-chalk-dim">
              <span className="inline-flex h-2 w-2 rounded-full bg-sage-400" />
              {items.length} projet{items.length > 1 ? "s" : ""} publié{items.length > 1 ? "s" : ""}
            </div>
          </Reveal>
        </section>

        <section className="container-x pb-28 lg:pb-36">
          {items.length === 0 ? (
            <Reveal>
              <div className="surface-card mx-auto max-w-xl p-12 text-center">
                <p className="display text-[1.8rem] text-chalk">La vitrine se prépare.</p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-mute">
                  Aucun projet n&apos;est publié pour le moment. Les cartes ajoutées depuis
                  l&apos;espace admin apparaîtront ici automatiquement.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="vitrine-grid">
              {items.map((item, index) => (
                <ShowcaseCard key={item.id} item={item} index={index} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="relative z-10 border-t border-ink-700/60">
        <div className="container-x flex flex-col gap-2 py-8 text-[0.82rem] text-mute-dim sm:flex-row sm:items-center sm:justify-between">
          <p>Agapante — vitrine non référencée</p>
          <Link href="/" className="text-mute transition-colors hover:text-chalk-dim">
            Retour au site principal
          </Link>
        </div>
      </footer>
    </div>
  );
}
