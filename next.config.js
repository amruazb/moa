/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix tesseract.js worker bundling issue
  experimental: {
    serverComponentsExternalPackages: ['tesseract.js'],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Don't bundle tesseract.js on server - use native require
      config.externals = config.externals || []
      config.externals.push('tesseract.js')
    }
    return config
  },
  // Optimize output for Vercel
  output: 'standalone',
}

module.exports = nextConfig
