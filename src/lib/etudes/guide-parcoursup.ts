/**
 * « Parcoursup, pas à pas » : le principe, le calendrier, les vœux, le dossier, l'examen, les réponses et la marche
 * à suivre pour chacune, les solutions sans proposition, l'inscription et les aides.
 * Vérifié le 19 octobre 2026 sur parcoursup.gouv.fr et enseignementsup-recherche.gouv.fr. Les dates exactes viennent
 * du calendrier officiel de la session 2027 ; les autres textes s'écrivent avec les repères de cohorte ({B}).
 */
import type { Guide, Jalon, Situation, Source } from "./guides";
import { etTypo } from "./typo";

const P = {
  calendrier2027: {
    label: "Parcoursup, le calendrier de la session 2027 (octobre 2026)",
    url: "https://www.parcoursup.gouv.fr/sites/default/files/database/documents/2026-10/calendrier-parcoursup-2027-805_0.pdf",
  },
  calendrierPage: {
    label: "Parcoursup, le calendrier pas à pas",
    url: "https://www.parcoursup.gouv.fr/calendrier",
  },
  conseilsVoeux: {
    label: "Parcoursup, conseils pour formuler tes vœux (mars 2026)",
    url: "https://www.parcoursup.gouv.fr/candidater-sur-parcoursup/nos-conseils-pour-formuler-vos-voeux-1628",
  },
  faqVoeux: {
    label: "Parcoursup, questions fréquentes : formuler ses vœux",
    url: "https://www.parcoursup.gouv.fr/faq/thematiques/fonctionnement-de-parcoursup/formuler-ses-voeux",
  },
  faqDossier: {
    label: "Parcoursup, questions fréquentes : compléter son dossier",
    url: "https://www.parcoursup.gouv.fr/faq/thematiques/fonctionnement-de-parcoursup/completer-son-dossier",
  },
  conseilsDossier: {
    label: "Parcoursup, conseils pour compléter ton dossier et confirmer tes vœux (mars 2026)",
    url: "https://www.parcoursup.gouv.fr/candidater-sur-parcoursup/nos-conseils-pour-completer-votre-dossier-et-confirmer-vos-voeux-1631",
  },
  ficheAvenir: {
    label: "Parcoursup, la fiche Avenir (mars 2026)",
    url: "https://www.parcoursup.gouv.fr/sites/default/files/database/documents/2026-03/la-fiche-avenir-dans-la-proc-dure-parcoursup-1146.pdf",
  },
  ficheAvenirFaq: {
    label: "Parcoursup, questions fréquentes : la fiche Avenir",
    url: "https://www.parcoursup.gouv.fr/faq/thematiques/autres-sujets/fiche-avenir",
  },
  examen: {
    label: "Parcoursup, comment les formations examinent les candidatures (mai 2026)",
    url: "https://www.parcoursup.gouv.fr/candidater-sur-parcoursup/comment-les-formations-examinent-les-candidatures-1357",
  },
  faqExamen: {
    label: "Parcoursup, questions fréquentes : l'examen des vœux",
    url: "https://www.parcoursup.gouv.fr/faq/thematiques/fonctionnement-de-parcoursup/examen-des-voeux-par-les-formations",
  },
  faqReponses: {
    label: "Parcoursup, questions fréquentes : recevoir les réponses",
    url: "https://www.parcoursup.gouv.fr/faq/thematiques/fonctionnement-de-parcoursup/recevoir-les-reponses-et-propositions-d-admission",
  },
  conseilsAdmission: {
    label: "Parcoursup, conseils pour la phase d'admission (juin 2026)",
    url: "https://www.parcoursup.gouv.fr/candidater-sur-parcoursup/nos-conseils-pour-la-phase-d-admission-3450",
  },
  classement: {
    label: "Parcoursup, comment classer tes vœux en attente (juin 2026)",
    url: "https://www.parcoursup.gouv.fr/candidater-sur-parcoursup/comment-classer-vos-voeux-en-attente-3474",
  },
  livret: {
    label: "Parcoursup, le livret de la phase d'admission 2026",
    url: "https://www.parcoursup.gouv.fr/sites/default/files/database/documents/2026-05/livret-phase-admission-parcoursup-2026-1167.pdf",
  },
  complementaire: {
    label: "Parcoursup, tout savoir sur la phase complémentaire (septembre 2026)",
    url: "https://www.parcoursup.gouv.fr/contenus/tout-savoir-sur-la-phase-complementaire-3462",
  },
  solutions: {
    label: "Parcoursup, les solutions sans proposition d'admission (juin 2026)",
    url: "https://www.parcoursup.gouv.fr/contenus/les-solutions-si-vous-n-avez-pas-recu-de-proposition-d-admission-3456",
  },
  caes: {
    label: "Parcoursup, l'accompagnement par les CAES (septembre 2026)",
    url: "https://www.parcoursup.gouv.fr/contenus/l-accompagnement-personnalise-par-les-caes-3465",
  },
  bilan2026: {
    label: "Enseignement supérieur, Parcoursup 2026 : des résultats stables (19 octobre 2026)",
    url: "https://www.enseignementsup-recherche.gouv.fr/fr/parcoursup-2026-des-resultats-stables-dans-un-contexte-de-progression-historique-des-candidatures-104400",
  },
  juin2026: {
    label: "Enseignement supérieur, classement des vœux en attente et phase complémentaire (5 juin 2026)",
    url: "https://www.enseignementsup-recherche.gouv.fr/fr/parcoursup-classement-des-voeux-en-attente-et-ouverture-de-la-phase-complementaire-103064",
  },
  juillet2026: {
    label: "Enseignement supérieur, fin de la phase principale (11 juillet 2026)",
    url: "https://www.enseignementsup-recherche.gouv.fr/fr/parcoursup-fin-de-la-phase-principale-poursuite-des-dispositifs-d-accompagnement-des-candidats-103852",
  },
  inscription: {
    label: "Parcoursup, s'inscrire dans la formation acceptée (juin 2026)",
    url: "https://www.parcoursup.gouv.fr/candidater-sur-parcoursup/j-ai-accepte-une-proposition-d-admission-comment-m-inscrire-dans-ma-5457",
  },
  aides: {
    label: "Parcoursup, les aides financières et le logement Crous (mai 2026)",
    url: "https://www.parcoursup.gouv.fr/preparer-sa-vie-etudiante/les-aides-financieres-et-les-demandes-de-logement-des-crous-1664",
  },
  mobilite: {
    label: "Parcoursup, l'aide à la mobilité (juillet 2026)",
    url: "https://www.parcoursup.gouv.fr/preparer-sa-vie-etudiante/l-aide-la-mobilite-parcoursup-1667",
  },
  contacts: {
    label: "Parcoursup, les contacts téléphoniques (septembre 2026)",
    url: "https://www.parcoursup.gouv.fr/contenus/contacts-telephoniques-1319",
  },
  ouverture2026: {
    label: "Enseignement supérieur, la phase d'admission ouvre le 2 juin 2026 à 19 h",
    url: "https://www.enseignementsup-recherche.gouv.fr/fr/la-phase-d-admission-parcoursup-ouvre-mardi-2-juin-2026-19h-103022",
  },
  comite: {
    label: "Comité éthique et scientifique de Parcoursup, 8e rapport (avril 2026)",
    url: "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2026-04/8e-rapport-du-comit-thique-et-scientifique-de-parcoursup-et-mon-master-39958.pdf",
  },
  vraiFaux: {
    label: "Parcoursup, le vrai du faux (mai 2026)",
    url: "https://www.parcoursup.gouv.fr/decouvrir-parcoursup/le-vrai-du-faux-sur-parcoursup-1794",
  },
  bts: {
    label: "Enseignement supérieur, le BTS (mars 2025)",
    url: "https://www.enseignementsup-recherche.gouv.fr/fr/brevet-de-technicien-superieur-bts-45915",
  },
  handicap: {
    label: "Parcoursup, questions fréquentes : candidats en situation de handicap",
    url: "https://www.parcoursup.gouv.fr/faq/thematiques/candidats-parcoursup/candidats-en-situation-de-handicap",
  },
  sportifs: {
    label: "Parcoursup, sportifs de haut niveau et artistes confirmés",
    url: "https://www.parcoursup.gouv.fr/faq/thematiques/candidats-parcoursup/sportifs-de-haut-niveau-et-artistes-confirmes",
  },
  cesure: {
    label: "Parcoursup, questions fréquentes : la demande de césure",
    url: "https://www.parcoursup.gouv.fr/faq/thematiques/autres-sujets/demande-de-cesure",
  },
  serviceNational: {
    label: "Parcoursup, concilier service national et études (mars 2026)",
    url: "https://www.parcoursup.gouv.fr/candidater-sur-parcoursup/concilier-service-national-et-poursuite-d-etudes-post-bac-5439",
  },
  reorientation: {
    label: "Parcoursup, questions fréquentes : étudiants en réorientation",
    url: "https://www.parcoursup.gouv.fr/faq/thematiques/candidats-parcoursup/etudiants-en-reorientation",
  },
  plateforme: {
    label: "Parcoursup, questions fréquentes : s'inscrire sur la plateforme",
    url: "https://www.parcoursup.gouv.fr/faq/thematiques/fonctionnement-de-parcoursup/s-inscrire-sur-la-plateforme",
  },
} satisfies Record<string, Source>;

