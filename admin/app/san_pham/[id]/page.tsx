// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { useParams } from "next/navigation";

// // // import { ISanPham, IDanhMuc, IHinh, IBienThe } from "@/app/lib/cautrucdata";

// // // interface ISanPhamChiTiet extends ISanPham {
// // //   danh_muc?: IDanhMuc;
// // //   hinh_anh?: IHinh[];
// // //   bien_the?: IBienThe[];
// // // }

// // // export default function ChiTietSanPhamPage() {
// // //   const params = useParams<{ id: string }>();
// // //   const id = Number(params.id);

// // //   const [data, setData] = useState<ISanPhamChiTiet | null>(null);
// // //   const [danhmuc, setDanhmuc] = useState<IDanhMuc[]>([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const [form, setForm] = useState({
// // //     ten: "",
// // //     slug: "",
// // //     gia_goc: 0,
// // //     mo_ta: "",
// // //     phong_cach: "",
// // //     tag: "",
// // //     id_danh_muc: 0,

// // //     hinh: "",
// // //     hinh_chinh_file: null as File | null,

// // //     hinh_phu: [] as File[],
// // //     hinh_phu_preview: [] as string[],

// // //     bien_the: [] as IBienThe[], // quản lý biến thể
// // //   });

// // //   // ====================== FETCH DATA ======================
// // //   useEffect(() => {
// // //     if (!id || isNaN(id)) {
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     const fetchAll = async () => {
// // //       try {
// // //         const [spRes, dmRes] = await Promise.all([
// // //           fetch(`/api/san_pham/${id}`),
// // //           fetch("/api/danh_muc"),
// // //         ]);

// // //         const spJson = await spRes.json();
// // //         const dmJson = await dmRes.json();

// // //         if (dmJson.success) setDanhmuc(dmJson.data);
// // //         if (spJson.success && spJson.data) setData(spJson.data);
// // //       } catch (err) {
// // //         console.error("Fetch error:", err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchAll();
// // //   }, [id]);

// // //   // ====================== FILL FORM ======================
// // //   useEffect(() => {
// // //     if (data) {
// // //       setForm({
// // //         ten: data.ten,
// // //         slug: data.slug,
// // //         gia_goc: data.gia_goc,
// // //         mo_ta: data.mo_ta || "",
// // //         phong_cach: data.phong_cach || "",
// // //         tag: data.tag || "",
// // //         id_danh_muc: data.id_danh_muc || 0,

// // //         hinh: data.hinh || "",
// // //         hinh_chinh_file: null,

// // //         hinh_phu: [],
// // //         hinh_phu_preview:
// // //           data.hinh_anh?.map((h) => h.hinh).filter((x): x is string => !!x) || [],

// // //         bien_the: data.bien_the || [],
// // //       });
// // //     }
// // //   }, [data]);

// // // const handleSave = async () => {
// // //   if (!id || isNaN(id)) return alert("ID sản phẩm không hợp lệ");

// // //   try {
// // //     const fd = new FormData();

// // //     // Thông tin sản phẩm
// // //     fd.append("ten", form.ten);
// // //     fd.append("slug", form.slug);
// // //     fd.append("gia_goc", String(form.gia_goc));
// // //     fd.append("mo_ta", form.mo_ta);
// // //     fd.append("phong_cach", form.phong_cach);
// // //     fd.append("tag", form.tag);
// // //     fd.append("id_danh_muc", String(form.id_danh_muc));

// // //     // Hình chính
// // //     if (form.hinh_chinh_file)
// // //       fd.append("hinh_file", form.hinh_chinh_file);
// // //     else if (form.hinh)
// // //       fd.append("hinh", form.hinh);

// // //     // Hình phụ
// // //     form.hinh_phu.forEach((file) => fd.append("hinh_phu_file", file));
// // //     form.hinh_phu_preview.forEach((url) =>
// // //       fd.append("hinh_phu_old", url)
// // //     );

// // //     // Biến thể
// // //     fd.append("bien_the", JSON.stringify(form.bien_the));

// // //     const res = await fetch(`/api/san_pham/${id}`, {
// // //       method: "PUT",
// // //       body: fd,
// // //     });

// // //     const json = await res.json();
// // //     if (json.success) {
// // //       alert("✅ Cập nhật thành công!");

// // //       const spRes = await fetch(`/api/san_pham/${id}`);
// // //       const spJson = await spRes.json();
// // //       if (spJson.success && spJson.data) setData(spJson.data);
// // //     } else {
// // //       alert("⚠ Lỗi khi lưu: " + (json.message || "Không xác định"));
// // //     }
// // //   } catch (err: unknown) {
// // //     console.error("HANDLE SAVE ERROR:", err);

// // //     const message =
// // //       err instanceof Error ? err.message : "Lỗi không xác định";

// // //     alert("⚠ Lỗi khi lưu: " + message);
// // //   }
// // // };



// // //   // ====================== HANDLE BIẾN THỂ ======================
// // //   const addBienThe = () => {
// // //     setForm({
// // //       ...form,
// // //       bien_the: [
// // //         ...form.bien_the,
// // //         { id: 0, ten: "", trang_thai: true, gia_them: 0, id_san_pham: id },
// // //       ],
// // //     });
// // //   };

// // //   const updateBienThe = (
// // //     index: number,
// // //     key: keyof IBienThe,
// // //     value: string | number | boolean
// // //   ) => {
// // //     const newList = [...form.bien_the];
// // //     newList[index] = { ...newList[index], [key]: value };
// // //     setForm({ ...form, bien_the: newList });
// // //   };

// // //   const removeBienThe = (index: number) => {
// // //     const newList = [...form.bien_the];
// // //     newList.splice(index, 1);
// // //     setForm({ ...form, bien_the: newList });
// // //   };

// // //   // ====================== RENDER ======================
// // //   if (loading) return <div className="p-6">Đang tải...</div>;
// // //   if (!data) return <div className="p-6 text-red-600">Không tìm thấy sản phẩm</div>;

// // //   return (
// // //     <div className="p-6 max-w-5xl mx-auto">
// // //       <h1 className="text-3xl font-bold mb-6 text-center">Chi tiết sản phẩm</h1>

// // //       <div className="bg-white p-6 rounded-xl shadow space-y-6">
// // //         {/* DANH MỤC */}
// // //         <div>
// // //           <p className="font-semibold mb-1">Danh mục</p>
// // //           <select
// // //             className="border p-2 rounded w-full"
// // //             value={form.id_danh_muc}
// // //             onChange={(e) =>
// // //               setForm({ ...form, id_danh_muc: Number(e.target.value) })
// // //             }
// // //           >
// // //             <option value={0}>-- Chọn danh mục --</option>
// // //             {danhmuc.map((dm) => (
// // //               <option key={dm.id} value={dm.id}>
// // //                 {dm.ten}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>

// // //         {/* FORM INFO */}
// // //         <div className="grid md:grid-cols-2 gap-4">
// // //           <Input label="Tên" value={form.ten} onChange={(e) => setForm({ ...form, ten: e.target.value })} />
// // //           <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
// // //           <Input label="Giá gốc" type="number" value={form.gia_goc} onChange={(e) => setForm({ ...form, gia_goc: Number(e.target.value) })} />
// // //           <Input label="Phong cách" value={form.phong_cach} onChange={(e) => setForm({ ...form, phong_cach: e.target.value })} />
// // //           <Input label="Tag" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
// // //         </div>

// // //         {/* MÔ TẢ */}
// // //         <div>
// // //           <p className="font-semibold mb-1">Mô tả</p>
// // //           <textarea
// // //             rows={4}
// // //             className="border p-2 rounded w-full"
// // //             value={form.mo_ta}
// // //             onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
// // //           />
// // //         </div>

// // //         {/* HÌNH CHÍNH */}
// // //         <div>
// // //           <h2 className="font-semibold mb-2">Hình chính</h2>
// // //           <input
// // //             type="file"
// // //             onChange={(e) => {
// // //               const file = e.target.files?.[0];
// // //               if (!file) return;
// // //               setForm({ ...form, hinh_chinh_file: file, hinh: URL.createObjectURL(file) });
// // //             }}
// // //           />
// // //           {form.hinh && <img src={form.hinh} alt="Hình chính" className="w-40 mt-3 border rounded" />}
// // //         </div>

// // //         {/* HÌNH PHỤ */}
// // //         <div>
// // //           <h2 className="font-semibold mb-2">Hình phụ</h2>
// // //           <input
// // //             type="file"
// // //             multiple
// // //             onChange={(e) => {
// // //               const files = Array.from(e.target.files || []);
// // //               setForm({
// // //                 ...form,
// // //                 hinh_phu: [...form.hinh_phu, ...files],
// // //                 hinh_phu_preview: [...form.hinh_phu_preview, ...files.map((f) => URL.createObjectURL(f))],
// // //               });
// // //             }}
// // //           />
// // //           <div className="flex gap-3 mt-3 flex-wrap">
// // //             {form.hinh_phu_preview.map((src, i) => (
// // //               <div key={i} className="relative">
// // //                 <img src={src} alt={`Hình phụ ${i + 1}`} className="w-24 h-24 object-cover border rounded" />
// // //                 <button
// // //                   onClick={() => {
// // //                     const newPrev = [...form.hinh_phu_preview];
// // //                     const newFiles = [...form.hinh_phu];
// // //                     newPrev.splice(i, 1);
// // //                     newFiles.splice(i, 1);
// // //                     setForm({ ...form, hinh_phu_preview: newPrev, hinh_phu: newFiles });
// // //                   }}
// // //                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
// // //                 >
// // //                   ✕
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* BIẾN THỂ */}
// // //         <div>
// // //           <h2 className="font-semibold mb-2">Biến thể</h2>
// // //           {form.bien_the.map((bt, index) => (
// // //             <div key={index} className="flex gap-2 items-center mb-2">
// // //               <Input
// // //                 label="Tên"
// // //                 value={bt.ten}
// // //                 onChange={(e) => updateBienThe(index, "ten", e.target.value)}
// // //               />
// // //               <Input
// // //                 label="Giá thêm"
// // //                 type="number"
// // //                 value={bt.gia_them ?? 0}
// // //                 onChange={(e) => updateBienThe(index, "gia_them", Number(e.target.value))}
// // //               />
// // //               <select
// // //                 value={bt.trang_thai ? 1 : 0}
// // //                 onChange={(e) => updateBienThe(index, "trang_thai", e.target.value === "1")}
// // //                 className="border p-2 rounded"
// // //               >
// // //                 <option value={1}>Hoạt động</option>
// // //                 <option value={0}>Ngưng</option>
// // //               </select>
// // //               <button
// // //                 onClick={() => removeBienThe(index)}
// // //                 className="bg-red-600 text-white rounded px-2 py-1"
// // //               >
// // //                 ✕
// // //               </button>
// // //             </div>
// // //           ))}
// // //           <button
// // //             onClick={addBienThe}
// // //             className="bg-blue-600 text-white rounded px-3 py-1 mt-2"
// // //           >
// // //             Thêm biến thể
// // //           </button>
// // //         </div>

