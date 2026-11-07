/* ================= Données de marché : actions, ETF, rendements hebdomadaires en euros ================= */
const B = {etat:"attente", meta:null, A:[], E:[], byId:new Map(), dates:[], R:new Map(), usd:null, chocs:{}, statut:null};
const STY = {v:"Value", g:"Croissance", q:"Qualité", m:"Momentum", d:"Défensive", y:"Rendement", s:"Petites et moyennes"};
const STY_C = {v:"--c4", g:"--c3", q:"--c1", m:"--c2", d:"--c5", y:"--c6", s:"--muted"};
const STY_EXPL = {
  v:"Rendement bénéficiaire (inverse du PER prévisionnel), cours rapporté aux fonds propres, valeur d'entreprise rapportée à l'excédent brut d'exploitation, dividende, flux de trésorerie disponible. Moitié classement dans l'univers, moitié dans le secteur.",
  g:"Croissance du chiffre d'affaires et du bénéfice sur un an, croissance attendue par les analystes à un et cinq ans.",
  q:"Rentabilité des fonds propres, marge opérationnelle, marge brute, endettement net rapporté à l'excédent brut d'exploitation.",
  m:"Performance sur douze mois hors dernier mois, révision des bénéfices attendus sur trois mois.",
  d:"Volatilité sur trois ans et sensibilité au marché mondial (bêta) : plus elles sont basses, plus la note est haute.",
  y:"Rendement du dividende, réduit des deux tiers quand il dépasse les bénéfices ou le flux de trésorerie.",
  s:"Capitalisation boursière : les plus petites obtiennent la note la plus haute."
};
const CATS = ["Croissance à prix raisonnable","Qualité et croissance","Croissance","Qualité","Value","Momentum","Défensive","Rendement","Redressement","Profil équilibré"];
const CAT_C = {"Croissance à prix raisonnable":"--c5","Qualité et croissance":"--c1","Croissance":"--c3","Qualité":"--c1","Value":"--c4","Momentum":"--c2","Défensive":"--c5","Rendement":"--c6","Redressement":"--c2","Profil équilibré":"--muted"};
const CLS_L = {act_monde:"Actions monde", act_us:"Actions États-Unis", act_eu:"Actions Europe", act_jp:"Actions Japon", act_em:"Actions émergentes", act_style:"Actions, facteur de style",
  act_theme:"Actions thématiques", monetaire:"Monétaire", etat:"Obligations d'État euro", credit:"Obligations d'entreprise euro", monde_oblig:"Obligations hors euro", or:"Or", immo_cote:"Immobilier coté", action:"Action"};
const POCHE = {act_monde:"actions", act_us:"actions", act_eu:"actions", act_jp:"actions", act_em:"actions", act_style:"actions", act_theme:"actions", action:"actions",
  monetaire:"monetaire", etat:"obligations", credit:"obligations", monde_oblig:"obligations", or:"or", immo_cote:"actions"};
const POCHE_L = {actions:"Actions", obligations:"Obligations", monetaire:"Monétaire", or:"Or"};
/* Écart de rendement attendu des ETF de style et thématiques face à leur marché (hypothèses prudentes, en points) */
const ETF_ADJ = {"IS3S.DE":.7, "IQQ0.DE":-.4, "ZPRV.DE":1, "ZPRX.DE":1, "IS3Q.DE":-.2, "XAIX.DE":-1, "2B76.DE":-1, "VVSM.DE":-1.5, "IQQH.DE":-.5, "USPY.DE":-1, "DFEN.DE":-1.2};
const themeL = k => (B.meta && B.meta.themes && B.meta.themes[k]) || k;

