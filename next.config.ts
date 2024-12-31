import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gokxczesysklzepbknzb.supabase.co',
        pathname: '/storage/v1/object/public/hero-image/**',

      },
      {
        protocol: 'https',
        hostname: 'gokxczesysklzepbknzb.supabase.co',
        pathname: '/storage/v1/object/public/user-image/**',
        
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
