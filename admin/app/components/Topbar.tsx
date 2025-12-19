"use client";

import { useEffect, useState } from "react";

export default function Topbar() {
  const [ten, setTen] = useState("");
  const [open, setOpen] = useState(false);

  // Lấy thông tin user từ token cookie
  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setTen(data.user.ten);
      });
  }, []);

  // Đăng xuất
  const handleLogout = async () => {
    await fetch("/api/dang_xuat", { method: "POST" });
    window.location.href = "/dang_nhap"; // Redirect về trang login
  };

  return (
    <header className="h-15 bg-white shadow flex items-center justify-between px-4 relative">
      <h1 className="text-lg font-semibold"></h1>

      <div className="relative">
        {/* Nút bấm */}
        <span
          onClick={() => setOpen(!open)}
          className="text-sm text-gray-700 cursor-pointer hover:text-black select-none">
          Xin chào,  <span className="font-bold">{ten}</span>
        </span>

        {/* Dropdown menu */}
        {open && (
          <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-md py-1 z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
