// Assemble l'outil /bourse en une page HTML autonome, embarquée dans src/lib/bourse/appli.generated.ts.
// Usage : node outils/bourse/web/assembler.mjs   (depuis la racine du dépôt)
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ICI = dirname(fileURLToPath(import.meta.url));
const RACINE = join(ICI, "..", "..", "..");
const lire = (...p) => readFileSync(join(...p), "utf8");
const MODULES = ["core.js", "fiscal.js", "charts.js", "map.js", "comparateur.js", "taux.js", "suivi.js", "methode.js", "quant.js", "bourse.js",
  "actions.js", "opportunites.js", "etf.js", "ruptures.js", "portefeuille.js", "constructeur.js", "analyses.js", "main.js"];
const js = MODULES.map((f) => `/* ---- ${f} ---- */\n` + lire(ICI, f)).join("\n");
const jsonScript = (id, file) => `<script type="application/json" id="${id}">${JSON.stringify(JSON.parse(lire(RACINE, "src", "lib", "bourse", file))).replace(/</g, "\\u003c")}</script>`;
const d3 = lire(RACINE, "node_modules", "d3", "dist", "d3.min.js");
const topo = lire(RACINE, "node_modules", "topojson-client", "dist", "topojson-client.min.js");
const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>Bourse · Agapante</title>
<link rel="icon" href="/icon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560;9..144,640&family=Public+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
<style>
${lire(ICI, "style.css")}
</style>
</head>
<body>
${lire(ICI, "body.html")}
${jsonScript("atlas-data", "atlas.json")}
${jsonScript("monde-data", "monde.json")}
<script>${d3}</script>
<script>${topo}</script>
<script>
"use strict";
${js}
</script>
</body>
</html>
`;
const sortie = join(RACINE, "src", "lib", "bourse", "appli.generated.ts");
writeFileSync(sortie, `// Fichier produit par outils/bourse/web/assembler.mjs : ne pas modifier à la main.\n/* eslint-disable */\nexport const APPLI_HTML = ${JSON.stringify(html)};\n`);
console.log("appli.generated.ts :", Math.round(html.length / 1024), "Ko");
