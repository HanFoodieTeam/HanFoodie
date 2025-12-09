"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ThemLoaiTuChon() {
  const router = useRouter();

  const [form, setForm] = useState({
    ten: "",
    thu_tu: 0,
    an_hien: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((f) => ({
      ...f,
      [name]:
        type === "number"
          ? Number(value)
          : type === "radio"
          ? value === "true"
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.ten.trim()) {
      alert("Tên loại không được để trống");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/loai_tuy_chon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ten: form.ten,
          thu_tu: form.thu_tu,
          an_hien: form.an_hien ? 1 : 0,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Thêm loại tùy chọn thành công!");
        router.push("/loai_tuy_chon");
      } else {
        alert("Thêm thất bại: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi hệ thống!");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">THÊM LOẠI TÙY CHỌN</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Tên loại */}
        <div>
          <label className="block mb-1 font-medium">Tên loại</label>
          <input
            name="ten"
            value={form.ten}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Thứ tự */}
        <div>
          <label className="block mb-1 font-medium">Thứ tự</label>
          <input
            type="number"
            name="thu_tu"
            value={form.thu_tu}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block mb-1 font-medium">Trạng thái</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="an_hien"
                value="true"
                checked={form.an_hien === true}
                onChange={handleChange}
              />
              Hiện
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="an_hien"
                value="false"
                checked={form.an_hien === false}
                onChange={handleChange}
              />
              Ẩn
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <button
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Đang lưu..." : "Lưu loại"}
          </button>
        </div>
      </form>
    </div>
  );
}
