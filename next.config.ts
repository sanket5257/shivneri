import type { NextConfig } from "next";

// Static brand assets (videos, images, fonts) are immutable once shipped —
// if one needs replacing, change its filename so the URL busts the cache.
const ONE_YEAR_IMMUTABLE = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats when <Image> is used.
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        // All videos & images under /public/assets
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: ONE_YEAR_IMMUTABLE }],
      },
      {
        // Self-hosted web fonts
        source: "/:path*.woff2",
        headers: [{ key: "Cache-Control", value: ONE_YEAR_IMMUTABLE }],
      },
    ];
  },
};

export default nextConfig;
