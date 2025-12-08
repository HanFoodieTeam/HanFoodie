// 'use client';

// import { useEffect, useState, ChangeEvent } from 'react';
// import { IDanhMuc, IBienThe, ISanPham } from '@/app/lib/cautrucdata';

// export default function ThemSanPhamPage() {
//   const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
//   const [bienThe, setBienThe] = useState<IBienThe[]>([]);

//   const [form, setForm] = useState<Omit<ISanPham, 'id'>>({
//     ten: '',
//     slug: '',
//     gia_goc: 0,
//     mo_ta: '',
//     an_hien: true,
//     tag: '',
//     phong_cach: '',
//     trang_thai: 'active',
//     id_danh_muc: 0,
//     hinh: null,
//     luot_xem: 0,
//   });

//   const [hinhChinh, setHinhChinh] = useState<File | null>(null);
//   const [hinhPhu, setHinhPhu] = useState<File[]>([]);

//   useEffect(() => {
//     const fetchDanhMuc = async () => {
//       const res = await fetch('/api/danh_muc');
//       const data: { data?: IDanhMuc[] } = await res.json();
//       setDanhMuc(data.data ?? []);
//     };

//     fetchDanhMuc();
//   }, []);

//   // ================= ON CHANGE =================
//   const onChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const target = e.target;
//     const name = target.name as keyof typeof form;

//     let value: any = target.value;

//     if (target instanceof HTMLInputElement && target.type === 'checkbox') {
//       value = target.checked;
//     }

//     if (name === 'gia_goc' || name === 'id_danh_muc') {
//       value = Number(value);
//     }

//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   // ================= BIẾN THỂ =================
//   const themBienThe = () => {
//     setBienThe(prev => [
//       ...prev,
//       {
//         id: 0, // ✅ TẠM
//         ten: '',
//         trang_thai: true,
//         gia_them: null,
//         id_san_pham: 0, // ✅ TẠM
//       },
//     ]);
//   };

//   const suaBienThe = <K extends keyof IBienThe>(
//     index: number,
//     key: K,
//     value: IBienThe[K]
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

//   // ================= SUBMIT =================
// const submit = async () => {
//   try {
//     const fd = new FormData();

//     // 🔥 Gửi toàn bộ dữ liệu sản phẩm (TRỪ HÌNH)
//     Object.entries(form).forEach(([key, value]) => {
//       if (key !== "hinh") {   // ❗ Không append hinh ở đây
//         fd.append(key, String(value ?? ""));
//       }
//     });

//     // 🔥 Gửi hình chính đúng cách
//     if (hinhChinh) {
//       fd.append("hinh", hinhChinh); // ❗ KEY ĐÚNG
//     } else {
//       alert("Bạn chưa chọn hình chính!");
//       return;
//     }

//     // 🔥 Gửi hình phụ
//     hinhPhu.forEach((file) => fd.append("hinh_phu", file));

//     // 🔥 Gửi biến thể
//     fd.append("bien_the", JSON.stringify(bienThe));

//     // Gửi API
//     const res = await fetch("/api/san_pham", {
//       method: "POST",
//       body: fd,
//     });

//     const data = await res.json();
//     console.log("KQ thêm SP:", data);

//     alert(data.success ? " Thêm thành công!" : " Thêm thất bại!");
//   } catch (error) {
//     console.error(" Lỗi submit:", error);
//     alert("Lỗi server!");
//   }
// };


//   return (
//   <div className="min-h-screen bg-gray-50 py-10 px-6">
//     <div className="max-w-6xl mx-auto bg-white rounded-xl shadow px-10 py-10 space-y-10">

//       {/* TIÊU ĐỀ */}
//       <h1 className="text-4xl font-bold text-center tracking-wide">
//         THÊM SẢN PHẨM
//       </h1>

//       {/* FORM GRID 2 CỘT */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

//         {/* TÊN SẢN PHẨM */}
//         <div>
//           <label className="block font-semibold mb-2">Tên sản phẩm</label>
//           <input
//             name="ten"
//             onChange={onChange}
//             placeholder="VD: Gà rán, Trà sữa..."
//             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//         </div>

//         {/* GIÁ GỐC */}
//         <div>
//           <label className="block font-semibold mb-2">Giá gốc (VNĐ)</label>
//           <input
//             type="number"
//             name="gia_goc"
//             value={form.gia_goc}
//             onChange={onChange}
//             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//         </div>

