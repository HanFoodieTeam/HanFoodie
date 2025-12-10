import { NextResponse } from "next/server";
import { BaiVietModel } from "@/app/lib/models";

export async function GET() {
  try {
    const baiVietMoiNhat = await BaiVietModel.findAll({
      where: { an_hien: true },
      order: [["ngay_dang", "DESC"]],
      limit: 8,
    });

    return NextResponse.json(baiVietMoiNhat);
  } catch (error) {
    console.error("Lỗi lấy bài viết: ", error);
    return NextResponse.json(
      { thong_bao: "Lỗi server", chi_tiet: (error as Error).message },
      { status: 500 }
    );
  }
}
