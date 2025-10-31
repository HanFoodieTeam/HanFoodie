

// // "use client";

// // import React, { useMemo, useState } from "react";
// // import Image from "next/image";
// // import { motion, AnimatePresence } from "framer-motion";
// // import {
// //   IBienThe,
// //   IMonThem,
// //   ILoaiTuyChon,
// //   ISanPham,
// //   ITuyChon,
// //   INguoiDung,
// // } from "@/app/lib/cautrucdata";
// // import LoginForm from "./dangnhap";

// // interface ILoaiTuyChonMoRong extends ILoaiTuyChon {
// //   tuy_chon?: ITuyChonMoRong[];
// // }

// // interface ITuyChonMoRong extends ITuyChon {
// //   gia_them?: number | null;
// // }

// // interface ThemVaoGioHangProps {
// //   data: {
// //     san_pham: ISanPham;
// //     bien_the?: IBienThe[];
// //     mon_them?: IMonThem[];
// //     tuy_chon?: ILoaiTuyChonMoRong[];
// //   };
// //   onClose: () => void;
// // }

// // export default function PopupSuaGioHang({ data, onClose }: ThemVaoGioHangProps) {
// //   const { san_pham, bien_the = [], mon_them = [], tuy_chon = [] } = data || {};

// //   // States
// //   const [qty, setQty] = useState(1);
// //   const [selectedBienThe, setSelectedBienThe] = useState<number | null>(
// //     bien_the.length ? bien_the[0].id ?? null : null
// //   );

// //   const [selectedTuyChon, setSelectedTuyChon] = useState<
// //     Record<number, number | null>
// //   >(() =>
// //     tuy_chon.reduce<Record<number, number | null>>((acc, loai) => {
// //       acc[loai.id!] =
// //         loai.tuy_chon && loai.tuy_chon.length
// //           ? loai.tuy_chon[0].id ?? null
// //           : null;
// //       return acc;
// //     }, {})
// //   );

// //   const [selectedMonThem, setSelectedMonThem] = useState<number[]>([]);
// //   const [ghiChu, setGhiChu] = useState("");

// //   // Toggle món thêm (checkbox)
// //   const toggleMonThem = (id: number) => {
// //     setSelectedMonThem((prev) =>
// //       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
// //     );
// //   };

// //   // Tổng phụ phí (biến thể + tùy chọn + món thêm)
// //   const subtotalPerItem = useMemo(() => {
// //     let total = 0;

// //     if (selectedBienThe !== null) {
// //       const bt = bien_the.find((b) => b.id === selectedBienThe);
// //       if (bt?.gia_them) total += bt.gia_them;
// //     }

// //     Object.entries(selectedTuyChon).forEach(([loaiId, tuyChonId]) => {
// //       if (!tuyChonId) return;
// //       const loai = tuy_chon.find((l) => l.id === Number(loaiId));
// //       const tc = loai?.tuy_chon?.find((t) => t.id === tuyChonId);
// //       if (tc?.gia_them) total += tc.gia_them;
// //     });

// //     selectedMonThem.forEach((id) => {
// //       const m = mon_them.find((x) => x.id === id);
// //       if (m?.gia_them) total += m.gia_them;
// //     });

// //     return total;
// //   }, [selectedBienThe, selectedTuyChon, selectedMonThem, bien_the, mon_them, tuy_chon]);

// //   const totalAll =
// //     (Number(san_pham?.gia_goc || san_pham?.gia_goc || 0) + subtotalPerItem) *
// //     qty;

// //   const handleSelectTuyChon = (loaiId: number, tcId: number) => {
// //     setSelectedTuyChon((prev) => ({ ...prev, [loaiId]: tcId }));
// //   };

// //   const [showLogin, setShowLogin] = useState(false);
// //   const [isAdding, setIsAdding] = useState(false);

// //   // 🧩 Hàm thêm vào giỏ hàng
// //   const handleAddToCart = async () => {
// //     const userData = localStorage.getItem("nguoi_dung");

// //     // ❗ Nếu chưa đăng nhập → hiện form login
// //     if (!userData) {
// //       setShowLogin(true);
// //       return;
// //     }

// //     const user = JSON.parse(userData);
// //     const idNguoiDung = user.id;

