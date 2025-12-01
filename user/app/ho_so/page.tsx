// // // //   // 'use client';

// // // //   // import { useEffect, useState, ChangeEvent } from 'react';
// // // //   // import { useRouter } from 'next/navigation';
// // // //   // import UserLayout from '@/app/components/UserLayout';
// // // //   // import toast from 'react-hot-toast';

// // // //   // interface UserInfo {
// // // //   //   id: number;
// // // //   //   ho_ten: string;
// // // //   //   email: string;
// // // //   //   sdt: string;
// // // //   //   ngay_sinh: string;
// // // //   //   hinh?: string | null;
// // // //   // }

// // // //   // export default function HoSoPage() {
// // // //   //   const [user, setUser] = useState<UserInfo | null>(null);
// // // //   //   const [file, setFile] = useState<File | null>(null);
// // // //   //   const [preview, setPreview] = useState<string | null>(null);
// // // //   //   const router = useRouter();

// // // //   //   // 🟢 Lấy thông tin hồ sơ khi load trang
// // // //   //   useEffect(() => {
// // // //   //     const token = localStorage.getItem('token');
// // // //   //     if (!token) {
// // // //   //       toast.error('Bạn cần đăng nhập để xem hồ sơ');
// // // //   //       router.push('/dang-nhap');
// // // //   //       return;
// // // //   //     }

// // // //   //     async function layThongTinNguoiDung() {
// // // //   //       const res = await fetch('/api/ho_so', {
// // // //   //         headers: { Authorization: `Bearer ${token}` },
// // // //   //       });
// // // //   //       const data = await res.json();

// // // //   //       if (!res.ok) {
// // // //   //         toast.error(data.thong_bao);
// // // //   //         router.push('/dang-nhap');
// // // //   //         return;
// // // //   //       }

// // // //   //       setUser(data.nguoi_dung);
// // // //   //       if (data.nguoi_dung.hinh)
// // // //   //         setPreview(`${data.nguoi_dung.hinh}?t=${Date.now()}`);
// // // //   //     }

// // // //   //     layThongTinNguoiDung();
// // // //   //   }, [router]);

// // // //   //   // 🟡 Chọn ảnh
// // // //   //   function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
// // // //   //     const f = e.target.files?.[0];
// // // //   //     if (f) {
// // // //   //       setFile(f);
// // // //   //       const url = URL.createObjectURL(f);
// // // //   //       setPreview(url);
// // // //   //       setUser((prev) => (prev ? { ...prev, hinh: url } : prev));
// // // //   //     }
// // // //   //   }

// // // //   //   // 🟡 Gửi cập nhật hồ sơ
// // // //   //   async function handleCapNhat() {
// // // //   //     if (!user) return;
// // // //   //     const token = localStorage.getItem('token');
// // // //   //     if (!token) return;

// // // //   //     try {
// // // //   //       const formData = new FormData();
// // // //   //       formData.append('ho_ten', user.ho_ten);
// // // //   //       formData.append('sdt', user.sdt);
// // // //   //       formData.append('ngay_sinh', user.ngay_sinh || '');
// // // //   //       if (file) formData.append('hinh', file);

// // // //   //       const res = await fetch('/api/ho_so', {
// // // //   //         method: 'POST',
// // // //   //         headers: { Authorization: `Bearer ${token}` },
// // // //   //         body: formData,
// // // //   //       });

// // // //   //       const data = await res.json();
// // // //   //       if (res.ok) toast.success('Cập nhật thành công!');
// // // //   //       else toast.error(data.thong_bao);
// // // //   //     } catch {
// // // //   //       toast.error('Lỗi kết nối máy chủ');
// // // //   //     }
// // // //   //   }

// // // //   //   if (!user)
// // // //   //     return <p className="p-8 text-gray-600 text-center text-lg">Đang tải...</p>;

// // // //   //   return (
// // // //   //     <UserLayout user={user}>
// // // //   //       <h2 className="text-3xl font-bold text-[#6A0A0A] mb-2">Thông Tin Hồ Sơ</h2>
// // // //   //       <p className="text-gray-500 mb-6">Quản lý thông tin cá nhân của bạn</p>

