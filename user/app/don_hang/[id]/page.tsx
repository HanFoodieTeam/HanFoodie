// // // // 'use client';

// // // // import { useEffect, useState } from 'react';
// // // // import { useParams, useRouter } from 'next/navigation';
// // // // import toast from 'react-hot-toast';
// // // // import { Star } from 'lucide-react';
// // // // import UserLayout from '@/app/components/UserLayout';
// // // // import { useUser } from '@/app/hooks/useUser';
// // // // import { IDonHang, IChiTietDonHang } from '@/app/lib/cautrucdata';



// // // // export default function ChiTietDonHangPage() {
// // // //   const { id } = useParams();
// // // //   const router = useRouter();
// // // //   const user = useUser();
// // // //   const [donHang, setDonHang] = useState<IDonHang | null>(null);
// // // //   const [chiTiet, setChiTiet] = useState<IChiTietDonHang[]>([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   const [danhGia, setDanhGia] = useState<{ sao: number; noi_dung: string }>({
// // // //     sao: 5,
// // // //     noi_dung: '',
// // // //   });

// // // //   useEffect(() => {
// // // //     if (!user) return;
// // // //     const token = localStorage.getItem('token');
// // // //     if (!token) return;

// // // //     async function fetchChiTiet() {
// // // //       try {
// // // //         const res = await fetch(`/api/don_hang/${id}`, {
// // // //           headers: { Authorization: `Bearer ${token}` },
// // // //         });
// // // //         const data = await res.json();
// // // //         if (res.ok) {
// // // //           setDonHang(data.don_hang);
// // // //           setChiTiet(data.chi_tiet);
// // // //         } else toast.error(data.message || 'Không tải được đơn hàng');
// // // //       } catch {
// // // //         toast.error('Lỗi khi tải đơn hàng');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     }

// // // //     fetchChiTiet();
// // // //   }, [id, user]);

// // // //   async function handleGuiDanhGia() {
// // // //     const token = localStorage.getItem('token');
// // // //     const res = await fetch('/api/danh_gia', {
// // // //       method: 'POST',
// // // //       headers: {
// // // //         'Content-Type': 'application/json',
// // // //         Authorization: `Bearer ${token}`,
// // // //       },
// // // //       body: JSON.stringify({
// // // //         id_don_hang: donHang?.id,
// // // //         sao: danhGia.sao,
// // // //         noi_dung: danhGia.noi_dung,
// // // //       }),
// // // //     });
// // // //     if (res.ok) {
// // // //       toast.success('Cảm ơn bạn đã đánh giá!');
// // // //       setDanhGia({ sao: 5, noi_dung: '' });
// // // //     } else {
// // // //       toast.error('Không thể gửi đánh giá');
// // // //     }
// // // //   }

// // // //   if (loading)
// // // //     return <p className="p-8 text-center text-gray-600">Đang tải chi tiết đơn hàng...</p>;

// // // //   if (!donHang)
// // // //     return <p className="p-8 text-center text-gray-600">Không tìm thấy đơn hàng</p>;

// // // //   const trangThai = donHang.trang_thai;

// // // //   return (
// // // //     <UserLayout user={user}>
// // // //       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // // //         <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">
// // // //           Chi tiết đơn hàng #{donHang.ma_don}
// // // //         </h2>

// // // //         {/* Thông tin đơn */}
// // // //         <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
// // // //           <p><strong>Ngày đặt:</strong> {new Date(donHang.ngay_tao).toLocaleString('vi-VN')}</p>
// // // //           <p><strong>Trạng thái:</strong> {trangThai}</p>
// // // //           <p><strong>Người nhận:</strong> {donHang.ho_ten_nguoi_nhan}</p>
// // // //           <p><strong>Điện thoại:</strong> {donHang.sdt_nguoi_nhan}</p>
// // // //           <p className="col-span-2"><strong>Địa chỉ:</strong> {donHang.dia_chi_nguoi_nhan}</p>
// // // //           {donHang.ghi_chu && (
// // // //             <p className="col-span-2"><strong>Ghi chú:</strong> {donHang.ghi_chu}</p>
// // // //           )}
// // // //         </div>

