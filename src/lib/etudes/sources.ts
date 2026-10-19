import { etTypo } from "./typo";

/** Sources consultées en octobre 2026, citées en pied de page, par thème. */
export type SourceGroup = {
  title: string;
  items: { title: string; url: string }[];
};

const raw: SourceGroup[] = [
  {
    title: "Lycée et bac",
    items: [
      {
        title: "Éducation nationale : l'épreuve anticipée de mathématiques en 1re",
        url: "https://www.education.gouv.fr/reussir-au-lycee/epreuve-anticipee-de-mathematiques-en-classe-de-premiere-450607",
      },
      {
        title: "Éducation nationale : le baccalauréat général",
        url: "https://www.education.gouv.fr/reussir-au-lycee/le-baccalaureat-general-10457",
      },
      {
        title: "Éducation nationale : le stage de seconde",
        url: "https://www.education.gouv.fr/reussir-au-lycee/un-stage-en-juin-pour-les-eleves-de-seconde-generale-et-technologique-461817",
      },
      {
        title: "Académie de Paris : entrer au lycée public depuis le hors contrat",
        url: "https://www.ac-paris.fr/lycees-eleves-issus-des-etablissements-prives-hors-contrat-122713",
      },
      {
        title: "Assemblée nationale : le bac des élèves du hors contrat",
        url: "https://questions.assemblee-nationale.fr/q15/15-15450QE.htm",
      },
      {
        title: "Brut : le brevet ne conditionne pas l'entrée en seconde (2025)",
        url: "https://www.brut.media/fr/articles/college-le-brevet-ne-sera-finalement-pas-obligatoire-pour-entrer-en-seconde",
      },
      {
        title: "Armée de Terre : admission dans les lycées de la Défense",
        url: "https://prod-portail-terre.cnmosis.dirisi.defense.gouv.fr/sites/default/files/lyceedefenseterre/Circulaire%20relative%20%C3%A0%20l%27admission%20dans%20les%20classes%20de%20lyc%C3%A9es%20de%20l%27enseignement%20du%20second%20degr%C3%A9.pdf",
      },
      {
        title: "Armée de Terre : les prépas des lycées de la Défense (2026-2027)",
        url: "https://www.terre.defense.gouv.fr/sites/default/files/lyceedefenseterre/Circulaire%20relative%20%C3%A0%20l%27admission%20en%20CPES%20et%20en%20CPGE.pdf",
      },
      {
        title: "CIDJ : le calendrier Parcoursup 2026",
        url: "https://www.cidj.com/s-orienter/avec-parcoursup/parcoursup-ouverture-le-20-decembre",
      },
      {
        title: "Parcoursup : comment les formations examinent les candidatures",
        url: "https://www.parcoursup.gouv.fr/candidater-sur-parcoursup/comment-les-formations-examinent-les-candidatures-1357",
      },
      {
        title: "Onisep : le bac S2TMD (musique)",
        url: "https://www.onisep.fr/ressources/univers-formation/formations/lycees/bac-techno-s2tmd-sciences-et-techniques-du-theatre-de-la-musique-et-de-la-danse-enseignement-specifique-musique",
      },
    ],
  },
  {
    title: "Prépas et ingénieurs",
    items: [
      {
        title: "L'Étudiant : palmarès 2026 des prépas scientifiques",
        url: "https://www.letudiant.fr/palmares/classement-prepa.html",
      },
      {
        title: "Thotis : la MPSI d'Henri-IV sur Parcoursup",
        url: "https://thotismedia.com/quelle-moyenne-pour-integrer-la-prepa-mpsi-au-lycee-henri-iv-via-parcoursup-en-2026/",
      },
      {
        title: "École polytechnique : admission au cycle ingénieur",
        url: "https://www.polytechnique.edu/admission-cycle-ingenieur/",
      },
      {
        title: "École polytechnique : enquête premier emploi (2025)",
        url: "https://www.polytechnique.edu/sites/default/files/content/communiques/fichiers/2025-11/20251127_CP_Enquete_PremierEmploi.pdf",
      },
      {
        title: "ENS Paris-Saclay : statut et rémunération des normaliens",
        url: "https://ens-paris-saclay.fr/sites/default/files/Inscriptions/2024_2025_Note_normaliens%C3%A9l%C3%A8ves_concours.pdf",
      },
      {
        title: "Conférence des grandes écoles : enquête insertion 2026",
        url: "https://www.cge.asso.fr/wp-content/uploads/2026/06/CGE-Enquete-Insertion-2026-Rapport-VF.pdf",
      },
      {
        title: "L'Étudiant : la voie BCPST et le concours Agro-Véto",
        url: "https://www.letudiant.fr/etudes/ecole-ingenieur/ecoles-dingenieurs-la-voie-cpge-bcpst-du-concours-agro-veto-mode-demploi.html",
      },
      {
        title: "L'Étudiant : les places en écoles vétérinaires",
        url: "https://www.letudiant.fr/etudes/ecole-ingenieur/former-plus-de-veterinaires-un-objectif-atteint-mais-des-defis-encore-a-relever.html",
      },
      {
        title: "Thotis : intégrer l'INSA Lyon via Parcoursup",
        url: "https://thotismedia.com/quelle-moyenne-pour-integrer-linsa-lyon-via-parcoursup-en-2026/",
      },
    ],
  },
  {
    title: "Commerce, Sciences Po, droit, universités",
    items: [
      {
        title: "Ministère de l'Enseignement supérieur : places aux concours 2026 des écoles",
        url: "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2026-02/nombre-de-places-aux-concours-2026-offertes-par-les-tablissements-d-enseignement-sup-rieures-techniques-priv-es-et-consulaires-2026--39467.pdf",
      },
      {
        title: "HEC Paris : frais et financement",
        url: "https://www.hec.edu/fr/grande-ecole-master-management/frais-et-financement",
      },
      {
        title: "L'Étudiant : l'admission à Sciences Po Paris à partir de 2027",
        url: "https://www.letudiant.fr/etudes/iep/concours-sciences-po-2027-les-notes-du-controle-continu-ne-seront-plus-prises-en-compte.html",
      },
      {
        title: "Onisep : le bachelor de Sciences Po",
        url: "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/paris/sciences-po-campus-de-paris/bachelor-de-sciences-po",
      },
      {
        title: "CIDJ : Sciences Po et les IEP",
        url: "https://www.cidj.com/node/24188",
      },
      {
        title: "L'Express Éducation : collèges de droit d'Assas et de la Sorbonne",
        url: "https://lexpress-education.com/articles/droit-college-ou-ecole-assas-sorbonne/",
      },
      {
        title: "Université Paris Dauphine-PSL : droits et tarifs",
        url: "https://dauphine.psl.eu/formations/scolarite/droits-et-tarifs",
      },
      {
        title: "Université PSL : le CPES avec Henri-IV",
        url: "https://psl.eu/formation/cpes-psl-henri-IV",
      },
      {
        title: "Ministère de l'Enseignement supérieur : classement de Shanghai 2026",
        url: "https://www.enseignementsup-recherche.gouv.fr/fr/classement-de-shanghai-2026-avec-27-etablissements-classes-la-france-integre-le-top-10-mondial-103858",
      },
      {
        title: "Service-public.fr : droits d'inscription à l'université",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865?lang=fr",
      },
    ],
  },
  {
    title: "Santé",
    items: [
      {
        title: "Ministère de l'Enseignement supérieur : la réforme de l'accès aux études de santé (avril 2026)",
        url: "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2026-04/dp---la-r-forme-de-la-premi-re-ann-e-vers-une-simplification-de-l-acc-s-aux-tudes-de-sant--40000.pdf",
      },
      {
        title: "Onisep : les études de médecine",
        url: "https://www.onisep.fr/formation/les-principaux-domaines-de-formation/les-etudes-de-sante/les-etudes-de-medecine",
      },
      {
        title: "Ministère des Armées : l'École de santé des armées",
        url: "https://www.defense.gouv.fr/sites/default/files/sante/plaquette%20esa_2025.pdf",
      },
    ],
  },
  {
    title: "Défense, lettres, arts",
    items: [
      {
        title: "Armée de Terre : concours de Saint-Cyr 2026",
        url: "https://www.terre.defense.gouv.fr/sites/default/files/amscc/20251217_NP_DRHAT-PRECJ-BC-RDT-CIRCULAIRE-RELATIVE-AUX-CONCOURS-D-ADMISSION-A-LECOLE-SPECIALE-MILITAIRE-DE-SAINT-CYR-EN-2026.pdf",
      },
      {
        title: "Onisep : le diplôme d'ingénieur de l'École navale",
        url: "https://www.onisep.fr/ressources/structures-enseignement/bretagne/finistere/ecole-navale/diplome-d-ingenieur-de-l-ecole-navale",
      },
      {
        title: "Onisep : le diplôme d'ingénieur de l'École de l'air et de l'espace",
        url: "https://www.onisep.fr/ressources/structures-enseignement/provence-alpes-cote-d-azur/bouches-du-rhone/ecole-de-l-air-et-de-l-espace/diplome-d-ingenieur-de-l-ecole-de-l-air-et-de-l-espace",
      },
      {
        title: "Banque d'épreuves littéraires (BEL)",
        url: "https://www.concours-bel.fr",
      },
      {
        title: "Bulletin officiel : places au concours de l'École des chartes 2026",
        url: "https://www.enseignementsup-recherche.gouv.fr/fr/bo/2026/Hebdo5/ESRS2600513A",
      },
      {
        title: "L'Express Éducation : le concours du Conservatoire de Paris",
        url: "https://lexpress-education.com/articles/concours-conservatoire-paris-cnsmdp/",
      },
      {
        title: "CNSMD de Lyon : les études de premier cycle",
        url: "https://cnsmd-lyon.fr/en-2/undergraduate",
      },
      {
        title: "Ministère de la Culture : les études d'architecte",
        url: "https://www.culture.gouv.fr/Sites-thematiques/Architecture/Formations-recherche-et-metiers/Les-formations-d-architecte-et-de-paysagiste/Les-cursus-et-les-diplomes",
      },
      {
        title: "L'Express Éducation : intégrer les Beaux-Arts de Paris",
        url: "https://lexpress-education.com/articles/integrer-beaux-arts/",
      },
    ],
  },
  {
    title: "Étranger",
    items: [
      {
        title: "UCAS : date limite pour Oxford, Cambridge et la médecine",
        url: "https://www.ucas.com/events/2027-entry-deadline-for-the-universities-of-oxford-and-cambridge-and-most-courses-in-medicine-475536",
      },
      {
        title: "University of Oxford : diplômes étrangers acceptés",
        url: "https://www.ox.ac.uk/admissions/undergraduate/applying-to-oxford/for-international-students/international-qualifications",
      },
      {
        title: "University of Oxford : frais de scolarité",
        url: "https://ox.ac.uk/admissions/undergraduate/fees-and-funding/course-fees",
      },
      {
        title: "University of Cambridge : frais pour les étudiants internationaux",
        url: "https://www.undergraduate.study.cam.ac.uk/international-students/international-fees-and-costs",
      },
      {
        title: "EPFL : critères d'admission en bachelor",
        url: "https://www.epfl.ch/education/admission/admission-2/bachelor-admission-criteria-and-application",
      },
      {
        title: "Harvard College : coût des études et aides",
        url: "https://college.harvard.edu/financial-aid/how-aid-works/cost-attendance",
      },
    ],
  },
  {
    title: "Coûts et aides",
    items: [
      {
        title: "Service-public.fr : le coût d'une inscription dans le supérieur (2026-2027)",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
      },
      {
        title: "Service-public.fr : la bourse sur critères sociaux",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F12214",
      },
      {
        title: "Bulletin officiel : les règles d'attribution des bourses 2026-2027",
        url: "https://www.enseignementsup-recherche.gouv.fr/fr/bo/2026/Hebdo9/ESRS2604201C",
      },
      {
        title: "Service-public.fr : le simulateur de bourse",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/R18296",
      },
      {
        title: "Service-public.fr : le contrat d'apprentissage et son salaire",
        url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2918",
      },
      {
        title: "UNEF : le classement des villes universitaires 2026",
        url: "https://unef.fr/wp-content/uploads/2026/08/UNEF-Classement-des-villes-universitaires-2026.pdf",
      },
      {
        title: "UNEF : l'enquête sur le coût de la vie étudiante 2026",
        url: "https://unef.fr/wp-content/uploads/2026/08/Enquete-UNEF-2026-VF.pdf",
      },
      {
        title: "Parcoursup : l'aide à la mobilité",
        url: "https://parcoursup.gouv.fr/preparer-sa-vie-etudiante/l-aide-la-mobilite-parcoursup-1667",
      },
    ],
  },
  {
    title: "Passerelles",
    items: [
      {
        title: "Bulletin officiel : les crédits européens des classes prépas",
        url: "https://www.education.gouv.fr/bo/2008/28/ESRS0800190C.htm",
      },
      {
        title: "Aix-Marseille Université : la convention type avec les prépas",
        url: "https://daji.univ-amu.fr/sites/daji.univ-amu.fr/files/ca_deliberations/delib3_conventdegcadrecpge.pdf",
      },
      {
        title: "Parcoursup : la réorientation des étudiants",
        url: "https://www.parcoursup.gouv.fr/decouvrir-parcoursup/qui-est-concerne-par-parcoursup-1062",
      },
      {
        title: "Ministère de l'Enseignement supérieur : d'où viennent les élèves ingénieurs (2026)",
        url: "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2026-06/nf-sies-2026-14-40461.pdf",
      },
      {
        title: "GEI-UNIV : quinze grandes écoles ouvertes aux étudiants de licence",
        url: "https://www.geiuniv.com/",
      },
      {
        title: "École polytechnique : la voie universitaire 2026",
        url: "https://www.polytechnique.edu/admission-cycle-ingenieur/sites/admission/files/content/2026%20FUF%20NOTICE%20CANDIDATS_FINAL.pdf",
      },
      {
        title: "HEC Paris : les admissions en master",
        url: "https://www.hec.edu/fr/grande-ecole-master-management/admissions",
      },
      {
        title: "ESSEC : l'admission sur titre",
        url: "https://www.essec.edu/fr/programme/grande-ecole/grande-ecole-admis-sur-titre-francais/admission/",
      },
      {
        title: "Concours Passerelle : le règlement 2026",
        url: "https://grande-ecole.passerelle-esc.com/wp-content/uploads/2025/12/9fb48cab-dde7-421d-bbc6-17ae9e2fe452-2026reglementConcoursPasserelleP1P2B3.pdf",
      },
      {
        title: "Ecricome : le concours Tremplin",
        url: "https://www.ecricome.org/concours-ecole-de-commerce-bac-2-tremplin-bac-2/",
      },
      {
        title: "L'Étudiant : trois IEP quittent la BEL",
        url: "https://www.letudiant.fr/etudes/classes-prepa/on-aurait-aime-le-savoir-plus-tot-les-iep-de-lille-lyon-et-aix-sortent-de-la-banque-d-epreuves-litteraires.html",
      },
      {
        title: "Sciences Po : les admissions en un coup d'œil",
        url: "https://www.sciencespo.fr/admissions-bourses/en-un-coup-d%C5%93il-admissions",
      },
      {
        title: "Sciences Po Lille : l'admission en master 2026",
        url: "https://www.sciencespo-lille.eu/sites/default/files/procedures_admission/rglt_cycle_master_2026.pdf",
      },
      {
        title: "ENS-PSL : devenir normalien étudiant",
        url: "https://www.ens.psl.eu/en/node/861",
      },
      {
        title: "Armées : le concours sur titres de Saint-Cyr",
        url: "https://www.sengager.fr/assets/MAJ_Guide_a_l_usage_des_candidats_OST_47ccddeaef.pdf",
      },
      {
        title: "École de l'air et de l'espace : le concours sur titres 2026",
        url: "https://www.ecole-air-espace.fr/wp-content/uploads/2025/10/20251002_NP_DRHAAE_SDEF_BAF_DESC__notice_ce_eae_titres_2026.pdf",
      },
      {
        title: "Université Paris Cité : les passerelles vers les études de santé",
        url: "https://u-paris.fr/sante/procedure-passerelles-acces-direct-en-2e-et-3e-annee-des-etudes-de-sante/",
      },
      {
        title: "CIDJ : les passerelles vers les études de santé",
        url: "https://www.cidj.com/s-orienter/apres-le-bac/passerelles-vers-les-etudes-de-sante-etre-admis-directement-en-2e-ou-3e-annee",
      },
      {
        title: "Service-public.fr : la licence santé unique",
        url: "https://www.service-public.gouv.fr/particuliers/actualites/A18890",
      },
      {
        title: "L'Étudiant : la future première année de santé",
        url: "https://www.letudiant.fr/etudes/medecine-sante/reforme-pass-las-ce-que-l-on-sait-de-la-future-premiere-annee-en-etudes-de-sante.html",
      },
    ],
  },
  {
    title: "Doubles cursus",
    items: [
      {
        title: "Thotis : l'annuaire des doubles licences sur Parcoursup",
        url: "https://thotismedia.com/annuaire-parcoursup-liste-des-doubles-licences-et-doubles-diplomes/",
      },
      {
        title: "Sorbonne Université : la double licence maths-physique",
        url: "https://sciences.sorbonne-universite.fr/en/node/3647",
      },
      {
        title: "Université PSL : les places du CPES en 2026-2027",
        url: "https://static.psl.eu/sites/default/files/2026-02/82-2025_-_modalites_dadmission_et_capacites_2026-2027_-_niveau_licence.pdf",
      },
      {
        title: "Sciences Po : les doubles diplômes du bachelor",
        url: "https://www.sciencespo.fr/college/fr/formations/doubles-diplomes-bachelor.html",
      },
      {
        title: "Columbia University : le double bachelor avec Sciences Po",
        url: "https://sciencespo.gs.columbia.edu/content/sciences-po-0",
      },
      {
        title: "ESCP et Sciences Po : le nouveau double bachelor",
        url: "https://escp.eu/sites/default/files/2026-07/ESCP_and_Sciences_Po_announce_new_dual_degree_09072026.pdf",
      },
      {
        title: "HEC Paris : les doubles diplômes avec les écoles d'ingénieurs",
        url: "https://www.hec.edu/fr/doubles-diplomes-en-admission-directe",
      },
      {
        title: "ESSEC : le double diplôme avec CentraleSupélec",
        url: "https://essec.edu/fr/pages/centrale-supelec",
      },
      {
        title: "Mines Paris : les doubles diplômes en France",
        url: "https://www.minesparis.psl.eu/en/education/civil-engineering-cycle/double-degrees-in-france-2/",
      },
      {
        title: "Onisep : le double cursus architecte-ingénieur",
        url: "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/double-cursus-architecte-ingenieur",
      },
      {
        title: "Fondation Bettencourt Schueller : l'École de l'Inserm",
        url: "https://www.fondationbs.org/sites/default/files/2026-02/cp_fbs_edilb_ecole_de_fevrier_vdef.pdf",
      },
      {
        title: "Mines Saint-Étienne : le parcours médecin-ingénieur",
        url: "https://www.mines-stetienne.fr/plaquette-medecin-ingenieur",
      },
      {
        title: "Sorbonne Université : la musicologie avec le CNSMD de Paris",
        url: "https://fc.sorbonne-universite.fr/nos-offres/licence-musicologie-parcours-conservatoire-national-superieur-de-musique-de-paris-cnsmdp/",
      },
      {
        title: "Sorbonne Université : le parcours avec le Pôle supérieur Paris Boulogne-Billancourt",
        url: "https://formations-lettres.sorbonne-universite.fr/plugins/odf-web/www/_content/program-lmusi1l-602-2/main/LICENCE%20Musicologie%20_%20Musique%20et%20interpr%C3%A9tation%20_%20parcours%20PSPBB.pdf",
      },
      {
        title: "Sorbonne Université : la double licence sciences et musicologie",
        url: "https://sciences.sorbonne-universite.fr/formation-sciences/offre-de-formation/licences/licence-carte/double-cursus-licences-schumaines/scmusicologie",
      },
      {
        title: "Sorbonne Université : le statut d'artiste de haut niveau",
        url: "https://sciences.sorbonne-universite.fr/vie-de-campus-sciences/art-culture/artistes-de-haut-niveau",
      },
      {
        title: "Assas : le double diplôme avec King's College London",
        url: "https://www.assas-universite.fr/fr/formations/offre-de-formation/master-1-en-droits-francais-anglais-llb-kings-college-london",
      },
      {
        title: "Paris 1 Panthéon-Sorbonne : les doubles diplômes internationaux",
        url: "https://formations.pantheonsorbonne.fr/fr/catalogue-des-formations/formations-internationales-FI/formations-internationales-M9B3886E/doubles-diplomes-avec-mobilite-M9B3G90E.html",
      },
    ],
  },
];

export const sourceGroups: SourceGroup[] = etTypo(raw);

export const sourceCount = sourceGroups.reduce((n, g) => n + g.items.length, 0);
