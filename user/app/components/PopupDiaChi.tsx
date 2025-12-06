// "use client";

// import { useEffect, useState } from "react";
// import { IDiaChi } from "@/app/lib/cautrucdata";

// interface PopupDiaChiProps {
//   open: boolean;
//   onClose: () => void;
//   onSelect: (diaChi: IDiaChi) => void;
// }

// interface INguoiDungLocal {
//   ho_ten: string;
//   sdt: string;
// }

// export default function PopupDiaChi({ open, onClose, onSelect }: PopupDiaChiProps) {
//   const [dsDiaChi, setDsDiaChi] = useState<IDiaChi[]>([]);
//   const [nguoiDung, setNguoiDung] = useState<INguoiDungLocal | null>(null);
//   const [loading, setLoading] = useState(true);

//   //  Lấy danh sách địa chỉ và người dùng khi mở popup
//   useEffect(() => {
//     if (!open) return;

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const token = localStorage.getItem("token");
//         const userData = localStorage.getItem("nguoi_dung");

//         //  Lấy người dùng từ localStorage
//         if (userData) {
//           const parsed = JSON.parse(userData);
//           setNguoiDung({
//             ho_ten: parsed.ho_ten || "",
//             sdt: parsed.sdt || "",
//           });
//         }

//         //  Lấy danh sách địa chỉ từ API
//         const res = await fetch("/api/dia_chi/tat_ca", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setDsDiaChi(data);
//         } else {
//           setDsDiaChi([]);
//         }
//       } catch (error) {
//         console.error("Lỗi khi tải địa chỉ:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [open]);

//   if (!open) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
//       onClick={onClose} >
//       {/* Popup nội dung */}
//       <div
//         className="bg-white w-[90%] max-w-lg rounded-2xl p-5 shadow-xl relative border border-gray-300/70"
//         onClick={(e) => e.stopPropagation()} >
//         <h2 className="text-lg font-semibold mb-4 text-center">
//           Chọn địa chỉ giao hàng
//         </h2>

//         {/* Trạng thái tải */}
//         {loading ? (
//           <p className="text-gray-500 text-center">Đang tải...</p>
//         ) : dsDiaChi.length === 0 ? (
//           <p className="text-gray-500 text-center">Bạn chưa có địa chỉ nào.</p>
//         ) : (
//           <div className="space-y-3 max-h-[400px] overflow-y-auto ">
//             {dsDiaChi.map((dc) => {
             
//               const hoTenHienThi =
//                 dc.ho_ten?.trim() || nguoiDung?.ho_ten || "Chưa có họ tên";

//               const sdtHienThi =
//                 !dc.sdt ||
//                 dc.sdt === "" ||
//                 dc.sdt === "0" ||
//                 dc.sdt === "0"
//                   ? nguoiDung?.sdt || "Chưa có số"
//                   : String(dc.sdt);

//               return (
//                 <div
//                   key={dc.id}
//                   onClick={() => {
//                     onSelect({
//                       ...dc,
//                       ho_ten: hoTenHienThi,
//                       sdt: sdtHienThi,
//                     });
//                     onClose();
//                   }}
//                   className=" rounded-xl p-3 hover:bg-gray-50 cursor-pointer transition border border-gray-300/100">
//                   {/* Họ tên + SĐT */}
//                   <div className="flex items-center flex-wrap gap-x-2">
//                     <p className="font-medium text-base">{hoTenHienThi}</p>
//                     <span className="text-gray-600 text-sm">| {sdtHienThi}</span>
//                   </div>

