
// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import { IMaGiamGia } from "../lib/cautrucdata";

// // type StatusKey = "all" | "upcoming" | "active" | "expired";

// // export default function MaGiamGiaList() {
// //   const [data, setData] = useState<IMaGiamGia[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [confirmAnHien, setConfirmAnHien] = useState<IMaGiamGia | null>(null);
// //   const [search, setSearch] = useState("");
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [status, setStatus] = useState<StatusKey>("all");
// //   const [page, setPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);

// //   // ======== Lấy dữ liệu ========
// //   const fetchData = async () => {
// //     try {
// //       setLoading(true);
// //       const qs = new URLSearchParams({
// //         page: String(page),
// //         search: searchQuery,
// //         status,
// //       });
// //       const res = await fetch(`/api/ma_giam_gia?${qs.toString()}`);
// //       const json = await res.json();
// //       setData(json.data);
// //       setTotalPages(json.totalPages);
// //     } catch (error) {
// //       console.error("Lỗi khi tải mã giảm giá:", error);
// //       setData([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, [page, searchQuery, status]);

// //   const handleSearch = () => {
// //     setPage(1);
// //     setSearchQuery(search.trim());
// //   };

// //   const handleToggleAnHien = (item: IMaGiamGia) => setConfirmAnHien(item);

// //   const confirmToggle = async () => {
// //     if (!confirmAnHien) return;
// //     const id = confirmAnHien.id;
// //     const newState = !confirmAnHien.an_hien;

// //     const res = await fetch(`/api/ma_giam_gia/${id}`, {
// //       method: "PATCH",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ an_hien: newState }),
// //     });

// //     if (res.ok) {
// //       setData((prev) =>
// //         prev.map((item) =>
// //           item.id === id ? { ...item, an_hien: newState } : item
// //         )
// //       );
// //     } else {
// //       alert("Không thể cập nhật trạng thái!");
// //     }
// //     setConfirmAnHien(null);
// //   };

// //   const formatDate = (dateString: string) =>
// //     new Date(dateString).toLocaleDateString("vi-VN", {
// //       day: "2-digit",
// //       month: "2-digit",
// //       year: "numeric",
// //     });

// //   function getHieuLucBadge(bat_dau: string, ket_thuc: string) {
// //     const now = new Date();
// //     const start = new Date(bat_dau);
// //     const end = new Date(ket_thuc);

// //     if (now < start)
// //       return { label: "Chưa hoạt động", color: "bg-gray-200 text-gray-700 border-gray-400" };
// //     if (now > end)
// //       return { label: "Đã hết hạn", color: "bg-red-100 text-red-700 border-red-300" };
// //     return { label: "Đang hoạt động", color: "bg-green-100 text-green-700 border-green-300" };
// //   }

// //   if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold mb-2 text-gray-800">Quản lý Mã Giảm Giá</h1>

// //       {/* Tìm kiếm + Lọc + Thêm */}
// //       <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
// //         <div className="flex gap-2 flex-wrap">
// //           <input
// //             type="text"
// //             placeholder="Nhập tên hoặc mã số..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
// //             className="border border-gray-400 rounded-lg px-3 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400" />
// //           <button
// //             onClick={handleSearch}
// //             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
// //             Tìm
// //           </button>

// //           <select
// //             value={status}
// //             onChange={(e) => {
// //               setPage(1);
// //               setStatus(e.target.value as StatusKey);
// //             }}
// //             className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
// //             <option value="all">Tất cả</option>
// //             <option value="active">Đang hoạt động</option>
// //             <option value="upcoming">Chưa hoạt động</option>
// //             <option value="expired">Đã hết hạn</option>
// //           </select>
// //         </div>

// //         <Link
// //           href="/ma_giam_gia/them"
// //           className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow">
// //           Thêm Mã Giảm Giá
// //         </Link>
// //       </div>

