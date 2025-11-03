// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Star } from "lucide-react";
// import SanPhamLienQuanSection from "@/app/components/sanpham_lienquan";
// import ThemVaoGioHang from "@/app/components/themvaogiohang";
// import Header from "@/app/components/Header";

// /* Component: Một đánh giá đơn lẻ*/
// function DanhGiaItem({ dg }: { dg: any }) {
//   return (
//     <div className="border-b border-gray-200 pb-4">
//       <p className="font-medium text-gray-800">{dg.nguoi_dung?.ho_ten}</p>
//       <div className="flex items-center text-yellow-500 mb-1">
//         {Array(5)
//           .fill(0)
//           .map((_, i) => (
//             <Star
//               key={i}
//               className={`w-4 h-4 ${
//                 i < dg.sao ? "fill-yellow-400" : "text-gray-300"
//               }`}
//             />
//           ))}
//         <span className="ml-2 text-sm text-gray-600">{dg.sao}/5</span>
//       </div>
//       <p className="text-gray-700">{dg.noi_dung}</p>
//       <p className="text-xs text-gray-400 mt-1">
//         {new Date(dg.thoi_gian).toLocaleDateString("vi-VN")}
//       </p>
//     </div>
//   );
// }

// /* ───────────────────────────────
// 🔹 Component: Form viết đánh giá mới
// ──────────────────────────────── */
// function BinhLuanMoi({
//   idSanPham,
//   idNguoiDung,
//   onGuiThanhCong,
// }: {
//   idSanPham: number;
//   idNguoiDung: number | null;
//   onGuiThanhCong: () => void;
// }) {
//   const [soSao, setSoSao] = useState(0);
//   const [noiDung, setNoiDung] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!idNguoiDung) {
//       alert("⚠️ Bạn cần đăng nhập để gửi đánh giá!");
//       return;
//     }
//     if (!soSao || !noiDung.trim()) {
//       alert("Vui lòng chọn số sao và nhập nội dung!");
//       return;
//     }

//     setLoading(true);
//     const res = await fetch("/api/danh_gia", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         sao: soSao,
//         noi_dung: noiDung,
//         id_nguoi_dung: idNguoiDung,
//         id_san_pham: idSanPham, // ✅ dùng id_san_pham thay vì id_bien_the
//       }),
//     });
//     const data = await res.json();
//     setLoading(false);

//     if (data.success) {
//       alert("🎉 Gửi đánh giá thành công!");
//       setSoSao(0);
//       setNoiDung("");
//       onGuiThanhCong();
//     } else {
//       alert(data.message || "Đã xảy ra lỗi khi gửi đánh giá!");
//     }
//   };

//   return (
//     <div className="bg-white border rounded-xl p-6">
//       <div className="flex flex-col items-center mb-4">
//         <div className="flex text-yellow-500 mb-2">
//           {Array(5)
//             .fill(0)
//             .map((_, i) => (
//               <Star
//                 key={i}
//                 onClick={() => setSoSao(i + 1)}
//                 className={`w-7 h-7 cursor-pointer ${
//                   i < soSao ? "fill-yellow-400" : "text-gray-300"
//                 }`}
//               />
//             ))}
//         </div>
//         <span className="text-sm text-gray-600">(Chọn số sao đánh giá)</span>
//       </div>

//       <textarea
//         placeholder="Nhập cảm nhận của bạn..."
//         value={noiDung}
//         onChange={(e) => setNoiDung(e.target.value)}
//         rows={4}
//         className="w-full border-b focus:outline-none p-2 mb-4"
//       />
//       <div className="text-right">
//         <button
//           disabled={loading}
//           onClick={handleSubmit}
//           className="bg-[#146D3A] text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
//         >
//           {loading ? "Đang gửi..." : "Gửi đánh giá"}
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ───────────────────────────────
// 🔹 Trang Chi Tiết Sản Phẩm
// ──────────────────────────────── */
// export default function ChiTietSanPhamPage() {
//   const { id } = useParams();
//   const [data, setData] = useState<any>(null);
//   const [openPopup, setOpenPopup] = useState(false);
//   const [mainImage, setMainImage] = useState<string>("");
//   const [activeTab, setActiveTab] = useState<"danhgia" | "viet">("danhgia");
//   const [user, setUser] = useState<any>(null); // 👈 user đăng nhập
//   const [refreshFlag, setRefreshFlag] = useState(0);

//   const fetchData = async () => {
//     const res = await fetch(`/api/chi_tiet/${id}`);
//     const json = await res.json();
//     setData(json);
//     setMainImage(json.san_pham.hinh);
//   };

//   const fetchUser = async () => {
//     const res = await fetch("/api/nguoi_dung/me");
//     if (res.ok) {
//       const u = await res.json();
//       setUser(u.data);
//     }
//   };

//   useEffect(() => {
//     if (!id) return;
//     fetchData();
//     fetchUser();
//   }, [id, refreshFlag]);

//   if (!data)
//     return (
//       <div className="p-6 text-gray-500 text-center mt-[var(--header-h)]">
//         Đang tải sản phẩm...
//       </div>
//     );

//   const { san_pham, danh_gia, lien_quan } = data;
//   const trungBinhSao =
//     danh_gia.length > 0
//       ? danh_gia.reduce((a: number, b: any) => a + b.sao, 0) /
//         danh_gia.length
//       : 0;

//   return (
//     <main className="bg-[#FBEAEA] min-h-screen pt-[60px]">
//       <div className="sticky top-25 z-50">
//         <Header />
//       </div>

