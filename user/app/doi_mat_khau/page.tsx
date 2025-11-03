
// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';

// // interface UserInfo {
// //   ho_ten: string;
// //   email: string;
// //   sdt: string;
// //   ngay_sinh: string;
// // }

// // export default function HoSoPage() {
// //   const [user, setUser] = useState<UserInfo | null>(null);
// //   const [thongBao, setThongBao] = useState('');
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (typeof window === 'undefined') return;

// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       alert('Bạn cần đăng nhập để xem hồ sơ');
// //       router.push('/dang-nhap');
// //       return;
// //     }

// //     setUser({
// //       ho_ten: localStorage.getItem('ho_ten') || '',
// //       email: localStorage.getItem('email') || '',
// //       sdt: localStorage.getItem('sdt') || '',
// //       ngay_sinh: '',
// //     });
// //   }, [router]);

// //   async function handleCapNhat() {
// //     if (!user) return;

// //     const token = localStorage.getItem('token');
// //     const res = await fetch('/api/cap_nhat_ho_so', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify(user),
// //     });

// //     const data = await res.json();
// //     setThongBao(data.thong_bao);

// //     if (res.ok) {
// //       localStorage.setItem('ho_ten', user.ho_ten);
// //       localStorage.setItem('sdt', user.sdt);
// //     }
// //   }

// //   function handleChange(field: keyof UserInfo, value: string) {
// //     setUser((prev) => (prev ? { ...prev, [field]: value } : prev));
// //   }

// //   if (!user) return <p>Đang tải hồ sơ...</p>;

// //   return (
// //     <div className="flex w-full min-h-screen bg-gray-50">
// //       {/* Sidebar */}
// //       <aside className="w-[25%] md:w-[20%] bg-white shadow-md border-r">
// //         <div className="flex flex-col items-center mt-6">
// //           <div className="w-24 h-24 bg-emerald-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
// //             {user.ho_ten ? user.ho_ten.charAt(0).toUpperCase() : 'U'}
// //           </div>
// //           <p className="mt-3 font-semibold text-gray-700">{user.ho_ten}</p>
// //         </div>

// //         <div className="mt-8 px-4">
// //           <ul className="space-y-3 text-gray-700">
// //             <li className="font-semibold border-b pb-2">Tài Khoản Của Tôi</li>
// //             <li className="cursor-pointer text-emerald-500 font-medium"
// //                 onClick={() => router.push('/ho_so')}>
// //               Hồ Sơ
// //             </li>
// //             <li className="cursor-pointer hover:text-emerald-500">
// //               Ngân Hàng
// //             </li>
// //             <li className="cursor-pointer hover:text-emerald-500"
// //               onClick={() => router.push('/dia_chi/tat_ca/[id]')}>
// //               Địa Chỉ
// //             </li>
// //             <li
// //               className="cursor-pointer hover:text-emerald-500"
// //               onClick={() => router.push('/doi_mat_khau')}
// //             >
// //               Đổi Mật Khẩu
// //             </li>
// //             <li
// //               className="cursor-pointer hover:text-emerald-500 mt-4"
// //               onClick={() => router.push('/don_hang')}
// //             >
// //               Đơn Hàng
// //             </li>
// //           </ul>
// //         </div>
// //       </aside>

// //       {/* Main Content */}
// //       <main className="flex-1 p-8">
// //         <h2 className="text-2xl font-bold text-gray-800">Đổi mật khẩu</h2>

// //         {/* Nội dung đơn hàng sẽ được hiển thị ở đây */}
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
//   ngay_sinh: string;
// }

// export default function HoSoVaDoiPassPage() {
//   const [user, setUser] = useState<UserInfo | null>(null);
//   const [thongBao, setThongBao] = useState('');
//   const [email, setEmail] = useState('');
//   const [passOld, setPassOld] = useState('');
//   const [passNew1, setPassNew1] = useState('');
//   const [passNew2, setPassNew2] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   //  Lấy thông tin user
//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Bạn cần đăng nhập để xem hồ sơ');
//       router.push('/dang-nhap');
//       return;
//     }

//     const ho_ten = localStorage.getItem('ho_ten') || '';
//     const email = localStorage.getItem('email') || '';
//     const sdt = localStorage.getItem('sdt') || '';

