import { NextRequest, NextResponse } from "next/server";
import { LoaiBaiVietModel } from "@/app/lib/models";
import { ILoaiBaiViet } from "@/app/lib/cautrucdata";

interface RawLoaiBaiViet extends Omit<ILoaiBaiViet, "an_hien"> {
  an_hien: number | boolean | null;
}

interface PatchLoaiBaiVietBody {
  an_hien: boolean;
}

interface UpdateLoaiBaiVietBody {
  ten_loai: string;
  slug?: string;
  thu_tu?: number;
  an_hien: boolean;
}

// Format dữ liệu
function formatLoaiBaiViet(raw: RawLoaiBaiViet): ILoaiBaiViet {
  return {
    id: raw.id,
    ten_loai: raw.ten_loai,
    slug: raw.slug,
    thu_tu: raw.thu_tu,
    an_hien: Boolean(raw.an_hien),
  };
}

// GET
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId)) return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const item = await LoaiBaiVietModel.findByPk(numericId);
    if (!item) return NextResponse.json({ success: false, message: "Không tìm thấy loại bài viết" }, { status: 404 });

    return NextResponse.json({ success: true, data: formatLoaiBaiViet(item.toJSON() as RawLoaiBaiViet) });
  } catch (err) {
    console.error("GET loai_bai_viet lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// PUT
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId)) return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const item = await LoaiBaiVietModel.findByPk(numericId);
    if (!item) return NextResponse.json({ success: false, message: "Không tìm thấy loại bài viết" }, { status: 404 });

    const body: UpdateLoaiBaiVietBody = await req.json();
    if (!body.ten_loai?.trim()) return NextResponse.json({ success: false, message: "Tên loại không được để trống" }, { status: 400 });

    await item.update({ ...body, an_hien: body.an_hien ? 1 : 0 });

    return NextResponse.json({ success: true, message: "Cập nhật thành công", data: formatLoaiBaiViet(item.toJSON() as RawLoaiBaiViet) });
  } catch (err) {
    console.error("PUT loai_bai_viet lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// PATCH toggle an_hien
export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId)) return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const body: PatchLoaiBaiVietBody = await req.json();
    if (typeof body.an_hien !== "boolean") return NextResponse.json({ success: false, message: "an_hien phải là boolean" }, { status: 400 });

    const item = await LoaiBaiVietModel.findByPk(numericId);
    if (!item) return NextResponse.json({ success: false, message: "Không tìm thấy loại bài viết" }, { status: 404 });

    await item.update({ an_hien: body.an_hien ? 1 : 0 });

    return NextResponse.json({ success: true, message: "Cập nhật trạng thái thành công", data: { id: numericId, an_hien: body.an_hien } });
  } catch (err) {
    console.error("PATCH loai_bai_viet lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId)) return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const item = await LoaiBaiVietModel.findByPk(numericId);
    if (!item) return NextResponse.json({ success: false, message: "Không tìm thấy loại bài viết" }, { status: 404 });

    await item.destroy();

    return NextResponse.json({ success: true, message: "Xóa loại bài viết thành công" });
  } catch (err) {
    console.error("DELETE loai_bai_viet lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
