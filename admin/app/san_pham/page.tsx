// // // // // // "use client";

// // // // // // import { useEffect, useState, Suspense } from "react";
// // // // // // import Link from "next/link";
// // // // // // import { useRouter, useSearchParams } from "next/navigation";
// // // // // // import { ISanPham } from "@/app/lib/cautrucdata";

// // // // // // interface ISanPhamResponse {
// // // // // //   success: boolean;
// // // // // //   data: ISanPham[];
// // // // // //   totalPages: number;
// // // // // //   totalItems: number;
// // // // // //   currentPage: number;
// // // // // // }

// // // // // // function SanPhamListContent() {
// // // // // //   const router = useRouter();
// // // // // //   const searchParams = useSearchParams();

// // // // // //   // ====== Lấy tham số từ URL ======
// // // // // //   const page = Number(searchParams.get("page") || 1);
// // // // // //   const searchQuery = searchParams.get("search") || "";
// // // // // //   const danh_muc = searchParams.get("danh_muc") || "all";

// // // // // //   // ====== State ======
// // // // // //   const [data, setData] = useState<ISanPham[]>([]);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [search, setSearch] = useState(searchQuery);
// // // // // //   const [totalPages, setTotalPages] = useState(1);
// // // // // //   const [confirmItem, setConfirmItem] = useState<ISanPham | null>(null);

// // // // // //   // ====== Cập nhật URL ======
// // // // // //   const updateQuery = (updates: Record<string, string | undefined>) => {
// // // // // //     const params = new URLSearchParams(searchParams.toString());
// // // // // //     Object.entries(updates).forEach(([key, val]) => {
// // // // // //       val ? params.set(key, val) : params.delete(key);
// // // // // //     });
// // // // // //     router.push(`/san_pham?${params.toString()}`);
// // // // // //   };

// // // // // //   // ====== Fetch API ======
// // // // // //   const fetchData = async () => {
// // // // // //     try {
// // // // // //       setLoading(true);

// // // // // //       const qs = new URLSearchParams({
// // // // // //         page: String(page),
// // // // // //         search: searchQuery,
// // // // // //         danh_muc,
// // // // // //       });

// // // // // //       const res = await fetch(`/api/san_pham?${qs.toString()}`);
// // // // // //       const json: ISanPhamResponse = await res.json();

// // // // // //       if (json.success) {
// // // // // //         setData(json.data);
// // // // // //         setTotalPages(json.totalPages);
// // // // // //       } else {
// // // // // //         setData([]);
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error("❌ Lỗi lấy danh sách sản phẩm:", err);
// // // // // //       setData([]);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchData();
// // // // // //   }, [page, searchQuery, danh_muc]);

// // // // // //   // ====== Debounce Search ======
// // // // // //   useEffect(() => {
// // // // // //     const timer = setTimeout(() => {
// // // // // //       updateQuery({ search: search.trim(), page: "1" });
// // // // // //     }, 500);
// // // // // //     return () => clearTimeout(timer);
// // // // // //   }, [search]);

// // // // // //   // ====== Xác nhận ẩn/hiện ======
// // // // // //   const handleToggleClick = (item: ISanPham) => setConfirmItem(item);

// // // // // //   const confirmToggle = async () => {
// // // // // //     if (!confirmItem) return;

// // // // // //     const id = confirmItem.id;
// // // // // //     const newState = confirmItem.an_hien ? 0 : 1;

// // // // // //     try {
// // // // // //       const res = await fetch(`/api/san_pham/${id}`, {
// // // // // //         method: "PATCH",
// // // // // //         headers: { "Content-Type": "application/json" },
// // // // // //         body: JSON.stringify({ an_hien: newState }),
// // // // // //       });

// // // // // //       if (!res.ok) throw new Error("PATCH thất bại");

// // // // // //       setData((prev) =>
// // // // // //         prev.map((p) =>
// // // // // //           p.id === id ? { ...p, an_hien: !!newState } : p
// // // // // //         )
// // // // // //       );
// // // // // //     } catch {
// // // // // //       alert("Không thể cập nhật trạng thái!");
// // // // // //     } finally {
// // // // // //       setConfirmItem(null);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div>
// // // // // //       {/* ======= HEADER ======= */}
// // // // // //       <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
// // // // // //         <h1 className="text-2xl font-bold text-gray-800">
// // // // // //           Quản lý Sản Phẩm
// // // // // //         </h1>

// // // // // //         <div className="flex gap-2 items-center flex-wrap">

// // // // // //           {/* Search */}
// // // // // //           <div className="flex items-center border border-gray-400 rounded-lg px-3 py-2 bg-white relative">
// // // // // //             <input
// // // // // //               type="text"
// // // // // //               placeholder="Tìm theo tên sản phẩm..."
// // // // // //               value={search}
// // // // // //               onChange={(e) => setSearch(e.target.value)}
// // // // // //               className="outline-none w-64 text-sm"
// // // // // //             />
// // // // // //             {search && (
// // // // // //               <button
// // // // // //                 onClick={() => {
// // // // // //                   setSearch("");
// // // // // //                   updateQuery({ search: "", page: "1" });
// // // // // //                 }}
// // // // // //                 className="absolute right-2 text-gray-500 hover:text-red-500"
// // // // // //               >
// // // // // //                 ❌
// // // // // //               </button>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           {/* Lọc danh mục */}
// // // // // //           <select
// // // // // //             value={danh_muc}
// // // // // //             onChange={(e) => updateQuery({ danh_muc: e.target.value, page: "1" })}
// // // // // //             className="border border-gray-400 rounded-lg px-3 py-2"
// // // // // //           >
// // // // // //             <option value="all">Tất cả danh mục</option>
// // // // // //             <option value="1">Danh mục 1</option>
// // // // // //             <option value="2">Danh mục 2</option>
// // // // // //           </select>

// // // // // //           <Link
// // // // // //             href="/san_pham/them"
// // // // // //             className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg shadow"
// // // // // //           >
// // // // // //             Thêm sản phẩm
// // // // // //           </Link>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* ======= TABLE ======= */}
// // // // // //       <div className="overflow-x-auto bg-white rounded-xl shadow">
// // // // // //         <table className="min-w-full text-left text-base">
// // // // // //           <thead className="bg-gray-300 text-gray-700 uppercase">
// // // // // //             <tr>
// // // // // //               <th className="px-5 py-3">Hình</th>
// // // // // //               <th className="px-5 py-3">Tên Sản Phẩm</th>
// // // // // //               <th className="px-5 py-3">Giá</th>
// // // // // //               <th className="px-5 py-3">Slug</th>
// // // // // //               <th className="px-5 py-3">Danh Mục</th>
// // // // // //               <th className="px-5 py-3 text-center">Trạng Thái</th>
// // // // // //               <th className="px-5 py-3 text-center">Sửa</th>
// // // // // //             </tr>
// // // // // //           </thead>

// // // // // //           <tbody>
// // // // // //             {loading ? (
// // // // // //               <tr>
// // // // // //                 <td colSpan={7} className="text-center py-10">
// // // // // //                   <div className="flex justify-center gap-2">
// // // // // //                     <div className="w-6 h-6 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
// // // // // //                     Đang tải dữ liệu...
// // // // // //                   </div>
// // // // // //                 </td>
// // // // // //               </tr>
// // // // // //             ) : data.length === 0 ? (
// // // // // //               <tr>
// // // // // //                 <td colSpan={7} className="text-center py-6 text-gray-500 italic">
// // // // // //                   Không có sản phẩm
// // // // // //                 </td>
// // // // // //               </tr>
// // // // // //             ) : (
// // // // // //               data.map((item) => (
// // // // // //                 <tr key={item.id} className="border-t hover:bg-gray-100">

// // // // // //                   {/* Hình ảnh */}
// // // // // //                   <td className="px-5 py-4">
// // // // // //                     <img
// // // // // //                       src={item.hinh || "/no-image.png"}
// // // // // //                       className="w-16 h-16 rounded-lg object-cover border"
// // // // // //                     />
// // // // // //                   </td>

// // // // // //                   {/* Tên */}
// // // // // //                   <td className="px-5 py-4 font-semibold">{item.ten}</td>

// // // // // //                   {/* Giá */}
// // // // // //                   <td className="px-5 py-4 text-red-600 font-medium">
// // // // // //                     {item.gia_goc.toLocaleString("vi-VN")} ₫
// // // // // //                   </td>

// // // // // //                   {/* Slug */}
// // // // // //                   <td className="px-5 py-4">{item.slug}</td>

