"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation"; // 🟢 thêm useParams
import { IMaGiamGia } from "@/app/lib/cautrucdata";

export default function SuaMaGiamGia() {
  const router = useRouter();
  const { id } = useParams(); // ✅ lấy id từ URL (App Router)

  const [form, setForm] = useState<IMaGiamGia>({
    id: 0,
    ten: "",
    ma_so: "",
    loai_giam_gia: false,
    gia_tri_giam: 0,
    gia_tri_toi_thieu: 0,
    so_luong: 1,
    bat_dau: new Date().toISOString().split("T")[0],
    ket_thuc: "",
    dieu_kien: "",
    an_hien: true,
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // --- 1️⃣ Lấy dữ liệu mã giảm giá hiện tại ---
  useEffect(() => {
    if (!id) return;

    const fetchMGG = async () => {
      try {
        setInitialLoading(true);
        const res = await fetch(`/api/ma_giam_gia/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy mã giảm giá.");

        const data: IMaGiamGia = await res.json();

        setForm({
          ...data,
          bat_dau: data.bat_dau ? new Date(data.bat_dau).toISOString().split("T")[0] : "",
          ket_thuc: data.ket_thuc ? new Date(data.ket_thuc).toISOString().split("T")[0] : "",
        });
      } catch (error) {
        alert("Lỗi khi tải dữ liệu: " + error);
        router.push("/ma_giam_gia");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchMGG();
  }, [id, router]);

  // --- 2️⃣ Xử lý thay đổi form ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  // --- 3️⃣ Xử lý submit (PUT cập nhật) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/ma_giam_gia/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("✅ Cập nhật mã giảm giá thành công!");
      router.push("/ma_giam_gia");
    } else {
      alert("❌ Cập nhật thất bại, vui lòng kiểm tra lại!");
    }

    setLoading(false);
  };

  if (initialLoading) {
    return <div className="p-4 text-center text-xl">Đang tải dữ liệu mã giảm giá...</div>;
  }

  // --- 4️⃣ Form render ---
  return (
    <div className="p-2 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4 bg-yellow-400 p-2 text-center">
        Chỉnh Sửa Mã Giảm Giá: {form.ten}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-2 p-2">
        {/* Tên và mã số */}
        <div className="flex justify-between">
          <div className="w-[48%]">
            <p className="text-lg">Tên mã giảm giá</p>
            <input
              type="text"
              name="ten"
              value={form.ten}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="VD: Giảm 10K đơn đầu tiên"
            />
          </div>
          <div className="w-[48%]">
            <p className="text-lg">Mã số</p>
            <input
              type="text"
              name="ma_so"
              value={form.ma_so}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded"
              placeholder="VD: NEW10K"
            />
          </div>
        </div>

        {/* Loại giảm giá & giá trị giảm */}
        <div className="flex justify-between">
          <div className="w-[48%]">
            <p className="text-lg">Loại giảm giá</p>
            <select
              name="loai_giam_gia"
              value={form.loai_giam_gia ? "percent" : "money"}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  loai_giam_gia: e.target.value === "percent",
                }))
              }
              className="border border-gray-300 p-2 w-full rounded"
            >
              <option value="money">Theo tiền (VNĐ)</option>
              <option value="percent">Theo phần trăm (%)</option>
            </select>
          </div>
          <div className="w-[48%]">
            <p className="text-lg">Giá trị giảm</p>
            <input
              type="number"
              name="gia_tri_giam"
              value={form.gia_tri_giam}
              onChange={handleChange}
              required
              min={1}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
        </div>

        {/* Giá trị tối thiểu & số lượng */}
        <div className="flex justify-between">
          <div className="w-[48%]">
            <p className="text-lg">Giá trị tối thiểu (VNĐ)</p>
            <input
              type="number"
              name="gia_tri_toi_thieu"
              value={form.gia_tri_toi_thieu}
              onChange={handleChange}
              required
              min={0}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="w-[48%]">
            <p className="text-lg">Số lượng</p>
            <input
              type="number"
              name="so_luong"
              value={form.so_luong ?? ""}
              onChange={handleChange}
              required
              min={1}
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
        </div>

        {/* Ngày bắt đầu & kết thúc */}
        <div className="flex justify-between">
          <div className="w-[48%]">
            <p className="text-lg">Ngày bắt đầu</p>
            <input
              type="date"
              name="bat_dau"
              value={form.bat_dau}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
          <div className="w-[48%]">
            <p className="text-lg">Ngày kết thúc</p>
            <input
              type="date"
              name="ket_thuc"
              value={form.ket_thuc}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded"
            />
          </div>
        </div>

        {/* Điều kiện */}
        <div>
          <p className="text-lg">Điều kiện (JSON hoặc mô tả)</p>
          <textarea
            name="dieu_kien"
            value={form.dieu_kien}
            onChange={handleChange}
            rows={3}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder='VD: {"quantity": 3} hoặc "Áp dụng cho sản phẩm X"'
          />
        </div>

        {/* Ẩn / Hiện */}
        <div className="flex items-center space-x-6">
          <p className="text-lg w-24">Ẩn / Hiện</p>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-1 text-base">
              <input
                type="radio"
                name="an_hien"
                value="1"
                checked={form.an_hien}
                onChange={() => setForm((f) => ({ ...f, an_hien: true }))}
                className="h-4 w-4"
              />
              <span>Hiện</span>
            </label>
            <label className="flex items-center space-x-1 text-base">
              <input
                type="radio"
                name="an_hien"
                value="0"
                checked={!form.an_hien}
                onChange={() => setForm((f) => ({ ...f, an_hien: false }))}
                className="h-4 w-4"
              />
              <span>Ẩn</span>
            </label>
          </div>
        </div>

        {/* Nút hành động */}
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : "✏️ Cập nhật mã giảm giá"}
        </button>
      </form>
    </div>
  );
}
