/* ================= Opportunités : titres qui cumulent les bons signaux en ce moment ================= */
const OPP = {zone:"all", pea:false, cap:1, n:8};
const pgVide = x => !(x.pg && x.pg.length);
function secMedianes(){
  if (secMedianes.c && secMedianes.n === B.A.length) return secMedianes.c;
  const g = {}; for (const x of B.A) if (ok(x.perF) && x.perF > 0) (g[x.secteur] = g[x.secteur] || []).push(x.perF);
  const m = {}; for (const [k, v] of Object.entries(g)){ v.sort((a, b) => a - b); m[k] = v[v.length >> 1]; }
  secMedianes.n = B.A.length; return (secMedianes.c = m);
}
const chip = (t, tone = "neu") => `<span class="pill ${tone} xs">${esc(t)}</span>`;
/* Listes d'actions : filtre, note d'opportunité, raisons affichées */
const OPP_LISTES = [
  {id:"prix", titre:"Bon prix et prévisions en hausse", txt:"Sociétés bon marché face à leur secteur dont les analystes relèvent les bénéfices attendus : la décote a une raison de se réduire.",
    ok:x => x.sc.v >= 65 && x.rev90 > 2 && (x.sc.q || 0) >= 40 && (x.mom3 ?? 0) > -5 && pgVide(x),
    score:x => x.sc.v + 2 * Math.min(15, x.rev90) + (x.sc.q || 0) / 2 + Math.min(30, Math.max(0, x.upside || 0)) / 2,
    why:(x, m) => [chip(`PER ${F.x(x.perF)}${m[x.secteur] ? " (secteur " + F.x(m[x.secteur]) + ")" : ""}`, "good"), chip(`prévisions ${F.pctS(x.rev90)} en 3 mois`, "good"), ok(x.upside) ? chip(`objectif ${F.pctS(x.upside)}`) : ""]},
  {id:"solde", titre:"Qualité en solde", txt:"Entreprises très rentables et peu endettées dont le cours a nettement baissé alors que leurs prévisions tiennent.",
    ok:x => (x.sc.q || 0) >= 75 && x.dd1y <= -20 && (x.rev90 ?? 0) >= -1 && (x.mom3 ?? 0) >= 0 && pgVide(x),
    score:x => x.sc.q - x.dd1y + (x.mom3 || 0),
    why:x => [chip(`qualité ${nf0.format(x.sc.q)} / 100`, "good"), chip(`baisse de ${nf0.format(-x.dd1y)} % sur un an`, "warn"), chip(`prévisions ${F.pctS(x.rev90 || 0)}`), chip(`3 mois ${F.pctS(x.mom3 || 0)}`)]},
  {id:"retour", titre:"Redressement confirmé", txt:"Une année de baisse, puis un cours qui repart et des prévisions qui remontent : le marché commence à changer d'avis.",
    ok:x => x.mom12 < 0 && x.mom3 > 5 && x.rev90 > 2 && (x.sc.v || 0) >= 50 && pgVide(x),
    score:x => x.mom3 + 2 * Math.min(15, x.rev90) + x.sc.v / 4,
    why:x => [chip(`12 mois ${F.pctS(x.mom12)}`, "warn"), chip(`3 mois ${F.pctS(x.mom3)}`, "good"), chip(`prévisions ${F.pctS(x.rev90)}`, "good")]},
  {id:"div", titre:"Dividendes solides", txt:"Rendement élevé couvert par les bénéfices et le flux de trésorerie, dette contenue, cours peu agité.",
    ok:x => x.dy >= 4 && x.payout > 0 && x.payout <= .8 && (ok(x.fcfY) ? x.fcfY >= x.dy * .7 : (x.roe || 0) >= 10) && (!ok(x.nde) || x.nde <= 3) && (x.sc.d || 0) >= 40 && pgVide(x),
    score:x => x.dy * 5 + (x.sc.q || 0) / 2 + (x.sc.d || 0) / 4,
    why:x => [chip(`dividende ${F.pct(x.dy)}`, "good"), chip(`distribution ${nf0.format(x.payout * 100)} % du bénéfice`), ok(x.fcfY) ? chip(`flux de trésorerie ${F.pct(x.fcfY)}`) : ""]},
  {id:"rupt", titre:"Gagnants des ruptures à prix raisonnable", txt:"Sociétés portées par l'IA, la robotique, la défense ou l'électricité, confirmées par le marché, sans payer plus cher que leur secteur.",
    ok:(x, m) => Object.values(x.th || {}).some(v => v > 0) && x.conf >= 1 && ok(x.perF) && x.perF <= Math.max(18, (m[x.secteur] || 25)) && pgVide(x),
    score:(x, m) => Object.values(x.th).reduce((a, v) => a + Math.max(0, v), 0) * 8 + x.conf * 5 + ((m[x.secteur] || 25) - x.perF),
    why:(x, m) => [themePills(x.th, true), chip(`PER ${F.x(x.perF)}${m[x.secteur] ? " (secteur " + F.x(m[x.secteur]) + ")" : ""}`, "good"), chip("le marché confirme", "good")]},
  {id:"petites", titre:"Petites valeurs de qualité délaissées", txt:"Sociétés de taille moyenne, rentables et bon marché, que les grands investisseurs suivent moins.",
    ok:x => (x.sc.s || 0) >= 70 && (x.sc.q || 0) >= 65 && (x.sc.v || 0) >= 60 && (x.liq || 0) >= .5 && pgVide(x),
    score:x => x.sc.q + x.sc.v,
    why:x => [chip(`capitalisation ${mdE(x.mcap)}`), chip(`qualité ${nf0.format(x.sc.q)}`, "good"), chip(`value ${nf0.format(x.sc.v)}`, "good")]},
  {id:"evol", titre:"Notes en forte progression", txt:"Sociétés dont la note de votre profil a le plus progressé ces dernières semaines (historique hebdomadaire).",
    ok:x => ok(evolution(x)) && evolution(x) >= 8 && pgVide(x),
    score:x => evolution(x),
    why:x => [chip(`note ${F.pctS(evolution(x)).replace(" %", "")} points`, "good"), x.c13 && x.c13 !== x.cat ? chip(`${x.c13} → ${x.cat}`) : ""]}
];
function oppFiltre(x){
  if (OPP.zone !== "all" && x.zone !== OPP.zone) return false;
  if (OPP.pea && !x.pea) return false;
  if (OPP.cap && !(x.mcap >= OPP.cap)) return false;
  return (x.liq || 0) >= 1 || OPP.cap < 1;
}
function renderOpportunites(){
  const root = $("#opp-body");
  if (bourseWait(root)) return;
  const m = secMedianes();
  const base = B.A.filter(oppFiltre);
  const listes = OPP_LISTES.map(L => ({L, items:base.filter(x => L.ok(x, m)).map(x => ({x, s:L.score(x, m)})).filter(o => ok(o.s)).sort((a, b) => b.s - a.s)}));
  // ETF : zones les moins chères, obligations à échéance au meilleur taux, diversifiants
  const larges = B.E.filter(e => ["act_monde", "act_us", "act_eu", "act_jp", "act_em", "act_pays"].includes(e.cls) && !e.sty && !e.sec && !e.hdg && (e.hist || 0) >= 52 && (!OPP.pea || e.pea));
  const parZone = {};
  for (const e of larges){ const g = e.geo || (e.cls === "act_monde" ? "WORLD" : e.cls === "act_us" ? "US" : e.cls === "act_eu" ? "EUROPE" : e.cls === "act_jp" ? "JP" : e.cls === "act_em" ? "EM" : null); if (!g) continue;
    const q = qualite(e); if (!parZone[g] || q > parZone[g].q) parZone[g] = {e, q, g}; }
  const zones = Object.values(parZone).sort((a, b) => b.e.mu - a.e.mu);
  const dates = B.E.filter(e => e.ech && (e.bc === "EUR" || e.hdg) && (e.hist || 0) >= 30);
  const parEch = {}; for (const e of dates){ const k = e.ech; if (!parEch[k] || e.mu > parEch[k].mu) parEch[k] = e; }
  const echs = Object.values(parEch).sort((a, b) => a.ech - b.ech);
  const div = B.E.filter(e => ["or", "metal", "crypto"].includes(e.cls) && (e.hist || 0) >= 52).sort((a, b) => (a.cls === b.cls ? (qualite(b) - qualite(a)) : ["or", "metal", "crypto"].indexOf(a.cls) - ["or", "metal", "crypto"].indexOf(b.cls)));
  const divSel = []; const vusCls = {};
  for (const e of div){ const k = e.cls + (e.met || e.cr || ""); if ((vusCls[k] || 0) >= (e.cls === "crypto" ? 2 : 1)) continue; vusCls[k] = (vusCls[k] || 0) + 1; divSel.push(e); }
  root.innerHTML = `
    <div class="card"><div class="btnrow" style="justify-content:space-between"><h2>Opportunités du moment</h2>
      <div class="btnrow"><div class="seg" id="opp-zone">${Object.entries(ZONE_L).map(([z, l]) => `<button data-z="${z}" aria-pressed="${OPP.zone === z}">${l}</button>`).join("")}</div></div></div>
      <div class="btnrow"><label class="chk" for="opp-pea"><input type="checkbox" id="opp-pea" ${OPP.pea ? "checked" : ""}> Éligibles au PEA</label>
        <label class="field" for="opp-cap"><span>Taille minimale</span><select id="opp-cap">${[[0, "Toutes"], [1, "1 Md€"], [5, "5 Md€"], [20, "20 Md€"]].map(([v, l]) => `<option value="${v}" ${OPP.cap === v ? "selected" : ""}>${l}</option>`).join("")}</select></label></div>
      <p class="note">Chaque liste croise plusieurs signaux tirés des données du jour ; les sociétés signalées par un piège en sont écartées. Une opportunité se vérifie dans la fiche de la société avant toute décision : les signaux décrivent une situation, la suite reste incertaine.</p></div>
    ${listes.map(({L, items}) => `<div class="card"><div class="btnrow" style="justify-content:space-between"><h2>${esc(L.titre)}</h2><span class="note">${items.length} société${items.length > 1 ? "s" : ""}</span></div>
      <p class="note">${esc(L.txt)}</p>
      ${items.length ? `<div class="rlist">${items.slice(0, OPP.n).map(({x}) => `<div class="orow"><button class="rrow" data-id="${esc(x.id)}"><span class="t"><b>${esc(x.nom)}</b><small>${esc(x.id)} · ${esc(x.pays || "")} · ${esc(x.secteur)} · ${esc(x.cat)}${x.pea ? " · PEA" : ""}${AN.idx.has(x.id) ? " " + anPill(x.id, true) : ""}</small></span>
        <span class="v"><span class="why">${L.why(x, m).join("")}</span><small>rdt réel att. ${fmt(x.muR, F.pct)} · note ${fmt(noteProfil(x), v => nf0.format(v))}</small></span></button><button class="ghost small" data-add="${esc(x.id)}" aria-label="Mettre ${esc(x.nom)} à l'étude" title="${anStatut(x.id) === "entrer" ? "Analyse validée : ajouter au portefeuille" : "Mettre à l'étude : analyse approfondie avant le portefeuille"}">+</button></div>`).join("")}</div>`
        : `<p class="empty">${L.id === "evol" && !(B.meta.histo && B.meta.histo.w1) ? "L'historique des notes démarre : cette liste se remplira après le relevé de lundi prochain." : "Aucune société ne remplit toutes les conditions avec ces filtres."}</p>`}</div>`).join("")}
    <div class="card"><h2>Zones boursières les moins chères</h2><p class="note">Rendement réel attendu de chaque zone (1 / CAPE, net de frais), avec l'ETF le plus gros et le moins cher qui la couvre.</p>
      <div class="tblwrap" style="border:0"><table class="t" style="min-width:520px"><thead><tr><th>Zone</th><th>ETF</th><th class="n">Frais</th><th class="n">Rdt réel att.</th><th class="n">Perf. 12 m</th><th></th></tr></thead><tbody>
      ${zones.slice(0, 12).map(({e, g}) => `<tr><td><b>${esc((geoL(g) || "").replace(/^./, c => c.toUpperCase()))}</b></td><td><button class="lk" data-f="${esc(e.id)}">${esc(e.nom)}</button><span class="cmp" style="display:block;margin:0">${esc(e.id)}${e.pea ? " · PEA" : ""}</span></td><td class="n">${fmt(e.ter, v => nf2.format(v) + " %")}</td><td class="n"><b>${F.pct(e.mu)}</b></td><td class="n">${fmt(e.mom12, F.pctS)}</td><td class="n"><button class="ghost small" data-add="${esc(e.id)}">+</button></td></tr>`).join("")}
      </tbody></table></div></div>
    <div class="card"><h2>Obligations à échéance : le taux de chaque année</h2><p class="note">ETF obligataires datés en euros (ou couverts) : conservés jusqu'au terme, ils rapportent à peu près le taux affiché. Pour chaque année d'échéance, le fonds au meilleur rendement attendu.</p>
      ${echs.length ? `<div class="tblwrap" style="border:0"><table class="t" style="min-width:560px"><thead><tr><th class="n">Échéance</th><th>ETF</th><th class="n">Taux attendu</th><th class="n">Après inflation</th><th class="n">Frais</th><th></th></tr></thead><tbody>
      ${echs.map(e => `<tr><td class="n"><b>${e.ech}</b></td><td><button class="lk" data-f="${esc(e.id)}">${esc(e.nom)}</button><span class="cmp" style="display:block;margin:0">${esc(etfSousTitre(e))}</span></td><td class="n">${F.pct(bondNominal(e) - (ok(e.ter) ? e.ter : .3))}</td><td class="n"><b>${F.pct(e.mu)}</b></td><td class="n">${fmt(e.ter, v => nf2.format(v) + " %")}</td><td class="n"><button class="ghost small" data-add="${esc(e.id)}">+</button></td></tr>`).join("")}
      </tbody></table></div>` : '<p class="empty">Aucun ETF obligataire daté dans les données du jour.</p>'}</div>
    <div class="card" id="opp-div"><h2>Diversifiants : or, métaux précieux, cryptomonnaies</h2><p class="note">Chargement des cours…</p></div>`;
  $$("#opp-zone button").forEach(b => b.onclick = () => { OPP.zone = b.dataset.z; renderOpportunites(); });
  $("#opp-pea").oninput = e => { OPP.pea = e.target.checked; renderOpportunites(); };
  $("#opp-cap").oninput = e => { OPP.cap = +e.target.value; renderOpportunites(); };
  $$("#opp-body .rrow, #opp-body [data-f]").forEach(b => b.onclick = () => openFiche(b.dataset.id || b.dataset.f));
  $$("#opp-body [data-add]").forEach(b => b.onclick = e => { e.stopPropagation(); const x = B.byId.get(b.dataset.add);
    if (x && x.kind === "action" && anStatut(x.id) !== "entrer"){ if (anAjouter(x.id)) renderOpportunites(); } else pfAddLine(b.dataset.add); });
  renderDiversifiants(divSel);
}
/* Effet d'une petite part de chaque diversifiant sur le portefeuille actif (ou sur l'ETF Monde) */
async function renderDiversifiants(sel){
  const p = pfActive(), lignes = p && p.lignes.length ? p.lignes : [{id:"EUNL.DE", w:100}];
  const ids = sel.map(e => e.id).concat(lignes.map(l => l.id), ["EUNL.DE"]);
  await needRets(ids);
  const el = $("#opp-div"); if (!el || CUR !== "opportunites") return;
  const L = lignes.map(l => ({x:B.byId.get(l.id), r:B.R.get(l.id), w:+l.w || 0})).filter(l => l.x && l.r && l.w > 0);
  const tot = L.reduce((a, l) => a + l.w, 0) || 1;
  const an = L.length ? Q.analyse(L.map(l => ({id:l.x.id, r:l.r, mu:l.x.mu})), L.map(l => l.w / tot)) : null;
  const monde = B.R.get("EUNL.DE");
  const corrMonde = r => { const T = Math.min(156, r.length); let n = 0, ma = 0, mb = 0; const s = r.length - T;
    for (let t = s; t < r.length; t++) if (r[t] === r[t] && monde[t] === monde[t]){ ma += r[t]; mb += monde[t]; n++; }
    if (n < 40) return null; ma /= n; mb /= n; let c = 0, va = 0, vb = 0;
    for (let t = s; t < r.length; t++) if (r[t] === r[t] && monde[t] === monde[t]){ const a = r[t] - ma, b = monde[t] - mb; c += a * b; va += a * a; vb += b * b; }
    return c / Math.sqrt(va * vb); };
  const part = e => e.cls === "crypto" ? .02 : .05;
  const scan = an ? new Map(sel.map(e => { const r = B.R.get(e.id); const s = r ? Q.scanAdd(an, an.R, L.map(l => l.w / tot), [{id:e.id, r, mu:e.mu}], part(e))[0] : null; return [e.id, s]; })) : new Map();
  el.innerHTML = `<h2>Diversifiants : or, métaux précieux, cryptomonnaies</h2>
    <p class="note">Peu liés aux actions, ils peuvent réduire le risque d'ensemble, au prix d'un rendement attendu faible ou nul (aucun revenu). Effet calculé sur ${p && p.lignes.length ? `votre portefeuille « ${esc(p.nom)} »` : "l'ETF Monde seul"} avec 5 % de métal ou 2 % de cryptomonnaie.</p>
    <div class="tblwrap" style="border:0"><table class="t" style="min-width:640px"><thead><tr><th>Actif</th><th class="n">Perf. 12 m</th><th class="n">Pire baisse 1 an</th><th class="n">Volatilité</th><th class="n">Corrélation au monde</th><th class="n">Effet sur le portefeuille</th><th></th></tr></thead><tbody>
    ${sel.map(e => { const r = B.R.get(e.id), c = r ? corrMonde(r) : null, s = scan.get(e.id);
      return `<tr><td><button class="lk" data-f="${esc(e.id)}">${esc(e.nom)}</button><span class="cmp" style="display:block;margin:0">${esc(etfSousTitre(e))}</span></td><td class="n">${fmt(e.mom12, F.pctS)}</td><td class="n">${fmt(e.dd1y, F.pctS)}</td><td class="n">${fmt(e.vol, v => nf0.format(v) + " %")}</td>
        <td class="n">${fmt(c, v => nf2.format(v))}</td><td class="n">${s && an ? `volatilité ${nf1.format(s.volB)} → <b>${nf1.format(s.vol)} %</b><br>paris indép. ${nf1.format(s.enbB)} → ${nf1.format(s.enb)}` : "—"}</td><td class="n"><button class="ghost small" data-add="${esc(e.id)}">+</button></td></tr>`; }).join("")}
    </tbody></table></div>
    <p class="note">Les cryptomonnaies ont perdu plus de 60 % à plusieurs reprises (2018, 2022) : une part de 1 à 3 % suffit à en mesurer l'effet. Elles se détiennent sur une plateforme enregistrée auprès de l'AMF, ou sur un compte-titres via un produit coté (ETP).</p>`;
  $$("#opp-div [data-f]").forEach(b => b.onclick = () => openFiche(b.dataset.f));
  $$("#opp-div [data-add]").forEach(b => b.onclick = () => pfAddLine(b.dataset.add));
}
