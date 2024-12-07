/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    esmExternals: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'github.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
