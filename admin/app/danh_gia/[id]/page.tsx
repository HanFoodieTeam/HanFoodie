// // "use client";

// // import { useEffect, useState, Suspense } from "react";
// // import { useParams, useSearchParams, useRouter } from "next/navigation";
// // import { Star } from "lucide-react";
// // import Link from "next/link";
// // import { IDanhGia } from "@/app/lib/cautrucdata";

// // import Image from "next/image";


// // function DanhGiaChiTiet() {
// //   const { id } = useParams();
// //   const router = useRouter();
// //   const searchParams = useSearchParams();

// //   const filterSao = Number(searchParams.get("filterSao") || 0);
// //   const page = Number(searchParams.get("page") || 1);
// //   const pageSize = 7;

// //   const [data, setData] = useState<IDanhGia[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [tenSanPham, setTenSanPham] = useState<string>("");

// //   const [confirmAnHien, setConfirmAnHien] = useState<IDanhGia | null>(null);


// //   const updateQuery = (updates: Record<string, string>) => {
// //     const params = new URLSearchParams(searchParams.toString());
// //     Object.entries(updates).forEach(([key, val]) => {
// //       if (!val || val === "0") params.delete(key);
// //       else params.set(key, val);
// //     });
// //     router.replace(`/danh_gia/${id}?${params.toString()}`);
// //   };
// //   const handleToggleAnHien = async (dg: IDanhGia) => {
// //     const id = dg.id;
// //     const newState = !dg.an_hien;

// //     try {
// //       const res = await fetch(`/api/danh_gia/${id}`, {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ an_hien: newState }),
// //       });

// //       if (res.ok) {
// //         setData((prev) =>
// //           prev.map((it) => (it.id === id ? { ...it, an_hien: newState } : it))
// //         );
// //       } else {
// //         alert("Không thể cập nhật trạng thái!");
// //       }
// //     } catch (err) {
// //       console.error("Lỗi khi cập nhật trạng thái:", err);
// //       alert("Không thể cập nhật trạng thái!");
// //     }
// //   };


// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         const qs = new URLSearchParams({
// //           filterSao: String(filterSao),
// //           page: String(page),
// //           pageSize: String(pageSize),
// //         });
// //         const res = await fetch(`/api/danh_gia/${id}?${qs.toString()}`);
// //         const json = await res.json();
// //         setData(json.data);
// //         setTenSanPham(json.tenSanPham);
// //       } catch (err) {
// //         console.error("❌ Lỗi khi lấy đánh giá:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchData();
// //   }, [id, filterSao, page]);

// //   return (
// //     <div className="p-6">
// //       <div className="flex justify-between items-center mb-6">
// //         <h1 className="text-2xl font-bold">
// //           Đánh giá sản phẩm:{" "}
// //           <span className="text-blue-600">{tenSanPham}</span>
// //         </h1>
// //         <Link
// //           href="/danh_gia"
// //           className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
// //         >
// //           ← Quay lại thống kê
// //         </Link>
// //       </div>

// //       {/* Bộ lọc số sao */}
// //       <div className="flex gap-2 mb-4">
// //         {[0, 1, 2, 3, 4, 5].map((s) => (
// //           <button
// //             key={s}
// //             onClick={() => updateQuery({ filterSao: String(s), page: "1" })}
// //             className={`px-3 py-1 rounded-lg text-sm border ${filterSao === s
// //               ? "bg-blue-500 text-white border-blue-600"
// //               : "bg-white text-gray-700 hover:bg-gray-100"
// //               }`}
// //           >
// //             {s === 0 ? "Tất cả" : `${s} ⭐`}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Bảng danh sách */}
// //       <div className="overflow-x-auto bg-white rounded-xl shadow-md">
// //         <table className="min-w-full text-[15px] text-left border-collapse">
// //           <thead className="bg-gray-300 text-gray-700 uppercase">
// //             <tr>
// //               <th className="px-5 py-3">Hình</th>
// //               <th className="px-5 py-3">Người dùng</th>
// //               <th className="px-5 py-3 text-center">Số sao</th>
// //               <th className="px-5 py-3">Nội dung</th>
// //               <th className="px-5 py-3">Ẩn hiện</th>

