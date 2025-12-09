"use client";

import { useState } from "react";

interface QuenMatKhauProps {
  onClose: () => void;
}

interface ApiResponse {
  message?: string;
  error?: string;
}

export default function QuenMatKhau({ onClose }: QuenMatKhauProps) {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/quen_mat_khau", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data: ApiResponse = await response.json();

      setMessage(
        response.ok
          ? data.message || "Đã gửi email. Kiểm tra hộp thư."
          : data.error || "Có lỗi xảy ra"
      );
    } catch (error) {
      setMessage("Không thể kết nối server. Thử lại sau.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold text-center">Quên mật khẩu</h2>

      <input
        type="email"
        placeholder="Nhập email của bạn"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-[#6A0A0A] text-white p-2 rounded hover:bg-red-700"
      >
        {loading ? "Đang gửi..." : "Gửi email"}
      </button>

      {message && <p className="text-center text-sm">{message}</p>}

      <button
        type="button"
        onClick={onClose}
        className="text-sm text-gray-500 hover:underline mt-2"
      >
        Hủy
      </button>
    </form>
  );
}
