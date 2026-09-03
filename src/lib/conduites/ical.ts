import { q, type User } from "./db";
import { DIRECTION_LABEL, addDays } from "./dates";

type Row = {
  id: string; date: string; direction: "aller" | "retour"; comment: string | null; cancelled: boolean; weight: number;
  group_name: string; group_slug: string; driver_last: string | null; is_mine: boolean; eligible: number; absent_count: number;
};

const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
const fold = (line: string) => {
  const out: string[] = [];
  let cur = "";
  for (const ch of line) {
    if (Buffer.byteLength(cur + ch) > 73) { out.push(cur); cur = " " + ch; } else cur += ch;
  }
  out.push(cur);
  return out.join("\r\n");
};

/** Flux iCal d'une famille : tous les trajets de ses groupes, alerte la veille quand elle conduit. */
export async function buildIcal(user: User, appUrl: string): Promise<string> {
  const rows = await q<Row>(`
    SELECT t.id, to_char(t.date, 'YYYY-MM-DD') AS date, t.direction, t.comment, t.cancelled, t.weight, g.name AS group_name, g.slug AS group_slug,
      COALESCE(du.last_name, t.driver_name) AS driver_last,
      (t.driver_membership_id = m.id) AS is_mine,
      (SELECT COUNT(*)::int FROM conduites_children c JOIN conduites_memberships mm ON mm.id = c.membership_id WHERE mm.group_id = t.group_id AND (c.travels = 'both' OR c.travels = t.direction)) AS eligible,
      (SELECT COUNT(*)::int FROM conduites_absences a JOIN conduites_children c ON c.id = a.child_id WHERE a.trip_id = t.id AND (c.travels = 'both' OR c.travels = t.direction)) AS absent_count
    FROM conduites_memberships m
    JOIN conduites_groups g ON g.id = m.group_id
    JOIN conduites_trips t ON t.group_id = g.id
    LEFT JOIN conduites_memberships dm ON dm.id = t.driver_membership_id
    LEFT JOIN conduites_users du ON du.id = dm.user_id
    WHERE m.user_id = $1 AND t.date >= CURRENT_DATE - 60
    ORDER BY t.date`, [user.id]);

  const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Conduites//FR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "X-WR-CALNAME:Conduites", "X-WR-TIMEZONE:Europe/Paris", "REFRESH-INTERVAL;VALUE=DURATION:PT6H", "X-PUBLISHED-TTL:PT6H",
  ];
  for (const r of rows) {
    const who = r.is_mine ? "Vous conduisez" : r.driver_last ? `${r.driver_last} conduit` : "Conducteur à pourvoir";
    const kids = r.eligible - r.absent_count;
    const summary = `${r.cancelled ? "[Annulé] " : ""}${r.is_mine ? "🚗 " : ""}${DIRECTION_LABEL[r.direction]} · ${who}`;
    const url = `${appUrl}/conduites/g/${r.group_slug}/trajet/${r.id}`;
    const desc = [r.group_name, `${kids} enfant${kids > 1 ? "s" : ""} à transporter`, r.comment ?? "", url].filter(Boolean).join("\n");
    lines.push(
      "BEGIN:VEVENT",
      `UID:${r.id}@conduites`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${r.date.replace(/-/g, "")}`,
      `DTEND;VALUE=DATE:${addDays(r.date, 1).replace(/-/g, "")}`,
      fold(`SUMMARY:${esc(summary)}`),
      fold(`DESCRIPTION:${esc(desc)}`),
      `URL:${url}`,
      `STATUS:${r.cancelled ? "CANCELLED" : "CONFIRMED"}`,
      `TRANSP:${r.is_mine ? "OPAQUE" : "TRANSPARENT"}`,
    );
    if (r.is_mine && !r.cancelled) {
      lines.push("BEGIN:VALARM", "ACTION:DISPLAY", `DESCRIPTION:${esc("Demain : " + DIRECTION_LABEL[r.direction] + " — vous conduisez")}`, "TRIGGER:-PT6H", "END:VALARM");
    }
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}
