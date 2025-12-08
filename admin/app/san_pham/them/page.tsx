// // // // "use client";

// // // // import { useEffect, useState } from "react";
// // // // import { useRouter } from "next/navigation";
// // // // import Image from "next/image";
// // // // import { IDanhMuc } from "@/app/lib/cautrucdata";

// // // // interface IBienTheInput {
// // // //   ten: string;
// // // //   gia_them: number;
// // // //   trang_thai: boolean;
// // // // }

// // // // export default function AddSanPham() {
// // // //   const router = useRouter();

// // // //   const [ten, setTen] = useState("");
// // // //   const [slug, setSlug] = useState("");
// // // //   const [moTa, setMoTa] = useState("");
// // // //   const [giaGoc, setGiaGoc] = useState<number>(0);
// // // //   const [idDanhMuc, setIdDanhMuc] = useState<number>(0);
// // // //   const [anHien, setAnHien] = useState<boolean>(true);
// // // //   const [tag, setTag] = useState("");
// // // //   const [phongCach, setPhongCach] = useState("");

// // // //   const [hinhChinh, setHinhChinh] = useState<File | null>(null);
// // // //   const [hinhChinhPreview, setHinhChinhPreview] = useState<string>("");

// // // //   const [hinhPhu, setHinhPhu] = useState<File[]>([]);
// // // //   const [hinhPhuPreview, setHinhPhuPreview] = useState<string[]>([]);

// // // //   const [bienThe, setBienThe] = useState<IBienTheInput[]>([
// // // //     { ten: "", gia_them: 0, trang_thai: true },
// // // //   ]);

// // // //   const [danhMucList, setDanhMucList] = useState<IDanhMuc[]>([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   // ==========================
// // // //   // LOAD DANH MỤC
// // // //   // ==========================
// // // //   const loadDanhMuc = async () => {
// // // //     try {
// // // //       const res = await fetch("/api/san_pham?type=danh_muc");
// // // //       const json = await res.json();
// // // //       if (json.success) setDanhMucList(json.data);
// // // //     } catch (err) {
// // // //       console.error("Lỗi load danh mục:", err);
// // // //     }
// // // //     setLoading(false);
// // // //   };

// // // //   useEffect(() => {
// // // //     loadDanhMuc();
// // // //   }, []);

// // // //   // ==========================
// // // //   // HELPER SAFE IMAGE
// // // //   // ==========================
// // // //   const safeImage = (src: string | null | undefined) => src ?? "/no-image.png";

// // // //   // ==========================
// // // //   // PREVIEW HÌNH
// // // //   // ==========================
// // // //   const handleHinhChinh = (file: File | null) => {
// // // //     setHinhChinh(file);
// // // //     setHinhChinhPreview(file ? URL.createObjectURL(file) : "");
// // // //   };

// // // //   const handleHinhPhu = (files: FileList | null) => {
// // // //     if (!files) return;

// // // //     const arr = Array.from(files);
// // // //     if (hinhPhu.length + arr.length > 4) {
// // // //       alert("Tối đa 4 hình phụ!");
// // // //       return;
// // // //     }

// // // //     setHinhPhu([...hinhPhu, ...arr]);
// // // //     setHinhPhuPreview([
// // // //       ...hinhPhuPreview,
// // // //       ...arr.map((f) => URL.createObjectURL(f)),
// // // //     ]);
// // // //   };

// // // //   const removeHinhPhu = (i: number) => {
// // // //     setHinhPhu(hinhPhu.filter((_, idx) => idx !== i));
// // // //     setHinhPhuPreview(hinhPhuPreview.filter((_, idx) => idx !== i));
// // // //   };

// // // //   // ==========================
// // // //   // SUBMIT FORM
// // // //   // ==========================
// // // //   const handleSubmit = async () => {
// // // //     if (!ten.trim()) return alert("Tên sản phẩm bắt buộc!");
// // // //     if (!idDanhMuc) return alert("Bạn phải chọn danh mục!");
// // // //     if (!giaGoc) return alert("Giá gốc bắt buộc!");
// // // //     if (!hinhChinh) return alert("Ảnh chính là bắt buộc!");

// // // //     const form = new FormData();
// // // //     form.append("ten", ten);
// // // //     form.append("slug", slug);
// // // //     form.append("mo_ta", moTa);
// // // //     form.append("gia_goc", String(giaGoc));
// // // //     form.append("id_danh_muc", String(idDanhMuc));
// // // //     form.append("an_hien", String(anHien));
// // // //     form.append("tag", tag);
// // // //     form.append("phong_cach", phongCach);

// // // //     form.append("hinh_chinh", hinhChinh);

// // // //     hinhPhu.forEach((f) => form.append("hinh_phu", f));

// // // //     form.append("bien_the", JSON.stringify(bienThe));

// // // //     const res = await fetch("/api/san_pham", {
// // // //       method: "POST",
// // // //       body: form,
// // // //     });

// // // //     const json = await res.json();

// // // //     if (!json.success) {
// // // //       alert(json.message);
// // // //       return;
// // // //     }

