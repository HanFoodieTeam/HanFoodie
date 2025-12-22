// "use client";

// import { useEffect, useRef, useState, ChangeEvent } from "react";
// import Image from "next/image";
// import { useParams, useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import dynamic from "next/dynamic";



// import {
//   ISanPham,
//   IDanhMuc,
//   IHinh,
//   IBienThe,
// } from "@/lib/cautrucdata";


// interface ISanPhamChiTiet extends ISanPham {
//   hinh_anh?: IHinh[];
//   bien_the?: IBienThe[];
// }

// interface IHinhForm {
//   id?: number;
//   hinh: string;
// }

// interface IBienTheForm {
//   id: number | null;
//   id_san_pham: number;
//   ten: string;
//   gia_them: number;
//   trang_thai: number;
// }

// interface IBienTheInput {
//   id?: number;
//   ten: string;
//   gia_them: number;
//   trang_thai: number; 
// }
// const TinyMCEEditor = dynamic(
//   () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
//   { ssr: false }
// );


// export default function ChiTietSanPhamPage() {
//   const params = useParams() as { id?: string };
//   const router = useRouter();
//   const productId = Number(params.id);

//   // refs
//   const hinhChinhRef = useRef<HTMLInputElement | null>(null);

//   // states
//   const [loading, setLoading] = useState<boolean>(true);

//   const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
//   const [sanPham, setSanPham] = useState<ISanPhamChiTiet | null>(null);

//   // form state (basic fields)
//   const [form, setForm] = useState({
//     ten: "",
//     slug: "",
//     gia_goc: 0,
//     mo_ta: "",
//     phong_cach: "",
//     tag: "",
//     id_danh_muc: 0,
//     hinh: "", 
//     luot_xem: 0,       
//     het_mon: null as string | null,   
//   });


//   // hình phụ cũ (url list with id)
//   const [hinhPhuOld, setHinhPhuOld] = useState<IHinhForm[]>([]);
//   // hình phụ mới (File list)
//   const [hinhPhuNew, setHinhPhuNew] = useState<File[]>([]);
//   // biến thể form
//   const [bienThe, setBienThe] = useState<IBienTheForm[]>([]);

//   /* ============================
//      Load dữ liệu
//      ============================ */
//   useEffect(() => {
//     if (!productId || isNaN(productId)) {
//       setLoading(false);
//       return;
//     }

//     const loadAll = async () => {
//   setLoading(true);
//   try {
//     const res = await fetch(`/api/san_pham/${productId}`);
//     const json = await res.json();

//     if (!json.success) {
//       toast.error("Không tìm thấy sản phẩm");
//       return;
//     }

//     const sp: ISanPhamChiTiet = json.data;

//     // danh mục (API đã trả sẵn)
//     if (json.danh_muc) setDanhMuc(json.danh_muc);

//       setForm({
//       ten: sp.ten,
//       slug: sp.slug,
//       gia_goc: sp.gia_goc,
//       mo_ta: sp.mo_ta ?? "",
//       phong_cach: sp.phong_cach ?? "",
//       tag: sp.tag ?? "",
//       id_danh_muc: sp.id_danh_muc,
//       hinh: sp.hinh ?? "",
//       luot_xem: sp.luot_xem ?? 0,
//       het_mon: sp.het_mon
//     ? new Date(sp.het_mon).toISOString().slice(0, 10)
//     : null,
//     });


//     setHinhPhuOld(
//       (sp.hinh_anh ?? []).map((h) => ({
//         id: h.id,
//         hinh: h.hinh ?? "",
//       }))
//     );

//     setBienThe(
//       (sp.bien_the ?? []).map((bt) => ({
//         id: bt.id ?? null,
//         id_san_pham: bt.id_san_pham,
//         ten: bt.ten,
//         gia_them: bt.gia_them ?? 0,
//         trang_thai: bt.trang_thai ? 1 : 0,
//       }))
//     );

//     setSanPham(sp);
//   } catch (err) {
//     console.error(err);
//     toast.error("Lỗi khi tải dữ liệu");
//   } finally {
//     setLoading(false);
//   }
// };


//     loadAll();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [productId]);

//   /* ============================
//      Handlers: form basic
//      ============================ */
//   function handleInputChange(
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]:
//       name === "gia_goc" || name === "luot_xem"
//           ? Number(value)
//           : value,
//     }));
//   }

//   /* ============================
//      Hình chính: preview via ref file input
//      ============================ */
//   function handleHinhChinhChange(e: ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     setForm((prev) => ({ ...prev, hinh: url }));
//   }

