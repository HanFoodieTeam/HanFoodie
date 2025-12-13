

"use client";

import { INguoiDung } from "@/lib/cautrucdata";
import Image from "next/image";

export default function ThongTin({ user }: { user: INguoiDung }) {


  // Sắp xếp địa chỉ: mặc định lên đầu
  const sortedAddresses = [...(user.dia_chi ?? [])].sort((a, b) => {
    if (a.mac_dinh === b.mac_dinh) return 0;
    return a.mac_dinh ? -1 : 1;
  });
  const imageSrc = user.hinh?.trim() || "/default-user.png";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">

      {/* Cột trái - Thông tin người dùng */}
      <div className="space-y-4">

        {/* Avatar + tên */}
        <div className="flex items-center gap-4">
          <div className="flex justify-center">
            <div className="w-[100px] h-[100px] rounded-full border border-gray-300 overflow-hidden flex items-center justify-center">
              <Image src={imageSrc} alt="Avatar" width={50} height={50} className="object-cover" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">{user.ho_ten}</h2>
            <p className="text-sm text-gray-500">
              Tạo lúc: {new Date(user.ngay_tao!).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="bg-gray-100 rounded-lg p-4 space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>SĐT:</strong> {user.sdt || "Chưa có"}</p>
          <p><strong>Vai trò:</strong> {user.vai_tro ? "Admin" : "User"}</p>
          <p><strong>Trạng thái tài khoản:</strong> {user.trang_thai ? "Hoạt động" : "Đã khóa"}</p>
          <p><strong>Kích hoạt email:</strong> {user.kich_hoat ? "Đã kích hoạt" : "Chưa kích hoạt"}</p>

        </div>

      </div>

      {/* Cột phải - Danh sách địa chỉ */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Địa chỉ của người dùng</h3>

        {sortedAddresses.length === 0 ? (
          <p className="text-gray-500">Chưa có địa chỉ nào.</p>
        ) : (
          sortedAddresses.map((dc) => (
            <div
              key={dc.id}
              className="border rounded-lg p-4 bg-gray-50 flex justify-between items-center">
              <div>
                <p><strong>{dc.ho_ten}</strong> — {dc.sdt}</p>
                <p className="text-gray-600">
                  {dc.ten_duong}, {dc.phuong}, {dc.tinh}
                </p>
              </div>

              {dc.mac_dinh && (
                <span className="text-xs px-2 py-1 bg-blue-200 text-blue-700 rounded-full">
                  Địa chỉ mặc định
                </span>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