// //     const payload = {
// //       id_san_pham: san_pham?.id,
// //       id_bien_the: selectedBienThe,
// //       so_luong: qty,
// //       json_mon_them: selectedMonThem
// //         .map((id) => {
// //           const m = mon_them.find((x) => x.id === id);
// //           return m ? { id: m.id, ten: m.ten, gia_them: m.gia_them } : null;
// //         })
// //         .filter(Boolean),
// //       json_tuy_chon: Object.fromEntries(
// //         Object.entries(selectedTuyChon).map(([loaiId, tuyChonId]) => {
// //           const loai = tuy_chon.find((l) => l.id === Number(loaiId));
// //           const tc = loai?.tuy_chon?.find((t) => t.id === tuyChonId);
// //           return [loai?.ten || `loai_${loaiId}`, tc?.ten || null];
// //         })
// //       ),
// //       ghi_chu: ghiChu || "",
// //       id_nguoi_dung: idNguoiDung,
// //     };

// //     try {
// //       setIsAdding(true);

// //       const token = localStorage.getItem("token");

// //       const res = await fetch("/api/gio_hang", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`, // 🔥 gửi token lên server
// //         },
// //         body: JSON.stringify(payload),
// //       });


// //       if (!res.ok) {
// //         const err = await res.json();
// //         alert(err.thong_bao || "Thêm giỏ hàng thất bại!");
// //         return;
// //       }

// //       alert("✅ Đã thêm vào giỏ hàng!");
// //       onClose();
// //     } catch (error) {
// //       alert("❌ Không thể kết nối đến server!");
// //       console.error(error);
// //     } finally {
// //       setIsAdding(false);
// //     }
// //   };

// //   // 🧩 Sau khi đăng nhập thành công
// //   const handleLoginSuccess = () => {
// //     setShowLogin(false);
// //     handleAddToCart(); // 🔁 tự động thêm lại giỏ hàng
// //   };

// //   const handleBuyNow = async () => {
// //     console.log("💳 Mua ngay:", {
// //       san_pham: san_pham?.id,
// //       qty,
// //       tong_tien: totalAll,
// //     });
// //     onClose();
// //   };

// //   return (
// //     <AnimatePresence>
// //       <motion.div
// //         className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 p-4"
// //         onClick={onClose}
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         exit={{ opacity: 0 }}
// //       >
// //         <motion.div
// //           className="relative bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
// //           onClick={(e) => e.stopPropagation()}
// //           initial={{ scale: 0.9, opacity: 0 }}
// //           animate={{ scale: 1, opacity: 1 }}
// //           exit={{ scale: 0.9, opacity: 0 }}
// //           transition={{ duration: 0.25 }}
// //         >
// //           {/* Header */}
// //           <div className="flex items-center gap-3 p-4 border-b">
// //             <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
// //               {san_pham?.hinh ? (
// //                 <Image
// //                   src={san_pham.hinh}
// //                   alt={san_pham.ten}
// //                   width={80}
// //                   height={80}
// //                   className="object-cover"
// //                 />
// //               ) : (
// //                 <div className="bg-gray-100 w-full h-full" />
// //               )}
// //             </div>

// //             <div className="flex-1">
// //               <div className="flex items-center justify-between">
// //                 <h3 className="text-lg font-semibold text-[#6A0A0A]">
// //                   {san_pham?.ten}
// //                 </h3>
// //                 <div className="text-right">
// //                   <div className="text-sm text-gray-500">Giá</div>
// //                   <div className="text-lg font-bold text-red-500">
// //                     {Number(san_pham?.gia_goc || 0).toLocaleString("vi-VN")}đ
// //                   </div>
// //                 </div>
// //               </div>
// //               <p className="text-sm text-gray-600 mt-1 line-clamp-2">
// //                 {san_pham?.mo_ta}
// //               </p>
// //             </div>

