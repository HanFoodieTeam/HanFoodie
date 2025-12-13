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
        const res = await fetch(`/api/bai_viet/${params.id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Không tải được bài viết");
        const json = await res.json();
        if (!json.success || !json.data) throw new Error("Bài viết không tồn tại");

        const postRes = await fetch(`/api/bai_viet/${params.id}/view`, { method: "POST" });
        let luotXemMoi = json.data.luot_xem;
        if (postRes.ok) {
          const postJson = await postRes.json();
          if (postJson.luot_xem !== undefined) luotXemMoi = postJson.luot_xem;
        }

        setBaiViet({ ...json.data, luot_xem: luotXemMoi });
        if (json.related && Array.isArray(json.related)) setRelatedBaiViet(json.related.slice(0, 4));
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
    <main className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cột trái: Chi tiết bài viết */}
        <div className="lg:col-span-2 flex flex-col gap-6 pr-6 lg:pr-0">
          <div className="flex items-start gap-6">
            {/* Hình lớn bên trái */}
            {baiViet.hinh && (
              <div className="relative w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={baiViet.hinh}
                  alt={baiViet.tieu_de}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Tiêu đề bên phải */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-[#6A0A0A] mb-2">
                {baiViet.tieu_de}
              </h1>
              {baiViet.ngay_dang && (
                <p className="text-sm text-gray-500">
                  {new Date(baiViet.ngay_dang).toLocaleDateString("vi-VN")}
                </p>
              )}
            </div>
          </div>

          {/* Nội dung bài viết */}
          <article className="prose prose-lg max-w-full text-gray-800">
            <div dangerouslySetInnerHTML={{ __html: baiViet.noi_dung }} />
          </article>

          <p className="text-sm text-gray-500 font-medium mt-4">
            Lượt xem: {baiViet.luot_xem}
          </p>
        </div>

        {/* Cột phải: Sidebar bài viết liên quan */}
        {relatedBaiViet.length > 0 && (
          <aside className="lg:col-span-1 lg:pl-6 lg:border-l lg:border-gray-300">
            <h2 className="text-2xl font-semibold text-[#6A0A0A] mb-6">
              Các bài viết liên quan
            </h2>
            <div className="flex flex-col gap-4">
              {relatedBaiViet.map((bv) => (
                <Link
                  key={bv.id}
                  href={`/bai_viet/${bv.id}`}
                  className="group flex border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  {/* Hình nhỏ bên trái */}
                  {bv.hinh ? (
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={bv.hinh}
                        alt={bv.tieu_de}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 flex items-center justify-center text-gray-400">
                      Chưa có ảnh
                    </div>
                  )}
                  {/* Tiêu đề bên phải */}
                  <div className="p-3 flex-1">
                    <h3 className="text-sm font-semibold line-clamp-2 text-gray-800">
                      {bv.tieu_de}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </main>



  );
}
