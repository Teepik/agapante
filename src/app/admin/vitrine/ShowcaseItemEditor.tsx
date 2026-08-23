"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  removeShowcaseItem,
  reorderShowcaseItem,
  updateShowcaseItemAction,
} from "@/app/admin/actions";
import { showcaseHostname } from "@/lib/showcase";

type Item = {
  id: number;
  url: string;
  description: string;
};

const fieldCls =
  "w-full rounded-[12px] border border-ink-600 bg-ink-900/70 px-4 py-2.5 text-[0.9rem] text-chalk transition-colors focus:border-iris-400/70 focus:outline-none";

export function ShowcaseItemEditor({
  items,
}: {
  items: Item[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function refresh(action: () => Promise<void>) {
    startTransition(async () => {
      await action();
      router.refresh();
    });
  }

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
      {items.map((item, index) => (
        <article key={item.id} className="surface-card p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.12em] text-mute-dim">
                Projet #{index + 1}
              </p>
              <p className="mt-1 text-[1rem] font-medium text-chalk">{showcaseHostname(item.url)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <form
                action={(formData) =>
                  refresh(async () => {
                    await reorderShowcaseItem(formData);
                  })
                }
              >
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="direction" value="up" />
                <button
                  type="submit"
                  disabled={pending || index === 0}
                  className="rounded-full border border-ink-600 px-3 py-1.5 text-[0.78rem] text-chalk-dim transition-colors hover:border-iris-400/50 disabled:opacity-40"
                >
                  ↑
                </button>
              </form>
              <form
                action={(formData) =>
                  refresh(async () => {
                    await reorderShowcaseItem(formData);
                  })
                }
              >
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="direction" value="down" />
                <button
                  type="submit"
                  disabled={pending || index === items.length - 1}
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
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  if (
                    !window.confirm(
                      `Supprimer ${showcaseHostname(item.url)} de la vitrine ?`
                    )
                  ) {
                    return;
                  }
                  const formData = new FormData();
                  formData.set("id", String(item.id));
                  refresh(async () => {
                    await removeShowcaseItem(formData);
                  });
                }}
                className="rounded-full border border-amber-sig/40 px-3 py-1.5 text-[0.78rem] text-amber-sig transition-colors hover:bg-amber-sig/10 disabled:opacity-40"
              >
                Supprimer
              </button>
            </div>
          </div>

          <form
            action={(formData) =>
              refresh(async () => {
                await updateShowcaseItemAction(formData);
              })
            }
            className="grid gap-4"
          >
            <input type="hidden" name="id" value={item.id} />
            <div>
              <label className="text-[0.78rem] font-medium text-chalk-dim">URL</label>
              <input name="url" type="url" required defaultValue={item.url} className={fieldCls} />
            </div>
            <div>
              <label className="text-[0.78rem] font-medium text-chalk-dim">Descriptif</label>
              <textarea
                name="description"
                required
                rows={3}
                minLength={10}
                defaultValue={item.description}
                className={`${fieldCls} resize-y`}
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="justify-self-start rounded-full border border-ink-600 px-5 py-2 text-[0.84rem] text-chalk-dim transition-colors hover:border-iris-400/60 hover:text-chalk disabled:opacity-60"
            >
              Enregistrer les modifications
            </button>
          </form>
        </article>
      ))}
    </div>
  );
}
