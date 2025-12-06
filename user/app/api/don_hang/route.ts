// // // // // import { NextRequest, NextResponse } from "next/server";
// // // // // import { DonHangModel } from "@/app/lib/models";
// // // // // import jwt from "jsonwebtoken";

// // // // // export async function GET(req: NextRequest) {
// // // // //   try {
// // // // //     // 🟢 Lấy token từ header
// // // // //     const token = req.headers.get("authorization")?.split(" ")[1];
// // // // //     if (!token) {
// // // // //       return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });
// // // // //     }

// // // // //     // 🟢 Xác minh token trực tiếp (không cần file utils)
// // // // //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// // // // //     let nguoiDung: any;

// // // // //     try {
// // // // //       nguoiDung = jwt.verify(token, secret);
// // // // //     } catch (err) {
// // // // //       return NextResponse.json(
// // // // //         { thong_bao: "Token không hợp lệ hoặc đã hết hạn" },
// // // // //         { status: 403 }
// // // // //       );
// // // // //     }

// // // // //     // 🟢 Lấy tham số "trang_thai" nếu có (ví dụ: ?trang_thai=cho_xac_nhan)
// // // // //     const { searchParams } = new URL(req.url);
// // // // //     const trang_thai = searchParams.get("trang_thai");

// // // // //     // 🟢 Điều kiện lọc
// // // // //     const where: any = { id_nguoi_dung: nguoiDung.id };
// // // // //     if (trang_thai) where.trang_thai = trang_thai;

// // // // //     // 🟢 Lấy danh sách đơn hàng (mới nhất trước)
// // // // //     const donHang = await DonHangModel.findAll({
// // // // //       where,
// // // // //       order: [["ngay_tao", "DESC"]],
// // // // //     });

// // // // //     return NextResponse.json(donHang);
// // // // //   } catch (err) {
// // // // //     console.error("Lỗi khi lấy đơn hàng:", err);
// // // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // // //   }
// // // // // // }
// // // // // import { NextRequest, NextResponse } from "next/server";
// // // // // import { DonHangModel } from "@/app/lib/models";
// // // // // import jwt from "jsonwebtoken";
// // // // // import type { INguoiDung } from "@/app/lib/cautrucdata";
// // // // // type JwtUserPayload = Pick<INguoiDung, "id" | "email" | "ho_ten" | "vai_tro">;

// // // // // export async function GET(req: NextRequest) {
// // // // //   try {
// // // // //     // 🟢 Lấy token từ header
// // // // //     const token = req.headers.get("authorization")?.split(" ")[1];
// // // // //     if (!token) {
// // // // //       return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });
// // // // //     }

// // // // //     // 🟢 Xác minh token
// // // // //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// // // // //     let nguoiDung: JwtUserPayload;

// // // // //     try {
// // // // //       nguoiDung = jwt.verify(token, secret) as JwtUserPayload;
// // // // //     } catch {
// // // // //       return NextResponse.json(
// // // // //         { thong_bao: "Token không hợp lệ hoặc đã hết hạn" },
// // // // //         { status: 403 }
// // // // //       );
// // // // //     }

// // // // //     // 🟢 Lấy tham số "trang_thai" nếu có (ví dụ: ?trang_thai=cho_xac_nhan)
// // // // //     const { searchParams } = new URL(req.url);
// // // // //     const trang_thai = searchParams.get("trang_thai");

// // // // //     // 🟢 Điều kiện lọc
// // // // //     const where: Record<string, any> = { id_nguoi_dung: nguoiDung.id };
// // // // //     if (trang_thai && trang_thai !== "tat_ca") where.trang_thai = trang_thai;

// // // // //     // 🟢 Lấy danh sách đơn hàng (mới nhất trước)
// // // // //     const donHang = await DonHangModel.findAll({
// // // // //       where,
// // // // //       order: [["ngay_tao", "DESC"]],
// // // // //     });

// // // // //     return NextResponse.json(donHang);
// // // // //   } catch (err) {
// // // // //     console.error("Lỗi khi lấy đơn hàng:", err);
// // // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // // //   }
// // // // // }
// // // // import { NextRequest, NextResponse } from "next/server";
// // // // import { DonHangModel } from "@/app/lib/models";
// // // // import jwt, { JwtPayload } from "jsonwebtoken";

