"use client";

import { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import UserLayout from "@/app/components/UserLayout";
import toast from "react-hot-toast";
import { useUser, updateUser } from "@/app/hooks/useUser";

export default function HoSoPage() {
  const user = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [hoTen, setHoTen] = useState("");
  const [sdt, setSdt] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setHoTen(user.ho_ten ?? "");
      setSdt(user.sdt ?? "");
      setNgaySinh(user.ngay_sinh ?? "");

      const hinh =
        user.hinh && user.hinh !== "null" && user.hinh.trim() !== ""
          ? user.hinh
          : "/avatar.png";

      setPreview(hinh);
    }
  }, [user]);

  if (!user)
    return (
      <p className="p-8  h-[700px] text-center text-gray-600">Đang tải thông tin...</p>
    );

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  }

  async function handleCapNhat() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn chưa đăng nhập!");
      return;
    }

    const formData = new FormData();
    formData.append("ho_ten", hoTen);
    formData.append("sdt", sdt);
    formData.append("ngay_sinh", ngaySinh);

    if (file) formData.append("hinh", file);

    setLoading(true);

    try {
      const res = await fetch("/api/ho_so", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.thong_bao || "Lỗi cập nhật hồ sơ");
        return;
      }

      toast.success("Cập nhật thành công!");
      updateUser(data.nguoi_dung);
      setPreview(data.nguoi_dung.hinh ?? "/avatar.png");
      setIsEditing(false);
    } catch (err) {
      toast.error("Lỗi kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  }

  const avatarSrc =
    preview && preview !== "null" && preview.trim() !== ""
      ? preview
      : "/avatar.png";

  return (
    <UserLayout>
      <h2 className="text-3xl font-bold text-[#D33C3C] mb-4">Thông Tin Hồ Sơ</h2>
      <p className="text-gray-500 mb-6">Quản lý thông tin cá nhân của bạn</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Tên</label>
            <input
              type="text"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
              className="w-full border p-2 rounded-lg bg-gray-50"
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="text"
              value={user.email ?? ""}
              disabled
              className="w-full border p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Số điện thoại</label>
            <input
              type="text"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
              className="w-full border p-2 rounded-lg bg-gray-50"
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Ngày sinh</label>
            <input
              type="date"
              value={ngaySinh}
              onChange={(e) => setNgaySinh(e.target.value)}
              className="w-1/2 border p-2 rounded-lg bg-gray-50"
              readOnly={!isEditing}
            />
          </div>

          {isEditing ? (
            <button
              onClick={handleCapNhat}
              disabled={loading}
              className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg hover:bg-[#b53030] transition"
            >
              {loading ? "Đang lưu..." : "Cập nhật"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sửa thông tin
            </button>
          )}
        </div>

        <div className="flex flex-col items-center space-y-3">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#D33C3C] relative">
            <Image src={avatarSrc} alt="Avatar" fill className="object-cover" />
          </div>

          {isEditing && (
            <>
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-[#D33C3C] hover:underline"
              >
                📷 Chọn ảnh
              </label>

              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
