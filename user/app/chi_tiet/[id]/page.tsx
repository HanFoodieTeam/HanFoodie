// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";
// // import { Star } from "lucide-react";
// // import SanPhamLienQuanSection from "@/app/components/sanpham_lienquan";
// // import ThemVaoGioHang from "@/app/components/themvaogiohang";
// // import Header from "@/app/components/Header";

// // /* 🔸 Component con: từng đánh giá riêng biệt */
// // function DanhGiaItem({ dg }: { dg: any }) {
// //   const [likes, setLikes] = useState(dg.so_luot_like || 0);
// //   const [showCommentBox, setShowCommentBox] = useState(false);
// //   const [comment, setComment] = useState("");

// //   const handleLike = () => setLikes((prev) => prev + 1);
// //   const toggleComment = () => setShowCommentBox((prev) => !prev);

// //   return (
// //     <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-start gap-4">
// //       <img
// //         src={dg.nguoi_dung?.anh_dai_dien || "/images/avatar-default.png"}
// //         alt={dg.nguoi_dung?.ho_ten}
// //         className="w-12 h-12 rounded-full object-cover"
// //       />

// //       <div className="flex-1">
// //         <div className="flex items-center justify-between">
// //           <div>
// //             <p className="font-medium text-gray-800">
// //               {dg.nguoi_dung?.ho_ten}
// //             </p>
// //             <div className="flex text-yellow-500">
// //               {Array(dg.so_sao || 4)
// //                 .fill(0)
// //                 .map((_, i) => (
// //                   <Star key={i} className="w-4 h-4 fill-yellow-400" />
// //                 ))}
// //             </div>
// //           </div>

// //           {/* Nút Like + Bình luận */}
// //           <div className="flex items-center gap-2 text-sm">
// //             <button
// //               onClick={handleLike}
// //               className="flex items-center gap-1 text-gray-600 hover:text-[#6A0A0A] border rounded-md px-2 py-1"
// //             >
// //               👍 <span>{likes}</span>
// //             </button>
// //             <button
// //               onClick={toggleComment}
// //               className="flex items-center gap-1 text-gray-600 hover:text-[#6A0A0A] border rounded-md px-2 py-1"
// //             >
// //               💬 Bình luận
// //             </button>
// //           </div>
// //         </div>

// //         <p className="text-gray-700 mt-1">{dg.noi_dung}</p>

// //         {/* Khung bình luận */}
// //         {showCommentBox && (
// //           <div className="mt-3 bg-gray-50 p-3 rounded-lg border">
// //             <textarea
// //               value={comment}
// //               onChange={(e) => setComment(e.target.value)}
// //               rows={2}
// //               placeholder="Nhập bình luận của bạn..."
// //               className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-[#6A0A0A]/30"
// //             />
// //             <div className="text-right mt-2">
// //               <button
// //                 onClick={() => {
// //                   if (comment.trim()) {
// //                     alert("Bình luận đã gửi!");
// //                     setComment("");
// //                     setShowCommentBox(false);
// //                   }
// //                 }}
// //                 className="bg-[#6A0A0A] text-white text-sm px-3 py-1 rounded-md hover:bg-[#8B0000]"
// //               >
// //                 Gửi
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // /* 🔹 Trang chi tiết sản phẩm */
// // export default function ChiTietSanPhamPage() {
// //   const { id } = useParams();
// //   const [data, setData] = useState<any>(null);
// //   const [showAllReviews, setShowAllReviews] = useState(false);
// //   const [openPopup, setOpenPopup] = useState(false);
// //   const [mainImage, setMainImage] = useState<string>("");
// //   const [fade, setFade] = useState(false);

// //   useEffect(() => {
// //     if (!id) return;
// //     const fetchData = async () => {
// //       const res = await fetch(`/api/chi_tiet/${id}`);
// //       const json = await res.json();
// //       setData(json);
// //       setMainImage(json.san_pham.hinh);
// //     };
// //     fetchData();
// //   }, [id]);

// //   if (!data)
// //     return (
// //       <div className="p-6 text-gray-500 text-center mt-[var(--header-h)]">
// //         Đang tải sản phẩm...
// //       </div>
// //     );

