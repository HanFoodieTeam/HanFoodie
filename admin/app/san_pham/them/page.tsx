// // // // // 'use client';

// // // // // import { useEffect, useState, ChangeEvent } from 'react';
// // // // // import { IDanhMuc, IBienThe, ISanPham } from '@/app/lib/cautrucdata';

// // // // // export default function ThemSanPhamPage() {
// // // // //   const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
// // // // //   const [bienThe, setBienThe] = useState<IBienThe[]>([]);

// // // // //   const [form, setForm] = useState<Omit<ISanPham, 'id'>>({
// // // // //     ten: '',
// // // // //     slug: '',
// // // // //     gia_goc: 0,
// // // // //     mo_ta: '',
// // // // //     an_hien: true,
// // // // //     tag: '',
// // // // //     phong_cach: '',
// // // // //     trang_thai: 'active',
// // // // //     id_danh_muc: 0,
// // // // //     hinh: null,
// // // // //     luot_xem: 0,
// // // // //   });

// // // // //   const [hinhChinh, setHinhChinh] = useState<File | null>(null);
// // // // //   const [hinhPhu, setHinhPhu] = useState<File[]>([]);

// // // // //   useEffect(() => {
// // // // //     const fetchDanhMuc = async () => {
// // // // //       const res = await fetch('/api/danh_muc');
// // // // //       const data: { data?: IDanhMuc[] } = await res.json();
// // // // //       setDanhMuc(data.data ?? []);
// // // // //     };

// // // // //     fetchDanhMuc();
// // // // //   }, []);

// // // // //   // ================= ON CHANGE =================
// // // // //   const onChange = (
// // // // //     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
// // // // //   ) => {
// // // // //     const target = e.target;
// // // // //     const name = target.name as keyof typeof form;

// // // // //     let value: any = target.value;

// // // // //     if (target instanceof HTMLInputElement && target.type === 'checkbox') {
// // // // //       value = target.checked;
// // // // //     }

// // // // //     if (name === 'gia_goc' || name === 'id_danh_muc') {
// // // // //       value = Number(value);
// // // // //     }

// // // // //     setForm(prev => ({ ...prev, [name]: value }));
// // // // //   };

// // // // //   // ================= BIẾN THỂ =================
// // // // //   const themBienThe = () => {
// // // // //     setBienThe(prev => [
// // // // //       ...prev,
// // // // //       {
// // // // //         id: 0, // ✅ TẠM
// // // // //         ten: '',
// // // // //         trang_thai: true,
// // // // //         gia_them: null,
// // // // //         id_san_pham: 0, // ✅ TẠM
// // // // //       },
// // // // //     ]);
// // // // //   };

// // // // //   const suaBienThe = <K extends keyof IBienThe>(
// // // // //     index: number,
// // // // //     key: K,
// // // // //     value: IBienThe[K]
// // // // //   ) => {
// // // // //     setBienThe(prev =>
// // // // //       prev.map((item, i) =>
// // // // //         i === index ? { ...item, [key]: value } : item
// // // // //       )
// // // // //     );
// // // // //   };

// // // // //   const xoaBienThe = (index: number) => {
// // // // //     setBienThe(prev => prev.filter((_, i) => i !== index));
// // // // //   };

// // // // //   // ================= SUBMIT =================
// // // // // const submit = async () => {
// // // // //   try {
// // // // //     const fd = new FormData();

// // // // //     // 🔥 Gửi toàn bộ dữ liệu sản phẩm (TRỪ HÌNH)
// // // // //     Object.entries(form).forEach(([key, value]) => {
// // // // //       if (key !== "hinh") {   // ❗ Không append hinh ở đây
// // // // //         fd.append(key, String(value ?? ""));
// // // // //       }
// // // // //     });

// // // // //     // 🔥 Gửi hình chính đúng cách
// // // // //     if (hinhChinh) {
// // // // //       fd.append("hinh", hinhChinh); // ❗ KEY ĐÚNG
// // // // //     } else {
// // // // //       alert("Bạn chưa chọn hình chính!");
// // // // //       return;
// // // // //     }

// // // // //     // 🔥 Gửi hình phụ
// // // // //     hinhPhu.forEach((file) => fd.append("hinh_phu", file));

// // // // //     // 🔥 Gửi biến thể
// // // // //     fd.append("bien_the", JSON.stringify(bienThe));

// // // // //     // Gửi API
// // // // //     const res = await fetch("/api/san_pham", {
// // // // //       method: "POST",
// // // // //       body: fd,
// // // // //     });

// // // // //     const data = await res.json();
// // // // //     console.log("KQ thêm SP:", data);

// // // // //     alert(data.success ? " Thêm thành công!" : " Thêm thất bại!");
// // // // //   } catch (error) {
// // // // //     console.error(" Lỗi submit:", error);
// // // // //     alert("Lỗi server!");
// // // // //   }
// // // // // };


// // // // //   return (
// // // // //   <div className="min-h-screen bg-gray-50 py-10 px-6">
// // // // //     <div className="max-w-6xl mx-auto bg-white rounded-xl shadow px-10 py-10 space-y-10">

// // // // //       {/* TIÊU ĐỀ */}
// // // // //       <h1 className="text-4xl font-bold text-center tracking-wide">
// // // // //         THÊM SẢN PHẨM
// // // // //       </h1>

// // // // //       {/* FORM GRID 2 CỘT */}
// // // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

// // // // //         {/* TÊN SẢN PHẨM */}
// // // // //         <div>
// // // // //           <label className="block font-semibold mb-2">Tên sản phẩm</label>
// // // // //           <input
// // // // //             name="ten"
// // // // //             onChange={onChange}
// // // // //             placeholder="VD: Gà rán, Trà sữa..."
// // // // //             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
// // // // //           />
// // // // //         </div>

// // // // //         {/* GIÁ GỐC */}
// // // // //         <div>
// // // // //           <label className="block font-semibold mb-2">Giá gốc (VNĐ)</label>
// // // // //           <input
// // // // //             type="number"
// // // // //             name="gia_goc"
// // // // //             value={form.gia_goc}
// // // // //             onChange={onChange}
// // // // //             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
// // // // //           />
// // // // //         </div>

// // // // //         {/* SLUG */}
// // // // //         <div>
// // // // //           <label className="block font-semibold mb-2">Slug</label>
// // // // //           <input
// // // // //             name="slug"
// // // // //             onChange={onChange}
// // // // //             placeholder="ga-ran"
// // // // //             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
// // // // //           />
// // // // //         </div>

// // // // //         {/* DANH MỤC */}
// // // // //         <div>
// // // // //           <label className="block font-semibold mb-2">Danh mục</label>
// // // // //           <select
// // // // //             name="id_danh_muc"
// // // // //             value={form.id_danh_muc}
// // // // //             onChange={onChange}
// // // // //             className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-black"
// // // // //           >
// // // // //             <option value={0}>-- Chọn danh mục --</option>
// // // // //             {danhMuc.map(dm => (
// // // // //   <option key={dm.id} value={dm.id}>
// // // // //     {dm.id}
// // // // //   </option>
// // // // // ))}

// // // // //           </select>
// // // // //         </div>

