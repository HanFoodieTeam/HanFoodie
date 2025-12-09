
"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { IMonThem } from "@/app/lib/cautrucdata";

interface IMonThemResponse {
  success: boolean;
  data: IMonThem[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

function MonThemListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  //  Đọc tham số từ URL 
  const page = Number(searchParams.get("page") || 1);
  const searchQuery = searchParams.get("search") || "";
  const loai = searchParams.get("loai") || "all";

  //  State quản lý dữ liệu 
  const [data, setData] = useState<IMonThem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>(searchQuery); // input tìm kiếm
  const [totalPages, setTotalPages] = useState<number>(1);
  const [confirmItem, setConfirmItem] = useState<IMonThem | null>(null);

  // hết món 
  const [confirmHetMon, setConfirmHetMon] = useState<IMonThem | null>(null);
  const [confirmCoLai, setConfirmCoLai] = useState<IMonThem | null>(null);

  const today = new Date().toISOString().split("T")[0];



  //  Cập nhật URL query 
  const updateQuery = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val && val !== "") params.set(key, val);
      else params.delete(key);
    });
    router.push(`/mon_them?${params.toString()}`);
  };

  //  Gọi API lấy dữ liệu 
  const fetchData = async () => {
    try {
      setLoading(true);
      const qs = new URLSearchParams({
        page: String(page),
        search: searchQuery,
        loai,
      });

      const res = await fetch(`/api/mon_them?${qs.toString()}`);
      const json: IMonThemResponse = await res.json();

      if (json.success) {
        setData(json.data);
        setTotalPages(json.totalPages);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error(" Lỗi khi tải danh sách món thêm:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  //  Gọi API mỗi khi thay đổi page, searchQuery, loai 
  useEffect(() => {
    fetchData();
  }, [page, searchQuery, loai]);

  //  Tự động tìm kiếm sau khi dừng gõ (debounce 0.5s) 
  useEffect(() => {
    const delay = setTimeout(() => {
      updateQuery({ search: search.trim(), page: "1" });
    }, 500);
    return () => clearTimeout(delay);
  }, [search]);

  //  Xác nhận đổi trạng thái 
  const handleToggleClick = (item: IMonThem) => setConfirmItem(item);

  const confirmToggle = async () => {
    if (!confirmItem) return;
    const id = confirmItem.id;
    const newState = !confirmItem.trang_thai;

    try {
      const res = await fetch(`/api/mon_them/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trang_thai: newState }),
      });

      if (!res.ok) throw new Error("Lỗi cập nhật trạng thái");

      setData((prev) =>
        prev.map((m) => (m.id === id ? { ...m, trang_thai: newState } : m))
      );
    } catch (err) {
      console.error(" PATCH lỗi:", err);
      alert("Không thể cập nhật trạng thái!");
    } finally {
      setConfirmItem(null);
    }
  };


  const handleHetMonClick = (item: IMonThem) => {
    const isHet = item.het_mon === today;
    if (isHet) setConfirmCoLai(item);
    else setConfirmHetMon(item);
  };

  const confirmHetMonSubmit = async () => {
    if (!confirmHetMon) return;
    const id = confirmHetMon.id;

    try {
      const res = await fetch(`/api/mon_them/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ het_mon: true }),
      });

      if (!res.ok) throw new Error();

      setData((prev) =>
        prev.map((m) => (m.id === id ? { ...m, het_mon: today } : m))
      );
    } catch {
      alert("Không thể cập nhật hết món!");
    } finally {
      setConfirmHetMon(null);
    }
  };

  const confirmCoLaiSubmit = async () => {
    if (!confirmCoLai) return;
    const id = confirmCoLai.id;

    try {
      const res = await fetch(`/api/mon_them/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ co_lai_mon: true }),
      });

      if (!res.ok) throw new Error();

      setData((prev) =>
        prev.map((m) => (m.id === id ? { ...m, het_mon: null } : m))
      );
    } catch {
      alert("Không thể cập nhật mở bán!");
    } finally {
      setConfirmCoLai(null);
    }
  };



  return (
    <div>
      {/*  THANH TIÊU ĐỀ + BỘ LỌC  */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Món Thêm</h1>

        <div className="flex gap-2 flex-wrap items-center">

          {/* Ô tìm kiếm có icon + nút xoá */}
          <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white relative">
            <input type="text" placeholder="Tìm theo tên món..." value={search} onChange={(e) => setSearch(e.target.value)} className="outline-none w-64 text-sm" />
            {search && (
              <button onClick={() => {
                setSearch("");
                updateQuery({ search: "", page: "1" });
              }}
                className="absolute right-2 text-gray-500 hover:text-red-500" title="Xoá nội dung" >
                ✕
              </button>
            )}
          </div>

          {/* Chọn loại món */}
          <select value={loai} onChange={(e) => updateQuery({ loai: e.target.value, page: "1" })}
            className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="all">Tất cả loại</option>
            <option value="1">Món ăn kèm</option>
            <option value="0">Topping</option>
          </select>

          {/* Nút thêm món thêm */}
          <Link href="/mon_them/them" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow">
            Thêm Món Thêm
          </Link>
        </div>
      </div>

      {/*  BẢNG DỮ LIỆU  */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
        <table className="min-w-full text-base text-left border-collapse table-fixed">
          <thead className="bg-gray-300 text-gray-700 uppercase text-base">
            <tr>
              <th className="px-5 py-3 w-[180px] text-center">Hết món</th>
              <th className="px-5 py-3 w-[240px] truncate">Tên món thêm</th>
              <th className="px-5 py-3 w-[120px] text-center">Giá thêm</th>
              <th className="px-5 py-3 w-[140px] text-center">Loại món</th>
              <th className="px-5 py-3 w-[120px] text-center">Trạng thái</th>
              <th className="px-5 py-3 w-[160px] text-center">Sửa </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <div className="h-6 w-6 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
                    <span>Đang tải dữ liệu...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              //  KHÔNG CÓ DỮ LIỆU 
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500 italic text-lg">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              //  HIỂN THỊ DỮ LIỆU 
              data.map((item) => {
                const isHetToday = item.het_mon === today;
                return (
                  <tr
                    key={item.id}
                    className={`border-t hover:bg-gray-100 transition ${isHetToday ? "opacity-40 bg-red-50" : ""
                      }`}
                  >
                    <td className="px-5 py-4 text-center cursor-pointer text-2xl" onClick={() => handleHetMonClick(item)}>
                      {isHetToday ? "🚫" : "🍜"}
                    </td>

                    <td className="px-5 py-4 font-semibold max-w-[240px] truncate whitespace-nowrap overflow-hidden">
                      {item.ten}
                    </td>

                    <td className="px-5 py-4 text-center text-red-600 font-medium">
                      {item.gia_them.toLocaleString("vi-VN")} ₫
                    </td>

                    <td className="px-5 py-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${item.loai_mon === 1
                            ? "bg-purple-100 text-purple-700 border border-purple-300"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-300"
                          }`}
                      >
                        {item.loai_mon === 1 ? "Món ăn kèm" : "Topping"}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center text-2xl cursor-pointer" onClick={() => handleToggleClick(item)}>
                      {item.trang_thai ? "✅" : "❌"}
                    </td>

                    <td className="px-5 py-4 text-center truncate whitespace-nowrap overflow-hidden">
                      <Link href={`/mon_them/${item.id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
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

      {/*  PHÂN TRANG  */}
      <div className="flex justify-center mt-6 space-x-2 text-sm">
        <button onClick={() => updateQuery({ page: "1" })} disabled={page === 1} className={`px-4 py-2 rounded-lg transition ${page === 1
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
              <button key={p} onClick={() => updateQuery({ page: String(p) })}
                className={`px-4 py-2 rounded-lg transition ${p === page
                  ? "bg-blue-500 text-white font-bold scale-105"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`} >
                {p}
              </button>
            )
          );
        })}

        <button
          onClick={() => updateQuery({ page: String(totalPages) })}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-lg transition ${page === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
            }`}>
          Cuối
        </button>
      </div>

      {/*  MODAL XÁC NHẬN  */}
      {confirmItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-[380px]">
            <h2 className="text-xl font-semibold mb-3 text-center text-gray-800">
              Xác nhận thay đổi trạng thái
            </h2>
            <p className="text-center mb-5 text-lg">
              Bạn có muốn{" "}
              <span className="text-red-600 font-semibold">
                {confirmItem.trang_thai ? "ẩn" : "hiển thị"}
              </span>{" "}
              món{" "}
              <span className="font-semibold text-gray-700">
                {confirmItem.ten}
              </span>{" "}
              không?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmToggle}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 text-lg rounded-lg">
                Có
              </button>
              <button
                onClick={() => setConfirmItem(null)}
                className="bg-gray-300 hover:bg-gray-400 px-5 py-2 text-lg rounded-lg">
                Không
              </button>
            </div>
          </div>
        </div>
      )}


      {confirmHetMon && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 shadow-lg w-[340px]">
            <h2 className="text-lg font-bold text-center mb-3 text-red-600">Hết món hôm nay?</h2>
            <p className="text-center mb-4 text-base">
              Món <span className="font-bold">{confirmHetMon.ten}</span> sẽ tạm ẩn trong ngày hôm nay.
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={confirmHetMonSubmit} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-base">Xác nhận</button>
              <button onClick={() => setConfirmHetMon(null)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg font-medium text-base">Hủy</button>
            </div>
          </div>
        </div>
      )}

      {confirmCoLai && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 shadow-lg w-[340px]">
            <h2 className="text-lg font-bold text-center mb-3 text-green-600">Mở bán lại hôm nay?</h2>
            <p className="text-center mb-4 text-base">
              Món <span className="font-bold">{confirmCoLai.ten}</span> sẽ được mở bán lại trong ngày hôm nay.
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={confirmCoLaiSubmit} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-base">Xác nhận</button>
              <button onClick={() => setConfirmCoLai(null)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg font-medium text-base">Hủy</button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}

export default function MonThemList() {
  return (
    <Suspense fallback={<div className="p-4 text-lg">Đang tải...</div>}>
      <MonThemListContent />
    </Suspense>
  );
}

