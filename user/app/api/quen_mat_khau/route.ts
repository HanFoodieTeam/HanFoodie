import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { query } from "../../../lib/query";
import { RowDataPacket } from "mysql2";

interface IRequestBody {
  email: string;
}

interface IUser extends RowDataPacket {
  id: number;
  ho_ten: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email }: IRequestBody = await req.json();
    if (!email) return NextResponse.json({ error: "Email trống" }, { status: 400 });

    const users = await query<IUser>(
      "SELECT id, ho_ten FROM nguoi_dung WHERE email = ? LIMIT 1",
      [email]
    );
    const user = users[0];
    if (!user) return NextResponse.json({ error: "Email không tồn tại" }, { status: 404 });

    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET chưa cấu hình");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetUrl = `${process.env.APP_URL}/dat_lai_mat_khau?token=${token}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"HanFoodie" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Đặt lại mật khẩu HanFoodie",
      html: `<p>Xin chào ${user.ho_ten},</p>
             <p>Click <a href="${resetUrl}">vào đây</a> để đặt lại mật khẩu. Link có hiệu lực 15 phút.</p>`,
    });

    return NextResponse.json({ message: "Gửi mail thành công!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
