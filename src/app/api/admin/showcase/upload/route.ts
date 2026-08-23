import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { isAuthenticated } from "@/lib/auth";

export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(request: Request): Promise<Response> {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Non autorisé." }, { status: 401 });
  }

  let body: HandleUploadBody;
  try {
    body = (await request.json()) as HandleUploadBody;
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED_TYPES,
        maximumSizeInBytes: MAX_BYTES,
        addRandomSuffix: false,
      }),
    });

    return Response.json(jsonResponse);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Impossible de téléverser l'image.";
    return Response.json({ error: message }, { status: 400 });
  }
}