// //             {/* Qty controls */}
// //             <div className="flex flex-col items-center gap-2">
// //               <div className="flex items-center border rounded-full overflow-hidden">
// //                 <button
// //                   onClick={() => setQty((q) => Math.max(1, q - 1))}
// //                   className="px-3 py-1"
// //                 >
// //                   −
// //                 </button>
// //                 <div className="px-3 py-1 bg-white">{qty}</div>
// //                 <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1">
// //                   +
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Nội dung chọn */}
// //           <div className="p-4 space-y-4">
// //             {/* Biến thể */}
// //             {bien_the.length > 0 && (
// //               <div>
// //                 <h4 className="text-base font-semibold mb-2 border-b pb-2">
// //                   Độ cay (Chọn 1)
// //                 </h4>
// //                 <div className="space-y-2">
// //                   {bien_the.map((b) => {
// //                     const checked = selectedBienThe === b.id;
// //                     return (
// //                       <label
// //                         key={b.id}
// //                         className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
// //                       >
// //                         <div className="flex items-center gap-3">
// //                           <div
// //                             className={`w-5 h-5 rounded-full border flex items-center justify-center ${checked
// //                               ? "bg-[#e8594f] border-[#e8594f]"
// //                               : "bg-white border-gray-300"
// //                               }`}
// //                           >
// //                             {checked && (
// //                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
// //                                 <circle cx="12" cy="12" r="5" fill="white" />
// //                               </svg>
// //                             )}
// //                           </div>
// //                           <span className="text-sm">{b.ten}</span>
// //                         </div>
// //                         <div className="text-sm text-gray-600">
// //                           {b.gia_them ? `+${b.gia_them.toLocaleString("vi-VN")}đ` : "0đ"}
// //                         </div>
// //                         <input
// //                           type="radio"
// //                           className="hidden"
// //                           checked={checked}
// //                           onChange={() => setSelectedBienThe(b.id ?? null)}
// //                         />
// //                       </label>
// //                     );
// //                   })}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Tùy chọn */}
// //             {tuy_chon.map((loai) => (
// //               <div key={loai.id}>
// //                 <h4 className="text-base font-semibold mb-2 border-b pb-2">
// //                   {loai.ten} (Chọn 1)
// //                 </h4>
// //                 <div className="space-y-2">
// //                   {loai.tuy_chon?.map((tc) => {
// //                     const checked = selectedTuyChon[loai.id!] === tc.id;
// //                     return (
// //                       <label
// //                         key={tc.id}
// //                         className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
// //                       >
// //                         <div className="flex items-center gap-3">
// //                           <div
// //                             className={`w-5 h-5 rounded-full border flex items-center justify-center ${checked
// //                               ? "bg-[#e8594f] border-[#e8594f]"
// //                               : "bg-white border-gray-300"
// //                               }`}
// //                           >
// //                             {checked && (
// //                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
// //                                 <circle cx="12" cy="12" r="5" fill="white" />
// //                               </svg>
// //                             )}
// //                           </div>
// //                           <span className="text-sm">{tc.ten}</span>
// //                         </div>
// //                         <div className="text-sm text-gray-600">
// //                           {tc.gia_them
// //                             ? `+${tc.gia_them.toLocaleString("vi-VN")}đ`
// //                             : "0đ"}
// //                         </div>
// //                         <input
// //                           type="radio"
// //                           className="hidden"
// //                           checked={checked}
// //                           onChange={() => handleSelectTuyChon(loai.id!, tc.id!)}
// //                         />
// //                       </label>
// //                     );
// //                   })}
// //                 </div>
// //               </div>
// //             ))}

// //             {/* Món thêm */}
// //             {mon_them.length > 0 && (
// //               <div>
// //                 <h4 className="text-base font-semibold mb-2 border-b pb-2">Món thêm</h4>
// //                 <div className="space-y-2">
// //                   {mon_them.map((m) => {
// //                     const checked = selectedMonThem.includes(m.id!);
// //                     return (
// //                       <label
// //                         key={m.id}
// //                         className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
// //                       >
// //                         <div className="flex items-center gap-3">
// //                           <div
// //                             className={`w-5 h-5 rounded-full border flex items-center justify-center ${checked
// //                               ? "bg-[#e8594f] border-[#e8594f]"
// //                               : "bg-white border-gray-300"
// //                               }`}
// //                           >
// //                             {checked && (
// //                               <svg
// //                                 width="12"
// //                                 height="12"
// //                                 viewBox="0 0 24 24"
// //                                 fill="none"
// //                               >
// //                                 <path
// //                                   d="M20 6L9 17l-5-5"
// //                                   stroke="white"
// //                                   strokeWidth="2"
// //                                   strokeLinecap="round"
// //                                   strokeLinejoin="round"
// //                                 />
// //                               </svg>
// //                             )}
// //                           </div>
// //                           <span className="text-sm">{m.ten}</span>
// //                         </div>
// //                         <div className="text-sm text-gray-600">
// //                           +{m.gia_them.toLocaleString("vi-VN")}đ
// //                         </div>
// //                         <input
// //                           type="checkbox"
// //                           className="hidden"
// //                           checked={checked}
// //                           onChange={() => toggleMonThem(m.id!)}
// //                         />
// //                       </label>
// //                     );
// //                   })}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Ghi chú */}
// //             <div>
// //               <h4 className="text-base font-semibold mb-2">Ghi chú</h4>
// //               <textarea
// //                 value={ghiChu}
// //                 onChange={(e) => setGhiChu(e.target.value)}
// //                 placeholder="Ghi chú cho cửa hàng..."
// //                 className="w-full border rounded-md p-2 h-20 resize-none"
// //               />
// //             </div>
// //           </div>


