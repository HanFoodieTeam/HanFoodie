// // // 'use client';

// // // import { useEffect, useState } from 'react';
// // // import { useRouter } from 'next/navigation';
// // // import UserLayout from '@/app/components/UserLayout';
// // // import { IDonHang, TrangThaiDonHang } from '@/app/lib/cautrucdata';

// // // interface IUser {
// // //   id: number;
// // //   ho_ten: string;
// // //   email: string;
// // //   hinh?: string | null;
// // // }

// // // const TRANG_THAI: { key: 'tat_ca' | TrangThaiDonHang; label: string }[] = [
// // //   { key: 'tat_ca', label: 'Tất cả' },
// // //   { key: 'cho_xac_nhan', label: 'Chờ xác nhận' },
// // //   { key: 'da_xac_nhan', label: 'Đã xác nhận' },
// // //   { key: 'dang_giao', label: 'Đang giao' },
// // //   { key: 'da_giao', label: 'Đã giao' },
// // //   { key: 'da_huy', label: 'Đã hủy' },
// // // ];

// // // export default function DonHangPage() {
// // //   const [user, setUser] = useState<IUser | null>(null);
// // //   const [donHang, setDonHang] = useState<IDonHang[]>([]);
// // //   const [tab, setTab] = useState<'tat_ca' | TrangThaiDonHang>('tat_ca');
// // //   const [loading, setLoading] = useState(false);
// // //   const router = useRouter();

// // //   // 🟢 Lấy thông tin người dùng từ token
// // //   useEffect(() => {
// // //     const token = localStorage.getItem('token');
// // //     if (!token) {
// // //       router.push('/dang-nhap');
// // //       return;
// // //     }

// // //     async function fetchUser() {
// // //       try {
// // //         const res = await fetch('/api/ho_so', {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });
// // //         const data = await res.json();
// // //         if (res.ok && data.nguoi_dung) {
// // //           setUser(data.nguoi_dung);
// // //         } else {
// // //           console.warn('❌ Không lấy được thông tin user', data);
// // //           router.push('/dang-nhap');
// // //         }
// // //       } catch (err) {
// // //         console.error('🔥 Lỗi lấy hồ sơ:', err);
// // //       }
// // //     }

// // //     fetchUser();
// // //   }, [router]);

// // //   // 🟢 Lấy danh sách đơn hàng theo trạng thái
// // //   useEffect(() => {
// // //     if (!user) return;
// // //     const token = localStorage.getItem('token');
// // //     if (!token) return;

// // //     async function fetchDonHang() {
// // //       setLoading(true);
// // //       const query = tab === 'tat_ca' ? '' : `?trang_thai=${tab}`;
// // //       try {
// // //         const res = await fetch(`/api/don_hang${query}`, {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });

// // //         const data: IDonHang[] = await res.json();
// // //         if (res.ok) {
// // //           setDonHang(data);
// // //         } else {
// // //           setDonHang([]);
// // //         }
// // //       } catch (err) {
// // //         console.error('🔥 Lỗi khi tải đơn hàng:', err);
// // //         setDonHang([]);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     }

// // //     fetchDonHang();
// // //   }, [tab, user]);

// // //   if (!user)
// // //     return (
// // //       <p className="p-8 text-center text-gray-600">
// // //         Đang tải thông tin người dùng...
// // //       </p>
// // //     );

// // //   return (
// // //     <UserLayout user={user}>
// // //       <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
// // //         <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">
// // //           Đơn Hàng Của Tôi
// // //         </h2>

