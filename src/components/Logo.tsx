export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  // Umbelle stylisée — inspirée de l'agapanthe : une tige, une ombelle de rayons.
  const rays = Array.from({ length: 9 }, (_, i) => {
    const angle = (-90 + (i - 4) * 22) * (Math.PI / 180);
    const r1 = 3.4;
    const r2 = 10.4;
    return {
      x1: 16 + Math.cos(angle) * r1,
      y1: 15 + Math.sin(angle) * r1,
      x2: 16 + Math.cos(angle) * r2,
      y2: 15 + Math.sin(angle) * r2,
    };
  });

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="agapante-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9ceff" />
          <stop offset="55%" stopColor="#8b93f8" />
          <stop offset="100%" stopColor="#6f77e8" />
        </linearGradient>
      </defs>
      {rays.map((r, i) => (
        <g key={i}>
          <line
            x1={r.x1}
            y1={r.y1}
            x2={r.x2}
            y2={r.y2}
            stroke="url(#agapante-mark)"
            strokeWidth="1.15"
            strokeLinecap="round"
            opacity={0.85}
          />
          <circle cx={r.x2} cy={r.y2} r="1.5" fill="url(#agapante-mark)" />
        </g>
      ))}
      <path
        d="M16 15v13"
        stroke="url(#agapante-mark)"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="16" cy="15" r="1.6" fill="#e7e9ff" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Mark />
      <span className="display text-[1.32rem] tracking-[0.01em] text-chalk">Agapante</span>
    </span>
  );
}
