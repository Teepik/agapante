"use client";

import { startTransition, useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import type { ActionState } from "@/lib/conduites/actions";
import { buttonCls, type Variant, type Size } from "./styles";

export function Spinner({ className = "" }: { className?: string }) {
  return (
    <svg className={`h-4 w-4 animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function SubmitButton({ children, variant = "primary", size = "md", className = "", ...rest }:
  { children: React.ReactNode; variant?: Variant; size?: Size; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={buttonCls(variant, size, className)} {...rest}>
      {pending ? <Spinner /> : null}
      {children}
    </button>
  );
}

export function Notice({ state }: { state: ActionState }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(true);
    if (state?.ok) { const t = setTimeout(() => setVisible(false), 3500); return () => clearTimeout(t); }
  }, [state]);
  if (!state?.error && !state?.ok) return null;
  if (!visible) return null;
  return (
    <p role="status" className={`animate-rise rounded-[14px] px-3.5 py-2.5 text-[14px] ${state.error ? "bg-bad-soft text-bad" : "bg-good-soft text-good"}`}>
      {state.error ?? state.ok}
    </p>
  );
}

/** Formulaire branché sur une server action à état ; ne vide pas les champs après une erreur. */
export function ActionForm({ action, children, className = "" }: {
  action: (s: ActionState, fd: FormData) => Promise<ActionState>; children: React.ReactNode; className?: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  return (
    <form
      action={formAction}
      onSubmit={e => { e.preventDefault(); const fd = new FormData(e.currentTarget); startTransition(() => formAction(fd)); }}
      aria-busy={pending}
      className={`space-y-4 ${className}`}>
      <Notice state={state} />
      {children}
    </form>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="field-hint block">{hint}</span>}
    </label>
  );
}

/** Copie un texte dans le presse-papiers (code d'invitation, lien). */
export function CopyButton({ text, label = "Copier", className = "" }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className={buttonCls("secondary", "sm", className)}
      onClick={async () => { try { await navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1800); } catch {} }}>
      {done ? "Copié ✓" : label}
    </button>
  );
}

/** Bouton de confirmation en deux temps, sans modale. */
export function ConfirmSubmit({ children, confirmLabel = "Confirmer ?", variant = "danger", size = "sm" }:
  { children: React.ReactNode; confirmLabel?: string; variant?: Variant; size?: Size }) {
  const [armed, setArmed] = useState(false);
  const { pending } = useFormStatus();
  useEffect(() => { if (!armed) return; const t = setTimeout(() => setArmed(false), 4000); return () => clearTimeout(t); }, [armed]);
  if (!armed) return <button type="button" onClick={() => setArmed(true)} className={buttonCls(variant, size)}>{children}</button>;
  return <button type="submit" disabled={pending} className={buttonCls("primary", size, "!bg-bad")}>{pending ? <Spinner /> : null}{confirmLabel}</button>;
}

/** Select qui soumet son formulaire dès qu'une valeur est choisie. */
export function AutoSubmitSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} onChange={e => { props.onChange?.(e); e.currentTarget.form?.requestSubmit(); }} />;
}
