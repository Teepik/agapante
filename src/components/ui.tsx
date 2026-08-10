import Link from "next/link";
import type { ReactNode } from "react";

/* ---------- Buttons ---------- */

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "quiet";
  className?: string;
  prefetch?: boolean;
};

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full text-[0.94rem] font-medium transition-all duration-300 px-6 py-3.5 whitespace-nowrap";

  const styles: Record<string, string> = {
    primary:
      "bg-chalk text-ink-950 hover:bg-iris-100 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_18px_40px_-18px_rgba(139,147,248,0.65)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_22px_50px_-16px_rgba(139,147,248,0.85)]",
    ghost:
      "border border-ink-600 text-chalk hover:border-iris-400/60 hover:bg-iris-400/[0.07]",
    quiet: "text-chalk-dim hover:text-chalk px-0 py-1",
  };

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      <Arrow />
    </Link>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 ${className}`}
    >
      <path
        d="M2 8h11m0 0L9 4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Section heading ---------- */

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}
    >
      {eyebrow ? (
        <p className="eyebrow mb-5 flex items-center gap-3">
          {align === "left" ? (
            <span className="inline-block h-px w-8 bg-iris-400/60" aria-hidden="true" />
          ) : null}
          {eyebrow}
        </p>
      ) : null}
      <h2 className="display text-[clamp(2rem,4.4vw,3.4rem)] text-chalk">{title}</h2>
      {lede ? (
        <p className="mt-6 text-[1.06rem] leading-relaxed text-mute md:text-[1.15rem]">{lede}</p>
      ) : null}
    </div>
  );
}

/* ---------- Breadcrumbs ---------- */

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-[0.78rem] text-mute-dim">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {i === items.length - 1 ? (
              <span className="text-mute">{item.name}</span>
            ) : (
              <Link href={item.path} className="transition-colors hover:text-chalk-dim">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ---------- Misc ---------- */

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-800/60 px-3.5 py-1.5 text-[0.74rem] font-medium tracking-wide text-chalk-dim backdrop-blur">
      {children}
    </span>
  );
}

export function Dot() {
  return (
    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-400 opacity-70" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sage-400" />
    </span>
  );
}

export function Hairline({ className = "" }: { className?: string }) {
  return <div className={`hairline ${className}`} aria-hidden="true" />;
}