// //         </motion.div>
// //       </motion.div>
// //     </AnimatePresence>
// //   );
// // }



// "use client";

// import React, { useMemo, useState, useEffect } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   IBienThe,
//   IMonThem,
//   ILoaiTuyChon,
//   ISanPham,
//   ITuyChon,
// } from "@/app/lib/cautrucdata";

// interface ITuyChonMoRong extends ITuyChon {
//   gia_them?: number | null;
// }

// interface ILoaiTuyChonMoRong extends ILoaiTuyChon {
//   tuy_chon?: ITuyChonMoRong[];
// }

// interface MacDinhProps {
//   id_bien_the?: number | null;
//   so_luong?: number;
//   ghi_chu?: string;
//   json_mon_them?: { id: number; ten: string; gia_them?: number | null }[];
//   json_tuy_chon?: Record<string, string>;
// }

// interface PopupSuaGioHangProps {
//   data: {
//     san_pham: ISanPham;
//     bien_the?: IBienThe[];
//     mon_them?: IMonThem[];
//     tuy_chon?: ILoaiTuyChonMoRong[];
//   };
//   mac_dinh: MacDinhProps; // ✅ dữ liệu đã lưu trong giỏ hàng
//   onClose: () => void;
// }

// export default function PopupSuaGioHang({
//   data,
//   mac_dinh,
//   onClose,
// }: PopupSuaGioHangProps) {
//   const { san_pham, bien_the = [], mon_them = [], tuy_chon = [] } = data;

//   // ✅ States được khởi tạo dựa trên dữ liệu trong giỏ hàng
//   const [qty, setQty] = useState(mac_dinh.so_luong || 1);
//   const [ghiChu, setGhiChu] = useState(mac_dinh.ghi_chu || "");
//   const [selectedBienThe, setSelectedBienThe] = useState<number | null>(
//     mac_dinh.id_bien_the ?? null
//   );
//   const [selectedMonThem, setSelectedMonThem] = useState<number[]>([]);
//   const [selectedTuyChon, setSelectedTuyChon] = useState<
//     Record<number, number | null>
//   >({});

//   // ✅ Khi popup mở, tick lại những gì người dùng đã chọn
//   useEffect(() => {
//     // 🟣 1. Món thêm
//     if (mac_dinh.json_mon_them?.length) {
//       setSelectedMonThem(mac_dinh.json_mon_them.map((m) => m.id));
//     }

//     // 🟢 2. Tùy chọn
//     const newTuyChon: Record<number, number | null> = {};
//     tuy_chon.forEach((loai) => {
//       const tenLoai = loai.ten;
//       const tenChon = mac_dinh.json_tuy_chon?.[tenLoai];
//       const tc = loai.tuy_chon?.find((t) => t.ten === tenChon);
//       newTuyChon[loai.id!] = tc?.id ?? null;
//     });
//     setSelectedTuyChon(newTuyChon);
//   }, [mac_dinh, tuy_chon]);

//   // ✅ Tổng phụ phí
//   const subtotal = useMemo(() => {
//     let total = 0;
//     if (selectedBienThe !== null) {
//       const bt = bien_the.find((b) => b.id === selectedBienThe);
//       if (bt?.gia_them) total += bt.gia_them;
//     }

//     Object.entries(selectedTuyChon).forEach(([loaiId, tcId]) => {
//       if (!tcId) return;
//       const loai = tuy_chon.find((l) => l.id === Number(loaiId));
//       const tc = loai?.tuy_chon?.find((t) => t.id === tcId);
//       if (tc?.gia_them) total += tc.gia_them;
//     });