//         {/* SLUG */}
//         <div>
//           <label className="block font-semibold mb-2">Slug</label>
//           <input
//             name="slug"
//             onChange={onChange}
//             placeholder="ga-ran"
//             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//         </div>

//         {/* DANH MỤC */}
//         <div>
//           <label className="block font-semibold mb-2">Danh mục</label>
//           <select
//             name="id_danh_muc"
//             value={form.id_danh_muc}
//             onChange={onChange}
//             className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-black"
//           >
//             <option value={0}>-- Chọn danh mục --</option>
//             {danhMuc.map(dm => (
//   <option key={dm.id} value={dm.id}>
//     {dm.id}
//   </option>
// ))}

//           </select>
//         </div>

//         {/* MÔ TẢ */}
//         <div className="md:col-span-2">
//           <label className="block font-semibold mb-2">Mô tả</label>
//           <textarea
//             name="mo_ta"
//             rows={4}
//             onChange={onChange}
//             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//         </div>

//         {/* TRẠNG THÁI */}
//         <div>
//           <label className="block font-semibold mb-2">Trạng thái</label>
//           <div className="flex items-center gap-8 mt-2">
//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 checked={form.an_hien === true}
//                 onChange={() => setForm(p => ({ ...p, an_hien: true }))}
//               />
//               Hiện
//             </label>

//             <label className="flex items-center gap-2">
//               <input
//                 type="radio"
//                 checked={form.an_hien === false}
//                 onChange={() => setForm(p => ({ ...p, an_hien: false }))}
//               />
//               Ẩn
//             </label>
//           </div>
//         </div>

//         {/* PHONG CÁCH */}
//         <div>
//           <label className="block font-semibold mb-2">Phong cách</label>
//           <input
//             name="phong_cach"
//             onChange={onChange}
//             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//         </div>

//         {/* TAG */}
//         <div>
//           <label className="block font-semibold mb-2">Tag</label>
//           <input
//             name="tag"
//             onChange={onChange}
//             className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//         </div>
//       </div>

//       {/* ================= HÌNH ẢNH ================= */}
// <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  
//   {/* Hình chính */}
//   <div>
//     <label className="block font-semibold mb-2">Hình chính</label>

//     <input
//       type="file"
//       onChange={e => setHinhChinh(e.target.files?.[0] ?? null)}
//     />

//     {/* 🔥 PREVIEW HÌNH CHÍNH */}
//     {hinhChinh && (
//       <img
//         src={URL.createObjectURL(hinhChinh)}
//         className="w-40 mt-3 rounded-lg shadow"
//       />
//     )}
//   </div>

//   {/* Hình phụ */}
//   <div>
//     <label className="block font-semibold mb-2">Hình phụ</label>

//     <input
//       type="file"
//       multiple
//       onChange={e => setHinhPhu(Array.from(e.target.files ?? []))}
//     />

//     {/* 🔥 PREVIEW HÌNH PHỤ */}
//     {hinhPhu.length > 0 && (
//       <div className="flex flex-wrap gap-3 mt-3">
//         {hinhPhu.map((file, i) => (
//           <img
//             key={i}
//             src={URL.createObjectURL(file)}
//             className="w-28 h-28 object-cover rounded-lg shadow"
//           />
//         ))}
//       </div>
//     )}
//   </div>
// </div>


//       {/* ================= BIẾN THỂ ================= */}
//       <div className="space-y-5">
//         <h2 className="text-2xl font-semibold">Biến thể</h2>

//         {bienThe.map((bt, i) => (
//           <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <input
//               className="border rounded-lg px-4 py-2"
//               placeholder="Tên biến thể"
//               value={bt.ten}
//               onChange={e => suaBienThe(i, 'ten', e.target.value)}
//             />

//             <input
//               className="border rounded-lg px-4 py-2"
//               type="number"
//               placeholder="Giá thêm"
//               value={bt.gia_them ?? ''}
//               onChange={e =>
//                 suaBienThe(
//                   i,
//                   'gia_them',
//                   e.target.value === '' ? null : Number(e.target.value)
//                 )
//               }
//             />

//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={bt.trang_thai}
//                 onChange={e =>
//                   suaBienThe(i, 'trang_thai', e.target.checked)
//                 }
//               />
//               Bật biến thể
//             </label>

//             <button
//               onClick={() => xoaBienThe(i)}
//               className="text-red-500 text-left"
//             >
//               Xóa
//             </button>
//           </div>
//         ))}

