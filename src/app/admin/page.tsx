import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "./LoginForm";
import { Mark } from "@/components/Logo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin/demandes");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="aurora" />
      <div className="grid-veil" />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <Link href="/" className="mb-8 flex items-center gap-2.5" aria-label="Retour au site">
          <Mark className="h-7 w-7" />
          <span className="display text-[1.3rem] text-chalk">Agapante</span>
        </Link>
        <LoginForm />
        <Link
          href="/"
          className="mt-8 text-[0.85rem] text-mute transition-colors hover:text-chalk-dim"
        >
          ← Retour au site
        </Link>
      </div>
    </div>
  );
}
