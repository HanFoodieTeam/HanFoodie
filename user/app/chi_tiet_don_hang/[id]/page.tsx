// // // // // // 'use client';

// // // // // // import { useEffect, useState } from 'react';
// // // // // // import { useParams } from 'next/navigation';
// // // // // // import toast from 'react-hot-toast';
// // // // // // import { Star, CheckCircle, Truck, Package, Home } from 'lucide-react';
// // // // // // import UserLayout from '@/app/components/UserLayout';
// // // // // // import { useUser } from '@/app/hooks/useUser';
// // // // // // import { IDonHang, IChiTietDonHang, TrangThaiDonHang } from '@/app/lib/cautrucdata';

// // // // // // interface IChiTietDonHangMoRong extends IChiTietDonHang {
// // // // // //   bien_the?: {
// // // // // //     id: number;
// // // // // //     ten: string;
// // // // // //     san_pham?: {
// // // // // //       id: number;
// // // // // //       ten: string;
// // // // // //       hinh: string;
// // // // // //       gia_goc: number;
// // // // // //     };
// // // // // //   };
// // // // // // }

// // // // // // export default function ChiTietDonHangPage() {
// // // // // //   const { id } = useParams();
// // // // // //   const user = useUser();
// // // // // //   const [donHang, setDonHang] = useState<IDonHang | null>(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [danhGia, setDanhGia] = useState({ sao: 5, noi_dung: '' });

// // // // // //   useEffect(() => {
// // // // // //     if (!user) return;
// // // // // //     const token = localStorage.getItem('token');
// // // // // //     if (!token) return;

// // // // // //     async function fetchChiTiet() {
// // // // // //       try {
// // // // // //         const res = await fetch(`/api/chi_tiet_don_hang/${id}`, {
// // // // // //           headers: { Authorization: `Bearer ${token}` },
// // // // // //         });
// // // // // //         const data = await res.json();

// // // // // //         if (res.ok) {
// // // // // //           setDonHang(data);
// // // // // //         } else toast.error(data.thong_bao || 'Không tải được đơn hàng');
// // // // // //       } catch {
// // // // // //         toast.error('Lỗi khi tải đơn hàng');
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     }

// // // // // //     fetchChiTiet();
// // // // // //   }, [id, user]);

// // // // // //   if (loading)
// // // // // //     return <p className="p-8 text-center text-gray-600">Đang tải chi tiết đơn hàng...</p>;

// // // // // //   if (!donHang)
// // // // // //     return <p className="p-8 text-center text-gray-600">Không tìm thấy đơn hàng</p>;

// // // // // //   const chiTiet = (donHang as unknown as { chiTiet: IChiTietDonHangMoRong[] }).chiTiet ?? [];

// // // // // //   const tienHang = donHang.tong_tien_hang.toLocaleString('vi-VN');
// // // // // //   const giamGia = donHang.so_tien_giam.toLocaleString('vi-VN');
// // // // // //   const tongThanhToan = donHang.so_tien_thanh_toan.toLocaleString('vi-VN');

// // // // // //   // Trạng thái timeline
// // // // // // type TrangThaiTimeline =
// // // // // //   | 'cho_xac_nhan'
// // // // // //   | 'da_xac_nhan'
// // // // // //   | 'dang_xu_ly'
// // // // // //   | 'da_giao_van_chuyen'
// // // // // //   | 'dang_giao'
// // // // // //   | 'da_giao'
// // // // // //   | 'da_huy';

// // // // // // const trangThaiSteps: { label: string; key: TrangThaiTimeline }[] = [
// // // // // //   { label: 'Đơn hàng chờ xác nhận', key: 'cho_xac_nhan' },
// // // // // //   { label: 'Đơn hàng đã xác nhận', key: 'da_xac_nhan' },
// // // // // //   { label: 'Người gửi đang xử lý đơn hàng', key: 'dang_xu_ly' },
// // // // // //   { label: 'Đã giao cho đơn vị vận chuyển', key: 'da_giao_van_chuyen' },
// // // // // //   { label: 'Đang giao tới bạn', key: 'dang_giao' },
// // // // // //   { label: 'Đơn hàng đã hoàn thành', key: 'da_giao' },
// // // // // //   { label: 'Đơn hàng đã hủy', key: 'da_huy' },
// // // // // // ];


// // // // // //   const currentStep = trangThaiSteps.findIndex((s) => s.key === donHang.trang_thai);

// // // // // //   async function handleGuiDanhGia() {
// // // // // //     const token = localStorage.getItem('token');
// // // // // //     if (!token || !user) return;

// // // // // //     const res = await fetch('/api/danh_gia', {
// // // // // //       method: 'POST',
// // // // // //       headers: {
// // // // // //         'Content-Type': 'application/json',
// // // // // //         Authorization: `Bearer ${token}`,
// // // // // //       },
// // // // // //       body: JSON.stringify({
// // // // // //         id_nguoi_dung: user.id,
// // // // // //         id_bien_the: chiTiet[0]?.bien_the?.id,
// // // // // //         sao: danhGia.sao,
// // // // // //         noi_dung: danhGia.noi_dung,
// // // // // //       }),
// // // // // //     });

// // // // // //     if (res.ok) {
// // // // // //       toast.success('Cảm ơn bạn đã đánh giá!');
// // // // // //       setDanhGia({ sao: 5, noi_dung: '' });
// // // // // //     } else {
// // // // // //       toast.error('Không thể gửi đánh giá');
// // // // // //     }
// // // // // //   }

// // // // // //   return (
// // // // // //     <UserLayout user={user!}>
// // // // // //       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // // // // //         {/* Tiêu đề */}
// // // // // //         <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">
// // // // // //           Chi tiết đơn hàng #{donHang.ma_don}
// // // // // //         </h2>

// // // // // //         {/* Thông tin người nhận */}
// // // // // //         <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
// // // // // //           <p><strong>Ngày đặt:</strong> {new Date(donHang.ngay_tao).toLocaleString('vi-VN')}</p>
// // // // // //           <p><strong>Trạng thái:</strong> {donHang.trang_thai}</p>
// // // // // //           <p><strong>Người nhận:</strong> {donHang.ho_ten_nguoi_nhan}</p>
// // // // // //           <p><strong>Điện thoại:</strong> {donHang.sdt_nguoi_nhan}</p>
// // // // // //           <p className="col-span-2"><strong>Địa chỉ:</strong> {donHang.dia_chi_nguoi_nhan}</p>
// // // // // //           {donHang.ghi_chu && (
// // // // // //             <p className="col-span-2"><strong>Ghi chú:</strong> {donHang.ghi_chu}</p>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         {/* Danh sách sản phẩm */}
// // // // // //         <div className="border-t pt-4">
// // // // // //           {chiTiet.map((sp) => (
// // // // // //             <div key={sp.id} className="flex items-center gap-4 border-b pb-3 mb-3">
// // // // // //               <img
// // // // // //                 src={sp.bien_the?.san_pham?.hinh || '/noimg.png'}
// // // // // //                 alt={sp.bien_the?.san_pham?.ten || ''}
// // // // // //                 className="w-20 h-20 object-cover rounded-lg"
// // // // // //               />
// // // // // //               <div className="flex-1">
// // // // // //                 <p className="font-medium">{sp.bien_the?.san_pham?.ten}</p>
// // // // // //                 {sp.bien_the?.ten && (
// // // // // //                   <p className="text-sm text-gray-500">Biến thể: {sp.bien_the.ten}</p>
// // // // // //                 )}
// // // // // //                 <p className="text-sm text-gray-500">Số lượng: {sp.so_luong}</p>
// // // // // //               </div>
// // // // // //               <p className="text-[#D33C3C] font-semibold">
// // // // // //                 {sp.thanh_tien.toLocaleString('vi-VN')}₫
// // // // // //               </p>
// // // // // //             </div>
// // // // // //           ))}
// // // // // //         </div>

