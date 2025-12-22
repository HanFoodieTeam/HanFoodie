"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface IBaiViet {
  id: number;
  tieu_de: string;
  hinh?: string | null;
  slug: string;
  an_hien: boolean;
  ngay_dang?: string | null;
  id_loai_bv?: number;
  luot_xem?: number;
}

interface ILoaiBaiViet {
  id: number;
  ten_loai: string;
  slug: string | null;
  thu_tu: number;
  an_hien: boolean;
}

export default function BaiVietGrid() {
  const [baiViets, setBaiViets] = useState<IBaiViet[]>([]);
  const [loaiList, setLoaiList] = useState<ILoaiBaiViet[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [activeLoai, setActiveLoai] = useState<number | null>(null);

  const limit = 8;

  useEffect(() => {
    const fetchLoai = async () => {
      try {
        const res = await fetch("/api/bai_viet/loai");
        const json = await res.json();
        if (json.success) setLoaiList(json.data);
      } catch (err) {
        console.error("Lỗi lấy loại bài viết:", err);
      }
    };
    fetchLoai();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const typeQuery = activeLoai ? `&id_loai=${activeLoai}` : "";
        const res = await fetch(
          `/api/bai_viet?page=${page}&limit=${limit}${typeQuery}`
        );
        const json = await res.json();
        if (json.success) {
          setBaiViets(json.data);
          setTotalPages(json.pagination?.totalPages ?? 1);
        }
      } catch (err) {
        console.error("Lỗi lấy bài viết:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, activeLoai]);

  const handleSelectLoai = (id: number | null) => {
    setActiveLoai(id);
    setPage(1);
  };

  return (
    <div className="px-4 py-6 md:px-6 max-w-7xl mx-auto">
      {/* Nav danh mục */}
      <nav className="mb-6 md:mb-8 border-b border-gray-300 relative overflow-x-auto md:overflow-visible">
        <div className="flex relative min-w-max md:min-w-0">
          {/* Indicator */}
          <div
            className="hidden md:block absolute bottom-0 h-1 bg-[#6A0A0A] transition-all duration-300 rounded"
            style={{
              width: `${100 / (loaiList.length + 1)}%`,
              left: `${
                activeLoai === null
                  ? 0
                  : ((loaiList.findIndex((l) => l.id === activeLoai) + 1) *
                      100) /
                    (loaiList.length + 1)
              }%`,
            }}
          />

          {/* Button Tất cả */}
          <button
            onClick={() => handleSelectLoai(null)}
            className={`px-4 md:flex-1 py-3 text-center text-sm font-medium transition-colors whitespace-nowrap ${
              activeLoai === null
                ? "bg-[#6A0A0A] text-white font-semibold"
                : "bg-transparent text-gray-700 hover:text-[#6A0A0A]"
            }`}
          >
            Tất cả
          </button>

          {/* Các loại bài viết */}
          {loaiList.map((loai) => {
            const isActive = activeLoai === loai.id;
            return (
              <button
                key={loai.id}
                onClick={() => handleSelectLoai(loai.id)}
                className={`px-4 md:flex-1 py-3 text-center text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-[#6A0A0A] text-white font-semibold"
                    : "bg-transparent text-gray-700 hover:text-[#6A0A0A]"
                }`}
              >
                {loai.ten_loai}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Lưới bài viết */}
      {loading ? (
        <p className="text-center py-10 text-gray-500">Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {baiViets.map((bv) => (
            <Link
              key={bv.id}
              href={`/bai_viet/${bv.id}`}
              className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 group"
            >
              {bv.hinh ? (
                <div className="relative w-full h-40 md:h-48">
                  <Image
                    src={bv.hinh}
                    alt={bv.tieu_de}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-40 md:h-48 bg-gray-100 flex items-center justify-center text-gray-400">
                  Chưa có ảnh
                </div>
              )}

              <div className="p-4">
                <h2 className="font-semibold text-base md:text-lg mb-2 line-clamp-2 group-hover:text-[#6A0A0A]">
                  {bv.tieu_de}
                </h2>
                <div className="flex justify-between text-sm text-gray-500">
                  {bv.ngay_dang && (
                    <span>
                      {new Date(bv.ngay_dang).toLocaleDateString()}
                    </span>
                  )}
                  <span>{bv.luot_xem ?? 0} lượt xem</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Phân trang */}
      <div className="flex justify-center mt-6 md:mt-8 gap-2 flex-wrap">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-4 py-2 border rounded-md transition ${
              page === num
                ? "bg-blue-500 text-white border-blue-500"
                : "hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