// // // //         {/* Chi tiết sản phẩm */}
// // // //         <div className="border-t pt-4">
// // // //           {chiTiet.map((sp) => (
// // // //             <div key={sp.id} className="flex items-center gap-4 border-b pb-3 mb-3">
// // // //               <img src={sp.hinh || '/noing.png'} alt="" className="w-20 h-20 object-cover rounded-lg" />
// // // //               <div className="flex-1">
// // // //                 <p className="font-medium">{sp.ten_san_pham}</p>
// // // //                 <p className="text-sm text-gray-500">{sp.ten_bien_the}</p>
// // // //                 <p className="text-sm text-gray-500">Số lượng: {sp.so_luong}</p>
// // // //               </div>
// // // //               <p className="text-[#D33C3C] font-semibold">
// // // //                 {sp.thanh_tien.toLocaleString('vi-VN')}₫
// // // //               </p>
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         {/* Tổng tiền */}
// // // //         <div className="text-right mt-4 border-t pt-3">
// // // //           <p>Tổng tiền hàng: {donHang.tong_tien_hang.toLocaleString('vi-VN')}₫</p>
// // // //           <p>Giảm giá: -{donHang.so_tien_giam.toLocaleString('vi-VN')}₫</p>
// // // //           <p className="text-lg font-semibold text-[#D33C3C]">
// // // //             Tổng thanh toán: {donHang.so_tien_thanh_toan.toLocaleString('vi-VN')}₫
// // // //           </p>
// // // //         </div>

// // // //         {/* Đánh giá sản phẩm */}
// // // //         {trangThai === 'da_giao' && (
// // // //           <div className="mt-8 border-t pt-5">
// // // //             <h3 className="font-semibold text-lg mb-3 text-[#6A0A0A]">Đánh giá đơn hàng</h3>
// // // //             <div className="flex gap-2 mb-3">
// // // //               {[1, 2, 3, 4, 5].map((s) => (
// // // //                 <Star
// // // //                   key={s}
// // // //                   size={24}
// // // //                   onClick={() => setDanhGia({ ...danhGia, sao: s })}
// // // //                   className={`cursor-pointer ${
// // // //                     danhGia.sao >= s ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-300'
// // // //                   }`}
// // // //                 />
// // // //               ))}
// // // //             </div>
// // // //             <textarea
// // // //               value={danhGia.noi_dung}
// // // //               onChange={(e) => setDanhGia({ ...danhGia, noi_dung: e.target.value })}
// // // //               className="w-full border rounded-lg p-2 h-24 text-sm"
// // // //               placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
// // // //             />
// // // //             <div className="text-right mt-3">
// // // //               <button
// // // //                 onClick={handleGuiDanhGia}
// // // //                 className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg hover:bg-[#b22f2f]"
// // // //               >
// // // //                 Gửi đánh giá
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </UserLayout>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useParams } from 'next/navigation';
// // // import toast from 'react-hot-toast';
// // // import { Star } from 'lucide-react';
// // // import UserLayout from '@/app/components/UserLayout';
// // // import { useUser } from '@/app/hooks/useUser';
// // // import { IDonHang, IChiTietDonHang } from '@/app/lib/cautrucdata';

// // // export default function ChiTietDonHangPage() {
// // //   const { id } = useParams();
// // //   const user = useUser();

// // //   const [donHang, setDonHang] = useState<IDonHang | null>(null);
// // //   const [chiTiet, setChiTiet] = useState<IChiTietDonHang[]>([]);
// // //   const [loading, setLoading] = useState(true);

// // //   // Lưu đánh giá từng sản phẩm
// // //   const [danhGia, setDanhGia] = useState<Record<number, { sao: number; noi_dung: string }>>({});

// // //   useEffect(() => {
// // //     if (!user) return;
// // //     const token = localStorage.getItem('token');
// // //     if (!token) return;

