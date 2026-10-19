"use client";

import { SESSION_PSUP } from "@/lib/etudes/guide-parcoursup";
import { etTypo } from "@/lib/etudes/typo";
import { useCohort } from "../cohorte";
import { Jalons } from "./Jalons";

/**
 * Le calendrier officiel de Parcoursup : pour l'élève dont c'est la session, ses dates, avec ce qui est passé et la
 * prochaine étape ; pour les autres, les dates de la dernière session publiée, comme repères.
 */
export function CalendrierPsup() {
  const { bac } = useCohort();
  const a = SESSION_PSUP.annee;
  const aMoi = bac === a;

  return (
    <div className="e-gdates">
      <div className="e-gdates__head">
        <h3 className="e-gdates__title">
          {etTypo(aMoi ? `Ta session : Parcoursup ${a}` : `La session ${a}, pour te repérer`)}
        </h3>
      </div>
      <p className="e-gdates__intro">
        {etTypo(
          aMoi
            ? `Les dates officielles, publiées en octobre ${a - 1}. En 2026, chaque date limite tombait à 23 h 59, heure de Paris.`
            : `Ta session, Parcoursup ${bac}, suivra le même rythme ; ses dates exactes paraîtront à l'automne ${bac - 1}.`,
        )}
      </p>
      <div className="e-gdates__group e-gdates__group--solo">
        <Jalons items={SESSION_PSUP.jalons} suivre={aMoi} />
      </div>
    </div>
  );
}
