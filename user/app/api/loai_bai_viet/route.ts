export const runtime = "nodejs"; // quan trọng nếu dùng Sequelize

import { NextResponse } from "next/server";
import { LoaiBaiVietModel } from "@/app/lib/models";

export async function GET() {
  try {
    const data = await LoaiBaiVietModel.findAll({ where: { an_hien: 1 }, order: [["thu_tu","ASC"]] });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
