import { requireGroup } from "@/lib/conduites/auth";
import { equityStats, count } from "@/lib/conduites/db";
import { schoolYear, today, plural } from "@/lib/conduites/dates";
import { Avatar } from "@/components/conduites/avatar";

export const dynamic = "force-dynamic";
export const metadata = { title: "Équité" };

export default async function EquityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { group, membership } = await requireGroup(slug);
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
