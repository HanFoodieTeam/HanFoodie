"use client";

import { useEffect, useState } from "react";

/* ================== FORMAT ================== */
function formatDateVN(value: string, filter: "ngay" | "thang" | "nam"): string {
  if (filter === "nam") return value;        // 2025
  if (filter === "thang") return value;      // 12/2025

  const d = new Date(value);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

function formatMoneyVN(value: number): string {
  return value.toLocaleString("vi-VN") + " VNĐ";
}

/* ================== TYPES ================== */
interface DoanhThuItem {
  ngay: string;
  tong_doanh_thu: number;
  so_don: number;
}

/* ================== PAGE ================== */
export default function DoanhThuPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [doanhThu, setDoanhThu] = useState<DoanhThuItem[]>([]);
  const [from, setFrom] = useState<string>(today);
  const [to, setTo] = useState<string>(today);
  const [filter, setFilter] = useState<"ngay" | "thang" | "nam">("ngay");
  const [loading, setLoading] = useState<boolean>(false);

  const [maxItem, setMaxItem] = useState<DoanhThuItem | null>(null);
  const [minItem, setMinItem] = useState<DoanhThuItem | null>(null);

  /* ================== LOAD DATA ================== */
  const loadData = async (): Promise<void> => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ from, to, filter });
      const res = await fetch(`/api/thong_ke/doanh_thu?${params.toString()}`);
      const json = await res.json();

      const data: DoanhThuItem[] = Array.isArray(json.doanhThu)
        ? json.doanhThu.map((item: DoanhThuItem) => ({
          ngay: String(item.ngay),
          tong_doanh_thu: Number(item.tong_doanh_thu),
          so_don: Number(item.so_don),
        }))
        : [];

      setDoanhThu(data);

      if (data.length > 0) {
        const sorted = [...data].sort(
          (a, b) => b.tong_doanh_thu - a.tong_doanh_thu
        );
        setMaxItem(sorted[0]);
        setMinItem(sorted[sorted.length - 1]);
      } else {
        setMaxItem(null);
        setMinItem(null);
      }
    } catch (error) {
      console.error("Load data error:", error);
      setDoanhThu([]);
      setMaxItem(null);
      setMinItem(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ================== TOTAL ================== */
  const totalDoanhThu = doanhThu.reduce(
    (sum, item) => sum + item.tong_doanh_thu,
    0
  );

  const totalSoDon = doanhThu.reduce(
    (sum, item) => sum + item.so_don,
    0
  );

  const label =
    filter === "ngay" ? "Ngày" : filter === "thang" ? "Tháng" : "Năm";

  /* ================== UI ================== */
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Thống Kê Doanh Thu</h1>

      {/* ================= FILTER ================= */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Từ ngày</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Đến ngày</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Thống kê theo</label>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "ngay" | "thang" | "nam")
            }
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="ngay">Ngày</option>
            <option value="thang">Tháng</option>
            <option value="nam">Năm</option>
          </select>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Đang tải..." : "Xem"}
        </button>
      </div>


      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MAX */}
        <div className="rounded-xl p-4 bg-green-50 shadow-lg">
          <p className="text-sm text-green-700 font-medium">
            {label} doanh thu cao nhất
          </p>
          {maxItem ? (
            <>
              <p className="text-lg font-semibold mt-1">
                {formatDateVN(maxItem.ngay, filter)}
              </p>
              <p className="text-xl font-bold text-green-800">
                {formatMoneyVN(maxItem.tong_doanh_thu)}
              </p>
              <p className="text-sm text-gray-600">
                Số đơn: {maxItem.so_don}
              </p>
            </>
          ) : (
            <p className="text-gray-500 mt-2">Không có dữ liệu</p>
          )}
        </div>

        {/* MIN */}
        <div className="rounded-xl p-4 bg-red-50 shadow-lg">
          <p className="text-sm text-red-700 font-medium">
            {label} doanh thu thấp nhất
          </p>
          {minItem ? (
            <>
              <p className="text-lg font-semibold mt-1">
                {formatDateVN(minItem.ngay, filter)}
              </p>
              <p className="text-xl font-bold text-red-800">
                {formatMoneyVN(minItem.tong_doanh_thu)}
              </p>
              <p className="text-sm text-gray-600">
                Số đơn: {minItem.so_don}
              </p>
            </>
          ) : (
            <p className="text-gray-500 mt-2">Không có dữ liệu</p>
          )}
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-3">Tổng hợp doanh thu</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">{label}</th>
                <th className="p-2 text-right">Doanh thu</th>
                <th className="p-2 text-right">Số đơn</th>
              </tr>
            </thead>
            <tbody>
              {doanhThu.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-3 text-center text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                doanhThu.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2">
                      {formatDateVN(item.ngay, filter)}
                    </td>
                    <td className="p-2 text-right">
                      {formatMoneyVN(item.tong_doanh_thu)}
                    </td>
                    <td className="p-2 text-right">{item.so_don}</td>
                  </tr>
                ))
              )}
              {doanhThu.length > 0 && (
                <tr className="font-semibold bg-gray-100">
                  <td className="p-2">Tổng</td>
                  <td className="p-2 text-right">
                    {formatMoneyVN(totalDoanhThu)}
                  </td>
                  <td className="p-2 text-right">{totalSoDon}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
