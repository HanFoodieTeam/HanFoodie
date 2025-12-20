import { NextResponse } from "next/server";
import { MonThemModel } from "@/lib/models";

export async function GET() {
  try {
    const rows = await MonThemModel.findAll({
      order: [["id", "ASC"]],
    });

    const data = rows.map((row) => {
      const raw = row.toJSON() as any;
      return {
        id: raw.id,
        ten: raw.ten,
        gia_them: raw.gia_them,
        loai_mon: raw.loai_mon,
        trang_thai: !!raw.trang_thai,
        het_mon: !!raw.het_mon,
      };
    });

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET /api/danh_muc/mon_them error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi lấy danh sách món thêm" },
      { status: 500 }
    );
  }
}
