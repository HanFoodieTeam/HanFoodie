// // // // // // "use client";

// // // // // // import { ChevronLeft, ChevronRight } from "lucide-react";
// // // // // // import Link from "next/link";
// // // // // // import { useRef } from "react";
// // // // // // import { IDanhMuc } from "../lib/cautrucdata";

// // // // // // export default function DanhMucSection({ data }: { data: IDanhMuc[] }) {

  
// // // // // //   const scrollRef = useRef<HTMLDivElement>(null);

// // // // // //   const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
// // // // // //   const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });

// // // // // //   return (
// // // // // //     <section className="relative -mt-6 "> {/* Kéo gần banner */}

// // // // // //       {/* Nút trái */}
// // // // // //       <button
// // // // // //         onClick={scrollLeft}
// // // // // //         className="absolute left-0 top-1/2 -translate-y-1/2 z-10  bg-black/40 hover:bg-black/60 text-white  p-2 rounded-full shadow-md transition ">
// // // // // //         <ChevronLeft className="w-5 h-5" />
// // // // // //       </button>

// // // // // //       {/* Nút phải */}
// // // // // //       <button
// // // // // //         onClick={scrollRight}
// // // // // //         className="absolute right-0 top-1/2 -translate-y-1/2 z-10  bg-black/40 hover:bg-black/60 text-white p-2 rounded-full shadow-md transition">
// // // // // //         <ChevronRight className="w-5 h-5" />
// // // // // //       </button>

// // // // // //       {/* Danh sách danh mục */}
// // // // // //       <div
// // // // // //         ref={scrollRef}
// // // // // //         className="flex gap-4 overflow-x-auto scroll-smooth px-6 pb-1 pt-0 hide-scrollbar">
// // // // // //         {data.map((dm) => (
// // // // // //           <Link
// // // // // //             key={dm.id}
// // // // // //             href={`/danh_muc/${dm.slug || dm.id}`}
// // // // // //             className="min-w-[100px] max-w-[100px] flex-shrink-0 rounded-xl overflow-hidden 
// // // // // //                        shadow hover:shadow-lg transition bg-gray-50">
// // // // // //             {/* Ảnh danh mục */}
// // // // // //             <img
// // // // // //               src={dm.hinh || "/noimg.png"}
// // // // // //               alt={dm.ten}
// // // // // //               className="w-full h-20 object-cover"
// // // // // //             />

// // // // // //             {/* Tên và số sản phẩm */}
// // // // // //             <div className="p-2 text-center">
// // // // // //               <p
// // // // // //                 className="font-medium text-gray-800 truncate max-w-[130px] mx-auto block text-xs"
// // // // // //                 title={dm.ten}>
// // // // // //                 {dm.ten}
// // // // // //               </p>
// // // // // //               {/* <p className="text-xs text-gray-500">
// // // // // //                 {dm.so_san_pham || 10} sản phẩm
// // // // // //               </p> */}

// // // // // //             </div>
// // // // // //           </Link>
// // // // // //         ))}
// // // // // //       </div>
// // // // // //     </section>
// // // // // //   );
// // // // // // }


// // // // // "use client";

// // // // // import { ChevronLeft, ChevronRight, Pizza } from "lucide-react";
// // // // // import Link from "next/link";
// // // // // import { useRef } from "react";
// // // // // import { IDanhMuc } from "../lib/cautrucdata";

// // // // // export default function DanhMucSection({ data }: { data: IDanhMuc[] }) {
// // // // //   const scrollRef = useRef<HTMLDivElement>(null);

// // // // //   const scrollLeft = () => scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });
// // // // //   const scrollRight = () => scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });

// // // // //   return (
// // // // //     <section className="relative py-4 select-none">

// // // // //       {/* Button trái */}
// // // // //       <button
// // // // //         onClick={scrollLeft}
// // // // //         className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100">
// // // // //         <ChevronLeft className="w-6 h-6" />
// // // // //       </button>

