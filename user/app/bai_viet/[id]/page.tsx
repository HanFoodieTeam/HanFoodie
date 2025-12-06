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
  const [relatedBaiViet, setRelatedBaiViet] = useState<IBaiViet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChiTiet = async () => {
      setLoading(true);
      try {
        // Lấy chi tiết bài viết
        const res = await fetch(`/api/bai_viet/${params.id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Không tải được bài viết");
        const json = await res.json();
        setBaiViet(json.data);

        // Tăng lượt xem
        await fetch(`/api/bai_viet/${params.id}`, { method: "POST" });

        // Lấy bài viết liên quan (cùng loại)
        const resAll = await fetch(`/api/bai_viet?id_loai=${json.data.loai_bai_viet?.id}&limit=8`, { cache: "no-store" });
        if (!resAll.ok) throw new Error("Không tải được bài viết liên quan");
        const allJson = await resAll.json();
        if (allJson.success) {
          const filtered: IBaiViet[] = allJson.data.filter((bv: IBaiViet) => bv.id !== json.data.id);
          setRelatedBaiViet(filtered.slice(0, 4)); // max 4 bài
        }
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

  return (
    <main className="bg-white min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Bài viết chi tiết */}
        {baiViet.hinh && <img src={baiViet.hinh} alt={baiViet.tieu_de} className="w-full rounded-xl mb-5" />}
        <h1 className="text-3xl font-bold text-[#6A0A0A] mb-3">{baiViet.tieu_de}</h1>
        {baiViet.loai_bai_viet && (
          <p className="text-sm text-gray-500 mb-2">Loại: {baiViet.loai_bai_viet.ten_loai}</p>
        )}
        {baiViet.ngay_dang && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
            <Calendar size={16} />
            <span>{new Date(baiViet.ngay_dang).toLocaleDateString("vi-VN")}</span>
          </div>
        )}
        <div className="text-gray-800 mb-5" dangerouslySetInnerHTML={{ __html: baiViet.noi_dung }} />
        <p className="text-sm text-gray-500 font-medium mb-8">Lượt xem: {baiViet.luot_xem}</p>

        {/* Bài viết liên quan */}
        {relatedBaiViet.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-[#6A0A0A] mb-4">Các bài viết liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBaiViet.map(bv => (
                <Link
                  key={bv.id}
                  href={`/bai_viet/${bv.id}`}
                  className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  {bv.hinh && <img src={bv.hinh} alt={bv.tieu_de} className="w-full h-36 object-cover" />}
                  <div className="p-3">
                    <h3 className="text-sm font-semibold mb-1 line-clamp-2">{bv.tieu_de}</h3>
                    {bv.ngay_dang && (
                      <p className="text-xs text-gray-400">{new Date(bv.ngay_dang).toLocaleDateString("vi-VN")}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
