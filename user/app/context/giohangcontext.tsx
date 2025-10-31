"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>; // ✅ thêm dòng này
  reloadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  const reloadCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return setCount(0);

      const res = await fetch("/api/gio_hang", {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      if (!res.ok) return setCount(0);
      const data = await res.json();
      setCount(data.length);
    } catch {
      setCount(0);
    }
  };

  useEffect(() => {
    reloadCart();
  }, []);

  return (
    <CartContext.Provider value={{ count, setCount, reloadCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart phải được dùng trong CartProvider");
  return context;
};
