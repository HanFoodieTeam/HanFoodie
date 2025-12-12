
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NguoiDungModel } from "@/lib/models";
import { xacthuc } from "@/app/GUI_EMAIL/xac_thuc_tai_khoan";

interface ActiveTokenPayload extends JwtPayload {
  id: number;
  email: string;
}
export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });

    const secret = process.env.JWT_SECRET!;
    const decode = jwt.verify(token, secret) as ActiveTokenPayload;

    const user = await NguoiDungModel.findByPk(decode.id);
    if (!user) return NextResponse.json({ thong_bao: "Không tìm thấy user" }, { status: 404 });

    if (user.get("kich_hoat")) {
      return NextResponse.json({ thong_bao: "Tài khoản đã kích hoạt!" });
    }

    const tokenActive = jwt.sign({ id: decode.id }, secret, { expiresIn: "1d" });

    await user.update({
      token_kich_hoat: tokenActive,
      han_token: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const link = `${process.env.APP_URL}/kich_hoat_tai_khoan?token=${tokenActive}`;

    await xacthuc(
      decode.email,
      "Xác thực tài khoản HanFoodie",
      `
      <h2>Chào mừng đến HanFoodie! </h2>
      <p>Nhấn nút bên dưới để kích hoạt tài khoản:</p>
      <a href="${link}" 
         style="background:#D22B2B;color:white;padding:10px 18px;border-radius:8px;text-decoration:none;">
         KÍCH HOẠT NGAY
      </a>
      <p>Link sẽ hết hạn sau 24 giờ.</p>
      `
    );

    return NextResponse.json({ thong_bao: " Email đã được gửi!" });


  } catch (error) {
    return NextResponse.json({ thong_bao: "Lỗi server!" }, { status: 500 });
  }
}
