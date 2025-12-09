// // // // "use client";

// // // // import { useEffect, useState } from "react";
// // // // import { useParams } from "next/navigation";

// // // // import { ISanPham, IDanhMuc, IHinh, IBienThe } from "@/app/lib/cautrucdata";

// // // // interface ISanPhamChiTiet extends ISanPham {
// // // //   danh_muc?: IDanhMuc;
// // // //   hinh_anh?: IHinh[];
// // // //   bien_the?: IBienThe[];
// // // // }

// // // // export default function ChiTietSanPhamPage() {
// // // //   const params = useParams<{ id: string }>();
// // // //   const id = Number(params.id);

// // // //   const [data, setData] = useState<ISanPhamChiTiet | null>(null);
// // // //   const [danhmuc, setDanhmuc] = useState<IDanhMuc[]>([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   const [form, setForm] = useState({
// // // //     ten: "",
// // // //     slug: "",
// // // //     gia_goc: 0,
// // // //     mo_ta: "",
// // // //     phong_cach: "",
// // // //     tag: "",
// // // //     id_danh_muc: 0,

// // // //     hinh: "",
// // // //     hinh_chinh_file: null as File | null,

// // // //     hinh_phu: [] as File[],
// // // //     hinh_phu_preview: [] as string[],
// // // //   });

// // // //   // ====================== FETCH DATA ======================
// // // //   useEffect(() => {
// // // //     if (!id || isNaN(id)) {
// // // //       setLoading(false);
// // // //       return;
// // // //     }

// // // //     const fetchAll = async () => {
// // // //       try {
// // // //         const [spRes, dmRes] = await Promise.all([
// // // //           fetch(`/api/san_pham/${id}`),
// // // //           fetch("/api/danh_muc"),
// // // //         ]);

// // // //         const spJson = await spRes.json();
// // // //         const dmJson = await dmRes.json();

// // // //         if (dmJson.success) setDanhmuc(dmJson.data);
// // // //         if (spJson.success && spJson.data) setData(spJson.data);
// // // //       } catch (err) {
// // // //         console.error("Fetch error:", err);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchAll();
// // // //   }, [id]);

// // // //   // ====================== FILL FORM ======================
// // // //   useEffect(() => {
// // // //     if (data) {
// // // //       setForm({
// // // //         ten: data.ten,
// // // //         slug: data.slug,
// // // //         gia_goc: data.gia_goc,
// // // //         mo_ta: data.mo_ta || "",
// // // //         phong_cach: data.phong_cach || "",
// // // //         tag: data.tag || "",
// // // //         id_danh_muc: data.id_danh_muc || 0,

// // // //         hinh: data.hinh || "",
// // // //         hinh_chinh_file: null,

// // // //         hinh_phu: [],
// // // //         hinh_phu_preview:
// // // //           data.hinh_anh?.map((h) => h.hinh).filter((x): x is string => !!x) || [],
// // // //       });
// // // //     }
// // // //   }, [data]);

// // // //   // ====================== HANDLE SAVE ======================
// // // //   const handleSave = async () => {
// // // //     if (!id || isNaN(id)) return alert("ID sản phẩm không hợp lệ");

// // // //     try {
// // // //       const fd = new FormData();

// // // //       // Thông tin sản phẩm
// // // //       fd.append("ten", form.ten);
// // // //       fd.append("slug", form.slug);
// // // //       fd.append("gia_goc", String(form.gia_goc));
// // // //       fd.append("mo_ta", form.mo_ta);
// // // //       fd.append("phong_cach", form.phong_cach);
// // // //       fd.append("tag", form.tag);
// // // //       fd.append("id_danh_muc", String(form.id_danh_muc));

// // // //       // Hình chính
// // // //       if (form.hinh_chinh_file) fd.append("hinh_file", form.hinh_chinh_file);
// // // //       else if (form.hinh) fd.append("hinh", form.hinh);

// // // //       // Hình phụ
// // // //       form.hinh_phu.forEach((file) => fd.append("hinh_phu", file));
// // // //       form.hinh_phu_preview.forEach((url) => fd.append("hinh_phu", url));

// // // //       // Biến thể
// // // //       fd.append("bien_the", JSON.stringify(data?.bien_the || []));

// // // //       const res = await fetch(`/api/san_pham/${id}`, {
// // // //         method: "PUT",
// // // //         body: fd,
// // // //       });

// // // //       const json = await res.json();
// // // //       if (json.success) {
// // // //         alert("✅ Cập nhật thành công!");
// // // //         const spRes = await fetch(`/api/san_pham/${id}`);
// // // //         const spJson = await spRes.json();
// // // //         if (spJson.success && spJson.data) setData(spJson.data);
// // // //       } else {
// // // //         alert("⚠ Lỗi khi lưu: " + (json.message || "Không xác định"));
// // // //       }
// // // //     } catch (err: unknown) {
// // // //       console.error("HANDLE SAVE ERROR:", err);
// // // //       alert("⚠ Lỗi khi lưu: " + (err instanceof Error ? err.message : "Không xác định"));
// // // //     }
// // // //   };

// // // //   // ====================== RENDER ======================
// // // //   if (loading) return <div className="p-6">Đang tải...</div>;
// // // //   if (!data) return <div className="p-6 text-red-600">Không tìm thấy sản phẩm</div>;

// // // //   return (
// // // //     <div className="p-6 max-w-5xl mx-auto">
// // // //       <h1 className="text-3xl font-bold mb-6 text-center">Chi tiết sản phẩm</h1>

// // // //       <div className="bg-white p-6 rounded-xl shadow space-y-6">
// // // //         {/* DANH MỤC */}
// // // //         <div>
// // // //           <p className="font-semibold mb-1">Danh mục</p>
// // // //           <select
// // // //             className="border p-2 rounded w-full"
// // // //             value={form.id_danh_muc}
// // // //             onChange={(e) =>
// // // //               setForm({ ...form, id_danh_muc: Number(e.target.value) })
// // // //             }
// // // //           >
// // // //             <option value={0}>-- Chọn danh mục --</option>
// // // //             {danhmuc.map((dm) => (
// // // //               <option key={dm.id} value={dm.id}>
// // // //                 {dm.ten}
// // // //               </option>
// // // //             ))}
// // // //           </select>
// // // //         </div>

// // // //         {/* FORM INFO */}
// // // //         <div className="grid md:grid-cols-2 gap-4">
// // // //           <Input label="Tên" value={form.ten} onChange={(e) => setForm({ ...form, ten: e.target.value })} />
// // // //           <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
// // // //           <Input label="Giá gốc" type="number" value={form.gia_goc} onChange={(e) => setForm({ ...form, gia_goc: Number(e.target.value) })} />
// // // //           <Input label="Phong cách" value={form.phong_cach} onChange={(e) => setForm({ ...form, phong_cach: e.target.value })} />
// // // //           <Input label="Tag" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
// // // //         </div>

// // // //         {/* MÔ TẢ */}
// // // //         <div>
// // // //           <p className="font-semibold mb-1">Mô tả</p>
// // // //           <textarea
// // // //             rows={4}
// // // //             className="border p-2 rounded w-full"
// // // //             value={form.mo_ta}
// // // //             onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
// // // //           />
// // // //         </div>

// // // //         {/* HÌNH CHÍNH */}
// // // //         <div>
// // // //           <h2 className="font-semibold mb-2">Hình chính</h2>
// // // //           <input
// // // //             type="file"
// // // //             onChange={(e) => {
// // // //               const file = e.target.files?.[0];
// // // //               if (!file) return;
// // // //               setForm({ ...form, hinh_chinh_file: file, hinh: URL.createObjectURL(file) });
// // // //             }}
// // // //           />
// // // //           {form.hinh && <img src={form.hinh} alt="Hình chính" className="w-40 mt-3 border rounded" />}
// // // //         </div>

// // // //         {/* HÌNH PHỤ */}
// // // //         <div>
// // // //           <h2 className="font-semibold mb-2">Hình phụ</h2>
// // // //           <input
// // // //             type="file"
// // // //             multiple
// // // //             onChange={(e) => {
// // // //               const files = Array.from(e.target.files || []);
// // // //               setForm({
// // // //                 ...form,
// // // //                 hinh_phu: [...form.hinh_phu, ...files],
// // // //                 hinh_phu_preview: [...form.hinh_phu_preview, ...files.map((f) => URL.createObjectURL(f))],
// // // //               });
// // // //             }}
// // // //           />
// // // //           <div className="flex gap-3 mt-3 flex-wrap">
// // // //             {form.hinh_phu_preview.map((src, i) => (
// // // //               <div key={i} className="relative">
// // // //                 <img src={src} alt={`Hình phụ ${i + 1}`} className="w-24 h-24 object-cover border rounded" />
// // // //                 <button
// // // //                   onClick={() => {
// // // //                     const newPrev = [...form.hinh_phu_preview];
// // // //                     const newFiles = [...form.hinh_phu];
// // // //                     newPrev.splice(i, 1);
// // // //                     newFiles.splice(i, 1);
// // // //                     setForm({ ...form, hinh_phu_preview: newPrev, hinh_phu: newFiles });
// // // //                   }}
// // // //                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
// // // //                 >
// // // //                   ✕
// // // //                 </button>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         {/* BUTTON SAVE */}
// // // //         <div className="text-center pt-4">
// // // //           <button className="px-5 py-2 bg-green-600 text-white rounded" onClick={handleSave}>
// // // //             Lưu thay đổi
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // ================= INPUT COMPONENT =================
// // // // function Input({ label, value, type = "text", onChange }: { label: string; value: string | number; type?: "text" | "number" | "password"; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
// // // //   return (
// // // //     <div>
// // // //       <p className="font-semibold">{label}</p>
// // // //       <input type={type} value={value} onChange={onChange} className="border p-2 w-full rounded mt-1" />
// // // //     </div>
// // // //   );
// // // // }



// // // // // "use client";

// // // // // import { useEffect, useState } from "react";
// // // // // import { useParams } from "next/navigation";

// // // // // import { ISanPham, IDanhMuc, IHinh, IBienThe } from "@/app/lib/cautrucdata";

// // // // // interface ISanPhamChiTiet extends ISanPham {
// // // // //   danh_muc?: IDanhMuc;
// // // // //   hinh_anh?: IHinh[];
// // // // //   bien_the?: IBienThe[];
// // // // // }

// // // // // export default function ChiTietSanPhamPage() {
// // // // //   const params = useParams<{ id: string }>();
// // // // //   const id = params.id;

// // // // //   const [data, setData] = useState<ISanPhamChiTiet | null>(null);
// // // // //   const [danhmuc, setDanhmuc] = useState<IDanhMuc[]>([]);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   const [form, setForm] = useState({
// // // // //     ten: "",
// // // // //     slug: "",
// // // // //     gia_goc: 0,
// // // // //     mo_ta: "",
// // // // //     phong_cach: "",
// // // // //     tag: "",
// // // // //     id_danh_muc: 0,

// // // // //     hinh: "",
// // // // //     hinh_chinh_file: null as File | null,

// // // // //     hinh_phu: [] as File[],           // chỉ chứa file mới
// // // // //     hinh_phu_preview: [] as string[], // chứa link hiển thị
// // // // //   });

// // // // //   // ====================== FETCH DATA ======================
// // // // //   useEffect(() => {
// // // // //     if (!id) return;

// // // // //     const fetchAll = async () => {
// // // // //       try {
// // // // //         const [spRes, dmRes] = await Promise.all([
// // // // //           fetch(`/api/san_pham/${id}`),
// // // // //           fetch("/api/danh_muc"),
// // // // //         ]);

// // // // //         const spJson = await spRes.json();
// // // // //         const dmJson = await dmRes.json();

// // // // //         if (dmJson.success) setDanhmuc(dmJson.data);

// // // // //         if (spJson.success && spJson.data) setData(spJson.data);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchAll();
// // // // //   }, [id]);

// // // // //   // ====================== FILL FORM ======================
// // // // // useEffect(() => {
// // // // //   if (data) {
// // // // //     setForm({
// // // // //       ten: data.ten,
// // // // //       slug: data.slug,
// // // // //       gia_goc: data.gia_goc,
// // // // //       mo_ta: data.mo_ta || "",
// // // // //       phong_cach: data.phong_cach || "",
// // // // //       tag: data.tag || "",
// // // // //       id_danh_muc: data.id_danh_muc || 0,

// // // // //       hinh: data.hinh || "",
// // // // //       hinh_chinh_file: null,

// // // // //       hinh_phu: [],
// // // // //       hinh_phu_preview:
// // // // //         data.hinh_anh
// // // // //           ?.map((h) => h.hinh)
// // // // //           .filter((x): x is string => typeof x === "string") ?? [],
// // // // //     });
// // // // //   }
// // // // // }, [data]);


// // // // //  // ====================== HANDLE SAVE ======================
// // // // // async function handleSave() {
// // // // //   try {
// // // // //     const fd = new FormData();

// // // // //     // ----- Thông tin sản phẩm -----
// // // // //     fd.append("ten", form.ten);
// // // // //     fd.append("slug", form.slug);
// // // // //     fd.append("gia_goc", String(form.gia_goc));
// // // // //     fd.append("mo_ta", form.mo_ta);
// // // // //     fd.append("phong_cach", form.phong_cach);
// // // // //     fd.append("tag", form.tag);
// // // // //     fd.append("id_danh_muc", String(form.id_danh_muc));

// // // // //     // ----- Hình chính -----
// // // // //     if (form.hinh_chinh_file) {
// // // // //       fd.append("hinh_file", form.hinh_chinh_file);
// // // // //     } else if (form.hinh) {
// // // // //       fd.append("hinh", form.hinh);
// // // // //     }

