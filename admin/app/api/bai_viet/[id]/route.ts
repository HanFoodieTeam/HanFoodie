// File: app/api/bai_viet/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BaiVietModel } from "@/app/lib/models";
import { IBaiViet } from "@/app/lib/cautrucdata";

// ===== Types =====
interface UpdateBaiVietBody {
  tieu_de: string;
  noi_dung: string;
  hinh?: string | null;
  id_loai_bv: number;
  luot_xem?: number;
  slug?: string;
  ngay_dang?: string | Date;
  an_hien?: boolean;
}

interface PatchBaiVietBody {
  an_hien: boolean;
}

// ===== GET /api/bai_viet/[id] =====
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 context.params là Promise
) {
  try {
    const { id } = await context.params; // 👈 await params
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });
    }

    const bv = await BaiVietModel.findByPk(numericId);
    if (!bv) {
      return NextResponse.json({ success: false, message: "Không tìm thấy bài viết" }, { status: 404 });
    }

    const data: IBaiViet = {
      ...bv.toJSON(),
      an_hien: !!bv.getDataValue("an_hien"),
      ngay_dang: bv.getDataValue("ngay_dang") ? new Date(bv.getDataValue("ngay_dang")).toISOString() : null,
    };

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi server";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ===== PUT /api/bai_viet/[id] =====
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });
    }

    const body: UpdateBaiVietBody = await req.json();
    if (!body.tieu_de || !body.noi_dung || !body.id_loai_bv) {
      return NextResponse.json({ success: false, message: "Thiếu dữ liệu bắt buộc" }, { status: 400 });
    }

    const bv = await BaiVietModel.findByPk(numericId);
    if (!bv) {
      return NextResponse.json({ success: false, message: "Không tìm thấy bài viết" }, { status: 404 });
    }

    await bv.update({
      tieu_de: body.tieu_de,
      noi_dung: body.noi_dung,
      hinh: body.hinh || null,
      id_loai_bv: body.id_loai_bv,
      luot_xem: body.luot_xem ?? 0,
      slug: body.slug || "",
      ngay_dang: body.ngay_dang ? new Date(body.ngay_dang) : new Date(),
      an_hien: body.an_hien ? 1 : 0,
    });

    const data: IBaiViet = {
      ...bv.toJSON(),
      an_hien: !!bv.getDataValue("an_hien"),
      ngay_dang: bv.getDataValue("ngay_dang") ? new Date(bv.getDataValue("ngay_dang")).toISOString() : null,
    };

    return NextResponse.json({ success: true, message: "Cập nhật thành công", data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi server";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// ===== PATCH /api/bai_viet/[id] =====
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });
    }

    const body: PatchBaiVietBody = await req.json();
    if (typeof body.an_hien !== "boolean") {
      return NextResponse.json({ success: false, message: "an_hien phải là boolean" }, { status: 400 });
    }

    const bv = await BaiVietModel.findByPk(numericId);
    if (!bv) {
      return NextResponse.json({ success: false, message: "Không tìm thấy bài viết" }, { status: 404 });
    }

    await bv.update({ an_hien: body.an_hien ? 1 : 0 });

    return NextResponse.json({ success: true, message: "Cập nhật trạng thái thành công", data: { id, an_hien: body.an_hien } });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi server";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
