/* ================= Moteur de portefeuille : risque, diversification, simulation ================= */
/* Les séries sont des rendements hebdomadaires en euros (fractions), alignées sur les mêmes semaines. */
const Q = {};
Q.mean = a => { let s = 0, n = 0; for (const v of a) if (v === v){ s += v; n++; } return n ? s / n : 0; };
/* Fenêtre commune : dernières semaines où toutes les séries existent (au moins minW) */
Q.window = (series, maxW = 260, minW = 52) => {
  const T = series[0].length; let start = Math.max(0, T - maxW);
  for (const s of series){ let k = T - 1; while (k >= 0 && s[k] === s[k]) k--; start = Math.max(start, k + 1); }
  if (T - start < minW) start = Math.max(0, T - minW);
  return series.map(s => s.slice(start).map(v => v === v ? v : 0));
};
/* Covariance avec rétrécissement de Ledoit et Wolf vers une corrélation constante (2004) */
Q.covShrink = R => {
  const N = R.length, T = R[0].length;
  const mu = R.map(Q.mean), X = R.map((r, i) => r.map(v => v - mu[i]));
  const S = Array.from({length:N}, () => new Float64Array(N));
  for (let i = 0; i < N; i++) for (let j = i; j < N; j++){ let s = 0; const a = X[i], b = X[j]; for (let t = 0; t < T; t++) s += a[t]*b[t]; S[i][j] = S[j][i] = s / T; }
  if (N === 1) return {S, F:S, delta:0, sigma:S};
  const sd = S.map((r, i) => Math.sqrt(Math.max(r[i], 1e-12)));
  let rsum = 0; for (let i = 0; i < N; i++) for (let j = i+1; j < N; j++) rsum += S[i][j] / (sd[i]*sd[j]);
  const rbar = 2 * rsum / (N * (N - 1));
  const F = Array.from({length:N}, (_, i) => Float64Array.from({length:N}, (_, j) => i === j ? S[i][i] : rbar * sd[i] * sd[j]));
  let pi = 0, rho = 0, gamma = 0;
  const Y = X.map(a => a.map(v => v*v));
  for (let i = 0; i < N; i++){
    for (let j = 0; j < N; j++){
      let p = 0; const a = X[i], b = X[j]; for (let t = 0; t < T; t++){ const d = a[t]*b[t] - S[i][j]; p += d*d; } p /= T; pi += p;
      gamma += (F[i][j] - S[i][j]) ** 2;
      if (i === j) rho += p;
      else {
        let tii = 0, tjj = 0; const yi = Y[i], yj = Y[j];
        for (let t = 0; t < T; t++){ const c = a[t]*b[t] - S[i][j]; tii += (yi[t] - S[i][i]) * c; tjj += (yj[t] - S[j][j]) * c; }
        tii /= T; tjj /= T;
        rho += rbar / 2 * (Math.sqrt(S[j][j]/S[i][i]) * tii + Math.sqrt(S[i][i]/S[j][j]) * tjj);
      }
    }
  }
  const kappa = gamma > 0 ? (pi - rho) / gamma : 0, delta = Math.max(0, Math.min(1, kappa / T));
  const sigma = S.map((r, i) => r.map((v, j) => delta * F[i][j] + (1 - delta) * v));
  return {S, F, delta, sigma, rbar};
};
Q.matVec = (M, w) => M.map(r => { let s = 0; for (let j = 0; j < w.length; j++) s += r[j]*w[j]; return s; });
Q.quad = (M, w) => { const m = Q.matVec(M, w); let s = 0; for (let i = 0; i < w.length; i++) s += w[i]*m[i]; return s; };
/* Valeurs et vecteurs propres d'une matrice symétrique (méthode de Jacobi) */
Q.eigSym = A0 => {
  const n = A0.length, A = A0.map(r => Array.from(r)), V = Array.from({length:n}, (_, i) => Array.from({length:n}, (_, j) => i === j ? 1 : 0));
  for (let sweep = 0; sweep < 60; sweep++){
    let off = 0; for (let i = 0; i < n; i++) for (let j = i+1; j < n; j++) off += A[i][j]*A[i][j];
    if (off < 1e-20) break;
    for (let p = 0; p < n; p++) for (let q = p+1; q < n; q++){
      if (Math.abs(A[p][q]) < 1e-14) continue;
      const th = (A[q][q] - A[p][p]) / (2*A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th*th + 1)), c = 1/Math.sqrt(t*t+1), s = t*c;
      for (let k = 0; k < n; k++){ const akp = A[k][p], akq = A[k][q]; A[k][p] = c*akp - s*akq; A[k][q] = s*akp + c*akq; }
      for (let k = 0; k < n; k++){ const apk = A[p][k], aqk = A[q][k]; A[p][k] = c*apk - s*aqk; A[q][k] = s*apk + c*aqk; }
      for (let k = 0; k < n; k++){ const vkp = V[k][p], vkq = V[k][q]; V[k][p] = c*vkp - s*vkq; V[k][q] = s*vkp + c*vkq; }
    }
  }
  return {vals:A.map((r, i) => r[i]), vecs:V};
};
/* Nombre de paris indépendants = ratio de diversification au carré (Choueifaty et Coignard, 2008).
   Pour N lignes de même poids et même volatilité, corrélées à ρ en moyenne : N / (1 + (N − 1) ρ).
   Part du premier facteur : poids du risque porté par la composante principale dominante (souvent « le marché »). */