// //       {/* Bảng dữ liệu */}
// //       <div className="overflow-x-auto bg-white rounded-xl shadow-md">
// //         <table className="min-w-full text-sm text-left border-collapse">
// //           <thead className="bg-gray-300 text-gray-700 uppercase">
// //             <tr>
// //               <th className="px-4 py-3">Tên / Mã số</th>
// //               <th className="px-4 py-3 text-center">Giá trị giảm</th>
// //               <th className="px-4 py-3 text-center">Giảm tối đa</th>
// //               <th className="px-4 py-3 text-center">GTG Tối thiểu</th>
// //               <th className="px-4 py-3 text-center">Số lượng</th>
// //               <th className="px-4 py-3 text-center">Hiệu lực</th>
// //               <th className="px-4 py-3 text-center max-w-[150px] truncate">Mô tả</th>
// //               <th className="px-4 py-3 text-center">Trạng thái</th>
// //               <th className="px-4 py-3 text-center">Sửa</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {data.length === 0 ? (
// //               <tr>
// //                 <td colSpan={9} className="text-center py-4 text-gray-500">
// //                   Không tìm thấy dữ liệu
// //                 </td>
// //               </tr>
// //             ) : (
// //               data.map((mgg) => {
// //                 const badge = getHieuLucBadge(mgg.bat_dau, mgg.ket_thuc);

// //                 return (
// //                   <tr key={mgg.id} className="border-t hover:bg-gray-200 transition-all duration-150">
// //                     <td className="px-4 py-3 font-semibold max-w-[250px] truncate">
// //                       {mgg.ten}
// //                       <br />
// //                       <span className="text-sm text-gray-600">({mgg.ma_so})</span>
// //                     </td>

// //                     <td className="px-4 py-3 text-center text-red-600">
// //                       {mgg.loai_giam_gia
// //                         ? `${mgg.gia_tri_giam}%`
// //                         : `${mgg.gia_tri_giam.toLocaleString("vi")} ₫`}
// //                     </td>

// //                     <td className="px-4 py-3 text-center text-red-600">
// //                       {mgg.gia_tri_giam_toi_da != null
// //                         ? mgg.gia_tri_giam_toi_da.toLocaleString("vi")
// //                         : "-"}
// //                     </td>

// //                     <td className="px-4 py-3 text-center">
// //                       {mgg.gia_tri_toi_thieu.toLocaleString("vi")} ₫
// //                     </td>

// //                     <td className="px-4 py-3 text-center">{mgg.so_luong}</td>

// //                     {/* Hiệu lực */}
// //                     <td className="px-4 py-3 text-center">
// //                       <div
// //                         className={`rounded-lg p-2 border ${badge.color} text-sm leading-tight flex flex-col items-center`}>
// //                         <span className="font-semibold">{badge.label}</span>
// //                         <span className="text-xs mt-1">
// //                           {formatDate(mgg.bat_dau)} → {formatDate(mgg.ket_thuc)}
// //                         </span>
// //                       </div>
// //                     </td>

// //                     <td className="px-4 py-3 text-center max-w-[180px] truncate">{mgg.mo_ta}</td>

// //                     <td
// //                       className="px-4 py-3 text-center cursor-pointer select-none text-xl"
// //                       onClick={() => handleToggleAnHien(mgg)}
// //                       title="Bấm để ẩn/hiện">
// //                       {mgg.an_hien ? "✅" : "❌"}
// //                     </td>

// //                     <td className="px-4 py-3 text-center">
// //                       <Link
// //                         href={`/ma_giam_gia/${mgg.id}`}
// //                         className="text-blue-500 hover:text-blue-700 font-semibold">
// //                         Sửa
// //                       </Link>
// //                     </td>
// //                   </tr>
// //                 );
// //               })
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Phân trang */}
// //       <div className="flex justify-center mt-4 space-x-2">
// //         <button
// //           onClick={() => setPage(1)}
// //           disabled={page === 1}
// //           className={`px-3 py-1 rounded ${page === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"
// //             }`}>
// //           Đầu
// //         </button>

// //         {Array.from({ length: 3 }, (_, i) => {
// //           const start = Math.max(1, Math.min(page - 1, totalPages - 2));
// //           const p = start + i;
// //           return (
// //             p <= totalPages && (
// //               <button
// //                 key={p}
// //                 onClick={() => setPage(p)}
// //                 className={`px-3 py-1 rounded ${p === page ? "bg-blue-500 text-white font-bold scale-105" : "bg-gray-200 hover:bg-gray-300"
// //                   }`} >
// //                 {p}
// //               </button>
// //             )
// //           );
// //         })}

