import Link from "next/link";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <span className="inline-flex items-center justify-center rounded-[9px] bg-accent text-white shadow-[inset_0_1px_0_rgb(255_255_255/.2)]" style={{ width: size, height: size }} aria-hidden>
      <svg viewBox="0 0 24 24" width={size * 0.62} height={size * 0.62} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 16h14M4 12l1.6-4.6A2 2 0 0 1 7.5 6h9a2 2 0 0 1 1.9 1.4L20 12v5H4v-5Z" /><circle cx="8" cy="16.5" r="1.2" fill="currentColor" stroke="none" /><circle cx="16" cy="16.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

export function Wordmark({ href = "/conduites" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5 font-semibold tracking-[-0.01em] text-ink">
      <Logo /> Conduites
    </Link>
  );
}

/** Coquille des pages d'authentification. */
export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle?: string; children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[420px] flex-col px-5 py-8 sm:py-14">
      <div className="mb-8"><Wordmark /></div>
      <div className="animate-rise">
        <h1 className="h1">{title}</h1>
        {subtitle && <p className="mt-2 text-[15px] text-ink-2">{subtitle}</p>}
        <div className="mt-7">{children}</div>
      </div>
      {footer && <p className="mt-8 text-center text-[14px] text-ink-2">{footer}</p>}
    </div>
  );
}
