// // import { NextRequest, NextResponse } from "next/server";
// // import { DonHangModel } from "@/app/lib/models";
// // import jwt from "jsonwebtoken";

// // export async function GET(req: NextRequest) {
// //   try {
// //     // 🟢 Lấy token từ header
// //     const token = req.headers.get("authorization")?.split(" ")[1];
// //     if (!token) {
// //       return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });
// //     }

// //     // 🟢 Xác minh token trực tiếp (không cần file utils)
// //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// //     let nguoiDung: any;

// //     try {
// //       nguoiDung = jwt.verify(token, secret);
// //     } catch (err) {
// //       return NextResponse.json(
// //         { thong_bao: "Token không hợp lệ hoặc đã hết hạn" },
// //         { status: 403 }
// //       );
// //     }

// //     // 🟢 Lấy tham số "trang_thai" nếu có (ví dụ: ?trang_thai=cho_xac_nhan)
// //     const { searchParams } = new URL(req.url);
// //     const trang_thai = searchParams.get("trang_thai");

// //     // 🟢 Điều kiện lọc
// //     const where: any = { id_nguoi_dung: nguoiDung.id };
// //     if (trang_thai) where.trang_thai = trang_thai;

// //     // 🟢 Lấy danh sách đơn hàng (mới nhất trước)
// //     const donHang = await DonHangModel.findAll({
// //       where,
// //       order: [["ngay_tao", "DESC"]],
// //     });

// //     return NextResponse.json(donHang);
// //   } catch (err) {
// //     console.error("Lỗi khi lấy đơn hàng:", err);
// //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// //   }
// // // }
// // import { NextRequest, NextResponse } from "next/server";
// // import { DonHangModel } from "@/app/lib/models";
// // import jwt from "jsonwebtoken";
// // import type { INguoiDung } from "@/app/lib/cautrucdata";
// // type JwtUserPayload = Pick<INguoiDung, "id" | "email" | "ho_ten" | "vai_tro">;

// // export async function GET(req: NextRequest) {
// //   try {
// //     // 🟢 Lấy token từ header
// //     const token = req.headers.get("authorization")?.split(" ")[1];
// //     if (!token) {
// //       return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });
// //     }

// //     // 🟢 Xác minh token
// //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// //     let nguoiDung: JwtUserPayload;

// //     try {
// //       nguoiDung = jwt.verify(token, secret) as JwtUserPayload;
// //     } catch {
// //       return NextResponse.json(
// //         { thong_bao: "Token không hợp lệ hoặc đã hết hạn" },
// //         { status: 403 }
// //       );
// //     }

// //     // 🟢 Lấy tham số "trang_thai" nếu có (ví dụ: ?trang_thai=cho_xac_nhan)
// //     const { searchParams } = new URL(req.url);
// //     const trang_thai = searchParams.get("trang_thai");

// //     // 🟢 Điều kiện lọc
// //     const where: Record<string, any> = { id_nguoi_dung: nguoiDung.id };
// //     if (trang_thai && trang_thai !== "tat_ca") where.trang_thai = trang_thai;

// //     // 🟢 Lấy danh sách đơn hàng (mới nhất trước)
// //     const donHang = await DonHangModel.findAll({
// //       where,
// //       order: [["ngay_tao", "DESC"]],
// //     });

// //     return NextResponse.json(donHang);
// //   } catch (err) {
// //     console.error("Lỗi khi lấy đơn hàng:", err);
// //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// //   }
// // }
// import { NextRequest, NextResponse } from "next/server";
// import { DonHangModel } from "@/app/lib/models";
// import jwt, { JwtPayload } from "jsonwebtoken";

// interface TokenPayload extends JwtPayload {
//   id: number;
//   email: string;
//   vai_tro: boolean;
// }

// export async function GET(req: NextRequest) {
//   try {
//     const token = req.headers.get("authorization")?.split(" ")[1];
//     if (!token)
//       return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });

//     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
//     let nguoiDung: TokenPayload;

//     try {
//       nguoiDung = jwt.verify(token, secret) as TokenPayload;
//     } catch (err) {
//       return NextResponse.json(
//         { thong_bao: "Token không hợp lệ hoặc hết hạn" },
//         { status: 403 }
//       );
//     }

//     console.log("✅ Token giải mã:", nguoiDung);

//     const { searchParams } = new URL(req.url);
//     const trang_thai = searchParams.get("trang_thai");

//     const where: any = { id_nguoi_dung: nguoiDung.id };
//     if (trang_thai && trang_thai !== "tat_ca") where.trang_thai = trang_thai;

//     console.log("🔍 Điều kiện lọc:", where);

//     const donHang = await DonHangModel.findAll({
//       where,
//       order: [["ngay_tao", "DESC"]],
//     });

//     console.log("📦 Số đơn hàng:", donHang.length);

//     return NextResponse.json(donHang);
//   } catch (err) {
//     console.error("🔥 Lỗi khi lấy đơn hàng:", err);
//     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { DonHangModel } from "@/app/lib/models";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IDonHang, TrangThaiDonHang } from "@/app/lib/cautrucdata";

// 🧩 Kiểu dữ liệu cho payload trong JWT
interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
  vai_tro: boolean;
}

export async function GET(req: NextRequest) {
  try {
    const tokenHeader = req.headers.get("authorization");
    if (!tokenHeader)
      return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });

    const token = tokenHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
    const nguoiDung = jwt.verify(token, secret) as TokenPayload;

    // 🟢 Lấy tham số ?trang_thai=
    const { searchParams } = new URL(req.url);
    const trang_thai = searchParams.get("trang_thai") as (TrangThaiDonHang | "tat_ca" | null);

    // 🟢 Điều kiện lọc
    const where: Partial<Pick<IDonHang, "id_nguoi_dung" | "trang_thai">> = {
      id_nguoi_dung: nguoiDung.id,
    };

    if (trang_thai && trang_thai !== "tat_ca") {
      where.trang_thai = trang_thai as TrangThaiDonHang;
    }

    // 🟢 Truy vấn danh sách đơn hàng
    const donHang = (await DonHangModel.findAll({
      where,
      order: [["ngay_tao", "DESC"]],
    })) as IDonHang[];

    return NextResponse.json(donHang, { status: 200 });
  } catch (err: unknown) {
    console.error("🔥 Lỗi khi lấy đơn hàng:", err);
    return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
  }
}
