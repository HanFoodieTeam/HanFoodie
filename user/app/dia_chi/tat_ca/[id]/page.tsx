// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import UserLayout from '@/app/components/UserLayout';
// // import { IDiaChi } from '@/app/lib/cautrucdata';
// // import toast from 'react-hot-toast';

// // interface UserInfo {
// //   id: number;
// //   ho_ten: string;
// //   email: string;
// //   sdt: string;
// //   ngay_sinh: string;
// //   hinh?: string | null;
// // }

// // export default function DiaChiPage() {
// //   const [user, setUser] = useState<UserInfo | null>(null);
// //   const [danhSach, setDanhSach] = useState<IDiaChi[]>([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [formData, setFormData] = useState<Partial<IDiaChi>>({});
// //   const [isEdit, setIsEdit] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const router = useRouter();

// //   // 🟢 Lấy thông tin người dùng + danh sách địa chỉ
// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       toast.error('Bạn cần đăng nhập');
// //       router.push('/dang-nhap');
// //       return;
// //     }

// //     const fetchData = async () => {
// //       try {
// //         const [userRes, diaChiRes] = await Promise.all([
// //           fetch('/api/ho_so', { headers: { Authorization: `Bearer ${token}` } }),
// //           fetch('/api/dia_chi', { headers: { Authorization: `Bearer ${token}` } }),
// //         ]);

// //         const userData = await userRes.json();
// //         const diaChiData = await diaChiRes.json();

// //         if (userRes.ok) setUser(userData.nguoi_dung);
// //         if (diaChiRes.ok) setDanhSach(diaChiData);
// //       } catch (err) {
// //         console.error('Lỗi tải dữ liệu:', err);
// //         toast.error('Không thể tải dữ liệu');
// //       }
// //     };

// //     fetchData();
// //   }, [router]);

// //   // 🟡 Reload danh sách
// //   const reload = async () => {
// //     const token = localStorage.getItem('token');
// //     if (!token) return;
// //     const res = await fetch('/api/dia_chi', { headers: { Authorization: `Bearer ${token}` } });
// //     const data = await res.json();
// //     if (res.ok) setDanhSach(data);
// //   };

// //   // 🟢 Thêm / sửa / xóa
// //   const openAdd = () => {
// //     setFormData({});
// //     setIsEdit(false);
// //     setShowModal(true);
// //   };

// //   const openEdit = (dc: IDiaChi) => {
// //     setFormData(dc);
// //     setIsEdit(true);
// //     setShowModal(true);
// //   };

// //   const handleSave = async () => {
// //     const token = localStorage.getItem('token');
// //     if (!token) return toast.error('Bạn cần đăng nhập');

// //     const { ho_ten, sdt, ten_duong, phuong, tinh } = formData;
// //     if (!ho_ten || !sdt || !ten_duong || !phuong || !tinh)
// //       return toast.error('Vui lòng nhập đầy đủ thông tin');

