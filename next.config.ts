import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gokxczesysklzepbknzb.supabase.co",
        pathname: "/storage/v1/object/public/hero-image/**",
      },
      {
        protocol: "https",
        hostname: "gokxczesysklzepbknzb.supabase.co",
        pathname: "/storage/v1/object/public/user-image/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  devIndicators: {
    buildActivity: false,
  },
};

export default withNextIntl(nextConfig);
