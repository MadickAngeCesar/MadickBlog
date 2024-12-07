/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/blog',
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
      bodySizeLimit: "2mb"
    }
  },
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['github.com']
  },
  // Disable TypeScript and ESLint in production
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
