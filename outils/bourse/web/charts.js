/* ================= Graphiques (d3, couleurs du thème) ================= */
/* series : [{name, color, pts:[[x,y],…], band:[[x,lo,hi],…], dash}] ; opts : {h, xType:"time"|"num", yFmt, xFmt, ref:[{y,label}], yMin, yMax, xTicks} */
function lineChart(el, series, opts = {}){
  el.innerHTML = "";
  const W = Math.max(280, el.clientWidth || 520), H = opts.h || 200, m = {t:12, r:opts.r ?? 54, b:24, l:opts.l ?? 44};
  const all = series.flatMap(s => s.pts.concat((s.band || []).flatMap(b => [[b[0], b[1]], [b[0], b[2]]])));
  if (!all.length){ el.innerHTML = '<p class="note">Pas de donnée.</p>'; return; }
  const xs = all.map(p => p[0]), ys = all.map(p => p[1]);
  const x = (opts.xType === "time" ? d3.scaleTime() : d3.scaleLinear()).domain(opts.xDomain || d3.extent(xs)).range([m.l, W - m.r]);
  let y0 = opts.yMin ?? d3.min(ys), y1 = opts.yMax ?? d3.max(ys);
  if (opts.ref) for (const r of opts.ref){ y0 = Math.min(y0, r.y); y1 = Math.max(y1, r.y); }
  const pad = (y1 - y0) * .08 || 1;
  const y = d3.scaleLinear().domain([opts.yMin ?? y0 - pad, opts.yMax ?? y1 + pad]).nice(5).range([H - m.b, m.t]);
  const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${W} ${H}`).attr("role", "img").attr("aria-label", opts.label || "Graphique");
  svg.append("g").attr("class", "grid").selectAll("line").data(y.ticks(5)).join("line")
    .attr("x1", m.l).attr("x2", W - m.r).attr("y1", d => y(d)).attr("y2", d => y(d));
  const yf = opts.yFmt || (v => nf1.format(v));
  svg.append("g").attr("class", "ax").attr("transform", `translate(${m.l},0)`).call(d3.axisLeft(y).ticks(5).tickSize(0).tickPadding(6).tickFormat(yf)).select(".domain").remove();
  const xa = d3.axisBottom(x).ticks(opts.xTicks || 6).tickSize(3).tickPadding(4);
  if (opts.xFmt) xa.tickFormat(opts.xFmt); else if (opts.xType === "time") xa.tickFormat(d3.timeFormat("%Y"));
  svg.append("g").attr("class", "ax").attr("transform", `translate(0,${H - m.b})`).call(xa).select(".domain").remove();
  if (opts.ref) for (const r of opts.ref){
    svg.append("line").attr("x1", m.l).attr("x2", W - m.r).attr("y1", y(r.y)).attr("y2", y(r.y)).attr("stroke", css("--muted")).attr("stroke-dasharray", "3 3");
    if (r.label) svg.append("text").attr("x", W - m.r + 4).attr("y", y(r.y) + 4).text(r.label).style("font-size", "10.5px");
  }
  const labels = [];
  for (const s of series){
    const col = s.color || css("--accent");
    if (s.band && s.band.length){
      svg.append("path").attr("d", d3.area().x(d => x(d[0])).y0(d => y(d[1])).y1(d => y(d[2]))(s.band)).attr("fill", col).attr("opacity", .14);
    }
    if (s.area){
      svg.append("path").attr("d", d3.area().x(d => x(d[0])).y0(y(y.domain()[0])).y1(d => y(d[1]))(s.pts)).attr("fill", col).attr("opacity", .1);
    }
    svg.append("path").attr("d", d3.line().x(d => x(d[0])).y(d => y(d[1])).curve(opts.step ? d3.curveStepAfter : d3.curveMonotoneX)(s.pts))
      .attr("fill", "none").attr("stroke", col).attr("stroke-width", s.w || 2).attr("stroke-dasharray", s.dash || null).attr("stroke-linejoin", "round");
    const last = s.pts[s.pts.length - 1];
    if (last && !s.noEnd){
      svg.append("circle").attr("cx", x(last[0])).attr("cy", y(last[1])).attr("r", 3.5).attr("fill", col).attr("stroke", css("--surface")).attr("stroke-width", 1.5);
      if (s.endLabel !== false) labels.push({y:y(last[1]), x:x(last[0]) + 6, t:s.endLabel || yf(last[1]), c:col});
    }
  }
  labels.sort((a,b) => a.y - b.y); for (let i = 1; i < labels.length; i++) if (labels[i].y - labels[i-1].y < 12) labels[i].y = labels[i-1].y + 12;
  for (const l of labels) svg.append("text").attr("x", l.x).attr("y", l.y + 4).text(l.t).style("fill", l.c).style("font", "500 11px var(--mono)");
  return {x, y, svg};
}
/* Nuage de points : pts [{x, y, label, color, id, faded}] */
function scatter(el, pts, opts = {}){
  el.innerHTML = "";
  const W = Math.max(300, el.clientWidth || 600), H = opts.h || 300, m = {t:14, r:16, b:36, l:46};
  const x = d3.scaleLinear().domain([0, Math.max(5, d3.max(pts, p => p.x) * 1.08)]).nice().range([m.l, W - m.r]);
  const y = d3.scaleLinear().domain([Math.min(0, d3.min(pts, p => p.y)) - .3, d3.max(pts, p => p.y) + .4]).nice().range([H - m.b, m.t]);
  const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${W} ${H}`).attr("role", "img").attr("aria-label", opts.label || "Nuage de points");
  svg.append("g").attr("class", "grid").selectAll("line").data(y.ticks(6)).join("line").attr("x1", m.l).attr("x2", W - m.r).attr("y1", d => y(d)).attr("y2", d => y(d));
  if (y.domain()[0] < 0) svg.append("line").attr("x1", m.l).attr("x2", W - m.r).attr("y1", y(0)).attr("y2", y(0)).attr("stroke", css("--muted"));
  svg.append("g").attr("class", "ax").attr("transform", `translate(${m.l},0)`).call(d3.axisLeft(y).ticks(6).tickSize(0).tickPadding(6).tickFormat(v => nf0.format(v) + " %")).select(".domain").remove();
  svg.append("g").attr("class", "ax").attr("transform", `translate(0,${H - m.b})`).call(d3.axisBottom(x).ticks(7).tickSize(3).tickFormat(v => nf0.format(v) + " %")).select(".domain").remove();
  svg.append("text").attr("x", W - m.r).attr("y", H - 4).attr("text-anchor", "end").text(opts.xLabel || "");
  svg.append("text").attr("x", m.l).attr("y", m.t - 2).text(opts.yLabel || "");
  const g = svg.append("g");
  const lab = [];
  for (const p of pts){
    const c = g.append("circle").attr("cx", x(p.x)).attr("cy", y(p.y)).attr("r", p.sel ? 7 : 5.5).attr("fill", p.color).attr("opacity", p.faded ? .25 : .9)
      .attr("stroke", p.sel ? css("--fg") : css("--surface")).attr("stroke-width", p.sel ? 2 : 1.2).style("cursor", "pointer");
    c.append("title").text(p.title || p.label);
    if (opts.onClick) c.on("click", () => opts.onClick(p));
    if (!p.faded && p.showLabel) lab.push({x:x(p.x) + 8, y:y(p.y) + 4, t:p.label, c:p.color, id:p.id});
  }
  // évitement simple des chevauchements d'étiquettes
  lab.sort((a,b) => a.y - b.y);
  const placed = [];
  for (const l of lab){
    const w = l.t.length * 6.2;
    let tries = 0;
    while (placed.some(q => Math.abs(q.y - l.y) < 12 && l.x < q.x + q.w && q.x < l.x + w) && tries < 6){ l.y += 12; tries++; }
    if (l.x + w > W - m.r){ l.x = l.x - w - 16; }
    placed.push({...l, w});
    g.append("text").attr("x", l.x).attr("y", l.y).text(l.t).style("fill", css("--fg")).style("font-size", "11px").style("cursor", "pointer").on("click", () => opts.onClick && opts.onClick(pts.find(p => p.id === l.id)));
  }
}
