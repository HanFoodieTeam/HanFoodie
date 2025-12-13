"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState("");
  const [matKhauMoi, setMatKhauMoi] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const t = searchParams.get("token");
    if (t) setToken(t);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return setMessage("Token không hợp lệ");

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/dat_lai_mat_khau", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, matKhauMoi }),
      });

      const data: { message?: string; error?: string } = await res.json();

      if (res.ok) {
        setMessage(data.message || "Đặt lại mật khẩu thành công!");
        setTimeout(() => router.push("/"), 2000);
      } else {
        setMessage(data.error || "Có lỗi xảy ra");
      }
    } catch (err) {
      setMessage("Không thể kết nối server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold text-center mb-4">Đặt lại mật khẩu</h2>
      <input
        type="password"
        placeholder="Nhập mật khẩu mới"
        value={matKhauMoi}
        onChange={(e) => setMatKhauMoi(e.target.value)}
        required
        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0A0A]"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-[#6A0A0A] text-white p-3 rounded-lg hover:bg-red-700 transition"
      >
        {loading ? "Đang lưu..." : "Đặt lại mật khẩu"}
      </button>
      {message && (
        <p className={`text-center mt-2 text-sm ${message.includes("thành công") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
