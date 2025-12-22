"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { IBaiViet } from "@/lib/cautrucdata";

export default function BaiVietChiTietPage() {
  const params = useParams();
  const [baiViet, setBaiViet] = useState<IBaiViet | null>(null);
  const [relatedBaiViet, setRelatedBaiViet] = useState<IBaiViet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChiTiet = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/bai_viet/${params.id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Không tải được bài viết");
        const json = await res.json();
        if (!json.success || !json.data)
          throw new Error("Bài viết không tồn tại");

        const postRes = await fetch(`/api/bai_viet/${params.id}/view`, {
          method: "POST",
        });

        let luotXemMoi = json.data.luot_xem;
        if (postRes.ok) {
          const postJson = await postRes.json();
          if (postJson.luot_xem !== undefined)
            luotXemMoi = postJson.luot_xem;
        }

        setBaiViet({ ...json.data, luot_xem: luotXemMoi });

        if (json.related && Array.isArray(json.related)) {
          setRelatedBaiViet(json.related.slice(0, 5));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChiTiet();
  }, [params.id]);

  if (loading) {
    return (
      <div className="px-4 py-16 text-center text-gray-500">
        Đang tải bài viết...
      </div>
    );
  }

  if (!baiViet) {
    return (
      <div className="px-4 py-16 text-center text-gray-500">
        Bài viết không tồn tại
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* ===== HERO ===== */}
      {baiViet.hinh && (
        <div className="relative w-full h-[260px] md:h-[380px]">
          <Image
            src={baiViet.hinh}
            alt={baiViet.tieu_de}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 md:px-6 pb-6 text-white">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight max-w-4xl">
              {baiViet.tieu_de}
            </h1>

            {baiViet.ngay_dang && (
              <div className="flex items-center gap-2 text-sm opacity-90 mt-2">
                <Calendar className="w-4 h-4" />
                {new Date(baiViet.ngay_dang).toLocaleDateString("vi-VN")}
                <span>•</span>
                {baiViet.luot_xem} lượt xem
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== CONTENT ===== */}
      <div className=" bg-white max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ===== BÀI VIẾT ===== */}
        <div className="bg-white lg:col-span-2">
          <article className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            <div className="prose prose-base md:prose-lg max-w-none text-gray-800">
              <div
                dangerouslySetInnerHTML={{ __html: baiViet.noi_dung }}
              />
            </div>
          </article>
        </div>

        {/* ===== SIDEBAR ===== */}
        {relatedBaiViet.length > 0 && (
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-[#6A0A0A] mb-4">
                Bài viết liên quan
              </h2>

              <div className="space-y-4">
                {relatedBaiViet.map((bv) => (
                  <Link
                    key={bv.id}
                    href={`/bai_viet/${bv.id}`}
                    className="group flex gap-3 bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                  >
                    {bv.hinh ? (
                      <div className="relative w-24 h-20 flex-shrink-0">
                        <Image
                          src={bv.hinh}
                          alt={bv.tieu_de}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-20 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                        No image
                      </div>
                    )}

                    <div className="p-3 flex-1">
                      <h3 className="text-sm font-semibold line-clamp-2 text-gray-800 group-hover:text-[#6A0A0A]">
                        {bv.tieu_de}
                      </h3>
                      {bv.ngay_dang && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(bv.ngay_dang).toLocaleDateString("vi-VN")}
                          <span>•</span>
                           {bv.luot_xem} lượt xem
                        </p>
                        
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