// // //         {/* BUTTON SAVE */}
// // //         <div className="text-center pt-4">
// // //           <button className="px-5 py-2 bg-green-600 text-white rounded" onClick={handleSave}>
// // //             Lưu thay đổi
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ================= INPUT COMPONENT =================
// // // function Input({ label, value, type = "text", onChange }: { label: string; value: string | number; type?: "text" | "number" | "password"; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
// // //   return (
// // //     <div>
// // //       <p className="font-semibold">{label}</p>
// // //       <input type={type} value={value} onChange={onChange} className="border p-2 w-full rounded mt-1" />
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";

// // import { ISanPham, IDanhMuc, IHinh, IBienThe } from "@/app/lib/cautrucdata";

// // interface ISanPhamChiTiet extends ISanPham {
// //   danh_muc?: IDanhMuc;
// //   hinh_anh?: IHinh[];
// //   bien_the?: IBienThe[];
// // }

// // export default function ChiTietSanPhamPage() {
// //   const params = useParams<{ id: string }>();
// //   const id = Number(params.id);

// //   const [data, setData] = useState<ISanPhamChiTiet | null>(null);
// //   const [danhmuc, setDanhmuc] = useState<IDanhMuc[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   const [form, setForm] = useState({
// //     ten: "",
// //     slug: "",
// //     gia_goc: 0,
// //     mo_ta: "",
// //     phong_cach: "",
// //     tag: "",
// //     id_danh_muc: 0,

