"use client";

import React, { useEffect, useMemo, useState } from "react";

/* Types */
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

/* Format tiền */
const formatVND = (value: number) =>
  value.toLocaleString("vi-VN") + " VNĐ";

/* Page */
export default function SanPhamPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [sanPham, setSanPham] = useState<SanPhamItem[]>([]);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [filterTime, setFilterTime] =
    useState<"ngay" | "thang" | "nam">("ngay");

  const [filterTable, setFilterTable] = useState<
    "all" | "ban_chay" | "ban_cham" | "yeu_thich"
  >("all");

  const [loading, setLoading] = useState(false);

  /* Load data */
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
      console.error("Load san pham error:", err);
      setSanPham([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Tính toán */
  const banChayNhat = sanPham[0];
  const banChamNhat = sanPham[sanPham.length - 1];

  const yeuThichNhat = sanPham.reduce<SanPhamItem | null>(
    (max, item) =>
      !max || item.tong_so_luong > max.tong_so_luong ? item : max,
    null
  );

  /* Lọc bảng */
  const filteredTableData = useMemo(() => {
    if (filterTable === "ban_chay") return sanPham.slice(0, 5);
    if (filterTable === "ban_cham") return sanPham.slice(-5);
    if (filterTable === "yeu_thich")
      return yeuThichNhat ? [yeuThichNhat] : [];
    return sanPham;
  }, [filterTable, sanPham, yeuThichNhat]);

  /* UI */
  return (
    <div className="w-full min-h-screen px-[5px] py-[5px] space-y-4">
      <h1 className="text-lg md:text-xl font-semibold">
        Thống kê sản phẩm
      </h1>

      {/* Bộ lọc thời gian */}
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
            value={filterTime}
            onChange={(e) =>
              setFilterTime(e.target.value as "ngay" | "thang" | "nam")
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
          className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          Xem
        </button>
      </div>

      {/* Box tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Box title="🔥 Bán chạy nhất" item={banChayNhat} />
        <Box title="🐌 Bán chậm nhất" item={banChamNhat} color="red" />
        <Box title="❤️ Yêu thích nhất" item={yeuThichNhat} color="pink" />
      </div>

      {/* Bảng chi tiết */}
      <div className="bg-white shadow-sm rounded-lg p-3">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <h2 className="text-base font-semibold">
            Thống kê chi tiết
          </h2>

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
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="all">Tất cả</option>
            <option value="ban_chay">Bán chạy</option>
            <option value="ban_cham">Bán chậm</option>
            <option value="yeu_thich">Yêu thích</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[520px] w-full text-sm">
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
                  <td colSpan={3} className="p-3 text-center">
                    Đang tải...
                  </td>
                </tr>
              ) : filteredTableData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-3 text-center text-gray-500">
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

/* Box component */
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
    <div className={`rounded-lg p-4 shadow-sm ${colorMap[color]}`}>
      <p className="font-semibold text-sm">{title}</p>
      {item ? (
        <>
          <p className="text-base font-bold mt-1">{item.ten}</p>
          <p className="text-sm">Số lượng: {item.tong_so_luong}</p>
          <p className="font-semibold">
            {formatVND(item.tong_doanh_thu)}
          </p>
        </>
      ) : (
        <p className="text-gray-500 text-sm mt-2">
          Không có dữ liệu
        </p>
      )}
    </div>
  );
}
