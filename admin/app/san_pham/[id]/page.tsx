// // // // // // // // // // "use client";

// // // // // // // // // // import { useEffect, useState, ChangeEvent } from "react";
// // // // // // // // // // import Image from "next/image";
// // // // // // // // // // import { ISanPham, IBienThe, IDanhMuc, IHinh } from "@/app/lib/cautrucdata";

// // // // // // // // // // export interface ISanPhamFull extends ISanPham {
// // // // // // // // // //   bien_the: IBienThe[];
// // // // // // // // // //   danh_muc: IDanhMuc | null;
// // // // // // // // // //   hinh_anh: IHinh[];
// // // // // // // // // // }

// // // // // // // // // // interface Props {
// // // // // // // // // //   params: { id: string };
// // // // // // // // // // }

// // // // // // // // // // export default function SanPhamDetail({ params }: Props) {
// // // // // // // // // //   const id = Number(params.id);

// // // // // // // // // //   const [data, setData] = useState<ISanPhamFull | null>(null);
// // // // // // // // // //   const [form, setForm] = useState<ISanPhamFull | null>(null);
// // // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // // //   const [editMode, setEditMode] = useState(false);
// // // // // // // // // //   const [mainImageFile, setMainImageFile] = useState<File | null>(null);
// // // // // // // // // //   const [extraImagesFiles, setExtraImagesFiles] = useState<File[]>([]);

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     async function loadData() {
// // // // // // // // // //       try {
// // // // // // // // // //         const res = await fetch(`/api/san_pham/${id}`);
// // // // // // // // // //         const json = await res.json();
// // // // // // // // // //         if (json.success) {
// // // // // // // // // //           setData(json.data);
// // // // // // // // // //           setForm(json.data);
// // // // // // // // // //         }
// // // // // // // // // //       } catch (err) {
// // // // // // // // // //         console.error("Lỗi tải sản phẩm:", err);
// // // // // // // // // //       } finally {
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //     loadData();
// // // // // // // // // //   }, [id]);

// // // // // // // // // //   if (loading) return <p className="text-center p-4">Đang tải...</p>;
// // // // // // // // // //   if (!data || !form) return <p className="text-center text-red-600 p-4">Không tìm thấy sản phẩm</p>;

// // // // // // // // // //   const handleChange = (key: keyof ISanPhamFull, value: string | number | boolean) => {
// // // // // // // // // //     setForm({ ...form, [key]: value });
// // // // // // // // // //   };

// // // // // // // // // //   // === Hình chính ===
// // // // // // // // // //   const handleMainImageChange = (e: ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //     if (e.target.files && e.target.files[0]) {
// // // // // // // // // //       setMainImageFile(e.target.files[0]);
// // // // // // // // // //       setForm({ ...form, hinh: URL.createObjectURL(e.target.files[0]) });
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // === Hình phụ ===
// // // // // // // // // //   const handleExtraImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //     if (e.target.files) {
// // // // // // // // // //       const filesArray = Array.from(e.target.files);
// // // // // // // // // //       setExtraImagesFiles((prev) => [...prev, ...filesArray]);

// // // // // // // // // //       setForm({
// // // // // // // // // //         ...form,
// // // // // // // // // //         hinh_anh: [
// // // // // // // // // //           ...form.hinh_anh,
// // // // // // // // // //           ...filesArray.map((f) => ({
// // // // // // // // // //             id: 0,
// // // // // // // // // //             hinh: URL.createObjectURL(f),
// // // // // // // // // //             id_san_pham: form.id,
// // // // // // // // // //           })),
// // // // // // // // // //         ],
// // // // // // // // // //       });
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const removeExtraImage = (index: number) => {
// // // // // // // // // //     const newFiles = extraImagesFiles.filter((_, i) => i !== index);
// // // // // // // // // //     const newHinhAnh = form.hinh_anh.filter((_, i) => i !== index);
// // // // // // // // // //     setExtraImagesFiles(newFiles);
// // // // // // // // // //     setForm({ ...form, hinh_anh: newHinhAnh });
// // // // // // // // // //   };

// // // // // // // // // //   // === Biến thể ===
// // // // // // // // // //   const removeVariant = (index: number) => {
// // // // // // // // // //     const newVariants = [...form.bien_the];
// // // // // // // // // //     newVariants.splice(index, 1);
// // // // // // // // // //     setForm({ ...form, bien_the: newVariants });
// // // // // // // // // //   };

// // // // // // // // // //   // === Submit ===
// // // // // // // // // //   const submitUpdate = async () => {
// // // // // // // // // //     if (!form) return;

// // // // // // // // // //     const formData = new FormData();
// // // // // // // // // //     formData.append("ten", form.ten ?? "");
// // // // // // // // // //     formData.append("slug", form.slug ?? "");
// // // // // // // // // //     formData.append("mo_ta", form.mo_ta ?? "");
// // // // // // // // // //     formData.append("gia_goc", String(form.gia_goc ?? 0));
// // // // // // // // // //     formData.append("id_danh_muc", String(form.id_danh_muc ?? 0));
// // // // // // // // // //     formData.append("an_hien", String(form.an_hien ? "1" : "0"));
// // // // // // // // // //     formData.append("trang_thai", form.trang_thai ?? "inactive");
// // // // // // // // // //     formData.append("tag", form.tag ?? "");
// // // // // // // // // //     formData.append("phong_cach", form.phong_cach ?? "");
// // // // // // // // // //     formData.append("luot_xem", String(form.luot_xem ?? 0));

// // // // // // // // // //     if (mainImageFile) formData.append("hinh_chinh", mainImageFile);
// // // // // // // // // //     extraImagesFiles.forEach((file) => formData.append("hinh_phu", file));

// // // // // // // // // //     formData.append("bien_the", JSON.stringify(form.bien_the));

// // // // // // // // // //     const res = await fetch(`/api/san_pham/${id}`, { method: "PUT", body: formData });
// // // // // // // // // //     const json = await res.json();

// // // // // // // // // //     if (json.success) {
// // // // // // // // // //       alert("Cập nhật thành công!");
// // // // // // // // // //       const res2 = await fetch(`/api/san_pham/${id}`);
// // // // // // // // // //       const newJson = await res2.json();
// // // // // // // // // //       if (newJson.success) setData(newJson.data);
// // // // // // // // // //       setForm(newJson.data);
// // // // // // // // // //       setEditMode(false);
// // // // // // // // // //       setMainImageFile(null);
// // // // // // // // // //       setExtraImagesFiles([]);
// // // // // // // // // //     } else {
// // // // // // // // // //       alert("Cập nhật thất bại!");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // === Helper để ép src luôn là string ===
// // // // // // // // // //   const safeImage = (src: string | null | undefined) => src ?? "/no-image.png";

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="max-w-6xl mx-auto p-6 space-y-10">
// // // // // // // // // //       {/* HEADER */}
// // // // // // // // // //       <div className="flex justify-between items-center bg-white px-6 py-4 rounded-xl shadow">
// // // // // // // // // //         {editMode ? (
// // // // // // // // // //           <input
// // // // // // // // // //             className="text-3xl font-bold w-full border p-2 rounded"
// // // // // // // // // //             value={form.ten ?? ""}
// // // // // // // // // //             onChange={(e) => handleChange("ten", e.target.value)}
// // // // // // // // // //           />
// // // // // // // // // //         ) : (
// // // // // // // // // //           <h1 className="text-3xl font-bold text-gray-800">{data.ten}</h1>
// // // // // // // // // //         )}

// // // // // // // // // //         <div className="flex gap-3">
// // // // // // // // // //           {!editMode ? (
// // // // // // // // // //             <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
// // // // // // // // // //               ✏ Sửa
// // // // // // // // // //             </button>
// // // // // // // // // //           ) : (
// // // // // // // // // //             <>
// // // // // // // // // //               <button onClick={submitUpdate} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
// // // // // // // // // //                 💾 Lưu
// // // // // // // // // //               </button>
// // // // // // // // // //               <button
// // // // // // // // // //                 onClick={() => {
// // // // // // // // // //                   setForm(data);
// // // // // // // // // //                   setEditMode(false);
// // // // // // // // // //                   setMainImageFile(null);
// // // // // // // // // //                   setExtraImagesFiles([]);
// // // // // // // // // //                 }}
// // // // // // // // // //                 className="px-4 py-2 bg-gray-400 rounded-lg shadow hover:bg-gray-500"
// // // // // // // // // //               >
// // // // // // // // // //                 ✖ Hủy
// // // // // // // // // //               </button>
// // // // // // // // // //             </>
// // // // // // // // // //           )}
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* MAIN CONTENT */}
// // // // // // // // // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // // // // // // // // //         <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
// // // // // // // // // //           <Image
// // // // // // // // // //             src={safeImage(form.hinh)}
// // // // // // // // // //             alt="Hình chính"
// // // // // // // // // //             width={160}
// // // // // // // // // //             height={160}
// // // // // // // // // //             unoptimized
// // // // // // // // // //             className="w-40 h-40 object-cover rounded-xl shadow mb-2"
// // // // // // // // // //           />
// // // // // // // // // //           {editMode && <input type="file" accept="image/*" onChange={handleMainImageChange} />}
// // // // // // // // // //         </div>

// // // // // // // // // //         <div className="md:col-span-2 bg-white p-6 rounded-xl shadow space-y-4">
// // // // // // // // // //           <EditableRow label="Slug" value={form.slug ?? ""} editMode={editMode} onChange={(v) => handleChange("slug", v)} />
// // // // // // // // // //           <EditableRow label="Mô tả" value={form.mo_ta ?? ""} editMode={editMode} onChange={(v) => handleChange("mo_ta", v)} />
// // // // // // // // // //           <EditableRow label="Giá gốc" value={form.gia_goc ?? 0} editMode={editMode} onChange={(v) => handleChange("gia_goc", Number(v))} />
// // // // // // // // // //           <EditableRow label="Tag" value={form.tag ?? ""} editMode={editMode} onChange={(v) => handleChange("tag", v)} />
// // // // // // // // // //           <EditableRow label="Phong cách" value={form.phong_cach ?? ""} editMode={editMode} onChange={(v) => handleChange("phong_cach", v)} />
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* EXTRA IMAGES */}
// // // // // // // // // //       <div className="bg-white p-6 rounded-xl shadow">
// // // // // // // // // //         <h2 className="text-2xl font-bold mb-4">Hình phụ</h2>

// // // // // // // // // //         <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
// // // // // // // // // //           {form.hinh_anh.map((h, idx) => (
// // // // // // // // // //             <div key={idx} className="relative">
// // // // // // // // // //               <Image
// // // // // // // // // //                 src={safeImage(h.hinh)}
// // // // // // // // // //                 alt="Hình phụ"
// // // // // // // // // //                 width={200}
// // // // // // // // // //                 height={96}
// // // // // // // // // //                 unoptimized
// // // // // // // // // //                 className="w-full h-24 rounded-lg object-cover shadow"
// // // // // // // // // //               />

// // // // // // // // // //               {editMode && (
// // // // // // // // // //                 <button
// // // // // // // // // //                   onClick={() => removeExtraImage(idx)}
// // // // // // // // // //                   className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
// // // // // // // // // //                 >
// // // // // // // // // //                   ×
// // // // // // // // // //                 </button>
// // // // // // // // // //               )}
// // // // // // // // // //             </div>
// // // // // // // // // //           ))}
// // // // // // // // // //         </div>

// // // // // // // // // //         {editMode && <input type="file" accept="image/*" multiple onChange={handleExtraImagesChange} className="mt-2" />}
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* VARIANTS */}
// // // // // // // // // //       <div className="bg-white p-6 rounded-xl shadow">
// // // // // // // // // //         <h2 className="text-2xl font-bold mb-4">Biến thể</h2>

// // // // // // // // // //         {form.bien_the.map((bt, idx) => (
// // // // // // // // // //           <div key={idx} className="border p-4 rounded-lg bg-gray-50 shadow-sm relative">
// // // // // // // // // //             {editMode && (
// // // // // // // // // //               <button
// // // // // // // // // //                 onClick={() => removeVariant(idx)}
// // // // // // // // // //                 className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
// // // // // // // // // //               >
// // // // // // // // // //                 ×
// // // // // // // // // //               </button>
// // // // // // // // // //             )}

// // // // // // // // // //             {editMode ? (
// // // // // // // // // //               <>
// // // // // // // // // //                 <input
// // // // // // // // // //                   className="border p-1 rounded w-full mb-1"
// // // // // // // // // //                   value={bt.ten ?? ""}
// // // // // // // // // //                   onChange={(e) => {
// // // // // // // // // //                     const newBT = [...form.bien_the];
// // // // // // // // // //                     newBT[idx].ten = e.target.value;
// // // // // // // // // //                     setForm({ ...form, bien_the: newBT });
// // // // // // // // // //                   }}
// // // // // // // // // //                 />
// // // // // // // // // //                 <input
// // // // // // // // // //                   type="number"
// // // // // // // // // //                   className="border p-1 rounded w-full mb-1"
// // // // // // // // // //                   value={bt.gia_them ?? 0}
// // // // // // // // // //                   onChange={(e) => {
// // // // // // // // // //                     const newBT = [...form.bien_the];
// // // // // // // // // //                     newBT[idx].gia_them = Number(e.target.value);
// // // // // // // // // //                     setForm({ ...form, bien_the: newBT });
// // // // // // // // // //                   }}
// // // // // // // // // //                 />
// // // // // // // // // //                 <select
// // // // // // // // // //                   value={bt.trang_thai ? "1" : "0"}
// // // // // // // // // //                   onChange={(e) => {
// // // // // // // // // //                     const newBT = [...form.bien_the];
// // // // // // // // // //                     newBT[idx].trang_thai = e.target.value === "1";
// // // // // // // // // //                     setForm({ ...form, bien_the: newBT });
// // // // // // // // // //                   }}
// // // // // // // // // //                   className="border p-1 rounded w-full"
// // // // // // // // // //                 >
// // // // // // // // // //                   <option value="1">Hiện</option>
// // // // // // // // // //                   <option value="0">Ẩn</option>
// // // // // // // // // //                 </select>
// // // // // // // // // //               </>
// // // // // // // // // //             ) : (
// // // // // // // // // //               <>
// // // // // // // // // //                 <p className="font-bold">{bt.ten}</p>
// // // // // // // // // //                 <p>Giá thêm: {bt.gia_them?.toLocaleString()}đ</p>
// // // // // // // // // //                 <p>Trạng thái: {bt.trang_thai ? "Hiện" : "Ẩn"}</p>
// // // // // // // // // //               </>
// // // // // // // // // //             )}
// // // // // // // // // //           </div>
// // // // // // // // // //         ))}
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }

// // // // // // // // // // function EditableRow({
// // // // // // // // // //   label,
// // // // // // // // // //   value,
// // // // // // // // // //   editMode,
// // // // // // // // // //   onChange,
// // // // // // // // // // }: {
// // // // // // // // // //   label: string;
// // // // // // // // // //   value: string | number;
// // // // // // // // // //   editMode: boolean;
// // // // // // // // // //   onChange: (v: string | number) => void;
// // // // // // // // // // }) {
// // // // // // // // // //   return (
// // // // // // // // // //     <div>
// // // // // // // // // //       <p className="font-semibold text-gray-700">{label}:</p>
// // // // // // // // // //       {editMode ? (
// // // // // // // // // //         <input
// // // // // // // // // //           value={value ?? ""}
// // // // // // // // // //           onChange={(e) =>
// // // // // // // // // //             onChange(isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value))
// // // // // // // // // //           }
// // // // // // // // // //           className="border p-2 rounded w-full"
// // // // // // // // // //         />
// // // // // // // // // //       ) : (
// // // // // // // // // //         <p className="text-gray-800">{value ?? ""}</p>
// // // // // // // // // //       )}
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }
// // // // // // // // // "use client";

// // // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // // import { useRouter } from "next/navigation";

// // // // // // // // // import { ISanPham } from "@/app/lib/cautrucdata";
// // // // // // // // // import { IBienThe, IDanhMuc, IHinh } from "@/app/lib/cautrucdata";

// // // // // // // // // export default function SanPhamDetailPage({ params }: { params: { id: string } }) {
// // // // // // // // //   const router = useRouter();
// // // // // // // // //   const id = params.id;

// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [saving, setSaving] = useState(false);

// // // // // // // // //   const [danhMucList, setDanhMucList] = useState<IDanhMuc[]>([]);
// // // // // // // // //   const [bienThe, setBienThe] = useState<IBienThe[]>([]);
// // // // // // // // //   const [hinhPhu, setHinhPhu] = useState<IHinh[]>([]);

// // // // // // // // //   // DATA FORM
// // // // // // // // //   const [form, setForm] = useState<any>({
// // // // // // // // //     ten: "",
// // // // // // // // //     slug: "",
// // // // // // // // //     gia_goc: 0,
// // // // // // // // //     mo_ta: "",
// // // // // // // // //     tag: "",
// // // // // // // // //     phong_cach: "",
// // // // // // // // //     trang_thai: "",
// // // // // // // // //     an_hien: true,
// // // // // // // // //     id_danh_muc: 1,
// // // // // // // // //     hinh: "",
// // // // // // // // //   });

// // // // // // // // //   const [hinhFile, setHinhFile] = useState<File | null>(null);
// // // // // // // // //   const [hinhPhuFiles, setHinhPhuFiles] = useState<File[]>([]);

// // // // // // // // //   // ================= LOAD SẢN PHẨM ====================
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     loadData();
// // // // // // // // //   }, []);

// // // // // // // // //   async function loadData() {
// // // // // // // // //     try {
// // // // // // // // //       setLoading(true);

// // // // // // // // //       // Load chi tiết sản phẩm
// // // // // // // // //       const res = await fetch(`/api/admin/san-pham/${id}`);
// // // // // // // // //       const json = await res.json();

// // // // // // // // //       if (!json.success) return alert("Không lấy được dữ liệu");

// // // // // // // // //       const sp = json.data as ISanPham & {
// // // // // // // // //         bien_the: IBienThe[];
// // // // // // // // //         hinh_anh: IHinh[];
// // // // // // // // //       };

// // // // // // // // //       setForm({
// // // // // // // // //         ten: sp.ten,
// // // // // // // // //         slug: sp.slug,
// // // // // // // // //         gia_goc: sp.gia_goc,
// // // // // // // // //         mo_ta: sp.mo_ta,
// // // // // // // // //         tag: sp.tag,
// // // // // // // // //         phong_cach: sp.phong_cach,
// // // // // // // // //         trang_thai: sp.trang_thai,
// // // // // // // // //         an_hien: sp.an_hien,
// // // // // // // // //         id_danh_muc: sp.id_danh_muc,
// // // // // // // // //         hinh: sp.hinh,
// // // // // // // // //       });

// // // // // // // // //       setBienThe(sp.bien_the || []);
// // // // // // // // //       setHinhPhu(sp.hinh_anh || []);

// // // // // // // // //       // load danh mục
// // // // // // // // //       const dm = await fetch("/api/admin/danh-muc");
// // // // // // // // //       const dmJson = await dm.json();
// // // // // // // // //       setDanhMucList(dmJson.data || []);
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error(err);
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   // ================= SUBMIT UPDATE ====================
// // // // // // // // //   async function handleSave() {
// // // // // // // // //     try {
// // // // // // // // //       setSaving(true);

// // // // // // // // //       const body = new FormData();
// // // // // // // // //       body.append("ten", form.ten);
// // // // // // // // //       body.append("slug", form.slug);
// // // // // // // // //       body.append("gia_goc", String(form.gia_goc));
// // // // // // // // //       body.append("mo_ta", form.mo_ta || "");
// // // // // // // // //       body.append("tag", form.tag || "");
// // // // // // // // //       body.append("phong_cach", form.phong_cach || "");
// // // // // // // // //       body.append("trang_thai", form.trang_thai || "");
// // // // // // // // //       body.append("an_hien", String(form.an_hien));
// // // // // // // // //       body.append("id_danh_muc", String(form.id_danh_muc));
// // // // // // // // //       body.append("hinh", form.hinh || "");

// // // // // // // // //       if (hinhFile) body.append("hinh_file", hinhFile);

// // // // // // // // //       hinhPhuFiles.forEach((file) => {
// // // // // // // // //         body.append("hinh_phu", file);
// // // // // // // // //       });

// // // // // // // // //       body.append("bien_the", JSON.stringify(bienThe));

// // // // // // // // //       const res = await fetch(`/api/admin/san-pham/${id}`, {
// // // // // // // // //         method: "PUT",
// // // // // // // // //         body,
// // // // // // // // //       });

// // // // // // // // //       const json = await res.json();

// // // // // // // // //       if (!json.success) return alert(json.message);

// // // // // // // // //       alert("Cập nhật thành công");
// // // // // // // // //       router.refresh();
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error(err);
// // // // // // // // //       alert("Lỗi khi lưu");
// // // // // // // // //     } finally {
// // // // // // // // //       setSaving(false);
// // // // // // // // //     }
// // // // // // // // //   }

// // // // // // // // //   const updateForm = (key: string, value: any) => {
// // // // // // // // //     setForm((prev: any) => ({ ...prev, [key]: value }));
// // // // // // // // //   };

// // // // // // // // //   // ================ ADD / REMOVE BIẾN THỂ ================
// // // // // // // // //   function addBienThe() {
// // // // // // // // //     setBienThe((prev) => [...prev, { ten: "", trang_thai: bolean, gia_them: 0, id: 0, id_san_pham: Number(id) }]);
// // // // // // // // //   }

// // // // // // // // //   function updateBienThe(index: number, key: string, value: any) {
// // // // // // // // //     setBienThe((prev) => {
// // // // // // // // //       const arr = [...prev];
// // // // // // // // //       arr[index] = { ...arr[index], [key]: value };
// // // // // // // // //       return arr;
// // // // // // // // //     });
// // // // // // // // //   }

// // // // // // // // //   function removeBienThe(index: number) {
// // // // // // // // //     setBienThe((prev) => prev.filter((_, i) => i !== index));
// // // // // // // // //   }

// // // // // // // // //   // ================== RENDER =====================
// // // // // // // // //   if (loading) return <p className="p-4">Đang tải...</p>;

// // // // // // // // //   return (
// // // // // // // // //     <div className="p-6 max-w-3xl mx-auto space-y-6">
// // // // // // // // //       <h1 className="text-2xl font-bold">Chi tiết & sửa sản phẩm #{id}</h1>

// // // // // // // // //       {/* ======= THÔNG TIN CƠ BẢN ======= */}
// // // // // // // // //       <div className="border p-4 rounded">
// // // // // // // // //         <h2 className="font-semibold mb-3">Thông tin sản phẩm</h2>

// // // // // // // // //         <label className="block mb-2">Tên</label>
// // // // // // // // //         <input
// // // // // // // // //           className="w-full border p-2 mb-3"
// // // // // // // // //           value={form.ten}
// // // // // // // // //           onChange={(e) => updateForm("ten", e.target.value)}
// // // // // // // // //         />

// // // // // // // // //         <label className="block mb-2">Slug</label>
// // // // // // // // //         <input
// // // // // // // // //           className="w-full border p-2 mb-3"
// // // // // // // // //           value={form.slug}
// // // // // // // // //           onChange={(e) => updateForm("slug", e.target.value)}
// // // // // // // // //         />

// // // // // // // // //         <label className="block mb-2">Giá gốc</label>
// // // // // // // // //         <input
// // // // // // // // //           type="number"
// // // // // // // // //           className="w-full border p-2 mb-3"
// // // // // // // // //           value={form.gia_goc}
// // // // // // // // //           onChange={(e) => updateForm("gia_goc", e.target.value)}
// // // // // // // // //         />

// // // // // // // // //         <label className="block mb-2">Mô tả</label>
// // // // // // // // //         <textarea
// // // // // // // // //           className="w-full border p-2 mb-3"
// // // // // // // // //           value={form.mo_ta || ""}
// // // // // // // // //           onChange={(e) => updateForm("mo_ta", e.target.value)}
// // // // // // // // //         />

// // // // // // // // //         {/* DANH MỤC */}
// // // // // // // // //         <label className="block mb-2">Danh mục</label>
// // // // // // // // //         <select
// // // // // // // // //           className="w-full border p-2 mb-3"
// // // // // // // // //           value={form.id_danh_muc}
// // // // // // // // //           onChange={(e) => updateForm("id_danh_muc", e.target.value)}
// // // // // // // // //         >
// // // // // // // // //           {danhMucList.map((dm) => (
// // // // // // // // //             <option key={dm.id} value={dm.id}>
// // // // // // // // //               {dm.ten}
// // // // // // // // //             </option>
// // // // // // // // //           ))}
// // // // // // // // //         </select>

// // // // // // // // //         <label className="block font-semibold">Hiển thị:</label>
// // // // // // // // //         <input
// // // // // // // // //           type="checkbox"
// // // // // // // // //           checked={form.an_hien}
// // // // // // // // //           onChange={(e) => updateForm("an_hien", e.target.checked)}
// // // // // // // // //         />
// // // // // // // // //       </div>

// // // // // // // // //       {/* ======= HÌNH CHÍNH ======= */}
// // // // // // // // //       <div className="border p-4 rounded">
// // // // // // // // //         <h2 className="font-semibold mb-3">Hình chính</h2>

// // // // // // // // //         {form.hinh && (
// // // // // // // // //           <img src={form.hinh} className="w-32 h-32 object-cover mb-3 rounded" />
// // // // // // // // //         )}

// // // // // // // // //         <input type="file" onChange={(e) => setHinhFile(e.target.files?.[0] || null)} />
// // // // // // // // //       </div>

// // // // // // // // //       {/* ======= HÌNH PHỤ ======= */}
// // // // // // // // //       <div className="border p-4 rounded">
// // // // // // // // //         <h2 className="font-semibold mb-3">Hình phụ</h2>

// // // // // // // // //         <div className="flex gap-2 flex-wrap mb-3">
// // // // // // // // //           {hinhPhu.map((h) => (
// // // // // // // // //             <img key={h.id} src={h.hinh || ""} className="w-24 h-24 rounded object-cover" />
// // // // // // // // //           ))}
// // // // // // // // //         </div>

// // // // // // // // //         <input type="file" multiple onChange={(e) => setHinhPhuFiles(Array.from(e.target.files || []))} />
// // // // // // // // //       </div>

// // // // // // // // //       {/* ======= BIẾN THỂ ======= */}
// // // // // // // // //       <div className="border p-4 rounded">
// // // // // // // // //         <h2 className="font-semibold mb-3 flex justify-between">
// // // // // // // // //           Biến thể
// // // // // // // // //           <button onClick={addBienThe} className="bg-blue-500 text-white px-3 py-1 rounded">
// // // // // // // // //             + Thêm
// // // // // // // // //           </button>
// // // // // // // // //         </h2>

// // // // // // // // //         {bienThe.map((bt, i) => (
// // // // // // // // //           <div key={i} className="border p-3 rounded mb-3 space-y-2">
// // // // // // // // //             <input
// // // // // // // // //               className="w-full border p-2"
// // // // // // // // //               placeholder="Tên biến thể"
// // // // // // // // //               value={bt.ten}
// // // // // // // // //               onChange={(e) => updateBienThe(i, "ten", e.target.value)}
// // // // // // // // //             />

// // // // // // // // //             <input
// // // // // // // // //               type="number"
// // // // // // // // //               className="w-full border p-2"
// // // // // // // // //               placeholder="Giá thêm"
// // // // // // // // //               value={bt.gia_them || 0}
// // // // // // // // //               onChange={(e) => updateBienThe(i, "gia_them", Number(e.target.value))}
// // // // // // // // //             />

// // // // // // // // //             <select
// // // // // // // // //               className="w-full border p-2"
// // // // // // // // //               value={bt.trang_thai ? 1 : 0}
// // // // // // // // //               onChange={(e) => updateBienThe(i, "trang_thai", Number(e.target.value))}
// // // // // // // // //             >
// // // // // // // // //               <option value={1}>Hiển thị</option>
// // // // // // // // //               <option value={0}>Ẩn</option>
// // // // // // // // //             </select>

// // // // // // // // //             <button
// // // // // // // // //               onClick={() => removeBienThe(i)}
// // // // // // // // //               className="bg-red-500 text-white px-3 py-1 rounded"
// // // // // // // // //             >
// // // // // // // // //               Xóa
// // // // // // // // //             </button>
// // // // // // // // //           </div>
// // // // // // // // //         ))}
// // // // // // // // //       </div>

// // // // // // // // //       {/* ====== BUTTON SAVE ====== */}
// // // // // // // // //       <button
// // // // // // // // //         onClick={handleSave}
// // // // // // // // //         disabled={saving}
// // // // // // // // //         className="bg-green-600 text-white px-5 py-2 rounded w-full"
// // // // // // // // //       >
// // // // // // // // //         {saving ? "Đang lưu..." : "Lưu thay đổi"}
// // // // // // // // //       </button>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }
// // // // // // // // "use client";

// // // // // // // // import { useEffect, useState } from "react";
// // // // // // // // import { useRouter } from "next/navigation";

// // // // // // // // import { ISanPham, IBienThe, IDanhMuc, IHinh } from "@/app/lib/cautrucdata";

// // // // // // // // interface FormState {
// // // // // // // //   ten: string;
// // // // // // // //   slug: string;
// // // // // // // //   gia_goc: number;
// // // // // // // //   mo_ta: string;
// // // // // // // //   tag: string;
// // // // // // // //   phong_cach: string;
// // // // // // // //   trang_thai: string;
// // // // // // // //   an_hien: boolean;
// // // // // // // //   id_danh_muc: number;
// // // // // // // //   hinh: string;
// // // // // // // // }