// //     hinh: "",
// //     hinh_chinh_file: null as File | null,

// //     // Hình phụ mới + cũ tách riêng
// //     hinh_phu_moi: [] as File[],
// //     hinh_phu_cu: [] as string[],
// //     hinh_phu_preview: [] as string[],

// //     bien_the: [] as IBienThe[],
// //   });

// //   // ====================== FETCH DATA ======================
// //   useEffect(() => {
// //     if (!id || isNaN(id)) {
// //       setLoading(false);
// //       return;
// //     }

// //     const fetchAll = async () => {
// //       try {
// //         const [spRes, dmRes] = await Promise.all([
// //           fetch(`/api/san_pham/${id}`),
// //           fetch("/api/danh_muc"),
// //         ]);

// //         const spJson = await spRes.json();
// //         const dmJson = await dmRes.json();

// //         if (dmJson.success) setDanhmuc(dmJson.data);
// //         if (spJson.success && spJson.data) setData(spJson.data);
// //       } catch (err) {
// //         console.error("Fetch error:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchAll();
// //   }, [id]);

// //   // ====================== FILL FORM ======================
// //   useEffect(() => {
// //     if (data) {
// //       const hinhCu =
// //         data.hinh_anh?.map((h) => h.hinh).filter((x): x is string => !!x) || [];

// //       setForm({
// //         ten: data.ten,
// //         slug: data.slug,
// //         gia_goc: data.gia_goc,
// //         mo_ta: data.mo_ta || "",
// //         phong_cach: data.phong_cach || "",
// //         tag: data.tag || "",
// //         id_danh_muc: data.id_danh_muc || 0,

// //         hinh: data.hinh || "",
// //         hinh_chinh_file: null,

// //         hinh_phu_moi: [],
// //         hinh_phu_cu: hinhCu,
// //         hinh_phu_preview: hinhCu,

// //         bien_the: data.bien_the || [],
// //       });
// //     }
// //   }, [data]);

// //   // ====================== HANDLE SAVE ======================
// //   const handleSave = async () => {
// //     if (!id || isNaN(id)) return alert("ID sản phẩm không hợp lệ");

// //     try {
// //       const fd = new FormData();

// //       // Thông tin sản phẩm
// //       fd.append("ten", form.ten);
// //       fd.append("slug", form.slug);
// //       fd.append("gia_goc", String(form.gia_goc));
// //       fd.append("mo_ta", form.mo_ta);
// //       fd.append("phong_cach", form.phong_cach);
// //       fd.append("tag", form.tag);
// //       fd.append("id_danh_muc", String(form.id_danh_muc));

// //       // Hình chính
// //       if (form.hinh_chinh_file)
// //         fd.append("hinh_file", form.hinh_chinh_file);
// //       else if (form.hinh)
// //         fd.append("hinh", form.hinh);

// //       // Hình phụ mới
// //       form.hinh_phu_moi.forEach((file) =>
// //         fd.append("hinh_phu_file", file)
// //       );

// //       // Hình phụ cũ mang lên lại (không bị mất)
// //       form.hinh_phu_cu.forEach((url) =>
// //         fd.append("hinh_phu_old", url)
// //       );

// //       // Biến thể
// //       fd.append("bien_the", JSON.stringify(form.bien_the));

// //       const res = await fetch(`/api/san_pham/${id}`, {
// //         method: "PUT",
// //         body: fd,
// //       });

// //       const json = await res.json();
// //       if (json.success) {
// //         alert("✅ Cập nhật thành công!");

// //         // Reload
// //         const spRes = await fetch(`/api/san_pham/${id}`);
// //         const spJson = await spRes.json();
// //         if (spJson.success && spJson.data) setData(spJson.data);
// //       } else {
// //         alert("⚠ Lỗi khi lưu: " + (json.message || "Không xác định"));
// //       }
// //     } catch (err) {
// //       console.error("HANDLE SAVE ERROR:", err);
// //       alert("⚠ Lỗi khi lưu");
// //     }
// //   };

// //   // ====================== HANDLE BIẾN THỂ ======================
// //   const addBienThe = () => {
// //     setForm({
// //       ...form,
// //       bien_the: [
// //         ...form.bien_the,
// //         { id: 0, ten: "", gia_them: 0, trang_thai: true, id_san_pham: id },
// //       ],
// //     });
// //   };

// //   const updateBienThe = (
// //     index: number,
// //     key: keyof IBienThe,
// //     value: any
// //   ) => {
// //     const updated = [...form.bien_the];
// //     updated[index] = { ...updated[index], [key]: value };

// //     setForm({ ...form, bien_the: updated });
// //   };

// //   const removeBienThe = (index: number) => {
// //     const updated = [...form.bien_the];
// //     updated.splice(index, 1);

// //     setForm({ ...form, bien_the: updated });
// //   };

// //   // ====================== RENDER ======================
// //   if (loading) return <div className="p-6">Đang tải...</div>;
// //   if (!data) return <div className="p-6 text-red-600">Không tìm thấy sản phẩm</div>;

// //   return (
// //     <div className="p-6 max-w-5xl mx-auto">
// //       <h1 className="text-3xl font-bold mb-6 text-center">Chi tiết sản phẩm</h1>