// // // // //     // ----- Hình phụ -----
// // // // //     if (form.hinh_phu.length > 0) {
// // // // //       form.hinh_phu.forEach((file) => fd.append("hinh_phu", file));
// // // // //     } else {
// // // // //       form.hinh_phu_preview.forEach((url) => fd.append("hinh_phu", url));
// // // // //     }

// // // // //     // ----- Biến thể -----
// // // // //     fd.append("bien_the", JSON.stringify(data?.bien_the ?? []));

// // // // //     // ----- Gửi request -----
// // // // //     const res = await fetch(`/api/san_pham/${id}`, {
// // // // //       method: "PUT",
// // // // //       body: fd,
// // // // //     });

// // // // //     const json: { success: boolean; message?: string; data?: unknown } =
// // // // //       await res.json();

// // // // //     if (json.success) {
// // // // //       alert("✅ Cập nhật thành công!");

// // // // //       const spRes = await fetch(`/api/san_pham/${id}`);
// // // // //       const spJson: { success: boolean; data?: ISanPhamChiTiet } =
// // // // //         await spRes.json();

// // // // //       if (spJson.success && spJson.data) setData(spJson.data);
// // // // //     } else {
// // // // //       alert("⚠ Lỗi khi lưu: " + (json.message ?? "Không xác định"));
// // // // //     }
// // // // //   } catch (err: unknown) {
// // // // //     console.error("HANDLE SAVE ERROR:", err);

// // // // //     if (err instanceof Error) {
// // // // //       alert("⚠ Lỗi khi lưu: " + err.message);
// // // // //     } else {
// // // // //       alert("⚠ Lỗi khi lưu: Lỗi không xác định");
// // // // //     }
// // // // //   }
// // // // // }

// // // // //   // ====================== RENDER ======================
// // // // //   if (loading) return <div className="p-6">Đang tải...</div>;
// // // // //   if (!data) return <div className="p-6 text-red-600">Không tìm thấy</div>;

// // // // //   return (
// // // // //     <div className="p-6 max-w-5xl mx-auto">
// // // // //       <h1 className="text-3xl font-bold mb-6 text-center">
// // // // //         Chi tiết sản phẩm
// // // // //       </h1>

// // // // //       <div className="bg-white p-6 rounded-xl shadow space-y-6">

// // // // //         {/* ================= DANH MỤC ================= */}
// // // // //         <div>
// // // // //           <p className="font-semibold mb-1">Danh mục</p>
// // // // //           <select
// // // // //             className="border p-2 rounded w-full"
// // // // //             value={form.id_danh_muc}
// // // // //             onChange={(e) =>
// // // // //               setForm({ ...form, id_danh_muc: Number(e.target.value) })
// // // // //             }
// // // // //           >
// // // // //             <option value="">-- Chọn danh mục --</option>
// // // // //             {danhmuc.map((dm) => (
// // // // //               <option key={dm.id} value={dm.id}>
// // // // //                 {dm.ten}
// // // // //               </option>
// // // // //             ))}
// // // // //           </select>
// // // // //         </div>

// // // // //         {/* ================= FORM INFO ================= */}
// // // // //         <div className="grid md:grid-cols-2 gap-4">
// // // // //           <Input
// // // // //             label="Tên"
// // // // //             value={form.ten}
// // // // //             onChange={(e) => setForm({ ...form, ten: e.target.value })}
// // // // //           />

// // // // //           <Input
// // // // //             label="Slug"
// // // // //             value={form.slug}
// // // // //             onChange={(e) => setForm({ ...form, slug: e.target.value })}
// // // // //           />

// // // // //           <Input
// // // // //             label="Giá gốc"
// // // // //             type="number"
// // // // //             value={form.gia_goc}
// // // // //             onChange={(e) =>
// // // // //               setForm({ ...form, gia_goc: Number(e.target.value) })
// // // // //             }
// // // // //           />

// // // // //           <Input
// // // // //             label="Phong cách"
// // // // //             value={form.phong_cach}
// // // // //             onChange={(e) => setForm({ ...form, phong_cach: e.target.value })}
// // // // //           />

// // // // //           <Input
// // // // //             label="Tag"
// // // // //             value={form.tag}
// // // // //             onChange={(e) => setForm({ ...form, tag: e.target.value })}
// // // // //           />
// // // // //         </div>

// // // // //         {/* ================= MÔ TẢ ================= */}
// // // // //         <div>
// // // // //           <p className="font-semibold mb-1">Mô tả</p>
// // // // //           <textarea
// // // // //             rows={4}
// // // // //             className="border p-2 rounded w-full"
// // // // //             value={form.mo_ta}
// // // // //             onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
// // // // //           />
// // // // //         </div>

// // // // //         {/* ================= HÌNH CHÍNH ================= */}
// // // // //         <div>
// // // // //           <h2 className="font-semibold mb-2">Hình chính</h2>

// // // // //           <input
// // // // //             type="file"
// // // // //             onChange={(e) => {
// // // // //               const file = e.target.files?.[0];
// // // // //               if (!file) return;

// // // // //               setForm({
// // // // //                 ...form,
// // // // //                 hinh_chinh_file: file,
// // // // //                 hinh: URL.createObjectURL(file),
// // // // //               });
// // // // //             }}
// // // // //           />

// // // // //           {form.hinh ? (
// // // // //             <img
// // // // //               src={form.hinh}
// // // // //               className="w-40 mt-3 border rounded"
// // // // //               alt="Hình chính"
// // // // //             />
// // // // //           ) : null}
// // // // //         </div>

// // // // //         {/* ================= HÌNH PHỤ ================= */}
// // // // //         <div>
// // // // //           <h2 className="font-semibold mb-2">Hình phụ</h2>

// // // // //           <input
// // // // //             type="file"
// // // // //             multiple
// // // // //             onChange={(e) => {
// // // // //               const files = Array.from(e.target.files || []);
// // // // //               setForm({
// // // // //                 ...form,
// // // // //                 hinh_phu: [...form.hinh_phu, ...files],
// // // // //                 hinh_phu_preview: [
// // // // //                   ...form.hinh_phu_preview,
// // // // //                   ...files.map((f) => URL.createObjectURL(f)),
// // // // //                 ],
// // // // //               });
// // // // //             }}
// // // // //           />

// // // // //           <div className="flex gap-3 mt-3 flex-wrap">
// // // // //             {form.hinh_phu_preview.map((src, i) => (
// // // // //               <div key={i} className="relative">
// // // // //                 <img
// // // // //                   src={src}
// // // // //                   className="w-24 h-24 object-cover border rounded"
// // // // //                 />
// // // // //                 <button
// // // // //                   onClick={() => {
// // // // //                     const newPrev = [...form.hinh_phu_preview];
// // // // //                     const newFiles = [...form.hinh_phu];
// // // // //                     newPrev.splice(i, 1);
// // // // //                     newFiles.splice(i, 1);
// // // // //                     setForm({
// // // // //                       ...form,
// // // // //                       hinh_phu_preview: newPrev,
// // // // //                       hinh_phu: newFiles,
// // // // //                     });
// // // // //                   }}
// // // // //                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
// // // // //                 >
// // // // //                   ✕
// // // // //                 </button>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* ================= BUTTON ================= */}
// // // // //         <div className="text-center pt-4">
// // // // //           <button
// // // // //             className="px-5 py-2 bg-green-600 text-white rounded"
// // // // //             onClick={handleSave}
// // // // //           >
// // // // //             Lưu thay đổi
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // ================= INPUT COMPONENT =================
// // // // // function Input({
// // // // //   label,
// // // // //   value,
// // // // //   type = "text",
// // // // //   onChange,
// // // // // }: {
// // // // //   label: string;
// // // // //   value: string | number;
// // // // //   type?: "text" | "number" | "password";
// // // // //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // // // // }) {
// // // // //   return (
// // // // //     <div>
// // // // //       <p className="font-semibold">{label}</p>
// // // // //       <input
// // // // //         type={type}
// // // // //         value={value}
// // // // //         onChange={onChange}
// // // // //         className="border p-2 w-full rounded mt-1"
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // // // // // "use client";

// // // // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // // // import { useParams } from "next/navigation";
// // // // // // // // // // import { ISanPham, IDanhMuc, IHinh, IBienThe } from "@/app/lib/cautrucdata";

// // // // // // // // // // interface ISanPhamChiTiet extends ISanPham {
// // // // // // // // // //   danh_muc?: IDanhMuc;
// // // // // // // // // //   hinh_anh?: IHinh[];
// // // // // // // // // //   bien_the?: IBienThe[];
// // // // // // // // // // }

// // // // // // // // // // export default function ChiTietSanPhamPage() {
// // // // // // // // // //   const params = useParams<{ id: string }>();
// // // // // // // // // //   const id = params.id;

// // // // // // // // // //   const [data, setData] = useState<ISanPhamChiTiet | null>(null);
// // // // // // // // // //   const [danhmuc, setDanhmuc] = useState<IDanhMuc[]>([]);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [editing, setEditing] = useState(false);

// // // // // // // // // //   const [form, setForm] = useState({
// // // // // // // // // //     ten: "",
// // // // // // // // // //     slug: "",
// // // // // // // // // //     gia_goc: 0,
// // // // // // // // // //     mo_ta: "",
// // // // // // // // // //     phong_cach: "",
// // // // // // // // // //     tag: "",
// // // // // // // // // //     id_danh_muc: 0,

// // // // // // // // // //     hinh: "",
// // // // // // // // // //     hinh_chinh_file: null as File | null,

// // // // // // // // // //     hinh_phu: [] as File[],          // ✅ CHỈ FILE MỚI
// // // // // // // // // //     hinh_phu_preview: [] as string[], // ✅ CHỈ ĐỂ HIỂN THỊ
// // // // // // // // // //   });

// // // // // // // // // //   // ================= FETCH =================
// // // // // // // // // //   async function fetchData() {
// // // // // // // // // //     const [spRes, dmRes] = await Promise.all([
// // // // // // // // // //       fetch(`/api/san_pham/${id}`),
// // // // // // // // // //       fetch("/api/danh_muc"),
// // // // // // // // // //     ]);

// // // // // // // // // //     const spJson = await spRes.json();
// // // // // // // // // //     const dmJson = await dmRes.json();

// // // // // // // // // //     if (dmJson.success) setDanhmuc(dmJson.data);
// // // // // // // // // //     if (spJson.success && spJson.data) {
// // // // // // // // // //       setData(spJson.data);
// // // // // // // // // //     }

// // // // // // // // // //     setLoading(false);
// // // // // // // // // //   }

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (!id) return;
// // // // // // // // // //     fetchData();
// // // // // // // // // //   }, [id]);

// // // // // // // // // //   // ================= FILL FORM =================
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     if (!data) return;

// // // // // // // // // //     setForm({
// // // // // // // // // //       ten: data.ten,
// // // // // // // // // //       slug: data.slug,
// // // // // // // // // //       gia_goc: data.gia_goc,
// // // // // // // // // //       mo_ta: data.mo_ta || "",
// // // // // // // // // //       phong_cach: data.phong_cach || "",
// // // // // // // // // //       tag: data.tag || "",
// // // // // // // // // //       id_danh_muc: data.id_danh_muc || 0,

// // // // // // // // // //       hinh: data.hinh || "",
// // // // // // // // // //       hinh_chinh_file: null,

// // // // // // // // // //       hinh_phu: [],
// // // // // // // // // //       hinh_phu_preview:
// // // // // // // // // //         data.hinh_anh?.map((h) => h.hinh as string) ?? [],
// // // // // // // // // //     });
// // // // // // // // // //   }, [data]);

// // // // // // // // // //   // ================= SAVE =================
// // // // // // // // // //   async function handleSave() {
// // // // // // // // // //     const fd = new FormData();

// // // // // // // // // //     fd.append("ten", form.ten);
// // // // // // // // // //     fd.append("slug", form.slug);
// // // // // // // // // //     fd.append("gia_goc", String(form.gia_goc));
// // // // // // // // // //     fd.append("mo_ta", form.mo_ta);
// // // // // // // // // //     fd.append("phong_cach", form.phong_cach);
// // // // // // // // // //     fd.append("tag", form.tag);
// // // // // // // // // //     fd.append("id_danh_muc", String(form.id_danh_muc));

// // // // // // // // // //     // ✅ Hình chính
// // // // // // // // // //     if (form.hinh_chinh_file) {
// // // // // // // // // //       fd.append("hinh_file", form.hinh_chinh_file);
// // // // // // // // // //     } else {
// // // // // // // // // //       fd.append("hinh", form.hinh);
// // // // // // // // // //     }

// // // // // // // // // //     // ✅ Hình phụ: CHỈ gửi file mới
// // // // // // // // // //     if (form.hinh_phu.length > 0) {
// // // // // // // // // //       form.hinh_phu.forEach((file) => fd.append("hinh_phu", file));
// // // // // // // // // //     }

// // // // // // // // // //     fd.append("bien_the", JSON.stringify(data?.bien_the ?? []));

// // // // // // // // // //     const res = await fetch(`/api/san_pham/${id}`, {
// // // // // // // // // //       method: "PUT",
// // // // // // // // // //       body: fd,
// // // // // // // // // //     });

// // // // // // // // // //     const json = await res.json();

// // // // // // // // // //     if (!json.success) {
// // // // // // // // // //       alert("❌ Lưu thất bại");
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     alert("✅ Cập nhật thành công!");
// // // // // // // // // //     setEditing(false);
// // // // // // // // // //     fetchData();
// // // // // // // // // //   }

