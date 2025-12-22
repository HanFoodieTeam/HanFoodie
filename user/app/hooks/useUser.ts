"use client";

import { useState, useEffect } from "react";

export interface IUser {
  id: number;
  ho_ten: string;
  email?: string;
  sdt?: string;
  ngay_sinh?: string;
  hinh?: string | null;
}

// GLOBAL STATE TRONG BỘ NHỚ
let cachedUser: IUser | null = null;

// DANH SÁCH COMPONENT LẮNG NGHE
let listeners: ((u: IUser | null) => void)[] = [];

// ===============================
// 🔥 HÀM CẬP NHẬT USER GLOBAL
// ===============================
export function updateUser(u: IUser | null) {
  cachedUser = u;

  if (u) {
    localStorage.setItem("user", JSON.stringify(u));
  } else {
    localStorage.removeItem("user");
  }

  // thông báo cho mọi component dùng useUser
  listeners.forEach((fn) => fn(u));
}

// ===============================
// 🔥 HOOK LẤY USER TOÀN APP
// ===============================
export function useUser() {
  const [user, setUser] = useState<IUser | null>(cachedUser);

  useEffect(() => {
    // Nếu đã có cache → dùng ngay
    if (cachedUser) {
      setUser(cachedUser);
    } else {
      // Lấy từ localStorage
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored) as IUser;
        cachedUser = parsed;
        setUser(parsed);
      }
    }

    // Nếu có token thì gọi API để lấy user mới nhất
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        try {
          const res = await fetch("/api/ho_so", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          const json = await res.json();

          if (res.ok && json.nguoi_dung) {
            cachedUser = json.nguoi_dung;
            localStorage.setItem("user", JSON.stringify(json.nguoi_dung));
            setUser(json.nguoi_dung);
          }
        } catch (e) {
          console.log("Không thể load hồ sơ:", e);
        }
      })();
    }

    // Đăng ký listener
    const listener = (u: IUser | null) => setUser(u);
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return user;
}
