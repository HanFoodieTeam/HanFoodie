"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { IMaGiamGia } from "@/lib/cautrucdata";

export default function SuaMaGiamGia() {
  const router = useRouter();
  const { id } = useParams();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 1️⃣ Validate ngày
    if (form.ket_thuc && form.bat_dau) {
      if (new Date(form.ket_thuc) < new Date(form.bat_dau)) {
        newErrors.ket_thuc = "Ngày kết thúc không được nhỏ hơn ngày bắt đầu";
      }
    }

    // 2️⃣ Giảm theo %
    if (form.loai_giam_gia) {
      if (form.gia_tri_giam <= 0 || form.gia_tri_giam >= 100) {
        newErrors.gia_tri_giam =
          "Giảm theo % phải lớn hơn 0 và nhỏ hơn 100";
      }

      if (
        form.gia_tri_giam_toi_da !== null &&
        form.gia_tri_giam_toi_da <= 0
      ) {
        newErrors.gia_tri_giam_toi_da =
          "Giá trị giảm tối đa phải lớn hơn 0";
      }
    }

    // 3️⃣ Giảm theo tiền
    if (!form.loai_giam_gia) {
      if (form.gia_tri_giam <= 0) {
        newErrors.gia_tri_giam = "Giá trị giảm phải lớn hơn 0";
      }

      if (form.gia_tri_giam > form.gia_tri_toi_thieu) {
        newErrors.gia_tri_giam =
          "Giá trị giảm không được lớn hơn giá trị tối thiểu đơn hàng";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const [form, setForm] = useState<IMaGiamGia>({
    id: 0,
    ten: "",
    ma_so: "",
    loai_giam_gia: false,
    gia_tri_giam: 0,
    gia_tri_giam_toi_da: null,
    gia_tri_toi_thieu: 0,
    so_luong: 1,
    bat_dau: new Date().toISOString().split("T")[0],
    ket_thuc: "",
    mo_ta: "",
    an_hien: true,
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ---  Format & parse tiền ---
  const formatNumber = (value: number) =>
    value.toLocaleString("vi-VN", { maximumFractionDigits: 0 });

  const parseNumber = (value: string) =>
    Number(value.replace(/[^\d]/g, "")) || 0;

  // --- 1️ Lấy dữ liệu mã giảm giá hiện tại ---
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
          bat_dau: data.bat_dau
            ? new Date(data.bat_dau).toISOString().split("T")[0]
            : "",
          ket_thuc: data.ket_thuc
            ? new Date(data.ket_thuc).toISOString().split("T")[0]
            : "",
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

  // --- 2️ Xử lý thay đổi form ---
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (["gia_tri_giam", "gia_tri_giam_toi_da", "gia_tri_toi_thieu"].includes(name)) {
      const parsed = parseNumber(value);
      setForm((prev) => ({ ...prev, [name]: parsed }));
      return;
    }

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

  // --- 3️ Validate & Submit ---
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError(null);

  //   //  Validate ngày
  //   if (new Date(form.ket_thuc) < new Date(form.bat_dau)) {
  //     setError(" Ngày kết thúc không được nhỏ hơn ngày bắt đầu.");
  //     return;
  //   }

  //   //  Validate phần trăm
  //   if (form.loai_giam_gia && form.gia_tri_giam > 100) {
  //     setError(" Giá trị giảm phần trăm không được vượt quá 100%.");
  //     return;
  //   }

  //   //  Validate giảm tiền
  //   if (!form.loai_giam_gia && form.gia_tri_giam > form.gia_tri_toi_thieu) {
  //     setError(" Giá trị giảm không thể lớn hơn giá trị tối thiểu đơn hàng.");
  //     return;
  //   }

  //   setLoading(true);

  //   const res = await fetch(`/api/ma_giam_gia/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(form),
  //   });

  //   if (res.ok) {
  //     alert(" Cập nhật mã giảm giá thành công!");
  //     router.push("/ma_giam_gia");
  //   } else {
  //     alert(" Cập nhật thất bại, vui lòng kiểm tra lại!");
  //   }

  //   setLoading(false);
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);

    const res = await fetch(`/api/ma_giam_gia/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Cập nhật mã giảm giá thành công!");
      router.push("/ma_giam_gia");
    } else {
      alert("Cập nhật thất bại, vui lòng kiểm tra lại!");
    }

    setLoading(false);
  };

  if (initialLoading) {
    return (
      <div className="p-4 text-center text-xl">Đang tải dữ liệu mã giảm giá...</div>
    );
  }

  // --- 4️ Giao diện form ---
  return (
    <div className="p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4 text-center">
        CẬP NHẬT MÃ GIẢM GIÁ
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-2 mb-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Tên & Mã số */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <p className="text-lg">Tên mã giảm giá</p>
            <input type="text" name="ten" value={form.ten} onChange={handleChange} required placeholder="VD: Giảm 10K đơn đầu tiên"
              className="border border-gray-300 p-2 w-full rounded" />
          </div>
          <div className="w-1/2">
            <p className="text-lg">Mã số</p>
            <input type="text" name="ma_so" value={form.ma_so} onChange={handleChange} required className="border border-gray-300 p-2 w-full rounded" placeholder="VD: NEW10K" />
          </div>
        </div>

        {/* Loại giảm giá */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <p className="text-lg">Loại giảm giá</p>
            <select name="loai_giam_gia" value={form.loai_giam_gia ? "percent" : "money"}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  loai_giam_gia: e.target.value === "percent",
                  gia_tri_giam_toi_da:
                    e.target.value === "percent" ? f.gia_tri_giam_toi_da ?? 0 : null,
                }))
              }
              className="border border-gray-300 p-2 w-full rounded" >
              <option value="money">Theo tiền (VNĐ)</option>
              <option value="percent">Theo phần trăm (%)</option>
            </select>
          </div>

          {form.loai_giam_gia ? (
            // Nếu giảm theo %
            <div className="flex gap-4 w-1/2">
              <div className="w-1/2">
                <p className="text-lg">Giá trị giảm (%)</p>
                <input type="number" name="gia_tri_giam" value={form.gia_tri_giam} onChange={handleChange} required min={1} max={100}
                  className="border border-gray-300 p-2 w-full rounded" />
                {errors.gia_tri_giam && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gia_tri_giam}
                  </p>
                )}

              </div>
              <div className="w-1/2">
                <p className="text-lg">Giảm tối đa (VNĐ)</p>
                <input type="text" name="gia_tri_giam_toi_da"
                  value={
                    form.gia_tri_giam_toi_da
                      ? formatNumber(form.gia_tri_giam_toi_da)
                      : ""
                  }
                  onChange={handleChange} required
                  className="border border-gray-300 p-2 w-full rounded" placeholder="VD: 50.000" />
              </div>
            </div>
          ) : (
            // Nếu giảm theo tiền
            <div className="w-1/2">
              <p className="text-lg">Giá trị giảm (VNĐ)</p>
              <input type="text" name="gia_tri_giam" value={form.gia_tri_giam ? formatNumber(form.gia_tri_giam) : ""}
                onChange={handleChange} required placeholder="VD: 30.000" />
              {errors.gia_tri_giam_toi_da && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gia_tri_giam_toi_da}
                </p>
              )}

            </div>
          )}
        </div>

        {/* Giá trị tối thiểu & Số lượng */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <p className="text-lg">Giá trị tối thiểu (VNĐ)</p>
            <input type="text" name="gia_tri_toi_thieu"
              value={form.gia_tri_toi_thieu
                ? formatNumber(form.gia_tri_toi_thieu)
                : ""}
              onChange={handleChange} required
              className="border border-gray-300 p-2 w-full rounded" placeholder="VD: 100.000" />
          </div>
          <div className="w-1/2">
            <p className="text-lg">Số lượng</p>
            <input type="number" name="so_luong" value={form.so_luong ?? ""} onChange={handleChange} required min={1}
              className="border border-gray-300 p-2 w-full rounded" />
          </div>
        </div>

        {/* Ngày bắt đầu & kết thúc */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <p className="text-lg">Ngày bắt đầu</p>
            <input type="date" name="bat_dau" value={form.bat_dau} onChange={handleChange} required
              className="border border-gray-300 p-2 w-full rounded" />
          </div>
          <div className="w-1/2">
            <p className="text-lg">Ngày kết thúc</p>
            <input type="date" name="ket_thuc" value={form.ket_thuc} onChange={handleChange} required
              className="border border-gray-300 p-2 w-full rounded" />
            {errors.ket_thuc && (
              <p className="text-red-500 text-sm mt-1">{errors.ket_thuc}</p>
            )}

          </div>
        </div>

        {/* Điều kiện */}
        <div>
          <p className="text-lg"> Mô tả</p>
          <textarea name="mo_ta" value={form.mo_ta ?? ""} onChange={handleChange} rows={3}
            className="border border-gray-300 p-2 w-full rounded" placeholder='Mô tả"' />
        </div>

        {/* Ẩn / Hiện */}
        <div className="flex items-center gap-4">
          <p className="text-lg w-24">Ẩn / Hiện</p>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1 text-base">
              <input type="radio" name="an_hien" checked={form.an_hien} onChange={() => setForm((f) => ({ ...f, an_hien: true }))} className="h-4 w-4" />
              <span>Hiện</span>
            </label>
            <label className="flex items-center gap-1 text-base">
              <input type="radio" name="an_hien" checked={!form.an_hien} onChange={() => setForm((f) => ({ ...f, an_hien: false }))} className="h-4 w-4" />
              <span>Ẩn</span>
            </label>
          </div>
        </div>

        {/* Nút lưu */}
        <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-medium disabled:opacity-50">
          {loading ? "Đang lưu..." : "Cập nhật mã giảm giá"}
        </button>
      </form>
    </div>
  );
}
