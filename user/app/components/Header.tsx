"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import LoginForm from "./dangnhap";
import RegisterForm from "./dang_ky";
import { INguoiDung } from "../lib/cautrucdata";
import { useCart } from "../context/giohangcontext";

export default function Header() {

  const { count } = useCart();

  const [openMenu, setOpenMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [nguoiDung, setNguoiDung] = useState<INguoiDung | null>(null);

  const timeoutRef = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  //  Lấy người dùng từ localStorage
  useEffect(() => {
    const data = localStorage.getItem("nguoi_dung");
    if (data) setNguoiDung(JSON.parse(data));
  }, []);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const openWithDelay = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setUserOpen(true);
  };
  const closeWithDelay = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setUserOpen(false), 150);
  };

  const handleDangXuat = () => {
     //  Xóa toàn bộ dữ liệu localStorage
  localStorage.clear();
  sessionStorage.clear();
    // localStorage.removeItem("nguoi_dung");
    // localStorage.removeItem("token");
    setNguoiDung(null);
    setUserOpen(false);

    // reload lại để chắc chắn
    window.location.reload();
  };

  return (
    <>
      <header
        style={{ "--header-h": "72px" } as React.CSSProperties}
        className="fixed top-0 left-0 w-full bg-[#6A0A0A] text-white shadow-md z-50 h-[72px]"
      >
        <div className="container mx-auto flex justify-between items-center h-full px-4 max-w-[80%]">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="HanFoodie Logo" className="h-16 w-auto" />
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex space-x-8 text-lg">
            <Link href="/">Trang chủ</Link>
            <Link href="/san_pham">Sản phẩm</Link>
            <Link href="/tin-tuc">Tin tức</Link>
            <Link href="/lien-he">Liên hệ</Link>
          </nav>

          {/* ICONS */}
          <div className="hidden md:flex items-center space-x-5">
            <button onClick={() => setShowSearch((v) => !v)}>
              <Search className="w-6 h-6" />
            </button>

            <Link href="/yeu_thich">
              <Heart className="w-6 h-6" />
            </Link>

            <Link href="/gio_hang" className="relative">
              <ShoppingBag className="w-6 h-6" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* USER DROPDOWN */}
            <div
              ref={menuRef}
              className="relative"
              onMouseEnter={openWithDelay}
              onMouseLeave={closeWithDelay}
            >
              <button
                onClick={() => setUserOpen((p) => !p)}
                className="hover:text-gray-200 transition flex items-center p-1 rounded"
              >
                {nguoiDung ? (
                  <span className="font-semibold text-base">{nguoiDung.ho_ten}</span>
                ) : (
                  <User className="w-6 h-6" />
                )}
              </button>

              <div
                className={`absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-xl shadow-lg transform origin-top-right z-50
                  ${userOpen
                    ? "opacity-100 visible translate-y-0 scale-100"
                    : "opacity-0 invisible translate-y-1 scale-95"
                  }
                  transition-all duration-150`}
              >
                <div className="py-1">
                  {nguoiDung ? (
                    <>
                      <Link href="/ho_so" className="flex px-4 py-2 hover:bg-gray-200 rounded-lg">
                        Hồ sơ
                      </Link>
                      <Link href="/doi_mat_khau" className="flex px-4 py-2 hover:bg-gray-200 rounded-lg">
                        Đổi mật khẩu
                      </Link>
                      <button
                        onClick={handleDangXuat}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg"
                      >
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowRegister(true)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg"
                      >
                        Đăng ký
                      </button>
                      <button
                        onClick={() => setShowLogin(true)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg"
                      >
                        Đăng nhập
                      </button>
                      <button
                        // onClick={() => setShowLogin(true)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg"
                      >
                        Quên mật khẩu
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE MENU */}
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden text-white"
          >
            {openMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* MOBILE MENU OVERLAY */}
          {openMenu && (
            <div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setOpenMenu(false)}
            />
          )}

          {/* MOBILE MENU PANEL */}
          <div
            className={`fixed top-0 right-0 z-50 h-full w-64 bg-white text-gray-800 transform transition-transform duration-300 md:hidden
    ${openMenu ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-lg text-[#6A0A0A]">Menu</h2>
              <button onClick={() => setOpenMenu(false)}>
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <nav className="flex flex-col space-y-4 p-4 text-base">
              <Link href="/" onClick={() => setOpenMenu(false)}>
                Trang chủ
              </Link>
              <Link href="/san-pham" onClick={() => setOpenMenu(false)}>
                Sản phẩm
              </Link>
              <Link href="/tin-tuc" onClick={() => setOpenMenu(false)}>
                Tin tức
              </Link>
              <Link href="/lien-he" onClick={() => setOpenMenu(false)}>
                Liên hệ
              </Link>
            </nav>

            <div className="border-t mt-4 p-4">
              {nguoiDung ? (
                <>
                  <p className="font-medium text-[#6A0A0A] mb-2">
                    Xin chào, {nguoiDung.ho_ten}
                  </p>
                  <Link href="/ho_so" onClick={() => setOpenMenu(false)} className="block py-2" >
                    Hồ sơ
                  </Link>
                  <Link href="/doi_mat_khau" onClick={() => setOpenMenu(false)} className="block py-2" >
                    Đổi mật khẩu
                  </Link>
                  <button onClick={() => {
                    handleDangXuat(); setOpenMenu(false);
                  }}
                    className="w-full text-left py-2 text-red-500"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { setShowRegister(true); setOpenMenu(false); }}
                    className="block w-full text-left py-2" >
                    Đăng ký
                  </button>
                  <button onClick={() => { setShowLogin(true); setOpenMenu(false); }}
                    className="block w-full text-left py-2" >
                    Đăng nhập
                  </button>
                  <button
                    // onClick={() => {
                    //   setShowLogin(true);
                    //   setOpenMenu(false);
                    // }}
                    className="block w-full text-left py-2"
                  >
                    Quên mật khẩu
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* FORM ĐĂNG NHẬP */}
      {showLogin && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/25"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-xl w-[400px] max-w-[90%] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <LoginForm
  onClose={() => setShowLogin(false)}
  onLoginSuccess={(nguoiDungMoi) => setNguoiDung(nguoiDungMoi)}
  onSwitchToRegister={() => {
    setShowLogin(false);
    setShowRegister(true);
  }}
/>

          </div>
        </div>
      )}

      {/* FORM ĐĂNG KÝ */}
      {showRegister && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/25"
          onClick={() => setShowRegister(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-xl w-[400px] max-w-[90%] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <RegisterForm
  onClose={() => setShowRegister(false)}
  onRegisterSuccess={(nguoiDungMoi) => {
    localStorage.setItem("nguoi_dung", JSON.stringify(nguoiDungMoi));
    setNguoiDung(nguoiDungMoi);
  }}
  onSwitchToLogin={() => {
    setShowRegister(false);
    setShowLogin(true);
  }}
/>

          </div>
        </div>
      )}
    </>
  );
}