// // //     async function fetchChiTiet() {
// // //       try {
// // //         const res = await fetch(`/api/don_hang/${id}`, {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });
// // //         const data = await res.json();
// // //         if (res.ok) {
// // //           setDonHang(data.don_hang);
// // //           setChiTiet(data.chi_tiet);
// // //         } else {
// // //           toast.error(data.message || 'Không tải được đơn hàng');
// // //         }
// // //       } catch (err) {
// // //         console.error(err);
// // //         toast.error('Lỗi khi tải đơn hàng');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     }

// // //     fetchChiTiet();
// // //   }, [id, user]);

// // //   // Gửi đánh giá từng sản phẩm
// // //   async function handleGuiDanhGia(id_bien_the: number) {
// // //     const token = localStorage.getItem('token');
// // //     const danhGiaSP = danhGia[id_bien_the];
// // //     if (!danhGiaSP || !danhGiaSP.noi_dung.trim()) {
// // //       toast.error('Vui lòng nhập nội dung đánh giá');
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch('/api/danh_gia', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //         body: JSON.stringify({
// // //           id_bien_the,
// // //           sao: danhGiaSP.sao,
// // //           noi_dung: danhGiaSP.noi_dung,
// // //         }),
// // //       });

// // //       const data = await res.json();
// // //       if (res.ok) {
// // //         toast.success('Đánh giá thành công!');
// // //         setDanhGia((prev) => ({
// // //           ...prev,
// // //           [id_bien_the]: { sao: 5, noi_dung: '' },
// // //         }));
// // //       } else {
// // //         toast.error(data.message || 'Không thể gửi đánh giá');
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       toast.error('Lỗi khi gửi đánh giá');
// // //     }
// // //   }

// // //   if (loading)
// // //     return <p className="p-8 text-center text-gray-600">Đang tải chi tiết đơn hàng...</p>;

// // //   if (!donHang)
// // //     return <p className="p-8 text-center text-gray-600">Không tìm thấy đơn hàng</p>;

// // //   const trangThai = donHang.trang_thai;

// // //   return (
// // //     <UserLayout user={user}>
// // //       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// // //         {/* Header */}
// // //         <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">
// // //           Chi tiết đơn hàng #{donHang.ma_don}
// // //         </h2>

// // //         {/* Thông tin đơn */}
// // //         <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
// // //           <p>
// // //             <strong>Ngày đặt:</strong>{' '}
// // //             {new Date(donHang.ngay_tao).toLocaleString('vi-VN')}
// // //           </p>
// // //           <p>
// // //             <strong>Trạng thái:</strong>{' '}
// // //             <span className="capitalize">{trangThai.replaceAll('_', ' ')}</span>
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
// // //           {chiTiet.map((sp) => (
// // //             <div
// // //               key={sp.id}
// // //               className="p-4 border-b rounded-xl bg-white hover:shadow-md transition"
// // //             >
// // //               <div className="flex items-start gap-4">
// // //                 <img
// // //                   src={sp.hinh || '/images/product-placeholder.png'}
// // //                   alt={sp.ten_san_pham}
// // //                   className="w-24 h-24 object-cover rounded-xl border"
// // //                 />
// // //                 <div className="flex-1">
// // //                   <h2 className="font-semibold text-[15px]">
// // //                     {sp.ten_san_pham}
// // //                   </h2>
// // //                   {sp.ten_bien_the && (
// // //                     <p className="text-sm text-gray-600">
// // //                       Biến thể: {sp.ten_bien_the}
// // //                     </p>
// // //                   )}

// // //                   {/* Hiển thị tùy chọn */}
// // //                   {sp.json_tuy_chon && (
// // //                     <p className="text-sm text-gray-600">
// // //                       {Object.entries(JSON.parse(sp.json_tuy_chon))
// // //                         .map(([k, v]) => `${k}: ${v}`)
// // //                         .join(', ')}
// // //                     </p>
// // //                   )}

// // //                   {/* Hiển thị món thêm */}
// // //                   {sp.json_mon_them && (
// // //                     <p className="text-sm text-gray-600">
// // //                       {JSON.parse(sp.json_mon_them)
// // //                         .map((m: { ten: string }) => m.ten)
// // //                         .join(', ')}
// // //                     </p>
// // //                   )}

// // //                   <p className="text-sm text-gray-500 mt-1">
// // //                     Số lượng: {sp.so_luong}
// // //                   </p>
// // //                 </div>

// // //                 <div className="text-right">
// // //                   <p className="text-[#D33C3C] font-semibold">
// // //                     {sp.thanh_tien.toLocaleString('vi-VN')}₫
// // //                   </p>
// // //                 </div>
// // //               </div>

// // //               {/* Đánh giá sản phẩm nếu đơn đã giao */}
// // //               {trangThai === 'da_giao' && (
// // //                 <div className="mt-4 border-t pt-3">
// // //                   <p className="font-medium mb-2">Đánh giá sản phẩm này:</p>
// // //                   <div className="flex gap-2 mb-3">
// // //                     {[1, 2, 3, 4, 5].map((s) => (
// // //                       <Star
// // //                         key={s}
// // //                         size={22}
// // //                         onClick={() =>
// // //                           setDanhGia((prev) => ({
// // //                             ...prev,
// // //                             [sp.id_bien_the!]: {
// // //                               ...prev[sp.id_bien_the!],
// // //                               sao: s,
// // //                               noi_dung: prev[sp.id_bien_the!]?.noi_dung || '',
// // //                             },
// // //                           }))
// // //                         }
// // //                         className={`cursor-pointer ${
// // //                           danhGia[sp.id_bien_the!]?.sao >= s
// // //                             ? 'fill-[#FFD700] text-[#FFD700]'
// // //                             : 'text-gray-300'
// // //                         }`}
// // //                       />
// // //                     ))}
// // //                   </div>
// // //                   <textarea
// // //                     value={danhGia[sp.id_bien_the!]?.noi_dung || ''}
// // //                     onChange={(e) =>
// // //                       setDanhGia((prev) => ({
// // //                         ...prev,
// // //                         [sp.id_bien_the!]: {
// // //                           sao: prev[sp.id_bien_the!]?.sao || 5,
// // //                           noi_dung: e.target.value,
// // //                         },
// // //                       }))
// // //                     }
// // //                     placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
// // //                     className="w-full border rounded-lg p-2 text-sm h-20"
// // //                   />
// // //                   <div className="text-right mt-2">
// // //                     <button
// // //                       onClick={() => handleGuiDanhGia(sp.id_bien_the!)}
// // //                       className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg hover:bg-[#b22f2f]"
// // //                     >
// // //                       Gửi đánh giá
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>

// // //         {/* Tổng tiền */}
// // //         <div className="text-right mt-6 border-t pt-4">
// // //           <p>Tổng tiền hàng: {donHang.tong_tien_hang.toLocaleString('vi-VN')}₫</p>
// // //           <p>Giảm giá: -{donHang.so_tien_giam.toLocaleString('vi-VN')}₫</p>
// // //           <p className="text-lg font-semibold text-[#D33C3C]">
// // //             Tổng thanh toán: {donHang.so_tien_thanh_toan.toLocaleString('vi-VN')}₫
// // //           </p>
// // //         </div>
// // //       </div>
// // //     </UserLayout>
// // //   );
// // // }
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useParams } from 'next/navigation';
// // import toast from 'react-hot-toast';
// // import { Star } from 'lucide-react';
// // import UserLayout from '@/app/components/UserLayout';
// // import { useUser } from '@/app/hooks/useUser';
// // import { IDonHang, IChiTietDonHang } from '@/app/lib/cautrucdata';

