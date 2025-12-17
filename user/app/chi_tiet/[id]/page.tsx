// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { useParams } from "next/navigation";
// // // import { Star } from "lucide-react";
// // // import SanPhamLienQuanSection from "@/app/components/sanpham_lienquan";
// // // import ThemVaoGioHang from "@/app/components/themvaogiohang";
// // // import Header from "@/app/components/Header";
// // // import { IBienThe, IDanhGia, ILoaiTuyChon, IMonThem, INguoiDung, ISanPham, ITuyChon } from "@/app/lib/cautrucdata";
// // // import LoginForm from "@/app/components/dangnhap";
// // // import RegisterForm from "@/app/components/dang_ky";


// // // interface IHinhSanPham {
// // //   id: number;
// // //   hinh: string;
// // // }

// // // interface IChiTietSanPhamResponse {
// // //   san_pham: ISanPham;
// // //   danh_gia: IDanhGia[];
// // //   lien_quan: ISanPham[];
// // //   hinh_phu: IHinhSanPham[];
// // // }
// // // interface ILoaiTuyChonMoRong extends ILoaiTuyChon {
// // //   tuy_chon?: ITuyChonMoRong[];
// // // }

// // // interface ITuyChonMoRong extends ITuyChon {
// // //   gia_them?: number | null;
// // // }
// // // interface ThemVaoGioHangProps {
// // //   data: {
// // //     san_pham: ISanPham;
// // //     bien_the?: IBienThe[];
// // //     mon_them?: IMonThem[];
// // //     tuy_chon?: ILoaiTuyChonMoRong[];
// // //   };
// // //   onClose: () => void;
// // //   onRequireLogin: (action: "cart" | "buy") => void;
// // // }


// // // interface IDanhGiaMoRong extends IDanhGia {
// // //   nguoi_dung?: {
// // //     id: number;
// // //     ho_ten: string;
// // //     tep_khach?: string | null;
// // //   };
// // // }


// // // const formatName = (name?: string) => {
// // //   if (!name || name.length < 2) return "***";
// // //   return name[0] + "*****" + name[name.length - 1];
// // // };


// // // function DanhGiaItem({ dg }: { dg: IDanhGiaMoRong }) {
// // //   return (
// // //     <div className="border-b border-gray-200 pb-4">
// // //       <p className="font-medium text-gray-800">
// // //         {formatName(dg.nguoi_dung?.ho_ten)}
// // //       </p>

// // //       <div className="flex items-center text-yellow-500 mb-1">
// // //         {Array.from({ length: 5 }).map((_, i) => (
// // //           <span key={i}>{i < dg.sao ? "⭐" : "☆"}</span>
// // //         ))}
// // //       </div>

// // //       <p className="text-gray-700">{dg.noi_dung}</p>
// // //     </div>
// // //   );
// // // }


// // // export default function ChiTietSanPhamPage() {
// // //   const { id } = useParams<{ id: string }>();

// // //   const [data, setData] = useState<IChiTietSanPhamResponse | null>(null);
// // //   const [openPopup, setOpenPopup] = useState(false);
// // //   const [mainImage, setMainImage] = useState("");
// // //   const [user, setUser] = useState<INguoiDung | null>(null);
// // //   const [refreshFlag, setRefreshFlag] = useState(0);

// // //   const [selectedStar, setSelectedStar] = useState<number | null>(null);
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const itemsPerPage = 5;

// // //   const [showLoginPopup, setShowLoginPopup] = useState(false);
// // //   const [pendingAction, setPendingAction] = useState<"cart" | "buy" | null>(null);
// // //   const [isLogin, setIsLogin] = useState(true);



// // //   const fetchData = async () => {
// // //     const res = await fetch(`/api/chi_tiet/${id}`);
// // //     const json = (await res.json()) as IChiTietSanPhamResponse;
// // //     setData(json);
// // //     setMainImage(json.san_pham.hinh);
// // //   };

// // //   const fetchUser = async () => {
// // //     const res = await fetch("/api/nguoi_dung/me");
// // //     if (res.ok) {
// // //       const u = (await res.json()) as { data: INguoiDung };
// // //       setUser(u.data);
// // //     }
// // //   };

// // //   //  Tăng lượt xem
// // //   const updateViews = async () => {
// // //     await fetch(`/api/chi_tiet/${id}`, { method: "PUT" });
// // //   };

// // //   useEffect(() => {
// // //     if (!id) return;
// // //     fetchData();
// // //     fetchUser();
// // //     updateViews();
// // //   }, [id, refreshFlag]);

// // //   if (!data) {
// // //     return (
// // //       <div className="p-6 text-gray-500 text-center mt-[var(--header-h)]">
// // //         Đang tải sản phẩm...
// // //       </div>
// // //     );
// // //   }

// // //   const { san_pham, danh_gia, lien_quan, hinh_phu } = data;

// // //   const trungBinhSao =
// // //     danh_gia.length > 0
// // //       ? danh_gia.reduce((a, b) => a + b.sao, 0) / danh_gia.length
// // //       : 0;

// // //   const danhGiaLoc =
// // //     selectedStar !== null
// // //       ? danh_gia.filter((dg) => dg.sao === selectedStar)
// // //       : danh_gia;

// // //   const totalPages = Math.ceil(danhGiaLoc.length / itemsPerPage);
// // //   const startIdx = (currentPage - 1) * itemsPerPage;
// // //   const danhGiaHienThi = danhGiaLoc.slice(startIdx, startIdx + itemsPerPage);

// // //   return (
// // //     <main className="bg-[#FBEAEA] min-h-screen">
// // //       <div className="sticky top-0 z-50">
// // //         <Header />
// // //       </div>

