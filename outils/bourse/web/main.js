/* ================= Navigation et démarrage ================= */
const VIEWS = ["carte","actions","ruptures","portefeuille","constructeur","comparateur","taux","suivi","methode"];
let CUR = "carte";
function go(v, push = true){
  if (!VIEWS.includes(v)) v = "carte";
  CUR = v;
  for (const x of VIEWS) $("#view-" + x).hidden = x !== v;
  $$(".views button").forEach(b => b.setAttribute("aria-pressed", b.dataset.view === v));
  if (push && location.hash !== "#" + v) history.replaceState(null, "", "#" + v);
  if (!D) return;
  if (v === "carte") drawMap();
  if (v === "actions") renderActions();
  if (v === "ruptures") renderRuptures();
  if (v === "portefeuille") renderPortefeuille();
  if (v === "constructeur") renderConstructeur();
  if (v === "comparateur") renderComparateur();
  if (v === "taux") renderTaux();
  if (v === "suivi") renderSuivi();
  if (v === "methode") renderMethode();
}
$$(".views button").forEach(b => b.onclick = () => go(b.dataset.view));
window.addEventListener("hashchange", () => go(location.hash.slice(1), false));
$$(".tabs button").forEach(b => b.onclick = () => { MAP.tab = b.dataset.tab; renderPanel(); });
$$("#grp button").forEach(b => b.onclick = () => setGroup(b.dataset.g));
$("#ind").addEventListener("input", e => setIndicator(e.target.value));
$("#zone").addEventListener("input", e => { MAP.zone = e.target.value; drawMap(); });
$("#hatch").addEventListener("input", drawMap);
$("#m-close").onclick = closeModal; $("#m-cancel").onclick = closeModal;
$("#f-close").onclick = closeFiche;
$("#fiche").addEventListener("click", e => { if (e.target.id === "fiche") closeFiche(); });
$("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
document.addEventListener("keydown", e => { if (e.key !== "Escape") return; if (!$("#modal").hidden) closeModal(); else if (!$("#fiche").hidden) closeFiche(); });
$("#m-form").addEventListener("submit", e => { e.preventDefault(); if (modalSubmit && modalSubmit() !== false) closeModal(); });
let rsT, rsW = window.innerWidth; window.addEventListener("resize", () => { if (Math.abs(window.innerWidth - rsW) < 40) return; rsW = window.innerWidth; clearTimeout(rsT); rsT = setTimeout(() => { if (CUR === "comparateur") renderComparateur(); if (CUR === "taux") renderTaux(); if (CUR === "carte" && MAP.sel) renderPanel(); if (CUR === "portefeuille") renderPortefeuille(); }, 200); });
if (window.matchMedia) window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => go(CUR, false));
new MutationObserver(() => go(CUR, false)).observe(document.documentElement, {attributes:true, attributeFilter:["data-theme"]});

(async function start(){
  try {
    const data = JSON.parse($("#atlas-data").textContent), world = JSON.parse($("#monde-data").textContent);
    D = data; P = D.pays; U = Object.values(P).filter(c => !c.hors);
    derive();
    $("#cover").textContent = `Actions et obligations de ${U.length} marchés · données de l'atlas au ${new Date(D.meta.date).toLocaleDateString("fr-FR", {day:"numeric", month:"long", year:"numeric"})}`;
    $("#foot").innerHTML = `Sources : Yahoo Finance (cours, comptes et prévisions des sociétés, collecte quotidienne), Siblis Research, World PE Ratio, Damodaran, Trading Economics, BCE, FRED, BlackRock ; fiscalité 2026. Détail et formules dans l'onglet Méthode. Outil d'aide à la décision : il décrit et calcule, la décision vous appartient.`;
    initMap(world); initSearch(); initComparateur();
    setGroup("Actions");
    selectCountry("FR");
    Store.init(() => { applyFoyer(Store.data.foyer); applyPrefs(Store.data.preferences); applyConstructeur(Store.data.constructeur); if (B.etat === "pret") refreshMuEtf(); renderSuiviCount(); if (CUR !== "carte") go(CUR, false); });
    go(location.hash.slice(1) || "actions", false);
    loadBourse();
  } catch(e){
    $("#loading").textContent = "Les données de l'atlas n'ont pas pu être chargées. Rechargez la page.";
    console.error(e);
  }
})();
