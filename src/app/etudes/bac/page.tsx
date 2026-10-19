import type { Metadata } from "next";
import { GuideBac } from "@/components/etudes/guides/GuideBac";

export const metadata: Metadata = {
  title: { absolute: "Le bac, pas à pas" },
  description:
    "Le baccalauréat expliqué de la 2nde à la Terminale : les trois voies, les spécialités et les options, le calcul de la note, les épreuves et les résultats.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/etudes/bac" },
};

export default function BacPage() {
  return <GuideBac />;
}
