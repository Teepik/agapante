/** Pastille d'initiales, teinte stable dérivée du nom. */
export function hueOf(name: string) {
  let h = 0;
  for (const ch of name.toLowerCase()) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return h;
}

export function Avatar({ name, size = 32, className = "", ring = false }: { name: string; size?: number; className?: string; ring?: boolean }) {
  const h = hueOf(name);
  const initials = name.split(/[\s-]+/).filter(Boolean).slice(0, 2).map(p => p[0]!.toUpperCase()).join("") || "?";
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${ring ? "ring-2 ring-surface" : ""} ${className}`}
      style={{
        width: size, height: size, fontSize: Math.round(size * 0.38),
        background: `hsl(${h} 60% 92%)`, color: `hsl(${h} 55% 32%)`,
      }}>
      {initials}
    </span>
  );
}
