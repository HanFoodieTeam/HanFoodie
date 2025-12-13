"use client";
import { useState } from "react";
import { IDiaChi } from "@/lib/cautrucdata";

export default function SuaDiaChi({
  diaChi,
  onClose,
  onUpdated,
}: {
  diaChi: IDiaChi;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [form, setForm] = useState(diaChi);
  const [loading, setLoading] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/dia_chi/${diaChi.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(data.message);
      if (res.ok) {
        onUpdated();
        onClose();
      }
    } catch {
      alert("Lỗi cập nhật địa chỉ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[95%] max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Cập nhật địa chỉ</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Họ tên"
            className="w-full border p-2 rounded"
            value={form.ho_ten}
            onChange={(e) => setForm({ ...form, ho_ten: e.target.value })}
          />
          <input
            type="text"
            placeholder="Số điện thoại"
            className="w-full border p-2 rounded"
            value={form.sdt}
            onChange={(e) => setForm({ ...form, sdt: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tỉnh/Thành phố"
            className="w-full border p-2 rounded"
            value={form.tinh}
            onChange={(e) => setForm({ ...form, tinh: e.target.value })}
          />
          <input
            type="text"
            placeholder="Quận/Huyện"
            className="w-full border p-2 rounded"
            value={form.phuong}
            onChange={(e) => setForm({ ...form, phuong: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tên đường, số nhà"
            className="w-full border p-2 rounded"
            value={form.ten_duong}
            onChange={(e) => setForm({ ...form, ten_duong: e.target.value })}
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!form.mac_dinh}
              onChange={(e) => setForm({ ...form, mac_dinh: e.target.checked })}
            />
            Đặt làm địa chỉ mặc định
          </label>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Đang lưu..." : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
