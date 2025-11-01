import { NextRequest, NextResponse } from "next/server";
import { DiaChiModel } from "@/app/lib/models";
import { IDiaChi } from "@/app/lib/cautrucdata";
import { getUserFromToken } from "@/app/lib/auth";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
  
    const user = getUserFromToken(req);
    if (!user) {
      return NextResponse.json(
        { message: "Token không hợp lệ hoặc đã hết hạn" },
        { status: 401 }
      );
    }

   
    const diaChiRaw = await DiaChiModel.findOne({
      where: { id_nguoi_dung: user.id, mac_dinh: true },
    });

    if (!diaChiRaw) {
      return NextResponse.json(
        { message: "Không tìm thấy địa chỉ mặc định" },
        { status: 404 }
      );
    }

    const diaChi = diaChiRaw.toJSON() as IDiaChi;

    return NextResponse.json(diaChi, { status: 200 });
  } catch (error) {
    console.error("Lỗi lấy địa chỉ mặc định:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
