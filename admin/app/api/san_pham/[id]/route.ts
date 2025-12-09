// // // // // // import { NextRequest, NextResponse } from "next/server";
// // // // // // import { SanPhamModel, BienTheModel, HinhModel } from "@/app/lib/models";
// // // // // // import { IBienThe } from "@/app/lib/cautrucdata";

// // // // // // // Convert file → Base64
// // // // // // async function fileToBase64(file: File): Promise<string> {
// // // // // //   const buffer = Buffer.from(await file.arrayBuffer());
// // // // // //   return `data:${file.type};base64,${buffer.toString("base64")}`;
// // // // // // }

// // // // // // // ===================== GET =====================
// // // // // // export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
// // // // // //   try {
// // // // // //     const { id } = await context.params; // <-- lấy params đúng chuẩn Next.js 15

// // // // // //     const numId = Number(id);
// // // // // //     if (isNaN(numId)) {
// // // // // //       return NextResponse.json(
// // // // // //         { success: false, message: "ID không hợp lệ" },
// // // // // //         { status: 400 }
// // // // // //       );
// // // // // //     }

// // // // // //     const sp = await SanPhamModel.findByPk(numId, {
// // // // // //       include: [
// // // // // //         { model: BienTheModel, as: "bien_the" },
// // // // // //         { model: HinhModel, as: "hinh_anh" },
// // // // // //       ],
// // // // // //     });

// // // // // //     if (!sp)
// // // // // //       return NextResponse.json(
// // // // // //         { success: false, message: "Không tìm thấy sản phẩm" },
// // // // // //         { status: 404 }
// // // // // //       );

// // // // // //     const data = {
// // // // // //       id: sp.get("id"),
// // // // // //       ten: sp.get("ten"),
// // // // // //       slug: sp.get("slug"),
// // // // // //       mo_ta: sp.get("mo_ta"),
// // // // // //       gia_goc: sp.get("gia_goc"),
// // // // // //       tag: sp.get("tag"),
// // // // // //       phong_cach: sp.get("phong_cach"),
// // // // // //       luot_xem: sp.get("luot_xem"),
// // // // // //       trang_thai: sp.get("trang_thai"),
// // // // // //       an_hien: sp.get("an_hien"),
// // // // // //       id_danh_muc: sp.get("id_danh_muc"),
// // // // // //       hinh: sp.get("hinh"),
// // // // // //       bien_the: sp.get("bien_the"),
// // // // // //       hinh_anh: sp.get("hinh_anh"),
// // // // // //     };

// // // // // //     return NextResponse.json({ success: true, data });
// // // // // //   } catch (error) {
// // // // // //     console.error("❌ GET sản phẩm lỗi:", error);
// // // // // //     return NextResponse.json(
// // // // // //       { success: false, message: "Lỗi server" },
// // // // // //       { status: 500 }
// // // // // //     );
// // // // // //   }
// // // // // // }
// // // // // // export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
// // // // // //   try {
// // // // // //     const { id } = await context.params;
// // // // // //     const numId = Number(id);
// // // // // //     if (isNaN(numId))
// // // // // //       return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });

// // // // // //     const form = await req.formData();
// // // // // //     const sp = await SanPhamModel.findByPk(numId);
// // // // // //     if (!sp) return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" });

// // // // // //     // Update các field cơ bản + hình (sử dụng sp.set)
// // // // // //     const mainImg = form.get("hinh_chinh");
// // // // // //     let hinhStr = sp.get("hinh") as string; // giữ hình cũ nếu không gửi hình mới
// // // // // //     if (mainImg instanceof File && mainImg.size > 0) {
// // // // // //       hinhStr = await fileToBase64(mainImg);
// // // // // //     }

