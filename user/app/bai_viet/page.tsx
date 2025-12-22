"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";

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

  const limit = 10;

  useEffect(() => {
    fetch("/api/bai_viet/loai")
      .then((res) => res.json())
      .then((json) => json.success && setLoaiList(json.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const typeQuery = activeLoai ? `&id_loai=${activeLoai}` : "";
    fetch(`/api/bai_viet?page=${page}&limit=${limit}${typeQuery}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setBaiViets(json.data);
          setTotalPages(json.pagination?.totalPages ?? 1);
        }
      })
      .finally(() => setLoading(false));
  }, [page, activeLoai]);

  const featured = baiViets[0];
  const sideTop = baiViets.slice(1, 4);
  const rest = baiViets.slice(4);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
      {/* ===== SUBMENU ===== */}
      <nav className="mb-2 border-b border-gray-200 overflow-x-auto">
        <div className="flex gap-2 min-w-max pb-2">
          <button
            onClick={() => {
              setActiveLoai(null);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeLoai === null
                ? "bg-[#6A0A0A] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Tất cả
          </button>

          {loaiList.map((loai) => (
            <button
              key={loai.id}
              onClick={() => {
                setActiveLoai(loai.id);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeLoai === loai.id
                  ? "bg-[#6A0A0A] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {loai.ten_loai}
            </button>
          ))}
        </div>
      </nav>

      {loading ? (
        <div className="min-h-[200px] flex items-center justify-center text-gray-400">
          Đang tải bài viết...
        </div>
      ) : (
        <>
          {/* ===== FEATURED ===== */}
          {featured && (
            <div className="grid lg:grid-cols-4 gap-2 mb-2">
              {/* Featured lớn */}
              <Link
                href={`/bai_viet/${featured.id}`}
                className="lg:col-span-3 group relative rounded-2xl overflow-hidden shadow"
              >
                <div className="relative aspect-[10/3.5]">
                  {featured.hinh && (
                    <Image
                      src={featured.hinh}
                      alt={featured.tieu_de}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                <div className="absolute bottom-0 p-4 text-white">
                  <h2 className="text-lg md:text-xl font-bold line-clamp-2">
                    {featured.tieu_de}
                  </h2>
                  {featured.ngay_dang && (
                    <div className="flex items-center gap-2 text-xs opacity-90 mt-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featured.ngay_dang).toLocaleDateString("vi-VN")}
                      <span>•</span>
                      {featured.luot_xem} lượt xem
                    </div>
                  )}
                </div>
              </Link>

              {/* Side bài nhỏ */}
              <div className="flex flex-col gap-2 lg:col-span-1">
                {sideTop.map((bv) => (
                  <Link
                    key={bv.id}
                    href={`/bai_viet/${bv.id}`}
                    className="flex gap-3 bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition"
                  >
                    <div className="relative w-28 h-20 shrink-0">
                      {bv.hinh && (
                        <Image
                          src={bv.hinh}
                          alt={bv.tieu_de}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold line-clamp-2">
                        {bv.tieu_de}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {bv.luot_xem ?? 0} lượt xem
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ===== GRID DƯỚI ===== */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {rest.map((bv) => (
              <Link
                key={bv.id}
                href={`/bai_viet/${bv.id}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
              >
                <div className="relative aspect-[4/3]">
                  {bv.hinh && (
                    <Image
                      src={bv.hinh}
                      alt={bv.tieu_de}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-2">
                    {bv.tieu_de}
                  </h3>
                  {bv.ngay_dang && (
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(bv.ngay_dang).toLocaleDateString("vi-VN")}
                      <span>•</span>
                      {bv.luot_xem} lượt xem
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* ===== PAGINATION ===== */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-3 gap-2 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-4 py-2 border rounded-md ${
                page === num
                  ? "bg-[#6A0A0A] text-white border-[#6A0A0A]"
                  : "hover:bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