// // // // // // // // export default function SanPhamDetailPage({ params }: { params: { id: string } }) {
// // // // // // // //   const router = useRouter();
// // // // // // // //   const id = params.id;

// // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // //   const [saving, setSaving] = useState(false);

// // // // // // // //   const [danhMucList, setDanhMucList] = useState<IDanhMuc[]>([]);
// // // // // // // //   const [bienThe, setBienThe] = useState<IBienThe[]>([]);
// // // // // // // //   const [hinhPhu, setHinhPhu] = useState<IHinh[]>([]);

// // // // // // // //   const [form, setForm] = useState<FormState>({
// // // // // // // //     ten: "",
// // // // // // // //     slug: "",
// // // // // // // //     gia_goc: 0,
// // // // // // // //     mo_ta: "",
// // // // // // // //     tag: "",
// // // // // // // //     phong_cach: "",
// // // // // // // //     trang_thai: "",
// // // // // // // //     an_hien: true,
// // // // // // // //     id_danh_muc: 1,
// // // // // // // //     hinh: "",
// // // // // // // //   });

// // // // // // // //   const [hinhFile, setHinhFile] = useState<File | null>(null);
// // // // // // // //   const [hinhPhuFiles, setHinhPhuFiles] = useState<File[]>([]);

// // // // // // // //   // ================= LOAD DATA ====================
// // // // // // // //   useEffect(() => {
// // // // // // // //     loadData();
// // // // // // // //   }, []);

// // // // // // // //   async function loadData() {
// // // // // // // //     try {
// // // // // // // //       setLoading(true);

// // // // // // // //       const res = await fetch(`/api/admin/san-pham/${id}`);
// // // // // // // //       const json = await res.json();

// // // // // // // //       if (!json.success) {
// // // // // // // //         return alert("Không lấy được dữ liệu");
// // // // // // // //       }

// // // // // // // //       const sp: ISanPham & { bien_the: IBienThe[]; hinh_anh: IHinh[] } = json.data;

// // // // // // // //      setForm({
// // // // // // // //   ten: sp.ten ?? "",
// // // // // // // //   slug: sp.slug ?? "",
// // // // // // // //   gia_goc: sp.gia_goc ?? 0,
// // // // // // // //   mo_ta: sp.mo_ta ?? "",
// // // // // // // //   tag: sp.tag ?? "",
// // // // // // // //   phong_cach: sp.phong_cach ?? "",
// // // // // // // //   trang_thai: sp.trang_thai ?? "",
// // // // // // // //   an_hien: Boolean(sp.an_hien),
// // // // // // // //   id_danh_muc: sp.id_danh_muc ?? 1,
// // // // // // // //   hinh: sp.hinh ?? "",
// // // // // // // // });


// // // // // // // //       setBienThe(sp.bien_the || []);
// // // // // // // //       setHinhPhu(sp.hinh_anh || []);

// // // // // // // //       // load danh mục
// // // // // // // //       const dm = await fetch("/api/admin/danh-muc");
// // // // // // // //       const dmJson = await dm.json();
// // // // // // // //       setDanhMucList(dmJson.data || []);
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   // ================= UPDATE FORM GENERIC ====================
// // // // // // // //   function updateForm<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
// // // // // // // //     setForm(prev => ({ ...prev, [key]: value }));
// // // // // // // //   }

// // // // // // // //   // ================= ADD / REMOVE BIẾN THỂ ====================
// // // // // // // //   function addBienThe() {
// // // // // // // //     setBienThe(prev => [
// // // // // // // //       ...prev,
// // // // // // // //       {
// // // // // // // //         id: 0,
// // // // // // // //         id_san_pham: Number(id),
// // // // // // // //         ten: "",
// // // // // // // //         trang_thai: 1,
// // // // // // // //         gia_them: 0,
// // // // // // // //       },
// // // // // // // //     ]);
// // // // // // // //   }

// // // // // // // //   function updateBienThe(index: number, key: keyof IBienThe, value: any) {
// // // // // // // //     setBienThe(prev => {
// // // // // // // //       const arr = [...prev];
// // // // // // // //       arr[index] = { ...arr[index], [key]: value };
// // // // // // // //       return arr;
// // // // // // // //     });
// // // // // // // //   }

// // // // // // // //   function removeBienThe(index: number) {
// // // // // // // //     setBienThe(prev => prev.filter((_, i) => i !== index));
// // // // // // // //   }

// // // // // // // //   // ================= SUBMIT ====================
// // // // // // // //   async function handleSave() {
// // // // // // // //     try {
// // // // // // // //       setSaving(true);

// // // // // // // //       const body = new FormData();
// // // // // // // //       Object.entries(form).forEach(([k, v]) => body.append(k, String(v)));

// // // // // // // //       if (hinhFile) body.append("hinh_file", hinhFile);

// // // // // // // //       hinhPhuFiles.forEach(file => body.append("hinh_phu", file));

// // // // // // // //       body.append("bien_the", JSON.stringify(bienThe));

// // // // // // // //       const res = await fetch(`/api/admin/san-pham/${id}`, {
// // // // // // // //         method: "PUT",
// // // // // // // //         body,
// // // // // // // //       });

// // // // // // // //       const json = await res.json();
// // // // // // // //       if (!json.success) return alert(json.message);

// // // // // // // //       alert("Cập nhật thành công");
// // // // // // // //       router.refresh();
// // // // // // // //     } finally {
// // // // // // // //       setSaving(false);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   // ================= RENDER ====================
// // // // // // // //   if (loading) return <p className="p-4">Đang tải...</p>;

// // // // // // // //   return (
// // // // // // // //     <div className="p-6 max-w-3xl mx-auto space-y-6">
// // // // // // // //       <h1 className="text-2xl font-bold">Chi tiết & sửa sản phẩm #{id}</h1>

// // // // // // // //       {/* ======= THÔNG TIN CƠ BẢN ======= */}
// // // // // // // //       <div className="border p-4 rounded">
// // // // // // // //         <h2 className="font-semibold mb-3">Thông tin sản phẩm</h2>

// // // // // // // //         <label className="block mb-2">Tên</label>
// // // // // // // //         <input
// // // // // // // //           className="w-full border p-2 mb-3"
// // // // // // // //           value={form.ten}
// // // // // // // //           onChange={(e) => updateForm("ten", e.target.value)}
// // // // // // // //         />

// // // // // // // //         <label className="block mb-2">Slug</label>
// // // // // // // //         <input
// // // // // // // //           className="w-full border p-2 mb-3"
// // // // // // // //           value={form.slug}
// // // // // // // //           onChange={(e) => updateForm("slug", e.target.value)}
// // // // // // // //         />

// // // // // // // //         <label className="block mb-2">Giá gốc</label>
// // // // // // // //         <input
// // // // // // // //           type="number"
// // // // // // // //           className="w-full border p-2 mb-3"
// // // // // // // //           value={form.gia_goc}
// // // // // // // //           onChange={(e) => updateForm("gia_goc", Number(e.target.value))}
// // // // // // // //         />

// // // // // // // //         <label className="block mb-2">Mô tả</label>
// // // // // // // //         <textarea
// // // // // // // //           className="w-full border p-2 mb-3"
// // // // // // // //           value={form.mo_ta}
// // // // // // // //           onChange={(e) => updateForm("mo_ta", e.target.value)}
// // // // // // // //         />

// // // // // // // //         <label className="block mb-2">Danh mục</label>
// // // // // // // //         <select
// // // // // // // //           className="w-full border p-2 mb-3"
// // // // // // // //           value={form.id_danh_muc}
// // // // // // // //           onChange={(e) => updateForm("id_danh_muc", Number(e.target.value))}
// // // // // // // //         >
// // // // // // // //           {danhMucList.map(dm => (
// // // // // // // //             <option key={dm.id} value={dm.id}>
// // // // // // // //               {dm.ten}
// // // // // // // //             </option>
// // // // // // // //           ))}
// // // // // // // //         </select>

// // // // // // // //         <label className="block font-semibold">Hiển thị:</label>
// // // // // // // //         <input
// // // // // // // //           type="checkbox"
// // // // // // // //           checked={form.an_hien}
// // // // // // // //           onChange={(e) => updateForm("an_hien", e.target.checked)}
// // // // // // // //         />
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }
// // // // // // // "use client";

// // // // // // // import { useEffect, useState } from "react";
// // // // // // // import { useRouter } from "next/navigation";

// // // // // // // import { ISanPham, IBienThe, IDanhMuc, IHinh } from "@/app/lib/cautrucdata";

// // // // // // // interface FormState {
// // // // // // //   ten: string;
// // // // // // //   slug: string;
// // // // // // //   gia_goc: number;
// // // // // // //   mo_ta: string;
// // // // // // //   tag: string;
// // // // // // //   phong_cach: string;
// // // // // // //   trang_thai: string;
// // // // // // //   an_hien: boolean;
// // // // // // //   id_danh_muc: number;
// // // // // // //   hinh: string;
// // // // // // // }

// // // // // // // export default function SanPhamDetailPage({
// // // // // // //   params,
// // // // // // // }: {
// // // // // // //   params: { id: string };
// // // // // // // }) {
// // // // // // //   const router = useRouter();
// // // // // // //   const id = params.id;

// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [saving, setSaving] = useState(false);

// // // // // // //   const [danhMucList, setDanhMucList] = useState<IDanhMuc[]>([]);
// // // // // // //   const [bienThe, setBienThe] = useState<IBienThe[]>([]);
// // // // // // //   const [hinhPhu, setHinhPhu] = useState<IHinh[]>([]);

// // // // // // //   const [form, setForm] = useState<FormState>({
// // // // // // //     ten: "",
// // // // // // //     slug: "",
// // // // // // //     gia_goc: 0,
// // // // // // //     mo_ta: "",
// // // // // // //     tag: "",
// // // // // // //     phong_cach: "",
// // // // // // //     trang_thai: "",
// // // // // // //     an_hien: true,
// // // // // // //     id_danh_muc: 1,
// // // // // // //     hinh: "",
// // // // // // //   });

// // // // // // //   const [hinhFile, setHinhFile] = useState<File | null>(null);
// // // // // // //   const [hinhPhuFiles, setHinhPhuFiles] = useState<File[]>([]);

// // // // // // //   // ================= LOAD DATA ====================
// // // // // // //   useEffect(() => {
// // // // // // //     loadData();
// // // // // // //   }, []);

// // // // // // //   async function loadData() {
// // // // // // //     try {
// // // // // // //       setLoading(true);

// // // // // // //       const res = await fetch(`/api/admin/san-pham/${id}`);
// // // // // // //       const json = await res.json();

// // // // // // //       if (!json.success) {
// // // // // // //         return alert("Không lấy được dữ liệu");
// // // // // // //       }

// // // // // // //       const sp: ISanPham & {
// // // // // // //         bien_the: IBienThe[];
// // // // // // //         hinh_anh: IHinh[];
// // // // // // //         danh_muc: IDanhMuc;
// // // // // // //       } = json.data;

// // // // // // //       setForm({
// // // // // // //         ten: sp.ten ?? "",
// // // // // // //         slug: sp.slug ?? "",
// // // // // // //         gia_goc: sp.gia_goc ?? 0,
// // // // // // //         mo_ta: sp.mo_ta ?? "",
// // // // // // //         tag: sp.tag ?? "",
// // // // // // //         phong_cach: sp.phong_cach ?? "",
// // // // // // //         trang_thai: sp.trang_thai ?? "",
// // // // // // //         an_hien: Boolean(sp.an_hien),
// // // // // // //         id_danh_muc: sp.id_danh_muc ?? 1,
// // // // // // //         hinh: sp.hinh ?? "",
// // // // // // //       });

// // // // // // //       setBienThe(
// // // // // // //         (sp.bien_the || []).map((bt) => ({
// // // // // // //           ...bt,
// // // // // // //           trang_thai: Boolean(bt.trang_thai), // 1 → true
// // // // // // //         }))
// // // // // // //       );

// // // // // // //       setHinhPhu(sp.hinh_anh || []);

// // // // // // //       // load danh mục
// // // // // // //       const dm = await fetch("/api/admin/danh-muc");
// // // // // // //       const dmJson = await dm.json();
// // // // // // //       setDanhMucList(dmJson.data || []);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   }

// // // // // // //   // ================= UPDATE FORM ====================
// // // // // // //   function updateForm<Key extends keyof FormState>(
// // // // // // //     key: Key,
// // // // // // //     value: FormState[Key]
// // // // // // //   ) {
// // // // // // //     setForm((prev) => ({ ...prev, [key]: value }));
// // // // // // //   }

// // // // // // //   // ================= SUBMIT ====================
// // // // // // //   async function handleSave() {
// // // // // // //     try {
// // // // // // //       setSaving(true);

// // // // // // //       const body = new FormData();
// // // // // // //       Object.entries(form).forEach(([k, v]) => body.append(k, String(v)));

// // // // // // //       if (hinhFile) body.append("hinh_file", hinhFile);

// // // // // // //       hinhPhuFiles.forEach((file) => body.append("hinh_phu", file));

// // // // // // //       // Convert boolean → number
// // // // // // //       const bienTheForApi = bienThe.map((bt) => ({
// // // // // // //         id: bt.id,
// // // // // // //         id_san_pham: bt.id_san_pham,
// // // // // // //         ten: bt.ten,
// // // // // // //         gia_them: bt.gia_them,
// // // // // // //         trang_thai: bt.trang_thai ? 1 : 0,
// // // // // // //       }));

// // // // // // //       body.append("bien_the", JSON.stringify(bienTheForApi));

// // // // // // //       const res = await fetch(`/api/admin/san-pham/${id}`, {
// // // // // // //         method: "PUT",
// // // // // // //         body,
// // // // // // //       });

// // // // // // //       const json = await res.json();
// // // // // // //       if (!json.success) return alert(json.message);

// // // // // // //       alert("Cập nhật thành công");
// // // // // // //       router.refresh();
// // // // // // //     } finally {
// // // // // // //       setSaving(false);
// // // // // // //     }
// // // // // // //   }

// // // // // // //   // ================= RENDER ====================
// // // // // // //   if (loading) return <p className="p-4">Đang tải...</p>;

// // // // // // //   return (
// // // // // // //     <div className="p-6 max-w-3xl mx-auto space-y-6">
// // // // // // //       <h1 className="text-2xl font-bold">Sửa sản phẩm #{id}</h1>

// // // // // // //       {/* ======= HIỂN THỊ HÌNH CHÍNH ======= */}
// // // // // // //       {form.hinh && (
// // // // // // //         <div>
// // // // // // //           <p className="font-semibold">Hình chính:</p>
// // // // // // //           <img src={form.hinh} className="w-40 h-40 object-cover rounded" />
// // // // // // //         </div>
// // // // // // //       )}

