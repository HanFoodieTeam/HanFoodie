"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IBaiViet } from "@/app/lib/cautrucdata";

interface IBaiVietResponse {
  success: boolean;
  data: IBaiViet[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

function BaiVietListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const searchQuery = searchParams.get("search") || "";

  const [data, setData] = useState<IBaiViet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>(searchQuery);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [confirmItem, setConfirmItem] = useState<IBaiViet | null>(null);

  const updateQuery = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val && val !== "") params.set(key, val);
      else params.delete(key);
    });
    router.push(`/bai_viet?${params.toString()}`);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const qs = new URLSearchParams({
        page: String(page),
        limit: "6",
        search: searchQuery,
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
    fetchData();
  }, [page, searchQuery]);

  useEffect(() => {
    const delay = setTimeout(() => {
      updateQuery({ search: search.trim(), page: "1" });
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);

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
      console.error("❌ PATCH lỗi:", err);
      alert("Không thể cập nhật trạng thái!");
    } finally {
      setConfirmItem(null);
    }
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    updateQuery({ page: String(p) });
  };

  const truncateContent = (text: string, length = 80) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div>
      {/* Thanh tiêu đề + tìm kiếm */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Bài Viết</h1>

        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex items-center border border-gray-400 rounded-lg px-3 py-1.5 bg-white relative">
            <input
              type="text"
              placeholder="Tìm theo tiêu đề..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-64 text-sm"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  updateQuery({ search: "", page: "1" });
                }}
                className="absolute right-2 text-gray-500 hover:text-red-500"
                title="Xoá nội dung"
              >
                X
              </button>
            )}
          </div>

          <Link
            href="/bai_viet/them"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded-lg shadow text-sm"
          >
            Thêm Bài Viết
          </Link>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-300 text-gray-700 uppercase text-sm text-center">
            <tr>
              <th className="px-3 py-2 w-16 text-center">HÌNH</th>
              <th className="px-3 py-2 text-center">TIÊU ĐỀ</th>
              <th className="px-3 py-2 text-center">NỘI DUNG</th>
              <th className="px-3 py-2 text-center">LƯỢT XEM</th>
              <th className="px-3 py-2 text-center">NGÀY ĐĂNG</th>
              <th className="px-3 py-2 text-center">ẨN/HIỆN</th>
              <th className="px-3 py-2 text-center">SỬA</th>
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
                <tr key={bv.id} className="border-t hover:bg-gray-100 transition-all">
                  <td className="px-3 py-2">
                    {bv.hinh ? (
                      <img
                        src={bv.hinh}
                        alt={bv.tieu_de}
                        className="w-12 h-12 object-cover rounded-lg mx-auto border border-gray-200 shadow-sm"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.png"; }}
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto flex items-center justify-center text-gray-400 text-xs border border-gray-300">
                        Chưa có
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2 font-medium">{bv.tieu_de}</td>
                  <td className="px-3 py-2">{truncateContent(bv.noi_dung)}</td>
                  <td className="px-3 py-2 text-center">{bv.luot_xem}</td>
                  <td className="px-3 py-2 text-center">{formatDate(bv.ngay_dang)}</td>
                  <td
                    className="px-3 py-2 text-center cursor-pointer select-none text-xl"
                    onClick={() => handleToggleClick(bv)}
                    title="Bấm để đổi trạng thái"
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

      {/* Phân trang */}
      <div className="flex justify-center mt-4 gap-2 text-sm">
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
              p === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-[380px]">
            <h2 className="text-xl font-semibold mb-3 text-center text-gray-800">
              Xác nhận thay đổi trạng thái
            </h2>
            <p className="text-center mb-5 text-lg">
              Bạn có muốn{" "}
              <span className="text-red-600 font-semibold">
                {confirmItem.an_hien ? "ẩn" : "hiển thị"}
              </span>{" "}
              bài viết{" "}
              <span className="font-semibold text-gray-700">{confirmItem.tieu_de}</span>{" "}
              không?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmToggle}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 text-lg rounded-lg"
              >
                Có
              </button>
              <button
                onClick={() => setConfirmItem(null)}
                className="bg-gray-300 hover:bg-gray-400 px-5 py-2 text-lg rounded-lg"
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

export default function BaiVietList() {
  return (
    <Suspense fallback={<div className="p-4 text-lg">Đang tải...</div>}>
      <BaiVietListContent />
    </Suspense>
  );
}
