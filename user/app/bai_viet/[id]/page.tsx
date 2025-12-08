"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { IBaiViet } from "@/app/lib/cautrucdata";

export default function BaiVietChiTietPage() {
  const params = useParams();
  const [baiViet, setBaiViet] = useState<IBaiViet | null>(null);
  const [relatedBaiViet, setRelatedBaiViet] = useState<IBaiViet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChiTiet = async () => {
      setLoading(true);
      try {
        // 1️⃣ Lấy chi tiết bài viết
        const res = await fetch(`/api/bai_viet/${params.id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Không tải được bài viết");
        const json = await res.json();
        if (!json.success || !json.data) throw new Error("Bài viết không tồn tại");

        // 2️⃣ Tăng lượt xem
        const postRes = await fetch(`/api/bai_viet/${params.id}/view`, { method: "POST" });
        let luotXemMoi = json.data.luot_xem;
        if (postRes.ok) {
          const postJson = await postRes.json();
          if (postJson.luot_xem !== undefined) luotXemMoi = postJson.luot_xem;
        }

        // 3️⃣ Set state bài viết với lượt xem mới
        setBaiViet({ ...json.data, luot_xem: luotXemMoi });

        // 4️⃣ Set bài viết liên quan
        if (json.related && Array.isArray(json.related)) {
          setRelatedBaiViet(json.related.slice(0, 4));
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
        {baiViet.hinh && <img src={baiViet.hinh} alt={baiViet.tieu_de} className="w-full rounded-xl mb-5" />}
        <h1 className="text-3xl font-bold text-[#6A0A0A] mb-3">{baiViet.tieu_de}</h1>
        {baiViet.ngay_dang && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
            <Calendar size={16} />
            <span>{new Date(baiViet.ngay_dang).toLocaleDateString("vi-VN")}</span>
          </div>
        )}
        <div className="text-gray-800 mb-5" dangerouslySetInnerHTML={{ __html: baiViet.noi_dung }} />
        <p className="text-sm text-gray-500 font-medium mb-8">Lượt xem: {baiViet.luot_xem}</p>

        {relatedBaiViet.length > 0 && (
          <>
            <h2 className="text-xl font-semibold text-[#6A0A0A] mb-4">Các bài viết liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBaiViet.map((bv) => (
                <Link
                  key={bv.id}
                  href={`/bai_viet/${bv.id}`}
                  className="block border rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  {bv.hinh ? (
                    <img src={bv.hinh} alt={bv.tieu_de} className="w-full h-36 object-cover" />
                  ) : (
                    <div className="w-full h-36 bg-gray-100 flex items-center justify-center text-gray-400">
                      Chưa có ảnh
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="text-sm font-semibold mb-1 line-clamp-2">{bv.tieu_de}</h3>
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
