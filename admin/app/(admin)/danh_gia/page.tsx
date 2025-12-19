"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Star, Search, ArrowDownUp } from "lucide-react";
import type { IThongKeDanhGia } from "@/lib/cautrucdata";
import Link from "next/link";
import Image from "next/image";

function DanhGiaTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [data, setData] = useState<IThongKeDanhGia[]>([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("search") || "";
  const sortOrder = (searchParams.get("sort") as "asc" | "desc") || "asc";
  const page = Number(searchParams.get("page") || "1");
  const filterSao = Number(searchParams.get("filterSao") || 0);

  const pageSize = 7;

  const updateQuery = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (!value || value === "none") newParams.delete(key);
      else newParams.set(key, value);
    });
    router.replace(`${pathname}?${newParams.toString()}`);
  };

  // 🔹 Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/danh_gia/tong_quan");
        const result: IThongKeDanhGia[] = await res.json();

        if (Array.isArray(result)) {
          // Chuẩn hóa dữ liệu (không dùng any)
          const clean: IThongKeDanhGia[] = result.map((r) => ({
            san_pham_id: r.san_pham_id,
            ten: r.ten,
            hinh: r.hinh,
            sao_1: Number(r.sao_1) || 0,
            sao_2: Number(r.sao_2) || 0,
            sao_3: Number(r.sao_3) || 0,
            sao_4: Number(r.sao_4) || 0,
            sao_5: Number(r.sao_5) || 0,
            tong_danh_gia: Number(r.tong_danh_gia) || 0,
            trung_binh: Number(r.trung_binh) || 0,
          }));
          setData(clean);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //  Lọc + sắp xếp
  const filteredData = useMemo(() => {
    let filtered = data.slice();

    //  Tìm kiếm
    if (search.trim()) {
      filtered = filtered.filter((sp) =>
        sp.ten.toLowerCase().includes(search.toLowerCase())
      );
    }

    //  Nếu lọc theo sao cụ thể (1–5)
    if (filterSao >= 1 && filterSao <= 5) {
      // Chỉ lấy sản phẩm có đánh giá (tong_danh_gia > 0)
      filtered = filtered.filter((sp) => sp.tong_danh_gia > 0);

      const key: keyof IThongKeDanhGia = `sao_${filterSao}` as keyof IThongKeDanhGia;

      // Sắp xếp theo số lượng sao_X, nhưng KHÔNG loại bỏ sản phẩm có 0 sao đó
      filtered = filtered
        .map((sp) => ({
          ...sp,
          count: Number(sp[key]) || 0,
        }))
        .sort((a, b) =>
          sortOrder === "asc" ? a.count - b.count : b.count - a.count
        )
        .map(({ count, ...rest }) => rest);
    } else {
      //  Nếu "Tất cả" → lấy toàn bộ sản phẩm (kể cả chưa có đánh giá)
      filtered = filtered.sort((a, b) =>
        sortOrder === "asc"
          ? a.trung_binh - b.trung_binh
          : b.trung_binh - a.trung_binh
      );
    }

    return filtered;
  }, [data, search, sortOrder, filterSao]);



  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );


  return (
    <div className="">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h1 className="text-2xl font-bold text-gray-800">
          Thống kê đánh giá sản phẩm
        </h1>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white">
            <Search size={18} className="text-gray-500 mr-2" />

            <input type="text" placeholder="Tìm sản phẩm..." value={search}
              onChange={(e) => updateQuery({ search: e.target.value.trim(), page: "1" })}
              className="outline-none text-sm w-48" />

            {search && (
              <button onClick={() => updateQuery({ search: "", page: "1" })}
                className="text-gray-400 hover:text-red-500 ml-2 transition" title="Xoá nội dung tìm kiếm">
                ✕
              </button>
            )}
          </div>


          {/*  Lọc theo số sao */}
          <select
            value={filterSao}
            onChange={(e) => updateQuery({ filterSao: e.target.value, page: "1" })}
            className="border rounded-lg px-3 py-1.5 text-sm bg-white">
            <option value="0">Trung Bình ⭐</option>
            <option value="1">Chỉ 1⭐</option>
            <option value="2">Chỉ 2⭐</option>
            <option value="3">Chỉ 3⭐</option>
            <option value="4">Chỉ 4⭐</option>
            <option value="5">Chỉ 5⭐</option>
          </select>

          {/*  Sắp xếp */}
          <button
            onClick={() =>
              updateQuery({ sort: sortOrder === "asc" ? "desc" : "asc", page: "1" })
            }
            className="flex items-center gap-1 border rounded-lg px-3 py-1.5 bg-white hover:bg-gray-100 transition text-sm">
            <ArrowDownUp size={16} />
            {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
          </button>
        </div>
      </div>

      {/*  Bảng hiển thị */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md min-h-[500px]">
        <table className="min-w-full text-[16px] text-left border-collapse">
          <thead className="bg-gray-300 text-gray-700 uppercase text-[15px]">
            <tr>
              <th className="px-5 py-3">Hình</th>
              <th className="px-5 py-3">Sản phẩm</th>
              <th className="px-5 py-3 text-center">Trung bình</th>
              <th className="px-5 py-3 text-center">1⭐</th>
              <th className="px-5 py-3 text-center">2⭐</th>
              <th className="px-5 py-3 text-center">3⭐</th>
              <th className="px-5 py-3 text-center">4⭐</th>
              <th className="px-5 py-3 text-center">5⭐</th>


            </tr>
          </thead>

          <tbody className="text-gray-800">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-10 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <div className="h-5 w-5 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
                    <span>Đang tải dữ liệu...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  Không có dữ liệu phù hợp
                </td>
              </tr>
            ) : (
              paginatedData.map((sp) => (
                <tr key={sp.san_pham_id} onClick={() => router.push(`/danh_gia/${sp.san_pham_id}`)}
                  className="border-b hover:bg-gray-100 transition-colors cursor-pointer">
                  <td className="px-5 py-2">
                    <Link href={`/danh_gia/${sp.san_pham_id}`} onClick={(e) => e.stopPropagation()}  >
                      <Image src={(sp?.hinh || "/noing.png").trim()} alt={sp?.ten || "Sản phẩm"} width={90} height={90} className="rounded-lg object-cover" />


                    </Link>
                  </td>

                  <td className="px-2 py-2 font-semibold text-[16px] max-w-[200px]">
                    <Link href={`/danh_gia/${sp.san_pham_id}`} onClick={(e) => e.stopPropagation()} className="hover:text-blue-600 block truncate" title={sp.ten}>
                      {sp.ten}
                    </Link>
                  </td>

                  <td className="px-5 py-2 text-center">
                    <div className="flex items-center justify-center gap-1 text-yellow-600 font-semibold text-[16px]">
                      {sp.tong_danh_gia > 0 ? (<>
                        {sp.trung_binh.toFixed(1)}
                        <Star size={18} className="text-yellow-500 fill-yellow-500" />
                        <span className="text-sm text-gray-600">({sp.tong_danh_gia})</span> </>
                      ) : (
                        <span className="text-gray-400">–</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-2 text-center">{sp.sao_1}</td>
                  <td className="px-5 py-2 text-center">{sp.sao_2}</td>
                  <td className="px-5 py-2 text-center">{sp.sao_3}</td>
                  <td className="px-5 py-2 text-center">{sp.sao_4}</td>
                  <td className="px-5 py-2 text-center">{sp.sao_5}</td>
                </tr>

              ))
            )}
          </tbody>

        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-5 space-x-2">
          <button onClick={() => updateQuery({ page: "1" })}
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
                <button key={p} onClick={() => updateQuery({ page: String(p) })}
                  className={`px-3 py-1 rounded ${p === page
                    ? "bg-blue-500 text-white font-bold scale-105"
                    : "bg-gray-200 hover:bg-gray-300"
                    }`}>
                  {p}
                </button>
              )
            );
          })}

          <button onClick={() => updateQuery({ page: String(totalPages) })}
            disabled={page === totalPages}
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

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-lg">Đang tải dữ liệu...</div>}>
      <DanhGiaTable />
    </Suspense>
  );
}
