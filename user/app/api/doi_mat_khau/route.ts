// // import { NextResponse } from "next/server";
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // import { NguoiDungModel } from "@/app/lib/models";

// // interface DoiPassBody {
// //   pass_old: string;
// //   pass_new1: string;
// //   pass_new2: string;
// // }

// // export async function POST(req: Request) {
// //   try {
// //     const authHeader = req.headers.get("authorization");
// //     if (!authHeader) {
// //       return NextResponse.json(
// //         { thong_bao: "Thiếu token đăng nhập" },
// //         { status: 401 }
// //       );
// //     }

// //     const token = authHeader.split(" ")[1];
// //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";

// //     // 🔑 Xác thực token
// //     let decoded: any;
// //     try {
// //       decoded = jwt.verify(token, secret);
// //     } catch {
// //       return NextResponse.json(
// //         { thong_bao: "Token không hợp lệ hoặc hết hạn" },
// //         { status: 403 }
// //       );
// //     }

// //     const body: DoiPassBody = await req.json();
// //     const { pass_old, pass_new1, pass_new2 } = body;

// //     if (!pass_old || !pass_new1 || !pass_new2) {
// //       return NextResponse.json(
// //         { thong_bao: "Vui lòng nhập đầy đủ thông tin" },
// //         { status: 400 }
// //       );
// //     }

// //     if (pass_new1 !== pass_new2) {
// //       return NextResponse.json(
// //         { thong_bao: "Hai mật khẩu mới không giống nhau" },
// //         { status: 400 }
// //       );
// //     }

// //     if (pass_new1.length < 6) {
// //       return NextResponse.json(
// //         { thong_bao: "Mật khẩu mới phải từ 6 ký tự" },
// //         { status: 400 }
// //       );
// //     }

// //     // 🔍 Tìm người dùng theo ID trong token
// //     const user = await NguoiDungModel.findOne({
// //       where: { id: decoded.id },
// //     });

// //     if (!user) {
// //       return NextResponse.json(
// //         { thong_bao: "Không tìm thấy người dùng" },
// //         { status: 404 }
// //       );
// //     }

// //     const matKhauDB = user.getDataValue("mat_khau") as string;
// //     const hopLe = await bcrypt.compare(pass_old, matKhauDB);

// //     if (!hopLe) {
// //       return NextResponse.json(
// //         { thong_bao: "Mật khẩu cũ không đúng" },
// //         { status: 401 }
// //       );
// //     }

// //     // 🔒 Hash mật khẩu mới và cập nhật
// //     const mk_mahoa = await bcrypt.hash(pass_new1, 10);
// //     await NguoiDungModel.update(
// //       { mat_khau: mk_mahoa },
// //       { where: { id: decoded.id } }
// //     );

// //     return NextResponse.json(
// //       { thong_bao: "Đổi mật khẩu thành công" },
// //       { status: 200 }
// //     );
// //   } catch (error) {
// //     console.error("Lỗi đổi mật khẩu:", error);
// //     return NextResponse.json(
// //       { thong_bao: "Lỗi server", chi_tiet: (error as Error).message },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt, { JwtPayload } from "jsonwebtoken"; // 👈 thêm JwtPayload
// import { NguoiDungModel } from "@/app/lib/models";

// interface DoiPassBody {
//   pass_old: string;
//   pass_new1: string;
//   pass_new2: string;
// }

// // 👇 định nghĩa kiểu token (tuỳ token bạn encode thế nào)
// interface TokenData extends JwtPayload {
//   id: number;
//   email?: string;
// }

// export async function POST(req: Request) {
//   try {
//     const authHeader = req.headers.get("authorization");
//     if (!authHeader) {
//       return NextResponse.json(
//         { thong_bao: "Thiếu token đăng nhập" },
//         { status: 401 }
//       );
//     }

//     const token = authHeader.split(" ")[1];
//     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";

//     // ✅ Xác thực token, có kiểu rõ ràng
//     let decoded: TokenData;
//     try {
//       decoded = jwt.verify(token, secret) as TokenData;
//     } catch {
//       return NextResponse.json(
//         { thong_bao: "Token không hợp lệ hoặc hết hạn" },
//         { status: 403 }
//       );
//     }

//     const body: DoiPassBody = await req.json();
//     const { pass_old, pass_new1, pass_new2 } = body;

