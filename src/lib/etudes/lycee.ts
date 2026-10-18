import { etTypo as frTypo } from "./typo";

export type LyceeType = { id: string; name: string; tagline: string; rows: { k: string; v: string }[]; plus: string };

export const lyceeTypes: LyceeType[] = frTypo([
  {
    id: "public",
    name: "Lycée public",
    tagline: "Gratuit, ouvert à tous, avec de très grands lycées.",
    rows: [
      {
        k: "Pour y entrer depuis un collège hors contrat",
        v: "Un examen d'entrée organisé par l'académie. Renseigne-toi dès janvier auprès de la direction académique de ton département (DSDEN).",
      },
      { k: "Le bac", v: "40 % de contrôle continu (moyennes de 1re et de Terminale) et 60 % d'épreuves finales." },
      { k: "Coût", v: "Gratuit ; l'internat est payant." },
    ],
    plus: "Les grands lycées publics abritent souvent des prépas : l'exigence de leurs professeurs donne le ton dès la 2nde.",
  },
  {
    id: "contrat",
    name: "Lycée privé sous contrat",
    tagline: "Mêmes programmes et mêmes examens que le public, avec un projet éducatif propre.",
    rows: [
      {
        k: "Pour y entrer depuis un collège hors contrat",
        v: "Un dossier et un entretien, propres à chaque lycée ; certains font passer des tests.",
      },
      { k: "Le bac", v: "40 % de contrôle continu et 60 % d'épreuves finales, comme dans le public." },
      { k: "Coût", v: "Une contribution des familles, variable selon les lycées." },
    ],
    plus: "Beaucoup ont un internat et une vie musicale ou associative riche : demande-le en visite.",
  },
  {
    id: "hors",
    name: "Lycée privé hors contrat",
    tagline: "Un cadre et une pédagogie choisis librement, sans contrat avec l'État.",
    rows: [
      { k: "Pour y entrer", v: "Continuité : tu peux rester dans ton établissement jusqu'au bac." },
      {
        k: "Le bac",
        v: "Tout se joue en examens : des épreuves ponctuelles remplacent le contrôle continu (en fin de 1re et au 2e trimestre de Terminale), en plus des épreuves finales.",
      },
      { k: "Coût", v: "Les frais de scolarité de l'établissement." },
    ],
    plus: "Les repères nationaux pèsent lourd : l'épreuve anticipée de maths et le bac de français, notés partout de la même façon. Sciences Po Paris les compte même dans sa note d'admission depuis 2027.",
  },
  {
    id: "defense",
    name: "Lycée de la Défense",
    tagline: "Des lycées publics du ministère des Armées, en internat : le Prytanée, Saint-Cyr-l'École, Aix, Autun.",
    rows: [
      {
        k: "Pour y entrer",
        v: "Un dossier en janvier-février de la 3e, jugé sur tes notes de français, maths et anglais (fin de 4e et 1er trimestre de 3e).",
      },
      {
        k: "Qui est prioritaire",
        v: "Les enfants de militaires, y compris de réservistes opérationnels comptant dix ans de réserve ; puis les enfants d'agents du ministère des Armées et de fonctionnaires ; puis les élèves boursiers.",
      },
      { k: "Coût", v: "Environ 2 600 € par an de pension et de trousseau en 2024-2025, avec des remises selon les revenus." },
    ],
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
    id: "musique",
    q: "Quelle place pour la musique et l'engagement ?",
    why: "Chœur, orchestre, horaires aménagés, scoutisme : ce qui te fait grandir compte aussi dans un dossier.",
  },
]);

export const calendrier3e = frTypo([
  { when: "Novembre à janvier", what: "Repère les lycées qui t'intéressent et leurs journées portes ouvertes." },
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

export type LyceeExemple = { kind: string; name: string; place: string; tags: string[]; note: string; url?: string };

export const lyceeExemples: LyceeExemple[] = frTypo([
  {
    kind: "Lycée de la Défense, public",
    name: "Prytanée national militaire",
    place: "La Flèche (Sarthe)",
    tags: ["Internat", "Prépas sur place", "Admission sur dossier"],
    note: "Lycée et prépas d'excellence ; l'entrée en 2nde est réservée aux publics prioritaires présentés plus haut.",
  },
  {
    kind: "Lycée public",
    name: "Lycée Marceau",
    place: "Chartres (Eure-et-Loir)",
    tags: ["Internat", "Latin et grec", "Section européenne", "Prépas MPSI, PCSI, MP, PC"],
    note: "Section européenne en anglais ou en allemand, et des prépas scientifiques dans les murs.",
    url: "https://www.onisep.fr/ressources/structures-enseignement/centre-val-de-loire/eure-et-loir/lycee-marceau",
  },
  {
    kind: "Lycée privé sous contrat",
    name: "Lycée privé Notre-Dame",
    place: "Chartres (Eure-et-Loir)",
    tags: ["Latin et grec", "Section européenne anglais"],
    note: "Lycée catholique général et technologique ; l'hébergement organisé par l'établissement accueille des filles.",
    url: "https://www.onisep.fr/ressources/structures-enseignement/centre-val-de-loire/eure-et-loir/lycee-prive-notre-dame",
  },
  {
    kind: "Lycée privé sous contrat",
    name: "Stanislas",
    place: "Paris 6e",
    tags: ["Latin et grec", "Prépas MP, PC, PSI, ECG, B/L", "Internat des prépas"],
    note: "Une référence pour la suite : son internat accueille les élèves de ses classes préparatoires.",
    url: "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/paris/lycee-prive-stanislas",
  },
]);
