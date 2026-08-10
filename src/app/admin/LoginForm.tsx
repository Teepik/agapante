"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "./actions";

const initial: LoginState = { error: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-chalk px-6 py-3.5 text-[0.95rem] font-medium text-ink-950 transition-colors hover:bg-iris-100 disabled:opacity-60"
    >
      {pending ? "Vérification…" : "Se connecter"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, initial);

  return (
    <form action={formAction} className="surface-card w-full max-w-md p-8">
      <h1 className="display text-[1.9rem] text-chalk">Espace d&apos;administration</h1>
      <p className="mt-3 text-[0.92rem] leading-relaxed text-mute">
        Accès réservé. Saisissez le mot de passe pour consulter les demandes de contact.
      </p>

      {state.error ? (
        <p
          role="alert"
          className="mt-6 rounded-[12px] border border-amber-sig/40 bg-amber-sig/[0.07] px-4 py-3 text-[0.86rem] text-amber-sig"
        >
          {state.error}
        </p>
      ) : null}

      <label htmlFor="password" className="mt-7 block text-[0.82rem] font-medium text-chalk-dim">
        Mot de passe
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        autoFocus
        className="mt-2 w-full rounded-[12px] border border-ink-600 bg-ink-900/70 px-4 py-3 text-[0.95rem] text-chalk transition-colors focus:border-iris-400/70 focus:outline-none"
      />

      <div className="mt-7">
        <SubmitButton />
      </div>
    </form>
  );
}