// //     setLoading(true);
// //     try {
// //       const res = await fetch('/api/dia_chi', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await res.json();
// //       if (res.ok) {
// //         toast.success(data.message || 'Lưu thành công');
// //         setShowModal(false);
// //         reload();
// //       } else {
// //         toast.error(data.message || 'Lỗi khi lưu địa chỉ');
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       toast.error('Lỗi kết nối server');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id: number) => {
// //     if (!confirm('Bạn có chắc muốn xóa địa chỉ này?')) return;
// //     const token = localStorage.getItem('token');
// //     try {
// //       const res = await fetch(`/api/dia_chi?id=${id}`, {
// //         method: 'DELETE',
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       const data = await res.json();
// //       if (res.ok) {
// //         toast.success(data.message || 'Xóa thành công');
// //         reload();
// //       } else {
// //         toast.error(data.message || 'Không thể xóa địa chỉ');
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       toast.error('Lỗi kết nối máy chủ');
// //     }
// //   };

// //   if (!user)
// //     return <p className="p-8 text-gray-600 text-center">Đang tải thông tin...</p>;

// //   return (
// //     <UserLayout user={user}>
// //       {/* Tiêu đề + nút thêm */}
// //       <div className="mb-6">
// //         <h2 className="text-2xl font-bold text-[#6A0A0A] mb-2">Địa Chỉ</h2>
// //         <button
// //             onClick={openAdd}
// //             className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg shadow hover:bg-[#b22f2f] transition"
// //         >
// //             + Thêm địa chỉ
// //         </button>
// //         </div>


// //       {/* Danh sách địa chỉ */}
// //       <div className="space-y-4">
// //         {danhSach.length === 0 ? (
// //           <p className="text-gray-600 italic">Bạn chưa có địa chỉ nào.</p>
// //         ) : (
// //           danhSach.map((dc) => (
// //             <div
// //               key={dc.id}
// //               className="border border-gray-200 rounded-xl bg-white shadow-sm p-5 flex justify-between items-start hover:shadow-md transition"
// //             >
// //               <div>
// //                 <p className="font-semibold text-[#6A0A0A]">{dc.ho_ten}</p>
// //                 <p className="text-gray-600">{dc.sdt}</p>
// //                 <p className="text-gray-700">
// //                   {dc.ten_duong}, {dc.phuong}, {dc.tinh}
// //                 </p>
// //                 {dc.mac_dinh && (
// //                   <span className="text-[#D33C3C] text-sm font-medium">(Mặc định)</span>
// //                 )}
// //               </div>

// //               <div className="space-x-3">
// //                 <button
// //                   onClick={() => openEdit(dc)}
// //                   className="px-4 py-1 text-sm border rounded-lg hover:bg-gray-100"
// //                 >
// //                   Sửa
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(dc.id)}
// //                   className="px-4 py-1 text-sm border rounded-lg text-red-500 hover:bg-red-50"
// //                 >
// //                   Xóa
// //                 </button>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       {/* Modal thêm / sửa */}
// //       {showModal && (
// //         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
// //           <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] md:w-[480px]">
// //             <h2 className="text-xl font-bold text-[#6A0A0A] mb-4">
// //               {isEdit ? 'Sửa địa chỉ' : 'Thêm địa chỉ'}
// //             </h2>

// //             <div className="space-y-3">
// //               <input
// //                 type="text"
// //                 placeholder="Họ tên"
// //                 className="w-full border p-2 rounded"
// //                 value={formData.ho_ten || ''}
// //                 onChange={(e) => setFormData({ ...formData, ho_ten: e.target.value })}
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Số điện thoại"
// //                 className="w-full border p-2 rounded"
// //                 value={formData.sdt || ''}
// //                 onChange={(e) => setFormData({ ...formData, sdt: e.target.value })}
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Tên đường, số nhà"
// //                 className="w-full border p-2 rounded"
// //                 value={formData.ten_duong || ''}
// //                 onChange={(e) => setFormData({ ...formData, ten_duong: e.target.value })}
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Phường/Xã"
// //                 className="w-full border p-2 rounded"
// //                 value={formData.phuong || ''}
// //                 onChange={(e) => setFormData({ ...formData, phuong: e.target.value })}
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Tỉnh/Thành phố"
// //                 className="w-full border p-2 rounded"
// //                 value={formData.tinh || ''}
// //                 onChange={(e) => setFormData({ ...formData, tinh: e.target.value })}
// //               />

// //               <label className="flex items-center space-x-2 text-sm">
// //                 <input
// //                   type="checkbox"
// //                   checked={!!formData.mac_dinh}
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, mac_dinh: e.target.checked })
// //                   }
// //                 />
// //                 <span>Đặt làm địa chỉ mặc định</span>
// //               </label>
// //             </div>