// //       <div className="bg-white p-6 rounded-xl shadow space-y-6">
// //         {/* DANH MỤC */}
// //         <div>
// //           <p className="font-semibold mb-1">Danh mục</p>
// //           <select
// //             className="border p-2 rounded w-full"
// //             value={form.id_danh_muc}
// //             onChange={(e) =>
// //               setForm({ ...form, id_danh_muc: Number(e.target.value) })
// //             }
// //           >
// //             <option value={0}>-- Chọn danh mục --</option>
// //             {danhmuc.map((dm) => (
// //               <option key={dm.id} value={dm.id}>
// //                 {dm.ten}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* FORM INFO */}
// //         <div className="grid md:grid-cols-2 gap-4">
// //           <Input
// //             label="Tên"
// //             value={form.ten}
// //             onChange={(e) => setForm({ ...form, ten: e.target.value })}
// //           />
// //           <Input
// //             label="Slug"
// //             value={form.slug}
// //             onChange={(e) => setForm({ ...form, slug: e.target.value })}
// //           />
// //           <Input
// //             label="Giá gốc"
// //             type="number"
// //             value={form.gia_goc}
// //             onChange={(e) =>
// //               setForm({ ...form, gia_goc: Number(e.target.value) })
// //             }
// //           />
// //           <Input
// //             label="Phong cách"
// //             value={form.phong_cach}
// //             onChange={(e) =>
// //               setForm({ ...form, phong_cach: e.target.value })
// //             }
// //           />
// //           <Input
// //             label="Tag"
// //             value={form.tag}
// //             onChange={(e) => setForm({ ...form, tag: e.target.value })}
// //           />
// //         </div>

// //         {/* MÔ TẢ */}
// //         <div>
// //           <p className="font-semibold mb-1">Mô tả</p>
// //           <textarea
// //             rows={4}
// //             className="border p-2 rounded w-full"
// //             value={form.mo_ta}
// //             onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
// //           />
// //         </div>

// //         {/* HÌNH CHÍNH */}
// //         <div>
// //           <h2 className="font-semibold mb-2">Hình chính</h2>
// //           <input
// //             type="file"
// //             onChange={(e) => {
// //               const file = e.target.files?.[0];
// //               if (!file) return;
// //               setForm({
// //                 ...form,
// //                 hinh_chinh_file: file,
// //                 hinh: URL.createObjectURL(file),
// //               });
// //             }}
// //           />
// //           {form.hinh && (
// //             <img
// //               src={form.hinh}
// //               alt="Hình chính"
// //               className="w-40 mt-3 border rounded"
// //             />
// //           )}
// //         </div>

// //         {/* HÌNH PHỤ */}
// //         <div>
// //           <h2 className="font-semibold mb-2">Hình phụ</h2>
// //           <input
// //             type="file"
// //             multiple
// //             onChange={(e) => {
// //               const files = Array.from(e.target.files || []);

// //               setForm({
// //                 ...form,
// //                 hinh_phu_moi: [...form.hinh_phu_moi, ...files],
// //                 hinh_phu_preview: [
// //                   ...form.hinh_phu_preview,
// //                   ...files.map((f) => URL.createObjectURL(f)),
// //                 ],
// //               });
// //             }}
// //           />

// //           <div className="flex gap-3 mt-3 flex-wrap">
// //             {form.hinh_phu_preview.map((src, i) => (
// //               <div key={i} className="relative">
// //                 <img
// //                   src={src}
// //                   className="w-24 h-24 object-cover border rounded"
// //                 />
// //                 <button
// //                   onClick={() => {
// //                     const prev = [...form.hinh_phu_preview];

// //                     const laHinhCu = form.hinh_phu_cu.includes(src);

// //                     if (laHinhCu) {
// //                       setForm({
// //                         ...form,
// //                         hinh_phu_cu: form.hinh_phu_cu.filter((h) => h !== src),
// //                         hinh_phu_preview: prev.filter((h) => h !== src),
// //                       });
// //                     } else {
// //                       const idx = form.hinh_phu_preview.indexOf(src);
// //                       const newFiles = [...form.hinh_phu_moi];
// //                       newFiles.splice(idx - form.hinh_phu_cu.length, 1);

// //                       setForm({
// //                         ...form,
// //                         hinh_phu_moi: newFiles,
// //                         hinh_phu_preview: prev.filter((h) => h !== src),
// //                       });
// //                     }
// //                   }}
// //                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
// //                 >
// //                   ✕
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* BIẾN THỂ */}
// //         <div>
// //           <h2 className="font-semibold mb-2">Biến thể</h2>

// //           {form.bien_the.map((bt, index) => (
// //             <div
// //               key={bt.id || index}
// //               className="flex gap-2 items-center mb-2"
// //             >
// //               <Input
// //                 label="Tên"
// //                 value={bt.ten}
// //                 onChange={(e) =>
// //                   updateBienThe(index, "ten", e.target.value)
// //                 }
// //               />
// //               <Input
// //                 label="Giá thêm"
// //                 type="number"
// //                 value={bt.gia_them ?? 0}
// //                 onChange={(e) =>
// //                   updateBienThe(index, "gia_them", Number(e.target.value))
// //                 }
// //               />

// //               <select
// //                 value={bt.trang_thai ? 1 : 0}
// //                 onChange={(e) =>
// //                   updateBienThe(
// //                     index,
// //                     "trang_thai",
// //                     e.target.value === "1"
// //                   )
// //                 }
// //                 className="border p-2 rounded"
// //               >
// //                 <option value={1}>Hoạt động</option>
// //                 <option value={0}>Ngưng</option>
// //               </select>

// //               <button
// //                 onClick={() => removeBienThe(index)}
// //                 className="bg-red-600 text-white rounded px-2 py-1"
// //               >
// //                 ✕
// //               </button>
// //             </div>
// //           ))}

// //           <button
// //             onClick={addBienThe}
// //             className="bg-blue-600 text-white rounded px-3 py-1 mt-2"
// //           >
// //             Thêm biến thể
// //           </button>
// //         </div>

// //         {/* BUTTON SAVE */}
// //         <div className="text-center pt-4">
// //           <button
// //             className="px-5 py-2 bg-green-600 text-white rounded"
// //             onClick={handleSave}
// //           >
// //             Lưu thay đổi
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ================= INPUT COMPONENT =================
// // function Input({
// //   label,
// //   value,
// //   type = "text",
// //   onChange,
// // }: {
// //   label: string;
// //   value: string | number;
// //   type?: "text" | "number" | "password";
// //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // }) {
// //   return (
// //     <div>
// //       <p className="font-semibold">{label}</p>
// //       <input
// //         type={type}
// //         value={value}
// //         onChange={onChange}
// //         className="border p-2 w-full rounded mt-1"
// //       />
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState, ChangeEvent } from "react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import toast from "react-hot-toast";

