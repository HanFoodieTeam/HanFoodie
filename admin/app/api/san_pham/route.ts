
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {
  SanPhamModel,
  DanhMucModel,
  HinhModel,
  BienTheModel,
} from "@/app/lib/models";
import { ISanPham } from "@/app/lib/cautrucdata";

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





cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Lấy file hình chính
    const file = form.get("hinh") as File | null;
    if (!file) {
      return NextResponse.json(
        { success: false, message: "Bạn chưa chọn hình chính" },
        { status: 400 }
      );
    }

    // Convert Buffer -> Base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload lên Cloudinary
    const upload = await cloudinary.uploader.upload(base64, {
      folder: "san_pham",
    });

    const imageUrl = upload.secure_url;

    // Parse biến thể
    const bienTheJson = form.get("bien_the")?.toString() || "[]";
    const bienTheArr: any[] = JSON.parse(bienTheJson);

    // Tạo sản phẩm
//    const sanPham = await SanPhamModel.create({
//   ten: form.get("ten")?.toString() || "",
//   slug: form.get("slug")?.toString() || "",
//   gia_goc: Number(form.get("gia_goc") || 0),
//   mo_ta: form.get("mo_ta")?.toString() || "",
//   an_hien: form.get("an_hien") === "true",
//   tag: form.get("tag")?.toString() || "",
//   phong_cach: form.get("phong_cach")?.toString() || "",
//   trang_thai: form.get("trang_thai")?.toString() || "",
//   id_danh_muc: Number(form.get("id_danh_muc") || 0),
//   luot_xem: 0,
// }) as unknown as ISanPham;


//     // Lưu hình chính vào bảng hình
//     await HinhModel.create({
//       id_san_pham: sanPham.id,
//       hinh: imageUrl,
//       la_chinh: true,
//     });
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
  luot_xem: 0,
  hinh: imageUrl, // ⬅️ Lưu vào bảng sản phẩm luôn
}) as unknown as ISanPham;

// Lưu hình chính vào bảng hình
await HinhModel.create({
  id_san_pham: sanPham.id,
  hinh: imageUrl,
  la_chinh: true,
});


    // Tạo biến thể nếu có
    if (Array.isArray(bienTheArr) && bienTheArr.length > 0) {
      const bienTheData = bienTheArr.map((item) => ({
        id_san_pham: sanPham.id,
        ten: item.ten || "",
        gia: item.gia || 0,
        so_luong: item.so_luong || 0,
      }));

      await BienTheModel.bulkCreate(bienTheData);
    }

    return NextResponse.json({
      success: true,
      message: "Thêm sản phẩm thành công",
      data: sanPham,
    });
  } catch (err) {
    console.error("❌ POST lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}