// // // //     alert("Thêm sản phẩm thành công!");
// // // //     router.push("/san_pham");
// // // //   };

// // // //   if (loading) return <p className="p-4 text-center">Đang tải danh mục...</p>;

// // // //   // ==========================
// // // //   // UI
// // // //   // ==========================
// // // //   return (
// // // //     <div className="p-4 max-w-5xl mx-auto bg-white shadow rounded-xl">
// // // //       <h1 className="text-3xl font-bold mb-6 text-center">THÊM SẢN PHẨM</h1>

// // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //         {/* TÊN */}
// // // //         <div>
// // // //           <label className="font-medium">Tên sản phẩm</label>
// // // //           <input
// // // //             value={ten}
// // // //             onChange={(e) => {
// // // //               const val = e.target.value;
// // // //               setTen(val);

// // // //               setSlug(
// // // //                 val
// // // //                   .toLowerCase()
// // // //                   .normalize("NFD")
// // // //                   .replace(/[\u0300-\u036f]/g, "")
// // // //                   .replace(/[^a-z0-9\s-]/g, "")
// // // //                   .trim()
// // // //                   .replace(/\s+/g, "-")
// // // //               );
// // // //             }}
// // // //             className="border p-2 rounded w-full"
// // // //           />
// // // //         </div>

// // // //         {/* SLUG */}
// // // //         <div>
// // // //           <label className="font-medium">Slug</label>
// // // //           <input
// // // //             value={slug}
// // // //             onChange={(e) => setSlug(e.target.value)}
// // // //             className="border p-2 rounded w-full"
// // // //           />
// // // //         </div>

// // // //         {/* GIÁ */}
// // // //         <div>
// // // //           <label className="font-medium">Giá gốc</label>
// // // //           <input
// // // //             type="number"
// // // //             value={giaGoc}
// // // //             onChange={(e) => setGiaGoc(Number(e.target.value))}
// // // //             className="border p-2 rounded w-full"
// // // //           />
// // // //         </div>

// // // //         {/* DANH MỤC */}
// // // //         <div>
// // // //           <label className="font-medium">Danh mục</label>
// // // //           <select
// // // //             value={idDanhMuc}
// // // //             onChange={(e) => setIdDanhMuc(Number(e.target.value))}
// // // //             className="border p-2 rounded w-full"
// // // //           >
// // // //             <option value={0}>-- Chọn danh mục --</option>
// // // //             {danhMucList.map((dm) => (
// // // //               <option key={dm.id} value={dm.id}>
// // // //                 {dm.ten}
// // // //               </option>
// // // //             ))}
// // // //           </select>
// // // //         </div>
// // // //       </div>

// // // //       {/* MÔ TẢ */}
// // // //       <div className="mt-4">
// // // //         <label className="font-medium">Mô tả</label>
// // // //         <textarea
// // // //           value={moTa}
// // // //           onChange={(e) => setMoTa(e.target.value)}
// // // //           className="border p-2 rounded w-full"
// // // //         />
// // // //       </div>

// // // //       {/* HÌNH CHÍNH */}
// // // //       <div className="mt-4">
// // // //         <label className="font-medium">Hình chính</label>
// // // //         <input
// // // //           type="file"
// // // //           accept="image/*"
// // // //           onChange={(e) => handleHinhChinh(e.target.files?.[0] || null)}
// // // //         />

// // // //         {hinhChinhPreview && (
// // // //           <div className="w-24 h-24 mt-2 relative">
// // // //             <Image
// // // //               src={safeImage(hinhChinhPreview)}
// // // //               alt="Hình chính"
// // // //               fill
// // // //               className="object-cover rounded"
// // // //               unoptimized
// // // //             />
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* HÌNH PHỤ */}
// // // //       <div className="mt-4">
// // // //         <label className="font-medium">Hình phụ (tối đa 4)</label>

// // // //         {hinhPhu.length < 4 && (
// // // //           <input
// // // //             type="file"
// // // //             accept="image/*"
// // // //             multiple
// // // //             onChange={(e) => handleHinhPhu(e.target.files)}
// // // //           />
// // // //         )}

// // // //         <div className="grid grid-cols-4 gap-2 mt-2">
// // // //           {hinhPhuPreview.map((p, i) => (
// // // //             <div key={i} className="relative w-full h-20">
// // // //               <Image
// // // //                 src={safeImage(p)}
// // // //                 alt={`Hình phụ ${i + 1}`}
// // // //                 fill
// // // //                 className="object-cover rounded"
// // // //                 unoptimized
// // // //               />
// // // //               <button
// // // //                 onClick={() => removeHinhPhu(i)}
// // // //                 className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full"
// // // //               >
// // // //                 ×
// // // //               </button>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* BIẾN THỂ */}
// // // //       <div className="bg-gray-50 border p-4 rounded mt-6">
// // // //         <h2 className="font-bold mb-2">Biến thể</h2>

