// "use client";

// import Link from "next/link";
// import { Star } from "lucide-react";
// import { ISanPham } from "../lib/cautrucdata";

// interface Props {
//   data: ISanPham[];      // Danh sách toàn bộ sản phẩm
//   idDanhMuc: number;     // ID danh mục hiện tại
//   idSanPham?: number;    // ID sản phẩm hiện tại (để loại trừ)
// }

// export default function SanPhamLienQuanSection({
//   data,
//   idDanhMuc,
//   idSanPham,
// }: Props) {
//   // ✅ Lọc sản phẩm cùng danh mục, khác sản phẩm hiện tại
//   const sanPhamLienQuan = Array.isArray(data)
//     ? data
//         .filter(
//           (sp) =>
//             sp &&
//             typeof sp.id_danh_muc === "number" &&
//             sp.id_danh_muc === idDanhMuc &&
//             sp.id !== idSanPham
//         )
//         .slice(0, 5)
//     : [];

//   if (sanPhamLienQuan.length === 0)
//     return (
//       <p className="text-center text-gray-500 mt-10">
//         Không có sản phẩm liên quan.
//       </p>
//     );

//   return (
//     <section className="mt-12">
//       <h2 className="text-2xl font-semibold mb-3 text-[#6A0A0A]">
//         Sản phẩm liên quan
//       </h2>

//       <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
//         {sanPhamLienQuan.map((sp) => (
//           <div
//             key={sp.id}
//             className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
//           >
//             <Link href={`/chi_tiet/${sp.id}`} className="block">
//               <img
//                 src={sp.hinh || "/images/no-image.jpg"}
//                 alt={sp.ten}
//                 className="w-full h-48 object-cover hover:scale-105 transition-transform"
//               />
//               <div className="p-4">
//                 <h3 className="font-medium text-gray-800 hover:text-[#6A0A0A] line-clamp-1">
//                   {sp.ten}
//                 </h3>
//                 <p className="text-gray-500 text-sm mt-1 truncate">
//                   {sp.mo_ta || "Thưởng thức ẩm thực cùng HanFoodie"}
//                 </p>
//               </div>
//             </Link>

//             {/* Giá + Sao */}
//             <div className="flex items-center justify-between px-4 pb-4">
//               <span className="text-[#6A0A0A] font-semibold text-lg">
//                 {sp.gia_goc?.toLocaleString("vi-VN")}₫
//               </span>
//               <div className="flex items-center text-yellow-500 text-sm">
//                 <Star className="w-4 h-4 fill-yellow-400" /> 4.5
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Heart, Star } from "lucide-react";
// import { ISanPham } from "../lib/cautrucdata";

// interface Props {
//   data: ISanPham[]; // Danh sách toàn bộ sản phẩm
//   idDanhMuc: number; // ID danh mục hiện tại
//   idSanPham?: number; // ID sản phẩm hiện tại (để loại trừ)
// }

// export default function SanPhamLienQuanSection({
//   data,
//   idDanhMuc,
//   idSanPham,
// }: Props) {
//   // ✅ Lọc sản phẩm cùng danh mục, khác sản phẩm hiện tại
//   const sanPhamLienQuan = Array.isArray(data)
//     ? data
//         .filter(
//           (sp) =>
//             sp &&
//             typeof sp.id_danh_muc === "number" &&
//             sp.id_danh_muc === idDanhMuc &&
//             sp.id !== idSanPham
//         )
//         .slice(0, 5)
//     : [];

//   // ❤️ Danh sách yêu thích
//   const [favorites, setFavorites] = useState<number[]>([]);

//   // Lấy favorites từ localStorage khi mở trang
//   useEffect(() => {
//     const stored = localStorage.getItem("favorites");
//     if (stored) setFavorites(JSON.parse(stored));
//   }, []);

//   // Toggle yêu thích
//   const toggleFavorite = (id: number) => {
//     setFavorites((prev) => {
//       const updated = prev.includes(id)
//         ? prev.filter((f) => f !== id)
//         : [...prev, id];
//       localStorage.setItem("favorites", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   if (sanPhamLienQuan.length === 0)
//     return (
//       <p className="text-center text-gray-500 mt-10">
//         Không có sản phẩm liên quan.
//       </p>
//     );

