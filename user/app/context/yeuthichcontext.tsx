"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface YeuThichContextType {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  reloadYeuThich: () => Promise<void>;
}

const YeuThichContext = createContext<YeuThichContextType | undefined>(
  undefined
);

export const YeuThichProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [count, setCount] = useState(0);

  const reloadYeuThich = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return setCount(0);

      const res = await fetch("/api/yeu_thich", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) return setCount(0);

      const data = await res.json();

      // data.data vì API yeu_thich trả { success, data }
      setCount(data.data?.length || 0);
    } catch {
      setCount(0);
    }
  };

  useEffect(() => {
    reloadYeuThich();
  }, []);

  return (
    <YeuThichContext.Provider
      value={{ count, setCount, reloadYeuThich }}
    >
      {children}
    </YeuThichContext.Provider>
  );
};

export const useYeuThich = () => {
  const context = useContext(YeuThichContext);
  if (!context)
    throw new Error("useYeuThich phải được dùng trong YeuThichProvider");
  return context;
};
