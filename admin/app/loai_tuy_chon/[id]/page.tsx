"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ILoaiTuyChon } from "@/lib/cautrucdata";

export default function SuaLoaiTuyChon() {
    const router = useRouter();
    const { id } = useParams();

    const [form, setForm] = useState<ILoaiTuyChon>({
        id: 0,
        ten: "",
        thu_tu: 0,
        an_hien: true,
    });

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // ------------------------------
    // Load dữ liệu loại tùy chọn
    // ------------------------------
    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/loai_tuy_chon/${id}`);
                if (!res.ok) throw new Error("Không tìm thấy loại tùy chọn!");

                const json: { success: boolean; data: ILoaiTuyChon; message?: string } =
                    await res.json();

                if (!json.success || !json.data) throw new Error("Không có dữ liệu");

                setForm({ ...json.data, an_hien: !!json.data.an_hien });
            } catch (err) {
                console.error(err);
                alert("❌ Lỗi khi tải dữ liệu loại tùy chọn!");
                router.push("/loai_tuy_chon");
            } finally {
                setInitialLoading(false);
            }
        };

        fetchData();
    }, [id, router]);

    // ------------------------------
    // Thay đổi input
    // ------------------------------
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    // ------------------------------
    // Submit Form PUT
    // ------------------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.ten.trim()) {
            setError("Tên loại tùy chọn không được để trống!");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`/api/loai_tuy_chon/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ten: form.ten,
                    thu_tu: form.thu_tu,
                    an_hien: form.an_hien,
                }),
            });

            const json: { success: boolean; message?: string } = await res.json();

            if (res.ok && json.success) {
                alert("✅ Cập nhật loại tùy chọn thành công!");
                router.push("/loai_tuy_chon");
            } else {
                alert("❌ Cập nhật thất bại: " + json.message);
            }
        } catch (err) {
            console.error(err);
            alert("❌ Lỗi khi cập nhật loại tùy chọn!");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading)
        return <div className="p-4 text-center">Đang tải dữ liệu...</div>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
                CẬP NHẬT LOẠI TÙY CHỌN
            </h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                    {error}
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
                {/* Tên loại tùy chọn */}
                <div>
                    <label className="font-medium">Tên loại tùy chọn</label>
                    <input
                        name="ten"
                        value={form.ten}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </div>

                {/* Thứ tự */}
                <div>
                    <label className="font-medium">Thứ tự</label>
                    <input
                        type="number"
                        name="thu_tu"
                        value={form.thu_tu ?? 0}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </div>

                {/* Trạng thái */}
                <div>
                    <label className="font-medium">Trạng thái</label>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="an_hien"
                                value="true"
                                checked={form.an_hien === true}
                                onChange={handleChange}
                            />
                            Hiện
                        </label>

                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="an_hien"
                                value="false"
                                checked={form.an_hien === false}
                                onChange={handleChange}
                            />
                            Ẩn
                        </label>
                    </div>
                </div>

                {/* Submit */}
                <div className="md:col-span-2 flex justify-end mt-4">
                    <button
                        disabled={loading}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                    >
                        {loading ? "Đang lưu..." : "Cập nhật loại tùy chọn"}
                    </button>
                </div>
            </form>
        </div>
    );
}
