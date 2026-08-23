import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function VitrineAdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) redirect("/admin");

  return <AdminShell active="vitrine">{children}</AdminShell>;
}