// // // // // // // // // //   if (loading) return <div className="p-6">Đang tải...</div>;
// // // // // // // // // //   if (!data) return <div className="p-6 text-red-600">Không tìm thấy</div>;

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="p-6 max-w-5xl mx-auto">
// // // // // // // // // //       <h1 className="text-3xl font-bold text-center mb-6">Chi tiết sản phẩm</h1>

// // // // // // // // // //       <div className="bg-white p-6 rounded shadow space-y-6">

// // // // // // // // // //         <div className="text-right">
// // // // // // // // // //           <button
// // // // // // // // // //             className="px-4 py-2 bg-blue-600 text-white rounded"
// // // // // // // // // //             onClick={() => setEditing(!editing)}
// // // // // // // // // //           >
// // // // // // // // // //             {editing ? "Hủy" : "Sửa"}
// // // // // // // // // //           </button>
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* ✅ Hình chính */}
// // // // // // // // // //         <div>
// // // // // // // // // //           <p className="font-semibold">Hình chính</p>
// // // // // // // // // //           {editing && (
// // // // // // // // // //             <input
// // // // // // // // // //               type="file"
// // // // // // // // // //               onChange={(e) =>
// // // // // // // // // //                 setForm({
// // // // // // // // // //                   ...form,
// // // // // // // // // //                   hinh_chinh_file: e.target.files?.[0] || null,
// // // // // // // // // //                   hinh: e.target.files?.[0]
// // // // // // // // // //                     ? URL.createObjectURL(e.target.files[0])
// // // // // // // // // //                     : form.hinh,
// // // // // // // // // //                 })
// // // // // // // // // //               }
// // // // // // // // // //             />
// // // // // // // // // //           )}
// // // // // // // // // //           <img src={form.hinh} className="w-40 mt-2 rounded" />
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* ✅ Hình phụ */}
// // // // // // // // // //         <div>
// // // // // // // // // //           <p className="font-semibold">Hình phụ</p>

// // // // // // // // // //           {editing && (
// // // // // // // // // //             <input
// // // // // // // // // //               type="file"
// // // // // // // // // //               multiple
// // // // // // // // // //               onChange={(e) => {
// // // // // // // // // //                 const files = Array.from(e.target.files || []);
// // // // // // // // // //                 setForm({
// // // // // // // // // //                   ...form,
// // // // // // // // // //                   hinh_phu: files,
// // // // // // // // // //                   hinh_phu_preview: files.map((f) =>
// // // // // // // // // //                     URL.createObjectURL(f)
// // // // // // // // // //                   ),
// // // // // // // // // //                 });
// // // // // // // // // //               }}
// // // // // // // // // //             />
// // // // // // // // // //           )}

// // // // // // // // // //           <div className="flex gap-3 mt-3 flex-wrap">
// // // // // // // // // //             {form.hinh_phu_preview.map((src, i) => (
// // // // // // // // // //               <img
// // // // // // // // // //                 key={i}
// // // // // // // // // //                 src={src}
// // // // // // // // // //                 className="w-24 h-24 rounded border object-cover"
// // // // // // // // // //               />
// // // // // // // // // //             ))}
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>

// // // // // // // // // //         {editing && (
// // // // // // // // // //           <div className="text-center pt-4">
// // // // // // // // // //             <button
// // // // // // // // // //               className="bg-green-600 text-white px-6 py-2 rounded"
// // // // // // // // // //               onClick={handleSave}
// // // // // // // // // //             >
// // // // // // // // // //               Lưu thay đổi
// // // // // // // // // //             </button>
// // // // // // // // // //           </div>
// // // // // // // // // //         )}
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // "use client";

// // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // import { useParams } from "next/navigation";

// // // // // // // // import { ISanPham, IDanhMuc, IHinh, IBienThe } from "@/app/lib/cautrucdata";

// // // // // // // // interface ISanPhamChiTiet extends ISanPham {
// // // // // // // //   danh_muc?: IDanhMuc;
// // // // // // // //   hinh_anh?: IHinh[];
// // // // // // // //   bien_the?: IBienThe[];
// // // // // // // // }

// // // // // // // // export default function ChiTietSanPhamPage() {
// // // // // // // //   const params = useParams<{ id: string }>();
// // // // // // // //   const id = params.id;

// // // // // // // //   const [data, setData] = useState<ISanPhamChiTiet | null>(null);
// // // // // // // //   const [danhmuc, setDanhmuc] = useState<IDanhMuc[]>([]);
// // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // //   const [editMode, setEditMode] = useState(false);

// // // // // // // //   const [form, setForm] = useState({
// // // // // // // //     ten: "",
// // // // // // // //     slug: "",
// // // // // // // //     gia_goc: 0,
// // // // // // // //     mo_ta: "",
// // // // // // // //     phong_cach: "",
// // // // // // // //     tag: "",
// // // // // // // //     id_danh_muc: 0,

// // // // // // // //     hinh: "",
// // // // // // // //     hinh_chinh_file: null as File | null,

// // // // // // // //     hinh_phu: [] as File[], // chứa file mới
// // // // // // // //     hinh_phu_preview: [] as string[], // hiển thị trên UI
// // // // // // // //   });

// // // // // // // //   // ====================== FETCH DATA ======================
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!id) return;

// // // // // // // //     const fetchAll = async () => {
// // // // // // // //       try {
// // // // // // // //         const [spRes, dmRes] = await Promise.all([
// // // // // // // //           fetch(`/api/san_pham/${id}`),
// // // // // // // //           fetch(`/api/danh_muc`),
// // // // // // // //         ]);

// // // // // // // //         const spJson = await spRes.json();
// // // // // // // //         const dmJson = await dmRes.json();

// // // // // // // //         if (dmJson.success) setDanhmuc(dmJson.data);
// // // // // // // //         if (spJson.success && spJson.data) setData(spJson.data);
// // // // // // // //       } finally {
// // // // // // // //         setLoading(false);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchAll();
// // // // // // // //   }, [id]);

// // // // // // // //   // ====================== FILL FORM ======================
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (data) {
// // // // // // // //       setForm({
// // // // // // // //         ten: data.ten,
// // // // // // // //         slug: data.slug,
// // // // // // // //         gia_goc: data.gia_goc,
// // // // // // // //         mo_ta: data.mo_ta || "",
// // // // // // // //         phong_cach: data.phong_cach || "",
// // // // // // // //         tag: data.tag || "",
// // // // // // // //         id_danh_muc: data.id_danh_muc || 0,

// // // // // // // //         hinh: data.hinh || "",
// // // // // // // //         hinh_chinh_file: null,

// // // // // // // //         hinh_phu: [],
// // // // // // // //         hinh_phu_preview:
// // // // // // // //           data.hinh_anh?.map((h) => h.hinh).filter((x): x is string => typeof x === "string") ??
// // // // // // // //           [],
// // // // // // // //       });
// // // // // // // //     }
// // // // // // // //   }, [data]);

// // // // // // // //   // ====================== HANDLE SAVE ======================
// // // // // // // //   async function handleSave() {
// // // // // // // //     try {
// // // // // // // //       const fd = new FormData();

// // // // // // // //       // Info
// // // // // // // //       fd.append("ten", form.ten);
// // // // // // // //       fd.append("slug", form.slug);
// // // // // // // //       fd.append("gia_goc", String(form.gia_goc));
// // // // // // // //       fd.append("mo_ta", form.mo_ta);
// // // // // // // //       fd.append("phong_cach", form.phong_cach);
// // // // // // // //       fd.append("tag", form.tag);
// // // // // // // //       fd.append("id_danh_muc", String(form.id_danh_muc));

// // // // // // // //       // Hình chính
// // // // // // // //       if (form.hinh_chinh_file) {
// // // // // // // //         fd.append("hinh_file", form.hinh_chinh_file);
// // // // // // // //       } else {
// // // // // // // //         fd.append("hinh", form.hinh);
// // // // // // // //       }

// // // // // // // //       // Hình phụ
// // // // // // // //       if (form.hinh_phu.length > 0) {
// // // // // // // //         form.hinh_phu.forEach((file) => fd.append("hinh_phu", file));
// // // // // // // //       } else {
// // // // // // // //         form.hinh_phu_preview.forEach((url) => fd.append("hinh_phu", url));
// // // // // // // //       }

// // // // // // // //       // Biến thể gửi nguyên từ API GET
// // // // // // // //       fd.append("bien_the", JSON.stringify(data?.bien_the ?? []));

// // // // // // // //       // Send API
// // // // // // // //       const res = await fetch(`/api/san_pham/${id}`, {
// // // // // // // //         method: "PUT",
// // // // // // // //         body: fd,
// // // // // // // //       });

// // // // // // // //       const json = await res.json();

// // // // // // // //       if (json.success) {
// // // // // // // //         alert("✅ Cập nhật thành công!");

// // // // // // // //         // Load lại dữ liệu mới
// // // // // // // //         const spRes = await fetch(`/api/san_pham/${id}`);
// // // // // // // //         const spJson = await spRes.json();

// // // // // // // //         if (spJson.success && spJson.data) {
// // // // // // // //           setData(spJson.data);
// // // // // // // //           setEditMode(false); // tắt chế độ edit
// // // // // // // //         }
// // // // // // // //       } else {
// // // // // // // //         alert("⚠ Lỗi khi lưu: " + json.message);
// // // // // // // //       }
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error(err);
// // // // // // // //       alert("⚠ Lỗi không xác định");
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   // ====================== RENDER ======================
// // // // // // // //   if (loading) return <div className="p-6">Đang tải...</div>;
// // // // // // // //   if (!data) return <div className="p-6 text-red-600">Không tìm thấy sản phẩm</div>;

// // // // // // // //   return (
// // // // // // // //     <div className="p-6 max-w-5xl mx-auto">
// // // // // // // //       <div className="flex justify-between items-center mb-6">
// // // // // // // //         <h1 className="text-3xl font-bold">Chi tiết sản phẩm</h1>

// // // // // // // //         {!editMode && (
// // // // // // // //           <button
// // // // // // // //             className="px-4 py-2 bg-blue-600 text-white rounded"
// // // // // // // //             onClick={() => setEditMode(true)}
// // // // // // // //           >
// // // // // // // //             ✏ Sửa
// // // // // // // //           </button>
// // // // // // // //         )}
// // // // // // // //       </div>

// // // // // // // //       {!editMode ? (
// // // // // // // //         <DetailView data={data} />
// // // // // // // //       ) : (
// // // // // // // //         <EditForm
// // // // // // // //           form={form}
// // // // // // // //           setForm={setForm}
// // // // // // // //           danhmuc={danhmuc}
// // // // // // // //           handleSave={handleSave}
// // // // // // // //           cancel={() => setEditMode(false)}
// // // // // // // //         />
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // // ====================== DETAIL VIEW ======================
// // // // // // // // function DetailView({ data }: { data: ISanPhamChiTiet }) {
// // // // // // // //   return (
// // // // // // // //     <div className="bg-white p-6 rounded shadow space-y-4">
// // // // // // // //       <p><b>Tên:</b> {data.ten}</p>
// // // // // // // //       <p><b>Slug:</b> {data.slug}</p>
// // // // // // // //       <p><b>Giá gốc:</b> {data.gia_goc.toLocaleString()}</p>
// // // // // // // //       <p><b>Phong cách:</b> {data.phong_cach}</p>
// // // // // // // //       <p><b>Tag:</b> {data.tag}</p>
// // // // // // // //       <p><b>Mô tả:</b> {data.mo_ta}</p>

// // // // // // // //       <p><b>Danh mục:</b> {data.danh_muc?.ten}</p>

// // // // // // // //       <div>
// // // // // // // //         <b>Hình chính:</b>
// // // // // // // //         <img src={data.hinh} className="w-48 mt-2 rounded" />
// // // // // // // //       </div>

// // // // // // // //       <div>
// // // // // // // //         <b>Hình phụ:</b>
// // // // // // // //         <div className="flex gap-3 mt-2 flex-wrap">
// // // // // // // //           {data.hinh_anh?.map((h) => (
// // // // // // // //             <img key={h.id} src={h.hinh} className="w-24 h-24 border rounded" />
// // // // // // // //           ))}
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // // ====================== EDIT FORM ======================
// // // // // // // // function EditForm({
// // // // // // // //   form,
// // // // // // // //   setForm,
// // // // // // // //   danhmuc,
// // // // // // // //   handleSave,
// // // // // // // //   cancel,
// // // // // // // // }: any) {
// // // // // // // //   return (
// // // // // // // //     <div className="bg-white p-6 rounded shadow space-y-6">
// // // // // // // //       {/* ================= DANH MỤC ================= */}
// // // // // // // //       <div>
// // // // // // // //         <p className="font-semibold mb-1">Danh mục</p>
// // // // // // // //         <select
// // // // // // // //           className="border p-2 rounded w-full"
// // // // // // // //           value={form.id_danh_muc}
// // // // // // // //           onChange={(e) => setForm({ ...form, id_danh_muc: Number(e.target.value) })}
// // // // // // // //         >
// // // // // // // //           <option value="">-- Chọn danh mục --</option>
// // // // // // // //           {danhmuc.map((dm: IDanhMuc) => (
// // // // // // // //             <option key={dm.id} value={dm.id}>
// // // // // // // //               {dm.ten}
// // // // // // // //             </option>
// // // // // // // //           ))}
// // // // // // // //         </select>
// // // // // // // //       </div>

// // // // // // // //       {/* INFO INPUT */}
// // // // // // // //       <div className="grid md:grid-cols-2 gap-4">
// // // // // // // //         <Input label="Tên" value={form.ten} onChange={(e) => setForm({ ...form, ten: e.target.value })} />
// // // // // // // //         <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
// // // // // // // //         <Input
// // // // // // // //           label="Giá gốc"
// // // // // // // //           type="number"
// // // // // // // //           value={form.gia_goc}
// // // // // // // //           onChange={(e) => setForm({ ...form, gia_goc: Number(e.target.value) })}
// // // // // // // //         />
// // // // // // // //         <Input
// // // // // // // //           label="Phong cách"
// // // // // // // //           value={form.phong_cach}
// // // // // // // //           onChange={(e) => setForm({ ...form, phong_cach: e.target.value })}
// // // // // // // //         />
// // // // // // // //         <Input label="Tag" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
// // // // // // // //       </div>

// // // // // // // //       {/* MÔ TẢ */}
// // // // // // // //       <div>
// // // // // // // //         <p className="font-semibold mb-1">Mô tả</p>
// // // // // // // //         <textarea
// // // // // // // //           rows={4}
// // // // // // // //           className="border p-2 rounded w-full"
// // // // // // // //           value={form.mo_ta}
// // // // // // // //           onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
// // // // // // // //         />
// // // // // // // //       </div>

// // // // // // // //       {/* HÌNH CHÍNH */}
// // // // // // // //       <div>
// // // // // // // //         <h2 className="font-semibold mb-2">Hình chính</h2>

// // // // // // // //         <input
// // // // // // // //           type="file"
// // // // // // // //           onChange={(e) => {
// // // // // // // //             const file = e.target.files?.[0];
// // // // // // // //             if (!file) return;
// // // // // // // //             setForm({
// // // // // // // //               ...form,
// // // // // // // //               hinh_chinh_file: file,
// // // // // // // //               hinh: URL.createObjectURL(file),
// // // // // // // //             });
// // // // // // // //           }}
// // // // // // // //         />

// // // // // // // //         {form.hinh && <img src={form.hinh} className="w-40 mt-3 border rounded" />}
// // // // // // // //       </div>

// // // // // // // //       {/* HÌNH PHỤ */}
// // // // // // // //       <div>
// // // // // // // //         <h2 className="font-semibold mb-2">Hình phụ</h2>

// // // // // // // //         <input
// // // // // // // //           type="file"
// // // // // // // //           multiple
// // // // // // // //           onChange={(e) => {
// // // // // // // //             const files = Array.from(e.target.files || []);
// // // // // // // //             setForm({
// // // // // // // //               ...form,
// // // // // // // //               hinh_phu: [...form.hinh_phu, ...files],
// // // // // // // //               hinh_phu_preview: [...form.hinh_phu_preview, ...files.map((f) => URL.createObjectURL(f))],
// // // // // // // //             });
// // // // // // // //           }}
// // // // // // // //         />

// // // // // // // //         <div className="flex gap-3 mt-3 flex-wrap">
// // // // // // // //           {form.hinh_phu_preview.map((src, i) => (
// // // // // // // //             <div key={i} className="relative">
// // // // // // // //               <img src={src} className="w-24 h-24 object-cover border rounded" />
// // // // // // // //               <button
// // // // // // // //                 onClick={() => {
// // // // // // // //                   const newPrev = [...form.hinh_phu_preview];
// // // // // // // //                   const newFiles = [...form.hinh_phu];
// // // // // // // //                   newPrev.splice(i, 1);
// // // // // // // //                   newFiles.splice(i, 1);
// // // // // // // //                   setForm({ ...form, hinh_phu_preview: newPrev, hinh_phu: newFiles });
// // // // // // // //                 }}
// // // // // // // //                 className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
// // // // // // // //               >
// // // // // // // //                 ✕
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           ))}
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* BUTTON */}
// // // // // // // //       <div className="flex gap-4 justify-center pt-4">
// // // // // // // //         <button className="px-5 py-2 bg-green-600 text-white rounded" onClick={handleSave}>
// // // // // // // //           Lưu thay đổi
// // // // // // // //         </button>

