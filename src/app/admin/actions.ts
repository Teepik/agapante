"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  isAdminConfigured,
  isAuthenticated,
  verifyPassword,
} from "@/lib/auth";
import { deleteLead, updateLeadNotes, updateLeadStatus, type LeadStatus } from "@/lib/db";

export type LoginState = { error: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!isAdminConfigured()) {
    return {
      error:
        "Aucun mot de passe n'est configuré. Ajoutez la variable d'environnement ADMIN_PASSWORD dans les réglages du projet Vercel, puis redéployez.",
    };
  }

  // Petite temporisation contre le forçage par essais successifs.
  await new Promise((r) => setTimeout(r, 350));

  if (!verifyPassword(password)) {
    return { error: "Mot de passe incorrect." };
  }

  await createSession();
  redirect("/admin/demandes");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin");
}

async function assertAuth() {
  if (!(await isAuthenticated())) redirect("/admin");
}

export async function setStatus(formData: FormData): Promise<void> {
  await assertAuth();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status")) as LeadStatus;
  if (!Number.isFinite(id)) return;
  await updateLeadStatus(id, status);
  revalidatePath("/admin/demandes");
  revalidatePath(`/admin/demandes/${id}`);
}

export async function saveNotes(formData: FormData): Promise<void> {
  await assertAuth();
  const id = Number(formData.get("id"));
  const notes = String(formData.get("notes") ?? "").slice(0, 8000);
  if (!Number.isFinite(id)) return;
  await updateLeadNotes(id, notes);
  revalidatePath(`/admin/demandes/${id}`);
}

export async function removeLead(formData: FormData): Promise<void> {
  await assertAuth();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) return;
  await deleteLead(id);
  revalidatePath("/admin/demandes");
  redirect("/admin/demandes");
}
