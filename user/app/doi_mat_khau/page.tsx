// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Loader2, Lock, Mail } from 'lucide-react';
// import QuenMatKhauModal from '@/app/components/QuenMatKhauModal';

// interface UserInfo {
//   ho_ten: string;
//   email: string;
//   sdt: string;
//   ngay_sinh: string;
// }

// export default function DoiMatKhauPage() {
//   const [user, setUser] = useState<UserInfo | null>(null);
//   const [thongBao, setThongBao] = useState('');
//   const [passOld, setPassOld] = useState('');
//   const [passNew1, setPassNew1] = useState('');
//   const [passNew2, setPassNew2] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showForgot, setShowForgot] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/dang-nhap');
//       return;
//     }

//     setUser({
//       ho_ten: localStorage.getItem('ho_ten') || '',
//       email: localStorage.getItem('email') || '',
//       sdt: localStorage.getItem('sdt') || '',
//       ngay_sinh: '',
//     });
//   }, [router]);

//   async function handleDoiMatKhau(e: React.FormEvent<HTMLFormElement>) {
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
//       setThongBao('Mật khẩu mới phải có ít nhất 6 ký tự');
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

//       if (!res.ok) {
//         setThongBao(data.thong_bao || 'Đổi mật khẩu thất bại');
//       } else {
//         setThongBao('Đổi mật khẩu thành công!');
//       }
//     } catch (error) {
//       console.error(error);
//       setThongBao('Lỗi kết nối máy chủ');
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (!user) return <p>Đang tải...</p>;

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-emerald-100 via-white to-emerald-50 flex items-center justify-center p-6">
//       {/* Card */}
//       <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-emerald-100 p-8 animate-[fadeIn_0.6s_ease]">
        
//         {/* Title */}
//         <div className="text-center mb-6">
//           <div className="mx-auto w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg mb-3">
//             <Lock className="text-white" size={30} />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">Đổi mật khẩu</h2>
//           <p className="text-gray-500 text-sm mt-1">{user.email}</p>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleDoiMatKhau} className="space-y-5">
          
//           <div>
//             <label className="font-medium text-gray-700">Mật khẩu cũ</label>
//             <input
//               type="password"
//               required
//               placeholder="Nhập mật khẩu hiện tại"
//               value={passOld}
//               onChange={(e) => setPassOld(e.target.value)}
//               className="w-full mt-1 p-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-emerald-400 outline-none"
//             />
//           </div>

//           <div>
//             <label className="font-medium text-gray-700">Mật khẩu mới</label>
//             <input
//               type="password"
//               required
//               placeholder="Nhập mật khẩu mới"
//               value={passNew1}
//               onChange={(e) => setPassNew1(e.target.value)}
//               className="w-full mt-1 p-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-emerald-400 outline-none"
//             />
//           </div>

//           <div>
//             <label className="font-medium text-gray-700">Nhập lại mật khẩu mới</label>
//             <input
//               type="password"
//               required
//               placeholder="Nhập lại mật khẩu mới"
//               value={passNew2}
//               onChange={(e) => setPassNew2(e.target.value)}
//               className="w-full mt-1 p-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-emerald-400 outline-none"
//             />

//             <button
//               type="button"
//               onClick={() => setShowForgot(true)}
//               className="text-emerald-600 text-sm mt-2 hover:underline float-right"
//             >
//               Quên mật khẩu?
//             </button>
//           </div>

//           {thongBao && (
//             <p
//               className={`text-center text-sm font-medium ${
//                 thongBao.includes('thành công') ? 'text-emerald-600' : 'text-red-500'
//               }`}
//             >
//               {thongBao}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg transition disabled:bg-gray-400"
//           >
//             {loading ? (
//               <span className="flex items-center justify-center gap-2">
//                 <Loader2 className="animate-spin" size={20} />
//                 Đang xử lý...
//               </span>
//             ) : (
//               'Đổi mật khẩu'
//             )}
//           </button>
//         </form>

//         {/* Back */}
//         <button
//           onClick={() => router.push('/ho_so')}
//           className="w-full text-center mt-5 text-gray-600 hover:text-emerald-600 transition"
//         >
//           ← Quay lại hồ sơ
//         </button>
//       </div>

//       {/* Modal */}
//       {showForgot && <QuenMatKhauModal onClose={() => setShowForgot(false)} />}
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock } from 'lucide-react';
import QuenMatKhauModal from '@/app/components/QuenMatKhauModal';

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
  const [showForgot, setShowForgot] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/dang-nhap');

    setUser({
      ho_ten: localStorage.getItem('ho_ten') || '',
      email: localStorage.getItem('email') || '',
      sdt: localStorage.getItem('sdt') || '',
      ngay_sinh: '',
    });
  }, [router]);

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
      setThongBao('Mật khẩu mới phải có ít nhất 6 ký tự');
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
        setThongBao(data.thong_bao || 'Đổi mật khẩu thất bại');
      } else {
        setThongBao('Đổi mật khẩu thành công!');
        setTimeout(() => {
          router.back(); // 🔥 QUAY LẠI TRANG TRƯỚC
        }, 900);
      }
    } catch (error) {
      console.error(error);
      setThongBao('Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  }

  if (!user) return <p>Đang tải...</p>;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={() => router.back()}  // 🔥 CLICK RA NGOÀI → BACK
    >
      <div
        className="w-full max-w-lg bg-white/85 backdrop-blur-xl shadow-2xl rounded-2xl border border-red-200 p-8 animate-[fadeIn_0.5s_ease]"
        onClick={(e) => e.stopPropagation()} // ⛔ CHẶN CLICK TRONG FORM
      >
        {/* Title */}
        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg mb-3">
            <Lock size={30} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Đổi mật khẩu</h2>
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleDoiMatKhau} className="space-y-5">

          <div>
            <label className="font-medium text-gray-700">Mật khẩu cũ</label>
            <input
              type="password"
              required
              placeholder="Nhập mật khẩu hiện tại"
              value={passOld}
              onChange={(e) => setPassOld(e.target.value)}
              className="w-full mt-1 p-3 border rounded-xl bg-white shadow-sm 
              focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Mật khẩu mới</label>
            <input
              type="password"
              required
              placeholder="Nhập mật khẩu mới"
              value={passNew1}
              onChange={(e) => setPassNew1(e.target.value)}
              className="w-full mt-1 p-3 border rounded-xl bg-white shadow-sm 
              focus:ring-2 focus:ring-red-400 outline-none"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Nhập lại mật khẩu mới</label>
            <input
              type="password"
              required
              placeholder="Nhập lại mật khẩu mới"
              value={passNew2}
              onChange={(e) => setPassNew2(e.target.value)}
              className="w-full mt-1 p-3 border rounded-xl bg-white shadow-sm 
              focus:ring-2 focus:ring-red-400 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowForgot(true)}
              className="text-red-600 text-sm mt-2 hover:underline float-right"
            >
              Quên mật khẩu?
            </button>
          </div>

          {thongBao && (
            <p
              className={`text-center text-sm font-medium ${
                thongBao.includes('thành công') ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {thongBao}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold 
            rounded-xl shadow-lg transition disabled:bg-gray-400"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} />
                Đang xử lý...
              </span>
            ) : (
              'Đổi mật khẩu'
            )}
          </button>

        </form>
      </div>

      {showForgot && <QuenMatKhauModal onClose={() => setShowForgot(false)} />}
    </div>
  );
}
