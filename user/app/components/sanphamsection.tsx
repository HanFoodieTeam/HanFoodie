"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { ISanPham } from "../lib/cautrucdata";

interface Props {
  data: ISanPham[];
}

export default function SanPhamHotSection({ data }: Props) {
  return (
    <section className="">
      <h2 className="text-2xl font-semibold mb-3 text-[#6A0A0A]">
        Sản phẩm nổi bật
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {data.map((sp) => (
          <div
            key={sp.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
          
            <Link href={`/${sp.id}`} className="block">
              <img
                src={sp.hinh || "/noimg.png"}
                alt={sp.ten}
                className="w-full h-48 object-cover hover:scale-105 transition-transform"
              />
              <div className="p-4">
                <h3 className="font-medium text-gray-800 hover:text-[#6A0A0A] line-clamp-1">
                  {sp.ten}
                </h3>

              
                <p className="text-gray-500 text-sm mt-1 truncate">
                  {sp.mo_ta}
                </p>
              </div>
            </Link>

            {/*  Giá + Sao */}
            <div className="flex items-center justify-between px-4 pb-4">
              <span className="text-[#6A0A0A] font-semibold text-lg">
                {sp.gia_goc.toLocaleString()}₫
              </span>
              <div className="flex items-center text-yellow-500 text-sm">
                <Star className="w-4 h-4 fill-yellow-400" /> 4.5
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
