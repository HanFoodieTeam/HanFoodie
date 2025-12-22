"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IDiaChi } from "@/lib/cautrucdata";

interface Props {
  onClose: () => void;
  onAdded: () => void; // reload danh sách
}

// Kiểu dữ liệu cho form nhập địa chỉ
interface FormData {
  ho_ten: string;
  sdt: string;
  tinh: string;
  phuong: string;
  ten_duong: string;
  mac_dinh: boolean;
}

interface ApiResponse {
  message: string;
  dia_chi?: IDiaChi;
}

export default function ThemDiaChi({ onClose, onAdded }: Props) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    ho_ten: "",
    sdt: "",
    tinh: "",
    phuong: "",
    ten_duong: "",
    mac_dinh: false,
  });

  const [searchTinh, setSearchTinh] = useState("");
  const [searchPhuong, setSearchPhuong] = useState("");
  const [dsTinh, setDsTinh] = useState<string[]>([]);
  const [dsPhuong, setDsPhuong] = useState<string[]>([]);

  // ✅ Giả lập dữ liệu tỉnh / phường (bạn có thể thay bằng fetch API riêng nếu có)
  useEffect(() => {
    setDsTinh(["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Huế"]);
    setDsPhuong(["Quận 1", "Quận 3", "Quận 7", "Gò Vấp", "Tân Bình"]);
  }, []);

  const dsTinhLoc = useMemo(
    () =>
      dsTinh.filter((t) =>
        t.toLowerCase().includes(searchTinh.toLowerCase())
      ),
    [dsTinh, searchTinh]
  );

  const dsPhuongLoc = useMemo(
    () =>
      dsPhuong.filter((t) =>
        t.toLowerCase().includes(searchPhuong.toLowerCase())
      ),
    [dsPhuong, searchPhuong]
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch("/api/dia_chi/them", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) throw new Error(data.message || "Lỗi thêm địa chỉ");

      alert("✅ Thêm địa chỉ thành công!");
      onAdded(); // reload danh sách
      onClose(); // đóng modal
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message || "Lỗi server");
      } else {
        alert("Đã xảy ra lỗi không xác định");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Thêm địa chỉ mới</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Họ tên"
            value={form.ho_ten}
            onChange={(e) => setForm({ ...form, ho_ten: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full"
            required
          />

          <input
            type="text"
            placeholder="Số điện thoại"
            value={form.sdt}
            onChange={(e) => setForm({ ...form, sdt: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full"
            required
          />

          {/* 🔽 Dropdown chọn Tỉnh */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tỉnh / Thành
            </label>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTinh}
              onChange={(e) => setSearchTinh(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full mb-1"
            />
            <select
              value={form.tinh}
              onChange={(e) => setForm({ ...form, tinh: e.target.value })}
              className="border rounded-lg px-3 py-2 w-full"
              required
            >
              <option value="">-- Chọn Tỉnh --</option>
              {dsTinhLoc.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* 🔽 Dropdown chọn Quận / Huyện */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Quận / Huyện
            </label>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchPhuong}
              onChange={(e) => setSearchPhuong(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full mb-1"
            />
            <select
              value={form.phuong}
              onChange={(e) => setForm({ ...form, phuong: e.target.value })}
              className="border rounded-lg px-3 py-2 w-full"
              required
            >
              <option value="">-- Chọn Quận / Huyện --</option>
              {dsPhuongLoc.map((t, i) => (
                <option key={i} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Tên đường, số nhà..."
            value={form.ten_duong}
            onChange={(e) => setForm({ ...form, ten_duong: e.target.value })}
            className="border rounded-lg px-3 py-2 w-full"
            required
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.mac_dinh}
              onChange={(e) =>
                setForm({ ...form, mac_dinh: e.target.checked })
              }
            />
            Đặt làm địa chỉ mặc định
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 w-full mt-3"
          >
            {loading ? "Đang lưu..." : "Thêm địa chỉ"}
          </button>
        </form>
      </div>
    </div>
  );
}