// // // // // //     sp.set({
// // // // // //       ten: String(form.get("ten") || ""),
// // // // // //       slug: String(form.get("slug") || ""),
// // // // // //       mo_ta: String(form.get("mo_ta") || ""),
// // // // // //       gia_goc: Number(form.get("gia_goc") || 0),
// // // // // //       tag: String(form.get("tag") || ""),
// // // // // //       phong_cach: String(form.get("phong_cach") || ""),
// // // // // //       luot_xem: Number(form.get("luot_xem") || 0),
// // // // // //       trang_thai: String(form.get("trang_thai") || "inactive"),
// // // // // //       an_hien: form.get("an_hien") === "true",
// // // // // //       id_danh_muc: Number(form.get("id_danh_muc") || 0),
// // // // // //       hinh: hinhStr, // update hình chính
// // // // // //     });
// // // // // //     await sp.save();

// // // // // //     // Hình phụ
// // // // // //     const extraImages = form.getAll("hinh_phu");
// // // // // //     for (const f of extraImages) {
// // // // // //       if (f instanceof File && f.size > 0) {
// // // // // //         await HinhModel.create({
// // // // // //           id_san_pham: numId,
// // // // // //           hinh: await fileToBase64(f),
// // // // // //           thu_tu: 0,
// // // // // //         });
// // // // // //       }
// // // // // //     }

// // // // // //     // Biến thể
// // // // // //     const variants: IBienThe[] = JSON.parse(String(form.get("bien_the") || "[]"));
// // // // // //     for (const v of variants) {
// // // // // //       if (v.id) {
// // // // // //         await BienTheModel.update(
// // // // // //           { ten: v.ten, gia_them: v.gia_them || 0, trang_thai: v.trang_thai ? 1 : 0 },
// // // // // //           { where: { id: v.id } }
// // // // // //         );
// // // // // //       } else {
// // // // // //         await BienTheModel.create({
// // // // // //           id_san_pham: numId,
// // // // // //           ten: v.ten,
// // // // // //           gia_them: v.gia_them || 0,
// // // // // //           trang_thai: v.trang_thai ? 1 : 0,
// // // // // //         });
// // // // // //       }
// // // // // //     }

// // // // // //     return NextResponse.json({ success: true, message: "Cập nhật sản phẩm thành công" });
// // // // // //   } catch (error) {
// // // // // //     console.error("❌ PUT sản phẩm lỗi:", error);
// // // // // //     return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
// // // // // //   }
// // // // // // }
// // // // // import { NextResponse } from "next/server";
// // // // // import { SanPhamModel } from "@/app/lib/models";
// // // // // import { ISanPham } from "@/app/lib/cautrucdata";

// // // // // interface IParams {
// // // // //   params: { id: string };
// // // // // }

// // // // // // GET BY ID
// // // // // export async function GET(_: Request, { params }: IParams) {
// // // // //   try {
// // // // //     const data: ISanPham | null = await SanPhamModel.findById(params.id).lean();

// // // // //     if (!data)
// // // // //       return NextResponse.json(
// // // // //         { success: false, message: "Không tìm thấy sản phẩm" },
// // // // //         { status: 404 }
// // // // //       );

// // // // //     return NextResponse.json({ success: true, data });
// // // // //   } catch (err) {
// // // // //     return NextResponse.json(
// // // // //       { success: false, message: "Lỗi server" },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }

// // // // // // UPDATE
// // // // // export async function PUT(req: Request, { params }: IParams) {
// // // // //   try {
// // // // //     const body: Partial<ISanPham> = await req.json();

// // // // //     const updated = await SanPhamModel.findByIdAndUpdate(params.id, body, {
// // // // //       new: true,
// // // // //     }).lean<ISanPham>();

// // // // //     if (!updated)
// // // // //       return NextResponse.json(
// // // // //         { success: false, message: "Không tìm thấy sản phẩm" },
// // // // //         { status: 404 }
// // // // //       );

// // // // //     return NextResponse.json({ success: true, data: updated });
// // // // //   } catch (err) {
// // // // //     return NextResponse.json(
// // // // //       { success: false, message: "Lỗi cập nhật sản phẩm" },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }

// // // // // // DELETE
// // // // // export async function DELETE(_: Request, { params }: IParams) {
// // // // //   try {
// // // // //     const deleted = await SanPhamModel.findByIdAndDelete(params.id).lean();

