"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import SanPhamLienQuanSection from "@/app/components/sanpham_lienquan";
import ThemVaoGioHang from "@/app/components/themvaogiohang";
import Header from "@/app/components/Header";
import DanhMucSection from "@/app/components/danhmucsection";

export default function ChiTietSanPhamPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [mainImage, setMainImage] = useState<string>("");
  const [fade, setFade] = useState(false); // ✅ Thêm hiệu ứng fade khi đổi ảnh

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const res = await fetch(`/api/chi_tiet/${id}`);
      const json = await res.json();
      setData(json);
      setMainImage(json.san_pham.hinh); // ảnh chính mặc định
    };
    fetchData();
  }, [id]);

  if (!data) return <p className="text-center mt-20">Đang tải...</p>;

  const { san_pham, danh_gia, lien_quan } = data;
  const danhGiaHienThi = showAllReviews ? danh_gia : danh_gia.slice(0, 3);

  const trungBinhSao =
    danh_gia.length > 0
      ? danh_gia.reduce((a: number, b: any) => a + b.so_sao, 0) / danh_gia.length
      : 0;

  // ✅ Xử lý đổi ảnh chính có hiệu ứng fade
  const handleChangeImage = (src: string) => {
    if (src === mainImage) return;
    setFade(true);
    setTimeout(() => {
      setMainImage(src);
      setFade(false);
    }, 150);
  };

  return (
    <div className="bg-[#FBEAEA] min-h-screen">
      {/* Header & Danh mục */}
      <div className="sticky top-0 z-50">
        <Header />
        <DanhMucSection data={[]} /> {/* ✅ Truyền rỗng để không lỗi TypeScript */}
      </div>

      {/* Nội dung chi tiết */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ảnh phụ nhỏ */}
          <div className="flex flex-col gap-3 items-center">
            {[san_pham.hinh, san_pham.hinh2, san_pham.hinh3]
              .filter(Boolean)
              .map((h: string, i: number) => (
                <img
                  key={i}
                  src={h}
                  alt={`Ảnh ${i + 1}`}
                  className={`w-[35%] md:w-[33%] rounded-xl object-cover border cursor-pointer transition-all duration-200 hover:scale-105 ${
                    mainImage === h ? "ring-2 ring-[#D33C3C]" : ""
                  }`}
                  onClick={() => handleChangeImage(h)} // ✅ Click đổi ảnh
                />
              ))}
          </div>

          {/* Ảnh chính */}
          <div className="flex justify-center items-start">
            <img
              src={mainImage || san_pham.hinh || "/images/no-image.jpg"}
              alt={san_pham.ten}
              className={`w-full max-w-[500px] h-[450px] object-cover rounded-2xl shadow transition-all duration-300 ${
                fade ? "opacity-0 scale-95" : "opacity-100 scale-100"
              } hover:scale-[1.05]`} // ✅ Hover phóng nhẹ + fade khi đổi
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#6A0A0A] mb-2">
                {san_pham.ten}
              </h1>

              <div className="flex items-center mb-3">
                <div className="flex text-yellow-500 mr-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.round(trungBinhSao)
                            ? "fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <span className="text-gray-600">
                  ({danh_gia.length || 0} đánh giá)
                </span>
              </div>

              <p className="text-2xl font-semibold text-[#D22B2B] mb-3">
                {san_pham.gia_goc?.toLocaleString("vi-VN")}₫
              </p>

              <p className="text-gray-700 leading-relaxed">
                {san_pham.mo_ta ||
                  "Thưởng thức hương vị đậm đà, hấp dẫn cùng HanFoodie."}
              </p>
            </div>

            {/* Nút thêm vào giỏ hàng */}
            <button
              onClick={() => setOpenPopup(true)}
              className="bg-[#D33C3C] hover:bg-[#b53030] text-white rounded-full px-6 py-3 transition mt-6"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Popup thêm vào giỏ hàng */}
        {openPopup && (
          <ThemVaoGioHang data={data} onClose={() => setOpenPopup(false)} />
        )}

        {/* Mô tả & Đánh giá */}
        <section className="mt-16 bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-[#6A0A0A] mb-3">
            Mô tả sản phẩm
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            {san_pham.mo_ta_dai || san_pham.mo_ta}
          </p>

          <h2 className="text-2xl font-semibold text-[#6A0A0A] mb-3">
            Đánh giá của khách hàng
          </h2>

          {/* Tổng quan sao */}
          <div className="flex items-center mb-6">
            <span className="text-xl font-bold mr-2">
              {trungBinhSao.toFixed(1)}/5
            </span>
            <div className="flex text-yellow-500 mr-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(trungBinhSao)
                        ? "fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <span className="text-gray-600">({danh_gia.length} đánh giá)</span>
          </div>

          {/* Danh sách đánh giá */}
          <div className="space-y-4">
            {danhGiaHienThi.map((dg: any) => (
              <div
                key={dg.id}
                className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-start gap-4"
              >
                <img
                  src={dg.nguoi_dung?.anh_dai_dien || "/images/avatar-default.png"}
                  alt={dg.nguoi_dung?.ho_ten}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">
                        {dg.nguoi_dung?.ho_ten}
                      </p>
                      <div className="flex text-yellow-500">
                        {Array(dg.so_sao || 4)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400" />
                          ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(dg.ngay_danh_gia).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <p className="text-gray-700 mt-1">{dg.noi_dung}</p>

                  <div className="flex items-center gap-4 mt-2 text-gray-600">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-[#D33C3C] transition">
                      <ThumbsUp size={16} /> {dg.like_count || 82}
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-[#D33C3C] transition">
                      <ThumbsDown size={16} /> {dg.dislike_count || 0}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Xem thêm */}
          {danh_gia.length > 3 && (
            <div className="text-center mt-6">
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="text-[#6A0A0A] underline hover:text-[#8B0000]"
              >
                {showAllReviews ? "Ẩn bớt" : "Xem thêm"}
              </button>
            </div>
          )}
        </section>

        {/* Sản phẩm liên quan */}
        <SanPhamLienQuanSection
          data={lien_quan}
          idDanhMuc={san_pham.id_danh_muc}
          idSanPham={san_pham.id}
        />
      </div>
    </div>
  );
}
