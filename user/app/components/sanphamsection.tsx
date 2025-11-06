


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { ISanPham } from "../lib/cautrucdata";
import { number } from "framer-motion";

interface Props {
  data: ISanPham[];
}

export default function SanPhamHotSection({ data }: Props) {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Lấy danh sách yêu thích từ localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Toggle yêu thích
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-3 text-[#6A0A0A]">
        Sản phẩm nổi bật
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {data.map((sp) => {
          const isFavorite = favorites.includes(sp.id);
          return (
            <div
              key={sp.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative group"
            >
              {/* Ảnh sản phẩm */}
              <div className="relative">
                <img
                  src={sp.hinh || "/noimg.png"}
                  alt={sp.ten}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Nút trái tim yêu thích */}
                <button
                  onClick={() => toggleFavorite(sp.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                >
                  <Heart
                    size={20}
                    className={`transition-colors ${isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-200 hover:text-red-400"
                      }`}
                  />
                </button>
              </div>

              {/* Thông tin sản phẩm */}
              <Link href={`/chi_tiet/${sp.id}`} className="block">
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 hover:text-[#6A0A0A] line-clamp-1">
                    {sp.ten}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 truncate">
                    {sp.mo_ta}
                  </p>
                </div>
              </Link>

              {/* Giá + Sao */}
              <div className="flex items-center justify-between px-4 pb-4">
                <span className="text-[#6A0A0A] font-semibold text-lg">
                  {sp.gia_goc.toLocaleString("vi-VN")}₫
                </span>
                {/*  Chỉ hiển thị nếu có sao trung bình */}
                {sp.so_sao_tb && Number(sp.so_sao_tb) > 0 && (
                  <div className="flex items-center text-yellow-500 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 mr-1" />
                    <span className="text-gray-700">
                      {Number(sp.so_sao_tb).toFixed(1)}    </span>
                  </div>
                )}


              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
