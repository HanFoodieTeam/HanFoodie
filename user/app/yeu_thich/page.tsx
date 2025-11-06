"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { ISanPham } from "../lib/cautrucdata";
import SanPhamHotSection from "../components/sanphamsection";

interface DanhMucResponse {
  san_pham: ISanPham[];
}

export default function YeuThichPage() {
  const [favorites, setFavorites] = useState<ISanPham[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [spHot, setSpHot] = useState<ISanPham[]>([]);

  // 📦 Lấy dữ liệu yêu thích từ localStorage + API
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    const ids: number[] = stored ? JSON.parse(stored) : [];
    setFavoriteIds(ids);

    const fetchData = async () => {
      const res = await fetch("/api/san_pham", { cache: "no-store" });
      const data: DanhMucResponse[] = await res.json();

      const allProducts: ISanPham[] = data.flatMap(
        (dm: DanhMucResponse) => dm.san_pham
      );

      const filtered = allProducts.filter((sp) => ids.includes(sp.id));
      setFavorites(filtered);
    };

    fetchData();
  }, []);

  // 🔥 Lấy sản phẩm nổi bật
  useEffect(() => {
    const fetchHot = async () => {
      const res = await fetch("/api/trang_chu/sp_hot");
      const data: ISanPham[] = await res.json();
      setSpHot(data);
    };
    fetchHot();
  }, []);

  // 💖 Gỡ hoặc thêm sản phẩm khỏi danh sách yêu thích
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
    <main className="bg-gray-50 min-h-screen pt-[0px]">
      {/* 🧾 Thông báo nhỏ */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-[#6A0A0A] text-white px-4 py-2 rounded-xl shadow-md animate-fadeIn z-50">
          {toast}
        </div>
      )}

      {/* ✅ Giới hạn chiều rộng 80% giống header */}
      <div className=" mx-auto py-10 space-y-10">
        {/* 💘 Danh sách yêu thích */}
        <section>
          <h1 className="text-3xl font-semibold text-[#6A0A0A] mb-8 text-center md:text-left">
            Danh sách yêu thích
          </h1>

          {favorites.length === 0 ? (
            <p className="text-gray-500 text-center">
              Chưa có sản phẩm nào trong danh sách yêu thích.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
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
                       {/* {sp.so_sao_tb ?? 4.5} */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 🔥 Sản phẩm nổi bật */}
        {spHot.length > 0 && (
          <section>
            <SanPhamHotSection data={spHot} />
          </section>
        )}
      </div>
    </main>
  );
 }
// // "use client";

// // import { useEffect, useState } from "react";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { Heart, Star } from "lucide-react";
// // import { ISanPham } from "../lib/cautrucdata";
// // import SanPhamHotSection from "../components/sanphamsection";

// // interface DanhMucResponse {
// //   san_pham: ISanPham[];
// // }

// // export default function YeuThichPage() {
// //   const [favorites, setFavorites] = useState<ISanPham[]>([]);
// //   const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
// //   const [toast, setToast] = useState<string | null>(null);
// //   const [spHot, setSpHot] = useState<ISanPham[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   // 🟢 Lấy danh sách yêu thích từ API
// //   useEffect(() => {
// //     const fetchFavorites = async () => {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const res = await fetch("/api/yeu_thich", {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });

// //         if (!res.ok) throw new Error("Không thể lấy danh sách yêu thích");

// //         const ids: number[] = await res.json();
// //         setFavoriteIds(ids);

// //         // Lấy danh sách sản phẩm
// //         const spRes = await fetch("/api/san_pham", { cache: "no-store" });
// //         const spData: DanhMucResponse[] = await spRes.json();

// //         const allProducts: ISanPham[] = spData.flatMap((dm) => dm.san_pham);
// //         const filtered = allProducts.filter((sp) => ids.includes(sp.id));
// //         setFavorites(filtered);
// //       } catch (err) {
// //         console.error("❌ Lỗi lấy dữ liệu yêu thích:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchFavorites();
// //   }, []);