// // // // interface TokenPayload extends JwtPayload {
// // // //   id: number;
// // // //   email: string;
// // // //   vai_tro: boolean;
// // // // }

// // // // export async function GET(req: NextRequest) {
// // // //   try {
// // // //     const token = req.headers.get("authorization")?.split(" ")[1];
// // // //     if (!token)
// // // //       return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });

// // // //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// // // //     let nguoiDung: TokenPayload;

// // // //     try {
// // // //       nguoiDung = jwt.verify(token, secret) as TokenPayload;
// // // //     } catch (err) {
// // // //       return NextResponse.json(
// // // //         { thong_bao: "Token không hợp lệ hoặc hết hạn" },
// // // //         { status: 403 }
// // // //       );
// // // //     }

// // // //     console.log("✅ Token giải mã:", nguoiDung);

// // // //     const { searchParams } = new URL(req.url);
// // // //     const trang_thai = searchParams.get("trang_thai");

// // // //     const where: any = { id_nguoi_dung: nguoiDung.id };
// // // //     if (trang_thai && trang_thai !== "tat_ca") where.trang_thai = trang_thai;

// // // //     console.log("🔍 Điều kiện lọc:", where);

// // // //     const donHang = await DonHangModel.findAll({
// // // //       where,
// // // //       order: [["ngay_tao", "DESC"]],
// // // //     });

// // // //     console.log("📦 Số đơn hàng:", donHang.length);

// // // //     return NextResponse.json(donHang);
// // // //   } catch (err) {
// // // //     console.error("🔥 Lỗi khi lấy đơn hàng:", err);
// // // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // // //   }
// // // // }
// // // import { NextRequest, NextResponse } from "next/server";
// // // import { DonHangModel } from "@/app/lib/models";
// // // import jwt, { JwtPayload } from "jsonwebtoken";
// // // import { IDonHang, TrangThaiDonHang } from "@/app/lib/cautrucdata";

// // // // 🧩 Kiểu dữ liệu cho payload trong JWT
// // // interface TokenPayload extends JwtPayload {
// // //   id: number;
// // //   email: string;
// // //   vai_tro: boolean;
// // // }

// // // export async function GET(req: NextRequest) {
// // //   try {
// // //     const tokenHeader = req.headers.get("authorization");
// // //     if (!tokenHeader)
// // //       return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });

// // //     const token = tokenHeader.split(" ")[1];
// // //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// // //     const nguoiDung = jwt.verify(token, secret) as TokenPayload;

// // //     // 🟢 Lấy tham số ?trang_thai=
// // //     const { searchParams } = new URL(req.url);
// // //     const trang_thai = searchParams.get("trang_thai") as (TrangThaiDonHang | "tat_ca" | null);

// // //     // 🟢 Điều kiện lọc
// // //     const where: Partial<Pick<IDonHang, "id_nguoi_dung" | "trang_thai">> = {
// // //       id_nguoi_dung: nguoiDung.id,
// // //     };

// // //     if (trang_thai && trang_thai !== "tat_ca") {
// // //       where.trang_thai = trang_thai as TrangThaiDonHang;
// // //     }

// // //     // 🟢 Truy vấn danh sách đơn hàng
// // //     const donHang = (await DonHangModel.findAll({
// // //       where,
// // //       order: [["ngay_tao", "DESC"]],
// // //     })) as IDonHang[];

// // //     return NextResponse.json(donHang, { status: 200 });
// // //   } catch (err: unknown) {
// // //     console.error("🔥 Lỗi khi lấy đơn hàng:", err);
// // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // //   }
// // // }
// // import { NextRequest, NextResponse } from "next/server";
// // import { DonHangModel, ChiTietDonHangModel, BienTheModel, SanPhamModel } from "@/app/lib/models";
// // import jwt, { JwtPayload } from "jsonwebtoken";
// // import { IDonHang, TrangThaiDonHang } from "@/app/lib/cautrucdata";

// // interface TokenPayload extends JwtPayload {
// //   id: number;
// //   email: string;
// //   vai_tro: boolean;
// // }

// // export async function GET(req: NextRequest) {
// //   try {
// //     const tokenHeader = req.headers.get("authorization");
// //     if (!tokenHeader)
// //       return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });

