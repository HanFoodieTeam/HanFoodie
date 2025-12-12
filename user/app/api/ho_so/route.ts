// // // // // // // // // import { NextResponse } from "next/server";
// // // // // // // // // import { NguoiDungModel } from "@/app/lib/models";
// // // // // // // // // import jwt from "jsonwebtoken";

// // // // // // // // // export async function POST(req: Request) {
// // // // // // // // //   try {
// // // // // // // // //     const authHeader = req.headers.get("authorization");
// // // // // // // // //     if (!authHeader) {
// // // // // // // // //       return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });
// // // // // // // // //     }

// // // // // // // // //     const token = authHeader.split(" ")[1];
// // // // // // // // //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";

// // // // // // // // //     let userData;
// // // // // // // // //     try {
// // // // // // // // //       userData = jwt.verify(token, secret);
// // // // // // // // //     } catch {
// // // // // // // // //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 403 });
// // // // // // // // //     }

// // // // // // // // //     const { ho_ten, sdt, gioi_tinh, ngay_sinh } = await req.json();

// // // // // // // // //     // Tìm user theo ID trong token
// // // // // // // // //     const user = await NguoiDungModel.findOne({ where: { id: userData.id } });
// // // // // // // // //     if (!user) {
// // // // // // // // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// // // // // // // // //     }

// // // // // // // // //     // Cập nhật thông tin
// // // // // // // // //     await user.update({
// // // // // // // // //       ho_ten,
// // // // // // // // //       sdt,
// // // // // // // // //       ngay_sinh,
// // // // // // // // //       tep_khach: gioi_tinh, // nếu bạn chưa có cột gioi_tinh, tạm lưu vào đây
// // // // // // // // //     });

// // // // // // // // //     return NextResponse.json({ thong_bao: "Cập nhật hồ sơ thành công!" });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("Lỗi cập nhật hồ sơ:", error);
// // // // // // // // //     return NextResponse.json(
// // // // // // // // //       { thong_bao: "Lỗi server", chi_tiet: (error as Error).message },
// // // // // // // // //       { status: 500 }
// // // // // // // // //     );
// // // // // // // // //   }
// // // // // // // //   // }
// // // // // // // // import { NextResponse } from "next/server";
// // // // // // // // import jwt from "jsonwebtoken";
// // // // // // // // import { NguoiDungModel } from "@/app/lib/models";

// // // // // // // // // 🧩 Giải mã token và lấy ID người dùng
// // // // // // // // function xacThucNguoiDung(req: Request) {
// // // // // // // //   const authHeader = req.headers.get("authorization");
// // // // // // // //   if (!authHeader) return null;

// // // // // // // //   const token = authHeader.split(" ")[1];
// // // // // // // //   const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// // // // // // // //   try {
// // // // // // // //     const userData = jwt.verify(token, secret) as { id: number };
// // // // // // // //     return userData.id;
// // // // // // // //   } catch {
// // // // // // // //     return null;
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // /* 🟢 GET — Lấy thông tin người dùng */
// // // // // // // // export async function GET(req: Request) {
// // // // // // // //   try {
// // // // // // // //     const userId = xacThucNguoiDung(req);
// // // // // // // //     if (!userId) {
// // // // // // // //       return NextResponse.json({ thong_bao: "Thiếu hoặc token không hợp lệ" }, { status: 401 });
// // // // // // // //     }

// // // // // // // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // // // // // // //     if (!user) {
// // // // // // // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// // // // // // // //     }

// // // // // // // //     const u = user.toJSON();
// // // // // // // //     return NextResponse.json({
// // // // // // // //       thong_bao: "Lấy thông tin thành công",
// // // // // // // //       nguoi_dung: {
// // // // // // // //         ho_ten: u.ho_ten,
// // // // // // // //         email: u.email,
// // // // // // // //         sdt: u.sdt,
// // // // // // // //         ngay_sinh: u.ngay_sinh,
// // // // // // // //       },
// // // // // // // //     });
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error("Lỗi lấy hồ sơ:", err);
// // // // // // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // // /* 🟡 POST — Cập nhật thông tin người dùng */
// // // // // // // // export async function POST(req: Request) {
// // // // // // // //   try {
// // // // // // // //     const userId = xacThucNguoiDung(req);
// // // // // // // //     if (!userId) {
// // // // // // // //       return NextResponse.json({ thong_bao: "Thiếu hoặc token không hợp lệ" }, { status: 401 });
// // // // // // // //     }