// // // // // //                   {/* Danh mục */}
// // // // // //                   <td className="px-5 py-4">{item.id_danh_muc}</td>

// // // // // //                   {/* Trạng thái */}
// // // // // //                   <td
// // // // // //                     className="px-5 py-4 text-center cursor-pointer text-2xl"
// // // // // //                     onClick={() => handleToggleClick(item)}
// // // // // //                     title="Bấm để đổi trạng thái"
// // // // // //                   >
// // // // // //                     {item.an_hien ? "ẩn" : "hiện"}
// // // // // //                   </td>

// // // // // //                   {/* Sửa */}
// // // // // //                   <td className="px-5 py-4 text-center">
// // // // // //                     <Link
// // // // // //                       href={`/san_pham/${item.id}`}
// // // // // //                       className="text-blue-600 font-semibold hover:text-blue-800"
// // // // // //                     >
// // // // // //                       Sửa
// // // // // //                     </Link>
// // // // // //                   </td>

// // // // // //                 </tr>
// // // // // //               ))
// // // // // //             )}
// // // // // //           </tbody>
// // // // // //         </table>
// // // // // //       </div>

// // // // // //       {/* ===== PHÂN TRANG ===== */}
// // // // // //       <div className="flex justify-center mt-6 space-x-2 text-sm">
// // // // // //         <button
// // // // // //           onClick={() => updateQuery({ page: "1" })}
// // // // // //           disabled={page === 1}
// // // // // //           className="px-4 py-2 bg-gray-200 rounded-lg"
// // // // // //         >
// // // // // //           Đầu
// // // // // //         </button>

// // // // // //         {Array.from({ length: 3 }, (_, i) => {
// // // // // //           const start = Math.max(1, Math.min(page - 1, totalPages - 2));
// // // // // //           const p = start + i;
// // // // // //           return (
// // // // // //             p <= totalPages && (
// // // // // //               <button
// // // // // //                 key={p}
// // // // // //                 onClick={() => updateQuery({ page: String(p) })}
// // // // // //                 className={`px-4 py-2 rounded-lg ${
// // // // // //                   p === page ? "bg-blue-500 text-white" : "bg-gray-200"
// // // // // //                 }`}
// // // // // //               >
// // // // // //                 {p}
// // // // // //               </button>
// // // // // //             )
// // // // // //           );
// // // // // //         })}

// // // // // //         <button
// // // // // //           onClick={() => updateQuery({ page: String(totalPages) })}
// // // // // //           disabled={page === totalPages}
// // // // // //           className="px-4 py-2 bg-gray-200 rounded-lg"
// // // // // //         >
// // // // // //           Cuối
// // // // // //         </button>
// // // // // //       </div>

// // // // // //       {/* ===== MODAL XÁC NHẬN ===== */}
// // // // // //       {confirmItem && (
// // // // // //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
// // // // // //           <div className="bg-white p-6 rounded-xl shadow-lg w-[380px]">
// // // // // //             <h2 className="text-xl font-semibold text-center">
// // // // // //               Xác nhận thay đổi trạng thái
// // // // // //             </h2>
// // // // // //             <p className="text-center mt-3 text-lg">
// // // // // //               Bạn muốn{" "}
// // // // // //               <b className="text-red-600">
// // // // // //                 {confirmItem.an_hien ? "ẨN" : "HIỂN THỊ"}
// // // // // //               </b>{" "}
// // // // // //               sản phẩm{" "}
// // // // // //               <span className="font-semibold">{confirmItem.ten}</span>?
// // // // // //             </p>

// // // // // //             <div className="flex justify-center mt-5 space-x-4">
// // // // // //               <button
// // // // // //                 onClick={confirmToggle}
// // // // // //                 className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
// // // // // //               >
// // // // // //                 Có
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 onClick={() => setConfirmItem(null)}
// // // // // //                 className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg"
// // // // // //               >
// // // // // //                 Không
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default function SanPhamList() {
// // // // // //   return (
// // // // // //     <Suspense fallback={<div className="p-4 text-lg">Đang tải...</div>}>
// // // // // //       <SanPhamListContent />
// // // // // //     </Suspense>
// // // // // //   );
// // // // // // }
// // // // // "use client";

// // // // // import { useEffect, useState, Suspense } from "react";
// // // // // import Link from "next/link";
// // // // // import { useRouter, useSearchParams } from "next/navigation";
// // // // // import { ISanPham } from "@/app/lib/cautrucdata";

// // // // // interface ISanPhamResponse {
// // // // //   success: boolean;
// // // // //   data: ISanPham[];
// // // // //   totalPages: number;
// // // // //   totalItems: number;
// // // // //   currentPage: number;
// // // // // }

// // // // // function SanPhamListContent() {
// // // // //   const router = useRouter();
// // // // //   const searchParams = useSearchParams();

// // // // //   const page = Number(searchParams.get("page") || 1);
// // // // //   const searchQuery = searchParams.get("search") || "";
// // // // //   const danh_muc = searchParams.get("danh_muc") || "all";
// // // // //   const min_price = searchParams.get("min_price") || "";
// // // // //   const max_price = searchParams.get("max_price") || "";

// // // // //   const [data, setData] = useState<ISanPham[]>([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [search, setSearch] = useState(searchQuery);
// // // // //   const [totalPages, setTotalPages] = useState(1);
// // // // //   const [confirmItem, setConfirmItem] = useState<ISanPham | null>(null);

// // // // //   // ---- Cập nhật URL ----
// // // // //   const updateQuery = (updates: Record<string, string | undefined>) => {
// // // // //     const params = new URLSearchParams(searchParams.toString());
// // // // //     Object.entries(updates).forEach(([key, val]) => {
// // // // //       val !== undefined && val !== "" ? params.set(key, val) : params.delete(key);
// // // // //     });
// // // // //     router.push(`/san_pham?${params.toString()}`);
// // // // //   };

// // // // //   // ---- Fetch API ----
// // // // //   const fetchData = async () => {
// // // // //     try {
// // // // //       setLoading(true);

// // // // //       const qs = new URLSearchParams({
// // // // //         page: String(page),
// // // // //         search: searchQuery,
// // // // //         danh_muc,
// // // // //         min_price,
// // // // //         max_price,
// // // // //       });

// // // // //       const res = await fetch(`/api/san_pham?${qs.toString()}`);
// // // // //       const json: ISanPhamResponse = await res.json();

// // // // //       if (json.success) {
// // // // //         setData(json.data);
// // // // //         setTotalPages(json.totalPages);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("❌ Lỗi tải sản phẩm:", err);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchData();
// // // // //   }, [page, searchQuery, danh_muc, min_price, max_price]);

// // // // //   // ---- Debounce search ----
// // // // //   useEffect(() => {
// // // // //     const timer = setTimeout(() => {
// // // // //       updateQuery({ search: search.trim(), page: "1" });
// // // // //     }, 500);
// // // // //     return () => clearTimeout(timer);
// // // // //   }, [search]);

// // // // //   // ---- Toggle trạng thái ----
// // // // //   const confirmToggle = async () => {
// // // // //     if (!confirmItem) return;

// // // // //     const newState = confirmItem.an_hien ? 0 : 1;

// // // // //     await fetch(`/api/san_pham/${confirmItem.id}`, {
// // // // //       method: "PATCH",
// // // // //       body: JSON.stringify({ an_hien: newState }),
// // // // //       headers: { "Content-Type": "application/json" }
// // // // //     });

// // // // //     setData((prev) =>
// // // // //       prev.map((p) =>
// // // // //         p.id === confirmItem.id ? { ...p, an_hien: !!newState } : p
// // // // //       )
// // // // //     );

// // // // //     setConfirmItem(null);
// // // // //   };

// // // // //   return (
// // // // //     <div className="space-y-4">

// // // // //       {/* TITLE */}
// // // // //       <div className="flex justify-between items-center">
// // // // //         <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản Phẩm</h1>
// // // // //         <Link href="/san_pham/them" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">
// // // // //           + Thêm sản phẩm
// // // // //         </Link>
// // // // //       </div>

// // // // //       {/* FILTER UI ĐẸP */}
// // // // //       <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-end">

// // // // //         {/* Search */}
// // // // //         <div className="flex flex-col">
// // // // //           <label className="text-sm font-medium text-gray-600">Tìm kiếm</label>
// // // // //           <input
// // // // //             className="border rounded-lg px-3 py-2 w-60"
// // // // //             value={search}
// // // // //             onChange={(e) => setSearch(e.target.value)}
// // // // //             placeholder="Tên sản phẩm..."
// // // // //           />
// // // // //         </div>

// // // // //         {/* Danh mục */}
// // // // //         <div className="flex flex-col">
// // // // //           <label className="text-sm font-medium text-gray-600">Danh mục</label>
// // // // //           <select
// // // // //             value={danh_muc}
// // // // //             onChange={(e) => updateQuery({ danh_muc: e.target.value, page: "1" })}
// // // // //             className="border rounded-lg px-3 py-2 w-48"
// // // // //           >
// // // // //             <option value="all">Tất cả danh mục</option>
// // // // //             <option value="1">Đồ ăn</option>
// // // // //             <option value="2">Thức uống</option>
// // // // //           </select>
// // // // //         </div>

// // // // //         {/* Price Preset */}
// // // // //         <div className="flex flex-col">
// // // // //           <label className="text-sm font-medium text-gray-600">Khoảng giá nhanh</label>
// // // // //           <select
// // // // //             onChange={(e) => {
// // // // //               const v = e.target.value.split("-");
// // // // //               updateQuery({
// // // // //                 min_price: v[0],
// // // // //                 max_price: v[1],
// // // // //                 page: "1"
// // // // //               });
// // // // //             }}
// // // // //             className="border rounded-lg px-3 py-2 w-48"
// // // // //           >
// // // // //             <option value="">Chọn khoảng giá</option>
// // // // //             <option value="0-50000">0 - 50,000</option>
// // // // //             <option value="50000-100000">50,000 - 100,000</option>
// // // // //             <option value="100000-200000">100,000 - 200,000</option>
// // // // //             <option value="200000-500000">200,000 - 500,000</option>
// // // // //           </select>
// // // // //         </div>

// // // // //         {/* Nhập giá min/max */}
// // // // //         <div className="flex flex-col">
// // // // //           <label className="text-sm font-medium text-gray-600">Giá min</label>
// // // // //           <input
// // // // //             type="number"
// // // // //             value={min_price}
// // // // //             onChange={(e) => updateQuery({ min_price: e.target.value, page: "1" })}
// // // // //             placeholder="Từ"
// // // // //             className="border rounded-lg px-3 py-2 w-32"
// // // // //           />
// // // // //         </div>

// // // // //         <div className="flex flex-col">
// // // // //           <label className="text-sm font-medium text-gray-600">Giá max</label>
// // // // //           <input
// // // // //             type="number"
// // // // //             value={max_price}
// // // // //             onChange={(e) => updateQuery({ max_price: e.target.value, page: "1" })}
// // // // //             placeholder="Đến"
// // // // //             className="border rounded-lg px-3 py-2 w-32"
// // // // //           />
// // // // //         </div>

// // // // //         {/* Reset */}
// // // // //         <button
// // // // //           onClick={() =>
// // // // //             router.push("/san_pham")
// // // // //           }
// // // // //           className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
// // // // //         >
// // // // //           Reset
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* TABLE */}
// // // // //       <div className="overflow-x-auto bg-white rounded-xl shadow">
// // // // //         <table className="min-w-full text-left">
// // // // //           <thead className="bg-gray-200">
// // // // //             <tr>
// // // // //               <th className="px-4 py-3">Hình</th>
// // // // //               <th className="px-4 py-3">Tên</th>
// // // // //               <th className="px-4 py-3">Giá</th>
// // // // //               <th className="px-4 py-3">Danh mục</th>
// // // // //               <th className="px-4 py-3">Slug</th>
// // // // //               <th className="px-4 py-3 text-center">Trạng thái</th>
// // // // //               <th className="px-4 py-3 text-center">Sửa</th>
// // // // //             </tr>
// // // // //           </thead>
// // // // //           <tbody>
// // // // //             {loading ? (
// // // // //               <tr><td colSpan={7} className="text-center py-6">⏳ Đang tải...</td></tr>
// // // // //             ) : data.length === 0 ? (
// // // // //               <tr><td colSpan={7} className="text-center py-6 italic">Không có dữ liệu</td></tr>
// // // // //             ) : (
// // // // //               data.map((item) => (
// // // // //                 <tr key={item.id} className="border-t hover:bg-gray-50">
// // // // //                    <td className="px-4 py-3">
// // // // //   <img
// // // // //     src={
// // // // //       item.hinh ||
// // // // //       "/no-image.png"
// // // // //     }
// // // // //     className="w-16 h-16 rounded-lg object-cover"
// // // // //   />
// // // // // </td>

