"use client";

import { useEffect, useState } from "react";
import { CreditCard, Wallet, TicketPercent, Tag } from "lucide-react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { IDiaChi, IMaGiamGia } from "@/app/lib/cautrucdata";
import PopupDiaChi from "../components/PopupDiaChi";
import PopupMaGiamGia from "../components/Popupmagiamgia";
import PopupXacThuc from "../components/popup_xac_thuc";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


interface IDonHangTam {
  id: number;
  id_gio_hang: number;
  so_luong: number;
  bien_the?: {
    id: number;
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

  const [isLoading, setIsLoading] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState<{ open: boolean; maDon?: string; idDon?: number }>({ open: false, });


  const [gioHang, setGioHang] = useState<IDonHangTam[]>([]);
  const [phuongThuc, setPhuongThuc] = useState<"cod" | "vnpay">("cod");
  const [diaChi, setDiaChi] = useState<IDiaChi | null>(null);
  const [nguoiDung, setNguoiDung] = useState<INguoiDungLocal | null>(null);
  const [loadingDiaChi, setLoadingDiaChi] = useState(true);

  const [showPopup, setShowPopup] = useState(false);

  const [showMaGiam, setShowMaGiam] = useState(false);
  const [maGiamChon, setMaGiamChon] = useState<IMaGiamGia | null>(null);

  const [ghiChu, setGhiChu] = useState<string>("");
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);

  useEffect(() => {
    const dataCart = localStorage.getItem("donHangTam");
    const dataUser = localStorage.getItem("nguoi_dung");

    if (!dataCart) return;
    setGioHang(JSON.parse(dataCart));

    if (dataUser) setNguoiDung(JSON.parse(dataUser));
  }, []);


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

  //  Theo dõi nếu tổng tiền nhỏ hơn giá trị tối thiểu của mã đã chọn → hủy mã
  useEffect(() => {
    if (maGiamChon && tongTien < maGiamChon.gia_tri_toi_thieu) {
      alert(
        `Đơn hàng không còn đủ điều kiện áp dụng mã "${maGiamChon.ten}" (tối thiểu ${maGiamChon.gia_tri_toi_thieu.toLocaleString("vi-VN")}đ). Mã giảm giá đã được gỡ bỏ.`
      );
      setMaGiamChon(null);
    }
  }, [tongTien, maGiamChon]);


  const phiShip = 0;

  let giamGia = 0;
  if (maGiamChon) {
    if (maGiamChon.loai_giam_gia) {
      const giamTheoPhanTram = (tongTien * maGiamChon.gia_tri_giam) / 100;
      giamGia = maGiamChon.gia_tri_giam_toi_da
        ? Math.min(giamTheoPhanTram, maGiamChon.gia_tri_giam_toi_da)
        : giamTheoPhanTram;
    } else {
      giamGia = maGiamChon.gia_tri_giam;
    }
  }
  const tongCong = tongTien + phiShip - giamGia;



  const handleQuantityChange = (id: number, newQty: number) => {
    if (newQty < 1) return;
    const updated = gioHang.map((item) =>
      item.id === id ? { ...item, so_luong: newQty } : item
    );
    setGioHang(updated);
    localStorage.setItem("donHangTam", JSON.stringify(updated));
  };

  const handleRemoveItem = (id: number) => {
    if (!confirm("Xóa sản phẩm này khỏi đơn hàng?")) return;
    const updated = gioHang.filter((item) => item.id !== id);
    setGioHang(updated);
    localStorage.setItem("donHangTam", JSON.stringify(updated));
  };

const searchParams = useSearchParams();
const status = searchParams.get("status");
const idDon = searchParams.get("id");
const maDon = searchParams.get("maDon");

useEffect(() => {
  if (status === "success" && idDon && maDon) {
    setPopupSuccess({
      open: true,
      idDon: Number(idDon),
      maDon: maDon
    });

    // Xóa param khỏi URL để reload không mở lại popup
    window.history.replaceState({}, "", "/dat_hang");
  }
}, [status, idDon, maDon]);

