"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { IDanhMuc, ISanPham } from "./lib/cautrucdata";
import DanhMucSection from "./components/danhmucsection";


export default function TrangChuPage() {
  const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
  const [spHot, setSpHot] = useState<ISanPham[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resDM, resSP] = await Promise.all([
          fetch("/api/danh_muc"),
          fetch("/api/trang_chu/sp_hot"),
        ]);
        const [dmData, spData] = await Promise.all([
          resDM.json(),
          resSP.json(),
        ]);
        setDanhMuc(dmData);
        setSpHot(spData);
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
    <main className="pt-[72px]">
      {/* 🟣 BANNER */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="/images/banner-home.jpg"
          alt="Banner chính"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">HanFoodie</h1>
          <p className="text-lg md:text-2xl">Ẩm thực giao tận tay bạn</p>
        </div>
      </section>

      {/* 🟠 DANH MỤC */}
      <div className="max-w-[80%] mx-auto py-10 space-y-16">
        <DanhMucSection data={danhMuc} />

        {/* 🟢 SẢN PHẨM NỔI BẬT */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-[#6A0A0A]">
            Sản phẩm nổi bật
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {spHot.map((sp) => (
              <div
                key={sp.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={sp.hinh || "/images/product-placeholder.jpg"}
                  alt={sp.ten}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 line-clamp-2">
                    {sp.ten}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[#6A0A0A] font-semibold">
                      {sp.gia_goc.toLocaleString()}₫
                    </span>
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400" /> 4.5
                    </div>
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
