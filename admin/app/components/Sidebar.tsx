// components/Sidebar.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Home, Settings, ShoppingCart } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col h-full overflow-y-auto">
      <div className="p-4 font-bold text-xl border-b">HanFoodie Admin</div>

      <nav className="flex-1 p-2">
        {/* Menu item 1 */}
        <div>
          <button
            onClick={() => toggleMenu("dashboard")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100"
          >
            <div className="flex items-center space-x-2">
              <Home size={18} />
              <span>Dashboard</span>
            </div>
            {openMenus["dashboard"] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus["dashboard"] && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/overview" className="block p-2 hover:bg-gray-100 rounded">
                Tổng quan
              </Link>
              <Link href="/stats" className="block p-2 hover:bg-gray-100 rounded">
                Thống kê
              </Link>
            </div>
          )}
        </div>

        {/* Menu item 2 */}
        <div>
          <button
            onClick={() => toggleMenu("products")}
            className="flex items-center justify-between w-full p-2 rounded hover:bg-gray-100"
          >
            <div className="flex items-center space-x-2">
              <ShoppingCart size={18} />
              <span>Quản lý sản phẩm</span>
            </div>
            {openMenus["products"] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {openMenus["products"] && (
            <div className="ml-8 mt-1 space-y-1">
              <Link href="/products" className="block p-2 hover:bg-gray-100 rounded">
                Danh sách
              </Link>
              <Link href="/products/add" className="block p-2 hover:bg-gray-100 rounded">
                Thêm sản phẩm
              </Link>
            </div>
          )}
        </div>

        

        {/* Menu item 3 */}
        <Link href="/settings" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
          <Settings size={18} />
          <span>Cài đặt</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
