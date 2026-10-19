"use client";

import { useEffect, useState } from "react";
import { BrandMark, Icon } from "./ui";

export const SECTIONS = [
  { id: "carte", label: "Carte" },
  { id: "test", label: "Test" },
  { id: "parcours", label: "Parcours" },
  { id: "lycees", label: "Lycées" },
  { id: "specialites", label: "Spécialités" },
  { id: "ecoles", label: "Écoles" },
  { id: "passerelles", label: "Passerelles" },
  { id: "calendrier", label: "Calendrier" },
  { id: "lexique", label: "Lexique" },
] as const;

export function TopNav({
  savedCount,
  onSearch,
  onOpenList,
}: {
  savedCount: number;
  onSearch: () => void;
  onOpenList: () => void;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mac, setMac] = useState(true);

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (window.scrollY < window.innerHeight * 0.4) setActive(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu]);

  return (
    <nav className={scrolled ? "e-nav is-scrolled" : "e-nav"} aria-label="Sections de la page">
      <div className="e-nav__in">
        <a href="#top" className="e-brand" onClick={() => setMenu(false)}>
          <BrandMark />
          études
        </a>

        <div className="e-nav__links">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>
              {s.label}
            </a>
          ))}
        </div>

        <div className="e-nav__tools">
          <button type="button" className="e-nav__search" onClick={onSearch} aria-label="Rechercher dans la page">
            <Icon name="search" />
            <span className="e-nav__search-text">Rechercher</span>
            <span className="e-kbd">{mac ? "⌘K" : "Ctrl K"}</span>
          </button>
          <button type="button" className="e-nav__list" onClick={onOpenList}>
            <Icon name="bookmark" />
            <span className="e-nav__list-text">Ma liste</span>
            <span className="e-num" aria-label={`${savedCount} éléments`}>
              {savedCount}
            </span>
          </button>
          <button
            type="button"
            className="e-iconbtn e-nav__menu"
            aria-expanded={menu}
            aria-controls="e-menu"
            aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMenu((v) => !v)}
          >
            <Icon name={menu ? "close" : "menu"} />
          </button>
        </div>
      </div>
      <div id="e-menu" className="e-menu" hidden={!menu}>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? "true" : undefined}
            onClick={() => setMenu(false)}
          >
            {s.label}
            <Icon name="chevron-right" width={18} height={18} />
          </a>
        ))}
      </div>
    </nav>
  );
}
