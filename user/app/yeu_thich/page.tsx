"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { ISanPham } from "@/lib/cautrucdata";
import SanPhamHotSection from "../components/sanphamsection";
import { useYeuThich } from "@/app/context/yeuthichcontext";

type TYeuThichItem = {
  id: number;
  san_pham: ISanPham;
};

export default function YeuThichPage() {
  const [favorites, setFavorites] = useState<ISanPham[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [spHot, setSpHot] = useState<ISanPham[]>([]);

  const { reloadYeuThich } = useYeuThich();

  // ================== LOAD YÊU THÍCH ==================
  const loadFavorites = async () => {
    const res = await fetch("/api/yeu_thich", {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) return setFavorites([]);

    const json: { success: boolean; data: TYeuThichItem[] } =
      await res.json();

    setFavorites(json.data?.map((item) => item.san_pham) || []);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  // ================== LOAD SP HOT ==================
  useEffect(() => {
    const fetchHot = async () => {
      const res = await fetch("/api/trang_chu/sp_hot");
      const data: ISanPham[] = await res.json();
      setSpHot(data);
    };
    fetchHot();
  }, []);

  // ================== XOÁ YÊU THÍCH ==================
  const removeFavorite = async (id_san_pham: number) => {
    await fetch(`/api/yeu_thich?id_san_pham=${id_san_pham}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setFavorites((prev) => prev.filter((sp) => sp.id !== id_san_pham));
    reloadYeuThich();
    setToast("Đã xóa khỏi yêu thích");

    setTimeout(() => setToast(null), 1500);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-[#6A0A0A] text-white px-4 py-2 rounded-xl shadow z-50">
          {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto py-10 space-y-12">
        {/* ================= DANH SÁCH YÊU THÍCH ================= */}
        <section>
          <h1 className="text-3xl font-semibold text-[#6A0A0A] mb-8">
            Danh sách yêu thích
          </h1>

          {favorites.length === 0 ? (
            <p className="text-center text-gray-500">
              Chưa có sản phẩm nào trong danh sách yêu thích.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {favorites.map((sp) => (
                <div
                  key={sp.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden relative group"
                >
                  <div className="relative">
                    <Image
                      src={sp.hinh || "/images/no-image.jpg"}
                      alt={sp.ten}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition"
                    />

                    {/* ❤️ XÓA */}
                    <button
                      onClick={() => removeFavorite(sp.id)}
                      aria-label="Bỏ yêu thích"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition hover:scale-110"
                    >
                      <Heart
                        size={22}
                        className="fill-red-500 text-red-500"
                      />
                    </button>
                  </div>

                  <Link href={`/chi_tiet/${sp.id}`}>
                    <div className="p-4">
                      <h3 className="font-medium hover:text-[#6A0A0A] line-clamp-1">
                        {sp.ten}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {sp.mo_ta}
                      </p>
                    </div>
                  </Link>

                  <div className="flex justify-between items-center px-4 pb-4">
                    <span className="text-[#6A0A0A] font-semibold">
                      {sp.gia_goc.toLocaleString("vi-VN")}₫
                    </span>

                    {sp.so_sao_tb && (
                      <div className="flex items-center text-sm text-yellow-500">
                        <Star className="w-4 h-4 fill-yellow-400 mr-1" />
                        {Number(sp.so_sao_tb).toFixed(1)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ================= SP HOT ================= */}
        {spHot.length > 0 && (
          <section>
            <SanPhamHotSection data={spHot} />
          </section>
        )}
      </div>
    </main>
  );
}