// // export default function ChiTietDonHangPage() {
// //   const { id } = useParams();
// //   const user = useUser();

// //   const [donHang, setDonHang] = useState<IDonHang | null>(null);
// //   const [chiTiet, setChiTiet] = useState<(IChiTietDonHang & {
// //     ten_bien_the?: string;
// //     ten_san_pham?: string;
// //     hinh?: string;
// //     id_bien_the?: number;
// //   })[]>([]);
// //   const [loading, setLoading] = useState(true);

// //   const [danhGia, setDanhGia] = useState<{ sao: number; noi_dung: string; id_bien_the?: number }>({
// //     sao: 5,
// //     noi_dung: '',
// //   });

// //   useEffect(() => {
// //     if (!user) return;
// //     const token = localStorage.getItem('token');
// //     if (!token) return;

// //     async function fetchChiTiet() {
// //       try {
// //         const res = await fetch(`/api/don_hang/${id}`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         const data = await res.json();
// //         if (res.ok) {
// //           setDonHang(data.don_hang);
// //           setChiTiet(
// //             data.chi_tiet.map((ct: any) => ({
// //               id: ct.id,
// //               so_luong: ct.so_luong,
// //               thanh_tien: ct.thanh_tien,
// //               ten_bien_the: ct.bien_the?.ten,
// //               ten_san_pham: ct.bien_the?.san_pham?.ten,
// //               hinh: ct.bien_the?.san_pham?.hinh,
// //               id_bien_the: ct.bien_the?.id,
// //             }))
// //           );
// //         } else toast.error(data.message || 'Không tải được đơn hàng');
// //       } catch {
// //         toast.error('Lỗi khi tải đơn hàng');
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchChiTiet();
// //   }, [id, user]);

