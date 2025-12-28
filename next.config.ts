import type { NextConfig } from "next";

const nextConfig = {
  turbopack: {},
  webpack: (config) => {
    config.externals.push({
      "sqlite3": "commonjs sqlite3",
      "sqlite": "commonjs sqlite"
    });
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