// import {
//   ISanPham,
//   IDanhMuc,
//   IHinh,
//   IBienThe,
// } from "@/app/lib/cautrucdata";


// // =============================
// //  TYPE FORM KHÔNG DÙNG ANY
// // =============================
// interface IHinhForm {
//   id?: number;
//   hinh: string;
// }

// interface IBienTheForm {
//   id: number | null;
//   id_san_pham: number;
//   ten: string;
//   gia_them: number;
//   trang_thai: string; // string để gửi API
// }

// interface IBienTheInput {
//   id?: number;
//   ten: string;
//   gia_them: number;
//   trang_thai: string;
// }


// // =============================
// //  TRANG CHI TIẾT SẢN PHẨM
// // =============================
// export default function Page() {
//   const params = useParams();
//   const productId = Number(params.id);

//   const [loading, setLoading] = useState(true);

//   const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
//   const [data, setData] = useState<ISanPham | null>(null);

//   const [hinhPhuOld, setHinhPhuOld] = useState<IHinhForm[]>([]);
//   const [hinhPhuNew, setHinhPhuNew] = useState<File[]>([]);

//   const [bienThe, setBienThe] = useState<IBienTheForm[]>([]);

//   const [form, setForm] = useState({
//     ten: "",
//     slug: "",
//     gia_goc: 0,
//     mo_ta: "",
//     phong_cach: "",
//     tag: "",
//     id_danh_muc: 0,
//     hinh: "",
//   });


//   // =============================
//   //  FETCH DATA
//   // =============================
//   const loadData = async () => {
//     try {
//       const res = await fetch(`/api/san_pham/${productId}`);
//       const json = await res.json();

//       if (!json.success) {
//         toast.error("Không tồn tại sản phẩm");
//         return;
//       }

//       const sp: ISanPham = json.data;

//       // Đổ form
//       setForm({
//         ten: sp.ten,
//         slug: sp.slug,
//         gia_goc: sp.gia_goc,
//         mo_ta: sp.mo_ta ?? "",
//         phong_cach: sp.phong_cach ?? "",
//         tag: sp.tag ?? "",
//         id_danh_muc: sp.id_danh_muc,
//         hinh: sp.hinh,
//       });

//       // Hình phụ cũ
//       setHinhPhuOld(
//         (sp.hinh_anh ?? []).map((h) => ({
//           id: h.id,
//           hinh: h.hinh,
//         }))
//       );

//       // Biến thể
//       setBienThe(
//         (sp.bien_the ?? []).map((bt) => ({
//           id: bt.id,
//           id_san_pham: bt.id_san_pham,
//           ten: bt.ten,
//           gia_them: bt.gia_them ?? 0,
//           trang_thai: bt.trang_thai ? "true" : "false",
//         }))
//       );

//       setData(sp);
//     } catch (err) {
//       toast.error("Lỗi tải dữ liệu");
//     } finally {
//       setLoading(false);
//     }
//   };


//   // =============================
//   //  FETCH DANH MỤC
//   // =============================
//   const loadDanhMuc = async () => {
//     const res = await fetch("/api/danh_muc");
//     const json = await res.json();
//     setDanhMuc(json.data);
//   };


//   // =============================
//   //  EFFECT
//   // =============================
//   useEffect(() => {
//     loadData();
//     loadDanhMuc();
//   }, []);


//   // =============================
//   //  HANDLE CHANGE
//   // =============================
//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;

//     setForm((f) => ({
//       ...f,
//       [name]: name === "gia_goc" ? Number(value) : value,
//     }));
//   };


//   // =============================
//   //  XÓA HÌNH PHỤ CŨ
//   // =============================
//   const removeOldImage = (id?: number) => {
//     setHinhPhuOld((prev) => prev.filter((h) => h.id !== id));
//   };


//   // =============================
//   //  CHỌN HÌNH PHỤ MỚI
//   // =============================
//   const handleNewImages = (e: ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setHinhPhuNew([...hinhPhuNew, ...Array.from(e.target.files)]);
//   };

//   const removeNewImage = (idx: number) => {
//     setHinhPhuNew((prev) => prev.filter((_, i) => i !== idx));
//   };


//   // =============================
//   //  THÊM BIẾN THỂ
//   // =============================
//   const addBienThe = () => {
//     if (!data) return;

//     const item: IBienTheForm = {
//       id: null,
//       id_san_pham: data.id,
//       ten: "",
//       gia_them: 0,
//       trang_thai: "true",
//     };

//     setBienThe((prev) => [...prev, item]);
//   };

//   const removeBienThe = (index: number) => {
//     setBienThe((prev) => prev.filter((_, i) => i !== index));
//   };


//   // =============================
//   //  SUBMIT
//   // =============================
//   const handleSubmit = async () => {
//     if (!data) return;

//     const fd = new FormData();

//     // Sản phẩm
//     fd.append("ten", form.ten);
//     fd.append("slug", form.slug);
//     fd.append("gia_goc", String(form.gia_goc));
//     fd.append("mo_ta", form.mo_ta);
//     fd.append("phong_cach", form.phong_cach);
//     fd.append("tag", form.tag);
//     fd.append("id_danh_muc", String(form.id_danh_muc));
//     fd.append("hinh", form.hinh);

//     // Hình chính file
//     const inputFile = document.getElementById("hinh_file") as HTMLInputElement;
//     if (inputFile?.files && inputFile.files.length > 0) {
//       fd.append("hinh_file", inputFile.files[0]);
//     }

//     // Hình phụ cũ
//     hinhPhuOld.forEach((h) => fd.append("hinh_phu_old", h.hinh));

//     // Hình phụ mới
//     hinhPhuNew.forEach((f) => fd.append("hinh_phu_file", f));

