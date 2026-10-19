import type { Metadata } from "next";
import { MetroApp } from "@/components/etudes/metro/MetroApp";

export const metadata: Metadata = {
  title: { absolute: "La carte des études" },
  description:
    "Un plan de métro des études après la 3e : prépas, écoles d'ingénieurs, BUT, BTS, alternance et université, avec une fiche pour chaque station.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/etudes/carte" },
};

export default function CartePage() {
  return <MetroApp />;
}