// //   // 🔥 Lấy sản phẩm nổi bật
// //   useEffect(() => {
// //     const fetchHot = async () => {
// //       const res = await fetch("/api/trang_chu/sp_hot");
// //       const data: ISanPham[] = await res.json();
// //       setSpHot(data);
// //     };
// //     fetchHot();
// //   }, []);

// //   // 💖 Thêm / gỡ sản phẩm khỏi yêu thích (lưu DB)
// //   const toggleFavorite = async (id: number) => {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       setToast("Vui lòng đăng nhập để sử dụng yêu thích 💬");
// //       setTimeout(() => setToast(null), 1500);
// //       return;
// //     }

// //     try {
// //       const res = await fetch("/api/yeu_thich", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({ id_san_pham: id }),
// //       });

// //       const data = await res.json();
// //       setToast(data.thong_bao);

// //       if (data.removed) {
// //         // Nếu bị xóa khỏi yêu thích
// //         setFavoriteIds((prev) => prev.filter((x) => x !== id));
// //         setFavorites((prev) => prev.filter((sp) => sp.id !== id));
// //       } else {
// //         // Nếu được thêm vào yêu thích
// //         setFavoriteIds((prev) => [...prev, id]);
// //       }

// //       setTimeout(() => setToast(null), 1500);
// //     } catch (err) {
// //       console.error("❌ Lỗi toggle yêu thích:", err);
// //       setToast("Có lỗi xảy ra, thử lại sau!");
// //       setTimeout(() => setToast(null), 1500);
// //     }
// //   };

// //   // 🕒 Loading
// //   if (loading)
// //     return (
// //       <main className="min-h-screen flex items-center justify-center text-gray-600">
// //         Đang tải danh sách yêu thích...
// //       </main>
// //     );

// //   return (
// //     <main className="bg-gray-50 min-h-screen pt-[0px]">
// //       {/* 🧾 Thông báo nhỏ */}
// //       {toast && (
// //         <div className="fixed bottom-5 right-5 bg-[#6A0A0A] text-white px-4 py-2 rounded-xl shadow-md animate-fadeIn z-50">
// //           {toast}
// //         </div>
// //       )}

// //       <div className="mx-auto py-10 space-y-10">
// //         {/* 💘 Danh sách yêu thích */}
// //         <section>
// //           <h1 className="text-3xl font-semibold text-[#6A0A0A] mb-8 text-center md:text-left">
// //             Danh sách yêu thích
// //           </h1>

// //           {favorites.length === 0 ? (
// //             <p className="text-gray-500 text-center">
// //               Bạn chưa có sản phẩm yêu thích nào 💔
// //             </p>
// //           ) : (
// //             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
// //               {favorites.map((sp) => {
// //                 const isFavorite = favoriteIds.includes(sp.id);
// //                 return (
// //                   <div
// //                     key={sp.id}
// //                     className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative group"
// //                   >
// //                     {/* Ảnh sản phẩm */}
// //                     <div className="relative">
// //                       <Image
// //                         src={sp.hinh || "/images/no-image.jpg"}
// //                         alt={sp.ten}
// //                         width={300}
// //                         height={200}
// //                         className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
// //                       />

// //                       {/* Nút yêu thích */}
// //                       <button
// //                         onClick={() => toggleFavorite(sp.id)}
// //                         className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
// //                       >
// //                         <Heart
// //                           size={22}
// //                           className={`transition-colors ${
// //                             isFavorite
// //                               ? "fill-red-500 text-red-500"
// //                               : "text-gray-200 hover:text-red-400"
// //                           }`}
// //                         />
// //                       </button>
// //                     </div>

// //                     {/* Thông tin sản phẩm */}
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
// //                         <Star className="w-4 h-4 fill-yellow-400" />
// //                       </div>
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           )}
// //         </section>

// //         {/* 🔥 Sản phẩm nổi bật */}
// //         {spHot.length > 0 && (
// //           <section>
// //             <SanPhamHotSection data={spHot} />
// //           </section>
// //         )}
// //       </div>
// //     </main>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Heart, Star } from "lucide-react";
// import { ISanPham } from "../lib/cautrucdata";
// import SanPhamHotSection from "../components/sanphamsection";

// interface DanhMucResponse {
//   san_pham: ISanPham[];
// }

