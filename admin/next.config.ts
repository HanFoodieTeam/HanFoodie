<<<<<<< HEAD
import type { NextConfig } from "next";



/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
    ],
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'encrypted-tbn0.gstatic.com',
      'cdn.tgdd.vn'
    ], // thêm domain của bạn vào đây
>>>>>>> 5f392d97dca988aef7fa29f145637b9cf12377cd
  },
};

module.exports = nextConfig;