//     setUser({ ho_ten, email, sdt, ngay_sinh: '' });
//     setEmail(email);
//   }, [router]);

//   //  Xử lý đổi mật khẩu
//   async function handleDoiPass(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setThongBao('');
//     setLoading(true);

//     const token = localStorage.getItem('token');
//     if (!token) {
//       setThongBao('Bạn chưa đăng nhập');
//       setLoading(false);
//       return;
//     }

//     if (passNew1 !== passNew2) {
//       setThongBao('Hai mật khẩu mới không giống nhau');
//       setLoading(false);
//       return;
//     }

//     if (passNew1.length < 6) {
//       setThongBao('Mật khẩu mới phải từ 6 ký tự');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('/api/doi_mat_khau', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           pass_old: passOld,
//           pass_new1: passNew1,
//           pass_new2: passNew2,
//         }),
//       });

//       const data = await res.json();
//       setThongBao(data.thong_bao);

//       if (res.status === 200) {
//         alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
//         localStorage.clear();
//         router.push('/dang-nhap');
//       }
//     } catch (error) {
//       console.error(error);
//       setThongBao('Lỗi kết nối máy chủ');
//     } finally {
//       setLoading(false);
//     }
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
//             <li className="cursor-pointer hover:text-emerald-500" onClick={() => router.push('/ho_so')}>
//               Hồ Sơ
//             </li>
//             <li className="cursor-pointer hover:text-emerald-500">Ngân Hàng</li>
//             <li
//               className="cursor-pointer hover:text-emerald-500"
//               onClick={() => router.push('/dia_chi/tat_ca/[id]')}
//             >
//               Địa Chỉ
//             </li>
//             <li
//               className="cursor-pointer text-emerald-500 font-medium"
//               onClick={() => router.push('/doi_mat_khau')}
//             >
//               Đổi Mật Khẩu
//             </li>
//             <li
//               className="cursor-pointer hover:text-emerald-500 mt-4"
//               onClick={() => router.push('/don_hang')}
//             >
//               Đơn Hàng
//             </li>
//           </ul>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//           Đổi mật khẩu
//         </h2>

//         {/*  Form đổi mật khẩu */}
//         <form
//           onSubmit={handleDoiPass}
//           className="w-full md:w-[60%] border rounded-lg shadow-md p-6 bg-white"
//         >
//           <div>
//             <label className="font-semibold">Email:</label>
//             <input
//               type="email"
//               className="w-full border p-2 mt-1 rounded bg-gray-100"
//               value={email}
//               disabled
//             />
//           </div>

//           <div className="mt-4">
//             <label className="font-semibold">Mật khẩu cũ:</label>
//             <input
//               type="password"
//               className="w-full border p-2 mt-1 rounded"
//               value={passOld}
//               onChange={(e) => setPassOld(e.target.value)}
//               placeholder="Nhập mật khẩu cũ"
//             />
//           </div>

//           <div className="mt-4">
//             <label className="font-semibold">Mật khẩu mới:</label>
//             <input
//               type="password"
//               className="w-full border p-2 mt-1 rounded"
//               value={passNew1}
//               onChange={(e) => setPassNew1(e.target.value)}
//               placeholder="Nhập mật khẩu mới"
//             />
//             {passNew1 && passNew1.length < 6 && (
//               <p className="text-red-500 text-sm mt-1">
//                 Mật khẩu phải có ít nhất 6 ký tự
//               </p>
//             )}
//           </div>

//           <div className="mt-4">
//             <label className="font-semibold">Nhập lại mật khẩu mới:</label>
//             <input
//               type="password"
//               className="w-full border p-2 mt-1 rounded"
//               value={passNew2}
//               onChange={(e) => setPassNew2(e.target.value)}
//               placeholder="Nhập lại mật khẩu mới"
//             />
//             {passNew1 && passNew2 && passNew1 !== passNew2 && (
//               <p className="text-red-500 text-sm mt-1">
//                 Hai mật khẩu không khớp
//               </p>
//             )}
//           </div>

//           {thongBao && (
//             <div className="mt-3 text-center text-red-500">{thongBao}</div>
//           )}