//     selectedMonThem.forEach((id) => {
//       const m = mon_them.find((x) => x.id === id);
//       if (m?.gia_them) total += m.gia_them;
//     });

//     return total;
//   }, [selectedBienThe, selectedTuyChon, selectedMonThem, bien_the, mon_them, tuy_chon]);

//   const totalAll = (Number(san_pham.gia_goc || 0) + subtotal) * qty;

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 p-4"
//         onClick={onClose}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       >
//         <motion.div
//           className="relative bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
//           onClick={(e) => e.stopPropagation()}
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ duration: 0.25 }}
//         >
//           {/* Header */}
//           <div className="flex items-center gap-3 p-4 border-b">
//             <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
//               <Image
//                 src={san_pham.hinh || "/noing.png"}
//                 alt={san_pham.ten}
//                 width={80}
//                 height={80}
//                 className="object-cover"
//               />
//             </div>

//             <div className="flex-1">
//               <h3 className="text-lg font-semibold text-[#6A0A0A]">
//                 {san_pham.ten}
//               </h3>
//               <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//                 {san_pham.mo_ta}
//               </p>
//             </div>

//             {/* Qty */}
//             <div className="flex flex-col items-center gap-2">
//               <div className="flex items-center border rounded-full overflow-hidden">
//                 <button
//                   onClick={() => setQty((q) => Math.max(1, q - 1))}
//                   className="px-3 py-1"
//                 >
//                   −
//                 </button>
//                 <div className="px-3 py-1 bg-white">{qty}</div>
//                 <button
//                   onClick={() => setQty((q) => q + 1)}
//                   className="px-3 py-1"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Nội dung chọn */}
//           <div className="p-4 space-y-4">
//             {/* Biến thể */}
//             {bien_the.length > 0 && (
//               <div>
//                 <h4 className="text-base font-semibold mb-2 border-b pb-2">
//                   Biến thể
//                 </h4>
//                 <div className="space-y-2">
//                   {bien_the.map((b) => {
//                     const checked = selectedBienThe === b.id;
//                     return (
//                       <label
//                         key={b.id}
//                         className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                               checked
//                                 ? "bg-[#e8594f] border-[#e8594f]"
//                                 : "bg-white border-gray-300"
//                             }`}
//                           >
//                             {checked && (
//                               <svg
//                                 width="12"
//                                 height="12"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                               >
//                                 <circle cx="12" cy="12" r="5" fill="white" />
//                               </svg>
//                             )}
//                           </div>
//                           <span className="text-sm">{b.ten}</span>
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           {b.gia_them
//                             ? `+${b.gia_them.toLocaleString("vi-VN")}đ`
//                             : "0đ"}
//                         </div>
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Tùy chọn */}
//             {tuy_chon.map((loai) => (
//               <div key={loai.id}>
//                 <h4 className="text-base font-semibold mb-2 border-b pb-2">
//                   {loai.ten}
//                 </h4>
//                 <div className="space-y-2">
//                   {loai.tuy_chon?.map((tc) => {
//                     const checked = selectedTuyChon[loai.id!] === tc.id;
//                     return (
//                       <label
//                         key={tc.id}
//                         className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                               checked
//                                 ? "bg-[#e8594f] border-[#e8594f]"
//                                 : "bg-white border-gray-300"
//                             }`}
//                           >
//                             {checked && (
//                               <svg
//                                 width="12"
//                                 height="12"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                               >
//                                 <circle cx="12" cy="12" r="5" fill="white" />
//                               </svg>
//                             )}
//                           </div>
//                           <span className="text-sm">{tc.ten}</span>
//                         </div>
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}

