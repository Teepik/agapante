/** L'essentiel d'un texte : ses premières phrases, jusqu'à environ `max` signes. */
export function essentiel(text: string, max = 220): string {
  const phrases = text.split(/(?<=[.!?])\s+/);
  let out = phrases[0] ?? text;
  for (const p of phrases.slice(1)) {
    if (out.length + p.length + 1 > max) break;
    out = `${out} ${p}`;
  }
  return out;
}
