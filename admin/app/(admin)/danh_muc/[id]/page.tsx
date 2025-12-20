"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ILoaiTuyChon, IMonThem } from "@/lib/cautrucdata";

// ================== FORM TYPE ==================
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

  // ================== STATE ==================
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

  // ================== LOAD DATA ==================
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        // ---- Danh mục ----
        const res = await fetch(`/api/danh_muc/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Không tìm thấy danh mục");

        const dmJson = await res.json();
        setForm(dmJson.data);

        // ---- Loại tuỳ chọn + Món thêm (KHÔNG PHÂN TRANG) ----
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

  // ================== INPUT CHANGE ==================
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

  // ================== TOGGLE ==================
  const toggleLoaiTuyChon = (item: ILoaiTuyChon) => {
    setForm((prev) => ({
      ...prev,
      loai_tuy_chon_ids: prev.loai_tuy_chon_ids.includes(item.id)
        ? prev.loai_tuy_chon_ids.filter((i) => i !== item.id)
        : [...prev.loai_tuy_chon_ids, item.id],
    }));
  };

  const toggleMonThem = (item: IMonThem) => {
    setForm((prev) => ({
      ...prev,
      mon_them_ids: prev.mon_them_ids.includes(item.id)
        ? prev.mon_them_ids.filter((i) => i !== item.id)
        : [...prev.mon_them_ids, item.id],
    }));
  };

  // ================== UPLOAD ==================
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = () =>
      setForm((prev) => ({ ...prev, hinh: reader.result as string }));
    reader.readAsDataURL(f);
  };

  // ================== SUBMIT ==================
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
        alert(" Cập nhật danh mục thành công");
        router.push("/danh_muc");
      } else {
        alert(" Cập nhật thất bại");
      }
    } catch {
      alert(" Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading)
    return <div className="p-4 text-center">Đang tải dữ liệu...</div>;

  // ================== UI ==================
  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">CẬP NHẬT DANH MỤC</h1>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label>Tên danh mục</label>
          <input name="ten" value={form.ten} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>

        <div>
          <label>Slug</label>
          <input name="slug" value={form.slug || ""} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>

        <div>
          <label>Hình ảnh</label>
          <input type="file" accept="image/*" onChange={handleUpload} />
          {form.hinh && (
            <Image src={form.hinh} alt="preview" width={100} height={100} className="mt-2 rounded border" />
          )}
        </div>

        <div>
          <label>Thứ tự</label>
          <input type="number" name="thu_tu" value={form.thu_tu} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>

        <div>
          <label>Trạng thái</label>
          <div className="flex gap-6">
            <label><input type="radio" name="an_hien" value="true" checked={form.an_hien} onChange={handleChange} /> Hiện</label>
            <label><input type="radio" name="an_hien" value="false" checked={!form.an_hien} onChange={handleChange} /> Ẩn</label>
          </div>
        </div>

        <div className="md:col-span-2">
          <label>Loại tuỳ chọn</label>
          <div className="flex flex-wrap gap-2">
            {allLoaiTuyChon.map((l) => (
              <label key={l.id} className="border px-2 py-1 rounded">
                <input type="checkbox" checked={form.loai_tuy_chon_ids.includes(l.id)} onChange={() => toggleLoaiTuyChon(l)} /> {l.ten}
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label>Món thêm</label>
          <div className="flex flex-wrap gap-2">
            {allMonThem.map((m) => (
              <label key={m.id} className="border px-2 py-1 rounded">
                <input type="checkbox" checked={form.mon_them_ids.includes(m.id)} onChange={() => toggleMonThem(m)} /> {m.ten}
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 text-right">
          <button disabled={loading} className="bg-blue-500 text-white px-6 py-2 rounded">
            {loading ? "Đang lưu..." : "Cập nhật"}
          </button>
        </div>
      </form>
    </div>
  );
}
