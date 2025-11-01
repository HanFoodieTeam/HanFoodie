"use client";

import { useEffect, useState, useMemo } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  IGioHang,
  ISanPham,
  IBienThe,
  ILoaiTuyChon,
  IMonThem,
} from "../lib/cautrucdata";
import { useCart } from "../context/giohangcontext";
import PopupSuaGioHang from "../components/popupsuagiohang";

interface PopupData {
  san_pham: ISanPham;
  bien_the?: IBienThe[];
  mon_them?: IMonThem[];
  tuy_chon?: ILoaiTuyChon[];
}

interface MacDinhProps {
  id: number;
  id_bien_the?: number | null;
  so_luong?: number;
  ghi_chu?: string;
  json_mon_them?: { id: number; ten: string; gia_them?: number | null }[];
  json_tuy_chon?: Record<string, string>;
}

export default function TrangGioHang() {
  const router = useRouter();
  const { reloadCart, setCount } = useCart();

  const [gioHang, setGioHang] = useState<IGioHang[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [macDinh, setMacDinh] = useState<MacDinhProps | null>(null);

  //  Lấy giỏ hàng
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setGioHang([]);
        setCount(0);
        return;
      }

      const res = await fetch("/api/gio_hang", {
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Không thể tải giỏ hàng");

      const data: IGioHang[] = await res.json();
      setGioHang(data);
      setCount(data.length);
    } catch (error) {
      console.error("Lỗi tải giỏ hàng:", error);
      setGioHang([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  //  Tổng tiền
  const tongTien = useMemo(() => {
    return gioHang
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => {
        const giaGoc = item.bien_the?.san_pham?.gia_goc ?? 0;
        const giaThem = item.bien_the?.gia_them ?? 0;
        const monThemSum =
          item.json_mon_them?.reduce((s, m) => s + (m.gia_them ?? 0), 0) ?? 0;
        const soLuong = item.so_luong ?? 1;
        return sum + (giaGoc + giaThem + monThemSum) * soLuong;
      }, 0);
  }, [gioHang, selectedItems]);

  //  Toggle chọn
  const toggleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  //  Chọn tất cả
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      setSelectedItems(gioHang.map((item) => item.id));
      setSelectAll(true);
    }
  };

  //  Theo dõi chọn tất cả
  useEffect(() => {
    setSelectAll(
      selectedItems.length === gioHang.length && gioHang.length > 0
    );
  }, [selectedItems, gioHang]);

  //  Cập nhật số lượng
  const updateQuantity = async (id: number, so_luong: number) => {
    if (so_luong <= 0) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`/api/gio_hang/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ so_luong }),
      });

      if (!res.ok) throw new Error("Không thể cập nhật số lượng");
      await fetchCart();
    } catch (error) {
      console.error("Lỗi cập nhật số lượng:", error);
    }
  };

  //  Xóa sản phẩm
  const removeItem = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này không?")) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await fetch(`/api/gio_hang/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchCart();
      setSelectedItems((prev) => prev.filter((x) => x !== id));
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  //  Chỉnh sửa món
  const handleEdit = async (item: IGioHang) => {
    try {
      const sp = item.bien_the?.san_pham;
      if (!sp) return;

      const res = await fetch(`/api/chi_tiet/${sp.id}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Không thể tải chi tiết sản phẩm");

      const data: PopupData = await res.json();
      setPopupData(data);

      setMacDinh({
        id: item.id,
        id_bien_the: item.id_bien_the ?? null,
        so_luong: item.so_luong ?? 1,
        ghi_chu: item.ghi_chu ?? "",
        json_mon_them: item.json_mon_them ?? [],
        json_tuy_chon: item.json_tuy_chon ?? {},
      });

      setShowPopup(true);
    } catch (error) {
      console.error("Lỗi khi chỉnh sửa món:", error);
    }
  };

  //  Đặt hàng
  const handleDatHang = () => {
    const selected = gioHang.filter((item) => selectedItems.includes(item.id));
    localStorage.setItem("donHangTam", JSON.stringify(selected));
    router.push("/dat_hang");
  };

  //  Loading
  if (loading)
    return (
      <div
        className="pt-[80px] text-center py-16 text-gray-500"
        style={{ "--header-h": "72px" } as React.CSSProperties}
      >
        Đang tải giỏ hàng...
      </div>
    );

  //  Render chính
  return (
    <div
      className="min-h-screen  py-3"
      style={{ "--header-h": "72px" } as React.CSSProperties}
    >
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
        {/*  Cột trái - danh sách sản phẩm */}
        <div className="lg:col-span-2 min-h-[80vh] space-y-4">
          {/* Chọn tất cả */}
          <div className="flex items-center gap-4 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition  z-20">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-4 h-4 accent-[#e8594f]"
            />
            <span className="text-gray-800 text-base font-medium">
              Chọn tất cả
            </span>
          </div>

          {/* Danh sách sản phẩm */}
          {gioHang.length > 0 ? (
            <div className="space-y-3">
              {gioHang.map((item) => {
                const sp = item.bien_the?.san_pham;
                const giaGoc = sp?.gia_goc ?? 0;
                const giaThem = item.bien_the?.gia_them ?? 0;
                const monThemSum =
                  item.json_mon_them?.reduce(
                    (s, m) => s + (m.gia_them ?? 0),
                    0
                  ) ?? 0;
                const tong =
                  (giaGoc + giaThem + monThemSum) * (item.so_luong ?? 1);
                const checked = selectedItems.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 accent-[#e8594f]"/>
                    <img
                      src={sp?.hinh || "/noing.png"}
                      alt={sp?.ten || "Sản phẩm"}
                      className="w-[90px] h-[90px] rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="font-semibold text-[15px]">{sp?.ten}</h2>
                      <p className="text-sm text-gray-600">
                        {item.bien_the?.ten}
                      </p>

                      {item.json_tuy_chon &&
                        Object.keys(item.json_tuy_chon).length > 0 && (
                          <p className="text-sm text-gray-600">
                            {Object.entries(item.json_tuy_chon)
                              .map(([k, v]) => `${k}: ${v}`)
                              .join(", ")}
                          </p>
                        )}

                      {item.json_mon_them?.length ? (
                        <p className="text-sm text-gray-600">
                          {item.json_mon_them.map((m) => m.ten).join(", ")}
                        </p>
                      ) : null}

                      {item.ghi_chu && (
                        <p
                          className="text-sm text-gray-500 truncate max-w-[420px]"
                          title={item.ghi_chu}>
                          Ghi chú: {item.ghi_chu}
                        </p>
                      )}

                      <button
                        onClick={() => handleEdit(item)}
                        className="text-[#e8594f] text-sm font-medium mt-1 hover:underline"
                      >
                        Chỉnh sửa món
                      </button>
                    </div>

                    <div className="flex flex-col items-end gap-2 justify-between h-full">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, (item.so_luong ?? 1) - 1)
                          }
                          className="px-3 text-gray-700 rounded">
                          <Minus size={14} />
                        </button>
                        <span>{item.so_luong ?? 1}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, (item.so_luong ?? 1) + 1)
                          }
                          className="px-3 text-gray-700 rounded">
                          <Plus size={14} />
                        </button>
                      </div>

                      <p className="text-red-600 font-semibold mt-2">
                        {tong.toLocaleString("vi-VN")} đ
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 italic py-10">
              Giỏ hàng của bạn đang trống.
            </p>
          )}
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm h-fit sticky self-start top-[calc(var(--header-h)+15px)]">
          <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính ({selectedItems.length} sản phẩm)</span>
              <span>{tongTien.toLocaleString("vi-VN")} đ</span>
            </div>

            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span className="text-green-600 font-medium">Miễn phí</span>
            </div>

            <div className="flex justify-between">
              <span>Giảm giá</span>
              <span>-</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-base">
              <span>Tổng cộng</span>
              <span className="text-red-600">
                {tongTien.toLocaleString("vi-VN")} đ
              </span>
            </div>

            <p className="text-xs text-gray-500 text-right">
              Đã bao gồm VAT (nếu có)
            </p>

            <button
              onClick={handleDatHang}
              disabled={selectedItems.length === 0}
              className={`w-full py-3 rounded-full mt-2 font-semibold transition ${
                selectedItems.length === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#e8594f] text-white hover:bg-[#d94b42]"
              }`}
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>

        {/* Popup chỉnh sửa món */}
        {showPopup && popupData && macDinh && (
          <PopupSuaGioHang
            data={popupData}
            mac_dinh={macDinh}
            onClose={() => setShowPopup(false)}
            onUpdated={async () => {
              await fetchCart();
              await reloadCart();
              setShowPopup(false);
            }}
          />
        )}
      </div>
    </div>
  );
}
