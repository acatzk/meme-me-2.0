/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '**'
      }
    ]
  }
}

module.exports = nextConfig
