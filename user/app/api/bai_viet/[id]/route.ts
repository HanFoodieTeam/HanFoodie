import { NextRequest, NextResponse } from "next/server";
import { BaiVietModel } from "@/lib/models";
import { IBaiViet } from "@/lib/cautrucdata";
import { Op } from "sequelize";

type RouteContext = { params: Promise<{ id: string }> };

// Kiểu raw từ Sequelize
interface BaiVietRaw extends Omit<IBaiViet, "an_hien" | "ngay_dang"> {
  an_hien: number | boolean;
  ngay_dang: string | Date | null;
}

// Map raw Sequelize → IBaiViet
function mapRawToBaiViet(raw: BaiVietRaw): IBaiViet {
  return {
    ...raw,
    an_hien: Boolean(raw.an_hien),
    ngay_dang: raw.ngay_dang ? new Date(raw.ngay_dang).toISOString() : null,
  };
}

export async function GET(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });
    }

    const bvInstance = await BaiVietModel.findByPk(numericId);

    if (!bvInstance) {
      return NextResponse.json({ success: false, message: "Không tìm thấy bài viết" }, { status: 404 });
    }

    const bvRaw = bvInstance.toJSON() as BaiVietRaw;
    const data: IBaiViet = mapRawToBaiViet(bvRaw);

    // Bài viết liên quan cùng loại
    let related: IBaiViet[] = [];
    if (bvRaw.id_loai_bv) {
      const relatedRows = await BaiVietModel.findAll({
        where: {
          id_loai_bv: bvRaw.id_loai_bv,
          an_hien: 1,
          id: { [Op.ne]: numericId },
        },
        limit: 5,
        order: [["ngay_dang", "DESC"]],
      });
      related = relatedRows.map((row) => mapRawToBaiViet(row.toJSON() as BaiVietRaw));
    }

    return NextResponse.json({ success: true, data, related });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi server";
    console.error("🔥 Lỗi GET chi tiết bài viết:", message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
