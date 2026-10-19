import type { LineId } from "./lines";
import { etTypo as frTypo } from "./typo";

export type Step = { when: string; title: string; detail: string; choice?: boolean; station?: string };

export type Itineraire = {
  line: LineId;
  destination: string;
  featured?: boolean;
  why: string;
  duree: string;
  exigence: number;
  steps: Step[];
  cles: string[];
};

export const itineraires: Itineraire[] = frTypo([
  {
    line: "sciences",
    destination: "Grande école d'ingénieurs : X, ENS, Mines, Centrale",
    featured: true,
    why: "Garder les maths et la physique jusqu'au bac te laisse admissible presque partout : prépas scientifiques, prépas économiques, santé, Sciences Po, universités étrangères. C'est l'itinéraire le plus exigeant et celui qui ouvre le plus de portes.",
    duree: "8 ans, de la 3e au diplôme",
    exigence: 5,
    steps: [
      {
        when: "{B-3}, en 2nde",
        title: "Un lycée général exigeant",
        detail: "Vise un lycée où les maths sont solides et, si possible, qui abrite des prépas.",
        station: "seconde",
      },
      {
        when: "Printemps {B-2}",
        title: "Maths, physique-chimie et une troisième spécialité",
        detail: "La troisième peut être SVT, NSI, sciences de l'ingénieur… ou une matière que tu aimes vraiment.",
        choice: true,
        station: "premiere-terminale",
      },
      {
        when: "{B-1}-{B}, en Terminale",
        title: "Maths et physique-chimie, avec maths expertes",
        detail: "Les prépas lisent tes bulletins de 1re et de Terminale, et la note de l'épreuve anticipée de maths.",
        choice: true,
      },
      {
        when: "Janvier à mars {B}",
        title: "Parcoursup : MPSI, PCSI ou MP2I",
        detail: "Vise quelques prépas très exigeantes, ajoute de bonnes prépas de ta région et une valeur sûre : école d'ingénieurs après le bac ou double licence.",
        choice: true,
        station: "bac",
      },
      {
        when: "{B}-{B+2}",
        title: "Deux ans de prépa scientifique",
        detail: "Des colles chaque semaine et un devoir de quatre heures le samedi : tu apprends à travailler vite et juste.",
        station: "prepa-scientifique",
      },
      {
        when: "Printemps {B+2}",
        title: "Les concours",
        detail: "Banques X-ENS, Mines-Ponts, Centrale-Supélec, CCINP : tu en passes plusieurs, les écrits puis les oraux.",
        choice: true,
        station: "concours-ingenieurs",
      },
      {
        when: "{B+2}-{B+5}",
        title: "Trois ans de grande école",
        detail: "Stages en entreprise ou en laboratoire, semestre à l'étranger, double diplôme possible.",
        station: "ecole-ingenieurs",
      },
      {
        when: "{B+5}, vers 23 ans",
        title: "Ingénieur, chercheur, entrepreneur",
        detail: "Industrie, énergie, défense, numérique, santé, recherche : les débouchés sont immenses.",
        station: "metiers-sciences",
      },
    ],
    cles: [
      "Travailler les maths chaque semaine, même quand tout va bien.",
      "Participer à des concours : Olympiades de mathématiques, Kangourou, Alkindi.",
      "Soigner l'anglais : il compte aux concours et dans tous ces métiers.",
      "Garder la musique : elle structure le travail et distingue un dossier.",
    ],
  },
  {
    line: "commerce",
    destination: "Grande école de commerce : HEC, ESSEC, ESCP",
    why: "La prépa ECG mêle maths, économie ou géopolitique, culture générale et langues. Elle mène aux trois grandes écoles parisiennes et à une trentaine d'autres écoles reconnues.",
    duree: "8 ans, de la 3e au diplôme",
    exigence: 5,
    steps: [
      { when: "{B-3}, en 2nde", title: "Un lycée général exigeant", detail: "Les maths et les langues comptent dès maintenant.", station: "seconde" },
      {
        when: "Printemps {B-2}",
        title: "Maths, SES ou HGGSP, et une troisième spécialité",
        detail: "Les maths sont la clé ; l'économie ou la géopolitique te donnent de l'avance.",
        choice: true,
        station: "premiere-terminale",
      },
      {
        when: "Terminale",
        title: "Garder la spécialité maths",
        detail: "Elle ouvre la voie « maths approfondies », la plus recherchée ; maths expertes est un bonus.",
        choice: true,
      },
      {
        when: "Janvier à mars {B}",
        title: "Parcoursup : prépas ECG",
        detail: "Ajoute Dauphine et quelques bachelors réputés comme solutions solides.",
        choice: true,
        station: "bac",
      },
      { when: "{B}-{B+2}", title: "Deux ans de prépa ECG", detail: "Maths, économie ou géopolitique, culture générale, deux langues.", station: "prepa-ecg" },
      {
        when: "Printemps {B+2}",
        title: "Concours BCE et Ecricome",
        detail: "Écrits communs au printemps, puis oraux dans chaque école.",
        choice: true,
        station: "concours-commerce",
      },
      {
        when: "{B+2}-{B+5}",
        title: "Trois ans de grande école",
        detail: "Stages, année de césure possible, échanges dans le monde entier.",
        station: "ecole-commerce",
      },
      { when: "{B+5}", title: "Dirigeant, financier, consultant, entrepreneur", detail: "Finance, conseil, industrie, création d'entreprise.", station: "metiers-commerce" },
    ],
    cles: [
      "Lire la presse économique et internationale chaque semaine.",
      "Viser un très bon niveau dans deux langues vivantes.",
      "Prendre des responsabilités : associations, projets, sport en équipe, musique.",
    ],
  },
  {
    line: "scpo",
    destination: "Sciences Po, puis le service de l'État",
    why: "Sciences Po et les IEP recrutent dès le bac, pour cinq ans : histoire, droit, économie, science politique, langues. La suite mène aux grands concours de l'État, au barreau, à la diplomatie.",
    duree: "8 ans, puis les concours",
    exigence: 5,
    steps: [
      { when: "{B-3}, en 2nde", title: "Un lycée exigeant, avec une vraie culture de l'écrit", detail: "Dissertations, débats, lectures : tout compte.", station: "seconde" },
      {
        when: "Printemps {B-2}",
        title: "HGGSP, SES et une troisième spécialité",
        detail: "Garde des maths si tu peux : l'économie et les politiques publiques en demandent.",
        choice: true,
        station: "premiere-terminale",
      },
      {
        when: "Terminale",
        title: "Culture générale et actualité",
        detail: "Lis un quotidien, écoute des débats, entraîne-toi à argumenter par écrit.",
      },
      {
        when: "Janvier à mars {B}",
        title: "Parcoursup : Sciences Po, IEP, doubles licences de droit",
        detail: "Les IEP de région passent un concours commun ; Sciences Po Paris a sa propre procédure.",
        choice: true,
        station: "bac",
      },
      {
        when: "{B}-{B+5}",
        title: "Cinq ans à Sciences Po ou dans un IEP",
        detail: "Trois ans de bachelor, dont une année à l'étranger, puis deux ans de master.",
        station: "sciences-po",
      },
      {
        when: "Vers {B+5}",
        title: "Concours : INSP, Quai d'Orsay, magistrature, barreau",
        detail: "Souvent après une année de préparation dédiée.",
        choice: true,
        station: "concours-etat",
      },
      { when: "Ensuite", title: "Haut fonctionnaire, diplomate, avocat, magistrat", detail: "Servir l'État, défendre, juger, négocier.", station: "metiers-scpo" },
    ],
    cles: [
      "L'écrit fait la différence : rédige souvent et fais-toi corriger.",
      "Deux langues vivantes à très bon niveau.",
      "L'engagement compte : associations, délégué, journal du lycée.",
    ],
  },
  {
    line: "sante",
    destination: "Médecin",
    why: "Les études de santé sont longues et très sélectives dès la première année. Elles demandent une énorme régularité de travail, en biologie et en chimie surtout.",
    duree: "9 à 12 ans après le bac",
    exigence: 5,
    steps: [
      { when: "{B-3}, en 2nde", title: "Un lycée solide en sciences", detail: "Biologie, chimie et maths se travaillent dès la 2nde.", station: "seconde" },
      {
        when: "Printemps {B-2}",
        title: "SVT, physique-chimie et maths",
        detail: "Le trio qui prépare le mieux à la première année de santé.",
        choice: true,
        station: "premiere-terminale",
      },
      {
        when: "Terminale",
        title: "SVT et physique-chimie, avec maths complémentaires",
        detail: "Maths et SVT réussissent aussi très bien.",
        choice: true,
      },
      {
        when: "Janvier à mars {B}",
        title: "Parcoursup : la licence santé",
        detail: "Depuis 2027, une licence unique remplace le PASS et la LAS : un seul vœu, avec des sous-vœux par université.",
        choice: true,
        station: "pass-las",
      },
      {
        when: "{B}-{B+1}",
        title: "Une ou deux années de licence santé",
        detail: "Au moins 10 sur 20 dans chaque bloc, puis un classement : tu candidates en médecine après la 1re ou la 2e année.",
        choice: true,
        station: "pass-las",
      },
      { when: "{B+1}-{B+6}", title: "Les études de médecine", detail: "Cours, puis stages à l'hôpital de plus en plus nombreux.", station: "etudes-sante" },
      {
        when: "{B+6}",
        title: "EDN et ECOS, puis l'internat",
        detail: "En 6e année, ton classement décide de ta spécialité et de ta ville d'internat : quatre à six ans de plus.",
        choice: true,
        station: "internat",
      },
      { when: "Vers {B+10}", title: "Médecin", detail: "Généraliste, chirurgien, cardiologue, psychiatre, chercheur…", station: "metiers-sante" },
    ],
    cles: [
      "Une régularité de travail à toute épreuve, dès le lycée.",
      "Du bénévolat auprès de malades ou de personnes âgées.",
      "Une pratique qui te ressource : beaucoup d'étudiants en santé gardent la musique.",
    ],
  },
  {
    line: "lettres",
    destination: "Professeur, chercheur, conservateur : ENS, Chartes",
    why: "La khâgne forme à lire, écrire et penser vite. Elle mène à l'École normale supérieure, à l'École des chartes, et ouvre des dizaines d'écoles par la banque d'épreuves littéraires.",
    duree: "7 à 9 ans",
    exigence: 5,
    steps: [
      { when: "{B-3}, en 2nde", title: "Un lycée qui propose latin et grec", detail: "Les langues anciennes se commencent tôt.", station: "seconde" },
      {
        when: "Printemps {B-2}",
        title: "HLP, latin ou grec, HGGSP ou langues",
        detail: "Choisis les matières qui te font lire et écrire le plus.",
        choice: true,
        station: "premiere-terminale",
      },
      {
        when: "Terminale",
        title: "Deux spécialités littéraires, et le latin en option",
        detail: "Le latin est décisif pour l'École des chartes.",
        choice: true,
      },
      {
        when: "Janvier à mars {B}",
        title: "Parcoursup : hypokhâgnes A/L, B/L ou Chartes",
        detail: "Vise plusieurs grandes khâgnes, et une double licence en solution solide.",
        choice: true,
        station: "bac",
      },
      { when: "{B}-{B+2}", title: "Hypokhâgne et khâgne", detail: "Lettres, philosophie, histoire, langues : deux années d'une richesse unique.", station: "khagne" },
      {
        when: "Printemps {B+2}",
        title: "Concours ENS, Chartes et BEL",
        detail: "Une seule série d'écrits ouvre de nombreuses écoles.",
        choice: true,
        station: "concours-lettres",
      },
      { when: "{B+2}-{B+6}", title: "ENS, École des chartes ou master", detail: "Recherche, agrégation, patrimoine.", station: "ens-chartes" },
      { when: "Ensuite", title: "Professeur, chercheur, conservateur, journaliste", detail: "Enseigner, chercher, transmettre, écrire.", station: "metiers-lettres" },
    ],
    cles: ["Lire chaque jour : romans, essais, histoire.", "Garder le latin jusqu'au bac.", "Écrire souvent : dissertations, commentaires, journal."],
  },
  {
    line: "defense",
    destination: "Officier : Saint-Cyr, École navale, École de l'air et de l'espace",
    why: "Les écoles d'officiers recrutent après une prépa scientifique, économique ou littéraire. Leurs élèves sont rémunérés pendant leur formation et s'engagent à servir.",
    duree: "8 ans, de la 3e au premier commandement",
    exigence: 4,
    steps: [
      {
        when: "Janvier {B-3}",
        title: "Candidater à un lycée de la Défense",
        detail: "Si tu y as accès ; un lycée général exigeant convient aussi très bien.",
        choice: true,
        station: "lycee-defense",
      },
      {
        when: "Printemps {B-2}",
        title: "Les spécialités de la prépa visée",
        detail: "Maths et physique-chimie pour la voie scientifique ; maths et SES ou HGGSP pour la voie économique ; lettres pour la voie littéraire.",
        choice: true,
        station: "premiere-terminale",
      },
      {
        when: "Janvier à mars {B}",
        title: "Parcoursup : une prépa, idéalement dans un lycée de la Défense",
        detail: "Leurs prépas préparent spécifiquement aux concours d'officier.",
        choice: true,
        station: "bac",
      },
      { when: "{B}-{B+2}", title: "Deux ans de prépa", detail: "Le programme de la prépa, plus le sport et la préparation militaire.", station: "prepa-officiers" },
      {
        when: "Printemps {B+2}",
        title: "Concours d'officier",
        detail: "Écrits, oraux et épreuves sportives, après une visite médicale.",
        choice: true,
        station: "concours-officiers",
      },
      { when: "{B+2}-{B+5}", title: "École d'officiers", detail: "Formation académique, militaire et humaine.", station: "ecole-officiers" },
      { when: "{B+5}", title: "Lieutenant", detail: "Ton premier commandement, à la tête d'une section ou d'une équipe.", station: "metiers-defense" },
    ],
    cles: [
      "Du sport chaque semaine : les épreuves physiques comptent.",
      "Le goût du collectif et du service : sport en équipe, scoutisme, bénévolat, musique.",
      "Une préparation militaire, possible dès 16 ans, pour découvrir.",
    ],
  },
  {
    line: "arts",
    destination: "Musicien professionnel : CNSMD de Paris ou de Lyon",
    why: "Le conservatoire supérieur recrute sur concours, au niveau d'un interprète. On y arrive en général après plusieurs années de conservatoire menées en même temps que le lycée.",
    duree: "5 ans au conservatoire supérieur",
    exigence: 5,
    steps: [
      { when: "Dès maintenant", title: "Une pratique intense", detail: "Chant, instrument, formation musicale : le niveau se construit pendant le lycée." },
      {
        when: "{B-3}-{B}",
        title: "Lycée et conservatoire en parallèle",
        detail: "Horaires aménagés, bac S2TMD, ou voie générale avec la spécialité musique.",
        choice: true,
        station: "conservatoire",
      },
      { when: "Terminale", title: "Le cycle qui prépare aux concours", detail: "Au conservatoire, le cycle préparatoire mène au niveau des écoles supérieures." },
      { when: "Après le bac", title: "Pôle supérieur, université ou préparation", detail: "Musicologie ou pôle supérieur selon ton projet.", station: "pole-superieur" },
      {
        when: "Selon ton niveau",
        title: "Concours du CNSMD",
        detail: "Une audition devant jury, avec des limites d'âge selon les disciplines.",
        choice: true,
        station: "concours-cnsmd",
      },
      { when: "5 ans", title: "Licence puis master d'interprète", detail: "Cours individuels, orchestre ou chœur, concerts.", station: "cnsmd" },
      { when: "Ensuite", title: "Musicien, chef de chœur, professeur", detail: "Interprète, enseignant en conservatoire, direction de chœur.", station: "metiers-arts" },
    ],
    cles: [
      "Travailler ta voix ou ton instrument chaque jour.",
      "Chanter en public : concerts, offices, concours.",
      "Garder des études générales solides : un double cursus reste possible.",
    ],
  },
  {
    line: "monde",
    destination: "Une grande université étrangère : Oxford, Cambridge, EPFL",
    why: "Avec un excellent bac français, on peut viser les meilleures universités d'Europe. Leur calendrier est plus précoce que Parcoursup : tout se prépare dès la 1re.",
    duree: "7 à 8 ans, de la 3e au master",
    exigence: 5,
    steps: [
      {
        when: "{B-3}-{B-1}",
        title: "Un très bon niveau d'anglais",
        detail: "Lis et écoute en anglais ; vise une certification reconnue en Terminale.",
      },
      {
        when: "Printemps {B-2}",
        title: "Des spécialités alignées sur la discipline visée",
        detail: "Maths et physique pour les sciences, maths pour l'économie, histoire et langues pour les humanités.",
        choice: true,
        station: "premiere-terminale",
      },
      { when: "Été {B-1}", title: "Préparer le dossier", detail: "Lettre de motivation, tests d'admission, lettres de recommandation." },
      {
        when: "15 octobre {B-1}",
        title: "Candidature à Oxford ou Cambridge",
        detail: "Sur la plateforme UCAS, avec des tests d'admission à la même période ; les universités américaines suivent en novembre ou en janvier.",
        choice: true,
      },
      { when: "{B}-{B+3}", title: "Bachelor à l'étranger", detail: "Trois ou quatre ans, en anglais, en français ou en allemand. L'EPFL demande au moins 16 sur 20 en maths, en physique et de moyenne.", station: "bachelor-etranger" },
      { when: "{B+3}-{B+5}", title: "Master, en France ou ailleurs", detail: "Tu peux revenir en France pour ton master.", station: "master-etranger" },
      { when: "Ensuite", title: "Recherche, organisations internationales, entreprises", detail: "Une carrière ouverte sur le monde.", station: "metiers-monde" },
    ],
    cles: [
      "Lire et écrire en anglais chaque semaine.",
      "Garder un dossier excellent dans toutes les matières.",
      "Regarder tôt les frais : de 1 200 € par an à Louvain à plus de 60 000 £ à Oxford.",
    ],
  },
]);