// // // // // //         {/* Tổng tiền */}
// // // // // //         <div className="text-right mt-4 border-t pt-3">
// // // // // //           <p>Tổng tiền hàng: {tienHang}₫</p>
// // // // // //           <p>Giảm giá: -{giamGia}₫</p>
// // // // // //           <p className="text-lg font-semibold text-[#D33C3C]">
// // // // // //             Tổng thanh toán: {tongThanhToan}₫
// // // // // //           </p>
// // // // // //         </div>

// // // // // //         {/* Timeline trạng thái */}
// // // // // //         <div className="mt-8 border-t pt-5">
// // // // // //           <h3 className="font-semibold text-lg mb-3 text-[#6A0A0A]">Trạng thái đơn hàng</h3>
// // // // // //           <div className="relative pl-6">
// // // // // //             {trangThaiSteps.map((step, index) => (
// // // // // //               <div key={step.key} className="flex items-start gap-3 mb-3">
// // // // // //                 <div>
// // // // // //                   {index <= currentStep ? (
// // // // // //                     <CheckCircle className="text-green-500" size={20} />
// // // // // //                   ) : (
// // // // // //                     <Package className="text-gray-300" size={20} />
// // // // // //                   )}
// // // // // //                 </div>
// // // // // //                 <p className={index <= currentStep ? 'text-green-600' : 'text-gray-400'}>
// // // // // //                   {step.label}
// // // // // //                 </p>
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Đánh giá */}
// // // // // //         {donHang.trang_thai === 'da_giao' && (
// // // // // //           <div className="mt-8 border-t pt-5">
// // // // // //             <h3 className="font-semibold text-lg mb-3 text-[#6A0A0A]">Đánh giá đơn hàng</h3>
// // // // // //             <div className="flex gap-2 mb-3">
// // // // // //               {[1, 2, 3, 4, 5].map((s) => (
// // // // // //                 <Star
// // // // // //                   key={s}
// // // // // //                   size={24}
// // // // // //                   onClick={() => setDanhGia({ ...danhGia, sao: s })}
// // // // // //                   className={`cursor-pointer ${
// // // // // //                     danhGia.sao >= s ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-300'
// // // // // //                   }`}
// // // // // //                 />
// // // // // //               ))}
// // // // // //             </div>
// // // // // //             <textarea
// // // // // //               value={danhGia.noi_dung}
// // // // // //               onChange={(e) => setDanhGia({ ...danhGia, noi_dung: e.target.value })}
// // // // // //               className="w-full border rounded-lg p-2 h-24 text-sm"
// // // // // //               placeholder="Hãy chia sẻ cảm nhận của bạn..."
// // // // // //             />
// // // // // //             <div className="text-right mt-3">
// // // // // //               <button
// // // // // //                 onClick={handleGuiDanhGia}
// // // // // //                 className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg hover:bg-[#b22f2f]"
// // // // // //               >
// // // // // //                 Gửi đánh giá
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </UserLayout>
// // // // // //   );
// // // // // // }
// // // // // 'use client';

// // // // // import { useEffect, useState } from 'react';
// // // // // import { useParams } from 'next/navigation';
// // // // // import toast from 'react-hot-toast';
// // // // // import { CheckCircle, Package } from 'lucide-react';
// // // // // import UserLayout from '@/app/components/UserLayout';
// // // // // import { useUser } from '@/app/hooks/useUser';
// // // // // import { IDonHang, IChiTietDonHang } from '@/app/lib/cautrucdata';

// // // // // interface IChiTietDonHangMoRong extends Omit<IChiTietDonHang, 'json_tuy_chon' | 'json_mon_them'> {
// // // // //   bien_the?: {
// // // // //     id: number;
// // // // //     ten: string;
// // // // //     gia_them?: number;
// // // // //     san_pham?: {
// // // // //       id: number;
// // // // //       ten: string;
// // // // //       hinh?: string;
// // // // //       gia_goc?: number;
// // // // //     };
// // // // //   };
// // // // //   json_tuy_chon?: Record<string, string>;
// // // // //   json_mon_them?: { ten: string; gia: number }[];
// // // // // }


// // // // // export default function ChiTietDonHangPage() {
// // // // //   const { id } = useParams();
// // // // //   const user = useUser();
// // // // //   const [donHang, setDonHang] = useState<IDonHang | null>(null);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     if (!user) return;
// // // // //     const token = localStorage.getItem('token');
// // // // //     if (!token) return;

// // // // //     async function fetchChiTiet() {
// // // // //       try {
// // // // //         const res = await fetch(`/api/chi_tiet_don_hang/${id}`, {
// // // // //           headers: { Authorization: `Bearer ${token}` },
// // // // //         });
// // // // //         const data = await res.json();

// // // // //         if (res.ok) setDonHang(data);
// // // // //         else toast.error(data.thong_bao || 'Không tải được đơn hàng');
// // // // //       } catch {
// // // // //         toast.error('Lỗi khi tải đơn hàng');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     }

// // // // //     fetchChiTiet();
// // // // //   }, [id, user]);

// // // // //   if (loading) return <p className="p-8 text-center text-gray-600">Đang tải chi tiết đơn hàng...</p>;
// // // // //   if (!donHang) return <p className="p-8 text-center text-gray-600">Không tìm thấy đơn hàng</p>;

// // // // //   const chiTiet = (donHang as unknown as { chi_tiet_don_hang: IChiTietDonHangMoRong[] })
// // // // //     .chi_tiet_don_hang ?? [];

// // // // //   const trangThaiSteps = [
// // // // //     { label: 'Đơn hàng chờ xác nhận', key: 'cho_xac_nhan' },
// // // // //     { label: 'Đơn hàng đã xác nhận', key: 'da_xac_nhan' },
// // // // //     { label: 'Người gửi đang xử lý đơn hàng', key: 'dang_xu_ly' },
// // // // //     { label: 'Đã giao cho đơn vị vận chuyển', key: 'da_giao_van_chuyen' },
// // // // //     { label: 'Đang giao tới bạn', key: 'dang_giao' },
// // // // //     { label: 'Đơn hàng đã hoàn thành', key: 'da_giao' },
// // // // //     { label: 'Đơn hàng đã hủy', key: 'da_huy' },
// // // // //   ] as const;

// // // // //   const currentStep = trangThaiSteps.findIndex((s) => s.key === donHang.trang_thai);

// // // // //   return (
// // // // //     <UserLayout user={user!}>
// // // // //       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // // // //         <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">
// // // // //           Chi tiết đơn hàng #{donHang.ma_don}
// // // // //         </h2>

