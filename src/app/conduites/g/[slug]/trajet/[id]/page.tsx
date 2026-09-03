import Link from "next/link";
import { notFound } from "next/navigation";
import { requireGroup } from "@/lib/conduites/auth";
import { getTrip, listChildrenInGroup, listAbsences, listMembers } from "@/lib/conduites/db";
import { updateTrip, claimTrip, releaseTrip, deleteTrip } from "@/lib/conduites/actions";
import { fmtDate, today, plural, DIRECTION_LABEL } from "@/lib/conduites/dates";
import { ActionForm, SubmitButton, Field, ConfirmSubmit } from "@/components/conduites/ui";
import { Avatar } from "@/components/conduites/avatar";
import { IconArrowLeft, IconAlert } from "@/components/conduites/icons";

export const dynamic = "force-dynamic";

export default async function TripPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const { user, group, membership, isAdmin } = await requireGroup(slug);
  const trip = await getTrip(group.id, id);
  if (!trip) notFound();

  const mine = trip.driver_membership_id === membership.id;
  const children = (await listChildrenInGroup(group.id)).filter(c => c.travels === "both" || c.travels === trip.direction);
  const absent = new Set(await listAbsences(id));
  const members = isAdmin ? await listMembers(group.id) : [];
  const driverLabel = trip.driver_last ?? trip.driver_name;
  const seats = trip.seats ?? trip.driver_seats;
  const passengers = children.filter(c => !absent.has(c.id)).length;
  const overflow = seats != null && passengers > seats;
  const past = trip.date < today();

  const byFamily = new Map<string, typeof children>();
  for (const c of children) byFamily.set(c.last_name, [...(byFamily.get(c.last_name) ?? []), c]);

  return (
    <div className="space-y-5">
      <Link href={`/conduites/g/${slug}`} className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink-2 hover:text-ink"><IconArrowLeft width={16} height={16} /> Planning</Link>

      <div className="animate-rise">
        <p className="kicker">{DIRECTION_LABEL[trip.direction]}{!!trip.cancelled && " · annulé"}</p>
        <h1 className="h1 mt-1">{fmtDate(trip.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</h1>
      </div>

      {/* Conducteur */}
      <div className={`card card-pad flex items-center gap-4 animate-rise ${trip.cancelled ? "opacity-60" : ""}`}>
        {driverLabel ? <Avatar name={driverLabel} size={48} /> : <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-warn-soft text-warn"><IconAlert /></span>}
        <div className="min-w-0 flex-1">
          <div className="truncate text-[17px] font-semibold">{driverLabel ? (mine ? `Vous conduisez` : `${driverLabel} conduit`) : "Conducteur à pourvoir"}</div>
          <div className={`text-[14px] ${overflow ? "text-bad" : "text-ink-2"}`}>
            {plural(passengers, "enfant")} à transporter{seats != null && ` · ${seats} places`}{overflow && " · il manque des places"}
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

      <ActionForm action={updateTrip} className="card card-pad animate-rise">
        <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={id} />

        <Field label="Commentaire" hint="Horaire de départ, précisions pour les familles…">
          <input name="comment" defaultValue={trip.comment ?? ""} className="field" placeholder="Départ 13h45" />
        </Field>

        {(mine || isAdmin) && (
          <Field label="Places passagers pour ce trajet" hint="Laissez vide pour garder les places habituelles de la voiture.">
            <input name="seats" type="number" inputMode="numeric" min={1} max={12} defaultValue={trip.seats ?? ""} placeholder={String(trip.driver_seats ?? user.seats)} className="field" />
          </Field>
        )}

        {isAdmin && (
          <div className="grid gap-4 rounded-[14px] bg-raised p-4 ring-1 ring-line sm:grid-cols-[1fr_120px_auto]">
            <Field label="Conducteur">
              <select name="driverId" defaultValue={trip.driver_membership_id ?? ""} className="field">
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

        <div>
          <div className="mb-1 flex items-baseline justify-between">
            <h2 className="h2">Absences</h2>
            <span className="text-[12px] text-ink-3">{isAdmin ? "Tous les enfants" : "Vos enfants"}</span>
          </div>
          <p className="mb-3 text-[13px] text-ink-2">Cochez les enfants qui ne voyagent pas ce jour-là. Les enfants qui ne font jamais ce sens de trajet n'apparaissent pas.</p>
          {children.length === 0 && (
            <p className="rounded-[14px] bg-raised px-4 py-3 text-[14px] text-ink-2">Aucun enfant enregistré dans le groupe. Ajoutez les vôtres dans <Link href={`/conduites/g/${slug}/famille`} className="font-medium text-accent">Famille</Link>.</p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            {[...byFamily.entries()].map(([fam, kids]) => (
              <div key={fam} className="rounded-[14px] ring-1 ring-line p-3">
                <div className="mb-1.5 flex items-center gap-2"><Avatar name={fam} size={20} /><span className="text-[13px] font-medium">{fam}</span></div>
                {kids.map(k => {
                  const editable = isAdmin || k.user_id === user.id;
                  return (
                    <label key={k.id} className={`flex items-center gap-2.5 py-1.5 text-[15px] ${editable ? "cursor-pointer" : "text-ink-3"}`}>
                      <input type="checkbox" name="absent" value={k.id} defaultChecked={absent.has(k.id)} disabled={!editable} />
                      <span className={absent.has(k.id) ? "line-through decoration-ink-3" : ""}>{k.first_name}</span>
                      {absent.has(k.id) && <span className="ml-auto text-[12px] text-warn">absent</span>}
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end"><SubmitButton>Enregistrer</SubmitButton></div>
      </ActionForm>

      {isAdmin && (
        <form action={deleteTrip} className="flex justify-end">
          <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={id} />
          <ConfirmSubmit confirmLabel="Supprimer définitivement ?">Supprimer ce trajet</ConfirmSubmit>
        </form>
      )}
    </div>
  );
}
