import { NextResponse } from "next/server";
import { BaiVietModel } from "@/app/lib/models";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
    }

    const bvInstance = await BaiVietModel.findByPk(id);
    if (!bvInstance || bvInstance.getDataValue("an_hien") === 0) {
      return NextResponse.json({ message: "Bài viết không tồn tại" }, { status: 404 });
    }

    // Chỉ tăng lượt xem 1 lần
    bvInstance.setDataValue("luot_xem", (bvInstance.getDataValue("luot_xem") || 0) + 1);
    await bvInstance.save();

    return NextResponse.json({
      message: "Đã tăng lượt xem",
      luot_xem: bvInstance.getDataValue("luot_xem"),
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
