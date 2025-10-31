// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import {  } from "@/app/components/themvaogiohang";
// import { Star } from "lucide-react";

// export default function ChiTiet() {
//   const { id } = useParams();
//   const [data, setData] = useState<any>(null);
//   const [openPopup, setOpenPopup] = useState(false);

//   useEffect(() => {
//     if (id) {
//       fetch(`/api/chi_tiet/${id}`)
//         .then((res) => res.json())
//         .then((data) => setData(data))
//         .catch((err) => console.error("Lỗi khi lấy chi tiết:", err));
//     }
//   }, [id]);

//   if (!data) return <div className="text-center p-10">Đang tải dữ liệu...</div>;

//   const { san_pham, danh_gia, lien_quan } = data;

//   return (
//     <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
//       {/* Hình sản phẩm */}
//       <div className="flex flex-col items-center">
//         <Image
//           src={san_pham?.hinh_anh || "/images/no-image.jpg"}
//           alt={san_pham?.ten || "Sản phẩm"}
//           width={500}
//           height={500}
//           className="rounded-2xl shadow-md"
//         />
//       </div>

//       {/* Thông tin sản phẩm */}
//       <div>
//         <h1 className="text-3xl font-bold text-[#6A0A0A] mb-2">
//           {san_pham?.ten || "Tên sản phẩm"}
//         </h1>
//         <div className="flex items-center gap-2 text-yellow-500 mb-2">
//           <Star fill="gold" size={20} />{" "}
//           <span>{danh_gia?.length || 0} đánh giá</span>
//         </div>
//         <p className="text-xl font-semibold mb-4">
//           Giá:{" "}
//           {san_pham?.gia
//             ? san_pham.gia.toLocaleString("vi-VN") + "đ"
//             : "Đang cập nhật"}
//         </p>
//         <p className="text-gray-700 mb-6">
//           {san_pham?.mo_ta_ngan || "Không có mô tả"}
//         </p>

//         <Button
//           onClick={() => setOpenPopup(true)}
//           className="bg-[#D33C3C] hover:bg-[#b53030] text-white rounded-full px-6 py-3"
//         >
//           Thêm vào giỏ hàng
//         </Button>
//       </div>

//       {/* Popup chọn món thêm / tùy chọn */}
//       {openPopup && (
//         <PopupTuyChon data={data} onClose={() => setOpenPopup(false)} />
//       )}
//     </div>
//   );}
// // "use client";

// // import { useEffect, useState } from "react";
// // import Image from "next/image";
// // import Header from "@/app/components/Header";
// // import Footer from "@/app/components/Footer";
// // import ThemVaoGioHang from "@/app/components/themvaogiohang";

// // export default function ChiTietSanPham({ params }: { params: { id: string } }) {
// //   const [data, setData] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [openPopup, setOpenPopup] = useState(false);

// //   useEffect(() => {
// //     async function fetchData() {
// //       try {
// //         const res = await fetch(`/api/san-pham/${params.id}`);
// //         const result = await res.json();
// //         setData(result);
// //       } catch (error) {
// //         console.error("Lỗi khi tải dữ liệu:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     }
// //     fetchData();
// //   }, [params.id]);

// //   if (loading) return <div className="text-center py-10">Đang tải...</div>;
// //   if (!data) return <div className="text-center py-10">Không tìm thấy sản phẩm</div>;

// //   const { san_pham, danh_gia, lien_quan } = data;

// //   return (
// //     <>
// //       <Header />

// //       <div className="bg-white py-6 px-4 md:px-16">
// //         {/* Breadcrumb */}
// //         <div className="text-sm text-gray-500 mb-4">
// //           Trang chủ &gt; <span className="text-black">{san_pham.ten}</span>
// //         </div>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
// //           {/* Ảnh sản phẩm */}
// //           <div className="flex justify-center">
// //             <Image
// //               src={san_pham.hinh || "/placeholder.png"}
// //               alt={san_pham.ten}
// //               width={480}
// //               height={480}
// //               className="rounded-2xl shadow-lg object-cover"
// //             />
// //           </div>