// // // // // // // //     const { ho_ten, sdt, ngay_sinh } = await req.json();

// // // // // // // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // // // // // // //     if (!user) {
// // // // // // // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// // // // // // // //     }

// // // // // // // //     await user.update({ ho_ten, sdt, ngay_sinh });

// // // // // // // //     return NextResponse.json({ thong_bao: "Cập nhật hồ sơ thành công!" });
// // // // // // // //   } catch (err) {
// // // // // // // //     console.error("Lỗi cập nhật hồ sơ:", err);
// // // // // // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // // // // // //   }
// // // // // // // // }

// // // // // // // import { NextResponse } from "next/server";
// // // // // // // import jwt from "jsonwebtoken";
// // // // // // // import { promises as fs } from "fs";
// // // // // // // import path from "path";
// // // // // // // import { NguoiDungModel } from "@/app/lib/models";

// // // // // // // // 🧩 Xác thực người dùng
// // // // // // // function xacThucNguoiDung(req: Request) {
// // // // // // //   const authHeader = req.headers.get("authorization");
// // // // // // //   if (!authHeader) return null;

// // // // // // //   const token = authHeader.split(" ")[1];
// // // // // // //   const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// // // // // // //   try {
// // // // // // //     const userData = jwt.verify(token, secret) as { id: number };
// // // // // // //     return userData.id;
// // // // // // //   } catch {
// // // // // // //     return null;
// // // // // // //   }
// // // // // // // }

// // // // // // // /* 🟢 GET — Lấy thông tin người dùng */
// // // // // // // export async function GET(req: Request) {
// // // // // // //   try {
// // // // // // //     const userId = xacThucNguoiDung(req);
// // // // // // //     if (!userId) {
// // // // // // //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });
// // // // // // //     }

// // // // // // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // // // // // //     if (!user) {
// // // // // // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// // // // // // //     }

// // // // // // //     const u = user.toJSON();
// // // // // // //     return NextResponse.json({
// // // // // // //       thong_bao: "Lấy thông tin thành công",
// // // // // // //       nguoi_dung: {
// // // // // // //         ho_ten: u.ho_ten,
// // // // // // //         email: u.email,
// // // // // // //         sdt: u.sdt,
// // // // // // //         ngay_sinh: u.ngay_sinh,
// // // // // // //         hinh: u.hinh ? `/uploads/avatars/${u.hinh}` : null,
// // // // // // //       },
// // // // // // //     });
// // // // // // //   } catch (err) {
// // // // // // //     console.error("Lỗi lấy hồ sơ:", err);
// // // // // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // // // // //   }
// // // // // // // }

// // // // // // // /* 🟡 POST — Cập nhật hồ sơ & ảnh */
// // // // // // // export async function POST(req: Request) {
// // // // // // //   try {
// // // // // // //     const userId = xacThucNguoiDung(req);
// // // // // // //     if (!userId) {
// // // // // // //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });
// // // // // // //     }

// // // // // // //     const formData = await req.formData();
// // // // // // //     const ho_ten = formData.get("ho_ten")?.toString() || "";
// // // // // // //     const sdt = formData.get("sdt")?.toString() || "";
// // // // // // //     const ngay_sinh = formData.get("ngay_sinh")?.toString() || "";
// // // // // // //     const file = formData.get("hinh") as File | null;

// // // // // // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // // // // // //     if (!user) {
// // // // // // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// // // // // // //     }

// // // // // // //     let tenFile: string | null = null;

// // // // // // //     // 🔹 Nếu có upload file
// // // // // // //     if (file && file.size > 0) {
// // // // // // //       const buffer = Buffer.from(await file.arrayBuffer());
// // // // // // //       const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
// // // // // // //       await fs.mkdir(uploadDir, { recursive: true });

// // // // // // //       tenFile = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
// // // // // // //       const filePath = path.join(uploadDir, tenFile);
// // // // // // //       await fs.writeFile(filePath, buffer);
// // // // // // //     }