// // //       <div className="w-full mt-6 mb-[15px]">
// // //         <div className="bg-white shadow-lg rounded-2xl px-10 py-10 grid grid-cols-[2fr_1fr] gap-10 relative">

// // //           {/* Ảnh */}
// // //           <div className="flex gap-6">
// // //             <div className="flex flex-col gap-4">
// // //               {hinh_phu.length > 0 ? (
// // //                 hinh_phu.map((img) => (
// // //                   <img
// // //                     key={img.id}
// // //                     src={img.hinh}
// // //                     onClick={() => setMainImage(img.hinh)}
// // //                     className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${img.hinh === mainImage
// // //                         ? "border-red-500 scale-105"
// // //                         : "border-transparent hover:border-gray-300"
// // //                       }`}
// // //                   />
// // //                 ))
// // //               ) : (
// // //                 <img src={mainImage} className="w-20 h-20 rounded-lg opacity-50" />
// // //               )}
// // //             </div>

// // //             <img
// // //               src={mainImage}
// // //               alt={san_pham.ten}
// // //               className="w-[500px] h-[400px] object-cover rounded-xl shadow-lg" />
// // //           </div>

// // //           <div className="flex flex-col justify-between relative">
// // //             <div>
// // //               <h1 className="text-3xl font-bold text-[#6A0A0A] mb-4">
// // //                 {san_pham.ten}
// // //               </h1>

// // //               <div className="flex items-center mb-3">
// // //                 <Star className="w-5 h-5 fill-yellow-400 mr-1" />
// // //                 <span className="font-medium">{trungBinhSao.toFixed(1)}</span>
// // //                 <span className="text-gray-600 ml-2">
// // //                   ({danh_gia.length} đánh giá)
// // //                 </span>
// // //               </div>

// // //               <p className="text-sm text-gray-600 mb-2">
// // //                 👁️ {" "}
// // //                 <span className="font-medium text-[#6A0A0A]">
// // //                   {san_pham.luot_xem?.toLocaleString("vi-VN") || 0}
// // //                 </span>
// // //               </p>

// // //               <p className="text-2xl text-[#D22B2B] font-semibold mb-4">
// // //                 {san_pham.gia_goc?.toLocaleString("vi-VN")}₫
// // //               </p>

// // //               <p className="text-sm text-gray-700 mb-1">{san_pham.tag}</p>
// // //               <p className="text-sm text-gray-700 mb-3">{san_pham.phong_cach}</p>
// // //               <p className="text-gray-700 text-sm">{san_pham.mo_ta}</p>
// // //             </div>

