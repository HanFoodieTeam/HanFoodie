"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function VnpayHandler({
  onSuccess,
}: {
  onSuccess: (data: { idDon: number; maDon: string }) => void;
}) {
  const search = useSearchParams();
  const status = search.get("status");
  const idDon = search.get("id");
  const maDon = search.get("maDon");

  useEffect(() => {
    const handle = async () => {
      if (status !== "success" || !idDon || !maDon) return;

      const donHangTam = localStorage.getItem("donHangTam");
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("nguoi_dung") || "{}");

      if (donHangTam && token && user?.id) {
        await fetch("/api/xu_ly_thanh_toan_vnpay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            idDon: Number(idDon),
            maDon,
            idNguoiDung: user.id,
            danhSach: JSON.parse(donHangTam),
          }),
        });

        localStorage.removeItem("donHangTam");
      }

      onSuccess({
        idDon: Number(idDon),
        maDon,
      });

      window.history.replaceState({}, "", "/dat_hang");
    };

    handle();
  }, [status, idDon, maDon]);

  return null;
}
