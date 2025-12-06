// File: app/api/danh_muc/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { DanhMucModel } from "@/app/lib/models";
import { IDanhMuc } from "@/app/lib/cautrucdata";
import fs from "fs";
import path from "path";

// ====================== Kiểu dữ liệu raw từ DB ======================
interface RawDanhMuc extends Omit<IDanhMuc, "an_hien"> {
  an_hien: number | boolean | null;
}

// ====================== Body PUT ======================
interface UpdateDanhMucFields {
  ten: string;
  slug?: string;
  thu_tu?: number;
  so_san_pham?: number;
  an_hien: boolean;
  hinh?: string | null;
}

// ====================== Body PATCH ======================
interface PatchDanhMucBody {
  an_hien: boolean;
}

// ====================== Lưu file upload ======================
async function saveUploadedFile(file: File): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public/uploads/danh_muc");

  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const ext = path.extname(file.name);
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const filepath = path.join(uploadsDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filepath, buffer);

  return `/uploads/danh_muc/${filename}`;
}

// ====================== Format dữ liệu ======================
function formatDanhMuc(raw: RawDanhMuc): IDanhMuc {
  return {
    id: raw.id,
    ten: raw.ten,
    slug: raw.slug,
    hinh: raw.hinh,
    thu_tu: raw.thu_tu,
    so_san_pham: raw.so_san_pham,
    an_hien: Boolean(raw.an_hien),
  };
}

// ====================== GET ======================
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId)) return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const dm = await DanhMucModel.findByPk(numericId);
    if (!dm) return NextResponse.json({ success: false, message: "Không tìm thấy danh mục" }, { status: 404 });

    return NextResponse.json({ success: true, data: formatDanhMuc(dm.toJSON() as RawDanhMuc) });
  } catch (err) {
    console.error("GET danh_muc lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ====================== PUT ======================
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId)) return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const dm = await DanhMucModel.findByPk(numericId);
    if (!dm) return NextResponse.json({ success: false, message: "Không tìm thấy danh mục" }, { status: 404 });

    const form = await req.formData();

    const ten = form.get("ten");
    if (typeof ten !== "string") return NextResponse.json({ success: false, message: "Thiếu tên danh mục" }, { status: 400 });

    const fields: UpdateDanhMucFields = {
      ten,
      slug: typeof form.get("slug") === "string" ? String(form.get("slug")) : undefined,
      thu_tu: typeof form.get("thu_tu") === "string" ? Number(form.get("thu_tu")) : undefined,
      so_san_pham: typeof form.get("so_san_pham") === "string" ? Number(form.get("so_san_pham")) : undefined,
      an_hien: form.get("an_hien") === "true",
    };

    const file = form.get("hinh");
    let finalImage = dm.getDataValue("hinh") as string | null;

    if (file instanceof File && file.size > 0) {
      finalImage = await saveUploadedFile(file);
    }

    await dm.update({ ...fields, hinh: finalImage, an_hien: fields.an_hien ? 1 : 0 });

    return NextResponse.json({ success: true, message: "Cập nhật thành công", data: formatDanhMuc(dm.toJSON() as RawDanhMuc) });
  } catch (err) {
    console.error("PUT danh_muc lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ====================== PATCH ======================
export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId)) return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const body = (await req.json()) as PatchDanhMucBody;
    if (typeof body.an_hien !== "boolean") return NextResponse.json({ success: false, message: "an_hien phải là boolean" }, { status: 400 });

    const dm = await DanhMucModel.findByPk(numericId);
    if (!dm) return NextResponse.json({ success: false, message: "Không tìm thấy danh mục" }, { status: 404 });

    await dm.update({ an_hien: body.an_hien ? 1 : 0 });

    return NextResponse.json({ success: true, message: "Cập nhật trạng thái thành công", data: { id: numericId, an_hien: body.an_hien } });
  } catch (err) {
    console.error("PATCH danh_muc lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ====================== DELETE ======================
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId)) return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const dm = await DanhMucModel.findByPk(numericId);
    if (!dm) return NextResponse.json({ success: false, message: "Không tìm thấy danh mục" }, { status: 404 });

    await dm.destroy();

    return NextResponse.json({ success: true, message: "Xóa danh mục thành công" });
  } catch (err) {
    console.error("DELETE danh_muc lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
