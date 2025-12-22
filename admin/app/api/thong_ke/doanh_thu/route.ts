import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { QueryTypes } from "sequelize";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const from = url.searchParams.get("from") || new Date().toISOString().slice(0, 10);
    const to = url.searchParams.get("to") || new Date().toISOString().slice(0, 10);
    const filter = url.searchParams.get("filter") || "ngay"; // "ngay" | "thang" | "nam"

    // Biểu đồ và tổng hợp
    let groupExpr = "DATE(ngay_tao)";
    if (filter === "thang") groupExpr = "DATE_FORMAT(ngay_tao,'%Y-%m')";
    if (filter === "nam") groupExpr = "YEAR(ngay_tao)";

    const doanhThu = await db.query(
      `
      SELECT ${groupExpr} AS ngay,
             SUM(so_tien_thanh_toan) AS tong_doanh_thu,
             COUNT(*) AS so_don
      FROM don_hang
      WHERE DATE(ngay_tao) BETWEEN :from AND :to
      GROUP BY ${groupExpr}
      ORDER BY ${groupExpr} ASC
      `,
      { replacements: { from, to }, type: QueryTypes.SELECT }
    );

    return NextResponse.json({ doanhThu });
  } catch (err) {
    console.error("Lỗi API doanh thu:", err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