// // // // // // //     // Cập nhật DB
// // // // // // //     await user.update({
// // // // // // //     ho_ten,
// // // // // // //     sdt: sdt ? Number(sdt) : null, // ✅ ép kiểu sang number
// // // // // // //     ngay_sinh,
// // // // // // //     ...(tenFile ? { hinh: tenFile } : {}),
// // // // // // //   });


// // // // // // //     return NextResponse.json({ thong_bao: "Cập nhật hồ sơ thành công!" });
// // // // // // //   } catch (err) {
// // // // // // //     console.error("Lỗi cập nhật hồ sơ:", err);
// // // // // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // // // // //   }
// // // // // // // }
// // // // // // import { NextResponse } from "next/server";
// // // // // // import jwt from "jsonwebtoken";
// // // // // // import { promises as fs } from "fs";
// // // // // // import path from "path";
// // // // // // import { NguoiDungModel } from "@/app/lib/models";

// // // // // // // 🧩 Xác thực người dùng
// // // // // // function xacThucNguoiDung(req: Request) {
// // // // // //   const token = req.headers.get("authorization")?.split(" ")[1];
// // // // // //   if (!token) return null;

// // // // // //   try {
// // // // // //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// // // // // //     const userData = jwt.verify(token, secret) as { id: number };
// // // // // //     return userData.id;
// // // // // //   } catch {
// // // // // //     return null;
// // // // // //   }
// // // // // // }

// // // // // // /* 🟢 GET — Lấy thông tin người dùng */
// // // // // // export async function GET(req: Request) {
// // // // // //   try {
// // // // // //     const userId = xacThucNguoiDung(req);
// // // // // //     if (!userId) {
// // // // // //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });
// // // // // //     }

// // // // // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // // // // //     if (!user) {
// // // // // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// // // // // //     }

// // // // // //     const u = user.toJSON();
// // // // // //     return NextResponse.json({
// // // // // //       thong_bao: "Lấy thông tin thành công",
// // // // // //       nguoi_dung: {
// // // // // //         id: u.id,
// // // // // //         ho_ten: u.ho_ten,
// // // // // //         email: u.email,
// // // // // //         sdt: u.sdt,
// // // // // //         ngay_sinh: u.ngay_sinh,
// // // // // //         hinh: u.hinh ? `/uploads/avatars/${u.hinh}` : null,
// // // // // //       },
// // // // // //     });
// // // // // //   } catch (err) {
// // // // // //     console.error("Lỗi lấy hồ sơ:", err);
// // // // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // // // //   }
// // // // // // }

// // // // // // /* 🟡 POST — Cập nhật hồ sơ & ảnh */
// // // // // // export async function POST(req: Request) {
// // // // // //   try {
// // // // // //     const userId = xacThucNguoiDung(req);
// // // // // //     if (!userId) {
// // // // // //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });
// // // // // //     }

// // // // // //     const formData = await req.formData();
// // // // // //     const ho_ten = formData.get("ho_ten")?.toString() || "";
// // // // // //     const sdt = formData.get("sdt")?.toString() || "";
// // // // // //     const ngay_sinh = formData.get("ngay_sinh")?.toString() || "";
// // // // // //     const file = formData.get("hinh") as File | null;

// // // // // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // // // // //     if (!user) {
// // // // // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// // // // // //     }

// // // // // //     let tenFile = user.hinh; // mặc định giữ ảnh cũ

// // // // // //     // ✅ Nếu có upload file mới
// // // // // //     if (file && file.size > 0) {
// // // // // //       const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
// // // // // //       await fs.mkdir(uploadDir, { recursive: true });

// // // // // //       // ❌ Xoá ảnh cũ (nếu có)
// // // // // //       if (user.hinh) {
// // // // // //         const oldPath = path.join(uploadDir, user.hinh);
// // // // // //         try {
// // // // // //           await fs.unlink(oldPath);
// // // // // //         } catch {
// // // // // //           /* ignore if not exist */
// // // // // //         }
// // // // // //       }

// // // // // //       // ✅ Lưu ảnh mới
// // // // // //       tenFile = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
// // // // // //       const filePath = path.join(uploadDir, tenFile);
// // // // // //       const buffer = Buffer.from(await file.arrayBuffer());
// // // // // //       await fs.writeFile(filePath, buffer);
// // // // // //     }

// // // // // //     // ✅ Cập nhật DB
 