// export default function YeuThichPage() {
//   const [favorites, setFavorites] = useState<ISanPham[]>([]);
//   const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
//   const [toast, setToast] = useState<string | null>(null);
//   const [spHot, setSpHot] = useState<ISanPham[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 🟢 Hàm tải danh sách yêu thích
//   const fetchFavorites = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch("/api/yeu_thich", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!res.ok) throw new Error("Không thể lấy danh sách yêu thích");

//       const ids: number[] = await res.json();
//       setFavoriteIds(ids);

//       // Lấy danh sách sản phẩm
//       const spRes = await fetch("/api/san_pham", { cache: "no-store" });
//       const spData: DanhMucResponse[] = await spRes.json();

//       const allProducts: ISanPham[] = spData.flatMap((dm) => dm.san_pham);
//       const filtered = allProducts.filter((sp) => ids.includes(sp.id));
//       setFavorites(filtered);
//     } catch (err) {
//       console.error(" Lỗi lấy dữ liệu yêu thích:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 📦 Lấy dữ liệu ban đầu
//   useEffect(() => {
//     fetchFavorites();
//   }, []);

//   // 🔥 Lấy sản phẩm nổi bật
//   useEffect(() => {
//     const fetchHot = async () => {
//       const res = await fetch("/api/trang_chu/sp_hot");
//       const data: ISanPham[] = await res.json();
//       setSpHot(data);
//     };
//     fetchHot();
//   }, []);

//   // 💖 Thêm / gỡ sản phẩm khỏi yêu thích (lưu DB)
//   const toggleFavorite = async (id: number) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setToast("Vui lòng đăng nhập để sử dụng yêu thích ");
//       setTimeout(() => setToast(null), 1500);
//       return;
//     }

//     try {
//       const res = await fetch("/api/yeu_thich", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id_san_pham: id }),
//       });

//       const data = await res.json();
//       setToast(data.thong_bao);

//       // 🟢 Cập nhật giao diện ngay lập tức
//       if (data.removed) {
//         setFavoriteIds((prev) => prev.filter((x) => x !== id));
//         setFavorites((prev) => prev.filter((sp) => sp.id !== id));
//       } else {
//         setFavoriteIds((prev) => [...prev, id]);
//         // tải thêm sản phẩm vừa thêm
//         await fetchFavorites();
//       }

//       setTimeout(() => setToast(null), 1500);
//     } catch (err) {
//       console.error(" Lỗi toggle yêu thích:", err);
//       setToast("Có lỗi xảy ra, thử lại sau!");
//       setTimeout(() => setToast(null), 1500);
//     }
//   };

//   // 🕒 Loading
//   if (loading)
//     return (
//       <main className="min-h-screen flex items-center justify-center text-gray-600">
//         Đang tải danh sách yêu thích...
//       </main>
//     );

//   return (
//     <main className="bg-gray-50 min-h-screen pt-[0px]">
//       {/* 🧾 Thông báo nhỏ */}
//       {toast && (
//         <div className="fixed bottom-5 right-5 bg-[#6A0A0A] text-white px-4 py-2 rounded-xl shadow-md animate-fadeIn z-50">
//           {toast}
//         </div>
//       )}

//       <div className="mx-auto py-10 space-y-10">
//         {/* 💘 Danh sách yêu thích */}
//         <section>
//           <h1 className="text-3xl font-semibold text-[#6A0A0A] mb-8 text-center md:text-left">
//             Danh sách yêu thích
//           </h1>

//           {favorites.length === 0 ? (
//             <p className="text-gray-500 text-center">
//               Bạn chưa có sản phẩm yêu thích nào 
//             </p>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
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
//                         className="absolute top-2 right-2 opacity-100 transition-opacity duration-300 hover:scale-110"
//                       >
//                         <Heart
//                           size={22}
//                           className={`transition-colors ${
//                             isFavorite
//                               ? "fill-red-500 text-red-500"
//                               : "text-gray-300 hover:text-red-400"
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
//                         <Star className="w-4 h-4 fill-yellow-400" />
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
//             <SanPhamHotSection data={spHot} />
//           </section>
//         )}
//       </div>
//     </main>
//   );
// }