// // // // // // //      {/* ======= HIỂN THỊ HÌNH PHỤ ======= */}
// // // // // // // {hinhPhu.length > 0 && (
// // // // // // //   <div>
// // // // // // //     <p className="font-semibold mb-2">Hình phụ:</p>
// // // // // // //     <div className="flex gap-3 flex-wrap">
// // // // // // //       {hinhPhu.map((h) => (
// // // // // // //         <img
// // // // // // //           key={h.id}
// // // // // // //           src={h.hinh ?? undefined}  
// // // // // // //           className="w-32 h-32 object-cover rounded border"
// // // // // // //         />
// // // // // // //       ))}
// // // // // // //     </div>
// // // // // // //   </div>
// // // // // // // )}


// // // // // // //       {/* ======= THÔNG TIN CƠ BẢN ======= */}
// // // // // // //       <div className="border p-4 rounded">
// // // // // // //         <h2 className="font-semibold mb-3">Thông tin sản phẩm</h2>

// // // // // // //         <label className="block mb-2">Tên</label>
// // // // // // //         <input
// // // // // // //           className="w-full border p-2 mb-3"
// // // // // // //           value={form.ten}
// // // // // // //           onChange={(e) => updateForm("ten", e.target.value)}
// // // // // // //         />

// // // // // // //         <label className="block mb-2">Slug</label>
// // // // // // //         <input
// // // // // // //           className="w-full border p-2 mb-3"
// // // // // // //           value={form.slug}
// // // // // // //           onChange={(e) => updateForm("slug", e.target.value)}
// // // // // // //         />

// // // // // // //         <label className="block mb-2">Giá gốc</label>
// // // // // // //         <input
// // // // // // //           type="number"
// // // // // // //           className="w-full border p-2 mb-3"
// // // // // // //           value={form.gia_goc}
// // // // // // //           onChange={(e) => updateForm("gia_goc", Number(e.target.value))}
// // // // // // //         />

// // // // // // //         <label className="block mb-2">Mô tả</label>
// // // // // // //         <textarea
// // // // // // //           className="w-full border p-2 mb-3"
// // // // // // //           value={form.mo_ta}
// // // // // // //           onChange={(e) => updateForm("mo_ta", e.target.value)}
// // // // // // //         />

// // // // // // //         <label className="block mb-2">Tag</label>
// // // // // // //         <input
// // // // // // //           className="w-full border p-2 mb-3"
// // // // // // //           value={form.tag}
// // // // // // //           onChange={(e) => updateForm("tag", e.target.value)}
// // // // // // //         />

// // // // // // //         <label className="block mb-2">Phong cách</label>
// // // // // // //         <input
// // // // // // //           className="w-full border p-2 mb-3"
// // // // // // //           value={form.phong_cach}
// // // // // // //           onChange={(e) => updateForm("phong_cach", e.target.value)}
// // // // // // //         />

// // // // // // //         <label className="block mb-2">Trạng thái</label>
// // // // // // //         <input
// // // // // // //           className="w-full border p-2 mb-3"
// // // // // // //           value={form.trang_thai}
// // // // // // //           onChange={(e) => updateForm("trang_thai", e.target.value)}
// // // // // // //         />

// // // // // // //         <label className="block mb-2">Danh mục</label>
// // // // // // //         <select
// // // // // // //           className="w-full border p-2 mb-3"
// // // // // // //           value={form.id_danh_muc}
// // // // // // //           onChange={(e) =>
// // // // // // //             updateForm("id_danh_muc", Number(e.target.value))
// // // // // // //           }
// // // // // // //         >
// // // // // // //           {danhMucList.map((dm) => (
// // // // // // //             <option key={dm.id} value={dm.id}>
// // // // // // //               {dm.ten}
// // // // // // //             </option>
// // // // // // //           ))}
// // // // // // //         </select>

// // // // // // //         <label className="block font-semibold">Hiển thị:</label>
// // // // // // //         <input
// // // // // // //           type="checkbox"
// // // // // // //           checked={form.an_hien}
// // // // // // //           onChange={(e) => updateForm("an_hien", e.target.checked)}
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       {/* ======= HIỂN THỊ BIẾN THỂ ======= */}
// // // // // // //       <div className="border p-4 rounded">
// // // // // // //         <h2 className="font-semibold mb-3">Biến thể</h2>

// // // // // // //         {bienThe.map((bt, i) => (
// // // // // // //           <div key={bt.id} className="border p-3 mb-3 rounded">
// // // // // // //             <p className="font-semibold">ID: {bt.id}</p>

// // // // // // //             <label className="block">Tên</label>
// // // // // // //             <input
// // // // // // //               className="w-full border p-2 mb-2"
// // // // // // //               value={bt.ten}
// // // // // // //               onChange={(e) => {
// // // // // // //                 const newArr = [...bienThe];
// // // // // // //                 newArr[i].ten = e.target.value;
// // // // // // //                 setBienThe(newArr);
// // // // // // //               }}
// // // // // // //             />

// // // // // // //             <label className="block">Giá thêm</label>
// // // // // // //             <input
// // // // // // //               type="number"
// // // // // // //               className="w-full border p-2 mb-2"
// // // // // // //               value={bt.gia_them ?? 0}
// // // // // // //               onChange={(e) => {
// // // // // // //                 const newArr = [...bienThe];
// // // // // // //                 newArr[i].gia_them = Number(e.target.value);
// // // // // // //                 setBienThe(newArr);
// // // // // // //               }}
// // // // // // //             />

// // // // // // //             <label className="block">Trạng thái</label>
// // // // // // //             <input
// // // // // // //               type="checkbox"
// // // // // // //               checked={bt.trang_thai}
// // // // // // //               onChange={(e) => {
// // // // // // //                 const newArr = [...bienThe];
// // // // // // //                 newArr[i].trang_thai = e.target.checked;
// // // // // // //                 setBienThe(newArr);
// // // // // // //               }}
// // // // // // //             />
// // // // // // //           </div>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       <button
// // // // // // //         onClick={handleSave}
// // // // // // //         disabled={saving}
// // // // // // //         className="px-4 py-2 bg-blue-600 text-white rounded"
// // // // // // //       >
// // // // // // //         {saving ? "Đang lưu..." : "Lưu thay đổi"}
// // // // // // //       </button>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }
// // // // // // 'use client';

// // // // // // import { useEffect, useState } from 'react';
// // // // // // import { useParams } from 'next/navigation';

// // // // // // import type {
// // // // // //   ISanPham,
// // // // // //   IDanhMuc,
// // // // // //   IHinh,
// // // // // //   IBienThe,
// // // // // // } from '@/app/lib/cautrucdata';

// // // // // // // ✅ Mở rộng đúng theo API Sequelize include
// // // // // // interface ISanPhamChiTiet extends ISanPham {
// // // // // //   danh_muc?: IDanhMuc;
// // // // // //   hinh_anh?: IHinh[];
// // // // // //   bien_the?: IBienThe[];
// // // // // // }

// // // // // // export default function ChiTietSanPhamPage() {
// // // // // //   const params = useParams<{ id: string }>();
// // // // // //   const id = params.id;

// // // // // //   const [data, setData] = useState<ISanPhamChiTiet | null>(null);
// // // // // //   const [loading, setLoading] = useState<boolean>(true);

// // // // // //   useEffect(() => {
// // // // // //     if (!id) return;

// // // // // //     const fetchData = async () => {
// // // // // //       try {
// // // // // //         const res = await fetch(`/api/san-pham/${id}`);
// // // // // //         const json: { success: boolean; data?: ISanPhamChiTiet } =
// // // // // //           await res.json();

// // // // // //         if (json.success && json.data) {
// // // // // //           setData(json.data);
// // // // // //         }
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchData();
// // // // // //   }, [id]);

// // // // // //   if (loading) {
// // // // // //     return <div className="p-6 text-center">Đang tải dữ liệu...</div>;
// // // // // //   }

// // // // // //   if (!data) {
// // // // // //     return (
// // // // // //       <div className="p-6 text-center text-red-500">
// // // // // //         Không tìm thấy sản phẩm
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-50 p-6">
// // // // // //       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-8 space-y-8">
// // // // // //         <h1 className="text-3xl font-bold text-center">
// // // // // //           CHI TIẾT SẢN PHẨM
// // // // // //         </h1>

// // // // // //         {/* THÔNG TIN CƠ BẢN */}
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // // //           <div>
// // // // // //             <p className="font-semibold">Tên sản phẩm</p>
// // // // // //             <p className="mt-1">{data.ten}</p>
// // // // // //           </div>

// // // // // //           <div>
// // // // // //             <p className="font-semibold">Slug</p>
// // // // // //             <p className="mt-1">{data.slug}</p>
// // // // // //           </div>

// // // // // //           <div>
// // // // // //             <p className="font-semibold">Giá gốc</p>
// // // // // //             <p className="mt-1">
// // // // // //               {data.gia_goc.toLocaleString()} VNĐ
// // // // // //             </p>
// // // // // //           </div>

// // // // // //           <div>
// // // // // //             <p className="font-semibold">Danh mục</p>
// // // // // //             <p className="mt-1">
// // // // // //               {data.danh_muc?.ten ?? '—'}
// // // // // //             </p>
// // // // // //           </div>

// // // // // //           <div>
// // // // // //             <p className="font-semibold">Trạng thái hiển thị</p>
// // // // // //             <p className="mt-1">
// // // // // //               {data.an_hien ? 'Hiện' : 'Ẩn'}
// // // // // //             </p>
// // // // // //           </div>

// // // // // //           <div>
// // // // // //             <p className="font-semibold">Trạng thái sản phẩm</p>
// // // // // //             <p className="mt-1">{data.trang_thai}</p>
// // // // // //           </div>

// // // // // //           <div>
// // // // // //             <p className="font-semibold">Phong cách</p>
// // // // // //             <p className="mt-1">{data.phong_cach}</p>
// // // // // //           </div>

// // // // // //           <div>
// // // // // //             <p className="font-semibold">Tag</p>
// // // // // //             <p className="mt-1">{data.tag}</p>
// // // // // //           </div>

// // // // // //           <div className="md:col-span-2">
// // // // // //             <p className="font-semibold">Mô tả</p>
// // // // // //             <p className="mt-1 whitespace-pre-line">
// // // // // //               {data.mo_ta}
// // // // // //             </p>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* HÌNH ẢNH */}
// // // // // //         <div className="space-y-4">
// // // // // //           <h2 className="text-xl font-semibold">Hình ảnh</h2>

// // // // // //           {data.hinh && (
// // // // // //             <div>
// // // // // //               <p className="font-medium mb-2">Hình chính</p>
// // // // // //               <img
// // // // // //                 src={data.hinh}
// // // // // //                 alt="Hình chính"
// // // // // //                 className="w-64 rounded-lg border"
// // // // // //               />
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {data.hinh_anh && data.hinh_anh.length > 0 && (
// // // // // //             <div>
// // // // // //               <p className="font-medium mb-2">Hình phụ</p>
// // // // // //               <div className="flex flex-wrap gap-4">
// // // // // //                 {data.hinh_anh.map((img) => (
// // // // // //                   <img
// // // // // //                     key={img.id}
// // // // // //                     src={img.hinh ?? ''}
// // // // // //                     alt="Hình phụ"
// // // // // //                     className="w-32 h-32 object-cover rounded-lg border"
// // // // // //                   />
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* BIẾN THỂ */}
// // // // // //         <div className="space-y-4">
// // // // // //           <h2 className="text-xl font-semibold">Biến thể</h2>

// // // // // //           {data.bien_the && data.bien_the.length > 0 ? (
// // // // // //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // // // //               {data.bien_the.map((bt) => (
// // // // // //                 <div
// // // // // //                   key={bt.id}
// // // // // //                   className="border rounded-lg p-4 space-y-1"
// // // // // //                 >
// // // // // //                   <p className="font-semibold">{bt.ten}</p>
// // // // // //                   <p>
// // // // // //                     Giá thêm:{' '}
// // // // // //                     {bt.gia_them
// // // // // //                       ? bt.gia_them.toLocaleString() + ' VNĐ'
// // // // // //                       : '0 VNĐ'}
// // // // // //                   </p>
// // // // // //                   <p>
// // // // // //                     Trạng thái:{' '}
// // // // // //                     {bt.trang_thai ? 'Bật' : 'Tắt'}
// // // // // //                   </p>
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           ) : (
// // // // // //             <p className="text-gray-500">
// // // // // //               Không có biến thể
// // // // // //             </p>
// // // // // //           )}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useEffect, useState } from 'react';
// // // // // import { useParams } from 'next/navigation';
// // // // // import {
// // // // //   ISanPham,
// // // // //   IDanhMuc,
// // // // //   IHinh,
// // // // //   IBienThe,
// // // // // } from '@/app/lib/cautrucdata';

// // // // // interface ISanPhamChiTiet extends ISanPham {
// // // // //   danh_muc?: IDanhMuc;
// // // // //   hinh_anh?: IHinh[];
// // // // //   bien_the?: IBienThe[];
// // // // // }

// // // // // export default function ChiTietSanPhamPage() {
// // // // //   const params = useParams<{ id: string }>();
// // // // //   const id = params.id;

// // // // //   const [data, setData] = useState<ISanPhamChiTiet | null>(null);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     if (!id) return;

// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         const res = await fetch(
// // // // //           `http://localhost:3002/api/san_pham/${id}`
// // // // //         );

// // // // //         if (!res.ok) {
// // // // //           console.error('API lỗi:', res.status);
// // // // //           setData(null);
// // // // //           return;
// // // // //         }

// // // // //         const json: { success: boolean; data?: ISanPhamChiTiet } =
// // // // //           await res.json();

// // // // //         if (json.success && json.data) {
// // // // //           setData(json.data);
// // // // //         }
// // // // //       } catch (error) {
// // // // //         console.error('Fetch lỗi:', error);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchData();
// // // // //   }, [id]);

// // // // //   if (loading) {
// // // // //     return <div className="p-6 text-center">Đang tải dữ liệu...</div>;
// // // // //   }

// // // // //   if (!data) {
// // // // //     return (
// // // // //       <div className="p-6 text-center text-red-500">
// // // // //         Không tìm thấy sản phẩm
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50 p-6">
// // // // //       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-8 space-y-8">
// // // // //         <h1 className="text-3xl font-bold text-center">
// // // // //           CHI TIẾT SẢN PHẨM
// // // // //         </h1>

// // // // //         {/* THÔNG TIN */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //           <Info label="Tên sản phẩm" value={data.ten} />
// // // // //           <Info label="Slug" value={data.slug} />
// // // // //           <Info
// // // // //             label="Giá gốc"
// // // // //             value={`${data.gia_goc.toLocaleString()} VNĐ`}
// // // // //           />
// // // // //           <Info label="Danh mục" value={data.danh_muc?.ten ?? '—'} />
// // // // //           <Info
// // // // //             label="Hiển thị"
// // // // //             value={data.an_hien ? 'Hiện' : 'Ẩn'}
// // // // //           />
// // // // //           <Info label="Trạng thái" value={data.trang_thai ?? '—'} />
// // // // //           <Info label="Phong cách" value={data.phong_cach ?? '—'} />
// // // // //           <Info label="Tag" value={data.tag ?? '—'} />

// // // // //           <div className="md:col-span-2">
// // // // //             <p className="font-semibold">Mô tả</p>
// // // // //             <p className="mt-1 whitespace-pre-line">{data.mo_ta}</p>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* HÌNH ẢNH */}
// // // // //         <div>
// // // // //           <h2 className="text-xl font-semibold mb-4">Hình ảnh</h2>

// // // // //           {data.hinh && (
// // // // //             <div className="mb-4">
// // // // //               <p className="font-medium mb-2">Hình chính</p>
// // // // //               <img
// // // // //                 src={data.hinh}
// // // // //                 className="w-64 rounded border"
// // // // //                 alt="Hình chính"
// // // // //               />
// // // // //             </div>
// // // // //           )}

// // // // //           {data.hinh_anh && data.hinh_anh.length > 0 && (
// // // // //             <div>
// // // // //               <p className="font-medium mb-2">Hình phụ</p>
// // // // //               <div className="flex gap-4 flex-wrap">
// // // // //                 {data.hinh_anh.map(img => (
// // // // //                   <img
// // // // //                     key={img.id}
// // // // //                     src={img.hinh ?? ''}
// // // // //                     className="w-32 h-32 object-cover border rounded"
// // // // //                     alt="Hình phụ"
// // // // //                   />
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* BIẾN THỂ */}
// // // // //         <div>
// // // // //           <h2 className="text-xl font-semibold mb-4">Biến thể</h2>

