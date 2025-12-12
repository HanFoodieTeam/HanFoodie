// File: app/api/bai_viet/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
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

// ====================== KIỂU DỮ LIỆU ==============================

// Dữ liệu thô lấy từ DB, trước khi format
type RawBaiViet = Omit<IBaiViet, "an_hien" | "ngay_dang"> & {
  an_hien: number | boolean | null;
  ngay_dang: string | Date | null;
};

// Dữ liệu khi PUT
interface UpdateBaiVietFields {
  tieu_de: string;
  noi_dung: string;
  id_loai_bv: number;
  luot_xem: number;
  slug: string;
  ngay_dang: Date;
  an_hien: boolean;
  hinh?: string | null;
}

// Body PATCH
interface PatchBaiVietBody {
  an_hien: boolean;
}

// Format về IBaiViet chuẩn
function formatBaiViet(raw: RawBaiViet): IBaiViet {
  return {
    id: raw.id,
    tieu_de: raw.tieu_de,
    noi_dung: raw.noi_dung,
    hinh: raw.hinh,
    id_loai_bv: raw.id_loai_bv,
    luot_xem: raw.luot_xem,
    slug: raw.slug,
    an_hien: Boolean(raw.an_hien),
    ngay_dang: raw.ngay_dang ? new Date(raw.ngay_dang).toISOString() : null,
  };
}

// ==============================================================
//                           GET
// ==============================================================
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ success: false, message: "ID không hợp lệ" });
    }

    const item = await BaiVietModel.findByPk(numericId);
    if (!item) {
      return NextResponse.json({
        success: false,
        message: "Không tìm thấy bài viết",
      });
    }

    const formatted = formatBaiViet(item.toJSON() as RawBaiViet);

    return NextResponse.json({ success: true, data: formatted });
  } catch {
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}

// ==============================================================
//                           PUT
// ==============================================================
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ success: false, message: "ID không hợp lệ" });
    }

    const form: FormData = await req.formData();

    const tieu_de = form.get("tieu_de") as string | null;
    const noi_dung = form.get("noi_dung") as string | null;
    const id_loai_bv_raw = form.get("id_loai_bv") as string | null;

    if (!tieu_de || !noi_dung || !id_loai_bv_raw) {
      return NextResponse.json(
        {
          success: false,
          message: "Thiếu dữ liệu bắt buộc",
        },
        { status: 400 }
      );
    }

    const fields: UpdateBaiVietFields = {
      tieu_de,
      noi_dung,
      id_loai_bv: Number(id_loai_bv_raw),
      luot_xem: Number(form.get("luot_xem") ?? 0),
      slug: String(form.get("slug") ?? ""),
      ngay_dang: form.get("ngay_dang")
        ? new Date(String(form.get("ngay_dang")))
        : new Date(),
      an_hien: form.get("an_hien") === "1",
    };

    const file = form.get("hinh") as File | null;

    const existing = await BaiVietModel.findByPk(numericId);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    // Hình hiện tại
    let finalImage: string | null = existing.getDataValue("hinh");

    // Upload
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploaded = await cloudinary.uploader.upload(base64, {
        folder: "bai_viet",
      });

      finalImage = uploaded.secure_url;
    }

    await existing.update({
      ...fields,
      hinh: finalImage,
      an_hien: fields.an_hien ? 1 : 0,
    });

    const formatted = formatBaiViet(existing.toJSON() as RawBaiViet);

    return NextResponse.json({
      success: true,
      message: "Cập nhật thành công",
      data: formatted,
    });
  } catch (err) {
    console.error("PUT ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}

// ==============================================================
//                           PATCH
// ==============================================================
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ success: false, message: "ID không hợp lệ" });
    }

    const body: PatchBaiVietBody = await req.json();

    if (typeof body.an_hien !== "boolean") {
      return NextResponse.json(
        { success: false, message: "an_hien phải là boolean" },
        { status: 400 }
      );
    }

    const existing = await BaiVietModel.findByPk(numericId);
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    await existing.update({ an_hien: body.an_hien ? 1 : 0 });

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: { id: numericId, an_hien: body.an_hien },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}
