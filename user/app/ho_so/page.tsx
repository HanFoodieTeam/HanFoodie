// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';

// // interface UserInfo {
// //   ho_ten: string;
// //   email: string;
// //   sdt: string | number;
// //   gioi_tinh?: string;
// //   ngay_sinh?: string;
// //   hinh_dai_dien?: string;
// // }

// // export default function HoSoPage() {
// //   const [user, setUser] = useState<UserInfo | null>(null);
// //   const router = useRouter();

// //   useEffect(() => {
// //     const token = sessionStorage.getItem('token');
// //     const email = sessionStorage.getItem('email');
// //     const ho_ten = sessionStorage.getItem('ho_ten');
// //     const sdt = sessionStorage.getItem('sdt');

// //     if (!token) {
// //       alert('Bạn cần đăng nhập để xem hồ sơ');
// //       router.push('/dang-nhap');
// //       return;
// //     }

// //     setUser({
// //       ho_ten: ho_ten || '',
// //       email: email || '',
// //       sdt: sdt || '',
// //       gioi_tinh: 'Nam',
// //       ngay_sinh: '',
// //       hinh_dai_dien: '',
// //     });
// //   }, [router]);

// //   return (
// //     <div className="flex w-full min-h-screen bg-gray-50">
// //       {/* Sidebar */}
// //       <aside className="w-[25%] md:w-[20%] bg-white shadow-md border-r">
// //         <div className="flex flex-col items-center mt-6">
// //           <div className="w-24 h-24 bg-emerald-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
// //             {user?.ho_ten ? user.ho_ten.charAt(0).toUpperCase() : 'U'}
// //           </div>
// //           <p className="mt-3 font-semibold text-gray-700">{user?.ho_ten}</p>
// //         </div>

// //         <div className="mt-8 px-4">
// //           <ul className="space-y-3 text-gray-700">
// //             <li className="font-semibold border-b pb-2">Tài Khoản Của Tôi</li>
// //             <li className="cursor-pointer hover:text-emerald-500">Hồ Sơ</li>
// //             <li className="cursor-pointer hover:text-emerald-500">Ngân Hàng</li>
// //             <li className="cursor-pointer hover:text-emerald-500">Địa Chỉ</li>
// //             <li className="cursor-pointer hover:text-emerald-500">Đổi Mật Khẩu</li>
// //           </ul>

// //           <hr className="my-5" />

// //           <ul className="space-y-3 text-gray-700">
// //             <li className="cursor-pointer hover:text-emerald-500">Đơn hàng</li>
// //             <li className="cursor-pointer hover:text-emerald-500">Vouchers</li>
// //           </ul>
// //         </div>
// //       </aside>

// //       {/* Main Content */}
// //       <main className="flex-1 p-8">
// //         <h2 className="text-2xl font-bold text-gray-800">Thông Tin Hồ Sơ</h2>
// //         <p className="text-gray-500 mb-6">Quản lý thông tin cá nhân</p>