// // // // //         {/* Thông tin người nhận */}
// // // // //         <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
// // // // //           <p><strong>Ngày đặt:</strong> {new Date(donHang.ngay_tao).toLocaleString('vi-VN')}</p>
// // // // //           <p><strong>Trạng thái:</strong> {donHang.trang_thai}</p>
// // // // //           <p><strong>Người nhận:</strong> {donHang.ho_ten_nguoi_nhan}</p>
// // // // //           <p><strong>Điện thoại:</strong> {donHang.sdt_nguoi_nhan}</p>
// // // // //           <p className="col-span-2"><strong>Địa chỉ:</strong> {donHang.dia_chi_nguoi_nhan}</p>
// // // // //           {donHang.ghi_chu && (
// // // // //             <p className="col-span-2"><strong>Ghi chú:</strong> {donHang.ghi_chu}</p>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Danh sách sản phẩm */}
// // // // //         <div className="border-t pt-4">
// // // // //           {chiTiet.map((sp) => {
// // // // //             const giaGoc = sp.bien_the?.san_pham?.gia_goc ?? 0;
// // // // //             const giaBienThe = sp.bien_the?.gia_them ?? 0;
// // // // //             const tongMonThem = sp.json_mon_them?.reduce((t, m) => t + (m.gia || 0), 0) ?? 0;
// // // // //             const donGia = giaGoc + giaBienThe + tongMonThem;
// // // // //             const thanhTien = donGia * sp.so_luong;

// // // // //             return (
// // // // //               <div key={sp.id} className="flex items-start gap-4 border-b pb-3 mb-3">
// // // // //                 <img
// // // // //                   src={sp.bien_the?.san_pham?.hinh || '/noimg.png'}
// // // // //                   alt={sp.bien_the?.san_pham?.ten || ''}
// // // // //                   className="w-20 h-20 object-cover rounded-lg"
// // // // //                 />
// // // // //                 <div className="flex-1">
// // // // //                   <p className="font-medium">{sp.bien_the?.san_pham?.ten}</p>

// // // // //                   {sp.bien_the?.ten && (
// // // // //                     <p className="text-sm text-gray-500">
// // // // //                       Biến thể: {sp.bien_the.ten} (+{giaBienThe.toLocaleString('vi-VN')}₫)
// // // // //                     </p>
// // // // //                   )}

// // // // //                   {sp.json_tuy_chon && Object.keys(sp.json_tuy_chon).length > 0 && (
// // // // //                     <p className="text-sm text-gray-500">
// // // // //                       Tuỳ chọn:{" "}
// // // // //                       {Object.entries(sp.json_tuy_chon)
// // // // //                         .map(([k, v]) => `${k}: ${v}`)
// // // // //                         .join(', ')}
// // // // //                     </p>
// // // // //                   )}

// // // // //                   {sp.json_mon_them && sp.json_mon_them.length > 0 && (
// // // // //                     <p className="text-sm text-gray-500">
// // // // //                       Món thêm:{" "}
// // // // //                       {sp.json_mon_them
// // // // //                         .map((m) => `${m.ten} (+${m.gia.toLocaleString('vi-VN')}₫)`)
// // // // //                         .join(', ')}
// // // // //                     </p>
// // // // //                   )}

// // // // //                   <p className="text-sm text-gray-500">Số lượng: {sp.so_luong}</p>
// // // // //                 </div>

// // // // //                 <div className="text-right">
// // // // //                   <p className="text-sm text-gray-600">
// // // // //                     Đơn giá: {donGia.toLocaleString('vi-VN')}₫
// // // // //                   </p>
// // // // //                   <p className="text-[#D33C3C] font-semibold">
// // // // //                     Thành tiền: {thanhTien.toLocaleString('vi-VN')}₫
// // // // //                   </p>
// // // // //                 </div>
// // // // //               </div>
// // // // //             );
// // // // //           })}
// // // // //         </div>

// // // // //         {/* Tổng tiền */}
// // // // //         <div className="text-right mt-4 border-t pt-3">
// // // // //           <p>Tổng tiền hàng: {donHang.tong_tien_hang.toLocaleString('vi-VN')}₫</p>
// // // // //           <p>Giảm giá: -{donHang.so_tien_giam.toLocaleString('vi-VN')}₫</p>
// // // // //           <p className="text-lg font-semibold text-[#D33C3C]">
// // // // //             Tổng thanh toán: {donHang.so_tien_thanh_toan.toLocaleString('vi-VN')}₫
// // // // //           </p>
// // // // //         </div>

// // // // //         {/* Timeline trạng thái */}
// // // // //         <div className="mt-8 border-t pt-5">
// // // // //           <h3 className="font-semibold text-lg mb-3 text-[#6A0A0A]">Trạng thái đơn hàng</h3>
// // // // //           <div className="relative pl-6">
// // // // //             {trangThaiSteps.map((step, index) => (
// // // // //               <div key={step.key} className="flex items-start gap-3 mb-3">
// // // // //                 {index <= currentStep ? (
// // // // //                   <CheckCircle className="text-green-500" size={20} />
// // // // //                 ) : (
// // // // //                   <Package className="text-gray-300" size={20} />
// // // // //                 )}
// // // // //                 <p className={index <= currentStep ? 'text-green-600' : 'text-gray-400'}>
// // // // //                   {step.label}
// // // // //                 </p>
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </UserLayout>
// // // // //   );
// // // // // }
// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useParams } from 'next/navigation';
// // // import toast from 'react-hot-toast';
// // // import { CheckCircle, Package } from 'lucide-react';
// // // import UserLayout from '@/app/components/UserLayout';
// // // import { useUser } from '@/app/hooks/useUser';
// // // import { IDonHang, IChiTietDonHang } from '@/app/lib/cautrucdata';

// // // interface IChiTietDonHangMoRong
// // //   extends Omit<IChiTietDonHang, 'json_tuy_chon' | 'json_mon_them'> {
// // //   bien_the?: {
// // //     id: number;
// // //     ten: string;
// // //     gia_them?: number;
// // //     san_pham?: {
// // //       id: number;
// // //       ten: string;
// // //       hinh?: string;
// // //       gia_goc?: number;
// // //     };
// // //   };
// // //   json_tuy_chon?: Record<string, string>;
// // //   json_mon_them?: { ten: string; gia: number }[] | string;
// // // }

// // // export default function ChiTietDonHangPage() {
// // //   const { id } = useParams();
// // //   const user = useUser();
// // //   const [donHang, setDonHang] = useState<IDonHang | null>(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     if (!user) return;
// // //     const token = localStorage.getItem('token');
// // //     if (!token) return;

// // //     async function fetchChiTiet() {
// // //       try {
// // //         const res = await fetch(`/api/chi_tiet_don_hang/${id}`, {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });
// // //         const data = await res.json();

// // //         if (res.ok) setDonHang(data);
// // //         else toast.error(data.thong_bao || 'Không tải được đơn hàng');
// // //       } catch {
// // //         toast.error('Lỗi khi tải đơn hàng');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     }

// // //     fetchChiTiet();
// // //   }, [id, user]);

// // //   if (loading)
// // //     return <p className="p-8 text-center text-gray-600">Đang tải chi tiết đơn hàng...</p>;
// // //   if (!donHang)
// // //     return <p className="p-8 text-center text-gray-600">Không tìm thấy đơn hàng</p>;

// // //   const chiTiet = (donHang as unknown as { chi_tiet_don_hang: IChiTietDonHangMoRong[] })
// // //     .chi_tiet_don_hang ?? [];

