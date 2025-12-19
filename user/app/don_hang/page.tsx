'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IDonHang, TrangThaiDonHang } from '@/lib/cautrucdata';
import UserLayout from '@/app/components/UserLayout';
import { useUser } from '@/app/hooks/useUser';
import Image from 'next/image';

interface ISanPhamDonHang {
  id: number;
  ten: string;
  hinh: string | null;
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

  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // 👉 Xử lý ảnh từ DB (Cloudinary / Google Drive / link thường / null)
  function xuLyAnh(hinh: string | null | undefined): string {
    if (!hinh || !hinh.trim()) return '/noing.png';

    const url = hinh.trim();

    // Cloudinary URL → dùng luôn
    if (url.includes('cloudinary.com')) return url;

    // Link Google Drive dạng "file/d/ID/view"
    if (url.includes('drive.google.com') && url.includes('/file/d/')) {
      const id = url.split('/file/d/')[1]?.split('/')[0];
      return id ? `https://drive.google.com/uc?id=${id}` : '/noing.png';
    }

    // Link Google Drive dạng "uc?id="
    if (url.includes('drive.google.com') && url.includes('uc?id=')) {
      return url;
    }

    // Link tự nhập (IMG direct, website, FB...) → dùng luôn
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    // Nếu là đường dẫn local → phải public folder
    return `/uploads/${url}`;
  }

  // ================== FETCH ĐƠN HÀNG ==================
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    async function fetchDonHang() {
      try {
        setLoading(true);

        const queryTrangThai = tab === 'tat_ca' ? '' : `&trang_thai=${tab}`;

        const res = await fetch(
          `/api/don_hang?page=${page}&limit=${limit}${queryTrangThai}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = await res.json();

        if (res.ok) {
          setDonHang(data.data || []);
          setTotalPages(data.totalPages || 1);
        } else {
          setDonHang([]);
        }
      } catch (error) {
        console.error('Lỗi tải đơn hàng:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDonHang();
  }, [tab, user, page]);

  useEffect(() => {
    setPage(1);
  }, [tab]);

  // ================== MUA LẠI ==================
  const handleMuaLai = (don: IDonHang) => {
    if (!('danh_sach_san_pham' in don)) return;

    const dsSanPham = (don as { danh_sach_san_pham: ISanPhamDonHang[] })
      .danh_sach_san_pham;

    if (!Array.isArray(dsSanPham)) return;

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
          hinh: xuLyAnh(sp.hinh),
          gia_goc: sp.gia,
        },
      },
      json_mon_them: sp.json_mon_them ?? [],
      json_tuy_chon: sp.json_tuy_chon ?? {},
    }));

    localStorage.setItem('donHangTam', JSON.stringify(danhSachTam));
    router.push('/dat_hang');
  };

  // ================== HỦY ĐƠN ==================
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
          prev.map((d) => (d.id === id ? { ...d, trang_thai: 'da_huy' } : d))
        );
      } else {
        alert('Không thể hủy đơn hàng');
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối máy chủ');
    }
  };

  if (!user)
    return <p className="p-8 text-center text-gray-600">Đang tải...</p>;

  return (
    <UserLayout >
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

      {/* Danh sách đơn */}
      {loading ? (
        <p className="text-center text-gray-500">Đang tải đơn hàng...</p>
      ) : donHang.length === 0 ? (
        <p className="text-gray-600 italic">Không có đơn hàng nào.</p>
      ) : (
        <>
          {donHang.map((dh) => {
            const dsSanPham =
              'danh_sach_san_pham' in dh &&
              Array.isArray(dh.danh_sach_san_pham)
                ? (dh.danh_sach_san_pham as ISanPhamDonHang[])
                : [];

            return (
              <div
                key={dh.id}
                className="border p-4 rounded-xl bg-white shadow-sm mb-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-[#6A0A0A]">
                    Mã đơn: {dh.ma_don}
                  </p>

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
                    {TRANG_THAI.find((t) => t.key === dh.trang_thai)?.label ||
                      'Đang xử lý'}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-3">
                  Thời gian đặt:{' '}
                  {new Date(dh.ngay_tao).toLocaleString('vi-VN', {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </p>


                <div className="space-y-2">
                  {dsSanPham.map((sp, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 p-4 rounded-xl bg-white shadow-sm mb-4 hover:shadow-md transition"
                    >
                      <Image
                        src={xuLyAnh(sp.hinh)}
                        alt={sp.ten}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <p className="font-medium">{sp.ten}</p>

                        {sp.ten_bien_the && (
                          <p className="text-sm text-gray-600">
                            {sp.ten_bien_the}
                          </p>
                        )}

                        {sp.json_mon_them?.length ? (
                          <p className="text-sm text-gray-600">
                            {sp.json_mon_them.map((m) => m.ten).join(', ')}
                          </p>
                        ) : null}

                        <p className="text-sm text-gray-500">
                          Số lượng: {sp.so_luong}
                        </p>
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
                      onClick={() =>
                        router.push(`/chi_tiet_don_hang/${dh.id}`)
                      }
                      className="px-3 py-1 border rounded-lg text-blue-600 hover:bg-blue-50"
                    >
                      Xem chi tiết
                    </button>

                    {(dh.trang_thai === 'da_giao' ||
                      dh.trang_thai === 'da_huy') && (
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
          })}

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className={`px-4 py-2 border rounded-lg ${
                page === 1
                  ? 'text-gray-400 border-gray-300'
                  : 'hover:bg-gray-100'
              }`}
            >
              ← Trước
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 border rounded-lg ${
                  page === p
                    ? 'bg-[#e8594f] text-white border-[#e8594f]'
                    : 'hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 border rounded-lg ${
                page === totalPages
                  ? 'text-gray-400 border-gray-300'
                  : 'hover:bg-gray-100'
              }`}
            >
              Sau →
            </button>
          </div>
        </>
      )}
    </UserLayout>
  );
}