// //             <div className="flex justify-end mt-6 space-x-3">
// //               <button
// //                 onClick={() => setShowModal(false)}
// //                 className="px-4 py-2 border rounded-lg hover:bg-gray-100"
// //               >
// //                 Hủy
// //               </button>
// //               <button
// //                 disabled={loading}
// //                 onClick={handleSave}
// //                 className="px-4 py-2 bg-[#D33C3C] text-white rounded-lg hover:bg-[#b22f2f] transition"
// //               >
// //                 {loading ? 'Đang lưu...' : 'Lưu'}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </UserLayout>
// //   );
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useUser } from '@/app/hooks/useUser';
// import UserLayout from '@/app/components/UserLayout';
// import { IDiaChi } from '@/app/lib/cautrucdata';
// import toast from 'react-hot-toast';

// export default function DiaChiPage() {
//   const user = useUser();
//   const router = useRouter();

//   const [danhSach, setDanhSach] = useState<IDiaChi[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState<Partial<IDiaChi>>({});
//   const [isEdit, setIsEdit] = useState(false);

//   // 🟢 Lấy danh sách địa chỉ
//   useEffect(() => {
//     if (!user) return;
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/dang-nhap');
//       return;
//     }

//     async function fetchDiaChi() {
//       setLoading(true);
//       try {
//         const res = await fetch('/api/dia_chi', {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         if (res.ok) setDanhSach(data);
//         else toast.error('Không thể tải địa chỉ');
//       } catch {
//         toast.error('Lỗi kết nối máy chủ');
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchDiaChi();
//   }, [user, router]);

//   // 🟡 Reload danh sách
//   const reload = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return;
//     const res = await fetch('/api/dia_chi', {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (res.ok) setDanhSach(data);
//   };

//   // 🟢 Thêm / sửa / xóa
//   const openAdd = () => {
//     setFormData({});
//     setIsEdit(false);
//     setShowModal(true);
//   };

//   const openEdit = (dc: IDiaChi) => {
//     setFormData(dc);
//     setIsEdit(true);
//     setShowModal(true);
//   };

//   const handleSave = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) return toast.error('Bạn cần đăng nhập');

//     const { ho_ten, sdt, ten_duong, phuong, tinh } = formData;
//     if (!ho_ten || !sdt || !ten_duong || !phuong || !tinh)
//       return toast.error('Vui lòng nhập đầy đủ thông tin');

//     setLoading(true);
//     try {
//       const res = await fetch('/api/dia_chi', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();

