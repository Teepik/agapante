/**
 * « Le bac, pas à pas » : les voies, les spécialités, la note, les épreuves, les résultats.
 * Vérifié le 19 octobre 2026 sur les sites du ministère de l'Éducation nationale, d'Éduscol, du Bulletin officiel
 * et de Service-public. Les dates exactes viennent du calendrier 2027 (BO spécial n° 2 du 25 août 2026) ;
 * les autres textes s'écrivent avec les repères de cohorte ({B} : juin du bac de l'élève).
 */
import type { Guide, Jalon, Source } from "./guides";
import { etTypo } from "./typo";

const S = {
  calcul: {
    label: "Éducation nationale, comment calculer ta note au bac (juin 2026)",
    url: "https://www.education.gouv.fr/reussir-au-lycee/comment-calculer-votre-note-au-baccalaureat-325511",
  },
  bacGeneral: {
    label: "Éducation nationale, le baccalauréat général (octobre 2026)",
    url: "https://www.education.gouv.fr/reussir-au-lycee/le-baccalaureat-general-10457",
  },
  cc: {
    label: "Éduscol, le contrôle continu des candidats scolaires (février 2026)",
    url: "https://eduscol.education.gouv.fr/5676/le-controle-continu-des-candidats-scolaires-au-baccalaureat-general-ou-technologique",
  },
  memento: {
    label: "Éduscol, le cadre réglementaire des évaluations du bac (septembre 2025)",
    url: "https://eduscol.education.gouv.fr/sites/default/files/document/2025-memento-cadrereglementaire-evaluationsbacpdf-113592.pdf",
  },
  voieG: {
    label: "Éduscol, le cycle terminal de la voie générale (janvier 2026)",
    url: "https://eduscol.education.gouv.fr/5418/cycle-terminal-de-la-voie-generale",
  },
  epreuvesG: {
    label: "Éduscol, les épreuves terminales du bac général (septembre 2026)",
    url: "https://eduscol.education.gouv.fr/5706/les-epreuves-terminales-du-baccalaureat-general",
  },
  presentationG: {
    label: "Éduscol, présentation du baccalauréat général (janvier 2026)",
    url: "https://eduscol.education.gouv.fr/5700/presentation-du-baccalaureat-general",
  },
  mathsAnt: {
    label: "Éducation nationale, l'épreuve anticipée de mathématiques (octobre 2026)",
    url: "https://www.education.gouv.fr/reussir-au-lycee/epreuve-anticipee-de-mathematiques-en-classe-de-premiere-450607",
  },
  mathsAntBO: {
    label: "Bulletin officiel spécial n° 4 du 17 septembre 2026, l'épreuve anticipée de mathématiques",
    url: "https://www.education.gouv.fr/bo/2026/Special4/MENE2622640N",
  },
  francaisBO: {
    label: "Bulletin officiel spécial n° 4, les épreuves anticipées de français",
    url: "https://www.education.gouv.fr/bo/2026/Special4/MENE2622658N",
  },
  philoBO: {
    label: "Bulletin officiel spécial n° 4, l'épreuve de philosophie de la voie générale",
    url: "https://www.education.gouv.fr/bo/2026/Special4/MENE2622661N",
  },
  grandOralG: {
    label: "Bulletin officiel spécial n° 4, le grand oral de la voie générale",
    url: "https://www.education.gouv.fr/bo/2026/Special4/MENE2622694N",
  },
  grandOralT: {
    label: "Bulletin officiel spécial n° 4, le grand oral de la voie technologique",
    url: "https://www.education.gouv.fr/bo/2026/Special4/MENE2622701N",
  },
  langue: {
    label: "Bulletin officiel spécial n° 4, la maîtrise de la langue aux examens à partir de 2027",
    url: "https://www.education.gouv.fr/bo/2026/Special4/MENE2623195N",
  },
  calendrier2027: {
    label: "Bulletin officiel spécial n° 2 du 25 août 2026, le calendrier des examens 2027",
    url: "https://www.education.gouv.fr/bo/2026/Special2/MENE2622686N",
  },
  calendrierPage: {
    label: "Éducation nationale, le calendrier 2027 du bac, du brevet et du CAP",
    url: "https://www.education.gouv.fr/reussir-au-lycee/baccalaureat-brevet-cap-le-calendrier-2027-341384",
  },
  orientation: {
    label: "Service-public.fr, l'orientation après la 2nde (vérifié le 30 octobre 2025)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F111",
  },
  choixOrientation: {
    label: "Éducation nationale, le choix d'orientation d'un élève",
    url: "https://www.education.gouv.fr/reussir-au-lycee/le-choix-d-orientation-d-un-eleve-7382",
  },
  spe2018: {
    label: "Bulletin officiel n° 35 du 27 septembre 2018, le choix des spécialités",
    url: "https://www.education.gouv.fr/bo/18/Hebdo35/MENE1826273N.htm",
  },
  voieT: {
    label: "Éducation nationale, la voie technologique (mai 2026)",
    url: "https://www.education.gouv.fr/reussir-au-lycee/la-voie-technologique-au-lycee-7574",
  },
  cycleT: {
    label: "Éduscol, le cycle terminal de la voie technologique (janvier 2026)",
    url: "https://eduscol.education.gouv.fr/5643/cycle-terminal-de-la-voie-technologique",
  },
  stmg: {
    label: "Éduscol, les horaires de la série STMG",
    url: "https://eduscol.education.gouv.fr/5691/horaires-de-la-serie-sciences-et-technologies-du-management-et-de-la-gestion-stmg",
  },
  sti2d: {
    label: "Éduscol, les horaires de la série STI2D",
    url: "https://eduscol.education.gouv.fr/5667/horaires-de-la-serie-sciences-et-technologies-de-l-industrie-et-du-developpement-durable-sti2d",
  },
  stav: {
    label: "Chlorofil, le référentiel du bac STAV (2026)",
    url: "https://chlorofil.fr/fileadmin/user_upload/02-diplomes/referentiels/secondaire/bactechno/bac-techno-ref-2026.pdf",
  },
  bacPro: {
    label: "Éducation nationale, le baccalauréat professionnel (mai 2026)",
    url: "https://www.education.gouv.fr/reussir-au-lycee/bac-pro-ce-qui-change-en-2027-pour-les-terminales-9956",
  },
  voiePro: {
    label: "Éducation nationale, la voie professionnelle au lycée",
    url: "https://www.education.gouv.fr/reussir-au-lycee/la-voie-professionnelle-au-lycee-12101",
  },
  familles: {
    label: "Éduscol, les familles de métiers en 2nde professionnelle (août 2026)",
    url: "https://eduscol.education.gouv.fr/4905/les-familles-de-metiers-en-seconde-professionnelle",
  },
  pfmp: {
    label: "Arrêté du 22 janvier 2024, la durée des stages du bac pro",
    url: "https://voie-professionnelle.ac-versailles.fr/IMG/pdf/joe_20240203_0028_0025.pdf",
  },
  allocation: {
    label: "Éduscol, l'allocation de stage au lycée professionnel (septembre 2026)",
    url: "https://eduscol.education.gouv.fr/3860/allocation-de-stage-au-lycee-professionnel",
  },
  parcoursTle: {
    label: "Éduscol, le parcours personnalisé en Terminale professionnelle (septembre 2026)",
    url: "https://eduscol.education.gouv.fr/5580/le-parcours-personnalise-en-terminale-professionnelle",
  },
  cap: {
    label: "Éducation nationale, le CAP",
    url: "https://www.education.gouv.fr/reussir-au-lycee/le-certificat-d-aptitude-professionnelle-cap-9959",
  },
  affectation: {
    label: "Éducation nationale, l'orientation en 3e et l'affectation au lycée",
    url: "https://www.education.gouv.fr/reussir-au-lycee/l-orientation-en-3e-et-l-affectation-en-lycee-9257",
  },
  bts: {
    label: "Enseignement supérieur, le BTS (mars 2025)",
    url: "https://www.enseignementsup-recherche.gouv.fr/fr/brevet-de-technicien-superieur-bts-45915",
  },
  psupBts: {
    label: "Parcoursup, les bacheliers professionnels qui visent un BTS",
    url: "https://www.parcoursup.gouv.fr/faq/thematiques/candidats-parcoursup/bacheliers-professionnels-visant-un-bts",
  },
  redoublement: {
    label: "Éduscol, redoublement et conservation des notes (février 2026)",
    url: "https://eduscol.education.gouv.fr/5655/redoublement-et-conservation-des-notes-au-baccalaureat-general-et-technologique",
  },
  but: {
    label: "Enseignement supérieur, le BUT (août 2022)",
    url: "https://www.enseignementsup-recherche.gouv.fr/fr/licence-professionnellebut-86602",
  },
  psupExamenFaq: {
    label: "Parcoursup, questions fréquentes : l'examen des vœux",
    url: "https://www.parcoursup.gouv.fr/faq/thematiques/fonctionnement-de-parcoursup/examen-des-voeux-par-les-formations",
  },
  depp: {
    label: "DEPP, le baccalauréat 2026, session de juin (juillet 2026)",
    url: "https://www.education.gouv.fr/depp/baccalaureat-2026-session-de-juin-505283",
  },
  notes: {
    label: "Bulletin officiel n° 32 du 28 août 2025, candidats individuels et conservation des notes",
    url: "https://www.education.gouv.fr/bo/2025/Hebdo32/MENE2523745N",
  },
  ponctuelles: {
    label: "Bulletin officiel n° 32 du 28 août 2025, les évaluations ponctuelles",
    url: "https://www.education.gouv.fr/bo/2025/Hebdo32/MENE2523743N",
  },
  amenagements: {
    label: "Éducation nationale, les aménagements d'examen (octobre 2026)",
    url: "https://www.education.gouv.fr/examens-les-aides-et-amenagements-pour-les-candidats-besoins-particuliers-414547",
  },
  psupExamen: {
    label: "Parcoursup, comment les formations examinent les candidatures (mai 2026)",
    url: "https://www.parcoursup.gouv.fr/candidater-sur-parcoursup/comment-les-formations-examinent-les-candidatures-1357",
  },
  psupInscription: {
    label: "Parcoursup, s'inscrire dans la formation acceptée (juin 2026)",
    url: "https://www.parcoursup.gouv.fr/candidater-sur-parcoursup/j-ai-accepte-une-proposition-d-admission-comment-m-inscrire-dans-ma-5457",
  },
} satisfies Record<string, Source>;

