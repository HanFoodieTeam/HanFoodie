"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { IDanhMuc, IBienThe, ISanPham } from "@/lib/cautrucdata";
import dynamic from "next/dynamic";
const TinyMCEEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);


type SanPhamInput = Omit<ISanPham, "id" | "hinh" | "luot_xem">;



export default function ThemSanPhamPage() {
  const router = useRouter();
  const [keywordDanhMuc, setKeywordDanhMuc] = useState("");
  const [showDanhMuc, setShowDanhMuc] = useState(false);
  const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
  const [bienThe, setBienThe] = useState<IBienThe[]>([]);
  const [hinhChinh, setHinhChinh] = useState<File | null>(null);
  const [hinhPhu, setHinhPhu] = useState<File[]>([]);
  const [slugDaSua, setSlugDaSua] = useState(false);
  const danhMucFilter = danhMuc.filter((dm) =>
  dm.ten.toLowerCase().includes(keywordDanhMuc.toLowerCase())
);


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
    het_mon: null,
  });

// ================= LOAD DANH MỤC (TỪ API SẢN PHẨM) =================
useEffect(() => {
  const loadDanhMuc = async () => {
    try {
      const res = await fetch("/api/san_pham?with_danh_muc=1");
      const json = await res.json();

      if (json.success && Array.isArray(json.danh_muc)) {
        setDanhMuc(json.danh_muc);
      } else {
        setDanhMuc([]);
      }
    } catch (err) {
      console.error("Lỗi load danh mục", err);
      setDanhMuc([]);
    }
  };

  loadDanhMuc();
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

      // Auto slug khi CHƯA sửa tay
      if (name === "ten" && !slugDaSua) {
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
        trang_thai: true,
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
  const [dangLuu, setDangLuu] = useState(false);

  // ================= SUBMIT =================
  const submit = async () => {
    // ✅ validate danh mục
    if (form.id_danh_muc === 0) {
      alert("Vui lòng chọn danh mục!");
      return;
    }

    if (!hinhChinh) {
      alert("Bạn chưa chọn hình chính!");
      return;
    }

    try {
      const fd = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        fd.append(key, safeValue(value));
      });

      fd.append("hinh", hinhChinh);
      hinhPhu.forEach((file) => fd.append("hinh_phu", file));

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

      if (data.success) {
        alert("Thêm sản phẩm thành công!");
        router.push("/san_pham");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi server!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full min-h-screen bg-white px-8 py-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-2">
            <label className="font-semibold">Tên sản phẩm</label>
            <input
              name="ten"
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>


          <div>
            <label className="font-semibold">Lượt xem</label>
            <input
              type="number"
              name="luot_xem"
              min={0}
              defaultValue={0}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Nhập số lượt xem"
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
              onChange={(e) => {
                setSlugDaSua(true);
                setForm((prev) => ({ ...prev, slug: e.target.value }));
              }}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="font-semibold">Danh mục</label>

            <select
              name="id_danh_muc"
              value={form.id_danh_muc}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3 bg-white"
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

            <div className="border rounded-lg p-2">
              <TinyMCEEditor
                apiKey="YOUR_TINYMCE_API_KEY"
                value={form.mo_ta ?? ""}
                onEditorChange={(content) =>
                  setForm((prev) => ({
                    ...prev,
                    mo_ta: content,
                  }))
                }
                init={{
                  height: 300,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "fullscreen",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic underline | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | link image | removeformat",
                  branding: false,
                }}
              />
            </div>
          </div>




        </div>

        {/* ================= HÌNH ẢNH ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

          <div>
            <label className="font-semibold">Hình phụ</label>
            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = e.target.files
                  ? Array.from(e.target.files)
                  : [];
                setHinhPhu((prev) => [...prev, ...files]);
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
                onChange={(e) => suaBienThe(i, "ten", e.target.value)}
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

              {/* <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bt.trang_thai}
                  onChange={(e) =>
                    suaBienThe(i, "trang_thai", e.target.checked)
                  }
                />
                Bật biến thể
              </label> */}

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
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md disabled:opacity-50"
          >
            + Thêm biến thể
          </button>
        </div>

        {/* ================= BUTTON LƯU ================= */}
        <div className="text-center pt-6">
          <button
              onClick={submit}
              disabled={dangLuu}
              className={`font-medium px-6 py-2 rounded-lg shadow-md ${
                dangLuu
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {dangLuu ? "Đang lưu..." : "Lưu sản phẩm"}
            </button>

        </div>
      </div>
    </div>
  );
}

