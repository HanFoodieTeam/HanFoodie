"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ThemMaGiamGia() {
  const router = useRouter();
  const [form, setForm] = useState({
    ten: "",
    ma_so: "",
    loai_giam_gia: false, // false = tiền, true = %
    gia_tri_giam: 0,
    gia_tri_toi_thieu: 0,
    so_luong: 1,
    bat_dau: "",
    ket_thuc: "",
    dieu_kien: "",
    an_hien: true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/ma_giam_gia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("✅ Thêm mã giảm giá thành công!");
      router.push("/ma_giam_gia");
    } else {
      alert("❌ Thêm thất bại, vui lòng kiểm tra lại!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      <h1 className="text-xl font-bold mb-4 text-center bg-amber-300 py-2 rounded">
        ➕ Thêm Mã Giảm Giá
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên và mã số */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Tên mã giảm giá</label>
            <input
              name="ten"
              value={form.ten}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded"
              placeholder="VD: Giảm 10K đơn đầu tiên"
            />
          </div>
          <div>
            <label className="font-semibold">Mã số</label>
            <input
              name="ma_so"
              value={form.ma_so}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded"
              placeholder="VD: NEW10K"
            />
          </div>
        </div>

        {/* Loại và giá trị giảm */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Loại giảm giá</label>
            <select
              name="loai_giam_gia"
              value={form.loai_giam_gia ? "percent" : "money"}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  loai_giam_gia: e.target.value === "percent",
                }))
              }
              className="border p-2 w-full rounded"
            >
              <option value="money">Theo tiền (VNĐ)</option>
              <option value="percent">Theo phần trăm (%)</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Giá trị giảm</label>
            <input
              type="number"
              name="gia_tri_giam"
              value={form.gia_tri_giam}
              onChange={handleChange}
              required
              min={1}
              className="border p-2 w-full rounded"
            />
          </div>
        </div>

        {/* Giá trị tối thiểu và số lượng */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Giá trị tối thiểu (VNĐ)</label>
            <input
              type="number"
              name="gia_tri_toi_thieu"
              value={form.gia_tri_toi_thieu}
              onChange={handleChange}
              required
              min={0}
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="font-semibold">Số lượng</label>
            <input
              type="number"
              name="so_luong"
              value={form.so_luong}
              onChange={handleChange}
              required
              min={1}
              className="border p-2 w-full rounded"
            />
          </div>
        </div>

        {/* Ngày bắt đầu & kết thúc */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Ngày bắt đầu</label>
            <input
              type="date"
              name="bat_dau"
              value={form.bat_dau}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded"
            />
          </div>
          <div>
            <label className="font-semibold">Ngày kết thúc</label>
            <input
              type="date"
              name="ket_thuc"
              value={form.ket_thuc}
              onChange={handleChange}
              required
              className="border p-2 w-full rounded"
            />
          </div>
        </div>

        {/* Điều kiện */}
        <div>
          <label className="font-semibold">Điều kiện (JSON hoặc mô tả)</label>
          <textarea
            name="dieu_kien"
            value={form.dieu_kien}
            onChange={handleChange}
            rows={3}
            className="border p-2 w-full rounded"
            placeholder='VD: {"quantity": 3} hoặc "Áp dụng cho sản phẩm X"'
          />
        </div>

        {/* Ẩn / Hiện */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="an_hien"
            checked={form.an_hien}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="font-semibold">Hiển thị mã giảm giá</label>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-center space-x-4 pt-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "💾 Lưu"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/ma_giam_gia")}
            className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}