// // //   // 🔹 5 trạng thái chuẩn
// // //   const trangThaiSteps = [
// // //     { label: 'Đơn hàng chờ xác nhận', key: 'cho_xac_nhan' },
// // //     { label: 'Đơn hàng đã xác nhận', key: 'da_xac_nhan' },
// // //     { label: 'Đơn hàng đang giao', key: 'dang_giao' },
// // //     { label: 'Đơn hàng đã giao', key: 'da_giao' },
// // //     { label: 'Đơn hàng đã hủy', key: 'da_huy' },
// // //   ] as const;

// // //   const currentStep = Math.max(
// // //     0,
// // //     trangThaiSteps.findIndex((s) => s.key === donHang.trang_thai)
// // //   );

// // //   // 🔹 Gán nhãn trạng thái đẹp
// // //   const nhanTrangThai = {
// // //     cho_xac_nhan: { text: '🕓 Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700' },
// // //     da_xac_nhan: { text: '✅ Đã xác nhận', color: 'bg-green-100 text-green-700' },
// // //     dang_giao: { text: '🚚 Đang giao hàng', color: 'bg-blue-100 text-blue-700' },
// // //     da_giao: { text: '🎉 Đã giao thành công', color: 'bg-green-100 text-green-700' },
// // //     da_huy: { text: '❌ Đơn hàng đã hủy', color: 'bg-red-100 text-red-700' },
// // //   } as const;

// // //   const trangThaiHienTai = nhanTrangThai[donHang.trang_thai as keyof typeof nhanTrangThai];

// // //   return (
// // //     <UserLayout user={user!}>
// // //       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // //         <div className="flex items-center justify-between mb-4">
// // //           <h2 className="text-2xl font-bold text-[#6A0A0A]">
// // //             Chi tiết đơn hàng #{donHang.ma_don}
// // //           </h2>
// // //           {trangThaiHienTai && (
// // //             <span
// // //               className={`px-3 py-1 text-sm font-medium rounded-full ${trangThaiHienTai.color}`}
// // //             >
// // //               {trangThaiHienTai.text}
// // //             </span>
// // //           )}
// // //         </div>

// // //         {/* Thông tin người nhận */}
// // //         <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
// // //           <p>
// // //             <strong>Ngày đặt:</strong> {new Date(donHang.ngay_tao).toLocaleString('vi-VN')}
// // //           </p>
// // //           <p>
// // //             <strong>Trạng thái:</strong> {donHang.trang_thai}
// // //           </p>
// // //           <p>
// // //             <strong>Người nhận:</strong> {donHang.ho_ten_nguoi_nhan}
// // //           </p>
// // //           <p>
// // //             <strong>Điện thoại:</strong> {donHang.sdt_nguoi_nhan}
// // //           </p>
// // //           <p className="col-span-2">
// // //             <strong>Địa chỉ:</strong> {donHang.dia_chi_nguoi_nhan}
// // //           </p>
// // //           {donHang.ghi_chu && (
// // //             <p className="col-span-2">
// // //               <strong>Ghi chú:</strong> {donHang.ghi_chu}
// // //             </p>
// // //           )}
// // //         </div>

// // //         {/* Danh sách sản phẩm */}
// // //         <div className="border-t pt-4">
// // //           {chiTiet.map((sp) => {
// // //             const giaGoc = sp.bien_the?.san_pham?.gia_goc ?? 0;
// // //             const giaBienThe = sp.bien_the?.gia_them ?? 0;

// // //             // ✅ FIX: đảm bảo luôn là mảng, tránh lỗi reduce và không any
// // //             const monThemArray: { ten: string; gia: number }[] = Array.isArray(sp.json_mon_them)
// // //               ? (sp.json_mon_them as { ten: string; gia: number }[])
// // //               : typeof sp.json_mon_them === 'string'
// // //               ? JSON.parse(sp.json_mon_them || '[]')
// // //               : [];

// // //             const tongMonThem = monThemArray.reduce(
// // //               (t: number, m: { ten: string; gia: number }) => t + (m.gia || 0),
// // //               0
// // //             );

// // //             const donGia = giaGoc + giaBienThe + tongMonThem;
// // //             const thanhTien = donGia * sp.so_luong;

// // //             return (
// // //               <div key={sp.id} className="flex items-start gap-4 border-b pb-3 mb-3">
// // //                 <img
// // //                   src={sp.bien_the?.san_pham?.hinh || '/noimg.png'}
// // //                   alt={sp.bien_the?.san_pham?.ten || ''}
// // //                   className="w-20 h-20 object-cover rounded-lg"
// // //                 />
// // //                 <div className="flex-1">
// // //                   <p className="font-medium">{sp.bien_the?.san_pham?.ten}</p>

// // //                   {sp.bien_the?.ten && (
// // //                     <p className="text-sm text-gray-500">
// // //                       Biến thể: {sp.bien_the.ten} (+{giaBienThe.toLocaleString('vi-VN')}₫)
// // //                     </p>
// // //                   )}

// // //                   {sp.json_tuy_chon && Object.keys(sp.json_tuy_chon).length > 0 && (
// // //                     <p className="text-sm text-gray-500">
// // //                       Tuỳ chọn:{' '}
// // //                       {Object.entries(sp.json_tuy_chon)
// // //                         .map(([k, v]) => `${k}: ${v}`)
// // //                         .join(', ')}
// // //                     </p>
// // //                   )}

// // //                   {monThemArray.length > 0 && (
// // //                     <p className="text-sm text-gray-500">
// // //                       Món thêm:{' '}
// // //                       {monThemArray
// // //                         .map((m) => `${m.ten} (+${m.gia.toLocaleString('vi-VN')}₫)`)
// // //                         .join(', ')}
// // //                     </p>
// // //                   )}

// // //                   <p className="text-sm text-gray-500">Số lượng: {sp.so_luong}</p>
// // //                 </div>

// // //                 <div className="text-right">
// // //                   <p className="text-sm text-gray-600">
// // //                     Đơn giá: {donGia.toLocaleString('vi-VN')}₫
// // //                   </p>
// // //                   <p className="text-[#D33C3C] font-semibold">
// // //                     Thành tiền: {thanhTien.toLocaleString('vi-VN')}₫
// // //                   </p>
// // //                 </div>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>

// // //         {/* Tổng tiền */}
// // //         <div className="text-right mt-4 border-t pt-3">
// // //           <p>Tổng tiền hàng: {donHang.tong_tien_hang.toLocaleString('vi-VN')}₫</p>
// // //           <p>Giảm giá: -{donHang.so_tien_giam.toLocaleString('vi-VN')}₫</p>
// // //           <p className="text-lg font-semibold text-[#D33C3C]">
// // //             Tổng thanh toán: {donHang.so_tien_thanh_toan.toLocaleString('vi-VN')}₫
// // //           </p>
// // //         </div>

