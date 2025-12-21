"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ILoaiTuyChon, IMonThem } from "@/lib/cautrucdata";

interface IDanhMucForm {
  id: number;
  ten: string;
  slug?: string;
  hinh?: string | null;
  thu_tu: number;
  so_san_pham: number;
  an_hien: boolean;
  loai_tuy_chon_ids: number[];
  mon_them_ids: number[];
}

export default function SuaDanhMuc() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [form, setForm] = useState<IDanhMucForm>({
    id: 0,
    ten: "",
    slug: "",
    hinh: null,
    thu_tu: 0,
    so_san_pham: 0,
    an_hien: true,
    loai_tuy_chon_ids: [],
    mon_them_ids: [],
  });

  const [allLoaiTuyChon, setAllLoaiTuyChon] = useState<ILoaiTuyChon[]>([]);
  const [allMonThem, setAllMonThem] = useState<IMonThem[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showLoaiTuyChonDropdown, setShowLoaiTuyChonDropdown] = useState(false);
  const [monThemType, setMonThemType] = useState<0 | 1>(0); // 0=Topping, 1=Món ăn kèm
  const [showMonThemDropdown, setShowMonThemDropdown] = useState(false);

  const filteredMonThem: IMonThem[] = allMonThem.filter(
    (m) => Number(m.loai_mon) === monThemType
  );

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/danh_muc/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Không tìm thấy danh mục");
        const dmJson = await res.json();
        setForm(dmJson.data);

        const [loaiRes, monRes] = await Promise.all([
          fetch("/api/loai_tuy_chon"),
          fetch("/api/danh_muc/mon_them"),
        ]);

        const loaiJson = await loaiRes.json();
        const monJson = await monRes.json();

        setAllLoaiTuyChon(loaiJson.data || []);
        setAllMonThem(monJson.data || []);
      } catch (err: any) {
        alert(err.message || "Lỗi khi tải dữ liệu");
        router.push("/danh_muc");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const toggleLoaiTuyChon = (id: number) => {
    setForm((prev) => ({
      ...prev,
      loai_tuy_chon_ids: prev.loai_tuy_chon_ids.includes(id)
        ? prev.loai_tuy_chon_ids.filter((i) => i !== id)
        : [...prev.loai_tuy_chon_ids, id],
    }));
  };

  const toggleMonThem = (id: number) => {
    setForm((prev) => ({
      ...prev,
      mon_them_ids: prev.mon_them_ids.includes(id)
        ? prev.mon_them_ids.filter((i) => i !== id)
        : [...prev.mon_them_ids, id],
    }));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = () =>
      setForm((prev) => ({ ...prev, hinh: reader.result as string }));
    reader.readAsDataURL(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ten.trim()) {
      setError("Tên danh mục không được để trống");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("ten", form.ten);
    formData.append("slug", form.slug || "");
    formData.append("thu_tu", String(form.thu_tu));
    formData.append("so_san_pham", String(form.so_san_pham));
    formData.append("an_hien", form.an_hien ? "1" : "0");
    formData.append("loai_tuy_chon_ids", JSON.stringify(form.loai_tuy_chon_ids));
    formData.append("mon_them_ids", JSON.stringify(form.mon_them_ids));
    if (file) formData.append("hinh", file);

    try {
      const res = await fetch(`/api/danh_muc/${id}`, {
        method: "PUT",
        body: formData,
      });
      const json = await res.json();

      if (res.ok && json.success) {
        alert("Cập nhật danh mục thành công");
        router.push("/danh_muc");
      } else {
        alert("Cập nhật thất bại");
      }
    } catch {
      alert("Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading)
    return <div className="p-4 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">CẬP NHẬT DANH MỤC</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Tên & Slug */}
        <div>
          <label className="block mb-1">Tên danh mục</label>
          <input
            name="ten"
            value={form.ten}
            onChange={handleChange}
            className="border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Slug</label>
          <input
            name="slug"
            value={form.slug || ""}
            onChange={handleChange}
            className="border border-gray-300  p-2 rounded w-full"
          />
        </div>

        {/* Hình ảnh */}
        <div>
          <label className="block mb-1">Hình ảnh</label>
          <input type="file" accept="image/*" onChange={handleUpload} className="border border-gray-300 p-2 rounded w-full"
          />
          {form.hinh && (
            <Image
              src={form.hinh}
              alt="preview"
              width={100}
              height={100}
              className="mt-2 rounded border"
            />
          )}
        </div>

        {/* Thứ tự */}
        <div>
          <label className="block mb-1">Thứ tự</label>
          <input
            type="number"
            name="thu_tu"
            min={0}
            value={form.thu_tu}
            onChange={handleChange}
            className="border border-gray-300 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 p-2 rounded w-full"
          />
        </div>


        {/* Loại tuỳ chọn + Loại món thêm + Món thêm */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="flex gap-4 flex-col md:flex-row">
            {/* Loại món thêm */}
            <div className="flex-1">
              <label className="block mb-1">Loại món thêm</label>
              <select
                value={monThemType}
                onChange={(e) =>
                  setMonThemType(Number(e.target.value) as 0 | 1)
                }
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value={0}>Topping</option>
                <option value={1}>Món ăn kèm</option>
              </select>
            </div>
            {/* Loại tuỳ chọn */}
            <div className="flex-1 relative">
              <label className="block mb-1">Loại tuỳ chọn</label>
              <div
                className="border border-gray-300 p-2 rounded cursor-pointer"
                onClick={() =>
                  setShowLoaiTuyChonDropdown(!showLoaiTuyChonDropdown)
                }
              >
                {form.loai_tuy_chon_ids.length > 0
                  ? `${form.loai_tuy_chon_ids.length} loại đã chọn`
                  : "Chọn loại tuỳ chọn..."}
              </div>
              {showLoaiTuyChonDropdown && (
                <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto border rounded bg-white shadow-lg p-2">
                  {allLoaiTuyChon.map((l) => (
                    <label
                      key={l.id}
                      className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={form.loai_tuy_chon_ids.includes(l.id)}
                        onChange={() => toggleLoaiTuyChon(l.id)}
                      />
                      {l.ten}
                    </label>
                  ))}
                </div>
              )}
            </div>


          </div>

          {/* Món thêm */}
          <div className="relative">
            <label className="block mb-1">Món thêm</label>
            <div
              className="border border-gray-300 p-2 rounded cursor-pointer"
              onClick={() => setShowMonThemDropdown(!showMonThemDropdown)}
            >
              {form.mon_them_ids.length > 0
                ? `${form.mon_them_ids.length} món đã chọn`
                : "Chọn món thêm..."}
            </div>

            {showMonThemDropdown && (
              <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto border rounded bg-white shadow-lg p-2">
                {filteredMonThem.map((m) => (
                  <label
                    key={m.id}
                    className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={form.mon_them_ids.includes(m.id)}
                      onChange={() => toggleMonThem(m.id)}
                    />
                    {m.ten}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trạng thái */}
        <div>
          <label className="block mb-1">Trạng thái</label>
          <div className="flex gap-6">
            <label>
              <input
                type="radio"
                name="an_hien"
                value="true"
                checked={form.an_hien}
                onChange={handleChange}
              />{" "}
              Hiện
            </label>
            <label>
              <input
                type="radio"
                name="an_hien"
                value="false"
                checked={!form.an_hien}
                onChange={handleChange}
              />{" "}
              Ẩn
            </label>
          </div>
        </div>


        {/* Submit */}
        <div className="md:col-span-2 text-right">
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md disabled:opacity-50">
            {loading ? "Đang lưu..." : "Cập nhật danh mục"}
          </button>
        </div>
      </form>
    </div>
  );
}
