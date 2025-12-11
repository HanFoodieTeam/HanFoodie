import { NextResponse } from "next/server";
import { db } from "@/app/lib/database";
import { QueryTypes } from "sequelize";

interface DashboardRow { tong_doanh_thu: number; ngay?: string; thang?: string; nam?: string }
interface SoLuongRow { tong: number }

export async function GET() {
  try {
    // Tổng doanh thu từ trước tới nay
    const tongDoanhThu = await db.query<DashboardRow>(
      `SELECT COALESCE(SUM(so_tien_thanh_toan),0) AS tong_doanh_thu FROM don_hang`,
      { type: QueryTypes.SELECT }
    );

    // Tổng số đơn từ trước tới nay
    const tongDon = await db.query<SoLuongRow>(
      `SELECT COUNT(*) AS tong FROM don_hang`,
      { type: QueryTypes.SELECT }
    );

    // Tổng số người dùng
    const tongNguoiDung = await db.query<SoLuongRow>(
      `SELECT COUNT(*) AS tong FROM nguoi_dung`,
      { type: QueryTypes.SELECT }
    );

    // Tổng số sản phẩm
    const tongSanPham = await db.query<SoLuongRow>(
      `SELECT COUNT(*) AS tong FROM san_pham`,
      { type: QueryTypes.SELECT }
    );

    // Tổng số đánh giá
    const tongDanhGia = await db.query<SoLuongRow>(
      `SELECT COUNT(*) AS tong FROM danh_gia`,
      { type: QueryTypes.SELECT }
    );

    // Doanh thu theo ngày từ trước tới nay
    const doanhThuTheoNgay = await db.query<DashboardRow>(
      `SELECT DATE(ngay_tao) AS ngay, COALESCE(SUM(so_tien_thanh_toan),0) AS tong_doanh_thu
       FROM don_hang
       GROUP BY DATE(ngay_tao)
       ORDER BY DATE(ngay_tao) ASC`,
      { type: QueryTypes.SELECT }
    );

    return NextResponse.json({
      tong_doanh_thu: tongDoanhThu[0]?.tong_doanh_thu ?? 0,
      tong_don: tongDon[0]?.tong ?? 0,
      tong_nguoi_dung: tongNguoiDung[0]?.tong ?? 0,
      tong_san_pham: tongSanPham[0]?.tong ?? 0,
      tong_danh_gia: tongDanhGia[0]?.tong ?? 0,
      doanh_thu_theo_ngay: doanhThuTheoNgay
    });
  } catch (error) {
    console.error("🔥 Lỗi thống kê tổng quan:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