export const GUIDE_BAC: Guide = etTypo({
  titre: "Le bac, pas à pas",
  lede: "Le bac se joue sur deux ans, la 1re et la Terminale : tes moyennes de l'année comptent pour 40 %, quelques épreuves en fin de 1re et en juin de Terminale pour 60 %. Chaque étape a sa date, ses règles et ses solutions de repli.",
  pourToi: {
    "4e": "Ton bac : juin {B}. Avant lui, deux rendez-vous : le choix de ta voie à la fin de la 3e, en juin {B-3}, puis celui de tes spécialités en 2nde.",
    "3e": "Ton bac : juin {B}. Le premier choix arrive cette année : ta voie après la 3e, décidée en juin {B-3}.",
    "2nde":
      "Ton bac : juin {B}. Cette année, tu choisis ta voie et, en voie générale, tes trois spécialités ; le bac commence l'an prochain, en 1re.",
    "1re":
      "Ton bac : juin {B}. Il commence cette année : tes moyennes de 1re comptent, et le français et les maths se passent en juin {B-1}.",
    terminale:
      "Ton bac : juin {B}. Ta 1re et tes épreuves anticipées sont acquises ; il te reste tes moyennes de Terminale, la philosophie, tes deux spécialités et le grand oral.",
  },
  rail: [
    {
      id: "troisieme",
      quand: "3e, juin {B-3}",
      titre: "Le choix de la voie",
      texte: "2nde générale et technologique, ou voie professionnelle.",
      section: "voies",
    },
    {
      id: "seconde",
      quand: "2nde, {B-3}-{B-2}",
      titre: "Tes spécialités",
      texte: "Au printemps : ta voie pour la 1re et, en générale, trois spécialités.",
      section: "specialites",
      cle: true,
    },
    {
      id: "premiere",
      quand: "1re, {B-2}-{B-1}",
      titre: "Le bac commence",
      texte: "Tes moyennes comptent ; français et maths en juin.",
      section: "epreuves",
      cle: true,
    },
    {
      id: "terminale",
      quand: "Terminale, {B-1}-{B}",
      titre: "Les épreuves finales",
      texte: "Philosophie, deux spécialités, grand oral, en juin.",
      section: "epreuves",
      cle: true,
    },
    {
      id: "resultats",
      quand: "Juillet {B}",
      titre: "Les résultats",
      texte: "Admis dès 10 sur 20 ; un oral de contrôle entre 8 et 10.",
      section: "resultats",
    },
  ],
  sections: [
    {
      id: "voies",
      titre: "Trois voies après la 3e",
      court: "Les voies",
      intro:
        "À la fin de la 3e, deux chemins s'ouvrent : la 2nde générale et technologique, commune à tous, qui mène en fin d'année vers la voie générale ou la voie technologique ; ou la voie professionnelle, qui prépare un métier dès la 2nde.",
      blocs: [
        {
          type: "cartes",
          cartes: [
            {
              titre: "Voie générale",
              sous: "Le bac général",
              texte:
                "Un tronc commun et des spécialités que tu choisis : trois en 1re, deux en Terminale. Elle prépare aux études supérieures : licence, prépa, écoles, BUT.",
              points: [
                "2nde générale et technologique, puis 1re et Terminale générales",
                "13 spécialités possibles, selon ce que propose ton lycée",
                "95,9 % de réussite en juin 2026",
              ],
            },
            {
              titre: "Voie technologique",
              sous: "Le bac technologique, en huit séries",
              texte:
                "Une série choisie en fin de 2nde, dans un domaine précis : gestion, industrie, laboratoire, santé et social, design, hôtellerie, spectacle vivant ou agronomie.",
              points: [
                "2nde générale et technologique (une 2nde spécifique pour l'hôtellerie), puis 1re et Terminale technologiques",
                "Ensuite : BUT et BTS en priorité, mais aussi prépas, écoles, université",
                "90,3 % de réussite en juin 2026",
              ],
              ton: "courtes",
            },
            {
              titre: "Voie professionnelle",
              sous: "Le bac pro, ou le CAP",
              texte:
                "Un métier dès la 2nde, au lycée professionnel ou en apprentissage, avec des semaines de formation en entreprise.",
              points: [
                "Bac pro en 3 ans ; CAP le plus souvent en 2 ans",
                "Près d'une centaine de spécialités de bac pro, environ 170 CAP",
                "Ensuite : un emploi, ou des études, en BTS surtout",
                "84,3 % de réussite au bac pro en juin 2026",
              ],
              ton: "pro",
            },
          ],
        },
        {
          type: "texte",
          texte:
            "Le choix se fait en famille, avec le conseil de classe, et suit le même déroulé en 3e et en 2nde. Après la 3e, ton affectation dans un lycée public passe ensuite par Affelnet, la procédure de ton académie : des vœux en mai, une réponse fin juin.",
        },
        {
          type: "etapes",
          etapes: [
            {
              id: "o-provisoires",
              quand: "2e trimestre",
              titre: "Tes vœux provisoires",
              texte:
                "Avec ta famille, tu indiques la voie que tu souhaites. Le conseil de classe te répond par un avis provisoire, et te conseille.",
            },
            {
              id: "o-definitifs",
              quand: "3e trimestre",
              titre: "Tes vœux définitifs",
              texte:
                "Le conseil de classe fait une proposition. Quand elle correspond à ton vœu, elle devient la décision d'orientation.",
              cle: true,
            },
            {
              id: "o-desaccord",
              quand: "En cas de désaccord",
              titre: "Un entretien, puis l'appel",
              texte:
                "Le chef d'établissement reçoit ta famille, puis décide et donne ses motifs. Ta famille a ensuite 3 jours ouvrables pour faire appel devant une commission, où tu peux demander à être entendu ; sa décision est définitive.",
            },
          ],
        },
        {
          type: "note",
          ton: "repere",
          titre: "Les voies communiquent",
          texte:
            "Après un CAP, une 1re professionnelle permet de préparer un bac pro en deux ans, dans la même spécialité ou une spécialité proche. Après une 2nde générale et technologique, ta famille peut aussi demander par écrit la voie professionnelle.",
        },
      ],
      sources: [S.orientation, S.choixOrientation, S.affectation, S.voieT, S.voiePro, S.cap, S.depp],
    },
    {
      id: "specialites",
      titre: "La 2nde, puis tes spécialités",
      court: "Spécialités",
      intro:
        "La 2nde générale et technologique est la même pour tous. C'est pendant cette année que tu choisis ta voie et, si tu vas en voie générale, les trois spécialités de ta 1re.",
      blocs: [
        {
          type: "texte",
          texte:
            "En voie générale, tu suis trois spécialités en 1re, 4 heures chacune, puis tu en gardes deux en Terminale, 6 heures chacune. Elles s'ajoutent au tronc commun : français en 1re, philosophie en Terminale, histoire-géographie, deux langues vivantes, enseignement scientifique, EPS et enseignement moral et civique.",
        },
        {
          type: "cartes",
          colonnes: 3,
          cartes: [
            {
              titre: "Sciences",
              texte: "Six spécialités, dont la biologie-écologie, proposée seulement dans les lycées agricoles.",
              points: [
                "Mathématiques",
                "Physique-chimie",
                "Sciences de la vie et de la Terre",
                "Sciences de l'ingénieur",
                "Numérique et sciences informatiques",
                "Biologie-écologie",
              ],
              ton: "sciences",
            },
            {
              titre: "Lettres, langues et sciences humaines",
              texte: "Cinq spécialités pour lire, écrire, débattre et comprendre le monde.",
              points: [
                "Histoire-géographie, géopolitique et sciences politiques",
                "Humanités, littérature et philosophie",
                "Langues, littératures et cultures étrangères et régionales",
                "Littérature et langues et cultures de l'Antiquité",
                "Sciences économiques et sociales",
              ],
              ton: "lettres",
            },
            {
              titre: "Arts et sport",
              texte: "Deux spécialités avec une part de pratique, jusque dans l'épreuve du bac.",
              points: ["Arts", "Éducation physique, pratiques et culture sportives"],
              ton: "arts",
            },
          ],
        },
        {
          type: "etapes",
          etapes: [
            {
              id: "s-fiche",
              quand: "2e trimestre de 2nde",
              titre: "Quatre spécialités envisagées",
              texte:
                "Sur la fiche dialogue, tu en indiques quatre, ou cinq si l'une manque dans ton lycée ; le conseil de classe te donne ses recommandations.",
            },
            {
              id: "s-trois",
              quand: "Fin de 2nde",
              titre: "Trois spécialités pour la 1re",
              texte:
                "Le choix final se fait après le conseil de classe du 3e trimestre. Il revient à ta famille : la décision d'orientation, elle, porte sur la voie.",
              cle: true,
            },
            {
              id: "s-deux",
              quand: "En 1re",
              titre: "Deux spécialités pour la Terminale",
              texte:
                "Celle que tu arrêtes compte encore : sa moyenne de 1re pèse un coefficient 8 au bac, le plus fort du contrôle continu.",
              cle: true,
            },
            {
              id: "s-options",
              quand: "Terminale",
              titre: "Une option de maths ou de droit, si tu veux",
              texte:
                "Mathématiques complémentaires, mathématiques expertes, ou droit et grands enjeux du monde contemporain : 3 heures de plus.",
            },
          ],
        },
        {
          type: "tableau",
          legende: "Les mathématiques, selon tes choix",
          colonnes: ["Ton choix", "En 1re", "En Terminale"],
          lignes: [
            ["La spécialité maths, gardée en Terminale", "4 heures", "6 heures, ou 9 avec maths expertes"],
            [
              "La spécialité maths, arrêtée en fin de 1re",
              "4 heures",
              "3 heures avec maths complémentaires, en option",
            ],
            [
              "Sans la spécialité maths",
              "1 h 30 de maths dans l'enseignement scientifique",
              "3 heures avec maths complémentaires, en option",
            ],
          ],
        },
        {
          type: "liste",
          titre: "Les options, en plus",
          items: [
            "En 1re et en Terminale, une option au choix, 3 heures : langue vivante C, arts, EPS, langue des signes française, et en lycée agricole hippologie et équitation, agronomie-économie-territoires ou pratiques sociales et culturelles.",
            "Le latin et le grec peuvent s'ajouter à cette option.",
            "En Terminale, une seconde option possible : maths complémentaires, maths expertes, ou droit et grands enjeux du monde contemporain.",
            "Chaque note d'option compte dans la moyenne du bac, quelle qu'elle soit : 2 coefficients par année suivie, en plus des 100.",
          ],
        },
        {
          type: "note",
          ton: "conseil",
          titre: "Compose ton trio",
          texte:
            "Les spécialités ouvrent des portes, et chaque formation regarde aussi ton dossier entier. Le simulateur te montre ce qu'ouvre chaque combinaison, ou ce que demande la formation que tu vises.",
          lien: { href: "/etudes#specialites", label: "Essayer le simulateur de spécialités" },
        },
        {
          type: "note",
          ton: "repere",
          titre: "Une spécialité absente de ton lycée",
          texte:
            "Ton lycée peut passer une convention avec un lycée proche ; à titre exceptionnel, la spécialité peut se suivre à distance, au CNED notamment.",
        },
      ],
      sources: [S.voieG, S.epreuvesG, S.spe2018, S.cc, S.memento],
    },
    {
      id: "techno",
      titre: "La voie technologique, série par série",
      court: "Bac techno",
      intro:
        "Huit séries, chacune avec trois spécialités en 1re et deux en Terminale, fixées par la série. Le reste ressemble à la voie générale : français, philosophie, histoire-géographie, deux langues vivantes, EPS, et 3 heures de maths pour tous.",
      blocs: [
        {
          type: "cartes",
          colonnes: 2,
          cartes: [
            {
              titre: "STMG",
              sous: "Management et gestion",
              texte: "L'entreprise et les organisations : gestion, management, droit, économie.",
              lignes: [
                { label: "En 1re", texte: "Sciences de gestion et numérique ; management ; droit et économie" },
                {
                  label: "En Terminale",
                  texte:
                    "Management, sciences de gestion et numérique, avec gestion et finance, mercatique, ressources humaines et communication, ou systèmes d'information ; droit et économie",
                },
                { label: "Ensuite", texte: "BUT en priorité, BTS, prépas, DCG, université" },
              ],
              ton: "courtes",
            },
            {
              titre: "STI2D",
              sous: "Industrie et développement durable",
              texte: "Concevoir des produits et des systèmes, de l'énergie au numérique.",
              lignes: [
                {
                  label: "En 1re",
                  texte: "Innovation technologique ; ingénierie et développement durable ; physique-chimie et maths",
                },
                {
                  label: "En Terminale",
                  texte:
                    "Ingénierie, innovation et développement durable, avec architecture et construction, énergies et environnement, innovation et écoconception, ou systèmes d'information et numérique ; physique-chimie et maths",
                },
                { label: "Ensuite", texte: "BUT en priorité, prépas TSI, écoles d'ingénieurs" },
              ],
              ton: "courtes",
            },
            {
              titre: "STL",
              sous: "Laboratoire",
              texte: "Les sciences à la paillasse : biologie, biotechnologies, physique, chimie.",
              lignes: [
                {
                  label: "En 1re",
                  texte:
                    "Physique-chimie et maths ; biochimie-biologie ; biotechnologies ou sciences physiques et chimiques en laboratoire",
                },
                {
                  label: "En Terminale",
                  texte:
                    "Physique-chimie et maths ; biochimie-biologie-biotechnologie ou sciences physiques et chimiques en laboratoire",
                },
                { label: "Ensuite", texte: "Études scientifiques, santé, sciences du vivant" },
              ],
              ton: "courtes",
            },
            {
              titre: "ST2S",
              sous: "Santé et social",
              texte: "Le corps humain, la santé publique, l'action sociale.",
              lignes: [
                {
                  label: "En 1re",
                  texte:
                    "Physique-chimie pour la santé ; biologie et physiopathologie humaines ; sciences et techniques sanitaires et sociales",
                },
                {
                  label: "En Terminale",
                  texte:
                    "Chimie, biologie et physiopathologie humaines ; sciences et techniques sanitaires et sociales",
                },
                { label: "Ensuite", texte: "BUT du travail social, formations paramédicales" },
              ],
              ton: "courtes",
            },
            {
              titre: "STD2A",
              sous: "Design et arts appliqués",
              texte: "Créer des objets, des espaces, des images, aux côtés des métiers d'art.",
              lignes: [
                { label: "En 1re", texte: "Physique-chimie ; outils et langages numériques ; design et métiers d'art" },
                {
                  label: "En Terminale",
                  texte: "Analyse et méthodes en design ; conception et création en design et métiers d'art",
                },
                { label: "À savoir", texte: "Une option dédiée en 2nde est le plus souvent demandée" },
              ],
              ton: "courtes",
            },
            {
              titre: "STHR",
              sous: "Hôtellerie et restauration",
              texte: "La cuisine, le service, l'accueil et la gestion hôtelière.",
              lignes: [
                { label: "En 2nde", texte: "Une 2nde spécifique, la seule de la voie technologique" },
                {
                  label: "En 1re",
                  texte:
                    "Enseignement scientifique alimentation-environnement ; sciences et technologies culinaires et des services ; économie-gestion hôtelière",
                },
                {
                  label: "En Terminale",
                  texte:
                    "Sciences et technologies culinaires et des services, avec l'enseignement scientifique alimentation-environnement ; économie-gestion hôtelière",
                },
              ],
              ton: "courtes",
            },
            {
              titre: "S2TMD",
              sous: "Théâtre, musique et danse",
              texte: "Une pratique artistique intense, souvent partagée avec un conservatoire.",
              lignes: [
                {
                  label: "En 1re",
                  texte:
                    "Économie, droit et environnement du spectacle vivant ; culture et sciences, et pratique, en danse, musique ou théâtre",
                },
                { label: "En Terminale", texte: "Culture et sciences, et pratique, dans ta discipline" },
                { label: "Ensuite", texte: "Formations artistiques supérieures, université" },
                { label: "À savoir", texte: "Une option dédiée en 2nde est le plus souvent demandée" },
              ],
              ton: "courtes",
            },
            {
              titre: "STAV",
              sous: "Agronomie et vivant",
              texte: "Agriculture, alimentation, environnement et territoires, en lycée agricole.",
              lignes: [
                {
                  label: "En 1re",
                  texte: "Gestion des ressources et de l'alimentation ; territoires et sociétés ; technologie",
                },
                {
                  label: "En Terminale",
                  texte: "Gestion des ressources et de l'alimentation ; territoires et technologie",
                },
                { label: "Ensuite", texte: "BTS agricoles en priorité" },
              ],
              ton: "courtes",
            },
          ],
        },
        {
          type: "liste",
          titre: "Ce qui la distingue de la voie générale",
          items: [
            "Les maths font partie du tronc commun : 3 heures en 1re et en Terminale.",
            "Une heure de langue vivante se fait autour de ta spécialité technologique.",
            "Philosophie : 2 heures par semaine en Terminale, coefficient 4 au bac.",
            "Grand oral : coefficient 12, sur la spécialité où tu mènes une étude approfondie ; dans certaines séries, c'est ton projet de l'année.",
            "Jusqu'à deux options : arts, EPS, langue des signes française, langue vivante C, latin ou grec, et en Terminale droit et grands enjeux du monde contemporain.",
          ],
        },
        {
          type: "note",
          ton: "repere",
          titre: "Des places pour toi en BUT",
          texte:
            "Les IUT ont pour objectif d'accueillir 50 % de bacheliers technologiques dans leurs BUT. Pour chaque formation, le recteur fixe un taux minimal, affiché sur sa fiche Parcoursup quelques jours avant les réponses.",
        },
      ],
      sources: [S.voieT, S.cycleT, S.stmg, S.sti2d, S.stav, S.grandOralT, S.calcul, S.but, S.psupExamenFaq],
    },
    {
      id: "pro",
      titre: "La voie professionnelle, de la 2nde au bac pro",
      court: "Bac pro",
      intro:
        "Un métier s'apprend dès la 2nde, au lycée professionnel ou en apprentissage dans un CFA. Le bac pro se prépare en trois ans, le CAP le plus souvent en deux.",
      blocs: [
        {
          type: "etapes",
          etapes: [
            {
              id: "p-famille",
              quand: "2nde professionnelle",
              titre: "Une famille de métiers",
              texte:
                "La plupart des 2nde pro regroupent des métiers proches : 14 familles à la rentrée 2026, 12 à la rentrée 2027. D'autres spécialités se choisissent dès la fin de la 3e.",
            },
            {
              id: "p-specialite",
              quand: "Fin de 2nde",
              titre: "Ta spécialité de bac pro",
              texte: "Tu la choisis parmi celles de ta famille de métiers.",
              cle: true,
            },
            {
              id: "p-pfmp",
              quand: "Sur les trois ans",
              titre: "16 à 20 semaines en entreprise",
              texte:
                "Les périodes de formation en milieu professionnel, réparties sur la 2nde, la 1re et la Terminale, avec un tuteur en entreprise et un professeur référent. Elles sont obligatoires et évaluées.",
            },
            {
              id: "p-projet",
              quand: "Terminale, avant la mi-mars",
              titre: "Deux semaines pour ton projet",
              texte:
                "Avant la fin des vœux Parcoursup : deux semaines en entreprise si tu vises un emploi, ou deux semaines de préparation si tu vises des études. Toute l'année, 1 h 30 de soutien par semaine, en moyenne, accompagne ton projet.",
            },
            {
              id: "p-bac",
              quand: "Juin de Terminale",
              titre: "Le bac pro",
              texte:
                "Sept épreuves obligatoires, en contrôle en cours de formation ou en épreuves finales selon ta spécialité. À partir de 2027, les écrits se calent sur ceux des autres bacs : maths et physique-chimie sur ordinateur dès fin mai, puis les autres écrits en juin.",
              cle: true,
            },
          ],
        },
        {
          type: "texte",
          texte:
            "Chaque semaine en entreprise est payée par l'État aux lycéens professionnels du public et du privé sous contrat. En apprentissage, c'est différent : tu as un contrat de travail et un salaire.",
        },
        {
          type: "faits",
          faits: [
            { label: "En 2nde pro", valeur: "50 € par semaine de stage" },
            { label: "En 1re pro", valeur: "75 € par semaine" },
            { label: "En Terminale pro", valeur: "100 € par semaine" },
          ],
        },
        {
          type: "liste",
          titre: "Les règles du bac pro",
          items: [
            "Tu es admis à partir de 10 sur 20 de moyenne générale.",
            "Entre 8 et 10, avec au moins 10 sur 20 aux épreuves professionnelles : une épreuve de contrôle, en deux oraux de 30 minutes, dont 15 de préparation, en sciences et en culture générale. Ces notes comptent seulement si elles améliorent ta moyenne.",
            "Mentions : assez bien à partir de 12, bien à partir de 14, très bien à partir de 16, avec les félicitations du jury au-delà de 18. Elles récompensent les candidats admis dès le premier groupe d'épreuves.",
            "Jusqu'à deux épreuves facultatives en plus des sept obligatoires.",
            "Tes notes d'au moins 10 se conservent cinq ans, si le bac est à repasser.",
          ],
        },
        {
          type: "cartes",
          colonnes: 3,
          cartes: [
            {
              titre: "Travailler",
              texte:
                "Le bac pro prépare d'abord à un métier qualifié. Le bureau des entreprises de ton lycée t'aide à trouver stages, contacts et premiers emplois.",
              ton: "pro",
            },
            {
              titre: "Continuer en BTS",
              texte:
                "Chaque BTS public réserve des places aux bacheliers professionnels, et l'avis favorable de ton conseil de classe te garantit d'être classé. En 2025, plus de 71 % des bacheliers pro ont reçu une proposition en BTS ; avec cet avis favorable, plus de 9 sur 10 ont reçu une proposition.",
              points: [
                "Mention bien ou très bien, et encore sans proposition : une admission de droit en BTS, dans une spécialité cohérente",
                "Sans place en BTS malgré un avis favorable : une classe passerelle d'un an peut t'y préparer, dans les lycées que ton académie désigne chaque année",
              ],
              ton: "courtes",
            },
            {
              titre: "Après un CAP",
              texte:
                "Un emploi, une année de spécialisation, ou une 1re professionnelle pour préparer un bac pro en deux ans, à la demande de ta famille.",
              ton: "pro",
            },
          ],
        },
        {
          type: "note",
          ton: "alt",
          titre: "En apprentissage",
          texte:
            "Le CAP et le bac pro se préparent aussi en CFA, avec un contrat d'apprentissage : tu es salarié d'une entreprise, dès 16 ans, ou dès 15 ans une fois le collège terminé. L'inscription se fait une fois le contrat signé avec un employeur ; le collège et le CFA t'aident à en trouver un.",
        },
      ],
      sources: [
        S.bacPro,
        S.voiePro,
        S.familles,
        S.pfmp,
        S.allocation,
        S.parcoursTle,
        S.cap,
        S.affectation,
        S.psupBts,
        S.bts,
      ],
    },
    {
      id: "note",
      titre: "Comment se calcule ta note",
      court: "La note",
      intro:
        "100 coefficients en tout : 40 pour tes moyennes de 1re et de Terminale, 60 pour les épreuves. Les options s'ajoutent par-dessus. Ces règles valent à partir de la session 2027.",
      blocs: [
        { type: "outil", outil: "note-bac" },
        {
          type: "liste",
          titre: "Le contrôle continu, concrètement",
          items: [
            "C'est ta moyenne annuelle de chaque matière, telle qu'elle figure sur tes bulletins de 1re et de Terminale ; le coefficient se partage entre les deux années, par exemple 3 et 3 en histoire-géographie.",
            "Chaque moyenne est validée au dernier conseil de classe de l'année. Tu peux consulter ton livret scolaire avant qu'il parte au jury.",
            "En EPS, la note est la moyenne de trois évaluations, en Terminale.",
            "Trop peu d'évaluations dans une matière pour une moyenne représentative, après des absences par exemple ? Ton chef d'établissement te convoque à une évaluation de remplacement. Une absence justifiée vaut une nouvelle convocation ; une absence injustifiée, la note 0.",
            "Une commission académique peut harmoniser les notes d'un lycée en cas d'écart manifeste. C'est rare : en 2024, moins de 1 % des élèves de 1re et 1,7 % des élèves de Terminale.",
            "Ton lycée a un projet d'évaluation, communiqué aux familles : les mêmes règles pour toute la classe.",
          ],
        },
        {
          type: "note",
          ton: "conseil",
          titre: "Une note isolée pèse peu",
          texte:
            "Elle se fond dans la moyenne de l'année, elle-même partagée entre la 1re et la Terminale. La régularité compte davantage qu'un seul devoir.",
        },
        {
          type: "note",
          ton: "repere",
          titre: "La langue compte partout",
          texte:
            "À partir de 2027, au moins 2 points de chaque épreuve écrite récompensent la maîtrise de la langue : orthographe, syntaxe, vocabulaire, clarté du raisonnement.",
        },
      ],
      sources: [S.calcul, S.cc, S.memento, S.bacGeneral, S.langue],
    },
    {
      id: "epreuves",
      titre: "Les épreuves, année par année",
      court: "Épreuves",
      intro:
        "Deux temps forts : la fin de la 1re, avec le français et les maths, puis juin de Terminale, avec la philosophie, tes deux spécialités et le grand oral.",
      blocs: [
        {
          type: "etapes",
          etapes: [
            {
              id: "e-francais",
              quand: "Fin de 1re, juin {B-1}",
              titre: "Le français, à l'écrit et à l'oral",
              texte:
                "Un écrit de 4 heures : commentaire ou dissertation en voie générale, commentaire ou contraction suivie d'un essai en technologique. Un oral de 20 minutes après 30 minutes de préparation : l'explication d'un texte étudié en classe, une question de grammaire, puis la présentation d'une œuvre que tu as choisie. Coefficient 5 chacun.",
              cle: true,
            },
            {
              id: "e-maths",
              quand: "Fin de 1re, juin {B-1}",
              titre: "Les maths, en épreuve anticipée",
              texte:
                "2 heures, sans calculatrice, coefficient 2 : des questions courtes d'automatismes sur 6 points, puis deux ou trois exercices sur 14 points. Le sujet suit les maths que tu as étudiées : spécialité, maths de l'enseignement scientifique, ou maths de la voie technologique.",
              cle: true,
            },
            {
              id: "e-philo",
              quand: "Terminale, mi-juin {B}",
              titre: "La philosophie",
              texte:
                "4 heures, trois sujets au choix : deux dissertations et un texte à expliquer. Coefficient 8 en voie générale, 4 en technologique.",
            },
            {
              id: "e-spe",
              quand: "Terminale, mi-juin {B}",
              titre: "Tes deux spécialités",
              texte:
                "Une par jour, coefficient 16 chacune. En voie générale : 4 heures d'écrit en maths, SES, HGGSP, HLP et LLCA ; 3 h 30 d'écrit et une partie pratique en physique-chimie, SVT, NSI, sciences de l'ingénieur et biologie-écologie ; 3 h 30 d'écrit et un oral ou une pratique en langues, arts et sport.",
              cle: true,
            },
            {
              id: "e-go",
              quand: "Terminale, fin juin {B}",
              titre: "Le grand oral",
              texte:
                "Tu prépares deux questions liées à tes spécialités ; le jury en choisit une. 20 minutes de préparation, puis 20 minutes : 10 de présentation, debout, et 10 d'échange avec le jury. Coefficient 8 en voie générale, 12 en technologique.",
              cle: true,
            },
          ],
        },
        { type: "outil", outil: "dates-bac" },
      ],
      sources: [
        S.epreuvesG,
        S.francaisBO,
        S.mathsAntBO,
        S.mathsAnt,
        S.philoBO,
        S.grandOralG,
        S.grandOralT,
        S.calendrier2027,
      ],
    },
    {
      id: "resultats",
      titre: "Les résultats, et toutes les suites possibles",
      court: "Résultats",
      intro:
        "Début juillet, le jury annonce ta moyenne. À partir de 10 sur 20, tu as ton bac ; entre 8 et 10, un oral de contrôle te laisse une seconde chance, quelques jours plus tard.",
      blocs: [
        {
          type: "paliers",
          titre: "Ce que donne ta moyenne sur 20",
          paliers: [
            { seuil: "Moins de 8", label: "Ajourné", detail: "Le bac se repasse l'année suivante" },
            { seuil: "De 8 à moins de 10", label: "Oral de contrôle", detail: "Deux oraux pour aller chercher le 10" },
            { seuil: "À partir de 10", label: "Admis" },
            { seuil: "À partir de 12", label: "Assez bien" },
            { seuil: "À partir de 14", label: "Bien" },
            { seuil: "À partir de 16", label: "Très bien" },
            { seuil: "À partir de 18", label: "Très bien, félicitations du jury" },
          ],
        },
        {
          type: "etapes",
          etapes: [
            {
              id: "r-choix",
              quand: "Après les résultats",
              titre: "Tu choisis deux matières",
              texte:
                "Parmi celles qui ont eu un écrit : le français, les maths de l'épreuve anticipée, la philosophie, tes deux spécialités.",
            },
            {
              id: "r-oraux",
              quand: "Dans les jours qui suivent",
              titre: "Deux oraux",
              texte:
                "Pour chaque matière, le jury garde la meilleure de tes deux notes : celle de juin, ou celle de l'oral.",
              cle: true,
            },
            {
              id: "r-fin",
              quand: "À la fin des oraux",
              titre: "Le résultat final",
              texte: "À 10 de moyenne, tu as ton bac ; après l'oral de contrôle, il s'obtient sans mention.",
            },
          ],
        },
        {
          type: "liste",
          titre: "Si le bac est à repasser",
          items: [
            "Tu as le droit de refaire ta Terminale dans ton lycée, à la rentrée qui suit, une fois.",
            "En la refaisant, tu gardes tes moyennes de 1re et, si tu le demandes, tes notes d'épreuves anticipées ; tes moyennes de Terminale sont recalculées. En voie générale, tu peux demander à échanger une spécialité de 1re contre une de Terminale.",
            "Tes notes d'épreuves finales d'au moins 10 peuvent être conservées, pendant cinq sessions au plus. Avec des notes conservées, le bac s'obtient sans mention ; en repassant toutes les épreuves, la mention reste possible.",
            "Si tu te représentes plus d'un an après, les moyennes de ta nouvelle Terminale prennent tout le coefficient, et une évaluation ponctuelle remplace la spécialité arrêtée en 1re.",
          ],
        },
        {
          type: "note",
          ton: "repere",
          titre: "Empêché le jour d'une épreuve",
          texte:
            "Pour une cause justifiée, une maladie par exemple, une session de remplacement a lieu en septembre : du 6 au 10 septembre en 2027. Elle se distingue de l'oral de contrôle de juillet.",
        },
        {
          type: "faits",
          faits: [
            { label: "Juin 2026, toutes voies", valeur: "91,4 % d'admis" },
            { label: "Bac général", valeur: "95,9 %" },
            { label: "Bac technologique", valeur: "90,3 %" },
            { label: "Bac professionnel", valeur: "84,3 %" },
          ],
        },
      ],
      sources: [S.presentationG, S.bacGeneral, S.redoublement, S.notes, S.calendrier2027, S.depp],
    },
    {
      id: "cas",
      titre: "Ton lycée, ta situation : ce qui change",
      court: "Cas particuliers",
      intro:
        "Le bac est le même pour tous, mais la façon de remplacer le contrôle continu dépend de ton établissement. Dans tous les établissements, un candidat à besoins particuliers (handicap, trouble de santé ou des apprentissages) peut demander des aménagements.",
      blocs: [
        {
          type: "cartes",
          colonnes: 2,
          cartes: [
            {
              titre: "Lycée public ou privé sous contrat",
              texte:
                "Le régime de base : le contrôle continu sur tes bulletins de 1re et de Terminale, puis les épreuves finales. Il vaut aussi pour le CNED en scolarité réglementée et les lycées français homologués à l'étranger.",
            },
            {
              titre: "Hors contrat, CNED en inscription libre, sans lycée",
              texte:
                "Tu es candidat individuel : des évaluations ponctuelles remplacent le contrôle continu, en histoire-géographie, langues vivantes A et B, enseignement scientifique (ou maths en voie technologique), enseignement moral et civique, et dans la spécialité arrêtée en 1re. L'EPS se passe en examen ponctuel.",
              points: [
                "Deux formules, au choix à l'inscription : une série d'évaluations en fin de 1re puis une en fin de Terminale, ou une seule série l'année du bac",
                "Les écrits sont corrigés de façon anonyme",
                "Une absence se justifie dans les 3 jours ouvrables",
                "Les options se passent dans les académies qui ont un examinateur",
              ],
            },
            {
              titre: "Aménagements d'examen",
              texte:
                "Temps majoré, ordinateur, secrétaire, sujets adaptés, épreuves étalées sur plusieurs sessions : pour un handicap, un PAP, un PAI ou un PPS, dans tous les établissements, hors contrat et CNED compris.",
              points: [
                "La demande se fait sur l'application Incluscol, par toi ou tes parents",
                "Elle peut se faire dès la 2nde, pour la fin du 2e trimestre",
                "Dans un lycée public ou privé sous contrat, avec un PAP, un PAI ou un PPS valide, le chef d'établissement saisit lui-même les aménagements",
                "Hors contrat, au CNED ou en candidat libre, toi ou tes parents faites la demande complète sur Incluscol",
                "Le recteur décide ; un recours reste possible dans Incluscol",
              ],
            },
            {
              titre: "D'un lycée à l'autre",
              texte:
                "Élève en 1re, puis candidat individuel en Terminale ? Tes moyennes de 1re et tes notes d'épreuves anticipées te suivent ; tes évaluations ponctuelles portent alors sur le programme de Terminale.",
            },
          ],
        },
      ],
      sources: [S.notes, S.ponctuelles, S.amenagements, S.memento],
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
              q: "Mes notes de 1re comptent-elles vraiment ?",
              r: "Elles pèsent un tiers de la note : 33 coefficients sur 100, entre tes moyennes de 1re, le français et les maths anticipés. Tes bulletins de 1re sont aussi les premiers que lisent les formations sur Parcoursup.",
            },
            {
              q: "La spécialité que j'arrête en fin de 1re compte-t-elle encore ?",
              r: "Oui : ta moyenne de 1re dans cette spécialité compte avec un coefficient 8, le plus fort du contrôle continu.",
            },
            {
              q: "Le contrôle continu, c'est chaque contrôle de l'année ?",
              r: "C'est ta moyenne annuelle dans chaque matière, telle qu'elle figure sur tes bulletins de 1re et de Terminale.",
            },
            {
              q: "Une option peut-elle faire baisser ma moyenne ?",
              r: "Chaque note d'option compte, quelle qu'elle soit, avec 2 coefficients par année suivie. Une option où tu réussis tire ta moyenne vers le haut ; une option sous ta moyenne la tire un peu vers le bas.",
            },
            {
              q: "Le bac compte-t-il encore, avec Parcoursup ?",
              r: "Oui : la place que tu acceptes sur Parcoursup devient une inscription une fois le bac obtenu. Et tes notes d'épreuves anticipées, français et maths, figurent dans ton dossier.",
            },
            {
              q: "Mes notes de spécialité de juin comptent-elles pour Parcoursup ?",
              r: "Elles arrivent après la confirmation des vœux, début avril : les formations lisent tes moyennes de spécialité sur tes bulletins de 1re et de Terminale.",
            },
            {
              q: "Sans la spécialité maths, j'arrête les maths ?",
              r: "En 1re, tout le monde fait des maths, en spécialité ou 1 h 30 dans l'enseignement scientifique, et tout le monde passe l'épreuve anticipée. En Terminale, l'option maths complémentaires, 3 heures, prend le relais si tes études en demandent.",
            },
            {
              q: "Une spécialité peut-elle fermer une formation ?",
              r: "Le bac lui-même laisse toutes les formations ouvertes : chacune publie ses critères sur sa fiche Parcoursup. Certaines, comme les prépas scientifiques ou les écoles d'ingénieurs, attendent un bon niveau en maths : lis leur fiche, ou essaie le simulateur de spécialités.",
            },
            {
              q: "Le bac technologique mène-t-il à des études longues ?",
              r: "Oui : le BUT en priorité, qui donne le grade de licence, des prépas, dont la TSI pour les STI2D, des écoles d'ingénieurs, puis un master.",
            },
            {
              q: "Le grand oral porte-t-il sur mon projet d'orientation ?",
              r: "À partir de 2027, il porte sur une question liée à tes spécialités : 10 minutes d'exposé, puis 10 minutes d'échange avec le jury.",
            },
            {
              q: "Hors contrat ou au CNED en inscription libre, a-t-on le même bac ?",
              r: "Oui, le même diplôme : tu le passes en candidat individuel, avec des évaluations ponctuelles à la place du contrôle continu.",
            },
            {
              q: "Le temps majoré est-il automatique avec un PAP ?",
              r: "Il se demande sur Incluscol, dès la 2nde. Dans un lycée public ou privé sous contrat, avec un PAP, un PAI ou un PPS, la procédure est simplifiée : ton chef d'établissement saisit la demande. Le recteur décide.",
            },
            {
              q: "Qui choisit mes spécialités ?",
              r: "Ta famille, en fin de 2nde. Le conseil de classe donne ses recommandations ; la décision d'orientation, elle, porte sur la voie.",
            },
            {
              q: "Peut-on avoir une mention après l'oral de contrôle ?",
              r: "Les mentions récompensent les candidats admis dès le premier groupe d'épreuves ; après l'oral de contrôle, le bac s'obtient sans mention.",
            },
            {
              q: "Et si je suis malade le jour d'une épreuve ?",
              r: "Avec un justificatif, tu passes l'épreuve à la session de remplacement, en septembre.",
            },
          ],
        },
      ],
      sources: [
        S.cc,
        S.memento,
        S.calcul,
        S.voieG,
        S.voieT,
        S.grandOralG,
        S.ponctuelles,
        S.amenagements,
        S.psupExamen,
        S.psupInscription,
      ],
    },
  ],
  verifie:
    "Informations vérifiées le 19 octobre 2026 sur les sites du ministère de l'Éducation nationale, d'Éduscol, du Bulletin officiel et de Service-public. Les règles évoluent d'une session à l'autre : chaque section cite ses sources.",
});

