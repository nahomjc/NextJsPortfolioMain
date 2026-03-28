/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: "/sitemap.xml", destination: "/api/sitemap" }];
  },
  images: {
    domains: [
      'miro.medium.com',
      'images.medium.com',
      'cdn-images-1.medium.com',
      // add any other domains you need
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig