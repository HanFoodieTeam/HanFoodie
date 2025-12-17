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
} from "../../lib/cautrucdata";
import { useCart } from "../context/giohangcontext";
import PopupSuaGioHang from "../components/popupsuagiohang";
import PopupXacThuc from "../components/popup_xac_thuc";
import Image from "next/image";

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

  const [showThongTin, setShowThongTin] = useState(false);

  const [showVerifyPopup, setShowVerifyPopup] = useState(false);



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
    // const selected = gioHang
    //   .filter((item) => selectedItems.includes(item.id))
    //   .map((item) => ({
    //     id_gio_hang: item.id,
    //     so_luong: item.so_luong,
    //     bien_the: item.bien_the,
    //     json_mon_them: item.json_mon_them,
    //     json_tuy_chon: item.json_tuy_chon,
    //   }));

    const selected = gioHang
      .filter(
        (item) =>
          selectedItems.includes(item.id) &&
          !isHetMonByDate(item.bien_the?.san_pham?.het_mon)
      )
      .map((item) => ({
        id_gio_hang: item.id,
        so_luong: item.so_luong,
        bien_the: item.bien_the,
        json_mon_them: item.json_mon_them,
        json_tuy_chon: item.json_tuy_chon,
      }));

    // kiểm tra nếu người dùng kích hoạt rồi mới lưu đơn hàng tạm
    const userData = localStorage.getItem("nguoi_dung");
    const user = userData ? JSON.parse(userData) : null;

    if (user.kich_hoat === 0 || user.kich_hoat === false) {
      setShowVerifyPopup(true);
      return;
    }
    localStorage.setItem("donHangTam", JSON.stringify(selected));
    router.push("/dat_hang");
  };


  function isHetMonByDate(hetMon?: string | null): boolean {
    if (!hetMon) return false; // null => còn bán

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const hetMonDate = new Date(hetMon);
    hetMonDate.setHours(0, 0, 0, 0);

    return hetMonDate >= today;
  }

  //  Loading
  if (loading)
    return (
      <div
        className="pt-[80px] text-center py-16 text-gray-500"
        style={{ "--header-h": "72px" } as React.CSSProperties}>
        Đang tải giỏ hàng...
      </div>
    );

  //  Render chính
  return (
    <div
      className="min-h-screen py-3 pb-[80px]" style={{ "--header-h": "72px" } as React.CSSProperties}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">

        <div className="lg:col-span-2 min-h-[80vh] space-y-4">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition  z-20">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-4 h-4 accent-[#e8594f]" />
            <span className="text-gray-800 text-base font-medium">
              Chọn tất cả
            </span>
          </div>

          {gioHang.length > 0 ? (
            <div className="space-y-3">
              {gioHang.map((item) => {
                const sp = item.bien_the?.san_pham;

                const isHetMon = isHetMonByDate(sp?.het_mon);
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
                    className={`flex items-center gap-4 p-3 rounded-xl bg-white shadow-sm transition
                     ${isHetMon ? "opacity-55 pointer-events-none" : "hover:shadow-md"}`}>
                    <input type="checkbox" checked={checked} disabled={isHetMon}
                      onChange={() => {
                        if (!isHetMon) toggleSelect(item.id);
                      }}
                      className={`w-4 h-4 accent-[#e8594f]
                       ${isHetMon ? "opacity-50 cursor-not-allowed" : ""}`} />



                    <Image
                      src={sp?.hinh?.trim() || "/noing.png"}
                      alt={sp?.ten || "Sản phẩm"}
                      width={900}
                      height={100}
                      className="rounded-lg object-cover !w-[80px] !h-[100px]" />

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

                      {isHetMon ? (
                        <div className="mt-1 text-sm font-semibold text-red-600 pointer-events-auto">
                          🚫 Hết món
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-[#e8594f] text-sm font-medium mt-1 hover:underline"
                        >
                          Chỉnh sửa món
                        </button>
                      )}

                    </div>

                    <div className="flex flex-col items-end gap-2 justify-between h-full">
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>

                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.id, (item.so_luong ?? 1) - 1)}
                          className="px-3 text-gray-700 rounded">
                          <Minus size={14} />
                        </button>
                        <span>{item.so_luong ?? 1}</span>
                        <button onClick={() => updateQuantity(item.id, (item.so_luong ?? 1) + 1)}
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

        <div className="bg-white p-5 rounded-2xl shadow-sm h-fit sticky self-start top-[calc(var(--header-h)+15px)]  md:block hidden">
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
              className={`w-full py-3 rounded-full mt-2 font-semibold transition ${selectedItems.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#e8594f] text-white hover:bg-[#d94b42]"
                }`}>
              ĐẶT HÀNG
            </button>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]
                flex items-center justify-between px-4 py-3 z-[999]
                md:hidden">
          {showThongTin && (
            <div className="fixed bottom-[60px] left-0 w-full bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]
                  px-4 py-4 border-t z-[999] md:hidden animate-slide-up">

              <h2 className="text-base font-semibold mb-3">Thông tin đơn hàng</h2>

              <div className="space-y-2 text-sm">
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

                <hr className="my-2 border-gray-300" />
                <div className="flex justify-between font-semibold text-base">
                  <span>Tổng cộng</span>

                  <div className="text-right">
                    <span className="text-red-600 block">
                      {tongTien.toLocaleString("vi-VN")} đ
                    </span>

                    <p className="text-xs text-gray-500">
                      Đã bao gồm VAT (nếu có)
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}


          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-4 h-4 accent-[#e8594f]" />
            <span className="text-base font-medium">Tất cả</span>
          </div>


          <div
            onClick={() => setShowThongTin(!showThongTin)}
            className="text-right flex-1 mx-3">
            <p className="text-[#e8594f] font-semibold text-lg">
              {tongTien.toLocaleString("vi-VN")}đ
            </p>
            <p className="text-[12px] text-gray-500">Chi tiết ▼</p>
          </div>


          <button
            onClick={handleDatHang}
            disabled={selectedItems.length === 0}
            className={`px-5 py-2 rounded-lg text-white font-semibold 
          ${selectedItems.length === 0 ? "bg-gray-300" : "bg-[#e8594f]"}`}>
            Mua hàng ({selectedItems.length})
          </button>
        </div>

        {showVerifyPopup && (
          <PopupXacThuc
            email={JSON.parse(localStorage.getItem("nguoi_dung")!).email}
            onClose={() => setShowVerifyPopup(false)} />
        )}

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
            }}/>
        )}
      </div>
    </div>
  );
}
