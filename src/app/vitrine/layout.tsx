import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Vitrine projets",
  description: "Sélection de sites et webapps réalisés.",
  path: "/vitrine",
  noIndex: true,
});

export default function VitrineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