// // // // //       {/* Button phải */}
// // // // //       <button
// // // // //         onClick={scrollRight}
// // // // //         className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100">
// // // // //         <ChevronRight className="w-6 h-6" />
// // // // //       </button>

// // // // //       {/* List danh mục */}
// // // // //       <div
// // // // //         ref={scrollRef}
// // // // //         className="flex gap-8 px-12 py-2 overflow-x-auto scroll-smooth hide-scrollbar">

// // // // //         {data.map((dm) => {
// // // // //           // const IconComponent = dm.icon || Pizza; // icon lấy từ frontend
// // // // //           return (
// // // // //             <Link
// // // // //               key={dm.id}
// // // // //               href={`/danh_muc/${dm.slug || dm.id}`}
// // // // //               className="flex flex-col items-center flex-shrink-0 w-[90px] group">

// // // // //               {/* Icon trong vòng tròn */}
// // // // //               {/* <div className="w-16 h-16 rounded-full bg-white shadow border flex items-center justify-center
// // // // //                               group-hover:border-red-500 transition">
// // // // //                 <IconComponent className="w-7 h-7 text-red-500" />
// // // // //               </div> */}

// // // // //               {/* Text chuẩn chỉnh */}
// // // // //               <p className="mt-1 text-[12px] font-medium text-center text-gray-800 leading-tight
// // // // //                             group-hover:text-red-500 line-clamp-2">
// // // // //                 {dm.ten}
// // // // //               </p>

// // // // //             </Link>
// // // // //           );
// // // // //         })}
// // // // //       </div>
// // // // //     </section>
// // // // //   );
// // // // // }


// // // // "use client";

// // // // import {
// // // //   ChevronLeft,
// // // //   ChevronRight,
// // // //   Pizza,
// // // //   Coffee,
// // // //   UtensilsCrossed,
// // // //   IceCream2,
// // // //   Beef,
// // // //   Soup,
// // // // } from "lucide-react";

// // // // import Link from "next/link";
// // // // import { useRef } from "react";
// // // // import { IDanhMuc } from "../lib/cautrucdata";

// // // // const iconMap: Record<string, any> = {
// // // //   "tra-sua-truyen-thong": Coffee,
// // // //   "lau": Soup,
// // // //   "mi-cay-7-cap-do": UtensilsCrossed,
// // // //   "mon-an-kem": UtensilsCrossed,
// // // //   "topping-tra-sua": Coffee,
// // // //   "pho-mai-xuc-xich": Beef,
// // // //   "nuoc-ngot-gia-khat": IceCream2,
// // // //   "mi-tron-com-chien": UtensilsCrossed,
// // // //   "combo": Pizza,
// // // //   "tra-trai-cay": IceCream2,
// // // // };

// // // // export default function DanhMucSection({ data }: { data: IDanhMuc[] }) {
// // // //   const scrollRef = useRef<HTMLDivElement>(null);

// // // //   const scrollLeft = () => scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });
// // // //   const scrollRight = () => scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });

// // // //   return (
// // // //     <section className="relative py-4 select-none">

// // // //       {/* Button trái */}
// // // //       <button
// // // //         onClick={scrollLeft}
// // // //         className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100">
// // // //         <ChevronLeft className="w-6 h-6" />
// // // //       </button>

// // // //       {/* Button phải */}
// // // //       <button
// // // //         onClick={scrollRight}
// // // //         className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100">
// // // //         <ChevronRight className="w-6 h-6" />
// // // //       </button>

// // // //       {/* Danh sách */}
// // // //       <div
// // // //         ref={scrollRef}
// // // //         className="flex gap-8 px-12 py-2 overflow-x-auto scroll-smooth hide-scrollbar">