//       {/* Thông tin sản phẩm */}
//       <div className="max-w-[80%] mx-auto mt-6 mb-10">
//         <div className="bg-white shadow-lg rounded-2xl px-6 py-6 grid md:grid-cols-2 gap-6">
//           {/* Hình ảnh */}
//           <div className="flex flex-col items-center">
//             <img
//               src={mainImage}
//               alt={san_pham.ten}
//               className="w-[400px] h-[400px] object-cover rounded-xl shadow"
//             />
//           </div>

//           {/* Thông tin */}
//           <div className="flex flex-col justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-[#6A0A0A] mb-2">
//                 {san_pham.ten}
//               </h1>
//               <div className="flex items-center mb-2">
//                 <div className="flex items-center text-yellow-500 mr-2">
//                   <Star className="w-5 h-5 fill-yellow-400 mr-1" />
//                   <span className="text-base font-medium text-[#6A0A0A]">
//                     {trungBinhSao.toFixed(1)}
//                   </span>
//                 </div>
//                 <span className="text-gray-600 text-sm">
//                   ({danh_gia.length} đánh giá)
//                 </span>
//               </div>
//               <p className="text-xl font-semibold text-[#D22B2B] mb-3">
//                 {san_pham.gia_goc?.toLocaleString("vi-VN")}₫
//               </p>
//               <p className="text-gray-700 text-sm leading-relaxed">
//                 {san_pham.mo_ta ||
//                   "Thưởng thức hương vị đậm đà, hấp dẫn cùng HanFoodie."}
//               </p>
//             </div>
//             <button
//               onClick={() => setOpenPopup(true)}
//               className="bg-[#D33C3C] hover:bg-[#b53030] text-white rounded-full px-4 py-2 text-sm font-medium transition mt-3 w-fit"
//             >
//               Thêm vào giỏ hàng
//             </button>
//           </div>
//         </div>

//         {openPopup && (
//           <ThemVaoGioHang data={data} onClose={() => setOpenPopup(false)} />
//         )}
//       </div>

//       {/* Tabs đánh giá */}
//       <section className="max-w-[80%] mx-auto bg-white p-6 rounded-xl shadow mb-12">
//         <h2 className="text-2xl font-semibold text-[#6A0A0A] mb-5 text-left">
//           Đánh giá & Bình luận
//         </h2>

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
//               activeTab === "viet"
//                 ? "border-[#146D3A] text-[#146D3A]"
//                 : "border-gray-300 text-gray-700"
//             }`}
//             onClick={() => setActiveTab("viet")}
//           >
//             Viết đánh giá
//           </button>
//         </div>

//         {activeTab === "danhgia" ? (
//           danh_gia.length > 0 ? (
//             <div className="space-y-6">
//               {danh_gia.map((dg: any) => (
//                 <DanhGiaItem key={dg.id} dg={dg} />
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500 text-sm">Chưa có đánh giá nào.</p>
//           )
//         ) : (
//           <BinhLuanMoi
//             idSanPham={san_pham.id}
//             idNguoiDung={user?.id || null}
//             onGuiThanhCong={() => setRefreshFlag((v) => v + 1)}
//           />
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
import { IDanhGia, INguoiDung, ISanPham } from "@/app/lib/cautrucdata";

/* ───────────────────────────────
🔹 Kiểu dữ liệu cho API chi tiết
──────────────────────────────── */
interface IChiTietSanPhamResponse {
  san_pham: ISanPham;
  danh_gia: IDanhGia[];
  lien_quan: ISanPham[];
}

/* 🔹 Mở rộng kiểu IDanhGia để thêm thông tin người dùng */
interface IDanhGiaMoRong extends IDanhGia {
  nguoi_dung?: {
    id: number;
    ho_ten: string;
    tep_khach?: string | null;
  };
}

/* ───────────────────────────────
🔹 Một đánh giá đơn lẻ
──────────────────────────────── */
function DanhGiaItem({ dg }: { dg: IDanhGiaMoRong }) {
  return (
    <div className="border-b border-gray-200 pb-4">
      <p className="font-medium text-gray-800">{dg.nguoi_dung?.ho_ten}</p>
      <div className="flex items-center text-yellow-500 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < dg.sao ? "⭐" : "☆"}</span>
        ))}
      </div>
      <p className="text-gray-700">{dg.noi_dung}</p>
    </div>
  );
}

/* ───────────────────────────────
🔹 Form viết đánh giá mới
──────────────────────────────── */
interface BinhLuanMoiProps {
  idSanPham: number;
  idNguoiDung: number | null;
  onGuiThanhCong: () => void;
}

function BinhLuanMoi({
  idSanPham,
  idNguoiDung,
  onGuiThanhCong,
}: BinhLuanMoiProps) {
  const [soSao, setSoSao] = useState<number>(0);
  const [noiDung, setNoiDung] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
        id_san_pham: idSanPham,
      }),
    });
    const data = (await res.json()) as { success: boolean; message?: string };

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
          {Array.from({ length: 5 }).map((_, i) => (
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
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IChiTietSanPhamResponse | null>(null);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const [mainImage, setMainImage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"danhgia" | "viet">("danhgia");
  const [user, setUser] = useState<INguoiDung | null>(null);
  const [refreshFlag, setRefreshFlag] = useState<number>(0);

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

  useEffect(() => {
    if (!id) return;
    fetchData();
    fetchUser();
  }, [id, refreshFlag]);

  if (!data) {
    return (
      <div className="p-6 text-gray-500 text-center mt-[var(--header-h)]">
        Đang tải sản phẩm...
      </div>
    );
  }

  const { san_pham, danh_gia, lien_quan } = data;
  const trungBinhSao =
    danh_gia.length > 0
      ? danh_gia.reduce((a, b) => a + b.sao, 0) / danh_gia.length
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
              {danh_gia.map((dg) => (
                <DanhGiaItem key={dg.id} dg={dg as IDanhGiaMoRong} />
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
