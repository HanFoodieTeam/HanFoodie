// File: app/api/loai_tuy_chon/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { LoaiTuyChonModel } from "@/lib/models";
import { ILoaiTuyChon } from "@/lib/cautrucdata";

// ====================== Kiểu raw lấy từ DB ======================
// Không extends ILoaiTuyChon nữa, tránh lỗi TypeScript
interface RawLoaiTuyChon {
  id: number;
  ten: string;
  thu_tu: number;
  an_hien: number | boolean | null; // match DB, null cũng được
}

// ====================== Body PATCH ======================
interface PatchLoaiTuyChonBody {
  an_hien: boolean;
}

// ====================== Format dữ liệu ======================
function formatLoaiTuyChon(raw: RawLoaiTuyChon): ILoaiTuyChon {
  return {
    id: raw.id,
    ten: raw.ten,
    thu_tu: raw.thu_tu,
    an_hien: Boolean(raw.an_hien), // convert sang boolean
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

    return NextResponse.json({
      success: true,
      data: formatLoaiTuyChon(item.toJSON() as RawLoaiTuyChon),
    });
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

    const body = await req.json();

    if (typeof body.ten !== "string")
      return NextResponse.json(
        { success: false, message: "Tên loại tùy chọn là bắt buộc" },
        { status: 400 }
      );

    await item.update({
      ten: body.ten,
      thu_tu: typeof body.thu_tu === "number" ? body.thu_tu : item.getDataValue("thu_tu"),
      an_hien: typeof body.an_hien === "boolean" ? (body.an_hien ? 1 : 0) : item.getDataValue("an_hien"),
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật thành công",
      data: formatLoaiTuyChon(item.toJSON() as RawLoaiTuyChon),
    });
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

    const body = (await req.json()) as PatchLoaiTuyChonBody;

    if (typeof body.an_hien !== "boolean")
      return NextResponse.json(
        { success: false, message: "an_hien phải là boolean" },
        { status: 400 }
      );

    const item = await LoaiTuyChonModel.findByPk(numericId);
    if (!item)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy loại tùy chọn" },
        { status: 404 }
      );

    await item.update({ an_hien: body.an_hien ? 1 : 0 });

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: { id: numericId, an_hien: body.an_hien },
    });
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

    return NextResponse.json({
      success: true,
      message: "Xóa loại tùy chọn thành công",
    });
  } catch (err) {
    console.error("DELETE loai_tuy_chon lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
