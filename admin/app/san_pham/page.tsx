

// "use client";

// import { useEffect, useState, Suspense } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ISanPham, IDanhMuc } from "@/lib/cautrucdata";

// // ============================
// // COMPONENT: SELECT DANH MỤC
// // ============================
// function DanhMucSelect({
//   value,
//   onChange,
// }: {
//   value: string;
//   onChange: (v: string) => void;
// }) {
//   const [danhMucList, setDanhMucList] = useState<IDanhMuc[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchDanhMuc = async () => {
//       try {
//         const res = await fetch("/api/danh_muc");
//         const json = await res.json();
//         if (json.success) setDanhMucList(json.data as IDanhMuc[]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDanhMuc();
//   }, []);

//   return (
//     <div className="flex flex-col">
//       <label className="text-sm font-medium text-gray-600">Danh mục</label>
//       <select
//         className="border rounded-lg px-3 py-2 w-48"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         disabled={loading}
//       >
//         <option value="">-- Chọn danh mục --</option>
//         {danhMucList.map((dm) => (
//           <option key={dm.id} value={String(dm.id)}>
//             {dm.ten}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// // ============================
// // MODAL HẾT MÓN
// // ============================
// function ModalHetMon({
//   open,
//   onClose,
//   sanPham,
//   onSuccess,
// }: {
//   open: boolean;
//   onClose: () => void;
//   sanPham: ISanPham | null;
//   onSuccess: () => void;
// }) {
//   const [loading, setLoading] = useState(false);

//   if (!open || !sanPham) return null;

//   const isHetMon = !!sanPham.het_mon;

//   const handleToggle = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/san_pham/${sanPham.id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           het_mon: !isHetMon,
//           co_lai_mon: isHetMon,
//         }),
//       });

//       setLoading(false);

//       if (res.ok) {
//         onSuccess();
//         onClose();
//       }
//     } catch (err) {
//       console.log("Lỗi:", err);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-xl w-80">
//         {isHetMon ? (
//             <>
//               <h2 className="text-lg font-bold text-center mb-3 text-green-600">
//                 Mở bán lại hôm nay?
//               </h2>
//               <p className="text-center mb-4 text-base">
//                 Món <span className="font-bold">{sanPham.ten}</span> sẽ được mở bán lại trong ngày hôm nay.
//               </p>
//             </>
//           ) : (
//             <>
//               <h2 className="text-lg font-semibold mb-4 text-center">
//                 Hết món?
//               </h2>
//               <p className="text-center mb-4 text-base">
//                 Món <span className="font-bold">{sanPham.ten}</span> sẽ tạm ẩn trong ngày hôm nay.
//               </p>
//             </>
//           )}


//         <div className="flex justify-center gap-3 mt-5">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-gray-300 rounded"
//             disabled={loading}
//           >
//             Hủy
//           </button>
//           <button
//             onClick={handleToggle}
//             className="px-4 py-2 bg-red-500 text-white rounded"
//             disabled={loading}
//           >
//             {loading ? "Đang xử lý..." : "Xác nhận"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================
// // LIST PAGE CHÍNH
// // ============================
// function SanPhamListContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Query params
//   const page = Number(searchParams.get("page") || "1");
//   const searchQuery = searchParams.get("search") || "";
//   const danh_muc = searchParams.get("danh_muc") || "";
//   const min_price = searchParams.get("min_price") || "";
//   const max_price = searchParams.get("max_price") || "";

//   // State
//   const [data, setData] = useState<ISanPham[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState(searchQuery);
//   const [totalPages, setTotalPages] = useState(1);

//   // MODAL HẾT MÓN
//   const [openHetMon, setOpenHetMon] = useState(false);
//   const [selected, setSelected] = useState<ISanPham | null>(null);

//   const safeImage = (src: string | null | undefined) =>
//     src ? encodeURI(src.trim()) : "/no-image.png";

//   const updateQuery = (updates: Record<string, string | undefined>) => {
//     const params = new URLSearchParams(searchParams.toString());

//     Object.entries(updates).forEach(([key, value]) => {
//       if (!value) params.delete(key);
//       else params.set(key, value);
//     });

//     router.push(`/san_pham?${params.toString()}`);
//   };

//   const fetchData = async () => {
//     try {
//       setLoading(true);

//       const qs = new URLSearchParams({
//         page: String(page),
//         search: searchQuery,
//         danh_muc,
//         min_price,
//         max_price,
//       });