// // // //   //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //   //         <div className="space-y-4">
// // // //   //           <div>
// // // //   //             <label className="block font-medium mb-1 text-gray-700">Tên</label>
// // // //   //             <input
// // // //   //               type="text"
// // // //   //               value={user.ho_ten}
// // // //   //               onChange={(e) => setUser({ ...user, ho_ten: e.target.value })}
// // // //   //               className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#D33C3C]"
// // // //   //             />
// // // //   //           </div>

// // // //   //           <div>
// // // //   //             <label className="block font-medium mb-1 text-gray-700">Email</label>
// // // //   //             <input
// // // //   //               type="email"
// // // //   //               value={user.email}
// // // //   //               disabled
// // // //   //               className="w-full border rounded-lg p-2 bg-gray-100 text-gray-600"
// // // //   //             />
// // // //   //           </div>

// // // //   //           <div>
// // // //   //             <label className="block font-medium mb-1 text-gray-700">
// // // //   //               Số điện thoại
// // // //   //             </label>
// // // //   //             <input
// // // //   //               type="text"
// // // //   //               value={user.sdt}
// // // //   //               onChange={(e) => setUser({ ...user, sdt: e.target.value })}
// // // //   //               className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#D33C3C]"
// // // //   //             />
// // // //   //           </div>

// // // //   //           <div>
// // // //   //             <label className="block font-medium mb-1 text-gray-700">
// // // //   //               Ngày sinh
// // // //   //             </label>
// // // //   //             <input
// // // //   //               type="date"
// // // //   //               value={user.ngay_sinh || ''}
// // // //   //               onChange={(e) => setUser({ ...user, ngay_sinh: e.target.value })}
// // // //   //               className="w-1/2 border rounded-lg p-2 focus:ring-2 focus:ring-[#D33C3C]"
// // // //   //             />
// // // //   //           </div>

// // // //   //           <button
// // // //   //             onClick={handleCapNhat}
// // // //   //             className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg hover:bg-[#b53030] transition font-medium"
// // // //   //           >
// // // //   //             Lưu thay đổi
// // // //   //           </button>
// // // //   //         </div>

// // // //   //         <div className="flex flex-col items-center space-y-3">
// // // //   //           <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#D33C3C]">
// // // //   //             {preview ? (
// // // //   //               <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
// // // //   //             ) : (
// // // //   //               <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
// // // //   //                 Chưa có ảnh
// // // //   //               </div>
// // // //   //             )}
// // // //   //           </div>
// // // //   //           <label
// // // //   //             htmlFor="file-upload"
// // // //   //             className="cursor-pointer text-[#D33C3C] hover:underline"
// // // //   //           >
// // // //   //             📷 Chọn ảnh
// // // //   //           </label>
// // // //   //           <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
// // // //   //         </div>
// // // //   //       </div>
// // // //   //     </UserLayout>
// // // //   //   );
// // // //   // }
// // // // 'use client';

// // // // import { useState, ChangeEvent } from 'react';
// // // // import UserLayout from '@/app/components/UserLayout';
// // // // import toast from 'react-hot-toast';
// // // // import { useUser, updateUser } from '@/app/hooks/useUser';

// // // // export default function HoSoPage() {
// // // //   const user = useUser();
// // // //   const [file, setFile] = useState<File | null>(null);
// // // //   const [preview, setPreview] = useState<string | null>(null);
// // // //   const [loading, setLoading] = useState(false);

// // // //   if (!user)
// // // //     return <p className="p-8 text-center text-gray-600">Đang tải thông tin...</p>;

// // // //   // 🟡 Chọn ảnh
// // // //   function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
// // // //     const f = e.target.files?.[0];
// // // //     if (f) {
// // // //       setFile(f);
// // // //       const url = URL.createObjectURL(f);
// // // //       setPreview(url);
// // // //     }
// // // //   }

// // // //   // 🟢 Cập nhật hồ sơ (lưu vào DB + update cache)
// // // //   async function handleCapNhat() {
// // // //     const token = localStorage.getItem('token');
// // // //     if (!token || !user) return;

// // // //     const formData = new FormData();
// // // //     formData.append('ho_ten', user.ho_ten);
// // // //     formData.append('sdt', user.sdt || '');
// // // //     formData.append('ngay_sinh', user.ngay_sinh || '');
// // // //     if (file) formData.append('hinh', file);

// // // //     setLoading(true);
// // // //     try {
// // // //       const res = await fetch('/api/ho_so', {
// // // //         method: 'POST',
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //         body: formData,
// // // //       });

