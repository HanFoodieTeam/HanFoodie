"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

// Kiểu dữ liệu bài viết
interface IBaiViet {
  id: number;
  tieu_de: string;
  noi_dung: string;
  hinh: string;
  id_loai_bv: number;
  luot_xem: number;
  slug: string;
  ngay_dang: string;
  an_hien: boolean;
}

export default function SuaBaiViet() {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState<IBaiViet>({
    id: 0,
    tieu_de: "",
    noi_dung: "",
    hinh: "",
    id_loai_bv: 1,
    luot_xem: 0,
    slug: "",
    ngay_dang: new Date().toISOString().slice(0, 10),
    an_hien: true,
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy dữ liệu bài viết hiện tại
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/bai_viet/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy bài viết!");
        const data: IBaiViet = await res.json();

        setForm({
          ...data,
          an_hien: !!data.an_hien,
        });
      } catch {
        alert("❌ Lỗi khi tải dữ liệu bài viết!");
        router.push("/bai_viet");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  // Thay đổi giá trị form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  // Cập nhật bài viết
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.tieu_de.trim()) return setError("Tiêu đề không được để trống!");
    if (!form.noi_dung.trim()) return setError("Nội dung không được để trống!");

    setLoading(true);

    const payload = {
      tieu_de: form.tieu_de,
      noi_dung: form.noi_dung,
      hinh: form.hinh || null,
      id_loai_bv: Number(form.id_loai_bv),
      luot_xem: Number(form.luot_xem) || 0,
      slug: form.slug || "",
      ngay_dang: form.ngay_dang ? new Date(form.ngay_dang) : new Date(),
      an_hien: form.an_hien ? 1 : 0,
    };

    try {
      const res = await fetch(`/api/bai_viet/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Cập nhật bài viết thành công!");
        router.push("/bai_viet");
      } else {
        const data = await res.json();
        alert("❌ Cập nhật thất bại! " + (data.message || ""));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Lỗi khi cập nhật bài viết!");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading)
    return <div className="p-4 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        CẬP NHẬT BÀI VIẾT
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
            placeholder="VD: Món mới, Tin tức,..."
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
            placeholder="vd: mon-moi-tin-tuc"
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Hình */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Hình</label>
          <input
            name="hinh"
            value={form.hinh}
            onChange={handleChange}
            placeholder="URL hình ảnh"
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Loại bài viết */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Loại bài viết</label>
          <select
            name="id_loai_bv"
            value={form.id_loai_bv}
            onChange={(e) => setForm(f => ({ ...f, id_loai_bv: Number(e.target.value) }))}
            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value={1}>Tin tức</option>
            <option value={2}>Thông báo</option>
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
        <div className="md:col-span-2 flex justify-end">
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Cập nhật bài viết"}
          </button>
        </div>
      </form>
    </div>
  );
}
