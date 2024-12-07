/** @type {import('next').NextConfig} */
const nextConfig = {
  //basePath: '/blog',
  experimental: {
    serverActions: true,
    esmExternals: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
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
