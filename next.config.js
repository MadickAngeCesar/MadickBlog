/** @type {import('next').NextConfig} */
const nextConfig = {
  //basePath: '/blog',
  experimental: {
    serverActions: true,
    esmExternals: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
        layers: true
      };
    }
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    });
    return config;
  },
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['github.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com']
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
