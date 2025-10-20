"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { IDanhGia } from "../lib/cautrucdata";

export default function QuanLyDanhGia() {
  const [data, setData] = useState<IDanhGia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDanhGia();
  }, []);

  const fetchDanhGia = async () => {
    try {
      const res = await fetch("/api/danh_gia"); // ✅ dùng nội bộ tránh lỗi CORS
      const result = await res.json();
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-base">Đang tải dữ liệu...</div>;

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Quản lý đánh giá</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-[15px] text-left border-collapse">
          <thead className="bg-gray-300 text-gray-700 uppercase text-sm">
            <tr>
              <th className="px-5 py-3">Hình</th>
              <th className="px-5 py-3">Sản phẩm</th>
              <th className="px-5 py-3">Nội dung</th>
              <th className="px-5 py-3 text-center">Sao</th>
              <th className="px-5 py-3 ">Người dùng</th>
              <th className="px-5 py-3 text-center">Ngày</th>
              <th className="px-5 py-3 text-center">Trạng thái</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-200 transition-colors text-[15px]"
              >
                {/* Hình */}
                <td className="px-5 py-2">
                  {item.hinh ? (
                    <img
                      src={item.hinh}
                      alt="Ảnh sản phẩm"
                      className="w-14 h-14 rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                      N/A
                    </div>
                  )}
                </td>

                {/* Sản phẩm */}
                <td className="px-5 py-2">
                  <div>
                    <div className="font-semibold text-[15px] truncate max-w-[140px]">
                      {item.bien_the?.san_pham?.ten || "Không rõ sản phẩm"}
                    </div>
                    <div className="text-gray-500 text-sm italic">
                      ({item.bien_the?.ten || "Không có biến thể"})
                    </div>
                  </div>
                </td>

                {/* Nội dung */}
                <td className="px-5 py-2 max-w-[250px] truncate">{item.noi_dung}</td>

                {/* Sao */}
                <td className="px-5 py-2 text-center align-middle">
                  <div className="flex justify-center items-center gap-[2px]">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={20}
                        className={j < item.sao ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </td>

                {/* Người dùng */}
                <td className="px-5 py-2 font-medium truncate max-w-[180px]">{item.nguoi_dung?.ho_ten || "Ẩn danh"}</td>

                {/* Ngày */}
                <td className="px-5 py-2">
                  {item.thoi_gian ? new Date(item.thoi_gian).toLocaleDateString("vi-VN") : "N/A"}
                </td>

                {/* Trạng thái */}
                <td className="px-2 py-2 text-center text-xl">
                  {item.an_hien ? "✅" : "❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
