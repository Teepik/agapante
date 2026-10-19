"use client";

import { ecoleById } from "@/lib/etudes/ecoles";
import { lyceeById, statutLabel } from "@/lib/etudes/lycees";
import type { LaneId } from "@/lib/etudes/lines";
import { laneOf } from "@/lib/etudes/plan";
import { stationById } from "@/lib/etudes/stations";
import { Sheet } from "./Sheet";
import { useSelection, type SavedKind } from "./store";
import { Dot, Icon } from "./ui";

export function MyList({
  onClose,
  onLycee,
  onEcole,
  onStation,
}: {
  onClose: () => void;
  onLycee: (id: string) => void;
  onEcole: (id: string) => void;
  onStation: (id: string, line: LaneId | null) => void;
}) {
  const { saved, toggle } = useSelection();
  const parsed = saved.map((k) => {
    const [kind, ...rest] = k.split(":");
    return { kind: kind as SavedKind, id: rest.join(":") };
  });
  const ly = parsed.filter((x) => x.kind === "lycee" && lyceeById[x.id]);
  const ec = parsed.filter((x) => x.kind === "ecole" && ecoleById[x.id]);
  const st = parsed.filter((x) => x.kind === "station" && stationById[x.id]);

  return (
    <Sheet
      labelId="e-list-title"
      resetKey="liste"
      onClose={onClose}
      meta={<span>Sur cet appareil</span>}
      title="Ma liste"
      when={
        saved.length ? `${saved.length} ${saved.length > 1 ? "éléments gardés" : "élément gardé"} de côté` : undefined
      }
    >
      {!saved.length ? (
        <div className="e-empty">
          <strong>Garde ici ce qui te plaît</strong>
          Dans la fiche d&apos;un lycée, d&apos;une école ou d&apos;une étape, touche « Ajouter à ma liste » : tout se
          retrouve ici pour comparer et en parler à la maison.
        </div>
      ) : null}

      {ly.length ? (
        <section className="e-mylist__group">
          <h3>Lycées</h3>
          <ul className="e-rows">
            {ly.map(({ id }) => {
              const l = lyceeById[id];
              return (
                <ListRow
                  key={id}
                  icon={<Icon name="school" />}
                  name={l.name}
                  hint={`${l.ville}, ${statutLabel[l.statut].toLowerCase()}`}
                  onOpen={() => onLycee(id)}
                  onRemove={() => toggle("lycee", id)}
                />
              );
            })}
          </ul>
        </section>
      ) : null}

      {ec.length ? (
        <section className="e-mylist__group">
          <h3>Établissements</h3>
          <ul className="e-rows">
            {ec.map(({ id }) => {
              const e = ecoleById[id];
              return (
                <ListRow
                  key={id}
                  icon={<Dot line={e.line} />}
                  name={e.name}
                  hint={`${e.ville}, ${e.kind}`}
                  onOpen={() => onEcole(id)}
                  onRemove={() => toggle("ecole", id)}
                />
              );
            })}
          </ul>
        </section>
      ) : null}

      {st.length ? (
        <section className="e-mylist__group">
          <h3>Étapes</h3>
          <ul className="e-rows">
            {st.map(({ id }) => {
              const s = stationById[id];
              const line = laneOf(id);
              return (
                <ListRow
                  key={id}
                  icon={line ? <Dot line={line} /> : <Dot line="u" />}
                  name={s.name}
                  hint={s.when}
                  onOpen={() => onStation(id, line)}
                  onRemove={() => toggle("station", id)}
                />
              );
            })}
          </ul>
        </section>
      ) : null}
    </Sheet>
  );
}

function ListRow({
  icon,
  name,
  hint,
  onOpen,
  onRemove,
}: {
  icon: React.ReactNode;
  name: string;
  hint: string;
  onOpen: () => void;
  onRemove: () => void;
}) {
  return (
    <li style={{ display: "flex", alignItems: "center" }}>
      <button type="button" className="e-row" onClick={onOpen} style={{ flex: 1 }}>
        {icon}
        <span>
          <span className="e-row__v">{name}</span>
          <span className="e-row__k">{hint}</span>
        </span>
        <span />
      </button>
      <button
        type="button"
        className="e-iconbtn"
        onClick={onRemove}
        aria-label={`Retirer ${name} de ma liste`}
        style={{ marginRight: 6 }}
      >
        <Icon name="close" />
      </button>
    </li>
  );
}
