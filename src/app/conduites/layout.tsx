import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Conduites", template: "%s · Conduites" },
  description: "Le planning de covoiturage de votre groupe de familles.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/conduites" },
  appleWebApp: { capable: true, title: "Conduites", statusBarStyle: "default" },
};

/** Application autonome : son propre thème, sans en-tête ni pied de page du site. */
export default function ConduitesLayout({ children }: { children: React.ReactNode }) {
  return <div className="conduites min-h-dvh">{children}</div>;
}