//         <button
//           onClick={themBienThe}
//           className="bg-black text-white px-6 py-2 rounded-lg"
//         >
//           + Thêm biến thể
//         </button>
//       </div>

//       {/* ================= NÚT LƯU ================= */}
//       <div className="text-center pt-6">
//         <button
//           onClick={submit}
//           className="px-12 py-4 bg-black text-white rounded-xl text-lg"
//         >
//           Lưu sản phẩm
//         </button>
//       </div>

//     </div>
//   </div>
// );
// }
'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { IDanhMuc, IBienThe, ISanPham } from '@/app/lib/cautrucdata';

type SanPhamInput = Omit<ISanPham, 'id'>;

export default function ThemSanPhamPage() {
  const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
  const [bienThe, setBienThe] = useState<IBienThe[]>([]);

  const [form, setForm] = useState<SanPhamInput>({
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

  // ========================== LOAD DANH MỤC ==========================
  useEffect(() => {
    const fetchDanhMuc = async () => {
      const res = await fetch('/api/danh_muc');
      const data: { data?: IDanhMuc[] } = await res.json();
      setDanhMuc(data.data ?? []);
    };

    fetchDanhMuc();
  }, []);

  // ========================== ON CHANGE ==========================
  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const name = target.name as keyof SanPhamInput;

    let value: string | number | boolean = target.value;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      value = target.checked;
    } else if (['gia_goc', 'id_danh_muc'].includes(name)) {
      value = Number(value);
    }

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // ========================== BIẾN THỂ ==========================
  const themBienThe = () => {
    setBienThe(prev => [
      ...prev,
      {
        id: 0,
        ten: '',
        trang_thai: true,
        gia_them: null,
        id_san_pham: 0,
      },
    ]);
  };

  const suaBienThe = <K extends keyof IBienThe>(
    index: number,
    key: K,
    value: IBienThe[K]
  ) => {
    setBienThe(prev =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const xoaBienThe = (index: number) => {
    setBienThe(prev => prev.filter((_, i) => i !== index));
  };

  // ========================== SUBMIT ==========================
  const submit = async () => {
    try {
      const fd = new FormData();

      // Gửi field (trừ hình)
      (Object.entries(form) as [keyof SanPhamInput, SanPhamInput[keyof SanPhamInput]][])
        .forEach(([key, value]) => {
          if (key !== 'hinh') {
            fd.append(key, String(value ?? ''));
          }
        });

      // Hình chính
      if (hinhChinh) {
        fd.append('hinh', hinhChinh);
      } else {
        alert('Bạn chưa chọn hình chính!');
        return;
      }

      // Hình phụ
      hinhPhu.forEach(file => fd.append('hinh_phu', file));

      // Biến thể
      fd.append('bien_the', JSON.stringify(bienThe));

      const res = await fetch('/api/san_pham', {
        method: 'POST',
        body: fd,
      });

      const data: { success: boolean } = await res.json();

      alert(data.success ? 'Thêm thành công!' : 'Thêm thất bại!');
    } catch (error) {
      console.error('Lỗi submit:', error);
      alert('Lỗi server!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow px-10 py-10 space-y-10">

        <h1 className="text-4xl font-bold text-center">THÊM SẢN PHẨM</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>
            <label className="block font-semibold mb-2">Tên sản phẩm</label>
            <input
              name="ten"
              onChange={onChange}
              placeholder="VD: Gà rán"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Giá gốc</label>
            <input
              type="number"
              name="gia_goc"
              value={form.gia_goc}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Slug</label>
            <input
              name="slug"
              onChange={onChange}
              placeholder="ga-ran"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Danh mục</label>
            <select
              name="id_danh_muc"
              value={form.id_danh_muc}
              onChange={onChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value={0}>-- Chọn danh mục --</option>
              {danhMuc.map(dm => (
                <option key={dm.id} value={dm.id}>
                  {dm.ten}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">Mô tả</label>
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
          <div>
            <label className="block font-semibold mb-2">Hình chính</label>
            <input type="file" onChange={e => setHinhChinh(e.target.files?.[0] ?? null)} />

            {hinhChinh && (
              <img
                src={URL.createObjectURL(hinhChinh)}
                className="w-40 mt-3 rounded-lg shadow"
              />
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2">Hình phụ</label>
            <input
              type="file"
              multiple
              onChange={e => setHinhPhu(Array.from(e.target.files ?? []))}
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
                  onChange={e => suaBienThe(i, 'trang_thai', e.target.checked)}
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