// // // //       const data = await res.json();
// // // //       if (!res.ok) {
// // // //         toast.error(data.thong_bao || 'Lỗi cập nhật hồ sơ');
// // // //         return;
// // // //       }

// // // //       toast.success('Cập nhật thành công!');

// // // //       // 🟢 Fetch lại dữ liệu người dùng để lấy avatar mới
// // // //       const reload = await fetch('/api/ho_so', {
// // // //         headers: { Authorization: `Bearer ${token}` },
// // // //       });
// // // //       const reloadData = await reload.json();
// // // //       if (reload.ok && reloadData.nguoi_dung) {
// // // //         updateUser(reloadData.nguoi_dung);
// // // //         setPreview(reloadData.nguoi_dung.hinh || null);
// // // //       }
// // // //     } catch {
// // // //       toast.error('Lỗi kết nối máy chủ');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   }

// // // //   return (
// // // //     <UserLayout user={user}>
// // // //       <h2 className="text-3xl font-bold text-[#6A0A0A] mb-4">Thông Tin Hồ Sơ</h2>
// // // //       <p className="text-gray-500 mb-6">Quản lý thông tin cá nhân của bạn</p>

// // // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //         <div className="space-y-4">
// // // //           <div>
// // // //             <label className="block mb-1 font-medium">Tên</label>
// // // //             <input
// // // //               type="text"
// // // //               value={user.ho_ten}
// // // //               className="w-full border p-2 rounded-lg bg-gray-50"
// // // //               readOnly
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label className="block mb-1 font-medium">Email</label>
// // // //             <input
// // // //               type="text"
// // // //               value={user.email ?? ''}
// // // //               disabled
// // // //               className="w-full border p-2 bg-gray-100"
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label className="block mb-1 font-medium">Số điện thoại</label>
// // // //             <input
// // // //               type="text"
// // // //               value={user.sdt ?? ''}
// // // //               className="w-full border p-2 rounded-lg bg-gray-50"
// // // //               readOnly
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label className="block mb-1 font-medium">Ngày sinh</label>
// // // //             <input
// // // //               type="date"
// // // //               value={user.ngay_sinh ?? ''}
// // // //               className="w-1/2 border p-2 rounded-lg bg-gray-50"
// // // //               readOnly
// // // //             />
// // // //           </div>

// // // //           <button
// // // //             onClick={handleCapNhat}
// // // //             disabled={loading}
// // // //             className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg hover:bg-[#b53030] transition"
// // // //           >
// // // //             {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
// // // //           </button>
// // // //         </div>

// // // //         <div className="flex flex-col items-center space-y-3">
// // // //           <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#D33C3C]">
// // // //             <img
// // // //               src={preview || user.hinh || '/avatar.png'}
// // // //               alt="Avatar"
// // // //               className="w-full h-full object-cover"
// // // //             />
// // // //           </div>
// // // //           <label
// // // //             htmlFor="file-upload"
// // // //             className="cursor-pointer text-[#D33C3C] hover:underline"
// // // //           >
// // // //             📷 Chọn ảnh
// // // //           </label>
// // // //           <input
// // // //             id="file-upload"
// // // //             type="file"
// // // //             accept="image/*"
// // // //             onChange={handleFileChange}
// // // //             className="hidden"
// // // //           />
// // // //         </div>
// // // //       </div>
// // // //     </UserLayout>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, ChangeEvent } from 'react';
// // // import UserLayout from '@/app/components/UserLayout';
// // // import toast from 'react-hot-toast';
// // // import { useUser, updateUser } from '@/app/hooks/useUser';

// // // export default function HoSoPage() {
// // //   const user = useUser();

// // //   // 🔵 THÊM TRẠNG THÁI EDIT
// // //   const [isEditing, setIsEditing] = useState<boolean>(false);

// // //   // 🔵 Tạo state tạm cho editable fields
// // //   const [hoTen, setHoTen] = useState<string>(user?.ho_ten ?? '');
// // //   const [sdt, setSdt] = useState<string>(user?.sdt ?? '');
// // //   const [ngaySinh, setNgaySinh] = useState<string>(user?.ngay_sinh ?? '');

// // //   const [file, setFile] = useState<File | null>(null);
// // //   const [preview, setPreview] = useState<string | null>(null);
// // //   const [loading, setLoading] = useState(false);

