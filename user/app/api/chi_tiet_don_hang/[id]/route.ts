import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  DonHangModel,
  ChiTietDonHangModel,
  SanPhamModel,
  BienTheModel,
} from "@/app/lib/models";
import { IDonHang } from "@/app/lib/cautrucdata";

interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
  vai_tro: boolean;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const donHangId = Number(id);
    if (Number.isNaN(donHangId)) {
      return NextResponse.json({ thong_bao: "ID không hợp lệ" }, { status: 400 });
    }

    const tokenHeader = req.headers.get("authorization");
    if (!tokenHeader)
      return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });

    const token = tokenHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
    const nguoiDung = jwt.verify(token, secret) as TokenPayload;

    // ✅ include theo quan hệ thật trong models.ts
    const don = await DonHangModel.findOne({
      where: {
        id: donHangId,
        id_nguoi_dung: nguoiDung.id,
      },
      include: [
        {
          model: ChiTietDonHangModel,
          as: "chi_tiet_don_hang",
          include: [
            {
              model: BienTheModel,
              as: "bien_the",
              include: [
                {
                  model: SanPhamModel,
                  as: "san_pham",
                },
              ],
            },
          ],
        },
      ],
    });

    if (!don)
      return NextResponse.json(
        { thong_bao: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );

    const ketQua = don.toJSON() as IDonHang;
    return NextResponse.json(ketQua, { status: 200 });
  } catch (err) {
    console.error("🔥 Lỗi lấy chi tiết đơn hàng:", err);
    return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
  }
}
