/* ================= Comparateur net d'impôt ================= */
const CMP = {M:20000, T:10, tol:100, R:55000, parts:7, infl:"installee", hyp:"valo", apea:0, aav:0, fav:.5, adultes:2, enfants:6,
  real:true, fam:new Set(Object.keys(FAM)), sort:{k:"rReel", dir:-1}, sel:"monde", projet:null};
const PROJETS = [
  {id:"treso", l:"Trésorerie et précaution", T:1, tol:0},
  {id:"extension", l:"Extension de la longère", T:2, tol:2},
  {id:"maison", l:"Maison de famille", T:4, tol:10},
  {id:"etudes", l:"Études des enfants", T:8, tol:20},
  {id:"revenus", l:"Revenus récurrents", T:20, tol:35}
];
const FORM_IDS = {M:"f-montant", T:"f-horizon", tol:"f-tol", R:"f-revenu", parts:"f-parts", infl:"f-infl", hyp:"f-hyp", apea:"f-apea", aav:"f-aav", fav:"f-fav", adultes:"f-ad", enfants:"f-enf"};
function ctx(){
  const T = clamp(Math.round(CMP.T) || 1, 1, 30);
  return {T, M:Math.max(100, CMP.M || 0), R:Math.max(0, CMP.R || 0), parts:Math.max(1, CMP.parts || 1), apea:CMP.apea || 0, aav:CMP.aav || 0, fav:CMP.fav ?? .5,
    adultes:clamp(CMP.adultes || 1, 1, 2), enfants:Math.max(0, CMP.enfants || 0), hyp:CMP.hyp, real:CMP.real,
    inflSeq:Array.from({length:T}, (_, t) => INFL_PATHS[CMP.infl].f(t))};
}
function initComparateur(){
  $("#f-infl").innerHTML = Object.entries(INFL_PATHS).map(([k, v]) => `<option value="${k}">${esc(v.l)}</option>`).join("");
  for (const [k, id] of Object.entries(FORM_IDS)){
    const el = $("#" + id); el.value = CMP[k];
    el.addEventListener("input", () => {
      CMP[k] = el.tagName === "SELECT" && !["tol"].includes(k) ? el.value : +el.value;
      if (k === "T" || k === "tol") { CMP.projet = null; renderProjets(); }
      renderComparateur(); saveFoyer();
    });
  }
  $$("#cmp-real button").forEach(b => b.onclick = () => { CMP.real = b.dataset.real === "1"; $$("#cmp-real button").forEach(x => x.setAttribute("aria-pressed", x === b)); renderComparateur(); });
  renderProjets();
}
function renderProjets(){
  $("#projets").innerHTML = PROJETS.map(p => `<button class="chip" data-p="${p.id}" aria-pressed="${CMP.projet === p.id}">${esc(p.l)} · ${p.T} an${p.T > 1 ? "s" : ""}</button>`).join("");
  $$("#projets button").forEach(b => b.onclick = () => {
    const p = PROJETS.find(x => x.id === b.dataset.p);
    CMP.projet = CMP.projet === p.id ? null : p.id;
    if (CMP.projet){ CMP.T = p.T; CMP.tol = p.tol; $("#f-horizon").value = p.T; $("#f-tol").value = p.tol; }
    renderProjets(); renderComparateur(); saveFoyer();
  });
}
function applyFoyer(f){
  if (!f) return;
  for (const k of ["R","parts","apea","aav","fav","adultes","enfants","infl","hyp","M","T","tol"]) if (f[k] !== undefined && f[k] !== null){ CMP[k] = f[k]; const el = $("#" + FORM_IDS[k]); if (el) el.value = f[k]; }
}
function saveFoyer(){ if (typeof B !== "undefined" && B.etat === "pret") refreshMuEtf(); clearTimeout(saveFoyer.t); saveFoyer.t = setTimeout(() => Store.save("foyer", {R:CMP.R, parts:CMP.parts, apea:CMP.apea, aav:CMP.aav, fav:CMP.fav, adultes:CMP.adultes, enfants:CMP.enfants, infl:CMP.infl, hyp:CMP.hyp, M:CMP.M, T:CMP.T, tol:CMP.tol}), 800); }
let CMP_ROWS = [];
function renderComparateur(){
  const X = ctx();
  // Synthèse fiscale
  const imp = impot(X.R, X.parts), tmi = tmiEff(X.R, X.parts), lep = X.R <= plafondLEP(X.parts);
  $("#cmp-fisc").innerHTML = `<span>Impôt du foyer <b>${F.eur(imp)}</b></span><span>Taux marginal effectif <b>${nf0.format(tmi*100)} %</b></span>
    <span>Option pour le barème <b>${tmi < .128 ? "avantageuse" : "sans intérêt"}</b></span><span>LEP <b>${lep ? "accessible" : "hors plafond"}</b></span>`;
  // Résultats
  CMP_ROWS = PL.map(p => evaluate(p, X));
  for (const s of CMP_ROWS){
    s.reasons = [];
    if (s.elig !== true) s.reasons.push(s.elig);
    if (s.over) s.reasons.push(`Montant au-delà du plafond du foyer (${F.eur(s.plaf)})`);
    if (CMP.tol < 100 && s.pLoss > CMP.tol + 1e-9) s.reasons.push(`Probabilité de perte de ${nf0.format(s.pLoss)} %, au-delà de la limite choisie`);
    s.out = s.reasons.length > 0;
    s.kV = X.real ? s.Vr : s.V; s.kR = X.real ? s.rReel : s.rNet;
  }
  // Familles
  $("#cmp-fam").innerHTML = Object.entries(FAM).map(([k, f]) => `<button class="chip" data-f="${k}" aria-pressed="${CMP.fam.has(k)}"><span class="dot" style="background:var(${f.c})"></span>${esc(f.l)}</button>`).join("");
  $$("#cmp-fam button").forEach(b => b.onclick = () => { const k = b.dataset.f; CMP.fam.has(k) ? CMP.fam.delete(k) : CMP.fam.add(k); renderComparateur(); });
  const rows = CMP_ROWS.filter(s => CMP.fam.has(s.p.fam));
  // Nuage
  const inTol = rows.filter(s => !s.out).sort((a,b) => b.kR - a.kR);
  const labelSet = new Set(inTol.slice(0, 9).map(s => s.p.id).concat([CMP.sel]));
  scatter($("#cmp-scatter"), rows.map(s => ({x:s.pLoss, y:s.kR, id:s.p.id, label:s.p.nom, color:css(FAM[s.p.fam].c), faded:s.out, sel:s.p.id === CMP.sel, showLabel:labelSet.has(s.p.id),
    title:`${s.p.nom} · ${ENV_L[s.env]} · ${nf1.format(s.kR)} % par an · perte possible : ${nf0.format(s.pLoss)} %`})),
    {h:320, xLabel:`Probabilité de finir sous la mise au bout de ${X.T} an${X.T > 1 ? "s" : ""}`, yLabel:`Rendement net annuel ${X.real ? "en euros d'aujourd'hui" : "nominal"}`, onClick:p => { CMP.sel = p.id; renderComparateur(); }});
  const best = inTol[0];
  $("#cmp-scnote").innerHTML = best ? `Dans votre limite de risque, <b>${esc(best.p.nom)}</b> en ${esc(ENV_L[best.env].toLowerCase())} rapporte le plus : ${nf1.format(best.kR)} % par an ${X.real ? "après inflation" : "nominal"}, soit ${F.eur(best.kV)} pour ${F.eur(X.M)} placés. Les points pâles dépassent la limite de perte, un plafond ou une condition d'accès.` : "Aucun placement ne tient dans la limite de perte choisie : élargissez-la ou raccourcissez l'horizon.";
  // Tableau
  const cols = [
    {k:"nom", l:"Placement"}, {k:"env", l:"Enveloppe"}, {k:"r", l:"Brut attendu"}, {k:"rNet", l:"Net par an"}, {k:"rReel", l:"Net réel par an"},
    {k:"kV", l:X.real ? "Capital final (€ d'auj.)" : "Capital final"}, {k:"band", l:"Fourchette 90 %"}, {k:"pLoss", l:"Perte possible"}, {k:"dd", l:"Pire baisse passée"}];
  const sk = CMP.sort.k, dir = CMP.sort.dir;
  const sorted = rows.slice().sort((a,b) => {
    const va = sk === "nom" ? a.p.nom : sk === "env" ? a.env : sk === "band" ? a.p5 : a[sk], vb = sk === "nom" ? b.p.nom : sk === "env" ? b.env : sk === "band" ? b.p5 : b[sk];
    if (a.out !== b.out) return a.out ? 1 : -1;
    return (typeof va === "string" ? va.localeCompare(vb, "fr") : va - vb) * dir;
  });
  $("#cmp-table").innerHTML = `<thead><tr>${cols.map(c => `<th data-k="${c.k}" aria-sort="${c.k === sk ? (dir < 0 ? "descending" : "ascending") : "none"}">${esc(c.l)}</th>`).join("")}</tr></thead><tbody>${sorted.map(s => {
    const lo = X.real ? s.p5r : s.p5, hi = X.real ? s.p95r : s.p95;
    return `<tr data-id="${s.p.id}" class="${s.p.id === CMP.sel ? "on" : ""} ${s.out ? "out" : ""}" title="${esc(s.reasons.join(" · "))}">
      <td><span class="nm"><span class="dot" style="background:var(${FAM[s.p.fam].c})"></span>${esc(s.p.nom)}${s.p.piege ? ' <span class="pill warn" style="font-size:10px;padding:0 6px">piège possible</span>' : ""}</span><span class="fm">${esc(FAM[s.p.fam].l)}${s.reasons.length ? " · " + esc(s.reasons[0]) : ""}</span></td>
      <td><span class="env ${s.env}">${esc(ENV_L[s.env])}</span></td>
      <td>${nf2.format(s.r)} %</td><td>${nf2.format(s.rNet)} %</td><td class="${s.rReel < 0 ? "neg" : ""}" style="color:${s.rReel < 0 ? "var(--bad)" : "inherit"}">${nf2.format(s.rReel)} %</td>
      <td>${F.eur(s.kV)}</td><td>${lo === hi ? "—" : F.eur(lo) + " – " + F.eur(hi)}</td><td>${nf0.format(s.pLoss)} %</td><td style="font-family:var(--body);font-size:12px;white-space:normal;min-width:150px;text-align:left">${esc(s.p.dd)}</td></tr>`;
  }).join("")}</tbody>`;
  $$("#cmp-table th").forEach(th => th.onclick = () => { const k = th.dataset.k; CMP.sort = {k, dir: CMP.sort.k === k ? -CMP.sort.dir : (k === "nom" || k === "env" || k === "pLoss" ? 1 : -1)}; renderComparateur(); });
  $$("#cmp-table tbody tr").forEach(tr => tr.onclick = () => { CMP.sel = tr.dataset.id; renderComparateur(); $("#cmp-detail").scrollIntoView({behavior:"smooth", block:"nearest"}); });
  renderDetail(X);
}
function renderDetail(X){
  const s = CMP_ROWS.find(r => r.p.id === CMP.sel) || CMP_ROWS[0]; if (!s) return;
  const p = s.p, el = $("#cmp-detail");
  const envRows = s.all.map(e => `<tr><td><span class="env ${e.env}">${esc(ENV_L[e.env])}</span><span class="cmp">${esc(e.mode)}</span></td><td class="n">${F.eur(X.real ? e.Vr : e.V)}</td><td class="n">${F.eur(e.ps)}</td><td class="n">${F.eur(e.ir)}</td><td class="n">${F.eur(e.frais)}</td></tr>`).join("");
  el.innerHTML = `
    <div class="btnrow" style="justify-content:space-between"><h2>${esc(p.nom)}</h2><div class="btnrow"><button class="ghost small" id="d-suivre">Suivre</button><button class="ghost small" id="d-journal">Noter une décision</button></div></div>
    <div class="det">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="kpis">${kpi("Net par an " + (X.real ? "en euros d'aujourd'hui" : "nominal"), nf2.format(s.kR) + " %", "enveloppe : " + esc(ENV_L[s.env]))}${kpi("Capital au bout de " + X.T + " an" + (X.T > 1 ? "s" : ""), F.eur(s.kV), "pour " + F.eur(X.M) + " placés")}</div>
        <div style="overflow-x:auto"><table class="t" style="min-width:360px"><thead><tr><th>Enveloppe</th><th class="n">Capital final</th><th class="n">Prél. sociaux</th><th class="n">Impôt</th><th class="n">Frais</th></tr></thead><tbody>${envRows}</tbody></table></div>
        <table class="t">
          <tr><td>Rendement brut attendu</td><td>${nf2.format(s.r)} %</td></tr>
          <tr><td>Frais annuels (produit${s.env === "av" && p.nat !== "fe" ? " et contrat" : ""})</td><td>${nf2.format(s.r - s.g)} %</td></tr>
          <tr><td>Liquidité</td><td class="l" style="text-align:right">${esc(p.liq)}</td></tr>
          ${p.isin ? `<tr><td>Code ISIN</td><td class="l" style="text-align:right;font-family:var(--mono);font-size:12px">${esc(p.isin)}</td></tr>` : ""}
        </table>
        <p class="note"><b>Source et hypothèse.</b> ${esc(p.src)}${p.note ? " " + esc(p.note) : ""}</p>
        ${s.reasons.length ? `<div class="callout">${s.reasons.map(esc).join(" · ")}</div>` : ""}
      </div>
      <div><h3>Trajectoire ${X.real ? "en euros d'aujourd'hui" : "nominale"}, médiane et fourchette 90 %</h3><div class="chart" id="d-chart"></div>
        <p class="note">Ligne pointillée : Livret A sur la même durée. Une fourchette nulle signale un rendement connu à l'avance (livret, obligation conservée jusqu'au terme).</p></div>
    </div>`;
  const tr = trajectory(p, s.env, X), ref = trajectory(PLI.livretA, "livret", X);
  const pts = [[0, X.M]].concat(tr.map(d => [d.t, d.v])), band = [[0, X.M, X.M]].concat(tr.map(d => [d.t, d.lo, d.hi]));
  lineChart($("#d-chart"), [
    {pts:[[0, X.M]].concat(ref.map(d => [d.t, d.v])), color:css("--muted"), dash:"4 4", w:1.5, endLabel:"Livret A"},
    {pts, band, color:css(FAM[p.fam].c), endLabel:F.eur(pts[pts.length-1][1])}
  ], {h:230, yFmt:v => nf0.format(v/1000) + " k€", xFmt:v => v + " a", xTicks:Math.min(X.T, 8), r:70, label:"Trajectoire " + p.nom});
  $("#d-suivre").onclick = () => addWatch({type:"placement", id:p.id});
  $("#d-journal").onclick = () => openJournalModal({placement:p.id, env:s.env, montant:X.M});
}
