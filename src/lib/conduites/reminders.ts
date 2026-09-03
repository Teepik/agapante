import { q, uid } from "./db";
import { sendMail, layout, appUrl } from "./mail";
import { fmtDate, addDays, today, DIRECTION_LABEL } from "./dates";

type DriverRow = {
  id: string; date: string; direction: "aller" | "retour"; comment: string | null; group_name: string; group_slug: string;
  email: string; first_name: string; kids: number; seats: number; departure_time: string | null; departure_place: string | null;
};
type OpenRow = { id: string; date: string; direction: "aller" | "retour"; group_id: string; group_name: string; group_slug: string; kids: number };

const KIDS = `(SELECT COUNT(*)::int FROM conduites_children c JOIN conduites_memberships mm ON mm.id = c.membership_id WHERE mm.group_id = t.group_id AND (c.travels = 'both' OR c.travels = t.direction))`;
const ABSENT = `(SELECT COUNT(*)::int FROM conduites_absences a JOIN conduites_children c ON c.id = a.child_id WHERE a.trip_id = t.id AND (c.travels = 'both' OR c.travels = t.direction))`;

/**
 * Rappels idempotents (table conduites_notifications, une ligne par trajet et par type) :
 *  - driver_j1 : au conducteur, la veille de sa conduite.
 *  - open_j3   : à toutes les familles du groupe, quand un trajet n'a pas de conducteur trois jours avant.
 */
export async function runReminders(): Promise<{ driver: number; open: number }> {
  const base = appUrl();
  const mark = (tripId: string, kind: string) => q("INSERT INTO conduites_notifications (id, trip_id, kind) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING", [uid(), tripId, kind]);
  let driver = 0, open = 0;

  // --- Conducteur, la veille ---
  const drivers = await q<DriverRow>(`
    SELECT t.id, to_char(t.date,'YYYY-MM-DD') AS date, t.direction, t.comment, t.departure_time, t.departure_place, g.name AS group_name, g.slug AS group_slug, u.email, u.first_name,
      COALESCE(t.seats, u.seats) AS seats, ${KIDS} - ${ABSENT} AS kids
    FROM conduites_trips t JOIN conduites_groups g ON g.id = t.group_id
    JOIN conduites_memberships m ON m.id = t.driver_membership_id JOIN conduites_users u ON u.id = m.user_id
    WHERE t.date = $1::date AND NOT t.cancelled AND u.notify
      AND NOT EXISTS (SELECT 1 FROM conduites_notifications n WHERE n.trip_id = t.id AND n.kind = 'driver_j1')`, [addDays(today(), 1)]);
  for (const r of drivers) {
    const url = `${base}/conduites/g/${r.group_slug}/trajet/${r.id}`;
    const { html, text } = layout(
      "Demain, c'est vous qui conduisez",
      [
        `${fmtDate(r.date)} · ${DIRECTION_LABEL[r.direction]} · ${r.group_name}.`,
        [r.departure_time ? `Départ à ${r.departure_time.replace(":", "h")}` : "", r.departure_place ? `depuis ${r.departure_place}` : ""].filter(Boolean).join(" ") + (r.departure_time || r.departure_place ? "." : ""),
        `${r.kids} enfant${r.kids > 1 ? "s" : ""} à transporter, ${r.seats} place${r.seats > 1 ? "s" : ""} dans votre voiture.${r.kids > r.seats ? " Attention : il manque des places." : ""}`,
        r.comment ? `Note : ${r.comment}` : "",
      ].filter(Boolean),
      { label: "Voir le trajet", url },
    );
    await sendMail({ to: [{ email: r.email, name: r.first_name }], subject: `Demain : ${DIRECTION_LABEL[r.direction].toLowerCase()} — vous conduisez`, html, text });
    await mark(r.id, "driver_j1");
    driver++;
  }

  // --- Trajet sans conducteur, à J-3 ou moins ---
  const opens = await q<OpenRow>(`
    SELECT t.id, to_char(t.date,'YYYY-MM-DD') AS date, t.direction, t.group_id, g.name AS group_name, g.slug AS group_slug, ${KIDS} AS kids
    FROM conduites_trips t JOIN conduites_groups g ON g.id = t.group_id
    WHERE t.date > $1::date AND t.date <= $2::date AND NOT t.cancelled AND t.driver_membership_id IS NULL AND t.driver_name IS NULL
      AND NOT EXISTS (SELECT 1 FROM conduites_notifications n WHERE n.trip_id = t.id AND n.kind = 'open_j3')`, [today(), addDays(today(), 3)]);
  for (const r of opens) {
    const members = await q<{ email: string; first_name: string }>(
      "SELECT u.email, u.first_name FROM conduites_memberships m JOIN conduites_users u ON u.id = m.user_id WHERE m.group_id = $1 AND u.notify", [r.group_id]);
    if (members.length === 0) { await mark(r.id, "open_j3"); continue; }
    const url = `${base}/conduites/g/${r.group_slug}/trajet/${r.id}`;
    const day = fmtDate(r.date, { weekday: "long", day: "numeric" }).toLowerCase();
    const { html, text } = layout(
      `Personne ne conduit ${day}`,
      [
        `${fmtDate(r.date)} · ${DIRECTION_LABEL[r.direction]} · ${r.group_name}.`,
        `${r.kids} enfant${r.kids > 1 ? "s" : ""} attendent un conducteur. Si vous pouvez conduire, prenez le trajet en un clic ; le compteur d'équité en tiendra compte.`,
      ],
      { label: "Je conduis", url },
    );
    for (const m of members) await sendMail({ to: [{ email: m.email, name: m.first_name }], subject: `${r.group_name} : conducteur recherché ${day}`, html, text });
    await mark(r.id, "open_j3");
    open++;
  }

  return { driver, open };
}