// // // // //           {data.bien_the?.length ? (
// // // // //             <div className="grid md:grid-cols-3 gap-4">
// // // // //               {data.bien_the.map(bt => (
// // // // //                 <div
// // // // //                   key={bt.id}
// // // // //                   className="border rounded-lg p-4 space-y-1"
// // // // //                 >
// // // // //                   <p className="font-semibold">{bt.ten}</p>
// // // // //                   <p>
// // // // //                     Giá thêm:{' '}
// // // // //                     {bt.gia_them
// // // // //                       ? bt.gia_them.toLocaleString() + ' VNĐ'
// // // // //                       : '0 VNĐ'}
// // // // //                   </p>
// // // // //                   <p>
// // // // //                     Trạng thái:{' '}
// // // // //                     {bt.trang_thai ? 'Bật' : 'Tắt'}
// // // // //                   </p>
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //           ) : (
// // // // //             <p className="text-gray-500">Không có biến thể</p>
// // // // //           )}
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // /* COMPONENT PHỤ */
// // // // // function Info({ label, value }: { label: string; value: string }) {
// // // // //   return (
// // // // //     <div>
// // // // //       <p className="font-semibold">{label}</p>
// // // // //       <p className="mt-1">{value}</p>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import React, { useEffect, useState } from 'react';
// // // // import { useParams } from 'next/navigation';
// // // // import {
// // // //   ISanPham,
// // // //   IDanhMuc,
// // // //   IHinh,
// // // //   IBienThe,
// // // // } from '@/app/lib/cautrucdata';

// // // // /**
// // // //  * Ghi chú:
// // // //  * - API PUT mong muốn: formData với các field:
// // // //  *    - ten, slug, gia_goc, mo_ta, phong_cach, tag, an_hien, trang_thai, id_danh_muc
// // // //  *    - hinh (string URL) OR hinh_file (File)
// // // //  *    - hinh_phu (File) [nhiều bản ghi]
// // // //  *    - bien_the (string JSON)
// // // //  *
// // // //  * - Server bạn hiện tại xóa tất cả HinhModel với id_san_pham rồi tạo lại
// // // //  *   từ các file hinh_phu được upload. Vì vậy client cần gửi lên *tất cả*
// // // //  *   hình phụ muốn giữ — kể cả các hình cũ (mình fetch blob từ URL cũ & gửi như file).
// // // //  */

// // // // const API_BASE = 'http://localhost:3002/api'; // <-- đổi nếu cần

// // // // interface ISanPhamChiTiet extends ISanPham {
// // // //   danh_muc?: IDanhMuc;
// // // //   hinh_anh?: IHinh[];
// // // //   bien_the?: IBienThe[];
// // // // }

// // // // export default function ChiTietSanPhamPage() {
// // // //   const params = useParams<{ id: string }>();
// // // //   const id = params.id;

// // // //   const [data, setData] = useState<ISanPhamChiTiet | null>(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [saving, setSaving] = useState(false);

// // // //   // Edit mode
// // // //   const [editMode, setEditMode] = useState(false);

// // // //   // Form state
// // // //   const [form, setForm] = useState({
// // // //     ten: '',
// // // //     slug: '',
// // // //     gia_goc: 0,
// // // //     mo_ta: '',
// // // //     phong_cach: '',
// // // //     tag: '',
// // // //     an_hien: true,
// // // //     trang_thai: '',
// // // //     id_danh_muc: 0,

// // // //     // main image: if user selected new file -> hinh_file, else keep hinh (URL)
// // // //     hinh: '',
// // // //     hinh_file: null as File | null,

// // // //     // existing images from DB (objects with id, hinh)
// // // //     hinh_phu_da_co: [] as IHinh[],

// // // //     // new image files selected locally (File[])
// // // //     hinh_phu_moi: [] as File[],

// // // //     // variants
// // // //     bien_the: [] as IBienThe[],
// // // //   });

// // // //   // fetch product detail
// // // //   useEffect(() => {
// // // //     if (!id) return;
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         setLoading(true);
// // // //         const res = await fetch(`${API_BASE}/san_pham/${id}`);
// // // //         if (!res.ok) {
// // // //           console.error('API lỗi:', res.status);
// // // //           setData(null);
// // // //           return;
// // // //         }
// // // //         const json: { success: boolean; data?: ISanPhamChiTiet } =
// // // //           await res.json();
// // // //         if (json.success && json.data) {
// // // //           setData(json.data);
// // // //         } else {
// // // //           setData(null);
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('Fetch lỗi:', error);
// // // //         setData(null);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchData();
// // // //   }, [id]);

// // // //   // populate form when data loaded
// // // //   useEffect(() => {
// // // //     if (!data) return;
// // // //     setForm(f => ({
// // // //       ...f,
// // // //       ten: data.ten,
// // // //       slug: data.slug,
// // // //       gia_goc: data.gia_goc,
// // // //       mo_ta: data.mo_ta ?? '',
// // // //       phong_cach: data.phong_cach ?? '',
// // // //       tag: data.tag ?? '',
// // // //       an_hien: Boolean(data.an_hien),
// // // //       trang_thai: data.trang_thai ?? '',
// // // //       id_danh_muc: (data as any).id_danh_muc ?? (data.danh_muc?.id ?? 0),
// // // //       hinh: data.hinh ?? '',
// // // //       hinh_file: null,
// // // //       hinh_phu_da_co: data.hinh_anh ?? [],
// // // //       hinh_phu_moi: [],
// // // //       bien_the: data.bien_the ?? [],
// // // //     }));
// // // //   }, [data]);

// // // //   // helpers for typesafe event handlers
// // // //   const onInputChange = (
// // // //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// // // //   ) => {
// // // //     const { name, value, type } = e.target as HTMLInputElement;
// // // //     if (type === 'checkbox') {
// // // //       const checked = (e.target as HTMLInputElement).checked;
// // // //       setForm(s => ({ ...s, [name]: checked } as any));
// // // //       return;
// // // //     }
// // // //     setForm(s => ({ ...s, [name]: value } as any));
// // // //   };

// // // //   function onNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
// // // //     const { name, value } = e.target;
// // // //     const num = value === '' ? 0 : Number(value);
// // // //     setForm(s => ({ ...s, [name]: num } as any));
// // // //   }

// // // //   // main image file select
// // // //   function handleMainImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
// // // //     const file = e.target.files?.[0] ?? null;
// // // //     if (!file) return;
// // // //     // preview using object URL
// // // //     const url = URL.createObjectURL(file);
// // // //     setForm(s => ({ ...s, hinh_file: file, hinh: url } as any));
// // // //   }

// // // //   // add new supplementary images (multiple)
// // // //   function handleAddSupplementaryImages(e: React.ChangeEvent<HTMLInputElement>) {
// // // //     const files = Array.from(e.target.files ?? []);
// // // //     if (files.length === 0) return;
// // // //     setForm(s => ({ ...s, hinh_phu_moi: [...s.hinh_phu_moi, ...files] }));
// // // //   }

// // // //   // remove an existing supplementary image (mark removed by filtering from hinh_phu_da_co)
// // // //   function handleRemoveExistingSupplementary(idImg: number) {
// // // //     setForm(s => ({
// // // //       ...s,
// // // //       hinh_phu_da_co: s.hinh_phu_da_co.filter(h => h.id !== idImg),
// // // //     }));
// // // //   }

// // // //   // remove a newly added supplementary file (by index)
// // // //   function handleRemoveNewSupplementary(idx: number) {
// // // //     setForm(s => ({
// // // //       ...s,
// // // //       hinh_phu_moi: s.hinh_phu_moi.filter((_, i) => i !== idx),
// // // //     }));
// // // //   }

// // // //   // VARIANTS: add new variant
// // // //   function addVariant() {
// // // //     setForm(s => ({
// // // //       ...s,
// // // //       bien_the: [
// // // //         ...s.bien_the,
// // // //         { id: Date.now(), ten: '', gia_them: null, trang_thai: true } as IBienThe,
// // // //       ],
// // // //     }));
// // // //   }

// // // //   // VARIANTS: update variant field
// // // //   function updateVariant(index: number, patch: Partial<IBienThe>) {
// // // //     setForm(s => {
// // // //       const kop = [...s.bien_the];
// // // //       kop[index] = { ...kop[index], ...patch };
// // // //       return { ...s, bien_the: kop };
// // // //     });
// // // //   }

// // // //   // VARIANTS: remove variant
// // // //   function removeVariant(index: number) {
// // // //     setForm(s => ({
// // // //       ...s,
// // // //       bien_the: s.bien_the.filter((_, i) => i !== index),
// // // //     }));
// // // //   }

// // // //   // utility: convert image URL -> File by fetching blob
// // // //   async function urlToFile(url: string, filename = 'image.jpg') {
// // // //     const res = await fetch(url);
// // // //     const blob = await res.blob();
// // // //     const mime = blob.type || 'image/jpeg';
// // // //     const file = new File([blob], filename, { type: mime });
// // // //     return file;
// // // //   }

// // // //   // SAVE: build FormData and send to PUT API
// // // //   async function handleSave() {
// // // //     if (!id) return;
// // // //     try {
// // // //       setSaving(true);

// // // //       const fd = new FormData();

// // // //       fd.append('ten', form.ten);
// // // //       fd.append('slug', form.slug);
// // // //       fd.append('gia_goc', String(form.gia_goc));
// // // //       fd.append('mo_ta', form.mo_ta);
// // // //       fd.append('phong_cach', form.phong_cach);
// // // //       fd.append('tag', form.tag ?? '');
// // // //       fd.append('an_hien', String(form.an_hien));
// // // //       fd.append('trang_thai', String(form.trang_thai));
// // // //       fd.append('id_danh_muc', String(form.id_danh_muc ?? 0));

// // // //       // main image: if user selected file -> send as hinh_file; else send hinh string (url)
// // // //       if (form.hinh_file) {
// // // //         fd.append('hinh_file', form.hinh_file);
// // // //       } else {
// // // //         fd.append('hinh', form.hinh);
// // // //       }

// // // //       // SUPPLEMENTARY IMAGES:
// // // //       // Server expects files in "hinh_phu". We must send files corresponding to images we want to keep.
// // // //       // Strategy: 1) for existing images kept (form.hinh_phu_da_co), fetch each URL -> blob -> File -> append
// // // //       //           2) for new images (form.hinh_phu_moi) append as-is
// // // //       // Note: if user removed some existing images by removing from hinh_phu_da_co, they won't be included => server will not recreate them.

// // // //       // 1) existing images kept
// // // //       for (let i = 0; i < form.hinh_phu_da_co.length; i++) {
// // // //         const img = form.hinh_phu_da_co[i];
// // // //         try {
// // // //           // create filename from id or last path segment
// // // //           const url = img.hinh ?? '';
// // // //           if (!url) continue;
// // // //           const parts = url.split('/').filter(Boolean);
// // // //           const last = parts[parts.length - 1] || `img_${i}.jpg`;
// // // //           // ensure filename has extension
// // // //           const filename = last.includes('.') ? last : `${last}.jpg`;
// // // //           const file = await urlToFile(url, filename);
// // // //           // append
// // // //           fd.append('hinh_phu', file);
// // // //         } catch (err) {
// // // //           console.warn('Lỗi chuyển url->file cho hình phụ:', img.hinh, err);
// // // //         }
// // // //       }

// // // //       // 2) new images
// // // //       for (let i = 0; i < form.hinh_phu_moi.length; i++) {
// // // //         fd.append('hinh_phu', form.hinh_phu_moi[i]);
// // // //       }

// // // //       // VARIANTS: send as JSON string
// // // //       // Server will destroy & recreate the variants from JSON
// // // //       fd.append('bien_the', JSON.stringify(form.bien_the));

// // // //       // Send to API (no Content-Type header: browser sets multipart/form-data boundary)
// // // //       const res = await fetch(`${API_BASE}/san_pham/${id}`, {
// // // //         method: 'PUT',
// // // //         body: fd,
// // // //       });

// // // //       const json = await res.json();
// // // //       if (json.success) {
// // // //         alert('Lưu thành công!');
// // // //         // reload to fetch fresh data
// // // //         location.reload();
// // // //       } else {
// // // //         console.error('Server trả về lỗi:', json);
// // // //         alert('Lưu thất bại: ' + (json.message ?? 'Unknown'));
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('Lỗi khi lưu:', err);
// // // //       alert('Có lỗi khi lưu sản phẩm. Xem console.');
// // // //     } finally {
// // // //       setSaving(false);
// // // //     }
// // // //   }

// // // //   // cancel edit -> reload data from server (or simply exit edit mode)
// // // //   function handleCancel() {
// // // //     // reset by reloading page to restore original images/variants quickly
// // // //     location.reload();
// // // //   }

// // // //   // UI
// // // //   if (loading) {
// // // //     return <div className="p-6 text-center">Đang tải dữ liệu...</div>;
// // // //   }
// // // //   if (!data) {
// // // //     return (
// // // //       <div className="p-6 text-center text-red-500">
// // // //         Không tìm thấy sản phẩm
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 p-6">
// // // //       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-8 space-y-8">
// // // //         <h1 className="text-3xl font-bold text-center">CHI TIẾT SẢN PHẨM</h1>

