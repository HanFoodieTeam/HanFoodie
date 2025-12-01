"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ChevronDown } from "lucide-react";

interface ILoaiBaiViet {
  id: number;
  ten_loai: string;
  slug: string;
}

interface IBaiViet {
  id: number;
  tieu_de: string;
  noi_dung: string;
  hinh: string | null;
  luot_xem: number;
  slug: string;
  ngay_dang: string | null;
  an_hien: number;
  loai_bai_viet: ILoaiBaiViet | null;
}

export default function BaiVietPage() {
  const [dsBaiViet, setDsBaiViet] = useState<IBaiViet[]>([]);
  const [loading, setLoading] = useState(true);
  const [loaiId, setLoaiId] = useState<number | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [danhSachLoai, setDanhSachLoai] = useState<{ id: number | null; ten_loai: string }[]>([]);

  const fetchBaiViet = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bai_viet`, { cache: "no-store" });
      if (!res.ok) throw new Error("Lỗi khi tải dữ liệu bài viết");
      const data: IBaiViet[] = await res.json();
      setDsBaiViet(data);

      // Lấy danh sách loại duy nhất
      const loaiUnique = Array.from(
        new Map(
          data
            .filter(bv => bv.loai_bai_viet)
            .map(bv => [bv.loai_bai_viet!.id, bv.loai_bai_viet])
        ).values()
      );
      setDanhSachLoai([{ id: null, ten_loai: "Tất cả" }, ...loaiUnique.map(lbv => ({ id: lbv!.id, ten_loai: lbv!.ten_loai }))]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBaiViet();
  }, []);

  // Lọc bài viết theo loại
  const filteredBaiViet = loaiId ? dsBaiViet.filter(bv => bv.loai_bai_viet?.id === loaiId) : dsBaiViet;

  if (loading)
    return (
      <div className="p-6 text-center mt-[var(--header-h)] text-gray-500">
        Đang tải bài viết...
      </div>
    );

  return (
    <main className="bg-white min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <aside className="md:w-1/4 flex flex-col gap-3 mb-6 md:mb-0">
          <h2 className="text-xl font-semibold text-[#6A0A0A] mb-2">Danh mục bài viết</h2>

          {/* Mobile dropdown */}
          <div className="md:hidden relative">
            <button
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 flex justify-between items-center"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {danhSachLoai.find(l => l.id === loaiId)?.ten_loai || "Tất cả"}
              <ChevronDown size={20} />
            </button>
            {showDropdown && (
              <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-md z-10">
                {danhSachLoai.map(loai => (
                  <button
                    key={loai.id ?? "all"}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-200 ${
                      loaiId === loai.id ? "bg-[#6A0A0A] text-white" : ""
                    }`}
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
                className={`px-4 py-2 rounded-lg font-medium text-left transition-colors ${
                  loaiId === loai.id
                    ? "bg-[#6A0A0A] text-white shadow"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {loai.ten_loai}
              </button>
            ))}
          </div>
        </aside>

        {/* Danh sách bài viết */}
        <section className="md:w-3/4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBaiViet.length === 0 && (
            <p className="col-span-full text-center text-gray-500 mt-10">Không có bài viết nào.</p>
          )}

          {filteredBaiViet.map(bv => (
            <div
              key={bv.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
            >
              {bv.hinh && (
                <img
                  src={bv.hinh}
                  alt={bv.tieu_de}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="p-5 flex flex-col justify-between h-[220px]">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-[#6A0A0A]">
                    {bv.tieu_de}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {bv.noi_dung}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{bv.ngay_dang ? new Date(bv.ngay_dang).toLocaleDateString("vi-VN") : ""}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-700">Lượt xem: {bv.luot_xem}</span>
                    <Link
                      href={`/bai_viet/${bv.id}`}
                      className="text-[#6A0A0A] font-medium hover:underline"
                    >
                      Xem chi tiết →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}
