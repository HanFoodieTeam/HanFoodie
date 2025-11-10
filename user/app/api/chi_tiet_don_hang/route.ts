// // // // import { NextResponse } from "next/server";
// // // // import mysql from "mysql2/promise";
// // // // import jwt from "jsonwebtoken";
// // // // import { NextRequest } from "next/server";

// // // // // 🔐 Kết nối MySQL
// // // // const pool = mysql.createPool({
// // // //   host: process.env.DB_HOST,
// // // //   user: process.env.DB_USER,
// // // //   password: process.env.DB_PASSWORD,
// // // //   database: process.env.DB_NAME,
// // // // });

// // // // export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
// // // //   try {
// // // //     const id = Number(params.id);
// // // //     const header = req.headers.get("authorization");
// // // //     if (!header)
// // // //       return NextResponse.json({ message: "Thiếu token" }, { status: 401 });

// // // //     const token = header.replace("Bearer ", "");
// // // //     let decoded: any;
// // // //     try {
// // // //       decoded = jwt.verify(token, process.env.JWT_SECRET!);
// // // //     } catch {
// // // //       return NextResponse.json({ message: "Token không hợp lệ" }, { status: 403 });
// // // //     }

// // // //     const conn = await pool.getConnection();

// // // //     // 🔹 Lấy thông tin đơn hàng
// // // //     const [don]: any = await conn.query(
// // // //       `SELECT * FROM don_hang WHERE id = ? AND id_nguoi_dung = ?`,
// // // //       [id, decoded.id]
// // // //     );

// // // //     if (don.length === 0) {
// // // //       conn.release();
// // // //       return NextResponse.json({ message: "Không tìm thấy đơn hàng" }, { status: 404 });
// // // //     }

// // // //     // 🔹 Lấy chi tiết sản phẩm trong đơn
// // // //     const [ct]: any = await conn.query(
// // // //       `SELECT ct.*, bt.ten AS ten_bien_the, sp.ten AS ten_san_pham, sp.hinh, sp.gia_goc
// // // //        FROM chi_tiet_don_hang ct
// // // //        JOIN bien_the bt ON ct.id_bien_the = bt.id
// // // //        JOIN san_pham sp ON bt.id_san_pham = sp.id
// // // //        WHERE ct.id_don_hang = ?`,
// // // //       [id]
// // // //     );

// // // //     conn.release();
// // // //     return NextResponse.json({ don_hang: don[0], chi_tiet: ct });
// // // //   } catch (err) {
// // // //     console.error("Lỗi GET /don_hang/[id]:", err);
// // // //     return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
// // // //   }
// // // // }
// // // import { NextResponse, NextRequest } from "next/server";
// // // import mysql, { RowDataPacket } from "mysql2/promise";
// // // import jwt from "jsonwebtoken";
// // // import { IDonHang, IChiTietDonHang } from "@/app/lib/cautrucdata";

// // // const pool = mysql.createPool({
// // //   host: process.env.DB_HOST,
// // //   user: process.env.DB_USER,
// // //   password: process.env.DB_PASSWORD,
// // //   database: process.env.DB_NAME,
// // //   connectionLimit: 10,
// // // });

// // // // ✅ GET: Chi tiết đơn hàng
// // // export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
// // //   try {
// // //     const idDonHang = Number(params.id);
// // //     if (!idDonHang) {
// // //       return NextResponse.json({ message: "Thiếu ID đơn hàng" }, { status: 400 });
// // //     }

// // //     // 🔐 Xác thực token
// // //     const header = req.headers.get("authorization");
// // //     if (!header)
// // //       return NextResponse.json({ message: "Thiếu token" }, { status: 401 });

// // //     const token = header.replace("Bearer ", "");
// // //     let decoded: { id: number; email: string };
// // //     try {
// // //       decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string };
// // //     } catch {
// // //       return NextResponse.json({ message: "Token không hợp lệ" }, { status: 403 });
// // //     }

// // //     const conn = await pool.getConnection();

// // //     // 🔹 Lấy thông tin đơn hàng
// // //     const [donRows] = await conn.query<RowDataPacket[]>(
// // //       `SELECT * FROM don_hang WHERE id = ? AND id_nguoi_dung = ?`,
// // //       [idDonHang, decoded.id]
// // //     );

// // //     if (donRows.length === 0) {
// // //       conn.release();
// // //       return NextResponse.json({ message: "Không tìm thấy đơn hàng" }, { status: 404 });
// // //     }

// // //     const donHang: IDonHang = donRows[0] as IDonHang;

// // //     // 🔹 Lấy chi tiết sản phẩm trong đơn (giống logic trang đặt hàng)
// // //     const [ctRows] = await conn.query<RowDataPacket[]>(
// // //       `
// // //       SELECT 
// // //         ct.id,
// // //         ct.don_gia,
// // //         ct.so_luong,
// // //         ct.json_tuy_chon,
// // //         ct.json_mon_them,
// // //         ct.thanh_tien,
// // //         bt.id AS id_bien_the,
// // //         bt.ten AS ten_bien_the,
// // //         bt.gia_them,
// // //         sp.id AS id_san_pham,
// // //         sp.ten AS ten_san_pham,
// // //         COALESCE(sp.hinh, '/images/product-placeholder.png') AS hinh,
// // //         sp.gia_goc
// // //       FROM chi_tiet_don_hang ct
// // //       LEFT JOIN bien_the bt ON ct.id_bien_the = bt.id
// // //       LEFT JOIN san_pham sp ON bt.id_san_pham = sp.id
// // //       WHERE ct.id_don_hang = ?
// // //       `,
// // //       [idDonHang]
// // //     );

