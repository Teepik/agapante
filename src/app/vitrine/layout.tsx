import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Réalisations web",
  description: "Sites et applications web livrés par Agapante.",
  path: "/vitrine",
  noIndex: true,
});

export default function VitrineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
