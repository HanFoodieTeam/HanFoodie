

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IBanner } from "@/app/lib/cautrucdata";

export default function SuaBannerPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [banner, setBanner] = useState<IBanner | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      const res = await fetch(`/api/banner/${id}`);
      const json = await res.json();

      if (json.success) {
        setBanner({
          ...json.data,
          loai: json.data.loai === 1,
          an_hien: json.data.an_hien === 1,
        });
      }
    };

    load();
  }, [id]);

  if (!banner) return <div className="p-4">Đang tải...</div>;

  const handleSubmit = async () => {
    const form = new FormData();

    if (file) {
      form.append("hinh", file); 
    }

    form.append("mo_ta", banner.mo_ta || "");
    form.append("thu_tu", banner.thu_tu || "1");
    form.append("loai", banner.loai ? "1" : "0");
    form.append("an_hien", banner.an_hien ? "1" : "0");

    setLoading(true);

    const res = await fetch(`/api/banner/${id}`, {
      method: "POST",
      body: form,
    });

    const json = await res.json();
    setLoading(false);

    if (json.success) {
      alert("Cập nhật thành công!");
      router.push("/banner");
    } else {
      alert(json.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Sửa Banner</h1>

      <label className="font-semibold">Chọn ảnh mới</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const selected = e.target.files?.[0] || null;
          setFile(selected);
          if (selected) {
            setPreview(URL.createObjectURL(selected)); 
          }
        }}
      />

      <div className="mt-4">
        <Image src={preview || banner.hinh} width={600} height={260} alt="banner" className="rounded border"/>
      </div>

      <label className="mt-4 block font-semibold">Mô tả</label>
      <input className="w-full border p-2 rounded" value={banner.mo_ta || ""}/>

      <label className="mt-4 block font-semibold">Thứ tự</label>
      <input type="number" className="w-full border p-2 rounded" value={banner.thu_tu || ""}
        onChange={(e) => setBanner({ ...banner, thu_tu: e.target.value })}/>

      <label className="mt-4 block font-semibold">Loại banner</label>
      <select
        className="w-full border p-2 rounded"
        value={banner.loai ? 1 : 0}
        onChange={(e) =>
          setBanner({ ...banner, loai: Number(e.target.value) === 1 })
        }>
        <option value={0}>Banner chính</option>
        <option value={1}>Banner phụ</option>
      </select>

      {/* Trạng thái */}
      <label className="mt-4 block font-semibold">Trạng thái</label>
      <select
        className="w-full border p-2 rounded"
        value={banner.an_hien ? 1 : 0}
        onChange={(e) =>
          setBanner({ ...banner, an_hien: Number(e.target.value) === 1 })
        } >
        <option value={1}>Hiển thị</option>
        <option value={0}>Ẩn</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">
        {loading ? "Đang lưu..." : "Lưu thay đổi"}
      </button>
    </div>
  );
}