//   /* ============================
//      Hình phụ (mới)
//      ============================ */
//   function handleHinhPhuNew(e: ChangeEvent<HTMLInputElement>) {
//     const files = e.target.files ? Array.from(e.target.files) : [];
//     if (files.length === 0) return;
//     // keep existing new files + add new ones
//     setHinhPhuNew((prev) => [...prev, ...files]);
//   }

//   function removeNewImage(index: number) {
//     setHinhPhuNew((prev) => prev.filter((_, i) => i !== index));
//   }

//   function removeOldImageById(id?: number) {
//     setHinhPhuOld((prev) => prev.filter((h) => h.id !== id));
//   }

//   /* ============================
//      Biến thể handlers
//      ============================ */
//   function addBienThe() {
//     if (!sanPham) return;
//     const item: IBienTheForm = {
//       id: null,
//       id_san_pham: sanPham.id,
//       ten: "",
//       gia_them: 0,
//       trang_thai: 1,
//     };
//     setBienThe((prev) => [...prev, item]);
//   }

//   function updateBienThe(
//     index: number,
//     key: keyof IBienTheForm,
//     value: string | number
//   ) {
//     setBienThe((prev) =>
//       prev.map((b, i) => (i === index ? { ...b, [key]: value } : b))
//     );
//   }

//   function removeBienThe(index: number) {
//     setBienThe((prev) => prev.filter((_, i) => i !== index));
//   }

//   /* ============================
//      Submit (PUT)
//      ============================ */
//   async function handleSave() {
//     if (!sanPham) {
//       toast.error("Sản phẩm không hợp lệ");

//       return;
//     }

//     try {
//       const fd = new FormData();

//       // basic
//       fd.append("ten", form.ten);
//       fd.append("slug", form.slug);
//       fd.append("gia_goc", String(form.gia_goc));
//       fd.append("mo_ta", form.mo_ta);
//       fd.append("phong_cach", form.phong_cach);
//       fd.append("tag", form.tag);
//       fd.append("id_danh_muc", String(form.id_danh_muc));
//       fd.append("hinh", form.hinh ?? "");
//       if (form.het_mon) {
//         fd.append("het_mon", form.het_mon); // string date
//       } else {
//         fd.append("het_mon", "");
//       }




//       // hinh_file (hình chính) nếu có file mới
//       if (hinhChinhRef.current?.files && hinhChinhRef.current.files.length > 0) {
//         fd.append("hinh_file", hinhChinhRef.current.files[0]);
//       }

//       // hình phụ cũ (URL)
//       hinhPhuOld.forEach((h) => {
//         fd.append("hinh_phu_old", h.hinh);
//       });

//       // hình phụ mới (file)
//       hinhPhuNew.forEach((f) => fd.append("hinh_phu_file", f));

//       // biến thể -> map sang IBienTheInput (API cần id? ten gia_them trang_thai string)
//       const btPayload: IBienTheInput[] = bienThe.map((b) => ({
//         id: b.id ?? undefined,
//         ten: b.ten,
//         gia_them: b.gia_them,
//         trang_thai: b.trang_thai,
//       }));

//       fd.append("bien_the", JSON.stringify(btPayload));

//       const res = await fetch(`/api/san_pham/${sanPham.id}`, {
//         method: "PUT",
//         body: fd,
//       });

//       const json = await res.json();
//       if (json.success) {
//         toast.success("Cập nhật thành công");
//         router.push("/san_pham");
//         // reload data and clear new files
//         setHinhPhuNew([]);
//         // refresh server data
//         // either re-fetch or router.refresh
//         await (async () => {
//           setLoading(true);
//           try {
//             const spRes = await fetch(`/api/san_pham/${productId}`);
//             const spJson = await spRes.json();
//             if (spJson.success) {
//               const sp: ISanPhamChiTiet = spJson.data;
//               setSanPham(sp);
//               setForm((prev) => ({
//                 ...prev,
//                 ten: sp.ten,
//                 slug: sp.slug,
//                 gia_goc: sp.gia_goc,
//                 mo_ta: sp.mo_ta ?? "",
//                 phong_cach: sp.phong_cach ?? "",
//                 tag: sp.tag ?? "",
//                 id_danh_muc: sp.id_danh_muc,
//                 hinh: sp.hinh ?? "",
//               }));
//               setHinhPhuOld(
//                 (sp.hinh_anh ?? []).map((h: IHinh) => ({
//                   id: h.id,
//                   hinh: h.hinh ?? "",
//                 }))
//               );
//               setBienThe(
//                 (sp.bien_the ?? []).map((bt: IBienThe) => ({
//                   id: bt.id ?? null,
//                   id_san_pham: bt.id_san_pham,
//                   ten: bt.ten,
//                   gia_them: bt.gia_them ?? 0,
//                    trang_thai: bt.trang_thai ? 1 : 0,
//                 }))
//               );
//             }
//           } catch (err) {
//             console.error("Reload after save error:", err);
//           } finally {
//             setLoading(false);
//           }
//         })();
//       } else {
//         toast.error(json.message || "Lỗi khi lưu");
//       }
//     } catch (err) {
//       console.error("SAVE ERROR:", err);
//       toast.error("Lỗi khi lưu sản phẩm");
//     }
//   }

