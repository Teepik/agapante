"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Mark } from "@/components/Logo";
import { showcaseAccent, showcaseHostname } from "@/lib/showcase";

export type ShowcaseCardData = {
  id: number;
  url: string;
  name: string;
  imageUrl: string | null;
  comment: string;
};

function relativeOffset(index: number, active: number, total: number): number {
  let offset = index - active;
  if (total <= 1) return 0;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function cardTransform(offset: number): string {
  if (offset === 0) {
    return "translate(-50%, -50%) translateZ(0px) rotateY(0deg) scale(1)";
  }
  if (Math.abs(offset) === 1) {
    const direction = offset > 0 ? 1 : -1;
    return `translate(-50%, -50%) translateX(${direction * 44}%) translateZ(-100px) rotateY(${direction * -32}deg) scale(0.84)`;
  }
  if (Math.abs(offset) === 2) {
    const direction = offset > 0 ? 1 : -1;
    return `translate(-50%, -50%) translateX(${direction * 72}%) translateZ(-200px) rotateY(${direction * -44}deg) scale(0.72)`;
  }
  const direction = offset > 0 ? 1 : -1;
  return `translate(-50%, -50%) translateX(${direction * 88}%) translateZ(-280px) rotateY(${direction * -52}deg) scale(0.62)`;
}

function cardOpacity(offset: number): number {
  const distance = Math.abs(offset);
  if (distance === 0) return 1;
  if (distance === 1) return 0.52;
  if (distance === 2) return 0.28;
  return 0.12;
}

function cardZIndex(offset: number): number {
  return 40 - Math.abs(offset) * 10;
}

function ProjectCard({
  item,
  offset,
  onSelect,
}: {
  item: ShowcaseCardData;
  offset: number;
  onSelect: () => void;
}) {
  const accent = showcaseAccent(item.url);
  const isActive = offset === 0;
  const label = item.name || showcaseHostname(item.url);

  return (
    <article
      role="listitem"
      aria-hidden={!isActive}
      className={`vitrine-carousel-card ${isActive ? "is-active" : ""}`}
      style={{
        transform: cardTransform(offset),
        opacity: cardOpacity(offset),
        zIndex: cardZIndex(offset),
        pointerEvents: Math.abs(offset) <= 2 ? "auto" : "none",
      }}
      onClick={() => {
        if (!isActive) onSelect();
      }}
    >
      <div className="vitrine-card-light flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-800">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt=""
              className="h-full w-full object-cover"
              loading={isActive ? "eager" : "lazy"}
            />
          ) : (
            <div
              className="flex h-full w-full items-end p-5"
              style={{
                background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
              }}
            >
              <span className="display text-[1.6rem] text-white/90">{label}</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <p className="text-[0.72rem] uppercase tracking-[0.14em] text-ink-600/80">
            {showcaseHostname(item.url)}
          </p>
          <h2 className="display mt-2 text-[clamp(1.45rem,2.5vw,2rem)] leading-tight text-ink-950">
            {label}
          </h2>
          <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-700">{item.comment}</p>

          {isActive ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-6 py-3.5 text-[0.92rem] font-medium text-chalk transition-colors hover:bg-iris-600"
              onClick={(event) => event.stopPropagation()}
            >
              Visiter le site
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path
                  d="M5 15 15 5M15 5H7M15 5v8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ) : (
            <p className="mt-6 text-[0.82rem] text-ink-600">Cliquer pour afficher</p>
          )}
        </div>
      </div>
    </article>
  );
}

export function ShowcaseCarousel({ items }: { items: ShowcaseCardData[] }) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<number | null>(null);
  const total = items.length;

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, []);

  const go = useCallback(
    (delta: number) => {
      if (total <= 1) return;
      setActive((current) => (current + delta + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (total <= 1) return;
      event.preventDefault();
      if (Math.abs(event.deltaY) < 8) return;
      go(event.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [go, total]);

  const onTouchStart = (event: React.TouchEvent) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStart.current === null || total <= 1) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < 40) return;
    go(delta < 0 ? 1 : -1);
  };

  return (
    <div className="vitrine-shell flex h-[100dvh] flex-col overflow-hidden bg-ink-950 text-chalk">
      <div className="vitrine-orbit vitrine-orbit-a" />
      <div className="vitrine-orbit vitrine-orbit-b" />
      <div className="grid-veil opacity-70" />

      <header className="relative z-20 shrink-0 border-b border-ink-700/50 bg-ink-950/75 backdrop-blur-xl">
        <div className="container-x flex h-14 items-center justify-between sm:h-16">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Agapante — accueil">
            <Mark className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="display text-[1.05rem] text-chalk sm:text-[1.2rem]">Agapante</span>
          </Link>
          <Link
            href="/"
            className="text-[0.78rem] text-mute transition-colors hover:text-chalk-dim sm:text-[0.82rem]"
          >
            Retour au site
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="container-x shrink-0 pt-5 sm:pt-7">
          <h1 className="display text-[clamp(1.6rem,3.2vw,2.35rem)] text-chalk">
            Sites et applications web
          </h1>
          <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-mute sm:text-[0.98rem]">
            Projets livrés pour des clients ou en interne. Faites défiler pour parcourir la
            sélection.
          </p>
        </div>

        <div className="relative mt-4 min-h-0 flex-1 sm:mt-6">
          {total === 0 ? (
            <div className="flex h-full items-center justify-center px-6">
              <div className="vitrine-card-light max-w-md p-10 text-center">
                <p className="display text-[1.6rem] text-ink-950">Aucun projet publié</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">
                  Les projets ajoutés depuis le back-office s&apos;affichent ici.
                </p>
              </div>
            </div>
          ) : (
            <div className="relative mx-auto h-full max-w-6xl px-4">
              {total > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Projet précédent"
                    className="absolute left-0 top-[46%] z-30 hidden -translate-y-1/2 rounded-full border border-ink-600/80 bg-ink-950/50 p-2.5 text-chalk-dim backdrop-blur-sm transition-colors hover:border-iris-400/50 hover:text-chalk sm:inline-flex"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Projet suivant"
                    className="absolute right-0 top-[46%] z-30 hidden -translate-y-1/2 rounded-full border border-ink-600/80 bg-ink-950/50 p-2.5 text-chalk-dim backdrop-blur-sm transition-colors hover:border-iris-400/50 hover:text-chalk sm:inline-flex"
                  >
                    →
                  </button>
                </>
              ) : null}

              <div
                className="vitrine-stage h-full"
                role="list"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                {items.map((item, index) => (
                  <ProjectCard
                    key={item.id}
                    item={item}
                    offset={relativeOffset(index, active, total)}
                    onSelect={() => setActive(index)}
                  />
                ))}
              </div>

              {total > 1 ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center sm:bottom-6">
                  <div className="pointer-events-auto flex items-center gap-2">
                    {items.map((item, index) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-label={`Afficher ${item.name}`}
                        aria-current={index === active ? "true" : undefined}
                        onClick={() => setActive(index)}
                        className={`rounded-full transition-all ${
                          index === active
                            ? "h-2 w-6 bg-chalk/90"
                            : "h-1.5 w-1.5 bg-chalk/30 hover:bg-chalk/55"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
