"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import DanhMucSection from "../components/danhmucsection";
import { ISanPham, IDanhMuc } from "../../lib/cautrucdata";
import { useSearchParams } from "next/navigation";
import { useYeuThich } from "@/app/context/yeuthichcontext";


interface IDanhMucCoSanPham extends IDanhMuc {
  san_pham: ISanPham[];
}

export interface IYeuThichItem {
  id: number;
  id_nguoi_dung: number;
  id_san_pham: number;
  ngay_tao: string;
}

/* =========================
   COMPONENT GỐC (KHÔNG DÙNG HOOK)
========================= */
export default function SanPhamPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-center text-gray-500 mt-[80px]">
          Đang tải sản phẩm...
        </div>
      }
    >
      <SanPhamContent />
    </Suspense>
  );
}

/* =========================
   COMPONENT DÙNG useSearchParams
========================= */
function SanPhamContent() {
  const searchParams = useSearchParams();
  const danhMucSlug = searchParams.get("danh_muc");

  const [dsDanhMuc, setDsDanhMuc] = useState<IDanhMucCoSanPham[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { reloadYeuThich } = useYeuThich();


  // ================== LOAD SẢN PHẨM ==================
  useEffect(() => {
    const fetchSanPham = async () => {
      try {
        const res = await fetch("/api/san_pham", { cache: "no-store" });
        const data = await res.json();
        setDsDanhMuc(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSanPham();
  }, []);

  // ================== LOAD YÊU THÍCH ==================
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const token = localStorage.getItem("token");
          if (!token) return;

          const res = await fetch("/api/yeu_thich", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          });

        const json: { success: boolean; data: IYeuThichItem[] } =
          await res.json();

        setFavorites(json.data.map((i) => i.id_san_pham));
      } catch (error) {
        console.error("Lỗi lấy yêu thích:", error);
      }
    }
    fetchFavorites();
  }, []);

  // ================== SCROLL ĐẾN DANH MỤC ==================
  useEffect(() => {
    if (!danhMucSlug || loading) return;

    const el = document.getElementById(`danh-muc-${danhMucSlug}`);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [danhMucSlug, loading]);

  // ================== SCROLL KHI SEARCH ==================
useEffect(() => {
  if (loading || dsDanhMuc.length === 0) return;

  const rawKeyword = searchParams.get("search")?.trim();
  if (!rawKeyword) return;

  const keywordNoTone = removeVietnameseTones(rawKeyword.toLowerCase());

  // Tìm danh mục theo keyword
  let targetDanhMuc = dsDanhMuc.find(dm =>
    (dm.slug && removeVietnameseTones(dm.slug.toLowerCase()) === keywordNoTone) ||
    removeVietnameseTones(dm.ten.toLowerCase()).includes(keywordNoTone)
  );

  if (!targetDanhMuc) {
    const keywords = keywordNoTone.split(/\s+/);
    targetDanhMuc = dsDanhMuc.find(dm =>
      dm.san_pham.some(sp => {
        const spName = removeVietnameseTones(sp.ten.toLowerCase());
        return keywords.every(k => spName.includes(k));
      })
    );
  }

  if (targetDanhMuc?.slug) {
    const el = document.getElementById(`danh-muc-${targetDanhMuc.slug}`);
    if (el) {
      // delay 50ms để chắc chắn DOM đã render
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }
}, [dsDanhMuc, searchParams, loading]);


  // =================== HÀM LOẠI BỎ DẤU ===================
  function removeVietnameseTones(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");

  }

  const isFavorite = favorites.includes(id_san_pham);

  try {
    if (isFavorite) {
      await fetch(`/api/yeu_thich?id_san_pham=${id_san_pham}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavorites((prev) => prev.filter((id) => id !== id_san_pham));
      setToast("Đã xóa khỏi yêu thích");
    } else {
      await fetch("/api/yeu_thich", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_san_pham }),
      });

      setFavorites((prev) => [...prev, id_san_pham]);
      setToast("Đã thêm vào yêu thích");
    }

    reloadYeuThich(); // ⭐ CẬP NHẬT HEADER
    setTimeout(() => setToast(null), 1500);
  } catch (error) {
    console.error("Lỗi yêu thích:", error);
  }
};


  if (loading)
    return (
      <div className="p-6 h-[700px] text-center text-gray-500 mt-[80px]">
        Đang tải sản phẩm...
      </div>
    );

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="sticky top-[70px] z-40 bg-white">
        <DanhMucSection data={dsDanhMuc} />
      </div>
      {toast && (
        <div className="fixed bottom-5 right-5 bg-[#6A0A0A] text-white px-4 py-2 rounded-xl shadow-md z-50">
          {toast}
        </div>
      )}

      <div className="py-0">
        {dsDanhMuc.map((dm) => (
          <section
            key={dm.id}
            id={`danh-muc-${dm.slug}`}
            className="scroll-mt-[120px]"
          >
            <h2 className="text-2xl font-bold mb-4 text-[#6A0A0A]">
              {dm.ten}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
              {dm.san_pham.map((sp) => {
                const isFavorite = favorites.includes(sp.id);

                return (
                  <div
                    key={sp.id}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
                  >
                    <div className="relative">
                      <img
                        src={sp.hinh || "/noimg.png"}
                        alt={sp.ten}
                        className="w-full h-48 object-cover group-hover:scale-105 transition"
                      />

                      <button
                        onClick={() => toggleFavorite(sp.id)}
                        aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                      >
                        <Heart
                          size={22}
                          className={
                            isFavorite
                              ? "fill-red-500 text-red-500"
                              : "text-gray-200 hover:text-red-400"
                          }
                        />
                      </button>

                    </div>

                    <Link href={`/chi_tiet/${sp.id}`} className="block p-4">
                      <h3 className="font-medium line-clamp-1">
                        {sp.ten}
                      </h3>
                      <div
                        className="text-sm text-gray-600 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: sp.mo_ta || "" }}
                      />
                    </Link>

                    <div className="flex justify-between items-center px-4 pb-4">
                      <span className="font-semibold text-[#6A0A0A]">
                        {sp.gia_goc.toLocaleString("vi-VN")}₫
                      </span>

                      {sp.so_sao_tb && (
                        <div className="flex items-center text-sm">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {Number(sp.so_sao_tb).toFixed(1)}
                        </div>

                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
