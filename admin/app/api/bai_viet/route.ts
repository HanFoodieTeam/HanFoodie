// File: app/api/bai_viet/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";
import { BaiVietModel } from "@/lib/models";
import { IBaiViet } from "@/lib/cautrucdata";
import cloudinaryPkg from "cloudinary";

// ===== Cloudinary Config =====
const cloudinary = cloudinaryPkg.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/* -------------------------------------------------------------------------- */
/*                                 GET METHOD                                 */
/* -------------------------------------------------------------------------- */

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);

    const page: number = Number(url.searchParams.get("page") ?? "1");
    const limit: number = Number(url.searchParams.get("limit") ?? "6");
    const offset: number = (page - 1) * limit;

    const search: string = url.searchParams.get("search") ?? "";
    const an_hien_raw: string = url.searchParams.get("an_hien") ?? "";

    const where: WhereOptions = {};

    if (search.length > 0) {
      where["tieu_de"] = { [Op.like]: `%${search}%` };
    }

    if (an_hien_raw === "0" || an_hien_raw === "1") {
      where["an_hien"] = Number(an_hien_raw);
    }

    // Get + Count
    const result = await BaiVietModel.findAndCountAll({
      where,
      order: [["ngay_dang", "DESC"]],
      limit,
      offset,
    });

    // Map sang IBaiViet
    const data: IBaiViet[] = result.rows.map((row) => {
      const raw = row.toJSON() as IBaiViet;

      return {
        ...raw,
        an_hien: Boolean(raw.an_hien),
        ngay_dang: raw.ngay_dang
          ? new Date(raw.ngay_dang).toISOString()
          : null,
      };
    });

    return NextResponse.json({
      success: true,
      data,
      totalItems: result.count,
      totalPages: Math.ceil(result.count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error("Lỗi GET danh sách bài viết:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy danh sách bài viết" },
      { status: 500 }
    );
  }
}

/* -------------------------------------------------------------------------- */
/*                                 POST METHOD                                */
/* -------------------------------------------------------------------------- */

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const form: FormData = await req.formData();

    const tieu_de = form.get("tieu_de") as string | null;
    const noi_dung = form.get("noi_dung") as string | null;
    const id_loai_bv_raw = form.get("id_loai_bv") as string | null;
    const slug = form.get("slug") as string | null;
    const an_hien_raw = form.get("an_hien") as string | null;
    const ngay_dang_raw = form.get("ngay_dang") as string | null;
    const file = form.get("hinh") as File | null;

    // Validate
    if (!tieu_de || !noi_dung || !id_loai_bv_raw) {
      return NextResponse.json(
        {
          success: false,
          message: "Thiếu tiêu đề, nội dung hoặc loại bài viết",
        },
        { status: 400 }
      );
    }

    // Convert kiểu
    const id_loai_bv: number = Number(id_loai_bv_raw);
    const an_hien: boolean = an_hien_raw === "1";
    const ngay_dang: Date = ngay_dang_raw
      ? new Date(`${ngay_dang_raw}T00:00:00`)
      : new Date();

    // Upload ảnh
    let hinhUrl: string | null = null;

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResult = await cloudinary.uploader.upload(base64, {
        folder: "bai_viet",
      });

      hinhUrl = uploadResult.secure_url;
    }

    // Lưu DB
    const newItem = await BaiVietModel.create({
      tieu_de,
      noi_dung,
      id_loai_bv,
      slug: slug ?? "",
      ngay_dang,
      an_hien: an_hien ? 1 : 0,
      hinh: hinhUrl,
      luot_xem: 0,
    });

    // Convert sang IBaiViet
    const saved: IBaiViet = {
      id: newItem.getDataValue("id"),
      tieu_de,
      noi_dung,
      id_loai_bv,
      slug: slug ?? "",
      hinh: hinhUrl,
      luot_xem: 0,
      ngay_dang:
        newItem.getDataValue("ngay_dang") instanceof Date
          ? newItem.getDataValue("ngay_dang").toISOString()
          : String(newItem.getDataValue("ngay_dang")),
      an_hien,
    };

    return NextResponse.json({
      success: true,
      message: "Thêm bài viết thành công",
      data: saved,
    });
  } catch (err) {
    console.error("Lỗi POST bài viết:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi thêm bài viết" },
      { status: 500 }
    );
  }
}
