"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  q, one, count, uid, inviteCode, slugify, newToken, getGroupByCode, getUserByEmail, getUserById, joinGroup, claimOrphanGroups, autoRegister,
  type Role, type Travels,
} from "./db";
import { BASE, createSession, destroySession, hashPassword, verifyPassword, requireUser, requireGroup, requireGroupAdmin } from "./auth";
import { generateWeekends } from "./dates";

export type ActionState = { error?: string; ok?: string } | undefined;
const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const safeNext = (n: string) => (n.startsWith(BASE) && !n.startsWith("//") ? n : BASE);
const revalidateGroup = (slug: string) => revalidatePath(`${BASE}/g/${slug}`, "layout");

// ============ Auth ============
export async function register(_: ActionState, fd: FormData): Promise<ActionState> {
  const email = str(fd, "email").toLowerCase();
  const password = String(fd.get("password") ?? "");
  const lastName = str(fd, "lastName");
  const firstName = str(fd, "firstName");
  const code = str(fd, "code");
  const next = str(fd, "next");

  if (!email.includes("@")) return { error: "Adresse e-mail invalide." };
  if (password.length < 8) return { error: "Le mot de passe doit faire au moins 8 caractères." };
  if (!lastName || !firstName) return { error: "Nom et prénom sont nécessaires." };
  if (await getUserByEmail(email)) return { error: "Un compte existe déjà avec cet e-mail." };
  const group = code ? await getGroupByCode(code) : undefined;
  if (code && !group) return { error: "Ce code d'invitation ne correspond à aucun groupe." };

  const id = uid();
  await q("INSERT INTO conduites_users (id, email, password_hash, first_name, last_name) VALUES ($1,$2,$3,$4,$5)",
    [id, email, await hashPassword(password), firstName, lastName]);
  const user = (await getUserById(id))!;
  await claimOrphanGroups(user);
  if (group) await joinGroup(group.id, user);
  await createSession(id);
  if (group) redirect(`${BASE}/g/${group.slug}/famille?bienvenue=1`);
  redirect(next ? safeNext(next) : BASE);
}

export async function login(_: ActionState, fd: FormData): Promise<ActionState> {
  const email = str(fd, "email").toLowerCase();
  const password = String(fd.get("password") ?? "");
  const next = str(fd, "next");
  const user = await getUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.password_hash))) return { error: "E-mail ou mot de passe incorrect." };
  await claimOrphanGroups(user);
  await createSession(user.id);
  redirect(next ? safeNext(next) : BASE);
}

export async function logout() {
  await destroySession();
  redirect(`${BASE}/login`);
}

// ============ Groupes ============
export async function createGroup(_: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser(`${BASE}/nouveau-groupe`);
  const name = str(fd, "name");
  const destination = str(fd, "destination") || null;
  if (name.length < 2) return { error: "Donnez un nom au groupe." };
  let slug = slugify(name);
  for (let i = 2; await one("SELECT 1 FROM conduites_groups WHERE slug = $1", [slug]); i++) slug = `${slugify(name)}-${i}`;
  let code = inviteCode();
  while (await one("SELECT 1 FROM conduites_groups WHERE invite_code = $1", [code])) code = inviteCode();
  const id = uid();
  await q("INSERT INTO conduites_groups (id, name, slug, invite_code, destination, created_by) VALUES ($1,$2,$3,$4,$5,$6)", [id, name, slug, code, destination, user.id]);
  await joinGroup(id, user, "owner");
  redirect(`${BASE}/g/${slug}/admin?nouveau=1`);
}

export async function joinByCode(_: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser(`${BASE}/rejoindre`);
  const group = await getGroupByCode(str(fd, "code"));
  if (!group) return { error: "Aucun groupe ne correspond à ce code." };
  await joinGroup(group.id, user);
  redirect(`${BASE}/g/${group.slug}/famille?bienvenue=1`);
}

export async function updateGroup(_: ActionState, fd: FormData): Promise<ActionState> {
  const { group } = await requireGroupAdmin(str(fd, "slug"));
  const name = str(fd, "name");
  const destination = str(fd, "destination") || null;
  if (name.length < 2) return { error: "Le nom est trop court." };
  const cost = Math.max(0, Math.min(999, Number(String(fd.get("cost") ?? "0").replace(",", ".")) || 0));
  const split = str(fd, "split") === "child" ? "child" : "family";
  await q("UPDATE conduites_groups SET name = $1, destination = $2, cost_per_point = $3, split = $4 WHERE id = $5", [name, destination, cost, split, group.id]);
  revalidateGroup(group.slug);
  return { ok: "Groupe mis à jour." };
}

