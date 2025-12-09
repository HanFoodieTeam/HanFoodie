// "use client";

// import React, { useMemo, useState } from "react";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   IBienThe,
//   IMonThem,
//   ILoaiTuyChon,
//   ISanPham,
//   ITuyChon,
//   INguoiDung,
// } from "@/app/lib/cautrucdata";
// import LoginForm from "./dangnhap";
// import { useCart } from "../context/giohangcontext";


// interface ILoaiTuyChonMoRong extends ILoaiTuyChon {
//   tuy_chon?: ITuyChonMoRong[];
// }

// interface ITuyChonMoRong extends ITuyChon {
//   gia_them?: number | null;
// }

// interface ThemVaoGioHangProps {
//   data: {
//     san_pham: ISanPham;
//     bien_the?: IBienThe[];
//     mon_them?: IMonThem[];
//     tuy_chon?: ILoaiTuyChonMoRong[];
//   };
//   onClose: () => void;
// }

// export default function ThemVaoGioHang({ data, onClose }: ThemVaoGioHangProps) {
//   const { san_pham, bien_the = [], mon_them = [], tuy_chon = [] } = data || {};

//   // States
//   const [qty, setQty] = useState(1);
//   const [selectedBienThe, setSelectedBienThe] = useState<number | null>(
//     bien_the.length ? bien_the[0].id ?? null : null
//   );

//   const [selectedTuyChon, setSelectedTuyChon] = useState<
//     Record<number, number | null>
//   >(() =>
//     tuy_chon.reduce<Record<number, number | null>>((acc, loai) => {
//       acc[loai.id!] =
//         loai.tuy_chon && loai.tuy_chon.length
//           ? loai.tuy_chon[0].id ?? null
//           : null;
//       return acc;
//     }, {})
//   );

//   const [selectedMonThem, setSelectedMonThem] = useState<number[]>([]);

//   // Toggle món thêm (checkbox)
//   const toggleMonThem = (id: number) => {
//     setSelectedMonThem((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   // Tổng phụ phí (biến thể + tùy chọn + món thêm)
//   const subtotalPerItem = useMemo(() => {
//     let total = 0;

//     if (selectedBienThe !== null) {
//       const bt = bien_the.find((b) => b.id === selectedBienThe);
//       if (bt?.gia_them) total += bt.gia_them;
//     }

//     Object.entries(selectedTuyChon).forEach(([loaiId, tuyChonId]) => {
//       if (!tuyChonId) return;
//       const loai = tuy_chon.find((l) => l.id === Number(loaiId));
//       const tc = loai?.tuy_chon?.find((t) => t.id === tuyChonId);
//       if (tc?.gia_them) total += tc.gia_them;
//     });

//     selectedMonThem.forEach((id) => {
//       const m = mon_them.find((x) => x.id === id);
//       if (m?.gia_them) total += m.gia_them;
//     });

//     return total;
//   }, [selectedBienThe, selectedTuyChon, selectedMonThem, bien_the, mon_them, tuy_chon]);

//   const totalAll =
//     (Number(san_pham?.gia_goc || san_pham?.gia_goc || 0) + subtotalPerItem) *
//     qty;

//   const handleSelectTuyChon = (loaiId: number, tcId: number) => {
//     setSelectedTuyChon((prev) => ({ ...prev, [loaiId]: tcId }));
//   };

//   const [showLogin, setShowLogin] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);

//   const { reloadCart } = useCart();


//   //  Hàm thêm vào giỏ hàng
//   const handleAddToCart = async () => {
//     const userData = localStorage.getItem("nguoi_dung");

//     //  Nếu chưa đăng nhập → hiện form login
//     if (!userData) {
//       setShowLogin(true);
//       return;
//     }

//     const user = JSON.parse(userData);
//     const idNguoiDung = user.id;