// //               <th className="px-5 py-3 text-center">Ngày đánh giá</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {loading ? (
// //               <tr>
// //                 <td colSpan={4} className="text-center py-5 text-gray-500">
// //                   Đang tải dữ liệu...
// //                 </td>
// //               </tr>
// //             ) : data.length === 0 ? (
// //               <tr>
// //                 <td colSpan={4} className="text-center py-5 text-gray-500">
// //                   Không có đánh giá nào.
// //                 </td>
// //               </tr>
// //             ) : (
// //               data.map((dg) => (
// //                 <tr
// //                   key={dg.id}
// //                   className="border-b hover:bg-gray-50 transition-colors" >
// //                   <td className="px-5 py-3">
// //                     {/* <Image
// //                       src={dg.hinh ?? "/no-image.png"}   // fallback nếu null
// //                       alt="Hình đánh giá"
// //                       width={64}
// //                       height={64}
// //                       className="rounded-lg object-cover"
// //                     /> */}
// //                     <img
// //                       src={dg.hinh || "/no-image.png"}
// //                       alt=""
// //                       className="w-16 h-16 rounded-lg object-cover border"
// //                     />
// //                   </td>


// //                   <td className="px-5 py-3">{dg.nguoi_dung?.ho_ten || "Ẩn danh"}</td>
// //                   <td className="px-5 py-3 text-center text-yellow-600 font-semibold">
// //                     {dg.sao}{" "}
// //                     <Star
// //                       size={16}
// //                       className="inline text-yellow-500 fill-yellow-500"
// //                     />
// //                   </td>
// //                   <td className="px-5 py-3">{dg.noi_dung || "—"}</td>

// //                   <td className="px-4 py-3 text-center cursor-pointer select-none text-xl"
// //                     onClick={() => handleToggleAnHien(dg)} title="Bấm để ẩn/hiện">
// //                     {dg.an_hien ? "✅" : "❌"}
// //                   </td>


// //                   <td className="px-5 py-3 text-center text-gray-600">
// //                     {new Date(dg.thoi_gian).toLocaleDateString("vi-VN")}
// //                   </td>
// //                 </tr>



// //               ))
// //             )}

// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function Page() {
// //   return (
// //     <Suspense fallback={<div className="p-6 text-gray-600">Đang tải...</div>}>
// //       <DanhGiaChiTiet />
// //     </Suspense>
// //   );
// // }



// "use client";

// import { useEffect, useState, Suspense } from "react";
// import { useParams, useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { Star } from "lucide-react";
// import { IDanhGia } from "@/app/lib/cautrucdata";

// function DanhGiaChiTiet() {
//   const { id } = useParams();
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const filterSao = Number(searchParams.get("filterSao") || 0);
//   const page = Number(searchParams.get("page") || 1);
//   const pageSize = 7;

//   const [data, setData] = useState<IDanhGia[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [tenSanPham, setTenSanPham] = useState<string>("");

//   // modal xác nhận ẩn hiện đánh giá
//   const [confirmAnHien, setConfirmAnHien] = useState<IDanhGia | null>(null);


//   // Hàm che tên theo quy tắc: ký tự đầu + 5* + ký tự cuối
//   function maskName(name: string): string {
//     if (!name || name.trim().length < 2) return "******";

//     const clean = name.trim();
//     const first = clean[0].toLowerCase();
//     const last = clean[clean.length - 1].toLowerCase();

//     return `${first}*****${last}`;
//   }


//   const updateQuery = (updates: Record<string, string>) => {
//     const params = new URLSearchParams(searchParams.toString());
//     Object.entries(updates).forEach(([key, value]) => {
//       if (!value || value === "0") params.delete(key);
//       else params.set(key, value);
//     });
//     router.replace(`/danh_gia/${id}?${params.toString()}`);
//   };

//   // lấy dữ liệu đánh giá
//   useEffect(() => {
//     const load = async () => {
//       setLoading(true);
//       try {
//         const qs = new URLSearchParams({
//           filterSao: String(filterSao),
//           page: String(page),
//           pageSize: String(pageSize),
//         });

