// import { NextResponse } from "next/server";
// import { NguoiDungModel } from "@/app/lib/models";
// import jwt from "jsonwebtoken";

// export async function POST(req: Request) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader) {
//       return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });
//     }

//     const token = authHeader.split(" ")[1];
//     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";

//     let userData;
//     try {
//       userData = jwt.verify(token, secret);
//     } catch {
//       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 403 });
//     }

//     const { ho_ten, sdt, gioi_tinh, ngay_sinh } = await req.json();

//     // Tìm user theo ID trong token
//     const user = await NguoiDungModel.findOne({ where: { id: userData.id } });
//     if (!user) {
//       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
//     }

//     // Cập nhật thông tin
//     await user.update({
//       ho_ten,
//       sdt,
//       ngay_sinh,
//       tep_khach: gioi_tinh, // nếu bạn chưa có cột gioi_tinh, tạm lưu vào đây
//     });

//     return NextResponse.json({ thong_bao: "Cập nhật hồ sơ thành công!" });
//   } catch (error) {
//     console.error("Lỗi cập nhật hồ sơ:", error);
//     return NextResponse.json(
//       { thong_bao: "Lỗi server", chi_tiet: (error as Error).message },
//       { status: 500 }
//     );
//   }
  // }
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { NguoiDungModel } from "@/app/lib/models";

// 🧩 Giải mã token và lấy ID người dùng
function xacThucNguoiDung(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
  try {
    const userData = jwt.verify(token, secret) as { id: number };
    return userData.id;
  } catch {
    return null;
  }
}

/* 🟢 GET — Lấy thông tin người dùng */
export async function GET(req: Request) {
  try {
    const userId = xacThucNguoiDung(req);
    if (!userId) {
      return NextResponse.json({ thong_bao: "Thiếu hoặc token không hợp lệ" }, { status: 401 });
    }

    const user = await NguoiDungModel.findOne({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
    }

    const u = user.toJSON();
    return NextResponse.json({
      thong_bao: "Lấy thông tin thành công",
      nguoi_dung: {
        ho_ten: u.ho_ten,
        email: u.email,
        sdt: u.sdt,
        ngay_sinh: u.ngay_sinh,
      },
    });
  } catch (err) {
    console.error("Lỗi lấy hồ sơ:", err);
    return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
  }
}

/* 🟡 POST — Cập nhật thông tin người dùng */
export async function POST(req: Request) {
  try {
    const userId = xacThucNguoiDung(req);
    if (!userId) {
      return NextResponse.json({ thong_bao: "Thiếu hoặc token không hợp lệ" }, { status: 401 });
    }

    const { ho_ten, sdt, ngay_sinh } = await req.json();

    const user = await NguoiDungModel.findOne({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
    }

    await user.update({ ho_ten, sdt, ngay_sinh });

    return NextResponse.json({ thong_bao: "Cập nhật hồ sơ thành công!" });
  } catch (err) {
    console.error("Lỗi cập nhật hồ sơ:", err);
    return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
  }
}

