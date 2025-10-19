"use client";

import { useEffect, useState } from "react";
import { IDanhGia } from "../lib/cautrucdata";
import { Star } from "lucide-react";




export default function QuanLyDanhGia() {
  const [data, setData] = useState<IDanhGia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDanhGia();
  }, []);

  const fetchDanhGia = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3002/api/danh_gia");
      const result = await res.json();
      // Đảm bảo dữ liệu là mảng trước khi set
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.error("Dữ liệu trả về không phải là mảng:", result);
        setData([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải danh_gia:", error);
      setData([]); // Đặt về mảng rỗng nếu có lỗi
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Quản lý đánh giá</h1>

      {/* {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : ( */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-300 text-gray-700 uppercase">
              <tr>
                <th className="px-4 py-3">Hình</th>
                <th className="px-4 py-3 ">Nội dung</th>
                <th className="px-4 py-3">Sao</th>
                <th className="px-4 py-3">Người dùng</th>
                <th className="px-4 py-3">Biến thể</th>
                <th className="px-4 py-3">Ngày</th>
                <th className="px-4 py-3 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-300">
                  <td className="px-4 py-3">
                    <img
                      src={item.hinh || "/default-avatar.png"}
                      alt="Hình đánh giá"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate ">{item.noi_dung}</td>
                  <td className="px-4 py-3 flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={16}
                        className={j < item.sao ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </td>
                  <td className="px-4 py-3">{item.id_nguoi_dung}</td>
                  <td className="px-4 py-3">{item.id_bien_the}</td>
                  <td className="px-4 py-3">{item.thoi_gian ? new Date(item.thoi_gian).toLocaleDateString('vi-VN') : 'N/A'}</td>
                  
                  {/* CỘT TRẠNG THÁI ĐÃ SỬA: Thay thế 0/1 bằng icon */}
                  <td className="px-4 py-3 text-center">
                    {item.an_hien ? "✅" : "❌"}
                  </td>
                  
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      {/* )} */}
    </div>
  );
}