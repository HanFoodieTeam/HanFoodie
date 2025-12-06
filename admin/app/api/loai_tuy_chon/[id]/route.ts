// File: app/api/loai_tuy_chon/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { LoaiTuyChonModel } from "@/app/lib/models";

// ====================== Kiểu dữ liệu raw từ DB ======================
interface RawLoaiTuyChon {
  id: number;
  ten: string;
  thu_tu: number | null;
  an_hien: number | boolean | null;
}

// ====================== Body PUT ======================
interface UpdateLoaiTuyChonFields {
  ten: string;
  thu_tu?: number;
  an_hien: boolean;
}

// ====================== Body PATCH ======================
interface PatchLoaiTuyChonBody {
  an_hien: boolean;
}

// ====================== Format dữ liệu ======================
function formatLoaiTuyChon(raw: RawLoaiTuyChon) {
  return {
    id: raw.id,
    ten: raw.ten,
    thu_tu: raw.thu_tu ?? 0,
    an_hien: Boolean(raw.an_hien),
  };
}

// ====================== GET ======================
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId))
      return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const item = await LoaiTuyChonModel.findByPk(numericId);
    if (!item)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy loại tùy chọn" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: formatLoaiTuyChon(item.toJSON() as RawLoaiTuyChon) });
  } catch (err) {
    console.error("GET loai_tuy_chon lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ====================== PUT ======================
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId))
      return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const item = await LoaiTuyChonModel.findByPk(numericId);
    if (!item)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy loại tùy chọn" },
        { status: 404 }
      );

    const body = await req.json() as UpdateLoaiTuyChonFields;
    if (!body.ten?.trim())
      return NextResponse.json(
        { success: false, message: "Tên loại không được để trống" },
        { status: 400 }
      );

    await item.update({
      ten: body.ten,
      thu_tu: body.thu_tu ?? 0,
      an_hien: body.an_hien ? 1 : 0,
    });

    return NextResponse.json({ success: true, message: "Cập nhật thành công", data: formatLoaiTuyChon(item.toJSON() as RawLoaiTuyChon) });
  } catch (err) {
    console.error("PUT loai_tuy_chon lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ====================== PATCH ======================
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId))
      return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const body = await req.json() as PatchLoaiTuyChonBody;
    if (typeof body.an_hien !== "boolean")
      return NextResponse.json({ success: false, message: "an_hien phải là boolean" }, { status: 400 });

    const item = await LoaiTuyChonModel.findByPk(numericId);
    if (!item)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy loại tùy chọn" },
        { status: 404 }
      );

    await item.update({ an_hien: body.an_hien ? 1 : 0 });

    return NextResponse.json({ success: true, message: "Cập nhật trạng thái thành công", data: { id: numericId, an_hien: body.an_hien } });
  } catch (err) {
    console.error("PATCH loai_tuy_chon lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ====================== DELETE ======================
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId))
      return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const item = await LoaiTuyChonModel.findByPk(numericId);
    if (!item)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy loại tùy chọn" },
        { status: 404 }
      );

    await item.destroy();

    return NextResponse.json({ success: true, message: "Xóa loại tùy chọn thành công" });
  } catch (err) {
    console.error("DELETE loai_tuy_chon lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
