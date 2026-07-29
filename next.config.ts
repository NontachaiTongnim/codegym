import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a lockfile also exists in the user home directory.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