/* Rendement réel attendu d'un ETF (% par an, avant impôt) : catalogue de l'atlas, net de l'inflation et des frais */
function muEtf(e){
  const X = ctx(), pl = e.pl && PLI[e.pl];
  let nomPct;
  if (pl) nomPct = pl.r(X);
  else nomPct = nominal(basketEY(W_EUROPE) - .5, X);   // immobilier coté européen
  const reel = ((1 + nomPct/100) / (1 + avgInfl(X)/100) - 1) * 100;
  return reel - (e.ter || 0) + (ETF_ADJ[e.id] || 0);
}
function decodeR(a){ const out = new Float64Array(a.length); for (let i = 0; i < a.length; i++) out[i] = a[i] === null ? NaN : a[i] * 1e-4; return out; }

async function loadBourse(){
  const get = q => fetch("/bourse/api/donnees?quoi=" + q, {credentials:"same-origin", cache:"no-store"}).then(r => { if (r.status === 401) { location.href = "/admin?suite=/bourse"; throw new Error("401"); } if (!r.ok) throw new Error(r.status); return r.json(); });
  try {
    const [a, r] = await Promise.all([get("actions"), get("rets")]);
    if (a.vide || r.vide){
      B.etat = "vide";
      try { B.statut = await get("statut"); } catch(e){}
    } else {
      B.meta = a.meta; B.A = a.actions; B.E = a.etf; B.chocs = a.chocs || {};
      B.dates = r.dates; B.R.clear();
      for (const [k, v] of Object.entries(r.r)) B.R.set(k, decodeR(v));
      B.usd = r.f && r.f.usd ? decodeR(r.f.usd) : null;
      for (const x of B.A){ x.kind = "action"; x.cls = "action"; x.mu = x.muR; B.byId.set(x.id, x); }
      for (const e of B.E){ e.kind = "etf"; e.mu = muEtf(e); e.zone = e.cls === "act_us" ? "us" : e.cls === "act_eu" ? "eu" : "monde"; B.byId.set(e.id, e); }
      B.etat = "pret";
    }
  } catch(e){
    if (B.etat !== "vide") B.etat = "erreur";
    console.error(e);
  }
  $("#b-date").textContent = B.etat === "pret" ? `${nf0.format(B.A.length)} actions et ${B.E.length} ETF · cours au ${new Date(B.meta.fin).toLocaleDateString("fr-FR", {day:"numeric", month:"long", year:"numeric"})}` : "";
  if (["actions","ruptures","portefeuille","constructeur","suivi"].includes(CUR)) go(CUR, false);
}
/* Rafraîchit les rendements attendus des ETF quand le foyer (inflation, hypothèse) change */
function refreshMuEtf(){ for (const e of B.E) e.mu = muEtf(e); }

/* Message d'attente commun aux vues qui dépendent de la collecte */
function bourseWait(el){
  if (B.etat === "pret") return false;
  const st = B.statut;
  const msg = B.etat === "attente" ? "Chargement des cours et des comptes des sociétés…"
    : B.etat === "vide" ? `La première collecte des cours est en cours : chaque passage quotidien relève plusieurs centaines de titres, puis recalcule classements et rendements.${st && st.etat ? " État actuel : " + st.etat.map(e => `${e.type} ${e.releves}/${e.n}`).join(" · ") + "." : ""}`
    : "Les données de marché n'ont pas pu être chargées. Rechargez la page dans un instant.";
  el.innerHTML = `<div class="card"><p class="empty">${esc(msg)}</p></div>`;
  return true;
}