// // // // // // // //         <button className="px-5 py-2 bg-gray-400 text-white rounded" onClick={cancel}>
// // // // // // // //           Hủy
// // // // // // // //         </button>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }

// // // // // // // // // ================= INPUT COMPONENT =================
// // // // // // // // function Input({
// // // // // // // //   label,
// // // // // // // //   value,
// // // // // // // //   type = "text",
// // // // // // // //   onChange,
// // // // // // // // }: {
// // // // // // // //   label: string;
// // // // // // // //   value: string | number;
// // // // // // // //   type?: "text" | "number";
// // // // // // // //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // // // // // // // }) {
// // // // // // // //   return (
// // // // // // // //     <div>
// // // // // // // //       <p className="font-semibold">{label}</p>
// // // // // // // //       <input
// // // // // // // //         type={type}
// // // // // // // //         value={value}
// // // // // // // //         onChange={onChange}
// // // // // // // //         className="border p-2 w-full rounded mt-1"
// // // // // // // //       />
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // "use client";

// // // // // // // import { useEffect, useState, ChangeEvent } from "react";
// // // // // // // import { useParams } from "next/navigation";
// // // // // // // import toast from "react-hot-toast";
// // // // // // // import { ISanPham, IDanhMuc, IBienThe, IHinh } from "@/app/lib/cautrucdata";

// // // // // // // // ================================
// // // // // // // // 🧩 Form State
// // // // // // // // ================================
// // // // // // // interface IFormState {
// // // // // // //   ten: string;
// // // // // // //   slug: string;
// // // // // // //   gia_goc: number;
// // // // // // //   mo_ta: string;
// // // // // // //   phong_cach: string;
// // // // // // //   tag: string;
// // // // // // //   id_danh_muc: number;

// // // // // // //   hinh: string;                // ảnh chính cũ
// // // // // // //   hinh_file: File | null;      // ảnh chính mới

// // // // // // //   hinh_phu: File[];            // file ảnh phụ mới
// // // // // // //   hinh_phu_preview: string[];  // preview + link ảnh cũ

// // // // // // //   bien_the: IBienThe[];
// // // // // // // }

// // // // // // // // =================================
// // // // // // // // 🔧 Component hiển thị trang
// // // // // // // // =================================
// // // // // // // export default function ChiTietSanPhamPage() {
// // // // // // //   const params = useParams();
// // // // // // //   const id = Number(params.id);

// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [edit, setEdit] = useState(false);

// // // // // // //   const [data, setData] = useState<{
// // // // // // //     san_pham: ISanPham;
// // // // // // //     danh_muc: IDanhMuc[];
// // // // // // //     hinh_anh: IHinh[];
// // // // // // //     bien_the: IBienThe[];
// // // // // // //   } | null>(null);

// // // // // // //   const [form, setForm] = useState<IFormState | null>(null);

// // // // // // //   // =================================
// // // // // // //   // 📌 Load API
// // // // // // //   // =================================
// // // // // // //   async function fetchData() {
// // // // // // //     try {
// // // // // // //       setLoading(true);
// // // // // // //       const res = await fetch(`/api/san_pham/${id}`);
// // // // // // //       const json = await res.json();

// // // // // // //       if (!json.success) {
// // // // // // //         toast.error("Không tải được dữ liệu");
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       const sp = json.data as ISanPham & {
// // // // // // //         danh_muc: IDanhMuc;
// // // // // // //         hinh_anh: IHinh[];
// // // // // // //         bien_the: IBienThe[];
// // // // // // //       };

// // // // // // //       setData({
// // // // // // //         san_pham: sp,
// // // // // // //         danh_muc: [], // nếu bạn load danh mục API khác → sửa tại đây
// // // // // // //         hinh_anh: sp.hinh_anh,
// // // // // // //         bien_the: sp.bien_the,
// // // // // // //       });

// // // // // // //       // Set form
// // // // // // //       setForm({
// // // // // // //         ten: sp.ten,
// // // // // // //         slug: sp.slug,
// // // // // // //         gia_goc: sp.gia_goc,
// // // // // // //         mo_ta: sp.mo_ta ?? "",
// // // // // // //         phong_cach: sp.phong_cach ?? "",
// // // // // // //         tag: sp.tag ?? "",
// // // // // // //         id_danh_muc: sp.id_danh_muc,

// // // // // // //         hinh: sp.hinh ?? "",
// // // // // // //         hinh_file: null,

// // // // // // //         hinh_phu: [],
// // // // // // //         hinh_phu_preview: sp.hinh_anh?.map((h) => h.hinh || "") ?? [],

// // // // // // //         bien_the: sp.bien_the,
// // // // // // //       });
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   }

// // // // // // //   useEffect(() => {
// // // // // // //     fetchData();
// // // // // // //   }, []);

// // // // // // //   // =================================
// // // // // // //   // 📤 Lưu cập nhật
// // // // // // //   // =================================
// // // // // // //   async function handleSave() {
// // // // // // //     if (!form) return;

// // // // // // //     const fd = new FormData();

// // // // // // //     fd.append("ten", form.ten);
// // // // // // //     fd.append("slug", form.slug);
// // // // // // //     fd.append("gia_goc", String(form.gia_goc));
// // // // // // //     fd.append("mo_ta", form.mo_ta);
// // // // // // //     fd.append("phong_cach", form.phong_cach);
// // // // // // //     fd.append("tag", form.tag);
// // // // // // //     fd.append("id_danh_muc", String(form.id_danh_muc));

// // // // // // //     // ảnh chính
// // // // // // //     fd.append("hinh", form.hinh);
// // // // // // //     if (form.hinh_file) {
// // // // // // //       fd.append("hinh_file", form.hinh_file);
// // // // // // //     }

// // // // // // //     // ảnh phụ
// // // // // // //     form.hinh_phu.forEach((file) => {
// // // // // // //       fd.append("hinh_phu", file);
// // // // // // //     });

// // // // // // //     // biến thể
// // // // // // //     fd.append("bien_the", JSON.stringify(form.bien_the));

// // // // // // //     const res = await fetch(`/api/san_pham/${id}`, {
// // // // // // //       method: "PUT",
// // // // // // //       body: fd,
// // // // // // //     });

// // // // // // //     const json = await res.json();

// // // // // // //     if (!json.success) {
// // // // // // //       toast.error("Cập nhật thất bại");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     toast.success("Cập nhật thành công");
// // // // // // //     setEdit(false);
// // // // // // //     fetchData();
// // // // // // //   }

// // // // // // //   if (loading || !form) return <p>Đang tải...</p>;

// // // // // // //   if (!data) return <p>Không tìm thấy sản phẩm</p>;

// // // // // // //   return (
// // // // // // //     <div className="p-6">
// // // // // // //       {!edit ? (
// // // // // // //         <DetailView data={data} onEdit={() => setEdit(true)} />
// // // // // // //       ) : (
// // // // // // //         <EditForm
// // // // // // //           form={form}
// // // // // // //           setForm={setForm}
// // // // // // //           handleSave={handleSave}
// // // // // // //           cancel={() => setEdit(false)}
// // // // // // //         />
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // /////////////////////////////////////////////////////////////////////////////
// // // // // // // // 🟦 CHI TIẾT
// // // // // // // /////////////////////////////////////////////////////////////////////////////
// // // // // // // function DetailView({
// // // // // // //   data,
// // // // // // //   onEdit,
// // // // // // // }: {
// // // // // // //   data: {
// // // // // // //     san_pham: ISanPham;
// // // // // // //     hinh_anh: IHinh[];
// // // // // // //     bien_the: IBienThe[];
// // // // // // //   };
// // // // // // //   onEdit: () => void;
// // // // // // // }) {
// // // // // // //   const sp = data.san_pham;

// // // // // // //   return (
// // // // // // //     <div className="space-y-4">
// // // // // // //       <h2 className="text-xl font-bold">{sp.ten}</h2>

// // // // // // //       {/* Hình chính */}
// // // // // // //       {sp.hinh && <img src={sp.hinh} className="w-48 rounded" />}

// // // // // // //       {/* Hình phụ */}
// // // // // // //       {data.hinh_anh.length > 0 && (
// // // // // // //         <div className="flex gap-3 flex-wrap">
// // // // // // //           {data.hinh_anh.map((h) => (
// // // // // // //             <img key={h.id} src={h.hinh || ""} className="w-32 rounded" />
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //       <button
// // // // // // //         onClick={onEdit}
// // // // // // //         className="px-4 py-2 bg-blue-600 text-white rounded"
// // // // // // //       >
// // // // // // //         Sửa
// // // // // // //       </button>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }

// // // // // // // /////////////////////////////////////////////////////////////////////////////
// // // // // // // // 🟩 FORM SỬA
// // // // // // // /////////////////////////////////////////////////////////////////////////////
// // // // // // // function EditForm({
// // // // // // //   form,
// // // // // // //   setForm,
// // // // // // //   handleSave,
// // // // // // //   cancel,
// // // // // // // }: {
// // // // // // //   form: IFormState;
// // // // // // //   setForm: React.Dispatch<React.SetStateAction<IFormState>>;
// // // // // // //   handleSave: () => Promise<void>;
// // // // // // //   cancel: () => void;
// // // // // // // }) {
// // // // // // //   // ==========================
// // // // // // //   // Ảnh chính
// // // // // // //   // ==========================
// // // // // // //   function handleMainImage(e: ChangeEvent<HTMLInputElement>) {
// // // // // // //     const file = e.target.files?.[0];
// // // // // // //     if (!file) return;

// // // // // // //     setForm((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       hinh_file: file,
// // // // // // //       hinh: URL.createObjectURL(file),
// // // // // // //     }));
// // // // // // //   }

