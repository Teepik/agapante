import Link from "next/link";
import { requireGroup } from "@/lib/conduites/auth";
import { equityStats, count, listSettlements, listAccountMembers, listAccountRows } from "@/lib/conduites/db";
import { schoolYear, today, plural, fmtDate, DIRECTION_LABEL } from "@/lib/conduites/dates";
import { computeAccounts, euros, signed, fromCents } from "@/lib/conduites/equity";
import { recordSettlement, deleteSettlement } from "@/lib/conduites/actions";
import { ActionForm, SubmitButton, Field, ConfirmSubmit, CopyButton } from "@/components/conduites/ui";
import type { AccountMember } from "@/lib/conduites/db";
import { buttonCls } from "@/components/conduites/styles";
import { Avatar } from "@/components/conduites/avatar";
import { IconArrowRight, IconCheck } from "@/components/conduites/icons";

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

  // ---- Comptes ----
  const cost = Number(group.cost_per_point) || 0;
  const [accountRows, accountMembers, settlements] = cost > 0
    ? await Promise.all([listAccountRows(group.id), listAccountMembers(group.id), listSettlements(group.id)])
    : [[], [], []];
  const acc = computeAccounts(accountRows, accountMembers, group.split, settlements);
  const fam = (id: string) => acc.families.find(f => f.id === id);
  const last = (id: string) => fam(id)?.last_name ?? "?";
  const name = (id: string) => { const f = fam(id); return f ? f.last_name + (f.left ? " (partie)" : "") : "?"; };
  const mine = fam(membership.id);
  const myBalance = mine?.balance ?? 0;
  const myDebts = acc.debts.filter(d => d.from === membership.id);
  const myCredits = acc.debts.filter(d => d.to === membership.id);
  const visibleFamilies = acc.families.filter(f => !f.left || Math.abs(f.balance) > 0.005 || f.drives > 0 || f.rides > 0);
  const canRecord = (from: string) => isAdmin || from === membership.id;
  const nonZero = acc.families.filter(f => Math.abs(f.balance) > 0.005).length;

  return (
    <div className="space-y-5">
      <div className="animate-rise">
        <h1 className="h1">Équité</h1>
        <p className="mt-1 text-[14px] text-ink-2">Année scolaire {sy.label}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 animate-rise">
        <Stat label="Conduites au total" value={total} />
        <Stat label="Moyenne / famille" value={avg.toFixed(1)} />
        <Stat label="À pourvoir" value={open} tone={open > 0 ? "warn" : "good"} />
      </div>

      {me && rows.length > 1 && (
        <p className="rounded-[14px] bg-raised px-4 py-3 text-[14px] text-ink-2 animate-rise">
          {Math.abs(delta) < 0.5
            ? "Vous êtes dans la moyenne du groupe."
            : delta > 0 ? `Vous avez ${delta.toFixed(1)} conduite${delta >= 2 ? "s" : ""} de plus que la moyenne — merci !`
            : `Il vous manque ${(-delta).toFixed(1)} conduite${-delta >= 2 ? "s" : ""} pour rejoindre la moyenne.`}
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
              ? <>Chaque trajet coûte <strong>{euros(cost)}</strong> par défaut (le conducteur peut indiquer le coût réel du jour et ses frais : parking, péage…). Ce coût est partagé {group.split === "child" ? "au prorata des enfants" : "à parts égales entre les familles"} réellement dans la voiture, famille du conducteur comprise. Le conducteur avance ; les autres lui remboursent leur part. Tout est calculé au centime, trajet par trajet, et vous pouvez régler vos comptes à tout moment.</>
              : "Pour calculer qui doit combien à qui, il faut d'abord fixer le coût d'un trajet."}
          </p>
        </div>

        {cost <= 0 ? (
          <div className="card card-pad text-[14px] text-ink-2">
            {isAdmin
              ? <>Indiquez le coût d'un trajet dans les <Link href={`/conduites/g/${slug}/admin`} className="font-medium text-accent">réglages du groupe</Link> (par exemple carburant et péage d'un trajet simple).</>
              : "Un administrateur du groupe doit indiquer le coût d'un trajet dans les réglages."}
          </div>
        ) : (
          <>
            {/* Ma situation */}
            {mine && (
              <div className={`card overflow-hidden ${myBalance > 0.005 ? "ring-1 ring-good/30" : myBalance < -0.005 ? "ring-1 ring-warn/30" : ""}`}>
                <div className="card-pad flex items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="kicker">Votre solde</div>
                    <div className={`mt-0.5 text-[28px] font-semibold tabular leading-tight ${myBalance > 0.005 ? "text-good" : myBalance < -0.005 ? "text-warn" : ""}`}>{signed(myBalance)}</div>
                    <div className="mt-1 text-[13px] text-ink-2">
                      {myBalance > 0.005 ? "On vous doit cette somme." : myBalance < -0.005 ? "Vous devez cette somme." : "Vous êtes à jour."}
                      {" "}Vous avez avancé {euros(mine.advanced)} en conduisant ({plural(mine.drives, "conduite")}) et consommé {euros(mine.consumed)} de trajets.
                    </div>
                  </div>
                </div>
                {(myDebts.length > 0 || myCredits.length > 0) && (
                  <ul className="divide-rows border-t border-line">
                    {myDebts.map(d => (
                      <li key={d.to} className="flex flex-wrap items-center gap-3 px-5 py-3 sm:px-6">
                        <Avatar name={last(d.to)} size={26} />
                        <span className="text-[14px]">Vous devez <strong className="tabular">{euros(d.amount)}</strong> à <span className="font-medium">{name(d.to)}</span></span>
                        <ActionForm action={recordSettlement} className="ml-auto !space-y-0">
                          <input type="hidden" name="slug" value={slug} /><input type="hidden" name="from" value={d.from} /><input type="hidden" name="to" value={d.to} /><input type="hidden" name="amount" value={d.amount} />
                          <ConfirmSubmit size="sm" variant="primary" confirmLabel="Confirmer : j'ai payé"><IconCheck width={14} height={14} /> J'ai payé</ConfirmSubmit>
                        </ActionForm>
                        <PayOptions to={accountMembers.find(m => m.id === d.to)} amount={d.amount} reference={`Conduites ${group.name}`} />
                      </li>
                    ))}
                    {myCredits.map(d => (
                      <li key={d.from} className="flex flex-wrap items-center gap-3 px-5 py-3 sm:px-6">
                        <Avatar name={last(d.from)} size={26} />
                        <span className="text-[14px]"><span className="font-medium">{name(d.from)}</span> vous doit <strong className="tabular">{euros(d.amount)}</strong></span>
                        {isAdmin && (
                          <ActionForm action={recordSettlement} className="ml-auto !space-y-0">
                            <input type="hidden" name="slug" value={slug} /><input type="hidden" name="from" value={d.from} /><input type="hidden" name="to" value={d.to} /><input type="hidden" name="amount" value={d.amount} />
                            <ConfirmSubmit size="sm" variant="secondary" confirmLabel="Confirmer : reçu">Reçu</ConfirmSubmit>
                          </ActionForm>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Qui doit quoi à qui */}
            <div className="card overflow-hidden">
              <div className="card-pad pb-3">
                <h3 className="h2">Qui doit quoi à qui</h3>
                <p className="mt-1 text-[13px] text-ink-2">Dettes exactes entre familles, d'après les trajets réellement partagés. Chacun peut solder les siennes quand il veut, sans attendre la fin de l'année.</p>
              </div>
              {acc.debts.length === 0 ? (
                <p className="border-t border-line px-5 py-6 text-center text-[14px] text-good sm:px-6">Les comptes sont équilibrés.</p>
              ) : (
                <ul className="divide-rows border-t border-line">
                  {acc.debts.map(d => {
                    const meInvolved = d.from === membership.id || d.to === membership.id;
                    return (
                      <li key={`${d.from}|${d.to}`} className={`flex flex-wrap items-center gap-3 px-5 py-3 sm:px-6 ${meInvolved ? "bg-accent-soft/30" : ""}`}>
                        <span className="inline-flex items-center gap-2 text-[14px]">
                          <Avatar name={last(d.from)} size={24} /> <span className="font-medium">{name(d.from)}</span>
                          <IconArrowRight width={16} height={16} className="text-ink-3" />
                          <Avatar name={last(d.to)} size={24} /> <span className="font-medium">{name(d.to)}</span>
                        </span>
                        <span className="ml-auto text-[16px] font-semibold tabular">{euros(d.amount)}</span>
                        {canRecord(d.from) && (
                          <ActionForm action={recordSettlement} className="!space-y-0">
                            <input type="hidden" name="slug" value={slug} /><input type="hidden" name="from" value={d.from} /><input type="hidden" name="to" value={d.to} /><input type="hidden" name="amount" value={d.amount} />
                            <ConfirmSubmit variant="secondary" size="sm" confirmLabel="Confirmer le règlement">Réglé</ConfirmSubmit>
                          </ActionForm>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
              {acc.simplified.length > 0 && acc.simplified.length < acc.debts.length && (
                <details className="border-t border-line">
                  <summary className="cursor-pointer list-none px-5 py-3 text-[13px] font-medium text-accent sm:px-6 [&::-webkit-details-marker]:hidden">
                    Version simplifiée : {plural(acc.simplified.length, "virement")} au lieu de {acc.debts.length}
                  </summary>
                  <p className="px-5 pb-2 text-[12px] text-ink-3 sm:px-6">Même résultat pour tout le monde, en moins de virements. À utiliser si tout le groupe règle en même temps.</p>
                  <ul className="divide-rows border-t border-line">
                    {acc.simplified.map(t => (
                      <li key={`${t.from}|${t.to}`} className="flex flex-wrap items-center gap-3 px-5 py-2.5 text-[14px] sm:px-6">
                        <span className="font-medium">{name(t.from)}</span><IconArrowRight width={14} height={14} className="text-ink-3" /><span className="font-medium">{name(t.to)}</span>
                        <span className="ml-auto font-semibold tabular">{euros(t.amount)}</span>
                        {canRecord(t.from) && (
                          <ActionForm action={recordSettlement} className="!space-y-0">
                            <input type="hidden" name="slug" value={slug} /><input type="hidden" name="from" value={t.from} /><input type="hidden" name="to" value={t.to} /><input type="hidden" name="amount" value={t.amount} />
                            <ConfirmSubmit variant="ghost" size="sm" confirmLabel="Confirmer">Réglé</ConfirmSubmit>
                          </ActionForm>
                        )}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>

            {/* Détail par famille */}
            <div className="card overflow-hidden">
              <div className="card-pad pb-3">
                <h3 className="h2">Détail par famille</h3>
                <p className="mt-1 text-[13px] text-ink-2">Avancé = coût des trajets conduits. Consommé = parts des trajets où ses enfants étaient dans la voiture. Solde positif : on lui doit ; négatif : elle doit.{nonZero === 0 && " Tout le monde est à jour."}</p>
              </div>
              <div className="overflow-x-auto border-t border-line">
                <table className="w-full text-[14px]">
                  <thead className="text-left text-[11px] uppercase tracking-[0.08em] text-ink-3">
                    <tr><th className="px-5 py-2 font-semibold sm:px-6">Famille</th><th className="px-3 py-2 text-right font-semibold">Avancé</th><th className="hidden px-3 py-2 text-right font-semibold sm:table-cell">Consommé</th><th className="hidden px-3 py-2 text-right font-semibold sm:table-cell">Réglé</th><th className="px-5 py-2 text-right font-semibold sm:px-6">Solde</th></tr>
                  </thead>
                  <tbody className="divide-rows">
                    {visibleFamilies.map(f => {
                      const net = f.settledOut - f.settledIn;
                      return (
                        <tr key={f.id} className={f.id === membership.id ? "bg-accent-soft/30 font-medium" : f.left ? "text-ink-2" : ""}>
                          <td className="px-5 py-2.5 sm:px-6"><span className="inline-flex items-center gap-2"><Avatar name={f.last_name} size={22} />{f.last_name}{f.left && <span className="rounded-[8px] bg-raised px-1.5 py-0.5 text-[11px] font-normal text-ink-3">partie</span>}</span>
                            <span className="block pl-[30px] text-[12px] font-normal text-ink-3">{plural(f.drives, "conduite")} · {plural(f.rides, "trajet en passager", "trajets en passager")}</span></td>
                          <td className="px-3 py-2.5 text-right tabular">{euros(f.advanced)}</td>
                          <td className="hidden px-3 py-2.5 text-right tabular sm:table-cell">{euros(f.consumed)}</td>
                          <td className="hidden px-3 py-2.5 text-right tabular text-ink-2 sm:table-cell">{Math.abs(net) > 0.005 ? signed(net) : "—"}</td>
                          <td className={`px-5 py-2.5 text-right tabular font-semibold sm:px-6 ${f.balance > 0.005 ? "text-good" : f.balance < -0.005 ? "text-warn" : ""}`}>{signed(f.balance)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Trajet par trajet */}
            <details className="card overflow-hidden">
              <summary className="card-pad cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="h2">Trajet par trajet</span> <span className="ml-1 text-[13px] text-ink-3">{acc.trips.length} · {euros(fromCents(acc.totalCents))}</span>
                <span className="block text-[13px] text-ink-2">Le détail de chaque partage, pour vérifier. Un trajet compte dès que sa date est passée (ou qu'il est validé).</span>
              </summary>
              {acc.trips.length === 0 ? (
                <p className="border-t border-line px-5 py-5 text-[14px] text-ink-2 sm:px-6">Aucun trajet passé pour l'instant.</p>
              ) : (
                <ul className="divide-rows border-t border-line">
                  {[...acc.trips].reverse().map(t => (
                    <li key={t.id} className="px-5 py-3 text-[14px] sm:px-6">
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <Link href={`/conduites/g/${slug}/trajet/${t.id}`} className="font-medium hover:text-accent">{fmtDate(t.date, { weekday: "short", day: "numeric", month: "short" })} · {DIRECTION_LABEL[t.direction]}</Link>
                        <span className="text-ink-2">{name(t.driver)} conduit</span>
                        <span className="ml-auto font-semibold tabular">{euros(fromCents(t.totalCents))}</span>
                      </div>
                      <div className="mt-0.5 text-[13px] text-ink-2">
                        {t.shares.length === 0 ? "Aucun enfant inscrit : rien à partager." : t.shares.map(s => `${name(s.membership)}${group.split === "child" ? ` (${s.children})` : ""} ${euros(fromCents(s.cents))}${s.membership === t.driver ? " (sa part)" : ""}`).join(" · ")}
                        {t.waiting > 0 && <span className="text-warn"> · {plural(t.waiting, "enfant")} en attente non compté{t.waiting > 1 ? "s" : ""}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </details>

            {/* Règlements */}
            <details className="card overflow-hidden">
              <summary className="card-pad cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="h2">Règlements enregistrés</span> <span className="ml-1 text-[13px] text-ink-3">{settlements.length}</span>
                <span className="block text-[13px] text-ink-2">Historique des remboursements, et saisie d'un montant libre (acompte, arrondi…).</span>
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
                        {accountMembers.filter(m => (isAdmin || m.id === membership.id) && !m.left_at).map(m => <option key={m.id} value={m.id}>{m.last_name}</option>)}
                      </select>
                    </Field>
                    <Field label="À qui">
                      <select name="to" className="field">
                        {accountMembers.filter(m => m.id !== membership.id || isAdmin).map(m => <option key={m.id} value={m.id}>{m.last_name}{m.left_at ? " (partie)" : ""}</option>)}
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
        L'équité compte les conduites (1 point par défaut, ajustable par un admin) ; les comptes, eux, suivent l'argent réellement avancé. Une famille qui quitte le groupe garde son historique : ses dettes et créances restent visibles jusqu'à leur règlement.
      </p>
    </div>
  );
}

/** Moyens de payer une famille, avec le montant pré-rempli quand le service le permet. */
function PayOptions({ to, amount, reference }: { to?: AccountMember; amount: number; reference: string }) {
  if (!to) return null;
  const amt = amount.toFixed(2);
  const has = !!(to.paypal || to.pay_link || to.iban || to.phone);
  return (
    <details className="w-full">
      <summary className="cursor-pointer list-none text-[13px] font-medium text-accent [&::-webkit-details-marker]:hidden">Comment payer {to.last_name} ?</summary>
      {!has ? (
        <p className="mt-2 text-[13px] text-ink-2">{to.last_name} n'a pas encore indiqué de moyen de remboursement (PayPal, Lydia, IBAN…) dans sa page Famille. Réglez comme vous en avez l'habitude, puis cliquez « J'ai payé ».</p>
      ) : (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {to.paypal && <a href={`https://paypal.me/${encodeURIComponent(to.paypal)}/${amt}EUR`} target="_blank" rel="noopener" className={buttonCls("secondary", "sm")}>PayPal {euros(amount)}</a>}
          {to.pay_link && <a href={to.pay_link} target="_blank" rel="noopener" className={buttonCls("secondary", "sm")}>{/lydia/i.test(to.pay_link) ? "Lydia" : /revolut/i.test(to.pay_link) ? "Revolut" : "Lien de paiement"}</a>}
          {to.phone && <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-2">Wero : {to.phone} <CopyButton text={to.phone} label="Copier" /></span>}
          {to.iban && (
            <span className="inline-flex flex-wrap items-center gap-1.5 text-[13px] text-ink-2">
              Virement : <span className="font-mono text-[12px]">{to.iban.replace(/(.{4})/g, "$1 ").trim()}</span>
              <CopyButton text={to.iban} label="Copier l'IBAN" /><CopyButton text={amt} label={`Copier ${euros(amount)}`} /><CopyButton text={reference} label="Copier le libellé" />
            </span>
          )}
        </div>
      )}
    </details>
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
