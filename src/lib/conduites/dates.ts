export const DIRECTION_LABEL: Record<string, string> = { aller: "Aller vers l'école", retour: "Retour à la maison" };
export const DIRECTION_SHORT: Record<string, string> = { aller: "Aller", retour: "Retour" };

const d12 = (iso: string) => new Date(iso + "T12:00:00");
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function fmtDate(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: "long", day: "numeric", month: "long" }) {
  return cap(d12(iso).toLocaleDateString("fr-FR", opts));
}
export function fmtDay(iso: string) { return d12(iso).getDate(); }
export function fmtWeekday(iso: string) { return d12(iso).toLocaleDateString("fr-FR", { weekday: "short" }).replace(".", ""); }
export function fmtMonth(iso: string) { return cap(d12(iso).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })); }
export function fmtShort(iso: string) { return d12(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }).replace(".", ""); }

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}
export function addDays(iso: string, n: number): string {
  const d = d12(iso); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10);
}
export function daysBetween(a: string, b: string) {
  return Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
}

/** Groupe les trajets par week-end : un retour (ven/sam) ouvre un groupe, les allers suivants s'y rattachent. */
export function groupByWeekend<T extends { date: string; direction: string }>(trips: T[]): { key: string; trips: T[] }[] {
  const groups: { key: string; trips: T[] }[] = [];
  for (const t of trips) {
    const last = groups[groups.length - 1];
    const dow = d12(t.date).getDay();
    const startsGroup = !last || t.direction === "retour" || dow === 5 || dow === 6 || daysBetween(last.trips[0].date, t.date) > 5;
    if (startsGroup) groups.push({ key: t.date, trips: [t] });
    else last.trips.push(t);
  }
  return groups;
}

export function groupByMonth<T extends { key: string }>(weekends: T[]): { month: string; label: string; weekends: T[] }[] {
  const out: { month: string; label: string; weekends: T[] }[] = [];
  for (const w of weekends) {
    const month = w.key.slice(0, 7);
    const last = out[out.length - 1];
    if (last && last.month === month) last.weekends.push(w);
    else out.push({ month, label: fmtMonth(w.key), weekends: [w] });
  }
  return out;
}

/** Génère les dates vendredi (retour) + dimanche (aller) entre deux dates. */
export function generateWeekends(from: string, to: string): { date: string; direction: "aller" | "retour" }[] {
  const out: { date: string; direction: "aller" | "retour" }[] = [];
  const d = d12(from);
  const end = d12(to);
  while (d <= end) {
    const dow = d.getDay();
    const iso = d.toISOString().slice(0, 10);
    if (dow === 5) out.push({ date: iso, direction: "retour" });
    if (dow === 0) out.push({ date: iso, direction: "aller" });
    d.setDate(d.getDate() + 1);
  }
  return out;
}

/** Année scolaire courante : du 1er août au 31 juillet. */
export function schoolYear(d = today()) {
  const y = Number(d.slice(0, 4));
  const start = d >= `${y}-08-01` ? y : y - 1;
  return { from: `${start}-08-01`, to: `${start + 1}-07-31`, label: `${start}–${start + 1}` };
}

export const plural = (n: number, s: string, p = s + "s") => `${n} ${n > 1 ? p : s}`;
