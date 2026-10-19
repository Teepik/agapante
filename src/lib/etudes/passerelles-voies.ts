/**
 * Les passerelles des nouvelles voies : du bac pro au BTS, du BUT à l'école d'ingénieurs…
 * Contenu rassemblé et vérifié en octobre 2026, avec ses sources ; régénéré par un script.
 */
import type { Passerelle } from "./passerelles";

export const passerellesVoies: Omit<Passerelle, "num">[] = [
  {
    id: "postbac-universite",
    from: ["cycle-integre", "cycle-postbac"],
    fromLabel: "Cycle intégré ou bachelor",
    to: "universite",
    title: "D'une école post-bac à l'université",
    when: "Après la 1re ou la 2e année",
    how: "Si l'école te convient moins que prévu, tu peux repartir en licence. Un étudiant qui a déjà son bac et veut changer de formation candidate sur Parcoursup, comme les lycéens, avec des vœux de janvier à mars. Seul le redoublement passe par une réinscription directe dans ton établissement.",
    who: "Tout étudiant de cycle préparatoire intégré ou de bachelor qui veut changer de voie.",
    draw: {
      from: ["postbac"],
      to: "u",
      t: 1,
    },
    sources: [
      "https://www.parcoursup.gouv.fr/decouvrir-parcoursup/qui-est-concerne-par-parcoursup-1062",
      "https://www.geipi-polytech.org/private/6916f1fec3c34?utm_id=22",
    ],
    fromLines: ["postbac"],
  },
  {
    id: "rebond-postbac",
    from: ["universite", "prepa-scientifique"],
    fromLabel: "Licence ou prépa",
    to: "cycle-integre",
    title: "D'une 1re année ailleurs à une école post-bac",
    when: "Après une 1re année de licence ou de prépa",
    how: "Plusieurs écoles post-bac gardent des places pour les étudiants qui changent de voie. En 2026, l'EPF ouvre 20 places en 1re année aux bacheliers en réorientation ; en 2025, elle en offrait 55 en 2e année aux étudiants de bac+1, par le concours AvenirPlus. L'ESIEE Paris accueille en 1re ou 2e année des étudiants de bac+1 ou bac+2 (admission « Rebond »), et le Global BBA de l'ESSEC a admis 16 étudiants en réorientation à Cergy en 2025.",
    note: "En 2024, La Prépa des INP acceptait aussi des étudiants de PASS en réorientation, titulaires d'un bac scientifique avec la mention très bien.",
    draw: {
      from: ["u", "sciences"],
      to: "postbac",
      t: 1,
    },
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-de-marne/epf-ecole-d-ingenieurs-generalistes-site-de-paris-cachan/diplome-d-ingenieur-de-l-epf",
      "https://www.esiee.fr/fileadmin/user_upload/Fichiers/brochures/brochure-post-bac-esiee-paris-2025-2026.pdf",
      "https://www.concours-sesame.net/media/8742/Rapport-public-2025---ESSEC-BBA---combine.pdf",
      "https://www.univ-lorraine.fr/orientation-insertion-professionnelle/wp-content/uploads/sites/7/2023/12/la-prepa-des-inp-2024-ok.pdf",
    ],
    fromLines: ["u", "sciences"],
  },
  {
    id: "prepa-cycle-postbac",
    from: ["prepa-scientifique"],
    fromLabel: "Prépa scientifique",
    to: "cycle-postbac",
    title: "De la prépa classique à une école post-bac, en 3e année",
    when: "En fin de 2e année de prépa",
    how: "Des écoles post-bac recrutent aussi des élèves de prépa scientifique, directement en cycle ingénieur. En 2026, l'EPF offrait 154 places aux élèves de MP, MPI, PC et PSI par le concours Centrale-Supélec, et 48 aux élèves de PT. L'ESIEE Paris rejoint en 2026 le concours CCINP pour recruter près de 150 élèves de prépa ; l'UTC examine les dossiers de prépa avec un entretien de groupe.",
    note: "À l'EPF et à l'ESIEE Paris, ces places passent par les banques d'épreuves des prépas : les mêmes écrits servent pour plusieurs écoles.",
    draw: {
      from: ["sciences"],
      to: "postbac",
      t: 2,
    },
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-de-marne/epf-ecole-d-ingenieurs-generalistes-site-de-paris-cachan/diplome-d-ingenieur-de-l-epf",
      "https://www.esiee.fr/fileadmin/user_upload/Fichiers/presse/communiques-presse/cp-2026/dossier-de-presse-conf-presse-esieeparis-29-janvier-2026.pdf",
      "https://www.utc.fr/formations/candidater-a-lutc/candidater-au-diplome-dingenieur-utc/",
    ],
    fromLines: ["sciences"],
  },
  {
    id: "licence-cycle-postbac",
    from: ["universite", "u-master"],
    fromLabel: "Licence ou master de sciences",
    to: "cycle-postbac",
    title: "De la licence au cycle ingénieur d'une école post-bac",
    when: "Après une L2, une L3 ou un M1",
    how: "L'UTC admet des étudiants de licence en branche, sur dossier et entretien individuel : après une L2 de sciences validée, pour trois ans ; après une L3, pour deux ans et demi ; après un M1 et un stage industriel d'au moins 20 semaines, pour deux ans. À l'EPF, le concours AvenirPlus offrait en 2025 41 places après bac+3 et 20 après un M1 scientifique.",
    draw: {
      from: ["u"],
      to: "postbac",
      t: 3,
    },
    sources: [
      "https://www.utc.fr/formations/candidater-a-lutc/candidater-au-diplome-dingenieur-utc/",
      "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-de-marne/epf-ecole-d-ingenieurs-generalistes-site-de-paris-cachan/diplome-d-ingenieur-de-l-epf",
    ],
    fromLines: ["u"],
  },
  {
    id: "bachelor-grande-ecole",
    from: ["cycle-postbac"],
    fromLabel: "Bachelor de commerce",
    to: "ecole-commerce",
    title: "Du bachelor au programme grande école",
    when: "À bac+3 ou bac+4, après le bachelor",
    how: "Un bachelor mène à l'emploi ou au master : 55 % des diplômés du Global BBA de l'ESSEC poursuivent en master ou en mastère spécialisé. Les grandes écoles de commerce recrutent ces diplômés sur titre : à l'ESSEC, avec un test de management (GMAT, GRE ou TAGE MAGE), un test d'anglais et un entretien de 45 minutes. Les concours Passerelle et Tremplin ouvrent aussi des places à bac+3 : en 2026, 1 000 à BSB, 650 à KEDGE et 540 à NEOMA.",
    draw: {
      from: ["postbac"],
      to: "commerce",
      t: 3,
    },
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=26156&typeBac=0&originePc=0",
      "https://www.essec.edu/fr/programme/grande-ecole/grande-ecole-admis-sur-titre-francais/admission/",
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2026-02/nombre-de-places-aux-concours-2026-offertes-par-les-tablissements-d-enseignement-sup-rieures-techniques-priv-es-et-consulaires-2026--39467.pdf",
    ],
    fromLines: ["postbac"],
  },
];