// // // //         {bienThe.map((bt, index) => (
// // // //           <div
// // // //             key={index}
// // // //             className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-white rounded mb-2"
// // // //           >
// // // //             <input
// // // //               placeholder="Tên biến thể"
// // // //               value={bt.ten}
// // // //               onChange={(e) => {
// // // //                 const list = [...bienThe];
// // // //                 list[index].ten = e.target.value;
// // // //                 setBienThe(list);
// // // //               }}
// // // //               className="border p-2 rounded"
// // // //             />

// // // //             <input
// // // //               type="number"
// // // //               placeholder="Giá thêm"
// // // //               value={bt.gia_them}
// // // //               onChange={(e) => {
// // // //                 const list = [...bienThe];
// // // //                 list[index].gia_them = Number(e.target.value);
// // // //                 setBienThe(list);
// // // //               }}
// // // //               className="border p-2 rounded"
// // // //             />

// // // //             <button
// // // //               onClick={() =>
// // // //                 setBienThe(bienThe.filter((_, i) => i !== index))
// // // //               }
// // // //               className="bg-red-500 text-white rounded p-2"
// // // //             >
// // // //               Xóa
// // // //             </button>
// // // //           </div>
// // // //         ))}

// // // //         <button
// // // //           onClick={() =>
// // // //             setBienThe([
// // // //               ...bienThe,
// // // //               { ten: "", gia_them: 0, trang_thai: true },
// // // //             ])
// // // //           }
// // // //           className="bg-blue-600 text-white px-4 py-2 rounded"
// // // //         >
// // // //           + Thêm biến thể
// // // //         </button>
// // // //       </div>

// // // //       <div className="text-center mt-6">
// // // //         <button
// // // //           onClick={handleSubmit}
// // // //           className="bg-green-600 text-white px-6 py-3 rounded"
// // // //         >
// // // //           ✔ Lưu sản phẩm
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // "use client";

// // // import { useState, useEffect } from "react";

// // // export default function ThemSanPham() {
// // //   const [danhMuc, setDanhMuc] = useState<any[]>([]);
// // //   const [bienThe, setBienThe] = useState<
// // //     { ten: string; gia_them: number | null; trang_thai: number }[]
// // //   >([]);

// // //   const [hinhChinhFile, setHinhChinhFile] = useState<File | null>(null);
// // //   const [hinhPhuFiles, setHinhPhuFiles] = useState<File[]>([]);

// // //   // ==================== LẤY DANH MỤC ====================
// // //   useEffect(() => {
// // //     fetch("/api/san_pham?type=danh_muc")
// // //       .then((res) => res.json())
// // //       .then((data) => setDanhMuc(data.data || []));
// // //   }, []);

// // //   // ==================== THÊM BIẾN THỂ ====================
// // //   const addBienThe = () => {
// // //     setBienThe([...bienThe, { ten: "", gia_them: null, trang_thai: 0 }]);
// // //   };

// // //   const updateBienThe = (index: number, key: string, value: any) => {
// // //     const list = [...bienThe];
// // //     list[index] = { ...list[index], [key]: value };
// // //     setBienThe(list);
// // //   };

// // //   const removeBienThe = (index: number) => {
// // //     const list = bienThe.filter((_, i) => i !== index);
// // //     setBienThe(list);
// // //   };

// // //   // ==================== SUBMIT FORM ====================
// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();

// // //     const form = new FormData();

// // //     form.append("ten", (e.target as any).ten.value);
// // //     form.append("slug", (e.target as any).slug.value);
// // //     form.append("gia_goc", (e.target as any).gia_goc.value);
// // //     form.append("mo_ta", (e.target as any).mo_ta.value);
// // //     form.append("an_hien", (e.target as any).an_hien.value);
// // //     form.append("tag", (e.target as any).tag.value);
// // //     form.append("phong_cach", (e.target as any).phong_cach.value);
// // //     form.append("trang_thai", (e.target as any).trang_thai.value);
// // //     form.append("id_danh_muc", (e.target as any).id_danh_muc.value);

// // //     // ====== HÌNH CHÍNH ======
// // //     if (hinhChinhFile) form.append("hinh", hinhChinhFile);

// // //     // ====== HÌNH PHỤ ======
// // //     hinhPhuFiles.forEach((file) => form.append("hinh_phu", file));

// // //     // ====== BIẾN THỂ ======
// // //     form.append("bien_the", JSON.stringify(bienThe));

// // //     const res = await fetch("/api/san_pham/0", {
// // //       method: "POST",
// // //       body: form,
// // //     });

// // //     const json = await res.json();

// // //     if (json.success) {
// // //       alert("✔ Thêm sản phẩm thành công!");
// // //     } else {
// // //       alert("❌ Lỗi: " + json.message);
// // //     }
// // //   };

// // //   return (
// // //     <div className="p-6 max-w-4xl mx-auto">
// // //       <h1 className="text-2xl font-bold mb-4">➕ Thêm Sản Phẩm</h1>

// // //       <form onSubmit={handleSubmit} className="space-y-4">
// // //         {/* Tên */}
// // //         <input name="ten" className="w-full border p-2" placeholder="Tên sản phẩm" required />

// // //         {/* Slug */}
// // //         <input name="slug" className="w-full border p-2" placeholder="Slug" />

