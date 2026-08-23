import { get } from "@vercel/blob";
import { type NextRequest } from "next/server";

export const runtime = "nodejs";

export async function GET(request: NextRequest): Promise<Response> {
  const pathname = request.nextUrl.searchParams.get("pathname");

  if (!pathname || pathname.includes("..") || !pathname.startsWith("showcase/")) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const result = await get(pathname, { access: "private" });

    if (!result || result.statusCode !== 200) {
      return new Response("Not found", { status: 404 });
    }

    return new Response(result.stream, {
      headers: {
        "Content-Type": result.blob.contentType ?? "application/octet-stream",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