// // // // // //     await user.update({
// // // // // //       ho_ten: ho_ten || user.ho_ten,
// // // // // //       sdt: sdt ? Number(sdt) : null,
// // // // // //       ngay_sinh: ngay_sinh || user.ngay_sinh,
// // // // // //       hinh: tenFile || user.hinh,
// // // // // //     });

// // // // // //     return NextResponse.json({
// // // // // //       thong_bao: "✅ Cập nhật hồ sơ thành công!",
// // // // // //       nguoi_dung: {
// // // // // //         id: user.id,
// // // // // //         ho_ten: user.ho_ten,
// // // // // //         email: user.email,
// // // // // //         sdt: user.sdt,
// // // // // //         ngay_sinh: user.ngay_sinh,
// // // // // //         hinh: tenFile ? `/uploads/avatars/${tenFile}` : null,
// // // // // //       },
// // // // // //     });
// // // // // //   } catch (err) {
// // // // // //     console.error("Lỗi cập nhật hồ sơ:", err);
// // // // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // // // //   }
// // // // // // }
// // // // // import { NextResponse } from "next/server";
// // // // // import jwt from "jsonwebtoken";
// // // // // import { promises as fs } from "fs";
// // // // // import path from "path";
// // // // // import { NguoiDungModel } from "@/app/lib/models";
// // // // // import { v2 as cloudinary } from "cloudinary";

// // // // // // Cấu hình
// // // // // cloudinary.config({
// // // // //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// // // // //   api_key: process.env.CLOUDINARY_API_KEY,
// // // // //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // // // // });

// // // // // // ============================
// // // // // //     HÀM UPLOAD 1 HÌNH ẢNH
// // // // // // ============================
// // // // // export async function uploadHinh(file: File) {
// // // // //   if (!file) return null;

// // // // //   // Chuyển File -> Base64
// // // // //   const buffer = Buffer.from(await file.arrayBuffer());
// // // // //   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

// // // // //   // Upload lên Cloudinary
// // // // //   const uploadResult = await cloudinary.uploader.upload(base64, {
// // // // //     folder: "san_pham",
// // // // //   });

// // // // //   return uploadResult.secure_url; // ⬅️ URL trả về
// // // // // }

// // // // // function xacThucNguoiDung(req: Request) {
// // // // //   const token = req.headers.get("authorization")?.split(" ")[1];
// // // // //   if (!token) return null;

// // // // //   try {
// // // // //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// // // // //     const userData = jwt.verify(token, secret) as { id: number };
// // // // //     return userData.id;
// // // // //   } catch {
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // export async function GET(req: Request) {
// // // // //   try {
// // // // //     const userId = xacThucNguoiDung(req);
// // // // //     if (!userId)
// // // // //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

// // // // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // // // //     if (!user)
// // // // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

// // // // //     const u = user.toJSON();
// // // // //     return NextResponse.json({
// // // // //       thong_bao: "Lấy thông tin thành công",
// // // // //       nguoi_dung: {
// // // // //         id: u.id,
// // // // //         ho_ten: u.ho_ten,
// // // // //         email: u.email,
// // // // //         sdt: u.sdt,
// // // // //         ngay_sinh: u.ngay_sinh,
// // // // //         hinh: u.hinh && u.hinh.trim() !== ''
// // // // //         ? `/uploads/avatars/${u.hinh}`
// // // // //         : '/avatar.png',

// // // // //             },
// // // // //     });
// // // // //   } catch (err) {
// // // // //     console.error("Lỗi lấy hồ sơ:", err);
// // // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // export async function POST(req: Request) {
// // // // //   try {
// // // // //     const userId = xacThucNguoiDung(req);
// // // // //     if (!userId)
// // // // //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

// // // // //     const formData = await req.formData();
// // // // //     const ho_ten = formData.get("ho_ten")?.toString() || "";
// // // // //     const sdt = formData.get("sdt")?.toString() || "";
// // // // //     const ngay_sinh = formData.get("ngay_sinh")?.toString() || "";
// // // // //     const file = formData.get("hinh") as File | null;

// // // // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // // // //     if (!user)
// // // // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

// // // // //     let tenFile = user.hinh;

// // // // //     if (file && file.size > 0) {
// // // // //       const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
// // // // //       await fs.mkdir(uploadDir, { recursive: true });

