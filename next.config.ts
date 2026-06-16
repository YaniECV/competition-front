import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // images Sanity (CDN) pour next/image
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
