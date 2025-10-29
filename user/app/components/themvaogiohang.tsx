// // // "use client";

// // // import { useState } from "react";
// // // import { IBienThe, IMonThem, ITuyChon } from "@/app/lib/cautrucdata";

// // // interface Props {
// // //   sanPhamId: number;
// // //   bienThe?: IBienThe[];
// // //   monThem?: IMonThem[];
// // //   tuyChon?: ITuyChon[];
// // // }

// // // export default function ThemVaoGioHang({ sanPhamId, bienThe = [], monThem = [], tuyChon = [] }: Props) {
// // //   const [chonBienThe, setChonBienThe] = useState<number | null>(null);
// // //   const [chonMonThem, setChonMonThem] = useState<number[]>([]);
// // //   const [chonTuyChon, setChonTuyChon] = useState<number[]>([]);
// // //   const [soLuong, setSoLuong] = useState(1);
// // //   const [loading, setLoading] = useState(false);

// // //   // 🛒 Xử lý chọn món thêm
// // //   const handleToggleMonThem = (id: number) => {
// // //     setChonMonThem((prev) =>
// // //       prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
// // //     );
// // //   };

// // //   // 🛒 Xử lý chọn tuỳ chọn
// // //   const handleToggleTuyChon = (id: number) => {
// // //     setChonTuyChon((prev) =>
// // //       prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
// // //     );
// // //   };

// // //   // 🧮 Gửi API thêm giỏ hàng
// // //   const handleAddToCart = async () => {
// // //     if (!chonBienThe && bienThe.length > 0) {
// // //       alert("Vui lòng chọn biến thể sản phẩm!");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     try {
// // //       const res = await fetch("/api/gio-hang", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           id_san_pham: sanPhamId,
// // //           id_bien_the: chonBienThe,
// // //           so_luong: soLuong,
// // //           json_mon_them: JSON.stringify(chonMonThem),
// // //           json_tuy_chon: JSON.stringify(chonTuyChon),
// // //         }),
// // //       });

// // //       if (res.ok) {
// // //         alert("🛒 Đã thêm vào giỏ hàng!");
// // //       } else {
// // //         alert("Có lỗi xảy ra khi thêm vào giỏ hàng.");
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Lỗi kết nối máy chủ.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="border rounded-xl p-4 mt-4 shadow-sm">
// // //       {/* Chọn biến thể */}
// // //       {bienThe.length > 0 && (
// // //         <div className="mb-4">
// // //           <h3 className="font-medium mb-2">Chọn biến thể:</h3>
// // //           <div className="flex flex-wrap gap-2">
// // //             {bienThe.map((bt) => (
// // //               <button
// // //                 key={bt.id}
// // //                 onClick={() => setChonBienThe(bt.id!)}
// // //                 className={`px-3 py-2 rounded-lg border transition ${
// // //                   chonBienThe === bt.id
// // //                     ? "bg-[#e8594f] text-white border-[#e8594f]"
// // //                     : "bg-white text-gray-700 border-gray-300 hover:border-[#e8594f]"
// // //                 }`}
// // //               >
// // //                 {bt.ten}
// // //                 {bt.gia_them ? ` (+${bt.gia_them.toLocaleString("vi-VN")}đ)` : ""}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Món thêm */}
// // //       {monThem.length > 0 && (
// // //         <div className="mb-4">
// // //           <h3 className="font-medium mb-2">Món thêm:</h3>
// // //           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
// // //             {monThem.map((mt) => (
// // //               <label
// // //                 key={mt.id}
// // //                 className="flex items-center gap-2 cursor-pointer border p-2 rounded-lg hover:shadow-sm"
// // //               >
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={chonMonThem.includes(mt.id!)}
// // //                   onChange={() => handleToggleMonThem(mt.id!)}
// // //                 />
// // //                 <span>{mt.ten}</span>
// // //                 <span className="text-red-500 ml-auto">
// // //                   +{mt.gia_them.toLocaleString("vi-VN")}đ
// // //                 </span>
// // //               </label>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Tùy chọn */}
// // //       {tuyChon.length > 0 && (
// // //         <div className="mb-4">
// // //           <h3 className="font-medium mb-2">Tuỳ chọn:</h3>
// // //           <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
// // //             {tuyChon.map((tc) => (
// // //               <label
// // //                 key={tc.id}
// // //                 className="flex items-center gap-2 cursor-pointer border p-2 rounded-lg hover:shadow-sm"
// // //               >
// // //                 <input
// // //                   type="checkbox"
// // //                   checked={chonTuyChon.includes(tc.id!)}
// // //                   onChange={() => handleToggleTuyChon(tc.id!)}
// // //                 />
// // //                 <span>{tc.ten}</span>
// // //               </label>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Số lượng & nút thêm */}
// // //       <div className="flex items-center justify-between mt-6">
// // //         <div className="flex items-center gap-3">
// // //           <button
// // //             onClick={() => setSoLuong((q) => Math.max(1, q - 1))}
// // //             className="w-8 h-8 border rounded-lg flex items-center justify-center"
// // //           >
// // //             -
// // //           </button>
// // //           <span>{soLuong}</span>
// // //           <button
// // //             onClick={() => setSoLuong((q) => q + 1)}
// // //             className="w-8 h-8 border rounded-lg flex items-center justify-center"
// // //           >
// // //             +
// // //           </button>
// // //         </div>
// // //         <button
// // //           onClick={handleAddToCart}
// // //           disabled={loading}
// // //           className="bg-[#e8594f] hover:bg-[#d94d46] text-white py-3 px-6 rounded-xl text-lg font-medium disabled:opacity-50"
// // //         >
// // //           {loading ? "Đang thêm..." : "🛒 Thêm vào giỏ hàng"}
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import React from "react";