//         const res = await fetch(`/api/danh_gia/${id}?${qs}`);
//         const json = await res.json();

//         setData(json.data);
//         setTenSanPham(json.tenSanPham);
//       } catch (err) {
//         console.error("Lỗi tải đánh giá:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, [id, filterSao, page]);



//   // PATCH ẩn/hiện
//   const confirmToggle = async () => {
//     if (!confirmAnHien) return;

//     const id = confirmAnHien.id;
//     const newState = !confirmAnHien.an_hien;

//     try {
//       const res = await fetch(`/api/danh_gia/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ an_hien: newState }),
//       });

//       if (res.ok) {
//         // cập nhật UI
//         setData((prev) =>
//           prev.map((x) => (x.id === id ? { ...x, an_hien: newState } : x))
//         );
//       } else {
//         alert("Không thể cập nhật trạng thái!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Không thể cập nhật trạng thái!");
//     } finally {
//       setConfirmAnHien(null);
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">
//           Đánh giá sản phẩm:{" "}
//           <span className="text-blue-600">{tenSanPham}</span>
//         </h1>

//         <Link
//           href="/danh_gia"
//           className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
//         >
//           ← Quay lại thống kê
//         </Link>
//       </div>

//       {/* Bộ lọc sao */}
//       <div className="flex gap-2 mb-4">
//         {[0, 1, 2, 3, 4, 5].map((s) => (
//           <button
//             key={s}
//             onClick={() => updateQuery({ filterSao: String(s), page: "1" })}
//             className={`px-3 py-1 rounded-lg text-sm border ${filterSao === s
//                 ? "bg-blue-500 text-white border-blue-600"
//                 : "bg-white text-gray-700 hover:bg-gray-100"
//               }`}
//           >
//             {s === 0 ? "Tất cả" : `${s} ⭐`}
//           </button>
//         ))}
//       </div>

//       {/* Bảng */}
//       <div className="overflow-x-auto bg-white rounded-xl shadow-md">
//         <table className="min-w-full text-[15px] border-collapse">
//           <thead className="bg-gray-300 text-gray-700 uppercase">
//             <tr>
//               <th className="px-5 py-3">Hình</th>
//               <th className="px-5 py-3">Người dùng</th>
//               <th className="px-5 py-3 text-center">Số sao</th>
//               <th className="px-5 py-3">Nội dung</th>
//               <th className="px-5 py-3 text-center">Ẩn hiện</th>
//               <th className="px-5 py-3 text-center">Ngày đánh giá</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={6} className="text-center py-5 text-gray-500">
//                   Đang tải dữ liệu...
//                 </td>
//               </tr>
//             ) : data.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="text-center py-5 text-gray-500">
//                   Không có đánh giá nào.
//                 </td>
//               </tr>
//             ) : (
//               data.map((dg) => (
//                 <tr
//                   key={dg.id}
//                   className="border-b hover:bg-gray-50 transition-colors"
//                 >
//                   {/* Hình */}
//                   <td className="px-5 py-3">
//                     <img
//                       src={dg.hinh || "/no-image.png"}
//                       alt=""
//                       className="w-16 h-16 rounded-lg object-cover border"
//                     />
//                   </td>

//                   {/* Người dùng */}
//                   {/* <td className="px-5 py-3 text-center">{dg.nguoi_dung?.ho_ten ?? "Ẩn danh"}</td> */}

//                   <td className="px-5 py-3 text-center">
//                     {dg.an_ten === 0
//                       ? maskName(dg.nguoi_dung?.ho_ten ?? "")
//                       : dg.nguoi_dung?.ho_ten ?? "Ẩn danh"}
//                   </td>




//                   {/* Sao */}
//                   <td className="px-5 py-3 text-center text-yellow-600 font-semibold">
//                     {dg.sao}{" "}
//                     <Star size={16} className="inline text-yellow-500 fill-yellow-500" />
//                   </td>