// // //         {/* Giá gốc */}
// // //         <input
// // //           name="gia_goc"
// // //           type="number"
// // //           className="w-full border p-2"
// // //           placeholder="Giá gốc"
// // //         />

// // //         {/* Mô tả */}
// // //         <textarea
// // //           name="mo_ta"
// // //           className="w-full border p-2"
// // //           placeholder="Mô tả"
// // //         ></textarea>

// // //         {/* Tag */}
// // //         <input name="tag" className="w-full border p-2" placeholder="Tag sản phẩm" />

// // //         {/* Phong cách */}
// // //         <input
// // //           name="phong_cach"
// // //           className="w-full border p-2"
// // //           placeholder="Phong cách"
// // //         />

// // //         {/* Trạng thái */}
// // //         <input
// // //           name="trang_thai"
// // //           className="w-full border p-2"
// // //           placeholder="Trạng thái"
// // //         />

// // //         {/* Danh mục */}
// // //         <select name="id_danh_muc" className="w-full border p-2">
// // //           {danhMuc.map((dm) => (
// // //             <option key={dm.id} value={dm.id}>
// // //               {dm.ten}
// // //             </option>
// // //           ))}
// // //         </select>

// // //         {/* Hiển thị */}
// // //         <select name="an_hien" className="w-full border p-2">
// // //           <option value="true">Hiện</option>
// // //           <option value="false">Ẩn</option>
// // //         </select>

// // //         {/* HÌNH CHÍNH */}
// // //         <div>
// // //           <label className="font-bold">Hình chính:</label>
// // //           <input
// // //             type="file"
// // //             accept="image/*"
// // //             onChange={(e) =>
// // //               setHinhChinhFile(e.target.files ? e.target.files[0] : null)
// // //             }
// // //             className="block mt-1"
// // //           />
// // //         </div>

// // //         {/* HÌNH PHỤ */}
// // //         <div>
// // //           <label className="font-bold">Hình phụ:</label>
// // //           <input
// // //             type="file"
// // //             multiple
// // //             accept="image/*"
// // //             onChange={(e) =>
// // //               setHinhPhuFiles(e.target.files ? Array.from(e.target.files) : [])
// // //             }
// // //             className="block mt-1"
// // //           />
// // //         </div>

// // //         {/* ===== BIẾN THỂ ===== */}
// // //         <div>
// // //           <h2 className="font-bold mb-2">Danh sách biến thể</h2>

// // //           {bienThe.map((bt, index) => (
// // //             <div key={index} className="border p-3 mb-2 rounded-lg">
// // //               <input
// // //                 placeholder="Tên biến thể"
// // //                 className="border p-2 w-full mb-2"
// // //                 value={bt.ten}
// // //                 onChange={(e) => updateBienThe(index, "ten", e.target.value)}
// // //               />

// // //               <input
// // //                 placeholder="Giá thêm"
// // //                 type="number"
// // //                 className="border p-2 w-full mb-2"
// // //                 value={bt.gia_them ?? ""}
// // //                 onChange={(e) =>
// // //                   updateBienThe(index, "gia_them", Number(e.target.value))
// // //                 }
// // //               />

// // //               <select
// // //                 className="border p-2 w-full"
// // //                 value={bt.trang_thai}
// // //                 onChange={(e) =>
// // //                   updateBienThe(index, "trang_thai", Number(e.target.value))
// // //                 }
// // //               >
// // //                 <option value={0}>Hoạt động</option>
// // //                 <option value={1}>Tạm ẩn</option>
// // //               </select>

// // //               <button
// // //                 type="button"
// // //                 className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
// // //                 onClick={() => removeBienThe(index)}
// // //               >
// // //                 Xóa
// // //               </button>
// // //             </div>
// // //           ))}

// // //           <button
// // //             type="button"
// // //             className="bg-blue-600 text-white px-4 py-2 rounded"
// // //             onClick={addBienThe}
// // //           >
// // //             + Thêm biến thể
// // //           </button>
// // //         </div>

// // //         {/* SUBMIT */}
// // //         <button className="bg-green-600 text-white px-6 py-2 rounded">
// // //           Thêm sản phẩm
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useEffect, useState, ChangeEvent } from 'react';
// // import { IDanhMuc } from '@/app/lib/cautrucdata';

// // interface BienTheForm {
// //   ten: string;
// //   trang_thai: boolean;
// //   gia_them: number | null;
// // }

// // interface SanPhamFormState {
// //   ten: string;
// //   slug: string;
// //   gia_goc: string;
// //   mo_ta: string;
// //   an_hien: boolean;
// //   tag: string;
// //   phong_cach: string;
// //   trang_thai: string;
// //   id_danh_muc: string; // gửi FormData nên để string
// // }

// // export default function ThemSanPhamPage() {
// //   const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
// //   const [bienThe, setBienThe] = useState<BienTheForm[]>([]);

// //   const [form, setForm] = useState<SanPhamFormState>({
// //     ten: '',
// //     slug: '',
// //     gia_goc: '',
// //     mo_ta: '',
// //     an_hien: true,
// //     tag: '',
// //     phong_cach: '',
// //     trang_thai: '',
// //     id_danh_muc: '',
// //   });

