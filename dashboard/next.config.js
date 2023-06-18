/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [ "images.unsplash.com", "substackcdn.com" ] 
  }
};

module.exports = nextConfig;
