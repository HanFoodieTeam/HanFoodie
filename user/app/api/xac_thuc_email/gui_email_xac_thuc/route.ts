

import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NguoiDungModel } from "@/lib/models";
import { sendEmail } from "@/lib/sendEmail";

interface ActiveTokenPayload extends JwtPayload {
  id: number;
  email: string;
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) {
      return NextResponse.json(
        { thong_bao: "Thiếu token" },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { thong_bao: "Thiếu JWT_SECRET" },
        { status: 500 }
      );
    }

    const decode = jwt.verify(token, secret) as ActiveTokenPayload;

    const user = await NguoiDungModel.findByPk(decode.id);
    if (!user) {
      return NextResponse.json(
        { thong_bao: "Không tìm thấy user" },
        { status: 404 }
      );
    }

    if (Boolean(user.get("kich_hoat"))) {
      return NextResponse.json({
        thong_bao: "Tài khoản đã kích hoạt!",
      });
    }

    const tokenActive = jwt.sign(
      { id: decode.id },
      secret,
      { expiresIn: "1d" }
    );

    await user.update({
      token_kich_hoat: tokenActive,
      han_token: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const siteUrl = process.env.SITE_URL;
    if (!siteUrl) {
      return NextResponse.json(
        { thong_bao: "Thiếu SITE_URL" },
        { status: 500 }
      );
    }

    const link = `${siteUrl}/kich_hoat_tai_khoan?token=${tokenActive}`;

    try {
      await sendEmail(
        decode.email,
        "Xác thực tài khoản HanFoodie",
        `
          <h2>Chào mừng đến HanFoodie!</h2>
          <p>Nhấn nút bên dưới để kích hoạt tài khoản:</p>
          <a href="${link}"
             style="background:#D22B2B;color:white;padding:10px 18px;border-radius:8px;text-decoration:none;">
            KÍCH HOẠT NGAY
          </a>
          <p>Link sẽ hết hạn sau 24 giờ.</p>
        `
      );
    } catch (mailError) {
      console.error(" Lỗi gửi email xác thực:", mailError);
    }

    return NextResponse.json({
      thong_bao: "Email xác thực đã được gửi!",
    });
  } catch (error) {
    console.error(" POST /kich_hoat lỗi:", error);
    return NextResponse.json(
      { thong_bao: "Lỗi server!" },
      { status: 500 }
    );
  }
}