// // //   if (!user)
// // //     return <p className="p-8 text-center text-gray-600">Đang tải thông tin...</p>;

// // //   // 🟡 Chọn ảnh
// // //   function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
// // //     const f = e.target.files?.[0];
// // //     if (f) {
// // //       setFile(f);
// // //       const url = URL.createObjectURL(f);
// // //       setPreview(url);
// // //     }
// // //   }

// // //   // 🟢 Cập nhật hồ sơ (lưu vào DB + update cache)
// // //   async function handleCapNhat() {
// // //     const token = localStorage.getItem('token');
// // //     if (!token || !user) return;

// // //     const formData = new FormData();
// // //     formData.append('ho_ten', hoTen);
// // //     formData.append('sdt', sdt);
// // //     formData.append('ngay_sinh', ngaySinh);
// // //     if (file) formData.append('hinh', file);

// // //     setLoading(true);
// // //     try {
// // //       const res = await fetch('/api/ho_so', {
// // //         method: 'POST',
// // //         headers: { Authorization: `Bearer ${token}` },
// // //         body: formData,
// // //       });

// // //       const data = await res.json();
// // //       if (!res.ok) {
// // //         toast.error(data.thong_bao || 'Lỗi cập nhật hồ sơ');
// // //         return;
// // //       }

// // //       toast.success('Cập nhật thành công!');

// // //       // 🔵 Fetch lại thông tin
// // //       const reload = await fetch('/api/ho_so', {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       const reloadData = await reload.json();

// // //       if (reload.ok && reloadData.nguoi_dung) {
// // //         updateUser(reloadData.nguoi_dung);
// // //         setPreview(reloadData.nguoi_dung.hinh || null);

// // //         // 🔵 Thoát chế độ sửa
// // //         setIsEditing(false);
// // //       }
// // //     } catch {
// // //       toast.error('Lỗi kết nối máy chủ');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }

// // //   return (
// // //     <UserLayout user={user}>
// // //       <h2 className="text-3xl font-bold text-[#6A0A0A] mb-4">Thông Tin Hồ Sơ</h2>
// // //       <p className="text-gray-500 mb-6">Quản lý thông tin cá nhân của bạn</p>

// // //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //         <div className="space-y-4">
// // //           <div>
// // //             <label className="block mb-1 font-medium">Tên</label>
// // //             <input
// // //               type="text"
// // //               value={hoTen}
// // //               onChange={(e) => setHoTen(e.target.value)}
// // //               className="w-full border p-2 rounded-lg bg-gray-50"
// // //               readOnly={!isEditing}
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="block mb-1 font-medium">Email</label>
// // //             <input
// // //               type="text"
// // //               value={user.email ?? ''}
// // //               disabled
// // //               className="w-full border p-2 bg-gray-100"
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="block mb-1 font-medium">Số điện thoại</label>
// // //             <input
// // //               type="text"
// // //               value={sdt}
// // //               onChange={(e) => setSdt(e.target.value)}
// // //               className="w-full border p-2 rounded-lg bg-gray-50"
// // //               readOnly={!isEditing}
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="block mb-1 font-medium">Ngày sinh</label>
// // //             <input
// // //               type="date"
// // //               value={ngaySinh}
// // //               onChange={(e) => setNgaySinh(e.target.value)}
// // //               className="w-1/2 border p-2 rounded-lg bg-gray-50"
// // //               readOnly={!isEditing}
// // //             />
// // //           </div>

// // //           {/* 🔵 Nút Sửa / Cập nhật */}
// // //           {isEditing ? (
// // //             <button
// // //               onClick={handleCapNhat}
// // //               disabled={loading}
// // //               className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg hover:bg-[#b53030] transition"
// // //             >
// // //               {loading ? 'Đang lưu...' : 'Cập nhật'}
// // //             </button>
// // //           ) : (
// // //             <button
// // //               onClick={() => setIsEditing(true)}
// // //               className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
// // //             >
// // //               Sửa thông tin
// // //             </button>
// // //           )}
// // //         </div>

// // //         <div className="flex flex-col items-center space-y-3">
// // //         <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#D33C3C]">
// // //           <img
// // //             src={preview || user.hinh || '/avatar.png'}
// // //             alt="Avatar"
// // //             className="w-full h-full object-cover"
// // //           />
// // //         </div>

