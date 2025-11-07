
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IMaGiamGia } from "../lib/cautrucdata";

type StatusKey = "all" | "upcoming" | "active" | "expired";

export default function MaGiamGiaList() {
  const [data, setData] = useState<IMaGiamGia[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmAnHien, setConfirmAnHien] = useState<IMaGiamGia | null>(null);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<StatusKey>("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ======== Lấy dữ liệu ========
  const fetchData = async () => {
    try {
      setLoading(true);
      const qs = new URLSearchParams({
        page: String(page),
        search: searchQuery,
        status,
      });
      const res = await fetch(`/api/ma_giam_gia?${qs.toString()}`);
      const json = await res.json();
      setData(json.data);
      setTotalPages(json.totalPages);
    } catch (error) {
      console.error("Lỗi khi tải mã giảm giá:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchQuery, status]);

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(search.trim());
  };

  const handleToggleAnHien = (item: IMaGiamGia) => setConfirmAnHien(item);

  const confirmToggle = async () => {
    if (!confirmAnHien) return;
    const id = confirmAnHien.id;
    const newState = !confirmAnHien.an_hien;

    const res = await fetch(`/api/ma_giam_gia/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ an_hien: newState }),
    });

    if (res.ok) {
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, an_hien: newState } : item
        )
      );
    } else {
      alert("Không thể cập nhật trạng thái!");
    }
    setConfirmAnHien(null);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  function getHieuLucBadge(bat_dau: string, ket_thuc: string) {
    const now = new Date();
    const start = new Date(bat_dau);
    const end = new Date(ket_thuc);

    if (now < start)
      return { label: "Chưa hoạt động", color: "bg-gray-200 text-gray-700 border-gray-400" };
    if (now > end)
      return { label: "Đã hết hạn", color: "bg-red-100 text-red-700 border-red-300" };
    return { label: "Đang hoạt động", color: "bg-green-100 text-green-700 border-green-300" };
  }

  if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Quản lý Mã Giảm Giá</h1>

      {/* Tìm kiếm + Lọc + Thêm */}
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Nhập tên hoặc mã số..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border border-gray-400 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
            Tìm
          </button>

          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value as StatusKey);
            }}
            className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="all">Tất cả</option>
            <option value="active">Đang hoạt động</option>
            <option value="upcoming">Chưa hoạt động</option>
            <option value="expired">Đã hết hạn</option>
          </select>
        </div>

        <Link
          href="/ma_giam_gia/them"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow">
          Thêm Mã Giảm Giá
        </Link>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-300 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">Tên / Mã số</th>
              <th className="px-4 py-3 text-center">Giá trị giảm</th>
              <th className="px-4 py-3 text-center">Giảm tối đa</th>
              <th className="px-4 py-3 text-center">GTG Tối thiểu</th>
              <th className="px-4 py-3 text-center">Số lượng</th>
              <th className="px-4 py-3 text-center">Hiệu lực</th>
              <th className="px-4 py-3 text-center max-w-[150px] truncate">Mô tả</th>
              <th className="px-4 py-3 text-center">Trạng thái</th>
              <th className="px-4 py-3 text-center">Sửa</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-4 text-gray-500">
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            ) : (
              data.map((mgg) => {
                const badge = getHieuLucBadge(mgg.bat_dau, mgg.ket_thuc);

                return (
                  <tr key={mgg.id} className="border-t hover:bg-gray-200 transition-all duration-150">
                    <td className="px-4 py-3 font-semibold max-w-[250px] truncate">
                      {mgg.ten}
                      <br />
                      <span className="text-sm text-gray-600">({mgg.ma_so})</span>
                    </td>

                    <td className="px-4 py-3 text-center text-red-600">
                      {mgg.loai_giam_gia
                        ? `${mgg.gia_tri_giam}%`
                        : `${mgg.gia_tri_giam.toLocaleString("vi")} ₫`}
                    </td>

                    <td className="px-4 py-3 text-center text-red-600">
                      {mgg.gia_tri_giam_toi_da != null
                        ? mgg.gia_tri_giam_toi_da.toLocaleString("vi")
                        : "-"}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {mgg.gia_tri_toi_thieu.toLocaleString("vi")} ₫
                    </td>

                    <td className="px-4 py-3 text-center">{mgg.so_luong}</td>

                    {/* Hiệu lực */}
                    <td className="px-4 py-3 text-center">
                      <div
                        className={`rounded-lg p-2 border ${badge.color} text-sm leading-tight flex flex-col items-center`}>
                        <span className="font-semibold">{badge.label}</span>
                        <span className="text-xs mt-1">
                          {formatDate(mgg.bat_dau)} → {formatDate(mgg.ket_thuc)}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-center max-w-[180px] truncate">{mgg.mo_ta}</td>

                    <td
                      className="px-4 py-3 text-center cursor-pointer select-none text-xl"
                      onClick={() => handleToggleAnHien(mgg)}
                      title="Bấm để ẩn/hiện">
                      {mgg.an_hien ? "✅" : "❌"}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/ma_giam_gia/${mgg.id}`}
                        className="text-blue-500 hover:text-blue-700 font-semibold">
                        Sửa
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${page === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
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
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded ${p === page ? "bg-blue-500 text-white font-bold scale-105" : "bg-gray-200 hover:bg-gray-300"
                  }`} >
                {p}
              </button>
            )
          );
        })}

        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
            }`} >
          Cuối
        </button>
      </div>

      {/* Modal xác nhận ẩn/hiện */}
      {confirmAnHien && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[380px]">
            <h2 className="text-lg font-semibold mb-3 text-center">Xác nhận thay đổi trạng thái</h2>
            <p className="text-center mb-5">
              Bạn có muốn{" "}
              <span className="font-semibold text-red-600">
                {confirmAnHien.an_hien ? "ẩn" : "hiển thị"}
              </span>{" "}
              mã giảm giá{" "}
              <span className="font-semibold">
                {confirmAnHien.ten} ({confirmAnHien.ma_so})
              </span>{" "}
              không?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={confirmToggle}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Có
              </button>
              <button
                onClick={() => setConfirmAnHien(null)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">
                Không
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
