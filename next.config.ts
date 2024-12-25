import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
   domains:[ 'https://gokxczesysklzepbknzb.supabase.co']
  },
  typescript:{
    ignoreBuildErrors: true,
  },
  eslint:{
    ignoreDuringBuilds:true,
  }
};

export default nextConfig;