// // //             <button
// // //               onClick={() => setOpenPopup(true)}
// // //               className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-md mt-4"
// // //             >
// // //               Thêm vào giỏ hàng
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* {openPopup && (
// // //           <ThemVaoGioHang data={data} onClose={() => setOpenPopup(false)} />
// // //         )} */}

// // //         {openPopup && (
// // //           <ThemVaoGioHang
// // //             data={data}
// // //             onClose={() => setOpenPopup(false)}
// // //             onRequireLogin={(action) => {
// // //               setOpenPopup(false); 
// // //               setPendingAction(action); 
// // //               setShowLoginPopup(true); 
// // //             }}
// // //           />
// // //         )}

// // //       </div>

// // //       {/* Đánh giá */}
// // //       <section className="bg-white p-6 rounded-xl shadow px-10 mb-[15px]">
// // //         <h2 className="text-2xl font-semibold text-[#6A0A0A] mb-5">Đánh giá & Bình luận</h2>

// // //         {/* Lọc */}
// // //         <div className="flex flex-wrap gap-3 mb-6">
// // //           <button
// // //             onClick={() => {
// // //               setSelectedStar(null);
// // //               setCurrentPage(1);
// // //             }}
// // //             className={`px-4 py-2 border rounded-md text-sm ${selectedStar === null ? "border-red-500 text-red-500" : ""
// // //               }`}
// // //           >
// // //             Tất cả ({danh_gia.length})
// // //           </button>

// // //           {[5, 4, 3, 2, 1].map((sao) => (
// // //             <button
// // //               key={sao}
// // //               onClick={() => {
// // //                 setSelectedStar(sao);
// // //                 setCurrentPage(1);
// // //               }}
// // //               className={`px-4 py-2 border rounded-md text-sm ${selectedStar === sao ? "border-red-500 text-red-500" : ""
// // //                 }`}>
// // //               {sao} Sao ({danh_gia.filter((dg) => dg.sao === sao).length})
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {danhGiaHienThi.length > 0 ? (
// // //           <div className="space-y-6">
// // //             {danhGiaHienThi.map((dg) => (
// // //               <DanhGiaItem key={dg.id} dg={dg as IDanhGiaMoRong} />
// // //             ))}
// // //           </div>
// // //         ) : (
// // //           <p className="text-gray-500">Chưa có đánh giá nào.</p>
// // //         )}

// // //         {/* Phân trang */}
// // //         {totalPages > 1 && (
// // //           <div className="flex justify-center mt-6 gap-2">
// // //             {Array.from({ length: totalPages }).map((_, i) => (
// // //               <button
// // //                 key={i}
// // //                 onClick={() => setCurrentPage(i + 1)}
// // //                 className={`px-3 py-1 rounded-md border text-sm ${currentPage === i + 1
// // //                     ? "border-red-500 bg-red-500 text-white"
// // //                     : "hover:border-red-500"
// // //                   }`} >
// // //                 {i + 1}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </section>
// // //       {showLoginPopup && (
// // //         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
// // //           <div
// // //             className="bg-white p-5 rounded-xl shadow-lg relative w-[90%] max-w-md"
// // //             onClick={(e) => e.stopPropagation()}>
// // //             <button
// // //               onClick={() => setShowLoginPopup(false)}
// // //               className="absolute top-2 right-2 text-gray-500 hover:text-black" >
// // //               ✕
// // //             </button>

// // //             {isLogin ? (
// // //               <LoginForm
// // //                 onClose={() => setShowLoginPopup(false)}
// // //                 onLoginSuccess={() => {
// // //                   setShowLoginPopup(false);
// // //                   if (pendingAction === "cart") setOpenPopup(true);
// // //                   else if (pendingAction === "buy") window.location.href = "/dat_hang";
// // //                   setPendingAction(null);
// // //                 }}
// // //                 onSwitchToRegister={() => setIsLogin(false)} />
// // //             ) : (
// // //               <RegisterForm
// // //                 onClose={() => setShowLoginPopup(false)}
// // //                 onRegisterSuccess={() => {
// // //                   setIsLogin(true);
// // //                 }}
// // //                 onSwitchToLogin={() => setIsLogin(true)}
// // //               />
// // //             )}

// // //           </div>
// // //         </div>
// // //       )}


// // //       <SanPhamLienQuanSection
// // //         data={lien_quan}
// // //         idDanhMuc={san_pham.id_danh_muc}
// // //         idSanPham={san_pham.id} />
// // //     </main>
// // //   );
// // // }






// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";
// // import { Star } from "lucide-react";
// // import SanPhamLienQuanSection from "@/app/components/sanpham_lienquan";
// // import ThemVaoGioHang from "@/app/components/themvaogiohang";
// // import Header from "@/app/components/Header";
// // import { IBienThe, IDanhGia, ILoaiTuyChon, IMonThem, INguoiDung, ISanPham, ITuyChon } from "@/app/lib/cautrucdata";
// // import LoginForm from "@/app/components/dangnhap";
// // import RegisterForm from "@/app/components/dang_ky";


// // interface IHinhSanPham {
// //   id: number;
// //   hinh: string;
// // }

// // interface IChiTietSanPhamResponse {
// //   san_pham: ISanPham;
// //   danh_gia: IDanhGia[];
// //   lien_quan: ISanPham[];
// //   hinh_phu: IHinhSanPham[];
// // }
// // interface ILoaiTuyChonMoRong extends ILoaiTuyChon {
// //   tuy_chon?: ITuyChonMoRong[];
// // }

// // interface ITuyChonMoRong extends ITuyChon {
// //   gia_them?: number | null;
// // }
// // interface ThemVaoGioHangProps {
// //   data: {
// //     san_pham: ISanPham;
// //     bien_the?: IBienThe[];
// //     mon_them?: IMonThem[];
// //     tuy_chon?: ILoaiTuyChonMoRong[];
// //   };
// //   onClose: () => void;
// //   onRequireLogin: (action: "cart" | "buy") => void;

// // }


// // interface IDanhGiaMoRong extends IDanhGia {
// //   nguoi_dung?: {
// //     id: number;
// //     ho_ten: string;
// //     tep_khach?: string | null;
// //   };
// //   json_hinh?: string | null;
// // }


// // const formatName = (name?: string) => {
// //   if (!name || name.length < 2) return "***";
// //   return name[0] + "*****" + name[name.length - 1];
// // };


// // function DanhGiaItem({ dg }: { dg: IDanhGiaMoRong }) {
// //   return (
// //     <div className="border-b border-gray-200 pb-4">
// //       <p className="font-medium text-gray-800">
// //         {formatName(dg.nguoi_dung?.ho_ten)}
// //       </p>

// //       <div className="flex items-center text-yellow-500 mb-1">
// //         {Array.from({ length: 5 }).map((_, i) => (
// //           <span key={i}>{i < dg.sao ? "⭐" : "☆"}</span>
// //         ))}
// //       </div>

// //       <p className="text-gray-700">{dg.noi_dung}</p>
// //     </div>
// //   );
// // }


// // export default function ChiTietSanPhamPage() {
// //   const { id } = useParams<{ id: string }>();

// //   const [data, setData] = useState<IChiTietSanPhamResponse | null>(null);
// //   const [openPopup, setOpenPopup] = useState(false);
// //   const [mainImage, setMainImage] = useState("");
// //   const [user, setUser] = useState<INguoiDung | null>(null);
// //   const [refreshFlag, setRefreshFlag] = useState(0);

// //   const [selectedStar, setSelectedStar] = useState<number | null>(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 5;

// //   const [showLoginPopup, setShowLoginPopup] = useState(false);
// //   const [pendingAction, setPendingAction] = useState<"cart" | "buy" | null>(null);
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [savedCallback, setSavedCallback] = useState<(() => void) | null>(null);




// //   const fetchData = async () => {
// //     const res = await fetch(`/api/chi_tiet/${id}`);
// //     const json = (await res.json()) as IChiTietSanPhamResponse;
// //     setData(json);
// //     setMainImage(json.san_pham.hinh);
// //   };

// //   const fetchUser = async () => {
// //     const res = await fetch("/api/nguoi_dung/me");
// //     if (res.ok) {
// //       const u = (await res.json()) as { data: INguoiDung };
// //       setUser(u.data);
// //     }
// //   };

// //   //  Tăng lượt xem
// //   const updateViews = async () => {
// //     await fetch(`/api/chi_tiet/${id}`, { method: "PUT" });
// //   };

// //   useEffect(() => {
// //     if (!id) return;
// //     fetchData();
// //     fetchUser();
// //     updateViews();
// //   }, [id, refreshFlag]);

// //   if (!data) {
// //     return (
// //       <div className="p-6 text-gray-500 text-center mt-[var(--header-h)]">
// //         Đang tải sản phẩm...
// //       </div>
// //     );
// //   }

// //   const { san_pham, danh_gia, lien_quan, hinh_phu } = data;

// //   const trungBinhSao =
// //     danh_gia.length > 0
// //       ? danh_gia.reduce((a, b) => a + b.sao, 0) / danh_gia.length
// //       : 0;

// //   const danhGiaLoc =
// //     selectedStar !== null
// //       ? danh_gia.filter((dg) => dg.sao === selectedStar)
// //       : danh_gia;

// //   const totalPages = Math.ceil(danhGiaLoc.length / itemsPerPage);
// //   const startIdx = (currentPage - 1) * itemsPerPage;
// //   const danhGiaHienThi = danhGiaLoc.slice(startIdx, startIdx + itemsPerPage);

// //   return (
// //     <main className="bg-[#FBEAEA] min-h-screen">
// //       <div className="sticky top-0 z-50">
// //         <Header />
// //       </div>

// //       <div className="w-full mt-6 mb-[15px]">
// //         <div className="bg-white shadow-lg rounded-2xl px-10 py-10 grid grid-cols-[2fr_1fr] gap-10 relative">

// //           <div className="flex gap-6">
// //             <div className="flex flex-col gap-4">
// //               {hinh_phu.length > 0 ? (
// //                 hinh_phu.map((img) => (
// //                   <img
// //                     key={img.id}
// //                     src={img.hinh}
// //                     onClick={() => setMainImage(img.hinh)}
// //                     className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${img.hinh === mainImage
// //                       ? "border-red-500 scale-105"
// //                       : "border-transparent hover:border-gray-300"
// //                       }`}
// //                   />
// //                 ))
// //               ) : (
// //                 <img src={mainImage} className="w-20 h-20 rounded-lg opacity-50" />
// //               )}
// //             </div>

// //             <img
// //               src={mainImage}
// //               alt={san_pham.ten}
// //               className="w-[500px] h-[400px] object-cover rounded-xl shadow-lg" />
// //           </div>

// //           <div className="flex flex-col justify-between relative">
// //             <div>
// //               <h1 className="text-3xl font-bold text-[#6A0A0A] mb-4">
// //                 {san_pham.ten}
// //               </h1>

// //               <div className="flex items-center mb-3">
// //                 <Star className="w-5 h-5 fill-yellow-400 mr-1" />
// //                 <span className="font-medium">{trungBinhSao.toFixed(1)}</span>
// //                 <span className="text-gray-600 ml-2">
// //                   ({danh_gia.length} đánh giá)
// //                 </span>
// //               </div>

// //               <p className="text-sm text-gray-600 mb-2">
// //                 👁️ {" "}
// //                 <span className="font-medium text-[#6A0A0A]">
// //                   {san_pham.luot_xem?.toLocaleString("vi-VN") || 0}
// //                 </span>
// //               </p>

// //               <p className="text-2xl text-[#D22B2B] font-semibold mb-4">
// //                 {san_pham.gia_goc?.toLocaleString("vi-VN")}₫
// //               </p>

// //               <p className="text-sm text-gray-700 mb-1">{san_pham.tag}</p>
// //               <p className="text-sm text-gray-700 mb-3">{san_pham.phong_cach}</p>
// //               <p className="text-gray-700 text-sm">{san_pham.mo_ta}</p>
// //             </div>

// //             <button
// //               onClick={() => setOpenPopup(true)}
// //               className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-md mt-4">
// //               Thêm vào giỏ hàng
// //             </button>
// //           </div>
// //         </div>

// //         {openPopup && (
// //           <ThemVaoGioHang
// //             data={data}
// //             onClose={() => setOpenPopup(false)}
// //             onRequireLogin={(action) => {
// //               setPendingAction(action);
// //               setShowLoginPopup(true);
// //             }}
// //             onActionRequest={(callback) => setSavedCallback(() => callback)}
// //           />
// //         )}
// //       </div>

// //       {/* Đánh giá */}
// //       <section className="bg-white p-6 rounded-xl shadow px-10 mb-[15px]">
// //         <h2 className="text-2xl font-semibold text-[#6A0A0A] mb-5">Đánh giá & Bình luận</h2>

// //         {/* Lọc */}
// //         <div className="flex flex-wrap gap-3 mb-6">
// //           <button
// //             onClick={() => {
// //               setSelectedStar(null);
// //               setCurrentPage(1);
// //             }}
// //             className={`px-4 py-2 border rounded-md text-sm ${selectedStar === null ? "border-red-500 text-red-500" : ""
// //               }`}>
// //             Tất cả ({danh_gia.length})
// //           </button>

// //           {[5, 4, 3, 2, 1].map((sao) => (
// //             <button
// //               key={sao}
// //               onClick={() => {
// //                 setSelectedStar(sao);
// //                 setCurrentPage(1);
// //               }}
// //               className={`px-4 py-2 border rounded-md text-sm ${selectedStar === sao ? "border-red-500 text-red-500" : ""
// //                 }`}>
// //               {sao} Sao ({danh_gia.filter((dg) => dg.sao === sao).length})
// //             </button>
// //           ))}
// //         </div>

// //         {danhGiaHienThi.length > 0 ? (
// //           <div className="space-y-6">
// //             {danhGiaHienThi.map((dg) => (
// //               <DanhGiaItem key={dg.id} dg={dg as IDanhGiaMoRong} />
// //             ))}
// //           </div>
// //         ) : (
// //           <p className="text-gray-500">Chưa có đánh giá nào.</p>
// //         )}

// //         {/* Phân trang */}
// //         {totalPages > 1 && (
// //           <div className="flex justify-center mt-6 gap-2">
// //             {Array.from({ length: totalPages }).map((_, i) => (
// //               <button
// //                 key={i}
// //                 onClick={() => setCurrentPage(i + 1)}
// //                 className={`px-3 py-1 rounded-md border text-sm ${currentPage === i + 1
// //                   ? "border-red-500 bg-red-500 text-white"
// //                   : "hover:border-red-500"
// //                   }`} >
// //                 {i + 1}
// //               </button>
// //             ))}
// //           </div>
// //         )}
// //       </section>
// //       {showLoginPopup && (
// //         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
// //           <div className="bg-white p-5 rounded-xl shadow-lg relative w-[90%] max-w-md"
// //             onClick={(e) => e.stopPropagation()}>
// //             <button
// //               onClick={() => setShowLoginPopup(false)}
// //               className="absolute top-2 right-2 text-gray-500 hover:text-black" >
// //               ✕
// //             </button>

// //             {isLogin ? (
// //               <LoginForm
// //                 onClose={() => setShowLoginPopup(false)}
// //                 onLoginSuccess={() => {
// //                   setShowLoginPopup(false);

// //                   if (savedCallback) {
// //                     savedCallback();
// //                     setSavedCallback(null);
// //                   }
// //                   setPendingAction(null);
// //                 }}

// //                 onSwitchToRegister={() => setIsLogin(false)} />
// //             ) : (
// //               <RegisterForm
// //                 onClose={() => setShowLoginPopup(false)}
// //                 onRegisterSuccess={() => {
// //                   setIsLogin(true);
// //                 }}
// //                 onSwitchToLogin={() => setIsLogin(true)} />
// //             )}

// //           </div>
// //         </div>
// //       )}

// //       <SanPhamLienQuanSection
// //         data={lien_quan}
// //         idDanhMuc={san_pham.id_danh_muc}
// //         idSanPham={san_pham.id} />
// //     </main>
// //   );
// // }
// "use client";
// import { Eye } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Star } from "lucide-react";
// import SanPhamLienQuanSection from "@/app/components/sanpham_lienquan";
// import ThemVaoGioHang from "@/app/components/themvaogiohang";
// import Header from "@/app/components/Header";
// import {
//   IBienThe,
//   IDanhGia,
//   ILoaiTuyChon,
//   IMonThem,
//   INguoiDung,
//   ISanPham,
//   ITuyChon,
// } from "@/lib/cautrucdata";
// import LoginForm from "@/app/components/dangnhap";
// import RegisterForm from "@/app/components/dang_ky";

// interface IHinhSanPham {
//   id: number;
//   hinh: string;
// }

// interface IChiTietSanPhamResponse {
//   san_pham: ISanPham;
//   danh_gia: IDanhGia[];
//   lien_quan: ISanPham[];
//   hinh_phu: IHinhSanPham[];
// }

// interface ILoaiTuyChonMoRong extends ILoaiTuyChon {
//   tuy_chon?: ITuyChonMoRong[];
// }

// interface ITuyChonMoRong extends ITuyChon {
//   gia_them?: number | null;
// }

// interface ThemVaoGioHangProps {
//   data: {
//     san_pham: ISanPham;
//     bien_the?: IBienThe[];
//     mon_them?: IMonThem[];
//     tuy_chon?: ILoaiTuyChonMoRong[];
//   };
//   onClose: () => void;
//   onRequireLogin: (action: "cart" | "buy") => void;
// }

// interface IDanhGiaMoRong extends IDanhGia {
//   nguoi_dung?: {
//     id: number;
//     ho_ten: string;
//     tep_khach?: string | null;
//   };
//   json_hinh?: string | null;
// }
// /* ===========================================================
//    ⭐ COMPONENT HIỂN THỊ 1 ĐÁNH GIÁ (CÓ HÌNH)
//    =========================================================== */
// function DanhGiaItem({ dg }: { dg: IDanhGiaMoRong }) {
//   const imgs: string[] = [];

//   if (dg.hinh) imgs.push(dg.hinh);

//   return (
//     <div className="border-b border-gray-200 pb-4">
//       {/* ⭐ HIỂN THỊ TÊN THẬT */}
//       <p className="font-medium text-gray-800">
//         {dg.nguoi_dung?.ho_ten || "Người dùng"}
//       </p>

//       {/* Sao */}
//       <div className="flex items-center text-yellow-500 mb-1">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <span key={i}>{i < dg.sao ? "⭐" : "☆"}</span>
//         ))}
//       </div>

//       {/* Nội dung */}
//       <p className="text-gray-700 mb-2">{dg.noi_dung}</p>

//       {/* Ảnh đánh giá */}
//       {imgs.length > 0 && (
//         <div className="flex flex-wrap gap-3 mt-2">
//           {imgs.map((url, index) => (
//             <img
//               key={index}
//               src={url}
//               className="w-24 h-24 object-cover rounded-xl border shadow"
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


// /* ===========================================================
//    ⭐ TRANG CHI TIẾT SẢN PHẨM
//    =========================================================== */
// export default function ChiTietSanPhamPage() {
//   const { id } = useParams<{ id: string }>();

//   const [data, setData] = useState<IChiTietSanPhamResponse | null>(null);
//   const [openPopup, setOpenPopup] = useState(false);
//   const [mainImage, setMainImage] = useState("");
//   const [user, setUser] = useState<INguoiDung | null>(null);
//   const [refreshFlag, setRefreshFlag] = useState(0);

//   const [selectedStar, setSelectedStar] = useState<number | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [pendingAction, setPendingAction] = useState<"cart" | "buy" | null>(
//     null
//   );
//   const [isLogin, setIsLogin] = useState(true);
//   const [savedCallback, setSavedCallback] = useState<(() => void) | null>(null);

//   const fetchData = async () => {
//     const res = await fetch(`/api/chi_tiet/${id}`);
//     const json = (await res.json()) as IChiTietSanPhamResponse;
//     setData(json);
//     setMainImage(json.san_pham.hinh);
//   };

//   const fetchUser = async () => {
//     const res = await fetch("/api/nguoi_dung/me");
//     if (res.ok) {
//       const u = (await res.json()) as { data: INguoiDung };
//       setUser(u.data);
//     }
//   };

//   const updateViews = async () => {
//     await fetch(`/api/chi_tiet/${id}`, { method: "PUT" });
//   };

//   useEffect(() => {
//     if (!id) return;
//     fetchData();
//     fetchUser();
//     updateViews();
//   }, [id, refreshFlag]);

//   if (!data) {
//     return (
//       <div className="p-6 text-gray-500 text-center mt-[var(--header-h)]">
//         Đang tải sản phẩm...
//       </div>
//     );
//   }

//   const { san_pham, danh_gia, lien_quan, hinh_phu } = data;

//   const trungBinhSao =
//     danh_gia.length > 0
//       ? danh_gia.reduce((a, b) => a + b.sao, 0) / danh_gia.length
//       : 0;

//   const danhGiaLoc =
//     selectedStar !== null
//       ? danh_gia.filter((dg) => dg.sao === selectedStar)
//       : danh_gia;

//   const totalPages = Math.ceil(danhGiaLoc.length / itemsPerPage);
//   const startIdx = (currentPage - 1) * itemsPerPage;
//   const danhGiaHienThi = danhGiaLoc.slice(startIdx, startIdx + itemsPerPage);

//   return (
//     <main className="bg-[#FBEAEA] min-h-screen">
//       <div className="sticky top-0 z-50">
//         <Header />
//       </div>

//       <div className="w-full mt-6 mb-[15px]">
//         <div className="bg-white shadow-lg rounded-2xl px-10 py-10 grid grid-cols-[2fr_1fr] gap-10 relative">
//           <div className="flex gap-6">
//             <div className="flex flex-col gap-4">
//               {hinh_phu.length > 0 ? (
//                 hinh_phu.map((img) => (
//                   <img
//                     key={img.id}
//                     src={img.hinh}
//                     onMouseEnter={() => setMainImage(img.hinh)}
//                     className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
//                       img.hinh === mainImage
//                         ? "border-red-500 scale-105"
//                         : "border-transparent hover:border-gray-300"
//                     }`}
//                   />
//                 ))
//               ) : (
//                 <img
//                   src={mainImage}
//                   className="w-20 h-20 rounded-lg opacity-50"
//                 />
//               )}
//             </div>

//             <img
//               src={mainImage}
//               alt={san_pham.ten}
//               className="w-[500px] h-[400px] object-cover rounded-xl shadow-lg"
//             />
//           </div>

//           <div className="flex flex-col justify-between relative">
//             <div>
//               <h1 className="text-3xl font-bold text-[#6A0A0A] mb-4">
//                 {san_pham.ten}
//               </h1>

//               <div className="flex items-center mb-3">
//                 <Star className="w-5 h-5 mr-1 fill-yellow-400" strokeWidth={0} />
//                 <span className="font-medium">{trungBinhSao.toFixed(1)}</span>
//                 <span className="text-gray-600 ml-2">
//                   ({danh_gia.length} đánh giá)
//                 </span>
//               </div>

//               <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
//                 <Eye className="w-5 h-5 text-gray-700" />
//                 <span className="font-medium text-[#6A0A0A]">
//                   {san_pham.luot_xem?.toLocaleString("vi-VN") || 0}
//                 </span>
//               </p>


//               <p className="text-2xl text-[#D22B2B] font-semibold mb-4">
//                 {san_pham.gia_goc?.toLocaleString("vi-VN")}₫
//               </p>

//               <p className="text-sm text-gray-700 mb-1">{san_pham.tag}</p>
//               <p className="text-sm text-gray-700 mb-3">{san_pham.phong_cach}</p>
//               <p className="text-gray-700 text-sm">{san_pham.mo_ta}</p>
//             </div>

//             <button
//               onClick={() => setOpenPopup(true)}
//               className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-md mt-4"
//             >
//               Thêm vào giỏ hàng
//             </button>
//           </div>
//         </div>

//         {openPopup && (
//           <ThemVaoGioHang
//             data={data}
//             onClose={() => setOpenPopup(false)}
//             onRequireLogin={(action) => {
//               setPendingAction(action);
//               setShowLoginPopup(true);
//             }}
//             onActionRequest={(callback) => setSavedCallback(() => callback)}
//           />
//         )}
//       </div>

//       {/* ========================== ĐÁNH GIÁ SẢN PHẨM ========================== */}
//       <section className="bg-white p-6 rounded-xl shadow px-10 mb-[15px]">
//         <h2 className="text-2xl font-semibold text-[#6A0A0A] mb-5">
//           Đánh giá & Bình luận
//         </h2>

//         {/* Lọc sao */}
//         <div className="flex flex-wrap gap-3 mb-6">
//           <button
//             onClick={() => {
//               setSelectedStar(null);
//               setCurrentPage(1);
//             }}
//             className={`px-4 py-2 border rounded-md text-sm ${
//               selectedStar === null ? "border-red-500 text-red-500" : ""
//             }`}
//           >
//             Tất cả ({danh_gia.length})
//           </button>

//           {[5, 4, 3, 2, 1].map((sao) => (
//             <button
//               key={sao}
//               onClick={() => {
//                 setSelectedStar(sao);
//                 setCurrentPage(1);
//               }}
//               className={`px-4 py-2 border rounded-md text-sm ${
//                 selectedStar === sao ? "border-red-500 text-red-500" : ""
//               }`}
//             >
//               {sao} Sao ({danh_gia.filter((dg) => dg.sao === sao).length})
//             </button>
//           ))}
//         </div>

//         {/* Danh sách đánh giá */}
//         {danhGiaHienThi.length > 0 ? (
//           <div className="space-y-6">
//             {danhGiaHienThi.map((dg) => (
//               <DanhGiaItem key={dg.id} dg={dg as IDanhGiaMoRong} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-500">Chưa có đánh giá nào.</p>
//         )}

//         {/* Phân trang */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-6 gap-2">
//             {Array.from({ length: totalPages }).map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 rounded-md border text-sm ${
//                   currentPage === i + 1
//                     ? "border-red-500 bg-red-500 text-white"
//                     : ""
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Popup Login */}
//       {showLoginPopup && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
//           <div
//             className="bg-white p-5 rounded-xl shadow-lg relative w-[90%] max-w-md"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={() => setShowLoginPopup(false)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-black"
//             >
//               ✕
//             </button>

//             {isLogin ? (
//               <LoginForm
//                 onClose={() => setShowLoginPopup(false)}
//                 onLoginSuccess={() => {
//                   setShowLoginPopup(false);

//                   if (savedCallback) {
//                     savedCallback();
//                     setSavedCallback(null);
//                   }
//                   setPendingAction(null);
//                 }}
//                 onSwitchToRegister={() => setIsLogin(false)}
//               />
//             ) : (
//               <RegisterForm
//                 onClose={() => setShowLoginPopup(false)}
//                 onRegisterSuccess={() => {
//                   setIsLogin(true);
//                 }}
//                 onSwitchToLogin={() => setIsLogin(true)}
//               />
//             )}
//           </div>
//         </div>
//       )}

//       <SanPhamLienQuanSection
//         data={lien_quan}
//         idDanhMuc={san_pham.id_danh_muc}
//         idSanPham={san_pham.id}
//       />
//     </main>
//   );
// }


"use client";

import { Eye, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SanPhamLienQuanSection from "@/app/components/sanpham_lienquan";
import ThemVaoGioHang from "@/app/components/themvaogiohang";
import Header from "@/app/components/Header";
import LoginForm from "@/app/components/dangnhap";
import RegisterForm from "@/app/components/dang_ky";
import {
  IBienThe,
  IDanhGia,
  ILoaiTuyChon,
  IMonThem,
  INguoiDung,
  ISanPham,
  ITuyChon,
} from "@/lib/cautrucdata";

interface IHinhSanPham {
  id: number;
  hinh: string;
}

interface IChiTietSanPhamResponse {
  san_pham: ISanPham;
  danh_gia: IDanhGia[];
  lien_quan: ISanPham[];
  hinh_phu: IHinhSanPham[];
}

interface ILoaiTuyChonMoRong extends ILoaiTuyChon {
  tuy_chon?: ITuyChonMoRong[];
}

interface ITuyChonMoRong extends ITuyChon {
  gia_them?: number | null;
}

interface ThemVaoGioHangProps {
  data: {
    san_pham: ISanPham;
    bien_the?: IBienThe[];
    mon_them?: IMonThem[];
    tuy_chon?: ILoaiTuyChonMoRong[];
  };
  onClose: () => void;
  onRequireLogin: (action: "cart" | "buy") => void;
}

interface IDanhGiaMoRong extends IDanhGia {
  nguoi_dung?: {
    id: number;
    ho_ten: string;
    tep_khach?: string | null;
  };
  json_hinh?: string | null;
}

/* ====================== COMPONENT HIỂN THỊ 1 ĐÁNH GIÁ ====================== */
function DanhGiaItem({ dg }: { dg: IDanhGiaMoRong }) {
  const imgs: string[] = [];
  if (dg.hinh) imgs.push(dg.hinh);

  return (
    <div className="border-b border-gray-200 pb-4">
      <p className="font-medium text-gray-800">
        {dg.nguoi_dung?.ho_ten || "Người dùng"}
      </p>
      <div className="flex items-center text-yellow-500 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < dg.sao ? "⭐" : "☆"}</span>
        ))}
      </div>
      <p className="text-gray-700 mb-2">{dg.noi_dung}</p>
      {imgs.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-2">
          {imgs.map((url, index) => (
            <img
              key={index}
              src={url}
              className="w-24 h-24 object-cover rounded-xl border shadow"
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ====================== TRANG CHI TIẾT SẢN PHẨM ====================== */
export default function ChiTietSanPhamPage() {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<IChiTietSanPhamResponse | null>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [user, setUser] = useState<INguoiDung | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [pendingAction, setPendingAction] = useState<"cart" | "buy" | null>(
    null
  );
  const [isLogin, setIsLogin] = useState(true);
  const [savedCallback, setSavedCallback] = useState<(() => void) | null>(null);

  const fetchData = async () => {
    const res = await fetch(`/api/chi_tiet/${id}`);
    const json = (await res.json()) as IChiTietSanPhamResponse;
    setData(json);
    setMainImage(json.san_pham.hinh);
  };

  const fetchUser = async () => {
    const res = await fetch("/api/nguoi_dung/me");
    if (res.ok) {
      const u = (await res.json()) as { data: INguoiDung };
      setUser(u.data);
    }
  };

  const updateViews = async () => {
    await fetch(`/api/chi_tiet/${id}`, { method: "PUT" });
  };

  useEffect(() => {
    if (!id) return;
    fetchData();
    fetchUser();
    updateViews();
  }, [id, refreshFlag]);

  if (!data) {
    return (
      <div className="p-6 text-gray-500 text-center mt-[var(--header-h)]">
        Đang tải sản phẩm...
      </div>
    );
  }

  const { san_pham, danh_gia, lien_quan, hinh_phu } = data;

const isHetMon = san_pham.het_mon !== null;


  const trungBinhSao =
    danh_gia.length > 0
      ? danh_gia.reduce((a, b) => a + b.sao, 0) / danh_gia.length
      : 0;

  const danhGiaLoc =
    selectedStar !== null
      ? danh_gia.filter((dg) => dg.sao === selectedStar)
      : danh_gia;

  const totalPages = Math.ceil(danhGiaLoc.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const danhGiaHienThi = danhGiaLoc.slice(startIdx, startIdx + itemsPerPage);

  return (
    <main className="bg-[#FBEAEA] min-h-screen">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <div className="w-full mt-6 mb-[15px]">
        <div className="bg-white shadow-lg rounded-2xl px-10 py-10 grid grid-cols-[2fr_1fr] gap-10 relative">
          <div className="flex gap-6">
            <div className="flex flex-col gap-4">
              {hinh_phu.length > 0 ? (
                hinh_phu.map((img) => (
                  <img
                    key={img.id}
                    src={img.hinh}
                    onMouseEnter={() => !isHetMon && setMainImage(img.hinh)}
                    className={`w-20 h-20 object-cover rounded-lg border-2 transition ${
  img.hinh === mainImage
    ? "border-red-500 scale-105"
    : "border-transparent hover:border-gray-300"
} ${isHetMon ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}

                  />
                ))
              ) : (
                <img
                  src={mainImage}
                  className="w-20 h-20 rounded-lg opacity-50"
                />
              )}
            </div>

            <div className="relative w-[500px] h-[400px] rounded-xl shadow-lg overflow-hidden">
  <img
    src={mainImage}
    alt={san_pham.ten}
    className="w-full h-full object-cover"
  />

  {isHetMon && (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
      <span className="text-white text-3xl font-bold tracking-widest">
        HẾT MÓN
      </span>
    </div>
  )}
</div>

          </div>

          <div className="flex flex-col justify-between relative">
            <div>
              <h1 className="text-3xl font-bold text-[#6A0A0A] mb-4">
                {san_pham.ten}
              </h1>

              <div className="flex items-center mb-3">
                <Star className="w-5 h-5 mr-1 fill-yellow-400" strokeWidth={0} />
                <span className="font-medium">{trungBinhSao.toFixed(1)}</span>
                <span className="text-gray-600 ml-2">
                  ({danh_gia.length} đánh giá)
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                <Eye className="w-5 h-5 text-gray-700" />
                <span className="font-medium text-[#6A0A0A]">
                  {san_pham.luot_xem?.toLocaleString("vi-VN") || 0}
                </span>
              </p>

              <p className="text-2xl text-[#D22B2B] font-semibold mb-4">
                {san_pham.gia_goc?.toLocaleString("vi-VN")}₫
              </p>

              <p className="text-sm text-gray-700 mb-1">{san_pham.tag}</p>
              <p className="text-sm text-gray-700 mb-3">{san_pham.phong_cach}</p>
              <p className="text-gray-700 text-sm">{san_pham.mo_ta}</p>
            </div>

            <button
  onClick={() => !isHetMon && setOpenPopup(true)}
  disabled={isHetMon}
  className={`text-white px-6 py-2 rounded-full shadow-md mt-4 transition ${
    isHetMon
      ? "bg-red-300 cursor-not-allowed"
      : "bg-red-500 hover:bg-red-600"
  }`}
>
  Thêm vào giỏ hàng
</button>

          </div>
        </div>

        {openPopup && (
          <ThemVaoGioHang
            data={data}
            onClose={() => setOpenPopup(false)}
            onRequireLogin={(action) => {
              setPendingAction(action);
              setShowLoginPopup(true);
            }}
            onActionRequest={(callback) => setSavedCallback(() => callback)}
          />
        )}
      </div>

      {/* ========================== ĐÁNH GIÁ SẢN PHẨM ========================== */}
      <section className="bg-white p-6 rounded-xl shadow px-10 mb-[15px]">
        <h2 className="text-2xl font-semibold text-[#6A0A0A] mb-5">
          Đánh giá & Bình luận
        </h2>

        {/* Lọc sao */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => {
              setSelectedStar(null);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 border rounded-md text-sm ${
              selectedStar === null ? "border-red-500 text-red-500" : ""
            }`}
          >
            Tất cả ({danh_gia.length})
          </button>

          {[5, 4, 3, 2, 1].map((sao) => (
            <button
              key={sao}
              onClick={() => {
                setSelectedStar(sao);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 border rounded-md text-sm ${
                selectedStar === sao ? "border-red-500 text-red-500" : ""
              }`}
            >
              {sao} Sao ({danh_gia.filter((dg) => dg.sao === sao).length})
            </button>
          ))}
        </div>

        {/* Danh sách đánh giá */}
        {danhGiaHienThi.length > 0 ? (
          <div className="space-y-6">
            {danhGiaHienThi.map((dg) => (
              <DanhGiaItem key={dg.id} dg={dg as IDanhGiaMoRong} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Chưa có đánh giá nào.</p>
        )}

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md border text-sm ${
                  currentPage === i + 1
                    ? "border-red-500 bg-red-500 text-white"
                    : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Popup Login */}
      {showLoginPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div
            className="bg-white p-5 rounded-xl shadow-lg relative w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            {isLogin ? (
              <LoginForm
                onClose={() => setShowLoginPopup(false)}
                onLoginSuccess={() => {
                  setShowLoginPopup(false);
                  if (savedCallback) {
                    savedCallback();
                    setSavedCallback(null);
                  }
                  setPendingAction(null);
                }}
                onSwitchToRegister={() => setIsLogin(false)}
              />
            ) : (
              <RegisterForm
                onClose={() => setShowLoginPopup(false)}
                onRegisterSuccess={() => {
                  setIsLogin(true);
                }}
                onSwitchToLogin={() => setIsLogin(true)}
              />
            )}
          </div>
        </div>
      )}

      <SanPhamLienQuanSection
        data={lien_quan}
        idDanhMuc={san_pham.id_danh_muc}
        idSanPham={san_pham.id}
      />
    </main>
  );
}
