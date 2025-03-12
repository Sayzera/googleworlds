import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Build sırasında ESLint hatalarını görmezden gel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
