import { NextResponse } from "next/server";
import { NguoiDungModel } from "@/app/lib/models";
import bcrypt from "bcryptjs";
import { INguoiDung } from "@/app/lib/cautrucdata";

interface DangKyBody extends INguoiDung {
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

    //  Kiểm tra mật khẩu
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

    //  Mã hoá mật khẩu
    const mk_mahoa = await bcrypt.hash(mat_khau, 10);
    await NguoiDungModel.create({
      ho_ten,
      email,
      sdt,
      mat_khau: mk_mahoa,
      vai_tro: 0,
      trang_thai: 1,
      ngay_tao: new Date(), // 
    });



    return NextResponse.json(
      { thong_bao: "Đang xử lý" },
      { status: 200 }
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
