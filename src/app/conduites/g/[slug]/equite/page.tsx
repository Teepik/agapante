import Link from "next/link";
import { requireGroup } from "@/lib/conduites/auth";
import { equityStats, count, listSettlements, listMembers } from "@/lib/conduites/db";
import { schoolYear, today, plural, fmtDate } from "@/lib/conduites/dates";
import { computeBalances, settle, euros } from "@/lib/conduites/equity";
import { recordSettlement, deleteSettlement } from "@/lib/conduites/actions";
import { ActionForm, SubmitButton, Field, ConfirmSubmit } from "@/components/conduites/ui";
import { Avatar } from "@/components/conduites/avatar";
import { IconArrowRight } from "@/components/conduites/icons";

export const dynamic = "force-dynamic";
export const metadata = { title: "Équité" };

export default async function EquityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { group, membership, isAdmin } = await requireGroup(slug);
  const sy = schoolYear();
  const rows = await equityStats(group.id, sy.from, sy.to);
  const max = Math.max(1, ...rows.map(r => r.points));
  const total = rows.reduce((s, r) => s + r.points, 0);
  const avg = rows.length ? total / rows.length : 0;
  const open = await count(
    "SELECT COUNT(*) AS n FROM conduites_trips WHERE group_id = $1 AND NOT cancelled AND driver_membership_id IS NULL AND driver_name IS NULL AND date >= $2::date AND date <= $3::date",
    [group.id, today(), sy.to]);
  const me = rows.find(r => r.id === membership.id);
  const delta = me ? me.points - avg : 0;

  // Comptes
  const cost = Number(group.cost_per_point) || 0;
  const settlements = cost > 0 ? await listSettlements(group.id, sy.from, sy.to) : [];
  const balances = computeBalances(rows, group.split, settlements);
  const transfers = settle(balances);
  const name = (id: string) => rows.find(r => r.id === id)?.last_name ?? "?";
  const members = cost > 0 ? await listMembers(group.id) : [];
  const myBalance = balances.find(b => b.id === membership.id)?.balance ?? 0;

  return (
    <div className="space-y-5">
      <div className="animate-rise">
        <h1 className="h1">Équité</h1>
        <p className="mt-1 text-[14px] text-ink-2">Année scolaire {sy.label}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 animate-rise">
        <Stat label="Points au total" value={total} />
        <Stat label="Moyenne / famille" value={avg.toFixed(1)} />
        <Stat label="À pourvoir" value={open} tone={open > 0 ? "warn" : "good"} />
      </div>

      {me && rows.length > 1 && (
        <p className="rounded-[14px] bg-raised px-4 py-3 text-[14px] text-ink-2 animate-rise">
          {Math.abs(delta) < 0.5
            ? "Vous êtes dans la moyenne du groupe."
            : delta > 0 ? `Vous avez ${delta.toFixed(1)} point${delta >= 2 ? "s" : ""} de plus que la moyenne — merci !`
            : `Il vous manque ${(-delta).toFixed(1)} point${-delta >= 2 ? "s" : ""} pour rejoindre la moyenne.`}
        </p>
      )}

      <div className="card divide-rows overflow-hidden animate-rise">
        {rows.map((r, i) => {
          const isMe = r.id === membership.id;
          return (
            <div key={r.id} className={`flex items-center gap-3 px-4 py-3 sm:px-5 ${isMe ? "bg-accent-soft/40" : ""}`}>
              <span className="w-5 text-right text-[13px] tabular text-ink-3">{i + 1}</span>
              <Avatar name={r.last_name} size={32} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-[15px] font-medium">{r.last_name}{isMe && <span className="ml-1.5 text-[12px] font-normal text-accent">vous</span>}</span>
                  <span className="text-[15px] font-semibold tabular">{r.points} <span className="text-[12px] font-normal text-ink-3">pt{r.points > 1 ? "s" : ""}</span></span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-raised">
                  <div className={`h-full rounded-full transition-all ${isMe ? "bg-accent" : "bg-ink-3/50"}`} style={{ width: `${(r.points / max) * 100}%` }} />
                </div>
                <div className="mt-1 text-[12px] text-ink-3">{plural(r.trips, "conduite")} · {plural(r.children, "enfant")}</div>
              </div>
            </div>
          );
        })}
        {rows.length === 0 && <p className="px-5 py-8 text-center text-[14px] text-ink-2">Aucune famille dans le groupe.</p>}
      </div>

      {/* ---- Comptes ---- */}
      <section className="space-y-3 pt-2 animate-rise" id="comptes">
        <div>
          <h2 className="h1 !text-[22px]">Comptes</h2>
          <p className="mt-1 text-[14px] text-ink-2">
            {cost > 0
              ? <>Un trajet simple vaut <strong>{euros(cost)}</strong> par défaut (un admin peut ajuster le coût d'un trajet précis depuis sa fiche), frais répartis {group.split === "child" ? "au prorata des enfants" : "à parts égales entre familles"}. Chaque famille « avance » ce qu'elle conduit ; les virements ci-dessous remettent tout le monde à égalité.</>
              : "Pour calculer qui doit combien à qui, il faut d'abord fixer le coût d'un trajet simple."}
          </p>
        </div>

        {cost <= 0 ? (
          <div className="card card-pad text-[14px] text-ink-2">
            {isAdmin
              ? <>Indiquez le coût d'un trajet dans les <Link href={`/conduites/g/${slug}/admin`} className="font-medium text-accent">réglages du groupe</Link> (par exemple le carburant et le péage d'un aller simple, divisés par une voiture).</>
              : "Un administrateur du groupe doit indiquer le coût d'un trajet dans les réglages."}
          </div>
        ) : (
          <>
            {me && (
              <div className={`card card-pad flex items-center gap-4 ${myBalance > 0.005 ? "bg-good-soft/40" : myBalance < -0.005 ? "bg-warn-soft/40" : ""}`}>
                <div className="min-w-0 flex-1">
                  <div className="kicker">Votre solde</div>
                  <div className={`mt-0.5 text-[26px] font-semibold tabular leading-tight ${myBalance > 0.005 ? "text-good" : myBalance < -0.005 ? "text-warn" : ""}`}>
                    {myBalance > 0 ? "+" : ""}{euros(myBalance)}
                  </div>
                  <div className="mt-1 text-[13px] text-ink-2">
                    {myBalance > 0.005 ? "On vous doit cette somme." : myBalance < -0.005 ? "Vous devez cette somme au groupe." : "Vous êtes à jour."}
                  </div>
                </div>
              </div>
            )}

            <div className="card overflow-hidden">
              <div className="card-pad pb-3"><h3 className="h2">Virements à faire</h3></div>
              {transfers.length === 0 ? (
                <p className="border-t border-line px-5 py-6 text-center text-[14px] text-good sm:px-6">Les comptes sont équilibrés.</p>
              ) : (
                <ul className="divide-rows border-t border-line">
                  {transfers.map((t, i) => {
                    const meInvolved = t.from === membership.id || t.to === membership.id;
                    const canRecord = isAdmin || t.from === membership.id;
                    return (
                      <li key={i} className={`flex flex-wrap items-center gap-3 px-5 py-3.5 sm:px-6 ${meInvolved ? "bg-accent-soft/30" : ""}`}>
                        <span className="inline-flex items-center gap-2 text-[15px]">
                          <Avatar name={name(t.from)} size={26} /> <span className="font-medium">{name(t.from)}</span>
                          <IconArrowRight width={16} height={16} className="text-ink-3" />
                          <Avatar name={name(t.to)} size={26} /> <span className="font-medium">{name(t.to)}</span>
                        </span>
                        <span className="ml-auto text-[17px] font-semibold tabular">{euros(t.amount)}</span>
                        {canRecord && (
                          <ActionForm action={recordSettlement} className="!space-y-0">
                            <input type="hidden" name="slug" value={slug} /><input type="hidden" name="from" value={t.from} />
                            <input type="hidden" name="to" value={t.to} /><input type="hidden" name="amount" value={t.amount} />
                            <ConfirmSubmit variant="secondary" confirmLabel="Confirmer le règlement">Réglé</ConfirmSubmit>
                          </ActionForm>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="card overflow-hidden">
              <div className="card-pad pb-3">
                <h3 className="h2">Détail par famille</h3>
                <p className="mt-1 text-[13px] text-ink-2">Avancé = somme des conduites (points × coût du jour). Part = ce que chacun doit au total. Solde positif : on vous doit ; négatif : vous devez.</p>
              </div>
              <div className="overflow-x-auto border-t border-line">
                <table className="w-full min-w-[520px] text-[14px]">
                  <thead className="text-left text-[11px] uppercase tracking-[0.08em] text-ink-3">
                    <tr><th className="px-5 py-2 font-semibold sm:px-6">Famille</th><th className="px-3 py-2 text-right font-semibold">Avancé</th><th className="px-3 py-2 text-right font-semibold">Part</th><th className="px-3 py-2 text-right font-semibold">Réglé</th><th className="px-5 py-2 text-right font-semibold sm:px-6">Solde</th></tr>
                  </thead>
                  <tbody className="divide-rows">
                    {balances.map(b => (
                      <tr key={b.id} className={b.id === membership.id ? "bg-accent-soft/30 font-medium" : ""}>
                        <td className="px-5 py-2.5 sm:px-6"><span className="inline-flex items-center gap-2"><Avatar name={b.last_name} size={22} />{b.last_name}</span></td>
                        <td className="px-3 py-2.5 text-right tabular">{euros(b.paid)}</td>
                        <td className="px-3 py-2.5 text-right tabular">{euros(b.share)}</td>
                        <td className="px-3 py-2.5 text-right tabular text-ink-2">{b.settled ? (b.settled > 0 ? "+" : "") + euros(b.settled) : "—"}</td>
                        <td className={`px-5 py-2.5 text-right tabular font-semibold sm:px-6 ${b.balance > 0.005 ? "text-good" : b.balance < -0.005 ? "text-warn" : ""}`}>{b.balance > 0 ? "+" : ""}{euros(b.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <details className="card overflow-hidden">
              <summary className="card-pad cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="h2">Règlements enregistrés</span> <span className="ml-1 text-[13px] text-ink-3">{settlements.length}</span>
                <span className="block text-[13px] text-ink-2">Enregistrez ici un virement fait en dehors de la liste ci-dessus.</span>
              </summary>
              <div className="border-t border-line">
                {settlements.length > 0 && (
                  <ul className="divide-rows">
                    {settlements.map(s => (
                      <li key={s.id} className="flex flex-wrap items-center gap-3 px-5 py-3 text-[14px] sm:px-6">
                        <span><span className="font-medium">{s.from_last}</span> → <span className="font-medium">{s.to_last}</span>{s.note && <span className="text-ink-2"> · {s.note}</span>}</span>
                        <span className="text-[12px] text-ink-3">{fmtDate(String(s.created_at).slice(0, 10), { day: "numeric", month: "short", year: "numeric" })}</span>
                        <span className="ml-auto font-semibold tabular">{euros(Number(s.amount))}</span>
                        {isAdmin && (
                          <form action={deleteSettlement}><input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={s.id} /><ConfirmSubmit variant="ghost" confirmLabel="Supprimer ?">✕</ConfirmSubmit></form>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                <ActionForm action={recordSettlement} className="border-t border-line p-5 sm:p-6">
                  <input type="hidden" name="slug" value={slug} />
                  <div className="grid gap-3 sm:grid-cols-[1fr_1fr_120px_auto]">
                    <Field label="Qui a payé">
                      <select name="from" defaultValue={membership.id} className="field">
                        {members.filter(m => isAdmin || m.id === membership.id).map(m => <option key={m.id} value={m.id}>{m.last_name}</option>)}
                      </select>
                    </Field>
                    <Field label="À qui">
                      <select name="to" className="field">
                        {members.filter(m => m.id !== membership.id || isAdmin).map(m => <option key={m.id} value={m.id}>{m.last_name}</option>)}
                      </select>
                    </Field>
                    <Field label="Montant (€)"><input name="amount" type="number" inputMode="decimal" min={0.01} step="0.01" required className="field" /></Field>
                    <div className="flex items-end"><SubmitButton variant="secondary" className="w-full sm:w-auto">Enregistrer</SubmitButton></div>
                  </div>
                  <Field label="Note"><input name="note" className="field" placeholder="Virement du 12 octobre" /></Field>
                </ActionForm>
              </div>
            </details>
          </>
        )}
      </section>

      <p className="px-1 text-[12px] leading-relaxed text-ink-3">
        Chaque conduite vaut 1 point par défaut ; un administrateur peut ajuster le poids d'un trajet (par exemple 3 pour un aller-retour complet). Les conduites importées de l'ancien tableau comptent dès que la famille a rejoint le groupe avec le même nom.
      </p>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number | string; tone?: "warn" | "good" }) {
  return (
    <div className="card px-4 py-3">
      <div className={`text-[22px] font-semibold tabular leading-tight ${tone === "warn" ? "text-warn" : tone === "good" ? "text-good" : ""}`}>{value}</div>
      <div className="mt-0.5 text-[12px] text-ink-2">{label}</div>
    </div>
  );
}