//     const payload = {
//       id_san_pham: san_pham?.id,
//       id_bien_the: selectedBienThe,
//       so_luong: qty,
//       json_mon_them: selectedMonThem
//         .map((id) => {
//           const m = mon_them.find((x) => x.id === id);
//           return m ? { id: m.id, ten: m.ten, gia_them: m.gia_them } : null;
//         })
//         .filter(Boolean),
//       json_tuy_chon: Object.fromEntries(
//         Object.entries(selectedTuyChon).map(([loaiId, tuyChonId]) => {
//           const loai = tuy_chon.find((l) => l.id === Number(loaiId));
//           const tc = loai?.tuy_chon?.find((t) => t.id === tuyChonId);
//           return [loai?.ten || `loai_${loaiId}`, tc?.ten || null];
//         })
//       ),
//       id_nguoi_dung: idNguoiDung,
//     };

//     try {
//       setIsAdding(true);

//       const token = localStorage.getItem("token");

//       const res = await fetch("/api/gio_hang", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, //  gửi token lên server
//         },
//         body: JSON.stringify(payload),
//       });
//       await reloadCart();

//       if (!res.ok) {
//         //  await reloadCart();
//         const err = await res.json();
//         alert(err.thong_bao || "Thêm giỏ hàng thất bại!");
//         return;
//       }

//       alert(" Đã thêm vào giỏ hàng!");
//       onClose();
//     } catch (error) {
//       alert(" Không thể kết nối đến server!");
//       console.error(error);
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   //mua hàng
//   const handleBuyNow = async (): Promise<void> => {
//     const userData = localStorage.getItem("nguoi_dung");

//     if (!userData) {
//       setShowLogin(true);
//       return;
//     }

//     const user = JSON.parse(userData);

//     const bienTheChon = bien_the.find((b) => b.id === selectedBienThe);

//     const item = {
//       id: Date.now(),
//       so_luong: qty,
//       bien_the: {
//         ...bienTheChon,
//         san_pham: {
//           ten: san_pham.ten,
//           hinh: san_pham.hinh || "/noing.png",
//           gia_goc: san_pham.gia_goc ?? 0,
//         },
//       },
//       json_mon_them: selectedMonThem
//         .map((id) => {
//           const m = mon_them.find((x) => x.id === id);
//           return m
//             ? {
//               ten: m.ten,
//               gia_them: m.gia_them ?? 0,
//             }
//             : null;
//         })
//         .filter(Boolean),
//       json_tuy_chon: Object.fromEntries(
//         Object.entries(selectedTuyChon).map(([loaiId, tuyChonId]) => {
//           const loai = tuy_chon.find((l) => l.id === Number(loaiId));
//           const tc = loai?.tuy_chon?.find((t) => t.id === tuyChonId);
//           return [loai?.ten || `loai_${loaiId}`, tc?.ten || ""];
//         })
//       ),
//     };

//     localStorage.setItem("donHangTam", JSON.stringify([item]));
//     window.location.href = "/dat_hang";
//   };

//   //  Sau khi đăng nhập thành công
//   const handleLoginSuccess = () => {
//     setShowLogin(false);
//     handleAddToCart(); //  tự động thêm lại giỏ hàng
//   };



//   return (
//     <AnimatePresence>
//       <motion.div className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 p-4"
//         onClick={onClose}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}>
//         <motion.div className="relative bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
//           onClick={(e) => e.stopPropagation()}
//           initial={{ scale: 0.9, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.9, opacity: 0 }}
//           transition={{ duration: 0.25 }}>
//           {/* Header */}
//           <div className="flex items-start gap-3 p-4 border-b">
//             {/* Ảnh sản phẩm */}
//             <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
//               {san_pham?.hinh ? (
//                 <Image src={san_pham.hinh} alt={san_pham.ten} width={80} height={80} className="object-cover" />
//               ) : (
//                 <div className="bg-gray-100 w-full h-full" />
//               )}
//             </div>

//             {/* Thông tin sản phẩm */}
//             <div className="flex-1">
//               <h3 className="text-lg font-semibold text-[#6A0A0A]">
//                 {san_pham?.ten}
//               </h3>
//               <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//                 {san_pham?.mo_ta}
//               </p>
//             </div>

//             {/* Cột bên phải: Giá + Số lượng */}
//             <div className="flex flex-col items-end justify-between min-w-[90px]">
//               {/* Giá */}
//               <div className="text-right mb-2">
//                 <div className="text-sm text-gray-500">Giá</div>
//                 <div className="text-lg font-bold text-red-500">
//                   {Number(san_pham?.gia_goc || 0).toLocaleString("vi-VN")}đ
//                 </div>
//               </div>