/** Le calendrier officiel de la session 2027, par voie et par classe. */
export const DATES_BAC = etTypo({
  session: 2027,
  generale: {
    terminale: [
      {
        du: "2027-06-01",
        au: "2027-06-04",
        quand: "Du mardi 1er au vendredi 4 juin 2027",
        titre: "La partie pratique de physique-chimie et de SVT",
        texte: "Si tu suis l'une de ces spécialités : l'évaluation de tes compétences expérimentales, au lycée.",
      },
      { du: "2027-06-14", quand: "Lundi 14 juin 2027, de 8 h à 12 h", titre: "Philosophie", cle: true },
      {
        du: "2027-06-16",
        au: "2027-06-18",
        quand: "Du mercredi 16 au vendredi 18 juin 2027",
        titre: "Tes deux spécialités",
        texte: "Deux de ces trois jours, une spécialité par jour : ta convocation donne les tiens.",
        cle: true,
      },
      {
        du: "2027-06-21",
        au: "2027-07-02",
        quand: "Du lundi 21 juin au vendredi 2 juillet 2027",
        titre: "Le grand oral",
        texte: "Ton jour et ton heure figurent sur ta convocation.",
      },
      { du: "2027-07-06", quand: "Mardi 6 juillet 2027", titre: "Les résultats", cle: true },
      {
        du: "2027-07-06",
        au: "2027-07-09",
        quand: "Jusqu'au vendredi 9 juillet 2027",
        titre: "Les oraux de contrôle",
        texte: "Pour une moyenne entre 8 et 10.",
      },
    ] satisfies Jalon[],
    premiere: [
      { du: "2027-06-15", quand: "Mardi 15 juin 2027, de 8 h à 12 h", titre: "Français, écrit", cle: true },
      {
        du: "2027-06-21",
        quand: "Lundi 21 juin 2027, de 8 h à 10 h",
        titre: "Mathématiques, épreuve anticipée",
        cle: true,
      },
      {
        du: "2027-06-21",
        au: "2027-07-09",
        quand: "Entre le lundi 21 juin et le vendredi 9 juillet 2027",
        titre: "Français, oral",
        texte: "Ton académie fixe le jour : ta convocation te le donne.",
      },
    ] satisfies Jalon[],
    remplacement: "Du lundi 6 au vendredi 10 septembre 2027",
  },
  pro: {
    terminale: [
      {
        du: "2027-05-24",
        au: "2027-06-04",
        quand: "Du lundi 24 mai au vendredi 4 juin 2027",
        titre: "Mathématiques et physique-chimie",
        texte: "Des épreuves pratiques et écrites, sur ordinateur.",
      },
      { du: "2027-06-03", quand: "Jeudi 3 juin 2027", titre: "Langue vivante A" },
      { du: "2027-06-04", quand: "Vendredi 4 juin 2027", titre: "Langue vivante B, selon ta spécialité" },
      { du: "2027-06-07", quand: "Lundi 7 juin 2027", titre: "Arts appliqués et cultures artistiques" },
      { du: "2027-06-08", quand: "Mardi 8 juin 2027", titre: "Français", cle: true },
      {
        du: "2027-06-09",
        quand: "Mercredi 9 juin 2027",
        titre: "Histoire-géographie et enseignement moral et civique",
        cle: true,
      },
      { du: "2027-06-14", quand: "Lundi 14 juin 2027", titre: "Prévention-santé-environnement" },
      { du: "2027-06-15", quand: "Mardi 15 juin 2027", titre: "Économie-droit ou économie-gestion" },
      {
        du: "2027-06-16",
        au: "2027-06-25",
        quand: "Du mercredi 16 au vendredi 25 juin 2027",
        titre: "Les autres écrits de ta spécialité",
        texte: "Le matin, selon le calendrier de ta spécialité.",
      },
      {
        du: "2027-06-21",
        au: "2027-07-09",
        quand: "À partir du lundi 21 juin 2027",
        titre: "L'oral de projet",
        texte: "Ta convocation donne le jour et l'heure.",
      },
      { du: "2027-07-06", quand: "Mardi 6 juillet 2027", titre: "Les résultats", cle: true },
      {
        du: "2027-07-06",
        au: "2027-07-09",
        quand: "Jusqu'au vendredi 9 juillet 2027",
        titre: "L'épreuve de contrôle",
        texte: "Pour une moyenne entre 8 et 10, avec au moins 10 aux épreuves professionnelles.",
      },
    ] satisfies Jalon[],
    remplacement: "Du 6 au 10, puis du 13 au 16 septembre 2027",
  },
  sources: [S.calendrier2027, S.calendrierPage],
});
