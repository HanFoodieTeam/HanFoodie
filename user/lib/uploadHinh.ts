// // // import { v2 as cloudinary } from "cloudinary";

// // // cloudinary.config({
// // //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// // //   api_key: process.env.CLOUDINARY_API_KEY,
// // //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // // });

// // // export async function uploadHinh(file: File) {
// // //   if (!file) return null;

// // //   const buffer = Buffer.from(await file.arrayBuffer());
// // //   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

// // //   const uploadResult = await cloudinary.uploader.upload(base64, {
// // //     folder: "nguoi_dung_avatar",
// // //   });

// // //   return uploadResult.secure_url;
// // // }
// // import { v2 as cloudinary } from "cloudinary";

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // export async function uploadHinh(file: Blob) {
// //   if (!file) return null;

// //   // Chuyển Blob → Buffer để upload
// //   const buffer = Buffer.from(await file.arrayBuffer());
// //   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

// //   const uploadResult = await cloudinary.uploader.upload(base64, {
// //     folder: "nguoi_dung_avatar",
// //   });

// //   return uploadResult.secure_url;
// // }
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function uploadHinh(file: Blob): Promise<string | null> {
//   if (!file) return null;

//   const buffer = Buffer.from(await file.arrayBuffer());
//   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

//   const uploadResult = await cloudinary.uploader.upload(base64, {
//     folder: "nguoi_dung_avatar",
//   });
// // 
//   return uploadResult.secure_url ?? null;
// }


// /* ============================
//    UPLOAD 1 ẢNH ĐÁNH GIÁ
// ============================ */
// export async function uploadNhieuHinh(
//   file: File | Blob
// ): Promise<string | null> {
//   if (!file) return null;

//   const arrayBuffer = await file.arrayBuffer();
//   const buffer = Buffer.from(arrayBuffer);

//   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

//   const uploadResult = await cloudinary.uploader.upload(base64, {
//     folder: "danh_gia",
//   });

//   return uploadResult.secure_url ?? null;
// }


import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadHinh(file: Blob): Promise<string | null> {
  if (!file) return null;

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const uploadResult = await cloudinary.uploader.upload(base64, {
    folder: "uploads", // bạn muốn đổi thành thư mục nào cũng được
  });

  return uploadResult?.secure_url ?? null;
}