//               {/* Số lượng */}
//               <div className="flex items-center border rounded-full overflow-hidden">
//                 <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1 text-gray-700">
//                   -
//                 </button>
//                 <div className="px-3 py-1 bg-white text-gray-800 font-medium">{qty}</div>
//                 <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1 text-gray-700">
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
//                   Độ cay (Chọn 1)
//                 </h4>
//                 <div className="space-y-2">
//                   {bien_the.map((b) => {
//                     const checked = selectedBienThe === b.id;
//                     return (
//                       <label
//                         key={b.id}
//                         className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer" >
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`w-5 h-5 rounded-full border flex items-center justify-center ${checked
//                               ? "bg-[#e8594f] border-[#e8594f]"
//                               : "bg-white border-gray-300"
//                               }`}>
//                             {checked && (
//                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
//                                 <circle cx="12" cy="12" r="5" fill="white" />
//                               </svg>
//                             )}
//                           </div>
//                           <span className="text-sm">{b.ten}</span>
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           {b.gia_them ? `+${b.gia_them.toLocaleString("vi-VN")}đ` : "0đ"}
//                         </div>
//                         <input type="radio"
//                           className="hidden"
//                           checked={checked}
//                           onChange={() => setSelectedBienThe(b.id ?? null)} />
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
//                   {loai.ten} (Chọn 1)
//                 </h4>
//                 <div className="space-y-2">
//                   {loai.tuy_chon?.map((tc) => {
//                     const checked = selectedTuyChon[loai.id!] === tc.id;
//                     return (
//                       <label
//                         key={tc.id}
//                         className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
//                         <div className="flex items-center gap-3">
//                           <div
//                             className={`w-5 h-5 rounded-full border flex items-center justify-center ${checked
//                               ? "bg-[#e8594f] border-[#e8594f]"
//                               : "bg-white border-gray-300"
//                               }`} >
//                             {checked && (
//                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
//                                 <circle cx="12" cy="12" r="5" fill="white" />
//                               </svg>
//                             )}
//                           </div>
//                           <span className="text-sm">{tc.ten}</span>
//                         </div>
//                         <div className="text-sm text-gray-600">
//                           {tc.gia_them
//                             ? `+${tc.gia_them.toLocaleString("vi-VN")}đ`
//                             : "0đ"}
//                         </div>
//                         <input
//                           type="radio"
//                           className="hidden"
//                           checked={checked}
//                           onChange={() => handleSelectTuyChon(loai.id!, tc.id!)} />
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}

//             {/* Món thêm */}
//             {mon_them.length > 0 && (
//               <div>
//                 <h4 className="text-base font-semibold mb-2 border-b pb-2">Món thêm</h4>
//                 <div className="space-y-2">
//                   {mon_them.map((m) => {
//                     const checked = selectedMonThem.includes(m.id!);
//                     return (
//                       <label
//                         key={m.id}
//                         className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
//                         <div className="flex items-center gap-3">
//                           {/* Ô VUÔNG thay vì tròn */}
//                           <div
//                             className={`w-5 h-5 border flex items-center justify-center rounded-[4px] transition-all duration-150 ${checked
//                               ? "bg-[#e8594f] border-[#e8594f]"
//                               : "bg-white border-gray-300"
//                               }`}>
//                             {checked && (
//                               <svg width="14" height="14"
//                                 viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" >
//                                 <polyline points="20 6 9 17 4 12" />
//                               </svg>
//                             )}
//                           </div>

//                           <span className="text-sm">{m.ten}</span>
//                         </div>

//                         <div className="text-sm text-gray-600">
//                           +{m.gia_them.toLocaleString("vi-VN")}đ
//                         </div>

