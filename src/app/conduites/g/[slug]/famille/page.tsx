import { headers } from "next/headers";
import { requireGroup } from "@/lib/conduites/auth";
import { listMyChildren, ensureIcalToken } from "@/lib/conduites/db";
import { updateProfile, changePassword, addChild, removeChild, setChildTravels, setNotify, regenerateIcalToken } from "@/lib/conduites/actions";
import { ActionForm, SubmitButton, Field, CopyButton, ConfirmSubmit, AutoSubmitSelect } from "@/components/conduites/ui";
import { buttonCls } from "@/components/conduites/styles";
import { Avatar } from "@/components/conduites/avatar";
import { IconPlus, IconCalendar } from "@/components/conduites/icons";

export const dynamic = "force-dynamic";
export const metadata = { title: "Ma famille" };

const TRAVELS = [
  { value: "both", label: "Aller-retour" },
  { value: "aller", label: "Aller seul" },
  { value: "retour", label: "Retour seul" },
];

export default async function FamilyPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ bienvenue?: string }> }) {
  const { slug } = await params;
  const { bienvenue } = await searchParams;
  const { user, group, membership } = await requireGroup(slug);
  const children = await listMyChildren(membership.id);
  const token = await ensureIcalToken(user);
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "agapante.com";
  const proto = h.get("x-forwarded-proto") ?? "https";
  const icalUrl = `${proto}://${host}/conduites/api/calendrier/${token}.ics`;
  const webcalUrl = `webcal://${host}/conduites/api/calendrier/${token}.ics`;
  const mailEnabled = !!process.env.BREVO_API_KEY;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 animate-rise">
        <Avatar name={`${user.first_name} ${user.last_name}`} size={52} />
        <div>
          <h1 className="h1">Famille {user.last_name}</h1>
          <p className="text-[14px] text-ink-2">{user.email}</p>
        </div>
      </div>

      {bienvenue && (
        <div className="rounded-[14px] bg-accent-soft px-4 py-3 text-[14px] text-accent-ink animate-rise">
          Bienvenue dans <strong>{group.name}</strong>. Ajoutez vos enfants ci-dessous : le planning compte ainsi les places correctement.
        </div>
      )}

      <section className="card card-pad animate-rise">
        <h2 className="h2">Enfants transportés</h2>
        <p className="mt-1 text-[13px] text-ink-2">Dans ce groupe. Précisez si un enfant ne fait que l'aller ou que le retour ; vous pourrez retirer ou inscrire un enfant sur un trajet précis.</p>
        {children.length > 0 && (
          <ul className="divide-rows mt-4 overflow-hidden rounded-[14px] ring-1 ring-line">
            {children.map(c => (
              <li key={c.id} className="flex items-center gap-2.5 px-3.5 py-2">
                <Avatar name={c.first_name} size={28} />
                <span className="min-w-0 flex-1 truncate text-[15px]">{c.first_name}</span>
                <form action={setChildTravels}>
                  <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={c.id} />
                  <AutoSubmitSelect name="travels" defaultValue={c.travels} className="field !w-auto shrink-0 !py-1.5 !pr-8 text-[13px]" aria-label={`Sens de voyage de ${c.first_name}`}>
                    {TRAVELS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </AutoSubmitSelect>
                </form>
                <form action={removeChild}>
                  <input type="hidden" name="slug" value={slug} /><input type="hidden" name="id" value={c.id} />
                  <button className={buttonCls("ghost", "sm", "!px-2 text-ink-3 hover:text-bad")} aria-label={`Retirer ${c.first_name}`} title="Retirer">✕</button>
                </form>
              </li>
            ))}
          </ul>
        )}
        <form action={addChild} className="mt-4 flex flex-wrap gap-2">
          <input type="hidden" name="slug" value={slug} />
          <input name="firstName" required placeholder="Prénom" autoComplete="off" className="field min-w-[8rem] flex-1" />
          <select name="travels" defaultValue="both" className="field !w-auto" aria-label="Sens de voyage">
            {TRAVELS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <SubmitButton variant="secondary"><IconPlus width={16} height={16} /> Ajouter</SubmitButton>
        </form>
      </section>

      <section className="card card-pad animate-rise">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-accent-soft text-accent-ink"><IconCalendar /></span>
          <div className="min-w-0 flex-1">
            <h2 className="h2">Dans votre calendrier</h2>
            <p className="mt-1 text-[13px] text-ink-2">Abonnez-vous une fois : tous les trajets de vos groupes apparaissent dans le calendrier de votre téléphone, avec une alerte la veille quand c'est vous qui conduisez. Le flux se met à jour tout seul.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={webcalUrl} className={buttonCls("primary", "sm")}>Ajouter à mon calendrier</a>
              <CopyButton text={icalUrl} label="Copier l'adresse du flux" />
              <form action={regenerateIcalToken}><ConfirmSubmit variant="ghost" confirmLabel="Régénérer ? Les abonnements existants cesseront">Nouveau lien</ConfirmSubmit></form>
            </div>
            <p className="mt-2 text-[12px] text-ink-3">iPhone et Mac : le bouton suffit. Google Agenda : « Autres agendas → Ajouter par URL » avec l'adresse copiée.</p>
          </div>
        </div>
      </section>

      <form action={setNotify} className="card card-pad flex items-center gap-4 animate-rise">
        <div className="min-w-0 flex-1">
          <h2 className="h2">Rappels par e-mail</h2>
          <p className="mt-1 text-[13px] text-ink-2">
            La veille de vos conduites, et quand un trajet reste sans conducteur trois jours avant.
            {!mailEnabled && <span className="text-warn"> L'envoi n'est pas encore configuré sur ce serveur.</span>}
          </p>
        </div>
        <label className="flex items-center gap-2 text-[14px]">
          <input type="checkbox" name="notify" defaultChecked={!!user.notify} />
          Activés
        </label>
        <SubmitButton variant="secondary" size="sm">OK</SubmitButton>
      </form>

      <ActionForm action={updateProfile} className="card card-pad animate-rise">
        <h2 className="h2">Coordonnées et voiture</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Prénom"><input name="firstName" defaultValue={user.first_name} required className="field" /></Field>
          <Field label="Nom de famille"><input name="lastName" defaultValue={user.last_name} required className="field" /></Field>
          <Field label="Téléphone" hint="Visible par les autres familles du groupe."><input name="phone" type="tel" defaultValue={user.phone ?? ""} className="field" /></Field>
          <Field label="Places passagers habituelles" hint="Hors conducteur. Pour chaque trajet, vous indiquez en un clic le nombre de places de la voiture du jour."><input name="seats" type="number" inputMode="numeric" min={1} max={12} defaultValue={user.seats} className="field" /></Field>
        </div>
        <div className="mt-2 rounded-[14px] bg-raised p-4 ring-1 ring-line">
          <div className="font-medium">Pour vous rembourser</div>
          <p className="mt-0.5 text-[13px] text-ink-2">Facultatif. Les familles qui vous doivent de l'argent verront un bouton « Payer » qui ouvre directement le bon moyen, avec le montant.</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <Field label="PayPal.me" hint="Votre identifiant PayPal.me (paypal.me/…)."><input name="paypal" defaultValue={user.paypal ?? ""} className="field" placeholder="prenomnom" /></Field>
            <Field label="Lien Lydia, Revolut… " hint="Un lien de paiement personnel."><input name="payLink" type="url" defaultValue={user.pay_link ?? ""} className="field" placeholder="https://lydia-app.com/collect/…" /></Field>
            <Field label="IBAN" hint="Pour un virement instantané (gratuit) depuis l'appli bancaire. Le téléphone ci-dessus sert pour Wero."><input name="iban" defaultValue={user.iban ?? ""} className="field" placeholder="FR76 …" /></Field>
          </div>
        </div>
        <div className="flex justify-end"><SubmitButton>Enregistrer</SubmitButton></div>
      </ActionForm>

      <ActionForm action={changePassword} className="card card-pad animate-rise">
        <h2 className="h2">Mot de passe</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Actuel"><input name="current" type="password" required autoComplete="current-password" className="field" /></Field>
          <Field label="Nouveau" hint="8 caractères minimum."><input name="next" type="password" required minLength={8} autoComplete="new-password" className="field" /></Field>
        </div>
        <div className="flex justify-end"><SubmitButton variant="secondary">Modifier</SubmitButton></div>
      </ActionForm>
    </div>
  );
}
