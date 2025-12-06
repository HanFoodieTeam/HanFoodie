"use client";

import { useEffect, useState } from "react";

interface IBaiViet {
  id: number;
  tieu_de: string;
  hinh?: string | null;
  slug: string;
  an_hien: boolean;
  ngay_dang?: string | null;
}

export default function BaiVietGrid() {
  const [baiViets, setBaiViets] = useState<IBaiViet[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 8; // tối đa 8 bài mỗi trang

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/bai_viet?page=${page}&limit=${limit}`);
        const json = await res.json();
        if (json.success) {
          setBaiViets(json.data);
          setTotalPages(json.pagination?.totalPages ?? 1);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="p-6">
      {/* Submenu ngang */}
      <nav className="flex gap-6 mb-6 border-b pb-2">
        <button className="text-blue-600 font-medium hover:underline">Tất cả</button>
        <button className="text-gray-600 hover:text-blue-600">Tin tức</button>
        <button className="text-gray-600 hover:text-blue-600">Sự kiện</button>
        <button className="text-gray-600 hover:text-blue-600">Khuyến mãi</button>
      </nav>

      {/* Lưới bài viết */}
      {loading ? (
        <p className="text-center py-10">Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {baiViets.map((bv) => (
            <div
              key={bv.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {bv.hinh && (
                <img
                  src={bv.hinh}
                  alt={bv.tieu_de}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-2">{bv.tieu_de}</h2>
                {bv.ngay_dang && (
                  <p className="text-sm text-gray-500">
                    {new Date(bv.ngay_dang).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Phân trang */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 border rounded ${
              page === num ? "bg-blue-500 text-white" : ""
            }`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