// // // // //         {/* MÔ TẢ */}
// // // // //         <div className="md:col-span-2">
// // // // //           <label className="block font-semibold mb-2">Mô tả</label>
// // // // //           <textarea
// // // // //             name="mo_ta"
// // // // //             rows={4}
// // // // //             onChange={onChange}
// // // // //             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
// // // // //           />
// // // // //         </div>

// // // // //         {/* TRẠNG THÁI */}
// // // // //         <div>
// // // // //           <label className="block font-semibold mb-2">Trạng thái</label>
// // // // //           <div className="flex items-center gap-8 mt-2">
// // // // //             <label className="flex items-center gap-2">
// // // // //               <input
// // // // //                 type="radio"
// // // // //                 checked={form.an_hien === true}
// // // // //                 onChange={() => setForm(p => ({ ...p, an_hien: true }))}
// // // // //               />
// // // // //               Hiện
// // // // //             </label>

// // // // //             <label className="flex items-center gap-2">
// // // // //               <input
// // // // //                 type="radio"
// // // // //                 checked={form.an_hien === false}
// // // // //                 onChange={() => setForm(p => ({ ...p, an_hien: false }))}
// // // // //               />
// // // // //               Ẩn
// // // // //             </label>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* PHONG CÁCH */}
// // // // //         <div>
// // // // //           <label className="block font-semibold mb-2">Phong cách</label>
// // // // //           <input
// // // // //             name="phong_cach"
// // // // //             onChange={onChange}
// // // // //             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
// // // // //           />
// // // // //         </div>

// // // // //         {/* TAG */}
// // // // //         <div>
// // // // //           <label className="block font-semibold mb-2">Tag</label>
// // // // //           <input
// // // // //             name="tag"
// // // // //             onChange={onChange}
// // // // //             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
// // // // //           />
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* ================= HÌNH ẢNH ================= */}
// // // // // <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  
// // // // //   {/* Hình chính */}
// // // // //   <div>
// // // // //     <label className="block font-semibold mb-2">Hình chính</label>

// // // // //     <input
// // // // //       type="file"
// // // // //       onChange={e => setHinhChinh(e.target.files?.[0] ?? null)}
// // // // //     />

// // // // //     {/* 🔥 PREVIEW HÌNH CHÍNH */}
// // // // //     {hinhChinh && (
// // // // //       <img
// // // // //         src={URL.createObjectURL(hinhChinh)}
// // // // //         className="w-40 mt-3 rounded-lg shadow"
// // // // //       />
// // // // //     )}
// // // // //   </div>

// // // // //   {/* Hình phụ */}
// // // // //   <div>
// // // // //     <label className="block font-semibold mb-2">Hình phụ</label>

// // // // //     <input
// // // // //       type="file"
// // // // //       multiple
// // // // //       onChange={e => setHinhPhu(Array.from(e.target.files ?? []))}
// // // // //     />

// // // // //     {/* 🔥 PREVIEW HÌNH PHỤ */}
// // // // //     {hinhPhu.length > 0 && (
// // // // //       <div className="flex flex-wrap gap-3 mt-3">
// // // // //         {hinhPhu.map((file, i) => (
// // // // //           <img
// // // // //             key={i}
// // // // //             src={URL.createObjectURL(file)}
// // // // //             className="w-28 h-28 object-cover rounded-lg shadow"
// // // // //           />
// // // // //         ))}
// // // // //       </div>
// // // // //     )}
// // // // //   </div>
// // // // // </div>


// // // // //       {/* ================= BIẾN THỂ ================= */}
// // // // //       <div className="space-y-5">
// // // // //         <h2 className="text-2xl font-semibold">Biến thể</h2>

// // // // //         {bienThe.map((bt, i) => (
// // // // //           <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //             <input
// // // // //               className="border rounded-lg px-4 py-2"
// // // // //               placeholder="Tên biến thể"
// // // // //               value={bt.ten}
// // // // //               onChange={e => suaBienThe(i, 'ten', e.target.value)}
// // // // //             />

// // // // //             <input
// // // // //               className="border rounded-lg px-4 py-2"
// // // // //               type="number"
// // // // //               placeholder="Giá thêm"
// // // // //               value={bt.gia_them ?? ''}
// // // // //               onChange={e =>
// // // // //                 suaBienThe(
// // // // //                   i,
// // // // //                   'gia_them',
// // // // //                   e.target.value === '' ? null : Number(e.target.value)
// // // // //                 )
// // // // //               }
// // // // //             />

// // // // //             <label className="flex items-center gap-2">
// // // // //               <input
// // // // //                 type="checkbox"
// // // // //                 checked={bt.trang_thai}
// // // // //                 onChange={e =>
// // // // //                   suaBienThe(i, 'trang_thai', e.target.checked)
// // // // //                 }
// // // // //               />
// // // // //               Bật biến thể
// // // // //             </label>

// // // // //             <button
// // // // //               onClick={() => xoaBienThe(i)}
// // // // //               className="text-red-500 text-left"
// // // // //             >
// // // // //               Xóa
// // // // //             </button>
// // // // //           </div>
// // // // //         ))}

// // // // //         <button
// // // // //           onClick={themBienThe}
// // // // //           className="bg-black text-white px-6 py-2 rounded-lg"
// // // // //         >
// // // // //           + Thêm biến thể
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* ================= NÚT LƯU ================= */}
// // // // //       <div className="text-center pt-6">
// // // // //         <button
// // // // //           onClick={submit}
// // // // //           className="px-12 py-4 bg-black text-white rounded-xl text-lg"
// // // // //         >
// // // // //           Lưu sản phẩm
// // // // //         </button>
// // // // //       </div>

// // // // //     </div>
// // // // //   </div>
// // // // // );
// // // // // }
// // // // 'use client';

// // // // import { useEffect, useState, ChangeEvent } from 'react';
// // // // import { IDanhMuc, IBienThe, ISanPham } from '@/app/lib/cautrucdata';

// // // // type SanPhamInput = Omit<ISanPham, 'id'>;

// // // // export default function ThemSanPhamPage() {
// // // //   const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
// // // //   const [bienThe, setBienThe] = useState<IBienThe[]>([]);

// // // //   const [form, setForm] = useState<SanPhamInput>({
// // // //     ten: '',
// // // //     slug: '',
// // // //     gia_goc: 0,
// // // //     mo_ta: '',
// // // //     an_hien: true,
// // // //     tag: '',
// // // //     phong_cach: '',
// // // //     trang_thai: 'active',
// // // //     id_danh_muc: 0,
// // // //     hinh: null,
// // // //     luot_xem: 0,
// // // //   });

// // // //   const [hinhChinh, setHinhChinh] = useState<File | null>(null);
// // // //   const [hinhPhu, setHinhPhu] = useState<File[]>([]);

// // // //   // ========================== LOAD DANH MỤC ==========================
// // // //   useEffect(() => {
// // // //     const fetchDanhMuc = async () => {
// // // //       const res = await fetch('/api/danh_muc');
// // // //       const data: { data?: IDanhMuc[] } = await res.json();
// // // //       setDanhMuc(data.data ?? []);
// // // //     };

// // // //     fetchDanhMuc();
// // // //   }, []);

// // // //   // ========================== ON CHANGE ==========================
// // // //   const onChange = (
// // // //     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
// // // //   ) => {
// // // //     const target = e.target;
// // // //     const name = target.name as keyof SanPhamInput;