// //   const [hinhChinh, setHinhChinh] = useState<File | null>(null);
// //   const [hinhPhu, setHinhPhu] = useState<File[]>([]);

// //   // Load danh mục
// //   useEffect(() => {
// //     const fetchDanhMuc = async () => {
// //       const res = await fetch('/api/danh-muc');
// //       const data: { data?: IDanhMuc[] } = await res.json();
// //       setDanhMuc(data.data ?? []);
// //     };

// //     fetchDanhMuc();
// //   }, []);

// //   const onChange = (
// //     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
// //   ) => {
// //     const target = e.target;
// //     const name = target.name as keyof SanPhamFormState;

// //     let value: string | boolean = target.value;

// //     if (target instanceof HTMLInputElement && target.type === 'checkbox') {
// //       value = target.checked;
// //     }

// //     setForm(prev => ({
// //       ...prev,
// //       [name]: value as SanPhamFormState[typeof name],
// //     }));
// //   };

// //   const themBienThe = () => {
// //     setBienThe(prev => [
// //       ...prev,
// //       { ten: '', trang_thai: true, gia_them: null },
// //     ]);
// //   };

// //   const suaBienThe = <K extends keyof BienTheForm>(
// //     index: number,
// //     key: K,
// //     value: BienTheForm[K]
// //   ) => {
// //     setBienThe(prev =>
// //       prev.map((item, i) =>
// //         i === index ? { ...item, [key]: value } : item
// //       )
// //     );
// //   };

// //   const xoaBienThe = (index: number) => {
// //     setBienThe(prev => prev.filter((_, i) => i !== index));
// //   };

// //   const submit = async () => {
// //     const fd = new FormData();

// //     (Object.entries(form) as [keyof SanPhamFormState, SanPhamFormState[keyof SanPhamFormState]][])
// //       .forEach(([key, value]) => {
// //         fd.append(key, String(value));
// //       });

// //     if (hinhChinh) fd.append('hinh', hinhChinh);

// //     hinhPhu.forEach(file => fd.append('hinh_phu', file));

// //     fd.append('bien_the', JSON.stringify(bienThe));

// //     const res = await fetch('/api/san-pham', {
// //       method: 'POST',
// //       body: fd,
// //     });

// //     const data: { success?: boolean } = await res.json();

// //     alert(data.success ? 'Thêm thành công!' : 'Thêm thất bại!');
// //   };

// //   return (
// //     <div className="p-6 max-w-4xl mx-auto space-y-6">
// //       <h1 className="text-2xl font-bold">Thêm Sản Phẩm</h1>

// //       <input className="border p-2 w-full" name="ten" placeholder="Tên" onChange={onChange} />
// //       <input className="border p-2 w-full" name="slug" placeholder="Slug" onChange={onChange} />
// //       <input className="border p-2 w-full" name="gia_goc" placeholder="Giá gốc" type="number" onChange={onChange} />
// //       <textarea className="border p-2 w-full" name="mo_ta" placeholder="Mô tả" onChange={onChange} />

// //       <select name="id_danh_muc" className="border p-2 w-full" onChange={onChange}>
// //         <option value="">-- Chọn danh mục --</option>
// //         {danhMuc.map(dm => (
// //           <option key={dm.id} value={String(dm.id)}>{dm.ten}</option>
// //         ))}
// //       </select>

// //       <input className="border p-2 w-full" name="tag" placeholder="Tag" onChange={onChange} />
// //       <input className="border p-2 w-full" name="phong_cach" placeholder="Phong cách" onChange={onChange} />
// //       <input className="border p-2 w-full" name="trang_thai" placeholder="Trạng thái" onChange={onChange} />

// //       <label className="flex items-center gap-2">
// //         <input type="checkbox" name="an_hien" defaultChecked onChange={onChange} /> Hiển thị
// //       </label>

// //       <div>
// //         <h2 className="font-semibold">Hình chính</h2>
// //         <input
// //           type="file"
// //           onChange={(e: ChangeEvent<HTMLInputElement>) =>
// //             setHinhChinh(e.target.files?.[0] ?? null)
// //           }
// //         />
// //       </div>

// //       <div>
// //         <h2 className="font-semibold">Hình phụ</h2>
// //         <input
// //           type="file"
// //           multiple
// //           onChange={(e: ChangeEvent<HTMLInputElement>) =>
// //             setHinhPhu(Array.from(e.target.files ?? []))
// //           }
// //         />
// //       </div>

// //       <div className="space-y-2">
// //         <h2 className="font-semibold">Biến thể</h2>

