"use client";

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface DoanhThuItem {
  ngay: string;
  tong_doanh_thu: number;
  so_don: number;
}

export default function DoanhThuPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [doanhThu, setDoanhThu] = useState<DoanhThuItem[]>([]);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [filter, setFilter] = useState<"ngay" | "thang" | "nam">("ngay");
  const [loading, setLoading] = useState(false);
  const [maxText, setMaxText] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ from, to, filter });
      const res = await fetch(`/api/thong_ke/doanh_thu?${params.toString()}`);
      const json = await res.json();
      setDoanhThu(json.doanhThu);

      // Xác định giá trị cao nhất
      if (json.doanhThu.length > 0) {
        const max = json.doanhThu.reduce((prev: DoanhThuItem, curr: DoanhThuItem) =>
          BigInt(curr.tong_doanh_thu) > BigInt(prev.tong_doanh_thu) ? curr : prev
        );
        setMaxText(
          filter === "ngay"
            ? `Ngày có doanh thu cao nhất: ${max.ngay} (${max.tong_doanh_thu.toLocaleString()} VNĐ)`
            : filter === "thang"
            ? `Tháng có doanh thu cao nhất: ${max.ngay} (${max.tong_doanh_thu.toLocaleString()} VNĐ)`
            : `Năm có doanh thu cao nhất: ${max.ngay} (${max.tong_doanh_thu.toLocaleString()} VNĐ)`
        );
      } else {
        setMaxText("");
      }
    } catch (err) {
      console.error(err);
      setMaxText("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalDoanhThu = doanhThu.reduce((acc, item) => acc + BigInt(item.tong_doanh_thu), BigInt(0));
  const totalSoDon = doanhThu.reduce((acc, item) => acc + item.so_don, 0);

  const chartData = {
    labels: doanhThu.map((d) => d.ngay),
    datasets: [
      {
        label: "Doanh thu",
        data: doanhThu.map((d) => Number(d.tong_doanh_thu)),
        fill: true,
        backgroundColor: "rgba(34,197,94,0.2)",
        borderColor: "rgba(34,197,94,1)",
        tension: 0.3,
      },
      {
        label: "Số đơn",
        data: doanhThu.map((d) => d.so_don),
        fill: true,
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "rgba(59,130,246,1)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Thống kê doanh thu</h1>

      {/* Bộ lọc */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
        <div className="flex items-center space-x-2">
          <label>From:</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <div className="flex items-center space-x-2">
          <label>To:</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="border rounded px-2 py-1" />
        </div>
        <div className="flex items-center space-x-2">
          <label>Hiển thị theo:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value as "ngay" | "thang" | "nam")} className="border rounded px-2 py-1">
            <option value="ngay">Ngày</option>
            <option value="thang">Tháng</option>
            <option value="nam">Năm</option>
          </select>
        </div>
        <button onClick={loadData} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Xem</button>
      </div>

      {/* Thông báo cao nhất */}
      {maxText && <p className="text-green-600 font-semibold">{maxText}</p>}

      {/* Biểu đồ */}
      <div className="bg-white shadow rounded-xl p-4 mb-6">
        <Line data={chartData} />
      </div>

      {/* Table tổng hợp */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-3">Tổng hợp doanh thu</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border-b border-gray-200 text-left">{filter === "ngay" ? "Ngày" : filter === "thang" ? "Tháng" : "Năm"}</th>
                <th className="p-2 border-b border-gray-200 text-right">Tổng doanh thu</th>
                <th className="p-2 border-b border-gray-200 text-right">Số đơn</th>
              </tr>
            </thead>
            <tbody>
              {doanhThu.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-3 text-gray-500">Không có dữ liệu</td>
                </tr>
              ) : (
                doanhThu.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="p-2 border-b border-gray-200">{item.ngay}</td>
                    <td className="p-2 border-b border-gray-200 text-right">{Number(item.tong_doanh_thu).toLocaleString()} VNĐ</td>
                    <td className="p-2 border-b border-gray-200 text-right">{item.so_don}</td>
                  </tr>
                ))
              )}
              {doanhThu.length > 0 && (
                <tr className="bg-gray-100 font-semibold">
                  <td className="p-2 border border-gray-300/50">Tổng</td>
                  <td className="p-2 border border-gray-300/50 text-right">{totalDoanhThu.toLocaleString()} VNĐ</td>
                  <td className="p-2 border border-gray-300/50 text-right">{totalSoDon}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