//       const res = await fetch(`/api/san_pham?${qs.toString()}`);
//       const json = await res.json();

//       if (json.success) {
//         setData(json.data);
//         setTotalPages(json.totalPages);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, searchQuery, danh_muc, min_price, max_price]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       updateQuery({ search: search.trim(), page: "1" });
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [search]);

//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản Phẩm</h1>
//         <Link
//           href="/san_pham/them"
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
//         >
//           + Thêm sản phẩm
//         </Link>
//       </div>

//       {/* FILTER */}
//       <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-end">
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-600">Tìm kiếm</label>
//           <input
//             className="border rounded-lg px-3 py-2 w-60"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Tên sản phẩm..."
//           />
//         </div>

//         <DanhMucSelect
//           value={danh_muc}
//           onChange={(value) => updateQuery({ danh_muc: value, page: "1" })}
//         />

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-600">Khoảng giá nhanh</label>
//           <select
//             onChange={(e) => {
//               const [min, max] = e.target.value.split("-");
//               updateQuery({ min_price: min, max_price: max, page: "1" });
//             }}
//             className="border rounded-lg px-3 py-2 w-48"
//           >
//             <option value="">Chọn...</option>
//             <option value="0-50000">0 - 50,000</option>
//             <option value="50000-100000">50,000 - 100,000</option>
//             <option value="100000-200000">100,000 - 200,000</option>
//             <option value="200000-500000">200,000 - 500,000</option>
//           </select>
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-600">Giá min</label>
//           <input
//             type="number"
//             value={min_price}
//             onChange={(e) => updateQuery({ min_price: e.target.value, page: "1" })}
//             className="border rounded-lg px-3 py-2 w-32"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-600">Giá max</label>
//           <input
//             type="number"
//             value={max_price}
//             onChange={(e) => updateQuery({ max_price: e.target.value, page: "1" })}
//             className="border rounded-lg px-3 py-2 w-32"
//           />
//         </div>

//         <button
//           onClick={() => router.push("/san_pham")}
//           className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
//         >
//           Reset
//         </button>
//       </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto bg-white rounded-xl shadow">
//         <table className="min-w-full text-left">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-3">Hình</th>
//               <th className="px-4 py-3">Tên</th>
//               <th className="px-4 py-3">Giá</th>
//               <th className="px-4 py-3">Phong cách</th>
//               <th className="px-4 py-3">Slug</th>
//               <th className="px-4 py-3 text-center">Ẩn / Hiện</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={6} className="text-center py-6">Đang tải...</td>
//               </tr>
//             ) : data.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="text-center py-6">Không có dữ liệu</td>
//               </tr>
//             ) : (
//               data.map((item) => (
//                 <tr key={item.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-3">
//                     {/* ===== CLICK HÌNH ĐỂ MỞ MODAL HẾT MÓN ===== */}
//                     <Image
//                       onClick={() => {
//                         setSelected(item);
//                         setOpenHetMon(true);
//                       }}
//                       src={safeImage(item.hinh)}
//                       width={64}
//                       height={64}
//                       alt={item.ten}
//                       className={`w-16 h-16 rounded-lg object-cover cursor-pointer ${
//                         item.het_mon ? "opacity-40" : ""
//                       }`}
//                       unoptimized
//                     />
//                     {item.het_mon && (
//                       <span className="block text-xs mt-1 px-2 py-1 w-fit rounded bg-red-500 text-white">
//                         Hết món
//                       </span>
//                     )}
//                   </td>

//                   <td className="px-4 py-3">
//                       <Link
//                         href={`/san_pham/${item.id}`}
//                       >
//                         {item.ten}
//                       </Link>
//                     </td>

//                   <td className="px-4 py-3 text-red-600">{item.gia_goc.toLocaleString("vi-VN")}₫</td>

//                   <td className="px-4 py-3"><Link
//                         href={`/san_pham/${item.id}`}
//                       >
//                         {item.phong_cach} 
//                       </Link></td>

//                   <td className="px-4 py-3"><Link
//                         href={`/san_pham/${item.id}`}
//                       >
//                        {item.slug}
//                       </Link></td>