// // interface Props {
// //   data: any; // chứa toàn bộ dữ liệu sản phẩm (san_pham, bien_thes, mon_them, tuy_chon...)
// //   onClose: () => void; // callback khi đóng popup
// // }

// // export default function ThemVaoGioHang({ data, onClose }: Props) {
// //   const { san_pham, bien_thes, mon_them, tuy_chon } = data;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative">
// //         {/* Nút đóng */}
// //         <button
// //           onClick={onClose}
// //           className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
// //         >
// //           ×
// //         </button>

// //         <h2 className="text-2xl font-semibold text-center mb-4 text-[#D33C3C]">
// //           Thêm vào giỏ hàng
// //         </h2>

// //         {/* Hiển thị tên sản phẩm */}
// //         <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
// //           {san_pham?.ten}
// //         </h3>

// //         {/* Biến thể */}
// //         {bien_thes?.length > 0 && (
// //           <div className="mb-5">
// //             <p className="font-medium mb-2">Chọn biến thể:</p>
// //             <div className="grid grid-cols-2 gap-3">
// //               {bien_thes.map((b: any) => (
// //                 <button
// //                   key={b.id}
// //                   className="border rounded-lg py-2 hover:bg-[#fbeaea] transition"
// //                 >
// //                   {b.ten}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* Món thêm */}
// //         {mon_them?.length > 0 && (
// //           <div className="mb-5">
// //             <p className="font-medium mb-2">Chọn món thêm:</p>
// //             <div className="grid grid-cols-2 gap-3">
// //               {mon_them.map((m: any) => (
// //                 <label
// //                   key={m.id}
// //                   className="border rounded-lg py-2 px-3 flex items-center justify-between"
// //                 >
// //                   <span>{m.ten}</span>
// //                   <span className="text-red-500 text-sm">
// //                     +{m.gia_them?.toLocaleString("vi-VN")}đ
// //                   </span>
// //                 </label>
// //               ))}
// //             </div>
// //           </div>
// //         )}

// //         {/* Tùy chọn */}
// //         {tuy_chon?.length > 0 && (
// //           <div className="mb-5">
// //             <p className="font-medium mb-2">Tùy chọn:</p>
// //             {tuy_chon.map((loai: any) => (
// //               <div key={loai.id} className="mb-3">
// //                 <p className="text-gray-700 font-medium">{loai.ten}</p>
// //                 <div className="flex flex-wrap gap-2 mt-2">
// //                   {loai.tuy_chon.map((tc: any) => (
// //                     <button
// //                       key={tc.id}
// //                       className="border px-3 py-1 rounded-full hover:bg-[#fbeaea] transition"
// //                     >
// //                       {tc.ten}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Nút xác nhận */}
// //         <div className="text-center">
// //           <button className="bg-[#D33C3C] hover:bg-[#b53030] text-white px-8 py-3 rounded-xl font-medium">
// //             Xác nhận thêm vào giỏ
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import React, { useMemo, useState } from "react";
// import Image from "next/image";
// import { IBienThe, IMonThem, ILoaiTuyChon } from "@/app/lib/cautrucdata";

