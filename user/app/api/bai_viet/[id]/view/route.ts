import { NextRequest, NextResponse } from "next/server";
import { BaiVietModel } from "@/lib/models";
import { IBaiViet } from "@/lib/cautrucdata";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
    }

    const bv = await BaiVietModel.findByPk(numericId);
    if (!bv || bv.getDataValue("an_hien") === 0) {
      return NextResponse.json({ message: "Bài viết không tồn tại" }, { status: 404 });
    }

    const luotXem = (bv.getDataValue("luot_xem") || 0) + 1;
    await bv.update({ luot_xem: luotXem });

    return NextResponse.json({ message: "Đã tăng lượt xem", luot_xem: luotXem });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi server";
    console.error("🔥 Lỗi tăng lượt xem:", message);
    return NextResponse.json({ message }, { status: 500 });
  }
}