// //         <button
// //           onClick={() => setPage(totalPages)}
// //           disabled={page === totalPages}
// //           className={`px-3 py-1 rounded ${page === totalPages
// //               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
// //               : "bg-gray-200 hover:bg-gray-300"
// //             }`} >
// //           Cuối
// //         </button>
// //       </div>

// //       {/* Modal xác nhận ẩn/hiện */}
// //       {confirmAnHien && (
// //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg p-6 shadow-lg w-[380px]">
// //             <h2 className="text-lg font-semibold mb-3 text-center">Xác nhận thay đổi trạng thái</h2>
// //             <p className="text-center mb-5">
// //               Bạn có muốn{" "}
// //               <span className="font-semibold text-red-600">
// //                 {confirmAnHien.an_hien ? "ẩn" : "hiển thị"}
// //               </span>{" "}
// //               mã giảm giá{" "}
// //               <span className="font-semibold">
// //                 {confirmAnHien.ten} ({confirmAnHien.ma_so})
// //               </span>{" "}
// //               không?
// //             </p>
// //             <div className="flex justify-center space-x-3">
// //               <button
// //                 onClick={confirmToggle}
// //                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
// //                 Có
// //               </button>
// //               <button
// //                 onClick={() => setConfirmAnHien(null)}
// //                 className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">
// //                 Không
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// "use client";

// import { useEffect, useState, Suspense } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { IMaGiamGia } from "../lib/cautrucdata";

// type StatusKey = "all" | "upcoming" | "active" | "expired";

// function MaGiamGiaListContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const page = Number(searchParams.get("page") || 1);
//   const searchQuery = searchParams.get("search") || "";
//   const status = (searchParams.get("status") || "all") as StatusKey;

//   const [data, setData] = useState<IMaGiamGia[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [confirmAnHien, setConfirmAnHien] = useState<IMaGiamGia | null>(null);
//   const [search, setSearch] = useState(searchQuery);
//   const [totalPages, setTotalPages] = useState(1);

//   //  Cập nhật URL khi thay đổi tham số
//   const updateQuery = (updates: Record<string, string | undefined>) => {
//     const params = new URLSearchParams(searchParams.toString());
//     Object.entries(updates).forEach(([key, val]) => {
//       if (val && val !== "") params.set(key, val);
//       else params.delete(key);
//     });
//     const newUrl = `/ma_giam_gia?${params.toString()}`;
//     router.push(newUrl);
//   };

