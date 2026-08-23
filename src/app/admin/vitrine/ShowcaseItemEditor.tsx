"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import {
  removeShowcaseItem,
  reorderShowcaseItem,
  updateShowcaseItemAction,
  type ShowcaseFormState,
} from "@/app/admin/actions";
import { ShowcaseImageField } from "@/components/admin/ShowcaseImageField";
import { showcaseHostname } from "@/lib/showcase";

type Item = {
  id: number;
  url: string;
  name: string | null;
  image_url: string | null;
  description: string;
};

const initial: ShowcaseFormState = { error: "", success: "" };

const fieldCls =
  "w-full rounded-[12px] border border-ink-600 bg-ink-900/70 px-4 py-2.5 text-[0.9rem] text-chalk transition-colors focus:border-iris-400/70 focus:outline-none";

function DeleteButton({ id, label }: { id: number; label: string }) {
  return (
    <form
      action={removeShowcaseItem}
      onSubmit={(event) => {
        if (!window.confirm(`Supprimer ${label} de la vitrine ?`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-full border border-amber-sig/40 px-3 py-1.5 text-[0.78rem] text-amber-sig transition-colors hover:bg-amber-sig/10"
      >
        Supprimer
      </button>
    </form>
  );
}

function SaveButton({ uploading }: { uploading: boolean }) {
  const { pending } = useFormStatus();
  const disabled = pending || uploading;

  return (
    <button
      type="submit"
      disabled={disabled}
      className="justify-self-start rounded-full border border-ink-600 px-5 py-2 text-[0.84rem] text-chalk-dim transition-colors hover:border-iris-400/60 hover:text-chalk disabled:opacity-60 sm:col-span-2"
    >
      {uploading ? "Téléversement…" : pending ? "Enregistrement…" : "Enregistrer les modifications"}
    </button>
  );
}

function ShowcaseItemForm({ item }: { item: Item }) {
  const [state, formAction] = useActionState(updateShowcaseItemAction, initial);
  const [uploading, setUploading] = useState(false);

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      <input type="hidden" name="id" value={item.id} />

      {state.error ? (
        <p
          role="alert"
          className="rounded-[12px] border border-amber-sig/40 bg-amber-sig/[0.07] px-4 py-3 text-[0.82rem] text-amber-sig sm:col-span-2"
        >
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="rounded-[12px] border border-sage-400/40 bg-sage-400/10 px-4 py-3 text-[0.82rem] text-sage-400 sm:col-span-2">
          {state.success}
        </p>
      ) : null}

      <div className="sm:col-span-2">
        <label className="text-[0.78rem] font-medium text-chalk-dim">Nom</label>
        <input
          name="name"
          type="text"
          required
          minLength={2}
          defaultValue={item.name ?? ""}
          className={fieldCls}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-[0.78rem] font-medium text-chalk-dim">Image</label>
        <ShowcaseImageField
          currentUrl={item.image_url}
          required={false}
          onUploadingChange={setUploading}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-[0.78rem] font-medium text-chalk-dim">Commentaire</label>
        <textarea
          name="description"
          required
          rows={3}
          minLength={10}
          defaultValue={item.description}
          className={`${fieldCls} resize-y`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="text-[0.78rem] font-medium text-chalk-dim">URL du site</label>
        <input name="url" type="url" required defaultValue={item.url} className={fieldCls} />
      </div>
      <SaveButton uploading={uploading} />
    </form>
  );
}

export function ShowcaseItemEditor({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return (
      <div className="surface-card mt-8 p-10 text-center">
        <p className="text-[1rem] text-chalk-dim">Aucun projet publié pour l&apos;instant.</p>
        <p className="mt-2 text-[0.9rem] text-mute">
          Utilisez le formulaire ci-dessus pour ajouter votre premier site.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-5">
      {items.map((item, index) => {
        const label = item.name?.trim() || showcaseHostname(item.url);
        return (
          <article key={item.id} className="surface-card p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.12em] text-mute-dim">
                  Projet #{index + 1}
                </p>
                <p className="mt-1 text-[1rem] font-medium text-chalk">{label}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <form action={reorderShowcaseItem}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="direction" value="up" />
                  <button
                    type="submit"
                    disabled={index === 0}
                    className="rounded-full border border-ink-600 px-3 py-1.5 text-[0.78rem] text-chalk-dim transition-colors hover:border-iris-400/50 disabled:opacity-40"
                  >
                    ↑
                  </button>
                </form>
                <form action={reorderShowcaseItem}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="direction" value="down" />
                  <button
                    type="submit"
                    disabled={index === items.length - 1}
                    className="rounded-full border border-ink-600 px-3 py-1.5 text-[0.78rem] text-chalk-dim transition-colors hover:border-iris-400/50 disabled:opacity-40"
                  >
                    ↓
                  </button>
                </form>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ink-600 px-3 py-1.5 text-[0.78rem] text-chalk-dim transition-colors hover:border-iris-400/50"
                >
                  Ouvrir
                </a>
                <DeleteButton id={item.id} label={label} />
              </div>
            </div>

            <ShowcaseItemForm item={item} />
          </article>
        );
      })}
    </div>
  );
}