//                         <input type="checkbox" className="hidden" checked={checked} onChange={() => toggleMonThem(m.id!)} />
//                       </label>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Footer */}
//           <div className="border-t p-4 bg-white sticky bottom-0 rounded-b-2xl">
//             <div className="flex items-center justify-between gap-3">
//               {/* Nút Thêm vào giỏ */}
//               <button
//                 onClick={handleAddToCart}
//                 disabled={isAdding}
//                 className="flex-1 bg-[#6A0A0A] text-white py-3 rounded-full font-semibold hover:bg-[#800000] transition text-center">
//                 {isAdding ? "Đang thêm..." : " Thêm vào giỏ"}
//               </button>

//               {/* Nút Mua hàng */}
//               <button
//                 onClick={handleBuyNow}
//                 className="flex-1 bg-[#D33C3C] hover:bg-[#b53030] text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition text-center">
//                 <span>Mua hàng</span>
//                 <span className="bg-white/10 px-3 py-1 rounded-full text-sm">
//                   {totalAll.toLocaleString("vi-VN")}đ
//                 </span>
//               </button>
//             </div>

//             {/* Modal đăng nhập giữ nguyên */}
//             {showLogin && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                 <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
//                   <button
//                     onClick={() => setShowLogin(false)}
//                     className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
//                     ✕
//                   </button>
//                   <LoginForm
//                     onClose={() => setShowLogin(false)}
//                     onLoginSuccess={handleLoginSuccess}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>

//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

///component/themvaogio


"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IBienThe,
  IMonThem,
  ILoaiTuyChon,
  ISanPham,
  ITuyChon,
  INguoiDung,
} from "@/app/lib/cautrucdata";
import LoginForm from "./dangnhap";
import { useCart } from "../context/giohangcontext";
import RegisterForm from "./dang_ky";


interface ILoaiTuyChonMoRong extends ILoaiTuyChon {
  tuy_chon?: ITuyChonMoRong[];
}

interface ITuyChonMoRong extends ITuyChon {
  gia_them?: number | null;
}

interface ThemVaoGioHangProps {
  data: {
    san_pham: ISanPham;
    bien_the?: IBienThe[];
    mon_them?: IMonThem[];
    tuy_chon?: ILoaiTuyChonMoRong[];
  };
  onClose: () => void;
  onRequireLogin: (action: "cart" | "buy") => void;
}

