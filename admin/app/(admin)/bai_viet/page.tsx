"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IBaiViet } from "@/lib/cautrucdata";

interface IBaiVietResponse {
  success: boolean;
  data: IBaiViet[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

export default function BaiVietList() {
  return (
    <Suspense fallback={<div className="p-4 text-lg">Đang tải...</div>}>
      <BaiVietListContent />
    </Suspense>
  );
}

function BaiVietListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = Number(searchParams.get("page") || 1);
  const initialSearch = searchParams.get("search") || "";

  const [data, setData] = useState<IBaiViet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmItem, setConfirmItem] = useState<IBaiViet | null>(null);

  const fetchData = async (pageNumber: number, searchTerm: string) => {
    try {
      setLoading(true);
      const qs = new URLSearchParams({
        page: String(pageNumber),
        limit: "5",
        search: searchTerm,
      });
      const res = await fetch(`/api/bai_viet?${qs.toString()}`);
      const json: IBaiVietResponse = await res.json();
      if (json.success) {
        setData(json.data);
        setTotalPages(json.totalPages);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách bài viết:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      fetchData(1, search);
      router.replace(`/bai_viet?search=${encodeURIComponent(search)}&page=1`);
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  useEffect(() => {
    fetchData(page, search);
    router.replace(`/bai_viet?search=${encodeURIComponent(search)}&page=${page}`);
  }, [page]);

  const handleToggleClick = (item: IBaiViet) => setConfirmItem(item);

  const confirmToggle = async () => {
    if (!confirmItem) return;
    const id = confirmItem.id;
    const newState = !confirmItem.an_hien;
    try {
      const res = await fetch(`/api/bai_viet/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ an_hien: newState }),
      });
      if (!res.ok) throw new Error("Lỗi cập nhật trạng thái");
      setData((prev) =>
        prev.map((bv) => (bv.id === id ? { ...bv, an_hien: newState } : bv))
      );
    } catch (err) {
      console.error("PATCH lỗi:", err);
      alert("Không thể cập nhật trạng thái!");
    } finally {
      setConfirmItem(null);
    }
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("vi-VN");
  };

  return (
    <div className="px-4 md:px-0">
      {/* Header + search */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Quản lý Bài Viết
        </h1>

        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <div className="relative flex items-center border border-gray-400 rounded-lg px-3 py-1.5 bg-white">
            <input
              type="text"
              placeholder="Tìm theo tiêu đề..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-full sm:w-64 text-sm pr-6"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            )}
          </div>

          <Link
            href="/bai_viet/them"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow text-sm text-center"
          >
            Thêm Bài Viết
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-gray-300 text-gray-700 uppercase text-center">
            <tr>
              <th className="px-3 py-2 w-24">HÌNH</th>
              <th className="px-3 py-2">TIÊU ĐỀ</th>
              <th className="px-3 py-2">NỘI DUNG</th>
              <th className="px-3 py-2">LƯỢT XEM</th>
              <th className="px-3 py-2">NGÀY ĐĂNG</th>
              <th className="px-3 py-2">ẨN/HIỆN</th>
              <th className="px-3 py-2">SỬA</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500 italic">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              data.map((bv) => (
                <tr
                  key={bv.id}
                  className="border-t hover:bg-gray-100 transition"
                >
                  <td className="px-3 py-2">
                    {bv.hinh ? (
                      <img
                        src={bv.hinh}
                        alt={bv.tieu_de}
                        className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg mx-auto border shadow-sm"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).src =
                            "/placeholder.png")
                        }
                      />
                    ) : (
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg mx-auto flex items-center justify-center text-xs text-gray-400">
                        Chưa có
                      </div>
                    )}
                  </td>

                  <td className="px-3 py-2 max-w-[180px] truncate font-medium">
                    {bv.tieu_de}
                  </td>

                  <td className="px-3 py-2 max-w-[220px] truncate">
                    {bv.noi_dung}
                  </td>

                  <td className="px-3 py-2 text-center">
                    {bv.luot_xem}
                  </td>

                  <td className="px-3 py-2 text-center">
                    {formatDate(bv.ngay_dang)}
                  </td>

                  <td
                    className="px-3 py-2 text-center cursor-pointer text-xl"
                    onClick={() => handleToggleClick(bv)}
                  >
                    {bv.an_hien ? "✅" : "❌"}
                  </td>

                  <td className="px-3 py-2 text-center">
                    <Link
                      href={`/bai_viet/${bv.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Sửa
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center mt-4 gap-2 text-sm">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Trước
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`px-3 py-1 rounded ${
              p === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Sau
        </button>
      </div>

      {/* Modal xác nhận */}
      {confirmItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg md:text-xl font-semibold mb-3 text-center">
              Xác nhận thay đổi trạng thái
            </h2>
            <p className="text-center mb-5">
              Bạn có muốn{" "}
              <span className="text-red-600 font-semibold">
                {confirmItem.an_hien ? "ẩn" : "hiển thị"}
              </span>{" "}
              bài viết{" "}
              <span className="font-semibold">{confirmItem.tieu_de}</span> không?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmToggle}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Có
              </button>
              <button
                onClick={() => setConfirmItem(null)}
                className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
