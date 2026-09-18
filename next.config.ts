import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker/runtime images need standalone. Netlify OpenNext serves .next itself
  // and 500s if standalone output is enabled during the Netlify build.
  ...(process.env.NETLIFY ? {} : { output: "standalone" as const }),
  allowedDevOrigins: ["10.140.170.127", "localhost:3000"],
  typescript: {
    ignoreBuildErrors: false,
  },
  serverExternalPackages: ["undici", "bullmq", "ioredis"],
};

export default nextConfig;