// // // // // // //   // ==========================
// // // // // // //   // Ảnh phụ
// // // // // // //   // ==========================
// // // // // // //   function handleSubImages(e: ChangeEvent<HTMLInputElement>) {
// // // // // // //     if (!e.target.files) return;

// // // // // // //     const newFiles = Array.from(e.target.files);

// // // // // // //     setForm((prev) => ({
// // // // // // //       ...prev,
// // // // // // //       hinh_phu: [...prev.hinh_phu, ...newFiles],
// // // // // // //       hinh_phu_preview: [
// // // // // // //         ...prev.hinh_phu_preview,
// // // // // // //         ...newFiles.map((f) => URL.createObjectURL(f)),
// // // // // // //       ],
// // // // // // //     }));
// // // // // // //   }

// // // // // // //   // ==========================
// // // // // // //   // Input helper
// // // // // // //   // ==========================
// // // // // // //   const input = (
// // // // // // //     label: string,
// // // // // // //     value: string | number,
// // // // // // //     onChange: (e: ChangeEvent<HTMLInputElement>) => void,
// // // // // // //     type = "text"
// // // // // // //   ) => (
// // // // // // //     <div className="mb-3">
// // // // // // //       <p className="font-semibold mb-1">{label}</p>
// // // // // // //       <input
// // // // // // //         type={type}
// // // // // // //         value={value}
// // // // // // //         onChange={onChange}
// // // // // // //         className="border p-2 rounded w-full"
// // // // // // //       />
// // // // // // //     </div>
// // // // // // //   );

// // // // // // //   return (
// // // // // // //     <div className="space-y-4">
// // // // // // //       {input("Tên", form.ten, (e) =>
// // // // // // //         setForm((p) => ({ ...p, ten: e.target.value }))
// // // // // // //       )}

// // // // // // //       {input("Slug", form.slug, (e) =>
// // // // // // //         setForm((p) => ({ ...p, slug: e.target.value }))
// // // // // // //       )}

// // // // // // //       {input(
// // // // // // //         "Giá gốc",
// // // // // // //         form.gia_goc,
// // // // // // //         (e) => setForm((p) => ({ ...p, gia_goc: Number(e.target.value) })),
// // // // // // //         "number"
// // // // // // //       )}

// // // // // // //       {/* Ảnh chính */}
// // // // // // //       <div>
// // // // // // //         <p className="font-semibold mb-1">Ảnh chính:</p>
// // // // // // //         <input type="file" accept="image/*" onChange={handleMainImage} />
// // // // // // //         {form.hinh && <img src={form.hinh} className="w-40 mt-2 rounded" />}
// // // // // // //       </div>

// // // // // // //       {/* Ảnh phụ */}
// // // // // // //       <div>
// // // // // // //         <p className="font-semibold mb-1">Ảnh phụ:</p>
// // // // // // //         <input type="file" multiple accept="image/*" onChange={handleSubImages} />

// // // // // // //         <div className="flex gap-3 flex-wrap mt-2">
// // // // // // //           {form.hinh_phu_preview.map((src, i) => (
// // // // // // //             <img key={i} src={src} className="w-28 rounded" />
// // // // // // //           ))}
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Nút */}
// // // // // // //       <div className="flex gap-4 mt-4">
// // // // // // //         <button
// // // // // // //           onClick={handleSave}
// // // // // // //           className="px-4 py-2 bg-green-600 text-white rounded"
// // // // // // //         >
// // // // // // //           Lưu
// // // // // // //         </button>
// // // // // // //         <button onClick={cancel} className="px-4 py-2 bg-gray-400 rounded">
// // // // // // //           Hủy
// // // // // // //         </button>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // "use client";

// // // // // // import { useEffect, useState, ChangeEvent } from "react";
// // // // // // import { useParams } from "next/navigation";
// // // // // // import toast from "react-hot-toast";

// // // // // // import {
// // // // // //   ISanPham,
// // // // // //   IDanhMuc,
// // // // // //   IBienThe,
// // // // // //   IHinh,
// // // // // // } from "@/app/lib/cautrucdata";

// // // // // // // =======================
// // // // // // // FORM STATE
// // // // // // // =======================
// // // // // // interface IForm {
// // // // // //   ten: string;
// // // // // //   slug: string;
// // // // // //   gia_goc: number;
// // // // // //   mo_ta: string;
// // // // // //   phong_cach: string;
// // // // // //   tag: string;
// // // // // //   id_danh_muc: number;

// // // // // //   hinh: string;
// // // // // //   hinh_file: File | null;

// // // // // //   hinh_phu: File[];
// // // // // //   hinh_phu_preview: string[];

// // // // // //   bien_the: IBienThe[];
// // // // // // }

// // // // // // export default function ChiTietSanPhamPage() {
// // // // // //   const params = useParams();
// // // // // //   const id = Number(params.id);

// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [edit, setEdit] = useState(false);

// // // // // //   const [danhmuc, setDanhmuc] = useState<IDanhMuc[]>([]);

// // // // // //   const [form, setForm] = useState<IForm | null>(null);
// // // // // //   const [data, setData] = useState<{
// // // // // //     san_pham: ISanPham;
// // // // // //     hinh_anh: IHinh[];
// // // // // //     bien_the: IBienThe[];
// // // // // //   } | null>(null);

// // // // // //   // ============================
// // // // // //   // LOAD DATA
// // // // // //   // ============================
// // // // // //   async function fetchAll() {
// // // // // //     setLoading(true);

// // // // // //     const [spRes, dmRes] = await Promise.all([
// // // // // //       fetch(`/api/san_pham/${id}`),
// // // // // //       fetch(`/api/danh_muc`),
// // // // // //     ]);

// // // // // //     const spJson = await spRes.json();
// // // // // //     const dmJson = await dmRes.json();

// // // // // //     if (!spJson.success) {
// // // // // //       toast.error("Không tải được sản phẩm");
// // // // // //       return;
// // // // // //     }

// // // // // //     const sp = spJson.data as ISanPham & {
// // // // // //       hinh_anh: IHinh[];
// // // // // //       bien_the: IBienThe[];
// // // // // //     };

// // // // // //     setDanhmuc(dmJson.success ? dmJson.data : []);

// // // // // //     setData({
// // // // // //       san_pham: sp,
// // // // // //       hinh_anh: sp.hinh_anh,
// // // // // //       bien_the: sp.bien_the,
// // // // // //     });

// // // // // //     setForm({
// // // // // //       ten: sp.ten,
// // // // // //       slug: sp.slug,
// // // // // //       gia_goc: sp.gia_goc,
// // // // // //       mo_ta: sp.mo_ta ?? "",
// // // // // //       phong_cach: sp.phong_cach ?? "",
// // // // // //       tag: sp.tag ?? "",
// // // // // //       id_danh_muc: sp.id_danh_muc,

// // // // // //       hinh: sp.hinh ?? "",
// // // // // //       hinh_file: null,

// // // // // //       hinh_phu: [],
// // // // // //       hinh_phu_preview: sp.hinh_anh?.map((h) => h.hinh),
// // // // // //       bien_the: sp.bien_the,
// // // // // //     });

// // // // // //     setLoading(false);
// // // // // //   }

// // // // // //   useEffect(() => {
// // // // // //     fetchAll();
// // // // // //   }, []);

// // // // // //   // ============================
// // // // // //   // SAVE DATA
// // // // // //   // ============================
// // // // // //   async function handleSave() {
// // // // // //     if (!form) return;

// // // // // //     const fd = new FormData();

// // // // // //     fd.append("ten", form.ten);
// // // // // //     fd.append("slug", form.slug);
// // // // // //     fd.append("gia_goc", String(form.gia_goc));
// // // // // //     fd.append("mo_ta", form.mo_ta);
// // // // // //     fd.append("phong_cach", form.phong_cach);
// // // // // //     fd.append("tag", form.tag);
// // // // // //     fd.append("id_danh_muc", String(form.id_danh_muc));

// // // // // //     // ảnh chính
// // // // // //     fd.append("hinh", form.hinh);
// // // // // //     if (form.hinh_file) fd.append("hinh_file", form.hinh_file);

// // // // // //     // ảnh phụ mới
// // // // // //     form.hinh_phu.forEach((f) => fd.append("hinh_phu", f));

// // // // // //     // biến thể
// // // // // //     fd.append("bien_the", JSON.stringify(form.bien_the));

// // // // // //     const res = await fetch(`/api/san_pham/${id}`, {
// // // // // //       method: "PUT",
// // // // // //       body: fd,
// // // // // //     });

// // // // // //     const json = await res.json();

// // // // // //     if (!json.success) {
// // // // // //       toast.error("Lưu thất bại");
// // // // // //       return;
// // // // // //     }

// // // // // //     toast.success("Đã cập nhật");
// // // // // //     setEdit(false);
// // // // // //     fetchAll();
// // // // // //   }

// // // // // //   // ============================
// // // // // //   // RENDER
// // // // // //   // ============================
// // // // // //   if (loading || !form) return <p className="p-4">Đang tải...</p>;
// // // // // //   if (!data) return <p className="p-4 text-red-600">Không tìm thấy</p>;

// // // // // //   const sp = data.san_pham;

// // // // // //   return (
// // // // // //     <div className="p-6 max-w-4xl mx-auto">
// // // // // //       {/* ======================== VIEW MODE ======================== */}
// // // // // //       {!edit && (
// // // // // //         <div className="space-y-5">
// // // // // //           <h1 className="text-2xl font-bold">{sp.ten}</h1>

// // // // // //           {sp.hinh && <img src={sp.hinh} className="w-52 rounded" />}

// // // // // //           <div className="flex gap-2 flex-wrap">
// // // // // //             {data.hinh_anh.map((h) => (
// // // // // //               <img key={h.id} src={h.hinh} className="w-24 rounded" />
// // // // // //             ))}
// // // // // //           </div>

// // // // // //           <button
// // // // // //             className="px-4 py-2 bg-blue-600 text-white rounded"
// // // // // //             onClick={() => setEdit(true)}
// // // // // //           >
// // // // // //             Sửa sản phẩm
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* ======================== EDIT MODE ======================== */}
// // // // // //       {edit && (
// // // // // //         <div className="space-y-4">
// // // // // //           {/* tên */}
// // // // // //           <Input
// // // // // //             label="Tên"
// // // // // //             value={form.ten}
// // // // // //             onChange={(v) => setForm({ ...form, ten: v })}
// // // // // //           />

// // // // // //           <Input
// // // // // //             label="Slug"
// // // // // //             value={form.slug}
// // // // // //             onChange={(v) => setForm({ ...form, slug: v })}
// // // // // //           />

// // // // // //           <Input
// // // // // //             label="Giá gốc"
// // // // // //             type="number"
// // // // // //             value={form.gia_goc}
// // // // // //             onChange={(v) =>
// // // // // //               setForm({ ...form, gia_goc: Number(v) || 0 })
// // // // // //             }
// // // // // //           />

// // // // // //           {/* danh mục */}
// // // // // //           <div>
// // // // // //             <p className="font-semibold mb-1">Danh mục</p>
// // // // // //             <select
// // // // // //               className="border p-2 rounded w-full"
// // // // // //               value={form.id_danh_muc}
// // // // // //               onChange={(e) =>
// // // // // //                 setForm({ ...form, id_danh_muc: Number(e.target.value) })
// // // // // //               }
// // // // // //             >
// // // // // //               <option value="">-- Chọn --</option>
// // // // // //               {danhmuc.map((dm) => (
// // // // // //                 <option key={dm.id} value={dm.id}>
// // // // // //                   {dm.ten}
// // // // // //                 </option>
// // // // // //               ))}
// // // // // //             </select>
// // // // // //           </div>

// // // // // //           {/* mô tả */}
// // // // // //           <Textarea
// // // // // //             label="Mô tả"
// // // // // //             value={form.mo_ta}
// // // // // //             onChange={(v) => setForm({ ...form, mo_ta: v })}
// // // // // //           />

// // // // // //           {/* ảnh chính */}
// // // // // //           <div>
// // // // // //             <p className="font-semibold mb-1">Ảnh chính</p>

// // // // // //             <input
// // // // // //               type="file"
// // // // // //               accept="image/*"
// // // // // //               onChange={(e) => {
// // // // // //                 const f = e.target.files?.[0];
// // // // // //                 if (!f) return;

// // // // // //                 setForm({
// // // // // //                   ...form,
// // // // // //                   hinh_file: f,
// // // // // //                   hinh: URL.createObjectURL(f),
// // // // // //                 });
// // // // // //               }}
// // // // // //             />

// // // // // //             {form.hinh && (
// // // // // //               <img src={form.hinh} className="w-36 mt-2 rounded" />
// // // // // //             )}
// // // // // //           </div>

// // // // // //           {/* ảnh phụ */}
// // // // // //           <div>
// // // // // //             <p className="font-semibold mb-1">Ảnh phụ</p>

// // // // // //             <input type="file" multiple accept="image/*" onChange={(e) => {
// // // // // //               if (!e.target.files) return;
// // // // // //               const files = Array.from(e.target.files);

// // // // // //               setForm({
// // // // // //                 ...form,
// // // // // //                 hinh_phu: [...form.hinh_phu, ...files],
// // // // // //                 hinh_phu_preview: [
// // // // // //                   ...form.hinh_phu_preview,
// // // // // //                   ...files.map((f) => URL.createObjectURL(f)),
// // // // // //                 ],
// // // // // //               });
// // // // // //             }} />