//   /* ============================
//      Render
//      ============================ */
//   if (loading) return <div className="p-6">Đang tải...</div>;
//   if (!sanPham) return <div className="p-6 text-red-600">Không tìm thấy sản phẩm</div>;

//   return (
//     <div className="p-6 mx-auto">
//       <div className="bg-white p-6 rounded-xl shadow space-y-6">
//         {/* DANH MỤC */}
//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <p className="font-semibold">Tên</p>
//             <input
//               className="border p-2 w-full rounded mt-1"
//               name="ten"
//               value={form.ten}
//               onChange={handleInputChange}
//             />
//           </div>

//         {/* FORM INFO */}

//           <div>
//           <p className="font-semibold mb-1">Danh mục</p>
//           <select
//             className="border p-2 rounded w-full"
//             name="id_danh_muc"
//             value={form.id_danh_muc}
//             onChange={handleInputChange}
//           >
//             <option value={0}>-- Chọn danh mục --</option>
//             {danhMuc.map((dm) => (
//               <option key={dm.id} value={dm.id}>
//                 {dm.ten}
//               </option>
//             ))}
//           </select>
//         </div>
//           <div>
//             <p className="font-semibold">Lượt xem</p>
//             <input
//               type="number"
//               className="border p-2 w-full rounded mt-1"
//               name="luot_xem"
//               value={form.luot_xem}
//               onChange={(e) =>
//                 setForm((prev) => ({
//                   ...prev,
//                   luot_xem: Number(e.target.value),
//                 }))
//               }
//             />
//           </div>


//           <div>
//             <p className="font-semibold">Slug</p>
//             <input
//               className="border p-2 w-full rounded mt-1"
//               name="slug"
//               value={form.slug}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <p className="font-semibold">Giá gốc</p>
//             <input
//               type="number"
//               className="border p-2 w-full rounded mt-1"
//               name="gia_goc"
//               value={form.gia_goc}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <p className="font-semibold">Phong cách</p>
//             <input
//               className="border p-2 w-full rounded mt-1"
//               name="phong_cach"
//               value={form.phong_cach}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className="flex items-center gap-4">
//             <label className="font-semibold">Trạng thái món</label>

//             <select
//               value={form.het_mon ? "het" : "con"}
//               onChange={(e) => {
//                 const value: string | null =
//                   e.target.value === "het"
//                     ? new Date().toISOString().slice(0, 10) // YYYY-MM-DD
//                     : null;

//                 setForm((prev) => ({
//                   ...prev,
//                   het_mon: value,
//                 }));
//               }}
//               className="border p-2 rounded"
//             >
//               <option value="con">Còn món</option>
//               <option value="het">Hết món</option>
//             </select>


//           </div>


//           <div>
//             <p className="font-semibold">Tag</p>
//             <input
//               className="border p-2 w-full rounded mt-1"
//               name="tag"
//               value={form.tag}
//               onChange={handleInputChange}
//             />
//           </div>
//         </div>

//         {/* MÔ TẢ */}
//         <div>
//   <p className="font-semibold mb-1">Mô tả</p>

//   <div className="border rounded-lg p-2 bg-white">
//     <TinyMCEEditor
//       apiKey="YOUR_TINYMCE_API_KEY"
//       value={form.mo_ta ?? ""}
//       onEditorChange={(content) =>
//         setForm((prev) => ({
//           ...prev,
//           mo_ta: content, // ✅ lưu HTML
//         }))
//       }
//       init={{
//         height: 300,
//         menubar: false,
//         plugins: [
//           "advlist",
//           "autolink",
//           "lists",
//           "link",
//           "image",
//           "charmap",
//           "fullscreen",
//           "wordcount",
//         ],
//         toolbar:
//           "undo redo | formatselect | bold italic underline | " +
//           "alignleft aligncenter alignright alignjustify | " +
//           "bullist numlist outdent indent | link image | removeformat",
//         branding: false,
//       }}
//     />
//   </div>
// </div>



