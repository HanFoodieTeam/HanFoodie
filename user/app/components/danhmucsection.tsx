"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { IDanhMuc } from "../lib/cautrucdata";

export default function DanhMucSection({ data }: { data: IDanhMuc[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

  return (
    <section className="relative -mt-6 "> {/* Kéo gần banner */}
      
      {/* Nút trái */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                   bg-black/40 hover:bg-black/60 text-white
                   p-2 rounded-full shadow-md transition"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Nút phải */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                   bg-black/40 hover:bg-black/60 text-white
                   p-2 rounded-full shadow-md transition"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Danh sách danh mục */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-6 pb-1 pt-0 hide-scrollbar"
      >
        {data.map((dm) => (
          <Link
            key={dm.id}
            href={`/danh_muc/${dm.slug || dm.id}`}
            className="min-w-[160px] max-w-[160px] flex-shrink-0 rounded-xl overflow-hidden 
                       shadow hover:shadow-lg transition bg-white"
          >
            {/* Ảnh danh mục */}
            <img
              src={dm.hinh || "/noimg.png"}
              alt={dm.ten}
              className="w-full h-32 object-cover"
            />

            {/* Tên và số sản phẩm */}
            <div className="p-2 text-center">
              <p
                className="font-medium text-gray-800 truncate max-w-[140px] mx-auto block"
                title={dm.ten}
              >
                {dm.ten}
              </p>
              <p className="text-sm text-gray-500">
                {dm.so_san_pham || 10} sản phẩm
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
