"use client";

import { useState } from "react";
import { DATES_BAC } from "@/lib/etudes/guide-bac";
import type { Jalon } from "@/lib/etudes/guides";
import { etTypo } from "@/lib/etudes/typo";
import { useCohort } from "../cohorte";
import { Jalons } from "./Jalons";

type Voie = "generale" | "pro";

/**
 * Les dates officielles de juin 2027, voie par voie : l'élève de Terminale y lit son bac, l'élève de 1re ses épreuves
 * anticipées ; les autres classes y voient le rythme de leur futur bac.
 */
export function DatesBac() {
  const { bac } = useCohort();
  const [voie, setVoie] = useState<Voie>("generale");
  const s = DATES_BAC.session;

  const groupes: { titre: string; items: Jalon[]; pourToi: boolean }[] =
    voie === "generale"
      ? [
          { titre: `En Terminale : le bac ${s}`, items: DATES_BAC.generale.terminale, pourToi: bac === s },
          {
            titre: `En 1re : les épreuves anticipées du bac ${s + 1}`,
            items: DATES_BAC.generale.premiere,
            pourToi: bac === s + 1,
          },
        ]
      : [
          {
            titre: `En Terminale professionnelle : le bac pro ${s}`,
            items: DATES_BAC.pro.terminale,
            pourToi: bac === s,
          },
        ];

  const intro =
    bac === s
      ? "Ce sont les dates de ton bac : celles du calendrier officiel."
      : bac === s + 1 && voie === "generale"
        ? `Tes épreuves anticipées de français et de maths ont lieu en juin ${s} ; le reste de ton bac, en juin ${bac}.`
        : `Ton bac, en juin ${bac}, suivra le même rythme ; ses dates paraîtront au Bulletin officiel à la rentrée qui précède. Celles de ${s} te donnent les repères.`;

  return (
    <div className="e-gdates">
      <div className="e-gdates__head">
        <h3 className="e-gdates__title">Les dates de juin {s}</h3>
        <div className="e-seg" role="radiogroup" aria-label="Voie du bac">
          <button type="button" role="radio" aria-checked={voie === "generale"} onClick={() => setVoie("generale")}>
            Générale et techno
          </button>
          <button type="button" role="radio" aria-checked={voie === "pro"} onClick={() => setVoie("pro")}>
            Professionnelle
          </button>
        </div>
      </div>
      <p className="e-gdates__intro">{etTypo(intro)}</p>
      <div className="e-gdates__groups">
        {groupes.map((g) => (
          <section key={g.titre} className={g.pourToi ? "e-gdates__group is-toi" : "e-gdates__group"}>
            <h4 className="e-gdates__gtitle">
              {etTypo(g.titre)}
              {g.pourToi ? <span className="e-gjal__tag">Pour toi</span> : null}
            </h4>
            <Jalons items={g.items} suivre={g.pourToi} niveau={5} />
          </section>
        ))}
      </div>
      <p className="e-small e-muted">
        {voie === "pro"
          ? "Les épreuves professionnelles, en cours de formation ou ponctuelles, suivent le calendrier de ta spécialité et de ton académie. "
          : null}
        Empêché pour une cause justifiée, une maladie par exemple&#8239;? La session de remplacement a lieu{" "}
        {(voie === "generale" ? DATES_BAC.generale.remplacement : DATES_BAC.pro.remplacement).toLowerCase()}.
      </p>
    </div>
  );
}