// //         {bienThe.map((bt, i) => (
// //           <div key={i} className="flex gap-2">
// //             <input
// //               className="border p-2"
// //               placeholder="Tên"
// //               value={bt.ten}
// //               onChange={e => suaBienThe(i, 'ten', e.target.value)}
// //             />
// //             <input
// //               className="border p-2"
// //               type="number"
// //               placeholder="Giá thêm"
// //               value={bt.gia_them ?? ''}
// //               onChange={e =>
// //                 suaBienThe(i, 'gia_them',
// //                   e.target.value === '' ? null : Number(e.target.value)
// //                 )
// //               }
// //             />
// //             <label className="flex items-center gap-1">
// //               <input
// //                 type="checkbox"
// //                 checked={bt.trang_thai}
// //                 onChange={e => suaBienThe(i, 'trang_thai', e.target.checked)}
// //               /> Bật
// //             </label>
// //             <button onClick={() => xoaBienThe(i)} className="text-red-500">Xóa</button>
// //           </div>
// //         ))}

// //         <button onClick={themBienThe} className="px-4 py-2 bg-blue-500 text-white rounded">
// //           + Thêm biến thể
// //         </button>
// //       </div>

// //       <button
// //         onClick={submit}
// //         className="px-6 py-3 bg-green-600 text-white rounded"
// //       >
// //         Lưu sản phẩm
// //       </button>
// //     </div>
// //   );
// // }
// 'use client';

// import { useEffect, useState, ChangeEvent } from 'react';
// import { IDanhMuc } from '@/app/lib/cautrucdata';

// interface BienTheForm {
//   ten: string;
//   trang_thai: boolean;
//   gia_them: number | null;
// }

// interface SanPhamFormState {
//   ten: string;
//   slug: string;
//   gia_goc: string;
//   mo_ta: string;
//   an_hien: boolean;
//   tag: string;
//   phong_cach: string;
//   trang_thai: string;
//   id_danh_muc: string; // gửi id danh mục (string cho FormData)
// }

// export default function ThemSanPhamPage() {
//   const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
//   const [bienThe, setBienThe] = useState<BienTheForm[]>([]);

//   const [form, setForm] = useState<SanPhamFormState>({
//     ten: '',
//     slug: '',
//     gia_goc: '0',
//     mo_ta: '',
//     an_hien: true,
//     tag: '',
//     phong_cach: '',
//     trang_thai: 'Hien',
//     id_danh_muc: '',
//   });

//   const [hinhChinh, setHinhChinh] = useState<File | null>(null);
//   const [hinhPhu, setHinhPhu] = useState<File[]>([]);

//   // Load danh mục
//   useEffect(() => {
//     const fetchDanhMuc = async () => {
//       const res = await fetch('/api/danh-muc');
//       const data: { data?: IDanhMuc[] } = await res.json();
//       setDanhMuc(data.data ?? []);
//     };

//     fetchDanhMuc();
//   }, []);

//   const onChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const target = e.target;
//     const name = target.name as keyof SanPhamFormState;

//     let value: string | boolean = target.value;

//     if (target instanceof HTMLInputElement && target.type === 'checkbox') {
//       value = target.checked;
//     }

//     setForm(prev => ({
//       ...prev,
//       [name]: value as SanPhamFormState[typeof name],
//     }));
//   };

//   const themBienThe = () => {
//     setBienThe(prev => [
//       ...prev,
//       { ten: '', trang_thai: true, gia_them: null },
//     ]);
//   };

//   const suaBienThe = <K extends keyof BienTheForm>(
//     index: number,
//     key: K,
//     value: BienTheForm[K]
//   ) => {
//     setBienThe(prev =>
//       prev.map((item, i) =>
//         i === index ? { ...item, [key]: value } : item
//       )
//     );
//   };

//   const xoaBienThe = (index: number) => {
//     setBienThe(prev => prev.filter((_, i) => i !== index));
//   };

//   const submit = async () => {
//     const fd = new FormData();

//     (Object.entries(form) as [
//       keyof SanPhamFormState,
//       SanPhamFormState[keyof SanPhamFormState]
//     ][]).forEach(([key, value]) => {
//       fd.append(key, String(value));
//     });

//     if (hinhChinh) fd.append('hinh', hinhChinh);
//     hinhPhu.forEach(file => fd.append('hinh_phu', file));
//     fd.append('bien_the', JSON.stringify(bienThe));

//     const res = await fetch('/api/san-pham', {
//       method: 'POST',
//       body: fd,
//     });

//     const data: { success?: boolean } = await res.json();

//     alert(data.success ? 'Thêm thành công!' : 'Thêm thất bại!');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8 space-y-8">
//         <h1 className="text-3xl font-bold text-center">THÊM SẢN PHẨM</h1>

