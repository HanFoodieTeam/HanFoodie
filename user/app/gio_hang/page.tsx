"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { IGioHang } from "../lib/cautrucdata";

export default function TrangGioHang() {
  const [gioHang, setGioHang] = useState<IGioHang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setLoading(false);

        const res = await fetch("/api/gio_hang", {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Không thể tải giỏ hàng");

        const data: IGioHang[] = await res.json();
        setGioHang(data);
      } catch (err) {
        console.error(err);
        setGioHang([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (id: number, so_luong: number) => {
    if (so_luong <= 0) return;
    try {
      await fetch(`/api/gio_hang/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ so_luong }),
      });
      setGioHang((prev) =>
        prev.map((item) => (item.id === id ? { ...item, so_luong } : item))
      );
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
    }
  };

  const removeItem = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;
    try {
      await fetch(`/api/gio_hang/${id}`, { method: "DELETE" });
      setGioHang((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };

  const tongTien = gioHang.reduce((sum, item) => {
    const gia_goc = item.bien_the?.san_pham?.gia_goc ?? 0;
    const gia_them = item.bien_the?.gia_them ?? 0;
    const so_luong = item.so_luong ?? 1;
    return sum + (gia_goc + gia_them) * so_luong;
  }, 0);

  if (loading)
    return <div className="p-6 text-gray-500">Đang tải giỏ hàng...</div>;

  if (!gioHang.length)
    return (
      <div className="p-6 text-center text-gray-500">
        Giỏ hàng của bạn đang trống 😢
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">🛒 Giỏ hàng của bạn</h1>

      <div className="space-y-4">
        {gioHang.map((item) => {
          const sp = item.bien_the?.san_pham;
          const tong_gia =
            (sp?.gia_goc ?? 0) + (item.bien_the?.gia_them ?? 0);

          return (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div>
                  <img
                    src={sp?.hinh || "/noing.png"}
                    alt="Ảnh sản phẩm"
                    className="w-[200px] h-[200px] object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h2 className="font-medium">{sp?.ten}</h2>
                  <p className="text-gray-600 text-sm">
                    Biến thể: {item.bien_the?.ten || "Không có"}
                  </p>

                  {/*  Hiển thị món thêm */}
                  {item.json_mon_them && item.json_mon_them.length > 0 && (
                    <p>
                      Món thêm:{" "}
                      {item.json_mon_them.map((m) => `${m.ten}`).join(", ")}
                    </p>
                  )}

                  {item.json_tuy_chon && (
                    <p>
                      Tùy chọn:{" "}
                      {Object.entries(item.json_tuy_chon)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(", ")}
                    </p>
                  )}

                  <p className="text-black-600 font-semibold mt-1">
                    {sp?.gia_goc
                      .toLocaleString("vi-VN")}
                    ₫
                  </p>
                  <p className="text-red-600 font-semibold mt-1">
                    {(tong_gia + (item.json_mon_them?.reduce((sum, m) => sum + (m.gia_them ?? 0), 0) ?? 0))
                      .toLocaleString("vi-VN")}
                    ₫
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity(item.id, (item.so_luong ?? 1) - 1)
                  }
                  className="p-1 rounded border hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span>{item.so_luong ?? 1}</span>
                <button
                  onClick={() =>
                    updateQuantity(item.id, (item.so_luong ?? 1) + 1)
                  }
                  className="p-1 rounded border hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 ml-3"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-right border-t pt-4">
        <p className="text-lg font-semibold">
          Tổng cộng:{" "}
          <span className="text-red-600">
            {tongTien.toLocaleString("vi-VN")}₫
          </span>
        </p>
        <button className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Thanh toán
        </button>
      </div>
    </div>
  );
}
