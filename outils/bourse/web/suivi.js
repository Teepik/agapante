/* ================= Stockage : base Agapante (Neon), copie dans ce navigateur ================= */
const Store = {
  mode:"local", status:"", data:{suivi:{items:[]}, alertes:{rules:[]}, journal:{entries:[]}, foyer:null, portefeuilles:{liste:[], actif:null}, constructeur:null, preferences:null},
  q:{}, t:{},
  key:k => "bourse." + k,
  loadLocal(){ for (const k of Object.keys(this.data)){ try { const v = localStorage.getItem(this.key(k)); if (v) this.data[k] = JSON.parse(v); } catch(e){} } },
  async init(onReady){
    this.loadLocal(); onReady();
    try {
      const r = await fetch("/bourse/api/etat", {credentials:"same-origin", cache:"no-store"});
      if (r.status === 401){ location.href = "/admin?suite=/bourse"; return; }
      if (!r.ok) throw new Error(String(r.status));
      const srv = await r.json();
      for (const k of Object.keys(this.data)){
        if (srv[k] !== undefined && srv[k] !== null) this.data[k] = srv[k];
        else if (this.data[k] && JSON.stringify(this.data[k]).length > 40) this.push(k);
      }
      this.mode = "db"; this.status = ""; onReady();
    } catch(e){ this.mode = "local"; this.status = "Base Agapante injoignable pour l'instant : enregistrement dans ce navigateur, envoi à la prochaine connexion."; renderStoreStatus(); }
  },
  push(k){
    clearTimeout(this.t[k]);
    this.t[k] = setTimeout(() => {
      const body = JSON.stringify({k, v:this.data[k]});
      this.q[k] = (this.q[k] || Promise.resolve()).then(() => fetch("/bourse/api/etat", {method:"PUT", credentials:"same-origin", headers:{"Content-Type":"application/json"}, body}))
        .then(r => { if (!r.ok) throw new Error(String(r.status)); if (this.mode !== "db"){ this.mode = "db"; this.status = ""; renderStoreStatus(); } })
        .catch(() => { this.status = "Enregistrement en attente : la base Agapante ne répond pas, la copie de ce navigateur est à jour."; renderStoreStatus(); });
    }, 500);
  },
  save(k, val){
    this.data[k] = val;
    try { localStorage.setItem(this.key(k), JSON.stringify(val)); } catch(e){}
    this.push(k);
    renderSuiviCount();
  }
};
function renderStoreStatus(){
  const el = $("#store-status"); if (!el) return;
  el.textContent = Store.status || (Store.mode === "db" ? "Liste de suivi, alertes, journal, portefeuilles et réglages sont enregistrés dans la base Agapante : vous les retrouvez sur tous vos appareils." : "Connexion à la base Agapante…");
}
function renderSuiviCount(){
  const n = (Store.data.alertes.rules || []).filter(r => alertState(r).on).length;
  $("#suivi-count").textContent = n ? n : "";
}

