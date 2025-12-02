"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { ISanPham, IBienThe, IDanhMuc, IHinh } from "@/app/lib/cautrucdata";

export interface ISanPhamFull extends ISanPham {
  bien_the: IBienThe[];
  danh_muc: IDanhMuc | null;
  hinh_anh: IHinh[];
}

interface Props {
  params: { id: string };
}

export default function SanPhamDetail({ params }: Props) {
  const id = Number(params.id);

  const [data, setData] = useState<ISanPhamFull | null>(null);
  const [form, setForm] = useState<ISanPhamFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [extraImagesFiles, setExtraImagesFiles] = useState<File[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/san_pham/${id}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
          setForm(json.data);
        }
      } catch (err) {
        console.error("Lỗi tải sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) return <p className="text-center p-4">Đang tải...</p>;
  if (!data || !form) return <p className="text-center text-red-600 p-4">Không tìm thấy sản phẩm</p>;

  const handleChange = (key: keyof ISanPhamFull, value: string | number | boolean) => {
    setForm({ ...form, [key]: value });
  };

  // === Hình chính ===
  const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImageFile(e.target.files[0]);
      setForm({ ...form, hinh: URL.createObjectURL(e.target.files[0]) });
    }
  };

  // === Hình phụ ===
  const handleExtraImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setExtraImagesFiles((prev) => [...prev, ...filesArray]);

      setForm({
        ...form,
        hinh_anh: [
          ...form.hinh_anh,
          ...filesArray.map((f) => ({
            id: 0,
            hinh: URL.createObjectURL(f),
            id_san_pham: form.id,
          })),
        ],
      });
    }
  };

  const removeExtraImage = (index: number) => {
    const newFiles = extraImagesFiles.filter((_, i) => i !== index);
    const newHinhAnh = form.hinh_anh.filter((_, i) => i !== index);
    setExtraImagesFiles(newFiles);
    setForm({ ...form, hinh_anh: newHinhAnh });
  };

  // === Biến thể ===
  const removeVariant = (index: number) => {
    const newVariants = [...form.bien_the];
    newVariants.splice(index, 1);
    setForm({ ...form, bien_the: newVariants });
  };

  // === Submit ===
  const submitUpdate = async () => {
    if (!form) return;

    const formData = new FormData();
    formData.append("ten", form.ten ?? "");
    formData.append("slug", form.slug ?? "");
    formData.append("mo_ta", form.mo_ta ?? "");
    formData.append("gia_goc", String(form.gia_goc ?? 0));
    formData.append("id_danh_muc", String(form.id_danh_muc ?? 0));
    formData.append("an_hien", String(form.an_hien ? "1" : "0"));
    formData.append("trang_thai", form.trang_thai ?? "inactive");
    formData.append("tag", form.tag ?? "");
    formData.append("phong_cach", form.phong_cach ?? "");
    formData.append("luot_xem", String(form.luot_xem ?? 0));

    if (mainImageFile) formData.append("hinh_chinh", mainImageFile);
    extraImagesFiles.forEach((file) => formData.append("hinh_phu", file));

    formData.append("bien_the", JSON.stringify(form.bien_the));

    const res = await fetch(`/api/san_pham/${id}`, { method: "PUT", body: formData });
    const json = await res.json();

    if (json.success) {
      alert("Cập nhật thành công!");
      const res2 = await fetch(`/api/san_pham/${id}`);
      const newJson = await res2.json();
      if (newJson.success) setData(newJson.data);
      setForm(newJson.data);
      setEditMode(false);
      setMainImageFile(null);
      setExtraImagesFiles([]);
    } else {
      alert("Cập nhật thất bại!");
    }
  };

  // === Helper để ép src luôn là string ===
  const safeImage = (src: string | null | undefined) => src ?? "/no-image.png";

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white px-6 py-4 rounded-xl shadow">
        {editMode ? (
          <input
            className="text-3xl font-bold w-full border p-2 rounded"
            value={form.ten ?? ""}
            onChange={(e) => handleChange("ten", e.target.value)}
          />
        ) : (
          <h1 className="text-3xl font-bold text-gray-800">{data.ten}</h1>
        )}

        <div className="flex gap-3">
          {!editMode ? (
            <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              ✏ Sửa
            </button>
          ) : (
            <>
              <button onClick={submitUpdate} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
                💾 Lưu
              </button>
              <button
                onClick={() => {
                  setForm(data);
                  setEditMode(false);
                  setMainImageFile(null);
                  setExtraImagesFiles([]);
                }}
                className="px-4 py-2 bg-gray-400 rounded-lg shadow hover:bg-gray-500"
              >
                ✖ Hủy
              </button>
            </>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
          <Image
            src={safeImage(form.hinh)}
            alt="Hình chính"
            width={160}
            height={160}
            unoptimized
            className="w-40 h-40 object-cover rounded-xl shadow mb-2"
          />
          {editMode && <input type="file" accept="image/*" onChange={handleMainImageChange} />}
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow space-y-4">
          <EditableRow label="Slug" value={form.slug ?? ""} editMode={editMode} onChange={(v) => handleChange("slug", v)} />
          <EditableRow label="Mô tả" value={form.mo_ta ?? ""} editMode={editMode} onChange={(v) => handleChange("mo_ta", v)} />
          <EditableRow label="Giá gốc" value={form.gia_goc ?? 0} editMode={editMode} onChange={(v) => handleChange("gia_goc", Number(v))} />
          <EditableRow label="Tag" value={form.tag ?? ""} editMode={editMode} onChange={(v) => handleChange("tag", v)} />
          <EditableRow label="Phong cách" value={form.phong_cach ?? ""} editMode={editMode} onChange={(v) => handleChange("phong_cach", v)} />
        </div>
      </div>

      {/* EXTRA IMAGES */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Hình phụ</h2>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {form.hinh_anh.map((h, idx) => (
            <div key={idx} className="relative">
              <Image
                src={safeImage(h.hinh)}
                alt="Hình phụ"
                width={200}
                height={96}
                unoptimized
                className="w-full h-24 rounded-lg object-cover shadow"
              />

              {editMode && (
                <button
                  onClick={() => removeExtraImage(idx)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        {editMode && <input type="file" accept="image/*" multiple onChange={handleExtraImagesChange} className="mt-2" />}
      </div>

      {/* VARIANTS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Biến thể</h2>

        {form.bien_the.map((bt, idx) => (
          <div key={idx} className="border p-4 rounded-lg bg-gray-50 shadow-sm relative">
            {editMode && (
              <button
                onClick={() => removeVariant(idx)}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
              >
                ×
              </button>
            )}

            {editMode ? (
              <>
                <input
                  className="border p-1 rounded w-full mb-1"
                  value={bt.ten ?? ""}
                  onChange={(e) => {
                    const newBT = [...form.bien_the];
                    newBT[idx].ten = e.target.value;
                    setForm({ ...form, bien_the: newBT });
                  }}
                />
                <input
                  type="number"
                  className="border p-1 rounded w-full mb-1"
                  value={bt.gia_them ?? 0}
                  onChange={(e) => {
                    const newBT = [...form.bien_the];
                    newBT[idx].gia_them = Number(e.target.value);
                    setForm({ ...form, bien_the: newBT });
                  }}
                />
                <select
                  value={bt.trang_thai ? "1" : "0"}
                  onChange={(e) => {
                    const newBT = [...form.bien_the];
                    newBT[idx].trang_thai = e.target.value === "1";
                    setForm({ ...form, bien_the: newBT });
                  }}
                  className="border p-1 rounded w-full"
                >
                  <option value="1">Hiện</option>
                  <option value="0">Ẩn</option>
                </select>
              </>
            ) : (
              <>
                <p className="font-bold">{bt.ten}</p>
                <p>Giá thêm: {bt.gia_them?.toLocaleString()}đ</p>
                <p>Trạng thái: {bt.trang_thai ? "Hiện" : "Ẩn"}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EditableRow({
  label,
  value,
  editMode,
  onChange,
}: {
  label: string;
  value: string | number;
  editMode: boolean;
  onChange: (v: string | number) => void;
}) {
  return (
    <div>
      <p className="font-semibold text-gray-700">{label}:</p>
      {editMode ? (
        <input
          value={value ?? ""}
          onChange={(e) =>
            onChange(isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value))
          }
          className="border p-2 rounded w-full"
        />
      ) : (
        <p className="text-gray-800">{value ?? ""}</p>
      )}
    </div>
  );
}
