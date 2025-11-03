'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IDiaChi } from '@/app/lib/cautrucdata';

interface UserInfo {
  ho_ten: string;
  email: string;
  sdt: string;
  ngay_sinh: string;
}

export default function DiaChiPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [danhSach, setDanhSach] = useState<IDiaChi[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<IDiaChi>>({});
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🟢 Lấy thông tin người dùng + danh sách địa chỉ
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bạn cần đăng nhập');
      router.push('/dang-nhap');
      return;
    }

    const fetchData = async () => {
      try {
        const [userRes, diaChiRes] = await Promise.all([
          fetch('/api/ho_so', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/dia_chi', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        const userData = await userRes.json();
        const diaChiData = await diaChiRes.json();

        if (userRes.ok) setUser(userData.nguoi_dung);
        if (diaChiRes.ok) setDanhSach(diaChiData);
      } catch (err) {
        console.error('Lỗi tải dữ liệu:', err);
      }
    };

    fetchData();
  }, [router]);

  // 🟢 Load lại danh sách địa chỉ
  const reload = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const res = await fetch('/api/dia_chi', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setDanhSach(data);
  };

  // 🟢 Thêm
  const openAdd = () => {
    setFormData({});
    setIsEdit(false);
    setShowModal(true);
  };

  // 🟢 Sửa
  const openEdit = (dc: IDiaChi) => {
    setFormData(dc);
    setIsEdit(true);
    setShowModal(true);
  };

  // 🟢 Lưu (thêm / sửa)
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Bạn cần đăng nhập');

    const { ho_ten, sdt, ten_duong, phuong, tinh } = formData;
    if (!ho_ten || !sdt || !ten_duong || !phuong || !tinh)
      return alert('Vui lòng nhập đầy đủ thông tin');

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
      alert(data.message);
      if (res.ok) {
        setShowModal(false);
        reload();
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  // 🔴 Xóa
  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa địa chỉ này?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/dia_chi?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      alert(data.message);
      reload();
    } catch (err) {
      console.error(err);
      alert('Lỗi xóa địa chỉ');
    }
  };

  if (!user)
    return <p className="p-8 text-gray-600">Đang tải thông tin...</p>;

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-[25%] md:w-[20%] bg-white shadow-md border-r">
        <div className="flex flex-col items-center mt-6">
          <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
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
            <li className="cursor-pointer hover:text-emerald-500">
              Ngân Hàng
            </li>
            <li
              className="cursor-pointer text-emerald-500 font-medium"
              onClick={() => router.push('/dia_chi')}
            >
              Địa Chỉ
            </li>
            <li
              className="cursor-pointer hover:text-emerald-500"
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

      {/* Nội dung chính */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800">Địa chỉ</h2>
        <p className="text-gray-500 mb-6">Quản lý địa chỉ giao hàng</p>

        <div className="flex justify-end mb-4">
          <button
            onClick={openAdd}
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
          >
            + Thêm địa chỉ
          </button>
        </div>

        <div className="space-y-4">
          {danhSach.length === 0 ? (
            <p>Chưa có địa chỉ nào.</p>
          ) : (
            danhSach.map((dc) => (
              <div
                key={dc.id}
                className="border rounded-lg bg-white shadow p-4 flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold">{dc.ho_ten}</p>
                  <p className="text-gray-600">{dc.sdt}</p>
                  <p className="text-gray-700">
                    {dc.ten_duong}, {dc.phuong}, {dc.tinh}
                  </p>
                  {dc.mac_dinh && (
                    <span className="text-emerald-500 text-sm font-medium">
                      (Mặc định)
                    </span>
                  )}
                </div>

                <div className="space-x-2">
                  <button
                    onClick={() => openEdit(dc)}
                    className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(dc.id)}
                    className="px-3 py-1 text-sm border rounded text-red-500 hover:bg-red-50"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal thêm / sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px]">
            <h2 className="text-xl font-bold mb-4">
              {isEdit ? 'Sửa địa chỉ' : 'Thêm địa chỉ'}
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Họ tên"
                className="w-full border p-2 rounded"
                value={formData.ho_ten || ''}
                onChange={(e) =>
                  setFormData({ ...formData, ho_ten: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                className="w-full border p-2 rounded"
                value={formData.sdt || ''}
                onChange={(e) =>
                  setFormData({ ...formData, sdt: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Tên đường, số nhà"
                className="w-full border p-2 rounded"
                value={formData.ten_duong || ''}
                onChange={(e) =>
                  setFormData({ ...formData, ten_duong: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phường/Xã"
                className="w-full border p-2 rounded"
                value={formData.phuong || ''}
                onChange={(e) =>
                  setFormData({ ...formData, phuong: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Tỉnh/Thành phố"
                className="w-full border p-2 rounded"
                value={formData.tinh || ''}
                onChange={(e) =>
                  setFormData({ ...formData, tinh: e.target.value })
                }
              />

              <label className="flex items-center space-x-2">
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

            <div className="flex justify-end mt-5 space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                disabled={loading}
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
              >
                {loading ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
 }
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { IDiaChi } from "@/app/lib/cautrucdata";

// interface Province {
//   province_id: string;
//   province_name: string;
// }

// interface District {
//   district_id: string;
//   district_name: string;
// }

// export default function DiaChiPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<{ ho_ten?: string }>({});
//   const [danhSach, setDanhSach] = useState<IDiaChi[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState<Partial<IDiaChi>>({});
//   const [isEdit, setIsEdit] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // 🔽 Dropdown dữ liệu tỉnh/huyện
//   const [provinces, setProvinces] = useState<Province[]>([]);
//   const [districts, setDistricts] = useState<District[]>([]);
//   const [provinceError, setProvinceError] = useState(false);
//   const [districtError, setDistrictError] = useState(false);

//   // 🟢 Lấy danh sách địa chỉ
//   const loadDiaChi = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return router.push("/dang-nhap");
//       const res = await fetch("/api/dia_chi", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       setDanhSach(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🟢 Fetch danh sách tỉnh
//   const fetchProvinces = async () => {
//     try {
//       const res = await fetch("https://vapi.vnappmob.com/api/province/");
//       const data = await res.json();
//       if (data && data.results?.length) {
//         setProvinces(data.results as Province[]);
//         setProvinceError(false);
//       } else {
//         setProvinceError(true);
//       }
//     } catch {
//       setProvinceError(true);
//     }
//   };

//   // 🟢 Fetch danh sách huyện
//   const fetchDistricts = async (provinceId: string) => {
//     if (!provinceId) return;
//     try {
//       const res = await fetch(
//         `https://vapi.vnappmob.com/api/province/district/${provinceId}`
//       );
//       const data = await res.json();
//       if (data && data.results?.length) {
//         setDistricts(data.results as District[]);
//         setDistrictError(false);
//       } else {
//         setDistrictError(true);
//       }
//     } catch {
//       setDistrictError(true);
//     }
//   };

//   useEffect(() => {
//     loadDiaChi();
//     fetchProvinces();
//     // Giả lập user từ localStorage nếu có
//     const userStr = localStorage.getItem("user");
//     if (userStr) setUser(JSON.parse(userStr));
//   }, []);

//   const openAdd = () => {
//     setFormData({});
//     setIsEdit(false);
//     setShowModal(true);
//     setDistricts([]);
//   };

//   const openEdit = (dc: IDiaChi) => {
//     setFormData(dc);
//     setIsEdit(true);
//     setShowModal(true);
//     // Gọi huyện tương ứng nếu có tỉnh
//     const province = provinces.find((p) => p.province_name === dc.tinh);
//     if (province) fetchDistricts(province.province_id);
//   };

//   const handleSave = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) return alert("Bạn cần đăng nhập");

//     const { ho_ten, sdt, ten_duong, phuong, tinh } = formData;
//     if (!ho_ten || !sdt || !ten_duong || !phuong || !tinh)
//       return alert("Vui lòng nhập đầy đủ thông tin");

//     setLoading(true);
//     try {
//       const res = await fetch("/api/dia_chi", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       alert(data.message);
//       if (res.ok) {
//         setShowModal(false);
//         loadDiaChi();
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi kết nối server");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (!confirm("Bạn có chắc muốn xóa địa chỉ này?")) return;
//     const token = localStorage.getItem("token");
//     try {
//       const res = await fetch(`/api/dia_chi?id=${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const data = await res.json();
//       alert(data.message);
//       loadDiaChi();
//     } catch (err) {
//       console.error(err);
//       alert("Lỗi xóa địa chỉ");
//     }
//   };

//   return (
//     <div className="flex w-full min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside className="w-[25%] md:w-[20%] bg-white shadow-md border-r">
//         <div className="flex flex-col items-center mt-6">
//           <div className="w-24 h-24 bg-emerald-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
//             {user.ho_ten ? user.ho_ten.charAt(0).toUpperCase() : "U"}
//           </div>
//           <p className="mt-3 font-semibold text-gray-700">{user.ho_ten}</p>
//         </div>

//         <div className="mt-8 px-4">
//           <ul className="space-y-3 text-gray-700">
//             <li className="font-semibold border-b pb-2">Tài Khoản Của Tôi</li>
//             <li
//               className="cursor-pointer text-emerald-500 font-medium"
//               onClick={() => router.push("/ho_so")}
//             >
//               Hồ Sơ
//             </li>
//             <li className="cursor-pointer hover:text-emerald-500">
//               Ngân Hàng
//             </li>
//             <li
//               className="cursor-pointer hover:text-emerald-500"
//               onClick={() => router.push("/dia_chi/tat_ca/[id]")}
//             >
//               Địa Chỉ
//             </li>
//             <li
//               className="cursor-pointer hover:text-emerald-500"
//               onClick={() => router.push("/doi_mat_khau")}
//             >
//               Đổi Mật Khẩu
//             </li>
//             <li
//               className="cursor-pointer hover:text-emerald-500 mt-4"
//               onClick={() => router.push("/don_hang")}
//             >
//               Đơn Hàng
//             </li>
//           </ul>
//         </div>
//       </aside>

//       {/* Nội dung */}
//       <div className="flex-1 p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-700">Địa chỉ của tôi</h1>
//           <button
//             onClick={openAdd}
//             className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
//           >
//             + Thêm địa chỉ
//           </button>
//         </div>

//         {/* Danh sách địa chỉ */}
//         <div className="space-y-4">
//           {danhSach.length === 0 ? (
//             <p>Chưa có địa chỉ nào.</p>
//           ) : (
//             danhSach.map((dc) => (
//               <div
//                 key={dc.id}
//                 className="border rounded-lg bg-white shadow p-4 flex justify-between items-start"
//               >
//                 <div>
//                   <p className="font-semibold">{dc.ho_ten}</p>
//                   <p className="text-gray-600">{dc.sdt}</p>
//                   <p className="text-gray-700">
//                     {dc.ten_duong}, {dc.phuong}, {dc.tinh}
//                   </p>
//                   {dc.mac_dinh && (
//                     <span className="text-emerald-500 text-sm font-medium">
//                       (Mặc định)
//                     </span>
//                   )}
//                 </div>
//                 <div className="space-x-2">
//                   <button
//                     onClick={() => openEdit(dc)}
//                     className="px-3 py-1 text-sm border rounded hover:bg-gray-100"
//                   >
//                     Sửa
//                   </button>
//                   <button
//                     onClick={() => handleDelete(dc.id)}
//                     className="px-3 py-1 text-sm border rounded text-red-500 hover:bg-red-50"
//                   >
//                     Xóa
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Modal thêm / sửa */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[500px]">
//             <h2 className="text-xl font-bold mb-4">
//               {isEdit ? "Sửa địa chỉ" : "Thêm địa chỉ"}
//             </h2>

//             <div className="space-y-3">
//               <input
//                 type="text"
//                 placeholder="Họ tên"
//                 className="w-full border p-2 rounded"
//                 value={formData.ho_ten || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, ho_ten: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Số điện thoại"
//                 className="w-full border p-2 rounded"
//                 value={formData.sdt || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, sdt: e.target.value })
//                 }
//               />
//               <input
//                 type="text"
//                 placeholder="Tên đường, số nhà"
//                 className="w-full border p-2 rounded"
//                 value={formData.ten_duong || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, ten_duong: e.target.value })
//                 }
//               />

//               {/* 🔽 Dropdown Tỉnh (hoặc nhập tay nếu lỗi API) */}
//               {provinceError ? (
//                 <input
//                   type="text"
//                   placeholder="Nhập tỉnh/thành phố"
//                   className="w-full border p-2 rounded"
//                   value={formData.tinh || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, tinh: e.target.value })
//                   }
//                 />
//               ) : (
//                 <select
//                   className="w-full border p-2 rounded"
//                   value={
//                     provinces.find((p) => p.province_name === formData.tinh)
//                       ?.province_id || ""
//                   }
//                   onChange={(e) => {
//                     const selectedProvince = provinces.find(
//                       (p) => p.province_id === e.target.value
//                     );
//                     setFormData({
//                       ...formData,
//                       tinh: selectedProvince?.province_name ?? "",
//                       phuong: "",
//                     });
//                     fetchDistricts(e.target.value);
//                   }}
//                 >
//                   <option value="">Chọn tỉnh/thành phố</option>
//                   {provinces.map((p) => (
//                     <option key={p.province_id} value={p.province_id}>
//                       {p.province_name}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               {/* 🔽 Dropdown Huyện (hoặc nhập tay nếu lỗi API) */}
//               {districtError ? (
//                 <input
//                   type="text"
//                   placeholder="Nhập quận/huyện"
//                   className="w-full border p-2 rounded"
//                   value={formData.phuong || ""}
//                   onChange={(e) =>
//                     setFormData({ ...formData, phuong: e.target.value })
//                   }
//                 />
//               ) : (
//                 <select
//                   className="w-full border p-2 rounded"
//                   disabled={districts.length === 0}
//                   value={
//                     districts.find((d) => d.district_name === formData.phuong)
//                       ?.district_id || ""
//                   }
//                   onChange={(e) => {
//                     const selectedDistrict = districts.find(
//                       (d) => d.district_id === e.target.value
//                     );
//                     setFormData({
//                       ...formData,
//                       phuong: selectedDistrict?.district_name ?? "",
//                     });
//                   }}
//                 >
//                   <option value="">Chọn quận/huyện</option>
//                   {districts.map((d) => (
//                     <option key={d.district_id} value={d.district_id}>
//                       {d.district_name}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               <label className="flex items-center space-x-2">
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

//             <div className="flex justify-end mt-5 space-x-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 border rounded hover:bg-gray-100"
//               >
//                 Hủy
//               </button>
//               <button
//                 disabled={loading}
//                 onClick={handleSave}
//                 className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
//               >
//                 {loading ? "Đang lưu..." : "Lưu"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
