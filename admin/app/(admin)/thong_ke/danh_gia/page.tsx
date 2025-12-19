"use client";

import { useEffect, useState } from "react";

/* ================= TYPES ================= */
interface DanhGiaItem {
  id: number;
  ten: string;
  hinh: string | null;
  tong_danh_gia: number;
  trung_binh: number;
  sao_1: number;
  sao_2: number;
  sao_3: number;
  sao_4: number;
  sao_5: number;
}

/* ================= PAGE ================= */
export default function DanhGiaPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [from, setFrom] = useState<string>(today);
  const [to, setTo] = useState<string>(today);
  const [filterTime, setFilterTime] =
    useState<"ngay" | "thang" | "nam">("ngay");

  const [filterStar, setFilterStar] =
    useState<"all" | "1" | "2" | "3" | "4" | "5">("all");

  const [data, setData] = useState<DanhGiaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /* ================= LOAD DATA ================= */
  const loadData = async (): Promise<void> => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        from,
        to,
        filter: filterTime,
      });

      const res = await fetch(`/api/thong_ke/danh_gia?${params.toString()}`);
      const json: DanhGiaItem[] = await res.json();
      setData(json);
    } catch (error) {
      console.error(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  /* ================= FILTER BY STAR ================= */
  const filteredList: DanhGiaItem[] =
    filterStar === "all"
      ? data
      : data.filter((item) => {
        switch (filterStar) {
          case "1":
            return item.sao_1 > 0;
          case "2":
            return item.sao_2 > 0;
          case "3":
            return item.sao_3 > 0;
          case "4":
            return item.sao_4 > 0;
          case "5":
            return item.sao_5 > 0;
          default:
            return true;
        }
      });

  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Thống kê đánh giá sản phẩm</h1>


      {/* ================= FILTER ================= */}
      <div className="flex flex-wrap gap-3 items-end mb-4">
        <div>
          <label className="text-sm font-medium">Từ ngày</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded-lg px-3 py-2 block focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Đến ngày</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded-lg px-3 py-2 block focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Thống kê theo</label>
          <select
            value={filterTime}
            onChange={(e) =>
              setFilterTime(e.target.value as "ngay" | "thang" | "nam")
            }
            className="border rounded-lg px-3 py-2 block focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="ngay">Ngày</option>
            <option value="thang">Tháng</option>
            <option value="nam">Năm</option>
          </select>
        </div>

        <button
          onClick={loadData}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Xem
        </button>
      </div>
      {/* ================= HIGHLIGHT BOX ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Sản phẩm đánh giá cao */}
        {data.length > 0 && (
          <div className="bg-green-100 rounded-xl p-6 shadow flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Sản phẩm được đánh giá cao
            </h3>
            {(() => {
              const topProduct = [...data].sort((a, b) => b.trung_binh - a.trung_binh)[0];
              return (
                <>
                  <span className="text-xl font-bold text-green-900">{topProduct.ten}</span>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-yellow-500 font-bold">{topProduct.trung_binh.toFixed(1)}</span>
                    <svg className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09L5.65 11.545 1 7.455l6.061-.545L10 1l2.939 5.91L19 7.455l-4.65 4.09 1.528 6.545z" />
                    </svg>
                  </div>
                  <span className="text-sm text-green-700 mt-1">Tổng {topProduct.tong_danh_gia} lượt đánh giá</span>
                </>
              );
            })()}
          </div>
        )}

        {/* Sản phẩm đánh giá thấp */}
        {data.length > 0 && (
          <div className="bg-red-100 rounded-xl p-6 shadow flex flex-col justify-between">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Sản phẩm đánh giá thấp
            </h3>
            {(() => {
              const lowProduct = [...data].sort((a, b) => a.trung_binh - b.trung_binh)[0];
              return (
                <>
                  <span className="text-xl font-bold text-red-900">{lowProduct.ten}</span>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-yellow-500 font-bold">{lowProduct.trung_binh.toFixed(1)}</span>
                    <svg className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09L5.65 11.545 1 7.455l6.061-.545L10 1l2.939 5.91L19 7.455l-4.65 4.09 1.528 6.545z" />
                    </svg>
                  </div>
                  <span className="text-sm text-red-700 mt-1">Tổng {lowProduct.tong_danh_gia} lượt đánh giá</span>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* ================= FILTER STAR ================= */}
      <div className="flex gap-2 flex-wrap mb-6">
        {[
          { label: "Tất cả", value: "all" },
          { label: "1★", value: "1" },
          { label: "2★", value: "2" },
          { label: "3★", value: "3" },
          { label: "4★", value: "4" },
          { label: "5★", value: "5" },
        ].map((s) => (
          <button
            key={s.value}
            onClick={() => setFilterStar(s.value as typeof filterStar)}
            className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium border transition
        ${filterStar === s.value
                ? "bg-yellow-400 text-white border-yellow-400 shadow-lg"
                : "bg-white text-gray-700 border-gray-300 hover:bg-yellow-50"
              }`}
          >
            {s.value !== "all" ? (
              <>
                <span className="font-bold">{s.value}</span>
                <svg
                  className="w-4 h-4 fill-current text-yellow-500"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09L5.65 11.545 1 7.455l6.061-.545L10 1l2.939 5.91L19 7.455l-4.65 4.09 1.528 6.545z" />
                </svg>
              </>
            ) : (
              s.label
            )}
          </button>
        ))}
      </div>



      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">
          Chi tiết đánh giá
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Sản phẩm</th>
                <th className="p-2 text-right">Tổng</th>
                <th className="p-2 text-right text-yellow-500">TB ★</th>
                <th className="p-2 text-right text-yellow-500">1★</th>
                <th className="p-2 text-right text-yellow-500">2★</th>
                <th className="p-2 text-right text-yellow-500">3★</th>
                <th className="p-2 text-right text-yellow-500">4★</th>
                <th className="p-2 text-right text-yellow-500">5★</th>
              </tr>

            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-3 text-center">
                    Đang tải...
                  </td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-3 text-center text-gray-500">
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                filteredList.map((sp) => (
                  <tr key={sp.id} className="hover:bg-gray-50 transition">
                    <td className="p-2 flex items-center gap-2">
                      {sp.hinh ? (
                        <img
                          src={sp.hinh}
                          alt={sp.ten}
                          className="w-10 h-10 rounded object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                          SP
                        </div>
                      )}
                      <span>{sp.ten}</span>
                    </td>
                    <td className="p-2 text-right">{sp.tong_danh_gia}</td>
                    <td className="p-2 text-right font-semibold">
                      <span className="text-yellow-500">{sp.trung_binh.toFixed(1)}</span>
                    </td>
                    <td className={`p-2 text-right ${sp.sao_1 > 0 ? "text-yellow-500 font-semibold" : ""}`}>{sp.sao_1}</td>
                    <td className={`p-2 text-right ${sp.sao_2 > 0 ? "text-yellow-500 font-semibold" : ""}`}>{sp.sao_2}</td>
                    <td className={`p-2 text-right ${sp.sao_3 > 0 ? "text-yellow-500 font-semibold" : ""}`}>{sp.sao_3}</td>
                    <td className={`p-2 text-right ${sp.sao_4 > 0 ? "text-yellow-500 font-semibold" : ""}`}>{sp.sao_4}</td>
                    <td className={`p-2 text-right ${sp.sao_5 > 0 ? "text-yellow-500 font-semibold" : ""}`}>{sp.sao_5}</td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
