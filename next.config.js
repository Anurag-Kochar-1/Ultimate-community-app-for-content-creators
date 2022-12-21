/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['firebasestorage.googleapis.com'], 
    // domains: ['yt3.ggpht.com'],
  }
}

module.exports = nextConfig