// //   async function handleGuiDanhGia(id_bien_the?: number) {
// //     const token = localStorage.getItem('token');
// //     if (!token || !id_bien_the) return toast.error('Thiếu thông tin.');

// //     const res = await fetch('/api/danh_gia', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify({
// //         id_bien_the,
// //         sao: danhGia.sao,
// //         noi_dung: danhGia.noi_dung,
// //       }),
// //     });
// //     if (res.ok) {
// //       toast.success('Cảm ơn bạn đã đánh giá!');
// //       setDanhGia({ sao: 5, noi_dung: '' });
// //     } else {
// //       toast.error('Không thể gửi đánh giá');
// //     }
// //   }

// //   if (loading)
// //     return <p className="p-8 text-center text-gray-600">Đang tải chi tiết đơn hàng...</p>;

// //   if (!donHang)
// //     return <p className="p-8 text-center text-gray-600">Không tìm thấy đơn hàng</p>;

// //   return (
// //     <UserLayout user={user!}>
// //       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
// //         <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">
// //           Chi tiết đơn hàng #{donHang.ma_don}
// //         </h2>

// //         {/* Thông tin đơn */}
// //         <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
// //           <p><strong>Ngày đặt:</strong> {new Date(donHang.ngay_tao).toLocaleString('vi-VN')}</p>
// //           <p><strong>Trạng thái:</strong> {donHang.trang_thai}</p>
// //           <p><strong>Người nhận:</strong> {donHang.ho_ten_nguoi_nhan}</p>
// //           <p><strong>Điện thoại:</strong> {donHang.sdt_nguoi_nhan}</p>
// //           <p className="col-span-2"><strong>Địa chỉ:</strong> {donHang.dia_chi_nguoi_nhan}</p>
// //           {donHang.ghi_chu && (
// //             <p className="col-span-2"><strong>Ghi chú:</strong> {donHang.ghi_chu}</p>
// //           )}
// //         </div>

// //         {/* Chi tiết sản phẩm */}
// //         <div className="border-t pt-4">
// //           {chiTiet.map((sp) => (
// //             <div key={sp.id} className="border-b pb-4 mb-4">
// //               <div className="flex items-center gap-4">
// //                 <img
// //                   src={sp.hinh || '/noing.png'}
// //                   alt={sp.ten_san_pham || ''}
// //                   className="w-20 h-20 object-cover rounded-lg"
// //                 />
// //                 <div className="flex-1">
// //                   <p className="font-semibold">{sp.ten_san_pham}</p>
// //                   {sp.ten_bien_the && (
// //                     <p className="text-sm text-gray-500">Biến thể: {sp.ten_bien_the}</p>
// //                   )}
// //                   <p className="text-sm text-gray-500">Số lượng: {sp.so_luong}</p>
// //                 </div>
// //                 <p className="text-[#D33C3C] font-semibold">
// //                   {sp.thanh_tien.toLocaleString('vi-VN')}₫
// //                 </p>
// //               </div>