//     // Biến thể
//     const btPayload: IBienTheInput[] = bienThe.map((bt) => ({
//       id: bt.id ?? undefined,
//       ten: bt.ten,
//       gia_them: bt.gia_them,
//       trang_thai: bt.trang_thai,
//     }));

//     fd.append("bien_the", JSON.stringify(btPayload));

//     const res = await fetch(`/api/san_pham/${productId}`, {
//       method: "PUT",
//       body: fd,
//     });

//     const json = await res.json();
//     if (json.success) toast.success("Cập nhật thành công");
//     else toast.error(json.message || "Lỗi cập nhật");

//     loadData();
//   };


//   // =============================
//   //  UI
//   // =============================
//   if (loading) return <div className="p-4">Đang tải...</div>;

//   return (
//     <div className="p-5 space-y-7">

//       <h1 className="text-2xl font-semibold">Cập nhật sản phẩm</h1>

//       {/* ===================== FORM CHÍNH ===================== */}
//       <div className="grid grid-cols-2 gap-4">

//         <div>
//           <label>Tên</label>
//           <input className="border p-2 w-full" name="ten" value={form.ten} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Slug</label>
//           <input className="border p-2 w-full" name="slug" value={form.slug} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Giá gốc</label>
//           <input type="number" className="border p-2 w-full" name="gia_goc" value={form.gia_goc} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Danh mục</label>
//           <select name="id_danh_muc" value={form.id_danh_muc} onChange={handleChange} className="border p-2 w-full">
//             {danhMuc.map((dm) => (
//               <option key={dm.id} value={dm.id}>{dm.ten}</option>
//             ))}
//           </select>
//         </div>

//         <div className="col-span-2">
//           <label>Mô tả</label>
//           <textarea className="border p-2 w-full" name="mo_ta" value={form.mo_ta} onChange={handleChange} />
//         </div>

//       </div>

//       {/* ===================== HÌNH CHÍNH ===================== */}
//       <div>
//         <label>Hình chính</label>
//         <div className="flex items-center gap-4 mt-2">
//           <Image src={form.hinh} width={120} height={120} alt="main" className="rounded" />
//           <input type="file" id="hinh_file" />
//         </div>
//       </div>

//       {/* ===================== HÌNH PHỤ ===================== */}
//       <div>
//         <div className="font-semibold mb-2">Hình phụ</div>

//         {/* Hình cũ */}
//         <div className="flex gap-4">
//           {hinhPhuOld.map((h) => (
//             <div key={h.id} className="relative">
//               <Image src={h.hinh} width={100} height={100} alt="sub" className="rounded" />
//               <button
//                 onClick={() => removeOldImage(h.id)}
//                 className="absolute top-0 right-0 bg-red-500 text-white rounded px-1"
//               >
//                 X
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Hình mới */}
//         <div className="flex gap-4 mt-2">
//           {hinhPhuNew.map((f, idx) => (
//             <div key={idx} className="relative">
//               <Image src={URL.createObjectURL(f)} width={100} height={100} alt="" />
//               <button
//                 onClick={() => removeNewImage(idx)}
//                 className="absolute top-0 right-0 bg-red-500 text-white rounded px-1"
//               >
//                 X
//               </button>
//             </div>
//           ))}
//         </div>

//         <input type="file" multiple onChange={handleNewImages} className="mt-3" />
//       </div>

//       {/* ===================== BIẾN THỂ ===================== */}
//       <div>
//         <div className="flex justify-between mb-2">
//           <div className="font-semibold">Biến thể</div>
//           <button onClick={addBienThe} className="bg-green-600 text-white px-3 py-1 rounded">+ Thêm</button>
//         </div>

//         <div className="space-y-3">
//           {bienThe.map((bt, index) => (
//             <div key={index} className="grid grid-cols-4 gap-3 border p-3 rounded">

//               <input
//                 placeholder="Tên"
//                 className="border p-2"
//                 value={bt.ten}
//                 onChange={(e) => {
//                   const v = e.target.value;
//                   setBienThe((prev) =>
//                     prev.map((b, i) => i === index ? { ...b, ten: v } : b)
//                   );
//                 }}
//               />

//               <input
//                 type="number"
//                 placeholder="Giá thêm"
//                 className="border p-2"
//                 value={bt.gia_them}
//                 onChange={(e) => {
//                   const v = Number(e.target.value);
//                   setBienThe((prev) =>
//                     prev.map((b, i) => i === index ? { ...b, gia_them: v } : b)
//                   );
//                 }}
//               />

//               <select
//                 className="border p-2"
//                 value={bt.trang_thai}
//                 onChange={(e) => {
//                   const v = e.target.value;
//                   setBienThe((prev) =>
//                     prev.map((b, i) => i === index ? { ...b, trang_thai: v } : b)
//                   );
//                 }}
//               >
//                 <option value="true">Hoạt động</option>
//                 <option value="false">Tắt</option>
//               </select>

//               <button
//                 onClick={() => removeBienThe(index)}
//                 className="bg-red-600 text-white rounded px-3"
//               >
//                 Xóa
//               </button>

//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ===================== SUBMIT ===================== */}
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-600 text-white px-5 py-2 rounded"
//       >
//         Lưu thay đổi
//       </button>

//     </div>
//   );
// }
"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  ISanPham,
  IDanhMuc,
  IHinh,
  IBienThe,
} from "@/lib/cautrucdata";

/* ============================
   Kiểu mở rộng / cho form
   ============================ */
interface ISanPhamChiTiet extends ISanPham {
  hinh_anh?: IHinh[];
  bien_the?: IBienThe[];
}

interface IHinhForm {
  id?: number;
  hinh: string;
}

interface IBienTheForm {
  id: number | null;
  id_san_pham: number;
  ten: string;
  gia_them: number;
  trang_thai: string; // "true" | "false" để gửi API
}

interface IBienTheInput {
  id?: number;
  ten: string;
  gia_them: number;
  trang_thai: string;
}

/* ============================
   Component
   ============================ */
