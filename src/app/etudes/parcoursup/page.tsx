import type { Metadata } from "next";
import { GuideParcoursup } from "@/components/etudes/guides/GuideParcoursup";

export const metadata: Metadata = {
  title: { absolute: "Parcoursup, pas à pas" },
  description:
    "Parcoursup expliqué étape par étape : le calendrier, les vœux, le dossier, les réponses et ce qu'il faut faire pour chacune, la phase complémentaire.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/etudes/parcoursup" },
};

export default function ParcoursupPage() {
  return <GuideParcoursup />;
}