export async function regenerateCode(fd: FormData) {
  const { group } = await requireGroupAdmin(str(fd, "slug"));
  let code = inviteCode();
  while (await one("SELECT 1 FROM conduites_groups WHERE invite_code = $1", [code])) code = inviteCode();
  await q("UPDATE conduites_groups SET invite_code = $1 WHERE id = $2", [code, group.id]);
  revalidatePath(`${BASE}/g/${group.slug}/admin`);
}

export async function setMemberRole(fd: FormData) {
  const { group, isOwner, membership } = await requireGroup(str(fd, "slug"));
  if (!isOwner) return;
  const id = str(fd, "id");
  const role: Role = str(fd, "role") === "admin" ? "admin" : "member";
  if (id === membership.id) return;
  await q("UPDATE conduites_memberships SET role = $1 WHERE id = $2 AND group_id = $3 AND role <> 'owner'", [role, id, group.id]);
  revalidatePath(`${BASE}/g/${group.slug}/admin`);
}

export async function removeMember(fd: FormData) {
  const { group, membership, isAdmin } = await requireGroup(str(fd, "slug"));
  const id = str(fd, "id");
  const target = await one<{ role: Role }>("SELECT role FROM conduites_memberships WHERE id = $1 AND group_id = $2", [id, group.id]);
  if (!target || target.role === "owner") return;
  const self = id === membership.id;
  if (!self && !isAdmin) return;
  // Une famille qui a un historique (conduites, trajets en passager, règlements) est marquée « partie » :
  // les comptes passés restent exacts et elle retrouve tout si elle revient. Sinon, suppression pure.
  const history = await count(`SELECT (SELECT COUNT(*) FROM conduites_trips WHERE driver_membership_id = $1)
      + (SELECT COUNT(*) FROM conduites_passengers p JOIN conduites_children c ON c.id = p.child_id JOIN conduites_trips t ON t.id = p.trip_id WHERE c.membership_id = $1 AND (t.date < CURRENT_DATE OR t.done))
      + (SELECT COUNT(*) FROM conduites_settlements WHERE from_membership_id = $1 OR to_membership_id = $1) AS n`, [id]);
  if (history > 0) {
    await q("UPDATE conduites_memberships SET left_at = now(), role = 'member' WHERE id = $1", [id]);
    // Plus d'inscription sur les trajets à venir.
    await q("DELETE FROM conduites_passengers p USING conduites_children c, conduites_trips t WHERE p.child_id = c.id AND t.id = p.trip_id AND c.membership_id = $1 AND t.date >= CURRENT_DATE AND NOT t.done", [id]);
    await q("UPDATE conduites_trips SET driver_membership_id = NULL WHERE driver_membership_id = $1 AND date >= CURRENT_DATE AND NOT done", [id]);
  } else {
    await q("DELETE FROM conduites_memberships WHERE id = $1", [id]);
  }
  revalidateGroup(group.slug);
  if (self) redirect(BASE);
}

export async function deleteGroup(fd: FormData) {
  const { group, isOwner } = await requireGroup(str(fd, "slug"));
  if (!isOwner || str(fd, "confirm") !== group.name) return;
  await q("DELETE FROM conduites_groups WHERE id = $1", [group.id]);
  redirect(BASE);
}

// ============ Famille ============
export async function updateProfile(_: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const firstName = str(fd, "firstName");
  const lastName = str(fd, "lastName");
  const phone = str(fd, "phone") || null;
  const seats = Math.max(1, Math.min(12, Number(fd.get("seats")) || user.seats));
  if (!firstName || !lastName) return { error: "Nom et prénom sont nécessaires." };
  await q("UPDATE conduites_users SET first_name = $1, last_name = $2, phone = $3, seats = $4 WHERE id = $5", [firstName, lastName, phone, seats, user.id]);
  revalidatePath(BASE, "layout");
  return { ok: "Enregistré." };
}

