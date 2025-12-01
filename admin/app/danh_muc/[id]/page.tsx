"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { IDanhMuc } from "@/app/lib/cautrucdata";

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

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy dữ liệu danh mục hiện tại
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/danh_muc/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy danh mục!");
        const data: IDanhMuc = await res.json();

        setForm({
          ...data,
          an_hien: !!data.an_hien,
        });
      } catch {
        alert("❌ Lỗi khi tải dữ liệu danh mục!");
        router.push("/danh_muc");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  // Thay đổi giá trị form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : type === "radio"
            ? value === "true"
            : value,
    }));
  };

  // Cập nhật danh mục
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.ten.trim()) return setError("Tên danh mục không được để trống!");

    setLoading(true);
    const res = await fetch(`/api/danh_muc/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("✅ Cập nhật danh mục thành công!");
      router.push("/danh_muc");
    } else {
      alert("❌ Cập nhật thất bại!");
    }
    setLoading(false);
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

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

        <div className="md:col-span-2 flex justify-end">
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Cập nhật danh mục"}
          </button>
        </div>
      </form>
    </div>
  );
}
