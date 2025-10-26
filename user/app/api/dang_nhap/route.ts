import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { NguoiDungModel } from "@/app/lib/models";
import bcrypt from "bcryptjs";
import { INguoiDung } from "@/app/lib/cautrucdata";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body: Partial<INguoiDung> = await req.json();
    const { email, mat_khau } = body;

    if (!email || !mat_khau) {
      return NextResponse.json(
        { thong_bao: "Thiếu email hoặc mật khẩu" },
        { status: 400 }
      );
    }

    //  Tìm người dùng theo email
    const nguoiDung = await NguoiDungModel.findOne({ where: { email } });
    if (!nguoiDung) {
      return NextResponse.json(
        { thong_bao: "Email không tồn tại" },
        { status: 404 }
      );
    }

    //  So sánh mật khẩu
    const matKhauDB = nguoiDung.getDataValue("mat_khau") as string;
    const hopLe = await bcrypt.compare(mat_khau, matKhauDB);
    if (!hopLe) {
      return NextResponse.json(
        { thong_bao: "Sai mật khẩu" },
        { status: 401 }
      );
    }

    const trangThai = nguoiDung.getDataValue("trang_thai") as number;
    if (trangThai === 0) {
      return NextResponse.json(
        { thong_bao: "Tài khoản bị khóa" },
        { status: 403 }
      );
    }

    // Tạo JWT token
    const secret = process.env.JWT_SECRET || "BAN_NHAP_SECRET_KEY_TAI_DAY";
    const token = jwt.sign(
      {
        id: nguoiDung.getDataValue("id"),
        email: nguoiDung.getDataValue("email"),
        vai_tro: nguoiDung.getDataValue("vai_tro"),
      },
      secret,
      { expiresIn: "7d" } // Token hết hạn sau 7 ngày
    );

    // Trả thông tin người dùng (ẩn mật khẩu)
    const nguoiDungInfo = {
      ho_ten: nguoiDung.getDataValue("ho_ten") as string,
      email: nguoiDung.getDataValue("email") as string,
      sdt: nguoiDung.getDataValue("sdt") as number,
    };

    return NextResponse.json({
      thong_bao: "Đăng nhập thành công",
      token,
      nguoi_dung: nguoiDungInfo,
    });
  } catch (error: unknown) {
    console.error("Lỗi đăng nhập:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { thong_bao: "Lỗi server", chi_tiet: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { thong_bao: "Lỗi không xác định" },
      { status: 500 }
    );
  }
}
