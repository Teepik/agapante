/* ================= Analyse approfondie : l'étape entre la présélection et le portefeuille ================= */
const AN_ST = {
  a_analyser:{l:"À analyser", c:"neu", c2:"à analyser"},
  en_cours:{l:"Analyse en cours", c:"warn", c2:"analyse en cours"},
  entrer:{l:"Validée : entrer", c:"good", c2:"validée"},
  attendre:{l:"Validée : attendre un meilleur prix", c:"good", c2:"attendre son prix"},
  ecartee:{l:"Écartée", c:"bad", c2:"écartée"}
};
const AN_ORDRE = ["en_cours", "a_analyser", "attendre", "entrer", "ecartee"];
const AN_FLUX = ["a_analyser", "en_cours", "entrer", "attendre", "ecartee"];
const AN_SECTIONS = [
  {k:"modele", t:"Modèle économique", q:"D'où vient chaque euro de chiffre d'affaires ? Qui paie, pourquoi chez elle plutôt qu'ailleurs, et qu'est-ce qui protège ses marges : marque, coûts de changement, effet de réseau, brevets, taille ?"},
  {k:"actifs", t:"Actifs", q:"Que possède-t-elle vraiment ? Poids des écarts d'acquisition et des incorporels, qualité des créances et des stocks, actifs absents du bilan (marques, données, savoir-faire), actifs sous-évalués ou surévalués."},
  {k:"passif", t:"Passif", q:"Que doit-elle, à qui et quand ? Échéancier et taux de la dette, clauses, retraites, loyers, litiges, garanties données. Que deviendrait-elle si le crédit se fermait deux ans ?"},
  {k:"dirigeants", t:"Dirigeants", q:"Qui décide ? Parcours, ancienneté, part du capital détenue, critères et horizon de la rémunération, achats et ventes d'actions, indépendance du conseil, actionnaire de contrôle."},
  {k:"decisions", t:"Décisions passées", q:"Qu'ont-ils fait de l'argent depuis cinq à dix ans ? Acquisitions (prix payé, résultats, dépréciations), rachats d'actions et à quel cours, dividendes, investissements. Les promesses passées ont-elles été tenues ?"},
  {k:"vision", t:"Vision et stratégie", q:"Où veulent-ils aller, avec quels moyens et à quel horizon ? La stratégie colle-t-elle aux décisions passées et à l'évolution du secteur (IA, robotique, géopolitique, énergie) ?"},
  {k:"angles", t:"Angles morts", q:"Ce qui échappe au marché, aux dirigeants et à nous-mêmes : clients ou fournisseurs trop concentrés, dépendance à une réglementation, technologie de substitution, risque pays, comptabilité flatteuse, succession du dirigeant. Quel est l'argument vendeur le plus solide ?"},
  {k:"valorisation", t:"Valorisation et prix d'entrée", q:"Combien vaut-elle dans un scénario prudent, central et favorable ? Quel rendement promet le cours actuel ? À quel prix l'achat garde-t-il une marge de sécurité ?"},
  {k:"these", t:"Thèse en une phrase", q:"Pourquoi l'acheter, en une phrase à relire dans trois ans."},
  {k:"invalidation", t:"Conditions d'invalidation", q:"Ce qui nous ferait sortir, écrit avant d'entrer : chiffres précis, événements, délais."}
];
const AN_CHECK = [
  "Dernier rapport annuel lu : lettre aux actionnaires, facteurs de risque, notes sur la dette",
  "Dernière publication de résultats et conférence avec les analystes lues ou écoutées",
  "Chaque activité comprise : ce qu'elle vend, à qui, avec quelle marge",
  "Scénario d'une baisse de moitié du cours décrit",
  "Argument vendeur le plus solide examiné",
  "Part maximale dans le portefeuille fixée",
  "Thèse résumée en une phrase",
  "Conditions de sortie écrites avant d'entrer"
];
const AN = {idx:new Map(), charge:false, chargement:null, cur:null, dos:null, data:{}, t:{}, statut:""};
const anNorm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const anStatut = id => (AN.idx.get(id) || {}).statut || null;
function anPill(id, court){ const s = anStatut(id); if (!s) return ""; const S = AN_ST[s]; return `<span class="pill xs ${S.c} anp" title="Analyse approfondie : ${esc(S.l)}">${esc(court ? S.c2 : S.l)}</span>`; }
const anJour = d => d ? new Date(d).toLocaleDateString("fr-FR", {day:"numeric", month:"long", year:"numeric"}) : "—";

/* ---------- Stockage : base Agapante, copie de secours dans ce navigateur ---------- */
function anAttente(){ try { return JSON.parse(localStorage.getItem("bourse.dossiers.attente") || "{}"); } catch(e){ return {}; } }
function anAttenteEcrire(m){ try { localStorage.setItem("bourse.dossiers.attente", JSON.stringify(m)); } catch(e){} }
function anResume(d){ return {id:d.id, statut:d.statut, nom:d.nom, these:(d.sections && d.sections.these) || d.these || "", prixEntree:d.prixEntree, revue:d.revue || null, cree:d.cree, maj:d.maj, valid:d.valid || null}; }
function anCharger(){
  if (AN.chargement) return AN.chargement;
  AN.chargement = (async () => {
    const att = anAttente(), avant = AN.idx;
    try {
      const r = await fetch("/bourse/api/dossier", {credentials:"same-origin", cache:"no-store"});
      if (!r.ok) throw new Error(String(r.status));
      const j = await r.json();
      AN.idx = new Map((j.dossiers || []).map(d => [d.id, {...d, prixEntree:d.prixEntree === null || d.prixEntree === undefined || d.prixEntree === "" ? null : +d.prixEntree}]));
      for (const [id, d] of avant) if (!AN.idx.has(id)) AN.idx.set(id, d);
      for (const d of Object.values(att)){ AN.idx.set(d.id, anResume(d)); anEnvoyer(d); }
      AN.statut = "";
    } catch(e){
      for (const d of Object.values(att)) AN.idx.set(d.id, anResume(d));
      AN.statut = "Base Agapante injoignable : les dossiers modifiés ici restent dans ce navigateur jusqu'au prochain envoi.";
    }
    AN.charge = true;
  })();
  return AN.chargement;
}
async function anEnvoyer(d){
  const att = anAttente(); att[d.id] = d; anAttenteEcrire(att);
  try {
    const r = await fetch("/bourse/api/dossier", {method:"PUT", credentials:"same-origin", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id:d.id, dossier:d})});
    if (!r.ok) throw new Error(String(r.status));
    const a2 = anAttente(); if (a2[d.id] && a2[d.id].maj === d.maj){ delete a2[d.id]; anAttenteEcrire(a2); }
    if (AN.statut){ AN.statut = ""; anEtat(); }
  } catch(e){ AN.statut = "Dossier gardé dans ce navigateur : la base Agapante ne répond pas, envoi à la prochaine modification."; anEtat(); }
}
function anSauver(d, vite){
  d.maj = new Date().toISOString(); d.these = (d.sections && d.sections.these) || "";
  AN.idx.set(d.id, anResume(d));
  clearTimeout(AN.t[d.id]);
  if (vite) anEnvoyer(d); else AN.t[d.id] = setTimeout(() => anEnvoyer(d), 900);
  anEtat("Enregistré");
}
function anEtat(msg){ const el = $("#an-etat"); if (el) el.textContent = AN.statut || msg || ""; }
async function anLire(id){
  const att = anAttente(); if (att[id]) return att[id];
  try { const r = await fetch("/bourse/api/dossier?id=" + encodeURIComponent(id), {credentials:"same-origin", cache:"no-store"}); if (!r.ok) throw new Error(String(r.status)); return await r.json(); } catch(e){ return null; }
}
function anNouveau(x){
  const now = new Date().toISOString();
  return {id:x.id, nom:x.nom, statut:"a_analyser", cree:now, maj:now, devise:x.ccy, prixEntree:null, revue:null, lienClaude:"", verdictClaude:null,
    sections:{}, checklist:[], journal:[{date:now, statut:"a_analyser", px:x.px, ccy:x.ccy, note:noteProfil(x), cat:x.cat}]};
}
/* Mise à l'étude depuis le classement, les opportunités, la fiche, le portefeuille ou le constructeur */
function anAjouter(id, silencieux){
  const x = B.byId.get(id); if (!x || x.kind !== "action") return false;
  if (AN.idx.has(id)){ if (!silencieux) toast(`« ${x.nom} » figure déjà parmi les analyses`); return false; }
  const d = anNouveau(x); AN.idx.set(id, anResume(d)); anEnvoyer(d);
  if (!silencieux) toast(`« ${x.nom} » mise à l'étude : onglet Analyses`);
  return true;
}
function anOuvrir(id){ if (!AN.idx.has(id)) anAjouter(id, true); AN.cur = id; AN.dos = null; if (!$("#fiche").hidden) closeFiche(); go("analyses"); window.scrollTo(0, 0); }
async function anDonnees(id, frais){
  if (!frais && AN.data[id]) return AN.data[id];
  try {
    const r = await fetch("/bourse/api/analyse?id=" + encodeURIComponent(id) + (frais ? "&frais=1" : ""), {credentials:"same-origin"});
    const j = await r.json(); if (!r.ok) throw new Error(j && j.erreur || String(r.status));
    AN.data[id] = j; return j;
  } catch(e){ return {erreur:String(e && e.message || e)}; }
}

