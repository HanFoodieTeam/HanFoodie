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
import { NguoiDungModel } from "@/app/lib/models";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserToken extends JwtPayload {
  id: number;
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";

    const userData = jwt.verify(token, secret) as UserToken;

    const { ho_ten, sdt, ngay_sinh } = await req.json();

    // 🔍 Tìm người dùng theo ID
    const user = await NguoiDungModel.findOne({ where: { id: userData.id } });
    if (!user) {
      return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
    }

    //  Cập nhật thông tin 
    await user.update({
      ho_ten,
      sdt,
      ngay_sinh,
    });

    // ✅ Trả phản hồi
    return NextResponse.json({ thong_bao: "Cập nhật hồ sơ thành công!" });

  } catch (error) {
    console.error("🔥 Lỗi cập nhật hồ sơ:", error);
    return NextResponse.json(
      { thong_bao: "Lỗi server", chi_tiet: (error as Error).message },
      { status: 500 }
    );
  }
}
