"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  canUseBootstrapToken,
  isAdminConfigured,
  isAuthenticated,
  setAdminPassword,
  verifyBootstrapToken,
  verifyPassword,
} from "@/lib/auth";
import {
  deleteLead,
  deleteLeads,
  deleteShowcaseItem,
  insertShowcaseItem,
  moveShowcaseItem,
  updateLeadNotes,
  updateLeadStatus,
  updateShowcaseItem,
  type LeadStatus,
} from "@/lib/db";
import { normalizeShowcaseUrl } from "@/lib/showcase";
import { resolveShowcaseImageUrl } from "@/lib/showcase-image";

export type LoginState = { error: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!(await isAdminConfigured())) {
    return {
      error:
        "Aucun mot de passe n'est configuré. Ajoutez la variable d'environnement ADMIN_PASSWORD dans les réglages du projet Vercel, puis redéployez.",
    };
  }

  // Petite temporisation contre le forçage par essais successifs.
  await new Promise((r) => setTimeout(r, 350));

  if (!(await verifyPassword(password))) {
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

export async function removeLeadById(formData: FormData): Promise<void> {
  await assertAuth();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) return;
  await deleteLead(id);
  revalidatePath("/admin/demandes");
  revalidatePath(`/admin/demandes/${id}`);
}

export async function removeLeads(formData: FormData): Promise<void> {
  await assertAuth();
  const ids = formData
    .getAll("ids")
    .map((value) => Number(value))
    .filter((id) => Number.isFinite(id) && id > 0);
  if (ids.length === 0) return;
  await deleteLeads(ids);
  revalidatePath("/admin/demandes");
}

export type ConfigureState = { error: string; success: string };

export async function configurePassword(
  _prev: ConfigureState,
  formData: FormData
): Promise<ConfigureState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!verifyBootstrapToken(token)) {
    return { error: "Jeton de configuration invalide.", success: "" };
  }

  if (!(await canUseBootstrapToken(token))) {
    return {
      error: "Ce jeton de secours a déjà été utilisé. Connectez-vous avec votre mot de passe.",
      success: "",
    };
  }

  if (password.length < 12) {
    return {
      error: "Le mot de passe doit contenir au moins 12 caractères.",
      success: "",
    };
  }

  if (password !== confirm) {
    return { error: "Les mots de passe ne correspondent pas.", success: "" };
  }

  await new Promise((r) => setTimeout(r, 350));

  try {
    await setAdminPassword(password);
  } catch {
    return {
      error:
        "Impossible d'enregistrer le mot de passe. Vérifiez que DATABASE_URL est bien configurée.",
      success: "",
    };
  }

  await createSession();
  redirect("/admin/demandes");
}

export type ShowcaseFormState = { error: string; success: string };

function parseShowcaseFields(formData: FormData) {
  const url = normalizeShowcaseUrl(String(formData.get("url") ?? ""));
  const name = String(formData.get("name") ?? "").trim().slice(0, 120);
  const description = String(formData.get("description") ?? "").trim().slice(0, 2000);
  return { url, name, description };
}

export async function createShowcaseItem(
  _prev: ShowcaseFormState,
  formData: FormData
): Promise<ShowcaseFormState> {
  await assertAuth();
  const { url, name, description } = parseShowcaseFields(formData);

  if (!url) {
    return { error: "Indiquez une URL valide (ex. https://exemple.com).", success: "" };
  }
  if (name.length < 2) {
    return { error: "Indiquez un nom de projet (2 caractères minimum).", success: "" };
  }
  const imageResult = await resolveShowcaseImageUrl(formData);
  if (!imageResult.ok) {
    return { error: imageResult.error, success: "" };
  }
  if (description.length < 10) {
    return {
      error: "Le commentaire doit contenir au moins 10 caractères.",
      success: "",
    };
  }

  try {
    await insertShowcaseItem({
      url,
      name,
      image_url: imageResult.url,
      description,
    });
    revalidatePath("/admin/vitrine");
    revalidatePath("/vitrine");
    return { error: "", success: "Projet ajouté à la vitrine." };
  } catch {
    return {
      error: "Impossible d'enregistrer le projet. Vérifiez la connexion à la base de données.",
      success: "",
    };
  }
}

export async function updateShowcaseItemAction(formData: FormData): Promise<void> {
  await assertAuth();
  const id = Number(formData.get("id"));
  const { url, name, description } = parseShowcaseFields(formData);
  const imageResult = await resolveShowcaseImageUrl(formData);
  if (
    !Number.isFinite(id) ||
    !url ||
    name.length < 2 ||
    !imageResult.ok ||
    description.length < 10
  ) {
    return;
  }

  await updateShowcaseItem(id, {
    url,
    name,
    image_url: imageResult.url,
    description,
  });
  revalidatePath("/admin/vitrine");
  revalidatePath("/vitrine");
}

export async function removeShowcaseItem(formData: FormData): Promise<void> {
  await assertAuth();
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) return;
  await deleteShowcaseItem(id);
  revalidatePath("/admin/vitrine");
  revalidatePath("/vitrine");
}

export async function reorderShowcaseItem(formData: FormData): Promise<void> {
  await assertAuth();
  const id = Number(formData.get("id"));
  const direction = String(formData.get("direction"));
  if (!Number.isFinite(id) || (direction !== "up" && direction !== "down")) return;
  await moveShowcaseItem(id, direction);
  revalidatePath("/admin/vitrine");
  revalidatePath("/vitrine");
}