// // // //     let value: string | number | boolean = target.value;

// // // //     if (target instanceof HTMLInputElement && target.type === 'checkbox') {
// // // //       value = target.checked;
// // // //     } else if (['gia_goc', 'id_danh_muc'].includes(name)) {
// // // //       value = Number(value);
// // // //     }

// // // //     setForm(prev => ({
// // // //       ...prev,
// // // //       [name]: value,
// // // //     }));
// // // //   };

// // // //   // ========================== BIẾN THỂ ==========================
// // // //   const themBienThe = () => {
// // // //     setBienThe(prev => [
// // // //       ...prev,
// // // //       {
// // // //         id: 0,
// // // //         ten: '',
// // // //         trang_thai: true,
// // // //         gia_them: null,
// // // //         id_san_pham: 0,
// // // //       },
// // // //     ]);
// // // //   };

// // // //   const suaBienThe = <K extends keyof IBienThe>(
// // // //     index: number,
// // // //     key: K,
// // // //     value: IBienThe[K]
// // // //   ) => {
// // // //     setBienThe(prev =>
// // // //       prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
// // // //     );
// // // //   };

// // // //   const xoaBienThe = (index: number) => {
// // // //     setBienThe(prev => prev.filter((_, i) => i !== index));
// // // //   };

// // // //   // ========================== SUBMIT ==========================
// // // //   const submit = async () => {
// // // //     try {
// // // //       const fd = new FormData();

// // // //       // Gửi field (trừ hình)
// // // //       (Object.entries(form) as [keyof SanPhamInput, SanPhamInput[keyof SanPhamInput]][])
// // // //         .forEach(([key, value]) => {
// // // //           if (key !== 'hinh') {
// // // //             fd.append(key, String(value ?? ''));
// // // //           }
// // // //         });

// // // //       // Hình chính
// // // //       if (hinhChinh) {
// // // //         fd.append('hinh', hinhChinh);
// // // //       } else {
// // // //         alert('Bạn chưa chọn hình chính!');
// // // //         return;
// // // //       }

// // // //       // Hình phụ
// // // //       hinhPhu.forEach(file => fd.append('hinh_phu', file));

// // // //       // Biến thể
// // // //       fd.append('bien_the', JSON.stringify(bienThe));

// // // //       const res = await fetch('/api/san_pham', {
// // // //         method: 'POST',
// // // //         body: fd,
// // // //       });

// // // //       const data: { success: boolean } = await res.json();

// // // //       alert(data.success ? 'Thêm thành công!' : 'Thêm thất bại!');
// // // //     } catch (error) {
// // // //       console.error('Lỗi submit:', error);
// // // //       alert('Lỗi server!');
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 py-10 px-6">
// // // //       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow px-10 py-10 space-y-10">

// // // //         <h1 className="text-4xl font-bold text-center">THÊM SẢN PHẨM</h1>

// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

// // // //           <div>
// // // //             <label className="block font-semibold mb-2">Tên sản phẩm</label>
// // // //             <input
// // // //               name="ten"
// // // //               onChange={onChange}
// // // //               placeholder="VD: Gà rán"
// // // //               className="w-full border rounded-lg px-4 py-3"
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label className="block font-semibold mb-2">Giá gốc</label>
// // // //             <input
// // // //               type="number"
// // // //               name="gia_goc"
// // // //               value={form.gia_goc}
// // // //               onChange={onChange}
// // // //               className="w-full border rounded-lg px-4 py-3"
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label className="block font-semibold mb-2">Slug</label>
// // // //             <input
// // // //               name="slug"
// // // //               onChange={onChange}
// // // //               placeholder="ga-ran"
// // // //               className="w-full border rounded-lg px-4 py-3"
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label className="block font-semibold mb-2">Danh mục</label>
// // // //             <select
// // // //               name="id_danh_muc"
// // // //               value={form.id_danh_muc}
// // // //               onChange={onChange}
// // // //               className="w-full border rounded-lg px-4 py-3"
// // // //             >
// // // //               <option value={0}>-- Chọn danh mục --</option>
// // // //               {danhMuc.map(dm => (
// // // //                 <option key={dm.id} value={dm.id}>
// // // //                   {dm.ten}
// // // //                 </option>
// // // //               ))}
// // // //             </select>
// // // //           </div>

// // // //           <div className="md:col-span-2">
// // // //             <label className="block font-semibold mb-2">Mô tả</label>
// // // //             <textarea
// // // //               name="mo_ta"
// // // //               rows={4}
// // // //               onChange={onChange}
// // // //               className="w-full border rounded-lg px-4 py-3"
// // // //             />
// // // //           </div>
// // // //         </div>

// // // //         {/* ================= HÌNH ẢNH ================= */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // // //           <div>
// // // //             <label className="block font-semibold mb-2">Hình chính</label>
// // // //             <input type="file" onChange={e => setHinhChinh(e.target.files?.[0] ?? null)} />

// // // //             {hinhChinh && (
// // // //               <img
// // // //                 src={URL.createObjectURL(hinhChinh)}
// // // //                 className="w-40 mt-3 rounded-lg shadow"
// // // //               />
// // // //             )}
// // // //           </div>

// // // //           <div>
// // // //             <label className="block font-semibold mb-2">Hình phụ</label>
// // // //             <input
// // // //               type="file"
// // // //               multiple
// // // //               onChange={e => setHinhPhu(Array.from(e.target.files ?? []))}
// // // //             />

// // // //             {hinhPhu.length > 0 && (
// // // //               <div className="flex flex-wrap gap-3 mt-3">
// // // //                 {hinhPhu.map((file, i) => (
// // // //                   <img
// // // //                     key={i}
// // // //                     src={URL.createObjectURL(file)}
// // // //                     className="w-28 h-28 object-cover rounded-lg shadow"
// // // //                   />
// // // //                 ))}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {/* ================= BIẾN THỂ ================= */}
// // // //         <div className="space-y-5">
// // // //           <h2 className="text-2xl font-semibold">Biến thể</h2>

// // // //           {bienThe.map((bt, i) => (
// // // //             <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //               <input
// // // //                 className="border rounded-lg px-4 py-2"
// // // //                 placeholder="Tên biến thể"
// // // //                 value={bt.ten}
// // // //                 onChange={e => suaBienThe(i, 'ten', e.target.value)}
// // // //               />

// // // //               <input
// // // //                 className="border rounded-lg px-4 py-2"
// // // //                 type="number"
// // // //                 placeholder="Giá thêm"
// // // //                 value={bt.gia_them ?? ''}
// // // //                 onChange={e =>
// // // //                   suaBienThe(
// // // //                     i,
// // // //                     'gia_them',
// // // //                     e.target.value === '' ? null : Number(e.target.value)
// // // //                   )
// // // //                 }
// // // //               />

// // // //               <label className="flex items-center gap-2">
// // // //                 <input
// // // //                   type="checkbox"
// // // //                   checked={bt.trang_thai}
// // // //                   onChange={e => suaBienThe(i, 'trang_thai', e.target.checked)}
// // // //                 />
// // // //                 Bật biến thể
// // // //               </label>