export default function ChiTietSanPhamPage() {
  const params = useParams() as { id?: string };
  const router = useRouter();
  const productId = Number(params.id);

  // refs
  const hinhChinhRef = useRef<HTMLInputElement | null>(null);

  // states
  const [loading, setLoading] = useState<boolean>(true);

  const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
  const [sanPham, setSanPham] = useState<ISanPhamChiTiet | null>(null);

  // form state (basic fields)
  const [form, setForm] = useState({
    ten: "",
    slug: "",
    gia_goc: 0,
    mo_ta: "",
    phong_cach: "",
    tag: "",
    id_danh_muc: 0,
    hinh: "", // preview url or existing url
  });

  // hình phụ cũ (url list with id)
  const [hinhPhuOld, setHinhPhuOld] = useState<IHinhForm[]>([]);
  // hình phụ mới (File list)
  const [hinhPhuNew, setHinhPhuNew] = useState<File[]>([]);
  // biến thể form
  const [bienThe, setBienThe] = useState<IBienTheForm[]>([]);

  /* ============================
     Load dữ liệu
     ============================ */
  useEffect(() => {
    if (!productId || isNaN(productId)) {
      setLoading(false);
      return;
    }

    const loadAll = async () => {
      setLoading(true);
      try {
        const [spRes, dmRes] = await Promise.all([
          fetch(`/api/san_pham/${productId}`),
          fetch("/api/danh_muc"),
        ]);

        const spJson = await spRes.json();
        const dmJson = await dmRes.json();

        if (!spJson.success) {
          toast.error("Không tìm thấy sản phẩm");
          setLoading(false);
          return;
        }

        // cast to extended type
        const sp: ISanPhamChiTiet = spJson.data;

        // basic fields
        setForm({
          ten: sp.ten,
          slug: sp.slug,
          gia_goc: sp.gia_goc,
          mo_ta: sp.mo_ta ?? "",
          phong_cach: sp.phong_cach ?? "",
          tag: sp.tag ?? "",
          id_danh_muc: sp.id_danh_muc,
          hinh: sp.hinh ?? "",
        });

        // hình phụ cũ (convert IHinh -> IHinhForm)
        setHinhPhuOld(
          (sp.hinh_anh ?? []).map((h: IHinh) => ({
            id: h.id,
            hinh: h.hinh ?? "",
          }))
        );

        // biến thể (convert IBienThe -> IBienTheForm)
        setBienThe(
          (sp.bien_the ?? []).map((bt: IBienThe) => ({
            id: bt.id ?? null,
            id_san_pham: bt.id_san_pham,
            ten: bt.ten,
            gia_them: bt.gia_them ?? 0,
            trang_thai: bt.trang_thai ? "true" : "false",
          }))
        );

        // danh mục
        if (dmJson.success) setDanhMuc(dmJson.data);
        setSanPham(sp);
      } catch (err) {
        console.error("LOAD ERROR:", err);
        toast.error("Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  /* ============================
     Handlers: form basic
     ============================ */
  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "gia_goc" ? Number(value) : value,
    }));
  }

  /* ============================
     Hình chính: preview via ref file input
     ============================ */
  function handleHinhChinhChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, hinh: url }));
  }

  /* ============================
     Hình phụ (mới)
     ============================ */
  function handleHinhPhuNew(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;
    // keep existing new files + add new ones
    setHinhPhuNew((prev) => [...prev, ...files]);
  }

  function removeNewImage(index: number) {
    setHinhPhuNew((prev) => prev.filter((_, i) => i !== index));
  }

  function removeOldImageById(id?: number) {
    setHinhPhuOld((prev) => prev.filter((h) => h.id !== id));
  }

  /* ============================
     Biến thể handlers
     ============================ */
  function addBienThe() {
    if (!sanPham) return;
    const item: IBienTheForm = {
      id: null,
      id_san_pham: sanPham.id,
      ten: "",
      gia_them: 0,
      trang_thai: "true",
    };
    setBienThe((prev) => [...prev, item]);
  }

  function updateBienThe(
    index: number,
    key: keyof IBienTheForm,
    value: string | number
  ) {
    setBienThe((prev) =>
      prev.map((b, i) => (i === index ? { ...b, [key]: value } : b))
    );
  }

  function removeBienThe(index: number) {
    setBienThe((prev) => prev.filter((_, i) => i !== index));
  }

  /* ============================
     Submit (PUT)
     ============================ */
  async function handleSave() {
    if (!sanPham) {
      toast.error("Sản phẩm không hợp lệ");
      return;
    }

    try {
      const fd = new FormData();

      // basic
      fd.append("ten", form.ten);
      fd.append("slug", form.slug);
      fd.append("gia_goc", String(form.gia_goc));
      fd.append("mo_ta", form.mo_ta);
      fd.append("phong_cach", form.phong_cach);
      fd.append("tag", form.tag);
      fd.append("id_danh_muc", String(form.id_danh_muc));
      fd.append("hinh", form.hinh ?? "");

      // hinh_file (hình chính) nếu có file mới
      if (hinhChinhRef.current?.files && hinhChinhRef.current.files.length > 0) {
        fd.append("hinh_file", hinhChinhRef.current.files[0]);
      }

      // hình phụ cũ (URL)
      hinhPhuOld.forEach((h) => {
        fd.append("hinh_phu_old", h.hinh);
      });

      // hình phụ mới (file)
      hinhPhuNew.forEach((f) => fd.append("hinh_phu_file", f));

      // biến thể -> map sang IBienTheInput (API cần id? ten gia_them trang_thai string)
      const btPayload: IBienTheInput[] = bienThe.map((b) => ({
        id: b.id ?? undefined,
        ten: b.ten,
        gia_them: b.gia_them,
        trang_thai: b.trang_thai,
      }));

      fd.append("bien_the", JSON.stringify(btPayload));

      const res = await fetch(`/api/san_pham/${sanPham.id}`, {
        method: "PUT",
        body: fd,
      });

      const json = await res.json();
      if (json.success) {
        toast.success("Cập nhật thành công");
        router.push("/san_pham");
        // reload data and clear new files
        setHinhPhuNew([]);
        // refresh server data
        // either re-fetch or router.refresh
        await (async () => {
          setLoading(true);
          try {
            const spRes = await fetch(`/api/san_pham/${productId}`);
            const spJson = await spRes.json();
            if (spJson.success) {
              const sp: ISanPhamChiTiet = spJson.data;
              setSanPham(sp);
              setForm((prev) => ({
                ...prev,
                ten: sp.ten,
                slug: sp.slug,
                gia_goc: sp.gia_goc,
                mo_ta: sp.mo_ta ?? "",
                phong_cach: sp.phong_cach ?? "",
                tag: sp.tag ?? "",
                id_danh_muc: sp.id_danh_muc,
                hinh: sp.hinh ?? "",
              }));
              setHinhPhuOld(
                (sp.hinh_anh ?? []).map((h: IHinh) => ({
                  id: h.id,
                  hinh: h.hinh ?? "",
                }))
              );
              setBienThe(
                (sp.bien_the ?? []).map((bt: IBienThe) => ({
                  id: bt.id ?? null,
                  id_san_pham: bt.id_san_pham,
                  ten: bt.ten,
                  gia_them: bt.gia_them ?? 0,
                  trang_thai: bt.trang_thai ? "true" : "false",
                }))
              );
            }
          } catch (err) {
            console.error("Reload after save error:", err);
          } finally {
            setLoading(false);
          }
        })();
      } else {
        toast.error(json.message || "Lỗi khi lưu");
      }
    } catch (err) {
      console.error("SAVE ERROR:", err);
      toast.error("Lỗi khi lưu sản phẩm");
    }
  }

  /* ============================
     Render
     ============================ */
  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!sanPham) return <div className="p-6 text-red-600">Không tìm thấy sản phẩm</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Chi tiết sản phẩm</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        {/* DANH MỤC */}
        <div>
          <p className="font-semibold mb-1">Danh mục</p>
          <select
            className="border p-2 rounded w-full"
            name="id_danh_muc"
            value={form.id_danh_muc}
            onChange={handleInputChange}
          >
            <option value={0}>-- Chọn danh mục --</option>
            {danhMuc.map((dm) => (
              <option key={dm.id} value={dm.id}>
                {dm.ten}
              </option>
            ))}
          </select>
        </div>

        {/* FORM INFO */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Tên</p>
            <input
              className="border p-2 w-full rounded mt-1"
              name="ten"
              value={form.ten}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <p className="font-semibold">Slug</p>
            <input
              className="border p-2 w-full rounded mt-1"
              name="slug"
              value={form.slug}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <p className="font-semibold">Giá gốc</p>
            <input
              type="number"
              className="border p-2 w-full rounded mt-1"
              name="gia_goc"
              value={form.gia_goc}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <p className="font-semibold">Phong cách</p>
            <input
              className="border p-2 w-full rounded mt-1"
              name="phong_cach"
              value={form.phong_cach}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <p className="font-semibold">Tag</p>
            <input
              className="border p-2 w-full rounded mt-1"
              name="tag"
              value={form.tag}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* MÔ TẢ */}
        <div>
          <p className="font-semibold mb-1">Mô tả</p>
          <textarea
            rows={4}
            className="border p-2 rounded w-full"
            name="mo_ta"
            value={form.mo_ta}
            onChange={handleInputChange}
          />
        </div>

        {/* HÌNH CHÍNH */}
        <div>
          <h2 className="font-semibold mb-2">Hình chính</h2>
          <div className="flex items-center gap-4">
            {form.hinh ? (
              // use img tag because some URLs might be remote and next/image may require domain config
              <img src={form.hinh} alt="Hình chính" className="w-40 border rounded" />
            ) : (
              <div className="w-40 h-28 bg-gray-100 flex items-center justify-center rounded">No image</div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={hinhChinhRef}
              onChange={handleHinhChinhChange}
            />
          </div>
        </div>

        {/* HÌNH PHỤ */}
        <div>
          <h2 className="font-semibold mb-2">Hình phụ</h2>

          <div className="flex gap-3 flex-wrap mb-3">
            {hinhPhuOld.map((h) => (
              <div key={h.id ?? h.hinh} className="relative">
                <img src={h.hinh} alt="hinh phu" className="w-24 h-24 object-cover border rounded" />
                <button
                  onClick={() => removeOldImageById(h.id)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
                >
                  ✕
                </button>
              </div>
            ))}

            {hinhPhuNew.map((f, idx) => {
              const url = URL.createObjectURL(f);
              return (
                <div key={idx} className="relative">
                  <img src={url} alt={`new ${idx}`} className="w-24 h-24 object-cover border rounded" />
                  <button
                    onClick={() => removeNewImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          <input type="file" multiple accept="image/*" onChange={handleHinhPhuNew} />
        </div>

        {/* BIẾN THỂ */}
        <div>
          <h2 className="font-semibold mb-2">Biến thể</h2>

          {bienThe.map((bt, index) => (
            <div key={index} className="flex gap-2 items-center mb-2">
              <div className="flex-1">
                <input
                  className="border p-2 w-full rounded"
                  placeholder="Tên"
                  value={bt.ten}
                  onChange={(e) => updateBienThe(index, "ten", e.target.value)}
                />
              </div>

              <div className="w-36">
                <input
                  type="number"
                  className="border p-2 w-full rounded"
                  placeholder="Giá thêm"
                  value={bt.gia_them}
                  onChange={(e) => updateBienThe(index, "gia_them", Number(e.target.value))}
                />
              </div>

              <div>
                <select
                  className="border p-2 rounded"
                  value={bt.trang_thai}
                  onChange={(e) => updateBienThe(index, "trang_thai", e.target.value)}
                >
                  <option value="true">Hoạt động</option>
                  <option value="false">Ẩn</option>
                </select>
              </div>

              <button
                onClick={() => removeBienThe(index)}
                className="bg-red-600 text-white rounded px-3 py-1"
              >
                ✕
              </button>
            </div>
          ))}

          <button onClick={addBienThe} className="bg-blue-600 text-white rounded px-3 py-1 mt-2">
            Thêm biến thể
          </button>
        </div>

        {/* BUTTON SAVE */}
        <div className="text-center pt-4">
          <button className="px-5 py-2 bg-green-600 text-white rounded" onClick={handleSave}>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