// // // //         {data
// // // //           .sort((a, b) => (a.thu_tu ?? 999) - (b.thu_tu ?? 999)) // sắp xếp theo thứ tự
// // // //           .map((dm) => {
// // // //             const Icon = iconMap[dm.slug] || Pizza;
// // // //             return (
// // // //               <Link
// // // //                 key={dm.id}
// // // //                 href={`/danh_muc/${dm.slug}`}
// // // //                 className="flex flex-col items-center flex-shrink-0 w-[90px] group"
// // // //               >
// // // //                 {/* Icon */}
// // // //                 <div className="w-16 h-16 rounded-full bg-white shadow border flex items-center justify-center group-hover:border-red-500 transition">
// // // //                   <Icon className="w-7 h-7 text-red-500" />
// // // //                 </div>

// // // //                 {/* Tên */}
// // // //                 <p className="mt-1 text-[12px] font-medium text-center text-gray-800 leading-tight group-hover:text-red-500 line-clamp-2">
// // // //                   {dm.ten}
// // // //                 </p>
// // // //               </Link>
// // // //             );
// // // //           })}
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }


// // // "use client";

// // // import {
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   Pizza,
// // //   Coffee,
// // //   UtensilsCrossed,
// // //   IceCream2,
// // //   Beef,
// // //   Soup,
// // // } from "lucide-react";

// // // import Link from "next/link";
// // // import { useRef, useEffect, useState } from "react";
// // // import { IDanhMuc } from "../lib/cautrucdata";

// // // const iconMap: Record<string, any> = {
// // //   "tra-tra-cay": IceCream2,
// // //   "combo": Pizza,
// // //   "mi-tron-com-chien": UtensilsCrossed,
// // //   "pho-mai-xuc-xich": Beef,
// // //   "mon-an-kem": UtensilsCrossed,
// // //   "mi-cay-7-cap-do": UtensilsCrossed,
// // //   "lau": Soup,
// // //   "tra-sua-truyen-thong": Coffee,
// // // };

// // // export default function DanhMucSection({ data }: { data: IDanhMuc[] }) {
// // //   const scrollRef = useRef<HTMLDivElement>(null);
// // //   const [showButtons, setShowButtons] = useState(false);

// // //   const checkOverflow = () => {
// // //     const el = scrollRef.current;
// // //     if (!el) return;
// // //     setShowButtons(el.scrollWidth > el.clientWidth);
// // //   };

// // //   useEffect(() => {
// // //     checkOverflow();
// // //     window.addEventListener("resize", checkOverflow);
// // //     return () => window.removeEventListener("resize", checkOverflow);
// // //   }, [data]);

// // //   const scrollLeft = () => scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });
// // //   const scrollRight = () => scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });

// // //   return (
// // //     <section className="relative py-4 select-none">

// // //       {/* Button trái */}
// // //       {showButtons && (
// // //         <button
// // //           onClick={scrollLeft}
// // //           className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition"
// // //         >
// // //           <ChevronLeft className="w-6 h-6" />
// // //         </button>
// // //       )}

// // //       {/* Danh mục scroll */}
// // //       <div
// // //         ref={scrollRef}
// // //         className="flex gap-8 px-12 py-2 overflow-x-auto scroll-smooth hide-scrollbar"
// // //       >
// // //         {data
// // //           .sort((a, b) => (a.thu_tu ?? 999) - (b.thu_tu ?? 999))
// // //           .map((dm) => {
// // // const Icon = iconMap[dm.slug ?? "default"] || Pizza;
// // //             return (
// // //               <Link
// // //                 key={dm.id}
// // //                 href={`/danh_muc/${dm.slug}`}
// // //                 className="flex flex-col items-center flex-shrink-0 w-[100px] group"
// // //               >
// // //                 {/* Icon */}
// // //                 <div className="w-16 h-16 bg-white border rounded-full shadow-md flex items-center justify-center group-hover:border-red-500 transition">
// // //                   <Icon className="w-7 h-7 text-red-500" />
// // //                 </div>

