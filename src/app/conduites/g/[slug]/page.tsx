import Link from "next/link";
import { requireGroup } from "@/lib/conduites/auth";
import { listTrips, countChildren, type TripRow } from "@/lib/conduites/db";
import { claimTrip, releaseTrip } from "@/lib/conduites/actions";
import { fmtDate, fmtDay, fmtWeekday, fmtShort, groupByWeekend, groupByMonth, today, plural, DIRECTION_LABEL } from "@/lib/conduites/dates";
import { SubmitButton } from "@/components/conduites/ui";
import { buttonCls } from "@/components/conduites/styles";
import { Avatar } from "@/components/conduites/avatar";
import { IconChevron, IconAlert, IconCalendar } from "@/components/conduites/icons";

export const dynamic = "force-dynamic";

export default async function PlanningPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ vue?: string }> }) {
  const { slug } = await params;
  const { vue } = await searchParams;
  const { group, membership, isAdmin } = await requireGroup(slug);
  const showAll = vue === "tout";
  const trips = await listTrips(group.id, showAll ? undefined : today());
  const totalChildren = await countChildren(group.id);
  const months = groupByMonth(groupByWeekend(trips));
  const upcoming = trips.filter(t => t.date >= today() && !t.cancelled);
  const open = upcoming.filter(t => !t.driver_membership_id && !t.driver_name);
  const mine = upcoming.find(t => t.driver_membership_id === membership.id);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="h1">Planning</h1>
          <p className="mt-1 text-[14px] text-ink-2">
            {open.length > 0
              ? <span className="text-warn">{plural(open.length, "trajet à pourvoir", "trajets à pourvoir")}</span>
              : upcoming.length > 0 ? <span className="text-good">Tous les trajets à venir ont un conducteur</span> : "Aucun trajet à venir"}
            {totalChildren > 0 && <> · {plural(totalChildren, "enfant")}</>}
          </p>
        </div>
        <div className="flex rounded-[10px] bg-raised p-0.5 text-[13px] font-medium ring-1 ring-line">
          <Link href={`/conduites/g/${slug}`} className={`rounded-[8px] px-3 py-1.5 transition ${!showAll ? "bg-surface shadow-card text-ink" : "text-ink-2"}`}>À venir</Link>
          <Link href={`/conduites/g/${slug}?vue=tout`} className={`rounded-[8px] px-3 py-1.5 transition ${showAll ? "bg-surface shadow-card text-ink" : "text-ink-2"}`}>Tout</Link>
        </div>
      </div>

      {mine && !showAll && (
        <Link href={`/conduites/g/${slug}/trajet/${mine.id}`} className="card flex items-center gap-4 p-4 transition hover:bg-raised animate-rise">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-accent text-white"><IconCalendar /></span>
          <span className="min-w-0 flex-1">
            <span className="kicker block">Votre prochaine conduite</span>
            <span className="block truncate font-medium">{fmtDate(mine.date)} · {DIRECTION_LABEL[mine.direction]}</span>
            <span className="block text-[13px] text-ink-2">{plural(mine.eligible - mine.absent_count, "enfant")} à transporter{mine.comment ? ` · ${mine.comment}` : ""}</span>
          </span>
          <IconChevron className="shrink-0 text-ink-3" />
        </Link>
      )}

      {trips.length === 0 && (
        <div className="card card-pad text-center animate-rise">
          <IconCalendar className="mx-auto text-ink-3" width={32} height={32} />
          <p className="mt-3 font-medium">Aucun trajet planifié</p>
          <p className="mt-1 text-[14px] text-ink-2">
            {isAdmin ? "Générez les week-ends de l'année depuis les réglages." : "Un administrateur du groupe doit générer les dates."}
          </p>
          {isAdmin && <Link href={`/conduites/g/${slug}/admin#dates`} className={buttonCls("primary", "md", "mt-4")}>Générer les dates</Link>}
        </div>
      )}

      {months.map(m => (
        <section key={m.month} className="space-y-3">
          <h2 className="kicker px-1">{m.label}</h2>
          {m.weekends.map(w => (
            <div key={w.key} className="card overflow-hidden animate-rise">
              <div className="flex items-center justify-between px-4 pt-3 pb-1 sm:px-5">
                <span className="text-[13px] font-medium text-ink-2">Week-end du {fmtShort(w.key)}</span>
              </div>
              <div className="divide-rows">
                {w.trips.map(t => <TripLine key={t.id} t={t} slug={slug} membershipId={membership.id} isAdmin={isAdmin} totalChildren={totalChildren} />)}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}

function TripLine({ t, slug, membershipId, isAdmin, totalChildren }: { t: TripRow; slug: string; membershipId: string; isAdmin: boolean; totalChildren: number }) {
  const mine = t.driver_membership_id === membershipId;
  const driverLabel = t.driver_last ?? t.driver_name;
  const hasDriver = !!driverLabel;
  const seats = t.seats ?? t.driver_seats;
  const passengers = t.eligible - t.absent_count;
  const overflow = seats != null && passengers > seats;
  const past = t.date < today();
  const href = `/conduites/g/${slug}/trajet/${t.id}`;

  return (
    <div className={`flex items-center gap-3 px-4 py-3 sm:px-5 ${t.cancelled ? "opacity-50" : ""}`}>
      <Link href={href} className={`flex w-12 shrink-0 flex-col items-center rounded-[14px] py-1.5 leading-none ${mine ? "bg-accent text-white" : "bg-raised text-ink"}`}>
        <span className={`text-[10px] font-semibold uppercase ${mine ? "text-white/80" : "text-ink-3"}`}>{fmtWeekday(t.date)}</span>
        <span className="mt-0.5 text-[20px] font-semibold tabular">{fmtDay(t.date)}</span>
      </Link>

      <Link href={href} className="min-w-0 flex-1">
        <div className="truncate text-[15px] font-medium">
          {DIRECTION_LABEL[t.direction]}
          {!!t.cancelled && <span className="ml-2 rounded-[8px] bg-raised px-1.5 py-0.5 text-[11px] font-medium text-ink-2">annulé</span>}
        </div>
        <div className={`line-clamp-2 text-[13px] ${overflow ? "text-bad" : "text-ink-2"}`}>
          {overflow && <IconAlert width={14} height={14} className="mr-1 inline -mt-0.5" />}
          {[
            totalChildren > 0 ? plural(passengers, "enfant") : null,
            hasDriver && seats != null ? `${seats} pl.` : null,
            overflow ? "manque de places" : null,
          ].filter(Boolean).join(" · ")}
          {t.comment && <>{totalChildren > 0 || (hasDriver && seats != null) ? " · " : ""}<span className="italic">{t.comment}</span></>}
        </div>
      </Link>

      <div className="flex shrink-0 items-center gap-2">
        {hasDriver ? (
          <Link href={href} className={`inline-flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-[13px] font-medium ring-1 transition hover:bg-raised ${mine ? "bg-accent-soft text-accent-ink ring-accent/20" : "bg-surface text-ink ring-line"}`}>
            <Avatar name={driverLabel!} size={24} />
            <span className="max-w-[7rem] truncate">{mine ? "Vous" : driverLabel}</span>
          </Link>
        ) : !t.cancelled && !past ? (
          <form action={claimTrip}>
            <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={t.id} />
            <SubmitButton size="sm">Je conduis</SubmitButton>
          </form>
        ) : (
          <span className="text-[13px] text-ink-3">—</span>
        )}
        {hasDriver && !t.cancelled && (mine || isAdmin) && !past && (
          <form action={releaseTrip} className="hidden sm:block">
            <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={t.id} />
            <SubmitButton variant="ghost" size="sm" aria-label="Retirer le conducteur">✕</SubmitButton>
          </form>
        )}
      </div>
    </div>
  );
}
