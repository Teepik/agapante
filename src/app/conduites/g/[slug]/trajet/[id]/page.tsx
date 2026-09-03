import Link from "next/link";
import { notFound } from "next/navigation";
import { requireGroup } from "@/lib/conduites/auth";
import { getTrip, listChildrenInGroup, listPassengers, listMembers } from "@/lib/conduites/db";
import { updateTrip, claimTrip, releaseTrip, deleteTrip, setTripDone, setPassenger, setTripSeats } from "@/lib/conduites/actions";
import { fmtDate, today, plural, DIRECTION_LABEL } from "@/lib/conduites/dates";
import { ActionForm, SubmitButton, Field, ConfirmSubmit } from "@/components/conduites/ui";
import { buttonCls } from "@/components/conduites/styles";
import { Avatar } from "@/components/conduites/avatar";
import { IconArrowLeft, IconAlert, IconCheck } from "@/components/conduites/icons";
import { euros, splitCents, fromCents } from "@/lib/conduites/equity";

export const dynamic = "force-dynamic";

export default async function TripPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const { user, group, membership, isAdmin } = await requireGroup(slug);
  const trip = await getTrip(group.id, membership.id, id);
  if (!trip) notFound();

  const mine = trip.driver_membership_id === membership.id;
  const allChildren = await listChildrenInGroup(group.id);
  const passengersAll = await listPassengers(id);
  const registered = new Set(passengersAll.map(p => p.child_id));
  const members = isAdmin ? await listMembers(group.id) : [];
  const driverLabel = trip.driver_last ?? trip.driver_name;
  const seats = trip.seats ?? trip.driver_seats;
  const confirmed = seats == null ? passengersAll : passengersAll.slice(0, seats);
  const waiting = seats == null ? [] : passengersAll.slice(seats);
  const passengers = confirmed.length;
  const overflow = waiting.length > 0;
  const past = trip.date < today();
  const canConfirm = !!trip.driver_membership_id && (mine || isAdmin) && trip.date <= today() && !trip.cancelled;
  const defaultCost = Number(group.cost_per_point) || 0;
  const tripCost = (trip.cost == null ? defaultCost : Number(trip.cost)) + (Number(trip.extra) || 0);
  const counts = (trip.date < today() || trip.done) && !trip.cancelled && !!trip.driver_membership_id;
  // Partage du coût entre les familles réellement dans la voiture (même règle que la page Comptes).
  const famMap = new Map<string, { last: string; n: number }>();
  for (const p of confirmed) { const f = famMap.get(p.membership_id); if (f) f.n++; else famMap.set(p.membership_id, { last: p.last_name, n: 1 }); }
  const fams = [...famMap.entries()];
  const shares = splitCents(Math.round(tripCost * 100), fams.map(([, f]) => (group.split === "child" ? f.n : 1)));
  const meta = [trip.departure_time ? `Départ ${trip.departure_time.replace(":", "h")}` : null, trip.departure_place].filter(Boolean).join(" · ");

  // Enfants que cette famille peut inscrire ou retirer (tous pour un admin), groupés par famille.
  const editable = allChildren.filter(c => isAdmin || c.user_id === user.id);
  const byFamily = new Map<string, typeof editable>();
  for (const c of editable) byFamily.set(c.last_name, [...(byFamily.get(c.last_name) ?? []), c]);

  return (
    <div className="space-y-5">
      <Link href={`/conduites/g/${slug}`} className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-2 hover:text-ink"><IconArrowLeft width={16} height={16} /> Planning</Link>

      <div className="animate-rise">
        <p className="kicker">{DIRECTION_LABEL[trip.direction]}{!!trip.cancelled && " · annulé"}</p>
        <h1 className="h1 mt-1">{fmtDate(trip.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</h1>
        {meta && <p className="mt-1 text-[15px] text-ink-2">{meta}</p>}
      </div>

      {trip.done && (
        <div className="flex items-center gap-3 rounded-[14px] bg-good-soft px-4 py-3 text-[14px] text-good animate-rise">
          <IconCheck width={18} height={18} /> Trajet effectué, tout le monde est bien arrivé.
        </div>
      )}
      {canConfirm && !trip.done && (
        <form action={setTripDone} className="card card-pad flex flex-wrap items-center gap-3 animate-rise">
          <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={id} /><input type="hidden" name="done" value="1" />
          <div className="min-w-0 flex-1">
            <div className="font-semibold">Le trajet s'est bien passé ?</div>
            <div className="text-[13px] text-ink-2">Un clic pour rassurer les familles : conduite effectuée, passagers arrivés.</div>
          </div>
          <SubmitButton><IconCheck width={16} height={16} /> Trajet effectué</SubmitButton>
        </form>
      )}

      {/* Conducteur */}
      <div className={`card card-pad flex items-center gap-4 animate-rise ${trip.cancelled ? "opacity-60" : ""}`}>
        {driverLabel ? <Avatar name={driverLabel} size={48} /> : <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-warn-soft text-warn"><IconAlert /></span>}
        <div className="min-w-0 flex-1">
          <div className="text-[17px] font-semibold leading-tight">{driverLabel ? (mine ? `Vous conduisez` : `${driverLabel} conduit`) : "Conducteur à pourvoir"}</div>
          <div className={`text-[14px] ${overflow ? "text-bad" : "text-ink-2"}`}>
            {plural(passengers, "passager")}{seats != null && ` · ${plural(seats, "place")}`}{overflow && ` · ${plural(waiting.length, "enfant")} en attente`}
            {trip.driver_first && !mine && ` · ${trip.driver_first}`}
          </div>
        </div>
        {!trip.cancelled && !past && (
          !driverLabel ? (
            <form action={claimTrip}><input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={id} /><SubmitButton>Je conduis</SubmitButton></form>
          ) : (mine || isAdmin) ? (
            <form action={releaseTrip}><input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={id} /><SubmitButton variant="secondary" size="sm">{mine ? "Me retirer" : "Retirer"}</SubmitButton></form>
          ) : null
        )}
      </div>

      {(mine || isAdmin) && driverLabel && !past && !trip.cancelled && (
        <div className="card card-pad animate-rise">
          <div className="flex items-baseline justify-between gap-3">
            <div className="font-medium">Places dans la voiture {mine ? "ce jour-là" : `de ${driverLabel}`}</div>
            <span className="text-[12px] text-ink-3">{trip.seats == null ? "voiture habituelle" : "pour ce trajet"}</span>
          </div>
          <p className="mt-0.5 text-[13px] text-ink-2">Hors conducteur. Un clic suffit si vous prenez une autre voiture ; les places sont réattribuées aussitôt.</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <form key={n} action={setTripSeats}>
                <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={id} /><input type="hidden" name="seats" value={n} />
                <SubmitButton variant={seats === n ? "primary" : "secondary"} size="sm" className="min-w-[44px] tabular" aria-pressed={seats === n}>{n}</SubmitButton>
              </form>
            ))}
          </div>
        </div>
      )}

      <ActionForm action={updateTrip} className="card card-pad animate-rise">
        <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={id} />

        <Field label="Commentaire" hint="Horaire de départ, précisions pour les familles…">
          <input name="comment" defaultValue={trip.comment ?? ""} className="field" placeholder="Départ 13h45" />
        </Field>

        {(mine || isAdmin) && (
          <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
            <Field label="Heure de départ"><input name="departureTime" type="time" defaultValue={trip.departure_time ?? ""} className="field" /></Field>
            <Field label="Lieu de départ" hint="Parking, adresse, point de rendez-vous…"><input name="departurePlace" defaultValue={trip.departure_place ?? ""} className="field" placeholder="Devant l'école, parking nord" /></Field>
          </div>
        )}
        {(mine || isAdmin) && defaultCost > 0 && (
          <div className="grid gap-4 sm:grid-cols-[130px_130px_1fr]">
            <Field label="Coût du trajet (€)" hint={`Vide = ${euros(defaultCost)} par défaut`}>
              <input name="cost" type="number" inputMode="decimal" min={0} step="0.01" defaultValue={trip.cost == null ? "" : Number(trip.cost)} placeholder={String(defaultCost)} className="field" />
            </Field>
            <Field label="Frais en plus (€)" hint="Parking, péage…">
              <input name="extra" type="number" inputMode="decimal" min={0} step="0.01" defaultValue={Number(trip.extra) ? Number(trip.extra) : ""} placeholder="0" className="field" />
            </Field>
            <Field label="Précision sur les frais"><input name="extraNote" defaultValue={trip.extra_note ?? ""} className="field" placeholder="Parking gare 4 €, péage 6,50 €" /></Field>
          </div>
        )}

        {isAdmin && (
          <div className="grid gap-4 rounded-[14px] bg-raised p-4 ring-1 ring-line sm:grid-cols-[1fr_110px_auto]">
            <Field label="Conducteur">
              <select key={trip.driver_membership_id ?? "none"} name="driverId" defaultValue={trip.driver_membership_id ?? ""} className="field">
                <option value="">{trip.driver_name ? `${trip.driver_name} (importé, sans compte)` : "Personne"}</option>
                {members.map(m => <option key={m.id} value={m.id}>{m.last_name} · {m.first_name}</option>)}
              </select>
            </Field>
            <Field label="Points d'équité">
              <input name="weight" type="number" inputMode="numeric" min={0} max={10} defaultValue={trip.weight} className="field" />
            </Field>
            <label className="flex items-center gap-2 self-end pb-2.5 text-[14px]">
              <input type="checkbox" name="cancelled" defaultChecked={!!trip.cancelled} /> Annulé
            </label>
          </div>
        )}

        <div className="flex justify-end"><SubmitButton>Enregistrer</SubmitButton></div>
      </ActionForm>

      {/* Passagers */}
      <section className="card animate-rise">
        <div className="card-pad pb-3">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="h2">Passagers</h2>
            <span className={`text-[13px] ${overflow ? "font-medium text-warn" : "text-ink-2"}`}>
              {plural(passengersAll.length, "inscrit")}{seats != null && ` · ${plural(seats, "place")}`}
            </span>
          </div>
          <p className="mt-1 text-[13px] text-ink-2">
            Les enfants inscrits par défaut (selon leur sens de voyage) sont déjà là. {seats != null ? "Les places sont attribuées dans l'ordre d'inscription, enfants du conducteur d'abord ; au-delà, liste d'attente." : "Le nombre de places sera connu quand un conducteur se sera positionné."}
          </p>
        </div>
        {passengersAll.length > 0 ? (
          <ul className="divide-rows border-t border-line">
            {passengersAll.map((p, i) => {
              const onWait = seats != null && i >= seats;
              const canEdit = isAdmin || p.user_id === user.id;
              return (
                <li key={p.id} className={`flex items-center gap-3 px-5 py-2.5 sm:px-6 ${onWait ? "bg-warn-soft/30" : ""}`}>
                  <span className={`w-6 text-center text-[12px] tabular ${onWait ? "text-warn" : "text-ink-3"}`}>{onWait ? "⏳" : i + 1}</span>
                  <Avatar name={p.first_name} size={26} />
                  <span className="min-w-0 flex-1 truncate text-[15px]">{p.first_name} <span className="text-[13px] text-ink-2">{p.last_name}</span></span>
                  {onWait && <span className="rounded-[8px] bg-warn-soft px-1.5 py-0.5 text-[11px] font-medium text-warn">en attente</span>}
                  {canEdit && !past && (
                    <form action={setPassenger}>
                      <input type="hidden" name="slug" value={slug} /><input type="hidden" name="trip" value={id} /><input type="hidden" name="child" value={p.child_id} /><input type="hidden" name="on" value="0" />
                      <SubmitButton variant="ghost" size="sm" className="text-ink-3 hover:text-bad" aria-label={`Retirer ${p.first_name}`}>Retirer</SubmitButton>
                    </form>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="border-t border-line px-5 py-5 text-[14px] text-ink-2 sm:px-6">Aucun passager inscrit pour l'instant.</p>
        )}
        {!past && editable.some(c => !registered.has(c.id)) && (
          <div className="border-t border-line px-5 py-4 sm:px-6">
            <div className="mb-2 text-[13px] font-medium text-ink-2">{isAdmin ? "Inscrire un enfant" : "Inscrire un de vos enfants"}</div>
            <div className="flex flex-wrap gap-2">
              {[...byFamily.entries()].map(([fam, kids]) => kids.filter(k => !registered.has(k.id)).map(k => (
                <form key={k.id} action={setPassenger}>
                  <input type="hidden" name="slug" value={slug} /><input type="hidden" name="trip" value={id} /><input type="hidden" name="child" value={k.id} /><input type="hidden" name="on" value="1" />
                  <SubmitButton variant="secondary" size="sm">+ {k.first_name}{isAdmin ? ` (${fam})` : ""}</SubmitButton>
                </form>
              )))}
            </div>
          </div>
        )}
        {editable.length === 0 && (
          <p className="border-t border-line px-5 py-4 text-[13px] text-ink-2 sm:px-6">Ajoutez vos enfants dans <Link href={`/conduites/g/${slug}/famille`} className={buttonCls("ghost", "sm", "!inline !h-auto !px-1 text-accent")}>Famille</Link> pour les inscrire.</p>
        )}
      </section>

      {/* Frais */}
      {defaultCost > 0 && driverLabel && !trip.cancelled && (
        <section className="card animate-rise">
          <div className="card-pad pb-3">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="h2">Frais{counts ? "" : " prévus"}</h2>
              <span className="text-[15px] font-semibold tabular">{euros(tripCost)}</span>
            </div>
            <p className="mt-1 text-[13px] text-ink-2">
              {trip.cost != null || Number(trip.extra) ? <>{euros(trip.cost == null ? defaultCost : Number(trip.cost))} de trajet{Number(trip.extra) ? <> + {euros(Number(trip.extra))} de frais{trip.extra_note ? ` (${trip.extra_note})` : ""}</> : null}. </> : null}
              {fams.length === 0 ? "Aucun enfant dans la voiture : rien à partager." : <>Partagé {group.split === "child" ? "au prorata des enfants" : "à parts égales"} entre {plural(fams.length, "famille")}{counts ? "" : ", d'après les inscrits actuels"}. {trip.driver_membership_id ? `Chaque famille rembourse sa part à ${mine ? "vous" : driverLabel}.` : "Ce conducteur n'a pas de compte : ce trajet n'entre pas dans les comptes."}</>}
            </p>
          </div>
          {fams.length > 0 && (
            <ul className="divide-rows border-t border-line">
              {fams.map(([mid, f], i) => (
                <li key={mid} className={`flex items-center gap-3 px-5 py-2.5 text-[14px] sm:px-6 ${mid === membership.id ? "bg-accent-soft/30" : ""}`}>
                  <Avatar name={f.last} size={24} />
                  <span className="min-w-0 flex-1 truncate">{f.last}{mid === membership.id && <span className="ml-1.5 text-[12px] text-accent">vous</span>} <span className="text-[13px] text-ink-2">· {plural(f.n, "enfant")}</span></span>
                  <span className="tabular font-medium">{euros(fromCents(shares[i]))}</span>
                  <span className="w-16 text-right text-[12px] text-ink-3">{mid === trip.driver_membership_id ? "sa part" : "à rembourser"}</span>
                </li>
              ))}
            </ul>
          )}
          {counts && <p className="border-t border-line px-5 py-2.5 text-[12px] text-ink-3 sm:px-6">Ce trajet est compté dans les <Link href={`/conduites/g/${slug}/equite#comptes`} className="font-medium text-accent">comptes du groupe</Link>.</p>}
        </section>
      )}

      {isAdmin && (
        <form action={deleteTrip} className="flex justify-end">
          <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={id} />
          <ConfirmSubmit confirmLabel="Supprimer définitivement ?">Supprimer ce trajet</ConfirmSubmit>
        </form>
      )}
    </div>
  );
}
