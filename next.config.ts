import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ensures build passes without introducing risky overrides
    ignoreBuildErrors: false,
  },
  typedRoutes: false,
};

export default nextConfig;
