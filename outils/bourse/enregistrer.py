"""Enregistre le résultat du traitement dans la base Neon du site (table bourse_donnees).
Le dépôt étant public, aucune donnée de marché n'est versionnée : elles ne vivent que dans la base."""
import json, os, sys, datetime
ICI = os.path.dirname(os.path.abspath(__file__))
SORTIE = os.path.join(ICI, "_sortie")
url = os.environ.get("DATABASE_URL")
if not url:
    print("::warning title=Enregistrement::Secret DATABASE_URL absent : données calculées mais non enregistrées.")
    sys.exit(0)
import psycopg
meta = json.load(open(os.path.join(ICI, "_brut", "meta.json")))
with psycopg.connect(url, connect_timeout=30) as cx, cx.cursor() as cur:
    cur.execute("""CREATE TABLE IF NOT EXISTS bourse_donnees (
        cle TEXT PRIMARY KEY, contenu TEXT NOT NULL, maj TIMESTAMPTZ NOT NULL DEFAULT now())""")
    for cle, fichier in (("actions", "actions.json"), ("rets", "rets.json")):
        contenu = open(os.path.join(SORTIE, fichier)).read()
        cur.execute("""INSERT INTO bourse_donnees (cle, contenu, maj) VALUES (%s, %s, now())
                       ON CONFLICT (cle) DO UPDATE SET contenu = EXCLUDED.contenu, maj = now()""", (cle, contenu))
    a = json.load(open(os.path.join(SORTIE, "actions.json")))
    statut = {"collecte": meta.get("date"), "actions": a["meta"]["actions"], "etf": a["meta"]["etf"], "semaines": a["meta"]["semaines"],
              "duree_s": meta.get("duree_s"), "enregistre": datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")}
    cur.execute("""INSERT INTO bourse_donnees (cle, contenu, maj) VALUES ('statut', %s, now())
                   ON CONFLICT (cle) DO UPDATE SET contenu = EXCLUDED.contenu, maj = now()""", (json.dumps(statut),))
    cx.commit()
print(f"::notice title=Enregistrement::Base Neon à jour : {statut}")
