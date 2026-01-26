/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for better error detection
  reactStrictMode: true,

  // Optimize images (updated to use remotePatterns)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
