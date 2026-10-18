"use client";

import { useEffect, useState } from "react";
import { Icon } from "./ui";

export const SECTIONS = [
  { id: "plan", label: "Le plan" },
  { id: "boussole", label: "Boussole" },
  { id: "itineraires", label: "Itinéraires" },
  { id: "passerelles", label: "Passerelles" },
  { id: "lycee", label: "Lycée" },
  { id: "specialites", label: "Spécialités" },
  { id: "ecoles", label: "Écoles" },
  { id: "frise", label: "Frise" },
  { id: "lexique", label: "Lexique" },
] as const;

export function TopNav({ visited, total }: { visited: number; total: number }) {
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = SECTIONS.findIndex((s) => s.id === entry.target.id);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.35) setActive(-1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const progress = active < 0 ? 0 : active / (SECTIONS.length - 1);
  const current = active >= 0 ? SECTIONS[active].label : "Départ";

  return (
    <nav className={open ? "et-nav is-open" : "et-nav"} aria-label="Sections de la page">
      <div className="et-nav__inner">
        <a href="#top" className="et-nav__home" onClick={() => setOpen(false)}>
          <span className="et-nav__home-plaque">Plan des études</span>
        </a>

        <button
          type="button"
          className="et-nav__toggle"
          aria-expanded={open}
          aria-controls="et-nav-stations"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="et-nav__toggle-k">Station</span>
          <span className="et-nav__toggle-v">{current}</span>
          <Icon name="chevron-down" />
        </button>

        <ol id="et-nav-stations" className="et-nav__line" style={{ ["--p" as string]: progress }}>
          {SECTIONS.map((s, i) => (
            <li key={s.id} className={i < active ? "is-past" : i === active ? "is-here" : ""}>
              <a href={`#${s.id}`} aria-current={i === active ? "location" : undefined} onClick={() => setOpen(false)}>
                <span className="et-nav__dot" aria-hidden="true" />
                <span className="et-nav__label">{s.label}</span>
              </a>
            </li>
          ))}
        </ol>

        <p className="et-nav__carnet" title="Stations du plan déjà ouvertes">
          <span className="et-nav__carnet-k">Carnet</span>
          <span className="et-nav__carnet-v">
            {visited}/{total}
          </span>
        </p>
      </div>
      <div className="et-nav__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${active < 0 ? 0 : (active + 1) / SECTIONS.length})` }} />
      </div>
    </nav>
  );
}