// //         {user ? (
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
// //             {/* Thông tin cơ bản */}
// //             <div className="md:col-span-2 space-y-4">
// //               <div>
// //                 <label className="block font-medium">Tên đăng nhập</label>
// //                 <input
// //                   type="text"
// //                   value={user.email.split('@')[0]}
// //                   disabled
// //                   className="w-full border rounded p-2 mt-1 bg-gray-100"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block font-medium">Tên</label>
// //                 <input
// //                   type="text"
// //                   value={user.ho_ten}
// //                   disabled
// //                   className="w-full border rounded p-2 mt-1 bg-gray-100"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block font-medium">Email</label>
// //                 <div className="flex items-center gap-2">
// //                   <input
// //                     type="email"
// //                     value={user.email}
// //                     disabled
// //                     className="w-full border rounded p-2 mt-1 bg-gray-100"
// //                   />
// //                   <span className="text-emerald-600 text-sm cursor-pointer">
// //                     Thay đổi
// //                   </span>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block font-medium">Số điện thoại</label>
// //                 <div className="flex items-center gap-2">
// //                   <input
// //                     type="text"
// //                     value={user.sdt}
// //                     disabled
// //                     className="w-full border rounded p-2 mt-1 bg-gray-100"
// //                   />
// //                   <span className="text-emerald-600 text-sm cursor-pointer">
// //                     Thay đổi
// //                   </span>
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block font-medium mb-2">Giới tính</label>
// //                 <div className="flex gap-6">
// //                   {['Nam', 'Nữ', 'Khác'].map((gt) => (
// //                     <label key={gt} className="flex items-center gap-1">
// //                       <input
// //                         type="radio"
// //                         name="gioitinh"
// //                         value={gt}
// //                         checked={user.gioi_tinh === gt}
// //                         readOnly
// //                       />
// //                       <span>{gt}</span>
// //                     </label>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block font-medium mb-2">Ngày sinh</label>
// //                 <div className="flex gap-3">
// //                   <input
// //                     type="text"
// //                     placeholder="Ngày"
// //                     className="w-1/3 border rounded p-2 bg-gray-100"
// //                     disabled
// //                   />
// //                   <input
// //                     type="text"
// //                     placeholder="Tháng"
// //                     className="w-1/3 border rounded p-2 bg-gray-100"
// //                     disabled
// //                   />
// //                   <input
// //                     type="text"
// //                     placeholder="Năm"
// //                     className="w-1/3 border rounded p-2 bg-gray-100"
// //                     disabled
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Ảnh đại diện */}
// //             <div className="flex flex-col items-center justify-start">
// //               <div className="w-32 h-32 bg-orange-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
// //                 {user?.ho_ten ? user.ho_ten.charAt(0).toUpperCase() : 'A'}
// //               </div>
// //               <button className="mt-4 border px-4 py-1 rounded text-sm hover:bg-gray-100">
// //                 Chọn ảnh
// //               </button>
// //             </div>
// //           </div>
// //         ) : (
// //           <p>Đang tải thông tin...</p>
// //         )}
// //       </main>
// //     </div>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// interface UserInfo {
//   ho_ten: string;
//   email: string;
//   sdt: string;
//   gioi_tinh: string;
//   ngay_sinh: string;
// }

// export default function HoSoPage() {
//   const [user, setUser] = useState<UserInfo | null>(null);
//   const [thongBao, setThongBao] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window === 'undefined') return;
//     const token = sessionStorage.getItem('token');
//     if (!token) {
//       alert('Bạn cần đăng nhập để xem hồ sơ');
//       router.push('/dang-nhap');
//       return;
//     }

//     setUser({
//       ho_ten: sessionStorage.getItem('ho_ten') || '',
//       email: sessionStorage.getItem('email') || '',
//       sdt: sessionStorage.getItem('sdt') || '',
//       gioi_tinh: 'Nam',
//       ngay_sinh: '',
//     });
//   }, [router]);

//   async function handleCapNhat() {
//     if (!user) return;

//     const token = sessionStorage.getItem('token');
//     const res = await fetch('/api/cap_nhat_ho_so', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(user),
//     });

//     const data = await res.json();
//     setThongBao(data.thong_bao);

//     if (res.ok) {
//       // ✅ Cập nhật lại sessionStorage
//       sessionStorage.setItem('ho_ten', user.ho_ten);
//       sessionStorage.setItem('sdt', user.sdt);
//     }
//   }

//   function handleChange(field: keyof UserInfo, value: string) {
//     setUser((prev) => (prev ? { ...prev, [field]: value } : prev));
//   }

//   if (!user) return <p>Đang tải hồ sơ...</p>;