// //     const token = tokenHeader.split(" ")[1];
// //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// //     const nguoiDung = jwt.verify(token, secret) as TokenPayload;

// //     const { searchParams } = new URL(req.url);
// //     const trang_thai = searchParams.get("trang_thai") as TrangThaiDonHang | "tat_ca" | null;

// //     const where: Partial<Pick<IDonHang, "id_nguoi_dung" | "trang_thai">> = {
// //       id_nguoi_dung: nguoiDung.id,
// //     };
// //     if (trang_thai && trang_thai !== "tat_ca") where.trang_thai = trang_thai;

// //     // 🟢 Thêm include để trả chi tiết sản phẩm trong đơn hàng
// //     const donHang = await DonHangModel.findAll({
// //       where,
// //       include: [
// //         {
// //           model: ChiTietDonHangModel,
// //           as: "danh_sach_san_pham",
// //           include: [
// //             {
// //               model: BienTheModel,
// //               as: "bien_the",
// //               include: [
// //                 {
// //                   model: SanPhamModel,
// //                   as: "san_pham",
// //                   attributes: ["id", "ten", "hinh", "gia"],
// //                 },
// //               ],
// //             },
// //           ],
// //         },
// //       ],
// //       order: [["ngay_tao", "DESC"]],
// //     });

// //     return NextResponse.json(donHang, { status: 200 });
// //   } catch (err: unknown) {
// //     console.error("🔥 Lỗi khi lấy đơn hàng:", err);
// //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// //   }
// // }
// import { NextRequest, NextResponse } from "next/server";
// import { DonHangModel, ChiTietDonHangModel, BienTheModel, SanPhamModel } from "@/app/lib/models";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { IDonHang, TrangThaiDonHang } from "@/app/lib/cautrucdata";

// interface TokenPayload extends JwtPayload {
//   id: number;
//   email: string;
//   vai_tro: boolean;
// }

// export async function GET(req: NextRequest) {
//   try {
//     const tokenHeader = req.headers.get("authorization");
//     if (!tokenHeader)
//       return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });

//     const token = tokenHeader.split(" ")[1];
//     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
//     const nguoiDung = jwt.verify(token, secret) as TokenPayload;

//     const { searchParams } = new URL(req.url);
//     const trang_thai = searchParams.get("trang_thai") as TrangThaiDonHang | "tat_ca" | null;

//     const where: Partial<Pick<IDonHang, "id_nguoi_dung" | "trang_thai">> = {
//       id_nguoi_dung: nguoiDung.id,
//     };
//     if (trang_thai && trang_thai !== "tat_ca") where.trang_thai = trang_thai;

//     const dsDonHang = await DonHangModel.findAll({
//       where,
//       include: [
//         {
//           model: ChiTietDonHangModel,
//           as: "danh_sach_san_pham",
//           include: [
//             {
//               model: BienTheModel,
//               as: "bien_the",
//               include: [
//                 {
//                   model: SanPhamModel,
//                   as: "san_pham",
//                   attributes: ["id", "ten", "hinh", "gia_goc"],
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//       order: [["ngay_tao", "DESC"]],
//     });

//     // 🧠 Map dữ liệu trả về chuẩn frontend cần
//     const donHangDaXuLy: (IDonHang & {
//       danh_sach_san_pham: {
//         id: number;
//         ten: string;
//         hinh: string;
//         gia: number;
//         so_luong: number;
//         ten_bien_the?: string;
//         gia_them?: number;
//         id_bien_the?: number;
//         json_tuy_chon?: Record<string, string>;
//         json_mon_them?: { ten: string; gia: number }[];
//       }[];
//     })[] = dsDonHang.map((dh) => {
//       const chiTiet = (dh as any).danh_sach_san_pham ?? [];

//       const danh_sach_san_pham = chiTiet.map((ct: any) => {
//         const bienThe = ct.bien_the;
//         const sanPham = bienThe?.san_pham;

//         return {
//           id: ct.id,
//           ten: sanPham?.ten ?? "Không rõ tên",
//           hinh: sanPham?.hinh ?? "/noimg.png",
//           gia: sanPham?.gia_goc ?? 0,
//           so_luong: ct.so_luong,
//           ten_bien_the: bienThe?.ten ?? undefined,
//           gia_them: bienThe?.gia_them ?? undefined,
//           id_bien_the: ct.id_bien_the ?? undefined,
//           json_tuy_chon: ct.json_tuy_chon ? JSON.parse(ct.json_tuy_chon) : {},
//           json_mon_them: ct.json_mon_them ? JSON.parse(ct.json_mon_them) : [],
//         };
//       });