// interface ThemVaoGioHangProps {
//   data: {
//     san_pham: any;
//     bien_thes?: IBienThe[];
//     mon_them?: IMonThem[];
//     tuy_chon?: (ILoaiTuyChon & { tuy_chon?: any[] })[];
//   };
//   onClose: () => void;
// }

// export default function ThemVaoGioHang({ data, onClose }: ThemVaoGioHangProps) {
//   const { san_pham, bien_thes = [], mon_them = [], tuy_chon = [] } = data || {};

//   // states
//   const [qty, setQty] = useState<number>(1);
//   const [selectedBienThe, setSelectedBienThe] = useState<number | null>(
//     bien_thes.length ? bien_thes[0].id ?? null : null
//   );
//   // cho mỗi loại tuy_chon chỉ 1 chọn -> lưu mapping loaiId -> tuyChonId
//   const [selectedTuyChon, setSelectedTuyChon] = useState<Record<number, number | null>>(
//     () =>
//       tuy_chon.reduce<Record<number, number | null>>((acc, loai) => {
//         acc[loai.id!] = loai.tuy_chon && loai.tuy_chon.length ? loai.tuy_chon[0].id ?? null : null;
//         return acc;
//       }, {})
//   );
//   const [selectedMonThem, setSelectedMonThem] = useState<number[]>([]);
//   const [ghiChu, setGhiChu] = useState<string>("");

//   // helper toggle for mon them (checkbox)
//   const toggleMonThem = (id: number) => {
//     setSelectedMonThem((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
//   };

//   // tổng phụ phí (variant + tùy chọn + món thêm)
//   const subtotalPerItem = useMemo(() => {
//     let total = 0;

//     // biến thể (bien_the)
//     if (selectedBienThe !== null) {
//       const bt = bien_thes.find((b) => b.id === selectedBienThe);
//       if (bt && bt.gia_them) total += bt.gia_them;
//     }

//     // tùy chọn (mỗi loại 1 chọn)
//     Object.entries(selectedTuyChon).forEach(([loaiId, tuyChonId]) => {
//       if (tuyChonId === null) return;
//       const loai = tuy_chon.find((l) => l.id === Number(loaiId));
//       const tc = loai?.tuy_chon?.find((t) => t.id === tuyChonId);
//       // some tuy_chon items may have gia_them — if not, assume 0
//       if (tc && (tc as any).gia_them) total += (tc as any).gia_them;
//     });

//     // món thêm (nhiều chọn)
//     selectedMonThem.forEach((id) => {
//       const m = mon_them.find((x) => x.id === id);
//       if (m && m.gia_them) total += m.gia_them;
//     });

//     return total;
//   }, [selectedBienThe, selectedTuyChon, selectedMonThem, bien_thes, mon_them, tuy_chon]);

//   const totalAll = (Number(san_pham?.gia_goc || san_pham?.gia || 0) + subtotalPerItem) * qty;

//   // handlers
//   const handleSelectTuyChon = (loaiId: number, tcId: number) => {
//     setSelectedTuyChon((prev) => ({ ...prev, [loaiId]: tcId }));
//   };

//   const handleAddToCart = async () => {
//     // TODO: thay console.log bằng gọi API /api/gio-hang nếu muốn
//     const payload = {
//       id_san_pham: san_pham?.id,
//       id_bien_the: selectedBienThe,
//       so_luong: qty,
//       json_mon_them: JSON.stringify(selectedMonThem),
//       json_tuy_chon: JSON.stringify(selectedTuyChon),
//       ghi_chu: ghiChu,
//       don_gia: Number(san_pham?.gia_goc || san_pham?.gia || 0) + subtotalPerItem,
//       thanh_tien: totalAll,
//     };

//     console.log("Thêm vào giỏ (payload):", payload);
//     // call API here if you want, e.g.
//     // await fetch("/api/gio-hang", { method: "POST", headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) })
//     onClose();
//   };

//   const handleBuyNow = async () => {
//     // For demo, just log and close
//     console.log("Mua ngay:", {
//       total: totalAll,
//       product: san_pham?.id,
//       qty,
//       mon_them: selectedMonThem,
//       tuy_chon: selectedTuyChon,
//     });
//     // implement checkout flow...
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 p-4">
//       <div className="relative bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
//         {/* Header (small image, title, price, qty controls) */}
//         <div className="flex items-center gap-3 p-4 border-b">
//           <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
//             {san_pham?.hinh ? (
//               <Image src={san_pham.hinh} alt={san_pham.ten} width={80} height={80} className="object-cover" />
//             ) : (
//               <div className="bg-gray-100 w-full h-full" />
//             )}
//           </div>

