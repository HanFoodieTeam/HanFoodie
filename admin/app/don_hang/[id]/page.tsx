"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IDonHang, TrangThaiDonHang } from "@/app/lib/cautrucdata";

// Mapping trạng thái có dấu & màu sắc
const trangThaiLabels: Record<TrangThaiDonHang, string> = {
  cho_xac_nhan: "Chờ xác nhận",
  da_xac_nhan: "Đã xác nhận",
  dang_giao: "Đang giao",
  da_giao: "Đã giao",
  da_huy: "Đã hủy",
};

const trangThaiColors: Record<TrangThaiDonHang, string> = {
  cho_xac_nhan: "bg-yellow-100 text-yellow-800 border-yellow-300",
  da_xac_nhan: "bg-blue-100 text-blue-800 border-blue-300",
  dang_giao: "bg-purple-100 text-purple-800 border-purple-300",
  da_giao: "bg-green-100 text-green-800 border-green-300",
  da_huy: "bg-red-100 text-red-800 border-red-300",
};

export default function DonHangDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [donHang, setDonHang] = useState<IDonHang | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/don_hang/${id}`);
        const data = await res.json();
        setDonHang(data.data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const handleCancelOrder = async () => {
    if (!confirm("Bạn có chắc muốn hủy đơn hàng này không?")) return;

    try {
      const res = await fetch(`/api/don_hang/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trang_thai: "da_huy" }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(`❌ Hủy thất bại: ${data.error || "Lỗi không xác định"}`);
        return;
      }

      alert("✅ Đơn hàng đã được hủy thành công!");
      setDonHang((prev) => prev ? { ...prev, trang_thai: "da_huy" } : prev);
    } catch (err) {
      console.error("Lỗi khi hủy đơn hàng:", err);
      alert("Lỗi khi hủy đơn hàng. Vui lòng thử lại.");
    }
  };

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">
        Đang tải chi tiết đơn hàng...
      </div>
    );

  if (!donHang)
    return (
      <div className="p-6 text-center text-gray-500">
        Không tìm thấy đơn hàng.
      </div>
    );

  const label = trangThaiLabels[donHang.trang_thai];
  const badgeColor = trangThaiColors[donHang.trang_thai];

  return (
    
  <div className="p-2 mx-auto bg-white rounded-xl shadow-lg">
    <button
      onClick={() => router.back()}
      className="text-blue-600 hover:underline text-sm mb-2">
      ← Quay lại danh sách
    </button>

    {/*  Tiêu đề */}
    <h1 className="text-2xl font-bold text-gray-800 mb-4">
      Chi tiết đơn hàng #{donHang.ma_don}
    </h1>

    {/*  Thông tin người nhận */}
    <div className="grid md:grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg border">
      <div className="space-y-1">
        <p>
          <strong>👤 Người nhận:</strong> {donHang.ho_ten_nguoi_nhan}
        </p>
        <p>
          <strong>📞 SĐT:</strong> {donHang.sdt_nguoi_nhan}
        </p>
        <p>
          <strong>📍 Địa chỉ:</strong> {donHang.dia_chi_nguoi_nhan}
        </p>
      </div>

      <div className="space-y-1">
        <p>
          <strong>🕒 Ngày đặt:</strong>{" "}
          {new Date(donHang.ngay_tao).toLocaleString("vi-VN")}
        </p>
        <p className="flex items-center gap-2">
          <strong>📦 Trạng thái:</strong>{" "}
          <span
            className={`px-2 py-1 rounded-full text-xs border font-medium ${badgeColor}`}
>
            {label}
          </span>
          <span className="text-xs text-gray-500 italic">
            ({new Date(donHang.ngay_cap_nhat).toLocaleString("vi-VN")})
          </span>
        </p>
        <p>
          <strong>💳 Phương thức:</strong>{" "}
          {donHang.phuong_thuc_thanh_toan
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán online"}
        </p>
      </div>
    </div>

    {/* 📝 Ghi chú đơn hàng (chỉ hiển thị khi có nội dung) */}
    {donHang.ghi_chu && donHang.ghi_chu.trim() !== "" && (
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
        <span className="text-yellow-600 text-lg">📝</span>
        <div>
          <p className="font-semibold text-yellow-700 mb-1">Ghi chú đơn hàng:</p>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {donHang.ghi_chu}
          </p>
        </div>
      </div>
    )}

    {/*  Danh sách sản phẩm */}
    <h2 className="font-semibold text-lg mt-5 mb-3">Sản phẩm trong đơn</h2>

    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-3 py-2 text-left">Sản phẩm</th>
            <th className="px-3 py-2 text-center">SL</th>
            <th className="px-3 py-2 text-center">Đơn giá</th>
            <th className="px-3 py-2 text-center">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {donHang.chi_tiet_don_hang?.map((ct, i) => {
            const tuyChon = ct.json_tuy_chon
              ? Object.entries(JSON.parse(ct.json_tuy_chon))
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(", ")
              : null;

            const monThem = ct.json_mon_them
              ? (JSON.parse(ct.json_mon_them) as {
                  ten: string;
                  gia_them: number;
                }[])
                  .map((m) => `${m.ten} (+${m.gia_them.toLocaleString("vi-VN")}₫)`)
                  .join(", ")
              : null;

            return (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={ct.bien_the?.san_pham?.hinh ?? "/no-image.png"}
                      alt={ct.bien_the?.san_pham?.ten ?? "Sản phẩm"}
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {ct.bien_the?.san_pham?.ten ?? "Sản phẩm"}
                      </p>
                      <p className="text-xs text-gray-600 italic">
                        {ct.bien_the?.ten ?? "Mặc định"}
                      </p>

                      {tuyChon && (
                        <p className="text-xs text-gray-500">
                          <strong>Tùy chọn:</strong> {tuyChon}
                        </p>
                      )}

                      {monThem && (
                        <p className="text-xs text-gray-500">
                          <strong>Món thêm:</strong> {monThem}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 text-center">{ct.so_luong}</td>
                <td className="px-3 py-2 text-center">
                  {ct.don_gia.toLocaleString("vi-VN")} ₫
                </td>
                <td className="px-3 py-2 text-center font-semibold text-gray-800">
                  {ct.thanh_tien.toLocaleString("vi-VN")} ₫
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    {/*  Tổng tiền */}
    <div className="text-right mt-5 text-sm space-y-1">
      <p>
        <strong>Tổng tiền hàng:</strong>{" "}
        {donHang.tong_tien_hang.toLocaleString("vi-VN")} ₫
      </p>
      <p>
        <strong>Giảm giá:</strong> -{donHang.so_tien_giam.toLocaleString("vi-VN")} ₫
      </p>
      <p className="text-lg font-bold text-red-600">
        <strong>Thành tiền:</strong>{" "}
        {donHang.so_tien_thanh_toan.toLocaleString("vi-VN")} ₫
      </p>

      {/* Nút hủy đơn hàng nếu được phép */}
      {["cho_xac_nhan", "da_xac_nhan"].includes(donHang.trang_thai) && (
        <button
          onClick={handleCancelOrder}
          className="mt-2 bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600"
        >
          Hủy đơn hàng
        </button>
      )}
    </div>
  </div>
);

}