// // // // // //             <div className="flex gap-2 mt-2 flex-wrap">
// // // // // //               {form.hinh_phu_preview.map((src, i) => (
// // // // // //                 <img key={i} src={src} className="w-20 h-20 rounded object-cover" />
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* buttons */}
// // // // // //           <div className="flex gap-3">
// // // // // //             <button
// // // // // //               className="px-4 py-2 bg-green-600 text-white rounded"
// // // // // //               onClick={handleSave}
// // // // // //             >
// // // // // //               Lưu
// // // // // //             </button>

// // // // // //             <button
// // // // // //               className="px-4 py-2 bg-gray-400 text-white rounded"
// // // // // //               onClick={() => setEdit(false)}
// // // // // //             >
// // // // // //               Hủy
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // // =========================
// // // // // // // INPUT COMPONENT
// // // // // // // =========================
// // // // // // function Input({
// // // // // //   label,
// // // // // //   value,
// // // // // //   onChange,
// // // // // //   type = "text",
// // // // // // }: {
// // // // // //   label: string;
// // // // // //   value: string | number;
// // // // // //   onChange: (v: string) => void;
// // // // // //   type?: string;
// // // // // // }) {
// // // // // //   return (
// // // // // //     <div>
// // // // // //       <p className="font-semibold mb-1">{label}</p>
// // // // // //       <input
// // // // // //         type={type}
// // // // // //         value={value}
// // // // // //         onChange={(e) => onChange(e.target.value)}
// // // // // //         className="border p-2 rounded w-full"
// // // // // //       />
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // function Textarea({
// // // // // //   label,
// // // // // //   value,
// // // // // //   onChange,
// // // // // // }: {
// // // // // //   label: string;
// // // // // //   value: string;
// // // // // //   onChange: (v: string) => void;
// // // // // // }) {
// // // // // //   return (
// // // // // //     <div>
// // // // // //       <p className="font-semibold mb-1">{label}</p>
// // // // // //       <textarea
// // // // // //         rows={4}
// // // // // //         value={value}
// // // // // //         onChange={(e) => onChange(e.target.value)}
// // // // // //         className="border p-2 rounded w-full"
// // // // // //       />
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // "use client";

// // // // // import { useEffect, useState } from "react";
// // // // // import { useParams } from "next/navigation";
// // // // // import toast from "react-hot-toast";

// // // // // import {
// // // // //   ISanPham,
// // // // //   IDanhMuc,
// // // // //   IBienThe,
// // // // //   IHinh,
// // // // // } from "@/app/lib/cautrucdata";

// // // // // // =======================
// // // // // // FORM STATE
// // // // // // =======================
// // // // // interface IForm {
// // // // //   ten: string;
// // // // //   slug: string;
// // // // //   gia_goc: number;
// // // // //   mo_ta: string;
// // // // //   phong_cach: string;
// // // // //   tag: string;
// // // // //   id_danh_muc: number;

// // // // //   hinh: string;           // URL cũ hoặc URL preview
// // // // //   hinh_file: File | null; // File ảnh chính mới

// // // // //   hinh_phu: File[];       // Ảnh phụ mới
// // // // //   hinh_phu_preview: string[]; // Preview ảnh phụ cũ + mới

// // // // //   bien_the: IBienThe[];
// // // // // }

// // // // // export default function ChiTietSanPhamPage() {
// // // // //   const params = useParams();
// // // // //   const id = Number(params.id);

// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [edit, setEdit] = useState(false);

// // // // //   const [danhmuc, setDanhmuc] = useState<IDanhMuc[]>([]);
// // // // //   const [form, setForm] = useState<IForm | null>(null);

// // // // //   const [data, setData] = useState<{
// // // // //     san_pham: ISanPham;
// // // // //     hinh_anh: IHinh[];
// // // // //     bien_the: IBienThe[];
// // // // //   } | null>(null);

// // // // //   // ============================
// // // // //   // LOAD DATA
// // // // //   // ============================
// // // // //   async function fetchAll() {
// // // // //     setLoading(true);

// // // // //     const [spRes, dmRes] = await Promise.all([
// // // // //       fetch(`/api/san_pham/${id}`),
// // // // //       fetch(`/api/danh_muc`),
// // // // //     ]);

// // // // //     const spJson = await spRes.json();
// // // // //     const dmJson = await dmRes.json();

// // // // //     if (!spJson.success) {
// // // // //       toast.error("Không tải được sản phẩm");
// // // // //       return;
// // // // //     }

// // // // //     const sp = spJson.data as ISanPham & {
// // // // //       hinh_anh: IHinh[];
// // // // //       bien_the: IBienThe[];
// // // // //     };

// // // // //     setDanhmuc(dmJson.success ? dmJson.data : []);

// // // // //     setData({
// // // // //       san_pham: sp,
// // // // //       hinh_anh: sp.hinh_anh,
// // // // //       bien_the: sp.bien_the,
// // // // //     });

// // // // //     setForm({
// // // // //       ten: sp.ten,
// // // // //       slug: sp.slug,
// // // // //       gia_goc: sp.gia_goc,
// // // // //       mo_ta: sp.mo_ta ?? "",
// // // // //       phong_cach: sp.phong_cach ?? "",
// // // // //       tag: sp.tag ?? "",
// // // // //       id_danh_muc: sp.id_danh_muc,

// // // // //       hinh: sp.hinh ?? "",
// // // // //       hinh_file: null,

// // // // //       hinh_phu: [],
// // // // //       hinh_phu_preview: sp.hinh_anh.map((h) => h.hinh ?? "").filter((x) => x !== ""),


// // // // //       bien_the: sp.bien_the,
// // // // //     });

// // // // //     setLoading(false);
// // // // //   }

// // // // //   useEffect(() => {
// // // // //     fetchAll();
// // // // //   }, []);

// // // // //   // ============================
// // // // //   // SAVE DATA - KHỚP API
// // // // //   // ============================
// // // // //   async function handleSave() {
// // // // //     if (!form) return;

// // // // //     const fd = new FormData();

// // // // //     fd.append("ten", form.ten);
// // // // //     fd.append("slug", form.slug);
// // // // //     fd.append("gia_goc", String(form.gia_goc));
// // // // //     fd.append("mo_ta", form.mo_ta);
// // // // //     fd.append("phong_cach", form.phong_cach);
// // // // //     fd.append("tag", form.tag);
// // // // //     fd.append("id_danh_muc", String(form.id_danh_muc));

// // // // //     // ảnh chính
// // // // //     fd.append("hinh", form.hinh);
// // // // //     if (form.hinh_file) fd.append("hinh_file", form.hinh_file);

// // // // //     // ảnh phụ (chỉ file mới)
// // // // //     form.hinh_phu.forEach((f) => fd.append("hinh_phu", f));

// // // // //     // biến thể
// // // // //     fd.append("bien_the", JSON.stringify(form.bien_the));

// // // // //     const res = await fetch(`/api/san_pham/${id}`, {
// // // // //       method: "PUT",
// // // // //       body: fd,
// // // // //     });

// // // // //     const json = await res.json();

// // // // //     if (!json.success) {
// // // // //       toast.error("Lưu thất bại");
// // // // //       return;
// // // // //     }

// // // // //     toast.success("Đã cập nhật");
// // // // //     setEdit(false);
// // // // //     fetchAll();
// // // // //   }

// // // // //   // ============================
// // // // //   // UI
// // // // //   // ============================
// // // // //   if (loading || !form) return <p className="p-4">Đang tải...</p>;
// // // // //   if (!data) return <p className="p-4 text-red-600">Không tìm thấy</p>;

// // // // //   const sp = data.san_pham;

// // // // //   return (
// // // // //     <div className="p-6 max-w-4xl mx-auto">

// // // // //       {/* ======================== VIEW ======================== */}
// // // // //       {!edit && (
// // // // //         <div className="space-y-5">
// // // // //           <h1 className="text-2xl font-bold">{sp.ten}</h1>

// // // // //           {sp.hinh && <img src={sp.hinh} className="w-52 rounded" />}

// // // // //           <div className="flex gap-2 flex-wrap">
// // // // //             {data.hinh_anh.map((h) => (
// // // // //               <img key={h.id} src={h.hinh ?? ""} className="w-24 rounded" />

// // // // //             ))}
// // // // //           </div>

// // // // //           <button
// // // // //             className="px-4 py-2 bg-blue-600 text-white rounded"
// // // // //             onClick={() => setEdit(true)}
// // // // //           >
// // // // //             Sửa sản phẩm
// // // // //           </button>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* ======================== EDIT ======================== */}
// // // // //       {edit && (
// // // // //         <div className="space-y-4">

// // // // //           <Input label="Tên" value={form.ten}
// // // // //             onChange={(v) => setForm({ ...form, ten: v })} />

// // // // //           <Input label="Slug" value={form.slug}
// // // // //             onChange={(v) => setForm({ ...form, slug: v })} />

// // // // //           <Input label="Giá gốc" type="number" value={form.gia_goc}
// // // // //             onChange={(v) => setForm({ ...form, gia_goc: Number(v) || 0 })} />

// // // // //           {/* Danh mục */}
// // // // //           <div>
// // // // //             <p className="font-semibold mb-1">Danh mục</p>
// // // // //             <select
// // // // //               className="border p-2 rounded w-full"
// // // // //               value={form.id_danh_muc}
// // // // //               onChange={(e) =>
// // // // //                 setForm({ ...form, id_danh_muc: Number(e.target.value) })
// // // // //               }
// // // // //             >
// // // // //               <option value="">-- Chọn --</option>
// // // // //               {danhmuc.map((dm) => (
// // // // //                 <option key={dm.id} value={dm.id}>
// // // // //                   {dm.ten}
// // // // //                 </option>
// // // // //               ))}
// // // // //             </select>
// // // // //           </div>

// // // // //           <Textarea label="Mô tả" value={form.mo_ta}
// // // // //             onChange={(v) => setForm({ ...form, mo_ta: v })} />

// // // // //           {/* ảnh chính */}
// // // // //           <div>
// // // // //             <p className="font-semibold mb-1">Ảnh chính</p>
// // // // //             <input
// // // // //               type="file"
// // // // //               accept="image/*"
// // // // //               onChange={(e) => {
// // // // //                 const f = e.target.files?.[0];
// // // // //                 if (!f) return;

// // // // //                 setForm({
// // // // //                   ...form,
// // // // //                   hinh_file: f,
// // // // //                   hinh: URL.createObjectURL(f),
// // // // //                 });
// // // // //               }}
// // // // //             />
// // // // //             {form.hinh && <img src={form.hinh} className="w-36 mt-2 rounded" />}
// // // // //           </div>

// // // // //           {/* ảnh phụ */}
// // // // //           <div>
// // // // //             <p className="font-semibold mb-1">Ảnh phụ</p>

// // // // //             <input type="file" multiple accept="image/*"
// // // // //               onChange={(e) => {
// // // // //                 if (!e.target.files) return;
// // // // //                 const files = Array.from(e.target.files);

// // // // //                 setForm({
// // // // //                   ...form,
// // // // //                   hinh_phu: [...form.hinh_phu, ...files],
// // // // //                   hinh_phu_preview: [
// // // // //                     ...form.hinh_phu_preview,
// // // // //                     ...files.map((f) => URL.createObjectURL(f)),
// // // // //                   ],
// // // // //                 });
// // // // //               }}
// // // // //             />

// // // // //             <div className="flex gap-2 mt-2 flex-wrap">
// // // // //               {form.hinh_phu_preview.map((src, i) => (
// // // // //                 <img key={i} src={src} className="w-20 h-20 rounded object-cover" />
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* buttons */}
// // // // //           <div className="flex gap-3">
// // // // //             <button
// // // // //               className="px-4 py-2 bg-green-600 text-white rounded"
// // // // //               onClick={handleSave}
// // // // //             >
// // // // //               Lưu
// // // // //             </button>

// // // // //             <button
// // // // //               className="px-4 py-2 bg-gray-400 text-white rounded"
// // // // //               onClick={() => setEdit(false)}
// // // // //             >
// // // // //               Hủy
// // // // //             </button>
// // // // //           </div>

// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // // =========================
// // // // // // INPUT COMPONENTS
// // // // // // =========================
// // // // // function Input({
// // // // //   label,
// // // // //   value,
// // // // //   onChange,
// // // // //   type = "text",
// // // // // }: {
// // // // //   label: string;
// // // // //   value: string | number;
// // // // //   onChange: (v: string) => void;
// // // // //   type?: string;
// // // // // }) {
// // // // //   return (
// // // // //     <div>
// // // // //       <p className="font-semibold mb-1">{label}</p>
// // // // //       <input
// // // // //         type={type}
// // // // //         value={value}
// // // // //         onChange={(e) => onChange(e.target.value)}
// // // // //         className="border p-2 rounded w-full"
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // function Textarea({
// // // // //   label,
// // // // //   value,
// // // // //   onChange,
// // // // // }: {
// // // // //   label: string;
// // // // //   value: string;
// // // // //   onChange: (v: string) => void;
// // // // // }) {
// // // // //   return (
// // // // //     <div>
// // // // //       <p className="font-semibold mb-1">{label}</p>
// // // // //       <textarea
// // // // //         rows={4}
// // // // //         value={value}
// // // // //         onChange={(e) => onChange(e.target.value)}
// // // // //         className="border p-2 rounded w-full"
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // }
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

// // //         bien_the: data.bien_the?.map((bt) => ({
// // //           ...bt,
// // //           trang_thai: !!bt.trang_thai, // convert boolean
// // //         })) || [],
// // //       });
// // //     }
// // //   }, [data]);

