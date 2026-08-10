export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="marquee relative overflow-hidden py-6"
      style={{
        maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }}
      aria-hidden="true"
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 whitespace-nowrap px-8 text-[0.9rem] uppercase tracking-[0.16em] text-mute-dim"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-iris-500/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
