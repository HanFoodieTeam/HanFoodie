"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
} from "chart.js";
import {
  FaShoppingCart,
  FaStar,
  FaBoxOpen,
  FaMoneyBillWave,
} from "react-icons/fa";

/* chart register */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

/* ===== types ===== */

type FilterType = "ngay" | "thang" | "nam";

interface DoanhThuItem {
  ngay?: string;
  thang?: string;
  nam?: string;
  tong_doanh_thu: number;
}

interface TongQuanData {
  tongSanPham: number;
  tongDanhGia: number;
  tongDoanhThu: number;
  tongSoDon: number;
  doanhThu: DoanhThuItem[];
}

/* ===== page ===== */

export default function TongQuanPage() {
  const [data, setData] = useState<TongQuanData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [filter, setFilter] = useState<FilterType>("ngay");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  /* load data */
  const loadData = async (): Promise<void> => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        filter,
        ...(from && { from }),
        ...(to && { to }),
      });

      const res = await fetch(
        `${window.location.origin}/api/thong_ke/tong_quan?${params.toString()}`
      );

      if (!res.ok) throw new Error("fetch error");

      const json = await res.json();

      setData({
        tongSanPham: json.tong_san_pham ?? 0,
        tongDanhGia: json.tong_danh_gia ?? 0,
        tongDoanhThu: json.tong_doanh_thu ?? 0,
        tongSoDon: json.tong_don ?? 0,
        doanhThu: json.doanh_thu ?? [],
      });
    } catch (err) {
      console.error("tong_quan error:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filter, from, to]);

  if (loading) return <div className="p-[5px] text-sm">Đang tải…</div>;
  if (!data) return <div className="p-[5px] text-red-600">Không có dữ liệu</div>;

  /* ===== chart ===== */

  const labels = data.doanhThu.map((d) =>
    filter === "thang"
      ? d.thang ?? ""
      : filter === "nam"
        ? d.nam ?? ""
        : d.ngay ?? ""
  );

  const chartData = {
    labels,
    datasets: [
      {
        data: data.doanhThu.map((d) => d.tong_doanh_thu),
        fill: true,
        backgroundColor: "rgba(34,197,94,0.15)",
        borderColor: "rgba(34,197,94,1)",
        tension: 0.35,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: TooltipItem<"line">) =>
            `${Number(ctx.raw).toLocaleString("vi-VN")} VNĐ`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (v: number | string) =>
            Number(v).toLocaleString("vi-VN") + " VNĐ",
        },
      },
    },
  };

  /* ===== cards ===== */

  const cards = [
    {
      title: "Sản phẩm",
      value: data.tongSanPham,
      icon: <FaBoxOpen className="text-green-500 text-2xl" />,
      link: "/thong_ke/san_pham",
    },
    {
      title: "Đánh giá",
      value: data.tongDanhGia,
      icon: <FaStar className="text-yellow-400 text-2xl" />,
      link: "/thong_ke/danh_gia",
    },
    {
      title: "Đơn hàng",
      value: data.tongSoDon,
      icon: <FaShoppingCart className="text-blue-500 text-2xl" />,
      link: "/thong_ke/doanh_thu",
    },
    {
      title: "Doanh thu",
      value: `${Number(data.tongDoanhThu).toLocaleString("vi-VN")} VNĐ`,
      icon: <FaMoneyBillWave className="text-indigo-500 text-2xl" />,
      link: "/thong_ke/doanh_thu",
    },
  ];

  /* ===== render ===== */

  return (
    <div className="w-full min-h-screen px-[5px] py-[5px] space-y-3">
      <h1 className="text-lg font-semibold">Tổng quan hệ thống</h1>

      {/* stat boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {cards.map((c, i) => (
          <Link key={i} href={c.link}>
            <div
              className="
                flex items-center gap-3
                p-3
                min-h-[70px]          /* ↓ giảm ~100px so với trước */
                bg-white rounded-md
                shadow-sm hover:shadow transition
              "
            >
              {c.icon}
              <div>
                <p className="text-sm text-gray-500">{c.title}</p>
                <p className="text-xl font-semibold leading-tight">
                  {c.value}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* chart */}
      <div className="bg-white rounded-md shadow-sm p-3">
        {/* filters */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterType)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="ngay">Ngày</option>
            <option value="thang">Tháng</option>
            <option value="nam">Năm</option>
          </select>

          <span className="text-sm">Từ</span>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
          <span className="text-sm">Tới</span>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          />
        </div>

        {/* chart area */}
        <div className="relative h-[400px] lg:h-[520px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
