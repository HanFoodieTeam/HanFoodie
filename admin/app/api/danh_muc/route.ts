import { NextResponse } from "next/server";
import { DanhMucModel } from "@/app/lib/models";

// ======================
// GET - LẤY DANH SÁCH DANH MỤC
// ======================
export async function GET() {
  try {
    const list = await DanhMucModel.findAll({
      order: [["id", "ASC"]],
    });

    return NextResponse.json({
      success: true,
      data: list,
    });
  } catch (error) {
    console.error("❌ Lỗi API danh mục:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Không lấy được danh mục",
      },
      { status: 500 }
    );
  }
}