// // // //         <div className="flex justify-end">
// // // //           {!editMode ? (
// // // //             <button
// // // //               className="px-4 py-2 bg-blue-600 text-white rounded"
// // // //               onClick={() => setEditMode(true)}
// // // //             >
// // // //               Sửa sản phẩm
// // // //             </button>
// // // //           ) : (
// // // //             <div className="flex gap-2">
// // // //               <button
// // // //                 className="px-4 py-2 bg-gray-600 text-white rounded"
// // // //                 onClick={handleCancel}
// // // //                 disabled={saving}
// // // //               >
// // // //                 Hủy
// // // //               </button>
// // // //               <button
// // // //                 className="px-4 py-2 bg-green-600 text-white rounded"
// // // //                 onClick={handleSave}
// // // //                 disabled={saving}
// // // //               >
// // // //                 {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
// // // //               </button>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* THÔNG TIN CHUNG */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //           {/* Tên */}
// // // //           {!editMode ? (
// // // //             <Info label="Tên sản phẩm" value={data.ten} />
// // // //           ) : (
// // // //             <Field label="Tên sản phẩm">
// // // //               <input
// // // //                 name="ten"
// // // //                 value={form.ten}
// // // //                 onChange={onInputChange}
// // // //                 className="border p-2 w-full rounded"
// // // //               />
// // // //             </Field>
// // // //           )}

// // // //           {/* Slug */}
// // // //           {!editMode ? (
// // // //             <Info label="Slug" value={data.slug} />
// // // //           ) : (
// // // //             <Field label="Slug">
// // // //               <input
// // // //                 name="slug"
// // // //                 value={form.slug}
// // // //                 onChange={onInputChange}
// // // //                 className="border p-2 w-full rounded"
// // // //               />
// // // //             </Field>
// // // //           )}

// // // //           {/* Giá */}
// // // //           {!editMode ? (
// // // //             <Info
// // // //               label="Giá gốc"
// // // //               value={`${Number(data.gia_goc).toLocaleString()} VNĐ`}
// // // //             />
// // // //           ) : (
// // // //             <Field label="Giá gốc">
// // // //               <input
// // // //                 name="gia_goc"
// // // //                 type="number"
// // // //                 value={form.gia_goc}
// // // //                 onChange={onNumberChange}
// // // //                 className="border p-2 w-full rounded"
// // // //               />
// // // //             </Field>
// // // //           )}

// // // //           {/* Danh mục (hiển thị tên, edit dưới dạng id input đơn giản) */}
// // // //           {!editMode ? (
// // // //             <Info label="Danh mục" value={data.danh_muc?.ten ?? '—'} />
// // // //           ) : (
// // // //             <Field label="ID danh mục">
// // // //               <input
// // // //                 name="id_danh_muc"
// // // //                 type="number"
// // // //                 value={form.id_danh_muc}
// // // //                 onChange={onNumberChange}
// // // //                 className="border p-2 w-full rounded"
// // // //               />
// // // //             </Field>
// // // //           )}

// // // //           {!editMode ? (
// // // //             <Info label="Hiển thị" value={data.an_hien ? 'Hiện' : 'Ẩn'} />
// // // //           ) : (
// // // //             <Field label="Hiển thị">
// // // //               <label className="flex items-center gap-2">
// // // //                 <input
// // // //                   name="an_hien"
// // // //                   type="checkbox"
// // // //                   checked={!!form.an_hien}
// // // //                   onChange={e =>
// // // //                     setForm(s => ({ ...s, an_hien: e.target.checked }))
// // // //                   }
// // // //                 />
// // // //                 <span>{form.an_hien ? 'Hiện' : 'Ẩn'}</span>
// // // //               </label>
// // // //             </Field>
// // // //           )}

// // // //           {!editMode ? (
// // // //             <Info label="Trạng thái" value={String(data.trang_thai ?? '—')} />
// // // //           ) : (
// // // //             <Field label="Trạng thái">
// // // //               <input
// // // //                 name="trang_thai"
// // // //                 value={String(form.trang_thai)}
// // // //                 onChange={onInputChange}
// // // //                 className="border p-2 w-full rounded"
// // // //               />
// // // //             </Field>
// // // //           )}

// // // //           {!editMode ? (
// // // //             <Info label="Phong cách" value={data.phong_cach ?? '—'} />
// // // //           ) : (
// // // //             <Field label="Phong cách">
// // // //               <input
// // // //                 name="phong_cach"
// // // //                 value={form.phong_cach}
// // // //                 onChange={onInputChange}
// // // //                 className="border p-2 w-full rounded"
// // // //               />
// // // //             </Field>
// // // //           )}

// // // //           {!editMode ? (
// // // //             <Info label="Tag" value={data.tag ?? '—'} />
// // // //           ) : (
// // // //             <Field label="Tag">
// // // //               <input
// // // //                 name="tag"
// // // //                 value={form.tag}
// // // //                 onChange={onInputChange}
// // // //                 className="border p-2 w-full rounded"
// // // //               />
// // // //             </Field>
// // // //           )}

// // // //           {/* Mô tả */}
// // // //           <div className="md:col-span-2">
// // // //             <p className="font-semibold">Mô tả</p>
// // // //             {!editMode ? (
// // // //               <p className="mt-1 whitespace-pre-line">{data.mo_ta}</p>
// // // //             ) : (
// // // //               <textarea
// // // //                 name="mo_ta"
// // // //                 rows={6}
// // // //                 value={form.mo_ta}
// // // //                 onChange={onInputChange}
// // // //                 className="border p-2 w-full rounded mt-1"
// // // //               />
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {/* HÌNH ẢNH */}
// // // //         <div>
// // // //           <h2 className="text-xl font-semibold mb-4">Hình ảnh</h2>

// // // //           {/* Hình chính */}
// // // //           <div className="mb-4">
// // // //             <p className="font-medium mb-2">Hình chính</p>
// // // //             {!editMode ? (
// // // //               data.hinh && (
// // // //                 <img
// // // //                   src={data.hinh}
// // // //                   className="w-64 rounded border"
// // // //                   alt="Hình chính"
// // // //                 />
// // // //               )
// // // //             ) : (
// // // //               <div>
// // // //                 <input
// // // //                   type="file"
// // // //                   accept="image/*"
// // // //                   onChange={handleMainImageSelect}
// // // //                 />
// // // //                 {form.hinh && (
// // // //                   <img
// // // //                     src={form.hinh}
// // // //                     className="w-64 rounded border mt-3"
// // // //                     alt="Hình chính preview"
// // // //                   />
// // // //                 )}
// // // //                 <p className="text-sm text-gray-500 mt-2">
// // // //                 </p>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {/* Hình phụ */}
// // // //           <div>
// // // //             <p className="font-medium mb-2">Hình phụ</p>

// // // //             {/* existing images from DB (kept) with delete button */}
// // // //             <div className="flex gap-4 flex-wrap">
// // // //               {form.hinh_phu_da_co.map(img => (
// // // //                 <div key={img.id} className="relative">
// // // //                   <img
// // // //                     src={img.hinh}
// // // //                     className="w-32 h-32 object-cover rounded border"
// // // //                     alt={`hinh-phu-${img.id}`}
// // // //                   />
// // // //                   {editMode && (
// // // //                     <button
// // // //                       className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 rounded"
// // // //                       onClick={() => handleRemoveExistingSupplementary(img.id)}
// // // //                     >
// // // //                       X
// // // //                     </button>
// // // //                   )}
// // // //                 </div>
// // // //               ))}

// // // //               {/* new files preview */}
// // // //               {form.hinh_phu_moi.map((f, idx) => (
// // // //                 <div key={idx} className="relative">
// // // //                   <img
// // // //                     src={URL.createObjectURL(f)}
// // // //                     className="w-32 h-32 object-cover rounded border"
// // // //                     alt={`hinh-moi-${idx}`}
// // // //                   />
// // // //                   {editMode && (
// // // //                     <button
// // // //                       className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 rounded"
// // // //                       onClick={() => handleRemoveNewSupplementary(idx)}
// // // //                     >
// // // //                       X
// // // //                     </button>
// // // //                   )}
// // // //                 </div>
// // // //               ))}
// // // //             </div>

// // // //             {editMode && (
// // // //               <div className="mt-3">
// // // //                 <input
// // // //                   type="file"
// // // //                   accept="image/*"
// // // //                   multiple
// // // //                   onChange={handleAddSupplementaryImages}
// // // //                 />
// // // //                 <p className="text-sm text-gray-500 mt-2">
// // // //                 </p>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {/* BIẾN THỂ */}
// // // //         <div>
// // // //           <h2 className="text-xl font-semibold mb-4">Biến thể</h2>

// // // //           {!editMode ? (
// // // //             form.bien_the.length ? (
// // // //               <div className="grid md:grid-cols-3 gap-4">
// // // //                 {form.bien_the.map(bt => (
// // // //                   <div key={(bt as any).id} className="border rounded-lg p-4 space-y-1">
// // // //                     <p className="font-semibold">{bt.ten}</p>
// // // //                     <p>Giá thêm: {bt.gia_them ? Number(bt.gia_them).toLocaleString() + ' VNĐ' : '0 VNĐ'}</p>
// // // //                     <p>Trạng thái: {bt.trang_thai ? 'Bật' : 'Tắt'}</p>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             ) : (
// // // //               <p className="text-gray-500">Không có biến thể</p>
// // // //             )
// // // //           ) : (
// // // //             <div>
// // // //               <div className="space-y-3">
// // // //                 {form.bien_the.map((bt, idx) => (
// // // //                   <div key={(bt as any).id ?? idx} className="border p-3 rounded flex flex-col gap-2">
// // // //                     <div className="flex gap-2">
// // // //                       <input
// // // //                         className="border p-1 flex-1"
// // // //                         value={bt.ten}
// // // //                         onChange={e => updateVariant(idx, { ten: e.target.value })}
// // // //                         placeholder="Tên biến thể"
// // // //                       />
// // // //                       <input
// // // //                         className="border p-1 w-32"
// // // //                         value={bt.gia_them ?? ''}
// // // //                         onChange={e => updateVariant(idx, { gia_them: e.target.value === '' ? null : Number(e.target.value) })}
// // // //                         placeholder="Giá thêm"
// // // //                         type="number"
// // // //                       />
// // // //                       <label className="flex items-center gap-1">
// // // //                         <input
// // // //                           type="checkbox"
// // // //                           checked={!!bt.trang_thai}
// // // //                           onChange={e => updateVariant(idx, { trang_thai: e.target.checked })}
// // // //                         />
// // // //                         <span className="text-sm">Bật</span>
// // // //                       </label>
// // // //                       <button
// // // //                         className="bg-red-600 text-white px-2 rounded"
// // // //                         onClick={() => removeVariant(idx)}
// // // //                       >
// // // //                         Xóa
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>

// // // //               <div className="mt-3">
// // // //                 <button
// // // //                   className="px-3 py-2 bg-blue-600 text-white rounded"
// // // //                   onClick={addVariant}
// // // //                 >
// // // //                   Thêm biến thể
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // /* small helper components */
// // // // function Info({ label, value }: { label: string; value: string | number }) {
// // // //   return (
// // // //     <div>
// // // //       <p className="font-semibold">{label}</p>
// // // //       <p className="mt-1">{String(value)}</p>
// // // //     </div>
// // // //   );
// // // // }
// // // // function Field({ label, children }: { label: string; children: React.ReactNode }) {
// // // //   return (
// // // //     <div>
// // // //       <p className="font-semibold">{label}</p>
// // // //       <div className="mt-1">{children}</div>
// // // //     </div>
// // // //   );
// // // // }
// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { useParams } from "next/navigation";

// // // import { ISanPham, IDanhMuc, IHinh, IBienThe } from "@/app/lib/cautrucdata";

// // // interface ISanPhamChiTiet extends ISanPham {
// // //   danh_muc?: IDanhMuc;
// // //   hinh_anh?: IHinh[];
// // //   bien_the?: IBienThe[];
// // // }

// // // // ===============================================================
// // // // MAIN PAGE
// // // // ===============================================================
// // // export default function ChiTietSanPhamPage() {
// // //   const params = useParams<{ id: string }>();
// // //   const id = params.id;

// // //   const [data, setData] = useState<ISanPhamChiTiet | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   const [editMode, setEditMode] = useState(false);

// // //   // ================= FORM ================
// // //   const [form, setForm] = useState({
// // //     ten: "",
// // //     slug: "",
// // //     gia_goc: 0,
// // //     mo_ta: "",
// // //     phong_cach: "",
// // //     tag: "",
// // //     hinh: "", // Hình chính
// // //     hinh_chinh_file: null as File | null,

// // //     hinh_phu: [] as File[], // file upload
// // //     hinh_phu_preview: [] as string[], // preview
// // //   });

// // //   // ===============================================================
// // //   // FETCH DATA
// // //   // ===============================================================
// // //   useEffect(() => {
// // //     if (!id) return;

// // //     const fetchData = async () => {
// // //       try {
// // //         const res = await fetch(`http://localhost:3002/api/san_pham/${id}`);
// // //         const json = await res.json();

// // //         if (json.success && json.data) setData(json.data);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [id]);

// // //   // ===============================================================
// // //   // FILL FORM
// // //   // ===============================================================
// // //   useEffect(() => {
// // //     if (data) {
// // //       setForm((prev) => ({
// // //         ...prev,
// // //         ten: data.ten,
// // //         slug: data.slug,
// // //         gia_goc: data.gia_goc,
// // //         mo_ta: data.mo_ta || "",
// // //         phong_cach: data.phong_cach || "",
// // //         tag: data.tag || "",
// // //         hinh: data.hinh || "",

// // //         hinh_phu_preview: data.hinh_anh?.map((h) => h.hinh ?? "") ?? [],
// // //       }));
// // //     }
// // //   }, [data]);

// // //   // ===============================================================
// // //   // SAVE UPDATE (PUT FORM-DATA)
// // //   // ===============================================================
// // //   async function handleSave() {
// // //     const fd = new FormData();

// // //     fd.append("ten", form.ten);
// // //     fd.append("slug", form.slug);
// // //     fd.append("gia_goc", String(form.gia_goc));
// // //     fd.append("mo_ta", form.mo_ta);
// // //     fd.append("phong_cach", form.phong_cach);
// // //     fd.append("tag", form.tag);

// // //     // Hình chính
// // //     if (form.hinh_chinh_file) {
// // //       fd.append("hinh_file", form.hinh_chinh_file);
// // //     } else {
// // //       fd.append("hinh", form.hinh);
// // //     }

// // //     // Hình phụ
// // //     form.hinh_phu.forEach((file) => {
// // //       fd.append("hinh_phu", file);
// // //     });

