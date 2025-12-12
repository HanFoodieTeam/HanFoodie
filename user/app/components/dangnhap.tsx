
"use client";

import { useState } from "react";
import { INguoiDung } from "@/app/lib/cautrucdata";

interface LoginFormProps {
  onClose: () => void;
  onLoginSuccess: (nguoiDung: INguoiDung) => void;
  onSwitchToRegister: () => void;   // ✅ THÊM DÒNG NÀY
}

export default function LoginForm({
  onClose,
  onLoginSuccess,
  onSwitchToRegister,   // ✅ THÊM DÒNG NÀY
}: LoginFormProps) {
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

      const nguoiDung: INguoiDung = {
        ...data.nguoi_dung,
        sdt: Number(data.nguoi_dung.sdt),
      };

      localStorage.setItem("nguoi_dung", JSON.stringify(nguoiDung));
      localStorage.setItem("token", data.token);

      setThongBao("Đăng nhập thành công!");


      setTimeout(() => onClose(), 1000);
    } catch (error) {
      setThongBao(error instanceof Error ? error.message : "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

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
        required />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#6A0A0A] text-white py-2 rounded-lg hover:bg-[#800000] transition"
      >
        {loading ? "Đang xử lý..." : "Đăng nhập"}
      </button>
      <p className="text-center text-sm">
        Bạn chưa có tài khoản tại HanFoodie?
        <span
          className="text-blue-600 cursor-pointer ml-1 hover:underline"
          onClick={(e) => {
            e.preventDefault();
            console.log("ĐÃ CLICK ĐĂNG nhập");
            onSwitchToRegister?.();
          }} >
          Đăng ký
        </span>
      </p>

      {thongBao && <p className="text-center text-sm text-red-500">{thongBao}</p>}
    </form>
  );
}

