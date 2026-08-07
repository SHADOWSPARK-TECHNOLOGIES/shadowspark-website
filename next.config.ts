import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.140.170.127", "localhost:3000"],
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.amazonaws.com" },
      { protocol: "https", hostname: "*.cloudflare.com" },
      { protocol: "https", hostname: "api.shadowspark.tech" },
      { protocol: "https", hostname: "shadowspark-tech.org" },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  serverExternalPackages: ["undici", "bullmq", "ioredis"],
  async headers() {
    return [{
      source: "/:path*",
      headers: [{ key: "X-DNS-Prefetch-Control", value: "on" }],
    }]
  },
};

export default nextConfig;
