/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Optimize fonts
  optimizeFonts: true,

  // Performance optimizations
  swcMinify: true,

  // Experimental features
  experimental: {
    optimizePackageImports: ['recharts'],
  },
}

module.exports = nextConfig
