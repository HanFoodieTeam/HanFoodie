"use client";

import { useState } from "react";
import { INguoiDung } from "@/app/lib/cautrucdata";
import RegisterForm from "./dang_ky"; // ✅ import form đăng ký

interface LoginFormProps {
  onClose: () => void;
  onLoginSuccess: (nguoiDung: INguoiDung) => void;
}

export default function LoginForm({ onClose, onLoginSuccess }: LoginFormProps) {
  const [showRegister, setShowRegister] = useState(false); // ✅ bật form đăng ký

  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [loading, setLoading] = useState(false);
  const [thongBao, setThongBao] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setThongBao("");

    try {
      const res = await fetch("/api/dang_nhap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mat_khau: matKhau }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.thong_bao || "Đăng nhập thất bại");

      const nguoiDung = {
        ...data.nguoi_dung,
        sdt: Number(data.nguoi_dung.sdt),
      };

      localStorage.setItem("nguoi_dung", JSON.stringify(nguoiDung));
      localStorage.setItem("token", data.token);

      setThongBao("Đăng nhập thành công!");
      onLoginSuccess(nguoiDung);
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      setThongBao(error instanceof Error ? error.message : "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Nếu bấm “Đăng ký” thì hiển thị form đăng ký
  if (showRegister) {
    return (
      <RegisterForm
        onClose={onClose}
        onRegisterSuccess={onLoginSuccess}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Đăng nhập</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded-lg p-2"
        required
      />

      <input
        type="password"
        placeholder="Mật khẩu"
        value={matKhau}
        onChange={(e) => setMatKhau(e.target.value)}
        className="w-full border rounded-lg p-2"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#6A0A0A] text-white py-2 rounded-lg hover:bg-[#800000] transition"
      >
        {loading ? "Đang xử lý..." : "Đăng nhập"}
      </button>

      {thongBao && <p className="text-center text-sm text-gray-600">{thongBao}</p>}

      {/* 🔹 Dòng thêm mới */}
      <p className="text-center text-sm text-gray-600">
        Bạn mới đến <span className="font-semibold text-[#6A0A0A]">HanFoodie</span>?{" "}
        <button
          type="button"
          onClick={() => setShowRegister(true)} // ✅ mở form đăng ký
          className="text-[#6A0A0A] hover:underline font-medium"
        >
          Đăng ký
        </button>
      </p>
    </form>
  );
}