// //   const { san_pham, danh_gia, lien_quan } = data;
// //   const danhGiaHienThi = showAllReviews ? danh_gia : danh_gia.slice(0, 3);
// //   const trungBinhSao =
// //     danh_gia.length > 0
// //       ? danh_gia.reduce((a: number, b: any) => a + b.so_sao, 0) / danh_gia.length
// //       : 0;

// //   const handleChangeImage = (src: string) => {
// //     if (src === mainImage) return;
// //     setFade(true);
// //     setTimeout(() => {
// //       setMainImage(src);
// //       setFade(false);
// //     }, 150);
// //   };

// //   return (
// //     <main className="bg-[#FBEAEA] min-h-screen pt-[60px]">
// //       {/* 🔹 Header cố định */}
// //       <div className="sticky top-25 z-50">
// //         <Header />
// //       </div>

// //       {/* 🔹 Khung trắng sản phẩm chính */}
// //       <div className="max-w-[80%] mx-auto mt-6 mb-10">
// //         <div className="bg-white shadow-lg rounded-2xl px-6 py-6">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {/* Ảnh sản phẩm */}
// //             <div className="flex flex-row gap-3 justify-center items-start">
// //               <div className="flex flex-col gap-2 items-center w-[22%]">
// //                 {[san_pham.hinh, san_pham.hinh2, san_pham.hinh3]
// //                   .filter(Boolean)
// //                   .map((h: string, i: number) => (
// //                     <img
// //                       key={i}
// //                       src={h}
// //                       alt={`Ảnh ${i + 1}`}
// //                       className={`w-full h-[95px] object-cover rounded-xl border cursor-pointer transition-all duration-200 hover:scale-105 ${
// //                         mainImage === h ? "ring-2 ring-[#D33C3C]" : ""
// //                       }`}
// //                       onClick={() => handleChangeImage(h)}
// //                     />
// //                   ))}
// //               </div>

// //               <div className="flex justify-center items-start w-[78%]">
// //                 <img
// //                   src={mainImage || san_pham.hinh || "/images/no-image.jpg"}
// //                   alt={san_pham.ten}
// //                   className={`w-full max-w-[420px] h-[400px] object-cover rounded-2xl shadow transition-all duration-300 ${
// //                     fade ? "opacity-0 scale-95" : "opacity-100 scale-100"
// //                   } hover:scale-[1.05]`}
// //                 />
// //               </div>
// //             </div>

// //             {/* Thông tin sản phẩm */}
// //             <div className="flex flex-col justify-between">
// //               <div>
// //                 <h1 className="text-2xl font-bold text-[#6A0A0A] mb-2">
// //                   {san_pham.ten}
// //                 </h1>

// //                 <div className="flex items-center mb-2">
// //                   <div className="flex items-center text-yellow-500 mr-2">
// //                     <Star className="w-5 h-5 fill-yellow-400 mr-1" />
// //                     <span className="text-base font-medium text-[#6A0A0A]">
// //                       {isNaN(trungBinhSao)
// //                         ? "0.0"
// //                         : trungBinhSao.toFixed(1)}
// //                     </span>
// //                   </div>
// //                   <span className="text-gray-600 text-sm">
// //                     ({danh_gia.length || 0} đánh giá)
// //                   </span>
// //                 </div>

// //                 <p className="text-xl font-semibold text-[#D22B2B] mb-2">
// //                   {san_pham.gia_goc?.toLocaleString("vi-VN")}₫
// //                 </p>

// //                 <p className="text-gray-700 text-sm leading-relaxed">
// //                   {san_pham.mo_ta ||
// //                     "Thưởng thức hương vị đậm đà, hấp dẫn cùng HanFoodie."}
// //                 </p>
// //               </div>

// //               <button
// //                 onClick={() => setOpenPopup(true)}
// //                 className="bg-[#D33C3C] hover:bg-[#b53030] text-white rounded-full px-4 py-2 text-sm font-medium transition mt-3 w-fit"
// //               >
// //                 Thêm vào giỏ hàng
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Popup thêm giỏ hàng */}
// //         {openPopup && (
// //           <ThemVaoGioHang data={data} onClose={() => setOpenPopup(false)} />
// //         )}
// //       </div>