//           <div className="flex-1">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-[#6A0A0A]">{san_pham?.ten}</h3>
//               <div className="text-right">
//                 <div className="text-sm text-gray-500">Giá</div>
//                 <div className="text-lg font-bold text-red-500">
//                   {(Number(san_pham?.gia_goc || san_pham?.gia || 0)).toLocaleString("vi-VN")}đ
//                 </div>
//               </div>
//             </div>

//             <p className="text-sm text-gray-600 mt-1 line-clamp-2">{san_pham?.mo_ta}</p>
//           </div>

//           {/* qty controls */}
//           <div className="flex flex-col items-center gap-2">
//             <div className="flex items-center border rounded-full overflow-hidden">
//               <button
//                 onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 className="px-3 py-1"
//                 aria-label="Giảm số lượng"
//               >
//                 −
//               </button>
//               <div className="px-3 py-1 bg-white">{qty}</div>
//               <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1" aria-label="Tăng số lượng">
//                 +
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="p-4 space-y-4">
//           {/* Biến thể (Độ cay) */}
//           {bien_thes.length > 0 && (
//             <div>
//               <h4 className="text-base font-semibold mb-2 border-b pb-2">Độ cay (Chọn 1)</h4>
//               <div className="space-y-2">
//                 {bien_thes.map((b) => {
//                   const checked = selectedBienThe === b.id;
//                   return (
//                     <label
//                       key={b.id}
//                       className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-3">
//                         {/* custom radio */}
//                         <div
//                           className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                             checked ? "bg-[#e8594f] border-[#e8594f]" : "bg-white border-gray-300"
//                           }`}
//                         >
//                           {checked && (
//                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
//                               <circle cx="12" cy="12" r="5" fill="white" />
//                             </svg>
//                           )}
//                         </div>
//                         <span className="text-sm">{b.ten}</span>
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         {b.gia_them && b.gia_them > 0 ? `+${b.gia_them.toLocaleString("vi-VN")}đ` : "0đ"}
//                       </div>
//                       <input
//                         type="radio"
//                         name="bien_the"
//                         className="hidden"
//                         checked={checked}
//                         onChange={() => setSelectedBienThe(b.id ?? null)}
//                       />
//                     </label>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Tuy chọn (loại) - mỗi nhóm chọn 1 */}
//           {tuy_chon.length > 0 &&
//             tuy_chon.map((loai) => (
//               <div key={loai.id}>
//                 <h4 className="text-base font-semibold mb-2 border-b pb-2">{loai.ten} (Chọn 1)</h4>
//                 <div className="space-y-2">
//                   {loai.tuy_chon?.map((tc: any) => {
//                     const checked = selectedTuyChon[loai.id!] === tc.id;
//                     return (
//                       <label
//                         key={tc.id}
//                         className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                               checked ? "bg-[#e8594f] border-[#e8594f]" : "bg-white border-gray-300"
//                             }`}
//                           >
//                             {checked && (
//                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
//                                 <circle cx="12" cy="12" r="5" fill="white" />
//                               </svg>
//                             )}
//                           </div>
//                           <span className="text-sm">{tc.ten}</span>
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           {(tc as any).gia_them ? `+${(tc as any).gia_them.toLocaleString("vi-VN")}đ` : "0đ"}
//                         </div>

//                         <input
//                           type="radio"
//                           name={`tuy_chon_${loai.id}`}
//                           className="hidden"
//                           checked={checked}
//                           onChange={() => handleSelectTuyChon(loai.id!, tc.id!)}
//                         />
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}

//           {/* Món thêm (checkbox list) */}
//           {mon_them.length > 0 && (
//             <div>
//               <h4 className="text-base font-semibold mb-2 border-b pb-2">Món thêm</h4>
//               <div className="space-y-2">
//                 {mon_them.map((m) => {
//                   const checked = selectedMonThem.includes(m.id!);
//                   return (
//                     <label
//                       key={m.id}
//                       className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div
//                           className={`w-5 h-5 rounded-full border flex items-center justify-center ${
//                             checked ? "bg-[#e8594f] border-[#e8594f]" : "bg-white border-gray-300"
//                           }`}
//                         >
//                           {checked ? (
//                             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
//                               <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                             </svg>
//                           ) : null}
//                         </div>
//                         <span className="text-sm">{m.ten}</span>
//                       </div>

