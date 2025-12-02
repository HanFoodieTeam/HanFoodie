"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IDanhMuc } from "@/app/lib/cautrucdata";

interface IBienTheInput {
  ten: string;
  gia_them: number;
  trang_thai: boolean;
}

export default function AddSanPham() {
  const router = useRouter();

  const [ten, setTen] = useState("");
  const [slug, setSlug] = useState("");
  const [moTa, setMoTa] = useState("");
  const [giaGoc, setGiaGoc] = useState<number>(0);
  const [idDanhMuc, setIdDanhMuc] = useState<number>(0);
  const [anHien, setAnHien] = useState<boolean>(true);
  const [tag, setTag] = useState("");
  const [phongCach, setPhongCach] = useState("");

  const [hinhChinh, setHinhChinh] = useState<File | null>(null);
  const [hinhChinhPreview, setHinhChinhPreview] = useState<string>("");

  const [hinhPhu, setHinhPhu] = useState<File[]>([]);
  const [hinhPhuPreview, setHinhPhuPreview] = useState<string[]>([]);

  const [bienThe, setBienThe] = useState<IBienTheInput[]>([
    { ten: "", gia_them: 0, trang_thai: true },
  ]);

  const [danhMucList, setDanhMucList] = useState<IDanhMuc[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // LOAD DANH MỤC
  // ==========================
  const loadDanhMuc = async () => {
    try {
      const res = await fetch("/api/san_pham?type=danh_muc");
      const json = await res.json();
      if (json.success) setDanhMucList(json.data);
    } catch (err) {
      console.error("Lỗi load danh mục:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDanhMuc();
  }, []);

  // ==========================
  // HELPER SAFE IMAGE
  // ==========================
  const safeImage = (src: string | null | undefined) => src ?? "/no-image.png";

  // ==========================
  // PREVIEW HÌNH
  // ==========================
  const handleHinhChinh = (file: File | null) => {
    setHinhChinh(file);
    setHinhChinhPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleHinhPhu = (files: FileList | null) => {
    if (!files) return;

    const arr = Array.from(files);
    if (hinhPhu.length + arr.length > 4) {
      alert("Tối đa 4 hình phụ!");
      return;
    }

    setHinhPhu([...hinhPhu, ...arr]);
    setHinhPhuPreview([
      ...hinhPhuPreview,
      ...arr.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeHinhPhu = (i: number) => {
    setHinhPhu(hinhPhu.filter((_, idx) => idx !== i));
    setHinhPhuPreview(hinhPhuPreview.filter((_, idx) => idx !== i));
  };

  // ==========================
  // SUBMIT FORM
  // ==========================
  const handleSubmit = async () => {
    if (!ten.trim()) return alert("Tên sản phẩm bắt buộc!");
    if (!idDanhMuc) return alert("Bạn phải chọn danh mục!");
    if (!giaGoc) return alert("Giá gốc bắt buộc!");
    if (!hinhChinh) return alert("Ảnh chính là bắt buộc!");

    const form = new FormData();
    form.append("ten", ten);
    form.append("slug", slug);
    form.append("mo_ta", moTa);
    form.append("gia_goc", String(giaGoc));
    form.append("id_danh_muc", String(idDanhMuc));
    form.append("an_hien", String(anHien));
    form.append("tag", tag);
    form.append("phong_cach", phongCach);

    form.append("hinh_chinh", hinhChinh);

    hinhPhu.forEach((f) => form.append("hinh_phu", f));

    form.append("bien_the", JSON.stringify(bienThe));

    const res = await fetch("/api/san_pham", {
      method: "POST",
      body: form,
    });

    const json = await res.json();

    if (!json.success) {
      alert(json.message);
      return;
    }

    alert("Thêm sản phẩm thành công!");
    router.push("/san_pham");
  };

  if (loading) return <p className="p-4 text-center">Đang tải danh mục...</p>;

  // ==========================
  // UI
  // ==========================
  return (
    <div className="p-4 max-w-5xl mx-auto bg-white shadow rounded-xl">
      <h1 className="text-3xl font-bold mb-6 text-center">THÊM SẢN PHẨM</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TÊN */}
        <div>
          <label className="font-medium">Tên sản phẩm</label>
          <input
            value={ten}
            onChange={(e) => {
              const val = e.target.value;
              setTen(val);

              setSlug(
                val
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/[^a-z0-9\s-]/g, "")
                  .trim()
                  .replace(/\s+/g, "-")
              );
            }}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="font-medium">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* GIÁ */}
        <div>
          <label className="font-medium">Giá gốc</label>
          <input
            type="number"
            value={giaGoc}
            onChange={(e) => setGiaGoc(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* DANH MỤC */}
        <div>
          <label className="font-medium">Danh mục</label>
          <select
            value={idDanhMuc}
            onChange={(e) => setIdDanhMuc(Number(e.target.value))}
            className="border p-2 rounded w-full"
          >
            <option value={0}>-- Chọn danh mục --</option>
            {danhMucList.map((dm) => (
              <option key={dm.id} value={dm.id}>
                {dm.ten}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* MÔ TẢ */}
      <div className="mt-4">
        <label className="font-medium">Mô tả</label>
        <textarea
          value={moTa}
          onChange={(e) => setMoTa(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* HÌNH CHÍNH */}
      <div className="mt-4">
        <label className="font-medium">Hình chính</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleHinhChinh(e.target.files?.[0] || null)}
        />

        {hinhChinhPreview && (
          <div className="w-24 h-24 mt-2 relative">
            <Image
              src={safeImage(hinhChinhPreview)}
              alt="Hình chính"
              fill
              className="object-cover rounded"
              unoptimized
            />
          </div>
        )}
      </div>

      {/* HÌNH PHỤ */}
      <div className="mt-4">
        <label className="font-medium">Hình phụ (tối đa 4)</label>

        {hinhPhu.length < 4 && (
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleHinhPhu(e.target.files)}
          />
        )}

        <div className="grid grid-cols-4 gap-2 mt-2">
          {hinhPhuPreview.map((p, i) => (
            <div key={i} className="relative w-full h-20">
              <Image
                src={safeImage(p)}
                alt={`Hình phụ ${i + 1}`}
                fill
                className="object-cover rounded"
                unoptimized
              />
              <button
                onClick={() => removeHinhPhu(i)}
                className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BIẾN THỂ */}
      <div className="bg-gray-50 border p-4 rounded mt-6">
        <h2 className="font-bold mb-2">Biến thể</h2>

        {bienThe.map((bt, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-white rounded mb-2"
          >
            <input
              placeholder="Tên biến thể"
              value={bt.ten}
              onChange={(e) => {
                const list = [...bienThe];
                list[index].ten = e.target.value;
                setBienThe(list);
              }}
              className="border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Giá thêm"
              value={bt.gia_them}
              onChange={(e) => {
                const list = [...bienThe];
                list[index].gia_them = Number(e.target.value);
                setBienThe(list);
              }}
              className="border p-2 rounded"
            />

            <button
              onClick={() =>
                setBienThe(bienThe.filter((_, i) => i !== index))
              }
              className="bg-red-500 text-white rounded p-2"
            >
              Xóa
            </button>
          </div>
        ))}

        <button
          onClick={() =>
            setBienThe([
              ...bienThe,
              { ten: "", gia_them: 0, trang_thai: true },
            ])
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Thêm biến thể
        </button>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          ✔ Lưu sản phẩm
        </button>
      </div>
    </div>
  );
}