//                   {/* Nội dung */}
//                   <td className="px-5 py-3">{dg.noi_dung || "—"}</td>

//                   {/* Ẩn / hiện */}
//                   <td
//                     className="px-5 py-3 text-center cursor-pointer select-none text-xl"
//                     onClick={() => setConfirmAnHien(dg)}
//                   >
//                     {dg.an_hien ? "✅" : "❌"}
//                   </td>

//                   {/* Ngày */}
//                   <td className="px-5 py-3 text-center text-gray-600">
//                     {new Date(dg.thoi_gian).toLocaleDateString("vi-VN")}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal xác nhận */}
//       {confirmAnHien && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 shadow-lg w-[350px]">
//             <h2 className="text-lg font-semibold mb-3 text-center">
//               Xác nhận thay đổi trạng thái
//             </h2>

//             <p className="text-center mb-6">
//               Bạn có muốn{" "}
//               <span className="font-semibold text-red-600">
//                 {confirmAnHien.an_hien ? "ẩn" : "hiển thị"}
//               </span>{" "}
//               đánh giá này không?
//             </p>

//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={confirmToggle}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//               >
//                 Có
//               </button>
//               <button
//                 onClick={() => setConfirmAnHien(null)}
//                 className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
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

// export default function Page() {
//   return (
//     <Suspense fallback={<div className="p-6 text-gray-600">Đang tải...</div>}>
//       <DanhGiaChiTiet />
//     </Suspense>
//   );
// }



"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Star } from "lucide-react";
import { IDanhGia } from "@/app/lib/cautrucdata";

