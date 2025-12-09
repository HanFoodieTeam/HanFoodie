import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NguoiDungModel } from "@/app/lib/models";

interface VerifyTokenPayload extends JwtPayload {
  id: number;
}
export async function POST(req: Request) {
  try {
    const { token } = await req.json();
    if (!token) return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 400 });

    const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
    let decoded: VerifyTokenPayload;
    try {
      decoded = jwt.verify(token, secret) as VerifyTokenPayload;
    } catch {
      return NextResponse.json({ thong_bao: "Token hết hạn hoặc không hợp lệ" }, { status: 400 });
    }

    const id = decoded.id;
    const user = await NguoiDungModel.findByPk(id);
    if (!user) return NextResponse.json({ thong_bao: "User không tồn tại" }, { status: 404 });

    await user.update({
      kich_hoat: 1,
      token_kich_hoat: null,
      han_token: null,
    });

    return NextResponse.json({ thong_bao: "Kích hoạt thành công!" });

  } catch {
    return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
  }
}