  const handleXacNhan = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập trước khi đặt hàng");
      setIsLoading(false);
      return;
    }

    if (!diaChi?.ho_ten || !diaChi.sdt || !diaChi.phuong || !diaChi.ten_duong || !diaChi.tinh) {
      alert("Vui lòng chọn địa chỉ giao hàng");
      setIsLoading(false);
      return;
    }

    if (gioHang.length === 0) {
      alert("Giỏ hàng của bạn trống");
      setIsLoading(false);
      return;
    }

    try {
      const body = {
        id_nguoi_dung: JSON.parse(localStorage.getItem("nguoi_dung") || "{}")?.id,
        ho_ten_nguoi_nhan: diaChi.ho_ten,
        dia_chi_nguoi_nhan: `${diaChi.ten_duong}, ${diaChi.phuong}, ${diaChi.tinh}`,
        sdt_nguoi_nhan: Number(diaChi.sdt),
        ghi_chu: ghiChu,
        phuong_thuc_thanh_toan: phuongThuc === "cod",
        id_ma_giam_gia: maGiamChon?.id || null,


        danh_sach_san_pham: gioHang.map((sp) => ({
          id_gio_hang: sp.id_gio_hang || sp.id,
          id_bien_the: sp.bien_the?.id,
          don_gia:
            (sp.bien_the?.san_pham?.gia_goc ?? 0) +
            (sp.bien_the?.gia_them ?? 0) +
            (sp.json_mon_them?.reduce((s, m) => s + (m.gia_them ?? 0), 0) ?? 0),
          so_luong: sp.so_luong,
          json_tuy_chon: sp.json_tuy_chon ? JSON.stringify(sp.json_tuy_chon) : null,
          json_mon_them: sp.json_mon_them ? JSON.stringify(sp.json_mon_them) : null,
        }))

      };
      if (phuongThuc === "vnpay") {
        const res = await fetch("/api/dat_hang_vnpay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        if (data.success) {
          window.location.href = data.url;
          return;
        }

        alert("Không thể tạo đơn thanh toán VNPay!");
        return;
      }


      const res = await fetch("/api/dat_hang", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (res.status === 403) {
        setShowVerifyPopup(true);
        return;
      }

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.removeItem("donHangTam");
        setPopupSuccess({
          open: true,
          maDon: data.data?.ma_don,
          idDon: data.data?.id ?? data.data?.id_don
        });


      } else {
        alert(data.message || "Đặt hàng thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div
      className="min-h-screen  p-4 "
      style={{ "--header-h": "55px" } as React.CSSProperties}>
      <div className="flex flex-col lg:flex-row gap-5 items-start min-h-[80vh]">
        {/* Cột trái */}
        <div className="flex-1 space-y-3 lg:w-2/3">
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
              const imageSrc = sp?.hinh?.trim() || "/noing.png";

              return (
                <div
                  key={`${item.id_gio_hang ?? item.id ?? item.bien_the?.id ?? Math.random()}`}
                  className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition">

                  <Image
                    src={imageSrc}
                    alt={sp?.ten || "Sản phẩm"}
                    width={90}
                    height={90}
                    className="rounded-lg object-cover"
                  />

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
        <div className="w-full lg:w-1/3 relative">
          <div
            className="
        bg-white p-5 rounded-2xl shadow-sm
        sticky top-[calc(var(--header-h)+15px)]
        max-h-[calc(100vh-110px)]
        overflow-y-auto hide-scrollbar
      "
          >         <h2 className="text-lg font-semibold mb-4">
              Chọn phương thức thanh toán
            </h2>

            {/* COD */}
            <div
              onClick={() => setPhuongThuc("cod")}
              className={`flex items-center gap-3 border rounded-xl p-3 mb-2 cursor-pointer transition ${phuongThuc === "cod"
                ? "border-[#e8594f] bg-[#fff5f4]"
                : "border-gray-200"
                }`}>
              <CreditCard className="text-[#e8594f]" size={18} />
              <span>Thanh toán khi nhận hàng</span>
            </div>

            {/* MoMo */}
            <div
              onClick={() => setPhuongThuc("vnpay")}
              className={`flex items-center gap-3 border rounded-xl p-3 cursor-pointer transition ${phuongThuc === "vnpay"
                ? "border-[#e8594f] bg-[#fff5f4]"
                : "border-gray-200"
                }`}>
              <Wallet className="text-[#e8594f]" size={18} />
              <span>VnPay</span>
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

              {/*  Mã giảm giá */}
              <div
                className="flex items-center justify-between border rounded-xl p-2 cursor-pointer hover:bg-[#fff5f4]"
                onClick={() => setShowMaGiam(true)}>
                <div className="flex items-center gap-2 text-gray-700 ">
                  <Tag className="text-[#e8594f]" size={18} />
                  <span
                    className="truncate max-w-[160px] block"
                    title={maGiamChon ? maGiamChon.ten : "Sử dụng mã giảm giá"}>
                    {maGiamChon ? maGiamChon.ten : "Sử dụng mã giảm giá"}
                  </span>
                </div>
                <span className="text-sm text-blue-600 font-medium hover:underline">
                  Sử dụng
                </span>
              </div>

              <div className="flex justify-between">
                <span>Giảm giá</span>
                <span className="text-green-600 font-medium">
                  {maGiamChon
                    ? `- ${giamGia.toLocaleString("vi-VN")} đ`
                    : "-"}
                </span>
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
              <div className="pt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ghi chú đơn hàng
                </label>
                <textarea
                  value={ghiChu}
                  onChange={(e) => setGhiChu(e.target.value)}
                  placeholder="Ví dụ: giao sáng mai, không lấy hành..."
                  className="w-full border rounded-lg p-2 h-20 text-sm resize-none focus:ring-2 focus:ring-[#e8594f] focus:outline-none"
                />
              </div>

              <button
                onClick={handleXacNhan}
                disabled={isLoading}
                className={`w-full py-3 rounded-full mt-2 font-semibold transition ${isLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-[#e8594f] text-white hover:bg-[#d94b42]"
                  }`}>
                {isLoading ? "Đang xử lý..." : "XÁC NHẬN ĐẶT HÀNG"}
              </button>
            </div>
          </div>
        </div>
      </div>






<Suspense fallback={null}>
      {popupSuccess.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-sm w-full">
            <h2 className="text-xl font-semibold text-green-600 mb-2">🎉 Đặt hàng thành công!</h2>
            <p className="text-gray-700 mb-4">
              Mã đơn hàng của bạn là:
              <br />
              <span className="font-bold text-[#e8594f]">{popupSuccess.maDon}</span>
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => router.push("/")}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium">
                Trang chủ
              </button>

              <button
                onClick={() => router.push(`/chi_tiet_don_hang/${popupSuccess.idDon}`)}
                className="px-4 py-2 rounded-lg bg-[#e8594f] text-white hover:bg-[#d94b42] font-medium">
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      )}
      </Suspense>

      {showVerifyPopup && (
        <PopupXacThuc
          email={JSON.parse(localStorage.getItem("nguoi_dung")!).email}
          onClose={() => setShowVerifyPopup(false)} />
      )}

      <PopupMaGiamGia
        open={showMaGiam}
        onClose={() => setShowMaGiam(false)}
        onSelect={(ma) => {
          setMaGiamChon(ma);
          console.log("Mã đã chọn:", ma, ma.id);
        }}
        tongTien={tongTien} />
      <PopupDiaChi
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onSelect={(dc) => setDiaChi(dc)} />
    </div>
  );
}
