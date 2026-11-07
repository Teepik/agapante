/* ================= Ruptures : gagnants et perdants des grandes transformations ================= */
const RUP_TXT = {
  ia:"Puces, machines de gravure, réseaux, mémoire et électricité des centres de données d'un côté ; services informatiques, agences de publicité, intérim et logiciels facturés au poste de l'autre, dont l'IA réduit la valeur du travail vendu.",
  robot:"Automatisation des usines et des entrepôts, robots chirurgicaux, capteurs, composants de puissance. Le manque de main-d'œuvre et la relocalisation accélèrent l'équipement.",
  defense:"Réarmement européen vers 3 à 3,5 % du PIB : munitions, blindés, électronique, aéronautique militaire, cybersécurité. Les carnets de commandes couvrent plusieurs années.",
  energie:"Demande d'électricité en hausse durable (centres de données, pompes à chaleur, véhicules) : réseaux, transformateurs, câbles, nucléaire, producteurs régulés.",
  chine:"Ventes ou production très dépendantes de la Chine ou de Taïwan : luxe, automobile allemande, chimie, équipementiers de semi-conducteurs. Risque de ralentissement, de concurrence locale ou de blocus.",
  douane:"Droits de douane américains : les fabricants déjà installés aux États-Unis et la sidérurgie protégée y gagnent ; les importateurs de biens de consommation fabriqués en Asie y perdent."
};
const RUP = {theme:null, zone:"all"};
function confLabel(x, dir){
  const c = x.conf || 0;
  if (dir > 0) return c >= 1 ? ["Le marché confirme", "good"] : c <= -1 ? ["Le marché doute", "bad"] : ["Signal neutre", "neu"];
  return c <= -1 ? ["Le marché confirme", "bad"] : c >= 1 ? ["Le marché n'y croit pas", "good"] : ["Signal neutre", "neu"];
}
function renderRuptures(){
  const root = $("#rup-body");
  if (bourseWait(root)) return;
  const themes = Object.keys(B.meta.themes);
  if (!RUP.theme) RUP.theme = themes[0];
  const inZ = x => RUP.zone === "all" || x.zone === RUP.zone;
  // Synthèse : écart de performance entre gagnants et menacés, part déjà payée
  const synth = themes.map(k => {
    const g = B.A.filter(x => inZ(x) && (x.th[k] || 0) > 0), p = B.A.filter(x => inZ(x) && (x.th[k] || 0) < 0);
    const med = (a, f) => { const v = a.map(f).filter(ok).sort((x, y) => x - y); return v.length ? v[v.length >> 1] : null; };
    return {k, ng:g.length, np:p.length, mg:med(g, x => x.mom12), mp:med(p, x => x.mom12), perG:med(g, x => x.perF), perAll:med(B.A, x => x.perF), confG:g.filter(x => x.conf >= 1).length};
  });
  root.innerHTML = `
    <div class="card"><div class="btnrow" style="justify-content:space-between"><h2>Gagnants et perdants des ruptures</h2>
      <div class="seg" id="rup-zone">${[["all","Toutes zones"],["eu","Europe"],["us","États-Unis"]].map(([z, l]) => `<button data-z="${z}" aria-pressed="${RUP.zone === z}">${l}</button>`).join("")}</div></div>
      <p class="note">Le classement par thème part de l'industrie de chaque société (nomenclature Yahoo), puis d'un examen société par société pour les cas connus. Le marché tranche ensuite : révisions des bénéfices attendus sur trois mois et performance sur douze mois face au secteur. Un gagnant dont les prévisions montent et le cours surperforme est confirmé ; un gagnant déjà cher dont les prévisions baissent mérite la prudence.</p>
      <div class="tblwrap" style="border:0"><table class="t rupt"><thead><tr><th>Thème</th><th class="n">Gagnants</th><th class="n">Menacés</th><th class="n">Perf. 12 m gagnants</th><th class="n">Perf. 12 m menacés</th><th class="n">Écart</th><th class="n">PER prév. gagnants</th><th class="n">Confirmés</th></tr></thead>
      <tbody>${synth.map(s => `<tr data-t="${s.k}" class="${RUP.theme === s.k ? "on" : ""}"><td><b>${esc(themeL(s.k))}</b></td><td class="n">${s.ng}</td><td class="n">${s.np}</td><td class="n">${fmt(s.mg, F.pctS)}</td><td class="n">${fmt(s.mp, F.pctS)}</td>
        <td class="n"><b>${ok(s.mg) && ok(s.mp) ? F.pctS(s.mg - s.mp).replace("%", "pts") : "—"}</b></td><td class="n">${fmt(s.perG, F.x)}${ok(s.perAll) ? `<span class="cmp">marché ${F.x(s.perAll)}</span>` : ""}</td><td class="n">${s.ng ? nf0.format(s.confG / s.ng * 100) + " %" : "—"}</td></tr>`).join("")}</tbody></table></div>
      <div class="chips" id="rup-tabs">${themes.map(k => `<button class="chip" data-t="${k}" aria-pressed="${RUP.theme === k}">${esc(themeL(k))}</button>`).join("")}</div>
    </div>
    <div class="card" id="rup-detail"></div>`;
  $$("#rup-zone button").forEach(b => b.onclick = () => { RUP.zone = b.dataset.z; renderRuptures(); });
  $$("#rup-tabs button, table.rupt tbody tr").forEach(b => b.onclick = () => { RUP.theme = b.dataset.t; renderRuptures(); });
  const k = RUP.theme;
  const list = dir => B.A.filter(x => inZ(x) && (dir > 0 ? (x.th[k] || 0) > 0 : (x.th[k] || 0) < 0))
    .sort((a, b) => Math.abs(b.th[k]) - Math.abs(a.th[k]) || (dir > 0 ? b.conf - a.conf : a.conf - b.conf) || (b.mcap || 0) - (a.mcap || 0));
  const g = list(1), p = list(-1);
  const etfs = B.E.filter(e => (e.th || {})[k] && (RUP.zone === "all" || e.zone === RUP.zone || e.zone === "monde")).sort((a, b) => ((b.th[k] > 0) - (a.th[k] > 0)) || ((b.aum || 0) - (a.aum || 0))).slice(0, 14);
  const line = (x, dir) => { const [cl, tone] = confLabel(x, dir); const cher = dir > 0 && x.perF > 40;
    return `<button class="rrow" data-id="${esc(x.id)}"><span class="t"><b>${esc(x.nom)}</b><small>${esc(x.id)} · ${esc(x.pays || "")} · ${Math.abs(x.th[k]) === 2 ? (dir > 0 ? "gagnant direct" : "menacé directement") : (dir > 0 ? "gagnant indirect" : "exposé")}</small></span>
      <span class="v"><span class="pill ${tone} xs">${cl}</span>${cher ? '<span class="pill warn xs">Déjà payé cher</span>' : ""}<small>12 m ${fmt(x.mom12, F.pctS)} · révis. ${fmt(x.rev90, F.pctS)} · PER ${fmt(x.perF, F.x)}</small></span></button>`; };
  $("#rup-detail").innerHTML = `<h2>${esc(themeL(k))}</h2><p>${esc(RUP_TXT[k] || "")}</p>
    <div class="det"><div><h3>Gagnants (${g.length})</h3><div class="rlist">${g.slice(0, 40).map(x => line(x, 1)).join("") || '<p class="empty">Aucun dans cette zone.</p>'}</div></div>
      <div><h3>Menacés (${p.length})</h3><div class="rlist">${p.slice(0, 40).map(x => line(x, -1)).join("") || '<p class="empty">Aucun dans cette zone.</p>'}</div></div></div>
    ${etfs.length ? `<div><h3>ETF du thème</h3><div class="rlist">${etfs.map(e => `<button class="rrow" data-id="${esc(e.id)}"><span class="t"><b>${esc(e.nom)}</b><small>${esc(e.id)} · ${e.th[k] > 0 ? "gagnant" : "exposé"} · frais ${fmt(e.ter, v => nf2.format(v) + " %")} · encours ${mdE(e.aum)}</small></span><span class="v"><small>12 m ${fmt(e.mom12, F.pctS)} · volatilité ${fmt(e.vol, v => nf0.format(v) + " %")}</small></span></button>`).join("")}</div></div>` : ""}
    <p class="note">Un classement éditorial vieillit : il se relit à chaque publication de résultats. La confirmation par le marché, elle, se met à jour à chaque collecte.</p>`;
  $$("#rup-detail .rrow").forEach(b => b.onclick = () => openFiche(b.dataset.id));
}