//         {/* GRID GIỐNG GIAO DIỆN THÊM MÓN THÊM */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="font-semibold">Tên sản phẩm</label>
//             <input
//               className="border rounded-lg p-3 w-full mt-1"
//               name="ten"
//               placeholder="VD: Gà rán, Trà sữa..."
//               onChange={onChange}
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Giá gốc (VNĐ)</label>
//             <input
//               className="border rounded-lg p-3 w-full mt-1"
//               name="gia_goc"
//               type="number"
//               onChange={onChange}
//               value={form.gia_goc}
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Slug</label>
//             <input
//               className="border rounded-lg p-3 w-full mt-1"
//               name="slug"
//               placeholder="ga-ran"
//               onChange={onChange}
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Danh mục</label>
//             {/* HIỂN THỊ TÊN – GỬI ID */}
//             <select
//               name="id_danh_muc"
//               className="border rounded-lg p-3 w-full mt-1"
//               onChange={onChange}
//             >
//               <option value="">-- Chọn danh mục --</option>
//               {danhMuc.map(dm => (
//                 <option key={dm.id} value={String(dm.id)}>
//                   {dm.ten}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="md:col-span-2">
//             <label className="font-semibold">Mô tả</label>
//             <textarea
//               className="border rounded-lg p-3 w-full mt-1"
//               rows={3}
//               name="mo_ta"
//               onChange={onChange}
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Trạng thái</label>
//             <div className="flex gap-6 mt-2">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="an_hien"
//                   checked={form.an_hien === true}
//                   onChange={() => setForm(p => ({ ...p, an_hien: true }))}
//                 />
//                 Hiện
//               </label>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="an_hien"
//                   checked={form.an_hien === false}
//                   onChange={() => setForm(p => ({ ...p, an_hien: false }))}
//                 />
//                 Ẩn
//               </label>
//             </div>
//           </div>

//           <div>
//             <label className="font-semibold">Phong cách</label>
//             <input
//               className="border rounded-lg p-3 w-full mt-1"
//               name="phong_cach"
//               onChange={onChange}
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Tag</label>
//             <input
//               className="border rounded-lg p-3 w-full mt-1"
//               name="tag"
//               onChange={onChange}
//             />
//           </div>
//         </div>

//         {/* HÌNH ẢNH */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="font-semibold">Hình chính</label>
//             <input
//               type="file"
//               className="mt-2"
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setHinhChinh(e.target.files?.[0] ?? null)
//               }
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Hình phụ</label>
//             <input
//               type="file"
//               multiple
//               className="mt-2"
//               onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                 setHinhPhu(Array.from(e.target.files ?? []))
//               }
//             />
//           </div>
//         </div>

//         {/* BIẾN THỂ */}
//         <div className="space-y-4">
//           <h2 className="text-xl font-semibold">Biến thể</h2>

//           {bienThe.map((bt, i) => (
//             <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3">
//               <input
//                 className="border rounded p-2"
//                 placeholder="Tên biến thể"
//                 value={bt.ten}
//                 onChange={e => suaBienThe(i, 'ten', e.target.value)}
//               />
//               <input
//                 className="border rounded p-2"
//                 type="number"
//                 placeholder="Giá thêm"
//                 value={bt.gia_them ?? ''}
//                 onChange={e =>
//                   suaBienThe(
//                     i,
//                     'gia_them',
//                     e.target.value === '' ? null : Number(e.target.value)
//                   )
//                 }
//               />
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={bt.trang_thai}
//                   onChange={e => suaBienThe(i, 'trang_thai', e.target.checked)}
//                 />
//                 Bật
//               </label>
//               <button
//                 onClick={() => xoaBienThe(i)}
//                 className="text-red-500 text-sm"
//               >
//                 Xóa
//               </button>
//             </div>
//           ))}

//           <button
//             onClick={themBienThe}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg"
//           >
//             + Thêm biến thể
//           </button>
//         </div>

//         {/* NÚT LƯU */}
//         <div className="text-center">
//           <button
//             onClick={submit}
//             className="px-10 py-3 bg-blue-600 text-white rounded-xl text-lg"
//           >
//             Lưu sản phẩm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { IDanhMuc, IBienThe, ISanPham } from '@/app/lib/cautrucdata';

export default function ThemSanPhamPage() {
  const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
  const [bienThe, setBienThe] = useState<IBienThe[]>([]);

  // ✅ FORM DÙNG TRỰC TIẾP ISanPham
  const [form, setForm] = useState<Omit<ISanPham, 'id'>>({
    ten: '',
    slug: '',
    gia_goc: 0,
    mo_ta: '',
    an_hien: true,
    tag: '',
    phong_cach: '',
    trang_thai: 'active',
    id_danh_muc: 0,
    hinh: null,
    luot_xem: 0,
  });

  const [hinhChinh, setHinhChinh] = useState<File | null>(null);
  const [hinhPhu, setHinhPhu] = useState<File[]>([]);

  // ================= LOAD DANH MỤC =================
  useEffect(() => {
    const fetchDanhMuc = async () => {
      const res = await fetch('/api/danh_muc');
      const data: { data?: IDanhMuc[] } = await res.json();
      setDanhMuc(data.data ?? []);
    };

    fetchDanhMuc();
  }, []);

  // ================= ON CHANGE =================
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const name = target.name as keyof typeof form;

    let value: any = target.value;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      value = target.checked;
    }

    if (name === 'gia_goc' || name === 'id_danh_muc') {
      value = Number(value);
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  // ================= BIẾN THỂ =================
  const themBienThe = () => {
    setBienThe(prev => [
      ...prev,
      {
        id: 0, // ✅ TẠM
        ten: '',
        trang_thai: true,
        gia_them: null,
        id_san_pham: 0, // ✅ TẠM
      },
    ]);
  };

  const suaBienThe = <K extends keyof IBienThe>(
    index: number,
    key: K,
    value: IBienThe[K]
  ) => {
    setBienThe(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      )
    );
  };

  const xoaBienThe = (index: number) => {
    setBienThe(prev => prev.filter((_, i) => i !== index));
  };

  // ================= SUBMIT =================