export const GUIDE_PSUP: Guide = etTypo({
  titre: "Parcoursup, pas à pas",
  lede: "Un seul dossier, jusqu'à dix vœux, des réponses qui arrivent à partir de début juin. Parcoursup suit un calendrier fixe, et chaque réponse a sa marche à suivre.",
  pourToi: {
    "4e": "Ta session : Parcoursup {B}, l'année de ta Terminale. Ton dossier commencera avec tes bulletins de 1re, en {B-2}-{B-1}.",
    "3e": "Ta session : Parcoursup {B}, l'année de ta Terminale. Ton dossier commencera avec tes bulletins de 1re, en {B-2}-{B-1}.",
    "2nde":
      "Ta session : Parcoursup {B}, l'année de ta Terminale. Ton dossier commencera l'an prochain, avec tes bulletins de 1re.",
    "1re":
      "Ta session : Parcoursup {B}, l'an prochain. Tes bulletins de cette année et tes épreuves anticipées de juin {B-1} entreront dans ton dossier.",
    terminale:
      "Ta session : Parcoursup {B}. Le site ouvre mi-décembre {B-1}, tes vœux se font de mi-janvier à mi-mars, les réponses arrivent début juin.",
  },
  rail: [
    {
      id: "informer",
      quand: "Automne {B-1}",
      titre: "Tu t'informes",
      texte: "Salons, portes ouvertes, et le site Parcoursup à la mi-décembre.",
      section: "principe",
    },
    {
      id: "voeux",
      quand: "Mi-janvier à mi-mars {B}",
      titre: "Tes vœux",
      texte: "Jusqu'à 10, sans les classer, plus 10 en apprentissage.",
      section: "voeux",
      cle: true,
    },
    {
      id: "confirmer",
      quand: "Début avril {B}",
      titre: "Dossier complet",
      texte: "Seuls les vœux confirmés partent aux formations.",
      section: "dossier",
      cle: true,
    },
    {
      id: "examen",
      quand: "Avril et mai {B}",
      titre: "Les formations lisent",
      texte: "Des enseignants examinent ton dossier, vœu par vœu.",
      section: "examen",
    },
    {
      id: "reponses",
      quand: "Début juin {B}",
      titre: "Les réponses",
      texte: "Tu réponds à chaque proposition dans le délai affiché.",
      section: "reponses",
      cle: true,
    },
    {
      id: "inscription",
      quand: "Juillet {B}",
      titre: "Le bac, puis l'inscription",
      texte: "Tu t'inscris dans la formation acceptée.",
      section: "apres",
    },
  ],
  sections: [
    {
      id: "principe",
      titre: "Parcoursup en deux minutes",
      court: "Le principe",
      intro:
        "Parcoursup est la plateforme nationale pour entrer en 1re année d'études supérieures : licences, BUT, BTS, prépas, écoles, instituts de santé, en tout 25 000 formations. Tu y découvres les formations, tu y fais tes vœux, et chaque formation t'y répond.",
      blocs: [
        {
          type: "cartes",
          colonnes: 2,
          cartes: [
            {
              titre: "Un vœu, une formation",
              texte:
                "Chaque formation reçoit seulement le vœu qui la concerne. Elle ignore tes autres vœux, et l'ordre de tes préférences.",
            },
            {
              titre: "Des enseignants lisent ton dossier",
              texte:
                "Dans chaque formation, une commission faite surtout d'enseignants examine les dossiers et les classe, selon des critères publiés sur sa fiche. Parcoursup transmet ensuite les propositions.",
            },
            {
              titre: "Deux familles de formations",
              texte:
                "Les formations sélectives (BTS, BUT, prépas, écoles, instituts de santé…) classent les candidats. Les licences et les PASS admettent les bacheliers dans la limite de leurs places.",
            },
            {
              titre: "Aucune course de vitesse",
              texte:
                "Un vœu formulé le dernier jour vaut un vœu du premier : aucun avantage à se presser, tout l'intérêt à bien choisir.",
            },
          ],
        },
        {
          type: "faits",
          faits: [
            { label: "Candidats en 2026", valeur: "1 046 000, apprentissage compris" },
            { label: "Formations", valeur: "25 000" },
            { label: "Lycéens avec au moins une proposition", valeur: "91,5 % en 2026" },
            { label: "Propositions par lycéen admis", valeur: "5,6 en moyenne" },
          ],
        },
        {
          type: "note",
          ton: "repere",
          titre: "Une question, à tout moment",
          texte:
            "Le numéro vert de Parcoursup, 0\u00a0800\u00a0400\u00a0070, répond du lundi au vendredi, de 10 h à 16 h, pendant toute la procédure ; à partir de juin, la rubrique Contact de ton dossier aussi. Au lycée, ton professeur principal t'accompagne à chaque étape.",
        },
      ],
      sources: [P.faqExamen, P.examen, P.faqVoeux, P.bilan2026, P.contacts],
    },
    {
      id: "calendrier",
      titre: "Le calendrier, date par date",
      court: "Calendrier",
      intro:
        "Il change à peine d'une année à l'autre : les mêmes étapes, à un ou deux jours près. Les dates exactes de chaque session paraissent à l'automne qui précède. Des améliorations de Parcoursup ont été annoncées pour la fin octobre 2026 : en cas de changement, parcoursup.gouv.fr fait foi.",
      blocs: [{ type: "outil", outil: "calendrier" }],
      sources: [P.calendrier2027, P.calendrierPage, P.faqVoeux],
    },
    {
      id: "voeux",
      titre: "Tes vœux",
      court: "Les vœux",
      intro:
        "Jusqu'à 10 vœux, sans les classer, de mi-janvier à mi-mars. Les formations en apprentissage ont leur propre liste, ouverte toute l'année.",
      blocs: [
        {
          type: "faits",
          faits: [
            { label: "Vœux", valeur: "10 au plus" },
            { label: "En apprentissage", valeur: "10 de plus" },
            { label: "Sous-vœux", valeur: "20 au plus pour les BTS, BUT, prépas…" },
            { label: "Classement", valeur: "en juin, pour les vœux en attente" },
          ],
        },
        {
          type: "texte",
          texte:
            "Certaines formations se demandent en « vœu multiple » : un seul vœu qui regroupe plusieurs établissements, les sous-vœux. Il compte pour un vœu dans ta limite de 10.",
        },
        {
          type: "tableau",
          legende: "Ce que compte chaque vœu",
          colonnes: ["Formations", "Le décompte"],
          lignes: [
            [
              "BTS, BUT, prépas, DN MADE, DCG, écoles de travail social, DNA",
              "Un vœu multiple, 10 sous-vœux au plus ; 20 sous-vœux en tout pour l'ensemble de ces formations",
            ],
            [
              "Instituts de soins infirmiers (IFSI), orthophonie, orthoptie, audioprothèse",
              "5 vœux au plus, chacun un regroupement d'instituts, avec des sous-vœux sans limite",
            ],
            [
              "Écoles d'ingénieurs et de commerce en concours commun, Sciences Po et les IEP, PASS d'Île-de-France, écoles vétérinaires",
              "Un vœu, des sous-vœux sans limite, hors du plafond de 20",
            ],
            ["Licences", "Un vœu par université : la même licence dans deux universités compte pour 2 vœux"],
          ],
        },
        {
          type: "liste",
          titre: "Une liste solide",
          items: [
            "Varie les types de formations et les lieux, et garde toujours plusieurs vœux : c'est le premier conseil de Parcoursup.",
            "Pense aussi aux licences, qui admettent dans la limite de leurs places.",
            "Sur chaque fiche, ouvre les chiffres d'accès de l'an dernier : profil des admis, bacs, moyennes, spécialités.",
            "Un vœu plus sûr ne retire rien aux autres, puisque chaque formation ignore tes autres vœux.",
            "Certaines écoles demandent des frais de candidature, indiqués sur leur fiche, avec parfois une réduction pour les boursiers.",
            "En apprentissage, tu peux ajouter des vœux tout au long de l'année, même après début avril.",
          ],
        },
        {
          type: "note",
          ton: "conseil",
          titre: "Les chiffres des formations près de chez toi",
          texte:
            "Places, candidats, taux d'accès, bacs des admis : les chiffres officiels de Parcoursup, formation par formation, autour de ta ville.",
          lien: { href: "/etudes#formations-france", label: "Voir les formations près de chez toi" },
        },
        {
          type: "note",
          ton: "repere",
          titre: "La rubrique « Autres projets »",
          texte:
            "Obligatoire pour les lycéens : tu y notes tes candidatures hors Parcoursup, une école privée, une université à l'étranger. Les formations ne la voient pas ; elle sert à l'équipe Parcoursup et à ton académie pour t'accompagner.",
        },
      ],
      sources: [P.conseilsVoeux, P.faqVoeux, P.faqDossier, P.calendrierPage],
    },
    {
      id: "dossier",
      titre: "Ton dossier",
      court: "Le dossier",
      intro:
        "Un seul dossier, lu par chaque formation que tu demandes. Ton lycée en remplit une grande partie ; à toi d'y ajouter ce qui te ressemble, avant la date limite de début avril.",
      blocs: [
        {
          type: "liste",
          titre: "Ce que reçoit chaque formation",
          items: [
            "Tes bulletins de 1re et des deux premiers trimestres de Terminale, ou du premier semestre, transmis par ton lycée.",
            "Tes notes du bac déjà connues : les épreuves anticipées de français et de maths, et ton contrôle continu de 1re.",
            "La fiche Avenir, remplie par ton lycée pour chacun de tes vœux.",
            "Ta lettre de motivation, si la formation en demande une, comme plus de 70 % d'entre elles : 1 500 caractères au plus, 4 500 pour les IFSI, sans ton nom ni ton prénom.",
            "Ta rubrique « Activités et centres d'intérêt », facultative et recommandée : engagements, responsabilités, job, sport, musique, bénévolat, BAFA, secourisme.",
            "L'attestation Pix, si tu l'as passée en Terminale.",
            "Les pièces ou questionnaires demandés par certaines formations, toujours listés sur leur fiche. En licence de droit, un questionnaire d'autoévaluation est obligatoire ; son résultat reste pour toi.",
          ],
        },
        {
          type: "cartes",
          colonnes: 2,
          cartes: [
            {
              titre: "La fiche Avenir",
              texte:
                "Ton professeur principal y décrit ta méthode de travail, ton autonomie, ton investissement et tes engagements. Pour chaque vœu, ton chef d'établissement donne un avis sur ta capacité à réussir dans la formation.",
              points: [
                "Remplie en février et en mars, finalisée début avril",
                "Tu la découvres à l'ouverture des réponses, début juin",
                "Tes vœux se confirment sans l'attendre",
              ],
            },
            {
              titre: "La lettre de motivation",
              texte:
                "Écris-la toi-même : les conseils officiels écartent l'intelligence artificielle, et recommandent une relecture par ton professeur principal ou tes proches.",
              points: [
                "Seulement pour les formations qui la demandent",
                "1 500 caractères au plus",
                "Ni nom ni prénom",
              ],
            },
          ],
        },
        {
          type: "etapes",
          etapes: [
            {
              id: "d-bulletins",
              quand: "Fin mars",
              titre: "Tes bulletins arrivent",
              texte:
                "Ton lycée les transmet ; le bulletin du 2e trimestre doit être là pour que tu puisses confirmer tes vœux.",
            },
            {
              id: "d-situation",
              quand: "Avant la date limite",
              titre: "Ta situation, si besoin",
              texte:
                "Boursier ? Vérifie que ton statut apparaît, ou demande à ton lycée de le saisir : des places sont réservées aux boursiers. Une scolarité atypique, un souci de santé, un handicap ou une difficulté familiale se signalent dans « Éléments liés à ma scolarité ».",
            },
            {
              id: "d-confirmer",
              quand: "Début avril {B}",
              titre: "Tes vœux confirmés, un par un",
              texte:
                "La mention « dossier complet » s'affiche en face de chaque vœu confirmé : seuls ceux-là partent aux formations.",
              cle: true,
            },
          ],
        },
        {
          type: "note",
          ton: "repere",
          titre: "Hors contrat, CNED, candidat libre",
          texte:
            "Si ton établissement ne transmet pas tes bulletins, tu les saisis toi-même ; ils pourront t'être demandés à l'inscription. Au CNED en inscription libre, tu t'inscris avec ton INE si tu en as un, sinon une case le prévoit ; un candidat libre au bac utilise son numéro d'inscription à l'examen.",
        },
      ],
      sources: [P.examen, P.faqDossier, P.conseilsDossier, P.comite, P.ficheAvenir, P.ficheAvenirFaq, P.plateforme],
    },
    {
      id: "examen",
      titre: "Comment les formations choisissent",
      court: "L'examen",
      intro:
        "En avril et en mai, chaque formation examine les dossiers reçus. Ce sont ses enseignants qui décident, avec des critères connus à l'avance.",
      blocs: [
        {
          type: "liste",
          items: [
            "Une commission d'examen des vœux, faite surtout d'enseignants, classe les candidatures ; le chef d'établissement valide ce classement.",
            "Les critères figurent sur la fiche de chaque formation, et des rapports détaillent ceux réellement appliqués l'année d'avant : près de 19 000 pour la session 2025.",
            "Ton dossier arrive anonyme : nom, prénom, adresse et âge sont masqués. Le nom de ton lycée et les appréciations restent visibles. Les dossiers d'apprentissage, d'internat et d'épreuves restent nominatifs.",
            "Certaines formations ajoutent des épreuves écrites ou des oraux : leurs modalités figurent sur la fiche.",
          ],
        },
        {
          type: "cartes",
          colonnes: 3,
          cartes: [
            {
              titre: "Lycéens boursiers",
              texte:
                "Le recteur fixe un taux minimal de boursiers dans chaque formation sélective publique, et dans les licences.",
            },
            {
              titre: "Bacs pro et technologiques",
              texte: "Des taux minimaux de bacheliers professionnels en BTS, et de bacheliers technologiques en BUT.",
            },
            {
              titre: "Candidats de l'académie",
              texte:
                "En licence, un taux maximal de candidats venus d'ailleurs ; pour les formations très demandées, une priorité possible aux candidats de l'académie.",
            },
          ],
        },
        {
          type: "texte",
          texte: "Les taux de l'année s'affichent sur chaque fiche, quelques jours avant les premières réponses.",
        },
      ],
      sources: [P.examen, P.faqExamen],
    },
    {
      id: "reponses",
      titre: "Les réponses, et quoi faire de chacune",
      court: "Les réponses",
      intro:
        "À partir de début juin, les réponses arrivent chaque jour, par mail et par SMS ; tes parents les reçoivent aussi si leurs coordonnées figurent dans ton dossier. Tu réponds à chaque proposition avant la date affichée en face.",
      blocs: [
        {
          type: "cartes",
          colonnes: 4,
          cartes: [
            {
              titre: "Oui",
              sous: "Une proposition d'admission",
              texte: "Tu l'acceptes ou tu la refuses, avant la date affichée en face.",
              ton: "sante",
            },
            {
              titre: "Oui, avec aménagement",
              sous: "En licence, l'ancien « oui-si »",
              texte:
                "Une admission, avec un parcours d'accompagnement adapté, détaillé par le bouton « Accompagnement proposé ». Elle s'accepte comme un oui.",
              ton: "sciences",
            },
            {
              titre: "En attente",
              sous: "Une place dans une liste",
              texte:
                "Mise à jour chaque matin : ta position, le nombre de places, le rang du dernier appelé cette année et l'an dernier.",
              ton: "courtes",
            },
            {
              titre: "Non",
              sous: "Seulement en formation sélective",
              texte:
                "La formation n'a pas retenu ton dossier. Tu peux lui en demander les motifs ; tes autres vœux continuent.",
            },
          ],
        },
        { type: "outil", outil: "reponses" },
        {
          type: "liste",
          titre: "Les règles pour répondre",
          items: [
            "Le premier jour, les réponses arrivent le soir : le 2 juin à 19 h en 2026. Ensuite, une fois par jour, le matin : un coup d'œil quotidien suffit.",
            "Le délai s'affiche en face de chaque proposition. En 2026, une proposition reçue le premier jour se décidait jusqu'au 4 juin ; ensuite, le jour même et le lendemain, jusqu'à 23 h 59.",
            "Une seule proposition acceptée à la fois : en accepter une nouvelle libère la précédente.",
            "Accepter une proposition laisse actifs les vœux en attente que tu choisis de garder.",
            "Sans réponse dans le délai, la place passe au candidat suivant, et un mail te demande sous 3 jours si tu gardes tes vœux en attente.",
            "Pendant les écrits du bac, les délais s'arrêtent.",
            "En apprentissage, « oui » veut dire « retenu sous réserve de contrat » : l'admission se concrétise avec un contrat signé.",
          ],
        },
        {
          type: "etapes",
          etapes: [
            {
              id: "c-classer",
              quand: "Premier week-end de juin, du vendredi au lundi",
              titre: "Tu classes tes vœux en attente",
              texte:
                "Obligatoire dès que tu as des vœux en attente, avec ou sans proposition acceptée : dans l'onglet Admission, tu ranges ceux que tu veux garder, du préféré au moins souhaité.",
              cle: true,
            },
            {
              id: "c-apres",
              quand: "Le mardi suivant",
              titre: "Tes vœux classés restent en lice",
              texte:
                "Les vœux non classés sont retirés. Ta proposition déjà acceptée, elle, est gardée automatiquement.",
            },
            {
              id: "c-ensuite",
              quand: "Jusqu'à la fin de la phase principale",
              titre: "Une proposition sur un vœu classé",
              texte:
                "Les vœux classés après lui sont retirés, même si tu refuses cette proposition. Si tu l'acceptes, elle remplace celle que tu avais acceptée.",
            },
          ],
        },
        {
          type: "note",
          ton: "repere",
          titre: "Ce classement reste entre Parcoursup et toi",
          texte:
            "Les formations ignorent ton ordre, et ta place dans chaque liste d'attente reste la même. Il sert à faire avancer les listes plus vite. Range tes vœux dans ton véritable ordre de préférence.",
        },
        {
          type: "note",
          ton: "conseil",
          titre: "Avant de refuser",
          texte:
            "Refuser une proposition sans être sûr d'en recevoir une autre serait très imprudent, rappelle Parcoursup. Garde en attente seulement les vœux qui t'intéressent vraiment : chaque place libérée profite à un autre candidat.",
        },
      ],
      sources: [
        P.faqReponses,
        P.conseilsAdmission,
        P.classement,
        P.juin2026,
        P.ouverture2026,
        P.livret,
        P.calendrierPage,
      ],
    },
    {
      id: "sans",
      titre: "Sans proposition : les solutions",
      court: "Sans proposition",
      intro:
        "Chaque été, des dizaines de milliers de candidats trouvent leur place après début juin. Plusieurs portes s'ouvrent, l'une après l'autre, et des équipes t'accompagnent.",
      blocs: [
        {
          type: "etapes",
          etapes: [
            {
              id: "s-entretien",
              quand: "Dès les premiers jours de juin",
              titre: "Un entretien pour faire le point",
              texte:
                "Avec l'équipe de ton lycée, un centre d'information et d'orientation (CIO) ou le service d'orientation d'une université.",
            },
            {
              id: "s-complementaire",
              quand: "À partir de mi-juin",
              titre: "La phase complémentaire",
              texte:
                "Jusqu'à 10 nouveaux vœux, dans les formations qui ont encore des places : la carte de ton dossier les affiche. Tes vœux en attente et ta proposition acceptée restent intacts ; une même formation peut se redemander dans un autre établissement.",
              cle: true,
            },
            {
              id: "s-caes",
              quand: "À partir du 1er juillet",
              titre: "La commission d'accès à l'enseignement supérieur",
              texte:
                "Sans proposition après tes vœux de la phase principale et de la phase complémentaire, tu sollicites la CAES de ton académie d'un clic dans ton dossier. Elle te propose des formations proches de ton projet, selon les places libres, jusqu'à la mi-octobre.",
              cle: true,
            },
            {
              id: "s-apprentissage",
              quand: "Tout l'été",
              titre: "L'apprentissage",
              texte:
                "Les vœux en apprentissage restent ouverts : avec un contrat signé, le CFA peut te faire une proposition.",
            },
          ],
        },
        {
          type: "faits",
          faits: [
            { label: "Phase complémentaire 2025", valeur: "plus de 83 000 candidats y ont trouvé une proposition" },
            { label: "Places libres au 11 juillet 2026", valeur: "plus de 83 000, dans 6 000 formations" },
            { label: "Candidats accompagnés par une CAES, été 2026", valeur: "un peu plus de 32 000" },
          ],
        },
        {
          type: "liste",
          titre: "Le rythme de la phase complémentaire",
          items: [
            "Les formations te répondent en 8 jours au plus.",
            "Tu as 2 jours pour répondre, puis 1 seul à partir de la mi-août.",
            "En 2026, les formations sélectives ont fait une pause du 13 juillet au 20 août.",
          ],
        },
        {
          type: "note",
          ton: "alt",
          titre: "Bac pro ou techno, cap sur le BTS",
          texte:
            "Avec une mention bien ou très bien et aucune proposition, tu peux être admis de droit en BTS, dans une spécialité cohérente avec ton bac. Bachelier professionnel avec un avis favorable, sans place en BTS ? Une classe passerelle d'un an t'y prépare.",
        },
      ],
      sources: [P.solutions, P.complementaire, P.caes, P.juin2026, P.juillet2026, P.bilan2026, P.bts],
    },
    {
      id: "apres",
      titre: "Après le oui : s'inscrire, se loger, les aides",
      court: "Après le oui",
      intro:
        "Une fois ta proposition acceptée et ton bac obtenu, il reste l'inscription. Plusieurs démarches se lancent bien avant, dès le printemps, en même temps que Parcoursup.",
      blocs: [
        {
          type: "etapes",
          etapes: [
            {
              id: "a-dse",
              quand: "Mars à mai {B}",
              titre: "Le dossier social étudiant",
              texte:
                "Ta demande de bourse et de logement au Crous, sur messervices.etudiant.gouv.fr : du 2 mars au 31 mai en 2026. Un simulateur de bourse t'attend sur etudiant.gouv.fr.",
              cle: true,
            },
            {
              id: "a-logement",
              quand: "Mai et juin {B}",
              titre: "Une chambre en résidence Crous",
              texte:
                "Avec ton dossier social, tu choisis tes logements dès début mai ; l'attribution commence début juin, en trois tours qui suivent tes réponses Parcoursup.",
            },
            {
              id: "a-inscription",
              quand: "Début juillet {B}",
              titre: "Ton inscription",
              texte:
                "Avec ton bac, tu t'inscris selon les consignes de l'établissement, affichées dans ton dossier, avant la date indiquée. En 2026, pour un oui accepté début juillet : avant le 10 juillet à midi pour une formation en lycée, prépa ou BTS, et avant le 17 juillet à midi ailleurs.",
              cle: true,
            },
            {
              id: "a-cvec",
              quand: "Avant de t'inscrire",
              titre: "La CVEC",
              texte:
                "La contribution de vie étudiante et de campus se paie sur cvec.etudiant.gouv.fr, sauf dans certaines formations comme le BTS ; les boursiers en sont exonérés.",
            },
            {
              id: "a-mobilite",
              quand: "Mi-juillet {B}",
              titre: "L'aide à la mobilité Parcoursup",
              texte:
                "500 € si tu étais boursier au lycée et que tu acceptes définitivement une formation hors de ton académie, demandée sur un vœu confirmé. La demande s'ouvre à la mi-juillet ; l'aide arrive en septembre, après ton inscription.",
            },
          ],
        },
        {
          type: "note",
          ton: "conseil",
          titre: "Le coût de tes études",
          texte:
            "Frais d'inscription, loyer, vie courante, et la part que paient les aides : une estimation sur les chiffres officiels, formation par formation.",
          lien: { href: "/etudes#couts", label: "Estimer le coût de tes études" },
        },
        {
          type: "note",
          ton: "repere",
          titre: "Une formation hors Parcoursup",
          texte:
            "Si tu choisis une formation hors Parcoursup, désinscris-toi une fois sûr de ton choix : certaines écoles demandent une attestation à l'inscription.",
        },
      ],
      sources: [P.inscription, P.aides, P.mobilite, P.conseilsDossier],
    },
    {
      id: "cas",
      titre: "Les situations particulières",
      court: "Cas particuliers",
      blocs: [
        {
          type: "cartes",
          colonnes: 2,
          cartes: [
            {
              titre: "Handicap, trouble de santé",
              texte:
                "Chaque formation a un référent handicap, dont les coordonnées figurent sur sa fiche. La fiche de liaison, facultative, sert après l'admission, hors de l'examen des vœux.",
              points: [
                "Dès le début des réponses, tu peux demander à la CAES de réexaminer ta situation, pour une formation proche de chez toi",
                "Le même recours vaut pour un sportif de haut niveau, un élu local ou un jeune avec une charge de famille",
              ],
            },
            {
              titre: "Sportif de haut niveau, artiste confirmé",
              texte:
                "Un filtre de la carte des formations repère celles qui proposent des aménagements, détaillés sur leur fiche. Les artistes cochent la case « artiste confirmé » et décrivent leur activité.",
            },
            {
              titre: "Une année de césure",
              texte:
                "Tu la demandes en cochant la case au moment des vœux. Elle reste hors de l'examen : l'établissement décide après ton acceptation, et une convention te garde ta place.",
              points: [
                "Pour un service national de dix mois, la césure est acceptée d'office et ta place gardée pour l'année suivante",
              ],
            },
            {
              titre: "Changer de voie après une 1re année",
              texte:
                "Pour entrer dans une autre 1re année, tu repasses par Parcoursup, examiné comme les lycéens. Pour refaire ta 1re année, tu te réinscris directement dans ton établissement.",
            },
          ],
        },
      ],
      sources: [P.handicap, P.caes, P.sportifs, P.cesure, P.serviceNational, P.reorientation],
    },
    {
      id: "questions",
      titre: "Les questions qu'on se pose",
      court: "Questions",
      blocs: [
        {
          type: "faq",
          questions: [
            {
              q: "Faut-il classer ses vœux ?",
              r: "Au moment des vœux, ils restent sans ordre. Début juin, seuls les vœux encore en attente se classent, pour faire avancer les listes.",
            },
            {
              q: "Un vœu plus sûr fait-il baisser mes chances ailleurs ?",
              r: "Chaque formation ignore tes autres vœux : un vœu plus sûr ajoute une chance, et laisse les autres intactes.",
            },
            {
              q: "« En attente », ça veut dire refusé ?",
              r: "C'est une place dans une liste qui avance chaque matin. Ton dossier t'indique ta position, le nombre de places, et le rang du dernier appelé l'an dernier.",
            },
            {
              q: "Faut-il accepter la première proposition ?",
              r: "L'accepter te garde une place, et tes vœux en attente restent actifs si tu les gardes. Si elle correspond à ton vœu préféré, accepte-la définitivement.",
            },
            {
              q: "Faut-il se dépêcher de faire ses vœux ?",
              r: "Un vœu du dernier jour vaut un vœu du premier : prends le temps de choisir, jusqu'à la date limite.",
            },
            {
              q: "Un algorithme décide-t-il à ma place ?",
              r: "Des enseignants lisent et classent les dossiers, en commission ; Parcoursup transmet leurs classements et envoie les propositions.",
            },
            {
              q: "Mes parents peuvent-ils suivre mon dossier ?",
              r: "Ils reçoivent les mêmes alertes que toi, par mail et par SMS, si leurs coordonnées figurent dans ton dossier.",
            },
            {
              q: "Si je ne réponds pas, je garde la place ?",
              r: "La place part dès le lendemain matin au premier candidat de la liste d'attente. Réponds toujours dans le délai, pour accepter comme pour refuser.",
            },
            {
              q: "Les formations savent-elles de quel lycée je viens ?",
              r: "Oui : ton nom, ton prénom, ton adresse et ton âge sont masqués, mais le nom de ton lycée et les appréciations de tes professeurs restent visibles.",
            },
            {
              q: "Mes absences apparaissent-elles dans mon dossier ?",
              r: "Parcoursup reprend de tes bulletins les notes et les appréciations des professeurs, et rien d'autre.",
            },
            {
              q: "Puis-je ajouter un vœu après la mi-mars ?",
              r: "En apprentissage, oui, toute l'année. Pour les autres formations, la phase complémentaire ouvre 10 nouveaux vœux à partir de la mi-juin.",
            },
          ],
        },
      ],
      sources: [P.faqVoeux, P.faqExamen, P.conseilsAdmission, P.classement, P.complementaire, P.vraiFaux],
    },
  ],
  verifie:
    "Informations vérifiées le 19 octobre 2026 sur parcoursup.gouv.fr et sur le site du ministère de l'Enseignement supérieur. La procédure évolue d'une session à l'autre : chaque section cite ses sources.",
});