export async function changePassword(_: ActionState, fd: FormData): Promise<ActionState> {
  const user = await requireUser();
  const current = String(fd.get("current") ?? "");
  const next = String(fd.get("next") ?? "");
  if (!(await verifyPassword(current, user.password_hash))) return { error: "Mot de passe actuel incorrect." };
  if (next.length < 8) return { error: "8 caractères minimum." };
  await q("UPDATE conduites_users SET password_hash = $1 WHERE id = $2", [await hashPassword(next), user.id]);
  return { ok: "Mot de passe modifié." };
}

const travelsOf = (v: string): Travels => (v === "aller" || v === "retour" ? v : "both");

export async function addChild(fd: FormData) {
  const { group, membership } = await requireGroup(str(fd, "slug"));
  const name = str(fd, "firstName");
  if (!name) return;
  const childId = uid();
  await q("INSERT INTO conduites_children (id, membership_id, first_name, travels) VALUES ($1,$2,$3,$4)", [childId, membership.id, name, travelsOf(str(fd, "travels"))]);
  await autoRegister(group.id, { childId });
  revalidateGroup(group.slug);
}

export async function removeChild(fd: FormData) {
  const { group, membership } = await requireGroup(str(fd, "slug"));
  await q("DELETE FROM conduites_children WHERE id = $1 AND membership_id = $2", [str(fd, "id"), membership.id]);
  revalidateGroup(group.slug);
}

export async function setChildTravels(fd: FormData) {
  const { group, membership } = await requireGroup(str(fd, "slug"));
  const travels = travelsOf(str(fd, "travels"));
  const childId = str(fd, "id");
  await q("UPDATE conduites_children SET travels = $1 WHERE id = $2 AND membership_id = $3", [travels, childId, membership.id]);
  // Trajets futurs : on retire l'enfant des sens qu'il ne fait plus, on l'inscrit sur ceux qu'il fait désormais.
  await q(`DELETE FROM conduites_passengers p USING conduites_trips t WHERE p.trip_id = t.id AND p.child_id = $1 AND t.date >= CURRENT_DATE AND $2 <> 'both' AND t.direction <> $2`, [childId, travels]);
  await autoRegister(group.id, { childId });
  revalidateGroup(group.slug);
}

export async function setNotify(fd: FormData) {
  const user = await requireUser();
  await q("UPDATE conduites_users SET notify = $1 WHERE id = $2", [!!fd.get("notify"), user.id]);
  revalidatePath(BASE, "layout");
}

export async function regenerateIcalToken() {
  const user = await requireUser();
  await q("UPDATE conduites_users SET ical_token = $1 WHERE id = $2", [newToken(), user.id]);
  revalidatePath(BASE, "layout");
}

// ============ Trajets ============
const tripOf = (groupId: string, id: string) =>
  one<{ driver_membership_id: string | null; driver_name: string | null }>("SELECT driver_membership_id, driver_name FROM conduites_trips WHERE id = $1 AND group_id = $2", [id, groupId]);

export async function claimTrip(fd: FormData) {
  const { group, membership, isAdmin } = await requireGroup(str(fd, "slug"));
  const id = str(fd, "id");
  const trip = await tripOf(group.id, id);
  if (!trip) return;
  const taken = trip.driver_membership_id || trip.driver_name;
  if (taken && trip.driver_membership_id !== membership.id && !isAdmin) return;
  await q("UPDATE conduites_trips SET driver_membership_id = $1, driver_name = NULL, seats = NULL WHERE id = $2", [membership.id, id]);
  revalidateGroup(group.slug);
}

export async function releaseTrip(fd: FormData) {
  const { group, membership, isAdmin } = await requireGroup(str(fd, "slug"));
  const id = str(fd, "id");
  const trip = await tripOf(group.id, id);
  if (!trip) return;
  if (trip.driver_membership_id !== membership.id && !isAdmin) return;
  await q("UPDATE conduites_trips SET driver_membership_id = NULL, driver_name = NULL, seats = NULL WHERE id = $1", [id]);
  revalidateGroup(group.slug);
}

