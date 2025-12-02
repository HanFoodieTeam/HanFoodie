"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar } from "lucide-react";

interface ILoaiBaiViet {
  id: number;
  ten_loai: string;
}

interface IBaiViet {
  id: number;
  tieu_de: string;
  noi_dung: string;
  hinh: string | null;
  luot_xem: number;
  slug: string;
  ngay_dang: string | null;
  loai_bai_viet: ILoaiBaiViet | null;
}

export default function BaiVietChiTietPage() {
  const params = useParams();
  const [baiViet, setBaiViet] = useState<IBaiViet | null>(null);
  const [danhSachBaiViet, setDanhSachBaiViet] = useState<IBaiViet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Lấy chi tiết bài viết và tăng lượt xem
  useEffect(() => {
    const fetchChiTiet = async () => {
      setLoading(true);
      try {
        // Lấy dữ liệu chi tiết
        const res = await fetch(`/api/bai_viet/${params.id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Không tải được bài viết");
        const json = await res.json();
        setBaiViet(json.data);

        // Tăng lượt xem
        await fetch(`/api/bai_viet/${params.id}/view`, { method: "POST" });

        // Lấy danh sách tất cả bài viết
        const resAll = await fetch("/api/bai_viet", { cache: "no-store" });
        if (!resAll.ok) throw new Error("Không tải được danh sách bài viết");
        const allJson = await resAll.json();
        const data: IBaiViet[] = allJson.success ? allJson.data : [];
        setDanhSachBaiViet(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChiTiet();
  }, [params.id]);

  if (loading) return <div className="p-6 text-center text-gray-500">Đang tải bài viết...</div>;
  if (!baiViet) return <div className="p-6 text-center text-gray-500">Bài viết không tồn tại</div>;

  // Bài viết cùng loại
  const relatedBaiViet = danhSachBaiViet.filter(
    bv => bv.id !== baiViet.id && bv.loai_bai_viet?.id === baiViet.loai_bai_viet?.id
  );
  const displayedBaiViet = showAll ? relatedBaiViet : relatedBaiViet.slice(0, 2);

  return (
    <main className="bg-white min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {baiViet.hinh && <img src={baiViet.hinh} alt={baiViet.tieu_de} className="w-full rounded-xl mb-5" />}
        <h1 className="text-3xl font-bold text-[#6A0A0A] mb-4">{baiViet.tieu_de}</h1>
        {baiViet.loai_bai_viet && <p className="text-sm text-gray-500 mb-2">Loại: {baiViet.loai_bai_viet.ten_loai}</p>}
        {baiViet.ngay_dang && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
            <Calendar size={16} />
            <span>{new Date(baiViet.ngay_dang).toLocaleDateString("vi-VN")}</span>
          </div>
        )}
        <div className="text-gray-800 mb-5" dangerouslySetInnerHTML={{ __html: baiViet.noi_dung }} />
        <p className="text-sm text-gray-500 font-medium mb-6">Lượt xem: {baiViet.luot_xem}</p>

        {/* Bài viết cùng loại */}
        {relatedBaiViet.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-[#6A0A0A] mb-4">Các bài viết cùng loại</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {displayedBaiViet.map(bv => (
                <Link
                  key={bv.id}
                  href={`/bai_viet/${bv.id}`}
                  className="flex items-center justify-between p-4 border rounded-lg hover:shadow-lg transition"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">{bv.tieu_de}</h3>
                    <p className="text-gray-500 text-sm line-clamp-3">{bv.noi_dung}</p>
                  </div>
                  {bv.hinh && (
                    <img
                      src={bv.hinh}
                      alt={bv.tieu_de}
                      className="w-20 h-20 object-cover rounded ml-4 flex-shrink-0"
                    />
                  )}
                </Link>
              ))}
            </div>
            {relatedBaiViet.length > 2 && (
              <div className="mt-4 text-center">
                <button
                  className="px-4 py-2 bg-[#6A0A0A] text-white rounded-lg hover:bg-[#7a0e0e] transition"
                  onClick={() => setShowAll(prev => !prev)}
                >
                  {showAll ? "Thu gọn" : "Xem thêm"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
