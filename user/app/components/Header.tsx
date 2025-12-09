


"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import LoginForm from "./dangnhap";
import RegisterForm from "./dang_ky";
import { INguoiDung } from "../lib/cautrucdata";
import { useCart } from "../context/giohangcontext";
import QuenMatKhauForm from "./quen_mat_khau";

export default function Header() {
  const { count } = useCart();
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [nguoiDung, setNguoiDung] = useState<INguoiDung | null>(null);
  const [showForgot, setShowForgot] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Lấy người dùng
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
    localStorage.clear();
    sessionStorage.clear();
    setNguoiDung(null);
    setUserOpen(false);
    window.location.reload();
  };

  return (
    <>
      <header
        style={{ "--header-h": "72px" } as React.CSSProperties}
        className="fixed top-0 left-0 w-full bg-[#6A0A0A] text-white shadow-md z-50 h-[72px]"
      >
        <div
          className="container mx-auto flex justify-between items-center h-full px-4 
                     max-w-[80%] max-[950px]:max-w-[100%]"
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="HanFoodie Logo" className="h-16 w-auto" />
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden md:flex space-x-8 text-lg">
            <Link href="/">Trang chủ</Link>
            <Link href="/san_pham">Sản phẩm</Link>
            <Link href="/bai_viet">Tin tức</Link>
            <Link href="/lien_he">Liên hệ</Link>
          </nav>

          {/* ICONS DESKTOP */}
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

            {/* USER DROPDOWN (desktop) */}
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
                      <Link
                        href="/doi_mat_khau"
                        className="flex px-4 py-2 hover:bg-gray-200 rounded-lg"
                      >
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
                        onClick={() => { setIsLogin(false); setShowAuth(true); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg"
                      >
                        Đăng ký
                      </button>

                      <button
                        onClick={() => { setIsLogin(true); setShowAuth(true); }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg"
                      >
                        Đăng nhập
                      </button>
                      <button
                        onClick={() => setShowForgot(true)}
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

          {/* ICONS MOBILE */}
          <div className="flex md:hidden items-center space-x-4">
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

            <button onClick={() => setOpenMenu(!openMenu)}>
              {openMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* MOBILE OVERLAY */}
          {openMenu && (
            <div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setOpenMenu(false)}
            />
          )}

          {/* MOBILE MENU */}
          <div
            className={`fixed top-0 right-0 z-50 h-full w-64 bg-white text-gray-800 transition-transform duration-300 md:hidden
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
              <Link href="/san_pham" onClick={() => setOpenMenu(false)}>
                Sản phẩm
              </Link>
              <Link href="/bai_viet" onClick={() => setOpenMenu(false)}>
                Tin tức
              </Link>
              <Link href="/lien_he" onClick={() => setOpenMenu(false)}>
                Liên hệ
              </Link>
            </nav>

            <div className="border-t mt-4 p-4">
              {nguoiDung ? (
                <>
                  <p className="font-medium text-[#6A0A0A] mb-2">
                    Xin chào, {nguoiDung.ho_ten}
                  </p>
                  <Link href="/ho_so" onClick={() => setOpenMenu(false)} className="block py-2">
                    Hồ sơ
                  </Link>
                  <Link href="/doi_mat_khau" onClick={() => setOpenMenu(false)} className="block py-2">
                    Đổi mật khẩu
                  </Link>
                  <button
                    onClick={() => {
                      handleDangXuat();
                      setOpenMenu(false);
                    }}
                    className="w-full text-left py-2 text-red-500"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsLogin(true); setShowAuth(true);
                      setOpenMenu(false);
                    }}
                    className="block w-full text-left py-2"
                  >
                    Đăng ký
                  </button>
                  <button
                    onClick={() => {
                      setIsLogin(true); setShowAuth(true);
                      setOpenMenu(false);
                    }}
                    className="block w-full text-left py-2"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => { setShowForgot(true); setOpenMenu(false); }}
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

      {/* POPUP AUTH */}
      {showAuth && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/25"
          onClick={() => setShowAuth(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-xl w-[400px] max-w-[90%] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowAuth(false)}
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

      {/* POPUP REGISTER */}
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
                setShowAuth(true); 
              }}
            />

          </div>
        </div>
      )}

      {/* POPUP QUÊN MẬT KHẨU */}
      {showForgot && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/25"
          onClick={() => setShowForgot(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-xl w-[400px] max-w-[90%] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowForgot(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <QuenMatKhauForm
              onClose={() => setShowForgot(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
