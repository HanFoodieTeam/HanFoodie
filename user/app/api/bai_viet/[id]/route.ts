// File: app/api/bai_viet/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BaiVietModel } from "@/app/lib/models";
import { IBaiViet } from "@/app/lib/cautrucdata";

// Kiểu request context
type RouteContext = { params: Promise<{ id: string }> };

// Kiểu raw từ Sequelize (để convert an_hien và ngày đăng)
interface BaiVietRaw extends Omit<IBaiViet, "an_hien" | "ngay_dang"> {
  an_hien: number | boolean;
  ngay_dang: string | Date | null;
}

// Hàm map raw Sequelize → IBaiViet
function mapRawToBaiViet(raw: BaiVietRaw): IBaiViet {
  return {
    ...raw,
    an_hien: !!raw.an_hien,
    ngay_dang: raw.ngay_dang ? new Date(raw.ngay_dang).toISOString() : null,
  };
}

// ===== GET chi tiết bài viết kèm bài viết liên quan =====
export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (isNaN(numericId))
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });

    const bvInstance = await BaiVietModel.findByPk(numericId);

    if (!bvInstance)
      return NextResponse.json({ success: false, message: "Không tìm thấy bài viết" }, { status: 404 });

    const bvRaw = bvInstance.toJSON() as BaiVietRaw;
    const data: IBaiViet = mapRawToBaiViet(bvRaw);

    // ===== Lấy các bài viết liên quan =====
    let related: IBaiViet[] = [];
    if (bvRaw.id_loai_bv) {
      const relatedRows = await BaiVietModel.findAll({
        where: {
          id_loai_bv: bvRaw.id_loai_bv,
          an_hien: 1,
          id: { $ne: numericId }, // Sequelize v5/v6 dùng Op.ne
        },
        limit: 5, // số lượng bài viết liên quan
        order: [["ngay_dang", "DESC"]],
      });

      related = relatedRows.map(row => mapRawToBaiViet(row.toJSON() as BaiVietRaw));
    }

    return NextResponse.json({ success: true, data, related });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi server";
    console.error("🔥 Lỗi GET chi tiết bài viết:", message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