// // //         {/* Tabs trạng thái */}
// // //         <div className="flex space-x-6 border-b pb-2 mb-6">
// // //           {TRANG_THAI.map((t) => (
// // //             <button
// // //               key={t.key}
// // //               onClick={() => setTab(t.key)}
// // //               className={`pb-2 font-medium border-b-2 transition ${
// // //                 tab === t.key
// // //                   ? 'text-[#D33C3C] border-[#D33C3C]'
// // //                   : 'text-gray-500 border-transparent hover:text-[#D33C3C]'
// // //               }`}
// // //             >
// // //               {t.label}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         {/* Nội dung hiển thị */}
// // //         {loading ? (
// // //           <p className="text-center text-gray-500">Đang tải đơn hàng...</p>
// // //         ) : donHang.length === 0 ? (
// // //           <p className="text-gray-600 italic">Không có đơn hàng nào.</p>
// // //         ) : (
// // //           <div className="space-y-4">
// // //             {donHang.map((dh) => (
// // //               <div
// // //                 key={dh.id}
// // //                 className="border rounded-lg bg-white shadow-sm p-5 flex justify-between items-start hover:shadow-md transition"
// // //               >
// // //                 <div>
// // //                   <p className="font-semibold text-[#6A0A0A]">
// // //                     Mã đơn: {dh.ma_don}
// // //                   </p>
// // //                   <p className="text-gray-600">
// // //                     Ngày đặt:{' '}
// // //                     {new Date(dh.ngay_tao).toLocaleDateString('vi-VN')}
// // //                   </p>
// // //                   <p className="text-gray-700">
// // //                     Tổng tiền: {dh.so_tien_thanh_toan.toLocaleString()}₫
// // //                   </p>
// // //                   <p className="text-gray-500 text-sm">
// // //                     Phương thức:{' '}
// // //                     {dh.phuong_thuc_thanh_toan
// // //                         ? 'Thanh toán khi nhận hàng'
// // //                         : 'Thanh toán online'}
// // //                     </p>

// // //                 </div>

// // //                 <span
// // //                   className={`px-3 py-1 text-sm rounded-lg font-medium ${
// // //                     dh.trang_thai === 'cho_xac_nhan'
// // //                       ? 'bg-gray-100 text-gray-700'
// // //                       : dh.trang_thai === 'da_xac_nhan'
// // //                       ? 'bg-blue-100 text-blue-700'
// // //                       : dh.trang_thai === 'dang_giao'
// // //                       ? 'bg-yellow-100 text-yellow-700'
// // //                       : dh.trang_thai === 'da_giao'
// // //                       ? 'bg-green-100 text-green-700'
// // //                       : dh.trang_thai === 'da_huy'
// // //                       ? 'bg-red-100 text-red-700'
// // //                       : 'bg-gray-50 text-gray-600'
// // //                   }`}
// // //                 >
// // //                   {TRANG_THAI.find((t) => t.key === dh.trang_thai)?.label ??
// // //                     'Không xác định'}
// // //                 </span>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </UserLayout>
// // //   );
// // // }
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import UserLayout from '@/app/components/UserLayout';
// // import { IDonHang, TrangThaiDonHang } from '@/app/lib/cautrucdata';
// // import { useUser } from '@/app/hooks/useUser';

// // const TRANG_THAI: { key: 'tat_ca' | TrangThaiDonHang; label: string }[] = [
// //   { key: 'tat_ca', label: 'Tất cả' },
// //   { key: 'cho_xac_nhan', label: 'Chờ xác nhận' },
// //   { key: 'da_xac_nhan', label: 'Đã xác nhận' },
// //   { key: 'dang_giao', label: 'Đang giao' },
// //   { key: 'da_giao', label: 'Đã giao' },
// //   { key: 'da_huy', label: 'Đã hủy' },
// // ];

// // export default function DonHangPage() {
// //   const user = useUser();
// //   const [donHang, setDonHang] = useState<IDonHang[]>([]);
// //   const [tab, setTab] = useState<'tat_ca' | TrangThaiDonHang>('tat_ca');
// //   const [loading, setLoading] = useState(false);

// //   const [ghiChu, setGhiChu] = useState<string>("");


// //   useEffect(() => {
// //     if (!user) return;
// //     const token = localStorage.getItem('token');
// //     if (!token) return;

// //     async function fetchDonHang() {
// //       setLoading(true);
// //       const query = tab === 'tat_ca' ? '' : `?trang_thai=${tab}`;
// //       const res = await fetch(`/api/don_hang${query}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const data = await res.json();
// //       setDonHang(res.ok ? data : []);
// //       setLoading(false);
// //     }

// //     fetchDonHang();
// //   }, [tab, user]);

// //   if (!user)
// //     return <p className="p-8 text-center text-gray-600">Đang tải...</p>;

// //   return (
// //     <UserLayout user={user}>
// //       <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">Đơn Hàng Của Tôi</h2>

// //       <div className="flex space-x-6 border-b pb-2 mb-6">
// //         {TRANG_THAI.map((t) => (
// //           <button
// //             key={t.key}
// //             onClick={() => setTab(t.key)}
// //             className={`pb-2 font-medium border-b-2 transition ${
// //               tab === t.key
// //                 ? 'text-[#D33C3C] border-[#D33C3C]'
// //                 : 'text-gray-500 border-transparent hover:text-[#D33C3C]'
// //             }`}
// //           >
// //             {t.label}
// //           </button>
// //         ))}
// //       </div>