// // // //               <button
// // // //                 onClick={() => xoaBienThe(i)}
// // // //                 className="text-red-500 text-left"
// // // //               >
// // // //                 Xóa
// // // //               </button>
// // // //             </div>
// // // //           ))}

// // // //           <button
// // // //             onClick={themBienThe}
// // // //             className="bg-black text-white px-6 py-2 rounded-lg"
// // // //           >
// // // //             + Thêm biến thể
// // // //           </button>
// // // //         </div>

// // // //         {/* ================= NÚT LƯU ================= */}
// // // //         <div className="text-center pt-6">
// // // //           <button
// // // //             onClick={submit}
// // // //             className="px-12 py-4 bg-black text-white rounded-xl text-lg"
// // // //           >
// // // //             Lưu sản phẩm
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useEffect, useState, ChangeEvent } from 'react';
// // // import { IDanhMuc, IBienThe, ISanPham } from '@/app/lib/cautrucdata';

// // // type SanPhamInput = Omit<ISanPham, 'id'>;

// // // export default function ThemSanPhamPage() {
// // //   const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
// // //   const [bienThe, setBienThe] = useState<IBienThe[]>([]);

// // //   const [form, setForm] = useState<SanPhamInput>({
// // //     ten: '',
// // //     slug: '',
// // //     gia_goc: 0,
// // //     mo_ta: '',
// // //     an_hien: true,
// // //     tag: '',
// // //     phong_cach: '',
// // //     trang_thai: 'active',
// // //     id_danh_muc: 0,
// // //     hinh: null,
// // //     luot_xem: 0,
// // //   });

// // //   const [hinhChinh, setHinhChinh] = useState<File | null>(null);
// // //   const [hinhPhu, setHinhPhu] = useState<File[]>([]);

// // //   // ========================== LOAD DANH MỤC ==========================
// // //   useEffect(() => {
// // //     const fetchDanhMuc = async () => {
// // //       const res = await fetch('/api/danh_muc');
// // //       const data = await res.json();
// // //       setDanhMuc(data.data ?? []);
// // //     };

// // //     fetchDanhMuc();
// // //   }, []);

// // //   // ========================== ON CHANGE ==========================
// // //   const onChange = (
// // //     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
// // //   ) => {
// // //     const { name, value } = e.target;
// // //     const key = name as keyof SanPhamInput;

// // //     let newValue: string | number | boolean = value;

// // //     if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
// // //       newValue = e.target.checked;
// // //     } else if (['gia_goc', 'id_danh_muc'].includes(name)) {
// // //       newValue = Number(value);
// // //     }

// // //     setForm(prev => ({
// // //       ...prev,
// // //       [key]: newValue,
// // //     }));
// // //   };

// // //   // ========================== BIẾN THỂ ==========================
// // //   const themBienThe = () => {
// // //     setBienThe(prev => [
// // //       ...prev,
// // //       {
// // //         id: 0,
// // //         ten: '',
// // //         trang_thai: true,
// // //         gia_them: null,
// // //         id_san_pham: 0,
// // //       },
// // //     ]);
// // //   };

// // //   const suaBienThe = <K extends keyof IBienThe>(
// // //     index: number,
// // //     key: K,
// // //     value: IBienThe[K]
// // //   ) => {
// // //     setBienThe(prev =>
// // //       prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
// // //     );
// // //   };

// // //   const xoaBienThe = (index: number) => {
// // //     setBienThe(prev => prev.filter((_, i) => i !== index));
// // //   };

// // //   // ========================== SUBMIT ==========================
// // //   const submit = async () => {
// // //     try {
// // //       const fd = new FormData();

// // //       // Các field dạng text
// // //       Object.entries(form).forEach(([key, value]) => {
// // //         if (key !== 'hinh') {
// // //           fd.append(key, String(value ?? ''));
// // //         }
// // //       });

// // //       // Hình chính (bắt buộc)
// // //       if (!hinhChinh) {
// // //         alert('Bạn chưa chọn hình chính!');
// // //         return;
// // //       }
// // //       fd.append('hinh', hinhChinh);

// // //       // Hình phụ (nhiều ảnh)
// // //       hinhPhu.forEach(img => fd.append('hinh_phu', img));

// // //       // Biến thể
// // //       fd.append('bien_the', JSON.stringify(bienThe));

// // //       const res = await fetch('/api/san_pham', {
// // //         method: 'POST',
// // //         body: fd,
// // //       });

// // //       const data = await res.json();

// // //       alert(data.success ? 'Thêm sản phẩm thành công!' : 'Thêm thất bại!');
// // //     } catch (error) {
// // //       console.error('Lỗi submit:', error);
// // //       alert('Lỗi server!');
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 py-10 px-6">
// // //       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow px-10 py-10 space-y-10">

// // //         <h1 className="text-4xl font-bold text-center">THÊM SẢN PHẨM</h1>

// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

// // //           {/* Tên */}
// // //           <div>
// // //             <label className="block font-semibold mb-2">Tên sản phẩm</label>
// // //             <input
// // //               name="ten"
// // //               onChange={onChange}
// // //               placeholder="VD: Gà rán"
// // //               className="w-full border rounded-lg px-4 py-3"
// // //             />
// // //           </div>

// // //           {/* Giá */}
// // //           <div>
// // //             <label className="block font-semibold mb-2">Giá gốc</label>
// // //             <input
// // //               type="number"
// // //               name="gia_goc"
// // //               value={form.gia_goc}
// // //               onChange={onChange}
// // //               className="w-full border rounded-lg px-4 py-3"
// // //             />
// // //           </div>

// // //           {/* Slug */}
// // //           <div>
// // //             <label className="block font-semibold mb-2">Slug</label>
// // //             <input
// // //               name="slug"
// // //               onChange={onChange}
// // //               placeholder="ga-ran"
// // //               className="w-full border rounded-lg px-4 py-3"
// // //             />
// // //           </div>

// // //           {/* Danh mục */}
// // //           <div>
// // //             <label className="block font-semibold mb-2">Danh mục</label>
// // //             <select
// // //               name="id_danh_muc"
// // //               value={form.id_danh_muc}
// // //               onChange={onChange}
// // //               className="w-full border rounded-lg px-4 py-3"
// // //             >
// // //               <option value={0}>-- Chọn danh mục --</option>
// // //               {danhMuc.map(dm => (
// // //                 <option key={dm.id} value={dm.id}>
// // //                   {dm.ten}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>

// // //           {/* Tag */}
// // //           <div>
// // //             <label className="block font-semibold mb-2">Tag</label>
// // //             <input
// // //               name="tag"
// // //               onChange={onChange}
// // //               placeholder="ví dụ: gà, cay, combo"
// // //               className="w-full border rounded-lg px-4 py-3"
// // //             />
// // //           </div>

// // //           {/* Phong cách */}
// // //           <div>
// // //             <label className="block font-semibold mb-2">Phong cách</label>
// // //             <input
// // //               name="phong_cach"
// // //               onChange={onChange}
// // //               placeholder="ví dụ: món chiên, món nước"
// // //               className="w-full border rounded-lg px-4 py-3"
// // //             />
// // //           </div>