// // //         {/* Timeline trạng thái */}
// // //         <div className="mt-8 border-t pt-5">
// // //           <h3 className="font-semibold text-lg mb-3 text-[#6A0A0A]">Trạng thái đơn hàng</h3>
// // //           <div className="relative pl-6">
// // //             {trangThaiSteps.map((step, index) => (
// // //               <div
// // //                 key={step.key}
// // //                 className={`flex items-start gap-3 mb-3 transition-colors duration-300 ${
// // //                   index === currentStep
// // //                     ? 'font-semibold text-[#D33C3C]'
// // //                     : index < currentStep
// // //                     ? 'text-green-600'
// // //                     : 'text-gray-400'
// // //                 }`}
// // //               >
// // //                 {index < currentStep ? (
// // //                   <CheckCircle className="text-green-500" size={20} />
// // //                 ) : index === currentStep ? (
// // //                   <CheckCircle className="text-[#D33C3C]" size={20} />
// // //                 ) : (
// // //                   <Package className="text-gray-300" size={20} />
// // //                 )}
// // //                 <p>{step.label}</p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </UserLayout>
// // //   );
// // // }
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useParams } from 'next/navigation';
// // import toast from 'react-hot-toast';
// // import { CheckCircle, Package } from 'lucide-react';
// // import UserLayout from '@/app/components/UserLayout';
// // import { useUser } from '@/app/hooks/useUser';
// // import { IDonHang, IChiTietDonHang } from '@/app/lib/cautrucdata';

// // interface IChiTietDonHangMoRong
// //   extends Omit<IChiTietDonHang, 'json_tuy_chon' | 'json_mon_them'> {
// //   bien_the?: {
// //     id: number;
// //     ten: string;
// //     gia_them?: number;
// //     san_pham?: {
// //       id: number;
// //       ten: string;
// //       hinh?: string;
// //       gia_goc?: number;
// //     };
// //   };
// //   json_tuy_chon?: Record<string, string>;
// //   json_mon_them?: { ten: string; gia?: number }[] | string;
// // }

// // export default function ChiTietDonHangPage() {
// //   const { id } = useParams();
// //   const user = useUser();
// //   const [donHang, setDonHang] = useState<IDonHang | null>(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     if (!user) return;
// //     const token = localStorage.getItem('token');
// //     if (!token) return;

// //     async function fetchChiTiet() {
// //       try {
// //         const res = await fetch(`/api/chi_tiet_don_hang/${id}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         const data = await res.json();

// //         if (res.ok) setDonHang(data);
// //         else toast.error(data.thong_bao || 'Không tải được đơn hàng');
// //       } catch {
// //         toast.error('Lỗi khi tải đơn hàng');
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchChiTiet();
// //   }, [id, user]);

// //   if (loading)
// //     return <p className="p-8 text-center text-gray-600">Đang tải chi tiết đơn hàng...</p>;
// //   if (!donHang)
// //     return <p className="p-8 text-center text-gray-600">Không tìm thấy đơn hàng</p>;

// //   const chiTiet = (donHang as unknown as { chi_tiet_don_hang: IChiTietDonHangMoRong[] })
// //     .chi_tiet_don_hang ?? [];

// //   // 🔹 5 trạng thái chuẩn
// //   const trangThaiSteps = [
// //     { label: 'Đơn hàng chờ xác nhận', key: 'cho_xac_nhan' },
// //     { label: 'Đơn hàng đã xác nhận', key: 'da_xac_nhan' },
// //     { label: 'Đơn hàng đang giao', key: 'dang_giao' },
// //     { label: 'Đơn hàng đã giao', key: 'da_giao' },
// //     { label: 'Đơn hàng đã hủy', key: 'da_huy' },
// //   ] as const;

// //   const currentStep = Math.max(
// //     0,
// //     trangThaiSteps.findIndex((s) => s.key === donHang.trang_thai)
// //   );

// //   // 🔹 Gán nhãn trạng thái đẹp
// //   const nhanTrangThai = {
// //     cho_xac_nhan: { text: '🕓 Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700' },
// //     da_xac_nhan: { text: '✅ Đã xác nhận', color: 'bg-green-100 text-green-700' },
// //     dang_giao: { text: '🚚 Đang giao hàng', color: 'bg-blue-100 text-blue-700' },
// //     da_giao: { text: '🎉 Đã giao thành công', color: 'bg-green-100 text-green-700' },
// //     da_huy: { text: '❌ Đơn hàng đã hủy', color: 'bg-red-100 text-red-700' },
// //   } as const;

// //   const trangThaiHienTai = nhanTrangThai[donHang.trang_thai as keyof typeof nhanTrangThai];

// //   return (
// //     <UserLayout user={user!}>
// //       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// //         <div className="flex items-center justify-between mb-4">
// //           <h2 className="text-2xl font-bold text-[#6A0A0A]">
// //             Chi tiết đơn hàng #{donHang.ma_don}
// //           </h2>
// //           {trangThaiHienTai && (
// //             <span
// //               className={`px-3 py-1 text-sm font-medium rounded-full ${trangThaiHienTai.color}`}
// //             >
// //               {trangThaiHienTai.text}
// //             </span>
// //           )}
// //         </div>

// //         {/* Thông tin người nhận */}
// //         <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
// //           <p>
// //             <strong>Ngày đặt:</strong> {new Date(donHang.ngay_tao).toLocaleString('vi-VN')}
// //           </p>
// //           <p>
// //             <strong>Trạng thái:</strong> {donHang.trang_thai}
// //           </p>
// //           <p>
// //             <strong>Người nhận:</strong> {donHang.ho_ten_nguoi_nhan}
// //           </p>
// //           <p>
// //             <strong>Điện thoại:</strong> {donHang.sdt_nguoi_nhan}
// //           </p>
// //           <p className="col-span-2">
// //             <strong>Địa chỉ:</strong> {donHang.dia_chi_nguoi_nhan}
// //           </p>
// //           {donHang.ghi_chu && (
// //             <p className="col-span-2">
// //               <strong>Ghi chú:</strong> {donHang.ghi_chu}
// //             </p>
// //           )}
// //         </div>

// //         {/* Danh sách sản phẩm */}
// //         <div className="border-t pt-4">
// //           {chiTiet.map((sp) => {
// //             const giaGoc = sp.bien_the?.san_pham?.gia_goc ?? 0;
// //             const giaBienThe = sp.bien_the?.gia_them ?? 0;

// //             // ✅ FIX: đảm bảo luôn là mảng, tránh lỗi reduce và lỗi undefined
// //             const monThemArray: { ten: string; gia?: number }[] = Array.isArray(sp.json_mon_them)
// //               ? sp.json_mon_them
// //               : typeof sp.json_mon_them === 'string'
// //               ? JSON.parse(sp.json_mon_them || '[]')
// //               : [];

// //             const tongMonThem = monThemArray.reduce(
// //               (t: number, m: { ten: string; gia?: number }) => t + (m.gia ?? 0),
// //               0
// //             );

// //             const donGia = giaGoc + giaBienThe + tongMonThem;
// //             const thanhTien = donGia * sp.so_luong;

// //             return (
// //               <div key={sp.id} className="flex items-start gap-4 border-b pb-3 mb-3">
// //                 <img
// //                   src={sp.bien_the?.san_pham?.hinh || '/noimg.png'}
// //                   alt={sp.bien_the?.san_pham?.ten || ''}
// //                   className="w-20 h-20 object-cover rounded-lg"
// //                 />
// //                 <div className="flex-1">
// //                   <p className="font-medium">{sp.bien_the?.san_pham?.ten}</p>

// //                   {sp.bien_the?.ten && (
// //                     <p className="text-sm text-gray-500">
// //                       Biến thể: {sp.bien_the.ten} (+{giaBienThe.toLocaleString('vi-VN')}₫)
// //                     </p>
// //                   )}

