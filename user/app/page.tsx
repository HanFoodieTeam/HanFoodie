"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { IDanhMuc, ISanPham } from "./lib/cautrucdata";
import DanhMucSection from "./components/danhmucsection";
import SanPhamHotSection from "./components/sanphamsection";

export default function TrangChuPage() {
  const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
  const [spHot, setSpHot] = useState<ISanPham[]>([]);
  const [combo, setCombo] = useState<ISanPham[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resDM, resSP, resCombo] = await Promise.all([
          fetch("/api/danh_muc"),
          fetch("/api/trang_chu/sp_hot"),
          fetch("/api/trang_chu/combo"),
        ]);
        const [dmData, spData, comboData] = await Promise.all([
          resDM.json(),
          resSP.json(),
          resCombo.json(),
        ]);
        setDanhMuc(dmData);
        setSpHot(spData);
        setCombo(comboData);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="pt-[80px] text-center py-16 text-gray-500">
        Đang tải dữ liệu...
      </div>
    );

  return (
    // bg-gray-50
    <main className="">
      {/* BANNER CHÍNH */}

<section className="relative w-full flex justify-center bg-[#F7EDED]">
  <img
    src="/banner_chinh.png"
    alt="Banner Hàn Quốc"
    className="w-[960px] h-[400px] object-contain"
  />
</section>

      {/* NỘI DUNG CHÍNH */}
      <div className=" py-10 space-y-4 ">
        {/* DANH MỤC */}
        <DanhMucSection data={danhMuc} />

        {/* SẢN PHẨM NỔI BẬT */}
        <SanPhamHotSection data={spHot} />

        {/* BANNER PHỤ */}
        <section className="relative w-full h-[220px] md:h-[240px] overflow-hidden rounded-lg">
          <img
            src="/images/banner-home.jpg"
            alt="Banner"
            onError={(e) => {
              e.currentTarget.src = "/noimg.png";
            }}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">HanFoodie</h1>
            <p className="text-base md:text-lg">Ẩm thực giao tận tay bạn</p>
          </div>
        </section>

        {/* COMBO HẤP DẪN */}
        <section className="relative z-10">
          <h2 className="text-lg font-semibold mb-3">Combo hấp dẫn</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {combo.slice(0, 6).map((sp) => (
              <div
                key={sp.id}
                className="flex bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md overflow-hidden transition-all hover:-translate-y-1 h-[150px]">
                {/* Ảnh bên trái */}


                <div className="w-[40%] bg-gray-100 flex items-center justify-center overflow-hidden">
                  <Link href={`/chi_tiet/${sp.id}`} className="block">
                    <img
                      src={sp.hinh || "/noimg.png"}
                      alt={sp.ten}
                      className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105" />
                  </Link>

                </div>

                {/* Nội dung bên phải */}
                <div className="w-[60%] p-2 flex flex-col justify-between">
                  {/* Tiêu đề + mô tả */}
                  <Link href={`/chi_tiet/${sp.id}`} className="block">

                    <div>
                      <h3
                        className="font-semibold text-gray-800 text-[13px] leading-tight line-clamp-2 mb-[4px]"
                        title={sp.ten}>
                        {sp.ten}
                      </h3>
                      <p
                        className="text-[11px] text-gray-600 line-clamp-2"
                        title={sp.mo_ta}>
                        {sp.mo_ta || "Thưởng thức hương vị tuyệt hảo từ HanFoodie."}
                      </p>
                    </div>
                  </Link>

                  {/* Giá */}
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-medium text-gray-800">
                      Giá:{" "}
                      <span className="text-red-600 font-semibold">
                        {sp.gia_goc?.toLocaleString("vi-VN")}đ
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