// // // // //     if (!deleted)
// // // // //       return NextResponse.json(
// // // // //         { success: false, message: "Không tìm thấy sản phẩm" },
// // // // //         { status: 404 }
// // // // //       );

// // // // //     return NextResponse.json({ success: true });
// // // // //   } catch (err) {
// // // // //     return NextResponse.json(
// // // // //       { success: false, message: "Lỗi xóa sản phẩm" },
// // // // //       { status: 500 }
// // // // //     );
// // // // //   }
// // // // // }
// // // // import { NextResponse } from "next/server";
// // // // import { v2 as cloudinary } from "cloudinary";
// // // // import {
// // // //   SanPhamModel,
// // // //   DanhMucModel,
// // // //   BienTheModel,
// // // //   HinhModel,
// // // // } from "@/app/lib/models";

// // // // // ==================== CLOUDINARY CONFIG ====================
// // // // cloudinary.config({
// // // //   cloud_name: process.env.CLOUDINARY_CLOUD!,
// // // //   api_key: process.env.CLOUDINARY_KEY!,
// // // //   api_secret: process.env.CLOUDINARY_SECRET!,
// // // // });

// // // // // Upload 1 file lên Cloudinary
// // // // async function uploadToCloudinary(file: File): Promise<string> {
// // // //   const buffer = Buffer.from(await file.arrayBuffer());
// // // //   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

// // // //   const uploaded = await cloudinary.uploader.upload(base64, {
// // // //     folder: "san_pham",
// // // //   });

// // // //   return uploaded.secure_url;
// // // // }

// // // // // ==================== GET CHI TIẾT SẢN PHẨM ====================
// // // // export async function GET(
// // // //   req: Request,
// // // //   { params }: { params: { id: string } }
// // // // ) {
// // // //   try {
// // // //     const id = Number(params.id);

// // // //     const sanPhamDb = await SanPhamModel.findOne({
// // // //       where: { id },
// // // //       include: [
// // // //         { model: DanhMucModel, as: "danh_muc" },
// // // //         { model: HinhModel, as: "hinh_anh" },
// // // //         { model: BienTheModel, as: "bien_the" },
// // // //       ],
// // // //     });

// // // //     if (!sanPhamDb) {
// // // //       return NextResponse.json(
// // // //         { success: false, message: "Không tìm thấy sản phẩm" },
// // // //         { status: 404 }
// // // //       );
// // // //     }

// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       data: sanPhamDb.toJSON(),
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("❌ Lỗi GET chi tiết:", error);
// // // //     return NextResponse.json(
// // // //       { success: false, message: "Không lấy được chi tiết sản phẩm" },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // // ==================== POST: THÊM SẢN PHẨM ====================
// // // // export async function POST(
// // // //   req: Request,
// // // //   { params }: { params: { id: string } }
// // // // ) {
// // // //   try {
// // // //     const form = await req.formData();

// // // //     // ====== HÌNH CHÍNH ======
// // // //     const hinhChinhFile = form.get("hinh") as File | null;
// // // //     const hinhChinhUrl = hinhChinhFile
// // // //       ? await uploadToCloudinary(hinhChinhFile)
// // // //       : null;

// // // //     // ====== TẠO SẢN PHẨM ======
// // // //     const sanPham = await SanPhamModel.create({
// // // //       ten: form.get("ten"),
// // // //       slug: form.get("slug"),
// // // //       gia_goc: Number(form.get("gia_goc")),
// // // //       mo_ta: form.get("mo_ta"),
// // // //       an_hien: form.get("an_hien") === "true",
// // // //       tag: form.get("tag"),
// // // //       phong_cach: form.get("phong_cach"),
// // // //       trang_thai: form.get("trang_thai"),
// // // //       id_danh_muc: Number(form.get("id_danh_muc")),
// // // //       hinh: hinhChinhUrl,
// // // //     });

// // // //     const idSanPham = sanPham.dataValues.id;

// // // //     // ====== HÌNH PHỤ (MẢNG) ======
// // // //     const hinhPhu = form.getAll("hinh_phu") as File[];

// // // //     for (let i = 0; i < hinhPhu.length; i++) {
// // // //       const file = hinhPhu[i];
// // // //       const url = await uploadToCloudinary(file);

