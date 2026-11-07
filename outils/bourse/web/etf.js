/* ================= ETF et obligations : classement et filtres ================= */
const ETFV = {q:"", poche:"all", cls:"all", geo:"all", fam:"all", ter:0, aum:0, pea:false, ech:false, hdg:false, sort:{k:"aum", dir:-1}, n:80};
const ETF_COLS = [
  {k:"nom", l:"ETF", t:"txt"},
  {k:"cat", l:"Catégorie", t:"txt"},
  {k:"ter", l:"Frais", tip:"Frais annuels courants", asc:true},
  {k:"aum", l:"Encours", tip:"Encours du fonds en milliards d'euros"},
  {k:"vol", l:"Volat.", tip:"Volatilité annuelle en euros sur trois ans", asc:true},
  {k:"mom12", l:"Perf. 12 m", tip:"Performance en euros sur douze mois, hors dernier mois"},
  {k:"dd1y", l:"Pire baisse 1 an", tip:"Plus forte baisse depuis un sommet sur les douze derniers mois"},
  {k:"mu", l:"Rdt réel att.", tip:"Rendement réel attendu par an, net de frais, avant impôt"},
  {k:"T", l:"Durée", tip:"Durée ou échéance des obligations, en années", asc:true},
  {k:"sig", l:"", t:"txt"}
];
function etfGeo(e){ return POCHE[e.cls] === "obligations" || e.cls === "monetaire" ? (e.bp || (e.bc === "USD" ? "US" : e.bc === "GLOBAL" ? "WORLD" : e.bc === "EMLOC" ? "EM" : e.bc === "GBP" ? "GB" : "EMU")) : e.geo || (e.cls === "act_us" ? "US" : e.cls === "act_eu" ? "EUROPE" : e.cls === "act_jp" ? "JP" : e.cls === "act_em" ? "EM" : e.cls === "act_monde" ? "WORLD" : null); }
function initEtf(){
  const cls = [...new Set(B.E.map(e => e.cls))].sort((a, b) => Object.keys(CLS_L).indexOf(a) - Object.keys(CLS_L).indexOf(b));
  $("#etf-cls").innerHTML = `<option value="all">Toutes</option>` + cls.map(c => `<option value="${c}">${esc(CLS_L[c] || c)}</option>`).join("");
  const geos = {}; for (const e of B.E){ const g = etfGeo(e); if (g) geos[g] = (geos[g] || 0) + 1; }
  $("#etf-geo").innerHTML = `<option value="all">Toutes</option>` + Object.entries(geos).sort((a, b) => b[1] - a[1]).map(([g, n]) => `<option value="${g}">${esc(geoL(g) || g)} (${n})</option>`).join("");
  const fams = {}; for (const e of B.E){ const f = (e.f || "").replace(/ (Asset Management|Investment Management|Investments|Global Advisors|International Asset Management|Funds|Managers|Advisors|Limited|Investment Funds)$/, ""); if (f){ e.fam = f; fams[f] = (fams[f] || 0) + 1; } }
  $("#etf-fam").innerHTML = `<option value="all">Tous</option>` + Object.entries(fams).sort((a, b) => b[1] - a[1]).map(([f, n]) => `<option value="${esc(f)}">${esc(f)} (${n})</option>`).join("");
  $("#etf-ter").innerHTML = [[0, "Tous"], [.1, "0,10 % au plus"], [.2, "0,20 % au plus"], [.3, "0,30 % au plus"], [.5, "0,50 % au plus"]].map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
  $("#etf-aum").innerHTML = [[0, "Tous"], [.1, "Plus de 100 M€"], [.5, "Plus de 500 M€"], [1, "Plus de 1 Md€"], [5, "Plus de 5 Md€"]].map(([v, l]) => `<option value="${v}">${l}</option>`).join("");
  const on = (id, k, f = v => v) => $(id).addEventListener("input", e => { ETFV[k] = f(e.target.type === "checkbox" ? e.target.checked : e.target.value); ETFV.n = 80; renderEtfTable(); });
  on("#etf-cls", "cls"); on("#etf-geo", "geo"); on("#etf-fam", "fam"); on("#etf-ter", "ter", Number); on("#etf-aum", "aum", Number); on("#etf-pea", "pea"); on("#etf-ech", "ech"); on("#etf-hdg", "hdg");
  let t; $("#etf-q").addEventListener("input", e => { clearTimeout(t); t = setTimeout(() => { ETFV.q = e.target.value; ETFV.n = 80; renderEtfTable(); }, 150); });
  $$("#etf-poche button").forEach(b => b.onclick = () => { ETFV.poche = b.dataset.p; $$("#etf-poche button").forEach(x => x.setAttribute("aria-pressed", x === b)); ETFV.n = 80; renderEtfTable(); });
  initEtf.done = true;
}
function etfFiltre(e){
  if (ETFV.poche !== "all" && (ETFV.poche === "monetaire" ? e.cls !== "monetaire" : POCHE[e.cls] !== ETFV.poche || (ETFV.poche === "obligations" && e.cls === "monetaire"))) return false;
  if (ETFV.cls !== "all" && e.cls !== ETFV.cls) return false;
  if (ETFV.geo !== "all" && etfGeo(e) !== ETFV.geo) return false;
  if (ETFV.fam !== "all" && e.fam !== ETFV.fam) return false;
  if (ETFV.ter && !(ok(e.ter) && e.ter <= ETFV.ter + 1e-9)) return false;
  if (ETFV.aum && !(e.aum >= ETFV.aum)) return false;
  if (ETFV.pea && !e.pea) return false;
  if (ETFV.ech && !e.ech) return false;
  if (ETFV.hdg && !e.hdg) return false;
  if (ETFV.q){ const n = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); const q = n(ETFV.q.trim());
    if (!(n(e.nom).includes(q) || e.id.toLowerCase().startsWith(q) || (e.isin || "").toLowerCase() === q)) return false; }
  return true;
}
function renderEtf(){
  const root = $("#etf-body");
  if (bourseWait(root)){ $("#etf-bar").hidden = true; return; }
  $("#etf-bar").hidden = false;
  if (!initEtf.done) initEtf();
  root.innerHTML = `<div class="card" id="etf-synth"></div><div class="tblwrap"><table class="res act etfT" id="etf-table"></table></div><div class="btnrow" id="etf-more"></div>`;
  renderEtfTable();
}
function renderEtfTable(){
  const rows = B.E.filter(etfFiltre);
  for (const e of rows){ e.cat = etfSousTitre(e); }
  const {k, dir} = ETFV.sort;
  rows.sort((a, b) => { const va = a[k], vb = b[k]; if (typeof va === "string" || typeof vb === "string") return dir * String(va || "").localeCompare(String(vb || ""), "fr");
    if (!ok(va) && !ok(vb)) return 0; if (!ok(va)) return 1; if (!ok(vb)) return -1; return dir * (va - vb); });
  const parP = {}; for (const e of rows){ const p = e.cls === "monetaire" ? "monetaire" : POCHE[e.cls]; parP[p] = (parP[p] || 0) + 1; }
  const ech = rows.filter(e => e.ech).length;
  $("#etf-synth").innerHTML = `<div class="btnrow" style="justify-content:space-between"><h2>ETF et obligations</h2><span class="note">${nf0.format(rows.length)} fonds sur ${nf0.format(B.E.length)}</span></div>
    <p class="note">${Object.entries(parP).map(([p, n]) => `${POCHE_L[p] || p} : ${nf0.format(n)}`).join(" · ")}${ech ? ` · dont ${ech} ETF obligataires à échéance, qui se comportent comme une obligation conservée jusqu'au terme` : ""}. Les obligations en direct (OAT, emprunts d'entreprises) ne cotent pas sur Yahoo Finance : le calculateur de l'onglet Taux euro les traite.</p>`;
  const show = rows.slice(0, ETFV.n);
  $("#etf-table").innerHTML = `<thead><tr>${ETF_COLS.map(c => `<th data-k="${c.k}" ${c.tip ? `title="${esc(c.tip)}"` : ""} aria-sort="${ETFV.sort.k === c.k ? (dir > 0 ? "ascending" : "descending") : "none"}">${esc(c.l)}</th>`).join("")}</tr></thead>
    <tbody>${show.map(e => `<tr data-id="${esc(e.id)}">
      <td><span class="nm">${esc(e.nom)}</span><span class="fm">${esc(e.id)}${e.fam ? " · " + esc(e.fam) : ""}${e.pea ? ' · <span class="env pea">PEA</span>' : ""}${e.ed ? ' · <span class="env">sélection</span>' : ""}</span></td>
      <td class="cat">${esc(e.cat)}</td><td>${fmt(e.ter, v => nf2.format(v) + " %")}</td><td>${mdE(e.aum)}</td><td>${fmt(e.vol, v => nf1.format(v) + " %")}</td>
      <td class="${e.mom12 > 0 ? "pos" : e.mom12 < 0 ? "neg" : ""}">${fmt(e.mom12, F.pctS)}</td><td>${fmt(e.dd1y, F.pctS)}</td><td><b>${fmt(e.mu, F.pct)}</b></td>
      <td>${e.ech ? e.ech : ok(e.T) && (POCHE[e.cls] === "obligations" || e.cls === "monetaire") ? nf1.format(e.T) + " ans" : "—"}</td>
      <td class="sg">${e.hdg ? '<span class="pill neu xs">couvert €</span>' : ""}${themePills(e.th, true)}</td></tr>`).join("")}</tbody>`;
  $$("#etf-table th").forEach(th => th.onclick = () => { const c = ETF_COLS.find(c => c.k === th.dataset.k); if (c.k === "sig") return;
    ETFV.sort = ETFV.sort.k === c.k ? {k:c.k, dir:-ETFV.sort.dir} : {k:c.k, dir:c.t === "txt" || c.asc ? 1 : -1}; renderEtfTable(); });
  $$("#etf-table tbody tr").forEach(tr => tr.onclick = () => openFiche(tr.dataset.id));
  $("#etf-more").innerHTML = rows.length > ETFV.n ? `<button class="ghost" id="etf-plus">Afficher ${Math.min(80, rows.length - ETFV.n)} de plus</button><span class="note">${nf0.format(ETFV.n)} sur ${nf0.format(rows.length)}</span>` : rows.length ? "" : `<p class="empty">Aucun fonds ne passe tous ces filtres.</p>`;
  if ($("#etf-plus")) $("#etf-plus").onclick = () => { ETFV.n += 80; renderEtfTable(); };
}
