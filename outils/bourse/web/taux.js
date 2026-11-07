/* ================= Taux euro ================= */
const CRV = {on:new Set(["FR","DE","IT","ES","US"]), em:"FR", mat:10, montant:20000};
const CRV_COL = {FR:"--c1", DE:"--c5", IT:"--c2", ES:"--c4", US:"--c3"};
function renderTaux(){
  // Légende cliquable
  $("#crv-leg").innerHTML = Object.entries(D.courbes).map(([k, v]) => `<button data-k="${k}" aria-pressed="${CRV.on.has(k)}"><i style="background:var(${CRV_COL[k]})"></i>${esc(v.nom)}</button>`).join("");
  $$("#crv-leg button").forEach(b => b.onclick = () => { const k = b.dataset.k; CRV.on.has(k) ? CRV.on.delete(k) : CRV.on.add(k); if (!CRV.on.size) CRV.on.add("FR"); renderTaux(); });
  lineChart($("#crv-chart"), [...CRV.on].map(k => ({pts:D.courbes[k].pts, color:css(CRV_COL[k]), endLabel:k})), {h:250, xFmt:v => v + " a", yFmt:v => nf1.format(v) + " %", xTicks:8, label:"Courbes des taux"});
  const mats = [2, 5, 10, 30];
  $("#crv-table").innerHTML = `<thead><tr><th>Échéance</th>${Object.keys(D.courbes).map(k => `<th class="n">${k}</th>`).join("")}<th class="n">France − Allemagne</th></tr></thead><tbody>${mats.map(m => `<tr><td>${m} ans</td>${Object.keys(D.courbes).map(k => `<td class="n">${nf2.format(curveAt(k, m))} %</td>`).join("")}<td class="n">${F.pb((curveAt("FR", m) - curveAt("DE", m)) * 100)}</td></tr>`).join("")}</tbody>`;
  renderObligCalc(); renderCredit(); renderMonetaire(); renderAgenda();
}
function renderObligCalc(){
  const el = $("#oblig-calc");
  if (!el.dataset.init){
    el.dataset.init = 1;
    el.innerHTML = `<h2>Obligation conservée jusqu'à l'échéance</h2>
      <div class="form">
        <label for="oc-em">Émetteur<select id="oc-em">${Object.entries(D.courbes).map(([k, v]) => `<option value="${k}">${esc(v.nom)}</option>`).join("")}</select></label>
        <label for="oc-mat">Échéance (ans)<input id="oc-mat" type="number" min="1" max="30" step="1" value="${CRV.mat}"></label>
        <label for="oc-m" class="wide">Montant (€)<input id="oc-m" type="number" min="1000" step="1000" value="${CRV.montant}"></label>
      </div><div id="oc-out" style="display:flex;flex-direction:column;gap:12px"></div>`;
    $("#oc-em").value = CRV.em;
    $("#oc-em").oninput = e => { CRV.em = e.target.value; renderObligCalc(); };
    $("#oc-mat").oninput = e => { CRV.mat = clamp(+e.target.value || 1, 1, 30); renderObligCalc(); };
    $("#oc-m").oninput = e => { CRV.montant = Math.max(1000, +e.target.value || 0); renderObligCalc(); };
  }
  const T = CRV.mat, y = curveAt(CRV.em, T), M = CRV.montant, X = {...ctx(), T, M, inflSeq:Array.from({length:T}, (_, t) => INFL_PATHS[CMP.infl].f(t))};
  const usd = CRV.em === "US";
  const coup = M * y / 100, irB = irCapital(coup, X, PFU_IR), psA = coup * PS.cto, netA = coup - psA - irB.best;
  const p = {nat:"coupon", r:() => usd ? y - COUV_USD : y, vol:0, envs:["cto"]};
  const s = simulate(p, "cto", X);
  // Sensibilité : obligation au pair, durée modifiée
  const yy = y / 100, mac = (1 + yy) / yy * (1 - Math.pow(1 + yy, -T)), dmod = mac / (1 + yy);
  const price = dy => { const r = yy + dy/100; let pv = 0; for (let t = 1; t <= T; t++) pv += yy / Math.pow(1 + r, t); pv += 1 / Math.pow(1 + r, T); return (pv - 1) * 100; };
  const la = simulate(PLI.livretA, "livret", X), fe = simulate(PLI.feMoy, "av", X);
  $("#oc-out").innerHTML = `
    <div class="kpis k3">${kpi("Taux à l'échéance", nf2.format(y) + " %", usd ? "en dollars" : "fixé à l'achat")}${kpi("Coupon net par an", F.eur(netA), irB.mode === "barème" ? "barème plus favorable" : "prélèvement forfaitaire")}${kpi("Net réel par an", nf2.format(s.rReel) + " %", "chemin d'inflation du comparateur")}</div>
    ${usd ? `<div class="callout">Pour un épargnant en euros, le Treasury se compare couvert du risque de change : ${nf2.format(y)} % moins ${nf2.format(COUV_USD)} point de couverture, soit ${nf2.format(y - COUV_USD)} %.</div>` : ""}
    <table class="t">
      <tr><td>Capital et coupons réinvestis au bout de ${T} an${T > 1 ? "s" : ""}</td><td>${F.eur(s.V)}</td></tr>
      <tr><td>En euros d'aujourd'hui</td><td>${F.eur(s.Vr)}</td></tr>
      <tr><td>Même somme sur le Livret A</td><td>${F.eur(la.V)}<span class="cmp">${F.eur(s.V - la.V)} d'écart</span></td></tr>
      <tr><td>Même somme sur un fonds euros moyen</td><td>${F.eur(fe.V)}<span class="cmp">${F.eur(s.V - fe.V)} d'écart</span></td></tr>
      <tr><td>Durée modifiée</td><td>${nf1.format(dmod)}</td></tr>
    </table>
    <div><h3>Si vous revendez avant l'échéance</h3><table class="t"><thead><tr><th>Mouvement des taux juste après l'achat</th><th class="n">Prix de revente</th></tr></thead><tbody>
      ${[-1, 1, 2].map(d => `<tr><td>${d > 0 ? "Hausse" : "Baisse"} de ${Math.abs(d)} point${Math.abs(d) > 1 ? "s" : ""}</td><td class="n" style="color:${price(d) < 0 ? "var(--bad)" : "var(--good)"}">${F.pctS(price(d))}</td></tr>`).join("")}</tbody></table>
      <p class="note">Conservée jusqu'au terme, l'obligation rembourse sa valeur nominale quel que soit le chemin des taux : le risque se limite alors au défaut de l'émetteur et à l'inflation.</p></div>`;
}
function renderCredit(){
  const oas = 3.45, rec = .4, brk = oas / (1 - rec);
  $("#credit").innerHTML = `<h2>Crédit d'entreprise en euros</h2>
    <div class="kpis">${kpi("Qualité (investment grade)", "4,13 %", "durée 4,4 ans · iShares € Corp Bond, 5 nov.")}${kpi("Haut rendement", "6,58 %", "ICE BofA Euro High Yield, 4 nov.")}</div>
    <table class="t">
      <tr><td>Écart du haut rendement sur les emprunts d'État</td><td>3,45 pt</td></tr>
      <tr><td>Défauts annuels couverts par cet écart (40 % récupérés)</td><td>${nf1.format(brk)} %</td></tr>
      <tr><td>Défauts observés à l'été 2026</td><td>≈ 1,8 %</td></tr>
      <tr><td>Écart crédit de qualité moins Bund 5 ans</td><td>${F.pb((4.13 - curveAt("DE", 4.4)) * 100)}</td></tr>
    </table>
    <p class="note">Tant que les défauts restent sous ${nf1.format(brk)} % par an, le haut rendement rapporte plus que les emprunts d'État ; en récession, ce seuil a déjà été franchi (2009). Sa durée courte limite l'effet d'une nouvelle hausse des taux.</p>`;
}
function renderMonetaire(){
  $("#monetaire").innerHTML = `<h2>Épargne de court terme</h2>
    <div class="tiles">
      ${kpi("Taux de dépôt BCE", "2,50 %", "maintenu le 29 oct. 2026")}
      ${kpi("€STR", nf2.format(ESTR) + " %", "depuis le 16 sept. 2026")}
      ${kpi("Euribor 3 mois", "2,59 %", "octobre 2026")}
      ${kpi("Euribor 12 mois", "3,30 %", "octobre 2026")}
      ${kpi("Livret A et LDDS", "1,70 %", "révision le 1er fév. 2027")}
      ${kpi("LEP", "2,50 %", "sous condition de revenu")}
      ${kpi("Inflation France", "3,4 %", "octobre 2026, sur un an")}
      ${kpi("Inflation zone euro", "4,0 %", "octobre 2026, estimation rapide")}
    </div>
    <p class="note">Tous les placements sans risque rapportent aujourd'hui moins que l'inflation ; le LEP et les meilleurs fonds euros s'en approchent le plus. L'Euribor 12 mois au-dessus du 3 mois indique que le marché attend encore une hausse de la BCE.</p>`;
}
function renderAgenda(){
  const ev = [
    ["17 nov. 2026", "Vote de l'Assemblée sur l'ensemble du projet de loi de finances 2027 ; le prélèvement forfaitaire reste à 31,4 % tant qu'aucune hausse n'est votée."],
    ["18 nov. 2026", "Vote solennel du Sénat sur le budget de la Sécurité sociale 2027, dont l'Assemblée a rejeté la partie recettes le 23 octobre."],
    ["27 nov. 2026", "Revue de la note de la France par S&P (A+, perspective stable)."],
    ["17 déc. 2026", "Réunion de la BCE : une troisième hausse reste attendue par une partie du marché."],
    ["1er fév. 2027", "Révision des taux du Livret A, du LDDS et du LEP."],
    ["1er janv. 2028", "Interdiction de louer les logements classés F : à suivre pour l'arbitrage avec l'immobilier."]
  ];
  $("#agenda").innerHTML = `<h2>Prochaines échéances</h2><div class="agenda">${ev.map(e => `<div><b>${esc(e[0])}</b><span>${esc(e[1])}</span></div>`).join("")}</div>`;
}
