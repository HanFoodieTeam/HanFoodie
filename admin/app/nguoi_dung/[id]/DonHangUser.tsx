"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  IDonHang,
  IChiTietDonHang,
  TrangThaiDonHang,
} from "@/app/lib/cautrucdata";

// Nhãn trạng thái
const trangThaiLabels: Record<TrangThaiDonHang, string> = {
  cho_xac_nhan: "Chờ xác nhận",
  da_xac_nhan: "Đã xác nhận",
  dang_giao: "Đang giao",
  da_giao: "Đã giao",
  da_huy: "Đã hủy",
};

// Màu trạng thái
const badgeColors: Record<TrangThaiDonHang, string> = {
  cho_xac_nhan: "bg-yellow-100 text-yellow-700 border-yellow-300",
  da_xac_nhan: "bg-blue-100 text-blue-700 border-blue-300",
  dang_giao: "bg-purple-100 text-purple-700 border-purple-300",
  da_giao: "bg-green-100 text-green-700 border-green-300",
  da_huy: "bg-red-100 text-red-700 border-red-300",
};

export default function DonHangUser({ orders }: { orders: IDonHang[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("status") || "tat_ca";
  const currentPage = Number(searchParams.get("page") || 1);

  const [status, setStatus] = useState(currentStatus);
  const [page, setPage] = useState(currentPage);
  const [filtered, setFiltered] = useState<IDonHang[]>([]);

  const limit = 5;
  const totalPages = Math.ceil(filtered.length / limit);
  const currentData = filtered.slice((page - 1) * limit, page * limit);

  // Cập nhật UI khi URL param thay đổi
  useEffect(() => {
    setStatus(currentStatus);
    setPage(currentPage);
  }, [currentStatus, currentPage]);

  // Cập nhật URL filter
  const updateFilter = (newStatus: string, newPage = 1) => {
    setStatus(newStatus);
    setPage(newPage);
    router.push(
      `?tab=don_hang&status=${newStatus}&page=${newPage}`,
      { scroll: false }
    );
  };

  // Lọc dữ liệu theo trạng thái
  useEffect(() => {
    let result = [...orders];

    if (status !== "tat_ca") {
      result = result.filter((d) => d.trang_thai === status);
    }

    result.sort((a, b) => b.id - a.id);
    setFiltered(result);
  }, [orders, status]);

  const counts = {
    tat_ca: orders.length,
    cho_xac_nhan: orders.filter((d) => d.trang_thai === "cho_xac_nhan").length,
    da_xac_nhan: orders.filter((d) => d.trang_thai === "da_xac_nhan").length,
    dang_giao: orders.filter((d) => d.trang_thai === "dang_giao").length,
    da_giao: orders.filter((d) => d.trang_thai === "da_giao").length,
    da_huy: orders.filter((d) => d.trang_thai === "da_huy").length,
  };

  const tabsUI = [
    { key: "tat_ca", label: `Tất cả (${counts.tat_ca})` },
    { key: "cho_xac_nhan", label: `Chờ xác nhận (${counts.cho_xac_nhan})` },
    { key: "da_xac_nhan", label: `Đã xác nhận (${counts.da_xac_nhan})` },
    { key: "dang_giao", label: `Đang giao (${counts.dang_giao})` },
    { key: "da_giao", label: `Đã giao (${counts.da_giao})` },
    { key: "da_huy", label: `Đã hủy (${counts.da_huy})` },
  ];

  return (
    <div className="space-y-4">
      {/* Bộ lọc trạng thái */}
      <div className="flex gap-5 border-b pb-2 mb-3 text-sm font-semibold">
        {tabsUI.map((t) => (
          <button key={t.key} onClick={() => updateFilter(t.key, 1)}
            className={`px-2 py-1 transition ${status === t.key
              ? "text-blue-600 border-b-2 border-blue-500"
              : "text-gray-600 hover:text-blue-600"
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Danh sách đơn hàng */}
      {currentData.map((d: IDonHang) => (
        <Link key={d.id} href={`/don_hang/${d.id}`}
          className="block border border-gray-300 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition" >
          <div className="flex justify-between items-center">
            <p className="font-semibold">
              Mã đơn: <span className="text-blue-600">{d.ma_don}</span>
            </p>
            <span className={`text-xs border px-3 py-1 rounded-full font-medium ${badgeColors[d.trang_thai]}`}>
              {trangThaiLabels[d.trang_thai]}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Ngày đặt: {new Date(d.ngay_tao).toLocaleDateString("vi-VN")}
          </p>

          <div className="border border-gray-500 rounded-lg p-3 mt-3 space-y-3">
            {(d.chi_tiet_don_hang ?? []).map((item: IChiTietDonHang) => {
              const product = item.bien_the?.san_pham;
              const toppings =
                item.json_mon_them &&
                JSON.parse(item.json_mon_them)
                  .map((t: any) => t.ten)
                  .join(", ");
              const options =
                item.json_tuy_chon &&
                Object.entries(JSON.parse(item.json_tuy_chon))
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(", ");

              return (
                <div key={item.id} className="flex gap-3 items-center border-gray-300 border-b  last:border-b-0 pb-3 last:pb-0">
                  <img src={product?.hinh ?? "/no-img.jpg"} alt={product?.ten ?? ""} className="w-14 h-14 rounded-lg object-cover"/>

                  <div className="flex-1">
                    <p className="font-semibold">{product?.ten}</p>
                    {item.bien_the?.ten && (
                      <p className="text-xs text-gray-500">{item.bien_the.ten}</p>
                    )}
                    {toppings && (
                      <p className="text-xs text-gray-600">Món thêm: {toppings}</p>
                    )}
                    {options && (
                      <p className="text-xs text-gray-600">Tùy chọn: {options}</p>
                    )}
                    <p className="text-xs text-gray-600">Số lượng: {item.so_luong}</p>
                  </div>

                  <p className="text-red-600 font-bold whitespace-nowrap">
                    {(item.thanh_tien || 0).toLocaleString("vi-VN")}₫
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-2 pt-2  flex justify-between">
            <p className="font-semibold">
              Tổng thanh toán:{" "}
              <span className="text-red-600">
                {d.so_tien_thanh_toan.toLocaleString("vi-VN")}₫
              </span>
            </p>
          </div>
        </Link>
      ))}

      {!currentData.length && (
        <div className="text-center text-gray-500 py-6">
          Không có đơn hàng nào
        </div>
      )}

      {/* Phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-5 space-x-2">
          <button onClick={() => updateFilter(status, 1)} disabled={page === 1}
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
                <button key={p} onClick={() => updateFilter(status, p)}
                  className={`px-3 py-1 rounded transition ${p === page
                    ? "bg-blue-500 text-white font-bold scale-105"
                    : "bg-gray-200 hover:bg-gray-300"
                  }`}>
                  {p}
                </button>
              )
            );
          })}

          <button onClick={() => updateFilter(status, totalPages)} disabled={page === totalPages}
            className={`px-3 py-1 rounded ${page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
            }`}>
            Cuối
          </button>
        </div>
      )}
    </div>
  );
}
