
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {
  SanPhamModel,
  DanhMucModel,
  HinhModel,
  BienTheModel,
} from "@/lib/models";
import { ISanPham } from "@/lib/cautrucdata";

// ================================
// CONFIG CLOUDINARY
// ================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ================================
// GET — Lấy danh sách sản phẩm
// ================================
import { Op } from "sequelize";



interface QueryParams {
  search?: string;
  id_danh_muc?: string;
  min_price?: string;
  max_price?: string;
  page?: string;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const query: QueryParams = {
      search: searchParams.get("search") || "",
      id_danh_muc: searchParams.get("id_danh_muc") || "",
      min_price: searchParams.get("min_price") || "",
      max_price: searchParams.get("max_price") || "",
      page: searchParams.get("page") || "1",
    };

    // PHÂN TRANG
    const page = Number(query.page);
    const limit = 10; // mỗi trang 10 sp
    const offset = (page - 1) * limit;

    // LỌC
    const whereClause: Record<string, unknown> = {};

    // Lọc theo search
    if (query.search) {
      whereClause.ten = { [Op.like]: `%${query.search}%` };
    }

    // Lọc theo danh mục
   if (query.id_danh_muc && query.id_danh_muc !== "all") {
  const dm = await DanhMucModel.findOne({
    where: { id: Number(query.id_danh_muc) }
  });

  if (dm) {
    whereClause.id_danh_muc = dm.get("id") as number;
  }
}


    // Lọc theo giá
    if (query.min_price) {
      whereClause.gia_goc = { ...(whereClause.gia_goc as object), [Op.gte]: Number(query.min_price) };
    }

    if (query.max_price) {
      whereClause.gia_goc = { ...(whereClause.gia_goc as object), [Op.lte]: Number(query.max_price) };
    }

    // TOTAL COUNT (không phân trang)
    const totalItems = await SanPhamModel.count({ where: whereClause });

    const totalPages = Math.ceil(totalItems / limit);

    // LẤY DỮ LIỆU CÓ PHÂN TRANG
    const list = await SanPhamModel.findAll({
      where: whereClause,
      include: [
        { model: DanhMucModel, as: "danh_muc" },
        { model: HinhModel, as: "hinh_anh" },
        { model: BienTheModel, as: "bien_the" },
      ],
      order: [["id", "DESC"]],
      limit,
      offset,
    });

    return NextResponse.json({
      success: true,
      data: list,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("GET /api/san_pham Lỗi:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}



// ================================
// POST — Thêm sản phẩm
// ================================
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // ================= HÌNH CHÍNH =================
    const fileRaw = form.get("hinh");
    if (!(fileRaw instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Bạn chưa chọn hình chính" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await fileRaw.arrayBuffer());
    const base64 = `data:${fileRaw.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "san_pham",
    });

    const hinhChinhUrl = uploadResult.secure_url;

    // ================= BIẾN THỂ (KHÔNG ANY) =================
    interface BienTheInput {
      ten: string;
      gia_them: number;
      trang_thai: number;
    }

    let bienTheList: BienTheInput[] = [];
    const bienTheRaw = form.get("bien_the");

    if (typeof bienTheRaw === "string") {
      const parsed: BienTheInput[] = JSON.parse(bienTheRaw);

      bienTheList = parsed.map((bt) => ({
        ten: bt.ten,
        gia_them: Number(bt.gia_them ?? 0),
        trang_thai: Number(bt.trang_thai),
      }));
    }

    // ================= TẠO SẢN PHẨM =================
    const sanPham = await SanPhamModel.create({
      ten: form.get("ten")?.toString() ?? "",
      slug: form.get("slug")?.toString() ?? "",
      gia_goc: Number(form.get("gia_goc") ?? 0),
      mo_ta: form.get("mo_ta")?.toString() ?? "",
      an_hien: form.get("an_hien") === "true",
      tag: form.get("tag")?.toString() ?? "",
      phong_cach: form.get("phong_cach")?.toString() ?? "",
      trang_thai: form.get("trang_thai")?.toString() ?? "active",
      id_danh_muc: Number(form.get("id_danh_muc") ?? 0),
      hinh: hinhChinhUrl,
      luot_xem: 0,
    });

    const sanPhamId = sanPham.getDataValue("id");

    // ================= SAVE BIẾN THỂ =================
    for (const bt of bienTheList) {
      await BienTheModel.create({
        ten: bt.ten,
        gia_them: bt.gia_them,
        trang_thai: bt.trang_thai,
        id_san_pham: sanPhamId,
      });
    }

    // ================= HÌNH PHỤ =================
    const hinhPhu = form.getAll("hinh_phu");

    for (let i = 0; i < hinhPhu.length; i++) {
      const file = hinhPhu[i];
      if (file instanceof File) {
        const buff = Buffer.from(await file.arrayBuffer());
        const base64 = `data:${file.type};base64,${buff.toString("base64")}`;

        const upload = await cloudinary.uploader.upload(base64, {
          folder: "san_pham",
        });

        await HinhModel.create({
          hinh: upload.secure_url,
          thu_tu: i + 1,
          id_san_pham: sanPhamId,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thêm sản phẩm thành công",
      data: sanPham,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Lỗi server",
      },
      { status: 500 }
    );
  }
}
