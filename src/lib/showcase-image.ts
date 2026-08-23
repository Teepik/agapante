import "server-only";

import { put } from "@vercel/blob";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

function extensionForType(type: string): string {
  switch (type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "jpg";
  }
}

export type ShowcaseImageUploadResult =
  | { ok: true; url: string }
  | { ok: false; error: string };

export async function uploadShowcaseImage(file: File): Promise<ShowcaseImageUploadResult> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      ok: false,
      error:
        "Le stockage d'images n'est pas configuré. Ajoutez un store Blob dans Vercel (Storage) ou définissez BLOB_READ_WRITE_TOKEN.",
    };
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return {
      ok: false,
      error: "Format non pris en charge. Utilisez JPG, PNG, WebP ou GIF.",
    };
  }

  if (file.size > MAX_BYTES) {
    return {
      ok: false,
      error: "L'image dépasse la taille maximale de 5 Mo.",
    };
  }

  const ext = extensionForType(file.type);
  const pathname = `showcase/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  try {
    const blob = await put(pathname, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
    });
    return { ok: true, url: blob.url };
  } catch {
    return {
      ok: false,
      error: "Impossible de téléverser l'image. Réessayez dans quelques instants.",
    };
  }
}

export async function resolveShowcaseImageUrl(
  formData: FormData,
  existingUrl?: string | null
): Promise<ShowcaseImageUploadResult> {
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    return uploadShowcaseImage(file);
  }

  const kept = String(formData.get("existingImageUrl") ?? existingUrl ?? "").trim();
  if (kept) {
    return { ok: true, url: kept };
  }

  return {
    ok: false,
    error: "Sélectionnez une image (JPG, PNG, WebP ou GIF, 5 Mo max).",
  };
}