// //               {/* Đánh giá từng sản phẩm nếu đơn đã giao */}
// //               {donHang.trang_thai === 'da_giao' && (
// //                 <div className="mt-4 ml-8">
// //                   <h4 className="font-medium text-sm mb-1">Đánh giá sản phẩm này:</h4>
// //                   <div className="flex gap-1 mb-2">
// //                     {[1, 2, 3, 4, 5].map((s) => (
// //                       <Star
// //                         key={s}
// //                         size={20}
// //                         onClick={() => setDanhGia({ ...danhGia, sao: s, id_bien_the: sp.id_bien_the })}
// //                         className={`cursor-pointer ${
// //                           danhGia.sao >= s ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-300'
// //                         }`}
// //                       />
// //                     ))}
// //                   </div>
// //                   <textarea
// //                     value={danhGia.noi_dung}
// //                     onChange={(e) => setDanhGia({ ...danhGia, noi_dung: e.target.value })}
// //                     className="w-full border rounded-lg p-2 h-20 text-sm"
// //                     placeholder="Hãy chia sẻ cảm nhận của bạn về sản phẩm..."
// //                   />
// //                   <div className="text-right mt-2">
// //                     <button
// //                       onClick={() => handleGuiDanhGia(sp.id_bien_the)}
// //                       className="bg-[#D33C3C] text-white px-4 py-2 rounded-lg hover:bg-[#b22f2f]"
// //                     >
// //                       Gửi đánh giá
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>

// //         {/* Tổng tiền */}
// //         <div className="text-right mt-6 border-t pt-3">
// //           <p>Tổng tiền hàng: {donHang.tong_tien_hang.toLocaleString('vi-VN')}₫</p>
// //           <p>Giảm giá: -{donHang.so_tien_giam.toLocaleString('vi-VN')}₫</p>
// //           <p className="text-lg font-semibold text-[#D33C3C]">
// //             Tổng thanh toán: {donHang.so_tien_thanh_toan.toLocaleString('vi-VN')}₫
// //           </p>
// //         </div>
// //       </div>
// //     </UserLayout>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { Star } from 'lucide-react';
// import UserLayout from '@/app/components/UserLayout';
// import { useUser } from '@/app/hooks/useUser';
// import { IDonHang, IChiTietDonHang } from '@/app/lib/cautrucdata';

// interface IChiTietDonHangMoRong extends IChiTietDonHang {
//   bien_the?: {
//     id: number;
//     ten: string;
//     san_pham?: {
//       ten: string;
//       hinh: string;
//       gia_goc: number;
//     };
//   };
// }

// export default function ChiTietDonHangPage() {
//   const { id } = useParams();
//   const user = useUser();
//   const [donHang, setDonHang] = useState<IDonHang | null>(null);
//   const [chiTiet, setChiTiet] = useState<IChiTietDonHangMoRong[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [danhGia, setDanhGia] = useState({ sao: 5, noi_dung: '' });

