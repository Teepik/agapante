"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { mapTexts } from "@/lib/etudes/cohorte";
import type { Bloc, Etape, Guide, Source } from "@/lib/etudes/guides";
import { ClassPicker, CohortProvider, useCohort } from "../cohorte";
import { BrandMark, Icon } from "../ui";

type Props = {
  guide: Guide;
  /** Les outils interactifs, appelés par leur nom depuis un bloc « outil ». */
  outils?: Record<string, ReactNode>;
  /** L'étape du rail où se trouve l'élève aujourd'hui, quand elle se calcule. */
  actif?: (classe: string, aujourdhui: Date) => string | null;
  /** L'autre guide, proposé en bas de page. */
  autre: { href: string; label: string };
};

/** Un guide pas à pas : la classe de l'élève recalcule toutes ses dates. */
export function GuideApp(props: Props) {
  return (
    <CohortProvider>
      <GuidePage {...props} />
    </CohortProvider>
  );
}

function GuidePage({ guide: raw, outils = {}, actif, autre }: Props) {
  const { y, classe } = useCohort();
  const guide = useMemo(() => mapTexts(raw, y), [raw, y]);
  const [ici, setIci] = useState<string | null>(null);
  useEffect(() => setIci(actif ? actif(classe, new Date()) : null), [actif, classe]);

  return (
    <div className="e-guide">
      <header className="e-mbar">
        <Link href="/etudes" className="e-brand e-mbar__brand">
          <BrandMark />
          études
        </Link>
        <div className="e-mbar__class">
          <ClassPicker />
        </div>
        <Link href="/etudes/carte" className="e-btn e-btn--sm e-mbar__full">
          <Icon name="map" /> La carte
        </Link>
      </header>

      <section className="e-ghero">
        <h1 className="e-ghero__title">{guide.titre}</h1>
        <p className="e-ghero__lede">{guide.lede}</p>
        <p className="e-ghero__toi">{guide.pourToi[classe]}</p>
        <Rail etapes={guide.rail} ici={ici} />
      </section>

      <Sommaire sections={guide.sections.map((s) => ({ id: s.id, court: s.court }))} />

      <div className="e-gmain">
        {guide.sections.map((s) => (
          <section key={s.id} id={s.id} className="e-gsec" aria-labelledby={`t-${s.id}`}>
            <h2 id={`t-${s.id}`} className="e-gsec__title">
              {s.titre}
            </h2>
            {s.intro ? <p className="e-gsec__intro">{s.intro}</p> : null}
            {s.blocs.map((b, i) => (
              <BlocView key={i} bloc={b} outils={outils} />
            ))}
            {s.sources?.length ? <SourcesNommees sources={s.sources} /> : null}
          </section>
        ))}
      </div>

      <footer className="e-gfoot">
        <p className="e-small e-muted">{guide.verifie}</p>
        <ul className="e-gfoot__links">
          <li>
            <Link className="e-btn" href={autre.href}>
              {autre.label}
            </Link>
          </li>
          <li>
            <Link className="e-btn" href="/etudes/carte">
              <Icon name="map" /> La carte des études
            </Link>
          </li>
          <li>
            <Link className="e-btn" href="/etudes">
              La page complète
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}

/** Le rail d'ouverture : les grandes étapes comme les stations d'une ligne, avec l'endroit où se trouve l'élève. */
function Rail({ etapes, ici }: { etapes: Etape[]; ici: string | null }) {
  return (
    <ol className="e-grail" style={{ ["--n" as string]: etapes.length }}>
      {etapes.map((e) => {
        const cls = ["e-grail__stop", e.cle ? "is-key" : "", ici === e.id ? "is-here" : ""].filter(Boolean).join(" ");
        const body = (
          <>
            <span className="e-grail__mark" aria-hidden="true" />
            <span className="e-grail__when">{e.quand}</span>
            <span className="e-grail__name">{e.titre}</span>
            <span className="e-grail__text">{e.texte}</span>
            {ici === e.id ? <span className="e-grail__here">Tu es ici</span> : null}
          </>
        );
        return (
          <li key={e.id} className={cls} aria-current={ici === e.id ? "step" : undefined}>
            {e.section ? (
              <a href={`#${e.section}`} className="e-grail__link">
                {body}
              </a>
            ) : (
              <div className="e-grail__link">{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/** Le sommaire, collé sous la barre : la section lue se distingue. */
function Sommaire({ sections }: { sections: { id: string; court: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  // Sur téléphone, la rangée défile : la section lue reste visible.
  useEffect(() => {
    const box = boxRef.current;
    const link = active ? box?.querySelector<HTMLElement>(`a[href="#${active}"]`) : null;
    if (!box || !link || box.scrollWidth <= box.clientWidth) return;
    const left = link.offsetLeft - (box.clientWidth - link.offsetWidth) / 2;
    box.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  return (
    <nav className="e-gtoc" aria-label="Sommaire">
      <div className="e-gtoc__row" ref={boxRef}>
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="e-chip" aria-current={active === s.id ? "true" : undefined}>
            {s.court}
          </a>
        ))}
      </div>
    </nav>
  );
}

/** Les sources d'une section, nommées : on sait ce qu'on ouvre avant de cliquer. */
function SourcesNommees({ sources }: { sources: Source[] }) {
  return (
    <div className="e-gsrc">
      <h3 className="e-gsrc__title">Sources</h3>
      <ul className="e-gsrc__list">
        {sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlocView({ bloc, outils }: { bloc: Bloc; outils: Record<string, ReactNode> }) {
  switch (bloc.type) {
    case "texte":
      return <p className="e-gtext">{bloc.texte}</p>;
    case "etapes":
      return (
        <ol className="e-gsteps">
          {bloc.etapes.map((e) => (
            <li key={e.id} className={e.cle ? "e-gstep is-key" : "e-gstep"}>
              <span className="e-gstep__mark" aria-hidden="true" />
              <p className="e-gstep__when">{e.quand}</p>
              <h3 className="e-gstep__title">{e.titre}</h3>
              <p className="e-gstep__text">{e.texte}</p>
            </li>
          ))}
        </ol>
      );
    case "cartes":
      return (
        <ul className="e-gcards" data-cols={bloc.colonnes ?? 3}>
          {bloc.cartes.map((c) => (
            <li key={c.titre} className="e-gcard" data-line={c.ton}>
              <h3 className="e-gcard__title">{c.titre}</h3>
              {c.sous ? <p className="e-gcard__sub">{c.sous}</p> : null}
              <p className="e-gcard__text">{c.texte}</p>
              {c.lignes?.length ? (
                <dl className="e-gcard__dl">
                  {c.lignes.map((l) => (
                    <div key={l.label}>
                      <dt>{l.label}</dt>
                      <dd>{l.texte}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {c.points?.length ? (
                <ul className="e-gcard__points">
                  {c.points.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      );
    case "faits":
      return (
        <dl className="e-facts e-gfacts">
          {bloc.faits.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.valeur}</dd>
            </div>
          ))}
        </dl>
      );
    case "liste": {
      const Tag = bloc.numerotee ? "ol" : "ul";
      return (
        <div className="e-glist">
          {bloc.titre ? <h3 className="e-glist__title">{bloc.titre}</h3> : null}
          <Tag className={bloc.numerotee ? "e-glist__items is-num" : "e-glist__items"}>
            {bloc.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </Tag>
        </div>
      );
    }
    case "note":
      return (
        <div className="e-gnote" role="note" data-ton={bloc.ton ?? "conseil"}>
          <p className="e-gnote__title">
            <Icon name={bloc.ton === "alt" ? "briefcase" : bloc.ton === "repere" ? "flag" : "lightbulb"} />
            {bloc.titre}
          </p>
          <p>{bloc.texte}</p>
          {bloc.lien ? (
            <p>
              <Link className="e-link e-gnote__link" href={bloc.lien.href}>
                {bloc.lien.label}
              </Link>
            </p>
          ) : null}
        </div>
      );
    case "faq":
      return (
        <div className="e-gfaq">
          {bloc.questions.map((x) => (
            <details key={x.q} className="e-gfaq__item">
              <summary>
                <span>{x.q}</span>
                <Icon name="plus" />
              </summary>
              <p>{x.r}</p>
            </details>
          ))}
        </div>
      );
    case "tableau":
      return (
        <div className="e-gtable" role="region" aria-label={bloc.legende} tabIndex={0}>
          <table>
            <caption>{bloc.legende}</caption>
            <thead>
              <tr>
                {bloc.colonnes.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloc.lignes.map((l) => (
                <tr key={l.join("|")}>
                  {l.map((c, i) =>
                    i === 0 ? (
                      <th key={i} scope="row">
                        {c}
                      </th>
                    ) : (
                      <td key={i}>{c}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "paliers":
      return (
        <figure className="e-gstairs">
          <figcaption className="e-gstairs__title">{bloc.titre}</figcaption>
          <ol className="e-gstairs__list" style={{ ["--n" as string]: bloc.paliers.length }}>
            {bloc.paliers.map((x, i) => (
              <li key={x.label} className="e-gstairs__step" style={{ ["--i" as string]: i + 1 }}>
                <span className="e-gstairs__bar" aria-hidden="true" />
                <span className="e-gstairs__seuil">{x.seuil}</span>
                <strong className="e-gstairs__label">{x.label}</strong>
                {x.detail ? <span className="e-gstairs__detail">{x.detail}</span> : null}
              </li>
            ))}
          </ol>
        </figure>
      );
    case "outil":
      return <div className="e-gtool">{outils[bloc.outil] ?? null}</div>;
  }
}