// // //   // ====================== HANDLE SAVE ======================
// // //   const handleSave = async () => {
// // //     if (!id || isNaN(id)) return alert("ID sản phẩm không hợp lệ");

// // //     try {
// // //       const fd = new FormData();

// // //       // Thông tin sản phẩm
// // //       fd.append("ten", form.ten);
// // //       fd.append("slug", form.slug);
// // //       fd.append("gia_goc", String(form.gia_goc));
// // //       fd.append("mo_ta", form.mo_ta);
// // //       fd.append("phong_cach", form.phong_cach);
// // //       fd.append("tag", form.tag);
// // //       fd.append("id_danh_muc", String(form.id_danh_muc));

// // //       // Hình chính
// // //       if (form.hinh_chinh_file) fd.append("hinh_file", form.hinh_chinh_file);
// // //       else if (form.hinh) fd.append("hinh", form.hinh);

// // //       // Hình phụ
// // //       form.hinh_phu.forEach((file) => fd.append("hinh_phu", file));
// // //       form.hinh_phu_preview.forEach((url) => fd.append("hinh_phu", url));

// // //       // Biến thể
// // //       fd.append("bien_the", JSON.stringify(form.bien_the));

// // //       const res = await fetch(`/api/san_pham/${id}`, {
// // //         method: "PUT",
// // //         body: fd,
// // //       });

// // //       const json = await res.json();
// // //       if (json.success) {
// // //         alert("✅ Cập nhật thành công!");
// // //         const spRes = await fetch(`/api/san_pham/${id}`);
// // //         const spJson = await spRes.json();
// // //         if (spJson.success && spJson.data) setData(spJson.data);
// // //       } else {
// // //         alert("⚠ Lỗi khi lưu: " + (json.message || "Không xác định"));
// // //       }
// // //     } catch (err: unknown) {
// // //       console.error("HANDLE SAVE ERROR:", err);
// // //       alert("⚠ Lỗi khi lưu: " + (err instanceof Error ? err.message : "Không xác định"));
// // //     }
// // //   };

// // //   // ====================== HANDLE BIẾN THỂ ======================
// // //   const addBienThe = () => {
// // //     setForm({
// // //       ...form,
// // //       bien_the: [
// // //         ...form.bien_the,
// // //         {
// // //           id: 0,              // chưa có id
// // //           id_san_pham: id,    // gán id sản phẩm
// // //           ten: "",
// // //           trang_thai: true,
// // //           gia_them: 0,
// // //         },
// // //       ],
// // //     });
// // //   };

// // //   const updateBienThe = (index: number, key: keyof IBienThe, value: string | number | boolean) => {
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

// //   const [form, setForm] = useState<{
// //     ten: string;
// //     slug: string;
// //     gia_goc: number;
// //     mo_ta: string;
// //     phong_cach: string;
// //     tag: string;
// //     id_danh_muc: number;
// //     hinh: string;
// //     hinh_chinh_file: File | null;
// //     hinh_phu: File[];
// //     hinh_phu_preview: string[];
// //     bien_the: IBienThe[];
// //   }>({
// //     ten: "",
// //     slug: "",
// //     gia_goc: 0,
// //     mo_ta: "",
// //     phong_cach: "",
// //     tag: "",
// //     id_danh_muc: 0,
// //     hinh: "",
// //     hinh_chinh_file: null,
// //     hinh_phu: [],
// //     hinh_phu_preview: [],
// //     bien_the: [],
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

// //         const spJson: { success: boolean; data?: ISanPhamChiTiet } = await spRes.json();
// //         const dmJson: { success: boolean; data?: IDanhMuc[] } = await dmRes.json();

// //         if (dmJson.success && dmJson.data) setDanhmuc(dmJson.data);
// //         if (spJson.success && spJson.data) setData(spJson.data);
// //       } catch (err) {
// //         console.error("Fetch error:", err);
// //         alert("⚠ Lỗi khi tải dữ liệu: " + (err instanceof Error ? err.message : String(err)));
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchAll();
// //   }, [id]);

// //   // ====================== FILL FORM ======================
// //   useEffect(() => {
// //     if (data) {
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
// //         hinh_phu: [],
// //         hinh_phu_preview: data.hinh_anh?.map((h) => h.hinh).filter((x): x is string => !!x) || [],
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
// //       if (form.hinh_chinh_file) fd.append("hinh_file", form.hinh_chinh_file);
// //       else if (form.hinh) fd.append("hinh", form.hinh);

// //       // Hình phụ
// //       form.hinh_phu.forEach((file) => fd.append("hinh_phu", file));
// //       form.hinh_phu_preview.forEach((url) => fd.append("hinh_phu", url));

// //       // Biến thể
// //       fd.append("bien_the", JSON.stringify(form.bien_the));

// //       const res = await fetch(`/api/san_pham/${id}`, {
// //         method: "PUT",
// //         body: fd,
// //       });

// //       if (!res.ok) throw new Error("Server trả về lỗi " + res.status);

// //       const json: { success: boolean; message?: string } = await res.json();

// //       if (json.success) {
// //         alert("✅ Cập nhật thành công!");
// //         const spRes = await fetch(`/api/san_pham/${id}`);
// //         const spJson: { success: boolean; data?: ISanPhamChiTiet } = await spRes.json();
// //         if (spJson.success && spJson.data) setData(spJson.data);
// //       } else {
// //         alert("⚠ Lỗi khi lưu: " + (json.message || "Không xác định"));
// //       }
// //     } catch (err: unknown) {
// //       console.error("HANDLE SAVE ERROR:", err);
// //       alert("⚠ Lỗi khi lưu: " + (err instanceof Error ? err.message : "Không xác định"));
// //     }
// //   };

// //   // ====================== BIẾN THỂ ======================
// // const addBienThe = () => {
// //   setForm({
// //     ...form,
// //     bien_the: [
// //       ...form.bien_the,
// //       { id: 0, ten: "", trang_thai: true, gia_them: 0, id_san_pham: id },
// //     ],
// //   });
// // };


// //   const updateBienThe = (index: number, key: keyof IBienThe, value: string | number) => {
// //     const newList = [...form.bien_the];
// //     newList[index] = { ...newList[index], [key]: value };
// //     setForm({ ...form, bien_the: newList });
// //   };

// //   const removeBienThe = (index: number) => {
// //     const newList = [...form.bien_the];
// //     newList.splice(index, 1);
// //     setForm({ ...form, bien_the: newList });
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
// //           <Input label="Tên" value={form.ten} onChange={(e) => setForm({ ...form, ten: e.target.value })} />
// //           <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
// //           <Input label="Giá gốc" type="number" value={form.gia_goc} onChange={(e) => setForm({ ...form, gia_goc: Number(e.target.value) })} />
// //           <Input label="Phong cách" value={form.phong_cach} onChange={(e) => setForm({ ...form, phong_cach: e.target.value })} />
// //           <Input label="Tag" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
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
// //               setForm({ ...form, hinh_chinh_file: file, hinh: URL.createObjectURL(file) });
// //             }}
// //           />
// //           {form.hinh && <img src={form.hinh} alt="Hình chính" className="w-40 mt-3 border rounded" />}
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
// //                 hinh_phu: [...form.hinh_phu, ...files],
// //                 hinh_phu_preview: [...form.hinh_phu_preview, ...files.map((f) => URL.createObjectURL(f))],
// //               });
// //             }}
// //           />
// //           <div className="flex gap-3 mt-3 flex-wrap">
// //             {form.hinh_phu_preview.map((src, i) => (
// //               <div key={i} className="relative">
// //                 <img src={src} alt={`Hình phụ ${i + 1}`} className="w-24 h-24 object-cover border rounded" />
// //                 <button
// //                   onClick={() => {
// //                     const newPrev = [...form.hinh_phu_preview];
// //                     const newFiles = [...form.hinh_phu];
// //                     newPrev.splice(i, 1);
// //                     newFiles.splice(i, 1);
// //                     setForm({ ...form, hinh_phu_preview: newPrev, hinh_phu: newFiles });
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
// //             <div key={index} className="flex gap-2 items-center mb-2">
// //               <Input
// //                 label="Tên"
// //                 value={bt.ten}
// //                 onChange={(e) => updateBienThe(index, "ten", e.target.value)}
// //               />
// //               <Input
// //                 label="Giá thêm"
// //                 type="number"
// //                 value={bt.gia_them ?? 0}
// //                 onChange={(e) => updateBienThe(index, "gia_them", Number(e.target.value))}
// //               />
// //               <select
// //                 value={bt.trang_thai}
// //                 onChange={(e) => updateBienThe(index, "trang_thai", Number(e.target.value))}
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
// //           <button className="px-5 py-2 bg-green-600 text-white rounded" onClick={handleSave}>
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
// //       <input type={type} value={value} onChange={onChange} className="border p-2 w-full rounded mt-1" />
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// import { ISanPham, IDanhMuc, IHinh, IBienThe } from "@/app/lib/cautrucdata";

// interface ISanPhamChiTiet extends ISanPham {
//   danh_muc?: IDanhMuc;
//   hinh_anh?: IHinh[];
//   bien_the?: IBienThe[];
// }

// export default function ChiTietSanPhamPage() {
//   const params = useParams<{ id: string }>();
//   const id = Number(params.id);

//   const [data, setData] = useState<ISanPhamChiTiet | null>(null);
//   const [danhmuc, setDanhmuc] = useState<IDanhMuc[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [form, setForm] = useState({
//     ten: "",
//     slug: "",
//     gia_goc: 0,
//     mo_ta: "",
//     phong_cach: "",
//     tag: "",
//     id_danh_muc: 0,

//     hinh: "",
//     hinh_chinh_file: null as File | null,

//     hinh_phu: [] as File[],
//     hinh_phu_preview: [] as string[],

//     bien_the: [] as IBienThe[], // quản lý biến thể
//   });

//   // ====================== FETCH DATA ======================
//   useEffect(() => {
//     if (!id || isNaN(id)) {
//       setLoading(false);
//       return;
//     }

//     const fetchAll = async () => {
//       try {
//         const [spRes, dmRes] = await Promise.all([
//           fetch(`/api/san_pham/${id}`),
//           fetch("/api/danh_muc"),
//         ]);

//         const spJson = await spRes.json();
//         const dmJson = await dmRes.json();

//         if (dmJson.success) setDanhmuc(dmJson.data);
//         if (spJson.success && spJson.data) setData(spJson.data);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, [id]);

//   // ====================== FILL FORM ======================
//   useEffect(() => {
//     if (data) {
//       setForm({
//         ten: data.ten,
//         slug: data.slug,
//         gia_goc: data.gia_goc,
//         mo_ta: data.mo_ta || "",
//         phong_cach: data.phong_cach || "",
//         tag: data.tag || "",
//         id_danh_muc: data.id_danh_muc || 0,

//         hinh: data.hinh || "",
//         hinh_chinh_file: null,

//         hinh_phu: [],
//         hinh_phu_preview:
//           data.hinh_anh?.map((h) => h.hinh).filter((x): x is string => !!x) || [],

//         bien_the: data.bien_the || [],
//       });
//     }
//   }, [data]);

//   // ====================== HANDLE SAVE ======================
//   const handleSave = async () => {
//     if (!id || isNaN(id)) return alert("ID sản phẩm không hợp lệ");

//     try {
//       const fd = new FormData();

//       // Thông tin sản phẩm
//       fd.append("ten", form.ten);
//       fd.append("slug", form.slug);
//       fd.append("gia_goc", String(form.gia_goc));
//       fd.append("mo_ta", form.mo_ta);
//       fd.append("phong_cach", form.phong_cach);
//       fd.append("tag", form.tag);
//       fd.append("id_danh_muc", String(form.id_danh_muc));

//       // Hình chính
//       if (form.hinh_chinh_file) fd.append("hinh_file", form.hinh_chinh_file);
//       else if (form.hinh) fd.append("hinh", form.hinh);

//       // Hình phụ
//       form.hinh_phu.forEach((file) => fd.append("hinh_phu", file));
//       form.hinh_phu_preview.forEach((url) => fd.append("hinh_phu", url));

//       // Biến thể
//       fd.append("bien_the", JSON.stringify(form.bien_the));

//       const res = await fetch(`/api/san_pham/${id}`, {
//         method: "PUT",
//         body: fd,
//       });

//       const json = await res.json();
//       if (json.success) {
//         alert("✅ Cập nhật thành công!");
//         const spRes = await fetch(`/api/san_pham/${id}`);
//         const spJson = await spRes.json();
//         if (spJson.success && spJson.data) setData(spJson.data);
//       } else {
//         alert("⚠ Lỗi khi lưu: " + (json.message || "Không xác định"));
//       }
//     } catch (err: unknown) {
//       console.error("HANDLE SAVE ERROR:", err);
//       alert("⚠ Lỗi khi lưu: " + (err instanceof Error ? err.message : "Không xác định"));
//     }
//   };

//   // ====================== HANDLE BIẾN THỂ ======================
//   const addBienThe = () => {
//     setForm({
//       ...form,
//       bien_the: [
//         ...form.bien_the,
//         { id: 0, ten: "", trang_thai: true, gia_them: 0, id_san_pham: id },
//       ],
//     });
//   };

//   const updateBienThe = (
//     index: number,
//     key: keyof IBienThe,
//     value: string | number | boolean
//   ) => {
//     const newList = [...form.bien_the];
//     newList[index] = { ...newList[index], [key]: value };
//     setForm({ ...form, bien_the: newList });
//   };

