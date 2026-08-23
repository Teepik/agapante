import { put } from "@vercel/blob";
import { isAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 4 * 1024 * 1024;

function mimeFromFilename(name: string): string | null {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    default:
      return null;
  }
}

function extensionForType(type: string, filename: string): string {
  switch (type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default: {
      const fromName = filename.split(".").pop()?.toLowerCase();
      if (fromName === "jpeg") return "jpg";
      return fromName ?? "jpg";
    }
  }
}

function blobConfigured(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID || process.env.VERCEL_OIDC_TOKEN
  );
}

export async function POST(request: Request): Promise<Response> {
  if (!(await isAuthenticated())) {
    return Response.json(
      { error: "Session expirée. Reconnectez-vous à l'admin." },
      { status: 401 }
    );
  }

  if (!blobConfigured()) {
    return Response.json(
      {
        error:
          "Stockage Blob non configuré. Liez un store Blob au projet Vercel (Storage), puis redéployez.",
      },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Aucun fichier reçu." }, { status: 400 });
  }

  const mime = file.type || mimeFromFilename(file.name);
  if (!mime || !ALLOWED_TYPES.has(mime)) {
    return Response.json(
      { error: "Format non pris en charge. Utilisez JPG, PNG, WebP ou GIF." },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json({ error: "L'image dépasse la taille maximale de 4 Mo." }, { status: 400 });
  }

  const pathname = `showcase/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extensionForType(mime, file.name)}`;

  try {
    const blob = await put(pathname, file, {
      access: "public",
      contentType: mime,
      addRandomSuffix: false,
    });

    return Response.json({ url: blob.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Impossible de téléverser l'image.";
    return Response.json({ error: message }, { status: 500 });
  }
}
