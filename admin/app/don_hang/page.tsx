"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IDonHang, TrangThaiDonHang } from "@/lib/cautrucdata";

//  Cấu hình trạng thái đơn hàng 
const trangThaiLabels: Record<TrangThaiDonHang, string> = {
  cho_xac_nhan: "Chờ xác nhận",
  da_xac_nhan: "Đã xác nhận",
  dang_giao: "Đang giao",
  da_giao: "Đã giao",
  da_huy: "Đã hủy",
};

const badgeColors: Record<TrangThaiDonHang, string> = {
  cho_xac_nhan: "bg-yellow-100 text-yellow-700 border-yellow-300",
  da_xac_nhan: "bg-blue-100 text-blue-700 border-blue-300",
  dang_giao: "bg-purple-100 text-purple-700 border-purple-300",
  da_giao: "bg-green-100 text-green-700 border-green-300",
  da_huy: "bg-red-100 text-red-700 border-red-300",
};

const nextTrangThai: Record<TrangThaiDonHang, TrangThaiDonHang | null> = {
  cho_xac_nhan: "da_xac_nhan",
  da_xac_nhan: "dang_giao",
  dang_giao: "da_giao",
  da_giao: null,
  da_huy: null,
};

//  Component chính 
function DonHangPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const range = searchParams.get("range") || "today";
  const activeTab = (searchParams.get("trang_thai") || "tat_ca") as
    | TrangThaiDonHang
    | "tat_ca";

  const [donHangs, setDonHangs] = useState<IDonHang[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [totalAll, setTotalAll] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  const updateQuery = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val && val !== "") params.set(key, val);
      else params.delete(key);
    });
    const fullPath = `/don_hang?${params.toString()}`;
    window.history.pushState({}, "", fullPath);
    router.refresh();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          range,
        });
        if (activeTab !== "tat_ca") params.append("trang_thai", activeTab);
        if (search.trim()) params.append("search", search.trim());

        const res = await fetch(`/api/don_hang?${params.toString()}`);
        const data = await res.json();

        setDonHangs(data.data || []);
        setCounts(data.countByStatus || {});
        setTotalAll(data.totalAll || 0);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error(" Lỗi tải đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, range, activeTab, search]);

  const handleTrangThaiClick = async (don: IDonHang) => {
    const next = nextTrangThai[don.trang_thai];
    if (!next) return alert(" Đơn hàng này đã hoàn tất!");
    if (!confirm(`Chuyển đơn ${don.ma_don} sang "${trangThaiLabels[next]}"?`)) return;

    const res = await fetch(`/api/don_hang/${don.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trang_thai: next }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(` Lỗi cập nhật: ${data.error || "Không xác định"}`);
      return;
    }

    setDonHangs((prev) =>
      prev.map((d) => (d.id === don.id ? { ...d, trang_thai: next } : d))
    );

    setCounts((prev) => {
      const copy = { ...prev };
      copy[don.trang_thai] = Math.max(0, (copy[don.trang_thai] ?? 0) - 1);
      copy[next] = (copy[next] ?? 0) + 1;
      return copy;
    });
  };

  const formatDate = (input: string | Date) =>
    new Date(input).toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
      hour12: false,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  //  Render 
  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <div className="mx-auto bg-white rounded-2xl shadow-md p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>

          <div className="flex items-center gap-2">
            <select
              value={range}
              onChange={(e) => updateQuery({ range: e.target.value, page: "1" })}
              className="border rounded-lg px-3 py-1.5 text-sm">
              <option value="today">Hôm nay</option>
              <option value="3days">3 ngày gần đây</option>
              <option value="week">1 tuần</option>
              <option value="month">1 tháng</option>
              <option value="year">1 năm</option>
              <option value="all">Từ trước tới giờ</option>
            </select>

            <input
              defaultValue={search}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateQuery({ search: (e.target as HTMLInputElement).value, page: "1" });
                }
              }}
              placeholder=" Tìm mã đơn..."
              className="border rounded-lg px-3 py-1.5 w-52 text-sm" />
            <button
              onClick={() => {
                const val = (document.querySelector("input") as HTMLInputElement)?.value || "";
                updateQuery({ search: val, page: "1" });
              }}
              className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-600">
              Tìm
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-5 border-b pb-2 text-gray-700 overflow-x-auto">
          <button
            onClick={() => updateQuery({ trang_thai: "tat_ca", page: "1" })}
            className={`px-4 py-2 border-b-2 font-medium ${activeTab === "tat_ca"
              ? "border-blue-500 text-blue-600 font-semibold"
              : "border-transparent hover:text-blue-600"
              }`}>
            Tất cả ({totalAll})
          </button>

          {Object.entries(trangThaiLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => updateQuery({ trang_thai: key, page: "1" })}
              className={`px-4 py-2 border-b-2 font-medium ${activeTab === key
                ? "border-blue-500 text-blue-600 font-semibold"
                : "border-transparent hover:text-blue-600"
                }`}>
              {label} ({counts[key] ?? 0})
            </button>
          ))}
        </div>

        {/* Table */}
        <div
          className={`relative overflow-x-auto bg-white rounded-xl transition-opacity ${loading ? "opacity-60" : "opacity-100"
            }`}>
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-300 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Mã đơn</th>
                <th className="px-4 py-3 text-center">Người đặt</th>
                <th className="px-4 py-3 text-center">Phương thức</th>
                <th className="px-4 py-3 text-center">Tổng tiền</th>
                <th className="px-4 py-3 text-center">Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                //  Hiển thị trạng thái "đang tải"
                <tr>
                  <td colSpan={6} className="py-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <div className="h-5 w-5 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
                      <span>Đang tải dữ liệu...</span>
                    </div>
                  </td>
                </tr>
              ) : donHangs.length === 0 ? (
                // Khi không có dữ liệu sau khi load xong
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-500">
                    Không có đơn hàng nào.
                  </td>
                </tr>
              ) : (
                //  Hiển thị danh sách đơn hàng
                donHangs.map((don) => (
                  <tr key={don.id} onClick={() => router.push(`/don_hang/${don.id}`)}
                    className="border-t hover:bg-gray-100 transition-colors cursor-pointer">
                    <td className="px-4 py-3 font-semibold">
                      {don.ma_don}
                      <p className="text-xs text-gray-600">{formatDate(don.ngay_tao)}</p>
                    </td>

                    <td className="px-4 py-3 text-center">{don.ho_ten_nguoi_nhan}</td>

                    <td className="px-4 py-3 text-center">
                      {don.phuong_thuc_thanh_toan
                        ? "Thanh toán khi nhận hàng"
                        : "Thanh toán online"}
                    </td>

                    <td className="px-4 py-3 text-center text-red-600 font-semibold">
                      {don.so_tien_thanh_toan.toLocaleString("vi-VN")} ₫
                    </td>

                    {/* Trạng thái vẫn click riêng như cũ */}
                    <td className="px-4 py-3 text-center w-[150px]"
                      onClick={(e) => {
                        e.stopPropagation();  
                        handleTrangThaiClick(don);
                      }} >
                      <span className={`px-3 py-1 border rounded-full text-xs font-semibold hover:scale-105 transition-transform ${badgeColors[don.trang_thai]}`}>
                        {trangThaiLabels[don.trang_thai]}
                      </span>
                    </td>
                  </tr>

                ))
              )}
            </tbody>

          </table>
        </div>

        {/*  Pagination (3 trang giữa)  */}
        <div className="flex justify-center mt-5 space-x-2">
          <button
            onClick={() => updateQuery({ page: "1" })}
            disabled={page === 1}
            className={`px-3 py-1 rounded ${page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
              }`}>
            Đầu
          </button>

          {Array.from({ length: 3 }, (_, i) => {
            const start = Math.max(1, Math.min(page - 1, totalPages - 2));
            const p = start + i;
            return (
              p <= totalPages && (
                <button
                  key={p}
                  onClick={() => updateQuery({ page: String(p) })}
                  className={`px-3 py-1 rounded ${p === page
                    ? "bg-blue-500 text-white font-bold scale-105"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`}>
                  {p}
                </button>
              )
            );
          })}

          <button
            onClick={() => updateQuery({ page: String(totalPages) })}
            disabled={page === totalPages}
            className={`px-3 py-1 rounded ${page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
              }`}>
            Cuối
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DonHangPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Đang tải danh sách đơn hàng...</div>}>
      <DonHangPageContent />
    </Suspense>
  );
}

