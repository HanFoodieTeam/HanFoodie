"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IDanhMuc } from "@/app/lib/cautrucdata";

export default function ThemDanhMuc() {
  const router = useRouter();
  const [form, setForm] = useState<IDanhMuc>({
    id: 0,
    ten: "",
    slug: "",
    hinh: "",
    thu_tu: 0,
    an_hien: true,
    so_san_pham: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError("Tên danh mục không được để trống");
      return;
    }

    setLoading(true);

    // Chuẩn hóa dữ liệu trước khi gửi
    const payload = {
      ...form,
      an_hien: form.an_hien ? 1 : 0,
      thu_tu: Number(form.thu_tu) || 0,
      so_san_pham: Number(form.so_san_pham) || 0,
    };

    try {
      const res = await fetch("/api/danh_muc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Thêm danh mục thành công!");
        router.push("/danh_muc");
      } else {
        const data = await res.json();
        alert("❌ Thêm thất bại! " + (data.message || ""));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi thêm danh mục!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        THÊM DANH MỤC
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Tên danh mục */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Tên danh mục</label>
          <input
            name="ten"
            value={form.ten}
            onChange={handleChange}
            placeholder="Nhập tên danh mục"
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="vd: ten-danh-muc"
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Hình ảnh */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Hình ảnh (URL)</label>
          <input
            name="hinh"
            value={form.hinh || ""}
            onChange={handleChange}
            placeholder="vd: https://..."
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Thứ tự */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Thứ tự</label>
          <input
            type="number"
            name="thu_tu"
            value={form.thu_tu || 0}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Trạng thái</label>
          <div className="flex gap-6 rounded p-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="an_hien"
                value="true"
                checked={form.an_hien === true}
                onChange={handleChange}
              />
              <span>Hiện</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="an_hien"
                value="false"
                checked={form.an_hien === false}
                onChange={handleChange}
              />
              <span>Ẩn</span>
            </label>
          </div>
        </div>

        {/* Nút lưu */}
        <div className="md:col-span-2 mt-4 flex justify-end">
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Lưu danh mục"}
          </button>
        </div>
      </form>
    </div>
  );
}
