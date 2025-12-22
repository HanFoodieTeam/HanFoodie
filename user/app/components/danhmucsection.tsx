

// "use client";

// import {
//   ChevronLeft,
//   ChevronRight,
//   Pizza,
//   Coffee,
//   UtensilsCrossed,
//   IceCream2,
//   Beef,
//   Soup,
// } from "lucide-react";

// import Link from "next/link";
// import { useRef, useEffect, useState } from "react";
// import { IDanhMuc } from "../../lib/cautrucdata";

// // Icon mapping
// const iconMap: Record<string, any> = {
//   "tra-trai-cay": IceCream2,
//   combo: Pizza,
//   "mi-tron-com-chien": UtensilsCrossed,
//   "pho-mai-xuc-xich": Beef,
//   "mon-an-kem": UtensilsCrossed,
//   "mi-cay-7-cap-do": UtensilsCrossed,
//   lau: Soup,
//   "tra-sua-truyen-thong": Coffee,
//   default: Pizza,
// };

// export default function DanhMucSection({ data }: { data: IDanhMuc[] }) {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const [needScroll, setNeedScroll] = useState(false);

//   const checkOverflow = () => {
//     const scrollEl = scrollRef.current;
//     const wrapperEl = wrapperRef.current;
//     if (!scrollEl || !wrapperEl) return;

//     // Nếu tổng chiều rộng danh mục > wrapper → cần scroll → show nút
//     setNeedScroll(scrollEl.scrollWidth > wrapperEl.clientWidth);
//   };

//   useEffect(() => {
//     checkOverflow();
//     window.addEventListener("resize", checkOverflow);
//     return () => window.removeEventListener("resize", checkOverflow);
//   }, [data]);

//   const scrollLeft = () =>
//     scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });

//   const scrollRight = () =>
//     scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });

//   return (
//     <section className="relative  select-none">
//       <div ref={wrapperRef} className="relative w-full">

//         {/* Button trái */}
//         {needScroll && (
//           <button
//             onClick={scrollLeft}
//             className="absolute left-0 top-1/2 -translate-y-1/2 z-20
//                        bg-white border shadow-md rounded-full p-2
//                        hover:bg-gray-100 transition"
//           >
//             <ChevronLeft className="w-5 h-5 text-gray-700" />
//           </button>
//         )}

//         {/* Danh mục */}
//         <div
//           ref={scrollRef}
//           className="flex gap-5 px-10 py-2 overflow-x-auto scroll-smooth hide-scrollbar"
//         >
//           {data
//             .sort((a, b) => (a.thu_tu ?? 999) - (b.thu_tu ?? 999))
//             .map((dm) => {
//               const slugSafe = dm.slug ?? "default";
//               const Icon = iconMap[slugSafe] || Pizza;

//               return (
//                 <Link
//                   key={dm.id}
//                   href={`/san_pham?danh_muc=${slugSafe}`}
//                   className="flex flex-col items-center flex-shrink-0 w-[100px] group"
//                 >
//                   <div className="w-16 h-16 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center group-hover:border-red-500 transition">
//                     <Icon className="w-7 h-7 text-red-500" />
//                   </div>
//                   <p className="mt-1 text-[12px] font-medium text-center leading-tight text-gray-800 group-hover:text-red-500 line-clamp-2">
//                     {dm.ten}
//                   </p>
//                 </Link>
//               );
//             })}
//         </div>

//         {/* Button phải */}
//         {needScroll && (
//           <button
//             onClick={scrollRight}
//             className="absolute right-0 top-1/2 -translate-y-1/2 z-20
//                        bg-white border shadow-md rounded-full p-2
//                        hover:bg-gray-100 transition">
//             <ChevronRight className="w-5 h-5 text-gray-700" />
//           </button>
//         )}
//       </div>
//     </section>
//   );
// }
"use client";

import {
  ChevronLeft,
  ChevronRight,
  Pizza,
  Coffee,
  UtensilsCrossed,
  IceCream2,
  Beef,
  Soup,
} from "lucide-react";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { IDanhMuc } from "../../lib/cautrucdata";
import { useSearchParams } from "next/navigation";

const iconMap: Record<string, React.ElementType> = {
  "tra-trai-cay": IceCream2,
  combo: Pizza,
  "mi-tron-com-chien": UtensilsCrossed,
  "pho-mai-xuc-xich": Beef,
  "mon-an-kem": UtensilsCrossed,
  "mi-cay-7-cap-do": UtensilsCrossed,
  lau: Soup,
  "tra-sua-truyen-thong": Coffee,
  default: Pizza,
};

export default function DanhMucSection({ data }: { data: IDanhMuc[] }) {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("danh_muc");

  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [needScroll, setNeedScroll] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    const wrap = wrapperRef.current;
    if (!el || !wrap) return;
    setNeedScroll(el.scrollWidth > wrap.clientWidth);
  }, [data]);

  return (
    <section className="relative">
      <div ref={wrapperRef}>
        <div
          ref={scrollRef}
          className="flex gap-5 px-10 py-2 overflow-x-auto"
        >
          {data.map((dm) => {
            const slug = dm.slug ?? "default";
            const Icon = iconMap[slug] || Pizza;
            const active = slug === activeSlug;

            return (
              <Link
                key={dm.id}
                href={`/san_pham?danh_muc=${slug}`}
                className="flex flex-col items-center w-[100px]"
              >
                <div
                  className={`w-16 h-16 rounded-full border shadow flex items-center justify-center
                    ${
                      active
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white"
                    }`}
                >
                  <Icon className="w-7 h-7 text-red-500" />
                </div>
                <p
                  className={`text-xs text-center mt-1 ${
                    active ? "text-red-500 font-semibold" : ""
                  }`}
                >
                  {dm.ten}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