/* ================= Métriques globales pour alertes et instantanés ================= */
const GLOBAL = {
  oat10:{l:"OAT à 10 ans", f:F.pct2, v:() => curveAt("FR", 10)},
  bund10:{l:"Bund à 10 ans", f:F.pct2, v:() => curveAt("DE", 10)},
  btp10:{l:"BTP italien à 10 ans", f:F.pct2, v:() => curveAt("IT", 10)},
  sprFR:{l:"Écart OAT − Bund à 10 ans (pb)", f:v => nf0.format(v) + " pb", v:() => (curveAt("FR", 10) - curveAt("DE", 10)) * 100},
  ust10:{l:"Treasury américain à 10 ans", f:F.pct2, v:() => curveAt("US", 10)},
  hy:{l:"Haut rendement euro", f:F.pct2, v:() => 6.58},
  ig:{l:"Crédit euro de qualité", f:F.pct2, v:() => 4.13},
  estr:{l:"€STR", f:F.pct2, v:() => ESTR},
  eyWorld:{l:"Rendement réel attendu, ETF Monde (1 / CAPE)", f:F.pct, v:() => basketEY(W_WORLD)},
  eyEM:{l:"Rendement réel attendu, ETF Émergents (1 / CAPE)", f:F.pct, v:() => basketEY(W_EM)}
};
function metricValue(r){ return r.code === "_" ? GLOBAL[r.k].v() : (P[r.code] ? P[r.code][r.k] : null); }
function metricLabel(r){ return r.code === "_" ? GLOBAL[r.k].l : `${IND[r.k] ? IND[r.k].l : r.k} · ${P[r.code] ? P[r.code].nom : r.code}`; }
function metricFmt(r, v){ return fmt(v, r.code === "_" ? GLOBAL[r.k].f : (IND[r.k] ? IND[r.k].f : F.x)); }
function alertState(r){ const v = metricValue(r); if (!ok(v)) return {on:false, v:null}; return {on: r.op === ">" ? v >= r.val : v <= r.val, v}; }
function snapshot(){ return {date:D.meta.date, oat10:GLOBAL.oat10.v(), sprFR:GLOBAL.sprFR.v(), hy:6.58, eyWorld:GLOBAL.eyWorld.v(), capeUS:P.US.cape}; }
const SUGG_ALERTS = [
  {code:"_", k:"oat10", op:">", val:5, l:"OAT à 10 ans au-dessus de 5 % : fenêtre pour figer un taux"},
  {code:"_", k:"sprFR", op:">", val:160, l:"Écart OAT − Bund au-delà de 160 pb : tension sur la dette française"},
  {code:"_", k:"hy", op:">", val:7.5, l:"Haut rendement euro au-delà de 7,5 %"},
  {code:"US", k:"cape", op:"<", val:30, l:"CAPE américain sous 30"},
  {code:"JP", k:"z10", op:"<", val:-1, l:"Japon : PER à plus d'un écart-type sous sa moyenne 10 ans"},
  {code:"_", k:"estr", op:"<", val:2, l:"€STR sous 2 % : les placements monétaires perdent de leur intérêt"}
];

