
"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { INguoiDung } from "@/app/lib/cautrucdata";

function NguoiDungContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get("page") || 1);
  const qParam = searchParams.get("search") || "";
  const roleParam = searchParams.get("role") || "all";

  const [allData, setAllData] = useState<INguoiDung[]>([]);
  const [searchInput, setSearchInput] = useState(qParam);
  const [loading, setLoading] = useState(true);

  const pageSize = 10;

  const updateQuery = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val) params.set(key, val);
      else params.delete(key);
    });
    router.replace(`/nguoi_dung?${params.toString()}`);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/nguoi_dung");
        const json = await res.json();

        setAllData(json.data);
      } catch {
        setAllData([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  useEffect(() => {
    setSearchInput(qParam);
  }, [qParam]);

  useEffect(() => {
    const t = setTimeout(() => {
      updateQuery({
        search: searchInput.trim() || undefined,
        page: "1",
      });
    }, 400);

    return () => clearTimeout(t);
  }, [searchInput]);

  // Bộ lọc search & vai trò
  const filtered = useMemo(() => {
    let tmp = [...allData];
    const q = qParam.trim().toLowerCase();

    if (q) {
      tmp = tmp.filter(
        (u) =>
          u.ho_ten.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }
    if (roleParam !== "all") {
      const isAdmin = roleParam === "admin"; // true nếu admin
      tmp = tmp.filter((u) => u.vai_tro === isAdmin);
    }





    return tmp;
  }, [allData, qParam, roleParam]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(Math.max(pageParam, 1), totalPages);

  const pageData = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6">

      {/* Header */}
      {/* Header */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">

        <h1 className="text-2xl font-bold whitespace-nowrap">
          Quản lý Người Dùng
        </h1>

        <div className="flex items-center gap-2">

          {/* Bộ lọc vai trò */}
          <select
            className="border px-3 py-2 rounded-lg bg-white shadow-sm text-sm cursor-pointer hover:border-gray-400 transition"
            value={roleParam}
            onChange={(e) =>
              updateQuery({ role: e.target.value, page: "1" })
            }>
            <option value="all">Tất cả</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          {/* Tìm kiếm */}
          <div className="flex items-center border rounded-lg px-2 py-1.5 bg-white relative shadow-sm">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>

            <input type="text" placeholder="Tìm theo tên hoặc email..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
              className="outline-none text-sm w-56" />

            {searchInput && (
              <button onClick={() => {
                setSearchInput(""); updateQuery({ search: "", page: "1" });
              }}
                className="absolute right-2 text-gray-500 hover:text-red-500" title="Xoá nội dung">
                ✕
              </button>
            )}

          </div>
        </div>

      </div>


      {/* icon xóa tìm kiếm  */}
      {/* ✕  */}


      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-300 text-gray-700 uppercase text-center">
            <tr>
              <th className="px-4 py-3 w-50">Họ Tên</th>
              <th className="px-4 py-3 w-56">Email</th>
              <th className="px-4 py-3 w-30">SĐT</th>
              <th className="px-4 py-3">Vai trò</th>
              <th className="px-4 py-3">Kích hoạt</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Ngày tạo</th>

            </tr>
          </thead>


          <tbody className="text-center">
            {loading ? (
              <tr>
                <td colSpan={6} className="py-8">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : pageData.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              pageData.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-100 transition">

                  <td className="px-4 py-3 w-50">  <Link href={`/nguoi_dung/${u.id}`}>{u.ho_ten}</Link></td>
                  <td className="px-4 py-3 w-56">{u.email}</td>
                  <td className="px-4 py-3 w-30">{u.sdt ?? "-"}</td>
                  <td className="px-4 py-3">{u.vai_tro ? "Admin" : "User"}</td>
                  <td className="px-4 py-3">{u.kich_hoat ? "🟢" : "🔴"}</td>
                  <td className="px-4 py-3">{u.trang_thai ? "🟢" : "🔴"}</td>
                  <td className="px-3 py-2">
                    {u.ngay_tao
                      ? new Date(u.ngay_tao).toLocaleDateString("vi-VN")
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button disabled={currentPage === 1}
          onClick={() => updateQuery({ page: "1" })}
          className={`px-4 py-2 rounded ${currentPage === 1
            ? "bg-gray-300"
            : "bg-gray-200 hover:bg-gray-300"
            }`}>
          Đầu
        </button>

        {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
          .filter((p) => p >= 1 && p <= totalPages)
          .map((p) => (
            <button
              key={p}
              onClick={() => updateQuery({ page: String(p) })}
              className={`px-4 py-2 rounded ${p === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {p}
            </button>
          ))}

        <button disabled={currentPage === totalPages}
          onClick={() => updateQuery({ page: String(totalPages) })}
          className={`px-4 py-2 rounded ${currentPage === totalPages
            ? "bg-gray-300"
            : "bg-gray-200 hover:bg-gray-300"
            }`}>
          Cuối
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-4">Đang tải...</div>}>
      <NguoiDungContent />
    </Suspense>
  );
}
