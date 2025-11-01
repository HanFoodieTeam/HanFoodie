import { NextRequest, NextResponse } from "next/server";
import { DiaChiModel } from "@/app/lib/models";
import { IDiaChi } from "@/app/lib/cautrucdata";
import { getUserFromToken } from "@/app/lib/auth"; // 🔑 helper xác thực JWT

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
  
    const user = getUserFromToken(req);
    if (!user) {
      return NextResponse.json(
        { message: "Token không hợp lệ hoặc đã hết hạn" },
        { status: 401 }
      );
    }

    const diaChiRaw = await DiaChiModel.findAll({
      where: { id_nguoi_dung: user.id },
      order: [
        ["mac_dinh", "DESC"], 
        ["id", "ASC"],        
      ],
    });

    //  Chuyển Model Sequelize → object thuần TypeScript
    const danhSach = diaChiRaw.map((x) => x.toJSON()) as IDiaChi[];

    return NextResponse.json(danhSach, { status: 200 });
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách địa chỉ:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