//         {/* HÌNH CHÍNH */}
//         <div>
//           <h2 className="font-semibold mb-2">Hình chính</h2>
//           <div className="flex items-center gap-4">
//             {form.hinh ? (
//               // use img tag because some URLs might be remote and next/image may require domain config
//               <img src={form.hinh} alt="Hình chính" className="w-40 border rounded" />
//             ) : (
//               <div className="w-40 h-28 bg-gray-100 flex items-center justify-center rounded">No image</div>
//             )}
//             <input
//               type="file"
//               accept="image/*"
//               ref={hinhChinhRef}
//               onChange={handleHinhChinhChange}
//             />
//           </div>
//         </div>

//         {/* HÌNH PHỤ */}
//         <div>
//           <h2 className="font-semibold mb-2">Hình phụ</h2>

//           <div className="flex gap-3 flex-wrap mb-3">
//             {hinhPhuOld.map((h) => (
//               <div key={h.id ?? h.hinh} className="relative">
//                 <img src={h.hinh} alt="hinh phu" className="w-24 h-24 object-cover border rounded" />
//                 <button
//                   onClick={() => removeOldImageById(h.id)}
//                   className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}

//             {hinhPhuNew.map((f, idx) => {
//               const url = URL.createObjectURL(f);
//               return (
//                 <div key={idx} className="relative">
//                   <img src={url} alt={`new ${idx}`} className="w-24 h-24 object-cover border rounded" />
//                   <button
//                     onClick={() => removeNewImage(idx)}
//                     className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-1"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               );
//             })}
//           </div>

//           <input type="file" multiple accept="image/*" onChange={handleHinhPhuNew} />
//         </div>

//         {/* BIẾN THỂ */}
//         <div>
//           <h2 className="font-semibold mb-2">Biến thể</h2>

//           {bienThe.map((bt, index) => (
//             <div key={index} className="flex gap-2 items-center mb-2">
//               <div className="flex-1">
//                 <input
//                   className="border p-2 w-full rounded"
//                   placeholder="Tên"
//                   value={bt.ten}
//                   onChange={(e) => updateBienThe(index, "ten", e.target.value)}
//                 />
//               </div>

//               <div className="w-36">
//                 <input
//                   type="number"
//                   className="border p-2 w-full rounded"
//                   placeholder="Giá thêm"
//                   value={bt.gia_them}
//                   onChange={(e) => updateBienThe(index, "gia_them", Number(e.target.value))}
//                 />
//               </div>

//               <div>
//                 <select
//                   value={bt.trang_thai}
//                   onChange={(e) =>
//                     updateBienThe(index, "trang_thai", Number(e.target.value))
//                   }
//                 >
//                   <option value={1}>Hoạt động</option>
//                   <option value={0}>Ẩn</option>
//                 </select>

//               </div>

//               <button
//                 onClick={() => removeBienThe(index)}
//                 className="bg-red-600 text-white rounded px-3 py-1"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}

//           <button onClick={addBienThe} className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md disabled:opacity-50">
//             Thêm biến thể
//           </button>
//         </div>

//         {/* BUTTON SAVE */}
//         <div className="text-center pt-4">
//           <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md disabled:opacity-50" onClick={handleSave}>
//             Lưu thay đổi
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";



import {
  ISanPham,
  IDanhMuc,
  IHinh,
  IBienThe,
} from "@/lib/cautrucdata";


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
  trang_thai: number;
}

