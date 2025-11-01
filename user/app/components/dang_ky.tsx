"use client";

import { useState } from "react";
import { INguoiDung } from "../lib/cautrucdata";
import LoginForm from "./dangnhap"; // ✅ import form đăng nhập

interface RegisterFormProps {
  onClose: () => void;
  onRegisterSuccess: (nguoiDungMoi: INguoiDung) => void;
}

export default function RegisterForm({
  onClose,
  onRegisterSuccess,
}: RegisterFormProps) {
  const [showLogin, setShowLogin] = useState(false); // ✅ bật form đăng nhập

  const [ho_ten, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState<number | undefined>();
  const [mat_khau, setMatKhau] = useState("");
  const [go_lai_mat_khau, setGoLaiMatKhau] = useState("");
  const [thongBao, setThongBao] = useState("");
  const [dangThanhCong, setDangThanhCong] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!sdt) return setThongBao("Vui lòng nhập số điện thoại");

    const res = await fetch("/api/dang_ky", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ho_ten, email, sdt, mat_khau, go_lai_mat_khau }),
    });

    const data = await res.json();

    if (!res.ok) {
      setThongBao(data.thong_bao);
    } else {
      setThongBao("Đăng ký thành công!");
      setDangThanhCong(true);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      const nguoiDungMoi: INguoiDung = data.nguoi_dung;
      onRegisterSuccess(nguoiDungMoi);

      setTimeout(() => onClose(), 2000);
    }
  };

  // ✅ Nếu bấm “Đăng nhập” thì hiển thị lại LoginForm
  if (showLogin) {
    return (
      <LoginForm
        onClose={onClose}
        onLoginSuccess={onRegisterSuccess}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-xl font-semibold text-center">Đăng ký</h2>

      <input
        type="text"
        placeholder="Họ tên"
        value={ho_ten}
        onChange={(e) => setHoTen(e.target.value)}
        className="border w-full p-2 rounded"
        disabled={dangThanhCong}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border w-full p-2 rounded"
        disabled={dangThanhCong}
      />

      <input
        type="number"
        placeholder="Số điện thoại"
        value={sdt ?? ""}
        onChange={(e) => setSdt(Number(e.target.value))}
        className="border w-full p-2 rounded"
        disabled={dangThanhCong}
      />

      <input
        type="password"
        placeholder="Mật khẩu"
        value={mat_khau}
        onChange={(e) => setMatKhau(e.target.value)}
        className="border w-full p-2 rounded"
        disabled={dangThanhCong}
      />

      <input
        type="password"
        placeholder="Gõ lại mật khẩu"
        value={go_lai_mat_khau}
        onChange={(e) => setGoLaiMatKhau(e.target.value)}
        className="border w-full p-2 rounded"
        disabled={dangThanhCong}
      />

      <button
        type="submit"
        disabled={dangThanhCong}
        className={`w-full p-2 rounded text-white transition-all ${
          dangThanhCong
            ? "bg-green-600 cursor-not-allowed"
            : "bg-[#6A0A0A] hover:opacity-90"
        }`}
      >
        {dangThanhCong ? "Đăng ký thành công" : "Đăng ký"}
      </button>

      {/* 🔹 Thêm nút “Đăng nhập” */}
      <p className="text-center text-sm text-gray-600">
        Đã có tài khoản?{" "}
        <button
          type="button"
          onClick={() => setShowLogin(true)} // ✅ mở form đăng nhập
          className="text-[#6A0A0A] hover:underline font-medium"
        >
          Đăng nhập
        </button>
      </p>
    </form>
  );
}
