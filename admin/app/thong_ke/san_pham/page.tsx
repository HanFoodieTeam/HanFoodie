"use client";

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SanPhamItem {
  id: number;
  ten: string;
  hinh: string | null;
  tong_so_luong: number;
  tong_doanh_thu: number;
}

interface ApiResponse {
  topSanPham: SanPhamItem[];
}

// Format VNĐ: 12345678 -> 12.345.678 VNĐ
const formatVND = (value: number | string | bigint) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " VNĐ";

export default function SanPhamPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [sanPham, setSanPham] = useState<SanPhamItem[]>([]);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [filter, setFilter] = useState<"ngay" | "thang" | "nam">("ngay");
  const [loading, setLoading] = useState(false);
  const [maxText, setMaxText] = useState<React.ReactNode>("");

  const loadData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ from, to, filter });
      const res = await fetch(`/api/thong_ke/san_pham?${params.toString()}`);
      const json: ApiResponse = await res.json();
      setSanPham(json.topSanPham);

      if (json.topSanPham.length > 0) {
        const max = json.topSanPham[0];
        const min = json.topSanPham[json.topSanPham.length - 1];

        setMaxText(
          <span className="text-black">
            <span className="text-green-600 font-semibold">
              Sản phẩm bán nhiều nhất: {max.ten} ({max.tong_so_luong}) - {formatVND(max.tong_doanh_thu)}
            </span>{" "}
            |{" "}
            <span className="text-red-600 font-semibold">
              Bán ít nhất: {min.ten} ({min.tong_so_luong}) - {formatVND(min.tong_doanh_thu)}
            </span>
          </span>
        );
      } else {
        setMaxText(<span className="text-black">Không có dữ liệu</span>);
      }
    } catch (err) {
      console.error(err);
      setMaxText(<span className="text-red-600 font-semibold">Lỗi load dữ liệu</span>);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const chartData = {
    labels: sanPham.map((sp) => sp.ten),
    datasets: [
      {
        label: "Số lượng bán",
        data: sanPham.map((sp) => sp.tong_so_luong),
        backgroundColor: "rgba(34,197,94,0.7)", // màu xanh
      },
      {
        label: "Doanh thu",
        data: sanPham.map((sp) => sp.tong_doanh_thu),
        backgroundColor: "rgba(59,130,246,0.7)", // màu xanh dương
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Thống Kê Sản Phẩm</h1>

      {/* Bộ lọc */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
        <div className="flex items-center space-x-2">
          <label>Từ:</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label>Đến:</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label>Hiển thị theo:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "ngay" | "thang" | "nam")}
            className="border rounded px-2 py-1"
          >
            <option value="ngay">Ngày</option>
            <option value="thang">Tháng</option>
            <option value="nam">Năm</option>
          </select>
        </div>
        <button
          onClick={loadData}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Xem
        </button>
      </div>

      {/* Thông báo sản phẩm */}
      {maxText && <div className="mb-3">{maxText}</div>}

      {/* Biểu đồ cột */}
      <div className="bg-white shadow rounded-xl p-4 mb-6">
        {loading ? <p>Đang tải...</p> : <Bar data={chartData} />}
      </div>

      {/* Bảng chi tiết */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-3">Thống Kê Chi Tiết</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border-b border-gray-200 text-left">Tên sản phẩm</th>
                <th className="p-2 border-b border-gray-200 text-right">Số lượng bán</th>
                <th className="p-2 border-b border-gray-200 text-right">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {sanPham.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-3 text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                sanPham.map((sp) => (
                  <tr key={sp.id} className="hover:bg-gray-50 transition">
                    <td className="p-2 border-b border-gray-200">{sp.ten}</td>
                    <td className="p-2 border-b border-gray-200 text-right">{sp.tong_so_luong}</td>
                    <td className="p-2 border-b border-gray-200 text-right">{formatVND(sp.tong_doanh_thu)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
