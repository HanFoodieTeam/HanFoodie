// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import UserLayout from '@/app/components/UserLayout';
// import { IDonHang, TrangThaiDonHang } from '@/app/lib/cautrucdata';

// interface IUser {
//   id: number;
//   ho_ten: string;
//   email: string;
//   hinh?: string | null;
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
//   const [user, setUser] = useState<IUser | null>(null);
//   const [donHang, setDonHang] = useState<IDonHang[]>([]);
//   const [tab, setTab] = useState<'tat_ca' | TrangThaiDonHang>('tat_ca');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   // 🟢 Lấy thông tin người dùng từ token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/dang-nhap');
//       return;
//     }

//     async function fetchUser() {
//       try {
//         const res = await fetch('/api/ho_so', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok && data.nguoi_dung) {
//           setUser(data.nguoi_dung);
//         } else {
//           console.warn('❌ Không lấy được thông tin user', data);
//           router.push('/dang-nhap');
//         }
//       } catch (err) {
//         console.error('🔥 Lỗi lấy hồ sơ:', err);
//       }
//     }

//     fetchUser();
//   }, [router]);

//   // 🟢 Lấy danh sách đơn hàng theo trạng thái
//   useEffect(() => {
//     if (!user) return;
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     async function fetchDonHang() {
//       setLoading(true);
//       const query = tab === 'tat_ca' ? '' : `?trang_thai=${tab}`;
//       try {
//         const res = await fetch(`/api/don_hang${query}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data: IDonHang[] = await res.json();
//         if (res.ok) {
//           setDonHang(data);
//         } else {
//           setDonHang([]);
//         }
//       } catch (err) {
//         console.error('🔥 Lỗi khi tải đơn hàng:', err);
//         setDonHang([]);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDonHang();
//   }, [tab, user]);

//   if (!user)
//     return (
//       <p className="p-8 text-center text-gray-600">
//         Đang tải thông tin người dùng...
//       </p>
//     );

//   return (
//     <UserLayout user={user}>
//       <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
//         <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">
//           Đơn Hàng Của Tôi
//         </h2>

//         {/* Tabs trạng thái */}
//         <div className="flex space-x-6 border-b pb-2 mb-6">
//           {TRANG_THAI.map((t) => (
//             <button
//               key={t.key}
//               onClick={() => setTab(t.key)}
//               className={`pb-2 font-medium border-b-2 transition ${
//                 tab === t.key
//                   ? 'text-[#D33C3C] border-[#D33C3C]'
//                   : 'text-gray-500 border-transparent hover:text-[#D33C3C]'
//               }`}
//             >
//               {t.label}
//             </button>
//           ))}
//         </div>

//         {/* Nội dung hiển thị */}
//         {loading ? (
//           <p className="text-center text-gray-500">Đang tải đơn hàng...</p>
//         ) : donHang.length === 0 ? (
//           <p className="text-gray-600 italic">Không có đơn hàng nào.</p>
//         ) : (
//           <div className="space-y-4">
//             {donHang.map((dh) => (
//               <div
//                 key={dh.id}
//                 className="border rounded-lg bg-white shadow-sm p-5 flex justify-between items-start hover:shadow-md transition"
//               >
//                 <div>
//                   <p className="font-semibold text-[#6A0A0A]">
//                     Mã đơn: {dh.ma_don}
//                   </p>
//                   <p className="text-gray-600">
//                     Ngày đặt:{' '}
//                     {new Date(dh.ngay_tao).toLocaleDateString('vi-VN')}
//                   </p>
//                   <p className="text-gray-700">
//                     Tổng tiền: {dh.so_tien_thanh_toan.toLocaleString()}₫
//                   </p>
//                   <p className="text-gray-500 text-sm">
//                     Phương thức:{' '}
//                     {dh.phuong_thuc_thanh_toan
//                         ? 'Thanh toán khi nhận hàng'
//                         : 'Thanh toán online'}
//                     </p>

//                 </div>

//                 <span
//                   className={`px-3 py-1 text-sm rounded-lg font-medium ${
//                     dh.trang_thai === 'cho_xac_nhan'
//                       ? 'bg-gray-100 text-gray-700'
//                       : dh.trang_thai === 'da_xac_nhan'
//                       ? 'bg-blue-100 text-blue-700'
//                       : dh.trang_thai === 'dang_giao'
//                       ? 'bg-yellow-100 text-yellow-700'
//                       : dh.trang_thai === 'da_giao'
//                       ? 'bg-green-100 text-green-700'
//                       : dh.trang_thai === 'da_huy'
//                       ? 'bg-red-100 text-red-700'
//                       : 'bg-gray-50 text-gray-600'
//                   }`}
//                 >
//                   {TRANG_THAI.find((t) => t.key === dh.trang_thai)?.label ??
//                     'Không xác định'}
//                 </span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </UserLayout>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import UserLayout from '@/app/components/UserLayout';
import { IDonHang, TrangThaiDonHang } from '@/app/lib/cautrucdata';
import { useUser } from '@/app/hooks/useUser';

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
  const [donHang, setDonHang] = useState<IDonHang[]>([]);
  const [tab, setTab] = useState<'tat_ca' | TrangThaiDonHang>('tat_ca');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('token');
    if (!token) return;

    async function fetchDonHang() {
      setLoading(true);
      const query = tab === 'tat_ca' ? '' : `?trang_thai=${tab}`;
      const res = await fetch(`/api/don_hang${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDonHang(res.ok ? data : []);
      setLoading(false);
    }

    fetchDonHang();
  }, [tab, user]);

  if (!user)
    return <p className="p-8 text-center text-gray-600">Đang tải...</p>;

  return (
    <UserLayout user={user}>
      <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">Đơn Hàng Của Tôi</h2>

      <div className="flex space-x-6 border-b pb-2 mb-6">
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
        donHang.map((dh) => (
          <div key={dh.id} className="border p-4 rounded-lg bg-white shadow-sm mb-3">
            <p className="font-semibold text-[#6A0A0A]">Mã đơn: {dh.ma_don}</p>
            <p>Ngày đặt: {new Date(dh.ngay_tao).toLocaleDateString('vi-VN')}</p>
            <p>Tổng tiền: {dh.so_tien_thanh_toan.toLocaleString()}₫</p>
            <p className="text-sm text-gray-600">
              {dh.phuong_thuc_thanh_toan ? 'Thanh toán khi nhận hàng' : 'Online'}
            </p>
          </div>
        ))
      )}
    </UserLayout>
  );
}
