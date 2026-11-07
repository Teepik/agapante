/* ================= Classement des actions ================= */
const PROFILS = [
  {id:"equilibre", l:"Équilibré", w:{v:1, g:1, q:1, m:1, d:0, y:0, s:0}},
  {id:"qualite", l:"Qualité à prix raisonnable", w:{v:1, g:1, q:2, m:0, d:0, y:0, s:0}},
  {id:"value", l:"Value", w:{v:2, g:0, q:1, m:1, d:0, y:0, s:0}},
  {id:"croissance", l:"Croissance", w:{v:0, g:2, q:1, m:1, d:0, y:0, s:0}},
  {id:"rendement", l:"Rendement", w:{v:1, g:0, q:1, m:0, d:1, y:2, s:0}},
  {id:"defensif", l:"Défensif", w:{v:0, g:0, q:2, m:0, d:2, y:1, s:0}},
  {id:"momentum", l:"Momentum", w:{v:0, g:1, q:0, m:2, d:0, y:0, s:0}},
  {id:"petites", l:"Petites valeurs", w:{v:1, g:1, q:1, m:0, d:0, y:0, s:2}}
];
const ACT = {q:"", zone:"all", sect:"all", cat:"all", theme:"all", cap:0, liq:0, pea:false, pg:false, evol:"all", profil:"equilibre", w:{...PROFILS[0].w},
  sort:{k:"note", dir:-1}, n:60};
