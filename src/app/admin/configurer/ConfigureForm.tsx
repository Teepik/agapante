"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { configurePassword, type ConfigureState } from "../actions";

const initial: ConfigureState = { error: "", success: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-full bg-chalk px-6 py-3.5 text-[0.95rem] font-medium text-ink-950 transition-colors hover:bg-iris-100 disabled:opacity-60"
    >
      {pending ? "Enregistrement…" : "Enregistrer et accéder au back-office"}
    </button>
  );
}

export function ConfigureForm({ token }: { token: string }) {
  const [state, formAction] = useActionState(configurePassword, initial);

  return (
    <form action={formAction} className="surface-card w-full max-w-md p-8">
      <h1 className="display text-[1.9rem] text-chalk">Configurer l&apos;accès admin</h1>
      <p className="mt-3 text-[0.92rem] leading-relaxed text-mute">
        Choisissez un mot de passe pour accéder au back-office. Il remplacera tout mot de passe
        précédemment configuré dans Vercel.
      </p>

      <input type="hidden" name="token" value={token} />

      {state.error ? (
        <p
          role="alert"
          className="mt-6 rounded-[12px] border border-amber-sig/40 bg-amber-sig/[0.07] px-4 py-3 text-[0.86rem] text-amber-sig"
        >
          {state.error}
        </p>
      ) : null}

      <label htmlFor="password" className="mt-7 block text-[0.82rem] font-medium text-chalk-dim">
        Nouveau mot de passe
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        minLength={12}
        autoComplete="new-password"
        autoFocus
        className="mt-2 w-full rounded-[12px] border border-ink-600 bg-ink-900/70 px-4 py-3 text-[0.95rem] text-chalk transition-colors focus:border-iris-400/70 focus:outline-none"
      />
      <p className="mt-2 text-[0.78rem] text-mute-dim">12 caractères minimum.</p>

      <label htmlFor="confirm" className="mt-5 block text-[0.82rem] font-medium text-chalk-dim">
        Confirmer le mot de passe
      </label>
      <input
        id="confirm"
        name="confirm"
        type="password"
        required
        minLength={12}
        autoComplete="new-password"
        className="mt-2 w-full rounded-[12px] border border-ink-600 bg-ink-900/70 px-4 py-3 text-[0.95rem] text-chalk transition-colors focus:border-iris-400/70 focus:outline-none"
      />

      <div className="mt-7">
        <SubmitButton />
      </div>
    </form>
  );
}
