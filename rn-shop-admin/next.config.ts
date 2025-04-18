import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lilixcdslcslpmkjifjx.supabase.co'
      },
      {
        protocol: 'https',
        hostname: "images.unsplash.com",
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
