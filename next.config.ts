import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.tribuneindia.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.newsdata.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.indiatimes.com",
        pathname: "/**",
      },
      // 🧩 Add this one 👇
      {
        protocol: "https",
        hostname: "imgeng.jagran.com",
        pathname: "/**",
      },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
