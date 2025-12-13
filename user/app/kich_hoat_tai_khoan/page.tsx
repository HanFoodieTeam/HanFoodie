"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function KichHoatContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [message, setMessage] = useState("Đang xử lý...");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!token) {
      setMessage("Token không hợp lệ!");
      setIsDone(true);
      return;
    }

    async function activate() {
      try {
        const res = await fetch("/api/xac_thuc_email/kich_hoat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          cache: "no-store",
        });

        const data = await res.json();
        setMessage(data.thong_bao);
        setIsDone(true);

        if (res.ok) {
          const userData = localStorage.getItem("nguoi_dung");
          if (userData) {
            const user = JSON.parse(userData);
            user.kich_hoat = 1;
            localStorage.setItem("nguoi_dung", JSON.stringify(user));
          }
        }
      } catch (err) {
        setMessage("Đã xảy ra lỗi, vui lòng thử lại sau.");
        setIsDone(true);
      }
    }

    activate();
  }, [token]);

  return (
    <div className="bg-white shadow-lg p-6 rounded-xl text-center max-w-md">
      <h2 className="text-lg font-semibold text-[#6A0A0A] mb-2">
        Kích hoạt tài khoản
      </h2>
      {!isDone && (
        <div className="animate-pulse text-gray-500"> Đang xử lý...</div>
      )}
      <p className="mt-2 text-gray-700">{message}</p>
      {isDone && (
        <Link
          href="/"
          className="mt-5 inline-block text-[#6A0A0A] font-medium underline hover:text-red-700"
        >
          Về trang chủ
        </Link>
      )}
    </div>
  );
}

export default function KichHoatPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-[#FBEAEA]">
      <Suspense fallback={<div>Đang tải...</div>}>
        <KichHoatContent />
      </Suspense>
    </div>
  );
}
