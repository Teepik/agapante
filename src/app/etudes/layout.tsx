import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./etudes.css";

// Mona Sans variable (graisse et largeur) auto-hébergée : aucune requête tierce.
const mona = localFont({
  src: "../../../node_modules/@fontsource-variable/mona-sans/files/mona-sans-latin-wdth-normal.woff2",
  weight: "200 900",
  style: "normal",
  declarations: [{ prop: "font-stretch", value: "75% 125%" }],
  display: "swap",
  variable: "--font-mona",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  title: { absolute: "Études : toutes les routes après la 3e" },
  description:
    "De la 3e au premier métier : lycées, spécialités, prépas, universités et grandes écoles, conditions d'accès, débouchés et passerelles, sur une carte à explorer.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/etudes" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

/** Page autonome : son propre thème, sans en-tête ni pied de page du site. */
export default function EtudesLayout({ children }: { children: React.ReactNode }) {
  return <div className={`etudes ${mona.variable}`}>{children}</div>;
}