/* Petits éléments d'affichage partagés */
const cssV = k => css(k);
const pctS = v => fmt(v, F.pctS), pct1 = v => fmt(v, F.pct);
const mdE = v => ok(v) ? (v >= 100 ? nf0.format(v) : v >= 10 ? nf1.format(v) : nf2.format(v)) + " Md€" : "—";
const meur = v => ok(v) ? (v >= 100 ? nf0.format(v) : nf1.format(v)) + " M€" : "—";
function scoreCell(v, k){ if (!ok(v)) return `<td class="sc">—</td>`; return `<td class="sc" title="${esc(STY[k])} : ${nf0.format(v)} / 100"><i style="--w:${v}%;--c:var(${STY_C[k]})"></i><span>${nf0.format(v)}</span></td>`; }
function catPill(c){ return `<span class="pill cat" style="color:var(${CAT_C[c] || "--muted"})">${esc(c)}</span>`; }
const THEME_C = {ia:"IA", robot:"Robotique", defense:"Défense", energie:"Électricité", chine:"Chine", douane:"Douanes"};
function themePills(th, small){
  return Object.entries(th || {}).sort((a, b) => b[1] - a[1]).map(([k, v]) => { const a = v > 0 ? "▲" : "▼";
    return `<span class="pill ${v > 0 ? "good" : "bad"}${small ? " xs" : ""}" title="${esc(themeL(k))} : ${v > 0 ? "gagnant" : "menacé"}${Math.abs(v) === 2 ? " direct" : " indirect"}">${Math.abs(v) === 2 ? a + a : a} ${esc(THEME_C[k] || k)}</span>`; }).join("");
}
function piegePills(pg){ return (pg || []).map(([t, d]) => `<span class="pill warn xs" title="${esc(d)}">${esc(t)}</span>`).join(""); }
function assetLabel(x){ return x.kind === "etf" ? `${esc(x.id)} · ${esc(CLS_L[x.cls])}${x.pea ? " · PEA" : ""}` : `${esc(x.id)} · ${esc(x.pays || "")} · ${esc(x.secteur || "")}`; }
/* Recherche dans les actions et les ETF */
function searchAssets(q, n = 12, filtre){
  q = q.trim().toLowerCase(); if (!q) return [];
  const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const qq = norm(q);
  const all = B.E.concat(B.A).filter(x => !filtre || filtre(x));
  const sc = x => { const id = x.id.toLowerCase(), nm = norm(x.nom); if (id === qq || id.split(".")[0] === qq) return 0; if (nm.startsWith(qq) || id.startsWith(qq)) return 1; if (nm.includes(qq) || (x.isin || "").toLowerCase() === qq) return 2; return 9; };
  return all.map(x => [sc(x), x]).filter(([s]) => s < 9).sort((a, b) => a[0] - b[0] || (b[1].mcap || b[1].aum || 0) - (a[1].mcap || a[1].aum || 0)).slice(0, n).map(([, x]) => x);
}
function attachSearch(input, box, onPick, filtre){
  let cur = [], k = -1;
  const draw = () => { box.hidden = !cur.length; input.setAttribute("aria-expanded", cur.length > 0);
    box.innerHTML = cur.map((x, i) => `<button type="button" role="option" data-i="${i}" class="${i === k ? "on" : ""}"><span>${esc(x.nom)}</span><small>${assetLabel(x)}</small></button>`).join("");
    box.querySelectorAll("button").forEach(b => b.onmousedown = e => { e.preventDefault(); pick(+b.dataset.i); }); };
  const pick = i => { const x = cur[i]; if (!x) return; input.value = ""; cur = []; draw(); onPick(x); };
  input.oninput = () => { cur = searchAssets(input.value, 12, filtre); k = cur.length ? 0 : -1; draw(); };
  input.onkeydown = e => { if (e.key === "ArrowDown"){ k = Math.min(cur.length - 1, k + 1); draw(); e.preventDefault(); } else if (e.key === "ArrowUp"){ k = Math.max(0, k - 1); draw(); e.preventDefault(); } else if (e.key === "Enter"){ if (k >= 0){ pick(k); e.preventDefault(); } } else if (e.key === "Escape"){ cur = []; draw(); } };
  input.onblur = () => setTimeout(() => { cur = []; draw(); }, 120);
}
/* Courbe de valeur en euros d'un titre (base 100), éventuellement face à l'ETF Monde */
function valuePath(id){ const r = B.R.get(id); if (!r) return []; let v = 100, started = false; const pts = [];
  for (let i = 0; i < r.length; i++){ if (!started && !(r[i] === r[i])) continue; started = true; v *= 1 + (r[i] === r[i] ? r[i] : 0); pts.push([new Date(B.dates[i]), v]); } return pts; }
