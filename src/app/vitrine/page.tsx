import { ShowcaseCarousel } from "@/components/vitrine/ShowcaseCarousel";
import { isDbConfigured, listShowcaseItems } from "@/lib/db";
import { showcaseHostname } from "@/lib/showcase";
import { resolveShowcaseImageDisplayUrl } from "@/lib/showcase-image";

export const dynamic = "force-dynamic";

export default async function VitrinePage() {
  if (!isDbConfigured()) {
    return <ShowcaseCarousel items={[]} />;
  }

  let items: Awaited<ReturnType<typeof listShowcaseItems>> = [];

  try {
    items = await listShowcaseItems();
  } catch {
    items = [];
  }

  return (
    <ShowcaseCarousel
      items={items.map((item) => ({
        id: item.id,
        url: item.url,
        name: item.name?.trim() || showcaseHostname(item.url),
        imageUrl: resolveShowcaseImageDisplayUrl(item.image_url),
        comment: item.description,
      }))}
    />
  );
}
