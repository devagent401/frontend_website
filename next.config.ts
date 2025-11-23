import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/api/v1/upload/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains for production
      },
    ],
    domains: ['localhost'], // Fallback for older Next.js versions
  },
};

export default nextConfig;
