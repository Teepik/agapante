import Link from "next/link";
import { GUIDES_DE } from "@/lib/etudes/guides-liens";
import { Icon } from "../ui";

/** Les guides pas à pas qui détaillent une étape, en bas de sa fiche. */
export function GuidesSection({ id }: { id: string }) {
  return (
    <section className="e-sec">
      <h3>Pas à pas</h3>
      <ul className="e-rows">
        {(GUIDES_DE[id] ?? []).map((g) => (
          <li key={g.href}>
            <Link className="e-row" href={g.href}>
              <Icon name="book" />
              <span>
                <span className="e-row__v">{g.label}</span>
                <span className="e-row__k">{g.detail}</span>
              </span>
              <Icon name="chevron-right" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