export async function updateTrip(_: ActionState, fd: FormData): Promise<ActionState> {
  const { group, membership, isAdmin } = await requireGroup(str(fd, "slug"));
  const id = str(fd, "id");
  const trip = await tripOf(group.id, id);
  if (!trip) return { error: "Trajet introuvable." };
  const isDriver = trip.driver_membership_id === membership.id;

  await q("UPDATE conduites_trips SET comment = $1 WHERE id = $2", [str(fd, "comment") || null, id]);

  if (isDriver || isAdmin) {
    const seatsRaw = str(fd, "seats");
    const time = str(fd, "departureTime");
    const place = str(fd, "departurePlace") || null;
    if (time && !/^\d{1,2}:\d{2}$/.test(time)) return { error: "Heure invalide (ex. 13:45)." };
    const money = (k: string) => { const raw = str(fd, k).replace(",", "."); return raw === "" ? null : Math.max(0, Math.min(9999, Math.round((Number(raw) || 0) * 100) / 100)); };
    const cost = fd.has("cost") ? money("cost") : undefined;
    const extra = fd.has("extra") ? (money("extra") ?? 0) : undefined;
    const extraNote = fd.has("extraNote") ? (str(fd, "extraNote") || null) : undefined;
    await q(`UPDATE conduites_trips SET seats = $1, departure_time = $2, departure_place = $3,
        cost = CASE WHEN $5 THEN $4 ELSE cost END, extra = CASE WHEN $7 THEN $6 ELSE extra END, extra_note = CASE WHEN $9 THEN $8 ELSE extra_note END
      WHERE id = $10`,
      [seatsRaw ? Math.max(1, Math.min(12, Number(seatsRaw))) : null, time ? time.padStart(5, "0") : null, place,
        cost ?? null, cost !== undefined, extra ?? 0, extra !== undefined, extraNote ?? null, extraNote !== undefined, id]);
  }
  if (isAdmin) {
    const weight = Math.max(0, Math.min(10, Number(fd.get("weight")) || 0));
    const cancelled = !!fd.get("cancelled");
    const driverId = str(fd, "driverId") || null;
    await q("UPDATE conduites_trips SET weight = $1, cancelled = $2, driver_membership_id = $3, driver_name = CASE WHEN $3::text IS NULL THEN driver_name ELSE NULL END WHERE id = $4",
      [weight, cancelled, driverId, id]);
  }


  revalidateGroup(group.slug);
  return { ok: "Trajet mis à jour." };
}

// ============ Dates (admin) ============
export async function generateTrips(_: ActionState, fd: FormData): Promise<ActionState> {
  const { group } = await requireGroupAdmin(str(fd, "slug"));
  const from = str(fd, "from");
  const to = str(fd, "to");
  if (!from || !to || from > to) return { error: "Période invalide." };
  const dates = generateWeekends(from, to);
  if (!dates.length) return { error: "Aucun vendredi ni dimanche dans cette période." };
  const inserted = await q<{ id: string }>(
    `INSERT INTO conduites_trips (id, group_id, date, direction)
     SELECT gen_random_uuid()::text, $1, d, dir FROM unnest($2::date[], $3::text[]) AS x(d, dir)
     ON CONFLICT DO NOTHING RETURNING id`,
    [group.id, dates.map(d => d.date), dates.map(d => d.direction)]);
  const n = inserted.length;
  if (n) await autoRegister(group.id);
  revalidateGroup(group.slug);
  return { ok: n ? `${n} trajet${n > 1 ? "s" : ""} ajouté${n > 1 ? "s" : ""}.` : "Toutes ces dates existaient déjà." };
}

export async function addTrip(_: ActionState, fd: FormData): Promise<ActionState> {
  const { group } = await requireGroup(str(fd, "slug"));
  const date = str(fd, "date");
  const direction = str(fd, "direction") === "aller" ? "aller" : "retour";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "Date invalide." };
  const r = await q<{ id: string }>("INSERT INTO conduites_trips (id, group_id, date, direction) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING RETURNING id", [uid(), group.id, date, direction]);
  if (r.length) await autoRegister(group.id, { tripId: r[0].id });
  revalidateGroup(group.slug);
  return r.length ? { ok: "Trajet ajouté." } : { error: "Ce trajet existe déjà." };
}

export async function deleteTrip(fd: FormData) {
  const { group } = await requireGroupAdmin(str(fd, "slug"));
  await q("DELETE FROM conduites_trips WHERE id = $1 AND group_id = $2", [str(fd, "id"), group.id]);
  revalidateGroup(group.slug);
  redirect(`${BASE}/g/${group.slug}`);
}