// // //         {/* Ẩn nút chọn ảnh khi chưa bấm Sửa */}
// // //         {isEditing && (
// // //           <>
// // //             <label
// // //               htmlFor="file-upload"
// // //               className="cursor-pointer text-[#D33C3C] hover:underline"
// // //             >
// // //               📷 Chọn ảnh
// // //             </label>
// // //             <input
// // //               id="file-upload"
// // //               type="file"
// // //               accept="image/*"
// // //               onChange={handleFileChange}
// // //               className="hidden"
// // //             />
// // //           </>
// // //         )}
// // //       </div>

// // //       </div>
// // //     </UserLayout>
// // //   );
// // // }
// // 'use client';

// // import { useState, ChangeEvent, useEffect } from 'react';
// // import UserLayout from '@/app/components/UserLayout';
// // import toast from 'react-hot-toast';
// // import { useUser, updateUser, INguoiDung } from '@/app/hooks/useUser';

// // export default function HoSoPage() {
// //   const user = useUser();
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [hoTen, setHoTen] = useState('');
// //   const [sdt, setSdt] = useState('');
// //   const [ngaySinh, setNgaySinh] = useState('');
// //   const [file, setFile] = useState<File | null>(null);
// //   const [preview, setPreview] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(false);

// //   useEffect(() => {
// //     if (user) {
// //       setHoTen(user.ho_ten || '');
// //       setSdt(user.sdt || '');
// //       setNgaySinh(user.ngay_sinh || '');
// //       setPreview(user.hinh || null);
// //     }
// //   }, [user]);

// //   if (!user)
// //     return <p className="p-8 text-center text-gray-600">Đang tải thông tin...</p>;

// //   function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
// //     const f = e.target.files?.[0];
// //     if (f) {
// //       setFile(f);
// //       setPreview(URL.createObjectURL(f));
// //     }
// //   }

// //   async function handleCapNhat() {
// //     const token = localStorage.getItem('token');
// //     if (!token || !user) return;

// //     const formData = new FormData();
// //     formData.append('ho_ten', hoTen);
// //     formData.append('sdt', sdt);
// //     formData.append('ngay_sinh', ngaySinh);
// //     if (file) formData.append('hinh', file);

// //     setLoading(true);
// //     try {
// //       const res = await fetch('/api/ho_so', {
// //         method: 'POST',
// //         headers: { Authorization: `Bearer ${token}` },
// //         body: formData,
// //       });
// //       const data = await res.json();
// //       if (!res.ok) {
// //         toast.error(data.thong_bao || 'Lỗi cập nhật hồ sơ');
// //         return;
// //       }

// //       toast.success('Cập nhật thành công!');
// //       if (data.nguoi_dung) {
// //         updateUser(data.nguoi_dung);
// //         setPreview(data.nguoi_dung.hinh || null);
// //         setIsEditing(false);
// //       }
// //     } catch {
// //       toast.error('Lỗi kết nối máy chủ');
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   return (
// //     <UserLayout user={user}>
// //       <h2 className="text-3xl font-bold text-[#6A0A0A] mb-4">Thông Tin Hồ Sơ</h2>
// //       <p className="text-gray-500 mb-6">Quản lý thông tin cá nhân của bạn</p>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div className="space-y-4">
// //           <div>
// //             <label className="block mb-1 font-medium">Tên</label>
// //             <input
// //               type="text"
// //               value={hoTen}
// //               onChange={(e) => setHoTen(e.target.value)}
// //               className="w-full border p-2 rounded-lg bg-gray-50"
// //               readOnly={!isEditing}
// //             />
// //           </div>
// //           <div>
// //             <label className="block mb-1 font-medium">Email</label>
// //             <input
// //               type="text"
// //               value={user.email || ''}
// //               disabled
// //               className="w-full border p-2 bg-gray-100"
// //             />
// //           </div>
// //           <div>
// //             <label className="block mb-1 font-medium">Số điện thoại</label>
// //             <input
// //               type="text"
// //               value={sdt}
// //               onChange={(e) => setSdt(e.target.value)}
// //               className="w-full border p-2 rounded-lg bg-gray-50"
// //               readOnly={!isEditing}
// //             />
// //           </div>
// //           <div>
// //             <label className="block mb-1 font-medium">Ngày sinh</label>
// //             <input
// //               type="date"
// //               value={ngaySinh}
// //               onChange={(e) => setNgaySinh(e.target.value)}
// //               className="w-1/2 border p-2 rounded-lg bg-gray-50"
// //               readOnly={!isEditing}
// //             />
// //           </div>
// //           {isEditing ? (
// //             <button
// //               onClick={handleCapNhat}
// //               disabled={loading}
// //               className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg hover:bg-[#b53030] transition"
// //             >
// //               {loading ? 'Đang lưu...' : 'Cập nhật'}
// //             </button>
// //           ) : (
// //             <button
// //               onClick={() => setIsEditing(true)}
// //               className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
// //             >
// //               Sửa thông tin
// //             </button>
// //           )}
// //         </div>

// //         <div className="flex flex-col items-center space-y-3">
// //           <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#D33C3C]">
// //             <img
// //               src={preview || '/avatar.png'}
// //               alt="Avatar"
// //               className="w-full h-full object-cover"
// //             />
// //           </div>
// //           {isEditing && (
// //             <>
// //               <label
// //                 htmlFor="file-upload"
// //                 className="cursor-pointer text-[#D33C3C] hover:underline"
// //               >
// //                 📷 Chọn ảnh
// //               </label>
// //               <input
// //                 id="file-upload"
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleFileChange}
// //                 className="hidden"
// //               />
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </UserLayout>
// //   );
// // }
// 'use client';

