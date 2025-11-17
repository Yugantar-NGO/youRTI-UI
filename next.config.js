/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Optimize fonts
  optimizeFonts: true,

  // Performance optimizations
  swcMinify: true,

  // Static export for GitHub Pages
  output: 'export',

  // GitHub Pages deployment settings
  basePath: process.env.NODE_ENV === 'production' ? '/youRTI-UI' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/youRTI-UI/' : '',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ['recharts'],
  },
}

module.exports = nextConfig
