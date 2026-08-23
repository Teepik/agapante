import { ShowcaseExperience } from "@/components/vitrine/ShowcaseExperience";
import { isDbConfigured, listShowcaseItems } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function VitrinePage() {
  if (!isDbConfigured()) {
    return (
      <ShowcaseExperience
        items={[]}
      />
    );
  }

  let items: Awaited<ReturnType<typeof listShowcaseItems>> = [];

  try {
    items = await listShowcaseItems();
  } catch {
    items = [];
  }

  return (
    <ShowcaseExperience
      items={items.map((item) => ({
        id: item.id,
        url: item.url,
        description: item.description,
      }))}
    />
  );
}
