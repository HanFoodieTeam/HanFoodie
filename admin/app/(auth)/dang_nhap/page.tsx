"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    if (!email || !password) return alert("Vui lòng nhập đủ thông tin!");

    try {
      setLoading(true);

      const res = await fetch("/api/dang_nhap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mat_khau: password }),
      });

      const json = await res.json();

      if (json.success) {
        window.location.href = "/don_hang";
      } else {
        alert(json.message);
      }
    } catch {
      alert("Không thể kết nối server");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Đăng nhập Admin
        </h1>

        <label className="font-semibold">Email</label>
        <input
          type="email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>

        <label className="font-semibold">Mật khẩu</label>
        <input
          type="password"
          className="w-full border p-2 rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${loading ? "bg-gray-400" : "bg-blue-600"
            }`}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

      </div>
    </div>
  );
}