// // //     const chiTiet: IChiTietDonHang[] = ctRows.map((row) => ({
// // //       id: row.id,
// // //       id_don_hang: idDonHang,
// // //       don_gia: row.don_gia,
// // //       so_luong: row.so_luong,
// // //       thanh_tien: row.thanh_tien,
// // //       json_tuy_chon: row.json_tuy_chon,
// // //       json_mon_them: row.json_mon_them,
// // //       id_bien_the: row.id_bien_the,
// // //       ten_san_pham: row.ten_san_pham,
// // //       ten_bien_the: row.ten_bien_the,
// // //       hinh: row.hinh,
// // //     }));

// // //     conn.release();

// // //     return NextResponse.json({ don_hang: donHang, chi_tiet: chiTiet });
// // //   } catch (err) {
// // //     console.error("❌ Lỗi /api/don_hang/[id]:", err);
// // //     return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
// // //   }
// // // }
// // import { NextRequest, NextResponse } from "next/server";
// // import jwt from "jsonwebtoken";
// // import {
// //   DonHangModel,
// //   ChiTietDonHangModel,
// //   BienTheModel,
// //   SanPhamModel,
// // } from "@/app/lib/models";
// // import { IDonHang, IChiTietDonHang } from "@/app/lib/cautrucdata";

// // interface JwtPayload {
// //   id: number;
// //   email: string;
// //   iat?: number;
// //   exp?: number;
// // }

// // export async function GET(
// //   req: NextRequest,
// //   { params }: { params: { id: string } }
// // ) {
// //   try {
// //     const auth = req.headers.get("authorization");
// //     if (!auth)
// //       return NextResponse.json({ message: "Thiếu token" }, { status: 401 });

// //     const token = auth.replace("Bearer ", "");
// //     let decoded: JwtPayload;
// //     try {
// //       decoded = jwt.verify(
// //         token,
// //         process.env.JWT_SECRET || "HanFoodieSecretKey123!"
// //       ) as JwtPayload;
// //     } catch {
// //       return NextResponse.json({ message: "Token không hợp lệ" }, { status: 403 });
// //     }

// //     const donHang = await DonHangModel.findOne({
// //       where: { id: params.id, id_nguoi_dung: decoded.id },
// //       include: [
// //         {
// //           model: ChiTietDonHangModel,
// //           as: "chi_tiet_don_hang",
// //           include: [
// //             {
// //               model: BienTheModel,
// //               as: "bien_the",
// //               include: [
// //                 {
// //                   model: SanPhamModel,
// //                   as: "san_pham",
// //                   attributes: ["id", "ten", "hinh", "gia_goc"],
// //                 },
// //               ],
// //             },
// //           ],
// //         },
// //       ],
// //     });

// //     if (!donHang)
// //       return NextResponse.json({ message: "Không tìm thấy đơn hàng" }, { status: 404 });

// //     const donHangData = donHang.toJSON() as IDonHang & {
// //       chi_tiet_don_hang: (IChiTietDonHang & {
// //         bien_the?: {
// //           ten: string;
// //           san_pham?: { ten: string; hinh: string; gia_goc: number };
// //         };
// //       })[];
// //     };

// //     return NextResponse.json({
// //       don_hang: donHangData,
// //       chi_tiet: donHangData.chi_tiet_don_hang,
// //     });
// //   } catch (err) {
// //     console.error("Lỗi GET /don_hang/[id]:", err);
// //     return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
// // //   }
// // }
// import { NextRequest, NextResponse } from "next/server";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import {
//   DonHangModel,
//   ChiTietDonHangModel,
//   SanPhamModel,
//   BienTheModel,
// } from "@/app/lib/models";
// import {
//   IDonHang,
//   TrangThaiDonHang,
// } from "@/app/lib/cautrucdata";

// // Kiểu Token Payload
// interface TokenPayload extends JwtPayload {
//   id: number;
//   email: string;
//   vai_tro: boolean;
// }

// export async function GET(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const tokenHeader = req.headers.get("authorization");
//     if (!tokenHeader)
//       return NextResponse.json(
//         { thong_bao: "Thiếu token" },
//         { status: 401 }
//       );

//     const token = tokenHeader.split(" ")[1];
//     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
//     const nguoiDung = jwt.verify(token, secret) as TokenPayload;

//     const id = Number(params.id);
//     if (Number.isNaN(id)) {
//       return NextResponse.json(
//         { thong_bao: "ID không hợp lệ" },
//         { status: 400 }
//       );
//     }

//     // Tìm đơn hàng + include đủ cấp
//     const don = await DonHangModel.findOne({
//       where: {
//         id,
//         id_nguoi_dung: nguoiDung.id, // chỉ cho xem đơn của chính mình
//       },
//       include: [
//         {
//           model: ChiTietDonHangModel,
//           as: "chiTiet",
//           include: [
//             {
//               model: BienTheModel,
//               as: "bien_the",
//             },
//             {
//               model: SanPhamModel,
//               as: "san_pham",
//             },
//           ],
//         },
//       ],
//     });

//     if (!don)
//       return NextResponse.json(
//         { thong_bao: "Không tìm thấy đơn hàng" },
//         { status: 404 }
//       );

//     // Ép kiểu
//     const ketQua = don.toJSON() as IDonHang;

//     return NextResponse.json(ketQua, { status: 200 });
//   } catch (err) {
//     console.error("🔥 Lỗi lấy chi tiết đơn hàng:", err);
//     return NextResponse.json(
//       { thong_bao: "Lỗi server" },
//       { status: 500 }
//     );
//   }
// }
