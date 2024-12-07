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
  }
}

export default nextConfig
