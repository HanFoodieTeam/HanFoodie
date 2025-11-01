"use client";

import { useEffect, useState, useMemo, JSX } from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import {
  IGioHang,
  ISanPham,
  IBienThe,
  ILoaiTuyChon,
  IMonThem,
} from "../lib/cautrucdata";
import { useCart } from "../context/giohangcontext";
import PopupSuaGioHang from "../components/popupsuagiohang";
import { useRouter } from "next/navigation";



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

export default function TrangGioHang(): JSX.Element {
  const router = useRouter();

  const { reloadCart, setCount } = useCart();

  const [gioHang, setGioHang] = useState<IGioHang[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<PopupData | null>(null);
  const [macDinh, setMacDinh] = useState<MacDinhProps | null>(null);

  const handleDatHang = () => {
    const selected = gioHang.filter((item) => selectedItems.includes(item.id));
    localStorage.setItem("donHangTam", JSON.stringify(selected));
    router.push("/dat_hang");
  };

  //  Lấy danh sách giỏ hàng
  const fetchCart = async (): Promise<void> => {
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

  //  Chọn / bỏ chọn sản phẩm
  const toggleSelect = (id: number): void => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  //  Chọn tất cả
  const handleSelectAll = (): void => {
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

  //  Tính tổng tiền sản phẩm đã chọn
  const tongTien: number = useMemo(() => {
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

  //  Cập nhật số lượng
  const updateQuantity = async (id: number, so_luong: number): Promise<void> => {
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
  const removeItem = async (id: number): Promise<void> => {
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
  const handleEdit = async (item: IGioHang): Promise<void> => {
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

  if (loading)
    return <div className="p-6 text-gray-500 text-center mt-[var(--header-h)]"
      style={{ "--header-h": "80px" } as React.CSSProperties}>

      Đang tải giỏ hàng...</div>;

  return (
  <div
    className="min-h-screen bg-[#fdf9f7] p-6"
    style={{ "--header-h": "60px" } as React.CSSProperties}
  >
    {/* ✅ Giữ chiều cao tối thiểu để sticky hoạt động */}
    <div className="max-w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start min-h-[80vh]">
      {/* 🟢 Cột trái - danh sách sản phẩm */}
      <div className="lg:col-span-2 mt-[var(--header-h)]">
        {/* Chọn tất cả */}
        <div className="flex items-center mb-3 gap-4 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition sticky top-[calc(var(--header-h)+10px)] z-20">
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className="w-4 h-4 accent-[#e8594f]"
          />
          <span className="ml-2 text-gray-800 text-base font-medium">
            Chọn tất cả
          </span>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="space-y-2.5">
          {gioHang.map((item) => {
            const sp = item.bien_the?.san_pham;
            const giaGoc = sp?.gia_goc ?? 0;
            const giaThem = item.bien_the?.gia_them ?? 0;
            const monThemSum =
              item.json_mon_them?.reduce((s, m) => s + (m.gia_them ?? 0), 0) ??
              0;
            const tong = (giaGoc + giaThem + monThemSum) * (item.so_luong ?? 1);
            const checked = selectedItems.includes(item.id);

            return (
              <div
                key={item.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition"
              >
                {/* Checkbox */}
                <div className="flex-shrink-0 flex items-center justify-center w-6">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSelect(item.id)}
                    className="w-4 h-4 accent-[#e8594f]"
                  />
                </div>

                {/* Hình ảnh */}
                <img
                  src={sp?.hinh || "/noing.png"}
                  alt={sp?.ten || "Sản phẩm"}
                  className="w-[90px] h-[90px] rounded-lg object-cover"
                />

                {/* Thông tin */}
                <div className="flex-1">
                  <h2 className="font-semibold text-[15px]">{sp?.ten}</h2>
                  <p className="text-sm text-gray-600">{item.bien_the?.ten}</p>

                  {item.json_tuy_chon &&
                    Object.keys(item.json_tuy_chon).length > 0 && (
                      <p className="text-sm text-gray-600">
                        {Object.entries(item.json_tuy_chon)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(", ")}
                      </p>
                    )}

                  {item.json_mon_them && item.json_mon_them.length > 0 && (
                    <p className="text-sm text-gray-600">
                      {item.json_mon_them.map((m) => m.ten).join(", ")}
                    </p>
                  )}

                  {item.ghi_chu && (
                    <p
                      className="text-sm text-gray-500 truncate max-w-[420px]"
                      title={item.ghi_chu}
                    >
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

                {/* Số lượng + Xóa + Giá */}
                <div className="flex flex-col items-end gap-2 justify-between h-full">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, (item.so_luong ?? 1) - 1)
                      }
                      className="px-3 text-gray-700 rounded"
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.so_luong ?? 1}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, (item.so_luong ?? 1) + 1)
                      }
                      className="px-3 text-gray-700 rounded"
                    >
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
      </div>

      {/* 🔴 Cột phải - Thông tin đơn hàng */}
      <div
        className="bg-white p-5 rounded-2xl shadow-sm h-fit sticky"
        style={{ top: "calc(var(--header-h) + 20px)" }}
      >
        <h2 className="text-lg font-semibold mb-4">Thông tin đơn hàng</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>
              Tạm tính ({selectedItems.length}{" "}
              {selectedItems.length > 1 ? "sản phẩm" : "sản phẩm"})
            </span>
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

      {/* Popup sửa món */}
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
