"use client";

import { useEffect, useState } from "react";
import { IDiaChi } from "@/app/lib/cautrucdata";

interface PopupDiaChiProps {
  open: boolean;
  onClose: () => void;
  onSelect: (diaChi: IDiaChi) => void;
}

export default function PopupDiaChi({ open, onClose, onSelect }: PopupDiaChiProps) {
  const [dsDiaChi, setDsDiaChi] = useState<IDiaChi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/dia_chi/tat_ca", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setDsDiaChi(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-lg rounded-2xl p-5 shadow-xl relative">
        <h2 className="text-lg font-semibold mb-4 text-center">Chọn địa chỉ giao hàng</h2>

        {loading ? (
          <p className="text-gray-500 text-center">Đang tải...</p>
        ) : dsDiaChi.length === 0 ? (
          <p className="text-gray-500 text-center">Bạn chưa có địa chỉ nào.</p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {dsDiaChi.map((dc) => (
              <div
                key={dc.id}
                onClick={() => {
                  onSelect(dc);
                  onClose();
                }}
                className="border rounded-xl p-3 hover:bg-gray-50 cursor-pointer transition"
              >
                <p className="font-medium">{dc.ten_duong}</p>
                <p className="text-sm text-gray-600">{dc.phuong}, {dc.tinh}</p>
                {dc.mac_dinh && (
                  <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-[#e8594f] text-white rounded-full">
                    Mặc định
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Đóng
          </button>
          <button
            onClick={() => alert("Chức năng thêm địa chỉ mới (bạn có thể làm form riêng)")}
            className="px-4 py-2 rounded-lg bg-[#e8594f] text-white font-semibold hover:bg-[#d94b42]"
          >
            + Thêm địa chỉ mới
          </button>
        </div>
      </div>
    </div>
  );
}
