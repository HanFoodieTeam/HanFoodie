/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'encrypted-tbn0.gstatic.com',
      'cdn.tgdd.vn'
    ], // thêm domain của bạn vào đây
  },
};

module.exports = nextConfig;

