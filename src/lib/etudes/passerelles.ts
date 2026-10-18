import type { LineId } from "./lines";
import { frTypo } from "@/lib/typo";

export type Passerelle = {
  id: string;
  num: number;
  from: string[];
  fromLines: (LineId | "u")[];
  fromLabel: string;
  to: string;
  title: string;
  when: string;
  how: string;
  who?: string;
  note?: string;
  draw?: { from: string; kind: "arc" | "bypass"; bend?: number };
};

export type DoubleCursus = {
  id: string;
  title: string;
  lines: (LineId | "u")[];
  what: string;
  examples: string[];
  acces: string;
  rythme: string;
  apres: string;
  url?: string;
};

export const passerelles: Passerelle[] = frTypo([
  {
    id: "khagne-commerce",
    num: 1,
    from: ["khagne"],
    fromLines: ["lettres"],
    fromLabel: "Khâgne",
    to: "ecole-commerce",
    title: "De la khâgne aux écoles de commerce",
    when: "En fin de khâgne",
    how: "À compléter.",
    draw: { from: "khagne", kind: "arc", bend: 0.25 },
  },
  {
    id: "licence-ingenieur",
    num: 2,
    from: ["u-sciences"],
    fromLines: ["u"],
    fromLabel: "Licence de sciences",
    to: "ecole-ingenieurs",
    title: "De la licence à l'école d'ingénieurs",
    when: "Après une licence",
    how: "À compléter.",
    draw: { from: "u-sciences", kind: "bypass" },
  },
  {
    id: "prepa-officiers",
    num: 3,
    from: ["prepa-scientifique"],
    fromLines: ["sciences"],
    fromLabel: "Prépa scientifique",
    to: "concours-officiers",
    title: "Des prépas à Saint-Cyr",
    when: "En fin de prépa",
    how: "À compléter.",
    draw: { from: "prepa-scientifique", kind: "arc", bend: -0.2 },
  },
  {
    id: "master-sante",
    num: 4,
    from: ["u-sciences"],
    fromLines: ["u"],
    fromLabel: "Licence ou master",
    to: "etudes-sante",
    title: "Vers la santé après un master",
    when: "Après bac+3 ou bac+5",
    how: "À compléter.",
    draw: { from: "u-sciences", kind: "arc", bend: 0.15 },
  },
]);

export const passerelleById = Object.fromEntries(passerelles.map((p) => [p.id, p])) as Record<string, Passerelle>;

export const doublesCursus: DoubleCursus[] = frTypo([
  {
    id: "doubles-licences",
    title: "Les doubles licences",
    lines: ["scpo", "commerce"],
    what: "À compléter.",
    examples: ["Droit et économie"],
    acces: "À compléter.",
    rythme: "À compléter.",
    apres: "À compléter.",
  },
]);
