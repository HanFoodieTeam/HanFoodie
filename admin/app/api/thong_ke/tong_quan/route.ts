import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { QueryTypes } from "sequelize";

type FilterType = "ngay" | "thang" | "nam";

interface DashboardRow {
  tong_doanh_thu: number;
  ngay?: string;
  thang?: string;
  nam?: string;
}

interface SoLuongRow {
  tong: number;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const filter = (searchParams.get("filter") as FilterType) ?? "ngay";
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    let whereDate = "";
    if (from && to) {
      whereDate = `WHERE ngay_tao BETWEEN '${from} 00:00:00' AND '${to} 23:59:59'`;
    }

    /* Thong ke tong */

    const [tongDoanhThu] = await db.query<DashboardRow>(
      `SELECT COALESCE(SUM(so_tien_thanh_toan),0) AS tong_doanh_thu
       FROM don_hang ${whereDate}`,
      { type: QueryTypes.SELECT }
    );

    const [tongDon] = await db.query<SoLuongRow>(
      `SELECT COUNT(*) AS tong FROM don_hang ${whereDate}`,
      { type: QueryTypes.SELECT }
    );

    const [tongNguoiDung] = await db.query<SoLuongRow>(
      `SELECT COUNT(*) AS tong FROM nguoi_dung`,
      { type: QueryTypes.SELECT }
    );

    const [tongSanPham] = await db.query<SoLuongRow>(
      `SELECT COUNT(*) AS tong FROM san_pham`,
      { type: QueryTypes.SELECT }
    );

    const [tongDanhGia] = await db.query<SoLuongRow>(
      `SELECT COUNT(*) AS tong FROM danh_gia`,
      { type: QueryTypes.SELECT }
    );

    /* Bieu do */

    let selectTime: string;
    let groupBy: string;

    if (filter === "thang") {
      selectTime = `DATE_FORMAT(ngay_tao, '%Y-%m') AS thang`;
      groupBy = `YEAR(ngay_tao), MONTH(ngay_tao)`;
    } else if (filter === "nam") {
      selectTime = `YEAR(ngay_tao) AS nam`;
      groupBy = `YEAR(ngay_tao)`;
    } else {
      selectTime = `DATE(ngay_tao) AS ngay`;
      groupBy = `DATE(ngay_tao)`;
    }

    const doanhThu = await db.query<DashboardRow>(
      `SELECT ${selectTime},
              COALESCE(SUM(so_tien_thanh_toan),0) AS tong_doanh_thu
       FROM don_hang
       ${whereDate}
       GROUP BY ${groupBy}
       ORDER BY ${groupBy} ASC`,
      { type: QueryTypes.SELECT }
    );

    return NextResponse.json({
      tong_doanh_thu: tongDoanhThu?.tong_doanh_thu ?? 0,
      tong_don: tongDon?.tong ?? 0,
      tong_nguoi_dung: tongNguoiDung?.tong ?? 0,
      tong_san_pham: tongSanPham?.tong ?? 0,
      tong_danh_gia: tongDanhGia?.tong ?? 0,
      filter,
      from,
      to,
      doanh_thu: doanhThu,
    });

  } catch (error) {
    console.error(" Lỗi thống kê tổng quan:", error);
    return NextResponse.json(
      { error: "Lỗi server" },
      { status: 500 }
    );
  }
}
