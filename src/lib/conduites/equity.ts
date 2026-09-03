/**
 * Comptes du groupe — partage exact des frais, trajet par trajet.
 *
 * Principe : chaque trajet a un coût réel (coût par défaut du groupe, ou coût du jour, plus frais annexes : parking, péage…).
 * Ce coût est partagé entre les familles dont les enfants étaient réellement dans la voiture (places attribuées), la famille
 * du conducteur comprise si ses enfants voyagent. Le conducteur avance le coût ; chaque autre famille lui doit sa part.
 * Les dettes sont donc connues famille par famille et à tout moment : on peut solder ses comptes quand on veut.
 * Tous les calculs se font en centimes, avec répartition des centimes restants (jamais de centime perdu).
 */
import type { AccountRow, AccountMember } from "./db";

export type Split = "family" | "child";
export type Share = { membership: string; children: number; cents: number };
export type TripAccount = {
  id: string; date: string; direction: "aller" | "retour"; driver: string; totalCents: number; seats: number | null; done: boolean;
  shares: Share[];          // parts de chaque famille transportée (conducteur compris), en centimes
  waiting: number;          // enfants restés en liste d'attente (non comptés)
};
export type FamilyAccount = {
  id: string; last_name: string; first_name: string; left: boolean; children: number;
  advanced: number;  // total des trajets conduits (ce que la famille a payé de sa poche)
  consumed: number;  // total de ses parts (ce qu'elle a réellement consommé)
  settledOut: number; settledIn: number;
  balance: number;   // > 0 : on lui doit ; < 0 : elle doit
  drives: number; rides: number;
};
export type Debt = { from: string; to: string; amount: number };
export type Transfer = Debt;

const cents = (n: number | string) => Math.round(Number(n) * 100);
export const fromCents = (c: number) => Math.round(c) / 100;

/** Répartit `total` centimes en parts pondérées, en distribuant les centimes de reste aux plus grands restes. */
export function splitCents(total: number, weights: number[]): number[] {
  const wsum = weights.reduce((a, b) => a + b, 0);
  if (wsum <= 0) return weights.map(() => 0);
  const raw = weights.map(w => (total * w) / wsum);
  const base = raw.map(Math.floor);
  let rest = total - base.reduce((a, b) => a + b, 0);
  const order = raw.map((r, i) => ({ i, frac: r - base[i] })).sort((a, b) => b.frac - a.frac || a.i - b.i);
  for (const o of order) { if (rest <= 0) break; base[o.i]++; rest--; }
  return base;
}

/** Regroupe les lignes SQL (une par passager) en trajets, et calcule la part de chaque famille. */
export function buildTrips(rows: AccountRow[], split: Split): TripAccount[] {
  const byTrip = new Map<string, { row: AccountRow; riders: { child: string; membership: string }[] }>();
  for (const r of rows) {
    let t = byTrip.get(r.id);
    if (!t) { t = { row: r, riders: [] }; byTrip.set(r.id, t); }
    if (r.child_id && r.membership_id) t.riders.push({ child: r.child_id, membership: r.membership_id });
  }
  const out: TripAccount[] = [];
  for (const { row, riders } of byTrip.values()) {
    const seats = row.seats == null ? null : Number(row.seats);
    const inCar = seats == null ? riders : riders.slice(0, seats);   // ordre déjà trié : enfants du conducteur d'abord
    const waiting = riders.length - inCar.length;
    const perFamily = new Map<string, number>();
    for (const p of inCar) perFamily.set(p.membership, (perFamily.get(p.membership) ?? 0) + 1);
    const fams = [...perFamily.entries()];
    const totalCents = cents(row.total);
    const parts = splitCents(totalCents, fams.map(([, n]) => (split === "child" ? n : 1)));
    const shares: Share[] = fams.map(([membership, children], i) => ({ membership, children, cents: parts[i] }));
    out.push({ id: row.id, date: row.date, direction: row.direction, driver: row.driver_membership_id, totalCents, seats, done: !!row.done, shares, waiting });
  }
  return out;
}

export type Accounts = {
  trips: TripAccount[];
  families: FamilyAccount[];
  /** Dette nette de chaque paire, après règlements : `debts` ne contient que des montants > 0, une entrée par sens. */
  debts: Debt[];
  /** Même chose en un minimum de virements pour tout le groupe. */
  simplified: Transfer[];
  totalCents: number;
};

