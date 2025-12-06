

import { NextResponse } from "next/server";
import { NguoiDungModel } from "@/app/lib/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { INguoiDung } from "@/app/lib/cautrucdata";

interface DangKyBody {
  ho_ten: string;
  email: string;
  sdt: number;
  mat_khau: string;
  go_lai_mat_khau: string;
}

export async function POST(req: Request) {
  try {
    const body: DangKyBody = await req.json();
    const { ho_ten, email, sdt, mat_khau, go_lai_mat_khau } = body;

    if (!ho_ten || !email || !sdt || !mat_khau || !go_lai_mat_khau) {
      return NextResponse.json(
        { thong_bao: "Vui lòng nhập đầy đủ thông tin" },
        { status: 400 }
      );
    }

    const user = await NguoiDungModel.findOne({ where: { email } });
    if (user) {
      return NextResponse.json(
        { thong_bao: "Email đã tồn tại" },
        { status: 400 }
      );
    }

    if (mat_khau.length < 6) {
      return NextResponse.json(
        { thong_bao: "Mật khẩu phải có ít nhất 6 ký tự" },
        { status: 400 }
      );
    }

    if (mat_khau !== go_lai_mat_khau) {
      return NextResponse.json(
        { thong_bao: "Hai mật khẩu không giống nhau" },
        { status: 400 }
      );
    }

    const mk_mahoa = await bcrypt.hash(mat_khau, 10);

    const nguoi_dung = await NguoiDungModel.create({
      ho_ten,
      email,
      sdt,
      mat_khau: mk_mahoa,
      vai_tro: false,
      trang_thai: true,
      ngay_tao: new Date(),
    });

    // ✅ Tạo token JWT ngay sau khi đăng ký
    const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
    const token = jwt.sign(
      {
        id: nguoi_dung.getDataValue("id"),
        email: nguoi_dung.getDataValue("email"),
        vai_tro: nguoi_dung.getDataValue("vai_tro"),
      },
      secret,
      { expiresIn: "7d" }
    );

    const nguoiDungMoi = nguoi_dung.toJSON() as INguoiDung;

    return NextResponse.json(
      {
        thong_bao: "Đăng ký thành công",
        token,
        nguoi_dung: {
          id: nguoiDungMoi.id,
          ho_ten: nguoiDungMoi.ho_ten,
          email: nguoiDungMoi.email,
          sdt: nguoiDungMoi.sdt,
          vai_tro: nguoiDungMoi.vai_tro,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return NextResponse.json(
      {
        thong_bao: "Lỗi server",
        chi_tiet: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
