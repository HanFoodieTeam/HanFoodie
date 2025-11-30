"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, ChevronDown } from "lucide-react";

interface ILoaiBaiViet {
  id: number;
  ten_loai: string;
}

interface IBaiViet {
  id: number;
  tieu_de: string;
  noi_dung: string;
  hinh: string | null;
  luot_xem: number;
  slug: string;
  ngay_dang: string | null;
  loai_bai_viet: ILoaiBaiViet | null;
}

export default function BaiVietChiTietPage() {
  const params = useParams();
  const [baiViet, setBaiViet] = useState<IBaiViet | null>(null);
  const [danhSachBaiViet, setDanhSachBaiViet] = useState<IBaiViet[]>([]);
  const [danhSachLoai, setDanhSachLoai] = useState<{ id: number | null; ten_loai: string }[]>([]);
  const [loaiId, setLoaiId] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch chi tiết bài viết
  useEffect(() => {
    const fetchChiTiet = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/bai_viet/${params.id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Lỗi tải bài viết");
        const data: IBaiViet = await res.json();
        setBaiViet(data);
        setLoaiId(data.loai_bai_viet?.id || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChiTiet();
  }, [params.id]);

  // Fetch toàn bộ bài viết để lấy danh mục
  useEffect(() => {
    const fetchDanhSach = async () => {
      try {
        const res = await fetch("/api/bai_viet", { cache: "no-store" });
        if (!res.ok) throw new Error("Lỗi tải danh sách");
        const data: IBaiViet[] = await res.json();
        setDanhSachBaiViet(data);

        const loaiUnique = Array.from(
          new Map(
            data
              .filter(bv => bv.loai_bai_viet)
              .map(bv => [bv.loai_bai_viet!.id, bv.loai_bai_viet])
          ).values()
        );
        setDanhSachLoai([{ id: null, ten_loai: "Tất cả" }, ...loaiUnique.map(lbv => ({ id: lbv!.id, ten_loai: lbv!.ten_loai }))]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDanhSach();
  }, []);

  if (loading || !baiViet) return <div className="p-6 text-center text-gray-500">Đang tải bài viết...</div>;

  const filteredBaiViet = loaiId ? danhSachBaiViet.filter(bv => bv.loai_bai_viet?.id === loaiId) : danhSachBaiViet;

  return (
    <main className="bg-white min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <aside className="md:w-1/4 flex flex-col gap-3 mb-6 md:mb-0">
          <h2 className="text-xl font-semibold text-[#6A0A0A] mb-2">Danh mục bài viết</h2>

          {/* Mobile dropdown */}
          <div className="md:hidden relative">
            <button className="w-full px-4 py-2 border rounded-lg bg-gray-100 flex justify-between items-center" onClick={() => setShowDropdown(!showDropdown)}>
              {danhSachLoai.find(l => l.id === loaiId)?.ten_loai || "Tất cả"}
              <ChevronDown size={20} />
            </button>
            {showDropdown && (
              <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-md z-10">
                {danhSachLoai.map(loai => (
                  <button
                    key={loai.id ?? "all"}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-200 ${loaiId === loai.id ? "bg-[#6A0A0A] text-white" : ""}`}
                    onClick={() => { setLoaiId(loai.id); setShowDropdown(false); }}
                  >
                    {loai.ten_loai}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop sidebar */}
          <div className="hidden md:flex flex-col gap-2">
            {danhSachLoai.map(loai => (
              <button
                key={loai.id ?? "all"}
                onClick={() => setLoaiId(loai.id)}
                className={`px-4 py-2 rounded-lg font-medium text-left transition-colors ${loaiId === loai.id ? "bg-[#6A0A0A] text-white shadow" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                {loai.ten_loai}
              </button>
            ))}
          </div>
        </aside>

        {/* Nội dung bài viết */}
        <section className="md:w-3/4">
          {baiViet.hinh && <img src={baiViet.hinh} alt={baiViet.tieu_de} className="w-full rounded-xl mb-5 object-cover" />}
          <h1 className="text-3xl font-bold text-[#6A0A0A] mb-4">{baiViet.tieu_de}</h1>
          {baiViet.loai_bai_viet && <div className="text-sm text-gray-500 mb-3">Loại bài viết: <span className="font-medium">{baiViet.loai_bai_viet.ten_loai}</span></div>}
          {baiViet.ngay_dang && <div className="flex items-center gap-1 text-sm text-gray-500 mb-5"><Calendar size={16} /><span>{new Date(baiViet.ngay_dang).toLocaleDateString("vi-VN")}</span></div>}
          <div className="text-gray-800 mb-5" dangerouslySetInnerHTML={{ __html: baiViet.noi_dung }} />
          <div className="text-sm text-gray-500 font-medium mb-6">Lượt xem: {baiViet.luot_xem}</div>

          <h2 className="text-xl font-semibold text-[#6A0A0A] mb-4">Các bài viết cùng loại</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredBaiViet.filter(bv => bv.id !== baiViet.id).map(bv => (
              <Link key={bv.id} href={`/bai_viet/${bv.id}`} className="block p-4 border rounded-lg hover:shadow-lg transition">
                <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">{bv.tieu_de}</h3>
                <p className="text-gray-500 text-sm line-clamp-3">{bv.noi_dung}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
