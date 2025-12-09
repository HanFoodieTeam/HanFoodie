// File: app/api/bai_viet/loai/route.ts

import { NextResponse } from "next/server";
import { LoaiBaiVietModel } from "@/app/lib/models";
import { ILoaiBaiViet } from "@/app/lib/cautrucdata";

// Kiểu dữ liệu Raw từ Sequelize (vì an_hien trong DB là number)
interface RawLoaiBaiViet extends Omit<ILoaiBaiViet, "an_hien"> {
  an_hien: number | boolean;
}

// Convert dữ liệu raw -> đúng chuẩn Type ILoaiBaiViet
function mapLoai(raw: RawLoaiBaiViet): ILoaiBaiViet {
  return {
    id: raw.id,
    ten_loai: raw.ten_loai,
    slug: raw.slug,
    thu_tu: raw.thu_tu,
    an_hien: Boolean(raw.an_hien),
  };
}

// ====================== GET danh sách loại bài viết ======================

export async function GET() {
  try {
    const rows = await LoaiBaiVietModel.findAll({
      where: { an_hien: 1 },
      order: [["thu_tu", "ASC"]],
    });

    const data: ILoaiBaiViet[] = rows.map((row) =>
      mapLoai(row.toJSON() as RawLoaiBaiViet)
    );

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Lỗi server không xác định";

    console.error("🔥 Lỗi API loại bài viết:", message);

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