// //       {/* 🔹 Phần đánh giá */}
// //       <section className="max-w-[80%] mx-auto bg-white p-6 rounded-xl shadow mb-12">
// //         <h2 className="text-2xl font-semibold text-[#6A0A0A] mb-3">
// //           Đánh giá của khách hàng
// //         </h2>

// //         <div className="flex items-center mb-6">
// //           <span className="text-xl font-bold mr-2">
// //             {trungBinhSao.toFixed(1)}/5
// //           </span>
// //           <div className="flex text-yellow-500 mr-2">
// //             {Array(5)
// //               .fill(0)
// //               .map((_, i) => (
// //                 <Star
// //                   key={i}
// //                   className={`w-5 h-5 ${
// //                     i < Math.round(trungBinhSao)
// //                       ? "fill-yellow-400"
// //                       : "text-gray-300"
// //                   }`}
// //                 />
// //               ))}
// //           </div>
// //           <span className="text-gray-600">
// //             ({danh_gia.length} đánh giá)
// //           </span>
// //         </div>

// //         {/* 🔹 Danh sách đánh giá */}
// //         <div className="space-y-6">
// //           {danhGiaHienThi.map((dg: any) => (
// //             <DanhGiaItem key={dg.id} dg={dg} />
// //           ))}
// //         </div>

// //         {danh_gia.length > 3 && (
// //           <div className="text-center mt-6">
// //             <button
// //               onClick={() => setShowAllReviews(!showAllReviews)}
// //               className="text-[#6A0A0A] underline hover:text-[#8B0000]"
// //             >
// //               {showAllReviews ? "Ẩn bớt" : "Xem thêm"}
// //             </button>
// //           </div>
// //         )}
// //       </section>

// //       {/* 🔹 Phần sản phẩm liên quan */}
// //       <div className="max-w-[80%] mx-auto mb-12">
// //         <SanPhamLienQuanSection
// //           data={lien_quan}
// //           idDanhMuc={san_pham.id_danh_muc}
// //           idSanPham={san_pham.id}
// //         />
// //       </div>
// //     </main>
// //   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Star } from "lucide-react";
// import SanPhamLienQuanSection from "@/app/components/sanpham_lienquan";
// import ThemVaoGioHang from "@/app/components/themvaogiohang";
// import Header from "@/app/components/Header";

// /* 🔸 Component con: từng đánh giá riêng biệt */
// function DanhGiaItem({ dg }: { dg: any }) {
//   const [likes, setLikes] = useState(dg.so_luot_like || 0);
//   const [showCommentBox, setShowCommentBox] = useState(false);
//   const [comment, setComment] = useState("");

//   const handleLike = () => setLikes((prev) => prev + 1);
//   const toggleComment = () => setShowCommentBox((prev) => !prev);

//   return (
//     <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-start gap-4">
//       <img
//         src={dg.nguoi_dung?.anh_dai_dien || "/images/avatar-default.png"}
//         alt={dg.nguoi_dung?.ho_ten}
//         className="w-12 h-12 rounded-full object-cover"
//       />

//       <div className="flex-1">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="font-medium text-gray-800">{dg.nguoi_dung?.ho_ten}</p>
//             <div className="flex items-center text-yellow-500">
//               {Array(5)
//                 .fill(0)
//                 .map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-4 h-4 ${
//                       i < (dg.so_sao || 0)
//                         ? "fill-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                   />
//                 ))}
//               <span className="ml-2 text-sm text-gray-600">
//                 {dg.so_sao}/5
//               </span>
//             </div>
//           </div>

//           {/* Nút Like + Bình luận */}
//           <div className="flex items-center gap-2 text-sm">
//             <button
//               onClick={handleLike}
//               className="flex items-center gap-1 text-gray-600 hover:text-[#6A0A0A] border rounded-md px-2 py-1"
//             >
//               👍 <span>{likes}</span>
//             </button>
//             <button
//               onClick={toggleComment}
//               className="flex items-center gap-1 text-gray-600 hover:text-[#6A0A0A] border rounded-md px-2 py-1"
//             >
//               💬 Bình luận
//             </button>
//           </div>
//         </div>

//         <p className="text-gray-700 mt-1">{dg.noi_dung}</p>

