

"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IBienThe,
  IMonThem,
  ILoaiTuyChon,
  ISanPham,
  ITuyChon,
} from "@/app/lib/cautrucdata";

interface ILoaiTuyChonMoRong extends ILoaiTuyChon {
  tuy_chon?: ITuyChonMoRong[];
}

interface ITuyChonMoRong extends ITuyChon {
  gia_them?: number | null;
}

interface ThemVaoGioHangProps {
  data: {
    san_pham: ISanPham;
    bien_thes?: IBienThe[];
    mon_them?: IMonThem[];
    tuy_chon?: ILoaiTuyChonMoRong[];
  };
  onClose: () => void;
}

export default function ThemVaoGioHang({ data, onClose }: ThemVaoGioHangProps) {
  const { san_pham, bien_thes = [], mon_them = [], tuy_chon = [] } = data || {};

  // States
  const [qty, setQty] = useState(1);
  const [selectedBienThe, setSelectedBienThe] = useState<number | null>(
    bien_thes.length ? bien_thes[0].id ?? null : null
  );

  const [selectedTuyChon, setSelectedTuyChon] = useState<
    Record<number, number | null>
  >(() =>
    tuy_chon.reduce<Record<number, number | null>>((acc, loai) => {
      acc[loai.id!] =
        loai.tuy_chon && loai.tuy_chon.length
          ? loai.tuy_chon[0].id ?? null
          : null;
      return acc;
    }, {})
  );

  const [selectedMonThem, setSelectedMonThem] = useState<number[]>([]);
  const [ghiChu, setGhiChu] = useState("");

  // Toggle món thêm (checkbox)
  const toggleMonThem = (id: number) => {
    setSelectedMonThem((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Tổng phụ phí (biến thể + tùy chọn + món thêm)
  const subtotalPerItem = useMemo(() => {
    let total = 0;

    if (selectedBienThe !== null) {
      const bt = bien_thes.find((b) => b.id === selectedBienThe);
      if (bt?.gia_them) total += bt.gia_them;
    }

    Object.entries(selectedTuyChon).forEach(([loaiId, tuyChonId]) => {
      if (!tuyChonId) return;
      const loai = tuy_chon.find((l) => l.id === Number(loaiId));
      const tc = loai?.tuy_chon?.find((t) => t.id === tuyChonId);
      if (tc?.gia_them) total += tc.gia_them;
    });

    selectedMonThem.forEach((id) => {
      const m = mon_them.find((x) => x.id === id);
      if (m?.gia_them) total += m.gia_them;
    });

    return total;
  }, [selectedBienThe, selectedTuyChon, selectedMonThem, bien_thes, mon_them, tuy_chon]);

  const totalAll =
    (Number(san_pham?.gia_goc || san_pham?.gia_goc || 0) + subtotalPerItem) *
    qty;

  const handleSelectTuyChon = (loaiId: number, tcId: number) => {
    setSelectedTuyChon((prev) => ({ ...prev, [loaiId]: tcId }));
  };

  const handleAddToCart = async () => {
    console.log("🛒 Thêm vào giỏ:", {
      id_san_pham: san_pham?.id,
      id_bien_the: selectedBienThe,
      so_luong: qty,
      json_mon_them: selectedMonThem,
      json_tuy_chon: selectedTuyChon,
      ghi_chu: ghiChu,
      thanh_tien: totalAll,
    });
    onClose();
  };

  const handleBuyNow = async () => {
    console.log("💳 Mua ngay:", {
      san_pham: san_pham?.id,
      qty,
      tong_tien: totalAll,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-start md:items-center justify-center bg-black/40 p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              {san_pham?.hinh ? (
                <Image
                  src={san_pham.hinh}
                  alt={san_pham.ten}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              ) : (
                <div className="bg-gray-100 w-full h-full" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#6A0A0A]">
                  {san_pham?.ten}
                </h3>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Giá</div>
                  <div className="text-lg font-bold text-red-500">
                    {Number(san_pham?.gia_goc || 0).toLocaleString("vi-VN")}đ
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {san_pham?.mo_ta}
              </p>
            </div>

            {/* Qty controls */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center border rounded-full overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3 py-1"
                >
                  −
                </button>
                <div className="px-3 py-1 bg-white">{qty}</div>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-1">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Nội dung chọn */}
          <div className="p-4 space-y-4">
            {/* Biến thể */}
            {bien_thes.length > 0 && (
              <div>
                <h4 className="text-base font-semibold mb-2 border-b pb-2">
                  Độ cay (Chọn 1)
                </h4>
                <div className="space-y-2">
                  {bien_thes.map((b) => {
                    const checked = selectedBienThe === b.id;
                    return (
                      <label
                        key={b.id}
                        className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              checked
                                ? "bg-[#e8594f] border-[#e8594f]"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {checked && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="5" fill="white" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm">{b.ten}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {b.gia_them ? `+${b.gia_them.toLocaleString("vi-VN")}đ` : "0đ"}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          checked={checked}
                          onChange={() => setSelectedBienThe(b.id ?? null)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tùy chọn */}
            {tuy_chon.map((loai) => (
              <div key={loai.id}>
                <h4 className="text-base font-semibold mb-2 border-b pb-2">
                  {loai.ten} (Chọn 1)
                </h4>
                <div className="space-y-2">
                  {loai.tuy_chon?.map((tc) => {
                    const checked = selectedTuyChon[loai.id!] === tc.id;
                    return (
                      <label
                        key={tc.id}
                        className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              checked
                                ? "bg-[#e8594f] border-[#e8594f]"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {checked && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="5" fill="white" />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm">{tc.ten}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {tc.gia_them
                            ? `+${tc.gia_them.toLocaleString("vi-VN")}đ`
                            : "0đ"}
                        </div>
                        <input
                          type="radio"
                          className="hidden"
                          checked={checked}
                          onChange={() => handleSelectTuyChon(loai.id!, tc.id!)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Món thêm */}
            {mon_them.length > 0 && (
              <div>
                <h4 className="text-base font-semibold mb-2 border-b pb-2">Món thêm</h4>
                <div className="space-y-2">
                  {mon_them.map((m) => {
                    const checked = selectedMonThem.includes(m.id!);
                    return (
                      <label
                        key={m.id}
                        className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              checked
                                ? "bg-[#e8594f] border-[#e8594f]"
                                : "bg-white border-gray-300"
                            }`}
                          >
                            {checked && (
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M20 6L9 17l-5-5"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm">{m.ten}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          +{m.gia_them.toLocaleString("vi-VN")}đ
                        </div>
                        <input
                          type="checkbox"
                          className="hidden"
                          checked={checked}
                          onChange={() => toggleMonThem(m.id!)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ghi chú */}
            <div>
              <h4 className="text-base font-semibold mb-2">Ghi chú</h4>
              <textarea
                value={ghiChu}
                onChange={(e) => setGhiChu(e.target.value)}
                placeholder="Ghi chú cho cửa hàng..."
                className="w-full border rounded-md p-2 h-20 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4 bg-white sticky bottom-0 rounded-b-2xl">
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#f3a59a] hover:bg-[#f19b8f] text-white py-3 rounded-full font-medium"
              >
                Thêm vào giỏ hàng
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 ml-3 bg-[#D33C3C] hover:bg-[#b53030] text-white py-3 rounded-full font-medium flex items-center justify-center gap-3"
              >
                Mua hàng
                <span className="ml-2 bg-white/10 px-3 py-1 rounded-full text-sm">
                  -{totalAll.toLocaleString("vi-VN")}đ
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

