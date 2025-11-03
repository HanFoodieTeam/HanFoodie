"use client";

import { useEffect, useState } from "react";
import { IDiaChi } from "@/app/lib/cautrucdata";

interface PopupDiaChiProps {
  open: boolean;
  onClose: () => void;
  onSelect: (diaChi: IDiaChi) => void;
}

interface INguoiDungLocal {
  ho_ten: string;
  sdt: string;
}

export default function PopupDiaChi({ open, onClose, onSelect }: PopupDiaChiProps) {
  const [dsDiaChi, setDsDiaChi] = useState<IDiaChi[]>([]);
  const [nguoiDung, setNguoiDung] = useState<INguoiDungLocal | null>(null);
  const [loading, setLoading] = useState(true);

  //  Lấy danh sách địa chỉ và người dùng khi mở popup
  useEffect(() => {
    if (!open) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("nguoi_dung");

        //  Lấy người dùng từ localStorage
        if (userData) {
          const parsed = JSON.parse(userData);
          setNguoiDung({
            ho_ten: parsed.ho_ten || "",
            sdt: parsed.sdt || "",
          });
        }

        //  Lấy danh sách địa chỉ từ API
        const res = await fetch("/api/dia_chi/tat_ca", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setDsDiaChi(data);
        } else {
          setDsDiaChi([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải địa chỉ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose} >
      {/* Popup nội dung */}
      <div
        className="bg-white w-[90%] max-w-lg rounded-2xl p-5 shadow-xl relative border border-gray-300/70"
        onClick={(e) => e.stopPropagation()} >
        <h2 className="text-lg font-semibold mb-4 text-center">
          Chọn địa chỉ giao hàng
        </h2>

        {/* Trạng thái tải */}
        {loading ? (
          <p className="text-gray-500 text-center">Đang tải...</p>
        ) : dsDiaChi.length === 0 ? (
          <p className="text-gray-500 text-center">Bạn chưa có địa chỉ nào.</p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto ">
            {dsDiaChi.map((dc) => {
             
              const hoTenHienThi =
                dc.ho_ten?.trim() || nguoiDung?.ho_ten || "Chưa có họ tên";

              const sdtHienThi =
                !dc.sdt ||
                dc.sdt === "" ||
                dc.sdt === "0" ||
                dc.sdt === "0"
                  ? nguoiDung?.sdt || "Chưa có số"
                  : String(dc.sdt);

              return (
                <div
                  key={dc.id}
                  onClick={() => {
                    onSelect({
                      ...dc,
                      ho_ten: hoTenHienThi,
                      sdt: sdtHienThi,
                    });
                    onClose();
                  }}
                  className=" rounded-xl p-3 hover:bg-gray-50 cursor-pointer transition border border-gray-300/100">
                  {/* Họ tên + SĐT */}
                  <div className="flex items-center flex-wrap gap-x-2">
                    <p className="font-medium text-base">{hoTenHienThi}</p>
                    <span className="text-gray-600 text-sm">| {sdtHienThi}</span>
                  </div>

                  {/* Địa chỉ + Mặc định */}
                  <div className="flex items-center flex-wrap gap-2 mt-1 text-sm text-gray-700">
                    {dc.mac_dinh && (
                      <span className="px-2 py-0.5 text-xs bg-[#e8594f] text-white rounded-full">
                        Mặc định
                      </span>
                    )}
                    <span className="font-medium">{dc.ten_duong},</span>
                    <span>{dc.phuong},</span>
                    <span>{dc.tinh}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Nút hành động */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
            Đóng
          </button>
          <button
            onClick={() =>
              alert("Chức năng thêm địa chỉ mới (bạn có thể làm form riêng)")
            }
            className="px-4 py-2 rounded-lg bg-[#e8594f] text-white font-semibold hover:bg-[#d94b42]" >
            + Thêm địa chỉ mới
          </button>
        </div>
      </div>
    </div>
  );
}