//         {/* Khung bình luận */}
//         {showCommentBox && (
//           <div className="mt-3 bg-gray-50 p-3 rounded-lg border">
//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               rows={2}
//               placeholder="Nhập bình luận của bạn..."
//               className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-[#6A0A0A]/30"
//             />
//             <div className="text-right mt-2">
//               <button
//                 onClick={() => {
//                   if (comment.trim()) {
//                     alert("Bình luận đã gửi!");
//                     setComment("");
//                     setShowCommentBox(false);
//                   }
//                 }}
//                 className="bg-[#6A0A0A] text-white text-sm px-3 py-1 rounded-md hover:bg-[#8B0000]"
//               >
//                 Gửi
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* 🔹 Component Form bình luận (giao diện giống hình bạn gửi) */
// function BinhLuanMoi() {
//   const [form, setForm] = useState({
//     hoTen: "",
//     soDienThoai: "",
//     ghiChu: "",
//     soSao: 0,
//   });

//   const handleStarClick = (i: number) => setForm({ ...form, soSao: i + 1 });

//   return (
//     <div className="bg-white border rounded-xl p-6">
//       <div className="flex flex-col items-center mb-4">
//         <div className="flex text-yellow-500 mb-2">
//           {Array(5)
//             .fill(0)
//             .map((_, i) => (
//               <Star
//                 key={i}
//                 onClick={() => handleStarClick(i)}
//                 className={`w-7 h-7 cursor-pointer ${
//                   i < form.soSao ? "fill-yellow-400" : "text-gray-300"
//                 }`}
//               />
//             ))}
//         </div>
//         <span className="text-sm text-gray-600">(Đánh giá)</span>
//       </div>

//       <input
//         type="text"
//         placeholder="Họ và tên"
//         value={form.hoTen}
//         onChange={(e) => setForm({ ...form, hoTen: e.target.value })}
//         className="w-full border-b focus:outline-none p-2 mb-3"
//       />
//       <input
//         type="text"
//         placeholder="Số điện thoại"
//         value={form.soDienThoai}
//         onChange={(e) => setForm({ ...form, soDienThoai: e.target.value })}
//         className="w-full border-b focus:outline-none p-2 mb-3"
//       />
//       <textarea
//         placeholder="Ghi chú"
//         value={form.ghiChu}
//         onChange={(e) => setForm({ ...form, ghiChu: e.target.value })}
//         rows={3}
//         className="w-full border-b focus:outline-none p-2 mb-4"
//       />
//       <div className="text-right">
//         <button
//           onClick={() => {
//             if (!form.hoTen || !form.soDienThoai || !form.ghiChu) {
//               alert("Vui lòng nhập đầy đủ thông tin!");
//               return;
//             }
//             alert("Đã gửi bình luận!");
//             setForm({ hoTen: "", soDienThoai: "", ghiChu: "", soSao: 0 });
//           }}
//           className="bg-[#146D3A] text-white px-4 py-2 rounded-md hover:bg-green-700"
//         >
//           Gửi bình luận
//         </button>
//       </div>
//     </div>
//   );
// }

// /* 🔹 Trang chi tiết sản phẩm */
// export default function ChiTietSanPhamPage() {
//   const { id } = useParams();
//   const [data, setData] = useState<any>(null);
//   const [openPopup, setOpenPopup] = useState(false);
//   const [mainImage, setMainImage] = useState<string>("");
//   const [fade, setFade] = useState(false);
//   const [activeTab, setActiveTab] = useState<"danhgia" | "binhluan">("danhgia");

//   useEffect(() => {
//     if (!id) return;
//     const fetchData = async () => {
//       const res = await fetch(`/api/chi_tiet/${id}`);
//       const json = await res.json();
//       setData(json);
//       setMainImage(json.san_pham.hinh);
//     };
//     fetchData();
//   }, [id]);

//   if (!data)
//     return (
//       <div className="p-6 text-gray-500 text-center mt-[var(--header-h)]">
//         Đang tải sản phẩm...
//       </div>
//     );

//   const { san_pham, danh_gia, lien_quan } = data;
//   const trungBinhSao =
//     danh_gia.length > 0
//       ? danh_gia.reduce((a: number, b: any) => a + b.so_sao, 0) / danh_gia.length
//       : 0;

