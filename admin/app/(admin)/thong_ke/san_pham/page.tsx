"use client";

import React, { useEffect, useMemo, useState } from "react";

/* ================== TYPES ================== */
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

/* ================== FORMAT ================== */
const formatVND = (value: number) =>
  value.toLocaleString("vi-VN") + " VNĐ";

/* ================== PAGE ================== */
export default function SanPhamPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [sanPham, setSanPham] = useState<SanPhamItem[]>([]);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [filterTime, setFilterTime] = useState<"ngay" | "thang" | "nam">("ngay");
  const [filterTable, setFilterTable] = useState<
    "all" | "ban_chay" | "ban_cham" | "yeu_thich"
  >("all");
  const [loading, setLoading] = useState(false);

  /* ================== LOAD DATA ================== */
  const loadData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ from, to, filter: filterTime });
      const res = await fetch(`/api/thong_ke/san_pham?${params.toString()}`);
      const json: ApiResponse = await res.json();
      setSanPham(
        Array.isArray(json.topSanPham)
          ? json.topSanPham.map((sp) => ({
            ...sp,
            tong_so_luong: Number(sp.tong_so_luong),
            tong_doanh_thu: Number(sp.tong_doanh_thu),
          }))
          : []
      );
    } catch (err) {
      console.error(err);
      setSanPham([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ================== CALCULATE ================== */
  const banChayNhat = sanPham[0];
  const banChamNhat = sanPham[sanPham.length - 1];
  const yeuThichNhat = sanPham.reduce<SanPhamItem | null>(
    (max, item) =>
      !max || item.tong_so_luong > max.tong_so_luong ? item : max,
    null
  );

  /* ================== FILTER TABLE ================== */
  const filteredTableData = useMemo(() => {
    if (filterTable === "ban_chay") return sanPham.slice(0, 5);
    if (filterTable === "ban_cham") return sanPham.slice(-5);
    if (filterTable === "yeu_thich")
      return yeuThichNhat ? [yeuThichNhat] : [];
    return sanPham;
  }, [filterTable, sanPham, yeuThichNhat]);

  const labelTime =
    filterTime === "ngay"
      ? "Ngày"
      : filterTime === "thang"
        ? "Tháng"
        : "Năm";

  /* ================== UI ================== */
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Thống Kê Sản Phẩm</h1>

      {/* ================= FILTER TIME ================= */}
      <div className="flex flex-wrap items-end gap-4 mb-4">
        {/* Từ ngày */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Từ ngày</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Đến ngày */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Đến ngày</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Thống kê theo */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Thống kê theo</label>
          <select
            value={filterTime}
            onChange={(e) =>
              setFilterTime(e.target.value as "ngay" | "thang" | "nam")
            }
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="ngay">Ngày</option>
            <option value="thang">Tháng</option>
            <option value="nam">Năm</option>
          </select>
        </div>

        {/* Button Xem */}
        <button
          onClick={loadData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Xem
        </button>
      </div>


      {/* ================= BOX ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* BÁN CHẠY */}
        <Box
          title={`🔥 BÁN CHẠY NHẤT `} // ${labelTime}
          item={banChayNhat}
        />
        {/* BÁN CHẬM */}
        <Box
          title={`🐌 BÁN CHẬM NHẤT `}
          item={banChamNhat}
          color="red"
        />
        {/* YÊU THÍCH */}
        <Box
          title={`❤️ YÊU THÍCH NHẤT `}
          item={yeuThichNhat}
          color="pink"
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white shadow rounded-xl p-4">
        <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
          <h2 className="text-xl font-semibold">Thống Kê Chi Tiết</h2>
          <select
            value={filterTable}
            onChange={(e) =>
              setFilterTable(
                e.target.value as
                | "all"
                | "ban_chay"
                | "ban_cham"
                | "yeu_thich"
              )
            }
            className="border rounded px-2 py-1"
          >
            <option value="all">Tất cả</option>
            <option value="ban_chay">Bán chạy</option>
            <option value="ban_cham">Bán chậm</option>
            <option value="yeu_thich">Yêu thích</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Tên sản phẩm</th>
                <th className="p-2 text-right">Số lượng bán</th>
                <th className="p-2 text-right">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center p-3">
                    Đang tải...
                  </td>
                </tr>
              ) : filteredTableData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-3 text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                filteredTableData.map((sp) => (
                  <tr key={sp.id} className="hover:bg-gray-50">
                    <td className="p-2">{sp.ten}</td>
                    <td className="p-2 text-right">
                      {sp.tong_so_luong}
                    </td>
                    <td className="p-2 text-right">
                      {formatVND(sp.tong_doanh_thu)}
                    </td>
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

/* ================== BOX COMPONENT ================== */
function Box({
  title,
  item,
  color = "green",
}: {
  title: string;
  item: SanPhamItem | null | undefined;
  color?: "green" | "red" | "pink";
}) {
  const colorMap = {
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
    pink: "bg-pink-50 text-pink-700",
  };

  return (
    <div className={`rounded-xl p-4 shadow ${colorMap[color]}`}>
      <p className="font-semibold">{title}</p>
      {item ? (
        <>
          <p className="text-lg font-bold mt-1">{item.ten}</p>
          <p className="text-sm">Số lượng: {item.tong_so_luong}</p>
          <p className="font-semibold">
            {formatVND(item.tong_doanh_thu)}
          </p>
        </>
      ) : (
        <p className="text-gray-500 mt-2">Không có dữ liệu</p>
      )}
    </div>
  );
}
