import type { ReactNode, SVGProps } from "react";
import type { LaneId } from "@/lib/etudes/lines";

/** Pastille de couleur d'une voie. */
export function Dot({ line, className = "" }: { line: LaneId; className?: string }) {
  if (line === "u") return <span className={`e-dot e-dot--u ${className}`} aria-hidden="true" />;
  return <span className={`e-dot ${className}`} data-line={line} aria-hidden="true" />;
}

/** Jauge en cinq crans (sélectivité, exigence). */
export function Meter({ value, label, line }: { value: number; label: string; line?: LaneId }) {
  return (
    <span className="e-meter" role="img" aria-label={label} data-line={line}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= value ? "is-on" : undefined} />
      ))}
    </span>
  );
}

/** Le symbole de la page : un tronc qui monte et se ramifie. */
export function BrandMark() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      <rect width="28" height="28" rx="8" fill="currentColor" />
      <path
        d="M14 23v-7m0 0c0-3-5-3.5-5-7V5m5 11V5m0 11c0-3 5-3.5 5-7V5"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type IconName =
  | "close"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "arrow-up"
  | "search"
  | "bookmark"
  | "check"
  | "map"
  | "refresh"
  | "route"
  | "station"
  | "school"
  | "cap"
  | "book"
  | "external"
  | "menu"
  | "pin"
  | "clock"
  | "coins"
  | "seat"
  | "key"
  | "flag"
  | "lightbulb"
  | "briefcase"
  | "door"
  | "compass"
  | "list"
  | "arrow-down"
  | "ticket"
  | "locate";

const paths: Record<IconName, ReactNode> = {
  close: <path d="M6 6l12 12M18 6L6 18" />,
  "chevron-left": <path d="M15 5l-7 7 7 7" />,
  "chevron-right": <path d="M9 5l7 7-7 7" />,
  "chevron-down": <path d="M5 9l7 7 7-7" />,
  "arrow-up": <path d="M12 19V5M6 11l6-6 6 6" />,
  "arrow-down": <path d="M12 5v14M6 13l6 6 6-6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  bookmark: <path d="M7 4h10a1 1 0 011 1v15.5l-6-4-6 4V5a1 1 0 011-1z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  map: (
    <>
      <path d="M9 4L3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5z" />
      <path d="M9 4v13.5M15 6.5V20" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 11a8 8 0 10-2.3 6.6" />
      <path d="M20 4v7h-7" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18H15a3 3 0 000-6H9a3 3 0 010-6h6.5" />
    </>
  ),
  station: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v5M12 16v5" />
    </>
  ),
  school: (
    <>
      <path d="M4 20V10l8-5 8 5v10" />
      <path d="M9.5 20v-5h5v5M3 20h18" />
    </>
  ),
  cap: (
    <>
      <path d="M2.5 9.5L12 5l9.5 4.5L12 14z" />
      <path d="M6.5 11.5v4.5c3 2.2 8 2.2 11 0v-4.5M21.5 9.5v5" />
    </>
  ),
  book: (
    <>
      <path d="M5 4.5A1.5 1.5 0 016.5 3H19v15H6.5A1.5 1.5 0 005 19.5z" />
      <path d="M5 19.5A1.5 1.5 0 006.5 21H19" />
    </>
  ),
  external: (
    <>
      <path d="M14 5h5v5M19 5l-8 8" />
      <path d="M18 14v4a1 1 0 01-1 1H6a1 1 0 01-1-1V7a1 1 0 011-1h4" />
    </>
  ),
  menu: <path d="M4 8h16M4 16h16" />,
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0113 0c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
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
      <path d="M7 11h6a2 2 0 012 2v6M5 20h4M15 20h4" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l8-8M16 7l2 2M14 9l2 2" />
    </>
  ),
  flag: <path d="M5 21V4h11l-2 4 2 4H5" />,
  lightbulb: (
    <>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0012 3z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18" />
    </>
  ),
  door: (
    <>
      <path d="M5 21h14M7 21V4h10v17" />
      <path d="M14 12h.01" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  list: <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />,
  ticket: (
    <>
      <path d="M4 7h16v3a2 2 0 000 4v3H4v-3a2 2 0 000-4z" />
      <path d="M14 7v10" />
    </>
  ),
  locate: (
    <>
      <circle cx="12" cy="12" r="6.5" />
      <circle cx="12" cy="12" r="1.8" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
    </>
  ),
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