//                   {/* ===== GIỮ NGUYÊN ẨN / HIỆN ===== */}
//                   <td
//                     className="px-4 py-3 text-center cursor-pointer"
//                     onClick={async () => {
//                       const newState = item.an_hien ? 0 : 1;
//                       await fetch(`/api/san_pham/${item.id}`, {
//                         method: "PATCH",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({ an_hien: newState }),
//                       });
//                       setData((prev) =>
//                         prev.map((p) =>
//                           p.id === item.id ? { ...p, an_hien: !!newState } : p
//                         )
//                       );
//                     }}
//                   >
//                     {item.an_hien ? "🟢 Hiện" : "🔴 Ẩn"}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-center gap-2 mt-4">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => updateQuery({ page: String(i + 1) })}
//             className={`px-4 py-2 rounded-lg border ${
//               i + 1 === page ? "bg-blue-600 text-white" : "bg-white"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>

//       {/* MODAL HẾT MÓN */}
//       <ModalHetMon
//         open={openHetMon}
//         sanPham={selected}
//         onClose={() => setOpenHetMon(false)}
//         onSuccess={() => fetchData()}
//       />
//     </div>
//   );
// }

// export default function SanPhamList() {
//   return (
//     <Suspense fallback={<div className="p-4">Đang tải...</div>}>
//       <SanPhamListContent />
//     </Suspense>
//   );
// }
"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { ISanPham, IDanhMuc } from "@/lib/cautrucdata";

// ============================
// COMPONENT: SELECT DANH MỤC
// ============================
function DanhMucSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [danhMucList, setDanhMucList] = useState<IDanhMuc[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDanhMuc = async () => {
      try {
        const res = await fetch("/api/danh_muc");
        const json = await res.json();
        if (json.success) setDanhMucList(json.data as IDanhMuc[]);
      } finally {
        setLoading(false);
      }
    };
    fetchDanhMuc();
  }, []);

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600">Danh mục</label>
      <select
        className="border rounded-lg px-3 py-2 w-48"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
      >
        <option value="">-- Chọn danh mục --</option>
        {danhMucList.map((dm) => (
          <option key={dm.id} value={String(dm.id)}>
            {dm.ten}
          </option>
        ))}
      </select>
    </div>
  );
}

