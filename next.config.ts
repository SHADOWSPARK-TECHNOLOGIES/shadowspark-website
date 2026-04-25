import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ["10.140.170.127", "localhost:3000"],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  serverExternalPackages: ["undici", "bullmq", "ioredis"],
};

export default nextConfig;
