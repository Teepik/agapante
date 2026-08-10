import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const revalidate = 86400;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawTitle = searchParams.get("title") ?? "Déployer l'IA, vraiment.";
  const title = rawTitle.length > 110 ? `${rawTitle.slice(0, 107)}…` : rawTitle;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#06070a",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -320,
            left: -180,
            width: 820,
            height: 820,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(111,119,232,0.42) 0%, rgba(6,7,10,0) 68%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -280,
            right: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(127,209,185,0.20) 0%, rgba(6,7,10,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18, zIndex: 1 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 9999,
              background: "linear-gradient(135deg, #c9ceff 0%, #8b93f8 55%, #6f77e8 100%)",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 34, color: "#f2f3f7", letterSpacing: "0.01em", display: "flex" }}>
            Agapante
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 70 ? 56 : 68,
            lineHeight: 1.12,
            color: "#f2f3f7",
            letterSpacing: "-0.02em",
            maxWidth: 980,
            zIndex: 1,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 22, color: "#8d92a6" }}>
            Conseil en déploiement de l&apos;IA — TPE, PME, ETI, administrations
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#a7aeff" }}>France entière</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
