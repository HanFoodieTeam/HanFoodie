// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ISanPham } from "../lib/cautrucdata";
// import { Star } from "lucide-react";

// export default function YeuThichPage() {
//   const [favorites, setFavorites] = useState<ISanPham[]>([]);

//   useEffect(() => {
//     const stored = localStorage.getItem("favorites");
//     const ids: number[] = stored ? JSON.parse(stored) : [];

//     // Lấy dữ liệu sản phẩm từ API (lọc theo danh sách yêu thích)
//     const fetchData = async () => {
//       const res = await fetch("/api/san_pham", { cache: "no-store" });
//       const data = await res.json();

//       // Gom tất cả sản phẩm từ mọi danh mục
//       const allProducts = data.flatMap((dm: any) => dm.san_pham);

//       // Lọc theo ID yêu thích
//       const filtered = allProducts.filter((sp: ISanPham) =>
//         ids.includes(sp.id)
//       );
//       setFavorites(filtered);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-semibold text-[#6A0A0A] mb-8">
//         Danh sách yêu thích
//       </h1>

//       {favorites.length === 0 ? (
//         <p className="text-gray-500">Chưa có sản phẩm nào trong yêu thích.</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//           {favorites.map((sp) => (
//             <div
//               key={sp.id}
//               className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
//             >
//               <Link href={`/chi_tiet/${sp.id}`} className="block">
//                 <div className="relative w-full h-48">
//                   <Image
//                     src={sp.hinh || "/images/no-image.jpg"}
//                     alt={sp.ten}
//                     fill
//                     className="object-cover"
//                   />
//                 </div>

//                 <div className="p-4">
//                   <h3 className="font-medium text-gray-800 line-clamp-1">
//                     {sp.ten}
//                   </h3>
//                   <p className="text-gray-500 text-sm mt-1 truncate">
//                     {sp.mo_ta}
//                   </p>
//                   <p className="text-[#6A0A0A] font-semibold mt-2">
//                     {sp.gia_goc.toLocaleString("vi-VN")}₫
//                   </p>
//                   <div className="flex items-center text-yellow-500 text-sm mt-1">
//                     <Star className="w-4 h-4 fill-yellow-400" /> 4.6
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { ISanPham } from "../lib/cautrucdata";

export default function YeuThichPage() {
  const [favorites, setFavorites] = useState<ISanPham[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  // 🩷 Lấy dữ liệu yêu thích từ localStorage và API
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    const ids: number[] = stored ? JSON.parse(stored) : [];
    setFavoriteIds(ids);

    const fetchData = async () => {
      const res = await fetch("/api/san_pham", { cache: "no-store" });
      const data = await res.json();

      const allProducts = data.flatMap((dm: any) => dm.san_pham);
      const filtered = allProducts.filter((sp: ISanPham) => ids.includes(sp.id));
      setFavorites(filtered);
    };

    fetchData();
  }, []);

  // ❤️ Gỡ sản phẩm khỏi yêu thích
  const toggleFavorite = (id: number) => {
    const updatedIds = favoriteIds.filter((f) => f !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedIds));
    setFavoriteIds(updatedIds);
    setFavorites((prev) => prev.filter((sp) => sp.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-[#6A0A0A] mb-8">
        Danh sách yêu thích
      </h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">Chưa có sản phẩm nào trong yêu thích.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {favorites.map((sp) => {
            const isFavorite = favoriteIds.includes(sp.id);
            return (
              <div
                key={sp.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition relative group overflow-hidden"
              >
                {/* Ảnh sản phẩm */}
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={sp.hinh || "/images/no-image.jpg"}
                    alt={sp.ten}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* ❤️ Nút yêu thích */}
                  <button
                    onClick={() => toggleFavorite(sp.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                  >
                    <Heart
                      size={22}
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
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800 hover:text-[#6A0A0A] line-clamp-1">
                      {sp.ten}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 truncate">
                      {sp.mo_ta}
                    </p>
                  </div>
                </Link>

                {/* Giá + Sao */}
                <div className="flex items-center justify-between px-4 pb-4">
                  <span className="text-[#6A0A0A] font-semibold text-lg">
                    {sp.gia_goc.toLocaleString("vi-VN")}₫
                  </span>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400" />{" "}
                    {sp.so_sao_tb || 4.6}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
