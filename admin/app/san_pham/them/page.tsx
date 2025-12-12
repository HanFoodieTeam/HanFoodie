"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { IDanhMuc, IBienThe, ISanPham } from "@/lib/cautrucdata";

type SanPhamInput = Omit<ISanPham, "id" | "hinh" | "luot_xem">;

export default function ThemSanPhamPage() {
  const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
  const [bienThe, setBienThe] = useState<IBienThe[]>([]);
  const [hinhChinh, setHinhChinh] = useState<File | null>(null);
  const [hinhPhu, setHinhPhu] = useState<File[]>([]);

  const [form, setForm] = useState<SanPhamInput>({
    ten: "",
    slug: "",
    gia_goc: 0,
    mo_ta: "",
    an_hien: true,
    tag: "",
    phong_cach: "",
    trang_thai: "active",
    id_danh_muc: 0,
  });

  // ================= LOAD DANH MỤC =================
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/danh_muc");
      const data = await res.json();
      setDanhMuc(data.data ?? []);
    })();
  }, []);

  // ================= ONCHANGE =================
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    let newValue: string | number | boolean = value;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      newValue = e.target.checked;
    } else if (["gia_goc", "id_danh_muc"].includes(name)) {
      newValue = Number(value);
    }

    setForm((prev) => {
      const updated = { ...prev, [name]: newValue };

      if (name === "ten") {
        updated.slug = newValue
          .toString()
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
      }

      return updated;
    });
  };

  // ================= BIẾN THỂ =================
  const themBienThe = () => {
    setBienThe((prev) => [
      ...prev,
      {
        id: 0,
        ten: "",
        gia_them: 0,
        trang_thai: true, // 🔥 boolean đúng type
        id_san_pham: 0,
      },
    ]);
  };

  const suaBienThe = <K extends keyof IBienThe>(
    index: number,
    key: K,
    value: IBienThe[K]
  ) => {
    setBienThe((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const xoaBienThe = (index: number) => {
    setBienThe((prev) => prev.filter((_, i) => i !== index));
  };

  // ========= safe append =========
  const safeValue = (v: unknown) =>
    v === null || v === undefined ? "" : String(v);

  // ================= SUBMIT =================
  const submit = async () => {
    if (!hinhChinh) {
      alert("Bạn chưa chọn hình chính!");
      return;
    }

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        fd.append(key, safeValue(value));
      });

      // hình chính
      fd.append("hinh", hinhChinh);

      // hình phụ
      hinhPhu.forEach((file) => fd.append("hinh_phu", file));

      // biến thể (convert boolean → number)
      const bienTheClean = bienThe.map((bt) => ({
        ten: bt.ten,
        gia_them: bt.gia_them ?? 0,
        trang_thai: bt.trang_thai ? 1 : 0,
      }));

      fd.append("bien_the", JSON.stringify(bienTheClean));

      const res = await fetch("/api/san_pham", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      alert(data.success ? "Thêm sản phẩm thành công!" : data.message);
    } catch (error) {
      console.error(error);
      alert("Lỗi server!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow px-10 py-10 space-y-10">
        <h1 className="text-4xl font-bold text-center">THÊM SẢN PHẨM</h1>

        {/* ================= FORM SẢN PHẨM ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="font-semibold">Tên sản phẩm</label>
            <input
              name="ten"
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="font-semibold">Giá gốc</label>
            <input
              type="number"
              name="gia_goc"
              value={form.gia_goc}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="font-semibold">Slug</label>
            <input
              name="slug"
              value={form.slug}
              readOnly
              className="w-full border bg-gray-100 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="font-semibold">Danh mục</label>
            <select
              name="id_danh_muc"
              value={form.id_danh_muc}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value={0}>-- Chọn danh mục --</option>
              {danhMuc.map((dm) => (
                <option key={dm.id} value={dm.id}>
                  {dm.ten}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Tag</label>
            <input
              name="tag"
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="font-semibold">Phong cách</label>
            <input
              name="phong_cach"
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold">Mô tả</label>
            <textarea
              name="mo_ta"
              rows={4}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
        </div>

{/* ================= HÌNH ẢNH ================= */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* HÌNH CHÍNH */}
  <div>
    <label className="font-semibold">Hình chính</label>
    <input
      type="file"
      onChange={(e) =>
        setHinhChinh(e.target.files?.[0] ?? null)
      }
    />

    {hinhChinh && (
      <img
        src={URL.createObjectURL(hinhChinh)}
        className="w-40 mt-3 rounded-lg shadow"
      />
    )}
  </div>

  {/* HÌNH PHỤ */}
  <div>
    <label className="font-semibold">Hình phụ (nhiều ảnh)</label>

    <input
      type="file"
      multiple
      onChange={(e) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setHinhPhu((prev) => [...prev, ...files]); // ⭐ GIỮ ẢNH CŨ + THÊM ẢNH MỚI
      }}
    />

    {hinhPhu.length > 0 && (
      <div className="flex flex-wrap gap-3 mt-3">
        {hinhPhu.map((file, i) => (
          <img
            key={i}
            src={URL.createObjectURL(file)}
            className="w-28 h-28 object-cover rounded-lg shadow"
          />
        ))}
      </div>
    )}
  </div>
</div>


        {/* ================= BIẾN THỂ ================= */}
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold">Biến thể</h2>

          {bienThe.map((bt, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                className="border rounded-lg px-4 py-2"
                placeholder="Tên biến thể"
                value={bt.ten}
                onChange={(e) =>
                  suaBienThe(i, "ten", e.target.value)
                }
              />

              <input
                className="border rounded-lg px-4 py-2"
                type="number"
                placeholder="Giá thêm"
                value={bt.gia_them ?? ""}
                onChange={(e) =>
                  suaBienThe(
                    i,
                    "gia_them",
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bt.trang_thai}
                  onChange={(e) =>
                    suaBienThe(i, "trang_thai", e.target.checked)
                  }
                />
                Bật biến thể
              </label>

              <button
                onClick={() => xoaBienThe(i)}
                className="text-red-500 text-left"
              >
                Xóa
              </button>
            </div>
          ))}

          <button
            onClick={themBienThe}
            className="bg-black text-white px-6 py-2 rounded-lg"
          >
            + Thêm biến thể
          </button>
        </div>

        {/* ================= BUTTON LƯU ================= */}
        <div className="text-center pt-6">
          <button
            onClick={submit}
            className="px-12 py-4 bg-black text-white rounded-xl text-lg"
          >
            Lưu sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
}