/** Le calendrier officiel de la session 2027 (publié en octobre 2026). */
export const SESSION_PSUP = etTypo({
  annee: 2027,
  jalons: [
    {
      du: "2026-10-01",
      au: "2027-01-17",
      quand: "D'octobre 2026 à janvier 2027",
      titre: "Tu t'informes",
      texte: "Salons, journées portes ouvertes, fiches des formations.",
    },
    {
      du: "2026-11-30",
      au: "2026-12-11",
      quand: "Début décembre 2026",
      titre: "Le premier conseil de classe",
      texte: "La fiche de dialogue : tes intentions d'orientation, et les conseils de l'équipe.",
    },
    {
      du: "2026-12-17",
      quand: "Jeudi 17 décembre 2026",
      titre: "Le site Parcoursup 2027 ouvre",
      texte: "La carte des formations, avec leurs fiches et leurs chiffres d'accès.",
    },
    {
      du: "2027-01-18",
      au: "2027-03-11",
      quand: "Du lundi 18 janvier au jeudi 11 mars 2027",
      titre: "Inscription et vœux",
      texte: "Jusqu'à 10 vœux, plus 10 en apprentissage.",
      cle: true,
    },
    {
      du: "2027-04-01",
      quand: "Jeudi 1er avril 2027",
      titre: "Dossier complet, vœux confirmés",
      texte: "C'est le dernier jour. Les vœux en apprentissage restent possibles après.",
      cle: true,
    },
    {
      du: "2027-04-02",
      au: "2027-05-31",
      quand: "Avril et mai 2027",
      titre: "Les formations examinent les dossiers",
    },
    {
      du: "2027-06-01",
      au: "2027-07-10",
      quand: "À partir du mardi 1er juin 2027",
      titre: "Les premières réponses",
      texte: "Puis chaque matin, jusqu'au 10 juillet.",
      cle: true,
    },
    {
      du: "2027-06-04",
      au: "2027-06-07",
      quand: "Du vendredi 4 au lundi 7 juin 2027",
      titre: "Tu classes tes vœux en attente",
      texte: "Une étape obligatoire pour les garder.",
      cle: true,
    },
    {
      du: "2027-06-10",
      au: "2027-09-09",
      quand: "Jeudi 10 juin 2027",
      titre: "La phase complémentaire ouvre",
      texte: "Jusqu'à 10 nouveaux vœux, dans les formations qui ont encore des places, jusqu'au 9 septembre.",
    },
    {
      du: "2027-06-11",
      au: "2027-06-18",
      quand: "Du 11 au 18 juin 2027",
      titre: "Une pause pendant le bac",
      texte:
        "Les délais de réponse s'arrêtent pendant les écrits : jusqu'au 18 juin en voies générale et technologique, jusqu'au 16 juin en voie professionnelle.",
    },
    {
      du: "2027-07-01",
      au: "2027-10-15",
      quand: "À partir du jeudi 1er juillet 2027",
      titre: "La CAES, si tu n'as rien reçu",
      texte: "Tu la sollicites depuis ton dossier ; elle t'accompagne jusqu'à la mi-octobre.",
    },
    {
      du: "2027-07-06",
      quand: "Mardi 6 juillet 2027",
      titre: "Les résultats du bac, puis ton inscription",
      cle: true,
    },
    {
      du: "2027-07-10",
      quand: "Samedi 10 juillet 2027",
      titre: "Fin de la phase principale",
      texte:
        "Tes vœux encore en attente restent archivés dans ton ordre : une place libérée pendant l'été peut encore t'être proposée.",
    },
    {
      du: "2027-09-09",
      quand: "Jeudi 9 septembre 2027",
      titre: "Fin de la phase complémentaire",
    },
  ] satisfies Jalon[],
  sources: [P.calendrier2027, P.calendrierPage],
});

