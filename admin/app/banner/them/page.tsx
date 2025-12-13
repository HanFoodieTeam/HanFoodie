"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ThemBannerPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [moTa, setMoTa] = useState("");
  const [link, setLink] = useState("");
  const [thuTu, setThuTu] = useState("1");
  const [loai, setLoai] = useState("0");
  const [anHien, setAnHien] = useState("1");
  const [loading, setLoading] = useState(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const submit = async () => {
    if (!file) return alert("Vui lòng chọn hình!");

    const form = new FormData();
    form.append("hinh", file);
    form.append("mo_ta", moTa);
    form.append("link", link);
    form.append("thu_tu", thuTu);
    form.append("loai", loai);
    form.append("an_hien", anHien);

    setLoading(true);

    const res = await fetch("/api/banner", {
      method: "POST",
      body: form,
    });

    const json = await res.json();
    setLoading(false);

    if (json.success) router.push("/banner");
    else alert(json.message);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-2 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Thêm Banner</h1>

      <input type="file" accept="image/*" onChange={onFileChange} />

      {preview && (
        <Image src={preview} alt="preview" width={600} height={260} className="rounded mt-4"/>
      )}

      <div className="mt-4">
        <label>Mô tả</label>
        <input
          className="w-full border p-2 rounded"
          value={moTa}
          onChange={(e) => setMoTa(e.target.value)}/>
      </div>

      <div className="mt-4">
        <label>Link</label>
        <input
          className="w-full border p-2 rounded"
          value={link}
          onChange={(e) => setLink(e.target.value)}/>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <label>Thứ tự</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={thuTu}
            onChange={(e) => setThuTu(e.target.value)}/>
        </div>
        <div>
          <label>Loại</label>
          <select className="w-full border p-2 rounded" value={loai} onChange={(e) => setLoai(e.target.value)}>
            <option value="0">Banner chính</option>
            <option value="1">Banner phụ</option>
          </select>
        </div>
        <div>
          <label>Trạng thái</label>
          <select className="w-full border p-2 rounded" value={anHien}  onChange={(e) => setAnHien(e.target.value)}>
            <option value="1">Hiển thị</option>
            <option value="0">Ẩn</option>
          </select>
        </div>
      </div>

      <button
        onClick={submit} 
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded">
        {loading ? "Đang xử lý..." : "Thêm Banner"}
      </button>
    </div>
  );
}
