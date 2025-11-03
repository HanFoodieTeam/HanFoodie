"use client";

import { X, Tag, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { IMaGiamGia } from "@/app/lib/cautrucdata";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (ma: IMaGiamGia) => void;
  tongTien: number;
}

export default function PopupMaGiamGia({ open, onClose, onSelect, tongTien }: Props) {
  const [danhSach, setDanhSach] = useState<IMaGiamGia[]>([]);
  const [loading, setLoading] = useState(true);
  const [chon, setChon] = useState<number | null>(null);

  //  Lấy danh sách mã giảm giá từ API
  useEffect(() => {
    if (!open) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/ma_giam_gia");
        const data = await res.json();
        setDanhSach(data);
      } catch (err) {
        console.error("Lỗi khi tải mã giảm giá:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [open]);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4 sticky top-0 bg-white z-10">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Tag className="text-[#e8594f]" size={20} /> Mã Giảm Giá
            </h2>
            <button onClick={onClose}>
              <X className="text-gray-600 hover:text-black" size={20} />
            </button>
          </div>

          {/* Nội dung */}
          <div className="p-4 space-y-3">
            {loading ? (
              <p className="text-gray-500 text-center">Đang tải mã giảm giá...</p>
            ) : danhSach.length === 0 ? (
              <p className="text-gray-500 text-center">
                Hiện không có mã giảm giá nào đang hoạt động.
              </p>
            ) : (
              danhSach.map((item) => {
                const hopLe = tongTien >= item.gia_tri_toi_thieu; 

                return (
                  <div key={item.id}
                    className={`flex items-center gap-4 border rounded-xl p-3 shadow-sm transition
                      ${chon === item.id ? "border-[#e8594f] bg-[#fff5f4]" : "border-gray-200"}
                      ${!hopLe ? "opacity-50 cursor-not-allowed select-none" : "hover:shadow-md cursor-pointer"}
                    `}
                      onClick={() => {
                        if (!hopLe) return; //  Không cho chọn nếu chưa đủ điều kiện
                        setChon(item.id);
                      }}>
                    <div className="flex-shrink-0 bg-[#e8594f] text-white w-12 h-12 flex items-center justify-center rounded-lg">
                      <Tag size={20} />
                    </div>

                    {/* Thông tin mã */}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{item.ten}</p>

                      <p className="text-sm text-gray-600 mt-1">
                        {item.loai_giam_gia
                          ? `Giảm ${item.gia_tri_giam}%${item.gia_tri_giam_toi_da
                            ? ` (tối đa ${Number(item.gia_tri_giam_toi_da).toLocaleString("vi-VN")}đ)`
                            : ""
                          }`
                          : `Giảm ${Number(item.gia_tri_giam).toLocaleString("vi-VN")}đ`}
                      </p>


                      <p className="text-xs text-gray-500 mt-1">
                        Đơn tối thiểu{" "}
                        {item.gia_tri_toi_thieu.toLocaleString("vi-VN")}đ • HSD:{" "}
                        {new Date(item.ket_thuc).toLocaleDateString("vi-VN")}
                      </p>

                      {/*  Thông báo nếu không đủ điều kiện */}
                      {!hopLe && (
                        <p className="text-sm font-semibold text-red-600 mt-1 flex items-center gap-1">
                          <AlertTriangle size={14} className="text-red-600" />
                          <span>
                            Đơn hàng chưa đạt tối thiểu{" "}
                            <span className="underline">
                              {item.gia_tri_toi_thieu.toLocaleString("vi-VN")}đ
                            </span>
                          </span>
                        </p>
                      )}
                    </div>

                    {chon === item.id && hopLe && (
                      <CheckCircle2 className="text-[#e8594f]" size={20} />
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="border-t bg-white sticky bottom-0 p-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100">
              Trở lại
            </button>
            <button
              onClick={() => {
                const ma = danhSach.find((x) => x.id === chon);
                if (ma) onSelect(ma);
                onClose();
              }}
              disabled={chon === null}
              className={`px-5 py-2 rounded-md font-semibold ${chon === null
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-[#e8594f] text-white hover:bg-[#d94b42]"
                }`}>
              Áp dụng
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