//       if (res.ok) {
//         toast.success(data.message || 'Lưu thành công');
//         setShowModal(false);
//         reload();
//       } else {
//         toast.error(data.message || 'Lỗi khi lưu địa chỉ');
//       }
//     } catch {
//       toast.error('Lỗi kết nối máy chủ');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm('Bạn có chắc muốn xóa địa chỉ này?')) return;
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       const res = await fetch(`/api/dia_chi?id=${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (res.ok) {
//         toast.success(data.message || 'Xóa thành công');
//         reload();
//       } else {
//         toast.error(data.message || 'Không thể xóa địa chỉ');
//       }
//     } catch {
//       toast.error('Lỗi kết nối server');
//     }
//   };

//   // 🟣 Nếu chưa có user
//   if (!user)
//     return <p className="p-8 text-center text-gray-600">Đang tải thông tin...</p>;

//   // 🟢 Giao diện
//   return (
//     <UserLayout user={user}>
//       <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
//          <div className="mb-6">
//          <h2 className="text-2xl font-bold text-[#6A0A0A] mb-2">Địa Chỉ</h2>
//         <button
//              onClick={openAdd}
//             className="bg-[#D33C3C] text-white px-5 py-2 rounded-lg shadow hover:bg-[#b22f2f] transition"
//          >
//              + Thêm địa chỉ
//          </button>
//          </div>

//         {loading ? (
//           <p className="text-center text-gray-500">Đang tải...</p>
//         ) : danhSach.length === 0 ? (
//           <p className="text-gray-600 italic">Bạn chưa có địa chỉ nào.</p>
//         ) : (
//           danhSach.map((dc) => (
//             <div
//               key={dc.id}
//               className="border border-gray-200 rounded-xl bg-white shadow-sm p-5 flex justify-between items-start hover:shadow-md transition"
//             >
//               <div>
//                 <p className="font-semibold text-[#6A0A0A]">{dc.ho_ten}</p>
//                 <p className="text-gray-600">{dc.sdt}</p>
//                 <p className="text-gray-700">
//                   {dc.ten_duong}, {dc.phuong}, {dc.tinh}
//                 </p>
//                 {dc.mac_dinh && (
//                   <span className="text-[#D33C3C] text-sm font-medium">(Mặc định)</span>
//                 )}
//               </div>

//               <div className="space-x-3">
//                 <button
//                   onClick={() => openEdit(dc)}
//                   className="px-4 py-1 text-sm border rounded-lg hover:bg-gray-100"
//                 >
//                   Sửa
//                 </button>
//                 <button
//                   onClick={() => handleDelete(dc.id)}
//                   className="px-4 py-1 text-sm border rounded-lg text-red-500 hover:bg-red-50"
//                 >
//                   Xóa
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* 🟡 Modal thêm/sửa */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] md:w-[480px]">
//             <h2 className="text-xl font-bold text-[#6A0A0A] mb-4">
//               {isEdit ? 'Sửa địa chỉ' : 'Thêm địa chỉ'}
//             </h2>

//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Họ tên"
//                 className="w-full border p-2 rounded"
//                 value={formData.ho_ten || ''}
//                 onChange={(e) => setFormData({ ...formData, ho_ten: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Số điện thoại"
//                 className="w-full border p-2 rounded"
//                 value={formData.sdt || ''}
//                 onChange={(e) => setFormData({ ...formData, sdt: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Tên đường, số nhà"
//                 className="w-full border p-2 rounded"
//                 value={formData.ten_duong || ''}
//                 onChange={(e) => setFormData({ ...formData, ten_duong: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Phường/Xã"
//                 className="w-full border p-2 rounded"
//                 value={formData.phuong || ''}
//                 onChange={(e) => setFormData({ ...formData, phuong: e.target.value })}
//               />
//               <input
//                 type="text"
//                 placeholder="Tỉnh/Thành phố"
//                 className="w-full border p-2 rounded"
//                 value={formData.tinh || ''}
//                 onChange={(e) => setFormData({ ...formData, tinh: e.target.value })}
//               />

//               <label className="flex items-center space-x-2 text-sm">
//                 <input
//                   type="checkbox"
//                   checked={!!formData.mac_dinh}
//                   onChange={(e) =>
//                     setFormData({ ...formData, mac_dinh: e.target.checked })
//                   }
//                 />
//                 <span>Đặt làm địa chỉ mặc định</span>
//               </label>
//             </div>

//             <div className="flex justify-end mt-6 space-x-3">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded-lg hover:bg-gray-100"
//               >
//                 Hủy
//               </button>
//               <button
//                 disabled={loading}
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-[#D33C3C] text-white rounded-lg hover:bg-[#b22f2f] transition"
//               >
//                 {loading ? 'Đang lưu...' : 'Lưu'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </UserLayout>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/hooks/useUser';
import UserLayout from '@/app/components/UserLayout';
import { IDiaChi } from '@/lib/cautrucdata';
import toast from 'react-hot-toast';

export default function DiaChiPage() {
  const user = useUser();
  const router = useRouter();

  const [danhSach, setDanhSach] = useState<IDiaChi[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<IDiaChi>>({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/dang-nhap');
      return;
    }

    async function fetchDiaChi() {
      setLoading(true);
      try {
        const res = await fetch('/api/dia_chi', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setDanhSach(data);
        else toast.error('Không thể tải địa chỉ');
      } catch {
        toast.error('Lỗi kết nối máy chủ');
      } finally {
        setLoading(false);
      }
    }

    fetchDiaChi();
  }, [user, router]);

  const reload = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    const res = await fetch('/api/dia_chi', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setDanhSach(data);
  };

  const openAdd = () => {
    setFormData({});
    setIsEdit(false);
    setShowModal(true);
  };

  const openEdit = (dc: IDiaChi) => {
    setFormData(dc);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return toast.error('Bạn cần đăng nhập');

    const { ho_ten, sdt, ten_duong, phuong, tinh } = formData;
    if (!ho_ten || !sdt || !ten_duong || !phuong || !tinh)
      return toast.error('Vui lòng nhập đầy đủ thông tin');

    setLoading(true);
    try {
      const res = await fetch('/api/dia_chi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || 'Lưu thành công');
        setShowModal(false);
        reload();
      } else {
        toast.error(data.message || 'Lỗi khi lưu địa chỉ');
      }
    } catch {
      toast.error('Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa địa chỉ này?')) return;
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`/api/dia_chi?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'Xóa thành công');
        reload();
      } else {
        toast.error(data.message || 'Không thể xóa địa chỉ');
      }
    } catch {
      toast.error('Lỗi kết nối server');
    }
  };

  if (!user)
    return <p className="p-8 text-center text-gray-600">Đang tải thông tin...</p>;

  return (
    <UserLayout >
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
        {/* Tiêu đề + nút thêm ngang hàng */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#6A0A0A]">Địa Chỉ</h2>
          <button
            onClick={openAdd}
            className="bg-[#D33C3C] text-white px-4 py-2 rounded-lg shadow hover:bg-[#b22f2f] transition"
          >
            + Thêm
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Đang tải...</p>
        ) : danhSach.length === 0 ? (
          <p className="text-gray-600 italic">Bạn chưa có địa chỉ nào.</p>
        ) : (
          <div className="space-y-4">
            {danhSach.map((dc) => (
              <div
                key={dc.id}
                className="border border-gray-200 rounded-xl bg-white shadow-sm p-4 flex justify-between items-center hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold text-[#6A0A0A]">{dc.ho_ten}</p>
                  <p className="text-gray-600 text-sm">
                    {dc.ten_duong}, {dc.phuong}, {dc.tinh} • {dc.sdt}
                    {dc.mac_dinh && (
                      <span className="text-[#D33C3C] font-medium ml-2">(Mặc định)</span>
                    )}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => openEdit(dc)}
                    className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(dc.id)}
                    className="px-3 py-1 text-sm border rounded-lg text-red-500 hover:bg-red-50"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal thêm/sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] md:w-[480px]">
            <h2 className="text-xl font-bold text-[#6A0A0A] mb-4">
              {isEdit ? 'Sửa địa chỉ' : 'Thêm địa chỉ'}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Họ tên"
                className="w-full border p-2 rounded"
                value={formData.ho_ten || ''}
                onChange={(e) => setFormData({ ...formData, ho_ten: e.target.value })}
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="w-full border p-2 rounded"
                value={formData.sdt || ''}
                onChange={(e) => setFormData({ ...formData, sdt: e.target.value })}
              />
              <input
                type="text"
                placeholder="Tên đường, số nhà"
                className="w-full border p-2 rounded"
                value={formData.ten_duong || ''}
                onChange={(e) => setFormData({ ...formData, ten_duong: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phường/Xã"
                className="w-full border p-2 rounded"
                value={formData.phuong || ''}
                onChange={(e) => setFormData({ ...formData, phuong: e.target.value })}
              />
              <input
                type="text"
                placeholder="Tỉnh/Thành phố"
                className="w-full border p-2 rounded"
                value={formData.tinh || ''}
                onChange={(e) => setFormData({ ...formData, tinh: e.target.value })}
              />

              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!formData.mac_dinh}
                  onChange={(e) =>
                    setFormData({ ...formData, mac_dinh: e.target.checked })
                  }
                />
                <span>Đặt làm địa chỉ mặc định</span>
              </label>
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                disabled={loading}
                onClick={handleSave}
                className="px-4 py-2 bg-[#D33C3C] text-white rounded-lg hover:bg-[#b22f2f] transition"
              >
                {loading ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}