// // //           {/* Mô tả */}
// // //           <div className="md:col-span-2">
// // //             <label className="block font-semibold mb-2">Mô tả</label>
// // //             <textarea
// // //               name="mo_ta"
// // //               rows={4}
// // //               onChange={onChange}
// // //               className="w-full border rounded-lg px-4 py-3"
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* ================= HÌNH ẢNH ================= */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// // //           <div>
// // //             <label className="block font-semibold mb-2">Hình chính</label>
// // //             <input type="file" onChange={e => setHinhChinh(e.target.files?.[0] ?? null)} />

// // //             {hinhChinh && (
// // //               <img
// // //                 src={URL.createObjectURL(hinhChinh)}
// // //                 className="w-40 mt-3 rounded-lg shadow"
// // //               />
// // //             )}
// // //           </div>

// // //           <div>
// // //             <label className="block font-semibold mb-2">Hình phụ (nhiều ảnh)</label>
// // //             <input
// // //               type="file"
// // //               multiple
// // //               onChange={e => setHinhPhu(Array.from(e.target.files ?? []))}
// // //             />

// // //             {hinhPhu.length > 0 && (
// // //               <div className="flex flex-wrap gap-3 mt-3">
// // //                 {hinhPhu.map((file, i) => (
// // //                   <img
// // //                     key={i}
// // //                     src={URL.createObjectURL(file)}
// // //                     className="w-28 h-28 object-cover rounded-lg shadow"
// // //                   />
// // //                 ))}
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* ================= BIẾN THỂ ================= */}
// // //         <div className="space-y-5">
// // //           <h2 className="text-2xl font-semibold">Biến thể</h2>

// // //           {bienThe.map((bt, i) => (
// // //             <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">

// // //               <input
// // //                 className="border rounded-lg px-4 py-2"
// // //                 placeholder="Tên biến thể"
// // //                 value={bt.ten}
// // //                 onChange={e => suaBienThe(i, 'ten', e.target.value)}
// // //               />

// // //               <input
// // //                 className="border rounded-lg px-4 py-2"
// // //                 type="number"
// // //                 placeholder="Giá thêm"
// // //                 value={bt.gia_them ?? ''}
// // //                 onChange={e =>
// // //                   suaBienThe(
// // //                     i,
// // //                     'gia_them',
// // //                     e.target.value === '' ? null : Number(e.target.value)
// // //                   )
// // //                 }
// // //               />

// // //               <label className="flex items-center gap-2">
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={bt.trang_thai}
// // //                   onChange={e => suaBienThe(i, 'trang_thai', e.target.checked)}
// // //                 />
// // //                 Bật biến thể
// // //               </label>

// // //               <button
// // //                 onClick={() => xoaBienThe(i)}
// // //                 className="text-red-500 text-left"
// // //               >
// // //                 Xóa
// // //               </button>
// // //             </div>
// // //           ))}

// // //           <button
// // //             onClick={themBienThe}
// // //             className="bg-black text-white px-6 py-2 rounded-lg"
// // //           >
// // //             + Thêm biến thể
// // //           </button>
// // //         </div>

// // //         {/* ================= NÚT LƯU ================= */}
// // //         <div className="text-center pt-6">
// // //           <button
// // //             onClick={submit}
// // //             className="px-12 py-4 bg-black text-white rounded-xl text-lg"
// // //           >
// // //             Lưu sản phẩm
// // //           </button>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import { useEffect, useState, ChangeEvent } from 'react';
// // import { IDanhMuc, IBienThe, ISanPham } from '@/app/lib/cautrucdata';

// // type SanPhamInput = Omit<ISanPham, 'id' | 'hinh' | 'luot_xem'>;

// // export default function ThemSanPhamPage() {
// //   const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
// //   const [bienThe, setBienThe] = useState<IBienThe[]>([]);

// //   const [form, setForm] = useState<SanPhamInput>({
// //     ten: '',
// //     slug: '',
// //     gia_goc: 0,
// //     mo_ta: '',
// //     an_hien: true,
// //     tag: '',
// //     phong_cach: '',
// //     trang_thai: 'active',
// //     id_danh_muc: 0,
// //   });

// //   const [hinhChinh, setHinhChinh] = useState<File | null>(null);
// //   const [hinhPhu, setHinhPhu] = useState<File[]>([]);

// //   // =====================================
// //   // LOAD DANH MỤC
// //   // =====================================
// //   useEffect(() => {
// //     const fetchDanhMuc = async () => {
// //       const res = await fetch('/api/danh_muc');
// //       const data = await res.json();
// //       setDanhMuc(data.data ?? []);
// //     };
// //     fetchDanhMuc();
// //   }, []);

// //   // =====================================
// //   // CHANGE INPUT
// //   // =====================================
// //   const onChange = (
// //     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     const key = name as keyof SanPhamInput;

// //     let newValue: any = value;

// //     if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
// //       newValue = e.target.checked;
// //     } else if (['gia_goc', 'id_danh_muc'].includes(name)) {
// //       newValue = Number(value);
// //     }

// //     setForm(prev => ({
// //       ...prev,
// //       [key]: newValue,
// //       slug: prev.ten
// //         .toLowerCase()
// //         .trim()
// //         .replace(/\s+/g, '-')
// //         .replace(/[^a-z0-9-]/g, ''),
// //     }));
// //   };

// //   // =====================================
// //   // BIẾN THỂ
// //   // =====================================
// //   const themBienThe = () => {
// //     setBienThe(prev => [
// //       ...prev,
// //       {
// //         id: 0,
// //         ten: '',
// //         trang_thai: true,
// //         gia_them: null,
// //         id_san_pham: 0,
// //       },
// //     ]);
// //   };

// //   const suaBienThe = <K extends keyof IBienThe>(
// //     index: number,
// //     key: K,
// //     value: IBienThe[K]
// //   ) => {
// //     setBienThe(prev =>
// //       prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
// //     );
// //   };

// //   const xoaBienThe = (index: number) => {
// //     setBienThe(prev => prev.filter((_, i) => i !== index));
// //   };

// //   // =====================================
// //   // SUBMIT
// //   // =====================================
// // // ====================== SAFE VALUE ======================
// // function safeValue(v: string | number | boolean | null | undefined): string {
// //   if (v === null || v === undefined) return "";
// //   return String(v);
// // }

// // // ====================== SUBMIT ======================
// // const submit = async () => {
// //   if (!hinhChinh) {
// //     alert("Bạn chưa chọn hình chính!");
// //     return;
// //   }

// //   try {
// //     const fd = new FormData();

// //     fd.append("ten", safeValue(form.ten));
// //     fd.append("slug", safeValue(form.slug));
// //     fd.append("gia_goc", safeValue(form.gia_goc));
// //     fd.append("mo_ta", safeValue(form.mo_ta));
// //     fd.append("an_hien", safeValue(form.an_hien));
// //     fd.append("tag", safeValue(form.tag));
// //     fd.append("phong_cach", safeValue(form.phong_cach));
// //     fd.append("trang_thai", safeValue(form.trang_thai));
// //     fd.append("id_danh_muc", safeValue(form.id_danh_muc));

// //     // hình chính
// //     fd.append("hinh", hinhChinh);

// //     // hình phụ
// //     hinhPhu.forEach(file => fd.append("hinh_phu", file));

// //     // biến thể
// //     const bienTheList: IBienThe[] = bienThe;
// //     fd.append("bien_the", JSON.stringify(bienTheList));