//   return (
//     <div className="flex w-full min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-[25%] md:w-[20%] bg-white shadow-md border-r">
//         <div className="flex flex-col items-center mt-6">
//           <div className="w-24 h-24 bg-emerald-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
//             {user.ho_ten ? user.ho_ten.charAt(0).toUpperCase() : 'U'}
//           </div>
//           <p className="mt-3 font-semibold text-gray-700">{user.ho_ten}</p>
//         </div>

//         <div className="mt-8 px-4">
//           <ul className="space-y-3 text-gray-700">
//             <li className="font-semibold border-b pb-2">Tài Khoản Của Tôi</li>
//             <li className="cursor-pointer text-emerald-500 font-medium">Hồ Sơ</li>
//             <li className="cursor-pointer hover:text-emerald-500">Ngân Hàng</li>
//             <li className="cursor-pointer hover:text-emerald-500">Địa Chỉ</li>
//             <li className="cursor-pointer hover:text-emerald-500">Đổi Mật Khẩu</li>
//           </ul>

//           <hr className="my-5" />

//           <ul className="space-y-3 text-gray-700">
//             <li className="cursor-pointer hover:text-emerald-500">Đơn hàng</li>
//             <li className="cursor-pointer hover:text-emerald-500">Vouchers</li>
//           </ul>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <h2 className="text-2xl font-bold text-gray-800">Thông Tin Hồ Sơ</h2>
//         <p className="text-gray-500 mb-6">Quản lý thông tin cá nhân</p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div className="md:col-span-2 space-y-4">
//             <div>
//               <label className="block font-medium">Tên</label>
//               <input
//                 type="text"
//                 value={user.ho_ten}
//                 onChange={(e) => handleChange('ho_ten', e.target.value)}
//                 className="w-full border rounded p-2 mt-1"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Email</label>
//               <input
//                 type="email"
//                 value={user.email}
//                 disabled
//                 className="w-full border rounded p-2 mt-1 bg-gray-100"
//               />
//             </div>

//             <div>
//               <label className="block font-medium">Số điện thoại</label>
//               <input
//                 type="text"
//                 value={user.sdt}
//                 onChange={(e) => handleChange('sdt', e.target.value)}
//                 className="w-full border rounded p-2 mt-1"
//               />
//             </div>

//             <div>
//               <label className="block font-medium mb-2">Giới tính</label>
//               <div className="flex gap-6">
//                 {['Nam', 'Nữ', 'Khác'].map((gt) => (
//                   <label key={gt} className="flex items-center gap-1">
//                     <input
//                       type="radio"
//                       name="gioitinh"
//                       value={gt}
//                       checked={user.gioi_tinh === gt}
//                       onChange={(e) => handleChange('gioi_tinh', e.target.value)}
//                     />
//                     <span>{gt}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <label className="block font-medium mb-2">Ngày sinh</label>
//               <input
//                 type="date"
//                 value={user.ngay_sinh}
//                 onChange={(e) => handleChange('ngay_sinh', e.target.value)}
//                 className="w-1/2 border rounded p-2"
//               />
//             </div>

//             <button
//               onClick={handleCapNhat}
//               className="bg-emerald-500 text-white px-5 py-2 rounded hover:bg-emerald-600"
//             >
//               Lưu thay đổi
//             </button>

//             {thongBao && <p className="text-emerald-600 mt-2">{thongBao}</p>}
//           </div>

//           <div className="flex flex-col items-center justify-start">
//             <div className="w-32 h-32 bg-orange-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
//               {user.ho_ten ? user.ho_ten.charAt(0).toUpperCase() : 'A'}
//             </div>
//             <button className="mt-4 border px-4 py-1 rounded text-sm hover:bg-gray-100">
//               Chọn ảnh
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserInfo {
  ho_ten: string;
  email: string;
  sdt: string;
  gioi_tinh: string;
  ngay_sinh: string;
}

