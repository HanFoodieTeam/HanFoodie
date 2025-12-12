"use client";

import { useEffect, useState } from "react";
import { IBaiViet, IBanner, IDanhMuc, ISanPham } from "./lib/cautrucdata";
import DanhMucSection from "./components/danhmucsection";
import SanPhamHotSection from "./components/sanphamsection";
import Link from "next/link";

export default function TrangChuPage() {
  const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
  const [spHot, setSpHot] = useState<ISanPham[]>([]);
  const [combo, setCombo] = useState<ISanPham[]>([]);
  const [loading, setLoading] = useState(true);
  const [baiVietMoi, setBaiVietMoi] = useState<IBaiViet[]>([]);
  const [spMuaNhieu, setSpMuaNhieu] = useState<ISanPham[]>([]);

  const [bannerChinh, setBannerChinh] = useState<IBanner[]>([]);
  const [bannerPhu, setBannerPhu] = useState<IBanner[]>([]);
  const [currentPhu, setCurrentPhu] = useState(0);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resDM, resSP, resCombo, resBV, resSP_MN, resBC, resBP] = await Promise.all([
          fetch("/api/danh_muc"),
          fetch("/api/trang_chu/sp_hot"),
          fetch("/api/trang_chu/combo"),
          fetch("/api/trang_chu/bai_viet"),
          fetch("/api/trang_chu/sp_mua_nhieu"),
          fetch("/api/trang_chu/banner?loai=0"),
          fetch("/api/trang_chu/banner?loai=1"),
        ]);

        setDanhMuc(await resDM.json());
        setSpHot(await resSP.json());
        setCombo(await resCombo.json());
        setBaiVietMoi(await resBV.json());
        setSpMuaNhieu(await resSP_MN.json());
        setBannerChinh((await resBC.json()).data || []);
        setBannerPhu((await resBP.json()).data || []);


      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const [current, setCurrent] = useState(0);

  // banner chính
  useEffect(() => {
    if (bannerChinh.length === 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerChinh.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [bannerChinh]);
  const handlePrev = () => {
    setCurrent((prev) =>
      prev === 0 ? bannerChinh.length - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % bannerChinh.length);
  };

  // banner phụ
  useEffect(() => {
    if (bannerPhu.length === 0) return;
    const timer = setInterval(() => {
      setCurrentPhu((prev) => (prev + 1) % bannerPhu.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [bannerPhu]);

  const nextPhu = () => {
    setCurrentPhu((prev) => (prev + 1) % bannerPhu.length);
  };

  const prevPhu = () => {
    setCurrentPhu((prev) =>
      prev === 0 ? bannerPhu.length - 1 : prev - 1
    );
  };



  if (loading)
    return (
      <div className="pt-[80px] text-center py-16 text-gray-500">
        Đang tải dữ liệu...
      </div>
    );

  return (<>
    <main className="">


      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        {bannerChinh.length > 0 && (
          <div className="relative w-full h-full">
            {bannerChinh[current].link ? (
              <a href={bannerChinh[current].link}>
                <img src={bannerChinh[current].hinh} alt="Banner chính"
                  className="w-full h-full object-cover transition-all duration-500 cursor-pointer"
                  onError={(e) => (e.currentTarget.src = "/noimg.png")} />
              </a>
            ) : (
              <img
                src={bannerChinh[current].hinh}
                alt="Banner chính"
                className="w-full h-full object-cover transition-all duration-500"
                onError={(e) => (e.currentTarget.src = "/noimg.png")}
              />
            )}
            {/* Nút lùi */}
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full">
              ❮
            </button>

            {/* Nút tới */}
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full" >
              ❯
            </button>

            {/* Indicator dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {bannerChinh.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-3 rounded-full transition-all ${current === index ? "bg-white w-6" : "bg-white/50 w-3"
                    }`}
                ></button>
              ))}
            </div>
          </div>
        )}
      </section>


      <div className=" py-4 space-y-4 ">
        <DanhMucSection data={danhMuc} />
        <h2 className="text-2xl font-semibold mb-3 text-[#6A0A0A]">
          Sản phẩm nổi bật
        </h2>
        <SanPhamHotSection data={spHot} />
        <h2 className="text-2xl font-semibold mb-3 text-[#6A0A0A]">
          Sản phẩm bán chạy
        </h2>
        <SanPhamHotSection data={spMuaNhieu} />

        <section className="relative w-full h-[200px] rounded-lg overflow-hidden mt-4">
          {bannerPhu.length > 0 && (
            <div className="relative w-full h-full">

              {bannerPhu[currentPhu].link ? (
                <a href={bannerPhu[currentPhu].link} target="_blank" rel="noopener noreferrer">
                  <img src={bannerPhu[currentPhu].hinh} alt="Banner phụ"
                    className="w-full h-full object-cover transition-all duration-500 cursor-pointer"
                    onError={(e) => (e.currentTarget.src = "/noimg.png")} />
                </a>
              ) : (
                <img src={bannerPhu[currentPhu].hinh} alt="Banner phụ"
                  className="w-full h-full object-cover transition-all duration-500"
                  onError={(e) => (e.currentTarget.src = "/noimg.png")} />
              )}

              {/* Nút lùi */}
              <button
                onClick={prevPhu}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full">
                ❮
              </button>

              {/* Nút tới */}
              <button
                onClick={nextPhu}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white px-3 py-2 rounded-full">
                ❯
              </button>

              {/* Chấm điều hướng */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {bannerPhu.map((_, index) => (
                  <button key={index} onClick={() => setCurrentPhu(index)}
                    className={`h-3 rounded-full transition-all ${currentPhu === index ? "bg-white w-6" : "bg-white/50 w-3"
                      }`}
                  ></button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* COMBO   */}
        <section className="relative z-10">
          <h2 className="text-lg font-semibold mb-3">Combo hấp dẫn</h2>



          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {combo.slice(0, 6).map((sp) => (
              <Link
                key={sp.id}
                href={`/chi_tiet/${sp.id}`}


                className="flex bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md 
                 overflow-hidden transition-all hover:-translate-y-1 h-[120px]" >
                <div className="w-[30%] flex items-center justify-center bg-gray-100">
                  <img
                    src={sp.hinh || "/noimg.png"}
                    alt={sp.ten}
                    className="w-[100%] h-[100%] object-cover rounded"
                  />
                </div>

                <div className="w-[70%] p-1.5 flex flex-col justify-between">
                  <div>
                    <h1
                      className="font-semibold text-gray-800 text-[16px] leading-tight line-clamp-2"
                      title={sp.ten}>
                      {sp.ten}
                    </h1>

                    <p
                      className="text-[14px] text-gray-600 line-clamp-2 mt-1"
                      title={sp.mo_ta}>
                      {sp.mo_ta || "Thưởng thức hương vị tuyệt hảo từ HanFoodie."}
                    </p>
                  </div>

                  <p className="text-[14px] font-semibold text-red-600 mt-1">
                    {sp.gia_goc?.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </Link>
            ))}
          </div>


        </section>

        <section className="relative z-10 mt-6">
          <h2 className="text-lg font-semibold mb-3">Bài viết mới nhất</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {baiVietMoi.map((bv) => (
              <a
                key={bv.id}
                href={`/bai_viet/${bv.id}`}
                className="bg-white rounded-md border border-gray-200 shadow-sm 
                 overflow-hidden hover:shadow-lg transition-all 
                 hover:-translate-y-1 h-[280px] flex flex-col">

                <div className="w-full h-[150px] bg-gray-100 flex items-center justify-center">
                  <img
                    src={bv.hinh || "/noimg.png"}
                    alt={bv.tieu_de}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-2 flex flex-col flex-grow justify-between">
                  <h3
                    className="font-semibold text-gray-900 text-[15px] line-clamp-2"
                    title={bv.tieu_de}>
                    {bv.tieu_de}
                  </h3>

                  <p
                    className="text-[13px] text-gray-600 line-clamp-2"
                    title={bv.noi_dung}>
                    {(bv.noi_dung ?? "").slice(0, 120)}
                  </p>

                  <p className="text-[12px] text-gray-400 mt-2">
                    {bv.ngay_dang
                      ? new Date(bv.ngay_dang).toLocaleDateString("vi-VN")
                      : "Đang cập nhật"}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>


      </div>
    </main>
  </>

  );

}