/* ================= Rendu de la vue « Mon suivi » ================= */
function renderSuivi(){
  renderStoreStatus();
  // Liste de suivi
  const items = Store.data.suivi.items || [];
  $("#watch").innerHTML = `<h2>Liste de suivi</h2>
    ${items.length ? items.map((it, i) => {
      if (it.type === "pays"){ const c = P[it.id]; if (!c) return "";
        const d = (k, f) => ok(c[k]) ? `${fmt(c[k], f)}${it.snap && ok(it.snap[k]) && it.snap[k] !== c[k] ? ` <span class="cmp">(${fmt(it.snap[k], f)} à l'ajout)</span>` : ""}` : "—";
        return `<div class="item"><div class="t"><b>${esc(c.nom)}</b><span>Actions ${fmt(c.sA, v => nf0.format(v))} · obligations ${fmt(c.sO, v => nf0.format(v))} · PER ${d("per", F.x)} · 10 ans ${d("y10", F.pct2)} · ajouté le ${esc(new Date(it.at).toLocaleDateString("fr-FR"))}</span></div>
          <div class="acts"><button class="ghost small" data-go="${c.code}">Voir</button><button class="ghost small danger" data-del="${i}" aria-label="Retirer">Retirer</button></div></div>`; }
      if (it.type === "action" || it.type === "etf"){ const x = B.byId.get(it.id); if (!x) return B.etat === "pret" ? `<div class="item"><div class="t"><b>${esc(it.id)}</b><span>Absent des données du jour</span></div><div class="acts"><button class="ghost small danger" data-del="${i}">Retirer</button></div></div>` : "";
        const dpx = it.snap && ok(it.snap.px) && ok(x.px) ? (x.px / it.snap.px - 1) * 100 : null;
        return `<div class="item"><div class="t"><b>${esc(x.nom)}</b><span>${x.kind === "action" ? `${esc(x.cat)}${it.snap && it.snap.cat && it.snap.cat !== x.cat ? ` (${esc(it.snap.cat)} à l'ajout)` : ""} · note ${fmt(noteProfil(x), v => nf0.format(v))}${it.snap && ok(it.snap.note) ? ` (${nf0.format(it.snap.note)} à l'ajout)` : ""} · ` : esc(CLS_L[x.cls]) + " · "}cours ${ok(x.px) ? nf2.format(x.px) + " " + esc(x.ccy || "") : "—"}${ok(dpx) ? ` (${F.pctS(dpx)} depuis l'ajout)` : ""} · rdt réel att. ${fmt(x.mu, F.pct)}${x.pg && x.pg.length ? " · " + esc(x.pg.map(p => p[0]).join(", ")) : ""} · ajouté le ${esc(new Date(it.at).toLocaleDateString("fr-FR"))}</span></div>
          <div class="acts"><button class="ghost small" data-fi="${esc(x.id)}">Voir</button><button class="ghost small danger" data-del="${i}">Retirer</button></div></div>`; }
      const p = PLI[it.id]; if (!p) return "";
      const s = evaluate(p, ctx());
      return `<div class="item"><div class="t"><b>${esc(p.nom)}</b><span>${esc(FAM[p.fam].l)} · brut attendu ${nf2.format(s.r)} %${it.snap && ok(it.snap.r) && Math.abs(it.snap.r - s.r) > .005 ? ` (${nf2.format(it.snap.r)} % à l'ajout)` : ""} · net réel ${nf2.format(s.rReel)} % sur ${ctx().T} ans · ajouté le ${esc(new Date(it.at).toLocaleDateString("fr-FR"))}</span></div>
        <div class="acts"><button class="ghost small" data-pl="${p.id}">Voir</button><button class="ghost small danger" data-del="${i}">Retirer</button></div></div>`;
    }).join("") : `<p class="empty">Ajoutez des pays depuis leur fiche (bouton « Suivre ce pays »), des placements depuis le comparateur, des actions ou des ETF depuis leur fiche. Chaque élément garde ses chiffres du jour d'ajout pour mesurer ce qui a bougé à la mise à jour suivante des données.</p>`}`;
  $$("#watch [data-del]").forEach(b => b.onclick = () => { const a = items.slice(); a.splice(+b.dataset.del, 1); Store.save("suivi", {items:a}); renderSuivi(); });
  $$("#watch [data-go]").forEach(b => b.onclick = () => { go("carte"); selectCountry(b.dataset.go); });
  $$("#watch [data-pl]").forEach(b => b.onclick = () => { CMP.sel = b.dataset.pl; go("comparateur"); });
  $$("#watch [data-fi]").forEach(b => b.onclick = () => openFiche(b.dataset.fi));
  // Alertes
  const rules = Store.data.alertes.rules || [];
  const unused = SUGG_ALERTS.filter(s => !rules.some(r => r.code === s.code && r.k === s.k && r.op === s.op));
  $("#alerts").innerHTML = `<div class="btnrow" style="justify-content:space-between"><h2>Alertes</h2><button class="primary" id="al-new">Nouvelle alerte</button></div>
    ${rules.length ? rules.map((r, i) => { const st = alertState(r);
      return `<div class="item"><div class="t"><b>${esc(r.l || metricLabel(r))}</b><span>${r.l ? esc(metricLabel(r)) + " " : ""}${r.op === ">" ? "≥" : "≤"} ${esc(metricFmt(r, r.val))} · aujourd'hui ${esc(metricFmt(r, st.v))}</span></div>
        <div class="acts"><span class="status ${st.on ? "on" : "off"}"><i></i>${st.on ? "Déclenchée" : "En veille"}</span><button class="ghost small danger" data-adel="${i}" aria-label="Supprimer l'alerte">×</button></div></div>`; }).join("") : `<p class="empty">Une alerte compare un indicateur à un seuil à chaque mise à jour des données de l'atlas.</p>`}
    ${unused.length ? `<div><h3 style="margin:10px 0 6px">Alertes suggérées</h3>${unused.map((s, i) => { const st = alertState(s);
      return `<div class="item"><div class="t"><b>${esc(s.l)}</b><span>Aujourd'hui ${esc(metricFmt(s, st.v))} · ${st.on ? "déjà atteint" : "en veille"}</span></div><div class="acts"><button class="ghost small" data-sug="${i}">Ajouter</button></div></div>`; }).join("")}</div>` : ""}`;
  $$("#alerts [data-adel]").forEach(b => b.onclick = () => { const a = rules.slice(); a.splice(+b.dataset.adel, 1); Store.save("alertes", {rules:a}); renderSuivi(); });
  $$("#alerts [data-sug]").forEach(b => b.onclick = () => { Store.save("alertes", {rules:rules.concat([{...unused[+b.dataset.sug], at:Date.now()}])}); renderSuivi(); });
  $("#al-new").onclick = () => openAlertModal({code:"_", k:"oat10"});
  // Journal
  const ent = Store.data.journal.entries || [];
  $("#journal").innerHTML = `<div class="btnrow" style="justify-content:space-between"><h2>Journal des décisions</h2><button class="primary" id="j-new">Noter une décision</button></div>
    <p class="note">Chaque décision garde l'état du marché du jour : OAT à 10 ans, écart avec le Bund, rendement attendu des actions mondiales. Relire ses raisons avant d'acheter ou de vendre évite les décisions au coup de cœur.</p>
    ${ent.length ? `<div class="tblwrap" style="border:0"><table class="t"><thead><tr><th>Date</th><th>Décision</th><th>Raison</th><th class="n">Marché ce jour-là</th><th class="n">À revoir</th><th></th></tr></thead><tbody>${ent.slice().reverse().map((e, j) => { const i = ent.length - 1 - j; const p = PLI[e.placement];
      return `<tr><td>${esc(new Date(e.date).toLocaleDateString("fr-FR"))}</td><td><b>${esc(e.type)}</b> · ${esc(p ? p.nom : e.placement)}<br><span class="cmp" style="margin:0">${F.eur(e.montant || 0)} · ${esc(ENV_L[e.env] || e.env || "")}</span></td><td style="white-space:normal;min-width:180px">${esc(e.raison || "")}</td>
        <td class="n">OAT ${fmt(e.snap && e.snap.oat10, F.pct2)}<br>Monde ${fmt(e.snap && e.snap.eyWorld, F.pct)}</td><td class="n">${e.revoir ? esc(new Date(e.revoir).toLocaleDateString("fr-FR")) : "—"}</td><td class="n"><button class="ghost small danger" data-jdel="${i}" aria-label="Supprimer">×</button></td></tr>`; }).join("")}</tbody></table></div>` : `<p class="empty">Aucune décision notée pour l'instant.</p>`}`;
  $$("#journal [data-jdel]").forEach(b => b.onclick = () => { const a = ent.slice(); a.splice(+b.dataset.jdel, 1); Store.save("journal", {entries:a}); renderSuivi(); });
  $("#j-new").onclick = () => openJournalModal({});
  renderSuiviCount();
}
function addWatch(it){
  const items = (Store.data.suivi.items || []).slice();
  if (items.some(x => x.type === it.type && x.id === it.id)){ toast("Déjà dans votre liste de suivi"); return; }
  let snap = {};
  if (it.type === "pays"){ const c = P[it.id]; snap = {per:c.per, y10:c.y10, sA:c.sA, sO:c.sO, cape:c.cape}; }
  else if (it.type === "action" || it.type === "etf"){ const x = B.byId.get(it.id); snap = {px:x && x.px, mu:x && x.mu, note:x && x.kind === "action" ? noteProfil(x) : null, cat:x && x.cat}; }
  else { const s = evaluate(PLI[it.id], ctx()); snap = {r:s.r}; }
  items.push({...it, at:Date.now(), snap});
  Store.save("suivi", {items}); toast("Ajouté à votre liste de suivi");
}

/* ================= Fenêtres de saisie ================= */
let modalSubmit = null;
function openModal(title, html, onSubmit, okLabel){
  $("#m-title").textContent = title; $("#m-body").innerHTML = html; modalSubmit = onSubmit; $("#m-ok").textContent = okLabel || "Enregistrer"; $("#modal").hidden = false;
  const f = $("#m-body input, #m-body select, #m-body textarea"); if (f) f.focus();
}
function closeModal(){ $("#modal").hidden = true; modalSubmit = null; }
function openAlertModal(pre){
  const metrics = [["_", "Indicateurs de marché"]].concat(U.filter(c => c.code !== "RU").sort((a,b) => a.nom.localeCompare(b.nom, "fr")).map(c => [c.code, c.nom]));
  const optsK = code => code === "_" ? Object.entries(GLOBAL).map(([k, g]) => `<option value="${k}">${esc(g.l)}</option>`).join("") : INDS.filter(i => ok(P[code][i.k])).map(i => `<option value="${i.k}">${esc(i.l)}</option>`).join("");
  openModal("Nouvelle alerte", `<div class="form">
      <label for="a-code" class="wide">Pays ou marché<select id="a-code">${metrics.map(([k, l]) => `<option value="${k}">${esc(l)}</option>`).join("")}</select></label>
      <label for="a-k" class="wide">Indicateur<select id="a-k"></select></label>
      <label for="a-op">Condition<select id="a-op"><option value=">">atteint ou dépasse</option><option value="<">descend à ou sous</option></select></label>
      <label for="a-val">Seuil<input id="a-val" type="number" step="any"></label>
      <label for="a-l" class="wide">Nom de l'alerte (facultatif)<input id="a-l" placeholder="Ex. : fenêtre pour acheter des OAT"></label>
    </div><p class="note" id="a-now"></p>`, () => {
      const r = {code:$("#a-code").value, k:$("#a-k").value, op:$("#a-op").value, val:+$("#a-val").value, l:$("#a-l").value.trim(), at:Date.now()};
      if (!ok(r.val)) { toast("Indiquez un seuil chiffré"); return false; }
      Store.save("alertes", {rules:(Store.data.alertes.rules || []).concat([r])}); toast("Alerte enregistrée"); renderSuivi(); return true;
    });
  const code = $("#a-code"), k = $("#a-k"), now = () => { const r = {code:code.value, k:k.value}; const v = metricValue(r); $("#a-now").textContent = "Valeur actuelle : " + metricFmt(r, v); if (ok(v) && !$("#a-val").value) $("#a-val").value = Math.round(v * 100) / 100; };
  code.value = pre.code || "_"; k.innerHTML = optsK(code.value); if (pre.k && [...k.options].some(o => o.value === pre.k)) k.value = pre.k;
  code.oninput = () => { k.innerHTML = optsK(code.value); $("#a-val").value = ""; now(); };
  k.oninput = () => { $("#a-val").value = ""; now(); };
  now();
}
function openJournalModal(pre){
  const today = new Date().toISOString().slice(0, 10);
  openModal("Noter une décision", `<div class="form">
      <label for="j-date">Date<input id="j-date" type="date" value="${today}"></label>
      <label for="j-type">Décision<select id="j-type"><option>Achat</option><option>Renforcement</option><option>Vente</option><option>Arbitrage</option><option>Attente</option></select></label>
      <label for="j-pl" class="wide">Placement<select id="j-pl">${PL.map(p => `<option value="${p.id}">${esc(p.nom)}</option>`).join("")}</select></label>
      <label for="j-m">Montant (€)<input id="j-m" type="number" min="0" step="100" value="${pre.montant || ""}"></label>
      <label for="j-env">Enveloppe<select id="j-env">${Object.entries(ENV_L).map(([k, l]) => `<option value="${k}">${esc(l)}</option>`).join("")}</select></label>
      <label for="j-r" class="wide">Pourquoi maintenant<textarea id="j-r" rows="3" placeholder="Ex. : OAT 10 ans au-dessus de 4,7 %, horizon de la maison de famille à 4 ans"></textarea></label>
      <label for="j-rev">À revoir le<input id="j-rev" type="date"></label>
    </div>`, () => {
      const e = {date:$("#j-date").value || today, type:$("#j-type").value, placement:$("#j-pl").value, montant:+$("#j-m").value || 0, env:$("#j-env").value, raison:$("#j-r").value.trim(), revoir:$("#j-rev").value || null, snap:snapshot()};
      const ent = (Store.data.journal.entries || []).concat([e]).slice(-300);
      Store.save("journal", {entries:ent}); toast("Décision notée"); renderSuivi(); return true;
    });
  if (pre.placement) $("#j-pl").value = pre.placement;
  if (pre.env) $("#j-env").value = pre.env;
}