export default function ThemVaoGioHang({ data, onClose, onRequireLogin }: ThemVaoGioHangProps) {
  const { san_pham, bien_the = [], mon_them = [], tuy_chon = [] } = data || {};

  // States
  const [qty, setQty] = useState(1);
  const [isLogin, setIsLogin] = useState(true);


  const [selectedBienThe, setSelectedBienThe] = useState<number | null>(
    bien_the.length ? bien_the[0].id ?? null : null
  );

  const [selectedTuyChon, setSelectedTuyChon] = useState<
    Record<number, number | null>
  >(() =>
    tuy_chon.reduce<Record<number, number | null>>((acc, loai) => {
      acc[loai.id!] =
        loai.tuy_chon && loai.tuy_chon.length
          ? loai.tuy_chon[0].id ?? null
          : null;
      return acc;
    }, {})
  );

  const [selectedMonThem, setSelectedMonThem] = useState<number[]>([]);

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
      const bt = bien_the.find((b) => b.id === selectedBienThe);
      if (bt?.gia_them) total += bt.gia_them;
    }

    Object.entries(selectedTuyChon).forEach(([loaiId, tuyChonId]) => {
      if (!tuyChonId) return;
      const loai = tuy_chon.find((l) => l.id === Number(loaiId));
      const tc = loai?.tuy_chon?.find((t) => t.id === tuyChonId);
      if (tc?.gia_them) total += tc.gia_them;
    });

    selectedMonThem.forEach((id) => {
      const m = mon_them.find((x) => x.id === id);
      if (m?.gia_them) total += m.gia_them;
    });

    return total;
  }, [selectedBienThe, selectedTuyChon, selectedMonThem, bien_the, mon_them, tuy_chon]);

  const totalAll =
    (Number(san_pham?.gia_goc || san_pham?.gia_goc || 0) + subtotalPerItem) *
    qty;

  const handleSelectTuyChon = (loaiId: number, tcId: number) => {
    setSelectedTuyChon((prev) => ({ ...prev, [loaiId]: tcId }));
  };

  const [showLogin, setShowLogin] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const { reloadCart } = useCart();


  //  Hàm thêm vào giỏ hàng
  const handleAddToCart = async () => {
    const userData = localStorage.getItem("nguoi_dung");

    //  Nếu chưa đăng nhập → hiện form login
  if (!userData) {
  onRequireLogin("buy");
  return;
}



    const user = JSON.parse(userData);
    const idNguoiDung = user.id;

    const payload = {
      id_san_pham: san_pham?.id,
      id_bien_the: selectedBienThe,
      so_luong: qty,
      json_mon_them: selectedMonThem
        .map((id) => {
          const m = mon_them.find((x) => x.id === id);
          return m ? { id: m.id, ten: m.ten, gia_them: m.gia_them } : null;
        })
        .filter(Boolean),
      json_tuy_chon: Object.fromEntries(
        Object.entries(selectedTuyChon).map(([loaiId, tuyChonId]) => {
          const loai = tuy_chon.find((l) => l.id === Number(loaiId));
          const tc = loai?.tuy_chon?.find((t) => t.id === tuyChonId);
          return [loai?.ten || `loai_${loaiId}`, tc?.ten || null];
        })
      ),
      id_nguoi_dung: idNguoiDung,
    };

    try {
      setIsAdding(true);

      const token = localStorage.getItem("token");

      const res = await fetch("/api/gio_hang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      await reloadCart();

      if (!res.ok) {
        const err = await res.json();
        alert(err.thong_bao || "Thêm giỏ hàng thất bại!");
        return;
      }

      alert(" Đã thêm vào giỏ hàng!");
      onClose();
    } catch (error) {
      alert(" Không thể kết nối đến server!");
      console.error(error);
    } finally {
      setIsAdding(false);
    }

  };

  const handleBuyNow = async (): Promise<void> => {
    const userData = localStorage.getItem("nguoi_dung");
    const user = userData ? JSON.parse(userData) : null;

  if (!userData) {
  onRequireLogin("cart");
  return;
}




    if (user.kich_hoat === 0 || user.kich_hoat === false) {
      setShowVerifyPopup(true);
      return;
    }

    const bienTheChon = bien_the.find((b) => b.id === selectedBienThe);
    const item = {
      id: Date.now(),
      so_luong: qty,
      bien_the: {
        ...bienTheChon,
        san_pham: {
          ten: san_pham.ten,
          hinh: san_pham.hinh || "/noing.png",
          gia_goc: san_pham.gia_goc ?? 0,
        },
      },
      json_mon_them: selectedMonThem
        .map((id) => {
          const m = mon_them.find((x) => x.id === id);
          return m ? { ten: m.ten, gia_them: m.gia_them ?? 0 } : null;
        })
        .filter(Boolean),
      json_tuy_chon: Object.fromEntries(
        Object.entries(selectedTuyChon).map(([loaiId, tuyChonId]) => {
          const loai = tuy_chon.find((l) => l.id === Number(loaiId));
          const tc = loai?.tuy_chon?.find((t) => t.id === tuyChonId);
          return [loai?.ten || `loai_${loaiId}`, tc?.ten || ""];
        })
      ),
    };

    localStorage.setItem("donHangTam", JSON.stringify([item]));
    window.location.href = "/dat_hang";

  };


  const handleLoginSuccess = () => {
    setShowLogin(false);

    if (pendingAction === "cart") {
      handleAddToCart();
    } else if (pendingAction === "buy") {
      handleBuyNow();
      onClose?.();
    }

    setPendingAction(null);
  };


  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <motion.div className="relative bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}>
          {/* Header */}
          <div className="flex items-start gap-3 p-4 border-b">
            {/* Ảnh sản phẩm */}
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              {san_pham?.hinh ? (
                <Image src={san_pham.hinh} alt={san_pham.ten} width={80} height={80} className="object-cover" />
              ) : (
                <div className="bg-gray-100 w-full h-full" />
              )}
            </div>

            {/* Thông tin sản phẩm */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#6A0A0A]">
                {san_pham?.ten}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {san_pham?.mo_ta}
              </p>
            </div>

            {/* Cột bên phải: Giá + Số lượng */}
            <div className="flex flex-col items-end justify-between min-w-[90px]">
              {/* Giá */}
              <div className="text-right mb-2">
                <div className="text-sm text-gray-500">Giá</div>
                <div className="text-lg font-bold text-red-500">
                  {Number(san_pham?.gia_goc || 0).toLocaleString("vi-VN")}đ
                </div>
              </div>

              {/* Số lượng */}
              <div className="flex items-center border rounded-full overflow-hidden">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1 text-gray-700">
                  -
                </button>
                <div className="px-3 py-1 bg-white text-gray-800 font-medium">{qty}</div>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1 text-gray-700">
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
                <h4 className="text-base font-semibold mb-2 border-b pb-2">
                  Độ cay (Chọn 1)
                </h4>
                <div className="space-y-2">
                  {bien_the.map((b) => {
                    const checked = selectedBienThe === b.id;
                    return (
                      <label
                        key={b.id}
                        className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer" >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${checked
                              ? "bg-[#e8594f] border-[#e8594f]"
                              : "bg-white border-gray-300"
                              }`}>
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
                        <input type="radio"
                          className="hidden"
                          checked={checked}
                          onChange={() => setSelectedBienThe(b.id ?? null)} />
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
                        className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${checked
                              ? "bg-[#e8594f] border-[#e8594f]"
                              : "bg-white border-gray-300"
                              }`} >
                            {checked && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="5" fill="white" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm">{tc.ten}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {tc.gia_them
                            ? `+${tc.gia_them.toLocaleString("vi-VN")}đ`
                            : "0đ"}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          checked={checked}
                          onChange={() => handleSelectTuyChon(loai.id!, tc.id!)} />
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Món thêm */}
            {mon_them.length > 0 && (
              <div>
                <h4 className="text-base font-semibold mb-2 border-b pb-2">Món thêm</h4>
                <div className="space-y-2">
                  {mon_them.map((m) => {
                    const checked = selectedMonThem.includes(m.id!);
                    return (
                      <label
                        key={m.id}
                        className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          {/* Ô VUÔNG thay vì tròn */}
                          <div
                            className={`w-5 h-5 border flex items-center justify-center rounded-[4px] transition-all duration-150 ${checked
                              ? "bg-[#e8594f] border-[#e8594f]"
                              : "bg-white border-gray-300"
                              }`}>
                            {checked && (
                              <svg width="14" height="14"
                                viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>

                          <span className="text-sm">{m.ten}</span>
                        </div>

                        <div className="text-sm text-gray-600">
                          +{m.gia_them.toLocaleString("vi-VN")}đ
                        </div>

                        <input type="checkbox" className="hidden" checked={checked} onChange={() => toggleMonThem(m.id!)} />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4 bg-white sticky bottom-0 rounded-b-2xl">
            <div className="flex items-center justify-between gap-3">
              {/* Nút Thêm vào giỏ */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-[#6A0A0A] text-white py-3 rounded-full font-semibold hover:bg-[#800000] transition text-center">
                {isAdding ? "Đang thêm..." : " Thêm vào giỏ"}
              </button>

              {/* Nút Mua hàng */}
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#D33C3C] hover:bg-[#b53030] text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition text-center">
                <span>Mua hàng</span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm">
                  {totalAll.toLocaleString("vi-VN")}đ
                </span>
              </button>
            </div>

            {showLogin && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative"
                  onClick={(e) => e.stopPropagation()}>

                  <button
                    onClick={() => setShowLogin(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                    ✕
                  </button>

                  {isLogin ? (
                    <LoginForm
                      onClose={() => setShowLogin(false)}
                      onLoginSuccess={handleLoginSuccess}
                      onSwitchToRegister={() => setIsLogin(false)}
                    />
                  ) : (
                    <RegisterForm
                      onClose={() => setShowLogin(false)}
                      onRegisterSuccess={() => {
                        setIsLogin(true);
                      }}
                      onSwitchToLogin={() => setIsLogin(true)}
                    />
                  )}

                </div>
              </div>
            )}

          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}