// // // // //                    <td className="px-4 py-3">
// // // // //   <Link
// // // // //     href={`/san_pham/${item.id}`}
// // // // //     className="hover:text-blue-600 block truncate"
// // // // //   >
// // // // //     {item.ten}
// // // // //   </Link>
// // // // // </td>




// // // // //                   <td className="px-4 py-3 text-red-600 font-semibold">
// // // // //                     {item.gia_goc.toLocaleString("vi-VN")}₫
// // // // //                   </td>
// // // // //                   <td className="px-4 py-3">{item.id_danh_muc}</td>
// // // // //                   <td className="px-4 py-3">{item.slug}</td>

// // // // //                   <td
// // // // //                     className="px-4 py-3 text-center cursor-pointer"
// // // // //                     onClick={() => setConfirmItem(item)}
// // // // //                   >
// // // // //                     {item.an_hien ? "🟢 Hiện" : "🔴 Ẩn"}
// // // // //                   </td>

// // // // //                   <td className="px-4 py-3 text-center">
// // // // //                     <Link href={`/san_pham/${item.id}`} className="text-blue-600">
// // // // //                       Sửa
// // // // //                     </Link>
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               ))
// // // // //             )}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       </div>

// // // // //       {/* PAGINATION */}
// // // // //       <div className="flex justify-center gap-2 mt-4">
// // // // //         {Array.from({ length: totalPages }, (_, i) => (
// // // // //           <button
// // // // //             key={i}
// // // // //             onClick={() => updateQuery({ page: String(i + 1) })}
// // // // //             className={`px-4 py-2 rounded-lg border ${
// // // // //               i + 1 === page ? "bg-blue-600 text-white" : "bg-white"
// // // // //             }`}
// // // // //           >
// // // // //             {i + 1}
// // // // //           </button>
// // // // //         ))}
// // // // //       </div>

