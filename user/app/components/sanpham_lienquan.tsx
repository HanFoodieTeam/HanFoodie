"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { ISanPham } from "../../lib/cautrucdata";
import { useYeuThich } from "@/app/context/yeuthichcontext";



interface Props {
  data: ISanPham[];
  idDanhMuc: number;
  idSanPham?: number;
}

interface IYeuThichItem {
  id_san_pham: number;
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
  const [loading, setLoading] = useState(false);

 const { reloadYeuThich } = useYeuThich();

useEffect(() => {
  async function fetchFavorites() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/yeu_thich", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const json = await res.json();
      if (json.success) {
        setFavorites(json.data.map((i: IYeuThichItem) => i.id_san_pham));
      }
    } catch (err) {
      console.log("Lỗi load yêu thích:", err);
    }
  }

  fetchFavorites();
}, []);

const toggleFavorite = async (id: number) => {
  if (loading) return;

  const token = localStorage.getItem("token");
  if (!token) return alert("Vui lòng đăng nhập");

  setLoading(true);

  const isFav = favorites.includes(id);

  try {
    if (!isFav) {
      await fetch("/api/yeu_thich", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_san_pham: id }),
      });

      setFavorites((prev) => [...prev, id]);
    } else {
      await fetch(`/api/yeu_thich?id_san_pham=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites((prev) => prev.filter((x) => x !== id));
    }

    reloadYeuThich(); // ⭐ CẬP NHẬT HEADER
  } catch (e) {
    console.log("Lỗi:", e);
  } finally {
    setLoading(false);
  }
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
              {/* Ảnh */}
              <div className="relative">
                <img
                  src={sp.hinh || "/images/no-image.jpg"}
                  alt={sp.ten}
                  className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* ❤️ Nút yêu thích */}
                <button
                  onClick={() => toggleFavorite(sp.id)}
                  className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
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

                {sp.so_sao_tb != null && Number(sp.so_sao_tb) > 0 && (
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
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Heart, Star } from "lucide-react";
// import { ISanPham } from "../../lib/cautrucdata";

// const ID_USER = 1;

// interface Props {
//   data: ISanPham[];
//   idDanhMuc: number;
//   idSanPham?: number;
// }

// interface IYeuThichItem {
//   id_san_pham: number;
// }

// export default function SanPhamLienQuanSection({
//   data,
//   idDanhMuc,
//   idSanPham,
// }: Props) {
//   // ===== LỌC SẢN PHẨM LIÊN QUAN =====
//   const sanPhamLienQuan = Array.isArray(data)
//     ? data
//         .filter(
//           (sp) =>
//             sp &&
//             sp.id_danh_muc === idDanhMuc &&
//             sp.id !== idSanPham
//         )
//         .slice(0, 4)
//     : [];

//   const [favorites, setFavorites] = useState<number[]>([]);
//   const [loading, setLoading] = useState(false);

//   // ===== LOAD YÊU THÍCH =====
//   useEffect(() => {
//     async function fetchFavorites() {
//       try {
//         const res = await fetch(`/api/yeu_thich?id_nguoi_dung=${ID_USER}`);
//         const json: { success: boolean; data: IYeuThichItem[] } =
//           await res.json();

//         if (json.success) {
//           setFavorites(json.data.map((i) => i.id_san_pham));
//         }
//       } catch (err) {
//         console.log("Lỗi load yêu thích:", err);
//       }
//     }

//     fetchFavorites();
//   }, []);

//   // ===== TOGGLE YÊU THÍCH =====
//   const toggleFavorite = async (id: number) => {
//     if (loading) return;
//     setLoading(true);

//     const isFav = favorites.includes(id);

//     try {
//       if (!isFav) {
//         await fetch(`/api/yeu_thich`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ id_nguoi_dung: ID_USER, id_san_pham: id }),
//         });
//         setFavorites((prev) => [...prev, id]);
//       } else {
//         await fetch(
//           `/api/yeu_thich?id_nguoi_dung=${ID_USER}&id_san_pham=${id}`,
//           { method: "DELETE" }
//         );
//         setFavorites((prev) => prev.filter((x) => x !== id));
//       }
//     } catch (e) {
//       console.log("Lỗi:", e);
//     }

//     setLoading(false);
//   };

//   if (sanPhamLienQuan.length === 0) return null;

//   return (
//     <section className="mt-12">
//       <h2 className="text-xl font-semibold mb-4 text-[#6A0A0A]">
//         Sản phẩm liên quan
//       </h2>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
//         {sanPhamLienQuan.map((sp) => {
//           const isFavorite = favorites.includes(sp.id);

//           return (
//             <div
//               key={sp.id}
//               className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative group"
//             >
//               {/* Ảnh */}
//               <div className="relative">
//                 <Image
//                   src={sp.hinh?.trim() || "/noimg.png"}
//                   alt={sp.ten}
//                   width={300}
//                   height={200}
//                   className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
//                 />

//                 {/* ❤️ Yêu thích */}
//                 <button
//                   onClick={() => toggleFavorite(sp.id)}
//                   className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
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

//               {/* Thông tin */}
//               <Link href={`/chi_tiet/${sp.id}`} className="block">
//                 <div className="p-4">
//                   <h3 className="font-medium text-gray-800 hover:text-[#6A0A0A] line-clamp-1">
//                     {sp.ten}
//                   </h3>
//                   <p className="text-gray-500 text-sm mt-1 line-clamp-2">
//                     {sp.mo_ta || "Thưởng thức ẩm thực cùng HanFoodie"}
//                   </p>
//                 </div>
//               </Link>

//               {/* Giá + Sao */}
              // <div className="flex items-center justify-between px-4 pb-4">
              //   <span className="text-[#6A0A0A] font-semibold text-lg">
              //     {sp.gia_goc.toLocaleString("vi-VN")}₫
              //   </span>

              //   {sp.so_sao_tb && (
              //     <div className="flex items-center text-sm text-yellow-500">
              //       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              //       {Number(sp.so_sao_tb).toFixed(1)}
              //     </div>
              //   )}
              // </div>

//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