//   useEffect(() => {
//     if (!user) return;
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     async function fetchChiTiet() {
//       try {
//         const res = await fetch(`/api/don_hang/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setDonHang(data.don_hang);
//           setChiTiet(data.chi_tiet);
//         } else toast.error(data.message || 'Không tải được đơn hàng');
//       } catch {
//         toast.error('Lỗi khi tải đơn hàng');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchChiTiet();
//   }, [id, user]);

//   async function handleGuiDanhGia() {
//     const token = localStorage.getItem('token');
//     if (!token || !user) return;

//     const res = await fetch('/api/danh_gia', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({
//         id_nguoi_dung: user.id,
//         id_bien_the: chiTiet[0]?.bien_the?.id,
//         sao: danhGia.sao,
//         noi_dung: danhGia.noi_dung,
//       }),
//     });

//     if (res.ok) {
//       toast.success('Cảm ơn bạn đã đánh giá!');
//       setDanhGia({ sao: 5, noi_dung: '' });
//     } else {
//       toast.error('Không thể gửi đánh giá');
//     }
//   }

//   if (loading)
//     return <p className="p-8 text-center text-gray-600">Đang tải chi tiết đơn hàng...</p>;

//   if (!donHang)
//     return <p className="p-8 text-center text-gray-600">Không tìm thấy đơn hàng</p>;

//   return (
//     <UserLayout user={user!}>
//       <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//         <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">
//           Chi tiết đơn hàng #{donHang.ma_don}
//         </h2>

//         <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
//           <p><strong>Ngày đặt:</strong> {new Date(donHang.ngay_tao).toLocaleString('vi-VN')}</p>
//           <p><strong>Trạng thái:</strong> {donHang.trang_thai}</p>
//           <p><strong>Người nhận:</strong> {donHang.ho_ten_nguoi_nhan}</p>
//           <p><strong>Điện thoại:</strong> {donHang.sdt_nguoi_nhan}</p>
//           <p className="col-span-2"><strong>Địa chỉ:</strong> {donHang.dia_chi_nguoi_nhan}</p>
//           {donHang.ghi_chu && <p className="col-span-2"><strong>Ghi chú:</strong> {donHang.ghi_chu}</p>}
//         </div>

//         <div className="border-t pt-4">
//           {chiTiet.map((sp) => (
//             <div key={sp.id} className="flex items-center gap-4 border-b pb-3 mb-3">
//               <img
//                 src={sp.bien_the?.san_pham?.hinh || '/noimg.png'}
//                 alt={sp.bien_the?.san_pham?.ten || ''}
//                 className="w-20 h-20 object-cover rounded-lg"
//               />
//               <div className="flex-1">
//                 <p className="font-medium">{sp.bien_the?.san_pham?.ten}</p>
//                 {sp.bien_the?.ten && (
//                   <p className="text-sm text-gray-500">Biến thể: {sp.bien_the.ten}</p>
//                 )}
//                 <p className="text-sm text-gray-500">Số lượng: {sp.so_luong}</p>
//               </div>
//               <p className="text-[#D33C3C] font-semibold">
//                 {sp.thanh_tien.toLocaleString('vi-VN')}₫
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="text-right mt-4 border-t pt-3">
//           <p>Tổng tiền hàng: {donHang.tong_tien_hang.toLocaleString('vi-VN')}₫</p>
//           <p>Giảm giá: -{donHang.so_tien_giam.toLocaleString('vi-VN')}₫</p>
//           <p className="text-lg font-semibold text-[#D33C3C]">
//             Tổng thanh toán: {donHang.so_tien_thanh_toan.toLocaleString('vi-VN')}₫
//           </p>
//         </div>

//         {donHang.trang_thai === 'da_giao' && (
//           <div className="mt-8 border-t pt-5">
//             <h3 className="font-semibold text-lg mb-3 text-[#6A0A0A]">Đánh giá đơn hàng</h3>
//             <div className="flex gap-2 mb-3">
//               {[1, 2, 3, 4, 5].map((s) => (
//                 <Star
//                   key={s}
//                   size={24}
//                   onClick={() => setDanhGia({ ...danhGia, sao: s })}
//                   className={`cursor-pointer ${
//                     danhGia.sao >= s ? 'fill-[#FFD700] text-[#FFD700]' : 'text-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//             <textarea
//               value={danhGia.noi_dung}
//               onChange={(e) => setDanhGia({ ...danhGia, noi_dung: e.target.value })}
//               className="w-full border rounded-lg p-2 h-24 text-sm"
//               placeholder="Hãy chia sẻ cảm nhận của bạn..."
//             />
//             <div className="text-right mt-3">
//               <button
//                 onClick={handleGuiDanhGia}
//                 className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg hover:bg-[#b22f2f]"
//               >
//                 Gửi đánh giá
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </UserLayout>
//   );
// }