// // // // //       {/* MODAL */}
// // // // //       {confirmItem && (
// // // // //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
// // // // //           <div className="bg-white p-6 rounded-xl w-80">
// // // // //             <h2 className="text-xl font-semibold text-center mb-4">Xác nhận</h2>
// // // // //             <p className="text-center mb-4">
// // // // //               Bạn muốn {confirmItem.an_hien ? "ẨN" : "HIỂN THỊ"} sản phẩm{" "}
// // // // //               <b>{confirmItem.ten}</b>?
// // // // //             </p>
// // // // //             <div className="flex justify-center gap-4">
// // // // //               <button
// // // // //                 onClick={confirmToggle}
// // // // //                 className="bg-blue-600 text-white px-4 py-2 rounded-lg"
// // // // //               >
// // // // //                 Có
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={() => setConfirmItem(null)}
// // // // //                 className="bg-gray-300 px-4 py-2 rounded-lg"
// // // // //               >
// // // // //                 Không
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default function SanPhamList() {
// // // // //   return (
// // // // //     <Suspense fallback={<div className="p-4">Đang tải...</div>}>
// // // // //       <SanPhamListContent />
// // // // //     </Suspense>
// // // // //   );
// // // // // }
// // // // "use client";

// // // // import { useEffect, useState, Suspense } from "react";
// // // // import Link from "next/link";
// // // // import Image from "next/image";
// // // // import { useRouter, useSearchParams } from "next/navigation";
// // // // import { ISanPham } from "@/app/lib/cautrucdata";

// // // // interface ISanPhamResponse {
// // // //   success: boolean;
// // // //   data: ISanPham[];
// // // //   totalPages: number;
// // // //   totalItems: number;
// // // //   currentPage: number;
// // // // }

// // // // function SanPhamListContent() {
// // // //   const router = useRouter();
// // // //   const searchParams = useSearchParams();

// // // //   const page = Number(searchParams.get("page") || 1);
// // // //   const searchQuery = searchParams.get("search") || "";
// // // //   const danh_muc = searchParams.get("danh_muc") || "all";
// // // //   const min_price = searchParams.get("min_price") || "";
// // // //   const max_price = searchParams.get("max_price") || "";

// // // //   const [data, setData] = useState<ISanPham[]>([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [search, setSearch] = useState(searchQuery);
// // // //   const [totalPages, setTotalPages] = useState(1);
// // // //   const [confirmItem, setConfirmItem] = useState<ISanPham | null>(null);

// // // // const safeImage = (src: string | null | undefined) =>
// // // //   src ? encodeURI(src.trim()) : "/no-image.png";


// // // //   const updateQuery = (updates: Record<string, string | undefined>) => {
// // // //     const params = new URLSearchParams(searchParams.toString());
// // // //     Object.entries(updates).forEach(([key, val]) => {
// // // //       val !== undefined && val !== "" ? params.set(key, val) : params.delete(key);
// // // //     });
// // // //     router.push(`/san_pham?${params.toString()}`);
// // // //   };

// // // //   const fetchData = async () => {
// // // //     try {
// // // //       setLoading(true);

// // // //       const qs = new URLSearchParams({
// // // //         page: String(page),
// // // //         search: searchQuery,
// // // //         danh_muc,
// // // //         min_price,
// // // //         max_price,
// // // //       });

// // // //       const res = await fetch(`/api/san_pham?${qs.toString()}`);
// // // //       const json: ISanPhamResponse = await res.json();

// // // //       if (json.success) {
// // // //         setData(json.data);
// // // //         setTotalPages(json.totalPages);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(" Lỗi tải sản phẩm:", err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //   }, [page, searchQuery, danh_muc, min_price, max_price]);

// // // //   // ---- Debounce search ----
// // // //   useEffect(() => {
// // // //     const timer = setTimeout(() => {
// // // //       updateQuery({ search: search.trim(), page: "1" });
// // // //     }, 500);
// // // //     return () => clearTimeout(timer);
// // // //   }, [search]);

// // // //   // ---- Toggle trạng thái ----
// // // //   const confirmToggle = async () => {
// // // //     if (!confirmItem) return;

// // // //     const newState = confirmItem.an_hien ? 0 : 1;

// // // //     await fetch(`/api/san_pham/${confirmItem.id}`, {
// // // //       method: "PATCH",
// // // //       body: JSON.stringify({ an_hien: newState }),
// // // //       headers: { "Content-Type": "application/json" },
// // // //     });

// // // //     setData((prev) =>
// // // //       prev.map((p) => (p.id === confirmItem.id ? { ...p, an_hien: !!newState } : p))
// // // //     );

// // // //     setConfirmItem(null);
// // // //   };

// // // //   return (
// // // //     <div className="space-y-4">
// // // //       {/* TITLE */}
// // // //       <div className="flex justify-between items-center">
// // // //         <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản Phẩm</h1>
// // // //         <Link
// // // //           href="/san_pham/them"
// // // //           className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
// // // //         >
// // // //           + Thêm sản phẩm
// // // //         </Link>
// // // //       </div>

// // // //       {/* FILTER UI */}
// // // //       <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-end">
// // // //         {/* Search */}
// // // //         <div className="flex flex-col">
// // // //           <label className="text-sm font-medium text-gray-600">Tìm kiếm</label>
// // // //           <input
// // // //             className="border rounded-lg px-3 py-2 w-60"
// // // //             value={search}
// // // //             onChange={(e) => setSearch(e.target.value)}
// // // //             placeholder="Tên sản phẩm..."
// // // //           />
// // // //         </div>

// // // //         {/* Danh mục */}
// // // //         <div className="flex flex-col">
// // // //           <label className="text-sm font-medium text-gray-600">Danh mục</label>
// // // //           <select
// // // //             value={danh_muc}
// // // //             onChange={(e) => updateQuery({ danh_muc: e.target.value, page: "1" })}
// // // //             className="border rounded-lg px-3 py-2 w-48"
// // // //           >
// // // //             <option value="all">Tất cả danh mục</option>
// // // //             <option value="1">Đồ ăn</option>
// // // //             <option value="2">Thức uống</option>
// // // //           </select>
// // // //         </div>

// // // //         {/* Khoảng giá nhanh */}
// // // //         <div className="flex flex-col">
// // // //           <label className="text-sm font-medium text-gray-600">Khoảng giá nhanh</label>
// // // //           <select
// // // //             onChange={(e) => {
// // // //               const v = e.target.value.split("-");
// // // //               updateQuery({
// // // //                 min_price: v[0],
// // // //                 max_price: v[1],
// // // //                 page: "1",
// // // //               });
// // // //             }}
// // // //             className="border rounded-lg px-3 py-2 w-48"
// // // //           >
// // // //             <option value="">Chọn khoảng giá</option>
// // // //             <option value="0-50000">0 - 50,000</option>
// // // //             <option value="50000-100000">50,000 - 100,000</option>
// // // //             <option value="100000-200000">100,000 - 200,000</option>
// // // //             <option value="200000-500000">200,000 - 500,000</option>
// // // //           </select>
// // // //         </div>

// // // //         {/* Giá min/max */}
// // // //         <div className="flex flex-col">
// // // //           <label className="text-sm font-medium text-gray-600">Giá min</label>
// // // //           <input
// // // //             type="number"
// // // //             value={min_price}
// // // //             onChange={(e) => updateQuery({ min_price: e.target.value, page: "1" })}
// // // //             placeholder="Từ"
// // // //             className="border rounded-lg px-3 py-2 w-32"
// // // //           />
// // // //         </div>
// // // //         <div className="flex flex-col">
// // // //           <label className="text-sm font-medium text-gray-600">Giá max</label>
// // // //           <input
// // // //             type="number"
// // // //             value={max_price}
// // // //             onChange={(e) => updateQuery({ max_price: e.target.value, page: "1" })}
// // // //             placeholder="Đến"
// // // //             className="border rounded-lg px-3 py-2 w-32"
// // // //           />
// // // //         </div>

// // // //         {/* Reset */}
// // // //         <button
// // // //           onClick={() => router.push("/san_pham")}
// // // //           className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
// // // //         >
// // // //           Reset
// // // //         </button>
// // // //       </div>

// // // //       {/* TABLE */}
// // // //       <div className="overflow-x-auto bg-white rounded-xl shadow">
// // // //         <table className="min-w-full text-left">
// // // //           <thead className="bg-gray-200">
// // // //             <tr>
// // // //               <th className="px-4 py-3">Hình</th>
// // // //               <th className="px-4 py-3">Tên</th>
// // // //               <th className="px-4 py-3">Giá</th>
// // // //               <th className="px-4 py-3">Danh mục</th>
// // // //               <th className="px-4 py-3">Slug</th>
// // // //               <th className="px-4 py-3 text-center">Trạng thái</th>
// // // //               <th className="px-4 py-3 text-center">Sửa</th>
// // // //             </tr>
// // // //           </thead>
// // // //           <tbody>
// // // //             {loading ? (
// // // //               <tr>
// // // //                 <td colSpan={7} className="text-center py-6">
// // // //                   ⏳ Đang tải...
// // // //                 </td>
// // // //               </tr>
// // // //             ) : data.length === 0 ? (
// // // //               <tr>
// // // //                 <td colSpan={7} className="text-center py-6 italic">
// // // //                   Không có dữ liệu
// // // //                 </td>
// // // //               </tr>
// // // //             ) : (
// // // //               data.map((item) => (
// // // //                 <tr key={item.id} className="border-t hover:bg-gray-50">
// // // //                   <td className="px-4 py-3">
// // // //                     <Image
// // // //                       src={safeImage(item.hinh)}
// // // //                       width={64}
// // // //                       height={64}
// // // //                       alt={item.ten}
// // // //                       className="w-16 h-16 rounded-lg object-cover"
// // // //                       unoptimized
// // // //                     />
// // // //                   </td>
// // // //                   <td className="px-4 py-3">
// // // //                     <Link
// // // //                       href={`/san_pham/${item.id}`}
// // // //                       className="hover:text-blue-600 block truncate"
// // // //                     >
// // // //                       {item.ten}
// // // //                     </Link>
// // // //                   </td>
// // // //                   <td className="px-4 py-3 text-red-600 font-semibold">
// // // //                     {item.gia_goc.toLocaleString("vi-VN")}₫
// // // //                   </td>
// // // //                   <td className="px-4 py-3">{item.id_danh_muc}</td>
// // // //                   <td className="px-4 py-3">{item.slug}</td>
// // // //                   <td
// // // //                     className="px-4 py-3 text-center cursor-pointer"
// // // //                     onClick={() => setConfirmItem(item)}
// // // //                   >
// // // //                     {item.an_hien ? "🟢 Hiện" : "🔴 Ẩn"}
// // // //                   </td>
// // // //                   <td className="px-4 py-3 text-center">
// // // //                     <Link href={`/san_pham/${item.id}`} className="text-blue-600">
// // // //                       Sửa
// // // //                     </Link>
// // // //                   </td>
// // // //                 </tr>
// // // //               ))
// // // //             )}
// // // //           </tbody>
// // // //         </table>
// // // //       </div>

// // // //       {/* PAGINATION */}
// // // //       <div className="flex justify-center gap-2 mt-4">
// // // //         {Array.from({ length: totalPages }, (_, i) => (
// // // //           <button
// // // //             key={i}
// // // //             onClick={() => updateQuery({ page: String(i + 1) })}
// // // //             className={`px-4 py-2 rounded-lg border ${
// // // //               i + 1 === page ? "bg-blue-600 text-white" : "bg-white"
// // // //             }`}
// // // //           >
// // // //             {i + 1}
// // // //           </button>
// // // //         ))}
// // // //       </div>

// // // //       {/* MODAL */}
// // // //       {confirmItem && (
// // // //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
// // // //           <div className="bg-white p-6 rounded-xl w-80">
// // // //             <h2 className="text-xl font-semibold text-center mb-4">Xác nhận</h2>
// // // //             <p className="text-center mb-4">
// // // //               Bạn muốn {confirmItem.an_hien ? "ẨN" : "HIỂN THỊ"} sản phẩm{" "}
// // // //               <b>{confirmItem.ten}</b>?
// // // //             </p>
// // // //             <div className="flex justify-center gap-4">
// // // //               <button
// // // //                 onClick={confirmToggle}
// // // //                 className="bg-blue-600 text-white px-4 py-2 rounded-lg"
// // // //               >
// // // //                 Có
// // // //               </button>
// // // //               <button
// // // //                 onClick={() => setConfirmItem(null)}
// // // //                 className="bg-gray-300 px-4 py-2 rounded-lg"
// // // //               >
// // // //                 Không
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // export default function SanPhamList() {
// // // //   return (
// // // //     <Suspense fallback={<div className="p-4">Đang tải...</div>}>
// // // //       <SanPhamListContent />
// // // //     </Suspense>
// // // //   );
// // // // }
// // // "use client";

// // // import { useEffect, useState, Suspense } from "react";
// // // import Link from "next/link";
// // // import Image from "next/image";
// // // import { useRouter, useSearchParams } from "next/navigation";
// // // import { ISanPham } from "@/app/lib/cautrucdata";

// // // interface ISanPhamResponse {
// // //   success: boolean;
// // //   data: ISanPham[];
// // //   totalPages: number;
// // //   totalItems: number;
// // //   currentPage: number;
// // // }

// // // function SanPhamListContent() {
// // //   const router = useRouter();
// // //   const searchParams = useSearchParams();

// // //   // Query hiện tại
// // //   const page = Number(searchParams.get("page") || "1");
// // //   const searchQuery = searchParams.get("search") || "";
// // //   const danh_muc = searchParams.get("danh_muc") || "all";
// // //   const min_price = searchParams.get("min_price") || "";
// // //   const max_price = searchParams.get("max_price") || "";

// // //   // State
// // //   const [data, setData] = useState<ISanPham[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [search, setSearch] = useState(searchQuery);
// // //   const [totalPages, setTotalPages] = useState(1);
// // //   const [confirmItem, setConfirmItem] = useState<ISanPham | null>(null);

// // //   const safeImage = (src: string | null | undefined) =>
// // //     src ? encodeURI(src.trim()) : "/no-image.png";

// // //   // Cập nhật URL Query
// // //   const updateQuery = (updates: Record<string, string | undefined>) => {
// // //     const params = new URLSearchParams(searchParams.toString());
// // //     Object.entries(updates).forEach(([key, value]) => {
// // //       if (value === undefined || value === "") params.delete(key);
// // //       else params.set(key, value);
// // //     });

// // //     router.push(`/san_pham?${params.toString()}`);
// // //   };

// // //   // Fetch data
// // //   const fetchData = async () => {
// // //     try {
// // //       setLoading(true);

// // //       const qs = new URLSearchParams({
// // //         page: String(page),
// // //         search: searchQuery,
// // //         danh_muc,
// // //         min_price,
// // //         max_price,
// // //       });

// // //       const res = await fetch(`/api/san_pham?${qs.toString()}`);
// // //       const json: ISanPhamResponse = await res.json();

// // //       if (json.success) {
// // //         setData(json.data);
// // //         setTotalPages(json.totalPages);
// // //       }
// // //     } catch (err) {
// // //       console.error("Lỗi tải sản phẩm:", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchData();
// // //   }, [page, searchQuery, danh_muc, min_price, max_price]);

// // //   // Debounce search
// // //   useEffect(() => {
// // //     const timer = setTimeout(() => {
// // //       updateQuery({ search: search.trim(), page: "1" });
// // //     }, 500);
// // //     return () => clearTimeout(timer);
// // //   }, [search]);

// // //   // Toggle trạng thái
// // //   const confirmToggle = async () => {
// // //     if (!confirmItem) return;

// // //     const newState = confirmItem.an_hien ? 0 : 1;

// // //     await fetch(`/api/san_pham/${confirmItem.id}`, {
// // //       method: "PATCH",
// // //       body: JSON.stringify({ an_hien: newState }),
// // //       headers: { "Content-Type": "application/json" },
// // //     });

// // //     setData((prev) =>
// // //       prev.map((p) =>
// // //         p.id === confirmItem.id ? { ...p, an_hien: !!newState } : p
// // //       )
// // //     );

// // //     setConfirmItem(null);
// // //   };

// // //   return (
// // //     <div className="space-y-4">
// // //       <div className="flex justify-between items-center">
// // //         <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản Phẩm</h1>
// // //         <Link
// // //           href="/san_pham/them"
// // //           className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
// // //         >
// // //           + Thêm sản phẩm
// // //         </Link>
// // //       </div>

// // //       {/* FILTER */}
// // //       <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-end">

// // //         {/* Search */}
// // //         <div className="flex flex-col">
// // //           <label className="text-sm font-medium text-gray-600">Tìm kiếm</label>
// // //           <input
// // //             className="border rounded-lg px-3 py-2 w-60"
// // //             value={search}
// // //             onChange={(e) => setSearch(e.target.value)}
// // //             placeholder="Tên sản phẩm..."
// // //           />
// // //         </div>

// // //         {/* Danh mục */}
// // //         <div className="flex flex-col">
// // //           <label className="text-sm font-medium text-gray-600">Danh mục</label>
// // //           <select
// // //             value={danh_muc}
// // //             onChange={(e) => updateQuery({ danh_muc: e.target.value, page: "1" })}
// // //             className="border rounded-lg px-3 py-2 w-48"
// // //           >
// // //             <option value="all">Tất cả</option>
// // //             <option value="1">Đồ ăn</option>
// // //             <option value="2">Thức uống</option>
// // //           </select>
// // //         </div>

// // //         {/* Khoảng giá nhanh */}
// // //         <div className="flex flex-col">
// // //           <label className="text-sm font-medium text-gray-600">
// // //             Khoảng giá nhanh
// // //           </label>
// // //           <select
// // //             onChange={(e) => {
// // //               const [min, max] = e.target.value.split("-");
// // //               updateQuery({
// // //                 min_price: min,
// // //                 max_price: max,
// // //                 page: "1",
// // //               });
// // //             }}
// // //             className="border rounded-lg px-3 py-2 w-48"
// // //           >
// // //             <option value="">Chọn...</option>
// // //             <option value="0-50000">0 - 50,000</option>
// // //             <option value="50000-100000">50,000 - 100,000</option>
// // //             <option value="100000-200000">100,000 - 200,000</option>
// // //             <option value="200000-500000">200,000 - 500,000</option>
// // //           </select>
// // //         </div>

// // //         {/* Giá min/max */}
// // //         <div className="flex flex-col">
// // //           <label className="text-sm font-medium text-gray-600">Giá min</label>
// // //           <input
// // //             type="number"
// // //             value={min_price}
// // //             onChange={(e) =>
// // //               updateQuery({ min_price: e.target.value, page: "1" })
// // //             }
// // //             className="border rounded-lg px-3 py-2 w-32"
// // //           />
// // //         </div>

// // //         <div className="flex flex-col">
// // //           <label className="text-sm font-medium text-gray-600">Giá max</label>
// // //           <input
// // //             type="number"
// // //             value={max_price}
// // //             onChange={(e) =>
// // //               updateQuery({ max_price: e.target.value, page: "1" })
// // //             }
// // //             className="border rounded-lg px-3 py-2 w-32"
// // //           />
// // //         </div>

// // //         {/* Reset */}
// // //         <button
// // //           onClick={() => router.push("/san_pham")}
// // //           className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
// // //         >
// // //           Reset
// // //         </button>
// // //       </div>

// // //       {/* TABLE */}
// // //       <div className="overflow-x-auto bg-white rounded-xl shadow">
// // //         <table className="min-w-full text-left">
// // //           <thead className="bg-gray-200">
// // //             <tr>
// // //               <th className="px-4 py-3">Hình</th>
// // //               <th className="px-4 py-3">Tên</th>
// // //               <th className="px-4 py-3">Giá</th>
// // //               <th className="px-4 py-3">Danh mục</th>
// // //               <th className="px-4 py-3">Slug</th>
// // //               <th className="px-4 py-3 text-center">Trạng thái</th>
// // //               <th className="px-4 py-3 text-center">Sửa</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {loading ? (
// // //               <tr>
// // //                 <td colSpan={7} className="text-center py-6">
// // //                   Đang tải...
// // //                 </td>
// // //               </tr>
// // //             ) : data.length === 0 ? (
// // //               <tr>
// // //                 <td colSpan={7} className="text-center py-6">
// // //                   Không có dữ liệu
// // //                 </td>
// // //               </tr>
// // //             ) : (
// // //               data.map((item) => (
// // //                 <tr key={item.id} className="border-t hover:bg-gray-50">
// // //                   <td className="px-4 py-3">
// // //                     <Image
// // //                       src={safeImage(item.hinh)}
// // //                       width={64}
// // //                       height={64}
// // //                       alt={item.ten}
// // //                       className="w-16 h-16 rounded-lg object-cover"
// // //                       unoptimized
// // //                     />
// // //                   </td>

// // //                   <td className="px-4 py-3">
// // //                     <Link
// // //                       href={`/san_pham/${item.id}`}
// // //                       className="hover:text-blue-600 block truncate"
// // //                     >
// // //                       {item.ten}
// // //                     </Link>
// // //                   </td>

// // //                   <td className="px-4 py-3 text-red-600 font-semibold">
// // //                     {item.gia_goc.toLocaleString("vi-VN")}₫
// // //                   </td>

// // //                   <td className="px-4 py-3">{item.id_danh_muc}</td>

// // //                   <td className="px-4 py-3">{item.slug}</td>

// // //                   <td
// // //                     className="px-4 py-3 text-center cursor-pointer"
// // //                     onClick={() => setConfirmItem(item)}
// // //                   >
// // //                     {item.an_hien ? "🟢 Hiện" : "🔴 Ẩn"}
// // //                   </td>

// // //                   <td className="px-4 py-3 text-center">
// // //                     <Link href={`/san_pham/${item.id}`} className="text-blue-600">
// // //                       Sửa
// // //                     </Link>
// // //                   </td>
// // //                 </tr>
// // //               ))
// // //             )}
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //       {/* PAGINATION */}
// // //       <div className="flex justify-center gap-2 mt-4">
// // //         {Array.from({ length: totalPages }, (_, i) => (
// // //           <button
// // //             key={i}
// // //             onClick={() => updateQuery({ page: String(i + 1) })}
// // //             className={`px-4 py-2 rounded-lg border ${
// // //               i + 1 === page ? "bg-blue-600 text-white" : "bg-white"
// // //             }`}
// // //           >
// // //             {i + 1}
// // //           </button>
// // //         ))}
// // //       </div>

// // //       {/* MODAL */}
// // //       {confirmItem && (
// // //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
// // //           <div className="bg-white p-6 rounded-xl w-80">
// // //             <h2 className="text-xl font-semibold text-center mb-4">Xác nhận</h2>
// // //             <p className="text-center mb-4">
// // //               Bạn muốn {confirmItem.an_hien ? "ẨN" : "HIỂN THỊ"} sản phẩm{" "}
// // //               <b>{confirmItem.ten}</b>?
// // //             </p>
// // //             <div className="flex justify-center gap-4">
// // //               <button
// // //                 onClick={confirmToggle}
// // //                 className="bg-blue-600 text-white px-4 py-2 rounded-lg"
// // //               >
// // //                 Có
// // //               </button>
// // //               <button
// // //                 onClick={() => setConfirmItem(null)}
// // //                 className="bg-gray-300 px-4 py-2 rounded-lg"
// // //               >
// // //                 Không
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // export default function SanPhamList() {
// // //   return (
// // //     <Suspense fallback={<div className="p-4">Đang tải...</div>}>
// // //       <SanPhamListContent />
// // //     </Suspense>
// // //   );
// // // }
// // "use client";

// // import { useEffect, useState, Suspense } from "react";
// // import Link from "next/link";
// // import Image from "next/image";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import { ISanPham, IDanhMuc } from "@/app/lib/cautrucdata";

// // // ============================
// // // COMPONENT: SELECT DANH MỤC
// // // ============================
// // function DanhMucSelect({
// //   value,
// //   onChange,
// // }: {
// //   value: string;
// //   onChange: (v: string) => void;
// // }) {
// //   const [danhMucList, setDanhMucList] = useState<IDanhMuc[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);

// //   useEffect(() => {
// //     const fetchDanhMuc = async () => {
// //       try {
// //         const res = await fetch("/api/danh_muc");
// //         const json = await res.json();

// //         if (json.success) {
// //           setDanhMucList(json.data as IDanhMuc[]);
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDanhMuc();
// //   }, []);

// //   return (
// //     <div className="flex flex-col">
// //       <label className="text-sm font-medium text-gray-600">Danh mục</label>

// //       <select
// //         className="border rounded-lg px-3 py-2 w-48"
// //         value={value}
// //         onChange={(e) => onChange(e.target.value)}
// //         disabled={loading}
// //       >
// //         <option value="">-- Chọn danh mục --</option>

// //         {danhMucList.map((dm) => (
// //           <option key={dm.id} value={dm.ten}>
// //             {dm.ten}
// //           </option>
// //         ))}
// //       </select>
// //     </div>
// //   );
// // }

// // // ============================
// // // MAIN PAGE CONTENT
// // // ============================
// // interface ISanPhamResponse {
// //   success: boolean;
// //   data: ISanPham[];
// //   totalPages: number;
// //   totalItems: number;
// //   currentPage: number;
// // }

// // function SanPhamListContent() {
// //   const router = useRouter();
// //   const searchParams = useSearchParams();

// //   // Query hiện tại
// //   const page = Number(searchParams.get("page") || "1");
// //   const searchQuery = searchParams.get("search") || "";
// //   const danh_muc = searchParams.get("danh_muc") || "";
// //   const min_price = searchParams.get("min_price") || "";
// //   const max_price = searchParams.get("max_price") || "";

// //   // State
// //   const [data, setData] = useState<ISanPham[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState(searchQuery);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [confirmItem, setConfirmItem] = useState<ISanPham | null>(null);

// //   const safeImage = (src: string | null | undefined) =>
// //     src ? encodeURI(src.trim()) : "/no-image.png";

// //   // Cập nhật URL Query
// //   const updateQuery = (updates: Record<string, string | undefined>) => {
// //     const params = new URLSearchParams(searchParams.toString());
// //     Object.entries(updates).forEach(([key, value]) => {
// //       if (!value) params.delete(key);
// //       else params.set(key, value);
// //     });

// //     router.push(`/san_pham?${params.toString()}`);
// //   };

// //   // Fetch data
// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);

// //       const qs = new URLSearchParams({
// //         page: String(page),
// //         search: searchQuery,
// //         danh_muc,
// //         min_price,
// //         max_price,
// //       });

// //       const res = await fetch(`/api/san_pham?${qs.toString()}`);
// //       const json: ISanPhamResponse = await res.json();

// //       if (json.success) {
// //         setData(json.data);
// //         setTotalPages(json.totalPages);
// //       }
// //     } catch (err) {
// //       console.error("Lỗi tải sản phẩm:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, [page, searchQuery, danh_muc, min_price, max_price]);

// //   // Debounce search
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       updateQuery({ search: search.trim(), page: "1" });
// //     }, 500);
// //     return () => clearTimeout(timer);
// //   }, [search]);

// //   // Toggle trạng thái
// //   const confirmToggle = async () => {
// //     if (!confirmItem) return;

// //     const newState = confirmItem.an_hien ? 0 : 1;

// //     await fetch(`/api/san_pham/${confirmItem.id}`, {
// //       method: "PATCH",
// //       body: JSON.stringify({ an_hien: newState }),
// //       headers: { "Content-Type": "application/json" },
// //     });

// //     setData((prev) =>
// //       prev.map((p) =>
// //         p.id === confirmItem.id ? { ...p, an_hien: !!newState } : p
// //       )
// //     );

// //     setConfirmItem(null);
// //   };

// //   return (
// //     <div className="space-y-4">
// //       <div className="flex justify-between items-center">
// //         <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản Phẩm</h1>
// //         <Link
// //           href="/san_pham/them"
// //           className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow"
// //         >
// //           + Thêm sản phẩm
// //         </Link>
// //       </div>

// //       {/* FILTER */}
// //       <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4 items-end">

// //         {/* Search */}
// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium text-gray-600">Tìm kiếm</label>
// //           <input
// //             className="border rounded-lg px-3 py-2 w-60"
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             placeholder="Tên sản phẩm..."
// //           />
// //         </div>

// //         {/* Danh mục động */}
// //         <DanhMucSelect
// //           value={danh_muc}
// //           onChange={(value) => updateQuery({ danh_muc: value, page: "1" })}
// //         />

// //         {/* Khoảng giá nhanh */}
// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium text-gray-600">
// //             Khoảng giá nhanh
// //           </label>
// //           <select
// //             onChange={(e) => {
// //               const [min, max] = e.target.value.split("-");
// //               updateQuery({
// //                 min_price: min,
// //                 max_price: max,
// //                 page: "1",
// //               });
// //             }}
// //             className="border rounded-lg px-3 py-2 w-48"
// //           >
// //             <option value="">Chọn...</option>
// //             <option value="0-50000">0 - 50,000</option>
// //             <option value="50000-100000">50,000 - 100,000</option>
// //             <option value="100000-200000">100,000 - 200,000</option>
// //             <option value="200000-500000">200,000 - 500,000</option>
// //           </select>
// //         </div>

// //         {/* Giá min/max */}
// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium text-gray-600">Giá min</label>
// //           <input
// //             type="number"
// //             value={min_price}
// //             onChange={(e) =>
// //               updateQuery({ min_price: e.target.value, page: "1" })
// //             }
// //             className="border rounded-lg px-3 py-2 w-32"
// //           />
// //         </div>

// //         <div className="flex flex-col">
// //           <label className="text-sm font-medium text-gray-600">Giá max</label>
// //           <input
// //             type="number"
// //             value={max_price}
// //             onChange={(e) =>
// //               updateQuery({ max_price: e.target.value, page: "1" })
// //             }
// //             className="border rounded-lg px-3 py-2 w-32"
// //           />
// //         </div>

// //         {/* Reset */}
// //         <button
// //           onClick={() => router.push("/san_pham")}
// //           className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
// //         >
// //           Reset
// //         </button>
// //       </div>

// //       {/* TABLE */}
// //       <div className="overflow-x-auto bg-white rounded-xl shadow">
// //         <table className="min-w-full text-left">
// //           <thead className="bg-gray-200">
// //             <tr>
// //               <th className="px-4 py-3">Hình</th>
// //               <th className="px-4 py-3">Tên</th>
// //               <th className="px-4 py-3">Giá</th>
// //               <th className="px-4 py-3">Danh mục</th>
// //               <th className="px-4 py-3">Slug</th>
// //               <th className="px-4 py-3 text-center">Trạng thái</th>
// //               <th className="px-4 py-3 text-center">Sửa</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {loading ? (
// //               <tr>
// //                 <td colSpan={7} className="text-center py-6">
// //                   Đang tải...
// //                 </td>
// //               </tr>
// //             ) : data.length === 0 ? (
// //               <tr>
// //                 <td colSpan={7} className="text-center py-6">
// //                   Không có dữ liệu
// //                 </td>
// //               </tr>
// //             ) : (
// //               data.map((item) => (
// //                 <tr key={item.id} className="border-t hover:bg-gray-50">
// //                   <td className="px-4 py-3">
// //                     <Image
// //                       src={safeImage(item.hinh)}
// //                       width={64}
// //                       height={64}
// //                       alt={item.ten}
// //                       className="w-16 h-16 rounded-lg object-cover"
// //                       unoptimized
// //                     />
// //                   </td>

// //                   <td className="px-4 py-3">
// //                     <Link
// //                       href={`/san_pham/${item.id}`}
// //                       className="hover:text-blue-600 block truncate"
// //                     >
// //                       {item.ten}
// //                     </Link>
// //                   </td>

// //                   <td className="px-4 py-3 text-red-600 font-semibold">
// //                     {item.gia_goc.toLocaleString("vi-VN")}₫
// //                   </td>

// //                   {/* Hiển thị đúng tên danh mục */}
// //                   <td className="px-4 py-3">{item.ten_danh_muc}</td>

// //                   <td className="px-4 py-3">{item.slug}</td>

// //                   <td
// //                     className="px-4 py-3 text-center cursor-pointer"
// //                     onClick={() => setConfirmItem(item)}
// //                   >
// //                     {item.an_hien ? "🟢 Hiện" : "🔴 Ẩn"}
// //                   </td>

// //                   <td className="px-4 py-3 text-center">
// //                     <Link href={`/san_pham/${item.id}`} className="text-blue-600">
// //                       Sửa
// //                     </Link>
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* PAGINATION */}
// //       <div className="flex justify-center gap-2 mt-4">
// //         {Array.from({ length: totalPages }, (_, i) => (
// //           <button
// //             key={i}
// //             onClick={() => updateQuery({ page: String(i + 1) })}
// //             className={`px-4 py-2 rounded-lg border ${
// //               i + 1 === page ? "bg-blue-600 text-white" : "bg-white"
// //             }`}
// //           >
// //             {i + 1}
// //           </button>
// //         ))}
// //       </div>