//     if (!pass_old || !pass_new1 || !pass_new2) {
//       return NextResponse.json(
//         { thong_bao: "Vui lòng nhập đầy đủ thông tin" },
//         { status: 400 }
//       );
//     }

//     if (pass_new1 !== pass_new2) {
//       return NextResponse.json(
//         { thong_bao: "Hai mật khẩu mới không giống nhau" },
//         { status: 400 }
//       );
//     }

//     if (pass_new1.length < 6) {
//       return NextResponse.json(
//         { thong_bao: "Mật khẩu mới phải từ 6 ký tự" },
//         { status: 400 }
//       );
//     }

//     // 🔍 Tìm người dùng theo ID trong token
//     const user = await NguoiDungModel.findOne({
//       where: { id: decoded.id },
//     });

//     if (!user) {
//       return NextResponse.json(
//         { thong_bao: "Không tìm thấy người dùng" },
//         { status: 404 }
//       );
//     }

//     const matKhauDB = user.getDataValue("mat_khau") as string;
//     const hopLe = await bcrypt.compare(pass_old, matKhauDB);

//     if (!hopLe) {
//       return NextResponse.json(
//         { thong_bao: "Mật khẩu cũ không đúng" },
//         { status: 401 }
//       );
//     }

//     // 🔒 Hash mật khẩu mới và cập nhật
//     const mk_mahoa = await bcrypt.hash(pass_new1, 10);
//     await NguoiDungModel.update(
//       { mat_khau: mk_mahoa },
//       { where: { id: decoded.id } }
//     );

//     return NextResponse.json(
//       { thong_bao: "Đổi mật khẩu thành công" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Lỗi đổi mật khẩu:", error);
//     return NextResponse.json(
//       { thong_bao: "Lỗi server", chi_tiet: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NguoiDungModel } from "@/app/lib/models";

//  Kiểu dữ liệu request
interface DoiPassBody {
  pass_old: string;
  pass_new1: string;
  pass_new2: string;
}

//  Kiểu dữ liệu token (tùy bạn mã hóa JWT sao)
interface TokenData extends JwtPayload {
  id: number;
  email?: string;
}

export async function POST(req: Request) {
  try {
    // Lấy token từ header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { thong_bao: "Thiếu token đăng nhập" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";

    // Xác thực token
    let decoded: TokenData;
    try {
      decoded = jwt.verify(token, secret) as TokenData;
    } catch {
      return NextResponse.json(
        { thong_bao: "Token không hợp lệ hoặc đã hết hạn" },
        { status: 403 }
      );
    }

    // Lấy body request
    const body: DoiPassBody = await req.json();
    const { pass_old, pass_new1, pass_new2 } = body;

    if (!pass_old || !pass_new1 || !pass_new2) {
      return NextResponse.json(
        { thong_bao: "Vui lòng nhập đầy đủ thông tin" },
        { status: 400 }
      );
    }

    if (pass_new1 !== pass_new2) {
      return NextResponse.json(
        { thong_bao: "Hai mật khẩu mới không giống nhau" },
        { status: 400 }
      );
    }

    if (pass_new1.length < 6) {
      return NextResponse.json(
        { thong_bao: "Mật khẩu mới phải từ 6 ký tự" },
        { status: 400 }
      );
    }

    // Tìm người dùng theo ID
    const user = await NguoiDungModel.findOne({ where: { id: decoded.id } });
    if (!user) {
      return NextResponse.json(
        { thong_bao: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    // So sánh mật khẩu cũ
    const matKhauDB = user.getDataValue("mat_khau") as string;
    const hopLe = await bcrypt.compare(pass_old, matKhauDB);
    if (!hopLe) {
      return NextResponse.json(
        { thong_bao: "Mật khẩu cũ không đúng" },
        { status: 401 }
      );
    }

    // Hash và cập nhật mật khẩu mới
    const mk_mahoa = await bcrypt.hash(pass_new1, 10);
    await user.update({ mat_khau: mk_mahoa });

    //  Trả lại thông tin user để frontend lưu lại
    const userInfo = {
      id: user.id,
      ho_ten: user.ho_ten,
      email: user.email,
      sdt: user.sdt,
    };

    return NextResponse.json({
      thong_bao: "Đổi mật khẩu thành công!",
      user: userInfo,
    });
  } catch (error) {
    console.error("🔥 Lỗi đổi mật khẩu:", error);
    return NextResponse.json(
      { thong_bao: "Lỗi server", chi_tiet: (error as Error).message },
      { status: 500 }
    );
  }
}