// // //     // Biến thể
// // //     fd.append("bien_the", JSON.stringify(data?.bien_the ?? []));

// // //     const res = await fetch(`http://localhost:3002/api/san_pham/${id}`, {
// // //       method: "PUT",
// // //       body: fd,
// // //     });

// // //     const json = await res.json();

// // //     if (json.success) {
// // //       alert("Lưu thành công!");
// // //       location.reload();
// // //     } else {
// // //       alert("Lỗi khi lưu!");
// // //     }
// // //   }

// // //   // ===============================================================
// // //   // RENDER
// // //   // ===============================================================
// // //   if (loading) return <div className="p-6">Đang tải...</div>;
// // //   if (!data) return <div className="p-6 text-red-600">Không tìm thấy</div>;

// // //   return (
// // //     <div className="p-6 max-w-5xl mx-auto">
// // //       <h1 className="text-3xl font-bold mb-6 text-center">
// // //         Chi tiết sản phẩm
// // //       </h1>

// // //       <div className="bg-white p-6 rounded-xl shadow space-y-6">
// // //         {/* ================= FORM INFO ================= */}
// // //         <div className="grid md:grid-cols-2 gap-4">
// // //           <Input
// // //             label="Tên"
// // //             value={form.ten}
// // //             onChange={(e) => setForm({ ...form, ten: e.target.value })}
// // //           />

// // //           <Input
// // //             label="Slug"
// // //             value={form.slug}
// // //             onChange={(e) => setForm({ ...form, slug: e.target.value })}
// // //           />

// // //           <Input
// // //             label="Giá gốc"
// // //             type="number"
// // //             value={form.gia_goc}
// // //             onChange={(e) =>
// // //               setForm({ ...form, gia_goc: Number(e.target.value) })
// // //             }
// // //           />

// // //           <Input
// // //             label="Phong cách"
// // //             value={form.phong_cach}
// // //             onChange={(e) =>
// // //               setForm({ ...form, phong_cach: e.target.value })
// // //             }
// // //           />

// // //           <Input
// // //             label="Tag"
// // //             value={form.tag}
// // //             onChange={(e) => setForm({ ...form, tag: e.target.value })}
// // //           />
// // //         </div>

// // //         {/* ================= MÔ TẢ ================= */}
// // //         <div>
// // //           <p className="font-semibold mb-1">Mô tả</p>
// // //           <textarea
// // //             rows={4}
// // //             className="border p-2 rounded w-full"
// // //             value={form.mo_ta}
// // //             onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
// // //           />
// // //         </div>

// // //         {/* ================= HÌNH CHÍNH ================= */}
// // //         <div>
// // //           <h2 className="font-semibold mb-2">Hình chính</h2>

// // //           <input
// // //             type="file"
// // //             onChange={(e) => {
// // //               const file = e.target.files?.[0];
// // //               if (!file) return;
// // //               setForm({
// // //                 ...form,
// // //                 hinh_chinh_file: file,
// // //                 hinh: URL.createObjectURL(file),
// // //               });
// // //             }}
// // //           />

// // //           {form.hinh && (
// // //             <img
// // //               src={form.hinh ?? ""}
// // //               className="w-40 mt-3 border rounded"
// // //               alt="Hình chính"
// // //             />
// // //           )}
// // //         </div>

// // //         {/* ================= HÌNH PHỤ ================= */}
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
// // //                 hinh_phu_preview: [
// // //                   ...form.hinh_phu_preview,
// // //                   ...files.map((f) => URL.createObjectURL(f)),
// // //                 ],
// // //               });
// // //             }}
// // //           />

// // //           <div className="flex gap-3 mt-3 flex-wrap">
// // //             {form.hinh_phu_preview.map((src, i) => (
// // //               <div key={i} className="relative">
// // //                 <img
// // //                   src={src ?? ""}
// // //                   className="w-24 h-24 object-cover border rounded"
// // //                 />
// // //                 <button
// // //                   onClick={() => {
// // //                     const newPrev = [...form.hinh_phu_preview];
// // //                     const newFiles = [...form.hinh_phu];
// // //                     newPrev.splice(i, 1);
// // //                     newFiles.splice(i, 1);
// // //                     setForm({
// // //                       ...form,
// // //                       hinh_phu_preview: newPrev,
// // //                       hinh_phu: newFiles,
// // //                     });
// // //                   }}
// // //                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
// // //                 >
// // //                   ✕
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* ================= BUTTON ================= */}
// // //         <div className="text-center pt-4">
// // //           <button
// // //             className="px-5 py-2 bg-green-600 text-white rounded"
// // //             onClick={handleSave}
// // //           >
// // //             Lưu thay đổi
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // ===============================================================
// // // // COMPONENT INPUT
// // // // ===============================================================
// // // function Input({
// // //   label,
// // //   value,
// // //   type = "text",
// // //   onChange,
// // // }: {
// // //   label: string;
// // //   value: any;
// // //   type?: string;
// // //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // // }) {
// // //   return (
// // //     <div>
// // //       <p className="font-semibold">{label}</p>
// // //       <input
// // //         type={type}
// // //         value={value}
// // //         onChange={onChange}
// // //         className="border p-2 w-full rounded mt-1"
// // //       />
// // //     </div>
// // //   );
// // // // }
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
// // //   const id = params.id;

// // //   const [data, setData] = useState<ISanPhamChiTiet | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   const [form, setForm] = useState({
// // //     ten: "",
// // //     slug: "",
// // //     gia_goc: 0,
// // //     mo_ta: "",
// // //     phong_cach: "",
// // //     tag: "",
// // //     hinh: "", // URL Cloudinary
// // //     hinh_chinh_file: null as File | null,

// // //     hinh_phu: [] as File[],
// // //     hinh_phu_preview: [] as string[],
// // //   });

// // //   // ====================== FETCH DATA ======================
// // //   useEffect(() => {
// // //     if (!id) return;

// // //     const fetchData = async () => {
// // //       try {
// // //         const res = await fetch(`http://localhost:3002/api/san_pham/${id}`);
// // //         const json = await res.json();

// // //         if (json.success && json.data) setData(json.data);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [id]);

// // //   // ====================== FILL FORM ======================
// // //   useEffect(() => {
// // //     if (data) {
// // //       setForm((prev) => ({
// // //         ...prev,
// // //         ten: data.ten,
// // //         slug: data.slug,
// // //         gia_goc: data.gia_goc,
// // //         mo_ta: data.mo_ta || "",
// // //         phong_cach: data.phong_cach || "",
// // //         tag: data.tag || "",
// // //         hinh: data.hinh || "",

// // //         hinh_phu_preview:
// // //           data.hinh_anh?.map((h) => h.hinh ?? "").filter(Boolean) ?? [],
// // //       }));
// // //     }
// // //   }, [data]);

// // //   // ====================== SAVE ======================
// // //   async function handleSave() {
// // //     const fd = new FormData();

// // //     fd.append("ten", form.ten);
// // //     fd.append("slug", form.slug);
// // //     fd.append("gia_goc", String(form.gia_goc));
// // //     fd.append("mo_ta", form.mo_ta);
// // //     fd.append("phong_cach", form.phong_cach);
// // //     fd.append("tag", form.tag);

// // //     // Hình chính
// // //     if (form.hinh_chinh_file) {
// // //       fd.append("hinh_file", form.hinh_chinh_file);
// // //     } else {
// // //       fd.append("hinh", form.hinh); // URL Cloudinary (không đổi)
// // //     }

// // //     // Hình phụ mới upload
// // //     form.hinh_phu.forEach((file) => {
// // //       fd.append("hinh_phu", file);
// // //     });

// // //     // Biến thể giữ nguyên (chưa có UI chỉnh)
// // //     fd.append("bien_the", JSON.stringify(data?.bien_the ?? []));

// // //     const res = await fetch(`http://localhost:3002/api/san_pham/${id}`, {
// // //       method: "PUT",
// // //       body: fd,
// // //     });

// // //     const json = await res.json();

// // //     if (json.success) {
// // //       alert("Lưu thành công!");
// // //       location.reload();
// // //     } else {
// // //       alert("Lỗi khi lưu: " + json.message);
// // //     }
// // //   }

// // //   // ====================== RENDER ======================
// // //   if (loading) return <div className="p-6">Đang tải...</div>;
// // //   if (!data) return <div className="p-6 text-red-600">Không tìm thấy</div>;

// // //   return (
// // //     <div className="p-6 max-w-5xl mx-auto">
// // //       <h1 className="text-3xl font-bold mb-6 text-center">
// // //         Chi tiết sản phẩm
// // //       </h1>

// // //       <div className="bg-white p-6 rounded-xl shadow space-y-6">
// // //         {/* ================= FORM INFO ================= */}
// // //         <div className="grid md:grid-cols-2 gap-4">
// // //           <Input
// // //             label="Tên"
// // //             value={form.ten}
// // //             onChange={(e) => setForm({ ...form, ten: e.target.value })}
// // //           />

// // //           <Input
// // //             label="Slug"
// // //             value={form.slug}
// // //             onChange={(e) => setForm({ ...form, slug: e.target.value })}
// // //           />

// // //           <Input
// // //             label="Giá gốc"
// // //             type="number"
// // //             value={form.gia_goc}
// // //             onChange={(e) =>
// // //               setForm({ ...form, gia_goc: Number(e.target.value) })
// // //             }
// // //           />

// // //           <Input
// // //             label="Phong cách"
// // //             value={form.phong_cach}
// // //             onChange={(e) => setForm({ ...form, phong_cach: e.target.value })}
// // //           />

// // //           <Input
// // //             label="Tag"
// // //             value={form.tag}
// // //             onChange={(e) => setForm({ ...form, tag: e.target.value })}
// // //           />
// // //         </div>

// // //         {/* ================= MÔ TẢ ================= */}
// // //         <div>
// // //           <p className="font-semibold mb-1">Mô tả</p>
// // //           <textarea
// // //             rows={4}
// // //             className="border p-2 rounded w-full"
// // //             value={form.mo_ta}
// // //             onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
// // //           />
// // //         </div>

// // //         {/* ================= HÌNH CHÍNH ================= */}
// // //         <div>
// // //           <h2 className="font-semibold mb-2">Hình chính</h2>

// // //           <input
// // //             type="file"
// // //             onChange={(e) => {
// // //               const file = e.target.files?.[0];
// // //               if (!file) return;
// // //               setForm({
// // //                 ...form,
// // //                 hinh_chinh_file: file,
// // //                 hinh: URL.createObjectURL(file),
// // //               });
// // //             }}
// // //           />

// // //           {form.hinh ? (
// // //             <img
// // //               src={form.hinh}
// // //               className="w-40 mt-3 border rounded"
// // //               alt="Hình chính"
// // //             />
// // //           ) : null}
// // //         </div>

// // //         {/* ================= HÌNH PHỤ ================= */}
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
// // //                 hinh_phu_preview: [
// // //                   ...form.hinh_phu_preview,
// // //                   ...files.map((f) => URL.createObjectURL(f)),
// // //                 ],
// // //               });
// // //             }}
// // //           />

