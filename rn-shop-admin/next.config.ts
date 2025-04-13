import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lilixcdslcslpmkjifjx.supabase.co'
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    },
  },

};

export default nextConfig;
