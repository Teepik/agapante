import { Button } from "./ui";
import { Reveal } from "./Reveal";

export function CtaBand({
  eyebrow = "Prochaine étape",
  title = "Parlons de votre situation, pas de la nôtre.",
  text = "Trente minutes au téléphone suffisent à savoir si nous pouvons vous être utiles. Sans engagement, sans diaporama, et sans relance commerciale si la réponse est non.",
  primary = { href: "/contact", label: "Décrire votre situation" },
  secondary,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden border-t border-ink-800/70">
      <div className="aurora opacity-50" />
      <div className="container-x relative z-10 py-24 lg:py-32">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow mb-5">{eyebrow}</p>
              <h2 className="display max-w-[18ch] text-[clamp(2rem,4.6vw,3.4rem)] text-chalk">
                {title}
              </h2>
              <p className="mt-7 max-w-2xl text-[1.02rem] leading-relaxed text-mute">{text}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:items-stretch">
              <Button href={primary.href}>{primary.label}</Button>
              {secondary ? (
                <Button href={secondary.href} variant="ghost">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
