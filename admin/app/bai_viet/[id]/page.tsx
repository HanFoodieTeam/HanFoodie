"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
interface IBaiViet {
  id: number;
  tieu_de: string;
  noi_dung: string;
  hinh: string | null;
  id_loai_bv: number;
  luot_xem: number;
  slug: string;
  ngay_dang: string;
  an_hien: boolean;
}

export default function SuaBaiViet() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [form, setForm] = useState<IBaiViet>({
    id: 0,
    tieu_de: "",
    noi_dung: "",
    hinh: null,
    id_loai_bv: 1,
    luot_xem: 0,
    slug: "",
    ngay_dang: new Date().toISOString().slice(0, 10),
    an_hien: true,
  });

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/bai_viet/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy bài viết!");

        const resData = await res.json();
        const data: IBaiViet = resData.data;

        setForm({
          ...data,
          an_hien: !!data.an_hien,
          ngay_dang: data.ngay_dang.slice(0, 10),
        });
      } catch {
        alert(" Lỗi khi tải dữ liệu bài viết!");
        router.push("/bai_viet");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.tieu_de.trim()) return setError("Tiêu đề không được để trống!");
    if (!form.noi_dung.trim()) return setError("Nội dung không được để trống!");

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("tieu_de", form.tieu_de);
    formData.append("noi_dung", form.noi_dung);
    formData.append("slug", form.slug);
    formData.append("id_loai_bv", String(form.id_loai_bv));
    formData.append("luot_xem", String(form.luot_xem));
    formData.append("ngay_dang", form.ngay_dang);
    formData.append("an_hien", form.an_hien ? "1" : "0");

    if (file) {
      formData.append("hinh", file);
    } else {
      formData.append("hinh", form.hinh || "");
    }

    try {
      const res = await fetch(`/api/bai_viet/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        alert(" Cập nhật bài viết thành công!");
        router.push("/bai_viet");
      } else {
        const data = await res.json();
        alert(" Cập nhật thất bại! " + (data.message || ""));
      }
    } catch (err) {
      console.error(err);
      alert(" Lỗi khi cập nhật bài viết!");
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

        {/* Upload hình */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Hình ảnh</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
            className="border p-2 rounded w-full"
          />

          {form.hinh && (
            <Image
              src={form.hinh}
              alt="Preview"
              width={128}   // thêm width
              height={128}  // thêm height
              className="mt-2 rounded shadow"
            />
          )}


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
            className="border p-2 rounded w-full"
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

        {/* Nút Lưu */}
        <div className="md:col-span-2 flex justify-end">
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            {loading ? "Đang lưu..." : "Cập nhật bài viết"}
          </button>
        </div>
      </form>
    </div>
  );
}