/** L'étape du rail où se trouve un élève de Terminale en 2026-2027, d'après le calendrier officiel (fin exclue). */
export const CALENDRIER: { du: string; au: string; rail: string }[] = [
  { du: "2026-08-01", au: "2027-01-18", rail: "informer" },
  { du: "2027-01-18", au: "2027-03-12", rail: "voeux" },
  { du: "2027-03-12", au: "2027-04-02", rail: "confirmer" },
  { du: "2027-04-02", au: "2027-06-01", rail: "examen" },
  { du: "2027-06-01", au: "2027-07-06", rail: "reponses" },
  { du: "2027-07-06", au: "2027-09-01", rail: "inscription" },
];

export const SITUATIONS_TEXTES = etTypo({
  titre: "Que faire si…",
  question: "Ce que tu vois dans ton dossier :",
});

export const SITUATIONS: Situation[] = etTypo([
  {
    id: "oui-prefere",
    label: "Un oui pour mon vœu préféré",
    etapes: [
      "Accepte-le définitivement, avant la date affichée : tu renonces alors à tes vœux en attente.",
      "Lis les consignes d'inscription de l'établissement, affichées dans ton dossier.",
      "Après les résultats du bac, inscris-toi dans les délais indiqués.",
    ],
    note: "Les places que tu laisses partent dès le lendemain matin à d'autres candidats.",
  },
  {
    id: "oui-attente",
    label: "Un oui, mais j'espère mieux",
    etapes: [
      "Accepte ce oui avant la date limite : il te garde une place.",
      "Garde en attente les vœux que tu préfères, et seulement ceux-là.",
      "Le premier week-end de juin, classe ces vœux en attente, du préféré au moins souhaité.",
      "Si un vœu mieux classé te fait une proposition, accepte-la dans le délai : elle remplace celle que tu avais acceptée.",
    ],
    note: "Quand une proposition arrive sur un vœu classé, les vœux classés après lui sont retirés : range-les dans ton vrai ordre de préférence.",
  },
  {
    id: "plusieurs-oui",
    label: "Plusieurs oui",
    etapes: [
      "Choisis la proposition qui te plaît le plus et accepte-la : une seule à la fois.",
      "Refuse les autres : leurs places iront à d'autres candidats.",
      "Garde en attente les vœux que tu préfères à celui que tu as accepté.",
    ],
    note: "Chaque proposition a sa propre date limite, affichée en face : tu as le temps de comparer.",
  },
  {
    id: "attente",
    label: "Seulement des « en attente »",
    etapes: [
      "Regarde, pour chaque vœu, ta position, le nombre de places et le rang du dernier appelé l'an dernier : la liste avance chaque matin.",
      "Le premier week-end de juin, classe tes vœux en attente : c'est obligatoire pour les garder.",
      "Dès la mi-juin, ajoute des vœux en phase complémentaire ; tes vœux en attente restent actifs.",
      "Parles-en à ton professeur principal, ou à un conseiller d'orientation.",
    ],
    note: "En 2026, deux lycéens sur trois avaient une proposition dès le premier jour ; à l'automne, 91,5 % en avaient reçu au moins une.",
  },
  {
    id: "non",
    label: "Seulement des non",
    etapes: [
      "Demande un entretien à ton lycée, à un CIO ou au service d'orientation d'une université, dès les premiers jours de juin.",
      "Dès la mi-juin, formule jusqu'à 10 vœux en phase complémentaire, dans les formations qui ont encore des places.",
      "À partir du 1er juillet, sollicite la CAES depuis ton dossier : elle te propose des formations proches de ton projet.",
      "Si tu le souhaites, demande à chaque formation les motifs de sa réponse.",
    ],
    note: "En 2025, plus de 83 000 candidats ont trouvé une proposition grâce à la phase complémentaire.",
  },
  {
    id: "amenagement",
    label: "Un « oui, avec aménagement »",
    etapes: [
      "Ouvre « Accompagnement proposé », en face de la proposition, pour voir le parcours prévu.",
      "Réponds comme pour un oui, avant la date limite : c'est une admission en licence.",
    ],
    note: "Son ancien nom : « oui-si ». L'accompagnement t'aide à réussir ta première année.",
  },
  {
    id: "delai",
    label: "Un délai m'a échappé",
    etapes: [
      "La proposition laissée sans réponse est passée au candidat suivant.",
      "Un mail te demande sous 3 jours si tu gardes tes vœux en attente : réponds-y.",
      "Dès la mi-juin, la phase complémentaire t'ouvre 10 nouveaux vœux.",
    ],
    note: "Un coup d'œil chaque matin suffit : les réponses arrivent une fois par jour.",
  },
  {
    id: "apprentissage",
    label: "Un oui en apprentissage",
    etapes: [
      "Ce oui veut dire « retenu sous réserve de contrat ».",
      "Cherche un employeur, avec l'aide du CFA.",
      "Une fois le contrat signé, apporte-le au CFA : il te fait alors une proposition d'admission, à accepter dans ton dossier.",
    ],
    note: "Les vœux en apprentissage restent possibles toute l'année, même après début avril.",
  },
]);
