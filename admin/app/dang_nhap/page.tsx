"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) return alert("Nhập đủ thông tin!");

    setLoading(true);
const res = await fetch("/api/dang_nhap", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email,
    mat_khau: password, // 👈 QUAN TRỌNG
  }),
});


    const json = await res.json();
    setLoading(false);

    if (json.success) {
      router.push("/");
    } else {
      alert(json.message);
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
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="font-semibold">Mật khẩu</label>
        <input
          type="password"
          className="w-full border p-2 rounded mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </div>
    </div>
  );
}