const ACT_COLS = [
  {k:"nom", l:"Société", t:"txt"},
  {k:"cat", l:"Catégorie", t:"txt"},
  {k:"note", l:"Note", tip:"Note du profil choisi : moyenne pondérée des notes de style"},
  {k:"dn", l:"Évol.", tip:"Variation de la note du profil depuis treize semaines (sinon quatre, sinon une) : historique hebdomadaire des notes"},
  ...Object.keys(STY).map(k => ({k:"sc_" + k, l:k.toUpperCase(), tip:STY[k], sc:k})),
  {k:"mcap", l:"Capi.", tip:"Capitalisation boursière en milliards d'euros"},
  {k:"perF", l:"PER prév.", tip:"Cours rapporté au bénéfice attendu dans douze mois", asc:true},
  {k:"dy", l:"Div.", tip:"Rendement du dividende"},
  {k:"gB", l:"Crois. att.", tip:"Croissance annuelle attendue des bénéfices (analystes, cinq ans, sinon un an)"},
  {k:"rev90", l:"Révis. 3 m", tip:"Variation sur trois mois du bénéfice attendu l'an prochain"},
  {k:"mom12", l:"Perf. 12 m", tip:"Performance en euros sur douze mois, hors dernier mois"},
  {k:"vol", l:"Volat.", tip:"Volatilité annuelle en euros sur trois ans", asc:true},
  {k:"muR", l:"Rdt réel att.", tip:"Rendement réel attendu par an : rendement bénéficiaire corrigé de la croissance, ramené à mi-chemin du marché"},
  {k:"sig", l:"Signaux", t:"txt"}
];
function noteProfil(x, w = ACT.w){
  let s = 0, t = 0; for (const [k, wt] of Object.entries(w)){ if (!wt) continue; const v = x.sc[k]; if (ok(v)){ s += wt * v; t += wt; } }
  return t ? s / t : null;
}
/* Historique : notes passées (tableau v g q m d y s) → note du profil à l'époque */
const scDe = a => a ? {v:a[0], g:a[1], q:a[2], m:a[3], d:a[4], y:a[5], s:a[6]} : null;
const notePassee = (x, cle, w = ACT.w) => { const sc = scDe(x[cle]); return sc ? noteProfil({sc}, w) : null; };
function evolution(x, w = ACT.w){ const cle = x.h13 ? "h13" : x.h4 ? "h4" : x.h1 ? "h1" : null; if (!cle) return null; const a = notePassee(x, cle, w), b = noteProfil(x, w); return ok(a) && ok(b) ? b - a : null; }
const nouveauxPieges = x => x.pg1 === undefined ? [] : (x.pg || []).map(p => p[0]).filter(t => !(x.pg1 || "").split("|").includes(t));
const piegesLeves = x => x.pg1 ? x.pg1.split("|").filter(t => t && !(x.pg || []).some(p => p[0] === t)) : [];
function initActions(){
  const secteurs = [...new Set(B.A.map(x => x.secteur).filter(s => s && s !== "—"))].sort((a, b) => a.localeCompare(b, "fr"));
  $("#act-sect").innerHTML = `<option value="all">Tous</option>` + secteurs.map(s => `<option>${esc(s)}</option>`).join("");
  $("#act-cat").innerHTML = `<option value="all">Toutes</option>` + CATS.map(c => `<option>${esc(c)}</option>`).join("");
  $("#act-theme").innerHTML = `<option value="all">Tous</option>` + Object.entries(B.meta.themes).map(([k, l]) => `<option value="${k}+">${esc(l)} : gagnants</option><option value="${k}-">${esc(l)} : menacés</option>`).join("");
  $("#act-cap").innerHTML = [[0, "Toutes"], [2, "Plus de 2 Md€"], [10, "Plus de 10 Md€"], [50, "Plus de 50 Md€"], [-2, "Moins de 2 Md€"]].map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
  $("#act-liq").innerHTML = [[0, "Toutes"], [1, "Plus de 1 M€ par jour"], [5, "Plus de 5 M€ par jour"], [20, "Plus de 20 M€ par jour"]].map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
  $("#act-evol").innerHTML = [["all", "Toutes"], ["up", "Note en progression"], ["down", "Note en recul"], ["cat", "Catégorie changée"], ["pg", "Nouveau piège"], ["pgx", "Piège levé"]].map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
  const on = (id, k, f = v => v) => $(id).addEventListener("input", e => { ACT[k] = f(e.target.type === "checkbox" ? e.target.checked : e.target.value); ACT.n = 60; renderActions(); });
  on("#act-evol", "evol"); on("#act-sect", "sect"); on("#act-cat", "cat"); on("#act-theme", "theme"); on("#act-cap", "cap", Number); on("#act-liq", "liq", Number); on("#act-pea", "pea"); on("#act-pg", "pg");
  let t; $("#act-q").addEventListener("input", e => { clearTimeout(t); t = setTimeout(() => { ACT.q = e.target.value; ACT.n = 60; renderActions(); }, 150); });
  $$("#act-zone button").forEach(b => b.onclick = () => { ACT.zone = b.dataset.z; $$("#act-zone button").forEach(x => x.setAttribute("aria-pressed", x === b)); ACT.n = 60; renderActions(); });
  initActions.done = true;
}
function actFiltre(x){
  if (ACT.zone !== "all" && x.zone !== ACT.zone) return false;
  if (ACT.sect !== "all" && x.secteur !== ACT.sect) return false;
  if (ACT.cat !== "all" && x.cat !== ACT.cat) return false;
  if (ACT.theme !== "all"){ const k = ACT.theme.slice(0, -1), v = (x.th || {})[k] || 0; if (ACT.theme.endsWith("+") ? v <= 0 : v >= 0) return false; }
  if (ACT.cap > 0 && !(x.mcap >= ACT.cap)) return false;
  if (ACT.cap < 0 && !(x.mcap < -ACT.cap)) return false;
  if (ACT.liq && !(x.liq >= ACT.liq)) return false;
  if (ACT.pea && !x.pea) return false;
  if (ACT.pg && x.pg && x.pg.length) return false;
  if (ACT.evol !== "all"){
    if (ACT.evol === "up" || ACT.evol === "down"){ const d = evolution(x); if (!ok(d) || (ACT.evol === "up" ? d < 5 : d > -5)) return false; }
    if (ACT.evol === "cat"){ const c = x.c13 || x.c4 || x.c1; if (!c || c === x.cat) return false; }
    if (ACT.evol === "pg" && !nouveauxPieges(x).length) return false;
    if (ACT.evol === "pgx" && !piegesLeves(x).length) return false;
  }
  if (ACT.q){ const q = ACT.q.trim().toLowerCase(); const n = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    if (!(n(x.nom).includes(n(q)) || x.id.toLowerCase().startsWith(q) || (x.isin || "").toLowerCase() === q || n(x.industrie).includes(n(q)))) return false; }
  return true;
}
function renderActions(){
  const root = $("#act-body");
  if (bourseWait(root)){ $("#act-bar").hidden = true; return; }
  $("#act-bar").hidden = false;
  if (!initActions.done) initActions();
  root.innerHTML = `<div class="card" id="act-profil"></div><div class="card" id="act-mvt"></div><div class="tblwrap"><table class="res act" id="act-table"></table></div><div class="btnrow" id="act-more"></div>`;
  renderMouvements();
  // Profil de recherche
  const rows = B.A.filter(actFiltre);
  for (const x of rows){ x.note = noteProfil(x); x.gB = ok(x.ltg) ? x.ltg : x.g1; }
  const counts = {}; for (const x of B.A.filter(y => { const c = ACT.cat; ACT.cat = "all"; const r = actFiltre(y); ACT.cat = c; return r; })) counts[x.cat] = (counts[x.cat] || 0) + 1;
  $("#act-profil").innerHTML = `<div class="btnrow" style="justify-content:space-between"><h2>Ce que vous cherchez</h2><span class="note">${nf0.format(rows.length)} sociétés retenues sur ${nf0.format(B.A.length)}</span></div>
    <div class="chips" id="act-presets">${PROFILS.map(p => `<button class="chip" data-p="${p.id}" aria-pressed="${ACT.profil === p.id}">${esc(p.l)}</button>`).join("")}</div>
    <div class="weights">${Object.entries(STY).map(([k, l]) => `<label title="${esc(STY_EXPL[k])}"><span><i class="dot" style="background:var(${STY_C[k]})"></i>${esc(l)}</span><input type="range" min="0" max="3" step="1" value="${ACT.w[k] || 0}" data-w="${k}" aria-label="Poids ${esc(l)}"><b>${ACT.w[k] || 0}</b></label>`).join("")}</div>
    <div class="chips" id="act-cats">${CATS.filter(c => counts[c]).map(c => `<button class="chip" data-c="${esc(c)}" aria-pressed="${ACT.cat === c}"><i class="dot" style="background:var(${CAT_C[c]})"></i>${esc(c)} <span class="count">${counts[c]}</span></button>`).join("")}</div>`;
  $$("#act-presets button").forEach(b => b.onclick = () => { const p = PROFILS.find(x => x.id === b.dataset.p); ACT.profil = p.id; ACT.w = {...p.w}; ACT.sort = {k:"note", dir:-1}; renderActions(); savePrefs(); });
  $$("#act-profil input[data-w]").forEach(i => i.oninput = () => { ACT.w[i.dataset.w] = +i.value; ACT.profil = null; i.nextElementSibling.textContent = i.value; renderActionsTable(); renderMouvements(); savePrefs(); });
  $$("#act-cats button").forEach(b => b.onclick = () => { ACT.cat = ACT.cat === b.dataset.c ? "all" : b.dataset.c; $("#act-cat").value = ACT.cat; ACT.n = 60; renderActions(); });
  renderActionsTable();
}
function renderActionsTable(){
  const rows = B.A.filter(actFiltre);
  for (const x of rows){ x.note = noteProfil(x); x.dn = evolution(x); x.gB = ok(x.ltg) ? x.ltg : x.g1; for (const k of Object.keys(STY)) x["sc_" + k] = x.sc[k]; }
  const {k, dir} = ACT.sort;
  rows.sort((a, b) => { const va = a[k], vb = b[k]; if (typeof va === "string" || typeof vb === "string") return dir * String(va || "").localeCompare(String(vb || ""), "fr");
    if (!ok(va) && !ok(vb)) return 0; if (!ok(va)) return 1; if (!ok(vb)) return -1; return dir * (va - vb); });
  const show = rows.slice(0, ACT.n);
  $("#act-table").innerHTML = `<thead><tr>${ACT_COLS.map(c => `<th data-k="${c.k}" ${c.tip ? `title="${esc(c.tip)}"` : ""} ${c.sc ? `class="scH" style="color:var(${STY_C[c.sc]})"` : ""} aria-sort="${ACT.sort.k === c.k ? (dir > 0 ? "ascending" : "descending") : "none"}">${esc(c.l)}</th>`).join("")}</tr></thead>
    <tbody>${show.map(x => `<tr data-id="${esc(x.id)}">
      <td><span class="nm">${esc(x.nom)}</span><span class="fm">${esc(x.id)} · ${esc(x.pays || "—")} · ${esc(x.secteur)}${x.pea ? ' · <span class="env pea">PEA</span>' : ""}</span></td>
      <td>${catPill(x.cat)}</td>
      <td class="nt"><b>${fmt(x.note, v => nf0.format(v))}</b><i style="--w:${ok(x.note) ? x.note : 0}%"></i></td>
      <td class="${x.dn >= 3 ? "pos" : x.dn <= -3 ? "neg" : ""}">${ok(x.dn) ? (x.dn > 0 ? "+" : x.dn < 0 ? "−" : "") + nf0.format(Math.abs(x.dn)) : "—"}</td>
      ${Object.keys(STY).map(s => scoreCell(x.sc[s], s)).join("")}
      <td>${mdE(x.mcap)}</td><td>${fmt(x.perF, F.x)}</td><td>${fmt(x.dy, F.pct)}</td><td>${fmt(x.gB, F.pctS)}</td>
      <td class="${x.rev90 > 2 ? "pos" : x.rev90 < -2 ? "neg" : ""}">${fmt(x.rev90, F.pctS)}</td><td class="${x.mom12 > 0 ? "pos" : x.mom12 < 0 ? "neg" : ""}">${fmt(x.mom12, F.pctS)}</td>
      <td>${fmt(x.vol, v => nf0.format(v) + " %")}</td><td><b>${fmt(x.muR, F.pct)}</b></td>
      <td class="sg">${themePills(x.th, true)}${piegePills(x.pg)}</td></tr>`).join("")}</tbody>`;
  $$("#act-table th").forEach(th => th.onclick = () => { const c = ACT_COLS.find(c => c.k === th.dataset.k); if (c.k === "sig") return;
    ACT.sort = ACT.sort.k === c.k ? {k:c.k, dir:-ACT.sort.dir} : {k:c.k, dir:c.t === "txt" || c.asc ? 1 : -1}; renderActionsTable(); });
  $$("#act-table tbody tr").forEach(tr => tr.onclick = () => openFiche(tr.dataset.id));
  $("#act-more").innerHTML = rows.length > ACT.n ? `<button class="ghost" id="act-plus">Afficher ${Math.min(60, rows.length - ACT.n)} de plus</button><span class="note">${nf0.format(ACT.n)} sur ${nf0.format(rows.length)}</span>` : rows.length ? "" : `<p class="empty">Aucune société ne passe tous ces filtres.</p>`;
  if ($("#act-plus")) $("#act-plus").onclick = () => { ACT.n += 60; renderActionsTable(); };
}
/* Ce qui a changé depuis la semaine dernière (historique hebdomadaire des notes) */
function renderMouvements(){
  const el = $("#act-mvt"); if (!el) return;
  const h = (B.meta && B.meta.histo) || {};
  const ref = h.w1 ? "h1" : null;
  if (!ref){
    el.innerHTML = `<div class="btnrow" style="justify-content:space-between"><h2>Ce qui a changé</h2><span class="note">Historique des notes</span></div>
      <p class="note">Chaque semaine, les notes et les chiffres clés de chaque titre sont enregistrés. Les premières évolutions apparaissent au relevé de lundi prochain ; dans un an, l'historique permettra de tester une stratégie avec les notes de l'époque.</p>`;
    return;
  }
  const L = B.A.filter(x => x.h1 && ok(x.mcap) && x.mcap >= 1);
  const d = L.map(x => ({x, d:noteProfil(x) - notePassee(x, "h1")})).filter(o => ok(o.d));
  const up = d.slice().sort((a, b) => b.d - a.d).slice(0, 6), down = d.slice().sort((a, b) => a.d - b.d).slice(0, 6);
  const cats = B.A.filter(x => x.c1 && x.c1 !== x.cat), np = B.A.filter(x => nouveauxPieges(x).length), pl = B.A.filter(x => piegesLeves(x).length);
  const ligne = (o, sg) => `<button class="rrow" data-id="${esc(o.x.id)}"><span class="t"><b>${esc(o.x.nom)}</b><small>${esc(o.x.id)} · ${esc(o.x.cat)}</small></span><span class="v"><b class="${sg > 0 ? "pos" : "neg"}">${o.d > 0 ? "+" : "−"}${nf0.format(Math.abs(o.d))}</b><small>note ${nf0.format(noteProfil(o.x))}</small></span></button>`;
  el.innerHTML = `<div class="btnrow" style="justify-content:space-between"><h2>Ce qui a changé depuis le ${new Date(h.w1).toLocaleDateString("fr-FR", {day:"numeric", month:"long"})}</h2>
      <span class="note">${cats.length} changement${cats.length > 1 ? "s" : ""} de catégorie · ${np.length} nouveau${np.length > 1 ? "x" : ""} piège${np.length > 1 ? "s" : ""} · ${pl.length} piège${pl.length > 1 ? "s" : ""} levé${pl.length > 1 ? "s" : ""}</span></div>
    <div class="det"><div><h3>Notes en progression</h3><div class="rlist">${up.map(o => ligne(o, 1)).join("")}</div></div><div><h3>Notes en recul</h3><div class="rlist">${down.map(o => ligne(o, -1)).join("")}</div></div></div>
    <p class="note">Note du profil choisi, sociétés de plus d'un milliard d'euros. Le filtre « Évolution » isole les changements de catégorie, les nouveaux pièges et les pièges levés.</p>`;
  $$("#act-mvt .rrow").forEach(b => b.onclick = () => openFiche(b.dataset.id));
}
function savePrefs(){ clearTimeout(savePrefs.t); savePrefs.t = setTimeout(() => Store.save("preferences", {...(Store.data.preferences || {}), profil:ACT.profil, w:ACT.w}), 900); }
function applyPrefs(p){ if (!p) return; if (p.w) ACT.w = {...ACT.w, ...p.w}; if (p.profil !== undefined) ACT.profil = p.profil; }