// //     const res = await fetch("/api/san_pham", {
// //       method: "POST",
// //       body: fd
// //     });

// //     const data = await res.json();
// //     alert(data.success ? "Thêm sản phẩm thành công!" : data.message);

// //   } catch (error) {
// //     console.error(error);
// //     alert("Lỗi server!");
// //   }
// // };


// //   return (
// //     <div className="min-h-screen bg-gray-50 py-10 px-6">
// //       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow px-10 py-10 space-y-10">

// //         <h1 className="text-4xl font-bold text-center">THÊM SẢN PHẨM</h1>

// //         {/* ================= THÔNG TIN SẢN PHẨM ================= */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

// //           <div>
// //             <label className="font-semibold">Tên sản phẩm</label>
// //             <input
// //               name="ten"
// //               onChange={onChange}
// //               className="w-full border rounded-lg px-4 py-3"
// //             />
// //           </div>

// //           <div>
// //             <label className="font-semibold">Giá gốc</label>
// //             <input
// //               type="number"
// //               name="gia_goc"
// //               value={form.gia_goc}
// //               onChange={onChange}
// //               className="w-full border rounded-lg px-4 py-3"
// //             />
// //           </div>

// //           <div>
// //             <label className="font-semibold">Slug</label>
// //             <input
// //               name="slug"
// //               value={form.slug}
// //               readOnly
// //               className="w-full border bg-gray-100 rounded-lg px-4 py-3"
// //             />
// //           </div>

// //           <div>
// //             <label className="font-semibold">Danh mục</label>
// //             <select
// //               name="id_danh_muc"
// //               value={form.id_danh_muc}
// //               onChange={onChange}
// //               className="w-full border rounded-lg px-4 py-3"
// //             >
// //               <option value={0}>-- Chọn danh mục --</option>
// //               {danhMuc.map(dm => (
// //                 <option key={dm.id} value={dm.id}>
// //                   {dm.ten}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             <label className="font-semibold">Tag</label>
// //             <input
// //               name="tag"
// //               onChange={onChange}
// //               className="w-full border rounded-lg px-4 py-3"
// //             />
// //           </div>

// //           <div>
// //             <label className="font-semibold">Phong cách</label>
// //             <input
// //               name="phong_cach"
// //               onChange={onChange}
// //               className="w-full border rounded-lg px-4 py-3"
// //             />
// //           </div>

// //           <div className="md:col-span-2">
// //             <label className="font-semibold">Mô tả</label>
// //             <textarea
// //               name="mo_ta"
// //               rows={4}
// //               onChange={onChange}
// //               className="w-full border rounded-lg px-4 py-3"
// //             />
// //           </div>
// //         </div>

// //         {/* ================= HÌNH ẢNH ================= */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           <div>
// //             <label className="font-semibold">Hình chính</label>
// //             <input type="file" onChange={e => setHinhChinh(e.target.files?.[0] ?? null)} />

// //             {hinhChinh && (
// //               <img
// //                 src={URL.createObjectURL(hinhChinh)}
// //                 className="w-40 mt-3 rounded-lg shadow"
// //               />
// //             )}
// //           </div>

// //           <div>
// //             <label className="font-semibold">Hình phụ (nhiều ảnh)</label>
// //             <input
// //               type="file"
// //               multiple
// //               onChange={e => setHinhPhu(Array.from(e.target.files ?? []))}
// //             />

// //             {hinhPhu.length > 0 && (
// //               <div className="flex flex-wrap gap-3 mt-3">
// //                 {hinhPhu.map((file, i) => (
// //                   <img
// //                     key={i}
// //                     src={URL.createObjectURL(file)}
// //                     className="w-28 h-28 object-cover rounded-lg shadow"
// //                   />
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* ================= BIẾN THỂ ================= */}
// //         <div className="space-y-5">
// //           <h2 className="text-2xl font-semibold">Biến thể</h2>

// //           {bienThe.map((bt, i) => (
// //             <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">

// //               <input
// //                 className="border rounded-lg px-4 py-2"
// //                 placeholder="Tên biến thể"
// //                 value={bt.ten}
// //                 onChange={e => suaBienThe(i, 'ten', e.target.value)}
// //               />

// //               <input
// //                 className="border rounded-lg px-4 py-2"
// //                 type="number"
// //                 placeholder="Giá thêm"
// //                 value={bt.gia_them ?? ''}
// //                 onChange={e =>
// //                   suaBienThe(
// //                     i,
// //                     'gia_them',
// //                     e.target.value === '' ? null : Number(e.target.value)
// //                   )
// //                 }
// //               />

// //               <label className="flex items-center gap-2">
// //                 <input
// //                   type="checkbox"
// //                   checked={bt.trang_thai}
// //                   onChange={e => suaBienThe(i, 'trang_thai', e.target.checked)}
// //                 />
// //                 Bật biến thể
// //               </label>

// //               <button
// //                 onClick={() => xoaBienThe(i)}
// //                 className="text-red-500 text-left"
// //               >
// //                 Xóa
// //               </button>
// //             </div>
// //           ))}

// //           <button
// //             onClick={themBienThe}
// //             className="bg-black text-white px-6 py-2 rounded-lg"
// //           >
// //             + Thêm biến thể
// //           </button>
// //         </div>

// //         {/* ================= LƯU ================= */}
// //         <div className="text-center pt-6">
// //           <button
// //             onClick={submit}
// //             className="px-12 py-4 bg-black text-white rounded-xl text-lg"
// //           >
// //             Lưu sản phẩm
// //           </button>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // "use client";

// // import { useEffect, useState, ChangeEvent } from "react";
// // import { IDanhMuc, IBienThe, ISanPham } from "@/app/lib/cautrucdata";

// // type SanPhamInput = Omit<ISanPham, "id" | "hinh" | "luot_xem">;

// // export default function ThemSanPhamPage() {
// //   const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
// //   const [bienThe, setBienThe] = useState<IBienThe[]>([]);
// //   const [hinhChinh, setHinhChinh] = useState<File | null>(null);
// //   const [hinhPhu, setHinhPhu] = useState<File[]>([]);

// //   const [form, setForm] = useState<SanPhamInput>({
// //     ten: "",
// //     slug: "",
// //     gia_goc: 0,
// //     mo_ta: "",
// //     an_hien: true,
// //     tag: "",
// //     phong_cach: "",
// //     trang_thai: "active",
// //     id_danh_muc: 0,
// //   });

// //   // ================= LOAD DANH MỤC =================
// //   useEffect(() => {
// //     (async () => {
// //       const res = await fetch("/api/danh_muc");
// //       const data = await res.json();
// //       setDanhMuc(data.data ?? []);
// //     })();
// //   }, []);

// //   // ================= ONCHANGE =================
// //   const onChange = (
// //     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     const nameKey = name as keyof SanPhamInput;

// //     // xác định kiểu của giá trị mới
// //     let newValue: string | number | boolean = value;

// //     if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
// //       newValue = e.target.checked;
// //     } else if (["gia_goc", "id_danh_muc"].includes(name)) {
// //       newValue = Number(value);
// //     }

// //     setForm((prev) => {
// //       const updated: Partial<SanPhamInput> = { ...prev, [nameKey]: newValue as any };

