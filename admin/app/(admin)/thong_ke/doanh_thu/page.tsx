"use client";

import { useEffect, useState } from "react";

/* Format ngày hiển thị theo filter */
function formatDateVN(value: string, filter: "ngay" | "thang" | "nam"): string {
  if (filter === "nam") return value;
  if (filter === "thang") return value;

  const d = new Date(value);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

/* Format tiền VNĐ */
function formatMoneyVN(value: number): string {
  return value.toLocaleString("vi-VN") + " VNĐ";
}

/* Types */
interface DoanhThuItem {
  ngay: string;
  tong_doanh_thu: number;
  so_don: number;
}

/* Page */
export default function DoanhThuPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [doanhThu, setDoanhThu] = useState<DoanhThuItem[]>([]);
  const [from, setFrom] = useState<string>(today);
  const [to, setTo] = useState<string>(today);
  const [filter, setFilter] = useState<"ngay" | "thang" | "nam">("ngay");
  const [loading, setLoading] = useState<boolean>(false);

  const [maxItem, setMaxItem] = useState<DoanhThuItem | null>(null);
  const [minItem, setMinItem] = useState<DoanhThuItem | null>(null);

  /* Load data */
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
      console.error("Load doanh thu error:", error);
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

  /* Tổng */
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

  /* UI */
  return (
    <div className="w-full min-h-screen px-[5px] py-[5px] space-y-4">
      <h1 className="text-lg md:text-xl font-semibold">
        Thống kê doanh thu
      </h1>

      {/* Bộ lọc */}
      <div className="flex flex-wrap items-end gap-2">
        <div className="flex flex-col">
          <label className="text-xs font-medium">Từ ngày</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-medium">Đến ngày</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-medium">Thống kê theo</label>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "ngay" | "thang" | "nam")
            }
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="ngay">Ngày</option>
            <option value="thang">Tháng</option>
            <option value="nam">Năm</option>
          </select>
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Đang tải..." : "Xem"}
        </button>
      </div>

      {/* Box tổng quan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="rounded-lg p-4 bg-green-50 shadow-sm">
          <p className="text-xs text-green-700 font-medium">
            {label} doanh thu cao nhất
          </p>
          {maxItem ? (
            <>
              <p className="text-sm font-semibold mt-1">
                {formatDateVN(maxItem.ngay, filter)}
              </p>
              <p className="text-lg font-bold text-green-800">
                {formatMoneyVN(maxItem.tong_doanh_thu)}
              </p>
              <p className="text-xs text-gray-600">
                Số đơn: {maxItem.so_don}
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm mt-2">Không có dữ liệu</p>
          )}
        </div>

        <div className="rounded-lg p-4 bg-red-50 shadow-sm">
          <p className="text-xs text-red-700 font-medium">
            {label} doanh thu thấp nhất
          </p>
          {minItem ? (
            <>
              <p className="text-sm font-semibold mt-1">
                {formatDateVN(minItem.ngay, filter)}
              </p>
              <p className="text-lg font-bold text-red-800">
                {formatMoneyVN(minItem.tong_doanh_thu)}
              </p>
              <p className="text-xs text-gray-600">
                Số đơn: {minItem.so_don}
              </p>
            </>
          ) : (
            <p className="text-gray-500 text-sm mt-2">Không có dữ liệu</p>
          )}
        </div>
      </div>

      {/* Bảng */}
      <div className="bg-white shadow-sm rounded-lg p-3">
        <h2 className="text-base font-semibold mb-2">
          Tổng hợp doanh thu
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-[520px] w-full text-sm">
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
