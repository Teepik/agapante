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
    return `translate(-50%, -50%) translateX(${direction * 42}%) translateZ(-100px) rotateY(${direction * -30}deg) scale(0.86)`;
  }
  if (Math.abs(offset) === 2) {
    const direction = offset > 0 ? 1 : -1;
    return `translate(-50%, -50%) translateX(${direction * 68}%) translateZ(-200px) rotateY(${direction * -42}deg) scale(0.74)`;
  }
  const direction = offset > 0 ? 1 : -1;
  return `translate(-50%, -50%) translateX(${direction * 82}%) translateZ(-280px) rotateY(${direction * -50}deg) scale(0.64)`;
}

function cardOpacity(offset: number): number {
  const distance = Math.abs(offset);
  if (distance === 0) return 1;
  if (distance === 1) return 0.5;
  if (distance === 2) return 0.26;
  return 0.1;
}

function cardZIndex(offset: number): number {
  return 40 - Math.abs(offset) * 10;
}

function ProjectCard({ item, offset }: { item: ShowcaseCardData; offset: number }) {
  const accent = showcaseAccent(item.url);
  const isActive = offset === 0;
  const label = item.name || showcaseHostname(item.url);

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      role="listitem"
      aria-hidden={!isActive}
      aria-label={`Ouvrir ${label} dans un nouvel onglet`}
      className={`vitrine-carousel-card ${isActive ? "is-active" : "is-background"}`}
      style={{
        transform: cardTransform(offset),
        opacity: cardOpacity(offset),
        zIndex: cardZIndex(offset),
        pointerEvents: Math.abs(offset) <= 2 ? "auto" : "none",
      }}
    >
      <div className="vitrine-card-light flex h-full max-h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] max-h-[42%] w-full shrink-0 overflow-hidden bg-ink-800">
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
              <span className="display text-[1.4rem] text-white/90 sm:text-[1.6rem]">{label}</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col p-5 sm:p-6">
          <p className="text-[0.7rem] uppercase tracking-[0.14em] text-ink-600/80 sm:text-[0.72rem]">
            {showcaseHostname(item.url)}
          </p>
          <h2 className="display mt-2 text-[clamp(1.25rem,2.2vw,1.85rem)] leading-tight text-ink-950">
            {label}
          </h2>
          <p className="mt-3 line-clamp-4 flex-1 text-[0.88rem] leading-relaxed text-ink-700 sm:mt-4 sm:text-[0.95rem]">
            {item.comment}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-[0.8rem] font-medium text-ink-950 sm:mt-5 sm:text-[0.86rem]">
            Visiter le site
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" aria-hidden="true">
              <path
                d="M5 15 15 5M15 5H7M15 5v8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
        </div>
      </div>
    </a>
  );
}

export function ShowcaseCarousel({ items }: { items: ShowcaseCardData[] }) {
  const [active, setActive] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchMoved = useRef(false);
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
    const touch = event.touches[0];
    if (!touch) return;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    touchMoved.current = false;
  };

  const onTouchMove = (event: React.TouchEvent) => {
    if (!touchStart.current) return;
    const touch = event.touches[0];
    if (!touch) return;
    const dx = Math.abs(touch.clientX - touchStart.current.x);
    const dy = Math.abs(touch.clientY - touchStart.current.y);
    if (dx > 8 || dy > 8) touchMoved.current = true;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (!touchStart.current || total <= 1) return;
    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - touchStart.current.x;
    touchStart.current = null;

    if (touchMoved.current && Math.abs(deltaX) >= 40) {
      event.preventDefault();
      go(deltaX < 0 ? 1 : -1);
    }
    touchMoved.current = false;
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

      <main className="relative z-10 grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)]">
        <div className="container-x shrink-0 pt-4 pb-2 sm:pt-6 sm:pb-3">
          <h1 className="display text-[clamp(1.45rem,3vw,2.2rem)] text-chalk">
            Sites et applications web
          </h1>
          <p className="mt-1.5 max-w-xl text-[0.86rem] leading-relaxed text-mute sm:mt-2 sm:text-[0.95rem]">
            Faites défiler pour parcourir — cliquez sur une carte pour ouvrir le projet.
          </p>
        </div>

        <div className="relative min-h-0 px-3 pb-8 sm:px-4 sm:pb-10">
          {total === 0 ? (
            <div className="flex h-full items-center justify-center">
              <div className="vitrine-card-light max-w-md p-10 text-center">
                <p className="display text-[1.6rem] text-ink-950">Aucun projet publié</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">
                  Les projets ajoutés depuis le back-office s&apos;affichent ici.
                </p>
              </div>
            </div>
          ) : (
            <div className="relative mx-auto h-full max-w-6xl">
              {total > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Projet précédent"
                    className="absolute left-0 top-1/2 z-30 hidden -translate-y-1/2 rounded-full border border-ink-600/80 bg-ink-950/50 p-2.5 text-chalk-dim backdrop-blur-sm transition-colors hover:border-iris-400/50 hover:text-chalk sm:inline-flex"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Projet suivant"
                    className="absolute right-0 top-1/2 z-30 hidden -translate-y-1/2 rounded-full border border-ink-600/80 bg-ink-950/50 p-2.5 text-chalk-dim backdrop-blur-sm transition-colors hover:border-iris-400/50 hover:text-chalk sm:inline-flex"
                  >
                    →
                  </button>
                </>
              ) : null}

              <div
                className="vitrine-stage h-full w-full"
                role="list"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {items.map((item, index) => (
                  <ProjectCard
                    key={item.id}
                    item={item}
                    offset={relativeOffset(index, active, total)}
                  />
                ))}
              </div>

              {total > 1 ? (
                <div className="pointer-events-none absolute inset-x-0 bottom-1 z-30 flex justify-center sm:bottom-2">
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