// // // //       await HinhModel.create({
// // // //         hinh: url,
// // // //         thu_tu: i + 1,
// // // //         id_san_pham: idSanPham,
// // // //       });
// // // //     }

// // // //     // ====== BIẾN THỂ ======
// // // //     const bienTheList = JSON.parse(form.get("bien_the") as string) as {
// // // //       ten: string;
// // // //       trang_thai: number;
// // // //       gia_them: number | null;
// // // //     }[];

// // // //     for (const bt of bienTheList) {
// // // //       await BienTheModel.create({
// // // //         ten: bt.ten,
// // // //         trang_thai: bt.trang_thai,
// // // //         gia_them: bt.gia_them,
// // // //         id_san_pham: idSanPham,
// // // //       });
// // // //     }

// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       message: "Thêm sản phẩm thành công",
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("❌ Lỗi POST:", error);
// // // //     return NextResponse.json(
// // // //       { success: false, message: "Không thêm được sản phẩm" },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // // ==================== PUT: CẬP NHẬT SẢN PHẨM ====================
// // // // export async function PUT(
// // // //   req: Request,
// // // //   { params }: { params: { id: string } }
// // // // ) {
// // // //   try {
// // // //     const id = Number(params.id);

// // // //     const form = await req.formData();

// // // //     // ====== XỬ LÝ HÌNH CHÍNH ======
// // // //     let hinhChinhUrl = form.get("hinh") as string | null;

// // // //     const hinhChinhFile = form.get("hinh_file") as File | null;
// // // //     if (hinhChinhFile) {
// // // //       hinhChinhUrl = await uploadToCloudinary(hinhChinhFile);
// // // //     }

// // // //     // ====== UPDATE SẢN PHẨM ======
// // // //     await SanPhamModel.update(
// // // //       {
// // // //         ten: form.get("ten"),
// // // //         slug: form.get("slug"),
// // // //         gia_goc: Number(form.get("gia_goc")),
// // // //         mo_ta: form.get("mo_ta"),
// // // //         an_hien: form.get("an_hien") === "true",
// // // //         tag: form.get("tag"),
// // // //         phong_cach: form.get("phong_cach"),
// // // //         trang_thai: form.get("trang_thai"),
// // // //         id_danh_muc: Number(form.get("id_danh_muc")),
// // // //         hinh: hinhChinhUrl,
// // // //       },
// // // //       { where: { id } }
// // // //     );

// // // //     // ====== XÓA HÌNH PHỤ CŨ ======
// // // //     await HinhModel.destroy({ where: { id_san_pham: id } });

// // // //     // ====== THÊM HÌNH PHỤ MỚI ======
// // // //     const hinhPhuFiles = form.getAll("hinh_phu") as File[];

// // // //     for (let i = 0; i < hinhPhuFiles.length; i++) {
// // // //       const file = hinhPhuFiles[i];
// // // //       const url = await uploadToCloudinary(file);

// // // //       await HinhModel.create({
// // // //         hinh: url,
// // // //         thu_tu: i + 1,
// // // //         id_san_pham: id,
// // // //       });
// // // //     }

// // // //     // ====== XÓA BIẾN THỂ CŨ ======
// // // //     await BienTheModel.destroy({ where: { id_san_pham: id } });

// // // //     // ====== THÊM BIẾN THỂ MỚI ======
// // // //     const bienThe = JSON.parse(form.get("bien_the") as string) as {
// // // //       ten: string;
// // // //       trang_thai: number;
// // // //       gia_them: number | null;
// // // //     }[];

// // // //     for (const bt of bienThe) {
// // // //       await BienTheModel.create({
// // // //         ten: bt.ten,
// // // //         gia_them: bt.gia_them,
// // // //         trang_thai: bt.trang_thai,
// // // //         id_san_pham: id,
// // // //       });
// // // //     }

// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       message: "Cập nhật sản phẩm thành công",
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("❌ Lỗi PUT:", error);
// // // //     return NextResponse.json(
// // // //       { success: false, message: "Không cập nhật được sản phẩm" },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }
// // // import { NextResponse } from "next/server";
// // // import { v2 as cloudinary } from "cloudinary";
// // // import {
// // //   SanPhamModel,
// // //   DanhMucModel,
// // //   BienTheModel,
// // //   HinhModel,
// // // } from "@/app/lib/models";

// // // cloudinary.config({
// // //   cloud_name: process.env.CLOUDINARY_CLOUD!,
// // //   api_key: process.env.CLOUDINARY_KEY!,
// // //   api_secret: process.env.CLOUDINARY_SECRET!,
// // // });

// // // // Upload file lên Cloudinary
// // // async function uploadToCloudinary(file: File): Promise<string> {
// // //   const buffer = Buffer.from(await file.arrayBuffer());
// // //   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

// // //   const uploaded = await cloudinary.uploader.upload(base64, {
// // //     folder: "san_pham",
// // //   });

// // //   return uploaded.secure_url;
// // // }

// // // export async function GET(
// // //   req: Request,
// // //   { params }: { params: { id: string } }
// // // ) {
// // //   try {
// // //     const id = Number(params.id);

// // //     const sanPhamDb = await SanPhamModel.findOne({
// // //       where: { id },
// // //       include: [
// // //         { model: DanhMucModel, as: "danh_muc" },
// // //         { model: HinhModel, as: "hinh_anh" },
// // //         { model: BienTheModel, as: "bien_the" },
// // //       ],
// // //     });

// // //     if (!sanPhamDb) {
// // //       return NextResponse.json(
// // //         { success: false, message: "Không tìm thấy sản phẩm" },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       data: sanPhamDb.toJSON(),
// // //     });
// // //   } catch (error) {
// // //     console.error("❌ GET lỗi:", error);
// // //     return NextResponse.json(
// // //       { success: false, message: "Lỗi server" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // export async function PUT(req: Request, { params }: { params: { id: string } }) {
// // //   try {
// // //     const id = Number(params.id);
// // //     const form = await req.formData();

// // //     // ==== HÌNH CHÍNH ====
// // //     let hinhChinhUrl = form.get("hinh") as string | null;

// // //     const hinhChinhFile = form.get("hinh_file") as File | null;
// // //     if (hinhChinhFile) {
// // //       hinhChinhUrl = await uploadToCloudinary(hinhChinhFile);
// // //     }

// // //     // ==== UPDATE SẢN PHẨM ====
// // //     await SanPhamModel.update(
// // //       {
// // //         ten: form.get("ten"),
// // //         slug: form.get("slug"),
// // //         gia_goc: Number(form.get("gia_goc")),
// // //         mo_ta: form.get("mo_ta"),
// // //         an_hien: form.get("an_hien") === "true",
// // //         tag: form.get("tag"),
// // //         phong_cach: form.get("phong_cach"),
// // //         trang_thai: form.get("trang_thai"),
// // //         id_danh_muc: Number(form.get("id_danh_muc")),
// // //         hinh: hinhChinhUrl,
// // //       },
// // //       { where: { id } }
// // //     );

// // //     // ==== HÌNH PHỤ ====
// // //     await HinhModel.destroy({ where: { id_san_pham: id } });

// // //     const hinhPhuFiles = form.getAll("hinh_phu") as File[];

// // //     for (let i = 0; i < hinhPhuFiles.length; i++) {
// // //       const file = hinhPhuFiles[i];
// // //       const url = await uploadToCloudinary(file);

// // //       await HinhModel.create({
// // //         hinh: url,
// // //         thu_tu: i + 1,
// // //         id_san_pham: id,
// // //       });
// // //     }

// // //     // ==== BIẾN THỂ ====
// // //     await BienTheModel.destroy({ where: { id_san_pham: id } });

// // //     const bienTheList = JSON.parse(form.get("bien_the") as string) as {
// // //       ten: string;
// // //       trang_thai: boolean;
// // //       gia_them?: number | null;
// // //     }[];

