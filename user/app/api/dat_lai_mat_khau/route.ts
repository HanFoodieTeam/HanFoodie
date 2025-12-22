import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/query";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

interface IRequestBody {
  token: string;
  matKhauMoi: string;
}

interface IUser extends RowDataPacket {
  id: number;
}

export async function POST(req: NextRequest) {
  try {
    const { token, matKhauMoi }: IRequestBody = await req.json();
    if (!token || !matKhauMoi)
      return NextResponse.json({ error: "Thiếu token hoặc mật khẩu" }, { status: 400 });

    let decoded: { userId: number };
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    } catch {
      return NextResponse.json({ error: "Token không hợp lệ hoặc hết hạn" }, { status: 401 });
    }

    const users = await query<IUser>("SELECT id FROM nguoi_dung WHERE id = ? LIMIT 1", [
      decoded.userId,
    ]);
    const user = users[0];
    if (!user) return NextResponse.json({ error: "Người dùng không tồn tại" }, { status: 404 });

    const hashedPassword = await bcrypt.hash(matKhauMoi, 10);
    await query("UPDATE nguoi_dung SET mat_khau = ? WHERE id = ?", [hashedPassword, decoded.userId]);

    return NextResponse.json({ message: "Đặt lại mật khẩu thành công!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
