"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

  // Lấy loại bài viết
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

  // Lấy bài viết (lọc theo loại nếu có)
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
    <div className="p-6">
      {/* Submenu ngang dạng ô (box) với underline animation */}
      <nav className="mb-6 border-b relative">
        <div className="flex relative">
          {/* Indicator */}
          <div
            className="absolute bottom-0 h-1 bg-[#6A0A0A] transition-all duration-300"
            style={{
              width:
                activeLoai === null
                  ? "calc(100% / " + (loaiList.length + 1) + ")"
                  : "calc(100% / " + (loaiList.length + 1) + ")",
              left:
                activeLoai === null
                  ? "0"
                  : `${loaiList.findIndex((l) => l.id === activeLoai) + 1}00% / ${
                      loaiList.length + 1
                    }`,
            }}
          />

          {/* Tất cả */}
          <button
            onClick={() => handleSelectLoai(null)}
            className={`px-4 py-2 text-sm font-medium flex-1 text-center transition ${
              activeLoai === null
                ? "bg-[#6A0A0A] text-white"
                : "text-gray-700 hover:bg-[#6a0a0a22]"
            }`}
          >
            Tất cả
          </button>

          {loaiList.map((loai) => (
            <button
              key={loai.id}
              onClick={() => handleSelectLoai(loai.id)}
              className={`px-4 py-2 text-sm font-medium flex-1 text-center transition ${
                activeLoai === loai.id
                  ? "bg-[#6A0A0A] text-white"
                  : "text-gray-700 hover:bg-[#6a0a0a22]"
              }`}
            >
              {loai.ten_loai}
            </button>
          ))}
        </div>
      </nav>

      {/* Lưới bài viết */}
      {loading ? (
        <p className="text-center py-10">Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {baiViets.map((bv) => (
            <Link
              key={bv.id}
              href={`/bai_viet/${bv.id}`}
              className="block bg-white shadow-md overflow-hidden hover:shadow-lg transition group"
            >
              {bv.hinh ? (
                <img
                  src={bv.hinh}
                  alt={bv.tieu_de}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                  Chưa có ảnh
                </div>
              )}

              <div className="p-4">
                <h2 className="font-semibold text-lg mb-2 group-hover:text-[#6A0A0A]">
                  {bv.tieu_de}
                </h2>
                <div className="flex justify-between text-sm text-gray-500">
                  {bv.ngay_dang && (
                    <span>{new Date(bv.ngay_dang).toLocaleDateString()}</span>
                  )}
                  <span>{bv.luot_xem ?? 0} lượt xem</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Phân trang */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 border rounded ${
              page === num ? "bg-blue-500 text-white" : ""
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