const submit = async () => {
  try {
    const fd = new FormData();

    // 🔥 Gửi toàn bộ dữ liệu sản phẩm (TRỪ HÌNH)
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "hinh") {   // ❗ Không append hinh ở đây
        fd.append(key, String(value ?? ""));
      }
    });

    // 🔥 Gửi hình chính đúng cách
    if (hinhChinh) {
      fd.append("hinh", hinhChinh); // ❗ KEY ĐÚNG
    } else {
      alert("Bạn chưa chọn hình chính!");
      return;
    }

    // 🔥 Gửi hình phụ
    hinhPhu.forEach((file) => fd.append("hinh_phu", file));

    // 🔥 Gửi biến thể
    fd.append("bien_the", JSON.stringify(bienThe));

    // Gửi API
    const res = await fetch("/api/san_pham", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    console.log("KQ thêm SP:", data);

    alert(data.success ? " Thêm thành công!" : " Thêm thất bại!");
  } catch (error) {
    console.error(" Lỗi submit:", error);
    alert("Lỗi server!");
  }
};


  return (
  <div className="min-h-screen bg-gray-50 py-10 px-6">
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow px-10 py-10 space-y-10">

      {/* TIÊU ĐỀ */}
      <h1 className="text-4xl font-bold text-center tracking-wide">
        THÊM SẢN PHẨM
      </h1>

      {/* FORM GRID 2 CỘT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* TÊN SẢN PHẨM */}
        <div>
          <label className="block font-semibold mb-2">Tên sản phẩm</label>
          <input
            name="ten"
            onChange={onChange}
            placeholder="VD: Gà rán, Trà sữa..."
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* GIÁ GỐC */}
        <div>
          <label className="block font-semibold mb-2">Giá gốc (VNĐ)</label>
          <input
            type="number"
            name="gia_goc"
            value={form.gia_goc}
            onChange={onChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="block font-semibold mb-2">Slug</label>
          <input
            name="slug"
            onChange={onChange}
            placeholder="ga-ran"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* DANH MỤC */}
        <div>
          <label className="block font-semibold mb-2">Danh mục</label>
          <select
            name="id_danh_muc"
            value={form.id_danh_muc}
            onChange={onChange}
            className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value={0}>-- Chọn danh mục --</option>
            {danhMuc.map(dm => (
  <option key={dm.id} value={dm.id}>
    {dm.id}
  </option>
))}

          </select>
        </div>

        {/* MÔ TẢ */}
        <div className="md:col-span-2">
          <label className="block font-semibold mb-2">Mô tả</label>
          <textarea
            name="mo_ta"
            rows={4}
            onChange={onChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* TRẠNG THÁI */}
        <div>
          <label className="block font-semibold mb-2">Trạng thái</label>
          <div className="flex items-center gap-8 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.an_hien === true}
                onChange={() => setForm(p => ({ ...p, an_hien: true }))}
              />
              Hiện
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={form.an_hien === false}
                onChange={() => setForm(p => ({ ...p, an_hien: false }))}
              />
              Ẩn
            </label>
          </div>
        </div>

        {/* PHONG CÁCH */}
        <div>
          <label className="block font-semibold mb-2">Phong cách</label>
          <input
            name="phong_cach"
            onChange={onChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* TAG */}
        <div>
          <label className="block font-semibold mb-2">Tag</label>
          <input
            name="tag"
            onChange={onChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* ================= HÌNH ẢNH ================= */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  
  {/* Hình chính */}
  <div>
    <label className="block font-semibold mb-2">Hình chính</label>

    <input
      type="file"
      onChange={e => setHinhChinh(e.target.files?.[0] ?? null)}
    />

    {/* 🔥 PREVIEW HÌNH CHÍNH */}
    {hinhChinh && (
      <img
        src={URL.createObjectURL(hinhChinh)}
        className="w-40 mt-3 rounded-lg shadow"
      />
    )}
  </div>

  {/* Hình phụ */}
  <div>
    <label className="block font-semibold mb-2">Hình phụ</label>

    <input
      type="file"
      multiple
      onChange={e => setHinhPhu(Array.from(e.target.files ?? []))}
    />

    {/* 🔥 PREVIEW HÌNH PHỤ */}
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
              onChange={e => suaBienThe(i, 'ten', e.target.value)}
            />

            <input
              className="border rounded-lg px-4 py-2"
              type="number"
              placeholder="Giá thêm"
              value={bt.gia_them ?? ''}
              onChange={e =>
                suaBienThe(
                  i,
                  'gia_them',
                  e.target.value === '' ? null : Number(e.target.value)
                )
              }
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={bt.trang_thai}
                onChange={e =>
                  suaBienThe(i, 'trang_thai', e.target.checked)
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

      {/* ================= NÚT LƯU ================= */}
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