//   const handleChangeImage = (src: string) => {
//     if (src === mainImage) return;
//     setFade(true);
//     setTimeout(() => {
//       setMainImage(src);
//       setFade(false);
//     }, 150);
//   };

//   return (
//     <main className="bg-[#FBEAEA] min-h-screen pt-[60px]">
//       {/* Header */}
//       <div className="sticky top-25 z-50">
//         <Header />
//       </div>

//       {/* Khung sản phẩm */}
//       <div className="max-w-[80%] mx-auto mt-6 mb-10">
//         <div className="bg-white shadow-lg rounded-2xl px-6 py-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Ảnh sản phẩm */}
//             <div className="flex flex-row gap-3 justify-center items-start">
//               <div className="flex flex-col gap-2 items-center w-[22%]">
//                 {[san_pham.hinh, san_pham.hinh2, san_pham.hinh3]
//                   .filter(Boolean)
//                   .map((h: string, i: number) => (
//                     <img
//                       key={i}
//                       src={h}
//                       alt={`Ảnh ${i + 1}`}
//                       className={`w-full h-[95px] object-cover rounded-xl border cursor-pointer transition-all duration-200 hover:scale-105 ${
//                         mainImage === h ? "ring-2 ring-[#D33C3C]" : ""
//                       }`}
//                       onClick={() => handleChangeImage(h)}
//                     />
//                   ))}
//               </div>

//               <div className="flex justify-center items-start w-[78%]">
//                 <img
//                   src={mainImage || san_pham.hinh || "/images/no-image.jpg"}
//                   alt={san_pham.ten}
//                   className={`w-full max-w-[420px] h-[400px] object-cover rounded-2xl shadow transition-all duration-300 ${
//                     fade ? "opacity-0 scale-95" : "opacity-100 scale-100"
//                   } hover:scale-[1.05]`}
//                 />
//               </div>
//             </div>

//             {/* Thông tin sản phẩm */}
//             <div className="flex flex-col justify-between">
//               <div>
//                 <h1 className="text-2xl font-bold text-[#6A0A0A] mb-2">
//                   {san_pham.ten}
//                 </h1>

//                 <div className="flex items-center mb-2">
//                   <div className="flex items-center text-yellow-500 mr-2">
//                     <Star className="w-5 h-5 fill-yellow-400 mr-1" />
//                     <span className="text-base font-medium text-[#6A0A0A]">
//                       {isNaN(trungBinhSao)
//                         ? "0.0"
//                         : trungBinhSao.toFixed(1)}
//                     </span>
//                   </div>
//                   <span className="text-gray-600 text-sm">
//                     ({danh_gia.length || 0} đánh giá)
//                   </span>
//                 </div>

//                 <p className="text-xl font-semibold text-[#D22B2B] mb-2">
//                   {san_pham.gia_goc?.toLocaleString("vi-VN")}₫
//                 </p>

//                 <p className="text-gray-700 text-sm leading-relaxed">
//                   {san_pham.mo_ta ||
//                     "Thưởng thức hương vị đậm đà, hấp dẫn cùng HanFoodie."}
//                 </p>
//               </div>

//               <button
//                 onClick={() => setOpenPopup(true)}
//                 className="bg-[#D33C3C] hover:bg-[#b53030] text-white rounded-full px-4 py-2 text-sm font-medium transition mt-3 w-fit"
//               >
//                 Thêm vào giỏ hàng
//               </button>
//             </div>
//           </div>
//         </div>

//         {openPopup && (
//           <ThemVaoGioHang data={data} onClose={() => setOpenPopup(false)} />
//         )}
//       </div>

//       {/* Tabs */}
//       <section className="max-w-[80%] mx-auto bg-white p-6 rounded-xl shadow mb-12">
//         <h2 className="text-2xl font-semibold text-[#6A0A0A] mb-5 text-left">
//           Đánh giá & Bình luận
//         </h2>

//         {/* Nút chuyển tab */}
//         <div className="flex gap-4 mb-6">
//           <button
//             className={`px-5 py-2 rounded-md border text-sm font-medium transition ${
//               activeTab === "danhgia"
//                 ? "border-[#146D3A] text-[#146D3A]"
//                 : "border-gray-300 text-gray-700"
//             }`}
//             onClick={() => setActiveTab("danhgia")}
//           >
//             Tất cả đánh giá
//           </button>
//           <button
//             className={`px-5 py-2 rounded-md border text-sm font-medium transition ${
//               activeTab === "binhluan"
//                 ? "border-[#146D3A] text-[#146D3A]"
//                 : "border-gray-300 text-gray-700"
//             }`}
//             onClick={() => setActiveTab("binhluan")}
//           >
//             Bình luận
//           </button>
//         </div>