// // //                 {/* Name */}
// // //                 <p className="mt-1 text-[12px] font-medium text-center leading-tight text-gray-800 group-hover:text-red-500 line-clamp-2">
// // //                   {dm.ten}
// // //                 </p>
// // //               </Link>
// // //             );
// // //           })}
// // //       </div>

// // //       {/* Button phải */}
// // //       {showButtons && (
// // //         <button
// // //           onClick={scrollRight}
// // //           className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition"
// // //         >
// // //           <ChevronRight className="w-6 h-6" />
// // //         </button>
// // //       )}
// // //     </section>
// // //   );
// // // }


// // "use client";

// // import {
// //   ChevronLeft,
// //   ChevronRight,
// //   Pizza,
// //   Coffee,
// //   UtensilsCrossed,
// //   IceCream2,
// //   Beef,
// //   Soup,
// // } from "lucide-react";

// // import Link from "next/link";
// // import { useRef, useEffect, useState } from "react";
// // import { IDanhMuc } from "../lib/cautrucdata";

// // const iconMap: Record<string, any> = {
// //   "tra-trai-cay": IceCream2,
// //   "combo": Pizza,
// //   "mi-tron-com-chien": UtensilsCrossed,
// //   "pho-mai-xuc-xich": Beef,
// //   "mon-an-kem": UtensilsCrossed,
// //   "mi-cay-7-cap-do": UtensilsCrossed,
// //   "lau": Soup,
// //   "tra-sua-truyen-thong": Coffee,
// //   default: Pizza,
// // };

// // export default function DanhMucSection({ data }: { data: IDanhMuc[] }) {
// //   const scrollRef = useRef<HTMLDivElement>(null);
// //   const [showButtons, setShowButtons] = useState(false);

// //   const checkOverflow = () => {
// //     const el = scrollRef.current;
// //     if (!el) return;

// //     // nếu tổng content > width container → show nút
// //     setShowButtons(el.scrollWidth > el.clientWidth);
// //   };

// //   useEffect(() => {
// //     checkOverflow();
// //     window.addEventListener("resize", checkOverflow);
// //     return () => window.removeEventListener("resize", checkOverflow);
// //   }, [data]);

// //   const scrollLeft = () =>
// //     scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });

// //   const scrollRight = () =>
// //     scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });

// //   return (
// //     <section className="relative py-4 select-none w-full max-w-[960px] mx-auto">

// //       {/* Button trái */}
// //       {showButtons && (
// //         <button
// //           onClick={scrollLeft}
// //           className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
// //         >
// //           <ChevronLeft className="w-6 h-6" />
// //         </button>
// //       )}

// //       {/* Danh sách */}
// //       <div
// //         ref={scrollRef}
// //         className="flex gap-8 px-12 py-2 overflow-x-auto scroll-smooth hide-scrollbar"
// //       >
// //         {data
// //           .sort((a, b) => (a.thu_tu ?? 999) - (b.thu_tu ?? 999))
// //           .map((dm) => {
// //             const slugSafe = dm.slug ?? "default";
// //             const Icon = iconMap[slugSafe] || Pizza;

// //             return (
// //               <Link
// //                 key={dm.id}
// //                 href={`/danh_muc/${slugSafe}`}
// //                 className="flex flex-col items-center flex-shrink-0 w-[100px] group"
// //               >
// //                 <div className="w-16 h-16 bg-white border rounded-full shadow-md flex items-center justify-center group-hover:border-red-500 transition">
// //                   <Icon className="w-7 h-7 text-red-500" />
// //                 </div>

// //                 <p className="mt-1 text-[12px] text-center font-medium leading-tight text-gray-800 group-hover:text-red-500 line-clamp-2">
// //                   {dm.ten}
// //                 </p>
// //               </Link>
// //             );
// //           })}
// //       </div>

// //       {/* Button phải */}
// //       {showButtons && (
// //         <button
// //           onClick={scrollRight}
// //           className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
// //         >
// //           <ChevronRight className="w-6 h-6" />
// //         </button>
// //       )}
// //     </section>
// //   );
// // }

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
// import { IDanhMuc } from "../lib/cautrucdata";

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
//   const [showButtons, setShowButtons] = useState(false);