// //           {/* Thông tin sản phẩm */}
// //           <div>
// //             <h1 className="text-3xl font-bold mb-2 text-[#D33C3C]">{san_pham.ten}</h1>
// //             <div className="flex items-center mb-4 text-yellow-500 text-lg">
// //               {"★".repeat(5)}
// //               <span className="ml-2 text-gray-600">
// //                 {danh_gia?.length || 0} đánh giá
// //               </span>
// //             </div>
// //             <p className="text-2xl font-semibold text-red-500 mb-4">
// //               {san_pham.gia_goc?.toLocaleString("vi-VN")}đ
// //             </p>
// //             <p className="text-gray-700 leading-relaxed mb-6">
// //               {san_pham.mo_ta || "Không có mô tả cho sản phẩm này."}
// //             </p>

// //             {/* Nút thêm vào giỏ */}
// //             <button
// //               onClick={() => setOpenPopup(true)}
// //               className="bg-[#e8594f] hover:bg-[#d94d46] text-white py-3 px-8 rounded-xl text-lg font-medium transition"
// //             >
// //               Thêm vào giỏ hàng
// //             </button>
// //           </div>
// //         </div>

// //         {/* Mô tả sản phẩm */}
// //         <div className="mt-12">
// //           <h2 className="text-2xl font-semibold mb-3">Mô tả chi tiết</h2>
// //           <p className="text-gray-700 whitespace-pre-line leading-relaxed">
// //             {san_pham.noi_dung || "Đang cập nhật nội dung chi tiết..."}
// //           </p>
// //         </div>

// //         {/* Sản phẩm gợi ý */}
// //         <div className="mt-12">
// //           <h2 className="text-2xl font-semibold mb-4">Sản phẩm gợi ý</h2>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //             {lien_quan?.map((sp: any) => (
// //               <div
// //                 key={sp.id}
// //                 className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
// //               >
// //                 <Image
// //                   src={sp.hinh || "/placeholder.png"}
// //                   alt={sp.ten}
// //                   width={300}
// //                   height={300}
// //                   className="w-full h-48 object-cover"
// //                 />
// //                 <div className="p-3">
// //                   <h3 className="font-medium truncate">{sp.ten}</h3>
// //                   <p className="text-red-500 font-semibold">
// //                     {sp.gia_goc?.toLocaleString("vi-VN")}đ
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Popup thêm vào giỏ hàng */}
// //       {openPopup && (
// //         <ThemVaoGioHang data={data} onClose={() => setOpenPopup(false)} />
// //       )}

// //       <Footer />
// //     </>
// //   );
// // 
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { Star } from "lucide-react";
// import ThemVaoGioHang from "@/app/components/themvaogiohang"; 
// import SanPhamLienQuan from "@/app/components/sanpham_lienquan";

// export default function ChiTiet() {
//   const { id } = useParams();
//   const [data, setData] = useState<any>(null);
//   const [openPopup, setOpenPopup] = useState(false);

//   useEffect(() => {
//     if (id) {
//       fetch(`/api/chi_tiet/${id}`) 
//         .then((res) => res.json())
//         .then((data) => setData(data))
//         .catch((err) => console.error("Lỗi khi lấy chi tiết:", err));
//     }
//   }, [id]);

//   if (!data) return <div className="text-center p-10">Đang tải dữ liệu...</div>;

//   const { san_pham, danh_gia } = data;

//   return (
//     <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
//       {/* Hình sản phẩm */}
//       <div className="flex flex-col items-center">
//         <Image
//           src={san_pham?.hinh || "/images/no-image.jpg"}
//           alt={san_pham?.ten || "Sản phẩm"}
//           width={500}
//           height={500}
//           className="rounded-2xl shadow-md"
//         />
//       </div>

