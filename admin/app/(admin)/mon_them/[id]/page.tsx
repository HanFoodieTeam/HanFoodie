  "use client";

  import { useEffect, useState } from "react";
  import { useRouter, useParams } from "next/navigation";
  import { IMonThem } from "@/lib/cautrucdata";

  export default function SuaMonThem() {
    const router = useRouter();
    const { id } = useParams();

    const [form, setForm] = useState<IMonThem>({
      id: 0,
      ten: "",
      gia_them: 0,
      loai_mon: 0,
      trang_thai: true,
      het_mon: null,
    });

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    //  Lấy dữ liệu món thêm hiện tại
    useEffect(() => {
      if (!id) return;

      const fetchData = async () => {
        try {
          const res = await fetch(`/api/mon_them/${id}`);
          if (!res.ok) throw new Error("Không tìm thấy món thêm!");
          const data: IMonThem = await res.json();

          setForm({
            ...data,
            trang_thai: !!data.trang_thai,
          });
        } catch {
          alert(" Lỗi khi tải dữ liệu món thêm!");
          router.push("/mon_them");
        } finally {
          setInitialLoading(false);
        }
      };

      fetchData();
    }, [id, router]);

    //  Thay đổi giá trị
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value, type } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]:
          type === "number"
            ? Number(value)
            : type === "radio"
              ? value === "true"
              : value,
      }));
    };

    //  Cập nhật món thêm
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!form.ten.trim()) return setError("Tên món không được để trống!");
      if (form.gia_them <= 0) return setError("Giá thêm phải lớn hơn 0!");

      setLoading(true);
      const res = await fetch(`/api/mon_them/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        alert(" Cập nhật món thêm thành công!");
        router.push("/mon_them");
      } else {
        alert(" Cập nhật thất bại!");
      }
      setLoading(false);
    };

    if (initialLoading)
      return <div className="p-4 text-center">Đang tải dữ liệu...</div>;

    return (
      <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
          CẬP NHẬT MÓN THÊM
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Cột 1 */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Tên món thêm
            </label>
            <input name="ten" value={form.ten} onChange={handleChange} placeholder="VD: Trứng chiên, Phô mai, ..."
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Giá thêm (VNĐ)
            </label>
            <input type="number" name="gia_them" value={form.gia_them} onChange={handleChange} placeholder="VD: 5000"
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Trạng thái
            </label>
            <div className="flex gap-6 rounded p-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="trang_thai" value="true" checked={form.trang_thai === true} onChange={handleChange} />
                <span>Hiện</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="trang_thai" value="false" checked={form.trang_thai === false} onChange={handleChange} />
                <span>Ẩn</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Loại món</label>
            <select name="loai_mon" value={form.loai_mon} onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value={1}>Món ăn kèm</option>
              <option value={0}>Topping</option>
            </select>

            {/* Nút lưu căn phải */}
            <div className="mt-3 flex justify-end">
              <button disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md disabled:opacity-50">
                {loading ? "Đang lưu..." : " Cập nhật món thêm"}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
