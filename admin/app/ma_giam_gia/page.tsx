"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IMaGiamGia } from "../lib/cautrucdata";
import NutXoaMGG from "./NutXoaMGG";



// 🧾 Trang danh sách Mã Giảm Giá
export default function MaGiamGiaList() {
  const [data, setData] = useState<IMaGiamGia[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmAnHien, setConfirmAnHien] = useState<IMaGiamGia | null>(null);

  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // 👉 chỉ fetch khi nhấn nút
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`/api/ma_giam_gia?page=${page}&search=${searchQuery}`);
    const json = await res.json();
    setData(json.data);
    setTotalPages(json.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, searchQuery]);

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(search.trim());
  };

  const handleDeleted = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleAnHien = (item: IMaGiamGia) => {
    setConfirmAnHien(item);
  };

  const confirmToggle = async () => {
    if (!confirmAnHien) return;
    const id = confirmAnHien.id;
    const newState = !confirmAnHien.an_hien;

    const res = await fetch(`/api/ma_giam_gia/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ an_hien: newState }),
    });

    if (res.ok) {
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, an_hien: newState } : item
        )
      );
    } else {
      alert("Không thể cập nhật trạng thái!");
    }

    setConfirmAnHien(null);
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  if (loading) return <div className="p-4">Đang tải dữ liệu...</div>;

  return (
    <div>
      <h1 className="text-xl p-2  font-bold uppercase">
        Danh sách Mã Giảm Giá
      </h1>

      {/* 🔍 Tìm kiếm + Nút tìm */}
      <div className="flex justify-between items-center mt-3">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Nhập tên hoặc mã số..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="border p-1 w-64 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            🔍 Tìm
          </button>
        </div>

        <Link
          href="/ma_giam_gia/them"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          ➕ Thêm Mã Giảm Giá
        </Link>
      </div>

      {/* 🧾 Bảng danh sách */}
      <table className="table-auto w-full mt-4 border text-[0.9em]">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2 text-left">Tên/Mã số</th>
            <th className="p-2 text-center">Giá trị giảm</th>
            <th className="p-2 text-center">GTG Tối thiểu</th>
            <th className="p-2 text-center">Số lượng</th>
            <th className="p-2 text-center">Bắt đầu / Kết thúc</th>
            <th className="p-2 text-center">Điều kiện</th>
            <th className="p-2 text-center">Ẩn/Hiện</th>
            <th className="p-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                Không tìm thấy dữ liệu
              </td>
            </tr>
          ) : (
            data.map((mgg) => (
              <tr
                key={mgg.id}
                className="border-t hover:bg-gray-300 transition-all duration-200 "
              >
                <td className="p-2 font-semibold">
                  {mgg.ten}
                  <br />
                  <span className="font-mono text-sm text-gray-600">
                    ({mgg.ma_so})
                  </span>
                </td>
                <td className="p-2 text-center text-red-600">
                  {mgg.loai_giam_gia
                    ? `${mgg.gia_tri_giam}%`
                    : `${mgg.gia_tri_giam.toLocaleString("vi")} VNĐ`}
                </td>
                <td className="p-2 text-center">
                  {mgg.gia_tri_toi_thieu.toLocaleString("vi")} VNĐ
                </td>
                <td className="p-2 text-center">{mgg.so_luong}</td>
                <td className="p-2 text-center">
                  {formatDate(mgg.bat_dau)} <br />
                  <span className="text-red-500">{formatDate(mgg.ket_thuc)}</span>
                </td>
                <td className="p-2 text-center">{mgg.dieu_kien}</td>
                <td
                  className="p-2 text-center cursor-pointer select-none"
                  onClick={() => handleToggleAnHien(mgg)}
                >
                  {mgg.an_hien ? "✅" : "❌"}
                </td>
                <td className="p-2 text-center ">
                  <Link
                    href={`/ma_giam_gia/${mgg.id}`}
                    className="text-blue-500 hover:text-blue-700 font-bold"
                  >
                    Sửa 
                  </Link>{" "}
                    |{" "}
                  <NutXoaMGG id={mgg.id} ten={mgg.ten} onDeleted={handleDeleted} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/*  Phân trang */}
      {/* 📄 Phân trang trượt 3 số, có Đầu / Cuối */}
      <div className="flex justify-center mt-4 space-x-2">
        {/* Nút Đầu */}
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className={`px-3 py-1 rounded transition ${page === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          Đầu
        </button>

        {/* Các nút số trang */}

        {Array.from({ length: 3 }, (_, i) => {
          const start = Math.max(1, Math.min(page - 1, totalPages - 2));
          const p = start + i;
          return (
            p <= totalPages && (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 rounded transition ${p === page
                  ? "bg-blue-500 text-white font-bold scale-105"
                  : "bg-gray-200 hover:bg-gray-300"
                  }`}
              >
                {p}
              </button>
            )
          );
        })}

        {/* Nút Cuối */}
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded transition ${page === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
            }`}
        >
          Cuối
        </button>
      </div>



      {/* Modal xác nhận ẩn/hiện */}
      {confirmAnHien && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[380px] animate-fadeIn">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Xác nhận thay đổi trạng thái
            </h2>
            <p className="text-center mb-5">
              Bạn có muốn{" "}
              <span className="font-semibold text-red-600 text-[1.2em]">
                {confirmAnHien.an_hien ? "ẩn" : "hiển thị"}
              </span>{" "}
              mã giảm giá{" "}
              <span className="font-semibold">
                {confirmAnHien.ten} ({confirmAnHien.ma_so})
              </span>{" "}
              không?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={confirmToggle}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Có
              </button>
              <button
                onClick={() => setConfirmAnHien(null)}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
