/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/blog',
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client', '@auth/prisma-adapter']
  },
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['github.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