//         {/* Nội dung tab */}
//         {activeTab === "danhgia" ? (
//           <div className="space-y-6">
//             {danh_gia.map((dg: any) => (
//               <DanhGiaItem key={dg.id} dg={dg} />
//             ))}
//           </div>
//         ) : (
//           <BinhLuanMoi />
//         )}
//       </section>

//       {/* Sản phẩm liên quan */}
//       <div className="max-w-[80%] mx-auto mb-12">
//         <SanPhamLienQuanSection
//           data={lien_quan}
//           idDanhMuc={san_pham.id_danh_muc}
//           idSanPham={san_pham.id}
//         />
//       </div>
//     </main>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import SanPhamLienQuanSection from "@/app/components/sanpham_lienquan";
import ThemVaoGioHang from "@/app/components/themvaogiohang";
import Header from "@/app/components/Header";

/* Component: Một đánh giá đơn lẻ*/
function DanhGiaItem({ dg }: { dg: any }) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <p className="font-medium text-gray-800">{dg.nguoi_dung?.ho_ten}</p>
      <div className="flex items-center text-yellow-500 mb-1">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < dg.sao ? "fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        <span className="ml-2 text-sm text-gray-600">{dg.sao}/5</span>
      </div>
      <p className="text-gray-700">{dg.noi_dung}</p>
      <p className="text-xs text-gray-400 mt-1">
        {new Date(dg.thoi_gian).toLocaleDateString("vi-VN")}
      </p>
    </div>
  );
}