export function computeAccounts(
  rows: AccountRow[], members: AccountMember[], split: Split,
  settlements: { from_membership_id: string; to_membership_id: string; amount: number | string }[],
): Accounts {
  const trips = buildTrips(rows, split);
  const fam = new Map<string, FamilyAccount>();
  for (const m of members) fam.set(m.id, { id: m.id, last_name: m.last_name, first_name: m.first_name, left: !!m.left_at, children: m.children, advanced: 0, consumed: 0, settledOut: 0, settledIn: 0, balance: 0, drives: 0, rides: 0 });
  const get = (id: string) => { let f = fam.get(id); if (!f) { f = { id, last_name: "?", first_name: "", left: true, children: 0, advanced: 0, consumed: 0, settledOut: 0, settledIn: 0, balance: 0, drives: 0, rides: 0 }; fam.set(id, f); } return f; };

  // pair[a][b] = ce que a doit à b, en centimes (brut, avant compensation)
  const pair = new Map<string, number>();
  const add = (a: string, b: string, c: number) => { if (a !== b && c) pair.set(`${a}|${b}`, (pair.get(`${a}|${b}`) ?? 0) + c); };

  for (const t of trips) {
    const d = get(t.driver);
    d.advanced += t.totalCents; d.drives++;
    for (const s of t.shares) {
      const f = get(s.membership);
      f.consumed += s.cents; if (s.membership !== t.driver) f.rides++;
      add(s.membership, t.driver, s.cents);
    }
    // Personne dans la voiture : le conducteur supporte seul le coût (rien à partager).
    if (t.shares.length === 0) d.consumed += t.totalCents;
  }
  for (const s of settlements) {
    const c = cents(s.amount);
    get(s.from_membership_id).settledOut += c; get(s.to_membership_id).settledIn += c;
    add(s.to_membership_id, s.from_membership_id, c); // un règlement de A vers B réduit la dette de A envers B (= B « doit » ce montant à A)
  }

  const debts: Debt[] = [];
  const seen = new Set<string>();
  for (const key of pair.keys()) {
    const [a, b] = key.split("|");
    const k = a < b ? `${a}|${b}` : `${b}|${a}`;
    if (seen.has(k)) continue; seen.add(k);
    const net = (pair.get(`${a}|${b}`) ?? 0) - (pair.get(`${b}|${a}`) ?? 0);
    if (net > 0) debts.push({ from: a, to: b, amount: fromCents(net) });
    else if (net < 0) debts.push({ from: b, to: a, amount: fromCents(-net) });
  }
  debts.sort((x, y) => y.amount - x.amount);

  const families = [...fam.values()].map(f => ({
    ...f,
    advanced: fromCents(f.advanced), consumed: fromCents(f.consumed), settledOut: fromCents(f.settledOut), settledIn: fromCents(f.settledIn),
    balance: fromCents(f.advanced - f.consumed + f.settledOut - f.settledIn),
  })).sort((a, b) => Number(a.left) - Number(b.left) || a.last_name.localeCompare(b.last_name, "fr"));

  return { trips, families, debts, simplified: settle(families), totalCents: trips.reduce((s, t) => s + t.totalCents, 0) };
}

/** Règlement en un minimum de virements : les débiteurs paient les créditeurs, du plus gros au plus petit. */
export function settle(balances: { id: string; balance: number }[]): Transfer[] {
  const creditors = balances.filter(b => b.balance > 0.005).map(b => ({ id: b.id, left: cents(b.balance) })).sort((a, b) => b.left - a.left);
  const debtors = balances.filter(b => b.balance < -0.005).map(b => ({ id: b.id, left: cents(-b.balance) })).sort((a, b) => b.left - a.left);
  const out: Transfer[] = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(debtors[i].left, creditors[j].left);
    if (amount > 0) out.push({ from: debtors[i].id, to: creditors[j].id, amount: fromCents(amount) });
    debtors[i].left -= amount; creditors[j].left -= amount;
    if (debtors[i].left <= 0) i++;
    if (creditors[j].left <= 0) j++;
  }
  return out;
}

export const euros = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
export const signed = (n: number) => (n > 0 ? "+" : "") + euros(n);
