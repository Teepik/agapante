/** Comptes du groupe : ce que chaque famille a « payé » en conduisant, sa part, et les virements qui équilibrent tout. */

export type FamilyStat = { id: string; last_name: string; points: number; children: number };
export type Balance = FamilyStat & { paid: number; share: number; settled: number; balance: number };
export type Transfer = { from: string; to: string; amount: number };

const r2 = (n: number) => Math.round(n * 100) / 100;

export function computeBalances(
  rows: FamilyStat[], costPerPoint: number, split: "family" | "child",
  settlements: { from_membership_id: string; to_membership_id: string; amount: number | string }[],
): Balance[] {
  const total = rows.reduce((s, r) => s + r.points, 0) * costPerPoint;
  const weights = rows.map(r => (split === "child" ? r.children : 1));
  const wsum = weights.reduce((a, b) => a + b, 0) || 1;
  const settled = new Map<string, number>();
  for (const s of settlements) {
    const a = Number(s.amount);
    settled.set(s.from_membership_id, (settled.get(s.from_membership_id) ?? 0) + a);
    settled.set(s.to_membership_id, (settled.get(s.to_membership_id) ?? 0) - a);
  }
  return rows.map((r, i) => {
    const paid = r2(r.points * costPerPoint);
    const share = r2(total * weights[i] / wsum);
    const st = r2(settled.get(r.id) ?? 0);
    return { ...r, paid, share, settled: st, balance: r2(paid - share + st) };
  });
}

/** Règlement en un minimum de virements : les débiteurs paient les créditeurs, du plus gros au plus petit. */
export function settle(balances: Balance[]): Transfer[] {
  const creditors = balances.filter(b => b.balance > 0.005).map(b => ({ id: b.id, left: b.balance })).sort((a, b) => b.left - a.left);
  const debtors = balances.filter(b => b.balance < -0.005).map(b => ({ id: b.id, left: -b.balance })).sort((a, b) => b.left - a.left);
  const out: Transfer[] = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const amount = r2(Math.min(debtors[i].left, creditors[j].left));
    if (amount > 0) out.push({ from: debtors[i].id, to: creditors[j].id, amount });
    debtors[i].left = r2(debtors[i].left - amount);
    creditors[j].left = r2(creditors[j].left - amount);
    if (debtors[i].left <= 0.005) i++;
    if (creditors[j].left <= 0.005) j++;
  }
  return out;
}

export const euros = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