/* ---------- Calculs sur les comptes annuels ---------- */
function anCalc(d, x){
  const C = (d.comptes || []).filter(c => ok(c.totalAssets) || ok(c.totalRevenue));
  const n = C.length, L = C[n - 1], P = C[n - 2];
  const g = (c, k) => c && ok(c[k]) ? c[k] : null;
  const div = (a, b) => ok(a) && ok(b) && b !== 0 ? a / b : null;
  const somme = (cs, f) => { let s = 0, m = 0; for (const c of cs){ const v = f(c); if (ok(v)){ s += v; m++; } } return m ? s : null; };
  const fin = x && x.secteur === "Finance";
  const rev = c => g(c, "totalRevenue"), ni = c => g(c, "netIncomeCommonStockholders") ?? g(c, "netIncome");
  const cash = c => g(c, "cashCashEquivalentsAndShortTermInvestments") ?? g(c, "cashAndCashEquivalents");
  const intang = c => g(c, "goodwillAndOtherIntangibleAssets") ?? (ok(g(c, "goodwill")) || ok(g(c, "otherIntangibleAssets")) ? (g(c, "goodwill") || 0) + (g(c, "otherIntangibleAssets") || 0) : null);
  const capex = c => ok(g(c, "capitalExpenditure")) ? Math.abs(c.capitalExpenditure) : null;
  const fcf = c => g(c, "freeCashFlow") ?? (ok(g(c, "operatingCashFlow")) && ok(capex(c)) ? c.operatingCashFlow - capex(c) : null);
  const ebit = c => g(c, "EBIT") ?? g(c, "operatingIncome");
  const ebitda = c => g(c, "EBITDA") ?? (ok(ebit(c)) && ok(g(c, "reconciledDepreciation")) ? ebit(c) + c.reconciledDepreciation : null);
  const nd = c => ok(g(c, "totalDebt")) ? c.totalDebt - (cash(c) || 0) : g(c, "netDebt");
  const sh = c => g(c, "ordinarySharesNumber") ?? g(c, "dilutedAverageShares");
  const tl = c => g(c, "totalLiabilitiesNetMinorityInterest") ?? (ok(g(c, "totalAssets")) && ok(g(c, "stockholdersEquity")) ? c.totalAssets - c.stockholdersEquity - (g(c, "minorityInterest") || 0) : null);
  const cr = c => div(g(c, "currentAssets"), g(c, "currentLiabilities"));
  const gm = c => div(g(c, "grossProfit"), rev(c)), opm = c => div(g(c, "operatingIncome"), rev(c));
  const roic = c => { const ic = ok(g(c, "stockholdersEquity")) ? c.stockholdersEquity + (g(c, "totalDebt") || 0) - (cash(c) || 0) : null; return ok(ebit(c)) && ic > 0 ? ebit(c) * .75 / ic : null; };
  const pos = (v, s = 1) => ok(v) ? Math.abs(v) * s : null;
  const out = {C, n, fin, f:{rev, ni, cash, intang, capex, fcf, ebit, ebitda, nd, sh, tl, cr, gm, opm, roic}, pio:[], flags:[], forces:[], alloc:null, z:null};
  if (!n) return out;
  const ans = n - 1;
  // Score de Piotroski (variante sur actifs de fin d'exercice)
  if (n >= 2){
    const roa = c => div(ni(c), g(c, "totalAssets")), lev = c => div(g(c, "longTermDebt") ?? g(c, "totalDebt") ?? 0, g(c, "totalAssets")), rot = c => div(rev(c), g(c, "totalAssets"));
    const t = (l, v) => out.pio.push({l, v});
    t("Bénéfice net positif", ok(ni(L)) ? ni(L) > 0 : null);
    t("Trésorerie d'exploitation positive", ok(g(L, "operatingCashFlow")) ? L.operatingCashFlow > 0 : null);
    t("Rentabilité des actifs en hausse", ok(roa(L)) && ok(roa(P)) ? roa(L) > roa(P) : null);
    t("Trésorerie d'exploitation supérieure au bénéfice", ok(g(L, "operatingCashFlow")) && ok(ni(L)) ? L.operatingCashFlow > ni(L) : null);
    t("Endettement à long terme en baisse", ok(lev(L)) && ok(lev(P)) ? (lev(L) === 0 && lev(P) === 0) || lev(L) < lev(P) : null);
    t("Liquidité courante en hausse", ok(cr(L)) && ok(cr(P)) ? cr(L) > cr(P) : null);
    t("Aucune action nouvelle émise", ok(sh(L)) && ok(sh(P)) ? sh(L) <= sh(P) * 1.005 : null);
    t("Marge brute en hausse", ok(gm(L)) && ok(gm(P)) ? gm(L) > gm(P) : null);
    t("Rotation des actifs en hausse", ok(rot(L)) && ok(rot(P)) ? rot(L) > rot(P) : null);
    const v = out.pio.filter(p => p.v !== null);
    out.pioS = v.filter(p => p.v).length; out.pioN = v.length;
  }
  // Altman Z'' (version pour toutes sociétés, sur valeurs comptables) ; sans objet pour les banques et assureurs
  if (!fin){
    const wc = g(L, "workingCapital") ?? (ok(g(L, "currentAssets")) && ok(g(L, "currentLiabilities")) ? L.currentAssets - L.currentLiabilities : null), ta = g(L, "totalAssets");
    if (ok(wc) && ok(ta) && ok(g(L, "retainedEarnings")) && ok(ebit(L)) && ok(g(L, "stockholdersEquity")) && tl(L) > 0)
      out.z = 6.56 * wc / ta + 3.26 * L.retainedEarnings / ta + 6.72 * ebit(L) / ta + 1.05 * L.stockholdersEquity / tl(L);
  }
  // Allocation du capital sur la période
  const per = C.filter(c => ok(g(c, "operatingCashFlow")));
  if (per.length){
    out.alloc = {n:per.length, fcf:somme(per, fcf), div:somme(per, c => pos(g(c, "cashDividendsPaid"))), rach:somme(per, c => pos(g(c, "repurchaseOfCapitalStock"))),
      acq:somme(per, c => pos(g(c, "purchaseOfBusiness"))), emis:somme(per, c => g(c, "issuanceOfCapitalStock")), dette:somme(per, c => g(c, "netIssuancePaymentsOfDebt")), sbc:somme(per, c => g(c, "stockBasedCompensation"))};
  }
  const pc = v => nf0.format(v * 100) + " %", F_ = out.flags, G = out.forces, A = C[0], a = Math.max(1, ans);
  const der3 = C.slice(-3);
  // Bilan
  if (ok(intang(L)) && g(L, "stockholdersEquity") > 0 && intang(L) > L.stockholdersEquity) F_.push(["Incorporels supérieurs aux fonds propres", `Écarts d'acquisition et incorporels : ${pc(intang(L) / L.stockholdersEquity)} des fonds propres. Sans eux, les capitaux propres seraient négatifs ; une dépréciation pèserait directement sur le bilan.`]);
  if (g(L, "stockholdersEquity") < 0) F_.push(["Fonds propres négatifs", "Les pertes accumulées, les rachats ou les dividendes ont dépassé le capital apporté. Fréquent chez les sociétés qui rachètent massivement leurs actions ; inquiétant ailleurs."]);
  if (!fin && ok(cr(L)) && cr(L) < 1) F_.push(["Liquidité courante sous 1", `Actifs à moins d'un an : ${nf2.format(cr(L))} fois les dettes à moins d'un an. La société dépend de ses encaissements réguliers ou de ses banques.`]);
  if (!fin && ok(nd(L)) && ebitda(L) > 0 && nd(L) / ebitda(L) > 3.5) F_.push(["Dette lourde", `Dette nette : ${nf1.format(nd(L) / ebitda(L))} années d'excédent brut d'exploitation.`]);
  if (!fin && ok(nd(L)) && nd(L) < 0) G.push(["Trésorerie nette", "La trésorerie dépasse la dette financière : la société traverse une crise du crédit sans dépendre des banques."]);
  // Résultats et trésorerie
  if (n >= 3 && rev(A) > 0 && rev(L) > 0 && rev(L) < rev(A)) F_.push(["Chiffre d'affaires en baisse", `${F.pctS((rev(L) / rev(A) - 1) * 100)} en ${ans} ans.`]);
  if (n >= 3 && rev(A) > 0 && rev(L) > 0){
    const rg = rev(L) / rev(A) - 1;
    for (const [k, l, seuil] of [["accountsReceivable", "Créances clients", .1], ["inventory", "Stocks", .05]]){
      const v0 = g(A, k), v1 = g(L, k);
      if (v0 > 0 && v1 > 0 && v1 / v0 - 1 - rg > .2 && v1 / rev(L) > seuil) F_.push([`${l} qui gonflent`, `${F.pctS((v1 / v0 - 1) * 100)} en ${ans} ans pour un chiffre d'affaires en hausse de ${F.pctS(rg * 100).replace("+", "")}. ${k === "inventory" ? "Des produits qui se vendent moins vite, ou une production en avance sur la demande." : "Des ventes encaissées de plus en plus tard, ou soutenues par du crédit aux clients."}`]);
    }
  }
  const ni3 = somme(der3, ni), fcf3 = somme(der3, fcf);
  if (!fin && ni3 > 0 && ok(fcf3)){ const conv = fcf3 / ni3;
    if (conv < .5) F_.push(["Bénéfices peu convertis en trésorerie", `Sur ${der3.length} ans, la trésorerie disponible représente ${pc(conv)} du résultat net. Le bénéfice comptable reste en partie sur le papier : investissements lourds, besoin en fonds de roulement, ou comptabilité généreuse.`]);
    else if (conv > .9) G.push(["Bénéfices convertis en trésorerie", `Trésorerie disponible : ${pc(conv)} du résultat net sur ${der3.length} ans.`]); }
  if (!fin && der3.filter(c => fcf(c) < 0).length >= 2) F_.push(["Trésorerie disponible négative", `Négative ${der3.filter(c => fcf(c) < 0).length} années sur les ${der3.length} dernières : la société consomme plus d'argent qu'elle n'en produit.`]);
  if (n >= 3){ const o = C.map(opm).filter(ok);
    if (o.length >= 3){ const dern = o[o.length - 1], moy = o.slice(0, -1).reduce((s, v) => s + v, 0) / (o.length - 1), et = Math.sqrt(o.reduce((s, v) => s + (v - moy) ** 2, 0) / o.length);
      if (dern < moy - .03) F_.push(["Marge en recul", `Marge opérationnelle de ${pc(dern)} contre ${pc(moy)} en moyenne les années précédentes.`]);
      else if (Math.min(...o) > .12 && et < .03) G.push(["Marges élevées et stables", `Marge opérationnelle entre ${pc(Math.min(...o))} et ${pc(Math.max(...o))} sur ${o.length} ans : signe d'un avantage durable sur les concurrents.`]); } }
  if (!fin && ok(g(L, "interestExpense")) && L.interestExpense > 0){ const e = ebit(L);
    if (!(e > 0)) F_.push(["Intérêts sans résultat pour les payer", "Le résultat d'exploitation est nul ou négatif alors que la dette coûte des intérêts."]);
    else if (L.interestExpense / e > .3) F_.push(["Charge d'intérêts lourde", `Les intérêts absorbent ${pc(L.interestExpense / e)} du résultat d'exploitation.`]); }
  if (!fin){ const cx = somme(der3, capex), am = somme(der3, c => g(c, "reconciledDepreciation"));
    if (cx > 0 && am > 0 && cx < .7 * am) F_.push(["Investissements sous l'usure", `Investissements : ${pc(cx / am)} des amortissements sur ${der3.length} ans. L'outil vieillit, ou les bénéfices sont flattés par des économies difficiles à prolonger. En normes IFRS, une partie des amortissements vient des loyers : à vérifier dans le rapport annuel.`]); }
  const rc = C.map(roic).filter(ok);
  if (rc.length >= 3){ const m = rc.reduce((s, v) => s + v, 0) / rc.length; if (m > .15) G.push(["Capital investi très rentable", `Rentabilité du capital investi de ${pc(m)} en moyenne après impôt : chaque euro réinvesti crée de la valeur.`]); else if (m < .06 && !fin) F_.push(["Capital investi peu rentable", `Rentabilité du capital investi de ${pc(m)} en moyenne, sous le coût du capital : la croissance détruit de la valeur.`]); }
  // Actions, rachats, dilution
  if (n >= 3 && sh(A) > 0 && sh(L) > 0){ const ds = sh(L) / sh(A) - 1;
    if (ds > .03 * a) F_.push(["Dilution", `Nombre d'actions en hausse de ${F.pctS(ds * 100).replace("+", "")} en ${ans} ans : chaque actionnaire possède une part plus petite de la société.`]);
    else if (ds < -.05) G.push(["Rachats d'actions", `Nombre d'actions réduit de ${nf0.format(-ds * 100)} % en ${ans} ans : la part de chaque actionnaire grandit.`]); }
  if (out.alloc){ const al = out.alloc;
    if (al.sbc > 0 && al.fcf > 0 && al.sbc / al.fcf > .25) F_.push(["Rémunération en actions lourde", `Actions données aux salariés : ${pc(al.sbc / al.fcf)} de la trésorerie disponible. Une charge réelle, absente des flux de trésorerie.`]);
    const distr = (al.div || 0) + (al.rach || 0);
    if (al.fcf > 0 && distr > al.fcf * 1.1 && g(L, "totalDebt") > (g(A, "totalDebt") || 0) * 1.15) F_.push(["Distributions financées par la dette", `Dividendes et rachats : ${pc(distr / al.fcf)} de la trésorerie disponible, pendant que la dette augmente.`]);
    if (al.acq > 0 && al.fcf > 0 && al.acq / al.fcf > .5) F_.push(["Croissance achetée", `Acquisitions : ${pc(al.acq / al.fcf)} de la trésorerie disponible cumulée. Leur prix et leurs résultats se vérifient dans les rapports annuels.`]);
  }
  // Scores
  if (ok(out.pioS) && out.pioN >= 7){ if (out.pioS >= 7) G.push(["Score de Piotroski élevé", `${out.pioS} / ${out.pioN} : comptes en amélioration sur presque tous les critères.`]); else if (out.pioS <= 3) F_.push(["Score de Piotroski faible", `${out.pioS} / ${out.pioN} : comptes en dégradation sur la plupart des critères.`]); }
  if (ok(out.z) && out.z < 1.1) F_.push(["Altman Z'' en zone de détresse", `${nf1.format(out.z)} : profil statistique des sociétés en difficulté dans les deux ans. À relativiser pour les sociétés aux fonds propres réduits par les rachats.`]);
  // Dirigeants, initiés, gouvernance
  const ai = d.achatsInities || {}, act = d.actionnaires || {}, rk = (d.profil || {}).risques || {};
  if (ok(ai.net) && ai.net < 0 && (ai.nbVentes || 0) > 2 * (ai.nbAchats || 0) && Math.abs(ai.partNet || 0) > .01) F_.push(["Initiés vendeurs", `Ventes nettes des dirigeants et administrateurs sur six mois : ${nf1.format(Math.abs(ai.partNet) * 100)} % de leurs titres.`]);
  if (ok(ai.net) && ai.net > 0 && (ai.nbAchats || 0) >= 2) G.push(["Achats d'initiés", `${ai.nbAchats} achats de dirigeants ou d'administrateurs sur six mois.`]);
  if (act.initiés >= .05) G.push(["Dirigeants actionnaires", `Initiés : ${nf1.format(act.initiés * 100)} % du capital. Leur intérêt rejoint celui des actionnaires, à condition de vérifier qui contrôle vraiment.`]);
  if (rk.global >= 8) F_.push(["Gouvernance à risque", `Note de risque de gouvernance ISS de ${rk.global} sur 10${rk.remuneration >= 8 ? ", rémunération des dirigeants signalée" : ""}${rk.actionnaires >= 8 ? ", droits des actionnaires limités" : ""}.`]);
  else if ([["remuneration", "rémunération des dirigeants"], ["actionnaires", "droits des actionnaires"], ["conseil", "conseil d'administration"], ["audit", "audit et contrôle"]].some(([c]) => rk[c] >= 9))
    F_.push(["Gouvernance à surveiller", `Notes de risque ISS de 9 ou 10 sur 10 pour ${[["remuneration", "rémunération des dirigeants"], ["actionnaires", "droits des actionnaires"], ["conseil", "conseil d'administration"], ["audit", "audit et contrôle"]].filter(([c]) => rk[c] >= 9).map(([c, l]) => `${l} (${rk[c]})`).join(", ")}.`]);
  else if (ok(rk.global) && rk.global <= 3) G.push(["Gouvernance solide", `Note de risque de gouvernance ISS de ${rk.global} sur 10.`]);
  return out;
}
/* Montants dans la devise des comptes */
const anM = v => !ok(v) ? "—" : (v < 0 ? "−" : "") + (Math.abs(v) >= 1e9 ? nf1.format(Math.abs(v) / 1e9) + " Md" : Math.abs(v) >= 1e6 ? nf0.format(Math.abs(v) / 1e6) + " M" : nf0.format(Math.abs(v)));
const anP = v => ok(v) ? nf1.format(v * 100) + " %" : "—";
function anLignes(K){
  const f = K.f, g = (c, k) => ok(c[k]) ? c[k] : null, C = K.C;
  const crois = c => { const i = C.indexOf(c); return i > 0 && f.rev(C[i - 1]) > 0 && ok(f.rev(c)) ? f.rev(c) / f.rev(C[i - 1]) - 1 : null; };
  const conv = c => ok(f.fcf(c)) && f.ni(c) > 0 ? f.fcf(c) / f.ni(c) : null;
  const couv = c => ok(f.ebit(c)) && g(c, "interestExpense") > 0 ? f.ebit(c) / c.interestExpense : null;
  const ndE = c => ok(f.nd(c)) && f.ebitda(c) > 0 ? f.nd(c) / f.ebitda(c) : null;
  const ip = c => ok(f.intang(c)) && g(c, "stockholdersEquity") > 0 ? f.intang(c) / c.stockholdersEquity : null;
  const ab = k => c => ok(c[k]) ? Math.abs(c[k]) : null;
  return {
    bilan:[["Actif total", c => g(c, "totalAssets")], ["Trésorerie et placements", f.cash], ["Créances clients", c => g(c, "accountsReceivable")], ["Stocks", c => g(c, "inventory")],
      ["Immobilisations corporelles", c => g(c, "netPPE")], ["Écarts d'acquisition et incorporels", f.intang], ["Dettes totales (hors fonds propres)", f.tl], ["Dette financière", c => g(c, "totalDebt")],
      ["Dette nette", f.nd], ["Fonds propres", c => g(c, "stockholdersEquity")], ["Incorporels / fonds propres", ip, "p"], ["Liquidité courante", f.cr, "x"], ["Dette nette / EBE", ndE, "x"],
      ["Nombre d'actions (millions)", c => ok(f.sh(c)) ? f.sh(c) / 1e6 : null, "n"]],
    resultat:[["Chiffre d'affaires", f.rev], ["Croissance", crois, "p"], ["Marge brute", f.gm, "p"], ["Marge opérationnelle", f.opm, "p"], ["Résultat net", f.ni],
      ["Recherche et développement", c => g(c, "researchAndDevelopment")], ["Trésorerie d'exploitation", c => g(c, "operatingCashFlow")], ["Investissements", f.capex], ["Amortissements", c => g(c, "reconciledDepreciation")],
      ["Trésorerie disponible", f.fcf], ["Trésorerie disponible / résultat net", conv, "p"], ["Rémunération en actions", c => g(c, "stockBasedCompensation")],
      ["Rentabilité du capital investi", f.roic, "p"], ["Couverture des intérêts", couv, "x"]],
    alloc:[["Trésorerie disponible", f.fcf], ["Dividendes versés", ab("cashDividendsPaid")], ["Rachats d'actions", ab("repurchaseOfCapitalStock")], ["Acquisitions", ab("purchaseOfBusiness")],
      ["Émissions d'actions", c => g(c, "issuanceOfCapitalStock")], ["Dette émise (+) ou remboursée (−)", c => g(c, "netIssuancePaymentsOfDebt")]]
  };
}
const anFmt = (v, t) => t === "p" ? anP(v) : t === "x" ? fmt(v, nf1.format) : t === "n" ? fmt(v, v => v >= 100 ? nf0.format(v) : nf1.format(v)) : anM(v);
function anTable(K, rows, cls){
  const R = rows.filter(([, f]) => K.C.some(c => ok(f(c))));
  if (!R.length) return "";
  return `<div class="tblwrap" style="border:0"><table class="t ${cls || ""}" style="min-width:${180 + K.n * 82}px"><thead><tr><th></th>${K.C.map(c => `<th class="n" title="Exercice clos le ${esc(new Date(c.date).toLocaleDateString("fr-FR"))}">${esc(String(c.date).slice(0, 4))}</th>`).join("")}</tr></thead>
    <tbody>${R.map(([l, f, t]) => `<tr><td>${esc(l)}</td>${K.C.map(c => { const v = f(c); return `<td class="n ${t !== "p" && t !== "x" && t !== "n" && v < 0 ? "neg" : ""}">${anFmt(v, t)}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>`;
}
function anTableMd(K, rows){
  const R = rows.filter(([, f]) => K.C.some(c => ok(f(c))));
  if (!R.length) return "";
  return `| | ${K.C.map(c => String(c.date).slice(0, 4)).join(" | ")} |\n|---|${K.C.map(() => "---:").join("|")}|\n` + R.map(([l, f, t]) => `| ${l} | ${K.C.map(c => anFmt(f(c), t)).join(" | ")} |`).join("\n");
}
function anAlertes(d, x){
  const out = [];
  if (!x){ out.push(["neu", "absente des données du jour"]); return out; }
  const pe = ok(d.prixEntree) ? +d.prixEntree : null;
  if (d.statut === "attendre" && pe && ok(x.px) && x.px <= pe) out.push(["good", "prix d'entrée atteint"]);
  if (d.revue && new Date(d.revue) <= new Date()) out.push(["warn", "revue à faire"]);
  if (d.valid && (d.statut === "entrer" || d.statut === "attendre")){
    const np = (x.pg || []).map(p => p[0]).filter(t => !(d.valid.pg || []).includes(t));
    if (np.length) out.push(["bad", "nouveau piège : " + np.join(", ")]);
    const nn = noteProfil(x); if (ok(nn) && ok(d.valid.note) && nn - d.valid.note <= -10) out.push(["warn", `note −${nf0.format(d.valid.note - nn)} depuis la validation`]);
  }
  return out;
}

/* ---------- Vue : la liste des dossiers ---------- */
function renderAnalyses(){
  const root = $("#an-body");
  if (bourseWait(root)) return;
  if (!AN.charge){ root.innerHTML = '<div class="card"><p class="empty">Chargement des dossiers…</p></div>'; anCharger().then(() => { if (CUR === "analyses") renderAnalyses(); }); return; }
  if (AN.cur) return renderDossier();
  const L = [...AN.idx.values()].map(d => ({d, x:B.byId.get(d.id)}));
  const groupes = AN_ORDRE.map(s => ({s, L:L.filter(o => o.d.statut === s).sort((a, b) => String(b.d.maj).localeCompare(String(a.d.maj)))})).filter(gr => gr.L.length);
  const suivis = ((Store.data.suivi || {}).items || []).filter(i => i.type === "action").map(i => B.byId.get(i.id)).filter(Boolean);
  const top = B.A.filter(x => ok(x.mcap) && x.mcap >= 1 && !(x.pg && x.pg.length)).map(x => [noteProfil(x), x]).filter(([v]) => ok(v)).sort((a, b) => b[0] - a[0]).slice(0, 30).map(([, x]) => x);
  const cand = [...new Set(suivis.concat(top))].filter(x => !AN.idx.has(x.id)).slice(0, 10);
  const nb = s => L.filter(o => o.d.statut === s).length;
  root.innerHTML = `
    <div class="card"><div class="btnrow" style="justify-content:space-between"><h2>Analyses approfondies</h2><span class="note">${L.length} dossier${L.length > 1 ? "s" : ""} · ${nb("entrer")} validée${nb("entrer") > 1 ? "s" : ""} pour entrer · ${nb("attendre")} en attente d'un meilleur prix</span></div>
      <p class="note">La présélection (classement, opportunités, constructeur) désigne des candidates ; chaque société passe ici avant d'entrer dans un portefeuille. Le dossier rassemble les derniers comptes annuels, les dirigeants et leurs décisions, les mouvements des initiés, puis l'analyse menée avec Claude : actifs, passif, vision, angles morts, prix d'entrée.</p>
      <div class="field search" style="max-width:520px"><span>Mettre une société à l'étude</span><input id="an-q" type="search" placeholder="Nom, code ou ISIN…" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="an-sugg"><div id="an-sugg" class="sugg" hidden role="listbox"></div></div>
      ${cand.length ? `<div class="field"><span>Candidates de la présélection${suivis.length ? " et de votre liste de suivi" : ""}</span><div class="chips">${cand.map(x => `<button class="chip" data-cand="${esc(x.id)}" title="${esc(x.id)} · ${esc(x.cat)} · note ${fmt(noteProfil(x), v => nf0.format(v))}">+ ${esc(x.nom)}</button>`).join("")}</div></div>` : ""}
      ${AN.statut ? `<p class="callout">${esc(AN.statut)}</p>` : ""}</div>
    ${groupes.length ? groupes.map(gr => `<div class="card"><div class="btnrow" style="justify-content:space-between"><h2>${esc(AN_ST[gr.s].l)}</h2><span class="note">${gr.L.length}</span></div>
      <div class="rlist">${gr.L.map(({d, x}) => { const al = anAlertes(d, x), pe = ok(d.prixEntree) ? +d.prixEntree : null;
        const ecart = pe && x && ok(x.px) ? (x.px / pe - 1) * 100 : null;
        return `<button class="rrow an-row" data-an="${esc(d.id)}"><span class="t"><b>${esc(d.nom || d.id)}</b><small>${esc(d.id)}${x ? " · " + esc(x.secteur) + " · " + esc(x.cat) : ""} · modifié le ${anJour(d.maj)}</small>${d.these ? `<small class="these">« ${esc(d.these.slice(0, 220))}${d.these.length > 220 ? "…" : ""} »</small>` : ""}</span>
          <span class="v">${al.map(([c, t]) => `<span class="pill xs ${c}">${esc(t)}</span>`).join(" ")}<small>${x && ok(x.px) ? "cours " + nf2.format(x.px) + " " + esc(x.ccy) : ""}${pe ? ` · entrée visée ${nf2.format(pe)}${ok(ecart) ? ` (${F.pctS(ecart)})` : ""}` : ""}${x ? ` · note ${fmt(noteProfil(x), v => nf0.format(v))}` : ""}</small></span></button>`; }).join("")}</div></div>`).join("")
      : `<div class="card"><p class="empty">Aucun dossier pour l'instant. Depuis le classement, la fiche d'une société propose « Analyser en profondeur » ; les opportunités et le constructeur envoient leurs candidates ici.</p></div>`}`;
  attachSearch($("#an-q"), $("#an-sugg"), x => anOuvrir(x.id), x => x.kind === "action");
  $$("#an-body [data-cand]").forEach(b => b.onclick = () => { anAjouter(b.dataset.cand); renderAnalyses(); });
  $$("#an-body [data-an]").forEach(b => b.onclick = () => { AN.cur = b.dataset.an; AN.dos = null; renderAnalyses(); window.scrollTo(0, 0); });
}

/* ---------- Vue : un dossier ---------- */
async function renderDossier(){
  const root = $("#an-body"), id = AN.cur, x = B.byId.get(id);
  if (!AN.dos || AN.dos.id !== id){
    root.innerHTML = '<div class="card"><p class="empty">Ouverture du dossier…</p></div>';
    const d = await anLire(id);
    if (AN.cur !== id || CUR !== "analyses") return;
    AN.dos = d || (x ? anNouveau(x) : null);
    if (!AN.dos){ AN.cur = null; renderAnalyses(); return; }
  }
  const d = AN.dos; d.sections = d.sections || {}; d.checklist = d.checklist || []; d.journal = d.journal || [];
  const pe = ok(d.prixEntree) ? +d.prixEntree : null, nNow = x ? noteProfil(x) : null;
  const k = (l, v, c) => `<div class="kpi"><div class="l">${l}</div><div class="v">${v}</div>${c ? `<div class="c">${c}</div>` : ""}</div>`;
  const faits = AN_SECTIONS.filter(s => (d.sections[s.k] || "").trim()).length, coches = AN_CHECK.filter((_, i) => d.checklist[i]).length;
  const manque = (d.statut === "entrer" || d.statut === "attendre") && (!(d.sections.these || "").trim() || !(d.sections.invalidation || "").trim());
  const lien = /^https:\/\//.test(d.lienClaude || "") ? d.lienClaude : "";
  root.innerHTML = `
    <div class="card an-tete">
      <div class="btnrow" style="justify-content:space-between"><button class="ghost small" id="an-retour">← Toutes les analyses</button><span class="note" id="an-etat">${esc(AN.statut)}</span></div>
      <h2>${esc(d.nom || id)}</h2>
      <div class="meta-l">${x ? `${esc(x.id)} · ${esc(x.pays || "—")} · ${esc(x.secteur)}${x.industrie ? " · " + esc(x.industrie) : ""}${x.isin ? " · " + esc(x.isin) : ""}` : esc(id) + " · absente des données du jour"} · dossier ouvert le ${anJour(d.cree)}</div>
      ${x ? `<div class="flags">${catPill(x.cat)}${x.pea ? '<span class="pill good">Éligible au PEA</span>' : '<span class="pill neu">Hors PEA</span>'}${(x.pg || []).map(([t]) => `<span class="pill warn">${esc(t)}</span>`).join("")}</div>` : ""}
      <div class="field"><span>Où en est le dossier</span><div class="seg an-st" role="group" aria-label="Statut du dossier">${AN_FLUX.map(s => `<button data-st="${s}" aria-pressed="${d.statut === s}">${esc(AN_ST[s].l)}</button>`).join("")}</div></div>
      ${manque ? `<p class="callout">Thèse en une phrase et conditions d'invalidation restent à écrire : elles servent de garde-fou le jour où le cours chute.</p>` : ""}
      <div class="kpis k3">${k("Cours", x && ok(x.px) ? nf2.format(x.px) + " " + esc(x.ccy) : "—", x && ok(x.upside) ? `objectif des analystes ${F.pctS(x.upside)}` : "")}
        ${k("Prix d'entrée visé", pe ? nf2.format(pe) + " " + esc(x ? x.ccy : d.devise || "") : "—", pe && x && ok(x.px) ? (x.px <= pe ? "atteint" : `cours à ${F.pctS((x.px / pe - 1) * 100)}`) : "à fixer dans la partie valorisation")}
        ${k("Note du profil", fmt(nNow, v => nf0.format(v) + " / 100"), d.valid && ok(d.valid.note) ? `${nf0.format(d.valid.note)} à la validation, le ${anJour(d.valid.date)}` : x ? esc(x.cat) : "")}
        ${k("Rendement réel attendu", x ? fmt(x.muR, F.pct) : "—", "par an, avant impôt")}
        ${k("Avancement", `${faits} / ${AN_SECTIONS.length}`, `parties rédigées · ${coches} / ${AN_CHECK.length} vérifications`)}
        ${k("Prochaine revue", d.revue ? anJour(d.revue) : "—", d.revue && new Date(d.revue) <= new Date() ? "à faire" : "")}</div>
      <div class="form an-form">
        <label for="an-prix">Prix d'entrée visé (${esc(x ? x.ccy : d.devise || "")})<input id="an-prix" type="number" step="any" min="0" value="${pe || ""}"></label>
        <label for="an-revue">Prochaine revue<input id="an-revue" type="date" value="${esc(d.revue || "")}"></label>
        <label for="an-lien" class="wide">Conversation avec Claude<input id="an-lien" type="url" placeholder="https://claude.ai/chat/…" value="${esc(d.lienClaude || "")}"></label>
      </div>
      <div class="btnrow">
        <button class="primary" id="an-brief">Préparer le brief pour Claude</button>
        <button class="ghost" id="an-coller">Coller la réponse de Claude</button>
        ${lien ? `<a class="btnlink" href="${esc(lien)}" target="_blank" rel="noopener noreferrer">Ouvrir la conversation</a>` : ""}
        ${x ? '<button class="ghost" id="an-fiche">Fiche de la société</button>' : ""}
        ${x ? `<button class="${d.statut === "entrer" ? "primary" : "ghost"}" id="an-pf">${d.statut === "entrer" ? "Ajouter au portefeuille" : "Ajouter à l'essai"}</button>` : ""}
        <button class="ghost small danger" id="an-suppr">Supprimer le dossier</button>
      </div>
      ${d.verdictClaude ? `<div class="callout"><b>Verdict proposé par Claude : ${esc(AN_ST[d.verdictClaude.st] ? AN_ST[d.verdictClaude.st].l : d.verdictClaude.st)}.</b> ${esc(d.verdictClaude.txt || "")}${ok(d.verdictClaude.prix) ? ` Prix d'entrée proposé : ${nf2.format(d.verdictClaude.prix)}.` : ""} <span class="note">La décision reste la vôtre : le statut ci-dessus change seulement quand vous le choisissez.</span></div>` : ""}
    </div>
    <div class="card" id="an-chiffres"><h2>Les chiffres</h2><p class="note">Lecture des comptes annuels…</p></div>
    <div class="card" id="an-dir"><h2>Dirigeants et gouvernance</h2><p class="note">Chargement…</p></div>
    <div class="card" id="an-marche"><h2>Le regard du marché</h2><p class="note">Chargement…</p></div>
    <div class="card" id="an-notes"><div class="btnrow" style="justify-content:space-between"><h2>Notre analyse</h2><span class="note">${faits} partie${faits > 1 ? "s" : ""} rédigée${faits > 1 ? "s" : ""} sur ${AN_SECTIONS.length}</span></div>
      <p class="note">Chaque partie se remplit à la main, ou d'un coup avec la réponse de Claude (bouton « Coller la réponse de Claude ») ; tout reste modifiable et s'enregistre au fil de la frappe.</p>
      ${AN_SECTIONS.map((s, i) => `<div class="an-sec"><label for="an-s-${s.k}"><b>${i + 1}. ${esc(s.t)}</b></label><p class="note">${esc(s.q)}</p><textarea id="an-s-${s.k}" data-sec="${s.k}" rows="${s.k === "these" ? 2 : 3}">${esc(d.sections[s.k] || "")}</textarea></div>`).join("")}
      <h3>Vérifications avant d'entrer</h3>
      <div class="an-check">${AN_CHECK.map((t, i) => `<label class="chk"><input type="checkbox" data-ck="${i}" ${d.checklist[i] ? "checked" : ""}> ${esc(t)}</label>`).join("")}</div>
    </div>
    <div class="card"><h2>Historique du dossier</h2>
      <div class="tblwrap" style="border:0"><table class="t" style="min-width:480px"><thead><tr><th>Date</th><th>Statut</th><th>Catégorie</th><th class="n">Cours</th><th class="n">Note</th></tr></thead><tbody>
      ${d.journal.slice().reverse().map(j => `<tr><td>${anJour(j.date)}</td><td>${esc(AN_ST[j.statut] ? AN_ST[j.statut].l : j.statut)}</td><td>${esc(j.cat || "")}</td><td class="n">${ok(j.px) ? nf2.format(j.px) + " " + esc(j.ccy || "") : "—"}</td><td class="n">${fmt(j.note, v => nf0.format(v))}</td></tr>`).join("")}
      </tbody></table></div></div>`;
  // Statut
  $$(".an-st button").forEach(b => b.onclick = () => {
    const s = b.dataset.st; if (s === d.statut) return;
    const now = new Date().toISOString(); d.statut = s;
    d.journal.push({date:now, statut:s, px:x ? x.px : null, ccy:x ? x.ccy : null, note:nNow, cat:x ? x.cat : null});
    if ((s === "entrer" || s === "attendre") && x) d.valid = {date:now, px:x.px, ccy:x.ccy, note:nNow, cat:x.cat, muR:x.muR, pg:(x.pg || []).map(p => p[0])};
    anSauver(d, true); renderDossier();
  });
  $("#an-retour").onclick = () => { AN.cur = null; AN.dos = null; renderAnalyses(); window.scrollTo(0, 0); };
  $("#an-prix").onchange = e => { d.prixEntree = e.target.value === "" ? null : Math.max(0, +e.target.value); anSauver(d); };
  $("#an-revue").onchange = e => { d.revue = e.target.value || null; anSauver(d); };
  $("#an-lien").onchange = e => { d.lienClaude = e.target.value.trim(); anSauver(d); renderDossier(); };
  $("#an-brief").onclick = () => anBrief(d, x);
  $("#an-coller").onclick = () => anColler(d);
  if ($("#an-fiche")) $("#an-fiche").onclick = () => openFiche(id);
  if ($("#an-pf")) $("#an-pf").onclick = () => pfAddLine(id);
  $("#an-suppr").onclick = () => openModal("Supprimer le dossier", `<p>Le dossier d'analyse de « ${esc(d.nom)} » et toutes ses notes seront effacés.</p>`, () => { anSupprimer(id); return true; }, "Supprimer");
  const grow = t => { t.style.height = "auto"; t.style.height = Math.min(900, t.scrollHeight + 2) + "px"; };
  $$("#an-notes textarea").forEach(t => { grow(t); t.oninput = () => { d.sections[t.dataset.sec] = t.value; grow(t); anSauver(d); }; });
  $$("#an-notes [data-ck]").forEach(c => c.onchange = () => { d.checklist[+c.dataset.ck] = c.checked; anSauver(d); });
  // Chiffres, dirigeants, marché
  const data = await anDonnees(id);
  if (AN.cur !== id || CUR !== "analyses" || !$("#an-chiffres")) return;
  renderAnChiffres(d, x, data);
}
async function anSupprimer(id){
  const att = anAttente(); delete att[id]; anAttenteEcrire(att);
  AN.idx.delete(id); AN.cur = null; AN.dos = null;
  try { await fetch("/bourse/api/dossier?id=" + encodeURIComponent(id), {method:"DELETE", credentials:"same-origin"}); } catch(e){}
  toast("Dossier supprimé"); renderAnalyses();
}
function renderAnChiffres(d, x, data){
  const ch = $("#an-chiffres"), dir = $("#an-dir"), mk = $("#an-marche");
  if (!data || data.erreur){ const m = `<p class="callout">Données indisponibles pour l'instant (${esc(data && data.erreur || "Yahoo Finance")}). <button class="ghost small" id="an-relire">Réessayer</button></p>`;
    ch.innerHTML = "<h2>Les chiffres</h2>" + m; dir.innerHTML = "<h2>Dirigeants et gouvernance</h2>"; mk.innerHTML = "<h2>Le regard du marché</h2>";
    $("#an-relire").onclick = async () => { ch.innerHTML = '<h2>Les chiffres</h2><p class="note">Nouvelle lecture…</p>'; renderAnChiffres(d, x, await anDonnees(d.id, true)); }; return; }
  const K = anCalc(data, x), T = anLignes(K), dev = esc(data.deviseComptes || data.devise || "");
  const k = (l, v, c, cls) => `<div class="kpi ${cls || ""}"><div class="l">${l}</div><div class="v">${v}</div>${c ? `<div class="c">${c}</div>` : ""}</div>`;
  const L = K.C[K.n - 1], A = K.C[0], al = K.alloc;
  const zL = ok(K.z) ? (K.z > 2.6 ? "zone sûre" : K.z > 1.1 ? "zone grise" : "zone de détresse") : (K.fin ? "sans objet pour une banque ou un assureur" : "données incomplètes");
  const dsh = K.n >= 2 && K.f.sh(A) > 0 && K.f.sh(L) > 0 ? K.f.sh(L) / K.f.sh(A) - 1 : null;
  const distrib = al && al.fcf > 0 ? ((al.div || 0) + (al.rach || 0)) / al.fcf : null;
  ch.innerHTML = `<div class="btnrow" style="justify-content:space-between"><h2>Les chiffres</h2><span class="note">Comptes annuels publiés, en ${dev || "devise des comptes"} · relevés le ${anJour(data.date)} <button class="ghost small" id="an-relire">Relire</button></span></div>
    ${K.n ? `<div class="kpis k3">
      ${k("Score de Piotroski", ok(K.pioS) ? `${K.pioS} / ${K.pioN}` : "—", "solidité et amélioration des comptes, sur 9 critères", K.pioS >= 7 ? "good" : K.pioS <= 3 ? "bad" : "")}
      ${k("Altman Z''", fmt(K.z, v => nf1.format(v)), zL, ok(K.z) ? (K.z > 2.6 ? "good" : K.z < 1.1 ? "bad" : "") : "")}
      ${k("Trésorerie disponible / bénéfice", (() => { const c3 = K.C.slice(-3), f = c3.reduce((s, c) => s + (K.f.fcf(c) || 0), 0), n = c3.reduce((s, c) => s + (K.f.ni(c) || 0), 0); return n > 0 ? anP(f / n) : "—"; })(), "sur trois ans ; au-delà de 90 %, un bénéfice bien réel")}
      ${k("Nombre d'actions", ok(dsh) ? F.pctS(dsh * 100) : "—", K.n >= 2 ? `en ${K.n - 1} an${K.n > 2 ? "s" : ""} : ${ok(dsh) && dsh > 0 ? "dilution" : "relution par les rachats"}` : "")}
      ${k("Rentabilité du capital investi", anP(K.f.roic(L)), "dernier exercice, après impôt")}
      ${k("Distribué aux actionnaires", ok(distrib) ? anP(distrib) : "—", al ? `de la trésorerie disponible sur ${al.n} ans` : "")}</div>
      ${K.flags.length || K.forces.length ? `<div class="det"><div><h3>Signaux d'alerte</h3>${K.flags.length ? K.flags.map(([t, s]) => `<div class="sigl bad"><b>${esc(t)}</b><span>${esc(s)}</span></div>`).join("") : '<p class="note">Rien de saillant dans les comptes.</p>'}</div>
        <div><h3>Points forts</h3>${K.forces.length ? K.forces.map(([t, s]) => `<div class="sigl good"><b>${esc(t)}</b><span>${esc(s)}</span></div>`).join("") : '<p class="note">Rien de saillant dans les comptes.</p>'}</div></div>` : ""}
      <h3>Bilan : ce qu'elle possède, ce qu'elle doit</h3>${anTable(K, T.bilan)}
      <h3>Résultats et trésorerie</h3>${anTable(K, T.resultat)}
      <h3>Allocation du capital : ce que les dirigeants font de l'argent</h3>
      ${al ? `<p class="note">Sur ${al.n} ans : ${anM(al.fcf)} ${dev} de trésorerie disponible ; ${anM(al.div)} versés en dividendes, ${anM(al.rach)} en rachats d'actions, ${anM(al.acq)} en acquisitions${ok(al.dette) ? ` ; dette ${al.dette >= 0 ? "augmentée" : "réduite"} de ${anM(Math.abs(al.dette))}` : ""}.</p>` : ""}
      ${anTable(K, T.alloc)}
      ${K.pio.length ? `<details><summary>Détail du score de Piotroski</summary><ul class="pio">${K.pio.map(p => `<li class="${p.v === true ? "pos" : p.v === false ? "neg" : ""}">${p.v === true ? "✓" : p.v === false ? "✗" : "·"} ${esc(p.l)}${p.v === null ? " (donnée absente)" : ""}</li>`).join("")}</ul>
        <p class="note">Neuf critères de Joseph Piotroski (2000) : rentabilité, trésorerie, endettement, liquidité, dilution, marges, rotation des actifs ; un point par critère rempli. Altman Z'' (1995) combine fonds de roulement, réserves, résultat d'exploitation et fonds propres rapportés aux actifs et aux dettes : au-dessus de 2,6, risque de défaut faible ; sous 1,1, profil des sociétés en difficulté.</p></details>` : ""}`
    : `<p class="callout">Comptes annuels absents chez Yahoo Finance pour ce titre${data.erreurComptes ? ` (${esc(data.erreurComptes)})` : ""}. Le rapport annuel de la société, sur son site, reste la source de référence.</p>`}`;
  $("#an-relire").onclick = async () => { ch.innerHTML = '<h2>Les chiffres</h2><p class="note">Nouvelle lecture…</p>'; const j = await anDonnees(d.id, true); if (AN.cur === d.id) renderAnChiffres(d, x, j); };
  // Dirigeants et gouvernance
  const pr = data.profil || {}, rk = pr.risques || {}, act = data.actionnaires || {}, ai = data.achatsInities || {}, an = new Date().getFullYear();
  const rkL = v => !ok(v) ? "—" : `<b class="${v >= 8 ? "neg" : v <= 3 ? "pos" : ""}">${v}</b> / 10`;
  dir.innerHTML = `<h2>Dirigeants et gouvernance</h2>
    ${(data.dirigeants || []).length ? `<div class="tblwrap" style="border:0"><table class="t" style="min-width:560px"><thead><tr><th>Dirigeant</th><th>Fonction</th><th class="n">Âge</th><th class="n">Rémunération</th></tr></thead><tbody>
      ${data.dirigeants.map(o => `<tr><td><b>${esc(o.nom)}</b></td><td lang="en">${esc(o.titre)}</td><td class="n">${ok(o.age) ? o.age : ok(o.ne) ? an - o.ne : "—"}</td><td class="n">${ok(o.remun) ? anM(o.remun) + " " + dev : "—"}</td></tr>`).join("")}</tbody></table></div>` : '<p class="note">Liste des dirigeants absente chez Yahoo Finance : voir le rapport annuel (gouvernement d\'entreprise).</p>'}
    <div class="det"><div><h3>Risque de gouvernance (ISS)</h3><table class="t"><tbody>
        <tr><td>Audit et contrôle</td><td class="n">${rkL(rk.audit)}</td></tr><tr><td>Conseil d'administration</td><td class="n">${rkL(rk.conseil)}</td></tr>
        <tr><td>Rémunération des dirigeants</td><td class="n">${rkL(rk.remuneration)}</td></tr><tr><td>Droits des actionnaires</td><td class="n">${rkL(rk.actionnaires)}</td></tr>
        <tr><td><b>Ensemble</b></td><td class="n">${rkL(rk.global)}</td></tr></tbody></table><p class="note">Échelle d'Institutional Shareholder Services : 1 = risque faible, 10 = risque élevé.</p></div>
      <div><h3>Qui détient le capital</h3><table class="t"><tbody>
        <tr><td>Dirigeants et administrateurs (initiés)</td><td class="n">${ok(act.initiés) ? nf1.format(act.initiés * 100) + " %" : "—"}</td></tr>
        <tr><td>Institutions</td><td class="n">${ok(act.institutions) ? nf1.format(act.institutions * 100) + " %" : "—"}${ok(act.nbInstitutions) ? ` (${nf0.format(act.nbInstitutions)})` : ""}</td></tr>
        <tr><td>Achats d'initiés sur six mois</td><td class="n">${ok(ai.nbAchats) ? `${ai.nbAchats} (${anM(ai.achats)} titres)` : "—"}</td></tr>
        <tr><td>Ventes d'initiés sur six mois</td><td class="n">${ok(ai.nbVentes) ? `${ai.nbVentes} (${anM(ai.ventes)} titres)` : "—"}</td></tr>
        <tr><td>Solde, en part de leurs titres</td><td class="n ${ai.partNet < 0 ? "neg" : ai.partNet > 0 ? "pos" : ""}">${ok(ai.partNet) ? F.pctS(ai.partNet * 100) : "—"}</td></tr></tbody></table></div></div>
    ${(data.transactions || []).length ? `<h3>Dernières transactions des initiés</h3><div class="tblwrap" style="border:0"><table class="t" style="min-width:620px"><thead><tr><th>Date</th><th>Qui</th><th>Opération</th><th class="n">Titres</th><th class="n">Montant</th></tr></thead><tbody>
      ${data.transactions.map(t => `<tr><td>${t.date ? new Date(t.date).toLocaleDateString("fr-FR") : "—"}</td><td><b>${esc(t.qui)}</b><span class="cmp" style="display:block;margin:0" lang="en">${esc(t.role || "")}</span></td><td lang="en">${esc(t.quoi || "—")}</td><td class="n">${fmt(t.titres, nf0.format)}</td><td class="n">${ok(t.valeur) && t.valeur > 0 ? anM(t.valeur) : "—"}</td></tr>`).join("")}</tbody></table></div>
      <p class="note">Déclarations publiées (surtout pour les sociétés américaines) ; libellés d'origine, en anglais. Une vente isolée s'explique souvent par une option exercée ou un impôt ; des achats répétés avec son propre argent disent davantage.</p>` : ""}
    ${pr.resume ? `<details><summary>Activité décrite par la société (en anglais)</summary><p class="note" lang="en" style="font-size:13px;color:var(--fg)">${esc(pr.resume)}</p></details>` : ""}`;
  // Marché
  const cs = (data.consensus || [])[0], cal = data.calendrier || {};
  const prochain = (cal.resultats || []).find(t => new Date(t) >= new Date(Date.now() - 864e5));
  mk.innerHTML = `<h2>Le regard du marché</h2>
    <div class="kpis k3">${k("Consensus des analystes", cs ? `${(cs.achatFort || 0) + (cs.achat || 0)} à l'achat` : "—", cs ? `${cs.conserver || 0} à conserver · ${(cs.vente || 0) + (cs.venteForte || 0)} à la vente` : "")}
      ${k("Prochains résultats", prochain ? anJour(prochain) : "—", prochain && !d.revue ? '<button class="ghost small" id="an-revue-res">Retenir comme date de revue</button>' : "")}
      ${k("Prochain détachement du dividende", cal.dividende && new Date(cal.dividende) >= new Date(Date.now() - 864e5) ? anJour(cal.dividende) : "—", cal.dividende && new Date(cal.dividende) < new Date(Date.now() - 864e5) ? `dernier : ${anJour(cal.dividende)}` : "")}</div>
    ${(data.surprises || []).length ? `<h3>Résultats trimestriels face aux attentes</h3><div class="tblwrap" style="border:0"><table class="t" style="min-width:420px"><thead><tr><th>Trimestre</th><th class="n">Attendu</th><th class="n">Publié</th><th class="n">Écart</th></tr></thead><tbody>
      ${data.surprises.map(s => `<tr><td>${s.trimestre ? new Date(s.trimestre).toLocaleDateString("fr-FR", {month:"short", year:"numeric"}) : "—"}</td><td class="n">${fmt(s.attendu, nf2.format)}</td><td class="n">${fmt(s.publie, nf2.format)}</td><td class="n ${s.ecart > 0 ? "pos" : s.ecart < 0 ? "neg" : ""}">${fmt(s.ecart, v => F.pctS(v * 100))}</td></tr>`).join("")}</tbody></table></div>` : ""}
    ${(data.avis || []).length ? `<h3>Derniers relèvements, abaissements et premières recommandations</h3><div class="tblwrap" style="border:0"><table class="t" style="min-width:480px"><thead><tr><th>Date</th><th>Banque ou bureau</th><th>Avis</th></tr></thead><tbody>
      ${data.avis.map(a => `<tr><td>${a.date ? new Date(a.date).toLocaleDateString("fr-FR") : "—"}</td><td>${esc(a.firme)}</td><td lang="en" class="l">${a.avant ? esc(a.avant) + " → " : ""}<b>${esc(a.apres || "")}</b></td></tr>`).join("")}</tbody></table></div>` : ""}
    <p class="note">Le consensus résume l'avis des analystes ; il suit souvent le cours plus qu'il ne l'anticipe. Utile surtout pour savoir ce que le marché attend déjà.</p>`;
  if ($("#an-revue-res")) $("#an-revue-res").onclick = () => { d.revue = String(prochain).slice(0, 10); anSauver(d, true); renderDossier(); };
}

/* ---------- Le brief pour Claude et le retour de son analyse ---------- */
function anBriefTexte(d, x, data){
  const K = data && !data.erreur ? anCalc(data, x) : null, T = K ? anLignes(K) : null, dev = data && (data.deviseComptes || data.devise) || "";
  const prof = (PROFILS.find(p => p.id === ACT.profil) || {}).l || "personnalisé";
  const l = [];
  l.push(`# Analyse approfondie : ${d.nom} (${d.id})`, "");
  l.push(`Je suis un investisseur particulier français. J'envisage de faire entrer ${d.nom} dans un portefeuille de long terme (horizon de cinq à dix ans${x && x.pea ? ", logé dans un PEA" : ", sur un compte-titres"}). Elle ressort de ma présélection${x ? ` : catégorie « ${x.cat} », note de ${fmt(noteProfil(x), v => nf0.format(v))} sur 100 pour mon profil « ${prof} »` : ""}. Avant d'acheter, je veux une analyse en profondeur, exigeante et critique, que nous mènerons ensemble. Cherche les documents récents (dernier rapport annuel, dernière publication de résultats, présentation aux investisseurs, presse financière) et cite tes sources.`, "");
  if (x){
    l.push(`## Données de mon outil (Yahoo Finance)`, "");
    l.push(`- Cours : ${fmt(x.px, nf2.format)} ${x.ccy} ; capitalisation : ${mdE(x.mcap)} ; ${x.pays || ""}, ${x.secteur}${x.industrie ? " (" + x.industrie + ")" : ""}`);
    l.push(`- PER prévisionnel : ${fmt(x.perF, F.x)} ; cours / fonds propres : ${fmt(x.pb, F.x)} ; VE / EBE : ${fmt(x.evEbitda, F.x)} ; rendement du flux de trésorerie disponible : ${fmt(x.fcfY, F.pct)} ; dividende : ${fmt(x.dy, F.pct)}`);
    l.push(`- Rentabilité des fonds propres : ${fmt(x.roe, F.pct)} ; marge opérationnelle : ${fmt(x.opm, F.pct)} ; marge brute : ${fmt(x.gm, F.pct)} ; dette nette / EBE : ${fmt(x.nde, nf1.format)}`);
    l.push(`- Croissance du chiffre d'affaires sur un an : ${fmt(x.revG, F.pctS)} ; du bénéfice : ${fmt(x.epsG, F.pctS)} ; croissance annuelle attendue à cinq ans : ${fmt(x.ltg, F.pctS)} ; révision du bénéfice attendu sur trois mois : ${fmt(x.rev90, F.pctS)}`);
    l.push(`- Performance sur douze mois : ${fmt(x.mom12, F.pctS)} ; pire baisse sur un an : ${fmt(x.dd1y, F.pctS)} ; volatilité : ${fmt(x.vol, v => nf0.format(v) + " %")} ; objectif des analystes : ${fmt(x.upside, F.pctS)}`);
    if ((x.pg || []).length) l.push(`- Pièges signalés par mon outil : ${x.pg.map(([t, s]) => `${t} (${s})`).join(" ; ")}`);
    l.push("");
  }
  if (K && K.n){
    l.push(`## Comptes annuels (${dev}, ${K.n} exercices)`, "");
    l.push(`- Score de Piotroski : ${ok(K.pioS) ? K.pioS + " / " + K.pioN : "—"} ; Altman Z'' : ${fmt(K.z, nf1.format)}`);
    const min1 = t => t.charAt(0).toLowerCase() + t.slice(1);
    for (const [t, s] of K.flags) l.push(`- Alerte, ${min1(t)} : ${min1(s)}`);
    for (const [t, s] of K.forces) l.push(`- Point fort, ${min1(t)} : ${min1(s)}`);
    l.push("", "### Bilan", "", anTableMd(K, T.bilan), "", "### Résultats et trésorerie", "", anTableMd(K, T.resultat), "", "### Allocation du capital", "", anTableMd(K, T.alloc), "");
  }
  if (data && !data.erreur){
    const rk = (data.profil || {}).risques || {}, act = data.actionnaires || {}, ai = data.achatsInities || {};
    l.push(`## Dirigeants et gouvernance`, "");
    for (const o of (data.dirigeants || []).slice(0, 8)) l.push(`- ${o.nom}, ${o.titre}${ok(o.age) ? `, ${o.age} ans` : ""}${ok(o.remun) ? `, rémunération ${anM(o.remun)} ${dev}` : ""}`);
    l.push(`- Risque de gouvernance ISS (1 faible, 10 élevé) : audit ${rk.audit ?? "—"}, conseil ${rk.conseil ?? "—"}, rémunération ${rk.remuneration ?? "—"}, droits des actionnaires ${rk.actionnaires ?? "—"}, ensemble ${rk.global ?? "—"}`);
    l.push(`- Capital détenu par les initiés : ${ok(act.initiés) ? nf1.format(act.initiés * 100) + " %" : "—"} ; par les institutions : ${ok(act.institutions) ? nf1.format(act.institutions * 100) + " %" : "—"}`);
    if (ok(ai.nbAchats) || ok(ai.nbVentes)) l.push(`- Initiés sur six mois : ${ai.nbAchats || 0} achats, ${ai.nbVentes || 0} ventes, solde ${ok(ai.partNet) ? F.pctS(ai.partNet * 100) : "—"} de leurs titres`);
    for (const t of (data.transactions || []).slice(0, 6)) l.push(`- ${t.date || ""} · ${t.qui} (${t.role || ""}) : ${t.quoi || ""}${ok(t.valeur) && t.valeur > 0 ? `, ${anM(t.valeur)}` : ""}`);
    const cs = (data.consensus || [])[0];
    if (cs) l.push(`- Consensus : ${(cs.achatFort || 0) + (cs.achat || 0)} à l'achat, ${cs.conserver || 0} à conserver, ${(cs.vente || 0) + (cs.venteForte || 0)} à la vente`);
    l.push("");
  }
  const notes = AN_SECTIONS.filter(s => (d.sections[s.k] || "").trim());
  if (notes.length){ l.push(`## Mes notes à ce stade`, ""); for (const s of notes) l.push(`### ${s.t}`, "", d.sections[s.k].trim(), ""); }
  l.push(`## Ce que j'attends de toi`, "");
  l.push(`Réponds en français en reprenant exactement les titres ci-dessous, un titre « ## » par partie, pour que je colle ta réponse dans mon dossier. Pour chaque partie, appuie-toi sur les chiffres ci-dessus, complète-les par tes recherches et signale ce qu'ils laissent dans l'ombre.`, "");
  AN_SECTIONS.forEach((s, i) => l.push(`## ${i + 1}. ${s.t}`, s.q, ""));
  l.push(`## Verdict`, `Une seule option parmi « Entrer », « Attendre un meilleur prix » et « Écarter », suivie de deux ou trois phrases.`, "");
  l.push(`## Prix d'entrée`, `Un cours en ${x ? x.ccy : "devise de cotation"}, avec le raisonnement.`, "");
  l.push(`Sur les dirigeants, juge-les à leurs décisions passées et à leur intérêt personnel plutôt qu'à leurs discours. Sur les angles morts, fais l'avocat du diable : donne l'argument vendeur le plus solide, puis dis s'il tient.`);
  return l.join("\n");
}
async function anBrief(d, x){
  const data = await anDonnees(d.id);
  const txt = anBriefTexte(d, x, data);
  openModal("Brief pour Claude", `<p class="note">Copiez ce texte dans une nouvelle conversation avec Claude (le projet Patrimoine garde le contexte de vos placements). Claude cherchera les documents récents ; vous approfondirez ensemble, puis vous collerez sa réponse dans le dossier.</p>
    <textarea id="an-brief-txt" rows="16" readonly style="font:12px/1.45 ui-monospace,Menlo,monospace">${esc(txt)}</textarea>
    <p class="note">${nf0.format(txt.length)} caractères${data && data.erreur ? " · comptes indisponibles pour l'instant : le brief se limite aux données du classement" : ""}.</p>`, () => {
      const fin = () => { toast("Brief copié : collez-le dans la conversation"); window.open("https://claude.ai/new", "_blank", "noopener"); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(fin, () => { $("#an-brief-txt").select(); document.execCommand("copy"); fin(); });
      else { $("#an-brief-txt").select(); document.execCommand("copy"); fin(); }
      if (d.statut === "a_analyser"){ d.statut = "en_cours"; d.journal.push({date:new Date().toISOString(), statut:"en_cours", px:x ? x.px : null, ccy:x ? x.ccy : null, note:x ? noteProfil(x) : null, cat:x ? x.cat : null}); anSauver(d, true); setTimeout(renderDossier, 50); }
      return true;
    }, "Copier et ouvrir Claude");
}
/* Découpe la réponse de Claude selon ses titres « ## » */
function anParse(txt){
  const out = {sections:{}, verdict:null, prix:null, n:0};
  const parts = ("\n" + txt.replace(/\r/g, "")).split(/\n#{1,2}[ \t]+/);
  let dernier = null;
  for (const p of parts.slice(1)){
    const nl = p.indexOf("\n"), titre = (nl < 0 ? p : p.slice(0, nl)).replace(/[*_`#]/g, "").trim(), corps = (nl < 0 ? "" : p.slice(nl + 1)).trim();
    const t = anNorm(titre), num = (t.match(/^(\d{1,2})\s*[.)\-–:]/) || [])[1];
    let k = null;
    if (t.startsWith("verdict")) k = "verdict";
    else if (num && +num >= 1 && +num <= AN_SECTIONS.length) k = AN_SECTIONS[+num - 1].k;
    else if (t.includes("valorisation")) k = "valorisation";
    else if (t.startsWith("prix d")) k = "prix";
    else { const m = [["modele", "modele"], ["passif", "passif"], ["actif", "actifs"], ["dirigeant", "dirigeants"], ["decision", "decisions"], ["allocation", "decisions"], ["vision", "vision"], ["strategie", "vision"], ["angle", "angles"], ["these", "these"], ["invalidation", "invalidation"], ["sortie", "invalidation"]].find(([w]) => t.includes(w)); if (m) k = m[1]; }
    if (!k){ if (dernier && corps){ const cle = dernier === "prix" ? "_prix" : dernier; if (cle !== "verdict") out.sections[cle] = (out.sections[cle] || "") + `\n\n### ${titre}\n` + corps; } continue; }
    dernier = k;
    if (k === "verdict"){ const s = anNorm(titre.replace(/^verdict\s*[:\-–]?/i, "") + " " + corps.split("\n")[0]);
      const pos = [["entrer", s.search(/\bentrer\b/)], ["attendre", s.search(/\battendre\b/)], ["ecartee", s.search(/\becart/)]].filter(([, i]) => i >= 0).sort((a, b) => a[1] - b[1]);
      out.verdict = {st:pos.length ? pos[0][0] : null, txt:corps.replace(/[*_`]+/g, "").replace(/\s+/g, " ").slice(0, 600)}; out.n++; continue; }
    if (k === "prix"){ const m = corps.replace(/ | /g, " ").match(/(\d{1,3}(?:[ .]\d{3})+|\d+)(?:[,.](\d+))?/); if (m) out.prix = +(m[1].replace(/[ .]/g, "") + (m[2] ? "." + m[2] : "")); out.sections._prix = corps; out.n++; continue; }
    if (corps){ out.sections[k] = (out.sections[k] ? out.sections[k] + "\n\n" : "") + corps; out.n++; }
  }
  return out;
}
function anColler(d){
  openModal("Réponse de Claude", `<p class="note">Collez la réponse complète : chaque partie titrée « ## » rejoint la partie correspondante du dossier. Une partie déjà rédigée garde vos notes ; la réponse s'y ajoute à la suite.</p>
    <textarea id="an-rep" rows="14" placeholder="## 1. Modèle économique&#10;…"></textarea><p class="note" id="an-rep-msg"></p>`, () => {
      const txt = $("#an-rep").value; if (!txt.trim()){ $("#an-rep-msg").textContent = "Rien à importer."; return false; }
      const r = anParse(txt);
      if (!r.n){ $("#an-rep-msg").textContent = "Aucun titre reconnu : la réponse doit reprendre les titres « ## 1. Modèle économique », « ## 2. Actifs »… du brief."; return false; }
      const date = new Date().toLocaleDateString("fr-FR");
      for (const [k, v] of Object.entries(r.sections)){
        if (k === "_prix"){ const cur = (d.sections.valorisation || "").trim(); d.sections.valorisation = cur ? cur + `\n\n— Prix d'entrée selon Claude (${date}) —\n` + v : v; continue; }
        const cur = (d.sections[k] || "").trim(); d.sections[k] = cur && cur !== v.trim() ? cur + `\n\n— Analyse de Claude (${date}) —\n` + v : v;
      }
      if (r.verdict) d.verdictClaude = {...r.verdict, prix:r.prix, date:new Date().toISOString()};
      else if (ok(r.prix)) d.verdictClaude = {...(d.verdictClaude || {}), prix:r.prix};
      if (ok(r.prix) && !ok(d.prixEntree)) d.prixEntree = r.prix;
      d.claudeBrut = txt.slice(0, 200000);
      if (d.statut === "a_analyser") d.statut = "en_cours";
      anSauver(d, true); toast(`${r.n} partie${r.n > 1 ? "s" : ""} importée${r.n > 1 ? "s" : ""}`); setTimeout(renderDossier, 50);
      return true;
    }, "Importer dans le dossier");
}
