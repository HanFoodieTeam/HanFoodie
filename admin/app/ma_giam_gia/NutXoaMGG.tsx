"use client";
import { useState } from "react";

export default function NutXoaMGG({
  id,
  ten,
  onDeleted,
}: {
  id: number;
  ten: string;
  onDeleted?: (id: number) => void; // 🟢 Trả về id để cha tự xóa trong state
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const res = await fetch(`/api/ma_giam_gia/${id}`, { method: "DELETE" });

    if (res.ok) {
      onDeleted?.(id); // ✅ Gửi id lên cha để cập nhật danh sách
    } else {
      alert("❌ Xóa thất bại!");
    }

    setShowConfirm(false);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-red-600 hover:text-red-800 font-bold px-2"
      >
        Xóa
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[380px] animate-fadeIn">
            <h2 className="text-lg font-semibold mb-3 text-center text-red-600">
              Xác nhận xóa mã giảm giá
            </h2>
            <p className="text-center mb-5">
              Bạn có chắc muốn xóa{" "}
              <span className="font-semibold text-red-500">{ten}</span> không?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                {loading ? "Đang xóa..." : "Xóa"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