// // //     for (const bt of bienTheList) {
// // //       await BienTheModel.create({
// // //         ten: bt.ten,
// // //         trang_thai: bt.trang_thai,
// // //         gia_them: bt.gia_them ?? null,
// // //         id_san_pham: id,
// // //       });
// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       message: "Cập nhật sản phẩm thành công",
// // //     });
// // //   } catch (error) {
// // //     console.error("❌ PUT lỗi:", error);
// // //     return NextResponse.json(
// // //       { success: false, message: "Không cập nhật được sản phẩm" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // import { NextResponse } from "next/server";
// // import { v2 as cloudinary } from "cloudinary";
// // import "dotenv/config"; // ⬅ FIX bắt buộc để ENV hoạt động trong Route

// // import {
// //   SanPhamModel,
// //   DanhMucModel,
// //   BienTheModel,
// //   HinhModel,
// // } from "@/app/lib/models";

// // // =======================
// // // KIỂM TRA ENV BẮT BUỘC (FIX Unknown API key)
// // // =======================
// // if (
// //   !process.env.CLOUDINARY_CLOUD ||
// //   !process.env.CLOUDINARY_KEY ||
// //   !process.env.CLOUDINARY_SECRET
// // ) {
// //   console.error("❌ Lỗi ENV Cloudinary: Thiếu CLOUDINARY_* trong .env.local");
// // }

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD,
// //   api_key: process.env.CLOUDINARY_KEY,
// //   api_secret: process.env.CLOUDINARY_SECRET,
// // });

// // // =======================
// // // Hàm upload base64 lên Cloudinary
// // // =======================
// // async function uploadToCloudinary(file: File): Promise<string> {
// //   const buffer = Buffer.from(await file.arrayBuffer());
// //   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

// //   const uploaded = await cloudinary.uploader.upload(base64, {
// //     folder: "san_pham",
// //   });

// //   return uploaded.secure_url;
// // }

// // // =======================
// // // GET SẢN PHẨM
// // // =======================
// // export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
// //   try {
// //     const { id } = await params; // ⬅ FIX Next.js 15
// //     const productId = Number(id);

// //     const sanPhamDb = await SanPhamModel.findOne({
// //       where: { id: productId },
// //       include: [
// //         { model: DanhMucModel, as: "danh_muc" },
// //         { model: HinhModel, as: "hinh_anh" },
// //         { model: BienTheModel, as: "bien_the" },
// //       ],
// //     });

// //     if (!sanPhamDb) {
// //       return NextResponse.json(
// //         { success: false, message: "Không tìm thấy sản phẩm" },
// //         { status: 404 }
// //       );
// //     }

// //     return NextResponse.json({ success: true, data: sanPhamDb.toJSON() });
// //   } catch (error) {
// //     console.error("❌ GET lỗi:", error);
// //     return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
// //   }
// // }

// // // =======================
// // // PUT UPDATE SẢN PHẨM
// // // =======================
// // export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
// //   try {
// //     const { id } = await params; // ⬅ FIX Next.js 15
// //     const productId = Number(id);

// //     const form = await req.formData();

// //     // 🔹 HÌNH CHÍNH
// //     let hinhChinhUrl = form.get("hinh") as string | null;

// //     const hinhChinhFile = form.get("hinh_file") as File | null;
// //     if (hinhChinhFile && hinhChinhFile.size > 0) {
// //       hinhChinhUrl = await uploadToCloudinary(hinhChinhFile);
// //     }

// //     // 🔹 UPDATE SẢN PHẨM
// //     await SanPhamModel.update(
// //       {
// //         ten: form.get("ten"),
// //         slug: form.get("slug"),
// //         gia_goc: Number(form.get("gia_goc")),
// //         mo_ta: form.get("mo_ta"),
// //         an_hien: form.get("an_hien") === "true",
// //         tag: form.get("tag"),
// //         phong_cach: form.get("phong_cach"),
// //         trang_thai: form.get("trang_thai"),
// //         id_danh_muc: Number(form.get("id_danh_muc")),
// //         hinh: hinhChinhUrl,
// //       },
// //       { where: { id: productId } }
// //     );

// //     // 🔹 HÌNH PHỤ
// //     await HinhModel.destroy({ where: { id_san_pham: productId } });

