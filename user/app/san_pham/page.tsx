// // "use client";

// // import { useEffect, useState } from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { Heart, Star } from "lucide-react";
// // import { ISanPham, IDanhMuc } from "../lib/cautrucdata";

// // interface IDanhMucCoSanPham extends IDanhMuc {
// //   san_pham: ISanPham[];
// // }

// // export default function SanPhamPage() {
// //   const [dsDanhMuc, setDsDanhMuc] = useState<IDanhMucCoSanPham[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [favorites, setFavorites] = useState<number[]>([]);

// //   useEffect(() => {
// //     const fetchSanPham = async () => {
// //       try {
// //         const res = await fetch("/api/san_pham", { cache: "no-store" });
// //         if (!res.ok) throw new Error("Không thể tải sản phẩm");
// //         const data = await res.json();
// //         setDsDanhMuc(data);
// //       } catch (error) {
// //         console.error("Lỗi khi tải sản phẩm:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchSanPham();
// //   }, []);

// //   useEffect(() => {
// //     const stored = localStorage.getItem("favorites");
// //     if (stored) setFavorites(JSON.parse(stored));
// //   }, []);

// //   const toggleFavorite = (id: number) => {
// //     setFavorites((prev) => {
// //       const newFavs = prev.includes(id)
// //         ? prev.filter((f) => f !== id)
// //         : [...prev, id];
// //       localStorage.setItem("favorites", JSON.stringify(newFavs));
// //       return newFavs;
// //     });
// //   };

// //   if (loading)
// //     return (
// //       <p className="text-center text-gray-500 mt-10">Đang tải sản phẩm...</p>
// //     );

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 py-10">
// //       <h1 className="text-3xl font-semibold text-center text-[#6A0A0A] mb-10">
// //         Tất cả sản phẩm
// //       </h1>

// //       {dsDanhMuc.length === 0 ? (
// //         <p className="text-center text-gray-500">Không có sản phẩm nào.</p>
// //       ) : (
// //         dsDanhMuc.map((dm) => (
// //           <div key={dm.id} className="mb-12">
// //             <h2 className="text-2xl font-bold mb-6 text-[#6A0A0A]">{dm.ten}</h2>

// //             <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
// //               {dm.san_pham.map((sp) => {
// //                 const isFavorite = favorites.includes(sp.id);
// //                 return (
// //                   <div
// //                     key={sp.id}
// //                     className="bg-white rounded-xl shadow hover:shadow-lg transition relative group overflow-hidden"
// //                   >
// //                     {/* Ảnh sản phẩm */}
// //                     <div className="relative w-full h-48 overflow-hidden">
// //                       <Image
// //                         src={sp.hinh || "/images/no-image.jpg"}
// //                         alt={sp.ten}
// //                         fill
// //                         className="object-cover transition-transform duration-300 group-hover:scale-105"
// //                       />

// //                       {/* ❤️ Icon yêu thích (không có vòng tròn nền) */}
// //                       <button
// //                         type="button"
// //                         onClick={() => toggleFavorite(sp.id)}
// //                         className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 z-10"
// //                       >
// //                         <Heart
// //                           size={22}
// //                           className={`transition-colors duration-300 ${
// //                             isFavorite
// //                               ? "fill-red-500 text-red-500"
// //                               : "text-gray-200 hover:text-red-400"
// //                           }`}
// //                         />
// //                       </button>
// //                     </div>

// //                     {/* Nội dung sản phẩm */}
// //                     <Link href={`/chi_tiet/${sp.id}`} className="block">
// //                       <div className="p-4">
// //                         <h3 className="font-medium text-gray-800 hover:text-[#6A0A0A] line-clamp-1">
// //                           {sp.ten}
// //                         </h3>
// //                         <p className="text-gray-500 text-sm mt-1 truncate">
// //                           {sp.mo_ta}
// //                         </p>
// //                       </div>
// //                     </Link>

// //                     {/* Giá + Sao */}
// //                     <div className="flex items-center justify-between px-4 pb-4">
// //                       <span className="text-[#6A0A0A] font-semibold text-lg">
// //                         {sp.gia_goc.toLocaleString("vi-VN")}₫
// //                       </span>
// //                       <div className="flex items-center text-yellow-500 text-sm">
// //                         <Star className="w-4 h-4 fill-yellow-400" />{" "}
// //                         {sp.so_sao_tb || 4.6}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Heart, Star } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { ISanPham, IDanhMuc } from "../lib/cautrucdata";

// interface IDanhMucCoSanPham extends IDanhMuc {
//   san_pham: ISanPham[];
// }

// export default function SanPhamPage() {
//   const [dsDanhMuc, setDsDanhMuc] = useState<IDanhMucCoSanPham[]>([]);
//   const [favorites, setFavorites] = useState<number[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   // Lấy danh sách sản phẩm
//   useEffect(() => {
//     const fetchSanPham = async () => {
//       try {
//         const res = await fetch("/api/san_pham", { cache: "no-store" });
//         const data = await res.json();
//         setDsDanhMuc(data);
//       } catch (error) {
//         console.error("Lỗi khi tải sản phẩm:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSanPham();
//   }, []);