/* ───────────────────────────────
🔹 Component: Form viết đánh giá mới
──────────────────────────────── */
function BinhLuanMoi({
  idSanPham,
  idNguoiDung,
  onGuiThanhCong,
}: {
  idSanPham: number;
  idNguoiDung: number | null;
  onGuiThanhCong: () => void;
}) {
  const [soSao, setSoSao] = useState(0);
  const [noiDung, setNoiDung] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!idNguoiDung) {
      alert("⚠️ Bạn cần đăng nhập để gửi đánh giá!");
      return;
    }
    if (!soSao || !noiDung.trim()) {
      alert("Vui lòng chọn số sao và nhập nội dung!");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/danh_gia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sao: soSao,
        noi_dung: noiDung,
        id_nguoi_dung: idNguoiDung,
        id_san_pham: idSanPham, // ✅ dùng id_san_pham thay vì id_bien_the
      }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("🎉 Gửi đánh giá thành công!");
      setSoSao(0);
      setNoiDung("");
      onGuiThanhCong();
    } else {
      alert(data.message || "Đã xảy ra lỗi khi gửi đánh giá!");
    }
  };

  return (
    <div className="bg-white border rounded-xl p-6">
      <div className="flex flex-col items-center mb-4">
        <div className="flex text-yellow-500 mb-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Star
                key={i}
                onClick={() => setSoSao(i + 1)}
                className={`w-7 h-7 cursor-pointer ${
                  i < soSao ? "fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
        </div>
        <span className="text-sm text-gray-600">(Chọn số sao đánh giá)</span>
      </div>

      <textarea
        placeholder="Nhập cảm nhận của bạn..."
        value={noiDung}
        onChange={(e) => setNoiDung(e.target.value)}
        rows={4}
        className="w-full border-b focus:outline-none p-2 mb-4"
      />
      <div className="text-right">
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-[#146D3A] text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Đang gửi..." : "Gửi đánh giá"}
        </button>
      </div>
    </div>
  );
}

/* ───────────────────────────────
🔹 Trang Chi Tiết Sản Phẩm
──────────────────────────────── */
export default function ChiTietSanPhamPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [mainImage, setMainImage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"danhgia" | "viet">("danhgia");
  const [user, setUser] = useState<any>(null); // 👈 user đăng nhập
  const [refreshFlag, setRefreshFlag] = useState(0);

  const fetchData = async () => {
    const res = await fetch(`/api/chi_tiet/${id}`);
    const json = await res.json();
    setData(json);
    setMainImage(json.san_pham.hinh);
  };

  const fetchUser = async () => {
    const res = await fetch("/api/nguoi_dung/me");
    if (res.ok) {
      const u = await res.json();
      setUser(u.data);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchData();
    fetchUser();
  }, [id, refreshFlag]);

  if (!data)
    return (
      <div className="p-6 text-gray-500 text-center mt-[var(--header-h)]">
        Đang tải sản phẩm...
      </div>
    );

  const { san_pham, danh_gia, lien_quan } = data;
  const trungBinhSao =
    danh_gia.length > 0
      ? danh_gia.reduce((a: number, b: any) => a + b.sao, 0) /
        danh_gia.length
      : 0;

  return (
    <main className="bg-[#FBEAEA] min-h-screen pt-[60px]">
      <div className="sticky top-25 z-50">
        <Header />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="max-w-[80%] mx-auto mt-6 mb-10">
        <div className="bg-white shadow-lg rounded-2xl px-6 py-6 grid md:grid-cols-2 gap-6">
          {/* Hình ảnh */}
          <div className="flex flex-col items-center">
            <img
              src={mainImage}
              alt={san_pham.ten}
              className="w-[400px] h-[400px] object-cover rounded-xl shadow"
            />
          </div>

          {/* Thông tin */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#6A0A0A] mb-2">
                {san_pham.ten}
              </h1>
              <div className="flex items-center mb-2">
                <div className="flex items-center text-yellow-500 mr-2">
                  <Star className="w-5 h-5 fill-yellow-400 mr-1" />
                  <span className="text-base font-medium text-[#6A0A0A]">
                    {trungBinhSao.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-600 text-sm">
                  ({danh_gia.length} đánh giá)
                </span>
              </div>
              <p className="text-xl font-semibold text-[#D22B2B] mb-3">
                {san_pham.gia_goc?.toLocaleString("vi-VN")}₫
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {san_pham.mo_ta ||
                  "Thưởng thức hương vị đậm đà, hấp dẫn cùng HanFoodie."}
              </p>
            </div>
            <button
              onClick={() => setOpenPopup(true)}
              className="bg-[#D33C3C] hover:bg-[#b53030] text-white rounded-full px-4 py-2 text-sm font-medium transition mt-3 w-fit"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {openPopup && (
          <ThemVaoGioHang data={data} onClose={() => setOpenPopup(false)} />
        )}
      </div>

      {/* Tabs đánh giá */}
      <section className="max-w-[80%] mx-auto bg-white p-6 rounded-xl shadow mb-12">
        <h2 className="text-2xl font-semibold text-[#6A0A0A] mb-5 text-left">
          Đánh giá & Bình luận
        </h2>

        <div className="flex gap-4 mb-6">
          <button
            className={`px-5 py-2 rounded-md border text-sm font-medium transition ${
              activeTab === "danhgia"
                ? "border-[#146D3A] text-[#146D3A]"
                : "border-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveTab("danhgia")}
          >
            Tất cả đánh giá
          </button>
          <button
            className={`px-5 py-2 rounded-md border text-sm font-medium transition ${
              activeTab === "viet"
                ? "border-[#146D3A] text-[#146D3A]"
                : "border-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveTab("viet")}
          >
            Viết đánh giá
          </button>
        </div>

        {activeTab === "danhgia" ? (
          danh_gia.length > 0 ? (
            <div className="space-y-6">
              {danh_gia.map((dg: any) => (
                <DanhGiaItem key={dg.id} dg={dg} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Chưa có đánh giá nào.</p>
          )
        ) : (
          <BinhLuanMoi
            idSanPham={san_pham.id}
            idNguoiDung={user?.id || null}
            onGuiThanhCong={() => setRefreshFlag((v) => v + 1)}
          />
        )}
      </section>

      {/* Sản phẩm liên quan */}
      <div className="max-w-[80%] mx-auto mb-12">
        <SanPhamLienQuanSection
          data={lien_quan}
          idDanhMuc={san_pham.id_danh_muc}
          idSanPham={san_pham.id}
        />
      </div>
    </main>
  );
}