// //       if (nameKey === "ten") {
// //         const tenStr = String(newValue);
// //         updated.slug = tenStr
// //           .toLowerCase()
// //           .trim()
// //           .replace(/\s+/g, "-")
// //           .replace(/[^a-z0-9-]/g, "");
// //       }

// //       // cast về SanPhamInput an toàn trước khi set
// //       return { ...prev, ...(updated as SanPhamInput) };
// //     });
// //   };

// //   // ================= BIẾN THỂ =================
// //   const themBienThe = () => {
// //     setBienThe((prev) => [
// //       ...prev,
// //       {
// //         id: 0,
// //         ten: "",
// //         trang_thai: true,
// //         gia_them: null,
// //         id_san_pham: 0,
// //       },
// //     ]);
// //   };

// //   // generic: value có đúng kiểu thuộc tính của IBienThe
// //   function suaBienThe<K extends keyof IBienThe>(
// //     index: number,
// //     key: K,
// //     value: IBienThe[K]
// //   ) {
// //     setBienThe((prev) =>
// //       prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
// //     );
// //   }

// //   const xoaBienThe = (index: number) => {
// //     setBienThe((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   // ========= FORMATTING =========
// //   const safeValue = (v: string | number | boolean | null | undefined) =>
// //     v === null || v === undefined ? "" : String(v);

// //   // ================= SUBMIT =================
// //   const submit = async () => {
// //     if (!hinhChinh) {
// //       alert("Bạn chưa chọn hình chính!");
// //       return;
// //     }

// //     try {
// //       const fd = new FormData();

// //       // dùng typed keys để giữ type-safety
// //       (Object.keys(form) as (keyof SanPhamInput)[]).forEach((key) => {
// //         fd.append(String(key), safeValue(form[key]));
// //       });

// //       // hình chính
// //       fd.append("hinh", hinhChinh);

// //       // hình phụ
// //       hinhPhu.forEach((file) => fd.append("hinh_phu", file));

// //       // biến thể (convert boolean → number)
// //       const bienTheClean = bienThe.map((bt) => ({
// //         ten: bt.ten,
// //         gia_them: bt.gia_them ?? 0,
// //         trang_thai: bt.trang_thai ? 1 : 0,
// //       }));

// //       fd.append("bien_the", JSON.stringify(bienTheClean));

// //       const res = await fetch("/api/san_pham", {
// //         method: "POST",
// //         body: fd,
// //       });

// //       const data = await res.json();
// //       alert(data.success ? "Thêm sản phẩm thành công!" : data.message);
// //     } catch (error) {
// //       console.error(error);
// //       alert("Lỗi server!");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-10 px-6">
// //       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow px-10 py-10 space-y-10">
// //         <h1 className="text-4xl font-bold text-center">THÊM SẢN PHẨM</h1>

// //         {/* ================= FORM SẢN PHẨM ================= */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           <div>
// //             <label className="font-semibold">Tên sản phẩm</label>
// //             <input
// //               name="ten"
// //               value={form.ten}
// //               onChange={onChange}
// //               className="w-full border rounded-lg px-4 py-3"
// //             />
// //           </div>

// //           <div>
// //             <label className="font-semibold">Giá gốc</label>
// //             <input
// //               type="number"
// //               name="gia_goc"
// //               value={form.gia_goc}
// //               onChange={onChange}
// //               className="w-full border rounded-lg px-4 py-3"
// //             />
// //           </div>

// //           <div>
// //             <label className="font-semibold">Slug</label>
// //             <input
// //               name="slug"
// //               value={form.slug}
// //               readOnly
// //               className="w-full border bg-gray-100 rounded-lg px-4 py-3"
// //             />
// //           </div>

// //           <div>
// //             <label className="font-semibold">Danh mục</label>
// //             <select
// //               name="id_danh_muc"
// //               value={form.id_danh_muc}
// //               onChange={onChange}
// //               className="w-full border rounded-lg px-4 py-3"
// //             >
// //               <option value={0}>-- Chọn danh mục --</option>
// //               {danhMuc.map((dm) => (
// //                 <option key={dm.id} value={dm.id}>
// //                   {dm.ten}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div>
// //             <label className="font-semibold">Tag</label>
// //             <input
// //               name="tag"
// //               value={form.tag}
// //               onChange={onChange}
// //               className="w-full border rounded-lg px-4 py-3"
// //             />
// //           </div>

// //           <div>
// //             <label className="font-semibold">Phong cách</label>
// //             <input
// //               name="phong_cach"
// //               value={form.phong_cach}
// //               onChange={onChange}
// //               className="w-full border rounded-lg px-4 py-3"
// //             />
// //           </div>

// //           <div className="md:col-span-2">
// //             <label className="font-semibold">Mô tả</label>
// //             <textarea
// //               name="mo_ta"
// //               value={form.mo_ta}
// //               rows={4}
// //               onChange={onChange}
// //               className="w-full border rounded-lg px-4 py-3"
// //             />
// //           </div>
// //         </div>

// //         {/* ================= HÌNH ẢNH ================= */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //           <div>
// //             <label className="font-semibold">Hình chính</label>
// //             <input
// //               type="file"
// //               onChange={(e) => setHinhChinh(e.target.files?.[0] ?? null)}
// //             />

// //             {hinhChinh && (
// //               <img
// //                 src={URL.createObjectURL(hinhChinh)}
// //                 alt="preview"
// //                 className="w-40 mt-3 rounded-lg shadow"
// //               />
// //             )}
// //           </div>

// //           <div>
// //             <label className="font-semibold">Hình phụ (nhiều ảnh)</label>
// //             <input
// //               type="file"
// //               multiple
// //               onChange={(e) => setHinhPhu(Array.from(e.target.files ?? []))}
// //             />

// //             {hinhPhu.length > 0 && (
// //               <div className="flex flex-wrap gap-3 mt-3">
// //                 {hinhPhu.map((file, i) => (
// //                   <img
// //                     key={i}
// //                     src={URL.createObjectURL(file)}
// //                     alt={`hinh-phu-${i}`}
// //                     className="w-28 h-28 object-cover rounded-lg shadow"
// //                   />
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         {/* ================= BIẾN THỂ ================= */}
// //         <div className="space-y-5">
// //           <h2 className="text-2xl font-semibold">Biến thể</h2>

// //           {bienThe.map((bt, i) => (
// //             <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //               <input
// //                 className="border rounded-lg px-4 py-2"
// //                 placeholder="Tên biến thể"
// //                 value={bt.ten}
// //                 onChange={(e) =>
// //                   suaBienThe(i, "ten", e.target.value as IBienThe["ten"])
// //                 }
// //               />

// //               <input
// //                 className="border rounded-lg px-4 py-2"
// //                 type="number"
// //                 placeholder="Giá thêm"
// //                 value={bt.gia_them ?? ""}
// //                 onChange={(e) =>
// //                   suaBienThe(
// //                     i,
// //                     "gia_them",
// //                     e.target.value === "" ? null : Number(e.target.value)
// //                   )
// //                 }
// //               />

// //               <label className="flex items-center gap-2">
// //                 <input
// //                   type="checkbox"
// //                   checked={bt.trang_thai}
// //                   onChange={(e) =>
// //                     suaBienThe(i, "trang_thai", e.target.checked as IBienThe["trang_thai"])
// //                   }
// //                 />
// //                 Bật biến thể
// //               </label>

