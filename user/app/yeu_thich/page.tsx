// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Heart, Star } from "lucide-react";
// import { ISanPham } from "../lib/cautrucdata";

// export default function YeuThichPage() {
//   const [favorites, setFavorites] = useState<ISanPham[]>([]);
//   const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
//   const [toast, setToast] = useState<string | null>(null);
//   const [spHot, setSpHot] = useState<ISanPham[]>([]);

//   // 🩷 Lấy dữ liệu yêu thích từ localStorage + API
//   useEffect(() => {
//     const stored = localStorage.getItem("favorites");
//     const ids: number[] = stored ? JSON.parse(stored) : [];
//     setFavoriteIds(ids);

//     const fetchData = async () => {
//       const res = await fetch("/api/san_pham", { cache: "no-store" });
//       const data = await res.json();

//       const allProducts = data.flatMap((dm: any) => dm.san_pham);
//       const filtered = allProducts.filter((sp: ISanPham) => ids.includes(sp.id));
//       setFavorites(filtered);
//     };

//     fetchData();
//   }, []);

//   // 🔥 Lấy sản phẩm nổi bật
//   useEffect(() => {
//     const fetchHot = async () => {
//       const res = await fetch("/api/trang_chu/sp_hot");
//       const data = await res.json();
//       setSpHot(data);
//     };
//     fetchHot();
//   }, []);

//   // ❤️ Gỡ sản phẩm khỏi yêu thích
//   const toggleFavorite = (id: number) => {
//     const updatedIds = favoriteIds.includes(id)
//       ? favoriteIds.filter((f) => f !== id)
//       : [...favoriteIds, id];
//     localStorage.setItem("favorites", JSON.stringify(updatedIds));
//     setFavoriteIds(updatedIds);

//     if (favoriteIds.includes(id)) {
//       setFavorites((prev) => prev.filter((sp) => sp.id !== id));
//       setToast("Đã xóa khỏi yêu thích 💔");
//     } else {
//       setToast("Đã thêm vào yêu thích 💖");
//     }

//     setTimeout(() => setToast(null), 1500);
//   };

//   return (
//     <main className="bg-gray-50 min-h-screen pt-[60px]">
//       {/* 🔔 Thông báo nhỏ */}
//       {toast && (
//         <div className="fixed bottom-5 right-5 bg-[#6A0A0A] text-white px-4 py-2 rounded-xl shadow-md animate-fadeIn z-50">
//           {toast}
//         </div>
//       )}

//       <div className="max-w-[80%] mx-auto py-10 space-y-10">
//         {/* ❤️ Danh sách yêu thích */}
//         <section>
//           <h1 className="text-3xl font-semibold text-[#6A0A0A] mb-8">
//             Danh sách yêu thích
//           </h1>

//           {favorites.length === 0 ? (
//             <p className="text-gray-500">
//               Chưa có sản phẩm nào trong danh sách yêu thích.
//             </p>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
//               {favorites.map((sp) => {
//                 const isFavorite = favoriteIds.includes(sp.id);
//                 return (
//                   <div
//                     key={sp.id}
//                     className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative group"
//                   >
//                     {/* Ảnh sản phẩm */}
//                     <div className="relative">
//                       <Image
//                         src={sp.hinh || "/images/no-image.jpg"}
//                         alt={sp.ten}
//                         width={300}
//                         height={200}
//                         className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                       />

//                       {/* Nút yêu thích */}
//                       <button
//                         onClick={() => toggleFavorite(sp.id)}
//                         className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
//                       >
//                         <Heart
//                           size={22}
//                           className={`transition-colors ${
//                             isFavorite
//                               ? "fill-red-500 text-red-500"
//                               : "text-gray-200 hover:text-red-400"
//                           }`}
//                         />
//                       </button>
//                     </div>

//                     {/* Thông tin sản phẩm */}
//                     <Link href={`/chi_tiet/${sp.id}`} className="block">
//                       <div className="p-4">
//                         <h3 className="font-medium text-gray-800 hover:text-[#6A0A0A] line-clamp-1">
//                           {sp.ten}
//                         </h3>
//                         <p className="text-gray-500 text-sm mt-1 truncate">
//                           {sp.mo_ta}
//                         </p>
//                       </div>
//                     </Link>

