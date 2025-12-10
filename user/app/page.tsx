"use client";

import { useEffect, useState } from "react";
import { IBaiViet, IDanhMuc, ISanPham } from "./lib/cautrucdata";
import DanhMucSection from "./components/danhmucsection";
import SanPhamHotSection from "./components/sanphamsection";

export default function TrangChuPage() {
  const [danhMuc, setDanhMuc] = useState<IDanhMuc[]>([]);
  const [spHot, setSpHot] = useState<ISanPham[]>([]);
  const [combo, setCombo] = useState<ISanPham[]>([]);
  const [loading, setLoading] = useState(true);
  const [baiVietMoi, setBaiVietMoi] = useState<IBaiViet[]>([]);
  const [spMuaNhieu, setSpMuaNhieu] = useState<ISanPham[]>([]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resDM, resSP, resCombo, resBV, resSP_MN] = await Promise.all([
          fetch("/api/danh_muc"),
          fetch("/api/trang_chu/sp_hot"),
          fetch("/api/trang_chu/combo"),
          fetch("/api/trang_chu/bai_viet"),
          fetch("/api/trang_chu/sp_mua_nhieu"),


        ]);

        setDanhMuc(await resDM.json());
        setSpHot(await resSP.json());
        setCombo(await resCombo.json());
        setBaiVietMoi(await resBV.json());
        // const spMN = await resSP_MN.json();
        // setSpMuaNhieu(spMN.data || []);
        // console.log("sp mua nhiều:", spMN);
        setSpMuaNhieu(await resSP_MN.json());


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

  return (<>
    <main className="">
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="/images/banner-home.jpg"
          alt="Banner"
          onError={(e) => {
            e.currentTarget.src = "/noimg.png";
          }}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">HanFoodie</h1>
          <p className="text-lg md:text-2xl">Ẩm thực giao tận tay bạn</p>
        </div>
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



        <section className="relative w-full h-[220px] md:h-[240px] overflow-hidden rounded-lg">
          <img
            src="/images/banner-home.jpg"
            alt=""
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">HanFoodie</h1>
            <p className="text-base md:text-lg">
              Ẩm thực giao tận tay bạn
            </p>
          </div>
        </section>

        {/* COMBO   */}
        <section className="relative z-10">
          <h2 className="text-lg font-semibold mb-3">Combo hấp dẫn</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {combo.slice(0, 6).map((sp) => (
              <div
                key={sp.id}
                className="flex bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md overflow-hidden transition-all hover:-translate-y-1 h-[120px]">
                <div className="w-[30%] flex items-center justify-center bg-gray-100">
                  <img
                    src={sp.hinh || "/noimg.png"}
                    alt={sp.ten}
                    className="w-[100%] h-[100%] object-cover rounded "
                  />
                </div>

                <div className="w-[70%] p-1.5 flex flex-col justify-between">
                  <div>
                    <h1
                      className="font-semibold text-gray-800 text-[16px] leading-tight line-clamp-2"
                      title={sp.ten}
                    >
                      {sp.ten}
                    </h1>

                    <p
                      className="text-[14px] text-gray-600 line-clamp-2 mt-1"
                      title={sp.mo_ta}
                    >
                      {sp.mo_ta || "Thưởng thức hương vị tuyệt hảo từ HanFoodie."}
                    </p>
                  </div>

                  <p className="text-[14px] font-semibold text-red-600 mt-1">
                    {sp.gia_goc?.toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </div>
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

                {/* Nội dung */}
                <div className="p-2 flex flex-col flex-grow justify-between">
                  {/* Tên bài viết (1 dòng) */}
                  <h3
                    className="font-semibold text-gray-900 text-[15px] line-clamp-2"
                    title={bv.tieu_de}
                  >
                    {bv.tieu_de}
                  </h3>

                  {/* Mô tả (2 dòng) */}
                  <p
                    className="text-[13px] text-gray-600 line-clamp-2"
                    title={bv.noi_dung}
                  >
                    {(bv.noi_dung ?? "").slice(0, 120)}
                  </p>

                  {/* Ngày */}
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
