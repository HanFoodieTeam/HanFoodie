"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { FaShoppingCart, FaStar, FaBoxOpen, FaMoneyBillWave } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface DoanhThuItem {
  ngay: string;
  tong_doanh_thu: number;
}

interface TongQuanData {
  tongSanPham: number;
  tongDanhGia: number;
  spHetHang: number;
  tongDoanhThu: number;
  tongSoDon: number;
  doanhThu: DoanhThuItem[];
}

export default function TongQuanPage() {
  const [data, setData] = useState<TongQuanData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/thong_ke/tong_quan`);
      const json = await res.json();

      const doanhThu: DoanhThuItem[] = json.doanh_thu_theo_ngay ?? [];

      setData({
        tongSanPham: json.tong_san_pham ?? 0,
        tongDanhGia: json.tong_danh_gia ?? 0,
        spHetHang: json.spHetHang ?? 0,
        tongDoanhThu: json.tong_doanh_thu ?? 0,
        tongSoDon: json.tong_don ?? 0,
        doanhThu,
      });
    } catch (err) {
      console.error("Lỗi loadData tong_quan:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <div className="p-6 text-lg">Đang tải dữ liệu...</div>;
  if (!data) return <div className="p-6 text-red-600">Không thể tải dữ liệu.</div>;

  const chartData = {
    labels: data.doanhThu.map((d) => d.ngay),
    datasets: [
      {
        label: "Doanh thu (VNĐ)",
        data: data.doanhThu.map((d) => d.tong_doanh_thu),
        fill: true,
        backgroundColor: "rgba(34,197,94,0.2)",
        borderColor: "rgba(34,197,94,1)",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return Number(context.raw).toLocaleString("vi-VN") + " VNĐ";
          },
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: any) {
            return Number(value).toLocaleString("vi-VN") + " VNĐ";
          },
        },
      },
    },
  };

  const cards = [
    {
      title: "Sản phẩm",
      value: data.tongSanPham,
      icon: <FaBoxOpen className="text-3xl text-green-500" />,
      link: "/thong_ke/san_pham",
    },
    {
      title: "Đánh giá",
      value: data.tongDanhGia,
      icon: <FaStar className="text-3xl text-yellow-400" />,
      link: "/thong_ke/danh_gia",
    },
    {
      title: "Đơn hàng",
      value: data.tongSoDon,
      icon: <FaShoppingCart className="text-3xl text-blue-500" />,
      link: "/thong_ke/don_hang",
    },
    {
      title: "Doanh thu",
      value: `${data.tongDoanhThu.toLocaleString("vi-VN")} VNĐ`,
      icon: <FaMoneyBillWave className="text-3xl text-indigo-500" />,
      link: "/thong_ke/doanh_thu",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tổng Quan Hệ Thống</h1>

      {/* Card thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((c, idx) => (
          <Link key={idx} href={c.link}>
            <div className="p-4 bg-white shadow rounded-xl text-black hover:shadow-lg hover:scale-105 transition transform cursor-pointer flex items-center space-x-4">
              <div>{c.icon}</div>
              <div>
                <p className="text-sm">{c.title}</p>
                <p className="text-lg font-semibold">{c.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Biểu đồ doanh thu từ trước tới nay */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-xl font-semibold mb-3">Doanh thu từ trước tới nay</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
