"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ThemBaiViet() {
  const router = useRouter();
  const [form, setForm] = useState({
    tieu_de: "",
    noi_dung: "",
    id_loai_bv: 1,
    luot_xem: 0,
    slug: "",
    ngay_dang: new Date().toISOString().slice(0, 10),
    an_hien: true,
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : type === "radio"
          ? value === "true"
          : value,
    }));
  };

  // 📌 Lấy file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tieu_de.trim()) return setError("Tiêu đề không được để trống");
    if (!form.noi_dung.trim()) return setError("Nội dung không được để trống");

    setLoading(true);

    // 📌 Dùng FormData
    const formData = new FormData();
    formData.append("tieu_de", form.tieu_de);
    formData.append("noi_dung", form.noi_dung);
    formData.append("id_loai_bv", String(form.id_loai_bv));
    formData.append("luot_xem", String(form.luot_xem));
    formData.append("slug", form.slug);
    formData.append("ngay_dang", form.ngay_dang);
    formData.append("an_hien", form.an_hien ? "1" : "0");

    if (file) {
      formData.append("hinh", file);
    }

    try {
      const res = await fetch("/api/bai_viet", {
        method: "POST",
        body: formData, // ❗ KHÔNG ĐƯỢC SET headers
      });

      if (res.ok) {
        alert("✅ Thêm bài viết thành công!");
        router.push("/bai_viet");
      } else {
        const data = await res.json();
        alert("❌ Thêm thất bại! " + (data.message || ""));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi thêm bài viết!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        THÊM BÀI VIẾT
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Tiêu đề */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Tiêu đề</label>
          <input
            name="tieu_de"
            value={form.tieu_de}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Nội dung */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700">Nội dung</label>
          <textarea
            name="noi_dung"
            value={form.noi_dung}
            onChange={handleChange}
            rows={6}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Upload ảnh */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Upload hình ảnh</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Loại bài viết */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Loại bài viết</label>
          <select
            name="id_loai_bv"
            value={form.id_loai_bv}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          >
            <option value={1}>Tin tức</option>
            <option value={2}>Khuyến mãi</option>
          </select>
        </div>

        {/* Ngày đăng */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Ngày đăng</label>
          <input
            type="date"
            name="ngay_dang"
            value={form.ngay_dang}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Trạng thái</label>
          <div className="flex gap-6 p-2">
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
            {loading ? "Đang lưu..." : "Lưu bài viết"}
          </button>
        </div>
      </form>
    </div>
  );
}