// //               <button onClick={() => xoaBienThe(i)} className="text-red-500 text-left">
// //                 Xóa
// //               </button>
// //             </div>
// //           ))}

// //           <button onClick={themBienThe} className="bg-black text-white px-6 py-2 rounded-lg">
// //             + Thêm biến thể
// //           </button>
// //         </div>

// //         {/* ================= BUTTON LƯU ================= */}
// //         <div className="text-center pt-6">
// //           <button onClick={submit} className="px-12 py-4 bg-black text-white rounded-xl text-lg">
// //             Lưu sản phẩm
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { IBienThe } from "@/app/lib/cautrucdata";

// interface FormState {
//   ten: string;
//   slug: string;
//   gia_goc: number;
//   mo_ta: string;
//   an_hien: boolean;
//   tag: string;
//   phong_cach: string;
//   trang_thai: string;
//   id_danh_muc: number;
// }

// export default function AddSanPhamPage() {
//   const router = useRouter();

//   const [form, setForm] = useState<FormState>({
//     ten: "",
//     slug: "",
//     gia_goc: 0,
//     mo_ta: "",
//     an_hien: true,
//     tag: "",
//     phong_cach: "",
//     trang_thai: "active",
//     id_danh_muc: 0,
//   });

//   // Hình ảnh
//   const [hinh, setHinh] = useState<File | null>(null);
//   const [hinhPhu, setHinhPhu] = useState<File[]>([]);

//   // Biến thể
//   const [bienThe, setBienThe] = useState<IBienThe[]>([]);

//   const handleBienTheChange = (index: number, field: keyof IBienThe, value: string | number | boolean) => {
//     setBienThe(prev =>
//       prev.map((bt, i) =>
//         i === index ? { ...bt, [field]: value } : bt
//       )
//     );
//   };

//   const addBienThe = () => {
//     setBienThe(prev => [
//       ...prev,
//       { id: 0, ten: "", gia_them: 0, trang_thai: 1, id_san_pham: 0 },
//     ]);
//   };

//   const removeBienThe = (index: number) => {
//     setBienThe(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     const fd = new FormData();

//     // Thông tin sản phẩm
//     fd.append("ten", form.ten);
//     fd.append("slug", form.slug);
//     fd.append("gia_goc", String(form.gia_goc));
//     fd.append("mo_ta", form.mo_ta);
//     fd.append("an_hien", String(form.an_hien));
//     fd.append("tag", form.tag);
//     fd.append("phong_cach", form.phong_cach);
//     fd.append("trang_thai", form.trang_thai);
//     fd.append("id_danh_muc", String(form.id_danh_muc));

//     // Hình chính
//     if (hinh) fd.append("hinh", hinh);

//     // Hình phụ
//     hinhPhu.forEach(file => fd.append("hinh_phu", file));

//     // Biến thể
//     fd.append("bien_the", JSON.stringify(bienThe));

//     const res = await fetch("/api/san_pham", {
//       method: "POST",
//       body: fd,
//     });

//     const json = await res.json();
//     if (json.success) {
//       alert("Thêm sản phẩm thành công");
//       router.push("/san_pham");
//     } else {
//       alert("Lỗi: " + json.message);
//     }
//   };

//   return (
//     <div className="container py-4">

//       <h2 className="mb-3 fw-bold">Thêm sản phẩm</h2>

//       {/* --------- THÔNG TIN SẢN PHẨM --------- */}
//       <div className="card p-3 mb-3">
//         <h5>Thông tin sản phẩm</h5>

//         <input
//           className="form-control mb-2"
//           placeholder="Tên"
//           value={form.ten}
//           onChange={e => setForm({ ...form, ten: e.target.value })}
//         />

//         <input
//           className="form-control mb-2"
//           placeholder="Slug"
//           value={form.slug}
//           onChange={e => setForm({ ...form, slug: e.target.value })}
//         />

//         <input
//           type="number"
//           className="form-control mb-2"
//           placeholder="Giá gốc"
//           value={form.gia_goc}
//           onChange={e => setForm({ ...form, gia_goc: Number(e.target.value) })}
//         />

//         <textarea
//           className="form-control mb-2"
//           placeholder="Mô tả"
//           value={form.mo_ta}
//           onChange={e => setForm({ ...form, mo_ta: e.target.value })}
//         />

//         <input
//           className="form-control mb-2"
//           placeholder="Tag"
//           value={form.tag}
//           onChange={e => setForm({ ...form, tag: e.target.value })}
//         />

//         <input
//           className="form-control mb-2"
//           placeholder="Phong cách"
//           value={form.phong_cach}
//           onChange={e => setForm({ ...form, phong_cach: e.target.value })}
//         />

//         <select
//           className="form-control mb-2"
//           value={form.trang_thai}
//           onChange={e => setForm({ ...form, trang_thai: e.target.value })}
//         >
//           <option value="active">Active</option>
//           <option value="hidden">Hidden</option>
//         </select>

//         <input
//           type="number"
//           className="form-control mb-2"
//           placeholder="ID danh mục"
//           value={form.id_danh_muc}
//           onChange={e => setForm({ ...form, id_danh_muc: Number(e.target.value) })}
//         />
//       </div>

//       {/* --------- HÌNH ẢNH --------- */}
//       <div className="card p-3 mb-3">
//         <h5>Hình ảnh</h5>

//         <label>Hình chính</label>
//         <input type="file" className="form-control mb-3" onChange={e => setHinh(e.target.files?.[0] ?? null)} />

//         <label>Hình phụ</label>
//         <input
//           type="file"
//           className="form-control mb-2"
//           multiple
//           onChange={e => setHinhPhu(e.target.files ? Array.from(e.target.files) : [])}
//         />
//       </div>

//       {/* --------- BIẾN THỂ --------- */}
//       <div className="card p-3 mb-3">
//         <h5>Biến thể</h5>

//         {bienThe.map((bt, i) => (
//           <div key={i} className="border rounded p-2 mb-2">
//             <input
//               className="form-control mb-2"
//               placeholder="Tên biến thể"
//               value={bt.ten}
//               onChange={e => handleBienTheChange(i, "ten", e.target.value)}
//             />

//             <input
//               type="number"
//               className="form-control mb-2"
//               placeholder="Giá thêm"
//               value={bt.gia_them}
//               onChange={e => handleBienTheChange(i, "gia_them", Number(e.target.value))}
//             />

//             <select
//               className="form-control mb-2"
//               value={bt.trang_thai}
//               onChange={e => handleBienTheChange(i, "trang_thai", Number(e.target.value))}
//             >
//               <option value={1}>Hiện</option>
//               <option value={0}>Ẩn</option>
//             </select>

//             <button className="btn btn-danger" onClick={() => removeBienThe(i)}>
//               Xóa
//             </button>
//           </div>
//         ))}

//         <button className="btn btn-primary mt-2" onClick={addBienThe}>
//           + Thêm biến thể
//         </button>
//       </div>

//       <button className="btn btn-success w-100" onClick={handleSubmit}>
//         Lưu sản phẩm
//       </button>
//     </div>
//   );
// }
"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { IDanhMuc, IBienThe, ISanPham } from "@/app/lib/cautrucdata";

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
