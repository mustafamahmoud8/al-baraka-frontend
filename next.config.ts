import type { NextConfig } from "next";

// Sirv CDN domain — must be set in Vercel env vars as NEXT_PUBLIC_SIRV_DOMAIN
// Falls back to a wildcard pattern so builds don't fail when the variable is absent
const sirvDomain = process.env.NEXT_PUBLIC_SIRV_DOMAIN;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: sirvDomain
      ? [
          {
            protocol: "https" as const,
            hostname: sirvDomain,
            pathname: "/**",
          },
        ]
      : [
          {
            protocol: "https" as const,
            hostname: "**.sirv.com",
            pathname: "/**",
          },
        ],
  },
  async headers() {
    return [
      {
        // The service worker must not be cached, or push/offline fixes never ship.
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },
};

export default nextConfig;
