"use client";

import { useEffect, useState } from "react";
import { CreditCard, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IDiaChi } from "@/app/lib/cautrucdata";
import PopupDiaChi from "../components/PopupDiaChi";

interface IDonHangTam {
  id: number;
  so_luong: number;
  bien_the?: {
    ten: string;
    gia_them?: number;
    san_pham?: {
      ten: string;
      hinh?: string;
      gia_goc?: number;
    };
  };
  json_mon_them?: { ten: string; gia_them?: number }[];
  json_tuy_chon?: Record<string, string>;
}

interface INguoiDungLocal {
  ho_ten: string;
  email: string;
  sdt: string;
}

export default function DatHangPage() {
  const router = useRouter();

  const [gioHang, setGioHang] = useState<IDonHangTam[]>([]);
  const [phuongThuc, setPhuongThuc] = useState<"cod" | "momo">("cod");
  const [diaChi, setDiaChi] = useState<IDiaChi | null>(null);
  const [nguoiDung, setNguoiDung] = useState<INguoiDungLocal | null>(null);
  const [loadingDiaChi, setLoadingDiaChi] = useState(true);

  const [showPopup, setShowPopup] = useState(false);


  //  Lấy dữ liệu người dùng & giỏ hàng từ localStorage
  useEffect(() => {
    const dataCart = localStorage.getItem("donHangTam");
    const dataUser = localStorage.getItem("nguoi_dung");

    if (dataCart) setGioHang(JSON.parse(dataCart));
    else router.push("/giohang");

    if (dataUser) setNguoiDung(JSON.parse(dataUser));
  }, [router]);

  //  Lấy địa chỉ mặc định từ API
  useEffect(() => {
    const fetchDiaChi = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/dia_chi/mac_dinh", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data: IDiaChi = await res.json();
          setDiaChi(data);
        } else {
          setDiaChi(null);
        }
      } catch (err) {
        console.error("Lỗi lấy địa chỉ mặc định:", err);
      } finally {
        setLoadingDiaChi(false);
      }
    };

    fetchDiaChi();
  }, []);

  //  Tính tổng tiền
  const tongTien = gioHang.reduce((sum, item) => {
    const giaGoc = item.bien_the?.san_pham?.gia_goc ?? 0;
    const giaThem = item.bien_the?.gia_them ?? 0;
    const monThem =
      item.json_mon_them?.reduce((s, m) => s + (m.gia_them ?? 0), 0) ?? 0;
    return sum + (giaGoc + giaThem + monThem) * item.so_luong;
  }, 0);

  const phiShip = 0;
  const giamGia = 0;
  const tongCong = tongTien + phiShip - giamGia;


  //  Cập nhật số lượng
  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 1) return;
    const updated = gioHang.map((item) =>
      item.id === id ? { ...item, so_luong: newQty } : item
    );
    setGioHang(updated);
    localStorage.setItem("donHangTam", JSON.stringify(updated));
  };

  //  Xóa sản phẩm
  const handleRemoveItem = (id: number) => {
    if (!confirm("Xóa sản phẩm này khỏi đơn hàng?")) return;
    const updated = gioHang.filter((item) => item.id !== id);
    setGioHang(updated);
    localStorage.setItem("donHangTam", JSON.stringify(updated));
  };

  //  Xác nhận đặt hàng
  const handleXacNhan = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Bạn cần đăng nhập trước khi đặt hàng");

    const body = {
      phuong_thuc: phuongThuc,
      tong_tien: tongCong,
      chi_tiet: gioHang.map((sp) => ({
        id_gio_hang: sp.id,
        so_luong: sp.so_luong,
      })),
    };

    const res = await fetch("/api/don_hang", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      localStorage.removeItem("donHangTam");
      router.push("/dat-hang/thanh-cong");
    } else {
      alert("Đặt hàng thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div
      className="min-h-screen  p-4 "
      style={{ "--header-h": "55px" } as React.CSSProperties}>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start min-h-[80vh]">

        <div className="lg:col-span-2 space-y-3">
          {/*  Địa chỉ giao hàng */}
          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold text-lg">Địa chỉ giao hàng</h2>
              <button
                onClick={() => setShowPopup(true)}
                className="text-blue-600 hover:underline text-sm font-medium">
                Chỉnh sửa
              </button>
            </div>

            {loadingDiaChi ? (
              <p className="text-gray-500 text-sm">Đang tải địa chỉ...</p>
            ) : diaChi && nguoiDung ? (<>
              <div className="flex items-center flex-wrap gap-x-2">
                <p className="font-medium text-base">{diaChi.ho_ten}</p>
                <span className="text-gray-600 text-sm">| {diaChi.sdt}</span>
              </div>

              <p className="text-sm mt-1 text-gray-700">
                {diaChi.mac_dinh && (
                  <span className="inline-block mr-2 px-2 py-[2px] text-xs bg-[#e8594f] text-white rounded-md">
                    Mặc định
                  </span>
                )}
                {diaChi.ten_duong}, Phường {diaChi.phuong}, {diaChi.tinh}
              </p> </>
            ) : (
              <p className="text-gray-500 text-sm">
                Bạn chưa có địa chỉ
              </p>
            )}
          </div>



          {/*  Danh sách sản phẩm */}
          <div className="space-y-2">
            {gioHang.map((item) => {
              const sp = item.bien_the?.san_pham;
              const giaGoc = sp?.gia_goc ?? 0;
              const giaThem = item.bien_the?.gia_them ?? 0;
              const monThemSum =
                item.json_mon_them?.reduce((s, m) => s + (m.gia_them ?? 0), 0) ?? 0;
              const tong = (giaGoc + giaThem + monThemSum) * item.so_luong;

              return (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition">
                  <img
                    src={sp?.hinh || "/noing.png"}
                    alt={sp?.ten || "Sản phẩm"}
                    className="w-[90px] h-[90px] rounded-xl object-cover" />
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

                    {item.json_mon_them?.length ? (
                      <p className="text-sm text-gray-600">
                        {item.json_mon_them.map((m) => m.ten).join(", ")}
                      </p>
                    ) : null}

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.so_luong - 1)
                        }
                        className="px-3 py-1 border rounded-md">
                        -
                      </button>
                      <span>{item.so_luong}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.so_luong + 1)
                        }
                        className="px-3 py-1 border rounded-md">
                        +
                      </button>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 text-sm hover:underline">
                        Xóa
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[#e8594f] font-semibold">
                      {tong.toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/*  Cột phải: Thông tin thanh toán (chiếm 1 phần) */}
        <div className="bg-white p-4 rounded-2xl shadow-sm h-fit sticky top-[90px]">

          <h2 className="text-lg font-semibold mb-4">
            Chọn phương thức thanh toán
          </h2>

          {/* COD */}
          <div
            onClick={() => setPhuongThuc("cod")}
            className={`flex items-center gap-3 border rounded-xl p-3 mb-2 cursor-pointer transition ${phuongThuc === "cod"
              ? "border-[#e8594f] bg-[#fff5f4]"
              : "border-gray-200"
              }`}
          >
            <CreditCard className="text-[#e8594f]" size={18} />
            <span>Thanh toán khi nhận hàng</span>
          </div>

          {/* MoMo */}
          <div
            onClick={() => setPhuongThuc("momo")}
            className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition ${phuongThuc === "momo"
              ? "border-[#e8594f] bg-[#fff5f4]"
              : "border-gray-200"
              }`}
          >
            <Wallet className="text-[#e8594f]" size={18} />
            <span>Ví MoMo</span>
          </div>

          {/* Tổng đơn */}
          <div className="mt-5 border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính ({gioHang.length} sản phẩm)</span>
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
              <span className="text-[#e8594f]">
                {tongCong.toLocaleString("vi-VN")} đ
              </span>
            </div>
            <p className="text-xs text-gray-500 text-right">
              Đã bao gồm VAT (nếu có)
            </p>

            <button
              onClick={handleXacNhan}
              className="w-full py-3 rounded-full mt-2 font-semibold bg-[#e8594f] text-white hover:bg-[#d94b42] transition"
            >
              XÁC NHẬN ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>

      {/* Popup chọn địa chỉ */}
      <PopupDiaChi
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onSelect={(dc) => setDiaChi(dc)}
      />
    </div>
  );


}
