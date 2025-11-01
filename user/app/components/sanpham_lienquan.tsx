// "use client";

// import Link from "next/link";
// import { Star } from "lucide-react";
// import { ISanPham } from "../lib/cautrucdata";

// interface Props {
//   data: ISanPham[];
//   idDanhMuc: number; // ID danh mục hoặc loại của sản phẩm hiện tại
// }

// export default function SanPhamLienQuanSection({ data, idDanhMuc }: Props) {
//   // Lọc sản phẩm liên quan cùng danh mục
//   const sanPhamLienQuan = data
//     .filter((sp) => sp.id_danh_muc === idDanhMuc)
//     .slice(0, 5); // chỉ lấy 5 sản phẩm

//   if (sanPhamLienQuan.length === 0) return null;

//   return (
//     <section className="mt-10">
//       <h2 className="text-2xl font-semibold mb-3 text-[#6A0A0A]">
//         Sản phẩm liên quan
//       </h2>

//       <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
//         {sanPhamLienQuan.map((sp) => (
//           <div
//             key={sp.id}
//             className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
//           >
//             <Link href={`/${sp.id}`} className="block">
//               <img
//                 src={sp.hinh || "/noimg.png"}
//                 alt={sp.ten}
//                 className="w-full h-48 object-cover hover:scale-105 transition-transform"
//               />
//               <div className="p-4">
//                 <h3 className="font-medium text-gray-800 hover:text-[#6A0A0A] line-clamp-1">
//                   {sp.ten}
//                 </h3>

//                 <p className="text-gray-500 text-sm mt-1 truncate">
//                   {sp.mo_ta}
//                 </p>
//               </div>
//             </Link>

//             {/* Giá + Sao */}
//             <div className="flex items-center justify-between px-4 pb-4">
//               <span className="text-[#6A0A0A] font-semibold text-lg">
//                 {sp.gia_goc.toLocaleString()}₫
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
// }
"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { ISanPham } from "../lib/cautrucdata";

interface Props {
  data: ISanPham[];      // Danh sách toàn bộ sản phẩm
  idDanhMuc: number;     // ID danh mục hiện tại
  idSanPham?: number;    // ID sản phẩm hiện tại (để loại trừ)
}

export default function SanPhamLienQuanSection({
  data,
  idDanhMuc,
  idSanPham,
}: Props) {
  // ✅ Lọc sản phẩm cùng danh mục, khác sản phẩm hiện tại
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

  if (sanPhamLienQuan.length === 0)
    return (
      <p className="text-center text-gray-500 mt-10">
        Không có sản phẩm liên quan.
      </p>
    );

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-3 text-[#6A0A0A]">
        Sản phẩm liên quan
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {sanPhamLienQuan.map((sp) => (
          <div
            key={sp.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <Link href={`/chi_tiet/${sp.id}`} className="block">
              <img
                src={sp.hinh || "/images/no-image.jpg"}
                alt={sp.ten}
                className="w-full h-48 object-cover hover:scale-105 transition-transform"
              />
              <div className="p-4">
                <h3 className="font-medium text-gray-800 hover:text-[#6A0A0A] line-clamp-1">
                  {sp.ten}
                </h3>
                <p className="text-gray-500 text-sm mt-1 truncate">
                  {sp.mo_ta || "Thưởng thức ẩm thực cùng HanFoodie"}
                </p>
              </div>
            </Link>

            {/* Giá + Sao */}
            <div className="flex items-center justify-between px-4 pb-4">
              <span className="text-[#6A0A0A] font-semibold text-lg">
                {sp.gia_goc?.toLocaleString("vi-VN")}₫
              </span>
              <div className="flex items-center text-yellow-500 text-sm">
                <Star className="w-4 h-4 fill-yellow-400" /> 4.5
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
