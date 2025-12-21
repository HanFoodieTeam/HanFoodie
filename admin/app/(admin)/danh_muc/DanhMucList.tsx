"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface IDanhMuc {
  id: number;
  ten: string;
  hinh?: string | null;
  thu_tu: number;
  an_hien: boolean;
  so_san_pham?: number;
  loai_tuy_chon?: { id: number; ten: string }[];
  mon_them?: { id: number; ten: string }[];
}

interface IDanhMucResponse {
  success: boolean;
  data: IDanhMuc[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

export default function DanhMucList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<IDanhMuc[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [search, setSearch] = useState<string>(searchParams.get("search") || "");
  const [searchQuery, setSearchQuery] = useState<string>(search);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [confirmItem, setConfirmItem] = useState<IDanhMuc | null>(null);

  const LIMIT = 7;

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    params.set("page", String(page));
    router.replace(`/danh_muc?${params.toString()}`);
  }, [searchQuery, page, router]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
        search: searchQuery,
      });
      const res = await fetch(`/api/danh_muc?${qs.toString()}`, { cache: "no-store" });
      const json: IDanhMucResponse = await res.json();
      if (json.success) {
        setData(json.data);
        setTotalPages(json.totalPages);
      } else setData([]);
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      setSearchQuery(search.trim());
    }, 500);
    return () => clearTimeout(t);
  }, [search]);

  const handleToggleClick = (item: IDanhMuc) => setConfirmItem(item);

  const confirmToggle = async () => {
    if (!confirmItem) return;
    const id = confirmItem.id;
    const newState = !confirmItem.an_hien;
    try {
      await fetch(`/api/danh_muc/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ an_hien: newState }),
      });
      setData((prev) =>
        prev.map((dm) => (dm.id === id ? { ...dm, an_hien: newState } : dm))
      );
    } catch {
      alert("Không thể cập nhật trạng thái!");
    } finally { setConfirmItem(null); }
  };

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Danh Mục</h1>
        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex items-center border border-gray-400 rounded-lg px-3 py-1.5 bg-white relative">
            <input
              type="text"
              placeholder="Tìm theo tên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none w-64 text-sm"
            />
            {search && (
              <button
                onClick={() => { setSearch(""); setSearchQuery(""); setPage(1); }}
                className="absolute right-2 text-gray-500 hover:text-red-500"
              >✕</button>
            )}
          </div>
          <Link
            href="/danh_muc/them"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded-lg shadow text-sm"
          >
            Thêm Danh Mục
          </Link>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <table className="min-w-full text-sm text-center border-collapse">
          <thead className="bg-gray-300 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-3 py-2">STT</th>
              <th className="px-3 py-2">Hình</th>
              <th className="px-3 py-2">Tên</th>
              <th className="px-3 py-2">Loại tuỳ chọn</th>
              <th className="px-3 py-2">Món thêm</th>
              <th className="px-3 py-2">Thứ tự</th>
              <th className="px-3 py-2">Số sản phẩm</th>
              <th className="px-3 py-2">Ẩn / Hiện</th>
              <th className="px-3 py-2">Sửa</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={9} className="py-6 text-gray-600">Đang tải dữ liệu...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={9} className="py-6 text-gray-400 italic">Không có dữ liệu</td></tr>
            ) : data.map((dm, i) => (
              <tr key={dm.id} className="border-t hover:bg-gray-100 transition">
                <td className="px-3 py-2">{(page - 1) * LIMIT + i + 1}</td>
                <td className="px-3 py-2">
                  {dm.hinh ? <Image src={dm.hinh} alt={dm.ten} width={48} height={48} className="mx-auto rounded" /> : <span className="text-gray-400">—</span>}
                </td>
                <td className="px-3 py-2 font-medium">{dm.ten}</td>
                <td className="px-3 py-2">
                  {dm.loai_tuy_chon?.length ? (
                    <div className="flex flex-wrap justify-center gap-1">
                      {dm.loai_tuy_chon.map((l) => (
                        <span key={l.id} className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs">{l.ten}</span>
                      ))}
                    </div>
                  ) : <span className="text-gray-400">—</span>}
                </td>
                <td className="px-3 py-2">
                  {dm.mon_them?.length ? (
                    <div className="flex flex-wrap justify-center gap-1">
                      {dm.mon_them.map((m) => (
                        <span key={m.id} className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">{m.ten}</span>
                      ))}
                    </div>
                  ) : <span className="text-gray-400">—</span>}
                </td>
                <td className="px-3 py-2">{dm.thu_tu}</td>
                <td className="px-3 py-2">{dm.so_san_pham ?? 0}</td>
                <td className="px-3 py-2 text-center cursor-pointer text-2xl" onClick={() => handleToggleClick(dm)} title="Bấm để đổi trạng thái">
                  {dm.an_hien ? "✅" : "❌"}
                </td>
                <td className="px-3 py-2">
                  <Link href={`/danh_muc/${dm.id}`} className="text-blue-600 hover:text-blue-800 font-medium">Sửa</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 gap-2 text-sm relative z-10 flex-wrap">
        <button onClick={() => goToPage(page - 1)} disabled={page <= 1} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Trước</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button key={p} onClick={() => goToPage(p)}
            className={`px-3 py-1 rounded ${p === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}>{p}</button>
        ))}
        <button onClick={() => goToPage(page + 1)} disabled={page >= totalPages} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">Sau</button>
      </div>

      {/* MODAL */}
      {confirmItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-[380px] text-center">
            <h2 className="text-xl font-semibold mb-3">Xác nhận thay đổi trạng thái</h2>
            <p className="mb-5">Bạn có muốn <span className="font-semibold text-red-600">{confirmItem.an_hien ? "ẩn" : "hiển thị"}</span> danh mục <b>{confirmItem.ten}</b> không?</p>
            <div className="flex justify-center gap-4">
              <button onClick={confirmToggle} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg">Có</button>
              <button onClick={() => setConfirmItem(null)} className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg">Không</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