// //       {/* MODAL */}
// //       {confirmItem && (
// //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
// //           <div className="bg-white p-6 rounded-xl w-80">
// //             <h2 className="text-xl font-semibold text-center mb-4">Xác nhận</h2>
// //             <p className="text-center mb-4">
// //               Bạn muốn {confirmItem.an_hien ? "ẨN" : "HIỂN THỊ"} sản phẩm{" "}
// //               <b>{confirmItem.ten}</b>?
// //             </p>
// //             <div className="flex justify-center gap-4">
// //               <button
// //                 onClick={confirmToggle}
// //                 className="bg-blue-600 text-white px-4 py-2 rounded-lg"
// //               >
// //                 Có
// //               </button>
// //               <button
// //                 onClick={() => setConfirmItem(null)}
// //                 className="bg-gray-300 px-4 py-2 rounded-lg"
// //               >
// //                 Không
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // ============================
// // // EXPORT
// // // ============================
// // export default function SanPhamList() {
// //   return (
// //     <Suspense fallback={<div className="p-4">Đang tải...</div>}>
// //       <SanPhamListContent />
// //     </Suspense>
// //   );
// // }
// "use client";

// import { useEffect, useState, Suspense } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ISanPham, IDanhMuc } from "@/app/lib/cautrucdata";

