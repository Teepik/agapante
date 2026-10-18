import type { ReactNode, SVGProps } from "react";
import { lineById, type LineId } from "@/lib/etudes/lines";

/** Pastille de ligne : le numéro dans un rond, comme sur un plan de métro. */
export function Bullet({
  line,
  size = "md",
  className = "",
}: {
  line: LineId | "u";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  if (line === "u") {
    return (
      <span className={`et-bullet et-bullet--u et-bullet--${size} ${className}`} aria-hidden="true">
        U
      </span>
    );
  }
  return (
    <span data-line={line} className={`et-bullet et-bullet--${size} ${className}`} aria-hidden="true">
      {lineById[line].num}
    </span>
  );
}

/** Nom de ligne lisible par un lecteur d'écran. */
export function lineLabel(line: LineId | "u"): string {
  if (line === "u") return "ligne U, l'université";
  const l = lineById[line];
  return `ligne ${l.num}, ${l.name}`;
}

/** Plaque émaillée : le titre d'une section, comme le nom d'une station sur le quai. */
export function Plaque({
  as: Tag = "h2",
  children,
  id,
  size = "md",
}: {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  id?: string;
  size?: "md" | "lg";
}) {
  return (
    <Tag id={id} className={`et-plaque et-plaque--${size}`}>
      <span className="et-plaque__inner">{children}</span>
    </Tag>
  );
}

/** Jauge de sélectivité en cinq crans. */
export function Gauge({ value, label }: { value: number; label?: string }) {
  return (
    <span className="et-gauge" role="img" aria-label={label ?? `Sélectivité ${value} sur 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= value ? "et-gauge__step is-on" : "et-gauge__step"} />
      ))}
    </span>
  );
}

export type IconName =
  | "close"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "arrow-down"
  | "compass"
  | "clock"
  | "coins"
  | "seat"
  | "key"
  | "flag"
  | "briefcase"
  | "lightbulb"
  | "check"
  | "search"
  | "map"
  | "list"
  | "refresh"
  | "external"
  | "pin"
  | "route"
  | "ticket"
  | "door"
  | "book"
  | "menu";

const paths: Record<IconName, ReactNode> = {
  close: <path d="M6 6l12 12M18 6L6 18" />,
  "chevron-left": <path d="M15 5l-7 7 7 7" />,
  "chevron-right": <path d="M9 5l7 7-7 7" />,
  "chevron-down": <path d="M5 9l7 7 7-7" />,
  "arrow-down": <path d="M12 4v16M5 13l7 7 7-7" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="9" cy="7" rx="6" ry="2.6" />
      <path d="M3 7v4c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6V7" />
      <path d="M9 13.6v3.8c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-4c0-1.4-2.7-2.6-6-2.6" />
    </>
  ),
  seat: (
    <>
      <path d="M7 4v9a2 2 0 002 2h7" />
      <path d="M7 11h6a2 2 0 012 2v6" />
      <path d="M5 20h4M15 20h4" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l8-8M16 7l2 2M14 9l2 2" />
    </>
  ),
  flag: <path d="M5 21V4h11l-2 4 2 4H5" />,
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0012 3z" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  map: (
    <>
      <path d="M9 4L3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5z" />
      <path d="M9 4v13.5M15 6.5V20" />
    </>
  ),
  list: <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />,
  refresh: (
    <>
      <path d="M20 11a8 8 0 10-2.3 6.6" />
      <path d="M20 4v7h-7" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H15a3 3 0 000-6H9a3 3 0 010-6h6.5" />
    </>
  ),
  ticket: (
    <>
      <path d="M4 7h16v3a2 2 0 000 4v3H4v-3a2 2 0 000-4z" />
      <path d="M14 7v10" strokeDasharray="2 2" />
    </>
  ),
  door: (
    <>
      <path d="M5 21h14M7 21V4h10v17" />
      <path d="M14 12h.01" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 016.5 3H20v15H6.5A2.5 2.5 0 004 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 006.5 23H20v-5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};

export function Icon({ name, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