//             {/* Món thêm */}
//             {mon_them.length > 0 && (
//               <div>
//                 <h4 className="text-base font-semibold mb-2 border-b pb-2">
//                   Món thêm
//                 </h4>
//                 <div className="space-y-2">
//                   {mon_them.map((m) => {
//                     const checked = selectedMonThem.includes(m.id!);
//                     return (
//                       <label
//                         key={m.id}
//                         className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                               checked
//                                 ? "bg-[#e8594f] border-[#e8594f]"
//                                 : "bg-white border-gray-300"
//                             }`}
//                           >
//                             {checked && (
//                               <svg
//                                 width="12"
//                                 height="12"
//                                 viewBox="0 0 24 24"
//                                 fill="none"
//                               >
//                                 <path
//                                   d="M20 6L9 17l-5-5"
//                                   stroke="white"
//                                   strokeWidth="2"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                 />
//                               </svg>
//                             )}
//                           </div>
//                           <span className="text-sm">{m.ten}</span>
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           +{m.gia_them.toLocaleString("vi-VN")}đ
//                         </div>
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* Ghi chú */}
//             {ghiChu && (
//               <div>
//                 <h4 className="text-base font-semibold mb-2">Ghi chú</h4>
//                 <textarea
//                   value={ghiChu}
//                   onChange={(e) => setGhiChu(e.target.value)}
//                   className="w-full border rounded-md p-2 h-20 resize-none"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="border-t p-4 bg-white text-right rounded-b-2xl">
//             <p className="text-lg font-semibold">
//               Tổng:{" "}
//               <span className="text-red-600">
//                 {totalAll.toLocaleString("vi-VN")}đ
//               </span>
//             </p>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }


"use client";

import React, { useMemo, useState, useEffect, JSX } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IBienThe,
  IMonThem,
  ILoaiTuyChon,
  ISanPham,
  ITuyChon,
} from "@/app/lib/cautrucdata";

interface ITuyChonMoRong extends ITuyChon {
  gia_them?: number | null;
}

interface ILoaiTuyChonMoRong extends ILoaiTuyChon {
  tuy_chon?: ITuyChonMoRong[];
}

interface MacDinhProps {
  id?: number;
  id_bien_the?: number | null;
  so_luong?: number;
  ghi_chu?: string;
  json_mon_them?: { id: number; ten: string; gia_them?: number | null }[];
  json_tuy_chon?: Record<string, string>;
}

interface PopupSuaGioHangProps {
  data: {
    san_pham: ISanPham;
    bien_the?: IBienThe[];
    mon_them?: IMonThem[];
    tuy_chon?: ILoaiTuyChonMoRong[];
  };
  mac_dinh: MacDinhProps;
  onClose: () => void;
  onUpdated?: () => void;
}

