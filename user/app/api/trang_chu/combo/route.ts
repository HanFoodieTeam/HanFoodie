import { SanPhamModel } from "@/app/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sp_arr = await SanPhamModel.findAll({
      where: { id_danh_muc: 11 },
      order: [["luot_xem", "desc"]],
      limit: 4, // nếu muốn lấy 4 sản phẩm, bỏ nếu muốn lấy tất cả
    });

    return NextResponse.json(sp_arr);
  } catch (error) {
    console.error("Lỗi truy vấn sản phẩm:", error);
    return NextResponse.json({ error: "Lỗi khi lấy sản phẩm" }, { status: 500 });
  }
}
