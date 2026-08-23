import { isDbConfigured, listShowcaseItems } from "@/lib/db";
import { resolveShowcaseImageDisplayUrl } from "@/lib/showcase-image";
import { CreateShowcaseForm } from "./CreateShowcaseForm";
import { ShowcaseItemEditor } from "./ShowcaseItemEditor";

export const dynamic = "force-dynamic";

export default async function VitrineAdminPage() {
  if (!isDbConfigured()) {
    return (
      <div className="surface-card mx-auto max-w-2xl p-8">
        <h1 className="display text-[1.8rem] text-chalk">Base de données non configurée</h1>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-mute">
          Ajoutez une base Postgres (Neon) dans Vercel pour gérer la vitrine.
        </p>
      </div>
    );
  }

  let items: Awaited<ReturnType<typeof listShowcaseItems>> = [];
  let error: string | null = null;

  try {
    items = await listShowcaseItems();
  } catch (e) {
    error = e instanceof Error ? e.message : "Erreur inconnue";
  }

  if (error) {
    return (
      <div className="surface-card mx-auto max-w-2xl p-8">
        <h1 className="display text-[1.8rem] text-chalk">Connexion impossible</h1>
        <p className="mt-4 text-[0.92rem] text-mute">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-3xl">
        <h1 className="display text-[clamp(1.9rem,3.5vw,2.6rem)] text-chalk">Vitrine projets</h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-mute">
          Chaque carte comprend un nom, une image, un commentaire et le lien du site. Ajoutez-en une
          ci-dessous — elle apparaît sur{" "}
          <a
            href="/vitrine"
            target="_blank"
            className="text-iris-300 underline underline-offset-4 hover:text-iris-200"
          >
            /vitrine
          </a>
          . Cette page n&apos;est pas liée depuis le site public.
        </p>
      </div>

      <div className="mt-8 max-w-3xl">
        <CreateShowcaseForm />
      </div>

      <ShowcaseItemEditor
        items={items.map((item) => ({
          ...item,
          image_display_url: resolveShowcaseImageDisplayUrl(item.image_url),
        }))}
      />
    </div>
  );
}
