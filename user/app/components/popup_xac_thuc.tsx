"use client";

import { useState } from "react";

interface PopupXacThucProps {
  email: string;
  onClose: () => void;
}

export default function PopupXacThuc({ email, onClose }: PopupXacThucProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSendEmail = async () => {
    setLoading(true);
    setMessage(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Bạn cần đăng nhập lại để xác thực tài khoản!");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/xac_thuc_email/gui_email_xac_thuc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(data.thong_bao || "Gửi email thất bại!");
      return;
    }
    setMessage(
      " Email xác thực đã được gửi! Vui lòng kiểm tra hộp thư và nhấn link xác thực."
    );
    setTimeout(() => {
    onClose();
  }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999] p-3">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">
          ✕
        </button>

        <h2 className="text-lg font-semibold text-[#6A0A0A] mb-3 text-center">
          Xác thực tài khoản
        </h2>

        <p className="text-sm text-gray-700 text-center leading-5">
          Tài khoản của bạn chưa được kích hoạt.
          <br />
          Hãy xác thực để có thể đặt hàng tại <strong className="text-[#6A0A0A]">HanFoodie</strong>!
        </p>

        <div className="mt-4 text-center text-sm">
          Email: <strong className="text-[#6A0A0A]">{email}</strong>
        </div>

        {message && (
          <p className="text-center text-xs mt-3 text-green-600">
            {message}
          </p>
        )}

        <div className="flex gap-3 mt-5">
          <button
            onClick={handleSendEmail}
            disabled={loading}
            className="flex-1 bg-[#6A0A0A] text-white py-2 rounded-lg hover:bg-[#800000] transition">
            {loading ? "Đang gửi..." : "Gửi email xác thực"}
          </button>

          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
            Để sau
          </button>
        </div>
      </div>
    </div>
  );
}