//   // Lấy danh sách yêu thích từ localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem("favorites");
//     if (stored) setFavorites(JSON.parse(stored));
//   }, []);

//   // Thêm / gỡ yêu thích
//   const toggleFavorite = (id: number) => {
//     setFavorites((prev) => {
//       const updated = prev.includes(id)
//         ? prev.filter((f) => f !== id)
//         : [...prev, id];
//       localStorage.setItem("favorites", JSON.stringify(updated));
//       return updated;
//     });
//   };

//   // Khi click trái tim → thêm vào yêu thích rồi sang trang /yeu_thich
//   const handleFavoriteClick = (id: number) => {
//     toggleFavorite(id);
//     router.push("/yeu_thich");
//   };

//   if (loading)
//     return <p className="text-center mt-10 text-gray-500">Đang tải sản phẩm...</p>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-semibold text-center text-[#6A0A0A] mb-10">
//         Tất cả sản phẩm
//       </h1>

//       {dsDanhMuc.map((dm) => (
//         <div key={dm.id} className="mb-12">
//           <h2 className="text-2xl font-bold mb-6 text-[#6A0A0A]">{dm.ten}</h2>

//           <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
//             {dm.san_pham.map((sp) => {
//               const isFavorite = favorites.includes(sp.id);
//               return (
//                 <div
//                   key={sp.id}
//                   className="bg-white rounded-xl shadow hover:shadow-lg transition relative group overflow-hidden"
//                 >
//                   {/* Ảnh sản phẩm */}
//                   <div className="relative w-full h-48 overflow-hidden">
//                     <Image
//                       src={sp.hinh || "/images/no-image.jpg"}
//                       alt={sp.ten}
//                       fill
//                       className="object-cover transition-transform duration-300 group-hover:scale-105"
//                     />

//                     {/* ❤️ Nút yêu thích */}
//                     <button
//                       onClick={() => handleFavoriteClick(sp.id)}
//                       className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
//                     >
//                       <Heart
//                         size={22}
//                         className={`transition-colors ${
//                           isFavorite
//                             ? "fill-red-500 text-red-500"
//                             : "text-gray-200 hover:text-red-400"
//                         }`}
//                       />
//                     </button>
//                   </div>

//                   {/* Thông tin */}
//                   <Link href={`/chi_tiet/${sp.id}`} className="block">
//                     <div className="p-4">
//                       <h3 className="font-medium text-gray-800 line-clamp-1">
//                         {sp.ten}
//                       </h3>
//                       <p className="text-gray-500 text-sm mt-1 truncate">
//                         {sp.mo_ta}
//                       </p>
//                     </div>
//                   </Link>

//                   {/* Giá + Sao */}
//                   <div className="flex items-center justify-between px-4 pb-4">
//                     <span className="text-[#6A0A0A] font-semibold text-lg">
//                       {sp.gia_goc.toLocaleString("vi-VN")}₫
//                     </span>
//                     <div className="flex items-center text-yellow-500 text-sm">
//                       <Star className="w-4 h-4 fill-yellow-400" />{" "}
//                       {sp.so_sao_tb || 4.6}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { ISanPham, IDanhMuc } from "../lib/cautrucdata";

interface IDanhMucCoSanPham extends IDanhMuc {
  san_pham: ISanPham[];
}

export default function SanPhamPage() {
  const [dsDanhMuc, setDsDanhMuc] = useState<IDanhMucCoSanPham[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSanPham = async () => {
      try {
        const res = await fetch("/api/san_pham", { cache: "no-store" });
        const data = await res.json();
        setDsDanhMuc(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSanPham();
  }, []);

  // Lấy danh sách yêu thích từ localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Thêm hoặc gỡ sản phẩm yêu thích
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(updated));

      // Thông báo nhỏ
      setToast(
        prev.includes(id)
          ? "Đã xóa khỏi yêu thích 💔"
          : "Đã thêm vào yêu thích 💖"
      );
      setTimeout(() => setToast(null), 1500);

      return updated;
    });
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Đang tải sản phẩm...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 relative">
      <h1 className="text-3xl font-semibold text-center text-[#6A0A0A] mb-10">
        Tất cả sản phẩm
      </h1>

      {/* 🔔 Thông báo nhỏ */}
      {toast && (
        <div className="fixed top-5 right-5 bg-[#6A0A0A] text-white px-4 py-2 rounded-xl shadow-md animate-fadeIn">
          {toast}
        </div>
      )}

      {dsDanhMuc.map((dm) => (
        <div key={dm.id} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[#6A0A0A]">{dm.ten}</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {dm.san_pham.map((sp) => {
              const isFavorite = favorites.includes(sp.id);
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

                  {/* Thông tin */}
                  <Link href={`/chi_tiet/${sp.id}`} className="block">
                    <div className="p-4">
                      <h3 className="font-medium text-gray-800 line-clamp-1">
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
        </div>
      ))}
    </div>
  );
}