// //     const hinhPhuFiles = form.getAll("hinh_phu") as File[];

// //     for (let i = 0; i < hinhPhuFiles.length; i++) {
// //       const file = hinhPhuFiles[i];

// //       if (file && file.size > 0) {
// //         const url = await uploadToCloudinary(file);

// //         await HinhModel.create({
// //           hinh: url,
// //           thu_tu: i + 1,
// //           id_san_pham: productId,
// //         });
// //       }
// //     }

// //     // 🔹 BIẾN THỂ
// //     await BienTheModel.destroy({ where: { id_san_pham: productId } });

// //     const bienTheList = JSON.parse(form.get("bien_the") as string);

// //     for (const bt of bienTheList) {
// //       await BienTheModel.create({
// //         ten: bt.ten,
// //         trang_thai: bt.trang_thai,
// //         gia_them: bt.gia_them ?? null,
// //         id_san_pham: productId,
// //       });
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       message: "Cập nhật sản phẩm thành công",
// //     });
// //   } catch (error) {
// //     console.error("❌ PUT lỗi:", error);
// //     return NextResponse.json(
// //       { success: false, message: String(error) },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import "dotenv/config";

// import {
//   SanPhamModel,
//   DanhMucModel,
//   BienTheModel,
//   HinhModel,
// } from "@/app/lib/models";

// if (
//   !process.env.CLOUDINARY_CLOUD ||
//   !process.env.CLOUDINARY_KEY ||
//   !process.env.CLOUDINARY_SECRET
// ) {
//   console.error("❌ Thiếu Cloudinary ENV");
// }

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
// });

// // ===================================
// // Hàm upload file → Cloudinary
// // ===================================
// async function uploadCloud(file: File): Promise<string> {
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

//   const uploaded = await cloudinary.uploader.upload(base64, {
//     folder: "san_pham",
//   });

//   return uploaded.secure_url;
// }

// // ===================================
// // GET — Lấy chi tiết sản phẩm
// // ===================================
// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;

//     const sp = await SanPhamModel.findOne({
//       where: { id },
//       include: [
//         { model: DanhMucModel, as: "danh_muc" },
//         { model: HinhModel, as: "hinh_anh" },
//         { model: BienTheModel, as: "bien_the" },
//       ],
//     });

//     if (!sp) {
//       return NextResponse.json(
//         { success: false, message: "Không tìm thấy sản phẩm" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: sp });
//   } catch (err) {
//     console.error("GET ERROR:", err);
//     return NextResponse.json(
//       { success: false, message: "Lỗi server" },
//       { status: 500 }
//     );
//   }
// }

// // ===================================
// // PUT — Update sản phẩm
// // ===================================
// export async function PUT(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const productId = Number(id);

//     const form = await req.formData();

//     // ------------------ Hình chính ------------------
//     let hinhChinh = form.get("hinh") as string | null;
//     const fileChinh = form.get("hinh_file") as File | null;

//     if (fileChinh && fileChinh.size > 0) {
//       hinhChinh = await uploadCloud(fileChinh);
//     }

//     // ------------------ Update sản phẩm ------------------
//     await SanPhamModel.update(
//       {
//         ten: form.get("ten"),
//         slug: form.get("slug"),
//         gia_goc: Number(form.get("gia_goc")),
//         mo_ta: form.get("mo_ta"),
//         phong_cach: form.get("phong_cach"),
//         tag: form.get("tag"),
//         id_danh_muc: Number(form.get("id_danh_muc")),
//         hinh: hinhChinh,
//       },
//       { where: { id: productId } }
//     );

//     // ------------------ Hình phụ ------------------
//     await HinhModel.destroy({ where: { id_san_pham: productId } });

//     const listHinh = form.getAll("hinh_phu") as File[];

//     for (let i = 0; i < listHinh.length; i++) {
//       const f = listHinh[i];
//       if (f && f.size > 0) {
//         const url = await uploadCloud(f);
//         await HinhModel.create({
//           hinh: url,
//           thu_tu: i + 1,
//           id_san_pham: productId,
//         });
//       }
//     }

