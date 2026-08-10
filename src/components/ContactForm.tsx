"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { submitContact } from "@/app/contact/actions";
import { initialContactState } from "@/lib/contact-state";
import { Arrow } from "./ui";

const orgTypes = ["TPE (< 20 salariés)", "PME (20 – 250)", "ETI (250 – 5 000)", "Grand groupe", "Administration / secteur public", "Association", "Autre"];
const needs = [
  "Conseil & stratégie IA",
  "Accompagnement au déploiement",
  "MVP IA clés en main",
  "Formation des équipes",
  "Je ne sais pas encore",
];
const timelines = ["Dès que possible", "Sous 3 mois", "Sous 6 mois", "Exploration, sans urgence"];

const labelCls = "block text-[0.82rem] font-medium tracking-wide text-chalk-dim";
const fieldCls =
  "mt-2 w-full rounded-[12px] border border-ink-600 bg-ink-900/70 px-4 py-3 text-[0.95rem] text-chalk placeholder:text-mute-dim transition-colors focus:border-iris-400/70 focus:bg-ink-850 focus:outline-none";

function ErrorText({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1.5 text-[0.8rem] text-amber-sig">{children}</p>;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-chalk px-7 py-4 text-[0.95rem] font-medium text-ink-950 transition-all duration-300 hover:bg-iris-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Envoi en cours…" : "Envoyer ma demande"}
      {pending ? null : <Arrow />}
    </button>
  );
}

export function ContactForm() {
  const pathname = usePathname();
  const [state, formAction] = useActionState(submitContact, initialContactState);
  const [startedAt, setStartedAt] = useState("0");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStartedAt(String(Date.now()));
  }, []);

  useEffect(() => {
    if (state.status === "success") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div ref={successRef} className="surface-card p-8 sm:p-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-sage-400/40 bg-sage-400/10">
          <svg viewBox="0 0 20 20" className="h-5 w-5 text-sage-400" fill="none" aria-hidden="true">
            <path
              d="M4 10.5 8 14.5 16 6"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="display mt-6 text-[2rem] text-chalk">Message reçu.</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-mute">{state.message}</p>
        <p className="mt-6 text-[0.9rem] leading-relaxed text-mute-dim">
          En attendant, vous pouvez parcourir{" "}
          <Link href="/methode" className="text-iris-300 underline underline-offset-4">
            notre méthode
          </Link>{" "}
          ou nos{" "}
          <Link href="/ressources" className="text-iris-300 underline underline-offset-4">
            ressources
          </Link>
          .
        </p>
      </div>
    );
  }

  const v = state.values ?? {};

  return (
    <form action={formAction} className="surface-card p-6 sm:p-9" noValidate>
      <input type="hidden" name="startedAt" value={startedAt} />
      <input type="hidden" name="sourcePath" value={pathname} />
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message ? (
        <div
          role="alert"
          className="mb-7 rounded-[12px] border border-amber-sig/40 bg-amber-sig/[0.07] px-4 py-3 text-[0.88rem] text-amber-sig"
        >
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="name">
            Nom et prénom <span className="text-iris-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            defaultValue={v.name}
            className={fieldCls}
            placeholder="Camille Durand"
            aria-invalid={Boolean(state.errors.name)}
          />
          <ErrorText>{state.errors.name}</ErrorText>
        </div>

        <div>
          <label className={labelCls} htmlFor="email">
            E-mail professionnel <span className="text-iris-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={v.email}
            className={fieldCls}
            placeholder="camille.durand@entreprise.fr"
            aria-invalid={Boolean(state.errors.email)}
          />
          <ErrorText>{state.errors.email}</ErrorText>
        </div>

        <div>
          <label className={labelCls} htmlFor="company">
            Organisation
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            defaultValue={v.company}
            className={fieldCls}
            placeholder="Nom de votre structure"
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="role">
            Fonction
          </label>
          <input
            id="role"
            name="role"
            autoComplete="organization-title"
            defaultValue={v.role}
            className={fieldCls}
            placeholder="Directeur général, DSI, responsable métier…"
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="phone">
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={v.phone}
            className={fieldCls}
            placeholder="Optionnel"
          />
        </div>

        <div>
          <label className={labelCls} htmlFor="orgType">
            Type de structure
          </label>
          <select id="orgType" name="orgType" defaultValue={v.orgType ?? ""} className={fieldCls}>
            <option value="">Sélectionner…</option>
            {orgTypes.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="need">
            Votre besoin principal
          </label>
          <select id="need" name="need" defaultValue={v.need ?? ""} className={fieldCls}>
            <option value="">Sélectionner…</option>
            {needs.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelCls} htmlFor="timeline">
            Échéance envisagée
          </label>
          <select id="timeline" name="timeline" defaultValue={v.timeline ?? ""} className={fieldCls}>
            <option value="">Sélectionner…</option>
            {timelines.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className={labelCls} htmlFor="message">
          Votre situation <span className="text-iris-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          defaultValue={v.message}
          className={`${fieldCls} resize-y`}
          placeholder="Où en êtes-vous aujourd'hui ? Qu'avez-vous déjà tenté ? Qu'est-ce qui bloque ? Plus votre description est concrète, plus notre premier échange sera utile."
          aria-invalid={Boolean(state.errors.message)}
        />
        <ErrorText>{state.errors.message}</ErrorText>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-ink-600 bg-ink-900 accent-iris-400"
          aria-invalid={Boolean(state.errors.consent)}
        />
        <label htmlFor="consent" className="text-[0.84rem] leading-relaxed text-mute">
          J&apos;accepte que ces informations soient utilisées pour traiter ma demande et me
          recontacter. Elles ne seront ni cédées ni utilisées à des fins publicitaires. Voir la{" "}
          <Link
            href="/politique-de-confidentialite"
            className="text-iris-300 underline underline-offset-4"
          >
            politique de confidentialité
          </Link>
          .
        </label>
      </div>
      <ErrorText>{state.errors.consent}</ErrorText>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton />
        <p className="text-[0.8rem] text-mute-dim">Réponse sous 24 h ouvrées.</p>
      </div>
    </form>
  );
}
