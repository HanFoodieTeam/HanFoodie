
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { INguoiDung } from "@/lib/cautrucdata";
import ThongTin from "./ThongTin";
import DonHangUser from "./DonHangUser";

const tabs = ["thong_tin", "don_hang"];

export default function UserDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get("tab") || "thong_tin";
  const [activeTab, setActiveTab] = useState(currentTab);

  const [user, setUser] = useState<INguoiDung | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setActiveTab(currentTab);
  }, [currentTab]);

  const changeTab = (tab: string) => {
    setActiveTab(tab);
    router.push(`/nguoi_dung/${id}?tab=${tab}`, { scroll: false });
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/nguoi_dung/${id}`);
        const data = await res.json();
        setUser(data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return <div className="p-6">Đang tải dữ liệu...</div>;
  if (!user) return <div className="p-6 text-red-600">Không tìm thấy người dùng!</div>;

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <div className="mx-auto bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Chi tiết người dùng
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 border-b pb-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => changeTab(t)}
              className={`px-4 py-2 rounded-t-md text-sm font-medium ${
                activeTab === t
                  ? "text-blue-600 border-b-2 border-blue-500 font-semibold"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              {t === "thong_tin" && "Thông tin"}
              {t === "don_hang" && "Lịch sử đơn hàng"}
            </button>
          ))}
        </div>

        {/* Nội dung */}
        {activeTab === "thong_tin" && <ThongTin user={user} />}
        {activeTab === "don_hang" && (
          <DonHangUser orders={user.don_hang ?? []} />
        )}
      </div>
    </div>
  );
}