//   const removeBienThe = (index: number) => {
//     const newList = [...form.bien_the];
//     newList.splice(index, 1);
//     setForm({ ...form, bien_the: newList });
//   };

//   // ====================== RENDER ======================
//   if (loading) return <div className="p-6">Đang tải...</div>;
//   if (!data) return <div className="p-6 text-red-600">Không tìm thấy sản phẩm</div>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center">Chi tiết sản phẩm</h1>

//       <div className="bg-white p-6 rounded-xl shadow space-y-6">
//         {/* DANH MỤC */}
//         <div>
//           <p className="font-semibold mb-1">Danh mục</p>
//           <select
//             className="border p-2 rounded w-full"
//             value={form.id_danh_muc}
//             onChange={(e) =>
//               setForm({ ...form, id_danh_muc: Number(e.target.value) })
//             }
//           >
//             <option value={0}>-- Chọn danh mục --</option>
//             {danhmuc.map((dm) => (
//               <option key={dm.id} value={dm.id}>
//                 {dm.ten}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* FORM INFO */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <Input label="Tên" value={form.ten} onChange={(e) => setForm({ ...form, ten: e.target.value })} />
//           <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
//           <Input label="Giá gốc" type="number" value={form.gia_goc} onChange={(e) => setForm({ ...form, gia_goc: Number(e.target.value) })} />
//           <Input label="Phong cách" value={form.phong_cach} onChange={(e) => setForm({ ...form, phong_cach: e.target.value })} />
//           <Input label="Tag" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
//         </div>

//         {/* MÔ TẢ */}
//         <div>
//           <p className="font-semibold mb-1">Mô tả</p>
//           <textarea
//             rows={4}
//             className="border p-2 rounded w-full"
//             value={form.mo_ta}
//             onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
//           />
//         </div>

//         {/* HÌNH CHÍNH */}
//         <div>
//           <h2 className="font-semibold mb-2">Hình chính</h2>
//           <input
//             type="file"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (!file) return;
//               setForm({ ...form, hinh_chinh_file: file, hinh: URL.createObjectURL(file) });
//             }}
//           />
//           {form.hinh && <img src={form.hinh} alt="Hình chính" className="w-40 mt-3 border rounded" />}
//         </div>

//         {/* HÌNH PHỤ */}
//         <div>
//           <h2 className="font-semibold mb-2">Hình phụ</h2>
//           <input
//             type="file"
//             multiple
//             onChange={(e) => {
//               const files = Array.from(e.target.files || []);
//               setForm({
//                 ...form,
//                 hinh_phu: [...form.hinh_phu, ...files],
//                 hinh_phu_preview: [...form.hinh_phu_preview, ...files.map((f) => URL.createObjectURL(f))],
//               });
//             }}
//           />
//           <div className="flex gap-3 mt-3 flex-wrap">
//             {form.hinh_phu_preview.map((src, i) => (
//               <div key={i} className="relative">
//                 <img src={src} alt={`Hình phụ ${i + 1}`} className="w-24 h-24 object-cover border rounded" />
//                 <button
//                   onClick={() => {
//                     const newPrev = [...form.hinh_phu_preview];
//                     const newFiles = [...form.hinh_phu];
//                     newPrev.splice(i, 1);
//                     newFiles.splice(i, 1);
//                     setForm({ ...form, hinh_phu_preview: newPrev, hinh_phu: newFiles });
//                   }}
//                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* BIẾN THỂ */}
//         <div>
//           <h2 className="font-semibold mb-2">Biến thể</h2>
//           {form.bien_the.map((bt, index) => (
//             <div key={index} className="flex gap-2 items-center mb-2">
//               <Input
//                 label="Tên"
//                 value={bt.ten}
//                 onChange={(e) => updateBienThe(index, "ten", e.target.value)}
//               />
//               <Input
//                 label="Giá thêm"
//                 type="number"
//                 value={bt.gia_them ?? 0}
//                 onChange={(e) => updateBienThe(index, "gia_them", Number(e.target.value))}
//               />
//               <select
//                 value={bt.trang_thai ? 1 : 0}
//                 onChange={(e) => updateBienThe(index, "trang_thai", e.target.value === "1")}
//                 className="border p-2 rounded"
//               >
//                 <option value={1}>Hoạt động</option>
//                 <option value={0}>Ngưng</option>
//               </select>
//               <button
//                 onClick={() => removeBienThe(index)}
//                 className="bg-red-600 text-white rounded px-2 py-1"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//           <button
//             onClick={addBienThe}
//             className="bg-blue-600 text-white rounded px-3 py-1 mt-2"
//           >
//             Thêm biến thể
//           </button>
//         </div>

//         {/* BUTTON SAVE */}
//         <div className="text-center pt-4">
//           <button className="px-5 py-2 bg-green-600 text-white rounded" onClick={handleSave}>
//             Lưu thay đổi
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ================= INPUT COMPONENT =================
// function Input({ label, value, type = "text", onChange }: { label: string; value: string | number; type?: "text" | "number" | "password"; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
//   return (
//     <div>
//       <p className="font-semibold">{label}</p>
//       <input type={type} value={value} onChange={onChange} className="border p-2 w-full rounded mt-1" />
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { ISanPham, IDanhMuc, IHinh, IBienThe } from "@/app/lib/cautrucdata";

interface ISanPhamChiTiet extends ISanPham {
  danh_muc?: IDanhMuc;
  hinh_anh?: IHinh[];
  bien_the?: IBienThe[];
}

export default function ChiTietSanPhamPage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [data, setData] = useState<ISanPhamChiTiet | null>(null);
  const [danhmuc, setDanhmuc] = useState<IDanhMuc[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    ten: "",
    slug: "",
    gia_goc: 0,
    mo_ta: "",
    phong_cach: "",
    tag: "",
    id_danh_muc: 0,

    hinh: "",
    hinh_chinh_file: null as File | null,

    hinh_phu: [] as File[],
    hinh_phu_preview: [] as string[],

    bien_the: [] as IBienThe[], // quản lý biến thể
  });

  // ====================== FETCH DATA ======================
  useEffect(() => {
    if (!id || isNaN(id)) {
      setLoading(false);
      return;
    }

    const fetchAll = async () => {
      try {
        const [spRes, dmRes] = await Promise.all([
          fetch(`/api/san_pham/${id}`),
          fetch("/api/danh_muc"),
        ]);

        const spJson = await spRes.json();
        const dmJson = await dmRes.json();

        if (dmJson.success) setDanhmuc(dmJson.data);
        if (spJson.success && spJson.data) setData(spJson.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  // ====================== FILL FORM ======================
  useEffect(() => {
    if (data) {
      setForm({
        ten: data.ten,
        slug: data.slug,
        gia_goc: data.gia_goc,
        mo_ta: data.mo_ta || "",
        phong_cach: data.phong_cach || "",
        tag: data.tag || "",
        id_danh_muc: data.id_danh_muc || 0,

        hinh: data.hinh || "",
        hinh_chinh_file: null,

        hinh_phu: [],
        hinh_phu_preview:
          data.hinh_anh?.map((h) => h.hinh).filter((x): x is string => !!x) || [],

        bien_the: data.bien_the || [],
      });
    }
  }, [data]);

const handleSave = async () => {
  if (!id || isNaN(id)) return alert("ID sản phẩm không hợp lệ");

  try {
    const fd = new FormData();

    // Thông tin sản phẩm
    fd.append("ten", form.ten);
    fd.append("slug", form.slug);
    fd.append("gia_goc", String(form.gia_goc));
    fd.append("mo_ta", form.mo_ta);
    fd.append("phong_cach", form.phong_cach);
    fd.append("tag", form.tag);
    fd.append("id_danh_muc", String(form.id_danh_muc));

    // Hình chính
    if (form.hinh_chinh_file)
      fd.append("hinh_file", form.hinh_chinh_file);
    else if (form.hinh)
      fd.append("hinh", form.hinh);

    // Hình phụ
    form.hinh_phu.forEach((file) => fd.append("hinh_phu_file", file));
    form.hinh_phu_preview.forEach((url) =>
      fd.append("hinh_phu_old", url)
    );

    // Biến thể
    fd.append("bien_the", JSON.stringify(form.bien_the));

    const res = await fetch(`/api/san_pham/${id}`, {
      method: "PUT",
      body: fd,
    });

    const json = await res.json();
    if (json.success) {
      alert("✅ Cập nhật thành công!");

      const spRes = await fetch(`/api/san_pham/${id}`);
      const spJson = await spRes.json();
      if (spJson.success && spJson.data) setData(spJson.data);
    } else {
      alert("⚠ Lỗi khi lưu: " + (json.message || "Không xác định"));
    }
  } catch (err: unknown) {
    console.error("HANDLE SAVE ERROR:", err);

    const message =
      err instanceof Error ? err.message : "Lỗi không xác định";

    alert("⚠ Lỗi khi lưu: " + message);
  }
};



  // ====================== HANDLE BIẾN THỂ ======================
  const addBienThe = () => {
    setForm({
      ...form,
      bien_the: [
        ...form.bien_the,
        { id: 0, ten: "", trang_thai: true, gia_them: 0, id_san_pham: id },
      ],
    });
  };

  const updateBienThe = (
    index: number,
    key: keyof IBienThe,
    value: string | number | boolean
  ) => {
    const newList = [...form.bien_the];
    newList[index] = { ...newList[index], [key]: value };
    setForm({ ...form, bien_the: newList });
  };

  const removeBienThe = (index: number) => {
    const newList = [...form.bien_the];
    newList.splice(index, 1);
    setForm({ ...form, bien_the: newList });
  };

  // ====================== RENDER ======================
  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!data) return <div className="p-6 text-red-600">Không tìm thấy sản phẩm</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Chi tiết sản phẩm</h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        {/* DANH MỤC */}
        <div>
          <p className="font-semibold mb-1">Danh mục</p>
          <select
            className="border p-2 rounded w-full"
            value={form.id_danh_muc}
            onChange={(e) =>
              setForm({ ...form, id_danh_muc: Number(e.target.value) })
            }
          >
            <option value={0}>-- Chọn danh mục --</option>
            {danhmuc.map((dm) => (
              <option key={dm.id} value={dm.id}>
                {dm.ten}
              </option>
            ))}
          </select>
        </div>

        {/* FORM INFO */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Tên" value={form.ten} onChange={(e) => setForm({ ...form, ten: e.target.value })} />
          <Input label="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          <Input label="Giá gốc" type="number" value={form.gia_goc} onChange={(e) => setForm({ ...form, gia_goc: Number(e.target.value) })} />
          <Input label="Phong cách" value={form.phong_cach} onChange={(e) => setForm({ ...form, phong_cach: e.target.value })} />
          <Input label="Tag" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} />
        </div>

        {/* MÔ TẢ */}
        <div>
          <p className="font-semibold mb-1">Mô tả</p>
          <textarea
            rows={4}
            className="border p-2 rounded w-full"
            value={form.mo_ta}
            onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
          />
        </div>

        {/* HÌNH CHÍNH */}
        <div>
          <h2 className="font-semibold mb-2">Hình chính</h2>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setForm({ ...form, hinh_chinh_file: file, hinh: URL.createObjectURL(file) });
            }}
          />
          {form.hinh && <img src={form.hinh} alt="Hình chính" className="w-40 mt-3 border rounded" />}
        </div>

        {/* HÌNH PHỤ */}
        <div>
          <h2 className="font-semibold mb-2">Hình phụ</h2>
          <input
            type="file"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setForm({
                ...form,
                hinh_phu: [...form.hinh_phu, ...files],
                hinh_phu_preview: [...form.hinh_phu_preview, ...files.map((f) => URL.createObjectURL(f))],
              });
            }}
          />
          <div className="flex gap-3 mt-3 flex-wrap">
            {form.hinh_phu_preview.map((src, i) => (
              <div key={i} className="relative">
                <img src={src} alt={`Hình phụ ${i + 1}`} className="w-24 h-24 object-cover border rounded" />
                <button
                  onClick={() => {
                    const newPrev = [...form.hinh_phu_preview];
                    const newFiles = [...form.hinh_phu];
                    newPrev.splice(i, 1);
                    newFiles.splice(i, 1);
                    setForm({ ...form, hinh_phu_preview: newPrev, hinh_phu: newFiles });
                  }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BIẾN THỂ */}
        <div>
          <h2 className="font-semibold mb-2">Biến thể</h2>
          {form.bien_the.map((bt, index) => (
            <div key={index} className="flex gap-2 items-center mb-2">
              <Input
                label="Tên"
                value={bt.ten}
                onChange={(e) => updateBienThe(index, "ten", e.target.value)}
              />
              <Input
                label="Giá thêm"
                type="number"
                value={bt.gia_them ?? 0}
                onChange={(e) => updateBienThe(index, "gia_them", Number(e.target.value))}
              />
              <select
                value={bt.trang_thai ? 1 : 0}
                onChange={(e) => updateBienThe(index, "trang_thai", e.target.value === "1")}
                className="border p-2 rounded"
              >
                <option value={1}>Hoạt động</option>
                <option value={0}>Ngưng</option>
              </select>
              <button
                onClick={() => removeBienThe(index)}
                className="bg-red-600 text-white rounded px-2 py-1"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={addBienThe}
            className="bg-blue-600 text-white rounded px-3 py-1 mt-2"
          >
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

// ================= INPUT COMPONENT =================
function Input({ label, value, type = "text", onChange }: { label: string; value: string | number; type?: "text" | "number" | "password"; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div>
      <p className="font-semibold">{label}</p>
      <input type={type} value={value} onChange={onChange} className="border p-2 w-full rounded mt-1" />
    </div>
  );
}