function DanhGiaChiTiet() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterSao = Number(searchParams.get("filterSao") || 0);
  const page = Number(searchParams.get("page") || 1);

  const pageSize = 7;

  const [allData, setAllData] = useState<IDanhGia[]>([]);
  const [pageData, setPageData] = useState<IDanhGia[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [tenSanPham, setTenSanPham] = useState<string>("");

  // Modal ẩn hiện
  const [confirmAnHien, setConfirmAnHien] = useState<IDanhGia | null>(null);

  // Hàm che tên
  function maskName(name: string): string {
    if (!name || name.trim().length < 2) return "******";
    const clean = name.trim();
    const first = clean[0].toLowerCase();
    const last = clean[clean.length - 1].toLowerCase();
    return `${first}*****${last}`;
  }

  // Cập nhật query
  const updateQuery = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "0") params.delete(key);
      else params.set(key, value);
    });
    router.replace(`/danh_gia/${id}?${params.toString()}`);
  };

  // Lấy ALL data 1 lần duy nhất
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/danh_gia/${id}`);
        const json = await res.json();

        setAllData(json.data);
        setTenSanPham(json.tenSanPham);
      } catch (err) {
        console.error("Lỗi tải đánh giá:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // Xử lý lọc + phân trang client-side
  useEffect(() => {
    let temp = [...allData];

    // Lọc theo sao (client)
    if (filterSao >= 1 && filterSao <= 5) {
      temp = temp.filter((x) => x.sao === filterSao);
    }

    // Tổng trang
    const pages = Math.max(1, Math.ceil(temp.length / pageSize));
    setTotalPages(pages);

    // Nếu page > pages => reset về 1
    const safePage = Math.min(page, pages);

    const start = (safePage - 1) * pageSize;
    const end = start + pageSize;

    setPageData(temp.slice(start, end));
  }, [allData, filterSao, page]);

  // PATCH ẩn/hiện
  const confirmToggle = async () => {
    if (!confirmAnHien) return;

    const id = confirmAnHien.id;
    const newState = !confirmAnHien.an_hien;

    try {
      const res = await fetch(`/api/danh_gia/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ an_hien: newState }),
      });

      if (res.ok) {
        setAllData((prev) =>
          prev.map((x) => (x.id === id ? { ...x, an_hien: newState } : x))
        );
      } else {
        alert("Không thể cập nhật trạng thái!");
      }
    } catch (err) {
      console.error(err);
      alert("Không thể cập nhật trạng thái!");
    } finally {
      setConfirmAnHien(null);
    }
  };

  const goToPage = (p: number) => {
    updateQuery({ page: String(p) });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Đánh giá sản phẩm: <span className="text-blue-600">{tenSanPham}</span>
        </h1>

        <Link
          href="/danh_gia"
          className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
        >
          ← Quay lại thống kê
        </Link>
      </div>

      {/* Bộ lọc sao */}
      <div className="flex gap-2 mb-4">
        {[0, 1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => updateQuery({ filterSao: String(s), page: "1" })}
            className={`px-3 py-1 rounded-lg text-sm border ${
              filterSao === s
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {s === 0 ? "Tất cả" : `${s} ⭐`}
          </button>
        ))}
      </div>

      {/* Bảng */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-[15px] border-collapse">
          <thead className="bg-gray-300 text-gray-700 uppercase">
            <tr>
              <th className="px-5 py-3 text-center">Hình</th>
              <th className="px-5 py-3">Người dùng</th> 
                                         <th className="px-5 py-3 text-center">Biến thể</th>

              <th className="px-5 py-3 text-center">Số sao</th>

              <th className="px-5 py-3 text-center w-[300px]">Nội dung</th>
              <th className="px-5 py-3 text-center">Ẩn hiện</th>
              <th className="px-5 py-3 text-center">Ngày</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-5 text-gray-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : pageData.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-5 text-gray-500">
                  Không có đánh giá nào.
                </td>
              </tr>
            ) : (
              pageData.map((dg) => (
                <tr
                  key={dg.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {/* Hình */}
                  <td className="px-5 py-3 text-center">
                    <img
                      src={dg.hinh || "/no-image.png"}
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  </td>

                  {/* Tên người dùng */}
                  <td className="px-5 py-3 text-center">
                    {dg.an_ten === 0
                      ? maskName(dg.nguoi_dung?.ho_ten ?? "")
                      : dg.nguoi_dung?.ho_ten ?? "Ẩn danh"}
                      
                  </td>
                   <td className="px-5 py-3 text-center">
                    {dg.bien_the?.ten}
                      
                  </td>

                  {/* Sao */}
                  <td className="px-5 py-3 text-center text-yellow-600 font-semibold">
                    {dg.sao}{" "}
                    <Star
                      size={16}
                      className="inline text-yellow-500 fill-yellow-500"
                    />
                  </td>

                  {/* Nội dung */}
<td className="px-5 py-3 w-[300px] truncate text-center" title={dg.noi_dung ?? ""}>
  {dg.noi_dung || "—"}
</td>

                  {/* Ẩn/hiện */}
                  <td
                    className="px-5 py-3 text-center cursor-pointer select-none text-xl"
                    onClick={() => setConfirmAnHien(dg)}
                  >
                    {dg.an_hien ? "✅" : "❌"}
                  </td>

                  {/* Ngày */}
                  <td className="px-5 py-3 text-center text-gray-600">
                    {new Date(dg.thoi_gian).toLocaleDateString("vi-VN")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => goToPage(1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Đầu
        </button>

        {Array.from({ length: 3 }, (_, i) => {
          const start = Math.max(
            1,
            Math.min(page - 1, totalPages - 2)
          );
          const p = start + i;

          return (
            p <= totalPages && (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`px-3 py-1 rounded ${
                  p === page
                    ? "bg-blue-500 text-white font-bold scale-105"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {p}
              </button>
            )
          );
        })}

        <button
          onClick={() => goToPage(totalPages)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${
            page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Cuối
        </button>
      </div>

      {/* Modal */}
      {confirmAnHien && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[350px]">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Xác nhận thay đổi trạng thái
            </h2>

            <p className="text-center mb-6">
              Bạn có muốn{" "}
              <span className="font-semibold text-red-600">
                {confirmAnHien.an_hien ? "ẩn" : "hiển thị"}
              </span>{" "}
              đánh giá này không?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmToggle}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Có
              </button>
              <button
                onClick={() => setConfirmAnHien(null)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
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

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-600">Đang tải...</div>}>
      <DanhGiaChiTiet />
    </Suspense>
  );
}