//   const checkOverflow = () => {
//     const scrollEl = scrollRef.current;
//     const wrapperEl = wrapperRef.current;
//     if (!scrollEl || !wrapperEl) return;

//     setShowButtons(scrollEl.scrollWidth > wrapperEl.clientWidth);
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
//     <section className="relative py-4 select-none">
//       <div ref={wrapperRef} className="relative w-full">

//         {showButtons && (
//           <button
//             onClick={scrollLeft}
//             className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>
//         )}

//         <div
//           ref={scrollRef}
//           className="flex gap-8 px-12 py-2 overflow-x-auto scroll-smooth hide-scrollbar"
//         >
//           {data
//             .sort((a, b) => (a.thu_tu ?? 999) - (b.thu_tu ?? 999))
//             .map((dm) => {
//               const slugSafe = dm.slug ?? "default";
//               const Icon = iconMap[slugSafe] || Pizza;
//               return (
//                 <Link
//                   key={dm.id}
//                   href={`/danh_muc/${slugSafe}`}
//                   className="flex flex-col items-center flex-shrink-0 w-[100px] group"
//                 >
//                   <div className="w-16 h-16 bg-white border rounded-full shadow-md flex items-center justify-center group-hover:border-red-500 transition">
//                     <Icon className="w-7 h-7 text-red-500" />
//                   </div>
//                   <p className="mt-1 text-[12px] font-medium text-center leading-tight text-gray-800 group-hover:text-red-500 line-clamp-2">
//                     {dm.ten}
//                   </p>
//                 </Link>
//               );
//             })}
//         </div>

//         {showButtons && (
//           <button
//             onClick={scrollRight}
//             className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
//           >
//             <ChevronRight className="w-6 h-6" />
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
import { IDanhMuc } from "../lib/cautrucdata";

// Icon mapping
const iconMap: Record<string, any> = {
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [needScroll, setNeedScroll] = useState(false);

  const checkOverflow = () => {
    const scrollEl = scrollRef.current;
    const wrapperEl = wrapperRef.current;
    if (!scrollEl || !wrapperEl) return;

    // Nếu tổng chiều rộng danh mục > wrapper → cần scroll → show nút
    setNeedScroll(scrollEl.scrollWidth > wrapperEl.clientWidth);
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [data]);

  const scrollLeft = () =>
    scrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });

  const scrollRight = () =>
    scrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });

  return (
    <section className="relative  select-none">
      <div ref={wrapperRef} className="relative w-full">

        {/* Button trái */}
        {needScroll && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20
                       bg-white border shadow-md rounded-full p-2
                       hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Danh mục */}
        <div
          ref={scrollRef}
          className="flex gap-5 px-10 py-2 overflow-x-auto scroll-smooth hide-scrollbar"
        >
          {data
            .sort((a, b) => (a.thu_tu ?? 999) - (b.thu_tu ?? 999))
            .map((dm) => {
              const slugSafe = dm.slug ?? "default";
              const Icon = iconMap[slugSafe] || Pizza;

              return (
                <Link
                  key={dm.id}
                  href={`/danh_muc/${slugSafe}`}
                  className="flex flex-col items-center flex-shrink-0 w-[100px] group"
                >
                  <div className="w-16 h-16 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center group-hover:border-red-500 transition">
                    <Icon className="w-7 h-7 text-red-500" />
                  </div>
                  <p className="mt-1 text-[12px] font-medium text-center leading-tight text-gray-800 group-hover:text-red-500 line-clamp-2">
                    {dm.ten}
                  </p>
                </Link>
              );
            })}
        </div>

        {/* Button phải */}
        {needScroll && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20
                       bg-white border shadow-md rounded-full p-2
                       hover:bg-gray-100 transition">
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>
    </section>
  );
}
