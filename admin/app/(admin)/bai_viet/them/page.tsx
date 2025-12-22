"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import BaiVietEditor from "../BaiVietEditor";

export default function ThemBaiViet() {
  const router = useRouter();

  const [form, setForm] = useState({
    tieu_de: "",
    slug: "",
    noi_dung: "",
    id_loai_bv: 1,
    luot_xem: 0,
    ngay_dang: new Date().toISOString().slice(0, 10),
    an_hien: true,
  });

  const [hinhFile, setHinhFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm(f => ({
      ...f,
      [name]:
        type === "number"
          ? Number(value)
          : type === "radio"
          ? value === "true"
          : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setHinhFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.tieu_de.trim()) return setError("Tiêu đề không được để trống!");
    if (form.tieu_de.trim().length < 5) return setError("Tiêu đề phải có ít nhất 5 ký tự!");
    if (!form.noi_dung.trim()) return setError("Nội dung không được để trống!");
    if (form.noi_dung.trim().length < 20) return setError("Nội dung phải có ít nhất 20 ký tự!");
    const slugRegex = /^[a-z0-9-]+$/;
    if (!form.slug.trim()) return setError("Slug không được để trống!");
    if (!slugRegex.test(form.slug)) return setError("Slug chỉ được chứa chữ thường, số và dấu '-'");
    if (hinhFile && hinhFile.size > 2 * 1024 * 1024)
      return setError("Hình ảnh không được vượt quá 2MB!");

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("tieu_de", form.tieu_de);
    formData.append("slug", form.slug);
    formData.append("noi_dung", form.noi_dung);
    formData.append("id_loai_bv", String(form.id_loai_bv));
    formData.append("luot_xem", String(form.luot_xem));
    formData.append("ngay_dang", form.ngay_dang);
    formData.append("an_hien", form.an_hien ? "1" : "0");
    if (hinhFile) formData.append("hinh", hinhFile);

    try {
      const res = await fetch("/api/bai_viet", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        alert("Thêm bài viết thành công!");
        router.push("/bai_viet");
      } else {
        alert("Thêm thất bại: " + data.message);
      }
    } catch {
      alert("Lỗi hệ thống!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 md:px-0">
      <div className="p-4 md:p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">
          THÊM BÀI VIẾT
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm md:text-base">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
        >
          {/* Tiêu đề */}
          <div>
            <label className="block mb-1 font-medium">Tiêu đề</label>
            <input
              name="tieu_de"
              value={form.tieu_de}
              onChange={handleChange}
              className="border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 p-2 rounded w-full"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block mb-1 font-medium">Slug</label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 p-2 rounded w-full"
            />
          </div>

          {/* Nội dung */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Nội dung</label>
            <div className="border border-gray-300 rounded">
              <BaiVietEditor
                value={form.noi_dung}
                onChange={content =>
                  setForm(prev => ({ ...prev, noi_dung: content }))
                }
              />
            </div>
          </div>

          {/* Hình ảnh */}
          <div>
            <label className="block mb-1 font-medium">Hình ảnh</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 p-2 rounded w-full text-sm"
            />
            {hinhFile && (
              <Image
                src={URL.createObjectURL(hinhFile)}
                width={96}
                height={96}
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded mt-2 border"
                alt="Preview"
              />
            )}
          </div>

          {/* Loại bài viết */}
          <div>
            <label className="block mb-1 font-medium">Loại bài viết</label>
            <select
              name="id_loai_bv"
              value={form.id_loai_bv}
              onChange={handleChange}
              className="border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 p-2 rounded w-full"
            >
              <option value={1}>Tin tức</option>
              <option value={2}>Thông báo</option>
            </select>
          </div>

          {/* Ngày đăng */}
          <div>
            <label className="block mb-1 font-medium">Ngày đăng</label>
            <input
              type="date"
              name="ngay_dang"
              value={form.ngay_dang}
              onChange={handleChange}
              className="border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 p-2 rounded w-full"
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

          {/* Lượt xem */}
          <div>
            <label className="block mb-1 font-medium">Lượt xem</label>
            <input
              type="number"
              name="luot_xem"
              value={form.luot_xem}
              onChange={handleChange}
              className="border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 p-2 rounded w-full"
            />
          </div>

          {/* Nút lưu */}
          <div className="md:col-span-2 flex justify-end">
            <button
              disabled={loading}
              className="bg-blue-500 hover:bg-amber-500 text-white px-6 py-2 rounded shadow-md w-full md:w-auto"
            >
              {loading ? "Đang lưu..." : "Thêm bài viết"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
