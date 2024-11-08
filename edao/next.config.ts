import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: ( config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config
    
  }
};

export default nextConfig;