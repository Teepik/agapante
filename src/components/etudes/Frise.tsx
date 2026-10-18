import { frise } from "@/lib/etudes/frise";
import { Icon } from "./ui";

export function Frise() {
  return (
    <ol className="et-frise">
      {frise.map((y) => (
        <li key={y.years} className={y.here ? "et-frise__year is-here" : "et-frise__year"}>
          <div className="et-frise__mark">
            <span className="et-frise__dot" aria-hidden="true" />
            <p className="et-frise__years">{y.years}</p>
            <p className="et-frise__stage">{y.stage}</p>
            <p className="et-frise__age">{y.age}</p>
            {y.here ? (
              <p className="et-frise__here">
                <Icon name="pin" width={15} height={15} /> Tu es ici
              </p>
            ) : null}
          </div>
          <ul className="et-frise__items">
            {y.items.map((it) => (
              <li key={it.what} className={it.key ? "et-frise__item is-key" : "et-frise__item"}>
                <p className="et-frise__when">{it.when}</p>
                <p className="et-frise__what">{it.what}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
