
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UserInfo {
  ho_ten: string;
  email: string;
  sdt: string;
  ngay_sinh: string;
}

export default function HoSoPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [thongBao, setThongBao] = useState('');
  const router = useRouter();

  const [ghiChu, setGhiChu] = useState<string>("");


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

  async function handleCapNhat() {
    if (!user) return;

    const token = localStorage.getItem('token');
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
            <li className="cursor-pointer text-emerald-500 font-medium"
                onClick={() => router.push('/ho_so')}>
              Hồ Sơ
            </li>
            <li className="cursor-pointer hover:text-emerald-500">
              Ngân Hàng
            </li>
            <li className="cursor-pointer hover:text-emerald-500"
              onClick={() => router.push('/dia_chi/tat_ca/[id]')}>
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

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800">Thông tin đơn hàng</h2>

        {/* Nội dung đơn hàng sẽ được hiển thị ở đây */}
      </main>
    </div>
  );
}
