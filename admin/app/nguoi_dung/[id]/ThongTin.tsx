

// "use client";

// import { INguoiDung } from "@/lib/cautrucdata";
// import Image from "next/image";

// export default function ThongTin({ user }: { user: INguoiDung }) {


//   // Sắp xếp địa chỉ: mặc định lên đầu
//   const sortedAddresses = [...(user.dia_chi ?? [])].sort((a, b) => {
//     if (a.mac_dinh === b.mac_dinh) return 0;
//     return a.mac_dinh ? -1 : 1;
//   });
//   const imageSrc = user.hinh?.trim() || "/default-user.png";

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">

//       {/* Cột trái - Thông tin người dùng */}
//       <div className="space-y-4">

//         {/* Avatar + tên */}
//         <div className="flex items-center gap-4">
//           <div className="flex justify-center">
//             <div className="w-[100px] h-[100px] rounded-full border border-gray-300 overflow-hidden flex items-center justify-center">
//               <Image src={imageSrc} alt="Avatar" width={50} height={50} className="object-cover" />
//             </div>
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold">{user.ho_ten}</h2>
//             <p className="text-sm text-gray-500">
//               Tạo lúc: {new Date(user.ngay_tao!).toLocaleDateString("vi-VN")}
//             </p>
//           </div>
//         </div>

//         {/* Thông tin chi tiết */}
//         <div className="bg-gray-100 rounded-lg p-4 space-y-2">
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>SĐT:</strong> {user.sdt || "Chưa có"}</p>
//           <p><strong>Vai trò:</strong> {user.vai_tro ? "Admin" : "User"}</p>
//           <p><strong>Trạng thái tài khoản:</strong> {user.trang_thai ? "Hoạt động" : "Đã khóa"}</p>
//           <p><strong>Kích hoạt email:</strong> {user.kich_hoat ? "Đã kích hoạt" : "Chưa kích hoạt"}</p>

//         </div>

//       </div>

//       {/* Cột phải - Danh sách địa chỉ */}
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold">Địa chỉ của người dùng</h3>

//         {sortedAddresses.length === 0 ? (
//           <p className="text-gray-500">Chưa có địa chỉ nào.</p>
//         ) : (
//           sortedAddresses.map((dc) => (
//             <div
//               key={dc.id}
//               className="border rounded-lg p-4 bg-gray-50 flex justify-between items-center">
//               <div>
//                 <p><strong>{dc.ho_ten}</strong> — {dc.sdt}</p>
//                 <p className="text-gray-600">
//                   {dc.ten_duong}, {dc.phuong}, {dc.tinh}
//                 </p>
//               </div>

//               {dc.mac_dinh && (
//                 <span className="text-xs px-2 py-1 bg-blue-200 text-blue-700 rounded-full">
//                   Địa chỉ mặc định
//                 </span>
//               )}
//             </div>
//           ))
//         )}
//       </div>

//     </div>
//   );
// }


"use client";

import { INguoiDung } from "@/lib/cautrucdata";
import Image from "next/image";
import { useState } from "react";

function isValidImage(url: string): boolean {
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("/uploads/")
  );
}

export default function ThongTin({ user }: { user: INguoiDung }) {
  const [localUser, setLocalUser] = useState(user);
  const [confirmRole, setConfirmRole] = useState(false);
  const [loading, setLoading] = useState(false);

  const imageSrc =
    localUser.hinh && isValidImage(localUser.hinh.trim())
      ? localUser.hinh.trim()
      : "/default-user.png";

  const sortedAddresses = [...(localUser.dia_chi ?? [])].sort((a, b) => {
    if (a.mac_dinh === b.mac_dinh) return 0;
    return a.mac_dinh ? -1 : 1;
  });

  // ✨ Hàm cập nhật vai trò
  const updateRole = async () => {
    setLoading(true);

    const newRoleNumber = localUser.vai_tro ? 0 : 1;
    const newRoleBoolean = Boolean(newRoleNumber);

    try {
      const res = await fetch(`/api/nguoi_dung/${localUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vai_tro: newRoleNumber }),
      });

      if (!res.ok) {
        alert("Không thể cập nhật vai trò!");
        return;
      }

      // cập nhật UI
      setLocalUser((prev) => ({ ...prev, vai_tro: newRoleBoolean }));

    } catch {
      alert("Lỗi kết nối khi cập nhật vai trò!");
    } finally {
      setConfirmRole(false);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">

        {/* Cột trái */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-[100px] h-[100px] rounded-full border border-gray-300 bg-gray-100 overflow-hidden flex items-center justify-center">
              <Image
                src={imageSrc}
                alt="Avatar"
                width={100}
                height={100}
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold">{localUser.ho_ten}</h2>
              <p className="text-sm text-gray-500">
                Tạo lúc: {new Date(localUser.ngay_tao!).toLocaleDateString("vi-VN")}
              </p>
            </div>
          </div>

          {/* Thông tin */}
          <div className="bg-gray-100 rounded-xl p-4 border border-gray-300 space-y-2">
            <p><strong>Email:</strong> {localUser.email}</p>
            <p><strong>SĐT:</strong> {localUser.sdt || "Chưa có"}</p>

            {/* Vai trò — CÓ THỂ CLICK ĐỂ ĐỔI */}
            <p className="flex items-center gap-2">
              <strong>Vai trò:</strong>{" "}
              <span
                onClick={() => setConfirmRole(true)}
                className={`
                  px-4 py-1 rounded-full border text-xs font-semibold cursor-pointer select-none
                  transition-all duration-200
                  ${localUser.vai_tro
                    ? "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }
                `}
              >
                {localUser.vai_tro ? "Admin" : "User"}
              </span>
              <span className="text-gray-500 text-xs">(Nhấn để đổi)</span>
            </p>

            <p>
              <strong>Trạng thái:</strong>{" "}
              {localUser.trang_thai ? "🟢 Hoạt động" : "🔴 Đã khóa"}
            </p>

            <p>
              <strong>Kích hoạt email:</strong>{" "}
              {localUser.kich_hoat ? "Đã kích hoạt" : "Chưa kích hoạt"}
            </p>

            <p>
              <strong>Ngày sinh:</strong>{" "}
              {localUser.ngay_sinh ?? "Chưa cập nhật"}
            </p>
          </div>
        </div>

        {/* Cột phải */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Danh sách địa chỉ</h3>

          {sortedAddresses.length === 0 ? (
            <p className="text-gray-500">Chưa có địa chỉ nào.</p>
          ) : (
            sortedAddresses.map((dc) => (
              <div
                key={dc.id}
                className="border border-gray-300 bg-gray-50 rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{dc.ho_ten} — {dc.sdt}</p>
                  <p className="text-gray-600">
                    {dc.ten_duong}, {dc.phuong}, {dc.tinh}
                  </p>
                </div>

                {dc.mac_dinh && (
                  <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded-full">
                    Mặc định
                  </span>
                )}
              </div>
            ))
          )}
        </div>

      </div>

      {/* 🔵 MODAL XÁC NHẬN */}
      {confirmRole && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[380px]">

            <h2 className="text-lg font-semibold text-center mb-3">
              Xác nhận thay đổi vai trò
            </h2>

            <p className="text-center mb-6">
              Bạn có chắc muốn đổi người dùng
              <strong> {localUser.ho_ten} </strong>
              thành
              <span className="font-semibold text-blue-600">
                {" "}
                {localUser.vai_tro ? "User" : "Admin"}
              </span>
              ?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={updateRole}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                {loading ? "Đang cập nhật..." : "Có"}
              </button>

              <button
                onClick={() => setConfirmRole(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