//           <div className="mt-6 text-center">
//             <button
//               type="submit"
//               className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition"
//               disabled={loading}
//             >
//               {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
//             </button>
//           </div>
//         </form>
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
  ngay_sinh: string;
}

export default function DoiMatKhauPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [thongBao, setThongBao] = useState('');
  const [passOld, setPassOld] = useState('');
  const [passNew1, setPassNew1] = useState('');
  const [passNew2, setPassNew2] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //  Lấy thông tin user từ localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

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
      ngay_sinh: '',
    });
  }, [router]);

  //  Xử lý đổi mật khẩu
  async function handleDoiMatKhau(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setThongBao('');
    setLoading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setThongBao('Bạn chưa đăng nhập');
      setLoading(false);
      return;
    }

    if (passNew1 !== passNew2) {
      setThongBao('Hai mật khẩu mới không giống nhau');
      setLoading(false);
      return;
    }

    if (passNew1.length < 6) {
      setThongBao('Mật khẩu mới phải từ 6 ký tự');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/doi_mat_khau', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pass_old: passOld,
          pass_new1: passNew1,
          pass_new2: passNew2,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setThongBao(data.thong_bao || 'Lỗi đổi mật khẩu');
      } else {
        setThongBao('Đổi mật khẩu thành công!');
        //  Cập nhật lại localStorage nếu API trả về user
        if (data.user) {
          localStorage.setItem('ho_ten', data.user.ho_ten);
          localStorage.setItem('email', data.user.email);
          localStorage.setItem('sdt', data.user.sdt);
        }

        // localStorage.clear();
        // router.push('/dang-nhap');
      }
    } catch (error) {
      console.error(error);
      setThongBao('Lỗi kết nối đến máy chủ');
    } finally {
      setLoading(false);
    }
  }

  if (!user) return <p>Đang tải dữ liệu...</p>;

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
            <li
              className="cursor-pointer hover:text-emerald-500"
              onClick={() => router.push('/ho_so')}
            >
              Hồ Sơ
            </li>
            <li className="cursor-pointer hover:text-emerald-500">Ngân Hàng</li>
            <li
              className="cursor-pointer hover:text-emerald-500"
              onClick={() => router.push('/dia_chi/tat_ca/[id]')}
            >
              Địa Chỉ
            </li>
            <li
              className="cursor-pointer text-emerald-500 font-medium"
              onClick={() => router.push('/doi_mat_khau')}
            >
              Đổi Mật Khẩu
            </li>
            <li
              className="cursor-pointer hover:text-emerald-500 mt-4"
              onClick={() => router.push('/don_hang')}
            >
              Đơn Hàng
            </li>
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Đổi mật khẩu
        </h2>

        <form
          onSubmit={handleDoiMatKhau}
          className="w-full md:w-[60%] border rounded-lg shadow-md p-6 bg-white"
        >
          <div>
            <label className="font-semibold">Email:</label>
            <input
              type="email"
              className="w-full border p-2 mt-1 rounded bg-gray-100"
              value={user.email}
              disabled
            />
          </div>

          <div className="mt-4">
            <label className="font-semibold">Mật khẩu cũ:</label>
            <input
              type="password"
              className="w-full border p-2 mt-1 rounded"
              value={passOld}
              onChange={(e) => setPassOld(e.target.value)}
              placeholder="Nhập mật khẩu cũ"
            />
          </div>

          <div className="mt-4">
            <label className="font-semibold">Mật khẩu mới:</label>
            <input
              type="password"
              className="w-full border p-2 mt-1 rounded"
              value={passNew1}
              onChange={(e) => setPassNew1(e.target.value)}
              placeholder="Nhập mật khẩu mới"
            />
          </div>

          <div className="mt-4">
            <label className="font-semibold">Nhập lại mật khẩu mới:</label>
            <input
              type="password"
              className="w-full border p-2 mt-1 rounded"
              value={passNew2}
              onChange={(e) => setPassNew2(e.target.value)}
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>

          {thongBao && (
            <div
              className={`mt-4 text-center ${
                thongBao.includes('thành công')
                  ? 'text-green-600'
                  : 'text-red-500'
              }`}
            >
              {thongBao}
            </div>
          )}

          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition"
            >
              {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