/* ================= Fiche d'une société ou d'un ETF ================= */
function openFiche(id){
  const x = B.byId.get(id); if (!x) return;
  const el = $("#fiche"), body = $("#f-body");
  $("#f-title").textContent = x.nom;
  const k = (l, v, c) => `<div class="kpi"><div class="l">${l}</div><div class="v">${v}</div>${c ? `<div class="c">${c}</div>` : ""}</div>`;
  const row = (l, v, cmt) => `<tr><td>${l}${cmt ? `<span class="cmp">${cmt}</span>` : ""}</td><td>${v}</td></tr>`;
  if (x.kind === "action"){
    const recoL = r => !ok(r) ? "—" : r < 1.8 ? "Achat fort" : r < 2.5 ? "Achat" : r < 3.3 ? "Conserver" : r < 4 ? "Alléger" : "Vendre";
    body.innerHTML = `<div class="meta-l">${esc(x.id)} · ${esc(x.pays || "—")} · ${esc(x.secteur)}${x.industrie ? " · " + esc(x.industrie) : ""}${x.x ? " · " + esc(x.x) : ""}${x.isin ? " · " + esc(x.isin) : ""}</div>
      <div class="flags">${catPill(x.cat)}${x.pea ? '<span class="pill good">Éligible au PEA</span>' : '<span class="pill neu">Hors PEA</span>'}${x.cyclique ? '<span class="pill neu">Cyclique</span>' : ""}${themePills(x.th)}${(x.pg || []).map(([t]) => `<span class="pill warn">${esc(t)}</span>`).join("")}</div>
      ${(x.pg || []).map(([t, d]) => `<div class="callout"><b>${esc(t)}.</b> ${esc(d)}</div>`).join("")}
      <div class="kpis k3">${k("Cours", ok(x.px) ? nf2.format(x.px) + " " + esc(x.ccy) : "—", ok(x.upside) ? `objectif des analystes ${F.pctS(x.upside)}` : "")}
        ${k("Capitalisation", mdE(x.mcap), ok(x.liq) ? meur(x.liq) + " échangés par jour" : "")}
        ${k("Rendement réel attendu", fmt(x.muR, F.pct), "par an, avant impôt, hors inflation")}
        ${k("PER prévisionnel", fmt(x.perF, F.x), ok(x.per) ? "sur douze mois passés : " + F.x(x.per) : "")}
        ${k("Dividende", fmt(x.dy, F.pct), ok(x.payout) ? "distribution de " + nf0.format(x.payout * 100) + " % du bénéfice" : "")}
        ${k("Volatilité", fmt(x.vol, v => nf0.format(v) + " %"), ok(x.beta) ? "bêta face au monde : " + nf2.format(x.beta) : "")}</div>
      <div class="det">
        <div><h3>Notes de style</h3><div class="scorebar" style="margin-top:8px">${Object.entries(STY).map(([s, l]) => `<div class="sb" title="${esc(STY_EXPL[s])}"><div class="lab"><span>${esc(l)}</span><span>${fmt(x.sc[s], v => nf0.format(v) + " / 100")}</span></div><div class="track"><i style="width:${x.sc[s] || 0}%;background:var(${STY_C[s]})"></i></div></div>`).join("")}</div>
          <p class="note">Rangs centiles parmi les ${nf0.format(B.A.length)} sociétés suivies ; 100 = la meilleure.</p></div>
        <div><h3>Cours en euros, base 100</h3><div class="chart" id="f-chart"><p class="note">Chargement des cours…</p></div><p class="note" id="f-perf"></p></div>
      </div>
      <div class="det">
        <table class="t"><tbody>
          <tr><th colspan="2">Valorisation</th></tr>
          ${row("PER prévisionnel", fmt(x.perF, F.x))}${row("Cours / fonds propres", fmt(x.pb, F.x))}${row("Valeur d'entreprise / EBE", fmt(x.evEbitda, F.x))}${row("Flux de trésorerie disponible / capitalisation", fmt(x.fcfY, F.pct))}
          <tr><th colspan="2">Croissance</th></tr>
          ${row("Chiffre d'affaires sur un an", fmt(x.revG, F.pctS))}${row("Bénéfice sur un an", fmt(x.epsG, F.pctS))}${row("Bénéfice attendu l'an prochain", fmt(x.g1, F.pctS))}${row("Croissance annuelle attendue à cinq ans", fmt(x.ltg, F.pctS))}
        </tbody></table>
        <table class="t"><tbody>
          <tr><th colspan="2">Qualité et solidité</th></tr>
          ${row("Rentabilité des fonds propres", fmt(x.roe, F.pct))}${row("Marge opérationnelle", fmt(x.opm, F.pct))}${row("Marge brute", fmt(x.gm, F.pct))}${row("Dette nette / EBE", fmt(x.nde, v => nf1.format(v) + " fois"))}
          <tr><th colspan="2">Marché et analystes</th></tr>
          ${row("Performance sur 12 mois (hors dernier mois)", fmt(x.mom12, F.pctS), ok(x.momRel) ? `${F.pctS(x.momRel)} face au secteur` : "")}${row("Sur 3 mois", fmt(x.mom3, F.pctS))}
          ${row("Révision du bénéfice attendu sur 3 mois", fmt(x.rev90, F.pctS))}${row("Consensus des analystes", ok(x.reco) ? `${recoL(x.reco)} (${nf1.format(x.reco)})` : "—", ok(x.nAna) ? nf0.format(x.nAna) + " analystes" : "")}
          ${row("Pire baisse sur un an", fmt(x.dd1y, F.pctS))}
        </tbody></table>
      </div>
      <div id="f-histo"></div>
      <div id="f-resume"></div>`;
    renderFicheHisto(x);
    fetch("/bourse/api/donnees?quoi=fiche&id=" + encodeURIComponent(id), {credentials:"same-origin"}).then(r => r.ok ? r.json() : null).then(j => {
      if (!j || !j.resume || $("#f-title").textContent !== x.nom) return;
      $("#f-resume").innerHTML = `<h3>Activité</h3><p class="note" lang="en" style="font-size:13px;color:var(--fg)">${esc(j.resume)}</p><p class="note">Description publiée par Yahoo Finance, en anglais${ok(j.effectif) ? ` · ${nf0.format(j.effectif)} salariés` : ""}.</p>`;
    }).catch(() => {});
  } else {
    const ob = POCHE[x.cls] === "obligations" || (x.cls === "monetaire" && x.bt);
    const hyp = x.pl && PLI[x.pl] ? `hypothèses de l'atlas pour « ${PLI[x.pl].nom} »${ETF_ADJ[x.id] ? `, corrigées de ${F.pts(ETF_ADJ[x.id]).replace(" pt", " point")} pour son style ou son thème` : ""}`
      : ob ? `taux actuel de sa courbe (${x.bc === "USD" ? "États-Unis" : x.bp && P[x.bp] ? P[x.bp].nom : "zone euro"}) à ${ok(x.T) ? nf1.format(x.T) + " ans" : "sa durée"}${x.bt === "corp" ? ", plus la prime des entreprises de qualité et moins les défauts attendus" : x.bt === "hy" ? ", moins les pertes attendues sur défauts" : ""}${x.bc && x.bc !== "EUR" && x.bc !== "EMLOC" ? (x.hdg ? ", moins le coût de la couverture de change" : ", corrigé de la tendance de la devise contre l'euro") : ""}`
      : x.cls === "or" ? "l'or garde son pouvoir d'achat, avec une prime de 0,5 % par an" : x.cls === "matieres" || x.cls === "metal" ? "les matières premières et les métaux suivent l'inflation à long terme, sans revenu"
      : x.cls === "crypto" ? "aucun revenu ni bénéfice ne permet d'ancrer une valeur : rendement réel retenu nul, la simulation reprend seulement sa volatilité passée"
      : `valorisation de ${geoL(x.geo) || "sa zone"} (1 / CAPE)${STY_ADJ[x.sty] ? `, ${F.pts(STY_ADJ[x.sty]).replace(" pt", " point")} pour son style` : ""}${x.cls === "act_theme" ? ", −1 point pour la cherté habituelle des thèmes" : ""}`;
    body.innerHTML = `<div class="meta-l">${esc(x.id)} · ${esc(x.isin || "")}${x.f ? " · " + esc(x.f) : ""}</div>
      <div class="meta-l"><b>${esc(etfSousTitre(x))}</b></div>
      <div class="flags">${x.pea ? '<span class="pill good">Éligible au PEA</span>' : x.spot ? '<span class="pill neu">Plateforme d\'échange</span>' : x.cls === "crypto" ? '<span class="pill neu">Compte-titres</span>' : '<span class="pill neu">Compte-titres ou assurance-vie</span>'}${x.cls === "crypto" ? '<span class="pill warn">Très volatil</span>' : ""}${x.hdg ? '<span class="pill neu">Couvert en euros</span>' : ""}${x.ech ? `<span class="pill good">Échéance ${x.ech}</span>` : ""}${themePills(x.th)}</div>
      <div class="kpis k3">${k("Frais annuels", ok(x.ter) ? nf2.format(x.ter) + " %" : "—", ok(x.ter) ? "" : "frais publiés absents ; 0,30 % retenu")}${k("Encours", ok(x.aum) ? mdE(x.aum) : "—")}${k("Rendement réel attendu", fmt(x.mu, F.pct), "par an, net de frais, avant impôt")}
        ${k("Volatilité", fmt(x.vol, v => nf1.format(v) + " %"), ok(x.beta) ? "bêta face au monde : " + nf2.format(x.beta) : "")}${k("Performance 12 mois", fmt(x.mom12, F.pctS))}${k("Pire baisse sur un an", fmt(x.dd1y, F.pctS))}</div>
      <div><h3>Cours en euros, base 100</h3><div class="chart" id="f-chart"><p class="note">Chargement des cours…</p></div><p class="note" id="f-perf"></p></div>
      <p class="note">Rendement attendu : ${esc(hyp)}.${x.ech ? " Conservé jusqu'à l'échéance, un ETF obligataire daté se comporte comme une obligation : le rendement actuel est à peu près acquis." : ""}${x.spot ? " Détenu en direct, il s'achète sur une plateforme enregistrée auprès de l'AMF ; les plus-values relèvent du régime des actifs numériques." : x.cls === "crypto" ? " Produit coté adossé à la cryptomonnaie, détenu sur un compte-titres comme une action." : ""}</p>`;
  }
  const pfs = (Store.data.portefeuilles && Store.data.portefeuilles.liste) || [];
  $("#f-foot").innerHTML = `<button type="button" class="ghost" id="f-watch">Suivre</button>
    ${pfs.length ? `<select id="f-pf" aria-label="Portefeuille">${pfs.map(p => `<option value="${p.id}" ${p.id === Store.data.portefeuilles.actif ? "selected" : ""}>${esc(p.nom)}</option>`).join("")}</select>` : ""}
    <button type="button" class="primary" id="f-add">Ajouter ${pfs.length ? "à ce portefeuille" : "à un portefeuille fictif"}</button>`;
  $("#f-watch").onclick = () => { addWatch({type:x.kind, id:x.id}); };
  $("#f-add").onclick = () => { pfAddLine(x.id, $("#f-pf") ? $("#f-pf").value : null); closeFiche(); };
  el.hidden = false; $("#f-close").focus();
  needRets([id, "EUNL.DE"]).then(() => {
    if ($("#fiche").hidden || $("#f-title").textContent !== x.nom) return;
    const monde = valuePath("EUNL.DE"), me = valuePath(id);
    const series = [{name:x.nom, color:css("--accent"), pts:me, endLabel:x.id.split(".")[0]}];
    if (id !== "EUNL.DE" && monde.length && me.length){ const off = monde.length - me.length, b = monde[Math.max(0, off)][1]; series.push({name:"ETF Monde", color:css("--muted"), pts:monde.slice(Math.max(0, off)).map(([d, v]) => [d, v / b * 100]), dash:"4 3", w:1.5, endLabel:"Monde"}); }
    if (me.length){ lineChart($("#f-chart"), series, {h:190, xType:"time", yFmt:v => nf0.format(v)});
      $("#f-perf").textContent = `Sur ${nf1.format(me.length / 52)} ans : ${F.pctS((me[me.length - 1][1] / 100 - 1) * 100)}${id !== "EUNL.DE" && monde.length ? ` contre ${F.pctS((monde[monde.length - 1][1] / monde[Math.max(0, monde.length - me.length)][1] - 1) * 100)} pour l'ETF Monde` : ""} (revenus réinvestis, en euros).`; }
    else $("#f-chart").innerHTML = '<p class="note">Cours indisponibles.</p>';
  });
}
function closeFiche(){ $("#fiche").hidden = true; }
async function renderFicheHisto(x){
  let j; try { const r = await fetch("/bourse/api/histo?id=" + encodeURIComponent(x.id), {credentials:"same-origin"}); j = r.ok ? await r.json() : null; } catch(e){ j = null; }
  const el = $("#f-histo"); if (!el || $("#f-title").textContent !== x.nom || !j) return;
  const pts = j.points || [];
  if (pts.length < 2){
    el.innerHTML = `<h3>Évolution des notes</h3><p class="note">${pts.length ? `Historique commencé la semaine du ${new Date(pts[0].semaine).toLocaleDateString("fr-FR", {day:"numeric", month:"long", year:"numeric"})}` : "Historique en cours de constitution"} : la courbe apparaîtra dès la deuxième semaine relevée.</p>`;
    return;
  }
  const cle = {v:"s_v", g:"s_g", q:"s_q", m:"s_m", d:"s_d", y:"s_y", s:"s_s"};
  const noteDe = p => noteProfil({sc:Object.fromEntries(Object.entries(cle).map(([k, c]) => [k, p[c]]))});
  const series = [{name:"Note du profil", color:css("--fg"), w:2.5, pts:pts.map(p => [new Date(p.semaine), noteDe(p)]).filter(q => ok(q[1])), endLabel:"profil"}];
  for (const [k, c] of Object.entries(cle)) if (ACT.w[k]) series.push({name:STY[k], color:css(STY_C[k]), w:1.3, pts:pts.map(p => [new Date(p.semaine), p[c]]).filter(q => ok(q[1])), endLabel:STY[k]});
  const a = pts[0], b = pts[pts.length - 1];
  const ligne = (l, ka, f) => `<tr><td>${l}</td><td class="n">${fmt(a[ka], f)}</td><td class="n">${fmt(b[ka], f)}</td></tr>`;
  el.innerHTML = `<h3>Évolution des notes depuis le ${new Date(a.semaine).toLocaleDateString("fr-FR", {day:"numeric", month:"long", year:"numeric"})}</h3>
    <div class="det"><div class="chart" id="f-hchart"></div>
      <table class="t"><thead><tr><th></th><th class="n">${new Date(a.semaine).toLocaleDateString("fr-FR", {day:"numeric", month:"short"})}</th><th class="n">${new Date(b.semaine).toLocaleDateString("fr-FR", {day:"numeric", month:"short"})}</th></tr></thead><tbody>
        <tr><td>Catégorie</td><td class="n">${esc(a.cat || "—")}</td><td class="n">${esc(b.cat || "—")}</td></tr>
        ${ligne("Cours", "px", v => nf2.format(v))}${ligne("PER prévisionnel", "per_f", F.x)}${ligne("Dividende", "dy", F.pct)}${ligne("Révision des bénéfices sur 3 mois", "rev90", F.pctS)}
        ${ligne("Performance sur 12 mois", "mom12", F.pctS)}${ligne("Objectif des analystes", "upside", F.pctS)}${ligne("Rendement réel attendu", "mu_r", F.pct)}
        <tr><td>Pièges</td><td class="n">${esc((a.pg || "aucun").replace(/\|/g, ", "))}</td><td class="n">${esc((b.pg || "aucun").replace(/\|/g, ", "))}</td></tr>
      </tbody></table></div>`;
  lineChart($("#f-hchart"), series, {h:200, xType:"time", yMin:0, yMax:100, xFmt:d3.timeFormat("%d/%m"), yFmt:v => nf0.format(v)});
}