// // // // //       if (user.hinh) {
// // // // //         const oldPath = path.join(uploadDir, user.hinh);
// // // // //         try { await fs.unlink(oldPath); } catch {}
// // // // //       }

// // // // //       tenFile = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
// // // // //       const filePath = path.join(uploadDir, tenFile);
// // // // //       const buffer = Buffer.from(await file.arrayBuffer());
// // // // //       await fs.writeFile(filePath, buffer);
// // // // //     }

// // // // //     await user.update({
// // // // //       ho_ten: ho_ten || user.ho_ten,
// // // // //        sdt: sdt ? Number(sdt) : null,
// // // // //       ngay_sinh: ngay_sinh || user.ngay_sinh,
// // // // //       hinh: tenFile
// // // // //   ? `/uploads/avatars/${tenFile}`
// // // // //   : '/avatar.png',

// // // // //     });

// // // // //     return NextResponse.json({
// // // // //       thong_bao: "✅ Cập nhật hồ sơ thành công!",
// // // // //       nguoi_dung: {
// // // // //         id: user.id,
// // // // //         ho_ten: user.ho_ten,
// // // // //         email: user.email,
// // // // //         sdt: user.sdt,
// // // // //         ngay_sinh: user.ngay_sinh,
// // // // //         hinh: tenFile ? `/uploads/avatars/${tenFile}` : null,
// // // // //       },
// // // // //     });
// // // // //   } catch (err) {
// // // // //     console.error("Lỗi cập nhật hồ sơ:", err);
// // // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // // //   }
// // // // // }
// // // // import { NextResponse } from "next/server";
// // // // import jwt from "jsonwebtoken";
// // // // import { NguoiDungModel } from "@/app/lib/models";
// // // // import { v2 as cloudinary } from "cloudinary";


// // // // cloudinary.config({
// // // //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// // // //   api_key: process.env.CLOUDINARY_API_KEY,
// // // //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // // // });

// // // // export async function uploadHinh(file: File) {
// // // //   if (!file) return null;

// // // //   const buffer = Buffer.from(await file.arrayBuffer());
// // // //   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

// // // //   const uploadResult = await cloudinary.uploader.upload(base64, {
// // // //     folder: "nguoi_dung_avatar",
// // // //   });

// // // //   return uploadResult.secure_url;
// // // // }

// // // // function xacThucNguoiDung(req: Request) {
// // // //   const token = req.headers.get("authorization")?.split(" ")[1];
// // // //   if (!token) return null;

// // // //   try {
// // // //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// // // //     const userData = jwt.verify(token, secret) as { id: number };
// // // //     return userData.id;
// // // //   } catch {
// // // //     return null;
// // // //   }
// // // // }

// // // // export async function GET(req: Request) {
// // // //   try {
// // // //     const userId = xacThucNguoiDung(req);
// // // //     if (!userId)
// // // //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

// // // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // // //     if (!user)
// // // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

// // // //     const u = user.toJSON();

// // // //     return NextResponse.json({
// // // //       thong_bao: "Lấy thông tin thành công",
// // // //       nguoi_dung: {
// // // //         id: u.id,
// // // //         ho_ten: u.ho_ten,
// // // //         email: u.email,
// // // //         sdt: u.sdt,
// // // //         ngay_sinh: u.ngay_sinh,
// // // //         hinh: u.hinh || "/avatar.png",
// // // //       },
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("Lỗi lấy hồ sơ:", err);
// // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // //   }
// // // // }

// // // // export async function POST(req: Request) {
// // // //   try {
// // // //     const userId = xacThucNguoiDung(req);
// // // //     if (!userId)
// // // //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

// // // //     const formData = await req.formData();
// // // //     const ho_ten = formData.get("ho_ten")?.toString() || "";
// // // //     const sdt = formData.get("sdt")?.toString() || "";
// // // //     const ngay_sinh = formData.get("ngay_sinh")?.toString() || "";
// // // //     const file = formData.get("hinh") as File | null;

// // // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // // //     if (!user)
// // // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

// // // //     let hinhUrl: string | null = user.hinh ?? null;

// // // //       if (file && file.size > 0) {
// // // //         hinhUrl = await uploadHinh(file); 
// // // //       }