//     // ------------------ Biến thể ------------------
//     await BienTheModel.destroy({ where: { id_san_pham: productId } });

//     const bienTheList = JSON.parse(form.get("bien_the") as string);

//     for (const bt of bienTheList) {
//       await BienTheModel.create({
//         ten: bt.ten,
//         trang_thai: bt.trang_thai,
//         gia_them: bt.gia_them ?? null,
//         id_san_pham: productId,
//       });
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Cập nhật thành công",
//     });
//   } catch (err) {
//     console.error("PUT ERROR:", err);
//     return NextResponse.json(
//       { success: false, message: String(err) },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";


import {
  SanPhamModel,
  DanhMucModel,
  BienTheModel,
  HinhModel,
} from "@/app/lib/models";

// =======================================
// 🔧 Cloudinary Config (ĐÃ SỬA ENV)
// =======================================


console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD,
  key: process.env.CLOUDINARY_KEY,
  secret: process.env.CLOUDINARY_SECRET,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD!,
  api_key: process.env.CLOUDINARY_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET!,
});

// =======================================
// 📤 Hàm upload file → Cloudinary
// =======================================
async function uploadCloud(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  try {
    const uploaded = await cloudinary.uploader.upload(base64, {
      folder: "san_pham",
    });
    return uploaded.secure_url;
  } catch (err: any) {
    console.error("❌ Upload Cloudinary lỗi:", err);
    throw new Error("Cloudinary upload failed");
  }
}

// =======================================
// 📌 GET — Lấy chi tiết sản phẩm
// =======================================
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);

    const sp = await SanPhamModel.findOne({
      where: { id },
      include: [
        { model: DanhMucModel, as: "danh_muc" },
        { model: HinhModel, as: "hinh_anh" },
        { model: BienTheModel, as: "bien_the" },
      ],
    });

    if (!sp) {
      return NextResponse.json(
        { success: false, message: "Sản phẩm không tồn tại" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: sp });
  } catch (err) {
    console.error("GET ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}

// =======================================
// ✏️ PUT — Cập nhật sản phẩm
// =======================================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = Number(params.id);
    const form = await req.formData();

    // =============================
    // 1️⃣ Xử lý hình chính
    // =============================
    let hinhChinh = form.get("hinh") as string | null;
    const fileChinh = form.get("hinh_file") as File | null;

    if (fileChinh && fileChinh.size > 0) {
      hinhChinh = await uploadCloud(fileChinh);
    }

    // =============================
    // 2️⃣ Update bảng sản phẩm
    // =============================
    await SanPhamModel.update(
      {
        ten: form.get("ten"),
        slug: form.get("slug"),
        gia_goc: Number(form.get("gia_goc")),
        mo_ta: form.get("mo_ta"),
        phong_cach: form.get("phong_cach"),
        tag: form.get("tag"),
        id_danh_muc: Number(form.get("id_danh_muc")),
        hinh: hinhChinh,
      },
      { where: { id: productId } }
    );

    // =============================
    // 3️⃣ Xử lý hình phụ
    // =============================
    await HinhModel.destroy({ where: { id_san_pham: productId } });

    const listHinh = form.getAll("hinh_phu") as File[];

    for (let i = 0; i < listHinh.length; i++) {
      const f = listHinh[i];
      if (f && f.size > 0) {
        const url = await uploadCloud(f);
        await HinhModel.create({
          hinh: url,
          thu_tu: i + 1,
          id_san_pham: productId,
        });
      }
    }

    // =============================
    // 4️⃣ Xử lý biến thể
    // =============================
    await BienTheModel.destroy({ where: { id_san_pham: productId } });

    const bienTheList = JSON.parse(form.get("bien_the") as string);

    for (const bt of bienTheList) {
      await BienTheModel.create({
        ten: bt.ten,
        trang_thai: bt.trang_thai,
        gia_them: bt.gia_them ?? null,
        id_san_pham: productId,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
    });
  } catch (err: any) {
    console.error("PUT ERROR:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Lỗi cập nhật" },
      { status: 500 }
    );
  }
}