//                       <div className="text-sm text-gray-600">
//                         +{m.gia_them.toLocaleString("vi-VN")}đ
//                       </div>

//                       <input
//                         type="checkbox"
//                         className="hidden"
//                         checked={checked}
//                         onChange={() => toggleMonThem(m.id!)}
//                       />
//                     </label>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* Ghi chú */}
//           <div>
//             <h4 className="text-base font-semibold mb-2">Ghi chú</h4>
//             <textarea
//               value={ghiChu}
//               onChange={(e) => setGhiChu(e.target.value)}
//               placeholder="Ghi chú cho cửa hàng..."
//               className="w-full border rounded-md p-2 h-20 resize-none"
//             />
//           </div>
//         </div>

//         {/* Footer - sticky at bottom inside modal */}
//         <div className="border-t p-4 bg-white sticky bottom-0 rounded-b-2xl">
//           <div className="flex items-center justify-between gap-4">
//             <button
//               onClick={handleAddToCart}
//               className="flex-1 bg-[#f3a59a] hover:bg-[#f19b8f] text-white py-3 rounded-full font-medium"
//             >
//               Thêm vào giỏ hàng
//             </button>

//             <button
//               onClick={handleBuyNow}
//               className="flex-1 ml-3 bg-[#D33C3C] hover:bg-[#b53030] text-white py-3 rounded-full font-medium flex items-center justify-center gap-3"
//             >
//               Mua hàng
//               <span className="ml-2 bg-white/10 px-3 py-1 rounded-full text-sm">
//                 -{totalAll.toLocaleString("vi-VN")}đ
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Close when click backdrop (optional) */}
//       <button
//         aria-label="Đóng"
//         onClick={onClose}
//         className="absolute top-6 right-6 text-white text-2xl"
//         style={{ background: "transparent" }}
//       />
//     </div>
//   );
// }
"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IBienThe, IMonThem, ILoaiTuyChon } from "@/app/lib/cautrucdata";

interface ThemVaoGioHangProps {
  data: {
    san_pham: any;
    bien_thes?: IBienThe[];
    mon_them?: IMonThem[];
    tuy_chon?: (ILoaiTuyChon & { tuy_chon?: any[] })[];
  };
  onClose: () => void;
}

