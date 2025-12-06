
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {
  SanPhamModel,
  DanhMucModel,
  HinhModel,
} from "@/app/lib/models";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function GET() {
  try {
    const list = await SanPhamModel.findAll({
      include: [
        { model: DanhMucModel, as: "danh_muc" },
        { model: HinhModel, as: "hinh_anh" },
      ],
      order: [["id", "DESC"]],
    });

    return NextResponse.json({
      success: true,
      data: list,
    });
  } catch (error) {
    console.error("❌ GET lỗi:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}




export async function POST(req: Request) {
  console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

  try {
    const form = await req.formData();

    // Lấy file từ form
    const file = form.get("hinh") as File | null;
    if (!file) {
      return NextResponse.json(
        { success: false, message: "Bạn chưa chọn hình chính" },
        { status: 410 }
      );
    }

    // 🔹 Convert File -> Base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // 🔹 Upload thẳng lên Cloudinary
    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "san_pham",
    });

    const hinhUrl = uploadResult.secure_url;

    // 🔹 Lấy các trường khác
    const bienTheRaw = form.get("bien_the")?.toString() || "[]";
    const bienThe = JSON.parse(bienTheRaw);

    const sanPham = await SanPhamModel.create({
      ten: form.get("ten")?.toString() || "",
      slug: form.get("slug")?.toString() || "",
      gia_goc: Number(form.get("gia_goc") || 0),
      mo_ta: form.get("mo_ta")?.toString() || "",
      an_hien: form.get("an_hien") === "true",
      tag: form.get("tag")?.toString() || "",
      phong_cach: form.get("phong_cach")?.toString() || "",
      trang_thai: form.get("trang_thai")?.toString() || "",
      id_danh_muc: Number(form.get("id_danh_muc") || 0),
      hinh: hinhUrl, // ✅ URL Cloudinary
      luot_xem: 0,
    });

    return NextResponse.json({ success: true, data: sanPham, bien_the: bienThe });
  } catch (err) {
    console.error("POST lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
