"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IMaGiamGia } from "../lib/cautrucdata";
import NutXoaMGG from "./NutXoaMGG";

export default function MaGiamGiaList() {
  const [data, setData] = useState<IMaGiamGia[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmAnHien, setConfirmAnHien] = useState<IMaGiamGia | null>(null);

  useEffect(() => {
    fetch("/api/ma_giam_gia")
      .then((res) => res.json())
      .then((d) => setData(d))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleted = (id: number) => {
    // 🟢 Xóa item khỏi danh sách ngay
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleAnHien = (item: IMaGiamGia) => {
    setConfirmAnHien(item);
  };

  const confirmToggle = async () => {
    if (!confirmAnHien) return;
    const id = confirmAnHien.id;
    const newState = !confirmAnHien.an_hien;

    const res = await fetch(`/api/ma_giam_gia/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ an_hien: newState }),
    });

    if (res.ok) {
      // 🟢 Cập nhật trạng thái ngay mà không refetch
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, an_hien: newState } : item
        )
      );
    } else {
      alert("Không thể cập nhật trạng thái!");
    }

    setConfirmAnHien(null);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;

  return (
    <div>
      <h1 className="text-xl p-2 bg-amber-300 font-bold uppercase">
        Danh sách Mã Giảm Giá
      </h1>

      <div className="flex justify-between mt-2">
        <input
          type="text"
          placeholder="Tìm mã giảm giá..."
          className="border p-2 w-1/3"
        />
        <Link
          href="/ma_giam_gia/them"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Thêm Mã Giảm Giá
        </Link>
      </div>

      <table className="table-auto w-full mt-4 border text-[0.9em]">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2">Tên/Mã số</th>
            <th className="p-2">Giá trị giảm</th>
            <th className="p-2"> GT Tối thiểu</th>
            <th className="p-2">Số lượng</th>
            <th className="p-2">Bắt đầu / Kết thúc</th>
            <th className="p-2">Ẩn/Hiện</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.map((mgg) => (
            <tr
              key={mgg.id}
              className="border-t hover:bg-gray-300 transition-all duration-200"
            >
              <td className="p-2 font-semibold">
                {mgg.ten}
                <br />
                <span className="font-mono text-sm text-gray-600">
                  ({mgg.ma_so})
                </span>
              </td>
              <td className="p-2 text-center text-red-600">
                {mgg.loai_giam_gia
                  ? `${mgg.gia_tri_giam}%`
                  : `${mgg.gia_tri_giam.toLocaleString("vi")} VNĐ`}
              </td>
              <td className="p-2  text-center">
                {mgg.gia_tri_toi_thieu.toLocaleString("vi")} VNĐ
              </td>
              <td className="p-2 text-center">{mgg.so_luong}</td>
              <td className="p-2 text-center">
                {formatDate(mgg.bat_dau)} <br />
                <span className="text-red-500">{formatDate(mgg.ket_thuc)}</span>
              </td>

              {/* ✅ Ẩn / Hiện */}
              <td
                className="p-2 text-center cursor-pointer select-none"
                onClick={() => handleToggleAnHien(mgg)}
              >
                {mgg.an_hien ? "✅" : "❌"}
              </td>

              {/* ✅ Nút Sửa + Xóa */}
              <td className="p-2 text-center space-x-2">
                <Link
                  href={`/ma_giam_gia/${mgg.id}`}
                  className="text-blue-500 hover:text-blue-700 font-bold"
                >
                  Sửa
                </Link>
                <NutXoaMGG
                  id={mgg.id}
                  ten={mgg.ten}
                  onDeleted={handleDeleted}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal xác nhận ẩn/hiện */}
      {confirmAnHien && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[380px] animate-fadeIn">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Xác nhận thay đổi trạng thái
            </h2>
            <p className="text-center mb-5">
              Bạn có muốn{" "}
              <span className="font-semibold text-red-600">
                {confirmAnHien.an_hien ? "ẩn" : "hiển thị"}
              </span>{" "}
              mã giảm giá{" "}
              <span className="font-semibold">
                {confirmAnHien.ten} ({confirmAnHien.ma_so})
              </span>{" "}
              không?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={confirmToggle}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Có
              </button>
              <button
                onClick={() => setConfirmAnHien(null)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
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