Q.pc1Share = (sigma, w) => {
  const {vals, vecs} = Q.eigSym(sigma), tot = Q.quad(sigma, w); if (!(tot > 1e-14)) return 1;
  let k = 0; for (let i = 1; i < vals.length; i++) if (vals[i] > vals[k]) k = i;
  let b = 0; for (let i = 0; i < w.length; i++) b += vecs[i][k] * w[i];
  return clamp(b*b*vals[k] / tot, 0, 1);
};
/* Classement hiérarchique (lien moyen) pour ordonner la carte des corrélations */
Q.clusterOrder = C => {
  const n = C.length; if (n < 3) return [...Array(n).keys()];
  let cl = Array.from({length:n}, (_, i) => ({m:[i]}));
  const d = (a, b) => { let s = 0; for (const i of a.m) for (const j of b.m) s += Math.sqrt(Math.max(0, 2*(1 - C[i][j]))); return s / (a.m.length*b.m.length); };
  while (cl.length > 1){
    let best = [0, 1, Infinity];
    for (let i = 0; i < cl.length; i++) for (let j = i+1; j < cl.length; j++){ const v = d(cl[i], cl[j]); if (v < best[2]) best = [i, j, v]; }
    const [i, j] = best; const m = {m:cl[i].m.concat(cl[j].m)};
    cl = cl.filter((_, k) => k !== i && k !== j); cl.push(m);
  }
  return cl[0].m;
};
/* Analyse complète d'un portefeuille. assets : [{id, r:Float64Array|Array (hebdo), mu:% annuel, liq, ccy, ...}], w : poids (somme 1) */
Q.analyse = (assets, w, opts = {}) => {
  const R = Q.window(assets.map(a => a.r), opts.maxW || 260, 52), T = R[0].length, N = assets.length;
  const cov = Q.covShrink(R), sig = cov.sigma;
  const varP = Q.quad(sig, w), volP = Math.sqrt(varP * 52);
  const m = Q.matVec(sig, w);
  const rc = w.map((wi, i) => varP > 0 ? wi * m[i] / varP : 0);
  const vols = sig.map((r, i) => Math.sqrt(r[i] * 52));
  const dr = volP > 0 ? w.reduce((s, wi, i) => s + wi * vols[i], 0) / volP : 1;
  const corr = sig.map((r, i) => Array.from(r, (v, j) => i === j ? 1 : clamp(v / Math.sqrt(Math.max(sig[i][i], 1e-14) * Math.max(sig[j][j], 1e-14)), -1, 1)));
  let cw = 0, cs = 0; for (let i = 0; i < N; i++) for (let j = i+1; j < N; j++){ const k = w[i]*w[j]; cw += k; cs += k*corr[i][j]; }
  const avgCorr = cw > 0 ? cs / cw : 1;
  const enb = dr * dr;
  const pc1 = Q.pc1Share(sig, w);
  const hhi = w.reduce((s, x) => s + x*x, 0);
  // série du portefeuille (rééquilibré chaque semaine) et historique
  const rp = new Float64Array(T); for (let t = 0; t < T; t++){ let s = 0; for (let i = 0; i < N; i++) s += w[i] * R[i][t]; rp[t] = s; }
  let v = 1, peak = 1, mdd = 0; const path = [1];
  for (let t = 0; t < T; t++){ v *= 1 + rp[t]; path.push(v); peak = Math.max(peak, v); mdd = Math.min(mdd, v/peak - 1); }
  let worst52 = 0; for (let t = 52; t <= T; t++) worst52 = Math.min(worst52, path[t]/path[t-52] - 1);
  const mu = assets.reduce((s, a, i) => s + w[i] * (a.mu || 0), 0);
  return {R, sig, N, T, delta:cov.delta, varP, volP:volP*100, rc, pc1, vols:vols.map(x => x*100), dr, corr, avgCorr, enb, hhi, effN:1/hhi, rp, path, mdd:mdd*100, worst52:worst52*100, mu, histAnn:(Math.pow(path[T], 52/T) - 1)*100};
};
/* Simulation par rééchantillonnage en blocs des semaines passées, recalée sur le rendement attendu */
Q.simulate = (rp, muAnnPct, years, nPaths = 3000, block = 8, seed = 7) => {
  let s = seed >>> 0; const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const T = rp.length, histMean = Q.mean(rp), target = Math.pow(1 + muAnnPct/100, 1/52) - 1, shift = target - histMean;
  const weeks = Math.round(years * 52), fin = new Float64Array(nPaths), dd = new Float64Array(nPaths), y1 = new Float64Array(nPaths);
  for (let p = 0; p < nPaths; p++){
    let v = 1, peak = 1, m = 0, k = 0;
    while (k < weeks){ const st = Math.floor(rnd() * (T - block)); for (let b = 0; b < block && k < weeks; b++, k++){ v *= 1 + rp[st + b] + shift; if (v > peak) peak = v; m = Math.min(m, v/peak - 1); if (k === 51) y1[p] = v - 1; } }
    fin[p] = v; dd[p] = m; if (weeks < 52) y1[p] = v - 1;
  }
  const sorted = a => Float64Array.from(a).sort();
  const F = sorted(fin), Y = sorted(y1), Dd = sorted(dd);
  const q = (A, x) => A[Math.min(A.length - 1, Math.max(0, Math.floor(x * A.length)))];
  const var95 = q(Y, .05), cvar95 = Q.mean(Array.from(Y.slice(0, Math.max(1, Math.floor(.05 * Y.length)))));
  return {p5:q(F,.05), p25:q(F,.25), p50:q(F,.5), p75:q(F,.75), p95:q(F,.95), pLoss:F.filter(x => x < 1).length / nPaths * 100,
    var95:var95*100, cvar95:cvar95*100, ddMed:q(Dd,.5)*100, dd5:q(Dd,.05)*100};
};
/* Régression multiple (moindres carrés) : y = a + Σ b_k x_k */
Q.ols = (y, Xs) => {
  const T = y.length, K = Xs.length + 1, A = Array.from({length:K}, () => new Float64Array(K)), b = new Float64Array(K);
  for (let t = 0; t < T; t++){ const x = [1, ...Xs.map(s => s[t])]; for (let i = 0; i < K; i++){ b[i] += x[i]*y[t]; for (let j = 0; j < K; j++) A[i][j] += x[i]*x[j]; } }
  for (let i = 0; i < K; i++) A[i][i] += 1e-9;
  // élimination de Gauss
  for (let i = 0; i < K; i++){ let p = i; for (let r = i+1; r < K; r++) if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r; [A[i], A[p]] = [A[p], A[i]]; [b[i], b[p]] = [b[p], b[i]];
    for (let r = 0; r < K; r++) if (r !== i){ const f = A[r][i] / A[i][i]; for (let c = i; c < K; c++) A[r][c] -= f*A[i][c]; b[r] -= f*b[i]; } }
  return Array.from(b, (v, i) => v / A[i][i]);
};
/* Éventail des trajectoires : quantiles année par année (rééchantillonnage en blocs, recalé sur le rendement attendu) */
Q.fan = (rp, muAnnPct, years, nPaths = 2000, block = 8, seed = 11) => {
  let s = seed >>> 0; const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const T = rp.length, shift = Math.pow(1 + muAnnPct/100, 1/52) - 1 - Q.mean(rp), Y = Math.max(1, Math.round(years));
  const at = Array.from({length:Y + 1}, () => new Float64Array(nPaths));
  for (let p = 0; p < nPaths; p++){
    let v = 1, k = 0; at[0][p] = 1;
    while (k < Y * 52){ const st = Math.floor(rnd() * (T - block)); for (let b = 0; b < block && k < Y * 52; b++){ v *= 1 + rp[st + b] + shift; k++; if (k % 52 === 0) at[k / 52][p] = v; } }
  }
  return at.map((a, y) => { const S = Float64Array.from(a).sort(); const q = x => S[Math.min(S.length - 1, Math.floor(x * S.length))]; return {y, p5:q(.05), p25:q(.25), p50:q(.5), p75:q(.75), p95:q(.95)}; });
};
/* Projection sur le simplexe avec plafond par ligne */
Q.capNorm = (w, cap = 1) => {
  let x = w.map(v => Math.max(0, v)); let s = x.reduce((a, b) => a + b, 0); if (s <= 0) return x.map(() => 1 / x.length);
  x = x.map(v => v / s);
  for (let it = 0; it < 50; it++){
    const over = x.map(v => v > cap); if (!over.some(Boolean)) break;
    const excess = x.reduce((a, v, i) => a + (over[i] ? v - cap : 0), 0), free = x.reduce((a, v, i) => a + (over[i] ? 0 : v), 0);
    x = x.map((v, i) => over[i] ? cap : free > 0 ? v + excess * v / free : v);
  }
  return x;
};
/* Variance minimale, sans vente à découvert (gradient exponentié) */
Q.minVar = (sig, cap = 1, iters = 600) => {
  const N = sig.length; let w = Array(N).fill(1 / N);
  for (let it = 0; it < iters; it++){
    const g = Q.matVec(sig, w), v = Q.quad(sig, w) || 1e-12, eta = 2.5;
    w = Q.capNorm(w.map((x, i) => x * Math.exp(-eta * (g[i] / v - 1))), cap);
  }
  return w;
};
/* Parité des risques : chaque ligne apporte la même part du risque */
Q.erc = (sig, iters = 400) => {
  const N = sig.length, vols = sig.map((r, i) => Math.sqrt(Math.max(r[i], 1e-16)));
  let w = vols.map(v => 1 / v); const s = w.reduce((a, b) => a + b, 0); w = w.map(x => x / s);
  for (let it = 0; it < iters; it++){
    const m = Q.matVec(sig, w), v = Q.quad(sig, w);
    w = w.map((x, i) => x * Math.sqrt((v / N) / Math.max(1e-16, x * m[i])));
    const t = w.reduce((a, b) => a + b, 0); w = w.map(x => x / t);
  }
  return w;
};
/* Diversification maximale : variance minimale sur la matrice des corrélations, ramenée aux volatilités */
Q.maxDiv = (sig, cap = 1) => {
  const vols = sig.map((r, i) => Math.sqrt(r[i]));
  const C = sig.map((r, i) => Array.from(r, (v, j) => v / (vols[i] * vols[j])));
  const y = Q.minVar(C, 1);
  return Q.capNorm(y.map((v, i) => v / vols[i]), cap);
};
/* Effet d'un ajout de a (part) de chaque candidat sur le nombre de paris indépendants, la volatilité et le rendement attendu.
   base : sortie de Q.analyse ; Rb : séries de la fenêtre commune ; cands : [{id, r, mu}] */
