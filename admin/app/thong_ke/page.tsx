"use client";

import { useEffect, useState } from "react";
import { TrendingUp, BarChart3, ShoppingBag, Users, Star } from "lucide-react";
import Link from "next/link";

interface TongHopData {
  doanh_thu_hom_nay: number;
  doanh_thu_thang: number;
  tong_don: number;
  tong_nguoi_dung: number;
  tong_san_pham: number;
  tong_danh_gia: number;

  doanh_thu_7_ngay: Array<{ ngay: string; tong: number }>;
  trang_thai_don: {
    cho_xac_nhan: number;
    dang_giao: number;
    da_giao: number;
    da_huy: number;
  };

  top_5: Array<{
    id: number;
    ten: string;
    tong_so_luong: number;
  }>;
}

export default function ThongKeTongHopPage() {
  const [data, setData] = useState<TongHopData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/thong_ke/tong_hop");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Lỗi tải thống kê tổng hợp:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-6">Đang tải...</div>;

  if (!data) return <div className="p-6 text-red-500">Không thể tải dữ liệu.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thống kê tổng hợp</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        <div className="p-4 bg-white shadow rounded-xl flex items-center space-x-3">
          <TrendingUp className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Doanh thu hôm nay</p>
            <p className="text-lg font-semibold">
              {data.doanh_thu_hom_nay.toLocaleString()}₫
            </p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-xl flex items-center space-x-3">
          <BarChart3 className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Doanh thu tháng</p>
            <p className="text-lg font-semibold">
              {data.doanh_thu_thang.toLocaleString()}₫
            </p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-xl flex items-center space-x-3">
          <ShoppingBag className="text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Tổng đơn hàng</p>
            <p className="text-lg font-semibold">{data.tong_don}</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-xl flex items-center space-x-3">
          <Users className="text-orange-600" />
          <div>
            <p className="text-sm text-gray-500">Người dùng</p>
            <p className="text-lg font-semibold">{data.tong_nguoi_dung}</p>
          </div>
        </div>

        <div className="p-4 bg-white shadow rounded-xl flex items-center space-x-3">
          <Star className="text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Đánh giá</p>
            <p className="text-lg font-semibold">{data.tong_danh_gia}</p>
          </div>
        </div>

      </div>

      {/* Biểu đồ doanh thu 7 ngày */}
      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Doanh thu 7 ngày gần nhất</h2>

        <div className="grid grid-cols-7 gap-3">
          {data.doanh_thu_7_ngay.map((d) => (
            <div key={d.ngay} className="text-center">
              <p className="text-sm text-gray-500">{d.ngay}</p>

              <div className="w-full h-24 bg-gray-100 flex items-end">
                <div
                  className="w-full bg-green-500 rounded"
                  style={{ height: Math.min(d.tong / 20000, 100) + "%" }}
                />
              </div>

              <p className="text-xs mt-1">{d.tong.toLocaleString()}₫</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pie trạng thái đơn hàng */}
      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Trạng thái đơn hàng</h2>

        <div className="grid grid-cols-2 gap-4">
          <p>Chờ xác nhận: {data.trang_thai_don.cho_xac_nhan}</p>
          <p>Đang giao: {data.trang_thai_don.dang_giao}</p>
          <p>Đã giao: {data.trang_thai_don.da_giao}</p>
          <p>Đã hủy: {data.trang_thai_don.da_huy}</p>
        </div>
      </div>

      {/* Top sản phẩm */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Top 5 sản phẩm bán chạy</h2>

        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 text-left">Sản phẩm</th>
              <th className="p-2 text-right">Đã bán</th>
            </tr>
          </thead>
          <tbody>
            {data.top_5.map((sp) => (
              <tr key={sp.id} className="border-b">
                <td className="p-2">{sp.ten}</td>
                <td className="p-2 text-right">{sp.tong_so_luong}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Link
          href="/thong_ke/top_san_pham"
          className="text-blue-600 mt-3 inline-block hover:underline"
        >
          Xem chi tiết →
        </Link>
      </div>
    </div>
  );
}
