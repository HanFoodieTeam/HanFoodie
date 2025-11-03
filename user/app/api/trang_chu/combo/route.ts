import { SanPhamModel } from "@/app/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sp_arr = await SanPhamModel.findAll({
      where: { id_danh_muc: 11, an_hien: true},
      order: [["luot_xem", "desc"]],
      limit: 6, 
    });

    return NextResponse.json(sp_arr);
  } catch (error) {
    console.error("Lỗi truy vấn sản phẩm:", error);
    return NextResponse.json({ error: "Lỗi khi lấy sản phẩm" }, { status: 500 });
  }
}