// // // //       await user.update({
// // // //         ho_ten: ho_ten || user.ho_ten,
// // // //         sdt: sdt ? Number(sdt) : user.sdt,
// // // //         ngay_sinh: ngay_sinh || user.ngay_sinh,
// // // //         hinh: hinhUrl !== null ? hinhUrl : undefined, 
// // // //       });




// // // //     return NextResponse.json({
// // // //       thong_bao: "✅ Cập nhật hồ sơ thành công!",
// // // //       nguoi_dung: {
// // // //         id: user.id,
// // // //         ho_ten: user.ho_ten,
// // // //         email: user.email,
// // // //         sdt: user.sdt,
// // // //         ngay_sinh: user.ngay_sinh,
// // // //         hinh: hinhUrl,
// // // //       },
// // // //     });
// // // //   } catch (err) {
// // // //     console.error("Lỗi cập nhật hồ sơ:", err);
// // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // //   }
// // // // }
// // // import { NextResponse } from "next/server";
// // // import jwt from "jsonwebtoken";
// // // import { NguoiDungModel } from "@/app/lib/models";
// // // import { uploadHinh } from "@/app/lib/uploadHinh";

// // // // Xác thực token và trả về userId
// // // function xacThucNguoiDung(req: Request) {
// // //   const token = req.headers.get("authorization")?.split(" ")[1];
// // //   if (!token) return null;

// // //   try {
// // //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// // //     const userData = jwt.verify(token, secret) as { id: number };
// // //     return userData.id;
// // //   } catch {
// // //     return null;
// // //   }
// // // }

// // // // GET: Lấy thông tin người dùng
// // // export async function GET(req: Request) {
// // //   try {
// // //     const userId = xacThucNguoiDung(req);
// // //     if (!userId)
// // //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

// // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // //     if (!user)
// // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

// // //     const u = user.toJSON();

// // //     return NextResponse.json({
// // //       thong_bao: "Lấy thông tin thành công",
// // //       nguoi_dung: {
// // //         id: u.id,
// // //         ho_ten: u.ho_ten,
// // //         email: u.email,
// // //         sdt: u.sdt,
// // //         ngay_sinh: u.ngay_sinh,
// // //         hinh: u.hinh || "/avatar.png",
// // //       },
// // //     });
// // //   } catch (err) {
// // //     console.error("Lỗi lấy hồ sơ:", err);
// // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // //   }
// // // }

// // // // POST: Cập nhật thông tin người dùng
// // // export async function POST(req: Request) {
// // //   try {
// // //     const userId = xacThucNguoiDung(req);
// // //     if (!userId)
// // //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

// // //     const formData = await req.formData();
// // //     const ho_ten = formData.get("ho_ten")?.toString() || "";
// // //     const sdt = formData.get("sdt")?.toString() || "";
// // //     const ngay_sinh = formData.get("ngay_sinh")?.toString() || "";
// // //     const file = formData.get("hinh") as File | null;

// // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // //     if (!user)
// // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

// // //     let hinhUrl: string | null = user.hinh ?? null;

// // //     if (file && file.size > 0) {
// // //       hinhUrl = await uploadHinh(file);
// // //     }

// // //     await user.update({
// // //       ho_ten: ho_ten || user.ho_ten,
// // //       sdt: sdt ? Number(sdt) : user.sdt,
// // //       ngay_sinh: ngay_sinh || user.ngay_sinh,
// // //       hinh: hinhUrl !== null ? hinhUrl : undefined,
// // //     });

// // //     return NextResponse.json({
// // //       thong_bao: "✅ Cập nhật hồ sơ thành công!",
// // //       nguoi_dung: {
// // //         id: user.id,
// // //         ho_ten: user.ho_ten,
// // //         email: user.email,
// // //         sdt: user.sdt,
// // //         ngay_sinh: user.ngay_sinh,
// // //         hinh: hinhUrl,
// // //       },
// // //     });
// // //   } catch (err) {
// // //     console.error("Lỗi cập nhật hồ sơ:", err);
// // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // //   }
// // // }
// // import { NextResponse } from "next/server";
// // import jwt from "jsonwebtoken";
// // import { NguoiDungModel } from "@/app/lib/models";
// // import { uploadHinh } from "@/app/lib/uploadHinh";

// // // Xác thực token
// // function xacThucNguoiDung(req: Request) {
// //   const token = req.headers.get("authorization")?.split(" ")[1];
// //   if (!token) return null;

