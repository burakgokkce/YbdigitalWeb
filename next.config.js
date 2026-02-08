/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false, // Disable strict mode for better 3D performance
}

module.exports = nextConfig