// //       {loading ? (
// //         <p className="text-center text-gray-500">Đang tải đơn hàng...</p>
// //       ) : donHang.length === 0 ? (
// //         <p className="text-gray-600 italic">Không có đơn hàng nào.</p>
// //       ) : (
// //         donHang.map((dh) => (
// //           <div key={dh.id} className="border p-4 rounded-lg bg-white shadow-sm mb-3">
// //             <p className="font-semibold text-[#6A0A0A]">Mã đơn: {dh.ma_don}</p>
// //             <p>Ngày đặt: {new Date(dh.ngay_tao).toLocaleDateString('vi-VN')}</p>
// //             <p>Tổng tiền: {dh.so_tien_thanh_toan.toLocaleString()}₫</p>
// //             <p className="text-sm text-gray-600">
// //               {dh.phuong_thuc_thanh_toan ? 'Thanh toán khi nhận hàng' : 'Online'}
// //             </p>
// //           </div>
// //         ))
// //       )}
// //     </UserLayout>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { IDonHang, TrangThaiDonHang } from '@/app/lib/cautrucdata';
// import UserLayout from '@/app/components/UserLayout';
// import { useUser } from '@/app/hooks/useUser';
// import Image from 'next/image';

// interface ISanPhamDonHang {
//   id: number;
//   ten: string;
//   hinh: string;
//   gia: number;
//   so_luong: number;
//   ten_bien_the?: string;
//   gia_them?: number;
//   id_bien_the?: number;
//   json_tuy_chon?: Record<string, string>;
//   json_mon_them?: { ten: string; gia: number }[];
// }

// interface IDonHangTam {
//   id_bien_the: number;
//   ten: string;
//   hinh: string;
//   gia: number;
//   so_luong: number;
//   json_tuy_chon: Record<string, string>;
//   json_mon_them: { ten: string; gia: number }[];
// }

// const TRANG_THAI: { key: 'tat_ca' | TrangThaiDonHang; label: string }[] = [
//   { key: 'tat_ca', label: 'Tất cả' },
//   { key: 'cho_xac_nhan', label: 'Chờ xác nhận' },
//   { key: 'da_xac_nhan', label: 'Đã xác nhận' },
//   { key: 'dang_giao', label: 'Đang giao' },
//   { key: 'da_giao', label: 'Đã giao' },
//   { key: 'da_huy', label: 'Đã hủy' },
// ];

// export default function DonHangPage() {
//   const user = useUser();
//   const router = useRouter();
//   const [donHang, setDonHang] = useState<IDonHang[]>([]);
//   const [tab, setTab] = useState<'tat_ca' | TrangThaiDonHang>('tat_ca');
//   const [loading, setLoading] = useState(false);