//       {/* Thông tin sản phẩm */}
//       <div>
//         <h1 className="text-3xl font-bold text-[#6A0A0A] mb-2">
//           {san_pham?.ten || "Tên sản phẩm"}
//         </h1>
//         <div className="flex items-center gap-2 text-yellow-500 mb-2">
//           <Star fill="gold" size={20} />{" "}
//           <span>{danh_gia?.length || 0} đánh giá</span>
//         </div>
//         <p className="text-xl font-semibold mb-4">
//           Giá:{" "}
//           {san_pham?.gia_goc
//             ? san_pham.gia_goc.toLocaleString("vi-VN") + "đ"
//             : "Đang cập nhật"}
//         </p>
//         <p className="text-gray-700 mb-6">
//           {san_pham?.mo_ta || "Không có mô tả"}
//         </p>

//         {/* ✅ Nút mở popup thêm vào giỏ */}
//         <button
//           onClick={() => setOpenPopup(true)}
//           className="bg-[#D33C3C] hover:bg-[#b53030] text-white rounded-full px-6 py-3 transition"
//         >
//           Thêm vào giỏ hàng
//         </button>
//       </div>

//       {/* ✅ Popup thêm vào giỏ hàng */}
//       {openPopup && (
//         <ThemVaoGioHang data={data} onClose={() => setOpenPopup(false)} />
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import ThemVaoGioHang from "@/app/components/themvaogiohang"; 
import SanPhamLienQuanSection from "@/app/components/sanpham_lienquan";

export default function ChiTiet() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [dsSanPham, setDsSanPham] = useState<any[]>([]); // ✅ danh sách sản phẩm để truyền xuống "liên quan"
  const [openPopup, setOpenPopup] = useState(false);

  // ✅ Lấy chi tiết sản phẩm
  useEffect(() => {
    if (id) {
      fetch(`/api/chi_tiet/${id}`)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.error("Lỗi khi lấy chi tiết:", err));
    }
  }, [id]);

  // ✅ Lấy toàn bộ sản phẩm (để lọc sản phẩm liên quan)
  useEffect(() => {
    fetch("/api/san_pham")
      .then((res) => res.json())
      .then((data) => setDsSanPham(data))
      .catch((err) => console.error("Lỗi khi lấy danh sách:", err));
  }, []);

  if (!data) return <div className="text-center p-10">Đang tải dữ liệu...</div>;

  const { san_pham, danh_gia } = data;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* ✅ Thông tin sản phẩm */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Hình sản phẩm */}
        <div className="flex flex-col items-center">
          <Image
            src={san_pham?.hinh || "/images/no-image.jpg"}
            alt={san_pham?.ten || "Sản phẩm"}
            width={500}
            height={500}
            className="rounded-2xl shadow-md"
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="text-3xl font-bold text-[#6A0A0A] mb-2">
            {san_pham?.ten || "Tên sản phẩm"}
          </h1>
          <div className="flex items-center gap-2 text-yellow-500 mb-2">
            <Star fill="gold" size={20} />{" "}
            <span>{danh_gia?.length || 0} đánh giá</span>
          </div>
          <p className="text-xl font-semibold mb-4">
            Giá:{" "}
            {san_pham?.gia_goc
              ? san_pham.gia_goc.toLocaleString("vi-VN") + "đ"
              : "Đang cập nhật"}
          </p>
          <p className="text-gray-700 mb-6">
            {san_pham?.mo_ta || "Không có mô tả"}
          </p>

          {/* ✅ Nút mở popup thêm vào giỏ */}
          <button
            onClick={() => setOpenPopup(true)}
            className="bg-[#D33C3C] hover:bg-[#b53030] text-white rounded-full px-6 py-3 transition"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      {/* ✅ Popup thêm vào giỏ hàng */}
      {openPopup && (
        <ThemVaoGioHang data={data} onClose={() => setOpenPopup(false)} />
      )}

      {/* ✅ Component Sản phẩm liên quan */}
      {san_pham?.id_danh_muc && (
        <SanPhamLienQuanSection
          data={dsSanPham}
          idDanhMuc={san_pham.id_danh_muc}
        />
      )}
    </div>
  );
}