// // ============================
// // COMPONENT: SELECT DANH MỤC (ĐÃ SỬA ĐÚNG ID)
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

//         if (json.success) {
//           setDanhMucList(json.data as IDanhMuc[]);
//         }
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
// // MAIN PAGE CONTENT
// // ============================
// interface ISanPhamResponse {
//   success: boolean;
//   data: ISanPham[];
//   totalPages: number;
//   totalItems: number;
//   currentPage: number;
// }

// function SanPhamListContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const page = Number(searchParams.get("page") || "1");
//   const searchQuery = searchParams.get("search") || "";
//   const danh_muc = searchParams.get("danh_muc") || "";
//   const min_price = searchParams.get("min_price") || "";
//   const max_price = searchParams.get("max_price") || "";

//   const [data, setData] = useState<ISanPham[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState(searchQuery);
//   const [totalPages, setTotalPages] = useState(1);
//   const [confirmItem, setConfirmItem] = useState<ISanPham | null>(null);

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
//       const json: ISanPhamResponse = await res.json();

//       if (json.success) {
//         setData(json.data);
//         setTotalPages(json.totalPages);
//       }
//     } catch (err) {
//       console.error("Lỗi tải sản phẩm:", err);
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

//   const confirmToggle = async () => {
//     if (!confirmItem) return;

