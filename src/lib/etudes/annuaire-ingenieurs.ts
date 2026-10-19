/**
 * L'annuaire des écoles d'ingénieurs habilitées par la Commission des titres d'ingénieur (CTI) :
 * une ligne par école, pour chercher au-delà des fiches détaillées.
 */
import type { Recrutement, Statut } from "./ecoles";

export type EcoleAnnuaire = {
  id: string;
  nom: string;
  court?: string;
  ville: string;
  region?: string;
  statut?: Statut;
  recrutement?: Recrutement[];
  concours?: string;
  /** L'école délivre aussi le titre d'ingénieur par l'apprentissage. */
  apprentissage?: boolean;
  site?: string;
  /** L'identifiant de sa fiche détaillée, quand elle en a une. */
  fiche?: string;
};

export const ANNUAIRE_SOURCE = { label: "", url: "", date: "" };

export const annuaire: EcoleAnnuaire[] = [];
