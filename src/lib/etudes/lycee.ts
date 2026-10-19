import { etTypo as frTypo } from "./typo";

export type LyceeType = {
  id: "public" | "contrat" | "hors" | "defense";
  name: string;
  tagline: string;
  entree: string;
  bac: string;
  cout: string;
  plus: string;
};

export const lyceeTypes: LyceeType[] = frTypo([
  {
    id: "public",
    name: "Public",
    tagline: "Gratuit, ouvert à tous, avec de très grands lycées.",
    entree:
      "Par l'affectation de ton académie (Affelnet), selon tes vœux, ton secteur et tes résultats. Depuis un collège hors contrat : un examen d'entrée organisé par l'académie ; renseigne-toi dès janvier auprès de la direction académique de ton département (DSDEN).",
    bac: "40 % de contrôle continu (moyennes de 1re et de terminale) et 60 % d'épreuves finales.",
    cout: "Gratuit ; l'internat est payant.",
    plus: "Les grands lycées publics abritent souvent des prépas : l'exigence de leurs professeurs donne le ton dès la 2nde.",
  },
  {
    id: "contrat",
    name: "Privé sous contrat",
    tagline: "Mêmes programmes et mêmes examens que le public, avec un projet éducatif propre.",
    entree: "Un dossier et un entretien, propres à chaque lycée ; certains font passer des tests.",
    bac: "40 % de contrôle continu et 60 % d'épreuves finales, comme dans le public.",
    cout: "Une contribution des familles, variable selon les lycées.",
    plus: "Beaucoup ont un internat et une vie musicale ou associative riche : demande-le en visite.",
  },
  {
    id: "hors",
    name: "Privé hors contrat",
    tagline: "Un cadre et une pédagogie choisis librement, sans contrat avec l'État.",
    entree: "Un dossier et un entretien, propres à chaque établissement ; si ton collège est hors contrat, tu peux souvent y rester jusqu'au bac.",
    bac: "Tout se joue en examens : des épreuves ponctuelles remplacent le contrôle continu (en fin de 1re et au 2e trimestre de terminale), en plus des épreuves finales.",
    cout: "Les frais de scolarité de l'établissement.",
    plus: "Les repères nationaux pèsent lourd : l'épreuve anticipée de maths et le bac de français, notés partout de la même façon. Sciences Po Paris les compte même dans sa note d'admission depuis 2027.",
  },
  {
    id: "defense",
    name: "Lycée de la Défense",
    tagline: "Des lycées publics du ministère des Armées, en internat : le Prytanée, Saint-Cyr-l'École, Aix, Autun.",
    entree:
      "Un dossier en janvier-février de la 3e, jugé sur tes notes de français, maths et anglais (fin de 4e et 1er trimestre de 3e). Priorité aux enfants de militaires, y compris de réservistes opérationnels comptant dix ans de réserve, puis aux enfants d'agents du ministère des Armées et de fonctionnaires, puis aux élèves boursiers.",
    bac: "Comme dans le public : 40 % de contrôle continu et 60 % d'épreuves finales.",
    cout: "Environ 2 600 € par an de pension et de trousseau en 2024-2025, avec des remises selon les revenus.",
    plus: "Le Prytanée, à La Flèche, abrite ses propres prépas : MPSI, PCSI, MP*, MP, PC, PSI, ECG et lettres.",
  },
]);

export const questionsVisite = frTypo([
  {
    id: "options",
    q: "Quelles spécialités et quelles options proposez-vous ?",
    why: "Vérifie maths expertes, latin ou grec, musique, sections européennes.",
  },
  {
    id: "resultats",
    q: "Quels sont vos résultats et votre valeur ajoutée ?",
    why: "Les indicateurs de valeur ajoutée des lycées (IVAL), publiés par le ministère, comparent les résultats au niveau des élèves accueillis.",
  },
  {
    id: "apres",
    q: "Où vont vos élèves après le bac ?",
    why: "Demande la part d'admis en prépa, à Sciences Po, en santé, à l'étranger.",
  },
  {
    id: "prepas",
    q: "Le lycée a-t-il des classes prépas ?",
    why: "Elles tirent tout le lycée vers le haut et rapprochent des professeurs de prépa.",
  },
  {
    id: "internat",
    q: "Comment s'organisent l'internat et le travail du soir ?",
    why: "Études surveillées, encadrement, temps laissé à la musique et au sport.",
  },
  {
    id: "hors-contrat",
    q: "Comment accueillez-vous les élèves venant d'un autre collège, public, privé ou hors contrat ?",
    why: "Certains lycées privés recrutent d'abord dans le public ou le privé sous contrat : pose la question dès le premier contact.",
  },
  {
    id: "musique",
    q: "Quelle place pour la musique et l'engagement ?",
    why: "Sport, musique, théâtre, engagement associatif : ce qui te fait grandir compte aussi dans un dossier.",
  },
]);

export const calendrier3e = frTypo([
  {
    when: "Dès septembre 2026",
    what: "Plusieurs lycées privés ouvrent déjà leurs inscriptions pour 2027 ; à Paris, certains traitent les dossiers par ordre d'arrivée. Renseigne-toi tôt.",
  },
  { when: "Novembre à janvier", what: "Repère les lycées qui t'intéressent et leurs journées portes ouvertes." },
  {
    when: "Mi-janvier à début avril 2027",
    what: "Henri-IV et Louis-le-Grand : dossier national sur la plateforme DAFNE pour les élèves venant d'une autre académie, avec des tests pour ceux qui viennent du hors contrat.",
  },
  {
    when: "Janvier-février 2027",
    what: "Lycées de la Défense : préinscription en ligne (en 2025, elle allait du 7 janvier au 9 février).",
  },
  {
    when: "Février à avril",
    what: "Portes ouvertes, dossiers des lycées privés ; pour un lycée public, inscription à l'examen d'entrée réservé aux élèves venant du hors contrat.",
  },
  { when: "Fin mai", what: "Premières réponses, dont celles des lycées de la Défense." },
  { when: "Juin 2027", what: "Le brevet : tu dois le passer ; le conseil de classe décide de ton passage en 2nde." },
]);
