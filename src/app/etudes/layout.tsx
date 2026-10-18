import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./etudes.css";

// Archivo variable (graisse et chasse) auto-hébergée : aucune requête tierce.
const archivo = localFont({
  src: [
    {
      path: "../../../node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../../node_modules/@fontsource-variable/archivo/files/archivo-latin-ext-wdth-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  display: "swap",
  variable: "--font-etudes",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  title: { absolute: "Le plan des études" },
  description:
    "De la 3e au premier métier : lycée, spécialités, prépas, grandes écoles, universités, conditions d'accès et débouchés, sur un plan à explorer.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/etudes" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eef2f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1322" },
  ],
  colorScheme: "light dark",
};

/** Page autonome : son propre thème, sans en-tête ni pied de page du site. */
export default function EtudesLayout({ children }: { children: React.ReactNode }) {
  return <div className={`etudes ${archivo.variable}`}>{children}</div>;
}