function ModalHetMon({
  open,
  onClose,
  sanPham,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  sanPham: ISanPham | null;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);

  if (!open || !sanPham) return null;

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const isHetMon =
    sanPham.het_mon &&
    new Date(sanPham.het_mon) >= startOfToday;

 const handleToggle = async () => {
  try {
      setLoading(true);

      const payload = isHetMon
        ? { co_lai_mon: true }
        : { het_mon: true };

      await fetch(`/api/san_pham/${sanPham.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      onSuccess(); 
      onClose();
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-80">
        {isHetMon ? (
          <>
            <h2 className="text-lg font-bold text-center mb-3 text-green-600">
              Mở bán lại?
            </h2>
            <p className="text-center mb-4">
              Món <b>{sanPham.ten}</b> sẽ được bán lại.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-4 text-center">
              Hết món hôm nay?
            </h2>
            <p className="text-center mb-4">
              Món <b>{sanPham.ten}</b> sẽ tạm ẩn trong ngày hôm nay.
            </p>
          </>
        )}

        <div className="flex justify-center gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            onClick={handleToggle}
            className="px-4 py-2 bg-red-500 text-white rounded"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </div>
      </div>
    </div>
  );
}


// ============================
// LIST PAGE CHÍNH
// ============================
function SanPhamListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  // Query params
  const page = Number(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("search") || "";
  const id_danh_muc = searchParams.get("id_danh_muc") || "";
  const min_price = searchParams.get("min_price") || "";
  const max_price = searchParams.get("max_price") || "";

  // State
  const [data, setData] = useState<ISanPham[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchQuery);
  const [totalPages, setTotalPages] = useState(1);

  // MODAL HẾT MÓN
  const [openHetMon, setOpenHetMon] = useState(false);
  const [selected, setSelected] = useState<ISanPham | null>(null);

  const safeImage = (src: string | null | undefined) =>
    src ? encodeURI(src.trim()) : "/no-image.png";

  const updateQuery = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });

    router.push(`/san_pham?${params.toString()}`);
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const qs = new URLSearchParams({
          page: String(page),
          search: searchQuery,
          id_danh_muc,
          min_price,
          max_price,
        });


      const res = await fetch(`/api/san_pham?${qs.toString()}`);
      const json = await res.json();

      if (json.success) {
        setData(json.data);
        setTotalPages(json.totalPages);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchData();
}, [page, searchQuery, id_danh_muc, min_price, max_price]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateQuery({ search: search.trim(), page: "1" });
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản Phẩm</h1>
        <Link
          href="/san_pham/them"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      {/* FILTER */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Tìm kiếm</label>
          <input
            className="border rounded-lg px-3 py-2 w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tên sản phẩm..."
          />
        </div>

        <DanhMucSelect
          value={id_danh_muc}
          onChange={(value) =>
            updateQuery({ id_danh_muc: value, page: "1" })
          }
        />


        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Khoảng giá nhanh</label>
          <select
            onChange={(e) => {
              const [min, max] = e.target.value.split("-");
              updateQuery({ min_price: min, max_price: max, page: "1" });
            }}
            className="border rounded-lg px-3 py-2 w-48"
          >
            <option value="">Chọn...</option>
            <option value="0-50000">0 - 50,000</option>
            <option value="50000-100000">50,000 - 100,000</option>
            <option value="100000-200000">100,000 - 200,000</option>
            <option value="200000-500000">200,000 - 500,000</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Giá min</label>
          <input
            type="number"
            value={min_price}
            onChange={(e) => updateQuery({ min_price: e.target.value, page: "1" })}
            className="border rounded-lg px-3 py-2 w-32"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Giá max</label>
          <input
            type="number"
            value={max_price}
            onChange={(e) => updateQuery({ max_price: e.target.value, page: "1" })}
            className="border rounded-lg px-3 py-2 w-32"
          />
        </div>

        <button
          onClick={() => router.push("/san_pham")}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3">Hình</th>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Phong cách</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3 text-center">Trạng Thái </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-6">Đang tải...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">Không có dữ liệu</td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {/* ===== CLICK HÌNH ĐỂ MỞ MODAL HẾT MÓN ===== */}
                    <Image
                      onClick={() => {
                        setSelected(item);
                        setOpenHetMon(true);
                      }}
                      src={safeImage(item.hinh)}
                      width={64}
                      height={64}
                      alt={item.ten}
                      className={`w-16 h-16 rounded-lg object-cover cursor-pointer ${
                        item.het_mon ? "opacity-40" : ""
                      }`}
                      unoptimized
                    />
                    {item.het_mon &&
                      new Date(item.het_mon) >= startOfToday && (
                        <span className="block text-xs mt-1 px-2 py-1 w-fit rounded bg-red-500 text-white">
                          Hết món
                        </span>
                    )}


                  </td>

                  <td className="px-4 py-3 font-medium">
                      <Link
                        href={`/san_pham/${item.id}`}
                        className="hover:text-blue-600"
                      >
                        {item.ten}
                      </Link>
                    </td>

                  <td className="px-4 py-3 text-red-600 font-semibold">
                    <Link
                        href={`/san_pham/${item.id}`}
                        className="hover:text-blue-600"
                      >
                         {item.gia_goc.toLocaleString("vi-VN")}₫
                      </Link>
                   </td>

                  <td className="px-4 py-3 text-gray-700"><Link
                        href={`/san_pham/${item.id}`}
                        className="hover:text-blue-600"
                      >
                        {item.phong_cach} 
                      </Link></td>

                  <td className="px-4 py-3 text-gray-700 text-sm"><Link
                        href={`/san_pham/${item.id}`}
                        className="hover:text-blue-600"
                      >
                       {item.slug}
                      </Link></td>

                  {/* ===== GIỮ NGUYÊN ẨN / HIỆN ===== */}
                  <td
                    className="px-5 py-4 text-center text-2xl cursor-pointer"
                    onClick={async () => {
                      const newState = item.an_hien ? 0 : 1;
                      await fetch(`/api/san_pham/${item.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ an_hien: newState }),
                      });
                      setData((prev) =>
                        prev.map((p) =>
                          p.id === item.id ? { ...p, an_hien: !!newState } : p
                        )
                      );
                    }}
                  >
                    {item.an_hien ? "✅" : "❌"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => updateQuery({ page: String(i + 1) })}
            className={`px-4 py-2 rounded-lg border ${
              i + 1 === page ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* MODAL HẾT MÓN */}
      <ModalHetMon
        open={openHetMon}
        sanPham={selected}
        onClose={() => setOpenHetMon(false)}
        onSuccess={() => fetchData()}
      />
    </div>
  );
}

export default function SanPhamList() {
  return (
    <Suspense fallback={<div className="p-4">Đang tải...</div>}>
      <SanPhamListContent />
    </Suspense>
  );
}
