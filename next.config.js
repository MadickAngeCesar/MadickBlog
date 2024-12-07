/** @type {import('next').NextConfig} */
const nextConfig = {
  //basePath: '/blog',
  experimental: {
    serverActions: true,
    esmExternals: true,
    serverComponentsExternalPackages: ['@prisma/client', '@auth/prisma-adapter']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
        layers: true
      };
    }
    return config;
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
