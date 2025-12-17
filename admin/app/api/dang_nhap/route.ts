import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NguoiDungModel } from "@/lib/models";
import { INguoiDung } from "@/lib/cautrucdata";

export async function POST(req: NextRequest) {
  try {
    const body: Partial<INguoiDung> = await req.json();
    const { email, mat_khau } = body;

    // 1. Kiểm tra thiếu thông tin
    if (!email || !mat_khau) {
      return NextResponse.json(
        { success: false, message: "Thiếu email hoặc mật khẩu" },
        { status: 400 }
      );
    }

    // 2. Tìm người dùng
    const user = await NguoiDungModel.findOne({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Email không tồn tại" },
        { status: 404 }
      );
    }

    // 3. Kiểm tra mật khẩu
    const hash = user.getDataValue("mat_khau") as string;
    const hopLe = await bcrypt.compare(mat_khau, hash);
    if (!hopLe) {
      return NextResponse.json(
        { success: false, message: "Sai mật khẩu" },
        { status: 401 }
      );
    }

    // 4. Kiểm tra trạng thái (0 = khóa, 1 = hoạt động)
    const trangThai = Number(user.getDataValue("trang_thai"));
    if (trangThai === 0) {
      return NextResponse.json(
        { success: false, message: "Tài khoản đã bị khóa" },
        { status: 403 }
      );
    }

    // 5. Kiểm tra vai trò admin (DB: 0 = user, 1 = admin)
    const role = Number(user.getDataValue("vai_tro"));
    console.log("ROLE IN DB =", role);

    if (role !== 1) {
      return NextResponse.json(
        { success: false, message: "Bạn không có quyền truy cập admin" },
        { status: 403 }
      );
    }

    // 6. Tạo token JWT
    const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
    console.log("SECRET TRONG API LOGIN =", secret);

    const token = jwt.sign(
      {
        id: user.getDataValue("id"),
        email: user.getDataValue("email"),
        vai_tro: role,
        ten: user.getDataValue("ho_ten"),
      },
      secret,
      { expiresIn: "7d" }
    );

    // 7. Trả về + set cookie
    const res = NextResponse.json({
      success: true,
      message: "Đăng nhập thành công",
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });



    return res;
  } catch (err) {
    console.error("Lỗi đăng nhập:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}