//   // --- Fetch danh sách đơn hàng ---
//   useEffect(() => {
//     if (!user) return;
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     async function fetchDonHang() {
//       try {
//         setLoading(true);
//         const query = tab === 'tat_ca' ? '' : `?trang_thai=${tab}`;
//         const res = await fetch(`/api/don_hang${query}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data: IDonHang[] = await res.json();
//         setDonHang(res.ok ? data : []);
//       } catch (error) {
//         console.error('Lỗi tải đơn hàng:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDonHang();
//   }, [tab, user]);

//   // --- Mua lại ---
//   const handleMuaLai = (don: IDonHang) => {
//     // kiểm tra runtime xem có field danh_sach_san_pham không
//     if (!('danh_sach_san_pham' in don)) return;
//     const dsSanPham = (don as { danh_sach_san_pham: ISanPhamDonHang[] }).danh_sach_san_pham;

//     if (!Array.isArray(dsSanPham) || dsSanPham.length === 0) return;

//     const danhSachTam: IDonHangTam[] = dsSanPham.map((sp) => ({
//       id_bien_the: sp.id_bien_the ?? sp.id,
//       ten: sp.ten,
//       hinh: sp.hinh,
//       gia: sp.gia_them ? sp.gia + sp.gia_them : sp.gia,
//       so_luong: sp.so_luong,
//       json_tuy_chon: sp.json_tuy_chon ?? {},
//       json_mon_them: sp.json_mon_them ?? [],
//     }));

//     localStorage.setItem('donHangTam', JSON.stringify(danhSachTam));
//     router.push('/dat_hang');
//   };

//   // --- Hủy đơn hàng ---
//   const handleHuyDon = async (id: number) => {
//     if (!confirm('Bạn có chắc muốn hủy đơn này không?')) return;
//     const token = localStorage.getItem('token');
//     try {
//       const res = await fetch(`/api/don_hang/huy?id=${id}`, {
//         method: 'PUT',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.ok) {
//         alert('Đã hủy đơn hàng thành công');
//         setDonHang((prev) =>
//           prev.map((d) => (d.id === id ? { ...d, trang_thai: 'da_huy' } : d)),
//         );
//       } else {
//         alert('Không thể hủy đơn hàng');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Lỗi kết nối máy chủ');
//     }
//   };

//   if (!user) return <p className="p-8 text-center text-gray-600">Đang tải...</p>;

//   return (
//     <UserLayout user={user}>
//       <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">Đơn Hàng Của Tôi</h2>

//       {/* Tabs */}
//       <div className="flex space-x-6 border-b pb-2 mb-6 overflow-x-auto">
//         {TRANG_THAI.map((t) => (
//           <button
//             key={t.key}
//             onClick={() => setTab(t.key)}
//             className={`pb-2 font-medium border-b-2 transition ${
//               tab === t.key
//                 ? 'text-[#D33C3C] border-[#D33C3C]'
//                 : 'text-gray-500 border-transparent hover:text-[#D33C3C]'
//             }`}
//           >
//             {t.label}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-500">Đang tải đơn hàng...</p>
//       ) : donHang.length === 0 ? (
//         <p className="text-gray-600 italic">Không có đơn hàng nào.</p>
//       ) : (
//         donHang.map((dh) => {
//           // Thu hẹp kiểu ở đây luôn
//           const dsSanPham =
//             'danh_sach_san_pham' in dh && Array.isArray(dh.danh_sach_san_pham)
//               ? dh.danh_sach_san_pham as ISanPhamDonHang[]
//               : [];

//           return (
//             <div
//               key={dh.id}
//               className="border p-4 rounded-xl bg-white shadow-sm mb-4 hover:shadow-md transition"
//             >
//               <div className="flex justify-between items-center mb-2">
//                 <p className="font-semibold text-[#6A0A0A]">Mã đơn: {dh.ma_don}</p>
//                 <span
//                   className={`text-sm font-medium px-3 py-1 rounded-full ${
//                     dh.trang_thai === 'da_huy'
//                       ? 'bg-gray-200 text-gray-600'
//                       : dh.trang_thai === 'da_giao'
//                       ? 'bg-green-100 text-green-700'
//                       : dh.trang_thai === 'dang_giao'
//                       ? 'bg-blue-100 text-blue-700'
//                       : 'bg-yellow-100 text-yellow-700'
//                   }`}
//                 >
//                   {TRANG_THAI.find((t) => t.key === dh.trang_thai)?.label || 'Đang xử lý'}
//                 </span>
//               </div>

//               <p className="text-sm text-gray-600 mb-3">
//                 Ngày đặt: {new Date(dh.ngay_tao).toLocaleDateString('vi-VN')}
//               </p>

//               {/* Danh sách sản phẩm */}
//               <div className="space-y-2">
//                 {dsSanPham.map((sp, i) => (
//                   <div
//                     key={i}
//                     className="flex items-start gap-4 border rounded-lg p-3 hover:bg-gray-50 transition"
//                   >
//                     <Image
//                       src={sp.hinh || '/noing.png'}
//                       alt={sp.ten}
//                       width={80}
//                       height={80}
//                       className="rounded-lg object-cover"
//                     />
//                     <div className="flex-1">
//                       <p className="font-medium">{sp.ten}</p>
//                       {sp.ten_bien_the && (
//                         <p className="text-sm text-gray-600">{sp.ten_bien_the}</p>
//                       )}
//                       {sp.json_mon_them && sp.json_mon_them.length > 0 && (
//                         <p className="text-sm text-gray-600">
//                           {sp.json_mon_them.map((m) => m.ten).join(', ')}
//                         </p>
//                       )}
//                       <p className="text-sm text-gray-500">Số lượng: {sp.so_luong}</p>
//                     </div>
//                     <p className="text-[#e8594f] font-semibold text-sm">
//                       {(sp.gia * sp.so_luong).toLocaleString('vi-VN')}₫
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-between items-center mt-3 border-t pt-3">
//                 <p className="text-gray-700 font-medium">
//                   Tổng thanh toán:{' '}
//                   <span className="text-[#e8594f] font-semibold">
//                     {dh.so_tien_thanh_toan.toLocaleString('vi-VN')}₫
//                   </span>
//                 </p>

//                 <div className="flex gap-2">
//                   {(dh.trang_thai === 'cho_xac_nhan' ||
//                     dh.trang_thai === 'da_xac_nhan') && (
//                     <button
//                       onClick={() => handleHuyDon(dh.id)}
//                       className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100"
//                     >
//                       Hủy đơn
//                     </button>
//                   )}

//                   <button
//                     onClick={() => router.push(`/donhang/${dh.ma_don}`)}
//                     className="px-3 py-1 border rounded-lg text-blue-600 hover:bg-blue-50"
//                   >
//                     Xem chi tiết
//                   </button>

//                   {(dh.trang_thai === 'da_giao' || dh.trang_thai === 'da_huy') && (
//                     <button
//                       onClick={() => handleMuaLai(dh)}
//                       className="px-3 py-1 rounded-lg bg-[#e8594f] text-white hover:bg-[#d94b42] transition"
//                     >
//                       Mua lại
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           );
//         })
//       )}
//     </UserLayout>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IDonHang, TrangThaiDonHang } from '@/app/lib/cautrucdata';
import UserLayout from '@/app/components/UserLayout';
import { useUser } from '@/app/hooks/useUser';
import Image from 'next/image';