// import { useState, ChangeEvent, useEffect } from 'react';
// import Image from 'next/image';
// import UserLayout from '@/app/components/UserLayout';
// import toast from 'react-hot-toast';
// import { useUser, updateUser, IUser } from '@/app/hooks/useUser';

// export default function HoSoPage() {
//   const user = useUser();

//   const [isEditing, setIsEditing] = useState(false);
//   const [hoTen, setHoTen] = useState(user?.ho_ten ?? '');
//   const [sdt, setSdt] = useState(user?.sdt ?? '');
//   const [ngaySinh, setNgaySinh] = useState(user?.ngay_sinh ?? '');
//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   // 🔄 Sync state khi user load xong
//   useEffect(() => {
//     if (user) {
//       setHoTen(user.ho_ten);
//       setSdt(user.sdt ?? '');
//       setNgaySinh(user.ngay_sinh ?? '');
//       setPreview(user.hinh ?? null);
//     }
//   }, [user]);

//   if (!user)
//     return <p className="p-8 text-center text-gray-600">Đang tải thông tin...</p>;

//   function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
//     const f = e.target.files?.[0];
//     if (f) {
//       setFile(f);
//       setPreview(URL.createObjectURL(f));
//     }
//   }

//   async function handleCapNhat() {
//     const token = localStorage.getItem('token');
//     if (!token || !user) return;

//     const formData = new FormData();
//     formData.append('ho_ten', hoTen);
//     formData.append('sdt', sdt);
//     formData.append('ngay_sinh', ngaySinh);
//     if (file) formData.append('hinh', file);

//     setLoading(true);
//     try {
//       const res = await fetch('/api/ho_so', {
//         method: 'POST',
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData,
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         toast.error(data.thong_bao || 'Lỗi cập nhật hồ sơ');
//         return;
//       }

//       toast.success('Cập nhật thành công!');
//       updateUser(data.nguoi_dung);
//       setIsEditing(false);
//       setPreview(data.nguoi_dung.hinh ?? null);
//     } catch {
//       toast.error('Lỗi kết nối máy chủ');
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <UserLayout user={user}>
//       <h2 className="text-3xl font-bold text-[#D33C3C] mb-4">Thông Tin Hồ Sơ</h2>
//       <p className="text-gray-500 mb-6">Quản lý thông tin cá nhân của bạn</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">Tên</label>
//             <input
//               type="text"
//               value={hoTen}
//               onChange={(e) => setHoTen(e.target.value)}
//               className="w-full border p-2 rounded-lg bg-gray-50"
//               readOnly={!isEditing}
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Email</label>
//             <input
//               type="text"
//               value={user.email ?? ''}
//               disabled
//               className="w-full border p-2 bg-gray-100"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Số điện thoại</label>
//             <input
//               type="text"
//               value={sdt}
//               onChange={(e) => setSdt(e.target.value)}
//               className="w-full border p-2 rounded-lg bg-gray-50"
//               readOnly={!isEditing}
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Ngày sinh</label>
//             <input
//               type="date"
//               value={ngaySinh}
//               onChange={(e) => setNgaySinh(e.target.value)}
//               className="w-1/2 border p-2 rounded-lg bg-gray-50"
//               readOnly={!isEditing}
//             />
//           </div>