//   // ======== Lấy dữ liệu ========
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const qs = new URLSearchParams({
//         page: String(page),
//         search: searchQuery,
//         status,
//       });
//       const res = await fetch(`/api/ma_giam_gia?${qs.toString()}`);
//       const json = await res.json();
//       setData(json.data);
//       setTotalPages(json.totalPages);
//     } catch (error) {
//       console.error("❌ Lỗi khi tải mã giảm giá:", error);
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [page, searchQuery, status]);

//   const handleSearch = () => {
//     updateQuery({ page: "1", search: search.trim() });
//   };

//   const handleToggleAnHien = (item: IMaGiamGia) => setConfirmAnHien(item);

//   const confirmToggle = async () => {
//     if (!confirmAnHien) return;
//     const id = confirmAnHien.id;
//     const newState = !confirmAnHien.an_hien;

//     const res = await fetch(`/api/ma_giam_gia/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ an_hien: newState }),
//     });

//     if (res.ok) {
//       setData((prev) =>
//         prev.map((item) =>
//           item.id === id ? { ...item, an_hien: newState } : item
//         )
//       );
//     } else {
//       alert("Không thể cập nhật trạng thái!");
//     }
//     setConfirmAnHien(null);
//   };

//   const formatDate = (dateString: string) =>
//     new Date(dateString).toLocaleDateString("vi-VN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });

//   function getHieuLucBadge(bat_dau: string, ket_thuc: string) {
//     const now = new Date();
//     const start = new Date(bat_dau);
//     const end = new Date(ket_thuc);

//     if (now < start)
//       return { label: "Chưa hoạt động", color: "bg-gray-200 text-gray-700 border-gray-400" };
//     if (now > end)
//       return { label: "Đã hết hạn", color: "bg-red-100 text-red-700 border-red-300" };
//     return { label: "Đang hoạt động", color: "bg-green-100 text-green-700 border-green-300" };
//   }

//   if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
//         {/* Tiêu đề */}
//         <h1 className="text-2xl font-bold text-gray-800">Quản lý Mã Giảm Giá</h1>

//         <div className="flex items-center gap-2">
//           <select value={status} onChange={(e) => updateQuery({ status: e.target.value, page: "1" })}
//             className="border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none">
//             <option value="all">Tất cả</option>
//             <option value="active">Đang hoạt động</option>
//             <option value="upcoming">Chưa hoạt động</option>
//             <option value="expired">Đã hết hạn</option>
//           </select>

//           <input type="text" placeholder="🔍 Nhập tên hoặc mã giảm giá..." value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//             className="border rounded-lg px-3 py-1.5 w-52 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />

//           <button onClick={handleSearch}
//             className="bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-600 transition-colors" >
//             Tìm
//           </button>

//           <Link href="/ma_giam_gia/them"
//             className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-1.5 rounded-lg text-sm shadow">
//             Thêm mã giảm giá
//           </Link>
//         </div>
//       </div>


//       {/* Bảng dữ liệu */}
//       <div className="overflow-x-auto bg-white rounded-xl shadow-md">
//         <table className="min-w-full text-sm text-left border-collapse">
//           <thead className="bg-gray-300 text-gray-700 uppercase">
//             <tr>
//               <th className="px-4 py-3">Tên / Mã số</th>
//               <th className="px-4 py-3 text-center">Giá trị giảm <br />
//                 (GTG tối thiểu)
//               </th>
//               <th className="px-4 py-3 text-center">Giảm tối đa</th>
//               {/* <th className="px-4 py-3 text-center">GTG Tối thiểu</th> */}
//               <th className="px-4 py-3 text-center">Số lượng</th>
//               <th className="px-4 py-3 text-center">Hiệu lực</th>
//               <th className="px-4 py-3 text-center max-w-[150px] truncate">Mô tả</th>
//               <th className="px-4 py-3 text-center">Trạng thái</th>
//               <th className="px-4 py-3 text-center">Sửa</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.length === 0 ? (
//               <tr>
//                 <td colSpan={9} className="text-center py-4 text-gray-500">
//                   Không tìm thấy dữ liệu
//                 </td>
//               </tr>
//             ) : (
//               data.map((mgg) => {
//                 const badge = getHieuLucBadge(mgg.bat_dau, mgg.ket_thuc);

//                 return (
//                   <tr key={mgg.id} className="border-t hover:bg-gray-200 transition-all duration-150">
//                     <td className="px-4 py-3 font-semibold max-w-[200px] truncate">
//                       {mgg.ten}
//                       <br />
//                       <span className="text-sm text-gray-600">({mgg.ma_so})</span>
//                     </td>

//                     <td className="px-4 py-3 text-center text-red-600">
//                       {mgg.loai_giam_gia
//                         ? `${mgg.gia_tri_giam}%`
//                         : `${mgg.gia_tri_giam.toLocaleString("vi")} ₫`} <br />
//                       <p className="px-4 py-3 text-center text-gray-700">
//                         ( {mgg.gia_tri_toi_thieu.toLocaleString("vi")} ₫)
//                       </p>

//                     </td>

//                     <td className="px-4 py-3 text-center text-red-600">
//                       {mgg.gia_tri_giam_toi_da != null
//                         ? mgg.gia_tri_giam_toi_da.toLocaleString("vi")
//                         : "-"}
//                     </td>

//                     {/* <td className="px-4 py-3 text-center">
//                       {mgg.gia_tri_toi_thieu.toLocaleString("vi")} ₫
//                     </td> */}

//                     <td className="px-4 py-3 text-center">{mgg.so_luong}</td>

//                     {/* Hiệu lực */}
//                     <td className="px-4 py-3 text-center w-[200px]">
//                       <div
//                         className={`rounded-lg p-2 border ${badge.color} text-sm leading-tight flex flex-col items-center`}>
//                         <span className="font-semibold">{badge.label}</span>
//                         <span className="text-xs mt-1">
//                           {formatDate(mgg.bat_dau)} → {formatDate(mgg.ket_thuc)}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="px-4 py-3 text-center w-[250px] truncate">
//                       {mgg.mo_ta?.trim() ? mgg.mo_ta : "-"}

//                     </td>

//                     <td
//                       className="px-4 py-3 text-center cursor-pointer select-none text-xl"
//                       onClick={() => handleToggleAnHien(mgg)}
//                       title="Bấm để ẩn/hiện">
//                       {mgg.an_hien ? "✅" : "❌"}
//                     </td>

//                     <td className="px-4 py-3 text-center">
//                       <Link
//                         href={`/ma_giam_gia/${mgg.id}`}
//                         className="text-blue-500 hover:text-blue-700 font-semibold">
//                         Sửa
//                       </Link>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Phân trang */}
//       <div className="flex justify-center mt-4 space-x-2">
//         <button
//           onClick={() => updateQuery({ page: "1" })}
//           disabled={page === 1}
//           className={`px-3 py-1 rounded ${page === 1
//             ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//             : "bg-gray-200 hover:bg-gray-300"
//             }`}>
//           Đầu
//         </button>

//         {Array.from({ length: 3 }, (_, i) => {
//           const start = Math.max(1, Math.min(page - 1, totalPages - 2));
//           const p = start + i;
//           return (
//             p <= totalPages && (
//               <button
//                 key={p}
//                 onClick={() => updateQuery({ page: String(p) })}
//                 className={`px-3 py-1 rounded ${p === page
//                   ? "bg-blue-500 text-white font-bold scale-105"
//                   : "bg-gray-200 hover:bg-gray-300"
//                   }`}>
//                 {p}
//               </button>
//             )
//           );
//         })}

//         <button
//           onClick={() => updateQuery({ page: String(totalPages) })}
//           disabled={page === totalPages}
//           className={`px-3 py-1 rounded ${page === totalPages
//             ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//             : "bg-gray-200 hover:bg-gray-300"
//             }`}>
//           Cuối
//         </button>
//       </div>

//       {/* Modal xác nhận ẩn/hiện */}
//       {confirmAnHien && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 shadow-lg w-[380px]">
//             <h2 className="text-lg font-semibold mb-3 text-center">
//               Xác nhận thay đổi trạng thái
//             </h2>
//             <p className="text-center mb-5">
//               Bạn có muốn{" "}
//               <span className="font-semibold text-red-600">
//                 {confirmAnHien.an_hien ? "ẩn" : "hiển thị"}
//               </span>{" "}
//               mã giảm giá{" "}
//               <span className="font-semibold">
//                 {confirmAnHien.ten} ({confirmAnHien.ma_so})
//               </span>{" "}
//               không?
//             </p>
//             <div className="flex justify-center space-x-3">
//               <button
//                 onClick={confirmToggle}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
//                 Có
//               </button>
//               <button
//                 onClick={() => setConfirmAnHien(null)}
//                 className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">
//                 Không
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function MaGiamGiaList() {
//   return (
//     <Suspense fallback={<div className="p-4">Đang tải mã giảm giá...</div>}>
//       <MaGiamGiaListContent />
//     </Suspense>
//   );
// }




"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { IMaGiamGia } from "@/app/lib/cautrucdata";

type StatusKey = "all" | "upcoming" | "active" | "expired";

function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

function getHieuLucBadge(bat_dau: string, ket_thuc: string) {
  const now = new Date();
  const start = new Date(bat_dau);
  const end = new Date(ket_thuc);

  if (now < start)
    return {
      label: "Chưa hoạt động",
      color: "bg-gray-200 text-gray-700 border-gray-400",
    };
  if (now > end)
    return {
      label: "Đã hết hạn",
      color: "bg-red-100 text-red-700 border-red-300",
    };
  return {
    label: "Đang hoạt động",
    color: "bg-green-100 text-green-700 border-green-300",
  };
}

function MaGiamGiaListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageParam = Number(searchParams.get("page") || 1);
  const qParam = searchParams.get("search") || "";
  const statusParam = (searchParams.get("status") || "all") as StatusKey;

  const [allData, setAllData] = useState<IMaGiamGia[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmAnHien, setConfirmAnHien] = useState<IMaGiamGia | null>(null);
  const [searchInput, setSearchInput] = useState(qParam);
  const [page, setPage] = useState<number>(pageParam);
  const [status, setStatus] = useState<StatusKey>(statusParam);

  const pageSize = 10;

  // 🔍 Tự động tìm kiếm (debounce 0.5s)
  useEffect(() => {
    const delay = setTimeout(() => {
      // Nếu chuỗi rỗng => xoá param search
      if (searchInput.trim() === "") {
        updateQuery({ search: undefined, page: "1" });
      } else {
        updateQuery({ search: searchInput.trim(), page: "1" });
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput]);


  const updateQuery = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val && val !== "") params.set(key, val);
      else params.delete(key);
    });
    router.replace(`/ma_giam_gia?${params.toString()}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/ma_giam_gia");
        const json = await res.json();
        const rows: IMaGiamGia[] = Array.isArray(json.data)
          ? json.data
          : json.data || [];
        setAllData(rows);
      } catch (err) {
        console.error("Lỗi khi lấy mã giảm giá:", err);
        setAllData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setPage(pageParam);
    setStatus(statusParam);
    setSearchInput(qParam);
  }, [pageParam, statusParam, qParam]);

  const filtered = useMemo(() => {
    let tmp = allData.slice();

    const q = (searchParams.get("search") || "").trim().toLowerCase();
    if (q) {
      tmp = tmp.filter(
        (x) =>
          (x.ten || "").toLowerCase().includes(q) ||
          (x.ma_so || "").toLowerCase().includes(q)
      );
    }

    const st = (searchParams.get("status") || "all") as StatusKey;
    if (st === "upcoming") {
      tmp = tmp.filter((x) => new Date(x.bat_dau) > new Date());
    } else if (st === "active") {
      tmp = tmp.filter(
        (x) =>
          new Date(x.bat_dau) <= new Date() && new Date(x.ket_thuc) >= new Date()
      );
    } else if (st === "expired") {
      tmp = tmp.filter((x) => new Date(x.ket_thuc) < new Date());
    }

    return tmp;
  }, [allData, searchParams]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const pageData = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSearch = () => {
    updateQuery({ page: "1", search: searchInput.trim() || undefined });
  };

  const handleStatusChange = (s: StatusKey) => {
    updateQuery({ status: s === "all" ? undefined : s, page: "1" });
  };

  const goToPage = (p: number) => {
    updateQuery({ page: String(p) });
  };

  const handleToggleAnHien = (item: IMaGiamGia) => setConfirmAnHien(item);

  const confirmToggle = async () => {
    if (!confirmAnHien) return;
    const id = confirmAnHien.id;
    const newState = !confirmAnHien.an_hien;

    try {
      const res = await fetch(`/api/ma_giam_gia/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ an_hien: newState }),
      });
      if (res.ok) {
        // update local copy
        setAllData((prev) => prev.map((it) => (it.id === id ? { ...it, an_hien: newState } : it)));
      } else {
        alert("Không thể cập nhật trạng thái!");
      }
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
      alert("Không thể cập nhật trạng thái!");
    } finally {
      setConfirmAnHien(null);
    }
  };

  if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Mã Giảm Giá</h1>

        <div className="flex items-center gap-2">
          {/* Bộ lọc trạng thái */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as StatusKey);
              handleStatusChange(e.target.value as StatusKey);
            }}
            className="border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none">
            <option value="all">Tất cả</option>
            <option value="active">Đang hoạt động</option>
            <option value="upcoming">Chưa hoạt động</option>
            <option value="expired">Đã hết hạn</option>
          </select>

          {/* Ô tìm kiếm có icon & nút xoá */}
          <div className="flex items-center border rounded-lg px-2 py-1.5 bg-white relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>

            <input type="text" placeholder="Tìm theo tên hoặc mã..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} className="outline-none text-sm w-52" />

            {searchInput && (
              <button onClick={() => {
                setSearchInput("");
                updateQuery({ search: "", page: "1" });
              }}
                className="absolute right-2 text-gray-500 hover:text-red-500"
                title="Xoá nội dung">
                ❌
              </button>
            )}
          </div>

          {/* Nút thêm */}
          <Link href="/ma_giam_gia/them" className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-1.5 rounded-lg text-sm shadow">
            Thêm mã giảm giá
          </Link>
        </div>
      </div>


      {/* table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-300 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">Tên / Mã số</th>
              <th className="px-4 py-3 text-center">Giá trị giảm <br />(GTG tối thiểu)</th>
              <th className="px-4 py-3 text-center">Giảm tối đa</th>
              <th className="px-4 py-3 text-center">Số lượng</th>
              <th className="px-4 py-3 text-center">Hiệu lực</th>
              <th className="px-4 py-3 text-center max-w-[150px] truncate">Mô tả</th>
              <th className="px-4 py-3 text-center">Trạng thái</th>
              <th className="px-4 py-3 text-center">Sửa</th>
            </tr>
          </thead>

          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            ) : (
              pageData.map((mgg) => {
                const badge = getHieuLucBadge(mgg.bat_dau, mgg.ket_thuc);

                return (
                  <tr key={mgg.id} className="border-t hover:bg-gray-200 transition-all duration-150">
                    <td className="px-4 py-3 font-semibold max-w-[200px] truncate">
                      {mgg.ten}
                      <br />
                      <span className="text-sm text-gray-600">({mgg.ma_so})</span>
                    </td>

                    <td className="px-4 py-3 text-center text-red-600">
                      {mgg.loai_giam_gia ? `${mgg.gia_tri_giam}%` : `${mgg.gia_tri_giam.toLocaleString("vi")} ₫`}
                      <p className="px-4 py-3 text-center text-gray-700">
                        ({mgg.gia_tri_toi_thieu.toLocaleString("vi")} ₫)
                      </p>
                    </td>

                    <td className="px-4 py-3 text-center text-red-600">
                      {mgg.gia_tri_giam_toi_da != null ? mgg.gia_tri_giam_toi_da.toLocaleString("vi") : "-"}
                    </td>

                    <td className="px-4 py-3 text-center">{mgg.so_luong ?? "-"}</td>

                    <td className="px-4 py-3 text-center w-[200px]">
                      <div className={`rounded-lg p-2 border ${badge.color} text-sm leading-tight flex flex-col items-center`}>
                        <span className="font-semibold">{badge.label}</span>
                        <span className="text-xs mt-1">
                          {formatDate(mgg.bat_dau)} → {formatDate(mgg.ket_thuc)}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-center w-[250px] truncate">
                      {mgg.mo_ta?.trim() ? mgg.mo_ta : "-"}
                    </td>

                    <td className="px-4 py-3 text-center cursor-pointer select-none text-xl"
                      onClick={() => handleToggleAnHien(mgg)} title="Bấm để ẩn/hiện">
                      {mgg.an_hien ? "✅" : "❌"}
                    </td>

                    <td className="px-4 py-3 text-center">
                      <Link href={`/ma_giam_gia/${mgg.id}`} className="text-blue-500 hover:text-blue-700 font-semibold">
                        Sửa
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* pagination UI */}
      <div className="flex justify-center mt-4 space-x-2">
        <button onClick={() => goToPage(1)} disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}>
          Đầu
        </button>

        {Array.from({ length: 3 }, (_, i) => {
          const start = Math.max(1, Math.min(currentPage - 1, totalPages - 2));
          const p = start + i;
          return (
            p <= totalPages && (
              <button key={p} onClick={() => goToPage(p)}
                className={`px-3 py-1 rounded ${p === currentPage ? "bg-blue-500 text-white font-bold scale-105" : "bg-gray-200 hover:bg-gray-300"}`}>
                {p}
              </button>
            )
          );
        })}

        <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-gray-200 hover:bg-gray-300"}`}>
          Cuối
        </button>
      </div>

      {/* confirm modal */}
      {confirmAnHien && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[380px]">
            <h2 className="text-lg font-semibold mb-3 text-center">Xác nhận thay đổi trạng thái</h2>
            <p className="text-center mb-5">
              Bạn có muốn{" "}
              <span className="font-semibold text-red-600">{confirmAnHien.an_hien ? "ẩn" : "hiển thị"}</span>{" "}
              mã giảm giá <span className="font-semibold">{confirmAnHien.ten} ({confirmAnHien.ma_so})</span> không?
            </p>
            <div className="flex justify-center space-x-3">
              <button onClick={confirmToggle} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Có</button>
              <button onClick={() => setConfirmAnHien(null)} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">Không</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MaGiamGiaList() {
  return (
    <Suspense fallback={<div className="p-4">Đang tải mã giảm giá...</div>}>
      <MaGiamGiaListContent />
    </Suspense>
  );
}