Q.scanAdd = (an, Rb, w, cands, a = .05) => {
  const T = Rb[0].length, N = Rb.length, mu = Rb.map(Q.mean);
  const port = new Float64Array(T); for (let t = 0; t < T; t++){ let s = 0; for (let i = 0; i < N; i++) s += w[i] * (Rb[i][t] - mu[i]); port[t] = s; }
  const vP = Q.mean(Array.from(port, x => x * x)), sumWV = w.reduce((s, wi, i) => s + wi * an.vols[i] / 100 / Math.sqrt(52), 0);
  const volB = Math.sqrt(vP * 52) * 100, enbB = (sumWV / Math.sqrt(Math.max(vP, 1e-16))) ** 2;   // base calculée de la même façon que les ajouts
  const out = [];
  for (const c of cands){
    const r = c.r.slice(c.r.length - T); let n = 0; for (const v of r) if (v === v) n++; if (n < 52) continue;
    const rc = Array.from(r, v => v === v ? v : 0), mc = Q.mean(rc);
    let cv = 0, vc = 0; for (let t = 0; t < T; t++){ const d = rc[t] - mc; cv += port[t] * d; vc += d * d; } cv /= T; vc /= T;
    const vN = (1 - a) ** 2 * vP + 2 * a * (1 - a) * cv + a * a * vc;
    const dr = ((1 - a) * sumWV + a * Math.sqrt(vc)) / Math.sqrt(Math.max(vN, 1e-16));
    out.push({c, enb:dr * dr, vol:Math.sqrt(vN * 52) * 100, volB, enbB, rho:cv / Math.sqrt(vP * vc), mu:(1 - a) * an.mu + a * (c.mu || 0)});
  }
  return out;
};
/* Covariance planchée pour les optimisations : 1,5 % de volatilité annuelle au moins par ligne (le monétaire n'absorbe pas tout) */
Q.floorCov = (sig, volMin = 1.5) => { const f = (volMin / 100) ** 2 / 52; return sig.map((r, i) => Array.from(r, (v, j) => i === j ? Math.max(v, f) : v)); };
