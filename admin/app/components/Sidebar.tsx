// components/Sidebar.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Home, ClipboardList, Package, Layers, FileText, Tag, Image as ImageIcon, Gift, Star, Users, Settings, UtensilsCrossed, SlidersHorizontal } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col h-full overflow-y-auto">
      {/* <div className="p-4 font-bold text-xl border-b">HanFoodie Admin</div> */}
      <Link href="/" className="p-4 font-bold text-xl border-b">
        HanFoodie Admin
      </Link>

      <nav className="flex-1 p-2 space-y-2">
        {/* Dashboard */}
        <div>
          <button
            onClick={() => toggleMenu("dashboard")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <Home size={18} />
              <span>Dashboard</span>
            </div>
            {openMenus["dashboard"] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus["dashboard"] && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/overview" className="block p-2 hover:bg-gray-200 rounded">
                Tổng quan
              </Link>
              <Link href="/stats" className="block p-2 hover:bg-gray-200 rounded">
                Thống kê
              </Link>
            </div>
          )}
        </div>

        {/* Đơn hàng */}
        <Link href="/don_hang" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
          <ClipboardList size={18} />
          <span>Quản lý đơn hàng</span>
        </Link>

        {/* Sản phẩm */}
        <div>
          <button
            onClick={() => toggleMenu("san_pham")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <Package size={18} />
              <span>Quản lý sản phẩm</span>
            </div>
            {openMenus["san_pham"] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus["san_pham"] && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/san_pham" className="block p-2 hover:bg-gray-200 rounded">
                Danh sách
              </Link>
              <Link href="/san_pham/them" className="block p-2 hover:bg-gray-200 rounded">
                Thêm sản phẩm
              </Link>
            </div>
          )}
        </div>

        {/* Danh mục */}
        <div>
          <button
            onClick={() => toggleMenu("danh_muc")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <Layers size={18} />
              <span>Quản lý danh mục</span>
            </div>
            {openMenus["danh_muc"] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus["danh_muc"] && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/danh_muc" className="block p-2 hover:bg-gray-200 rounded">
                Danh sách
              </Link>
              <Link href="/danh_muc/them" className="block p-2 hover:bg-gray-200 rounded">
                Thêm danh mục
              </Link>
            </div>
          )}
        </div>


        {/* Món thêm */}
        <div>
          <button
            onClick={() => toggleMenu("mon_them")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <UtensilsCrossed size={18} /> {/* icon mới */}
              <span>Quản lý món thêm</span>
            </div>
            {openMenus["mon_them"] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus["mon_them"] && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/mon_them" className="block p-2 hover:bg-gray-200 rounded">
                Danh sách
              </Link>
              <Link href="/mon_them/them" className="block p-2 hover:bg-gray-200 rounded">
                Thêm món thêm
              </Link>
            </div>
          )}
        </div>

        {/* Loại tùy chọn */}
        <div>
          <button
            onClick={() => toggleMenu("loai_tuy_chon")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <SlidersHorizontal size={18} /> {/* icon mới */}
              <span>Quản lý loại tùy chọn</span>
            </div>
            {openMenus["loai_tuy_chon"] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus["loai_tuy_chon"] && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/loai_tuy_chon" className="block p-2 hover:bg-gray-200 rounded">
                Danh sách
              </Link>
              <Link href="/loai_tuy_chon/them" className="block p-2 hover:bg-gray-200 rounded">
                Thêm loại tùy chọn
              </Link>
            </div>
          )}
        </div>

        {/* Bài viết */}
        <div>
          <button
            onClick={() => toggleMenu("bai_viet")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <FileText size={18} />
              <span>Quản lý bài viết</span>
            </div>
            {openMenus["bai_viet"] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus["bai_viet"] && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/bai_viet" className="block p-2 hover:bg-gray-200 rounded">
                Danh sách
              </Link>
              <Link href="/bai_viet/them" className="block p-2 hover:bg-gray-200 rounded">
                Thêm bài viết
              </Link>
            </div>
          )}
        </div>

        {/* Loại bài viết */}
        <div>
          <button
            onClick={() => toggleMenu("loai_bai_viet")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <Tag size={18} />
              <span>Quản lý loại bài viết</span>
            </div>
            {openMenus["loai_bai_viet"] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus["loai_bai_viet"] && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/loai_bai_viet" className="block p-2 hover:bg-gray-200 rounded">
                Danh sách
              </Link>
              <Link href="/loai_bai_viet/them" className="block p-2 hover:bg-gray-200 rounded">
                Thêm loại bài viết
              </Link>
            </div>
          )}
        </div>

        {/* Banner */}
        <div>
          <button
            onClick={() => toggleMenu("banner")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <ImageIcon size={18} />
              <span>Quản lý banner</span>
            </div>
            {openMenus["banner"] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus["banner"] && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/banner" className="block p-2 hover:bg-gray-200 rounded">
                Danh sách
              </Link>
              <Link href="/banner/them" className="block p-2 hover:bg-gray-200 rounded">
                Thêm banner
              </Link>
            </div>
          )}
        </div>

        {/* Ưu đãi */}
        <div>
          <button
            onClick={() => toggleMenu("ma_giam_gia")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-200"
          >
            <div className="flex items-center space-x-2">
              <Gift size={18} />
              <span>Quản lý mã giảm giá</span>
            </div>
            {openMenus["ma_giam_gia"] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus["ma_giam_gia"] && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/ma_giam_gia" className="block p-2 hover:bg-gray-200 rounded">
                Danh sách
              </Link>
              <Link href="/ma_giam_gia/them" className="block p-2 hover:bg-gray-200 rounded">
                Thêm ưu đãi
              </Link>
            </div>
          )}
        </div>

        {/* Đánh giá */}
        <Link href="/danh_gia" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
          <Star size={18} />
          <span>Quản lý đánh giá</span>
        </Link>

        {/* Người dùng */}
        <Link href="/nguoi_dung" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
          <Users size={18} />
          <span>Quản lý người dùng</span>
        </Link>

        {/* Cài đặt */}
        <Link href="/settings" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200">
          <Settings size={18} />
          <span>Cài đặt</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