export async function resetMemberPassword(_: ActionState, fd: FormData): Promise<ActionState> {
  const { group } = await requireGroupAdmin(str(fd, "slug"));
  const id = str(fd, "id");
  const next = String(fd.get("next") ?? "");
  if (next.length < 8) return { error: "8 caractères minimum." };
  const m = await one<{ user_id: string }>("SELECT user_id FROM conduites_memberships WHERE id = $1 AND group_id = $2", [id, group.id]);
  if (!m) return { error: "Membre introuvable." };
  await q("UPDATE conduites_users SET password_hash = $1 WHERE id = $2", [await hashPassword(next), m.user_id]);
  return { ok: "Mot de passe réinitialisé." };
}

/** Une famille inscrit ou retire un de ses enfants sur un trajet (un admin peut le faire pour tous). */
export async function setPassenger(fd: FormData) {
  const { group, membership, isAdmin } = await requireGroup(str(fd, "slug"));
  const tripId = str(fd, "trip");
  const childId = str(fd, "child");
  const on = fd.get("on") === "1";
  const child = await one<{ membership_id: string }>(
    "SELECT c.membership_id FROM conduites_children c JOIN conduites_memberships m ON m.id = c.membership_id WHERE c.id = $1 AND m.group_id = $2", [childId, group.id]);
  const trip = await one("SELECT id FROM conduites_trips WHERE id = $1 AND group_id = $2", [tripId, group.id]);
  if (!child || !trip || (child.membership_id !== membership.id && !isAdmin)) return;
  if (on) await q("INSERT INTO conduites_passengers (id, trip_id, child_id) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING", [uid(), tripId, childId]);
  else await q("DELETE FROM conduites_passengers WHERE trip_id = $1 AND child_id = $2", [tripId, childId]);
  revalidateGroup(group.slug);
}

/** Le conducteur (ou un admin) confirme que le trajet s'est bien passé et que les passagers sont arrivés. */
export async function setTripDone(fd: FormData) {
  const { group, membership, isAdmin } = await requireGroup(str(fd, "slug"));
  const id = str(fd, "id");
  const trip = await tripOf(group.id, id);
  if (!trip || (trip.driver_membership_id !== membership.id && !isAdmin)) return;
  await q("UPDATE conduites_trips SET done = $1 WHERE id = $2", [fd.get("done") === "1", id]);
  revalidateGroup(group.slug);
}

// ============ Comptes ============
/** Enregistre un règlement entre deux familles (le payeur lui-même ou un admin). */
export async function recordSettlement(_: ActionState, fd: FormData): Promise<ActionState> {
  const { group, membership, isAdmin } = await requireGroup(str(fd, "slug"));
  const from = str(fd, "from");
  const to = str(fd, "to");
  const amount = Math.round((Number(String(fd.get("amount") ?? "").replace(",", ".")) || 0) * 100) / 100;
  const note = str(fd, "note") || null;
  if (!from || !to || from === to) return { error: "Choisissez deux familles différentes." };
  if (amount <= 0) return { error: "Montant invalide." };
  if (from !== membership.id && !isAdmin) return { error: "Vous ne pouvez enregistrer qu'un règlement que vous avez fait vous-même." };
  const ok = await q("SELECT id FROM conduites_memberships WHERE group_id = $1 AND id = ANY($2::text[])", [group.id, [from, to]]);
  if (ok.length !== 2) return { error: "Famille introuvable dans ce groupe." };
  await q("INSERT INTO conduites_settlements (id, group_id, from_membership_id, to_membership_id, amount, note) VALUES ($1,$2,$3,$4,$5,$6)", [uid(), group.id, from, to, amount, note]);
  revalidatePath(`${BASE}/g/${group.slug}/equite`);
  return { ok: "Règlement enregistré." };
}

export async function deleteSettlement(fd: FormData) {
  const { group } = await requireGroupAdmin(str(fd, "slug"));
  await q("DELETE FROM conduites_settlements WHERE id = $1 AND group_id = $2", [str(fd, "id"), group.id]);
  revalidatePath(`${BASE}/g/${group.slug}/equite`);
}
