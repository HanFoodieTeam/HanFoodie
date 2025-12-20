"use client";

import { useEffect, useState } from "react";

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
      console.error("DanhGia load error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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

  return (
    <div className="w-full min-h-screen px-[5px] py-[5px] space-y-4">
      <h1 className="text-lg font-semibold">
        Thống kê đánh giá sản phẩm
      </h1>

      {/* ================= FILTER ================= */}
      <div className="flex flex-wrap gap-2 items-end">
        <div>
          <label className="text-xs font-medium">Từ ngày</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded px-2 py-1 block text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-medium">Đến ngày</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded px-2 py-1 block text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-medium">Thống kê theo</label>
          <select
            value={filterTime}
            onChange={(e) =>
              setFilterTime(e.target.value as "ngay" | "thang" | "nam")
            }
            className="border rounded px-2 py-1 block text-sm"
          >
            <option value="ngay">Ngày</option>
            <option value="thang">Tháng</option>
            <option value="nam">Năm</option>
          </select>
        </div>

        <button
          onClick={loadData}
          className="bg-blue-600 text-white px-4 py-1.5 rounded shadow hover:bg-blue-700 text-sm"
        >
          Xem
        </button>
      </div>

      {/* ================= Doanh thu (highlight đánh giá) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {data.length > 0 && (
          <div className="bg-green-100 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-semibold text-green-800 mb-1">
              Sản phẩm được đánh giá cao
            </p>
            {(() => {
              const top = [...data].sort(
                (a, b) => b.trung_binh - a.trung_binh
              )[0];
              return (
                <>
                  <p className="text-base font-bold text-green-900">
                    {top.ten}
                  </p>
                  <p className="text-sm text-green-700">
                    ★ {top.trung_binh.toFixed(1)} – {top.tong_danh_gia} lượt
                  </p>
                </>
              );
            })()}
          </div>
        )}

        {data.length > 0 && (
          <div className="bg-red-100 rounded-lg p-4 shadow-sm">
            <p className="text-sm font-semibold text-red-800 mb-1">
              Sản phẩm đánh giá thấp
            </p>
            {(() => {
              const low = [...data].sort(
                (a, b) => a.trung_binh - b.trung_binh
              )[0];
              return (
                <>
                  <p className="text-base font-bold text-red-900">
                    {low.ten}
                  </p>
                  <p className="text-sm text-red-700">
                    ★ {low.trung_binh.toFixed(1)} – {low.tong_danh_gia} lượt
                  </p>
                </>
              );
            })()}
          </div>
        )}
      </div>

      {/* ================= FILTER STAR ================= */}
      <div className="flex gap-2 flex-wrap">
        {["all", "1", "2", "3", "4", "5"].map((s) => (
          <button
            key={s}
            onClick={() =>
              setFilterStar(s as "all" | "1" | "2" | "3" | "4" | "5")
            }
            className={`px-3 py-1.5 rounded-full text-sm border transition
              ${
                filterStar === s
                  ? "bg-yellow-400 text-white border-yellow-400"
                  : "bg-white border-gray-300 hover:bg-yellow-50"
              }`}
          >
            {s === "all" ? "Tất cả" : `${s}★`}
          </button>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-lg shadow-sm p-3">
        <h2 className="text-base font-semibold mb-2">
          Chi tiết đánh giá
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Sản phẩm</th>
                <th className="p-2 text-right">Tổng</th>
                <th className="p-2 text-right">TB ★</th>
                <th className="p-2 text-right">1★</th>
                <th className="p-2 text-right">2★</th>
                <th className="p-2 text-right">3★</th>
                <th className="p-2 text-right">4★</th>
                <th className="p-2 text-right">5★</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-3 text-center">
                    Đang tải…
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
                  <tr
                    key={sp.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="p-2 flex items-center gap-2">
                      {sp.hinh ? (
                        <img
                          src={sp.hinh}
                          alt={sp.ten}
                          className="w-9 h-9 rounded object-cover"
                        />
                      ) : (
                        <div className="w-9 h-9 bg-gray-200 rounded flex items-center justify-center text-xs">
                          SP
                        </div>
                      )}
                      <span>{sp.ten}</span>
                    </td>
                    <td className="p-2 text-right">{sp.tong_danh_gia}</td>
                    <td className="p-2 text-right font-semibold text-yellow-500">
                      {sp.trung_binh.toFixed(1)}
                    </td>
                    <td className="p-2 text-right">{sp.sao_1}</td>
                    <td className="p-2 text-right">{sp.sao_2}</td>
                    <td className="p-2 text-right">{sp.sao_3}</td>
                    <td className="p-2 text-right">{sp.sao_4}</td>
                    <td className="p-2 text-right">{sp.sao_5}</td>
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
