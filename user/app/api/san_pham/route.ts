// app/api/sanpham/route.ts
import { NextResponse } from "next/server";
import { DanhMucModel, SanPhamModel } from "@/app/lib/models";

export async function GET() {
  try {
    const danhMucs = await DanhMucModel.findAll({
      include: [
        {
          model: SanPhamModel,
          as: "san_pham",
        },
      ],
      order: [["id", "ASC"]],
    });

    return NextResponse.json(danhMucs);
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo danh mục:", error);
    return NextResponse.json(
      { message: "Lỗi server khi lấy sản phẩm theo danh mục" },
      { status: 500 }
    );
  }
}