//                     {/* Giá + Sao */}
//                     <div className="flex items-center justify-between px-4 pb-4">
//                       <span className="text-[#6A0A0A] font-semibold text-lg">
//                         {sp.gia_goc.toLocaleString("vi-VN")}₫
//                       </span>
//                       <div className="flex items-center text-yellow-500 text-sm">
//                         <Star className="w-4 h-4 fill-yellow-400" />{" "}
//                         {sp.so_sao_tb || 4.5}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </section>

//         {/* 🔥 Sản phẩm nổi bật */}
//         {spHot.length > 0 && (
//           <section>
//             <h2 className="text-2xl font-bold text-[#6A0A0A] mb-5">
//               Sản phẩm gợi í
//             </h2>

//             <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
//               {spHot.slice(0, 10).map((sp) => (
//                 <Link
//                   href={`/chi_tiet/${sp.id}`}
//                   key={sp.id}
//                   className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
//                 >
//                   <div className="relative">
//                     <Image
//                       src={sp.hinh || "/images/no-image.jpg"}
//                       alt={sp.ten}
//                       width={300}
//                       height={200}
//                       className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                     />
//                   </div>

//                   <div className="p-4">
//                     <h3 className="font-medium text-gray-800 hover:text-[#6A0A0A] line-clamp-1">
//                       {sp.ten}
//                     </h3>
//                     <p className="text-gray-500 text-sm mt-1 truncate">
//                       {sp.mo_ta}
//                     </p>
//                   </div>

//                   <div className="flex items-center justify-between px-4 pb-4">
//                     <span className="text-[#6A0A0A] font-semibold text-lg">
//                       {sp.gia_goc?.toLocaleString("vi-VN")}₫
//                     </span>
//                     <div className="flex items-center text-yellow-500 text-sm">
//                       <Star className="w-4 h-4 fill-yellow-400" />{" "}
//                       {sp.so_sao_tb || 4.7}
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </section>
//         )}
//       </div>
//     </main>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { ISanPham } from "../lib/cautrucdata";
import SanPhamHotSection from "../components/sanphamsection"; //  DÙNG LẠI COMPONENT NÀY

export default function YeuThichPage() {
  const [favorites, setFavorites] = useState<ISanPham[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [spHot, setSpHot] = useState<ISanPham[]>([]);

  //  Lấy dữ liệu yêu thích từ localStorage + API
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

  //  Lấy sản phẩm nổi bật
  useEffect(() => {
    const fetchHot = async () => {
      const res = await fetch("/api/trang_chu/sp_hot");
      const data = await res.json();
      setSpHot(data);
    };
    fetchHot();
  }, []);

  //  Gỡ sản phẩm khỏi yêu thích
  const toggleFavorite = (id: number) => {
    const updatedIds = favoriteIds.includes(id)
      ? favoriteIds.filter((f) => f !== id)
      : [...favoriteIds, id];
    localStorage.setItem("favorites", JSON.stringify(updatedIds));
    setFavoriteIds(updatedIds);

    if (favoriteIds.includes(id)) {
      setFavorites((prev) => prev.filter((sp) => sp.id !== id));
      setToast("Đã xóa khỏi yêu thích 💔");
    } else {
      setToast("Đã thêm vào yêu thích 💖");
    }

    setTimeout(() => setToast(null), 1500);
  };

  return (
    <main className="bg-gray-50 min-h-screen pt-[60px]">
      {/*  Thông báo nhỏ */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-[#6A0A0A] text-white px-4 py-2 rounded-xl shadow-md animate-fadeIn z-50">
          {toast}
        </div>
      )}

      <div className="max-w-[80%] mx-auto py-10 space-y-10">
        {/*  Danh sách yêu thích */}
        <section>
          <h1 className="text-3xl font-semibold text-[#6A0A0A] mb-8">
            Danh sách yêu thích
          </h1>

          {favorites.length === 0 ? (
            <p className="text-gray-500">
              Chưa có sản phẩm nào trong danh sách yêu thích.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              {favorites.map((sp) => {
                const isFavorite = favoriteIds.includes(sp.id);
                return (
                  <div
                    key={sp.id}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative group"
                  >
                    {/* Ảnh sản phẩm */}
                    <div className="relative">
                      <Image
                        src={sp.hinh || "/images/no-image.jpg"}
                        alt={sp.ten}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Nút yêu thích */}
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
                        {sp.so_sao_tb || 4.5}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/*  Sản phẩm nổi bật */}
        {spHot.length > 0 && <SanPhamHotSection data={spHot} />}
      </div>
    </main>
  );
}
