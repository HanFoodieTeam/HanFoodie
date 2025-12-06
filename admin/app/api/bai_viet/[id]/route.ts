// File: app/api/bai_viet/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BaiVietModel } from "@/app/lib/models";
import { IBaiViet } from "@/app/lib/cautrucdata";
import fs from "fs";
import path from "path";

// ===== Kiểu dữ liệu lấy từ DB =====
type RawBaiViet = Omit<IBaiViet, "an_hien" | "ngay_dang"> & {
  an_hien: number | boolean | null;
  ngay_dang: string | Date | null;
};

// ===== Body PUT từ FormData =====
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

// ===== Body PATCH =====
interface PatchBaiVietBody {
  an_hien: boolean;
}

// ===== Lưu file upload =====
async function saveUploadedFile(file: File): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public/uploads/bai_viet");

  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const ext = path.extname(file.name);
  const filename = `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}${ext}`;
  const filepath = path.join(uploadsDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filepath, buffer);

  return `/uploads/bai_viet/${filename}`;
}

// ===== Format dữ liệu về IBaiViet =====
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
    ngay_dang: raw.ngay_dang
      ? new Date(raw.ngay_dang).toISOString()
      : null,
  };
}

// ====================== GET ===========================
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({
        success: false,
        message: "ID không hợp lệ",
      });
    }

    const bv = await BaiVietModel.findByPk(numericId);
    if (!bv) {
      return NextResponse.json({
        success: false,
        message: "Không tìm thấy bài viết",
      });
    }

    const formatted = formatBaiViet(bv.toJSON() as RawBaiViet);

    return NextResponse.json({
      success: true,
      data: formatted,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}

// ====================== PUT ===========================
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json({
        success: false,
        message: "ID không hợp lệ",
      });
    }

    const form = await req.formData();

    const tieu_de = form.get("tieu_de") as string | null;
    const noi_dung = form.get("noi_dung") as string | null;
    const id_loai_bv_raw = form.get("id_loai_bv") as string | null;

    if (!tieu_de || !noi_dung || !id_loai_bv_raw) {
      return NextResponse.json(
        { success: false, message: "Thiếu dữ liệu bắt buộc" },
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
      an_hien: form.get("an_hien") === "true",
    };

    const file = form.get("hinh") as File | null;

    const bv = await BaiVietModel.findByPk(numericId);
    if (!bv) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    // ========== Upload file ==========
    let finalImage = bv.getDataValue("hinh") as string | null;

    if (file && file.size > 0) {
      finalImage = await saveUploadedFile(file);
    }

    await bv.update({
      ...fields,
      hinh: finalImage,
      an_hien: fields.an_hien ? 1 : 0,
    });

    const formatted = formatBaiViet(bv.toJSON() as RawBaiViet);

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

// ====================== PATCH ===========================
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
      return NextResponse.json({
        success: false,
        message: "ID không hợp lệ",
      });
    }

    const body = (await req.json()) as PatchBaiVietBody;

    if (typeof body.an_hien !== "boolean") {
      return NextResponse.json(
        { success: false, message: "an_hien phải là boolean" },
        { status: 400 }
      );
    }

    const bv = await BaiVietModel.findByPk(numericId);
    if (!bv) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    await bv.update({ an_hien: body.an_hien ? 1 : 0 });

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