//                   {/* Địa chỉ + Mặc định */}
//                   <div className="flex items-center flex-wrap gap-2 mt-1 text-sm text-gray-700">
//                     {dc.mac_dinh && (
//                       <span className="px-2 py-0.5 text-xs bg-[#e8594f] text-white rounded-full">
//                         Mặc định
//                       </span>
//                     )}
//                     <span className="font-medium">{dc.ten_duong},</span>
//                     <span>{dc.phuong},</span>
//                     <span>{dc.tinh}</span>
//                   </div>
//                   <p>Sửa</p>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Nút hành động */}
//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
//             Đóng
//           </button>
//           <button
//             onClick={() =>
//               alert("Chức năng thêm địa chỉ mới (bạn có thể làm form riêng)")
//             }
//             className="px-4 py-2 rounded-lg bg-[#e8594f] text-white font-semibold hover:bg-[#d94b42]" >
//             + Thêm địa chỉ mới
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { IDiaChi } from "@/app/lib/cautrucdata";
import { X } from "lucide-react";

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
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<Partial<IDiaChi>>({});

  // 🔹 Lấy danh sách địa chỉ
  const fetchDiaChi = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/dia_chi", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setDsDiaChi(data);
      }
    } catch (err) {
      console.error("Lỗi tải danh sách:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Khi popup mở
  useEffect(() => {
    if (!open) return;
    const userData = localStorage.getItem("nguoi_dung");
    if (userData) {
      const parsed = JSON.parse(userData);
      setNguoiDung({
        ho_ten: parsed.ho_ten || "",
        sdt: parsed.sdt || "",
      });
    }
    fetchDiaChi();
  }, [open]);

  // 🔹 Thêm hoặc cập nhật địa chỉ
  const handleSave = async () => {
    if (!form.ten_duong || !form.phuong || !form.tinh) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/dia_chi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setFormOpen(false);
        await fetchDiaChi();
      } else alert(data.message || "Lỗi khi lưu");
    } catch (err) {
      console.error(err);
      alert("Lỗi khi lưu địa chỉ");
    }
  };

  // 🔹 Xoá địa chỉ
  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xoá địa chỉ này?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/dia_chi?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        await fetchDiaChi();
      } else alert(data.message || "Lỗi khi xoá");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Chọn địa chỉ
  const handleSelect = (dc: IDiaChi) => {
    onSelect(dc);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* 🧱 POPUP CHÍNH */}
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white w-[95%] max-w-xl rounded-2xl p-5 shadow-xl relative border border-gray-300"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            <X size={22} />
          </button>

          <h2 className="text-xl font-semibold mb-4 text-center">
            Chọn địa chỉ giao hàng
          </h2>

          {/* 🔹 Danh sách địa chỉ */}
          {loading ? (
            <p className="text-center text-gray-500">Đang tải...</p>
          ) : dsDiaChi.length === 0 ? (
            <p className="text-center text-gray-500">Chưa có địa chỉ nào</p>
          ) : (
            <div className="space-y-3 max-h-[450px] overflow-y-auto">
              {dsDiaChi.map((dc) => (
                <div
                  key={dc.id}
                  className={`border rounded-xl p-4 flex justify-between items-start hover:bg-gray-50 transition cursor-pointer ${
                    dc.mac_dinh ? "border-[#e8594f]" : "border-gray-300"
                  }`}
                  onClick={() => handleSelect(dc)}
                >
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-x-2">
                      <p className="font-medium text-base">{dc.ho_ten}</p>
                      <span className="text-gray-600 text-sm">| {dc.sdt}</span>
                    </div>
                    <div className="text-sm text-gray-700 mt-1 flex flex-wrap gap-1">
                      {dc.mac_dinh && (
                        <span className="px-2 py-0.5 text-xs bg-[#e8594f] text-white rounded-full">
                          Mặc định
                        </span>
                      )}
                      <span>{dc.ten_duong},</span>
                      <span>{dc.phuong},</span>
                      <span>{dc.tinh}</span>
                    </div>
                  </div>

                  {/* 🔹 Nút sửa / xóa */}
                  <div
                    className="flex flex-col items-end gap-1 ml-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="text-blue-600 text-sm hover:underline"
                      onClick={() => {
                        setForm(dc);
                        setFormOpen(true);
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      className="text-red-600 text-sm hover:underline"
                      onClick={() => handleDelete(dc.id!)}
                    >
                      Xoá
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 🔹 Nút thêm mới */}
          <div className="flex justify-between mt-5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                setForm({});
                setFormOpen(true);
              }}
              className="px-4 py-2 rounded bg-[#e8594f] text-white hover:bg-[#d94b42]"
            >
              + Thêm địa chỉ mới
            </button>
          </div>
        </div>
      </div>

      {/* 🧱 POPUP FORM (chồng lên) */}
      {formOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60]"
          onClick={() => setFormOpen(false)}
        >
          <div
            className="bg-white w-[90%] max-w-md rounded-2xl p-5 shadow-2xl relative border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFormOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-3 text-center">
              {form.id ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Họ tên"
                className="w-full border p-2 rounded"
                value={form.ho_ten ?? nguoiDung?.ho_ten ?? ""}
                onChange={(e) => setForm({ ...form, ho_ten: e.target.value })}
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="w-full border p-2 rounded"
                value={form.sdt ?? nguoiDung?.sdt ?? ""}
                onChange={(e) => setForm({ ...form, sdt: e.target.value })}
              />
              <input
                type="text"
                placeholder="Số nhà, tên đường"
                className="w-full border p-2 rounded"
                value={form.ten_duong ?? ""}
                onChange={(e) => setForm({ ...form, ten_duong: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phường / Xã"
                className="w-full border p-2 rounded"
                value={form.phuong ?? ""}
                onChange={(e) => setForm({ ...form, phuong: e.target.value })}
              />
              <input
                type="text"
                placeholder="Tỉnh / Thành phố"
                className="w-full border p-2 rounded"
                value={form.tinh ?? ""}
                onChange={(e) => setForm({ ...form, tinh: e.target.value })}
              />

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.mac_dinh ?? false}
                  onChange={(e) => setForm({ ...form, mac_dinh: e.target.checked })}
                />
                Đặt làm địa chỉ mặc định
              </label>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setFormOpen(false)}
                className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Huỷ
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-[#e8594f] text-white hover:bg-[#d94b42]"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