// //   try {
// //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// //     const userData = jwt.verify(token, secret) as { id: number };
// //     return userData.id;
// //   } catch {
// //     return null;
// //   }
// // }

// // // 🚀 GET — Lấy thông tin hồ sơ
// // export async function GET(req: Request) {
// //   try {
// //     const userId = xacThucNguoiDung(req);
// //     if (!userId)
// //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

// //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// //     if (!user)
// //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

// //     return NextResponse.json({
// //       thong_bao: "Lấy thông tin thành công",
// //       nguoi_dung: {
// //         id: user.id,
// //         ho_ten: user.ho_ten,
// //         email: user.email,
// //         sdt: user.sdt,
// //         ngay_sinh: user.ngay_sinh,
// //         hinh: user.hinh || "/avatar.png",
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Lỗi lấy hồ sơ:", err);
// //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// //   }
// // }

// // // 🚀 POST — Cập nhật thông tin + Upload Cloudinary
// // export async function POST(req: Request) {
// //   try {
// //     const userId = xacThucNguoiDung(req);
// //     if (!userId)
// //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

// //     const formData = await req.formData();
// //     const ho_ten = formData.get("ho_ten")?.toString() ?? "";
// //     const sdt = formData.get("sdt")?.toString() ?? "";
// //     const ngay_sinh = formData.get("ngay_sinh")?.toString() ?? "";
// //     const file = formData.get("hinh") as Blob | null;

// //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// //     if (!user)
// //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

// //     let hinhUrl = user.hinh;

// //     // 📌 Nếu có file mới → upload Cloudinary
// //     if (file && typeof file === "object" && (file as any).size > 0) {
// //       hinhUrl = await uploadHinh(file);
// //     }

// //     // 📌 Cập nhật DB
// //     await user.update({
// //       ho_ten: ho_ten || user.ho_ten,
// //       sdt: sdt ? Number(sdt) : user.sdt,
// //       ngay_sinh: ngay_sinh || user.ngay_sinh,
// //       hinh: hinhUrl,
// //     });

// //     return NextResponse.json({
// //       thong_bao: "Cập nhật hồ sơ thành công!",
// //       nguoi_dung: {
// //         id: user.id,
// //         ho_ten: user.ho_ten,
// //         email: user.email,
// //         sdt: user.sdt,
// //         ngay_sinh: user.ngay_sinh,
// //         hinh: hinhUrl,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Lỗi cập nhật hồ sơ:", err);
// //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// //   }
// // }
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { NguoiDungModel } from "@/app/lib/models";
// import { uploadHinh } from "@/app/lib/uploadHinh";

// interface UploadFile extends Blob {
//   size: number;
//   type: string;
// }

// function xacThucNguoiDung(req: Request): number | null {
//   const token = req.headers.get("authorization")?.split(" ")[1];
//   if (!token) return null;

//   try {
//     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
//     const userData = jwt.verify(token, secret) as { id: number };
//     return userData.id;
//   } catch {
//     return null;
//   }
// }

// // ============================ GET ============================
// export async function GET(req: Request) {
//   try {
//     const userId = xacThucNguoiDung(req);
//     if (!userId)
//       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

//     const user = await NguoiDungModel.findOne({ where: { id: userId } });
//     if (!user)
//       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

//     return NextResponse.json({
//       thong_bao: "Lấy thông tin thành công",
//       nguoi_dung: {
//         id: user.id,
//         ho_ten: user.ho_ten,
//         email: user.email,
//         sdt: user.sdt,
//         ngay_sinh: user.ngay_sinh,
//         hinh: user.hinh ?? "/avatar.png",
//       },
//     });
//   } catch (err) {
//     console.error("Lỗi lấy hồ sơ:", err);
//     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
//   }
// }

// // ============================ POST ============================
// export async function POST(req: Request) {
//   try {
//     const userId = xacThucNguoiDung(req);
//     if (!userId)
//       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

//     const formData = await req.formData();

//     const ho_ten = formData.get("ho_ten")?.toString() ?? "";
//     const sdt = formData.get("sdt")?.toString() ?? "";
//     const ngay_sinh = formData.get("ngay_sinh")?.toString() ?? "";
//     const file = formData.get("hinh") as UploadFile | null;