//   return (
//     <section className="mt-12">
//       <h2 className="text-2xl font-semibold mb-3 text-[#6A0A0A]">
//         Sản phẩm liên quan
//       </h2>

//       <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
//         {sanPhamLienQuan.map((sp) => {
//           const isFavorite = favorites.includes(sp.id);
//           return (
//             <div
//               key={sp.id}
//               className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative group"
//             >
//               {/* Ảnh sản phẩm */}
//               <div className="relative">
//                 <img
//                   src={sp.hinh || "/images/no-image.jpg"}
//                   alt={sp.ten}
//                   className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                 />

//                 {/* ❤️ Nút yêu thích */}
//                 <button
//                   onClick={() => toggleFavorite(sp.id)}
//                   className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
//                 >
//                   <Heart
//                     size={20}
//                     className={`transition-colors ${
//                       isFavorite
//                         ? "fill-red-500 text-red-500"
//                         : "text-gray-200 hover:text-red-400"
//                     }`}
//                   />
//                 </button>
//               </div>

//               {/* Thông tin sản phẩm */}
//               <Link href={`/chi_tiet/${sp.id}`} className="block">
//                 <div className="p-4">
//                   <h3 className="font-medium text-gray-800 hover:text-[#6A0A0A] line-clamp-1">
//                     {sp.ten}
//                   </h3>
//                   <p className="text-gray-500 text-sm mt-1 truncate">
//                     {sp.mo_ta || "Thưởng thức ẩm thực cùng HanFoodie"}
//                   </p>
//                 </div>
//               </Link>

//               {/* Giá + Sao */}
//               <div className="flex items-center justify-between px-4 pb-4">
//                 <span className="text-[#6A0A0A] font-semibold text-lg">
//                   {sp.gia_goc?.toLocaleString("vi-VN")}₫
//                 </span>
//                 <div className="flex items-center text-yellow-500 text-sm">
//                   <Star className="w-4 h-4 fill-yellow-400" />{" "}
//                   {sp.so_sao_tb?.toFixed(1) || 4.5}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { ISanPham } from "../lib/cautrucdata";

interface Props {
  data: ISanPham[];
  idDanhMuc: number;
  idSanPham?: number;
}

export default function SanPhamLienQuanSection({
  data,
  idDanhMuc,
  idSanPham,
}: Props) {
  const sanPhamLienQuan = Array.isArray(data)
    ? data
        .filter(
          (sp) =>
            sp &&
            typeof sp.id_danh_muc === "number" &&
            sp.id_danh_muc === idDanhMuc &&
            sp.id !== idSanPham
        )
        .slice(0, 5)
    : [];

  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  if (sanPhamLienQuan.length === 0)
    return (
      <p className="text-center text-gray-500 mt-6">
        Không có sản phẩm liên quan.
      </p>
    );

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-3 text-[#6A0A0A]">
        Sản phẩm liên quan
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {sanPhamLienQuan.map((sp) => {
          const isFavorite = favorites.includes(sp.id);
          return (
            <div
              key={sp.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden relative group"
            >
              {/* Ảnh sản phẩm */}
              <div className="relative">
                <img
                  src={sp.hinh || "/images/no-image.jpg"}
                  alt={sp.ten}
                  className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* ❤️ Nút yêu thích */}
                <button
                  onClick={() => toggleFavorite(sp.id)}
                  className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                >
                  <Heart
                    size={17}
                    className={`transition-colors ${
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-200 hover:text-red-400"
                    }`}
                  />
                </button>
              </div>

              {/* Thông tin sản phẩm */}
              <Link href={`/chi_tiet/${sp.id}`} className="block">
                <div className="p-2">
                  <h3 className="font-medium text-gray-800 hover:text-[#6A0A0A] text-sm line-clamp-1">
                    {sp.ten}
                  </h3>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                    {sp.mo_ta || "Thưởng thức ẩm thực cùng HanFoodie"}
                  </p>
                </div>
              </Link>

              {/* Giá + Sao */}
              <div className="flex items-center justify-between px-2 pb-2">
                <span className="text-[#6A0A0A] font-semibold text-sm">
                  {sp.gia_goc?.toLocaleString("vi-VN")}₫
                </span>
                <div className="flex items-center text-yellow-500 text-xs">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 mr-0.5" />
                  {sp.so_sao_tb?.toFixed(1) || 4.5}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
