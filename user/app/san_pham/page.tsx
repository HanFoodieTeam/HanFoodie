// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { Heart, Star } from "lucide-react";
// import DanhMucSection from "../components/danhmucsection";
// import { ISanPham, IDanhMuc } from "../lib/cautrucdata";

// interface IDanhMucCoSanPham extends IDanhMuc {
//   san_pham: ISanPham[];
// }

// export default function SanPhamPage() {
//   const [dsDanhMuc, setDsDanhMuc] = useState<IDanhMucCoSanPham[]>([]);
//   const [favorites, setFavorites] = useState<number[]>([]);
//   const [toast, setToast] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   //  Lấy dữ liệu sản phẩm
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

//   //  Lấy danh sách yêu thích từ localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem("favorites");
//     if (stored) setFavorites(JSON.parse(stored));
//   }, []);

//   //  Toggle yêu thích
//   const toggleFavorite = (id: number) => {
//     setFavorites((prev) => {
//       const updated = prev.includes(id)
//         ? prev.filter((f) => f !== id)
//         : [...prev, id];
//       localStorage.setItem("favorites", JSON.stringify(updated));
//       setToast(prev.includes(id) ? "Đã xóa khỏi yêu thích 💔" : "Đã thêm vào yêu thích 💖");
//       setTimeout(() => setToast(null), 1500);
//       return updated;
//     });
//   };

//   if (loading)
//     return (
//       <div
//         className="p-6 text-gray-500 text-center mt-[var(--header-h)]"
//         style={{ "--header-h": "80px" } as React.CSSProperties}
//       >
//         Đang tải sản phẩm...
//       </div>
//     );

//   return (
//     <main className="bg-gray-50 min-h-screen">
//       {/* 🔹 Thanh danh mục cố định */}
//       <div className="sticky top-18.5 z-40 bg-white ">
//         <DanhMucSection data={dsDanhMuc} />
//       </div>


//       {/* Thông báo nhỏ */}
//       {toast && (
//         <div className="fixed bottom-5 right-5 bg-[#6A0A0A] text-white px-4 py-2 rounded-xl shadow-md animate-fadeIn z-50">
//           {toast}
//         </div>
//       )}


//       {/* 🔹 Danh sách sản phẩm */}
//       <div className=" py-10 space-y-12">
//         {dsDanhMuc.map((dm) => (
//           <section key={dm.id}>
//             <h2 className="text-2xl font-bold mb-4 text-[#6A0A0A]">{dm.ten}</h2>

//             <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
//               {dm.san_pham.map((sp) => {
//                 const isFavorite = favorites.includes(sp.id);
//                 return (
//                   <div
//                     key={sp.id}
//                     className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative group"
//                   >
//                     {/* Ảnh sản phẩm */}
//                     <div className="relative">
//                       <img
//                         src={sp.hinh || "/noimg.png"}
//                         alt={sp.ten}
//                         className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
//                       />

//                       {/* Nút yêu thích */}
//                       <button
//                         onClick={() => toggleFavorite(sp.id)}
//                         className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
//                       >
//                         <Heart
//                           size={22}
//                           className={`transition-colors ${isFavorite
//                               ? "fill-red-500 text-red-500"
//                               : "text-gray-200 hover:text-red-400"
//                             }`}
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
//                       {/*  Chỉ hiển thị nếu có sao trung bình */}
//                       {sp.so_sao_tb && Number(sp.so_sao_tb) > 0 && (
//                         <div className="flex items-center text-yellow-500 text-sm">
//                           <Star className="w-4 h-4 fill-yellow-400 mr-1" />
//                           <span className="text-gray-700">
//                             {Number(sp.so_sao_tb).toFixed(1)}    </span>
//                         </div>
//                       )}

//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </section>
//         ))}
//       </div>
//     </main>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import DanhMucSection from "../components/danhmucsection";
import { ISanPham, IDanhMuc } from "../../lib/cautrucdata";

interface IDanhMucCoSanPham extends IDanhMuc {
  san_pham: ISanPham[];
}
export interface IYeuThichItem {
  id: number;
  id_nguoi_dung: number;
  id_san_pham: number;
  ngay_tao: string;
}


export default function SanPhamPage() {
  const [dsDanhMuc, setDsDanhMuc] = useState<IDanhMucCoSanPham[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = 1; // Giả sử người dùng đã đăng nhập và có ID là 1
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

  useEffect(() => {
  async function fetchFavorites() {
    try {
      const res = await fetch(`/api/yeu_thich?id_nguoi_dung=${userId}`, {
        cache: "no-store",
      });

      const json: { success: boolean; data: IYeuThichItem[] } = await res.json();

      const ids = json.data.map((item) => item.id_san_pham);

      setFavorites(ids);
    } catch (error) {
      console.error("Lỗi lấy yêu thích:", error);
    }
  }

  fetchFavorites();
}, []);



  const toggleFavorite = async (id_san_pham: number) => {
    const isFavorite = favorites.includes(id_san_pham);

    try {
      if (isFavorite) {
        // XÓA YÊU THÍCH
        await fetch(
          `/api/yeu_thich?id_nguoi_dung=${userId}&id_san_pham=${id_san_pham}`,
          {
            method: "DELETE",
          }
        );

        setFavorites((prev) => prev.filter((id) => id !== id_san_pham));
        setToast("Đã xóa khỏi yêu thích ");
      } else {
        // THÊM YÊU THÍCH
        await fetch("/api/yeu_thich", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_nguoi_dung: userId, id_san_pham }),
        });

        setFavorites((prev) => [...prev, id_san_pham]);
        setToast("Đã thêm vào yêu thích ");
      }

      setTimeout(() => setToast(null), 1500);
    } catch (error) {
      console.error("Lỗi yêu thích:", error);
    }
  };


  if (loading)
    return (
      <div
        className="p-6 text-gray-500 text-center mt-[var(--header-h)]"
        style={{ "--header-h": "80px" } as React.CSSProperties}
      >
        Đang tải sản phẩm...
      </div>
    );

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="sticky top-18.5 z-40 bg-white ">
        <DanhMucSection data={dsDanhMuc} />
      </div>

      {toast && (
        <div className="fixed bottom-5 right-5 bg-[#6A0A0A] text-white px-4 py-2 rounded-xl shadow-md animate-fadeIn z-50">
          {toast}
        </div>
      )}

      <div className="py-10 space-y-12">
        {dsDanhMuc.map((dm) => (
          <section key={dm.id}>
            <h2 className="text-2xl font-bold mb-4 text-[#6A0A0A]">{dm.ten}</h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              {dm.san_pham.map((sp) => {
                const isFavorite = favorites.includes(sp.id);

                return (
                  <div
                    key={sp.id}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative group"
                  >
                    {/* Ảnh */}
                    <div className="relative">
                      <img
                        src={sp.hinh || "/noimg.png"}
                        alt={sp.ten}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {/* Nút tim */}
                      <button
                        onClick={() => toggleFavorite(sp.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
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

                      {sp.so_sao_tb && Number(sp.so_sao_tb) > 0 && (
                        <div className="flex items-center text-yellow-500 text-sm">
                          <Star className="w-4 h-4 fill-yellow-400 mr-1" />
                          <span className="text-gray-700">
                            {Number(sp.so_sao_tb).toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
