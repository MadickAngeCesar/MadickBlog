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
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