export default function HoSoPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [thongBao, setThongBao] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ✅ Lấy dữ liệu từ localStorage (không phải sessionStorage)
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập để xem hồ sơ');
      router.push('/dang-nhap');
      return;
    }

    setUser({
      ho_ten: localStorage.getItem('ho_ten') || '',
      email: localStorage.getItem('email') || '',
      sdt: localStorage.getItem('sdt') || '',
      gioi_tinh: 'Nam',
      ngay_sinh: '',
    });
  }, [router]);

  async function handleCapNhat() {
    if (!user) return;

    const token = localStorage.getItem('token'); // ✅ đổi từ sessionStorage → localStorage
    const res = await fetch('/api/cap_nhat_ho_so', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    setThongBao(data.thong_bao);

    if (res.ok) {
      // ✅ Cập nhật lại localStorage (thay vì sessionStorage)
      localStorage.setItem('ho_ten', user.ho_ten);
      localStorage.setItem('sdt', user.sdt);
    }
  }

  function handleChange(field: keyof UserInfo, value: string) {
    setUser((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  if (!user) return <p>Đang tải hồ sơ...</p>;

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-[25%] md:w-[20%] bg-white shadow-md border-r">
        <div className="flex flex-col items-center mt-6">
          <div className="w-24 h-24 bg-emerald-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user.ho_ten ? user.ho_ten.charAt(0).toUpperCase() : 'U'}
          </div>
          <p className="mt-3 font-semibold text-gray-700">{user.ho_ten}</p>
        </div>

        <div className="mt-8 px-4">
          <ul className="space-y-3 text-gray-700">
            <li className="font-semibold border-b pb-2">Tài Khoản Của Tôi</li>
            <li className="cursor-pointer text-emerald-500 font-medium">Hồ Sơ</li>
            <li className="cursor-pointer hover:text-emerald-500">Ngân Hàng</li>
            <li className="cursor-pointer hover:text-emerald-500">Địa Chỉ</li>
            <li
              className="cursor-pointer hover:text-emerald-500"
              onClick={() => router.push('/doi_pass')}
            >
              Đổi Mật Khẩu
            </li>
            <li
              className="cursor-pointer hover:text-red-500 mt-4"
              onClick={() => {
                localStorage.clear();
                router.push('/dang-nhap');
              }}
            >
              Đăng Xuất
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800">Thông Tin Hồ Sơ</h2>
        <p className="text-gray-500 mb-6">Quản lý thông tin cá nhân</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block font-medium">Tên</label>
              <input
                type="text"
                value={user.ho_ten}
                onChange={(e) => handleChange('ho_ten', e.target.value)}
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full border rounded p-2 mt-1 bg-gray-100"
              />
            </div>

            <div>
              <label className="block font-medium">Số điện thoại</label>
              <input
                type="text"
                value={user.sdt}
                onChange={(e) => handleChange('sdt', e.target.value)}
                className="w-full border rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Giới tính</label>
              <div className="flex gap-6">
                {['Nam', 'Nữ', 'Khác'].map((gt) => (
                  <label key={gt} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="gioitinh"
                      value={gt}
                      checked={user.gioi_tinh === gt}
                      onChange={(e) => handleChange('gioi_tinh', e.target.value)}
                    />
                    <span>{gt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Ngày sinh</label>
              <input
                type="date"
                value={user.ngay_sinh}
                onChange={(e) => handleChange('ngay_sinh', e.target.value)}
                className="w-1/2 border rounded p-2"
              />
            </div>

            <button
              onClick={handleCapNhat}
              className="bg-emerald-500 text-white px-5 py-2 rounded hover:bg-emerald-600"
            >
              Lưu thay đổi
            </button>

            {thongBao && <p className="text-emerald-600 mt-2">{thongBao}</p>}
          </div>

          <div className="flex flex-col items-center justify-start">
            <div className="w-32 h-32 bg-orange-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user.ho_ten ? user.ho_ten.charAt(0).toUpperCase() : 'A'}
            </div>
            <button className="mt-4 border px-4 py-1 rounded text-sm hover:bg-gray-100">
              Chọn ảnh
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