//           {isEditing ? (
//             <button
//               onClick={handleCapNhat}
//               disabled={loading}
//               className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg hover:bg-[#b53030] transition"
//             >
//               {loading ? 'Đang lưu...' : 'Cập nhật'}
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
//             >
//               Sửa thông tin
//             </button>
//           )}
//         </div>

//         <div className="flex flex-col items-center space-y-3">
//           <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#D33C3C] relative">
//             <Image
//               src={preview ?? '/avatar.png'}
//               alt="Avatar"
//               fill
//               className="object-cover"
//             />
//           </div>

//           {isEditing && (
//             <>
//               <label
//                 htmlFor="file-upload"
//                 className="cursor-pointer text-[#D33C3C] hover:underline"
//               >
//                 📷 Chọn ảnh
//               </label>
//               <input
//                 id="file-upload"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//             </>
//           )}
//         </div>
//       </div>
//     </UserLayout>
//   );
// }
'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import UserLayout from '@/app/components/UserLayout';
import toast from 'react-hot-toast';
import { useUser, updateUser, IUser } from '@/app/hooks/useUser';

export default function HoSoPage() {
  const user = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [hoTen, setHoTen] = useState(user?.ho_ten ?? '');
  const [sdt, setSdt] = useState(user?.sdt ?? '');
  const [ngaySinh, setNgaySinh] = useState(user?.ngay_sinh ?? '');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔄 Sync user vào state
  useEffect(() => {
    if (user) {
      setHoTen(user.ho_ten);
      setSdt(user.sdt ?? '');
      setNgaySinh(user.ngay_sinh ?? '');
      setPreview(user.hinh || null); // tránh "" bị lỗi
    }
  }, [user]);

  if (!user)
    return <p className="p-8 text-center text-gray-600">Đang tải thông tin...</p>;

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  }

  async function handleCapNhat() {
    const token = localStorage.getItem('token');
    if (!token || !user) return;

    const formData = new FormData();
    formData.append('ho_ten', hoTen);
    formData.append('sdt', sdt);
    formData.append('ngay_sinh', ngaySinh);
    if (file) formData.append('hinh', file);

    setLoading(true);
    try {
      const res = await fetch('/api/ho_so', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.thong_bao || 'Lỗi cập nhật hồ sơ');
        return;
      }

      toast.success('Cập nhật thành công!');
      updateUser(data.nguoi_dung);

      // tránh "" hoặc "null"
      setPreview(data.nguoi_dung.hinh || null);
      setIsEditing(false);
    } catch {
      toast.error('Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  }

  // 🛡️ Avatar phải luôn là string hợp lệ
  const avatarSrc =
    preview && preview.trim() !== '' && preview !== 'null'
      ? preview
      : '/avatar.png';

  return (
    <UserLayout user={user}>
      <h2 className="text-3xl font-bold text-[#D33C3C] mb-4">Thông Tin Hồ Sơ</h2>
      <p className="text-gray-500 mb-6">Quản lý thông tin cá nhân của bạn</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Tên</label>
            <input
              type="text"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
              className="w-full border p-2 rounded-lg bg-gray-50"
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="text"
              value={user.email ?? ''}
              disabled
              className="w-full border p-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Số điện thoại</label>
            <input
              type="text"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
              className="w-full border p-2 rounded-lg bg-gray-50"
              readOnly={!isEditing}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Ngày sinh</label>
            <input
              type="date"
              value={ngaySinh}
              onChange={(e) => setNgaySinh(e.target.value)}
              className="w-1/2 border p-2 rounded-lg bg-gray-50"
              readOnly={!isEditing}
            />
          </div>

          {isEditing ? (
            <button
              onClick={handleCapNhat}
              disabled={loading}
              className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg hover:bg-[#b53030] transition"
            >
              {loading ? 'Đang lưu...' : 'Cập nhật'}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sửa thông tin
            </button>
          )}
        </div>

        <div className="flex flex-col items-center space-y-3">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#D33C3C] relative">
            <Image
              src={avatarSrc}
              alt="Avatar"
              fill
              className="object-cover"
            />
          </div>

          {isEditing && (
            <>
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-[#D33C3C] hover:underline"
              >
                📷 Chọn ảnh
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
