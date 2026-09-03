import { headers } from "next/headers";
import { requireGroupAdmin } from "@/lib/conduites/auth";
import { listMembers, unlinkedDrivers } from "@/lib/conduites/db";
import { generateTrips, addTrip, updateGroup, regenerateCode, setMemberRole, removeMember, resetMemberPassword, deleteGroup } from "@/lib/conduites/actions";
import { today, addDays, plural } from "@/lib/conduites/dates";
import { ActionForm, SubmitButton, Field, CopyButton, ConfirmSubmit } from "@/components/conduites/ui";
import { buttonCls } from "@/components/conduites/styles";
import { Avatar } from "@/components/conduites/avatar";

export const dynamic = "force-dynamic";
export const metadata = { title: "Réglages" };

const ROLE_LABEL = { owner: "Créateur", admin: "Admin", member: "Membre" } as const;

export default async function AdminPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ nouveau?: string }> }) {
  const { slug } = await params;
  const { nouveau } = await searchParams;
  const { group, membership, isOwner } = await requireGroupAdmin(slug);
  const members = await listMembers(group.id);
  const unlinked = await unlinkedDrivers(group.id);
  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "https"}://${h.get("x-forwarded-host") ?? h.get("host") ?? "agapante.com"}`;
  const inviteLink = `${origin}/conduites/rejoindre?code=${group.invite_code}`;
  const nextJuly = (() => { const y = Number(today().slice(0, 4)); return today() >= `${y}-08-01` ? `${y + 1}-07-05` : `${y}-07-05`; })();

  return (
    <div className="space-y-5">
      <div className="animate-rise">
        <h1 className="h1">Réglages</h1>
        <p className="mt-1 text-[14px] text-ink-2">{group.name}{group.destination ? ` · ${group.destination}` : ""}</p>
      </div>

      {nouveau && (
        <div className="rounded-[14px] bg-accent-soft px-4 py-3 text-[14px] text-accent-ink animate-rise">
          Votre groupe est créé. Deux étapes pour démarrer : <strong>générer les dates</strong> de l'année, puis <strong>partager le lien d'invitation</strong> aux familles.
        </div>
      )}

      {/* Invitation */}
      <section className="card card-pad animate-rise" id="invitation">
        <h2 className="h2">Inviter des familles</h2>
        <p className="mt-1 text-[13px] text-ink-2">Envoyez le lien, ou le code à saisir à l'inscription.</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-[14px] bg-raised px-4 py-2 font-mono text-[20px] font-semibold tracking-[0.2em] ring-1 ring-line">{group.invite_code}</span>
          <CopyButton text={group.invite_code} label="Copier le code" />
          <CopyButton text={inviteLink} label="Copier le lien" />
          <form action={regenerateCode}>
            <input type="hidden" name="slug" value={slug} />
            <ConfirmSubmit variant="ghost" confirmLabel="Régénérer ? L'ancien code cessera de fonctionner">Nouveau code</ConfirmSubmit>
          </form>
        </div>
        <p className="mt-3 truncate text-[12px] text-ink-3">{inviteLink}</p>
      </section>

      {/* Dates */}
      <section className="card card-pad animate-rise" id="dates">
        <h2 className="h2">Dates des trajets</h2>
        <p className="mt-1 text-[13px] text-ink-2">Un retour chaque vendredi, un aller chaque dimanche. Les dates déjà présentes sont conservées ; supprimez ensuite les week-ends de vacances depuis leur fiche.</p>
        <ActionForm action={generateTrips} className="mt-4">
          <input type="hidden" name="slug" value={slug} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <Field label="Du"><input name="from" type="date" required defaultValue={today()} className="field" /></Field>
            <Field label="Au"><input name="to" type="date" required defaultValue={nextJuly} className="field" /></Field>
            <div className="col-span-2 flex items-end sm:col-span-1"><SubmitButton className="w-full sm:w-auto">Générer</SubmitButton></div>
          </div>
        </ActionForm>
        <details className="mt-4 group">
          <summary className="cursor-pointer list-none text-[14px] font-medium text-accent [&::-webkit-details-marker]:hidden">+ Ajouter un trajet isolé (lundi férié, veille de pont…)</summary>
          <ActionForm action={addTrip} className="mt-3">
            <input type="hidden" name="slug" value={slug} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <Field label="Date"><input name="date" type="date" required defaultValue={addDays(today(), 1)} className="field" /></Field>
              <Field label="Sens">
                <select name="direction" className="field"><option value="retour">Retour à la maison</option><option value="aller">Aller vers l'école</option></select>
              </Field>
              <div className="col-span-2 flex items-end sm:col-span-1"><SubmitButton variant="secondary" className="w-full sm:w-auto">Ajouter</SubmitButton></div>
            </div>
          </ActionForm>
        </details>
      </section>

      {/* Membres */}
      <section className="card animate-rise" id="membres">
        <div className="card-pad pb-3">
          <h2 className="h2">Familles du groupe <span className="ml-1 text-ink-3 font-normal">{members.length}</span></h2>
          <p className="mt-1 text-[13px] text-ink-2">
            {isOwner ? "Nommez des administrateurs : ils gèrent les dates, les trajets et les membres." : "Seul le créateur du groupe peut nommer des administrateurs."}
          </p>
        </div>
        <ul className="divide-rows border-t border-line">
          {members.map(m => {
            const self = m.id === membership.id;
            const canRole = isOwner && !self && m.role !== "owner";
            const canRemove = !self && m.role !== "owner";
            return (
              <li key={m.id} className="px-5 py-3.5 sm:px-6">
                <div className="flex items-center gap-3">
                  <Avatar name={`${m.first_name} ${m.last_name}`} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[15px] font-medium">{m.last_name} <span className="font-normal text-ink-2">{m.first_name}</span></span>
                      <span className={`rounded-[8px] px-1.5 py-0.5 text-[11px] font-medium ${m.role === "owner" ? "bg-accent text-white" : m.role === "admin" ? "bg-accent-soft text-accent-ink" : "bg-raised text-ink-2"}`}>{ROLE_LABEL[m.role]}</span>
                    </div>
                    <div className="truncate text-[12px] text-ink-3">{m.email}{m.phone && ` · ${m.phone}`} · {m.seats} pl. · {plural(m.children_count, "enfant")}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    {canRole && (
                      <form action={setMemberRole}>
                        <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={m.id} />
                        <input type="hidden" name="role" value={m.role === "admin" ? "member" : "admin"} />
                        <SubmitButton variant="secondary" size="sm">{m.role === "admin" ? "Retirer admin" : "Nommer admin"}</SubmitButton>
                      </form>
                    )}
                    {canRemove && (
                      <details className="relative">
                        <summary className={buttonCls("ghost", "sm", "list-none cursor-pointer [&::-webkit-details-marker]:hidden")} aria-label="Plus d'actions">···</summary>
                        <div className="card absolute right-0 top-full z-10 mt-1 w-72 space-y-3 p-3 shadow-pop animate-fade">
                          <ActionForm action={resetMemberPassword} className="space-y-2">
                            <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={m.id} />
                            <div className="flex gap-2">
                              <input name="next" type="password" placeholder="Nouveau mot de passe" minLength={8} required className="field" />
                              <SubmitButton variant="secondary" size="md">OK</SubmitButton>
                            </div>
                          </ActionForm>
                          <form action={removeMember} className="border-t border-line pt-3">
                            <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={m.id} />
                            <ConfirmSubmit confirmLabel="Retirer du groupe ?">Retirer {m.last_name} du groupe</ConfirmSubmit>
                          </form>
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {unlinked.length > 0 && (
          <div className="border-t border-line px-5 py-4 text-[13px] text-ink-2 sm:px-6">
            <span className="font-medium text-ink">Conducteurs importés sans compte :</span>{" "}
            {unlinked.map(u => `${u.driver_name} (${u.n})`).join(", ")}. Ils seront rattachés dès qu'une famille rejoint le groupe avec ce nom.
          </div>
        )}
      </section>

      {/* Groupe */}
      <ActionForm action={updateGroup} className="card card-pad animate-rise">
        <input type="hidden" name="slug" value={slug} />
        <h2 className="h2">Le groupe</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nom"><input name="name" defaultValue={group.name} required className="field" /></Field>
          <Field label="Destination"><input name="destination" defaultValue={group.destination ?? ""} className="field" placeholder="École, ville…" /></Field>
        </div>
        <div className="flex justify-end"><SubmitButton variant="secondary">Enregistrer</SubmitButton></div>
      </ActionForm>

      {isOwner && (
        <details className="px-1">
          <summary className="cursor-pointer list-none text-[13px] text-ink-3 hover:text-bad [&::-webkit-details-marker]:hidden">Supprimer le groupe…</summary>
          <form action={deleteGroup} className="card card-pad mt-3 space-y-3">
            <input type="hidden" name="slug" value={slug} />
            <p className="text-[14px] text-ink-2">Toutes les données du groupe (trajets, absences) seront effacées. Les comptes des familles restent. Tapez <strong>{group.name}</strong> pour confirmer.</p>
            <div className="flex gap-2"><input name="confirm" className="field" placeholder={group.name} /><SubmitButton variant="danger">Supprimer</SubmitButton></div>
          </form>
        </details>
      )}
    </div>
  );
}