export default function PopupSuaGioHang({
  data,
  mac_dinh,
  onClose,
  onUpdated,
}: PopupSuaGioHangProps): JSX.Element {
  const { san_pham, bien_the = [], mon_them = [], tuy_chon = [] } = data;

  const [qty, setQty] = useState<number>(mac_dinh.so_luong || 1);
  const [ghiChu, setGhiChu] = useState<string>(mac_dinh.ghi_chu || "");
  const [selectedBienThe, setSelectedBienThe] = useState<number | null>(
    mac_dinh.id_bien_the ?? null
  );
  const [selectedMonThem, setSelectedMonThem] = useState<number[]>([]);
  const [selectedTuyChon, setSelectedTuyChon] = useState<
    Record<number, number | null>
  >({});
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // 🔹 Khởi tạo dữ liệu mặc định
  useEffect(() => {
    if (mac_dinh.json_mon_them?.length) {
      setSelectedMonThem(mac_dinh.json_mon_them.map((m) => m.id));
    }

    const newTuyChon: Record<number, number | null> = {};
    tuy_chon.forEach((loai) => {
      const tenLoai = loai.ten;
      const tenChon = mac_dinh.json_tuy_chon?.[tenLoai];
      const tc = loai.tuy_chon?.find((t) => t.ten === tenChon);
      newTuyChon[loai.id!] = tc?.id ?? null;
    });
    setSelectedTuyChon(newTuyChon);
  }, [mac_dinh, tuy_chon]);

  // 🔹 Xử lý chọn biến thể
  const handleSelectBienThe = (id: number) => {
    setSelectedBienThe(id);
  };

  const handleSelectTuyChon = (loaiId: number, tcId: number) => {
    setSelectedTuyChon((prev) => ({ ...prev, [loaiId]: tcId }));
  };

  const toggleMonThem = (id: number) => {
    setSelectedMonThem((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // 🔹 Tính tổng giá
  const subtotal = useMemo(() => {
    let total = 0;
    if (selectedBienThe !== null) {
      const bt = bien_the.find((b) => b.id === selectedBienThe);
      if (bt?.gia_them) total += bt.gia_them;
    }

    Object.entries(selectedTuyChon).forEach(([loaiId, tcId]) => {
      if (!tcId) return;
      const loai = tuy_chon.find((l) => l.id === Number(loaiId));
      const tc = loai?.tuy_chon?.find((t) => t.id === tcId);
      if (tc?.gia_them) total += tc.gia_them;
    });

    selectedMonThem.forEach((id) => {
      const m = mon_them.find((x) => x.id === id);
      if (m?.gia_them) total += m.gia_them;
    });

    return total;
  }, [selectedBienThe, selectedTuyChon, selectedMonThem, bien_the, mon_them, tuy_chon]);

  const totalAll = (Number(san_pham.gia_goc || 0) + subtotal) * qty;

  // 🟢 Gửi PUT cập nhật giỏ hàng
  const handleSave = async (): Promise<void> => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vui lòng đăng nhập!");
        return;
      }

      if (!selectedBienThe) {
        alert("Vui lòng chọn biến thể!");
        return;
      }

      const payload = {
        id_bien_the: selectedBienThe,
        so_luong: qty,
        json_mon_them: selectedMonThem.map((id) => {
          const m = mon_them.find((x) => x.id === id);
          return m ? { id: m.id, ten: m.ten, gia_them: m.gia_them } : null;
        }),
        json_tuy_chon: Object.fromEntries(
          Object.entries(selectedTuyChon).map(([loaiId, tcId]) => {
            const loai = tuy_chon.find((l) => l.id === Number(loaiId));
            const tc = loai?.tuy_chon?.find((t) => t.id === tcId);
            return [loai?.ten || `loai_${loaiId}`, tc?.ten || ""];
          })
        ),
        ghi_chu: ghiChu || "",
      };

      const res = await fetch(`/api/gio_hang/${mac_dinh.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`❌ Cập nhật thất bại: ${err.error || "Lỗi không xác định"}`);
        return;
      }

      alert("✅ Cập nhật giỏ hàng thành công!");
      onUpdated?.(); // 🔁 reload giỏ hàng trên TrangGioHang
      onClose(); // 🔒 đóng popup
    } catch (error) {
      console.error(error);
      alert("❌ Không thể kết nối đến server!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={san_pham.hinh || "/noing.png"}
                alt={san_pham.ten}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#6A0A0A]">
                {san_pham.ten}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{san_pham.mo_ta}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center border rounded-full overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-1"
                >
                  −
                </button>
                <div className="px-3 py-1 bg-white">{qty}</div>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Nội dung chọn */}
          <div className="p-4 space-y-4">
            {/* Biến thể */}
            {bien_the.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 border-b pb-2">Biến thể</h4>
                <div className="space-y-2">
                  {bien_the.map((b) => (
                    <label
                      key={b.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="bien_the"
                          checked={selectedBienThe === b.id}
                          onChange={() => handleSelectBienThe(b.id)}
                        />
                        <span className="text-sm">{b.ten}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {b.gia_them ? `+${b.gia_them.toLocaleString("vi-VN")}đ` : "0đ"}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Tùy chọn */}
            {tuy_chon.map((loai) => (
              <div key={loai.id}>
                <h4 className="font-semibold mb-2 border-b pb-2">{loai.ten}</h4>
                <div className="space-y-2">
                  {loai.tuy_chon?.map((tc) => (
                    <label
                      key={tc.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={`tuychon-${loai.id}`}
                          checked={selectedTuyChon[loai.id!] === tc.id}
                          onChange={() => handleSelectTuyChon(loai.id!, tc.id!)}
                        />
                        <span className="text-sm">{tc.ten}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Món thêm */}
            {mon_them.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 border-b pb-2">Món thêm</h4>
                <div className="space-y-2">
                  {mon_them.map((m) => (
                    <label
                      key={m.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedMonThem.includes(m.id!)}
                          onChange={() => toggleMonThem(m.id!)}
                        />
                        <span className="text-sm">{m.ten}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        +{m.gia_them.toLocaleString("vi-VN")}đ
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Ghi chú */}
            <div>
              <h4 className="font-semibold mb-2">Ghi chú</h4>
              <textarea
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                className="w-full border rounded-md p-2 h-20 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4 bg-white text-right rounded-b-2xl">
            <p className="text-lg font-semibold mb-2">
              Tổng:{" "}
              <span className="text-red-600">
                {totalAll.toLocaleString("vi-VN")}đ
              </span>
            </p>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 bg-[#e8594f] text-white rounded-full hover:bg-[#d94b42] transition"
            >
              {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