// //                   {sp.json_tuy_chon && Object.keys(sp.json_tuy_chon).length > 0 && (
// //                     <p className="text-sm text-gray-500">
// //                       Tuỳ chọn:{' '}
// //                       {Object.entries(sp.json_tuy_chon)
// //                         .map(([k, v]) => `${k}: ${v}`)
// //                         .join(', ')}
// //                     </p>
// //                   )}

// //                   {monThemArray.length > 0 && (
// //                     <p className="text-sm text-gray-500">
// //                       Món thêm:{' '}
// //                       {monThemArray
// //                         .map((m) => `${m.ten} (+${(m.gia ?? 0).toLocaleString('vi-VN')}₫)`)
// //                         .join(', ')}
// //                     </p>
// //                   )}

// //                   <p className="text-sm text-gray-500">Số lượng: {sp.so_luong}</p>
// //                 </div>

// //                 <div className="text-right">
// //                   <p className="text-sm text-gray-600">
// //                     Đơn giá: {donGia.toLocaleString('vi-VN')}₫
// //                   </p>
// //                   <p className="text-[#D33C3C] font-semibold">
// //                     Thành tiền: {thanhTien.toLocaleString('vi-VN')}₫
// //                   </p>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* Tổng tiền */}
// //         <div className="text-right mt-4 border-t pt-3">
// //           <p>Tổng tiền hàng: {donHang.tong_tien_hang.toLocaleString('vi-VN')}₫</p>
// //           <p>Giảm giá: -{donHang.so_tien_giam.toLocaleString('vi-VN')}₫</p>
// //           <p className="text-lg font-semibold text-[#D33C3C]">
// //             Tổng thanh toán: {donHang.so_tien_thanh_toan.toLocaleString('vi-VN')}₫
// //           </p>
// //         </div>

// //         {/* Timeline trạng thái */}
// //         <div className="mt-8 border-t pt-5">
// //           <h3 className="font-semibold text-lg mb-3 text-[#6A0A0A]">Trạng thái đơn hàng</h3>
// //           <div className="relative pl-6">
// //             {trangThaiSteps.map((step, index) => (
// //               <div
// //                 key={step.key}
// //                 className={`flex items-start gap-3 mb-3 transition-colors duration-300 ${
// //                   index === currentStep
// //                     ? 'font-semibold text-[#D33C3C]'
// //                     : index < currentStep
// //                     ? 'text-green-600'
// //                     : 'text-gray-400'
// //                 }`}
// //               >
// //                 {index < currentStep ? (
// //                   <CheckCircle className="text-green-500" size={20} />
// //                 ) : index === currentStep ? (
// //                   <CheckCircle className="text-[#D33C3C]" size={20} />
// //                 ) : (
// //                   <Package className="text-gray-300" size={20} />
// //                 )}
// //                 <p>{step.label}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </UserLayout>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { CheckCircle, Package, XCircle } from 'lucide-react';
// import UserLayout from '@/app/components/UserLayout';
// import { useUser } from '@/app/hooks/useUser';
// import { IDonHang, IChiTietDonHang } from '@/app/lib/cautrucdata';

// interface IChiTietDonHangMoRong
//   extends Omit<IChiTietDonHang, 'json_tuy_chon' | 'json_mon_them'> {
//   bien_the?: {
//     id: number;
//     ten: string;
//     gia_them?: number;
//     san_pham?: {
//       id: number;
//       ten: string;
//       hinh?: string;
//       gia_goc?: number;
//     };
//   };
//   json_tuy_chon?: Record<string, string> | string;
//   json_mon_them?: { ten: string; gia?: number }[] | string;
// }

