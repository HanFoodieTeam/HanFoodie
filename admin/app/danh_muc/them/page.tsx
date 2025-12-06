"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ThemDanhMuc() {
  const router = useRouter();

  const [form, setForm] = useState({
    ten: "",
    slug: "",
    thu_tu: 0,
    an_hien: true,
  });

  const [hinhFile, setHinhFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ======================== ON CHANGE ========================
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

  // ======================== ON FILE ========================
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setHinhFile(file);
  };

  // ======================== SUBMIT FORM ========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.ten.trim()) {
      setError("Tên danh mục không được để trống");
      return;
    }

    setLoading(true);

    // Dùng FormData gửi lên API
    const formData = new FormData();
    formData.append("ten", form.ten);
    formData.append("slug", form.slug);
    formData.append("thu_tu", String(form.thu_tu));
    formData.append("so_san_pham", "0");
    formData.append("an_hien", form.an_hien ? "1" : "0");

    if (hinhFile) {
      formData.append("hinh", hinhFile);
    }

    try {
      const res = await fetch("/api/danh_muc", {
        method: "POST",
        body: formData, // ❗ Không set Content-Type — trình duyệt tự set
      });

      const data = await res.json();

      if (res.ok) {
        alert("Thêm danh mục thành công!");
        router.push("/danh_muc");
      } else {
        alert("Thêm thất bại: " + data.message);
      }
    } catch {
      alert("Lỗi hệ thống!");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">THÊM DANH MỤC</h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Tên danh mục */}
        <div>
          <label className="block mb-1 font-medium">Tên danh mục</label>
          <input
            name="ten"
            value={form.ten}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block mb-1 font-medium">Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Hình ảnh */}
        <div>
          <label className="block mb-1 font-medium">Hình ảnh</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />

          {hinhFile && (
            <img
              src={URL.createObjectURL(hinhFile)}
              className="w-24 h-24 object-cover rounded mt-2 border"
              alt="Preview"
            />
          )}
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
            {loading ? "Đang lưu..." : "Lưu danh mục"}
          </button>
        </div>
      </form>
    </div>
  );
}
  