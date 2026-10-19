"use client";

import { GUIDE_BAC } from "@/lib/etudes/guide-bac";
import { DatesBac } from "./DatesBac";
import { GuideApp } from "./GuideShell";
import { NoteBac } from "./NoteBac";

/** L'étape du rail où se trouve l'élève : sa classe, cette année. */
function ici(classe: string): string | null {
  if (classe === "3e") return "troisieme";
  if (classe === "2nde") return "seconde";
  if (classe === "1re") return "premiere";
  if (classe === "terminale") return "terminale";
  return null;
}

export function GuideBac() {
  return (
    <GuideApp
      guide={GUIDE_BAC}
      outils={{ "note-bac": <NoteBac />, "dates-bac": <DatesBac /> }}
      actif={ici}
      autre={{ href: "/etudes/parcoursup", label: "Parcoursup, pas à pas" }}
    />
  );
}