interface ISanPhamDonHang {
  id: number;
  ten: string;
  hinh: string;
  gia: number;
  so_luong: number;
  ten_bien_the?: string;
  gia_them?: number;
  id_bien_the?: number;
  json_tuy_chon?: Record<string, string>;
  json_mon_them?: { ten: string; gia: number }[];
}

interface IDonHangTam {
  id: number;
  id_gio_hang: number;
  so_luong: number;
  bien_the?: {
    id: number;
    ten: string;
    gia_them?: number;
    san_pham?: {
      ten: string;
      hinh?: string;
      gia_goc?: number;
    };
  };
  json_mon_them?: { ten: string; gia_them?: number }[];
  json_tuy_chon?: Record<string, string>;
}

const TRANG_THAI: { key: 'tat_ca' | TrangThaiDonHang; label: string }[] = [
  { key: 'tat_ca', label: 'Tất cả' },
  { key: 'cho_xac_nhan', label: 'Chờ xác nhận' },
  { key: 'da_xac_nhan', label: 'Đã xác nhận' },
  { key: 'dang_giao', label: 'Đang giao' },
  { key: 'da_giao', label: 'Đã giao' },
  { key: 'da_huy', label: 'Đã hủy' },
];

export default function DonHangPage() {
  const user = useUser();
  const router = useRouter();
  const [donHang, setDonHang] = useState<IDonHang[]>([]);
  const [tab, setTab] = useState<'tat_ca' | TrangThaiDonHang>('tat_ca');
  const [loading, setLoading] = useState(false);

  // --- Fetch danh sách đơn hàng ---
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('token');
    if (!token) return;

    async function fetchDonHang() {
      try {
        setLoading(true);
        const query = tab === 'tat_ca' ? '' : `?trang_thai=${tab}`;
        const res = await fetch(`/api/don_hang${query}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data: IDonHang[] = await res.json();
        setDonHang(res.ok ? data : []);
      } catch (error) {
        console.error('Lỗi tải đơn hàng:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDonHang();
  }, [tab, user]);

  // --- Mua lại ---
  const handleMuaLai = (don: IDonHang) => {
    if (!('danh_sach_san_pham' in don)) {
      console.warn('Đơn hàng không có danh sách sản phẩm.');
      return;
    }

    const dsSanPham = (don as { danh_sach_san_pham: ISanPhamDonHang[] }).danh_sach_san_pham;
    if (!Array.isArray(dsSanPham) || dsSanPham.length === 0) return;

    const danhSachTam: IDonHangTam[] = dsSanPham.map((sp, index) => ({
      id: sp.id,
      id_gio_hang: sp.id_bien_the ?? sp.id ?? index,
      so_luong: sp.so_luong,
      bien_the: {
        id: sp.id_bien_the ?? sp.id,
        ten: sp.ten_bien_the ?? '',
        gia_them: sp.gia_them ?? 0,
        san_pham: {
          ten: sp.ten,
          hinh: sp.hinh,
          gia_goc: sp.gia,
        },
      },
      json_mon_them: sp.json_mon_them ?? [],
      json_tuy_chon: sp.json_tuy_chon ?? {},
    }));

    localStorage.setItem('donHangTam', JSON.stringify(danhSachTam));
    router.push('/dat_hang');
  };

  // --- Hủy đơn hàng ---
  const handleHuyDon = async (id: number) => {
    if (!confirm('Bạn có chắc muốn hủy đơn này không?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/don_hang/huy?id=${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert('Đã hủy đơn hàng thành công');
        setDonHang((prev) =>
          prev.map((d) => (d.id === id ? { ...d, trang_thai: 'da_huy' } : d)),
        );
      } else {
        alert('Không thể hủy đơn hàng');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối máy chủ');
    }
  };

  if (!user) return <p className="p-8 text-center text-gray-600">Đang tải...</p>;

  return (
    <UserLayout user={user}>
      <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">Đơn Hàng Của Tôi</h2>

      {/* Tabs */}
      <div className="flex space-x-6 border-b pb-2 mb-6 overflow-x-auto">
        {TRANG_THAI.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pb-2 font-medium border-b-2 transition ${
              tab === t.key
                ? 'text-[#D33C3C] border-[#D33C3C]'
                : 'text-gray-500 border-transparent hover:text-[#D33C3C]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Đang tải đơn hàng...</p>
      ) : donHang.length === 0 ? (
        <p className="text-gray-600 italic">Không có đơn hàng nào.</p>
      ) : (
        donHang.map((dh) => {
          const dsSanPham =
            'danh_sach_san_pham' in dh && Array.isArray(dh.danh_sach_san_pham)
              ? (dh.danh_sach_san_pham as ISanPhamDonHang[])
              : [];

          return (
            <div
              key={dh.id}
              className="border p-4 rounded-xl bg-white shadow-sm mb-4 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-[#6A0A0A]">Mã đơn: {dh.ma_don}</p>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    dh.trang_thai === 'da_huy'
                      ? 'bg-gray-200 text-gray-600'
                      : dh.trang_thai === 'da_giao'
                      ? 'bg-green-100 text-green-700'
                      : dh.trang_thai === 'dang_giao'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {TRANG_THAI.find((t) => t.key === dh.trang_thai)?.label || 'Đang xử lý'}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                Ngày đặt: {new Date(dh.ngay_tao).toLocaleDateString('vi-VN')}
              </p>

              {/* Danh sách sản phẩm */}
              <div className="space-y-2">
                {dsSanPham.map((sp, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 border rounded-lg p-3 hover:bg-gray-50 transition"
                  >
                    <Image
                      src={sp.hinh || '/noing.png'}
                      alt={sp.ten}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{sp.ten}</p>
                      {sp.ten_bien_the && (
                        <p className="text-sm text-gray-600">{sp.ten_bien_the}</p>
                      )}
                      {sp.json_mon_them && sp.json_mon_them.length > 0 && (
                        <p className="text-sm text-gray-600">
                          {sp.json_mon_them.map((m) => m.ten).join(', ')}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">Số lượng: {sp.so_luong}</p>
                    </div>
                    <p className="text-[#e8594f] font-semibold text-sm">
                      {(sp.gia * sp.so_luong).toLocaleString('vi-VN')}₫
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-3 border-t pt-3">
                <p className="text-gray-700 font-medium">
                  Tổng thanh toán:{' '}
                  <span className="text-[#e8594f] font-semibold">
                    {dh.so_tien_thanh_toan.toLocaleString('vi-VN')}₫
                  </span>
                </p>

                <div className="flex gap-2">
                  {(dh.trang_thai === 'cho_xac_nhan' ||
                    dh.trang_thai === 'da_xac_nhan') && (
                    <button
                      onClick={() => handleHuyDon(dh.id)}
                      className="px-3 py-1 border rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                      Hủy đơn
                    </button>
                  )}

                  <button
                    onClick={() => router.push(`/donhang/${dh.ma_don}`)}
                    className="px-3 py-1 border rounded-lg text-blue-600 hover:bg-blue-50"
                  >
                    Xem chi tiết
                  </button>

                  {(dh.trang_thai === 'da_giao' || dh.trang_thai === 'da_huy') && (
                    <button
                      onClick={() => handleMuaLai(dh)}
                      className="px-3 py-1 rounded-lg bg-[#e8594f] text-white hover:bg-[#d94b42] transition"
                    >
                      Mua lại
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </UserLayout>
  );
}
