// File: app/api/bai_viet/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BaiVietModel } from "@/app/lib/models";
import { IBaiViet } from "@/app/lib/cautrucdata";

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

// ⚠ RouteContext với params là Promise<{ id: string }>
type RouteContext = { params: Promise<{ id: string }> };

// ===== GET: Lấy chi tiết bài viết =====
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const bvInstance = await BaiVietModel.findByPk(Number(id));

    if (!bvInstance)
      return NextResponse.json({ success: false, message: "Không tìm thấy bài viết" }, { status: 404 });

    const bv = bvInstance.toJSON() as IBaiViet & { an_hien: number | boolean };
    const data: IBaiViet = {
      ...bv,
      an_hien: !!bv.an_hien,
      ngay_dang: bv.ngay_dang ? new Date(bv.ngay_dang).toISOString() : null,
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("🔥 Lỗi GET:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ===== PUT: Cập nhật bài viết =====
export async function PUT(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body: UpdateBaiVietBody = await req.json();

    if (!body.tieu_de || !body.noi_dung || !body.id_loai_bv)
      return NextResponse.json({ success: false, message: "Thiếu dữ liệu bắt buộc" }, { status: 400 });

    const bvInstance = await BaiVietModel.findByPk(Number(id));
    if (!bvInstance)
      return NextResponse.json({ success: false, message: "Không tìm thấy bài viết" }, { status: 404 });

    await bvInstance.update({
      tieu_de: body.tieu_de,
      noi_dung: body.noi_dung,
      hinh: body.hinh || null,
      id_loai_bv: body.id_loai_bv,
      luot_xem: body.luot_xem ?? 0,
      slug: body.slug || "",
      ngay_dang: body.ngay_dang ? new Date(body.ngay_dang) : new Date(),
      an_hien: body.an_hien ? 1 : 0,
    });

    const updated = bvInstance.toJSON() as IBaiViet & { an_hien: number | boolean };
    const data: IBaiViet = {
      ...updated,
      an_hien: !!updated.an_hien,
      ngay_dang: updated.ngay_dang ? new Date(updated.ngay_dang).toISOString() : null,
    };

    return NextResponse.json({ success: true, message: "Cập nhật thành công", data });
  } catch (error) {
    console.error("🔥 Lỗi PUT:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ===== PATCH: Cập nhật trạng thái ẩn/hiện =====
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body: PatchBaiVietBody = await req.json();

    if (typeof body.an_hien !== "boolean")
      return NextResponse.json({ success: false, message: "an_hien phải là boolean" }, { status: 400 });

    const bvInstance = await BaiVietModel.findByPk(Number(id));
    if (!bvInstance)
      return NextResponse.json({ success: false, message: "Không tìm thấy bài viết" }, { status: 404 });

    await bvInstance.update({ an_hien: body.an_hien ? 1 : 0 });

    const updated = bvInstance.toJSON() as IBaiViet & { an_hien: number | boolean };
    const data: IBaiViet = {
      ...updated,
      an_hien: !!updated.an_hien,
      ngay_dang: updated.ngay_dang ? new Date(updated.ngay_dang).toISOString() : null,
    };

    return NextResponse.json({ success: true, message: "Cập nhật trạng thái thành công", data });
  } catch (error) {
    console.error("🔥 Lỗi PATCH:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ===== POST: Tăng lượt xem =====
export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const bvInstance = await BaiVietModel.findByPk(Number(id));

    if (!bvInstance || bvInstance.getDataValue("an_hien") === 0)
      return NextResponse.json({ message: "Bài viết không tồn tại" }, { status: 404 });

    const luotXem = (bvInstance.getDataValue("luot_xem") || 0) + 1;
    await bvInstance.update({ luot_xem: luotXem });

    return NextResponse.json({ message: "Đã tăng lượt xem", luot_xem: luotXem });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi server";
    return NextResponse.json({ message }, { status: 500 });
  }
}
