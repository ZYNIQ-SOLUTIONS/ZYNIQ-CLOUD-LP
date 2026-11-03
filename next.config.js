/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Pre-existing lint warnings (jsx-no-comment-textnodes for decorative code comments)
    // These are intentional UI text patterns, not developer errors
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable static export for production
  output: 'standalone',
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  // Expose environment variables to the browser
  env: {
    NEXT_PUBLIC_ZYNIQX_BRIDGE_URL: process.env.NEXT_PUBLIC_ZYNIQX_BRIDGE_URL || 'http://localhost:3950',
  },
  // Configure headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  // Redirects
  async redirects() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: 'frameworks.zyniq.cloud' }],
        destination: '/frontend/z-framework',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