//     const newState = confirmItem.an_hien ? 0 : 1;

//     await fetch(`/api/san_pham/${confirmItem.id}`, {
//       method: "PATCH",
//       body: JSON.stringify({ an_hien: newState }),
//       headers: { "Content-Type": "application/json" },
//     });

//     setData((prev) =>
//       prev.map((p) =>
//         p.id === confirmItem.id ? { ...p, an_hien: !!newState } : p
//       )
//     );

//     setConfirmItem(null);
//   };

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
//         {/* Search */}
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-600">Tìm kiếm</label>
//           <input
//             className="border rounded-lg px-3 py-2 w-60"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Tên sản phẩm..."
//           />
//         </div>

//         {/* Danh mục */}
//         <DanhMucSelect
//           value={danh_muc}
//           onChange={(value) => updateQuery({ danh_muc: value, page: "1" })}
//         />

//         {/* Khoảng giá */}
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-600">
//             Khoảng giá nhanh
//           </label>
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

//         {/* Giá min/max */}
//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-600">Giá min</label>
//           <input
//             type="number"
//             value={min_price}
//             onChange={(e) =>
//               updateQuery({ min_price: e.target.value, page: "1" })
//             }
//             className="border rounded-lg px-3 py-2 w-32"
//           />
//         </div>

