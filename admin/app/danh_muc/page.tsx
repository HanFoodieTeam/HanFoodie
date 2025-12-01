"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IDanhMuc } from "@/app/lib/cautrucdata";

interface IDanhMucResponse {
  success: boolean;
  data: IDanhMuc[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

function DanhMucListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const searchQuery = searchParams.get("search") || "";

  const [data, setData] = useState<IDanhMuc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>(searchQuery);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [confirmItem, setConfirmItem] = useState<IDanhMuc | null>(null);

  const updateQuery = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val && val !== "") params.set(key, val);
      else params.delete(key);
    });
    router.push(`/danh_muc?${params.toString()}`);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const qs = new URLSearchParams({
        page: String(page),
        search: searchQuery,
      });

      const res = await fetch(`/api/danh_muc?${qs.toString()}`);
      const json: IDanhMucResponse = await res.json();

      if (json.success) {
        setData(json.data);
        setTotalPages(json.totalPages);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách danh mục:", err);
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

  const handleToggleClick = (item: IDanhMuc) => setConfirmItem(item);

  const confirmToggle = async () => {
    if (!confirmItem) return;
    const id = confirmItem.id;
    const newState = !confirmItem.an_hien;

    try {
      const res = await fetch(`/api/danh_muc/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ an_hien: newState }),
      });

      if (!res.ok) throw new Error("Lỗi cập nhật trạng thái");

      setData((prev) =>
        prev.map((dm) => (dm.id === id ? { ...dm, an_hien: newState } : dm))
      );
    } catch (err) {
      console.error("❌ PATCH lỗi:", err);
      alert("Không thể cập nhật trạng thái!");
    } finally {
      setConfirmItem(null);
    }
  };

  const handleDelete = async (item: IDanhMuc) => {
    const isConfirm = confirm(`Bạn có chắc muốn xóa danh mục "${item.ten}" không?`);
    if (!isConfirm) return;

    try {
      const res = await fetch(`/api/danh_muc/${item.id}`, { method: "DELETE" });
      if (res.ok) {
        setData((prev) => prev.filter((dm) => dm.id !== item.id));
      } else {
        alert("Xóa thất bại!");
      }
    } catch (err) {
      console.error("Lỗi khi xóa danh mục:", err);
      alert("Không thể kết nối tới máy chủ!");
    }
  };

  return (
    <div>
      {/* Thanh tiêu đề + tìm kiếm */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Danh Mục</h1>

        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white relative">
            <input
              type="text"
              placeholder="Tìm theo tên..."
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
            href="/danh_muc/them"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow"
          >
            Thêm Danh Mục
          </Link>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <table className="min-w-full text-base text-left border-collapse">
          <thead className="bg-gray-300 text-gray-700 uppercase text-base">
            <tr>
              <th className="px-5 py-3">Tên</th>
              <th className="px-5 py-3 text-center">Ẩn/Hiện</th>
              <th className="px-5 py-3 text-center">Sửa | Xóa</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="py-10 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <div className="h-6 w-6 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
                    <span>Đang tải dữ liệu...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500 italic text-lg">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              data.map((dm) => (
                <tr key={dm.id} className="border-t hover:bg-gray-100 transition-all">
                  <td className="px-5 py-4 font-semibold">{dm.ten}</td>
                  <td
                    className="px-5 py-4 text-center cursor-pointer select-none text-2xl"
                    onClick={() => handleToggleClick(dm)}
                    title="Bấm để đổi trạng thái"
                  >
                    {dm.an_hien ? "✅" : "❌"}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Link
                      href={`/danh_muc/${dm.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Sửa
                    </Link>
                    {" | "}
                    <button
                      onClick={() => handleDelete(dm)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
              danh mục{" "}
              <span className="font-semibold text-gray-700">{confirmItem.ten}</span>{" "}
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

export default function DanhMucList() {
  return (
    <Suspense fallback={<div className="p-4 text-lg">Đang tải...</div>}>
      <DanhMucListContent />
    </Suspense>
  );
}
