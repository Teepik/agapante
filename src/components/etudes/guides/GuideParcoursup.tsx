"use client";

import { CALENDRIER, GUIDE_PSUP, SITUATIONS, SITUATIONS_TEXTES } from "@/lib/etudes/guide-parcoursup";
import { CalendrierPsup } from "./CalendrierPsup";
import { GuideApp } from "./GuideShell";
import { Situations } from "./Situations";

/**
 * L'étape de Parcoursup où se trouve un élève de Terminale aujourd'hui, d'après le calendrier officiel
 * de sa session ; pour les autres classes, Parcoursup reste à venir.
 */
function ici(classe: string, aujourdhui: Date): string | null {
  if (classe !== "terminale") return null;
  const t = aujourdhui.getTime();
  const etape = CALENDRIER.find((e) => t >= Date.parse(e.du) && t < Date.parse(e.au));
  return etape?.rail ?? null;
}

export function GuideParcoursup() {
  return (
    <GuideApp
      guide={GUIDE_PSUP}
      outils={{
        calendrier: <CalendrierPsup />,
        reponses: (
          <Situations titre={SITUATIONS_TEXTES.titre} question={SITUATIONS_TEXTES.question} items={SITUATIONS} />
        ),
      }}
      actif={ici}
      autre={{ href: "/etudes/bac", label: "Le bac, pas à pas" }}
    />
  );
}