//       return {
//         ...dh.dataValues,
//         danh_sach_san_pham,
//       };
//     });

//     return NextResponse.json(donHangDaXuLy, { status: 200 });
//   } catch (err: unknown) {
//     console.error("🔥 Lỗi khi lấy đơn hàng:", err);
//     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import {
  DonHangModel,
  ChiTietDonHangModel,
  BienTheModel,
  SanPhamModel,
} from "@/app/lib/models";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IDonHang, TrangThaiDonHang } from "@/app/lib/cautrucdata";

// 🧱 Interface cho token payload
interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
  vai_tro: boolean;
}

// 🧩 Hàm parse JSON an toàn (phòng lỗi JSON.parse)
function safeParseJSON<T>(value: unknown, fallback: T): T {
  try {
    if (typeof value !== "string" || value.trim() === "") return fallback;
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export async function GET(req: NextRequest) {
  try {
    const tokenHeader = req.headers.get("authorization");
    if (!tokenHeader) {
      return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });
    }

    const token = tokenHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
    const nguoiDung = jwt.verify(token, secret) as TokenPayload;

    const { searchParams } = new URL(req.url);
    const trang_thai = searchParams.get("trang_thai") as
      | TrangThaiDonHang
      | "tat_ca"
      | null;

    const where: Partial<Pick<IDonHang, "id_nguoi_dung" | "trang_thai">> = {
      id_nguoi_dung: nguoiDung.id,
    };
    if (trang_thai && trang_thai !== "tat_ca") where.trang_thai = trang_thai;

    // ✅ Include đúng alias theo models.ts bạn gửi
    const dsDonHang = await DonHangModel.findAll({
      where,
      include: [
        {
          model: ChiTietDonHangModel,
          as: "chi_tiet_don_hang", // 🔹 alias khớp với models.ts bạn gửi
          include: [
            {
              model: BienTheModel,
              as: "bien_the", // 🔹 alias khớp
              include: [
                {
                  model: SanPhamModel,
                  as: "san_pham", // 🔹 alias khớp
                  attributes: ["id", "ten", "hinh", "gia_goc"],
                },
              ],
            },
          ],
        },
      ],
      order: [["ngay_tao", "DESC"]],
    });

    // ✅ Map dữ liệu trả về frontend đúng định dạng IDonHang
    const donHangDaXuLy = dsDonHang.map((dh) => {
      const dataValues = dh.dataValues as IDonHang & {
        chi_tiet_don_hang?: {
          id: number;
          so_luong: number;
          id_bien_the: number;
          json_tuy_chon: string | null;
          json_mon_them: string | null;
          bien_the?: {
            ten?: string;
            gia_them?: number;
            san_pham?: {
              id: number;
              ten: string;
              hinh: string;
              gia_goc: number;
            };
          };
        }[];
      };

      const danh_sach_san_pham =
        dataValues.chi_tiet_don_hang?.map((ct) => ({
          id: ct.id,
          ten: ct.bien_the?.san_pham?.ten ?? "Không rõ tên",
          hinh: ct.bien_the?.san_pham?.hinh ?? "/noimg.png",
          gia: ct.bien_the?.san_pham?.gia_goc ?? 0,
          so_luong: ct.so_luong,
          ten_bien_the: ct.bien_the?.ten,
          gia_them: ct.bien_the?.gia_them,
          id_bien_the: ct.id_bien_the,
          json_tuy_chon: safeParseJSON<Record<string, string>>(
            ct.json_tuy_chon,
            {}
          ),
          json_mon_them: safeParseJSON<
            { ten: string; gia: number }[]
          >(ct.json_mon_them, []),
        })) ?? [];

      return {
        ...dataValues,
        danh_sach_san_pham,
      };
    });

    return NextResponse.json(donHangDaXuLy, { status: 200 });
  } catch (err: unknown) {
    console.error(
      "🔥 Lỗi khi lấy đơn hàng:",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
  }
}
