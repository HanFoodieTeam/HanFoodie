import { BannerModel } from "@/lib/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const loaiQuery = searchParams.get("loai"); // 0 - 1 - null

    const whereClause: Record<string, unknown> = { an_hien: 1 };

    if (loaiQuery !== null) {
      whereClause.loai = Number(loaiQuery);
    }

    const list = await BannerModel.findAll({
      where: whereClause,
      order: [["thu_tu", "ASC"]],
    });

    return NextResponse.json({
      success: true,
      data: list,
    });
  } catch (err) {
    console.error("GET /api/banner error:", err);
    return NextResponse.json(
      { success: false, data: [] },
      { status: 500 }
    );
  }
}
