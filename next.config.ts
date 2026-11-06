import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: [],
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  async rewrites() {
    return [
      // Atlas immobilier : application autonome servie depuis public/atlas
      { source: "/atlas", destination: "/atlas/index.html" },
      { source: "/atlas/ajout", destination: "/atlas/ajout.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/atlas/data/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
      {
        // « Autour de moi » sur la page Études : la position sert au calcul des distances, dans le navigateur.
        source: "/etudes",
        headers: [
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), browsing-topics=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