//         <div className="flex flex-col">
//           <label className="text-sm font-medium text-gray-600">Giá max</label>
//           <input
//             type="number"
//             value={max_price}
//             onChange={(e) =>
//               updateQuery({ max_price: e.target.value, page: "1" })
//             }
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
//               <th className="px-4 py-3">Danh mục</th>
//               <th className="px-4 py-3">Slug</th>
//               <th className="px-4 py-3 text-center">Trạng thái</th>
//               <th className="px-4 py-3 text-center">Sửa</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={7} className="text-center py-6">
//                   Đang tải...
//                 </td>
//               </tr>
//             ) : data.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="text-center py-6">
//                   Không có dữ liệu
//                 </td>
//               </tr>
//             ) : (
//               data.map((item) => (
//                 <tr key={item.id} className="border-t hover:bg-gray-50">
//                   <td className="px-4 py-3">
//                     <Image
//                       src={safeImage(item.hinh)}
//                       width={64}
//                       height={64}
//                       alt={item.ten}
//                       className="w-16 h-16 rounded-lg object-cover"
//                       unoptimized
//                     />
//                   </td>
//                   <td className="px-4 py-3">{item.ten}</td>
//                   <td className="px-4 py-3 text-red-600">
//                     {item.gia_goc.toLocaleString("vi-VN")}₫
//                   </td>
//                   <td className="px-4 py-3">{item.ten_danh_muc}</td>
//                   <td className="px-4 py-3">{item.slug}</td>
//                   <td
//                     className="px-4 py-3 text-center cursor-pointer"
//                     onClick={() => setConfirmItem(item)}
//                   >
//                     {item.an_hien ? "🟢 Hiện" : "🔴 Ẩn"}
//                   </td>
//                   <td className="px-4 py-3 text-center">
//                     <Link href={`/san_pham/${item.id}`} className="text-blue-600">
//                       Sửa
//                     </Link>
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

//       {/* MODAL */}
//       {confirmItem && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl w-80">
//             <h2 className="text-xl font-semibold text-center mb-4">Xác nhận</h2>
//             <p className="text-center mb-4">
//               Bạn muốn {confirmItem.an_hien ? "ẨN" : "HIỂN"} sản phẩm{" "}
//               <b>{confirmItem.ten}</b>?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={confirmToggle}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//               >
//                 Có
//               </button>
//               <button
//                 onClick={() => setConfirmItem(null)}
//                 className="bg-gray-300 px-4 py-2 rounded-lg"
//               >
//                 Không
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ============================
// // EXPORT
// // ============================
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
import { ISanPham, IDanhMuc } from "@/app/lib/cautrucdata";

// ============================
// COMPONENT: SELECT DANH MỤC (FILTER THEO ID)
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

        if (json.success) {
          setDanhMucList(json.data as IDanhMuc[]);
        }
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

// ============================
// RESPONSE TYPE
// ============================
interface ISanPhamResponse {
  success: boolean;
  data: ISanPham[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
}

// ============================
// MAIN PAGE CONTENT
// ============================
function SanPhamListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("search") || "";
  const danh_muc = searchParams.get("danh_muc") || "";
  const min_price = searchParams.get("min_price") || "";
  const max_price = searchParams.get("max_price") || "";

  const [data, setData] = useState<ISanPham[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchQuery);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmItem, setConfirmItem] = useState<ISanPham | null>(null);

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
        danh_muc,
        min_price,
        max_price,
      });

      const res = await fetch(`/api/san_pham?${qs.toString()}`);
      const json: ISanPhamResponse = await res.json();

      if (json.success) {
        setData(json.data);
        setTotalPages(json.totalPages);
      }
    } catch (err) {
      console.error("Lỗi tải sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, searchQuery, danh_muc, min_price, max_price]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateQuery({ search: search.trim(), page: "1" });
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const confirmToggle = async () => {
    if (!confirmItem) return;

    const newState = confirmItem.an_hien ? 0 : 1;

    await fetch(`/api/san_pham/${confirmItem.id}`, {
      method: "PATCH",
      body: JSON.stringify({ an_hien: newState }),
      headers: { "Content-Type": "application/json" },
    });

    setData((prev) =>
      prev.map((p) =>
        p.id === confirmItem.id ? { ...p, an_hien: !!newState } : p
      )
    );

    setConfirmItem(null);
  };

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
        {/* Search */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Tìm kiếm</label>
          <input
            className="border rounded-lg px-3 py-2 w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tên sản phẩm..."
          />
        </div>

        {/* Danh mục */}
        <DanhMucSelect
          value={danh_muc}
          onChange={(value) => updateQuery({ danh_muc: value, page: "1" })}
        />

        {/* Khoảng giá */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">
            Khoảng giá nhanh
          </label>
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

        {/* Giá min/max */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Giá min</label>
          <input
            type="number"
            value={min_price}
            onChange={(e) =>
              updateQuery({ min_price: e.target.value, page: "1" })
            }
            className="border rounded-lg px-3 py-2 w-32"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600">Giá max</label>
          <input
            type="number"
            value={max_price}
            onChange={(e) =>
              updateQuery({ max_price: e.target.value, page: "1" })
            }
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
              <th className="px-4 py-3">Danh mục</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3 text-center">Trạng thái</th>
              <th className="px-4 py-3 text-center">Sửa</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  Đang tải...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/san_pham/${item.id}`)}
                  >
                  <td className="px-4 py-3">
                    <Image
                      src={safeImage(item.hinh)}
                      width={64}
                      height={64}
                      alt={item.ten}
                      className="w-16 h-16 rounded-lg object-cover"
                      unoptimized
                    />
                  </td>
                  <td className="px-4 py-3">{item.ten}</td>
                  <td className="px-4 py-3 text-red-600">
                    {item.gia_goc.toLocaleString("vi-VN")}₫
                  </td>

                  {/* ✅ HIỂN THỊ DANH MỤC ĐÚNG CHUẨN SEQUELIZE */}
                  <td className="px-4 py-3">
                    {(item as ISanPham & { danh_muc?: IDanhMuc }).danh_muc?.ten ??
                      "Chưa gán"}
                  </td>

                  <td className="px-4 py-3">{item.slug}</td>
                  <td
                    className="px-4 py-3 text-center cursor-pointer"
                    onClick={() => setConfirmItem(item)}
                  >
                    {item.an_hien ? "🟢 Hiện" : "🔴 Ẩn"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link href={`/san_pham/${item.id}`} className="text-blue-600">
                      Sửa
                    </Link>
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

      {/* MODAL */}
      {confirmItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="text-xl font-semibold text-center mb-4">Xác nhận</h2>
            <p className="text-center mb-4">
              Bạn muốn {confirmItem.an_hien ? "ẨN" : "HIỂN"} sản phẩm{" "}
              <b>{confirmItem.ten}</b>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmToggle}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Có
              </button>
              <button
                onClick={() => setConfirmItem(null)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================
// EXPORT
// ============================
export default function SanPhamList() {
  return (
    <Suspense fallback={<div className="p-4">Đang tải...</div>}>
      <SanPhamListContent />
    </Suspense>
  );
}