// // //           <div className="flex gap-3 mt-3 flex-wrap">
// // //             {form.hinh_phu_preview.map((src, i) => (
// // //               <div key={i} className="relative">
// // //                 <img
// // //                   src={src}
// // //                   className="w-24 h-24 object-cover border rounded"
// // //                 />
// // //                 <button
// // //                   onClick={() => {
// // //                     const newPrev = [...form.hinh_phu_preview];
// // //                     const newFiles = [...form.hinh_phu];
// // //                     newPrev.splice(i, 1);
// // //                     newFiles.splice(i, 1);
// // //                     setForm({
// // //                       ...form,
// // //                       hinh_phu_preview: newPrev,
// // //                       hinh_phu: newFiles,
// // //                     });
// // //                   }}
// // //                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
// // //                 >
// // //                   ✕
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* ================= BUTTON ================= */}
// // //         <div className="text-center pt-4">
// // //           <button
// // //             className="px-5 py-2 bg-green-600 text-white rounded"
// // //             onClick={handleSave}
// // //           >
// // //             Lưu thay đổi
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Input({
// // //   label,
// // //   value,
// // //   type = "text",
// // //   onChange,
// // // }: {
// // //   label: string;
// // //   value: any;
// // //   type?: string;
// // //   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// // // }) {
// // //   return (
// // //     <div>
// // //       <p className="font-semibold">{label}</p>
// // //       <input
// // //         type={type}
// // //         value={value}
// // //         onChange={onChange}
// // //         className="border p-2 w-full rounded mt-1"
// // //       />
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
// //   const id = params.id;

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

// //     hinh_phu: [] as File[],
// //     hinh_phu_preview: [] as string[],
// //   });

// //   // ====================== FETCH DATA ======================
// //   useEffect(() => {
// //     if (!id) return;

// //     const fetchAll = async () => {
// //       try {
// //         const [spRes, dmRes] = await Promise.all([
// //           fetch(`http://localhost:3002/api/san_pham/${id}`),
// //           fetch("http://localhost:3002/api/danh_muc"),
// //         ]);

// //         const spJson = await spRes.json();
// //         const dmJson = await dmRes.json();

// //         if (dmJson.success) setDanhmuc(dmJson.data);

// //         if (spJson.success && spJson.data) setData(spJson.data);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchAll();
// //   }, [id]);

// //   // ====================== FILL FORM ======================
// //   useEffect(() => {
// //     if (data) {
// //       setForm((prev) => ({
// //         ...prev,
// //         ten: data.ten,
// //         slug: data.slug,
// //         gia_goc: data.gia_goc,
// //         mo_ta: data.mo_ta || "",
// //         phong_cach: data.phong_cach || "",
// //         tag: data.tag || "",
// //         id_danh_muc: data.id_danh_muc || 0,
// //         hinh: data.hinh || "",
// //         hinh_phu_preview:
// //           data.hinh_anh?.map((h) => h.hinh ?? "").filter(Boolean) ?? [],
// //       }));
// //     }
// //   }, [data]);

// //   // ====================== SAVE ======================
// //   async function handleSave() {
// //     const fd = new FormData();

// //     fd.append("ten", form.ten);
// //     fd.append("slug", form.slug);
// //     fd.append("gia_goc", String(form.gia_goc));
// //     fd.append("mo_ta", form.mo_ta);
// //     fd.append("phong_cach", form.phong_cach);
// //     fd.append("tag", form.tag);

// //     // BẮT BUỘC — Nếu thiếu sẽ lỗi FOREIGN KEY
// //     fd.append("id_danh_muc", String(form.id_danh_muc));

// //     if (form.hinh_chinh_file) {
// //       fd.append("hinh_file", form.hinh_chinh_file);
// //     } else {
// //       fd.append("hinh", form.hinh);
// //     }

// //     form.hinh_phu.forEach((file) => {
// //       fd.append("hinh_phu", file);
// //     });

// //     fd.append("bien_the", JSON.stringify(data?.bien_the ?? []));

// //     const res = await fetch(`http://localhost:3002/api/san_pham/${id}`, {
// //       method: "PUT",
// //       body: fd,
// //     });

// //     const json = await res.json();

// //     if (json.success) {
// //       alert("Lưu thành công!");
// //       location.reload();
// //     } else {
// //       alert("Lỗi khi lưu: " + json.message);
// //     }
// //   }

// //   // ====================== RENDER ======================
// //   if (loading) return <div className="p-6">Đang tải...</div>;
// //   if (!data) return <div className="p-6 text-red-600">Không tìm thấy</div>;

// //   return (
// //     <div className="p-6 max-w-5xl mx-auto">
// //       <h1 className="text-3xl font-bold mb-6 text-center">
// //         Chi tiết sản phẩm
// //       </h1>

// //       <div className="bg-white p-6 rounded-xl shadow space-y-6">

// //         {/* ================= DANH MỤC ================= */}
// //         <div>
// //           <p className="font-semibold mb-1">Danh mục</p>
// //           <select
// //             className="border p-2 rounded w-full"
// //             value={form.id_danh_muc}
// //             onChange={(e) =>
// //               setForm({ ...form, id_danh_muc: Number(e.target.value) })
// //             }
// //           >
// //             <option value="">-- Chọn danh mục --</option>
// //             {danhmuc.map((dm) => (
// //               <option key={dm.id} value={dm.id}>
// //                 {dm.ten}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* ================= FORM INFO ================= */}
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
// //             onChange={(e) => setForm({ ...form, phong_cach: e.target.value })}
// //           />

// //           <Input
// //             label="Tag"
// //             value={form.tag}
// //             onChange={(e) => setForm({ ...form, tag: e.target.value })}
// //           />
// //         </div>

// //         {/* ================= MÔ TẢ ================= */}
// //         <div>
// //           <p className="font-semibold mb-1">Mô tả</p>
// //           <textarea
// //             rows={4}
// //             className="border p-2 rounded w-full"
// //             value={form.mo_ta}
// //             onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
// //           />
// //         </div>

// //         {/* ================= HÌNH CHÍNH ================= */}
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

// //           {form.hinh ? (
// //             <img
// //               src={form.hinh}
// //               className="w-40 mt-3 border rounded"
// //               alt="Hình chính"
// //             />
// //           ) : null}
// //         </div>

// //         {/* ================= HÌNH PHỤ ================= */}
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
// //                     const newPrev = [...form.hinh_phu_preview];
// //                     const newFiles = [...form.hinh_phu];
// //                     newPrev.splice(i, 1);
// //                     newFiles.splice(i, 1);
// //                     setForm({
// //                       ...form,
// //                       hinh_phu_preview: newPrev,
// //                       hinh_phu: newFiles,
// //                     });
// //                   }}
// //                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
// //                 >
// //                   ✕
// //                 </button>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* ================= BUTTON ================= */}
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
// //   value: any;
// //   type?: string;
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
//   const id = params.id;

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
//   });

//   // ====================== FETCH DATA ======================
//   useEffect(() => {
//     if (!id) return;

//     const fetchAll = async () => {
//       try {
//         const [spRes, dmRes] = await Promise.all([
//           fetch(`http://localhost:3002/api/san_pham/${id}`),
//           fetch("http://localhost:3002/api/danh_muc"),
//         ]);

//         const spJson = await spRes.json();
//         const dmJson = await dmRes.json();

//         if (dmJson.success) setDanhmuc(dmJson.data);

//         if (spJson.success && spJson.data) setData(spJson.data);
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
//           data.hinh_anh?.map((h) => h.hinh || "") ?? [],
//       });
//     }
//   }, [data]);

//   // ====================== HANDLE SAVE ======================
//   async function handleSave() {
//     const fd = new FormData();

//     fd.append("ten", form.ten);
//     fd.append("slug", form.slug);
//     fd.append("gia_goc", String(form.gia_goc));
//     fd.append("mo_ta", form.mo_ta);
//     fd.append("phong_cach", form.phong_cach);
//     fd.append("tag", form.tag);
//     fd.append("id_danh_muc", String(form.id_danh_muc));

//     if (form.hinh_chinh_file) {
//       fd.append("hinh_file", form.hinh_chinh_file);
//     } else {
//       fd.append("hinh", form.hinh);
//     }

//     form.hinh_phu.forEach((file) => {
//       fd.append("hinh_phu", file);
//     });

//     fd.append("bien_the", JSON.stringify(data?.bien_the ?? []));

//     const res = await fetch(`http://localhost:3002/api/san_pham/${id}`, {
//       method: "PUT",
//       body: fd,
//     });

//     const json = await res.json();

//     if (json.success) {
//       alert("Lưu thành công!");
//       location.reload();
//     } else {
//       alert("Lỗi khi lưu: " + json.message);
//     }
//   }

//   // ====================== RENDER ======================
//   if (loading) return <div className="p-6">Đang tải...</div>;
//   if (!data) return <div className="p-6 text-red-600">Không tìm thấy</div>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         Chi tiết sản phẩm
//       </h1>

//       <div className="bg-white p-6 rounded-xl shadow space-y-6">

//         {/* ================= DANH MỤC ================= */}
//         <div>
//           <p className="font-semibold mb-1">Danh mục</p>
//           <select
//             className="border p-2 rounded w-full"
//             value={form.id_danh_muc}
//             onChange={(e) =>
//               setForm({ ...form, id_danh_muc: Number(e.target.value) })
//             }
//           >
//             <option value="">-- Chọn danh mục --</option>
//             {danhmuc.map((dm) => (
//               <option key={dm.id} value={dm.id}>
//                 {dm.ten}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* ================= FORM INFO ================= */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <Input
//             label="Tên"
//             value={form.ten}
//             onChange={(e) => setForm({ ...form, ten: e.target.value })}
//           />

//           <Input
//             label="Slug"
//             value={form.slug}
//             onChange={(e) => setForm({ ...form, slug: e.target.value })}
//           />

//           <Input
//             label="Giá gốc"
//             type="number"
//             value={form.gia_goc}
//             onChange={(e) =>
//               setForm({ ...form, gia_goc: Number(e.target.value) })
//             }
//           />

//           <Input
//             label="Phong cách"
//             value={form.phong_cach}
//             onChange={(e) => setForm({ ...form, phong_cach: e.target.value })}
//           />

//           <Input
//             label="Tag"
//             value={form.tag}
//             onChange={(e) => setForm({ ...form, tag: e.target.value })}
//           />
//         </div>

//         {/* ================= MÔ TẢ ================= */}
//         <div>
//           <p className="font-semibold mb-1">Mô tả</p>
//           <textarea
//             rows={4}
//             className="border p-2 rounded w-full"
//             value={form.mo_ta}
//             onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
//           />
//         </div>

//         {/* ================= HÌNH CHÍNH ================= */}
//         <div>
//           <h2 className="font-semibold mb-2">Hình chính</h2>

//           <input
//             type="file"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (!file) return;

//               setForm({
//                 ...form,
//                 hinh_chinh_file: file,
//                 hinh: URL.createObjectURL(file),
//               });
//             }}
//           />

//           {form.hinh ? (
//             <img
//               src={form.hinh}
//               className="w-40 mt-3 border rounded"
//               alt="Hình chính"
//             />
//           ) : null}
//         </div>

//         {/* ================= HÌNH PHỤ ================= */}
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
//                 hinh_phu_preview: [
//                   ...form.hinh_phu_preview,
//                   ...files.map((f) => URL.createObjectURL(f)),
//                 ],
//               });
//             }}
//           />

//           <div className="flex gap-3 mt-3 flex-wrap">
//             {form.hinh_phu_preview.map((src, i) => (
//               <div key={i} className="relative">
//                 <img
//                   src={src}
//                   className="w-24 h-24 object-cover border rounded"
//                 />
//                 <button
//                   onClick={() => {
//                     const newPrev = [...form.hinh_phu_preview];
//                     const newFiles = [...form.hinh_phu];
//                     newPrev.splice(i, 1);
//                     newFiles.splice(i, 1);
//                     setForm({
//                       ...form,
//                       hinh_phu_preview: newPrev,
//                       hinh_phu: newFiles,
//                     });
//                   }}
//                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ================= BUTTON ================= */}
//         <div className="text-center pt-4">
//           <button
//             className="px-5 py-2 bg-green-600 text-white rounded"
//             onClick={handleSave}
//           >
//             Lưu thay đổi
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ================= INPUT COMPONENT =================
// function Input({
//   label,
//   value,
//   type = "text",
//   onChange,
// }: {
//   label: string;
//   value: any;
//   type?: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }) {
//   return (
//     <div>
//       <p className="font-semibold">{label}</p>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="border p-2 w-full rounded mt-1"
//       />
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
  const id = params.id;

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

    hinh_phu: [] as File[],           // chỉ chứa file mới
    hinh_phu_preview: [] as string[], // chứa link hiển thị
  });

  // ====================== FETCH DATA ======================
  useEffect(() => {
    if (!id) return;

    const fetchAll = async () => {
      try {
        const [spRes, dmRes] = await Promise.all([
          fetch(`http://localhost:3002/api/san_pham/${id}`),
          fetch("http://localhost:3002/api/danh_muc"),
        ]);

        const spJson = await spRes.json();
        const dmJson = await dmRes.json();

        if (dmJson.success) setDanhmuc(dmJson.data);

        if (spJson.success && spJson.data) setData(spJson.data);
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
        data.hinh_anh
          ?.map((h) => h.hinh)
          .filter((x): x is string => typeof x === "string") ?? [],
    });
  }
}, [data]);


 // ====================== HANDLE SAVE ======================
async function handleSave() {
  try {
    const fd = new FormData();

    // ----- Thông tin sản phẩm -----
    fd.append("ten", form.ten);
    fd.append("slug", form.slug);
    fd.append("gia_goc", String(form.gia_goc));
    fd.append("mo_ta", form.mo_ta);
    fd.append("phong_cach", form.phong_cach);
    fd.append("tag", form.tag);
    fd.append("id_danh_muc", String(form.id_danh_muc));

    // ----- Hình chính -----
    if (form.hinh_chinh_file) {
      fd.append("hinh_file", form.hinh_chinh_file);
    } else if (form.hinh) {
      fd.append("hinh", form.hinh);
    }

    // ----- Hình phụ -----
    // Nếu người dùng chọn file mới → upload file mới
    if (form.hinh_phu.length > 0) {
      form.hinh_phu.forEach((file) => fd.append("hinh_phu", file));
    } else {
      // Nếu không có file mới → gửi các URL cũ để giữ nguyên
      form.hinh_phu_preview.forEach((url) => fd.append("hinh_phu", url));
    }

    // ----- Biến thể -----
    fd.append("bien_the", JSON.stringify(data?.bien_the ?? []));

    // ----- Gửi request -----
    const res = await fetch(`http://localhost:3002/api/san_pham/${id}`, {
      method: "PUT",
      body: fd,
    });

    const json = await res.json();

    if (json.success) {
      alert("✅ Cập nhật thành công!");
      // Reload lại dữ liệu thay vì reload cả page
      const spRes = await fetch(`http://localhost:3002/api/san_pham/${id}`);
      const spJson = await spRes.json();
      if (spJson.success && spJson.data) setData(spJson.data);
    } else {
      alert("⚠ Lỗi khi lưu: " + json.message);
    }
  } catch (err: any) {
    console.error("HANDLE SAVE ERROR:", err);
    alert("⚠ Lỗi khi lưu: " + (err.message || err));
  }
}


  // ====================== RENDER ======================
  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!data) return <div className="p-6 text-red-600">Không tìm thấy</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Chi tiết sản phẩm
      </h1>

      <div className="bg-white p-6 rounded-xl shadow space-y-6">

        {/* ================= DANH MỤC ================= */}
        <div>
          <p className="font-semibold mb-1">Danh mục</p>
          <select
            className="border p-2 rounded w-full"
            value={form.id_danh_muc}
            onChange={(e) =>
              setForm({ ...form, id_danh_muc: Number(e.target.value) })
            }
          >
            <option value="">-- Chọn danh mục --</option>
            {danhmuc.map((dm) => (
              <option key={dm.id} value={dm.id}>
                {dm.ten}
              </option>
            ))}
          </select>
        </div>

        {/* ================= FORM INFO ================= */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Tên"
            value={form.ten}
            onChange={(e) => setForm({ ...form, ten: e.target.value })}
          />

          <Input
            label="Slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />

          <Input
            label="Giá gốc"
            type="number"
            value={form.gia_goc}
            onChange={(e) =>
              setForm({ ...form, gia_goc: Number(e.target.value) })
            }
          />

          <Input
            label="Phong cách"
            value={form.phong_cach}
            onChange={(e) => setForm({ ...form, phong_cach: e.target.value })}
          />

          <Input
            label="Tag"
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
          />
        </div>

        {/* ================= MÔ TẢ ================= */}
        <div>
          <p className="font-semibold mb-1">Mô tả</p>
          <textarea
            rows={4}
            className="border p-2 rounded w-full"
            value={form.mo_ta}
            onChange={(e) => setForm({ ...form, mo_ta: e.target.value })}
          />
        </div>

        {/* ================= HÌNH CHÍNH ================= */}
        <div>
          <h2 className="font-semibold mb-2">Hình chính</h2>

          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              setForm({
                ...form,
                hinh_chinh_file: file,
                hinh: URL.createObjectURL(file),
              });
            }}
          />

          {form.hinh ? (
            <img
              src={form.hinh}
              className="w-40 mt-3 border rounded"
              alt="Hình chính"
            />
          ) : null}
        </div>

        {/* ================= HÌNH PHỤ ================= */}
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
                hinh_phu_preview: [
                  ...form.hinh_phu_preview,
                  ...files.map((f) => URL.createObjectURL(f)),
                ],
              });
            }}
          />

          <div className="flex gap-3 mt-3 flex-wrap">
            {form.hinh_phu_preview.map((src, i) => (
              <div key={i} className="relative">
                <img
                  src={src}
                  className="w-24 h-24 object-cover border rounded"
                />
                <button
                  onClick={() => {
                    const newPrev = [...form.hinh_phu_preview];
                    const newFiles = [...form.hinh_phu];
                    newPrev.splice(i, 1);
                    newFiles.splice(i, 1);
                    setForm({
                      ...form,
                      hinh_phu_preview: newPrev,
                      hinh_phu: newFiles,
                    });
                  }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= BUTTON ================= */}
        <div className="text-center pt-4">
          <button
            className="px-5 py-2 bg-green-600 text-white rounded"
            onClick={handleSave}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= INPUT COMPONENT =================
function Input({
  label,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  value: any;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <p className="font-semibold">{label}</p>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border p-2 w-full rounded mt-1"
      />
    </div>
  );
}
