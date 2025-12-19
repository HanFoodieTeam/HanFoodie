"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { IDanhMuc } from "@/lib/cautrucdata";
import Image from "next/image";
export default function SuaDanhMuc() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState<IDanhMuc>({
    id: 0,
    ten: "",
    slug: "",
    hinh: "",
    thu_tu: 0,
    an_hien: true,
    so_san_pham: 0,
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ------------------------------
  // Load dữ liệu danh mục
  // ------------------------------
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/danh_muc/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy danh mục!");

        const json: { success: boolean; data: IDanhMuc; message?: string } =
          await res.json();

        if (!json.success || !json.data) throw new Error("Không có dữ liệu");

        setForm({ ...json.data, an_hien: !!json.data.an_hien });
      } catch (err) {
        console.error(err);
        alert("❌ Lỗi khi tải dữ liệu danh mục!");
        router.push("/danh_muc");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  // ------------------------------
  // Upload ảnh và preview
  // ------------------------------
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setUploading(true);
    setFile(f);

    // Preview ảnh
    const reader = new FileReader();
    reader.onload = () => {
      setForm(prev => ({ ...prev, hinh: reader.result as string }));
      setUploading(false);
    };
    reader.readAsDataURL(f);
  };

  // ------------------------------
  // Thay đổi input
  // ------------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  // ------------------------------
  // Submit FormData PUT
  // ------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.ten.trim()) {
      return setError("Tên danh mục không được để trống!");
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("ten", form.ten ?? "");
    formData.append("slug", form.slug ?? "");
    formData.append("thu_tu", String(form.thu_tu ?? 0));
    formData.append("so_san_pham", String(form.so_san_pham ?? 0));
    formData.append("an_hien", form.an_hien ? "1" : "0");

    if (file) {
      formData.append("hinh", file);
    }

    try {
      const res = await fetch(`/api/danh_muc/${id}`, {
        method: "PUT",
        body: formData,
      });

      const json: { success: boolean; message?: string } = await res.json();

      if (res.ok && json.success) {
        alert("✅ Cập nhật danh mục thành công!");
        router.push("/danh_muc");
      } else {
        alert("❌ Cập nhật thất bại: " + json.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi cập nhật danh mục!");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading)
    return <div className="p-4 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        CẬP NHẬT DANH MỤC
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Tên danh mục */}
        <div>
          <label className="font-medium">Tên danh mục</label>
          <input
            name="ten"
            value={form.ten}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="font-medium">Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Upload hình */}
        <div>
          <label className="font-medium">Hình ảnh</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="border p-2 rounded w-full"
          />

          {uploading && <p className="text-blue-500">Đang upload...</p>}

          {form.hinh && (
            <>
              {form.hinh.startsWith("data:") ? (
                // Nếu là base64 (preview file upload)
                <img
                  src={form.hinh}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded border mt-2"
                />
              ) : (
                // Nếu là URL bên ngoài
                <Image
                  src={form.hinh}
                  alt="preview"
                  width={100}
                  height={100}
                  className="object-cover rounded border mt-2"
                />
              )}
            </>
          )}

        </div>

        {/* Thứ tự */}
        <div>
          <label className="font-medium">Thứ tự</label>
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
          <label className="font-medium">Trạng thái</label>
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
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Đang lưu..." : "Cập nhật danh mục"}
          </button>
        </div>
      </form>
    </div>
  );
}
