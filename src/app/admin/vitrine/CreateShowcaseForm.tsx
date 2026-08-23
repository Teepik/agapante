"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createShowcaseItem, type ShowcaseFormState } from "@/app/admin/actions";

const initial: ShowcaseFormState = { error: "", success: "" };

const fieldCls =
  "mt-2 w-full rounded-[12px] border border-ink-600 bg-ink-900/70 px-4 py-3 text-[0.95rem] text-chalk transition-colors focus:border-iris-400/70 focus:outline-none";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-full bg-chalk px-6 py-3 text-[0.92rem] font-medium text-ink-950 transition-colors hover:bg-iris-100 disabled:opacity-60"
    >
      {pending ? "Ajout…" : "Ajouter à la vitrine"}
    </button>
  );
}

export function CreateShowcaseForm() {
  const [state, formAction] = useActionState(createShowcaseItem, initial);

  return (
    <form action={formAction} className="surface-card border border-iris-400/20 p-7">
      <h2 className="display text-[1.45rem] text-chalk">Ajouter une carte</h2>
      <p className="mt-2 text-[0.92rem] text-mute">
        Renseignez l&apos;URL et un descriptif. La carte est visible immédiatement sur{" "}
        <code className="text-iris-300">/vitrine</code>.
      </p>

      {state.error ? (
        <p
          role="alert"
          className="mt-5 rounded-[12px] border border-amber-sig/40 bg-amber-sig/[0.07] px-4 py-3 text-[0.86rem] text-amber-sig"
        >
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="mt-5 rounded-[12px] border border-sage-400/40 bg-sage-400/10 px-4 py-3 text-[0.86rem] text-sage-400">
          {state.success}
        </p>
      ) : null}

      <label htmlFor="url" className="mt-6 block text-[0.82rem] font-medium text-chalk-dim">
        URL du site ou de la webapp
      </label>
      <input
        id="url"
        name="url"
        type="url"
        required
        placeholder="https://exemple.com"
        className={fieldCls}
      />

      <label htmlFor="description" className="mt-5 block text-[0.82rem] font-medium text-chalk-dim">
        Descriptif
      </label>
      <textarea
        id="description"
        name="description"
        required
        rows={4}
        minLength={10}
        placeholder="En une ou deux phrases : le contexte, la stack, ce que le projet démontre…"
        className={`${fieldCls} resize-y`}
      />

      <div className="mt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
