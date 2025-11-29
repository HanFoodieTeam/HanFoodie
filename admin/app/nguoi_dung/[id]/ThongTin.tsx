"use client";

import { INguoiDung } from "@/app/lib/cautrucdata";

export default function ThongTin({ user }: { user: INguoiDung }) {


  const avatarUrl = user.hinh
    ? `${process.env.NEXT_PUBLIC_APP_URL_SITE}/uploads/avatars/${user.hinh}`
    : "/default-user.png";

  return (
    <div className="space-y-4 text-gray-700">

      {/* Avatar + tên */}
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.ho_ten}</h2>
          <p className="text-sm text-gray-500">
            Tạo lúc: {new Date(user.ngay_tao!).toLocaleDateString("vi-VN")}
          </p>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="bg-gray-100 rounded-lg p-4 space-y-2">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>SĐT:</strong> {user.sdt || "Chưa có"}
        </p>
        <p>
          <strong>Trạng thái tài khoản:</strong>{" "}
          {user.trang_thai ? "Hoạt động" : "Đã khóa"}
        </p>
        <p>
          <strong>Kích hoạt email:</strong>{" "}
          {user.kich_hoat ? "Đã kích hoạt" : "Chưa kích hoạt"}
        </p>
        <p>
          <strong>Vai trò:</strong>{" "}
          {user.vai_tro ? "Admin" : "User"}
        </p>
      </div>

    </div>
  );
}