export default function ThemVaoGioHang({ data, onClose }: ThemVaoGioHangProps) {
  const { san_pham, bien_thes = [], mon_them = [], tuy_chon = [] } = data || {};

  // States
  const [qty, setQty] = useState(1);
  const [selectedBienThe, setSelectedBienThe] = useState<number | null>(
    bien_thes.length ? bien_thes[0].id ?? null : null
  );
  const [selectedTuyChon, setSelectedTuyChon] = useState<Record<number, number | null>>(
    () =>
      tuy_chon.reduce<Record<number, number | null>>((acc, loai) => {
        acc[loai.id!] =
          loai.tuy_chon && loai.tuy_chon.length ? loai.tuy_chon[0].id ?? null : null;
        return acc;
      }, {})
  );
  const [selectedMonThem, setSelectedMonThem] = useState<number[]>([]);
  const [ghiChu, setGhiChu] = useState("");

  // Toggle món thêm (checkbox)
  const toggleMonThem = (id: number) => {
    setSelectedMonThem((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Tổng phụ phí (biến thể + tùy chọn + món thêm)
  const subtotalPerItem = useMemo(() => {
    let total = 0;

    if (selectedBienThe !== null) {
      const bt = bien_thes.find((b) => b.id === selectedBienThe);
      if (bt?.gia_them) total += bt.gia_them;
    }

    Object.entries(selectedTuyChon).forEach(([loaiId, tuyChonId]) => {
      if (!tuyChonId) return;
      const loai = tuy_chon.find((l) => l.id === Number(loaiId));
      const tc = loai?.tuy_chon?.find((t) => t.id === tuyChonId);
      if (tc && (tc as any).gia_them) total += (tc as any).gia_them;
    });

    selectedMonThem.forEach((id) => {
      const m = mon_them.find((x) => x.id === id);
      if (m?.gia_them) total += m.gia_them;
    });

    return total;
  }, [selectedBienThe, selectedTuyChon, selectedMonThem, bien_thes, mon_them, tuy_chon]);

  const totalAll =
    (Number(san_pham?.gia_goc || san_pham?.gia || 0) + subtotalPerItem) * qty;

  const handleSelectTuyChon = (loaiId: number, tcId: number) => {
    setSelectedTuyChon((prev) => ({ ...prev, [loaiId]: tcId }));
  };

  const handleAddToCart = async () => {
    console.log("🛒 Thêm vào giỏ:", {
      id_san_pham: san_pham?.id,
      id_bien_the: selectedBienThe,
      so_luong: qty,
      json_mon_them: selectedMonThem,
      json_tuy_chon: selectedTuyChon,
      ghi_chu: ghiChu,
      thanh_tien: totalAll,
    });
    onClose();
  };

  const handleBuyNow = async () => {
    console.log("💳 Mua ngay:", {
      san_pham: san_pham?.id,
      qty,
      tong_tien: totalAll,
    });
    onClose();
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
          onClick={(e) => e.stopPropagation()} // ⛔ Ngăn bấm trong khung đóng popup
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              {san_pham?.hinh_anh ? (
                <Image
                  src={san_pham.hinh_anh}
                  alt={san_pham.ten}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              ) : (
                <div className="bg-gray-100 w-full h-full" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#6A0A0A]">{san_pham?.ten}</h3>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Giá</div>
                  <div className="text-lg font-bold text-red-500">
                    {(Number(san_pham?.gia_goc || san_pham?.gia || 0)).toLocaleString("vi-VN")}đ
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{san_pham?.mo_ta}</p>
            </div>

            {/* Qty controls */}
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
            {bien_thes.length > 0 && (
              <div>
                <h4 className="text-base font-semibold mb-2 border-b pb-2">
                  Độ cay (Chọn 1)
                </h4>
                <div className="space-y-2">
                  {bien_thes.map((b) => {
                    const checked = selectedBienThe === b.id;
                    return (
                      <label
                        key={b.id}
                        className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              checked
                                ? "bg-[#e8594f] border-[#e8594f]"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {checked && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="5" fill="white" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm">{b.ten}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {b.gia_them ? `+${b.gia_them.toLocaleString("vi-VN")}đ` : "0đ"}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          checked={checked}
                          onChange={() => setSelectedBienThe(b.id ?? null)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tùy chọn */}
            {tuy_chon.map((loai) => (
              <div key={loai.id}>
                <h4 className="text-base font-semibold mb-2 border-b pb-2">
                  {loai.ten} (Chọn 1)
                </h4>
                <div className="space-y-2">
                  {loai.tuy_chon?.map((tc) => {
                    const checked = selectedTuyChon[loai.id!] === tc.id;
                    return (
                      <label
                        key={tc.id}
                        className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              checked
                                ? "bg-[#e8594f] border-[#e8594f]"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {checked && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="5" fill="white" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm">{tc.ten}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {(tc as any).gia_them
                            ? `+${(tc as any).gia_them.toLocaleString("vi-VN")}đ`
                            : "0đ"}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          checked={checked}
                          onChange={() => handleSelectTuyChon(loai.id!, tc.id!)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Món thêm */}
            {mon_them.length > 0 && (
              <div>
                <h4 className="text-base font-semibold mb-2 border-b pb-2">
                  Món thêm
                </h4>
                <div className="space-y-2">
                  {mon_them.map((m) => {
                    const checked = selectedMonThem.includes(m.id!);
                    return (
                      <label
                        key={m.id}
                        className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              checked
                                ? "bg-[#e8594f] border-[#e8594f]"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {checked && (
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M20 6L9 17l-5-5"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm">{m.ten}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          +{m.gia_them.toLocaleString("vi-VN")}đ
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={checked}
                          onChange={() => toggleMonThem(m.id!)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ghi chú */}
            <div>
              <h4 className="text-base font-semibold mb-2">Ghi chú</h4>
              <textarea
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                placeholder="Ghi chú cho cửa hàng..."
                className="w-full border rounded-md p-2 h-20 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4 bg-white sticky bottom-0 rounded-b-2xl">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#f3a59a] hover:bg-[#f19b8f] text-white py-3 rounded-full font-medium"
              >
                Thêm vào giỏ hàng
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 ml-3 bg-[#D33C3C] hover:bg-[#b53030] text-white py-3 rounded-full font-medium flex items-center justify-center gap-3"
              >
                Mua hàng
                <span className="ml-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                  -{totalAll.toLocaleString("vi-VN")}đ
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
