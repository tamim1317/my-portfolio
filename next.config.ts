import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── Image optimization ──────────────────────────────────── */
  images: {
    // Project images are served from /public — no remote domains needed yet.
    // Add domains here if you later serve images from a CDN or external URL.
    // formats: ["image/avif", "image/webp"], // Next.js 16 serves webp/avif by default
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  /* ── HTTP security headers ───────────────────────────────── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Prevent MIME-type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Control referrer information
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable unneeded APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
