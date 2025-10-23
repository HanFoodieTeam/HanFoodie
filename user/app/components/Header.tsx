// components/Header.tsx (hoặc file Header hiện tại)
"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    // Set a CSS variable --header-h so we can re-use it in main
    <header
  style={{ "--header-h": "72px" } as React.CSSProperties}
  className="fixed top-0 left-0 w-full bg-[#6A0A0A] text-white shadow-md z-50 h-[72px]">

      <div className="max-w-[80%] mx-auto flex justify-between items-center h-full">
        <Link href="/" className="text-lg tracking-wide font-semibold">
          HanFoodie
        </Link>

        <nav className="hidden md:flex space-x-8 text-base">
          <Link href="/" className="hover:text-gray-200 transition">Trang chủ</Link>
          <Link href="/san-pham" className="hover:text-gray-200 transition">Sản phẩm</Link>
          <Link href="/tin-tuc" className="hover:text-gray-200 transition">Tin tức</Link>
          <Link href="/lien-he" className="hover:text-gray-200 transition">Liên hệ</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-5">
          <button onClick={() => setShowSearch(!showSearch)} className="hover:text-gray-200 transition">
            <Search className="w-5 h-5" />
          </button>

          <Link href="/yeu_thich" className="hover:text-gray-200 transition flex items-center">
            <Heart className="w-5 h-5" />
          </Link>

          <Link href="/gio_hang" className="hover:text-gray-200 transition flex items-center relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">3</span>
          </Link>

          <Link href="/ho_so" className="hover:text-gray-200 transition flex items-center">
            <User className="w-5 h-5" />
          </Link>
        </div>

        <button className="md:hidden flex items-center" onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* mobile menu + search dropdown (không đổi) */}
    </header>
  );
}
