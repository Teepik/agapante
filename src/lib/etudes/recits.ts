/**
 * « Ils racontent » : des récits d'élèves et d'étudiants publiés par la presse et l'Onisep, voie par voie.
 * Chaque lien mène à l'article, à la vidéo ou au podcast d'origine ; la date est celle de la publication.
 * Liste vérifiée en octobre 2026 : les trois premiers récits de chaque voie sont mis en avant.
 */
import { etTypo } from "./typo";

export type Recit = {
  /** Voie de la carte (identifiant de couloir). */
  lane: string;
  etape: string;
  titre: string;
  media: string;
  /** « 2024-03 » ou « 2020 » */
  date: string;
  format: "article" | "video" | "podcast";
  url: string;
  resume: string;
};

export const recits: Recit[] = etTypo([
  {
    lane: "pro",
    etape: "Bac pro",
    titre: "Réussir en lycée pro : les témoignages de Maël, Kylian, Morgane, Nory et Lucas",
    media: "L'Etudiant",
    date: "2024-03",
    format: "article",
    url: "https://www.letudiant.fr/lycee/lycee-pro-cap/reussir-en-lycee-pro-les-temoignages-de-mael-kylian-morgane-nory-et-lucas.html",
    resume:
      "Cinq élèves de bac pro d'un lycée du Gers présentent leur filière (électricité, vente, maintenance, mécanique), leurs nombreux stages en entreprise et le métier qu'ils visent.",
  },
  {
    lane: "pro",
    etape: "CAP",
    titre: "Ma 1ʳᵉ année en CAP et CAPa",
    media: "Onisep",
    date: "2025-09",
    format: "article",
    url: "https://www.onisep.fr/formation/apres-la-3-la-voie-professionnelle/ma-1-annee-en-voie-professionnelle/ma-1-annee-en-cap-et-capa",
    resume:
      "Une douzaine d'élèves racontent leur première année de CAP, de la pâtisserie à l'ébénisterie en passant par la logistique, le vitrail ou le soin des chevaux.",
  },
  {
    lane: "pro",
    etape: "Apprentissage",
    titre: "Se former en alternance : paroles d'apprentis en vidéos",
    media: "Onisep",
    date: "2024-02",
    format: "video",
    url: "https://www.onisep.fr/formation/apres-la-3-la-voie-professionnelle/apprentissage-se-former-en-alternance/se-former-en-alternance-paroles-d-apprentis-en-videos",
    resume:
      "Cinq apprentis rencontrés aux WorldSkills retracent leur parcours depuis la 3e, leur quotidien partagé entre centre de formation et entreprise, et le métier qu'ils préparent.",
  },
  {
    lane: "pro",
    etape: "Terminale bac pro",
    titre: "« J’ai peur de faire le mauvais choix » : à Vincennes, les terminales pro face aux dilemmes de l’après-bac",
    media: "L'Etudiant",
    date: "2026-09",
    format: "article",
    url: "https://www.letudiant.fr/lycee/lycee-pro-cap/j-ai-peur-de-faire-le-mauvais-choix-a-vincennes-les-terminale-pro-face-aux-dilemmes-de-l-apres-bac.html",
    resume:
      "Des élèves de terminale bac pro confient leurs hésitations entre BTS, alternance et premier emploi, et montrent comment leurs professeurs les aident à construire leur projet.",
  },
  {
    lane: "courtes",
    etape: "BTS et BTS en alternance",
    titre: "Dans la peau d'un étudiant en BTS",
    media: "L'Etudiant",
    date: "2020-07",
    format: "article",
    url: "https://www.letudiant.fr/etudes/btsdut/dans-la-peau-d-un-etudiant-en-bts.html",
    resume:
      "Trois étudiants de BTS décrivent leurs journées de cours, l'encadrement serré des professeurs et, pour l'une d'eux, le rythme de l'alternance avec deux jours au lycée et quatre en entreprise.",
  },
  {
    lane: "courtes",
    etape: "BUT 1re année",
    titre: "Ma rentrée en BUT à l'IUT de Ville d'Avray",
    media: "L'Etudiant",
    date: "2021-09",
    format: "video",
    url: "https://www.letudiant.fr/etudes/btsdut/ma-rentree-en-but-a-l-iut-de-ville-d-avray.html",
    resume:
      "Deux étudiants de BUT génie mécanique racontent leur rentrée à l'IUT : découverte des semestres et des compétences à valider, test de maths et visite des salles de travaux pratiques.",
  },
  {
    lane: "courtes",
    etape: "BUT, toutes spécialités",
    titre: "Ma 1ʳᵉ année en BUT",
    media: "Onisep",
    date: "2025-12",
    format: "article",
    url: "https://www.onisep.fr/formation/apres-le-bac-les-etudes-superieures/ma-1-annee-en/ma-1-annee-en-but",
    resume:
      "Une quinzaine d'étudiants d'IUT racontent leur BUT, du génie civil à l'informatique en passant par les carrières sociales, la chimie ou le journalisme.",
  },
  {
    lane: "courtes",
    etape: "BTS",
    titre: "Podcast #Vismavie : Sayidat et Nizar racontent leur première année de BTS",
    media: "L'Etudiant",
    date: "2021-05",
    format: "podcast",
    url: "https://www.letudiant.fr/etudes/btsdut/podcast-vismavie-saida-et-nizar-racontent-leur-premiere-annee-de-bts.html",
    resume:
      "Deux étudiants de BTS management commercial décrivent un rythme plus soutenu qu'au lycée, un suivi proche des professeurs et davantage de travail personnel.",
  },
  {
    lane: "parasocial",
    etape: "IFSI (infirmier)",
    titre: "Amandine, étudiante en soins infirmiers : « Je passe la moitié du temps en stage »",
    media: "L'Etudiant",
    date: "2022-01",
    format: "article",
    url: "https://www.letudiant.fr/etudes/medecine-sante/amandine-etudiante-en-soins-infirmiers-je-passe-la-moitie-du-temps-en-stage.html",
    resume:
      "Une étudiante en IFSI détaille ses trois ans de formation, avec l'alternance de dix semaines de cours et dix semaines de stage en EHPAD, psychiatrie ou pédiatrie.",
  },
  {
    lane: "parasocial",
    etape: "Kinésithérapie",
    titre:
      'Rentrée en kiné à l\'IFMKNF de Lille : "C’est différent par rapport à ce que j’imaginais", les étudiants découvrent leurs premiers cours',
    media: "L'Etudiant",
    date: "2025-09",
    format: "article",
    url: "https://www.letudiant.fr/etudes/medecine-sante/rentree-kine-cest-completement-different-par-rapport-a-ce-que-jimaginais-les-etudiants-decouvrent-leurs-premiers-cours-a-lifmknf-de-lille.html",
    resume:
      "Des étudiants de première année d'institut de kinésithérapie, arrivés après le PASS, découvrent l'anatomie, la mesure des articulations et une promotion de 90 où chacun se connaît.",
  },
  {
    lane: "parasocial",
    etape: "Orthophonie",
    titre: "Certificat de capacité d'orthophoniste - Témoignage",
    media: "Onisep",
    date: "2022-09",
    format: "article",
    url: "https://www.onisep.fr/formation/apres-le-bac-les-etudes-superieures/ma-1-annee-en/ma-1-annee-en-diplome-du-paramedical/certificat-de-capacite-d-orthophoniste",
    resume:
      "Une étudiante de l'école d'orthophonie de Sorbonne Université raconte sa première année d'un cursus de cinq ans qui allie soin et goût des langues.",
  },
  {
    lane: "parasocial",
    etape: "Éducateur spécialisé",
    titre:
      'Devenir éducateur spécialisé : "Pour faire ce métier, il faut être droit dans ses baskets et connaître ses limites"',
    media: "L'Etudiant",
    date: "2025-03",
    format: "article",
    url: "https://www.letudiant.fr/etudes/medecine-sante/devenir-educateur-specialise-pour-faire-ce-metier-il-faut-etre-droit-dans-ses-baskets-et-connaitre-ses-limites.html",
    resume:
      "Trois étudiants en formation d'éducateur spécialisé, dont un en alternance, décrivent les modules de cours, les stages sur le terrain et ce que ce métier leur demande.",
  },
  {
    lane: "parasocial",
    etape: "IFSI, premier stage",
    titre: "Premier stage infirmier : des étudiants d’IFSI racontent leur expérience",
    media: "CIDJ",
    date: "2025-04",
    format: "article",
    url: "https://www.cidj.com/s-orienter/avec-nos-focus-diplomes/premier-stage-infirmier-des-etudiants-d-ifsi-racontent-leur-experience",
    resume:
      "Des étudiants infirmiers racontent leur premier stage à l'hôpital, en EHPAD ou en crèche : premiers soins, émotions fortes, rythme du service et conseils pour bien s'y préparer.",
  },
  {
    lane: "sante",
    etape: "PASS",
    titre: "Immersion en PASS : « C'est une année de stress constant »",
    media: "L'Etudiant",
    date: "2023-10",
    format: "article",
    url: "https://www.letudiant.fr/etudes/medecine-sante/immersion-en-pass-cest-une-annee-de-stress-constant.html",
    resume:
      "Des étudiantes de PASS à l'université de Versailles décrivent une année très intense : amphis en début de semaine, travaux dirigés ensuite, mémorisation quotidienne jusqu'au soir et classement exigeant.",
  },
  {
    lane: "sante",
    etape: "PASS puis LAS",
    titre: "Pour Ambre, étudiante en médecine, « en LAS 2, le programme est plus concret qu'en PASS »",
    media: "L'Etudiant",
    date: "2025-12",
    format: "article",
    url: "https://www.letudiant.fr/etudes/medecine-sante/pour-ambre-etudiante-en-medecine-en-las-2-le-programme-est-plus-concret-quen-pass.html",
    resume:
      "Une étudiante de Clermont-Ferrand raconte comment elle est entrée en médecine par une LAS 2 après un premier essai en PASS, grâce au tutorat et à une méthode de travail bien à elle.",
  },
  {
    lane: "sante",
    etape: "Internat de médecine",
    titre: "Les internes en médecine font leur rentrée, entre excitation et appréhension",
    media: "L'Etudiant",
    date: "2021-11",
    format: "article",
    url: "https://www.letudiant.fr/etudes/medecine-sante/les-internes-en-medecine-font-leur-rentree-entre-excitation-et-apprehension.html",
    resume:
      "Trois nouveaux internes en oncologie, neurologie et chirurgie pédiatrique vivent le passage d'externe à interne : premiers jours à l'hôpital, nouvelles responsabilités et premières gardes.",
  },
  {
    lane: "defense",
    etape: "Prépa en lycée militaire puis École de l'air",
    titre: "Alexandre : « Comment je me prépare à devenir pilote de l'air »",
    media: "L'Etudiant",
    date: "2020-02",
    format: "video",
    url: "https://www.letudiant.fr/metiers/comment-je-me-prepare-a-devenir-pilote-de-l-air.html",
    resume:
      "Un élève de première année de l'École de l'air retrace sa prépa scientifique au lycée militaire d'Aix-en-Provence, le concours, les épreuves sportives et ses premiers vols en planeur.",
  },
  {
    lane: "defense",
    etape: "Lycée naval puis École navale",
    titre: "Fiche parcours – Élève-officier à l'École Navale",
    media: "Lycée naval de Brest",
    date: "2020",
    format: "article",
    url: "https://lycee-naval.ac-rennes.fr/sites/lycee-naval.ac-rennes.fr/IMG/pdf/fiche_parcours_ewen_ecole_navale.pdf",
    resume:
      "Ewen raconte ses deux années de prépa au lycée naval de Brest, entre uniforme, internat, entraînement militaire et cohésion de promotion, jusqu'à son entrée à l'École navale.",
  },
  {
    lane: "defense",
    etape: "Saint-Cyr",
    titre: "Au cœur de l’ESM Saint-Cyr-Coëtquidan : dans l’école des officiers",
    media: "L'Etudiant",
    date: "2016-06",
    format: "article",
    url: "https://www.letudiant.fr/etudes/ecoles-specialisees/au-coeur-de-l-esm-saint-cyr-coetquidan-dans-l-ecole-des-officiers.html",
    resume:
      "Des élèves officiers de Saint-Cyr décrivent leurs journées : lever à 6 heures, sport, tir et marches, cours de stratégie et de langues, traditions transmises par les anciens.",
  },
  {
    lane: "defense",
    etape: "École de l'air et de l'espace",
    titre:
      "Louis, élève-officier de l'Ecole de l'air : « J'ai découvert une famille qui m'a accueilli à bras ouverts »",
    media: "L'Etudiant",
    date: "2020-07",
    format: "article",
    url: "https://www.letudiant.fr/etudes/ecole-ingenieur/louis-eleve-officier-de-l-ecole-de-l-air-j-ai-decouvert-une-famille-qui-m-a-accueilli-a-bras-ouverts.html",
    resume:
      "Un élève-officier venu de prépa PC décrit sa formation d'ingénieur à Salon-de-Provence : sciences, instruction militaire, cours de commandement, brevet de planeur et forte cohésion de promotion.",
  },
  {
    lane: "sciences",
    etape: "Prépa MPSI",
    titre:
      "Ma vie en classe préparatoire scientifique : « J'ai eu la chance d'avoir des professeurs très bienveillants »",
    media: "L'Etudiant",
    date: "2020-01",
    format: "article",
    url: "https://www.letudiant.fr/etudes/classes-prepa/ma-vie-en-classe-preparatoire-scientifique-j-ai-eu-la-chance-d-avoir-des-professeurs-tres-bienveillants.html",
    resume:
      "Une ancienne élève de MPSI à Orsay raconte le changement de rythme après le lycée, ses deux colles par semaine, une classe soudée et son parcours jusqu'à CentraleSupélec.",
  },
  {
    lane: "sciences",
    etape: "Prépa PT",
    titre: "Tahmid, étudiant en prépa scientifique : « La prépa, c'est du travail et de la solidarité »",
    media: "L'Etudiant",
    date: "2024-02",
    format: "video",
    url: "https://www.letudiant.fr/etudes/classes-prepa/tahmid-etudiant-en-prepa-scientifique-la-prepa-cest-du-travail-et-de-la-solidarite.html",
    resume:
      "Un élève de deuxième année de prépa PT décrit les colles, le devoir sur table du samedi matin et l'entraide entre camarades, loin de l'image d'une classe réservée aux génies.",
  },
  {
    lane: "sciences",
    etape: "École d'ingénieurs",
    titre: "Ils ont choisi une école d'ingénieurs après le bac, une prépa ou un BTS",
    media: "L'Etudiant",
    date: "2022-10",
    format: "article",
    url: "https://www.letudiant.fr/etudes/ecole-ingenieur/ils-ont-choisi-une-ecole-d-ingenieurs-apres-le-bac-une-prepa-ou-en-bts.html",
    resume:
      "Trois élèves ingénieurs arrivés par trois chemins (prépa MP vers Centrale Lille, Polytech après le bac, BTS puis apprentissage) expliquent leur choix d'école et leur spécialité.",
  },
  {
    lane: "sciences",
    etape: "École d'ingénieurs en alternance",
    titre: "Adrien, étudiant ingénieur : « Les alternants sont des étudiants comme les autres »",
    media: "L'Etudiant",
    date: "2023-02",
    format: "article",
    url: "https://www.letudiant.fr/etudes/ecole-ingenieur/adrien-etudiant-ingenieur-les-alternants-sont-des-etudiants-comme-les-autres.html",
    resume:
      "Arrivé à IMT Mines Albi après un DUT, un élève ingénieur en alternance décrit son rythme de trois semaines à l'école et six en bureau d'études, son salaire et sa vie associative.",
  },
  {
    lane: "u",
    etape: "Licence (L1 psychologie)",
    titre: "Une journée en licence de psycho : « Il y a beaucoup de travail mais je m'y m'attendais », confie Maud",
    media: "L'Etudiant",
    date: "2025-02",
    format: "video",
    url: "https://www.letudiant.fr/etudes/fac/une-journee-en-licence-de-psycho-il-y-a-beaucoup-de-travail-mais-je-my-mattendais-confie-maud.html",
    resume:
      "Une étudiante de licence de psychologie, dans une promotion de 600, montre sa journée : cours en amphi, TD d'anglais, fiches de révision, studio et baby-sitting le soir.",
  },
  {
    lane: "u",
    etape: "Licence, toutes disciplines",
    titre: "Ma 1ʳᵉ année en licence",
    media: "Onisep",
    date: "2025-12",
    format: "article",
    url: "https://www.onisep.fr/formation/apres-le-bac-les-etudes-superieures/ma-1-annee-en/ma-1-annee-en-licence",
    resume:
      "Une trentaine d'étudiants racontent leur première année de licence, du droit à la chimie en passant par l'histoire, la psychologie, les STAPS ou la musicologie.",
  },
  {
    lane: "u",
    etape: "Master en alternance",
    titre: "Master en alternance : « il faut beaucoup de travail et d'organisation »",
    media: "L'Etudiant",
    date: "2022-02",
    format: "article",
    url: "https://www.letudiant.fr/etudes/3es-cycles-et-masters/master-en-alternance-il-faut-beaucoup-de-travail-et-d-organisation.html",
    resume:
      "Une étudiante de master MIASHS à l'université de Montpellier, data scientist en alternance chez un opérateur télécom, détaille son rythme de deux semaines à la fac et deux en entreprise.",
  },
  {
    lane: "u",
    etape: "Doctorat",
    titre:
      'Faire un doctorat : "Dans la recherche, les places sont chères"... Des doctorants racontent leurs premiers pas chez les thésards',
    media: "L'Etudiant",
    date: "2025-02",
    format: "article",
    url: "https://www.letudiant.fr/etudes/3es-cycles-et-masters/des-jeunes-chercheurs-racontent-leurs-premiers-pas-en-doctorat.html",
    resume:
      "Quatre doctorants en arts, sciences sociales, linguistique et sociologie racontent leur entrée en thèse, leur financement, l'organisation de leur semaine et la vie de laboratoire.",
  },
  {
    lane: "postbac",
    etape: "INSA",
    titre: "Elève-ingénieur surinvesti, Eliott jongle entre cours, assos et projets à l'INSA",
    media: "L'Etudiant",
    date: "2026-01",
    format: "article",
    url: "https://www.letudiant.fr/etudes/ecole-ingenieur/eleve-ingenieur-surinvesti-eliott-jongle-entre-cours-assos-et-projets-a-l-insa.html",
    resume:
      "Après la prépa intégrée de l'INSA Hauts-de-France, un étudiant en mécatronique raconte ses projets d'équipe, la junior-entreprise et son rôle d'élu au conseil d'administration.",
  },
  {
    lane: "postbac",
    etape: "Université de technologie (UTC)",
    titre: "Louis, étudiant en école d'ingénieurs post-bac : « Un vrai confort de vie »",
    media: "L'Etudiant",
    date: "2023-10",
    format: "article",
    url: "https://www.letudiant.fr/etudes/ecole-ingenieur/louis-etudiant-en-ecole-dingenieurs-post-bac-un-vrai-confort-de-vie.html",
    resume:
      "Entré à l'UTC de Compiègne après le bac, un étudiant explique comment le tronc commun l'a aidé à choisir le génie des procédés et lui laisse du temps pour présider une association sportive.",
  },
  {
    lane: "postbac",
    etape: "École de commerce post-bac",
    titre: "Écoles de commerce post-bac : pour Valentin, il faut choisir la bonne formation",
    media: "L'Etudiant",
    date: "2021-11",
    format: "video",
    url: "https://www.letudiant.fr/etudes/ecole-de-commerce/ecoles-de-commerce-post-bac-pour-valentin-il-faut-choisir-la-bonne-formation.html",
    resume:
      "Un étudiant venu d'un bac STMG, en première année d'un programme grande école post-bac, explique comment il a comparé les écoles et comment il gagne en autonomie grâce au bureau des élèves.",
  },
  {
    lane: "commerce",
    etape: "Prépa ECG 1re année",
    titre: "Arthur en prépa éco : « On est très bien encadré, ça nous force à travailler »",
    media: "L'Etudiant",
    date: "2024-12",
    format: "video",
    url: "https://www.letudiant.fr/etudes/classes-prepa/arthur-en-prepa-eco-on-est-tres-bien-encadre-ca-nous-force-a-travailler.html",
    resume:
      "Un élève de première année de prépa ECG à Paris parle de son goût pour les maths et la géopolitique, du rythme à apprivoiser et de professeurs attentifs à chaque profil.",
  },
  {
    lane: "commerce",
    etape: "Prépa ECG",
    titre: "Prépa ECG - Témoignage",
    media: "Onisep",
    date: "2025-07",
    format: "article",
    url: "https://www.onisep.fr/formation/apres-le-bac-les-etudes-superieures/ma-1-annee-en/ma-1-annee-en-prepa/prepa-ecg-economique-et-commerciale-generale",
    resume:
      "Une élève du lycée Lakanal fait le bilan de sa première année de prépa ECG : mathématiques, géopolitique, colles chaque semaine et stage humanitaire en entreprise.",
  },
  {
    lane: "commerce",
    etape: "Grande école de commerce, rentrée",
    titre: "Rentrée 2025 : plus de 700 étudiants entament une nouvelle vie à l'Edhec Lille",
    media: "L'Etudiant",
    date: "2025-08",
    format: "article",
    url: "https://www.letudiant.fr/etudes/ecole-de-commerce/rentree-2025-plus-de-700-etudiants-entament-une-nouvelle-vie-a-ledhec-lille.html",
    resume:
      "Des étudiants tout juste sortis de prépa vivent leur semaine d'intégration à l'Edhec : tronc commun, cours au choix, nouvelle ville et 56 associations à découvrir.",
  },
  {
    lane: "commerce",
    etape: "Grande école de commerce, trois voies d'accès",
    titre: "Une école de commerce post-bac, post-prépa ou en admission parallèle, trois étudiants racontent",
    media: "L'Etudiant",
    date: "2022-10",
    format: "article",
    url: "https://www.letudiant.fr/etudes/ecole-de-commerce/une-ecole-de-commerce-post-bac-post-prepa-ou-en-admission-parallele-trois-etudiants-racontent.html",
    resume:
      "Trois étudiants comparent leur entrée en école de commerce : après une prépa ECG à Audencia, par un concours post-bac, ou après un DUT avec une formation en apprentissage.",
  },
  {
    lane: "scpo",
    etape: "IEP (Sciences Po Lille)",
    titre: "Rentrée 2025 : « Être à Sciences po Lille en vrai, c'est assez impressionnant ! »",
    media: "L'Etudiant",
    date: "2025-09",
    format: "article",
    url: "https://www.letudiant.fr/etudes/iep/rentree-2025-etre-a-sciences-po-lille-en-vrai-cest-assez-impressionnant.html",
    resume:
      "Des étudiants de première année venus de toute la France et de l'étranger racontent leurs deux semaines d'intégration à Sciences Po Lille, le rallye dans la ville et leurs attentes.",
  },
  {
    lane: "scpo",
    etape: "Licence de droit",
    titre: "Une journée en licence de droit à ASSAS : « il y a beaucoup de concurrence », admet Mattéo",
    media: "L'Etudiant",
    date: "2025-02",
    format: "video",
    url: "https://www.letudiant.fr/etudes/fac/une-journee-en-licence-de-droit-a-assas-il-y-a-beaucoup-de-concurrence-admet-matteo.html",
    resume:
      "Un étudiant de première année à Paris-Panthéon-Assas montre sa journée : amphi de 300 places, préparation des TD à la bibliothèque avec un camarade et rêve de devenir juge des enfants.",
  },
  {
    lane: "scpo",
    etape: "Concours de la magistrature (ENM)",
    titre: "Qu'apprend-on à l'ENM, « la fabrique des juges » ?",
    media: "L'Etudiant",
    date: "2020-09",
    format: "article",
    url: "https://www.letudiant.fr/etudes/concours-fonction-publique/qu-apprend-on-a-l-enm-la-fabrique-des-juges.html",
    resume:
      "Trois auditeurs de justice racontent leur formation de futurs magistrats à Bordeaux : simulations d'audience, études de vrais dossiers et longs stages en juridiction.",
  },
  {
    lane: "scpo",
    etape: "Concours de l'INSP",
    titre: "Les élèves de l’INSP, le nouvel ENA, ont fait leur rentrée à Strasbourg",
    media: "L'Etudiant",
    date: "2023-01",
    format: "article",
    url: "https://www.letudiant.fr/etudes/concours-fonction-publique/les-eleves-de-l-insp-le-nouvel-ena-ont-fait-leur-rentree-a-strasbourg.html",
    resume:
      "Des élèves de la nouvelle promotion de l'INSP, dont une boursière entrée par la voie Talents, racontent leurs années de préparation au concours et leur rentrée à Strasbourg.",
  },
  {
    lane: "scpo",
    etape: "Sciences Po Paris, premiers cours",
    titre:
      "« C’était le cours que j’attendais avec impatience » : à Sciences po, les étudiants découvrent les sciences politiques",
    media: "L'Etudiant",
    date: "2026-09",
    format: "article",
    url: "https://www.letudiant.fr/etudes/iep/c-etait-le-cours-que-j-attendais-avec-impatience-a-sciences-po-les-etudiants-decouvrent-la-sciences-politiques.html",
    resume:
      "Des étudiants de première année découvrent leur premier cours de science politique, les conférences de méthode en petit groupe et environ 200 pages de lecture par semaine.",
  },
  {
    lane: "lettres",
    etape: "Hypokhâgne, premier mois",
    titre:
      "« La prépa littéraire améliore mon socle de connaissance » : des élèves racontent leur premier mois en hypokhâgne",
    media: "L'Etudiant",
    date: "2025-10",
    format: "article",
    url: "https://www.letudiant.fr/etudes/classes-prepa/la-prepa-litteraire-mapporte-ce-que-je-recherchais-ameliorer-mon-socle-de-connaissances.html",
    resume:
      "Des élèves d'hypokhâgne racontent leur premier mois : prise de notes, philosophie, latin et géographie, première colle préparée en une heure et présentée à l'oral.",
  },
  {
    lane: "lettres",
    etape: "Hypokhâgne et khâgne (prépa A/L)",
    titre: "Anaïs, élève en CPGE littéraire : « Le plus dur, c'est de se projeter » dans l'après prépa",
    media: "L'Etudiant",
    date: "2024-02",
    format: "video",
    url: "https://www.letudiant.fr/etudes/classes-prepa/anais-eleve-en-cpge-litteraire-le-plus-dur-c-est-de-se-projeter-dans-lapres-prepa.html",
    resume:
      "Une khâgneuse du lycée Victor-Duruy raconte l'entraide née dès l'hypokhâgne, des professeurs disponibles, sa passion pour les lettres et son objectif d'entrer dans une ENS.",
  },
  {
    lane: "lettres",
    etape: "Khâgne et concours de l'ENS",
    titre: "La prépa littéraire, « une intensité intellectuelle que je n'avais jamais connue »",
    media: "L'Etudiant",
    date: "2020-01",
    format: "article",
    url: "https://www.letudiant.fr/etudes/classes-prepa/temoignage-la-prepa-litteraire-une-intensite-intellectuelle-que-je-n-avais-jamais-connue.html",
    resume:
      "Une ancienne khâgneuse raconte ses semaines de 30 à 40 heures entre cours, devoirs et lectures, le passage à une pensée personnelle et la préparation du concours de l'ENS.",
  },
  {
    lane: "lettres",
    etape: "Hypokhâgne, premier devoir",
    titre:
      "« C’est une sacrée étape par rapport au lycée » : en prépa littéraire, les étudiants passent leur premier devoir de philosophie",
    media: "L'Etudiant",
    date: "2026-09",
    format: "article",
    url: "https://www.letudiant.fr/etudes/classes-prepa/c-est-une-sacree-etape-par-rapport-au-lycee-en-prepa-litteraire-les-etudiants-passent-leur-premier-devoir-de-philosophie.html",
    resume:
      "Des hypokhâgneux de Melun racontent leur premier devoir de philosophie de quatre heures, un samedi de septembre, et le suivi attentif de professeurs en petits groupes.",
  },
  {
    lane: "monde",
    etape: "Royaume-Uni (Cambridge)",
    titre:
      "« C’était super impressionnant » : trois étudiants français racontent leur rentrée à l'université de Cambridge",
    media: "L'Etudiant",
    date: "2023-10",
    format: "article",
    url: "https://www.letudiant.fr/etudes/international/cetait-super-impressionnant-trois-etudiants-francais-racontent-leur-rentree-a-luniversite-de-cambridge.html",
    resume:
      "Trois étudiants français, en master de mathématiques, en bachelor de photographie et en dessin, vivent leur rentrée à Cambridge parmi des étudiants du monde entier.",
  },
  {
    lane: "monde",
    etape: "Canada (Québec)",
    titre: "Étudier au Canada : « Il y a moins d'heures de cours par semaine mais plus de travail personnel »",
    media: "L'Etudiant",
    date: "2026-07",
    format: "article",
    url: "https://www.letudiant.fr/etudes/etudier-au-canada-il-y-a-moins-d-heures-de-cours-par-semaine-mais-plus-de-travail-personnel.html",
    resume:
      "Une étudiante partie après le bac raconte ses quatre années au Québec, dont trois en génie aérospatial à Polytechnique Montréal : projets concrets comme un robot lunaire, associations, budget et colocation.",
  },
  {
    lane: "monde",
    etape: "États-Unis (Californie)",
    titre:
      '"Ici, les étudiants sont extrêmement inquiets" : en Californie, la parenthèse contrastée de Clara étudiante française',
    media: "L'Etudiant",
    date: "2026-05",
    format: "article",
    url: "https://www.letudiant.fr/etudes/international/on-etait-dans-notre-bulle-la-parenthese-de-clara-etudiante-francaise-immergee-en-californie.html",
    resume:
      "Une étudiante en master de relations internationales décrit son semestre d'échange à l'université de Californie à Santa Barbara : campus au bord de l'océan, cours, sport et budget.",
  },
  {
    lane: "monde",
    etape: "Pays-Bas (stage à Amsterdam)",
    titre: "Etudier aux Pays-Bas : « Je n'aurais jamais pensé faire autant de vélo, y compris sous la pluie »",
    media: "L'Etudiant",
    date: "2020-06",
    format: "article",
    url: "https://www.letudiant.fr/etudes/international/etudier-aux-pays-bas-je-n-aurais-jamais-pense-faire-autant-de-velo-y-compris-sous-la-pluie.html",
    resume:
      "Une étudiante en pharmacie raconte son stage de fin d'études à Amsterdam : recherche de colocation, vie à vélo, budget et astuces pour rencontrer du monde.",
  },
  {
    lane: "monde",
    etape: "Suisse (EPFL)",
    titre: "Faire ses études d’ingénieur en Suisse : l’EPFL, une bonne alternative ?",
    media: "L'Etudiant",
    date: "2014-09",
    format: "article",
    url: "https://www.letudiant.fr/etudes/international/faire-ses-etudes-d-ingenieur-en-Suisse-l-EPFL-une-bonne-alternative.html",
    resume:
      "Trois étudiants français de l'EPFL, dont un en première année juste après le bac, parlent du campus de Lausanne, du niveau exigeant, des projets et du coût de la vie.",
  },
  {
    lane: "arts",
    etape: "Conservatoire national supérieur (CNSMD de Paris)",
    titre: "« Je savais que je voulais en faire mon métier » : Clémence, étudiante au Conservatoire national de Paris",
    media: "L'Etudiant",
    date: "2026-10",
    format: "article",
    url: "https://www.letudiant.fr/etudes/ecole-art/je-savais-que-je-voulais-en-faire-mon-metier-clemence-etudiante-au-conservatoire-national.html",
    resume:
      "Une violoncelliste retrace son parcours, des horaires aménagés au collège jusqu'au master du Conservatoire de Paris, avec une année à Cologne et un travail quotidien intense mais mesuré.",
  },
  {
    lane: "arts",
    etape: "École d'architecture (ENSA)",
    titre: "Paul, étudiant en architecture : « On est des idéalistes »",
    media: "L'Etudiant",
    date: "2022-10",
    format: "article",
    url: "https://www.letudiant.fr/etudes/ecole-art/paul-etudiant-en-architecture-on-est-des-idealistes.html",
    resume:
      "Un étudiant de l'école d'architecture de Montpellier décrit les journées d'atelier, les relevés sur site, les maquettes, les rendus intenses et son envie d'écoconstruction.",
  },
  {
    lane: "arts",
    etape: "Beaux-Arts de Paris",
    titre:
      "« Un horizon pour la suite » : à l'expo Crush, les étudiants des Beaux-Arts dévoilent leurs talents aux pros de l'art contemporain",
    media: "L'Etudiant",
    date: "2025-03",
    format: "article",
    url: "https://www.letudiant.fr/etudes/ecole-art/beaux-arts-les-etudiants-exposent-leurs-oeuvres-devant-les-professionnels.html",
    resume:
      "Des étudiants de quatrième et cinquième année des Beaux-Arts de Paris présentent leurs œuvres aux galeristes et racontent leurs projets d'atelier et d'après-diplôme.",
  },
]);

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** « mars 2024 » */
export function dateRecit(r: Recit): string {
  // La typographie glisse un gluon dans « 2024-03 » : on l'enlève avant de lire la date.
  const [y, m] = r.date.replace(/\u2060/g, "").split("-");
  return m ? `${MOIS[Number(m) - 1]} ${y}` : y;
}

export const formatRecit: Record<Recit["format"], string> = { article: "Article", video: "Vidéo", podcast: "Podcast" };

export function recitsDe(lane: string): Recit[] {
  return recits.filter((r) => r.lane === lane);
}
