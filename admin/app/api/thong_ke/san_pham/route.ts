// app/api/thong_ke/san_pham/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { QueryTypes } from "sequelize";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from") ?? "";
    const to = searchParams.get("to") ?? "";
    const filter = searchParams.get("filter") ?? "ngay"; // ngay / thang / nam

    // Điều kiện WHERE
    const whereDate =
      from && to
        ? `WHERE DATE(dh.ngay_tao) BETWEEN '${from}' AND '${to}'`
        : "";

    // Lấy tổng sản phẩm bán ra và doanh thu
    const topSanPham = await db.query(
      `
      SELECT sp.id, sp.ten, sp.hinh, 
             SUM(ct.so_luong) AS tong_so_luong,
             SUM(ct.thanh_tien) AS tong_doanh_thu
      FROM chi_tiet_don_hang ct
      JOIN bien_the bt ON ct.id_bien_the = bt.id
      JOIN san_pham sp ON bt.id_san_pham = sp.id
      JOIN don_hang dh ON dh.id = ct.id_don_hang
      ${whereDate}
      GROUP BY sp.id
      ORDER BY tong_so_luong DESC
      `,
      { type: QueryTypes.SELECT }
    );

    return NextResponse.json({
      topSanPham,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
