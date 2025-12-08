"use client";
import { useSearchParams } from "next/navigation";

export default function KetQuaThanhToan() {
  const q = useSearchParams();
  const status = q.get("status");
  const id = q.get("id");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">

        {status === "success" && ( <>
            <h2 className="text-green-600 text-2xl font-bold mb-3">
              🎉 Thanh toán thành công!
            </h2>
            <p className="mb-4">Cảm ơn bạn đã mua hàng tại HanFoodie.</p>

            <a href={`/chi_tiet_don_hang/${id}`}
               className="px-4 py-2 bg-orange-500 text-white rounded-lg">
              Xem đơn hàng
            </a>
          </>
        )}

        {status === "failed" && (
          <h2 className="text-red-600 text-xl font-bold"> Thanh toán thất bại</h2>
        )}

        {status === "notfound" && (
          <h2 className="text-red-600 text-xl font-bold">Không tìm thấy đơn hàng</h2>
        )}

        <a href="/" className="mt-5 block text-blue-600 underline">
          ← Quay về trang chủ
        </a>
      </div>
    </div>
  );
}