//     const user = await NguoiDungModel.findOne({ where: { id: userId } });
//     if (!user)
//       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// let hinhUrl: string | undefined = user.hinh || undefined;

// // Nếu upload được ảnh thì nhận string
// if (file && file.size > 0) {
//   const newUrl = await uploadHinh(file);
//   hinhUrl = newUrl || undefined;
// }

// await user.update({
//   ho_ten: ho_ten || user.ho_ten,
//   sdt: sdt ? Number(sdt) : user.sdt,
//   ngay_sinh: ngay_sinh || user.ngay_sinh,
//   hinh: hinhUrl, // string hoặc undefined
// });

//     return NextResponse.json({
//       thong_bao: "Cập nhật hồ sơ thành công!",
//       nguoi_dung: {
//         id: user.id,
//         ho_ten: user.ho_ten,
//         email: user.email,
//         sdt: user.sdt,
//         ngay_sinh: user.ngay_sinh,
//         hinh: hinhUrl,
//       },
//     });
//   } catch (err) {
//     console.error("Lỗi cập nhật hồ sơ:", err);
//     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { NguoiDungModel } from "@/lib/models";
import { uploadHinh } from "@/lib/uploadHinh";

function xacThucNguoiDung(req: Request): number | null {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return null;

  try {
    const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
    const decode = jwt.verify(token, secret) as { id: number };
    return decode.id;
  } catch {
    return null;
  }
}

// ============================ GET ============================
export async function GET(req: Request) {
  try {
    const userId = xacThucNguoiDung(req);
    if (!userId)
      return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

    const user = await NguoiDungModel.findOne({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

    return NextResponse.json({
      thong_bao: "Lấy thông tin thành công",
      nguoi_dung: {
        id: user.id,
        ho_ten: user.ho_ten,
        email: user.email,
        sdt: user.sdt,
        ngay_sinh: user.ngay_sinh,
        hinh: user.hinh ?? "/avatar.png",
      },
    });
  } catch (err) {
    console.error("Lỗi GET hồ sơ:", err);
    return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
  }
}

// ============================ POST - UPDATE ============================
export async function POST(req: Request) {
  try {
    const userId = xacThucNguoiDung(req);
    if (!userId)
      return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

    const formData = await req.formData();

    const ho_ten = formData.get("ho_ten")?.toString().trim() || "";
    const sdt = formData.get("sdt")?.toString().trim() || "";
    const ngay_sinh = formData.get("ngay_sinh")?.toString().trim() || "";
    const file = formData.get("hinh") as File | null;

    // ================= VALIDATION =================

    if (ho_ten.length < 3)
      return NextResponse.json({ thong_bao: "Tên phải có ít nhất 3 ký tự" }, { status: 400 });

    if (sdt && !/^\d{9,11}$/.test(sdt))
      return NextResponse.json(
        { thong_bao: "Số điện thoại không hợp lệ (9-11 số)" },
        { status: 400 }
      );

    if (ngay_sinh && isNaN(Date.parse(ngay_sinh)))
      return NextResponse.json({ thong_bao: "Ngày sinh không hợp lệ" }, { status: 400 });

    // ================= LẤY USER =================
    const user = await NguoiDungModel.findOne({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

    // ================= XỬ LÝ SĐT (string → number) =================

    let sdtUpdate: number | null = user.sdt ?? null;
    if (sdt && /^\d+$/.test(sdt)) {
      sdtUpdate = Number(sdt);
    }

    // ================= UPLOAD AVATAR =================

    let hinhUrl: string | undefined = user.hinh || undefined;

    if (file && file.size > 0) {
      const uploaded = await uploadHinh(file);
      if (uploaded) hinhUrl = uploaded;
    }

    // ================= CẬP NHẬT USER =================

    await user.update({
      ho_ten,
      sdt: sdtUpdate,
      ngay_sinh: ngay_sinh || user.ngay_sinh,
      hinh: hinhUrl,
    });

    return NextResponse.json({
      thong_bao: "Cập nhật hồ sơ thành công!",
      nguoi_dung: {
        id: user.id,
        ho_ten: user.ho_ten,
        email: user.email,
        sdt: user.sdt,
        ngay_sinh: user.ngay_sinh,
        hinh: hinhUrl,
      },
    });
  } catch (err) {
    console.error("Lỗi POST hồ sơ:", err);
    return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
  }
}
