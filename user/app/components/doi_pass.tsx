// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function DoiPass() {
//   const [email, setEmail] = useState('');
//   const [passOld, setPassOld] = useState('');
//   const [passNew1, setPassNew1] = useState('');
//   const [passNew2, setPassNew2] = useState('');
//   const [thongBao, setThongBao] = useState('');
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   //  Lấy token + email từ sessionStorage
//   useEffect(() => {
//     const token = sessionStorage.getItem('token');
//     const email = sessionStorage.getItem('email');

//     if (!token) {
//       alert('Bạn chưa đăng nhập!');
//       router.push('/dang-nhap');
//       return;
//     }

//     if (email) setEmail(email);
//   }, [router]);

//   // 🛠️ Xử lý đổi mật khẩu
//   async function handleDoiPass(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setThongBao('');
//     setLoading(true);

//     const token = sessionStorage.getItem('token');
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
//       const res = await fetch('/api/doi_pass', {
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
//         // ✅ Đổi mật khẩu thành công
//         alert('Đổi mật khẩu thành công! Vui lòng đăng nhập lại.');
//         sessionStorage.clear();
//         router.push('/dang-nhap');
//       }
//     } catch (error) {
//       console.error(error);
//       setThongBao('Lỗi kết nối máy chủ');
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="flex justify-center mt-10">
//       <form
//         onSubmit={handleDoiPass}
//         className="w-[90%] md:w-[50%] border rounded-lg shadow-md p-6 bg-white"
//       >
//         <h2 className="text-center text-xl font-bold bg-emerald-500 text-white py-2 rounded">
//           Đổi mật khẩu
//         </h2>

//         <div className="mt-4">
//           <label className="font-semibold">Email:</label>
//           <input
//             type="email"
//             className="w-full border p-2 mt-1 rounded bg-gray-100"
//             value={email}
//             disabled
//           />
//         </div>

//         <div className="mt-4">
//           <label className="font-semibold">Mật khẩu cũ:</label>
//           <input
//             type="password"
//             className="w-full border p-2 mt-1 rounded"
//             value={passOld}
//             onChange={(e) => setPassOld(e.target.value)}
//             placeholder="Nhập mật khẩu cũ"
//           />
//         </div>

//         <div className="mt-4">
//           <label className="font-semibold">Mật khẩu mới:</label>
//           <input
//             type="password"
//             className="w-full border p-2 mt-1 rounded"
//             value={passNew1}
//             onChange={(e) => setPassNew1(e.target.value)}
//             placeholder="Nhập mật khẩu mới"
//           />
//           {passNew1 && passNew1.length < 6 && (
//             <p className="text-red-500 text-sm mt-1">
//               Mật khẩu phải có ít nhất 6 ký tự
//             </p>
//           )}
//         </div>

//         <div className="mt-4">
//           <label className="font-semibold">Nhập lại mật khẩu mới:</label>
//           <input
//             type="password"
//             className="w-full border p-2 mt-1 rounded"
//             value={passNew2}
//             onChange={(e) => setPassNew2(e.target.value)}
//             placeholder="Nhập lại mật khẩu mới"
//           />
//           {passNew1 && passNew2 && passNew1 !== passNew2 && (
//             <p className="text-red-500 text-sm mt-1">
//               Hai mật khẩu không khớp
//             </p>
//           )}
//         </div>

//         {thongBao && (
//           <div className="mt-3 text-center text-red-500">{thongBao}</div>
//         )}

//         <div className="mt-6 text-center">
//           <button
//             type="submit"
//             className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition"
//             disabled={loading}
//           >
//             {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
