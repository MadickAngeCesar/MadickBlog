/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/blog',
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client']
  },
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['github.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
