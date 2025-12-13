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

interface DanhGiaItem {
  id: number;
  ten: string;
  hinh?: string | null;
  tong_danh_gia: number;
  trung_binh: number;
  sao_1: number;
  sao_2: number;
  sao_3: number;
  sao_4: number;
  sao_5: number;
}

export default function DanhGiaPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [danhGia, setDanhGia] = useState<DanhGiaItem[]>([]);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [filter, setFilter] = useState<"ngay" | "thang" | "nam">("ngay");
  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState<{
    mostRated?: DanhGiaItem;
    leastRated?: DanhGiaItem;
    bestRated?: DanhGiaItem;
    worstRated?: DanhGiaItem;
  }>({});

  const loadData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ from, to, filter });
      const res = await fetch(`/api/thong_ke/danh_gia?${params.toString()}`);
      const json: DanhGiaItem[] = await res.json();
      setDanhGia(json);

      if (json.length > 0) {
        setSummary({
          mostRated: json.reduce((a, b) => (a.tong_danh_gia > b.tong_danh_gia ? a : b)),
          leastRated: json.reduce((a, b) => (a.tong_danh_gia < b.tong_danh_gia ? a : b)),
          bestRated: json.reduce((a, b) => (a.trung_binh > b.trung_binh ? a : b)),
          worstRated: json.reduce((a, b) => (a.trung_binh < b.trung_binh ? a : b)),
        });
      } else {
        setSummary({});
      }
    } catch (err) {
      console.error(err);
      setSummary({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const chartData = {
    labels: danhGia.map((sp) => sp.ten),
    datasets: [
      { label: "1★", data: danhGia.map((sp) => sp.sao_1), backgroundColor: "rgba(248,113,113,0.7)" },
      { label: "2★", data: danhGia.map((sp) => sp.sao_2), backgroundColor: "rgba(250,204,21,0.7)" },
      { label: "3★", data: danhGia.map((sp) => sp.sao_3), backgroundColor: "rgba(251,191,36,0.7)" },
      { label: "4★", data: danhGia.map((sp) => sp.sao_4), backgroundColor: "rgba(34,197,94,0.7)" },
      { label: "5★", data: danhGia.map((sp) => sp.sao_5), backgroundColor: "rgba(6,182,212,0.7)" },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Phân bố đánh giá theo sao" },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true },
    },
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Thống kê đánh giá sản phẩm</h1>

      {/* Bộ lọc */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <div className="flex items-center space-x-2">
          <label className="font-medium">Từ:</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <div className="flex items-center space-x-2">
          <label className="font-medium">Đến:</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <div className="flex items-center space-x-2">
          <label className="font-medium">Hiển thị theo:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value as "ngay" | "thang" | "nam")} className="border rounded px-2 py-1">
            <option value="ngay">Ngày</option>
            <option value="thang">Tháng</option>
            <option value="nam">Năm</option>
          </select>
        </div>
        <button onClick={loadData} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
          Xem
        </button>
      </div>

      {/* Card summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {summary.mostRated && (
          <div className="p-4 bg-white shadow rounded-xl text-center">
            <p className="text-sm text-gray-500">Đánh giá nhiều nhất</p>
            <p className="text-lg font-semibold">{summary.mostRated.ten}</p>
            <p>{summary.mostRated.tong_danh_gia} đánh giá</p>
          </div>
        )}
        {summary.leastRated && (
          <div className="p-4 bg-white shadow rounded-xl text-center">
            <p className="text-sm text-gray-500">Đánh giá ít nhất</p>
            <p className="text-lg font-semibold">{summary.leastRated.ten}</p>
            <p>{summary.leastRated.tong_danh_gia} đánh giá</p>
          </div>
        )}
        {summary.bestRated && (
          <div className="p-4 bg-white shadow rounded-xl text-center">
            <p className="text-sm text-gray-500">Sản phẩm tốt nhất</p>
            <p className="text-lg font-semibold">{summary.bestRated.ten}</p>
            <p>{summary.bestRated.trung_binh.toFixed(1)}★</p>
          </div>
        )}
        {summary.worstRated && (
          <div className="p-4 bg-white shadow rounded-xl text-center">
            <p className="text-sm text-gray-500">Sản phẩm kém nhất</p>
            <p className="text-lg font-semibold">{summary.worstRated.ten}</p>
            <p>{summary.worstRated.trung_binh.toFixed(1)}★</p>
          </div>
        )}
      </div>

      {/* Biểu đồ stacked */}
      <div className="bg-white shadow rounded-xl p-4">
        {loading ? <p>Đang tải...</p> : <Bar data={chartData} options={chartOptions} />}
      </div>

      {/* Bảng chi tiết */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-3">Chi tiết đánh giá</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border-b border-gray-200 text-left">Sản phẩm</th>
                <th className="p-2 border-b border-gray-200 text-right">Tổng đánh giá</th>
                <th className="p-2 border-b border-gray-200 text-right">Trung bình</th>
                <th className="p-2 border-b border-gray-200 text-right">1★</th>
                <th className="p-2 border-b border-gray-200 text-right">2★</th>
                <th className="p-2 border-b border-gray-200 text-right">3★</th>
                <th className="p-2 border-b border-gray-200 text-right">4★</th>
                <th className="p-2 border-b border-gray-200 text-right">5★</th>
              </tr>
            </thead>
            <tbody>
              {danhGia.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center p-3 text-gray-500">Không có dữ liệu</td>
                </tr>
              ) : (
                danhGia.map((sp) => (
                  <tr key={sp.id} className="hover:bg-gray-50 transition">
                    <td className="p-2 border-b border-gray-200 flex items-center space-x-2">
                      {sp.hinh ? (
                        <img src={sp.hinh} alt={sp.ten} className="w-12 h-12 rounded object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center text-gray-400">SP</div>
                      )}
                      <span>{sp.ten}</span>
                    </td>
                    <td className="p-2 border-b border-gray-200 text-right">{sp.tong_danh_gia}</td>
                    <td className="p-2 border-b border-gray-200 text-right">{sp.trung_binh.toFixed(1)}</td>
                    <td className="p-2 border-b border-gray-200 text-right">{sp.sao_1}</td>
                    <td className="p-2 border-b border-gray-200 text-right">{sp.sao_2}</td>
                    <td className="p-2 border-b border-gray-200 text-right">{sp.sao_3}</td>
                    <td className="p-2 border-b border-gray-200 text-right">{sp.sao_4}</td>
                    <td className="p-2 border-b border-gray-200 text-right">{sp.sao_5}</td>
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
