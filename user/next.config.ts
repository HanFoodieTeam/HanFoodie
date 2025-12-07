// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   images: {
// //     domains: [
// //       "encrypted-tbn0.gstatic.com", // ảnh Google
// //       "res.cloudinary.com",         // ảnh Cloudinary
// //       "lh3.googleusercontent.com",  // ảnh Google user
// //       "images.unsplash.com",        // ảnh Unsplash
// //       "cdn.pixabay.com",            // ảnh Pixabay
// //     ],
// //   },
// // };

// // export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       "encrypted-tbn0.gstatic.com", // ✅ domain gây lỗi
//       "res.cloudinary.com",
//       "lh3.googleusercontent.com",
//       "images.unsplash.com",
//       "cdn.pixabay.com",
//     ],
//   },
// };

// export default nextConfig;

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
  },
};

export default nextConfig;