interface IBienTheInput {
  id?: number;
  ten: string;
  gia_them: number;
  trang_thai: number;
}
const TinyMCEEditor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  { ssr: false }
);


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
    hinh: "",
    luot_xem: 0,
    het_mon: null as string | null,
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
        const res = await fetch(`/api/san_pham/${productId}`);
        const json = await res.json();

        if (!json.success) {
          toast.error("Không tìm thấy sản phẩm");
          return;
        }

        const sp: ISanPhamChiTiet = json.data;

        // danh mục (API đã trả sẵn)
        if (json.danh_muc) setDanhMuc(json.danh_muc);

        setForm({
          ten: sp.ten,
          slug: sp.slug,
          gia_goc: sp.gia_goc,
          mo_ta: sp.mo_ta ?? "",
          phong_cach: sp.phong_cach ?? "",
          tag: sp.tag ?? "",
          id_danh_muc: sp.id_danh_muc,
          hinh: sp.hinh ?? "",
          luot_xem: sp.luot_xem ?? 0,
          het_mon: sp.het_mon
            ? new Date(sp.het_mon).toISOString().slice(0, 10)
            : null,
        });


        setHinhPhuOld(
          (sp.hinh_anh ?? []).map((h) => ({
            id: h.id,
            hinh: h.hinh ?? "",
          }))
        );

        setBienThe(
          (sp.bien_the ?? []).map((bt) => ({
            id: bt.id ?? null,
            id_san_pham: bt.id_san_pham,
            ten: bt.ten,
            gia_them: bt.gia_them ?? 0,
            trang_thai: bt.trang_thai ? 1 : 0,
          }))
        );

        setSanPham(sp);
      } catch (err) {
        console.error(err);
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
      [name]:
        name === "gia_goc" || name === "luot_xem"
          ? Number(value)
          : value,
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
      trang_thai: 1,
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
      if (form.het_mon) {
        fd.append("het_mon", form.het_mon); // string date
      } else {
        fd.append("het_mon", "");
      }




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
                  trang_thai: bt.trang_thai ? 1 : 0,
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
    <div className="p-6 mx-auto">
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        {/* DANH MỤC */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Tên</p>
            <input
              aria-label="Tên sản phẩm"
              name="ten"
              value={form.ten}
              onChange={handleInputChange}
            />
          </div>

          {/* FORM INFO */}

          <div>
            <p className="font-semibold mb-1">Danh mục</p>
            <select
              aria-label="Danh mục sản phẩm"
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
          <div>
            <label htmlFor="luot_xem" className="font-semibold">
              Lượt xem
            </label>
            <input
              id="luot_xem"
              type="number"
              name="luot_xem"
              className="border p-2 w-full rounded mt-1"
              value={form.luot_xem}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  luot_xem: Number(e.target.value),
                }))
              }
            />
          </div>



          <div>
            <label htmlFor="slug" className="font-semibold">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              className="border p-2 w-full rounded mt-1"
              value={form.slug}
              onChange={handleInputChange}
            />
          </div>


          <div>
            <label htmlFor="gia_goc" className="font-semibold">
              Giá gốc
            </label>
            <input
              id="gia_goc"
              type="number"
              name="gia_goc"
              className="border p-2 w-full rounded mt-1"
              value={form.gia_goc}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="phong_cach" className="font-semibold">
              Phong cách
            </label>
            <input
              id="phong_cach"
              name="phong_cach"
              className="border p-2 w-full rounded mt-1"
              value={form.phong_cach}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center gap-4">
            <label htmlFor="het_mon" className="font-semibold">
              Trạng thái món
            </label>
            <select
              id="het_mon"
              className="border p-2 rounded"
              value={form.het_mon ? "het" : "con"}
              onChange={(e) => {
                const value =
                  e.target.value === "het"
                    ? new Date().toISOString().slice(0, 10)
                    : null;
                setForm((prev) => ({ ...prev, het_mon: value }));
              }}
            >
              <option value="con">Còn món</option>
              <option value="het">Hết món</option>
            </select>
          </div>



          <div>
            <label htmlFor="tag" className="font-semibold">
              Tag
            </label>
            <input
              id="tag"
              name="tag"
              className="border p-2 w-full rounded mt-1"
              value={form.tag}
              onChange={handleInputChange}
            />
          </div>

        </div>

        {/* MÔ TẢ */}
        <div>
          <p className="font-semibold mb-1">Mô tả</p>

          <div className="border rounded-lg p-2 bg-white">
            <TinyMCEEditor
              apiKey="b0ltf47z16t202dzee5j66umb4r9m5ypez273jxv802r6t8n"
              onEditorChange={(content) =>
                setForm((prev) => ({
                  ...prev,
                  mo_ta: content, // ✅ lưu HTML
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



        {/* HÌNH CHÍNH */}
        <div>
          <label htmlFor="hinh_chinh" className="font-semibold mb-2 block">
            Hình chính
          </label>
          <input
            id="hinh_chinh"
            type="file"
            accept="image/*"
            ref={hinhChinhRef}
            onChange={handleHinhChinhChange}
          />
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

          <input
            type="file"
            multiple
            accept="image/*"
            aria-label="Hình phụ sản phẩm"
            onChange={handleHinhPhuNew}
          />
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
                  aria-label="Trạng thái biến thể"
                  value={bt.trang_thai}
                  onChange={(e) =>
                    updateBienThe(index, "trang_thai", Number(e.target.value))
                  }
                >
                  <option value={1}>Hoạt động</option>
                  <option value={0}>Ẩn</option>
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

          <button onClick={addBienThe} className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md disabled:opacity-50">
            Thêm biến thể
          </button>
        </div>



        {/* BUTTON SAVEe */}
        <div className="text-center pt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md disabled:opacity-50" onClick={handleSave}>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
