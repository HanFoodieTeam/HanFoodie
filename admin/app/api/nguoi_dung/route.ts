

import { NextResponse } from "next/server";
import { NguoiDungModel } from "@/lib/models";
import { INguoiDung } from "@/lib/cautrucdata";

export async function GET() {
  try {
    const rows = await NguoiDungModel.findAll({
      order: [["id", "desc"]],
      raw: true,
    }) as INguoiDung[];

    const formatted: INguoiDung[] = rows.map((u) => ({
      ...u,
      vai_tro: Boolean(u.vai_tro),
      trang_thai: Boolean(u.trang_thai),
      kich_hoat: Boolean(u.kich_hoat),
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
      total: formatted.length,
    });
  } catch (error) {
    console.error(" Lỗi GET /api/nguoi_dung:", error);
    return NextResponse.json(
      { success: false, data: [], total: 0 },
      { status: 500 }
    );
  }
}