// export default function ChiTietDonHangPage() {
//   const { id } = useParams();
//   const user = useUser();
//   const [donHang, setDonHang] = useState<IDonHang | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user) return;
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     async function fetchChiTiet() {
//       try {
//         const res = await fetch(`/api/chi_tiet_don_hang/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();

//         if (res.ok) setDonHang(data);
//         else toast.error(data.thong_bao || 'Không tải được đơn hàng');
//       } catch {
//         toast.error('Lỗi khi tải đơn hàng');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchChiTiet();
//   }, [id, user]);

//   if (loading)
//     return <p className="p-8 text-center text-gray-600">Đang tải chi tiết đơn hàng...</p>;
//   if (!donHang)
//     return <p className="p-8 text-center text-gray-600">Không tìm thấy đơn hàng</p>;

//   const chiTiet = (donHang as unknown as { chi_tiet_don_hang: IChiTietDonHangMoRong[] })
//     .chi_tiet_don_hang ?? [];

//   // 🔹 Danh sách trạng thái chuẩn
//   const trangThaiSteps = [
//     { label: 'Đơn hàng chờ xác nhận', key: 'cho_xac_nhan' },
//     { label: 'Đơn hàng đã xác nhận', key: 'da_xac_nhan' },
//     { label: 'Đơn hàng đang giao', key: 'dang_giao' },
//     { label: 'Đơn hàng đã giao', key: 'da_giao' },
//     { label: 'Đơn hàng đã hủy', key: 'da_huy' },
//   ] as const;

//   const currentStep = Math.max(
//     0,
//     trangThaiSteps.findIndex((s) => s.key === donHang.trang_thai)
//   );

//   // 🔹 Gán nhãn trạng thái đẹp
//   const nhanTrangThai = {
//     cho_xac_nhan: { text: '🕓 Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700' },
//     da_xac_nhan: { text: '✅ Đã xác nhận', color: 'bg-green-100 text-green-700' },
//     dang_giao: { text: '🚚 Đang giao hàng', color: 'bg-blue-100 text-blue-700' },
//     da_giao: { text: '🎉 Đã giao thành công', color: 'bg-green-100 text-green-700' },
//     da_huy: { text: '❌ Đơn hàng đã hủy', color: 'bg-red-100 text-red-700' },
//   } as const;

//   const trangThaiHienTai = nhanTrangThai[donHang.trang_thai as keyof typeof nhanTrangThai];

//   return (
//     <UserLayout user={user!}>
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-bold text-[#6A0A0A]">
//             Chi tiết đơn hàng #{donHang.ma_don}
//           </h2>
//           {trangThaiHienTai && (
//             <span
//               className={`px-3 py-1 text-sm font-medium rounded-full ${trangThaiHienTai.color}`}
//             >
//               {trangThaiHienTai.text}
//             </span>
//           )}
//         </div>

//         {/* Thông tin người nhận */}
//         <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
//           <p>
//             <strong>Ngày đặt:</strong> {new Date(donHang.ngay_tao).toLocaleString('vi-VN')}
//           </p>
//           <p>
//             <strong>Trạng thái:</strong> {donHang.trang_thai}
//           </p>
//           <p>
//             <strong>Người nhận:</strong> {donHang.ho_ten_nguoi_nhan}
//           </p>
//           <p>
//             <strong>Điện thoại:</strong> {donHang.sdt_nguoi_nhan}
//           </p>
//           <p className="col-span-2">
//             <strong>Địa chỉ:</strong> {donHang.dia_chi_nguoi_nhan}
//           </p>
//           {donHang.ghi_chu && (
//             <p className="col-span-2">
//               <strong>Ghi chú:</strong> {donHang.ghi_chu}
//             </p>
//           )}
//         </div>

//         {/* Danh sách sản phẩm */}
//         <div className="border-t pt-4">
//           {chiTiet.map((sp) => {
//             const giaGoc = sp.bien_the?.san_pham?.gia_goc ?? 0;
//             const giaBienThe = sp.bien_the?.gia_them ?? 0;

//             // ✅ Xử lý món thêm
//             const monThemArray: { ten: string; gia?: number }[] = Array.isArray(sp.json_mon_them)
//               ? sp.json_mon_them
//               : typeof sp.json_mon_them === 'string'
//               ? JSON.parse(sp.json_mon_them || '[]')
//               : [];

//             // ✅ Xử lý tuỳ chọn (chỉ lấy các trường có giá trị)
//             let tuyChonData: Record<string, string> = {};
//             if (typeof sp.json_tuy_chon === 'string') {
//               try {
//                 tuyChonData = JSON.parse(sp.json_tuy_chon || '{}');
//               } catch {
//                 tuyChonData = {};
//               }
//             } else if (sp.json_tuy_chon) {
//               tuyChonData = sp.json_tuy_chon;
//             }

//             const tuyChonHienThi = Object.entries(tuyChonData).filter(([_, v]) => v && v !== '');

//             const tongMonThem = monThemArray.reduce(
//               (t: number, m: { ten: string; gia?: number }) => t + (m.gia ?? 0),
//               0
//             );

//             const donGia = giaGoc + giaBienThe + tongMonThem;
//             const thanhTien = donGia * sp.so_luong;

//             return (
//               <div
//                 key={sp.id}
//                 className="flex items-start gap-4 border-b pb-4 mb-4 transition hover:bg-gray-50 rounded-lg p-2"
//               >
//                 <img
//                   src={sp.bien_the?.san_pham?.hinh || '/noimg.png'}
//                   alt={sp.bien_the?.san_pham?.ten || ''}
//                   className="w-20 h-20 object-cover rounded-lg shadow-sm"
//                 />
//                 <div className="flex-1">
//                   <p className="font-medium text-base text-gray-800">
//                     {sp.bien_the?.san_pham?.ten}
//                   </p>

//                   {sp.bien_the?.ten && (
//                     <p className="text-sm text-gray-600">
//                       <strong>Biến thể:</strong> {sp.bien_the.ten}{' '}
//                       {giaBienThe > 0 && (
//                         <span>(+{giaBienThe.toLocaleString('vi-VN')}₫)</span>
//                       )}
//                     </p>
//                   )}

//                   {tuyChonHienThi.length > 0 && (
//                     <p className="text-sm text-gray-600">
//                       <strong>Tuỳ chọn:</strong>{' '}
//                       {tuyChonHienThi.map(([k, v]) => `${k}: ${v}`).join(', ')}
//                     </p>
//                   )}

//                   {monThemArray.length > 0 && (
//                     <p className="text-sm text-gray-600">
//                       <strong>Món thêm:</strong>{' '}
//                       {monThemArray
//                         .filter((m) => m.ten)
//                         .map(
//                           (m) =>
//                             `${m.ten} (+${(m.gia ?? 0).toLocaleString('vi-VN')}₫)`
//                         )
//                         .join(', ')}
//                     </p>
//                   )}

//                   <p className="text-sm text-gray-600">Số lượng: {sp.so_luong}</p>
//                 </div>

//                 <div className="text-right">
//                   <p className="text-sm text-gray-600">
//                     Đơn giá: {donGia.toLocaleString('vi-VN')}₫
//                   </p>
//                   <p className="text-[#D33C3C] font-semibold">
//                     Thành tiền: {thanhTien.toLocaleString('vi-VN')}₫
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Tổng tiền */}
//         <div className="text-right mt-4 border-t pt-3">
//           <p>Tổng tiền hàng: {donHang.tong_tien_hang.toLocaleString('vi-VN')}₫</p>
//           <p>Giảm giá: -{donHang.so_tien_giam.toLocaleString('vi-VN')}₫</p>
//           <p className="text-lg font-semibold text-[#D33C3C]">
//             Tổng thanh toán: {donHang.so_tien_thanh_toan.toLocaleString('vi-VN')}₫
//           </p>
//         </div>

//         {/* Timeline trạng thái */}
//         <div className="mt-8 border-t pt-5">
//           <h3 className="font-semibold text-lg mb-3 text-[#6A0A0A]">
//             Trạng thái đơn hàng
//           </h3>
//           <div className="relative pl-6">
//             {trangThaiSteps.map((step, index) => {
//               const isHuy = donHang.trang_thai === 'da_huy';

//               let icon;
//               let textColor = 'text-gray-400';
//               let fontWeight = '';

//               if (isHuy && step.key === 'da_huy') {
//                 icon = <XCircle className="text-red-500" size={20} />;
//                 textColor = 'text-red-600';
//                 fontWeight = 'font-semibold';
//               } else if (isHuy) {
//                 icon = <Package className="text-gray-300" size={20} />;
//               } else if (index < currentStep) {
//                 icon = <CheckCircle className="text-green-500" size={20} />;
//                 textColor = 'text-green-600';
//               } else if (index === currentStep) {
//                 icon = <CheckCircle className="text-[#D33C3C]" size={20} />;
//                 textColor = 'text-[#D33C3C] font-semibold';
//               } else {
//                 icon = <Package className="text-gray-300" size={20} />;
//               }

//               return (
//                 <div key={step.key} className={`flex items-start gap-3 mb-3 ${textColor} ${fontWeight}`}>
//                   {icon}
//                   <p>{step.label}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </UserLayout>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { CheckCircle, Package, XCircle } from 'lucide-react';
import UserLayout from '@/app/components/UserLayout';
import { useUser } from '@/app/hooks/useUser';
import { IDonHang, IChiTietDonHang } from '@/app/lib/cautrucdata';

interface IChiTietDonHangMoRong
  extends Omit<IChiTietDonHang, 'json_tuy_chon' | 'json_mon_them'> {
  bien_the?: {
    id: number;
    ten: string;
    gia_them?: number;
    san_pham?: {
      id: number;
      ten: string;
      hinh?: string;
      gia_goc?: number;
    };
  };
  json_tuy_chon?: Record<string, string> | string;
  json_mon_them?: { ten: string; gia?: number; so_luong?: number }[] | string;
}

export default function ChiTietDonHangPage() {
  const { id } = useParams();
  const user = useUser();
  const [donHang, setDonHang] = useState<IDonHang | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('token');
    if (!token) return;

    async function fetchChiTiet() {
      try {
        const res = await fetch(`/api/chi_tiet_don_hang/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) setDonHang(data);
        else toast.error(data.thong_bao || 'Không tải được đơn hàng');
      } catch {
        toast.error('Lỗi khi tải đơn hàng');
      } finally {
        setLoading(false);
      }
    }

    fetchChiTiet();
  }, [id, user]);

  if (loading)
    return <p className="p-8 text-center text-gray-600">Đang tải chi tiết đơn hàng...</p>;
  if (!donHang)
    return <p className="p-8 text-center text-gray-600">Không tìm thấy đơn hàng</p>;

  const chiTiet = (donHang as unknown as { chi_tiet_don_hang: IChiTietDonHangMoRong[] })
    .chi_tiet_don_hang ?? [];

  const trangThaiSteps = [
    { label: 'Đơn hàng chờ xác nhận', key: 'cho_xac_nhan' },
    { label: 'Đơn hàng đã xác nhận', key: 'da_xac_nhan' },
    { label: 'Đơn hàng đang giao', key: 'dang_giao' },
    { label: 'Đơn hàng đã giao', key: 'da_giao' },
    { label: 'Đơn hàng đã hủy', key: 'da_huy' },
  ] as const;

  const currentStep = Math.max(
    0,
    trangThaiSteps.findIndex((s) => s.key === donHang.trang_thai)
  );

  const nhanTrangThai = {
    cho_xac_nhan: { text: '🕓 Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700' },
    da_xac_nhan: { text: '✅ Đã xác nhận', color: 'bg-green-100 text-green-700' },
    dang_giao: { text: '🚚 Đang giao hàng', color: 'bg-blue-100 text-blue-700' },
    da_giao: { text: '🎉 Đã giao thành công', color: 'bg-green-100 text-green-700' },
    da_huy: { text: '❌ Đơn hàng đã hủy', color: 'bg-red-100 text-red-700' },
  } as const;

  const trangThaiHienTai = nhanTrangThai[donHang.trang_thai as keyof typeof nhanTrangThai];

  return (
    <UserLayout user={user!}>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-[#6A0A0A]">
            Chi tiết đơn hàng #{donHang.ma_don}
          </h2>
          {trangThaiHienTai && (
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${trangThaiHienTai.color}`}
            >
              {trangThaiHienTai.text}
            </span>
          )}
        </div>

        {/* Thông tin người nhận */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
          <p>
            <strong>Ngày đặt:</strong> {new Date(donHang.ngay_tao).toLocaleString('vi-VN')}
          </p>
          <p>
            <strong>Trạng thái:</strong> {donHang.trang_thai}
          </p>
          <p>
            <strong>Người nhận:</strong> {donHang.ho_ten_nguoi_nhan}
          </p>
          <p>
            <strong>Điện thoại:</strong> {donHang.sdt_nguoi_nhan}
          </p>
          <p className="col-span-2">
            <strong>Địa chỉ:</strong> {donHang.dia_chi_nguoi_nhan}
          </p>
          {donHang.ghi_chu && (
            <p className="col-span-2">
              <strong>Ghi chú:</strong> {donHang.ghi_chu}
            </p>
          )}
        </div>

        {/* Danh sách sản phẩm */}
        <div className="border-t pt-4">
          {chiTiet.map((sp) => {
            const giaGoc = sp.bien_the?.san_pham?.gia_goc ?? 0;
            const giaBienThe = sp.bien_the?.gia_them ?? 0;

            // ✅ Xử lý món thêm
            const monThemArray: { ten: string; gia?: number; so_luong?: number }[] =
              Array.isArray(sp.json_mon_them)
                ? sp.json_mon_them
                : typeof sp.json_mon_them === 'string'
                ? JSON.parse(sp.json_mon_them || '[]')
                : [];

            // ✅ Xử lý tuỳ chọn
            let tuyChonData: Record<string, string> = {};
            if (typeof sp.json_tuy_chon === 'string') {
              try {
                tuyChonData = JSON.parse(sp.json_tuy_chon || '{}');
              } catch {
                tuyChonData = {};
              }
            } else if (sp.json_tuy_chon) {
              tuyChonData = sp.json_tuy_chon;
            }

            const tuyChonHienThi = Object.entries(tuyChonData).filter(([_, v]) => v && v !== '');

            // ✅ Tính tổng món thêm (có nhân số lượng)
            const tongMonThem = monThemArray.reduce(
              (t: number, m) => t + ((m.gia ?? 0) * (m.so_luong ?? 1)),
              0
            );

            const donGia = giaGoc + giaBienThe + tongMonThem;
            const thanhTien = donGia * sp.so_luong;

            return (
              <div
                key={sp.id}
                className="flex items-start gap-4 border-b pb-4 mb-4 transition hover:bg-gray-50 rounded-lg p-2"
              >
                <img
                  src={sp.bien_the?.san_pham?.hinh || '/noimg.png'}
                  alt={sp.bien_the?.san_pham?.ten || ''}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
                <div className="flex-1">
                  <p className="font-medium text-base text-gray-800">
                    {sp.bien_the?.san_pham?.ten}
                  </p>

                  {sp.bien_the?.ten && (
                    <p className="text-sm text-gray-600">
                      <strong>Biến thể:</strong> {sp.bien_the.ten}{' '}
                      {giaBienThe > 0 && (
                        <span>(+{giaBienThe.toLocaleString('vi-VN')}₫)</span>
                      )}
                    </p>
                  )}

                  {tuyChonHienThi.length > 0 && (
                    <p className="text-sm text-gray-600">
                      <strong>Tuỳ chọn:</strong>{' '}
                      {tuyChonHienThi.map(([k, v]) => `${k}: ${v}`).join(', ')}
                    </p>
                  )}

                  {monThemArray.length > 0 && (
                    <p className="text-sm text-gray-600">
                      <strong>Món thêm:</strong>{' '}
                      {monThemArray
                        .filter((m) => m.ten)
                        .map(
                          (m) =>
                            `${m.ten} (+${(m.gia ?? 0).toLocaleString('vi-VN')}₫ ×${
                              m.so_luong ?? 1
                            })`
                        )
                        .join(', ')}
                    </p>
                  )}

                  <p className="text-sm text-gray-600">Số lượng: {sp.so_luong}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    Đơn giá: {donGia.toLocaleString('vi-VN')}₫
                  </p>
                  <p className="text-[#D33C3C] font-semibold">
                    Thành tiền: {thanhTien.toLocaleString('vi-VN')}₫
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tổng tiền */}
        <div className="text-right mt-4 border-t pt-3">
          <p>Tổng tiền hàng: {donHang.tong_tien_hang.toLocaleString('vi-VN')}₫</p>
          <p>Giảm giá: -{donHang.so_tien_giam.toLocaleString('vi-VN')}₫</p>
          <p className="text-lg font-semibold text-[#D33C3C]">
            Tổng thanh toán: {donHang.so_tien_thanh_toan.toLocaleString('vi-VN')}₫
          </p>
        </div>

        {/* Trạng thái */}
        <div className="mt-8 border-t pt-5">
          <h3 className="font-semibold text-lg mb-3 text-[#6A0A0A]">
            Trạng thái đơn hàng
          </h3>
          <div className="relative pl-6">
            {trangThaiSteps.map((step, index) => {
              const isHuy = donHang.trang_thai === 'da_huy';
              let icon;
              let textColor = 'text-gray-400';
              let fontWeight = '';

              if (isHuy && step.key === 'da_huy') {
                icon = <XCircle className="text-red-500" size={20} />;
                textColor = 'text-red-600';
                fontWeight = 'font-semibold';
              } else if (isHuy) {
                icon = <Package className="text-gray-300" size={20} />;
              } else if (index < currentStep) {
                icon = <CheckCircle className="text-green-500" size={20} />;
                textColor = 'text-green-600';
              } else if (index === currentStep) {
                icon = <CheckCircle className="text-[#D33C3C]" size={20} />;
                textColor = 'text-[#D33C3C] font-semibold';
              } else {
                icon = <Package className="text-gray-300" size={20} />;
              }

              return (
                <div key={step.key} className={`flex items-start gap-3 mb-3 ${textColor} ${fontWeight}`}>
                  {icon}
                  <p>{step.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
