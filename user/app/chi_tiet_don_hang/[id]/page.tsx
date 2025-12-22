"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Star, CheckCircle, Package } from "lucide-react";
import UserLayout from "@/app/components/UserLayout";
import { useUser } from "@/app/hooks/useUser";
import type { IDonHang, IChiTietDonHang } from "@/lib/cautrucdata";
import Image from "next/image";



// Mở rộng ChiTietDonHang để kèm bien_the + parsed json fields
export interface IChiTietDonHangMoRong
  extends Omit<IChiTietDonHang, "json_tuy_chon" | "json_mon_them"> {
    da_danh_gia?: boolean;
    bien_the?: {
    id: number;
    ten: string;
    gia_them?: number | null;
    san_pham?: {
      id: number;
      ten: string;
      hinh?: string | null;
      gia_goc?: number | null;
    };
  } | null;
  json_tuy_chon?: Record<string, string> | string | null;
  json_mon_them?: { ten: string; gia?: number; so_luong?: number }[] | string | null;
}

type ReviewFormState = Record<
  number,
  { sao: number; noi_dung: string; daDanhGia?: boolean }
>;

export default function ChiTietDonHangPage() {

  const params = useParams();
  const { id } = params as { id: string };
  const user = useUser();

  const [donHang, setDonHang] = useState<IDonHang | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [reviewForm, setReviewForm] = useState<ReviewFormState>({});
  const [anhReview, setAnhReview] = useState<Record<number, File[]>>({});
  const [dangGuiDanhGia, setDangGuiDanhGia] = useState<Record<number, boolean>>({});
  // fetch chi tiết đơn
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    

    let isMounted = true;

    async function fetchChiTiet() {
      try {
        const res = await fetch(`/api/chi_tiet_don_hang/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.thong_bao || "Không tải được đơn hàng");
          setLoading(false);
          return;
        }

        // data expected to be IDonHang with chi_tiet_don_hang
        const fetched = data as IDonHang & { chi_tiet_don_hang?: IChiTietDonHangMoRong[] };

        if (!isMounted) return;

        setDonHang(fetched);

        // khởi tạo form / anhReview cho từng sp
        const initialForm: ReviewFormState = {};
        const initialAnh: Record<number, File[]> = {};

        const chiTiet = fetched.chi_tiet_don_hang ?? [];
        chiTiet.forEach((sp) => {
          initialForm[sp.id] = {
            sao: 5,
            noi_dung: "",
            daDanhGia: sp.da_danh_gia ?? false, // ✅ QUAN TRỌNG
          };
          initialAnh[sp.id] = [];
        });


        setReviewForm(initialForm);
        setAnhReview(initialAnh);
      } catch (err) {
        console.error("Lỗi tải chi tiết đơn:", err);
        toast.error("Lỗi khi tải đơn hàng");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchChiTiet();

    return () => {
      isMounted = false;
    };
  }, [id, user]);

  if (loading) {
    return <p className="p-8 text-center h-[700px]  text-gray-600">Đang tải chi tiết đơn hàng...</p>;
  }

  if (!donHang) {
    return <p className="p-8 text-center text-gray-600">Không tìm thấy đơn hàng</p>;
  }

  const chiTiet =
    (donHang as unknown as { chi_tiet_don_hang?: IChiTietDonHangMoRong[] })
      .chi_tiet_don_hang ?? [];

  // gửi đánh giá (FormData, nhiều ảnh)
   async function guiDanhGia(sp: IChiTietDonHangMoRong) {
  const form = reviewForm[sp.id];
  if (!form?.noi_dung.trim()) {
    toast.error("Vui lòng nhập nội dung đánh giá");
    return;
  }

  // ⛔ chặn gửi lại
  if (form.daDanhGia || dangGuiDanhGia[sp.id]) return;

  setDangGuiDanhGia((prev) => ({ ...prev, [sp.id]: true }));

  try {
    const token = localStorage.getItem("token");
    if (!token || !user) {
      toast.error("Bạn chưa đăng nhập");
      return;
    }

    const fd = new FormData();
    fd.append("noi_dung", form.noi_dung);
    fd.append("sao", String(form.sao));
    fd.append("id_nguoi_dung", String(user.id));

    if (sp.bien_the?.id) fd.append("id_bien_the", String(sp.bien_the.id));
    if (sp.bien_the?.san_pham?.id)
      fd.append("id_san_pham", String(sp.bien_the.san_pham.id));

    (anhReview[sp.id] ?? []).forEach((f) => fd.append("hinh", f));

    const res = await fetch("/api/danh_gia", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd,
    });

    const data = await res.json();
    if (!res.ok) {
      toast.error(data.message || "Lỗi gửi đánh giá");
      return;
    }

    toast.success("Đã gửi đánh giá");

    setReviewForm((prev) => ({
      ...prev,
      [sp.id]: { ...prev[sp.id], daDanhGia: true },
    }));

    setAnhReview((prev) => ({ ...prev, [sp.id]: [] }));
  } finally {
    setDangGuiDanhGia((prev) => ({ ...prev, [sp.id]: false }));
  }
}
function handleFilesChange(spId: number, files: FileList | null) {
  setAnhReview((prev) => ({
    ...prev,
    [spId]: files ? Array.from(files) : [],
  }));
}

  // Trạng thái timeline
type TrangThaiTimeline =
  | 'cho_xac_nhan'
  | 'da_xac_nhan'
  | 'dang_giao'
  | 'da_giao'
  | 'da_huy';

const trangThaiSteps: { label: string; key: TrangThaiTimeline }[] = [
  { label: 'Đơn hàng chờ xác nhận', key: 'cho_xac_nhan' },
  { label: 'Đơn hàng đã xác nhận', key: 'da_xac_nhan' },
  { label: 'Đang giao tới bạn', key: 'dang_giao' },
  { label: 'Đơn hàng đã hoàn thành', key: 'da_giao' },
  { label: 'Đơn hàng đã hủy', key: 'da_huy' },
];


  const currentStep = trangThaiSteps.findIndex((s) => s.key === donHang.trang_thai);
  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-2xl font-bold text-[#6A0A0A] mb-4">
          Chi tiết đơn hàng #{donHang.ma_don}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
          <div className="space-y-2">
            <p>
              <strong>Ngày đặt:</strong>{" "}
              {new Date(donHang.ngay_tao).toLocaleString("vi-VN")}
            </p>

            <p>
              <strong>Điện thoại:</strong> {donHang.sdt_nguoi_nhan}
            </p>

            {donHang.ghi_chu && (
              <p>
                <strong>Ghi chú:</strong> {donHang.ghi_chu}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <p>
              <strong>Người nhận:</strong> {donHang.ho_ten_nguoi_nhan}
            </p>

            <p>
              <strong>Địa chỉ:</strong> {donHang.dia_chi_nguoi_nhan}
            </p>
          </div>
        </div>


        <div className="border-t pt-4">
          {chiTiet.map((sp) => {
  const giaGoc = sp.bien_the?.san_pham?.gia_goc ?? 0;
  const giaBienThe = sp.bien_the?.gia_them ?? 0;

  // ========================
  // PARSE TUỲ CHỌN
  // ========================
  const tuyChonData =
    typeof sp.json_tuy_chon === "string"
      ? (() => {
          try {
            return JSON.parse(sp.json_tuy_chon || "{}") as Record<string, string>;
          } catch {
            return {};
          }
        })()
      : sp.json_tuy_chon ?? {};

  const tuyChonHienThi = Object.entries(tuyChonData).filter(
    ([_, v]) => v && v !== ""
  );

  // ========================
  // PARSE MÓN THÊM
  // ========================
  const monThemData =
    typeof sp.json_mon_them === "string"
      ? (() => {
          try {
            return JSON.parse(sp.json_mon_them || "[]") as {
              ten: string;
              gia?: number;
              so_luong?: number;
            }[];
          } catch {
            return [];
          }
        })()
      : sp.json_mon_them ?? [];

  const tongTienMonThem = monThemData.reduce((sum, mt) => {
    return sum + (mt.gia ?? 0) * (mt.so_luong ?? 1);
  }, 0);

  const donGia = giaGoc + giaBienThe + tongTienMonThem;
  const thanhTien = donGia * sp.so_luong;

  const form = reviewForm[sp.id];
  const daDanhGia = form?.daDanhGia ?? false;
  const dangGui = dangGuiDanhGia[sp.id] ?? false;


  return (
    <div
      key={sp.id}
      className="border-b pb-4 mb-6 rounded-lg hover:bg-gray-50 p-3"
    >
      <div className="flex items-start gap-4">
        {/* ================= LEFT ================= */}
        <div className="flex gap-4 flex-1">
          <Link
            href={`/chi_tiet/${sp.bien_the?.san_pham?.id}`}
            className="shrink-0"
          >
            <Image
              src={sp.bien_the?.san_pham?.hinh ?? "/images/no-image.png"}
              alt={sp.bien_the?.san_pham?.ten ?? "Sản phẩm"}
              width={80}
              height={80}
              className="rounded object-cover cursor-pointer hover:opacity-90 transition"
            />

          </Link>

          <div className="text-sm">
            <Link
              href={`/chi_tiet/${sp.bien_the?.san_pham?.id}`}
              className="font-semibold text-base text-[#6A0A0A] hover:underline"
            >
              {sp.bien_the?.san_pham?.ten}
            </Link>

            <p className="text-gray-600">
              {sp.bien_the?.ten}
            </p>

            <p className="text-gray-600">
              Số lượng: {sp.so_luong}
            </p>


            {/* TUỲ CHỌN */}
            {tuyChonHienThi.length > 0 && (
              <div className="mt-1">
                {tuyChonHienThi.map(([k, v]) => (
                  <div key={k}>
                    <span className="font-medium">{k}:</span> {v}
                  </div>
                ))}
              </div>
            )}

            {/* MÓN THÊM */}
            {monThemData.length > 0 && (
              <div className="mt-2">
                <p className="font-medium">Món thêm:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {monThemData.map((mt, idx) => (
                    <li key={idx} className="text-gray-600">
                      {mt.ten}
                      {mt.so_luong ? ` × ${mt.so_luong}` : ""}
                      {mt.gia
                        ? ` (+${(
                            mt.gia * (mt.so_luong ?? 1)
                          ).toLocaleString("vi-VN")}₫)`
                        : ""}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="text-right min-w-[140px] text-sm">
          <p>Đơn giá:</p>
          <p className="font-medium">
            {donGia.toLocaleString("vi-VN")}₫
          </p>

          <p className="mt-1">Thành tiền:</p>
          <p className="font-semibold text-[#D33C3C]">
            {thanhTien.toLocaleString("vi-VN")}₫
          </p>
        </div>
      </div>

      {/* ================= ĐÁNH GIÁ ================= */}
      {donHang.trang_thai === "da_giao" && !daDanhGia && (
          <div className="mt-3 bg-gray-100 p-3 rounded">

                  {/* SAO */}
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={22}
                        onClick={() =>
                          setReviewForm((prev) => ({
                            ...prev,
                            [sp.id]: { ...prev[sp.id], sao: s },
                          }))
                        }
                        className={
                          (form?.sao ?? 0) >= s
                            ? "text-yellow-500 cursor-pointer"
                            : "text-gray-400 cursor-pointer"
                        }
                        fill={(form?.sao ?? 0) >= s ? "yellow" : "none"}
                      />
                    ))}
                  </div>

                  {/* NỘI DUNG */}
                  <textarea
                    value={form?.noi_dung ?? ""}
                    onChange={(e) =>
                      setReviewForm((prev) => ({
                        ...prev,
                        [sp.id]: {
                          ...prev[sp.id],
                          noi_dung: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-2 rounded border"
                    placeholder="Nhận xét của bạn..."
                  />

                  {/* ẢNH */}
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    aria-label="Tải ảnh đánh giá sản phẩm"
                    className="mt-2"
                    onChange={(e) =>
                      handleFilesChange(sp.id, e.target.files)
                    }
                  />


                  {/* PREVIEW */}
                  {anhReview[sp.id]?.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {anhReview[sp.id].map((f, i) => (
                        <Image
                          key={i}
                          src={URL.createObjectURL(f)}
                          alt={`Ảnh đánh giá ${i + 1}`}
                          width={64}
                          height={64}
                          className="object-cover rounded border"
                        />

                      ))}
                    </div>
                  )}


                <button
                  disabled={daDanhGia || dangGui}
                  onClick={() => guiDanhGia(sp)}
                  className={`mt-3 px-4 py-2 rounded ${
                    daDanhGia || dangGui
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#6A0A0A] text-white"
                  }`}
                >
                  {daDanhGia
                    ? "Đã đánh giá"
                    : dangGui
                    ? "Đang gửi..."
                    : "Gửi đánh giá"}
                </button>


                </div>
      )}
    </div>
  );
})}

        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            
            {/* LEFT: Trạng thái đơn hàng */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3 text-[#6A0A0A]">
                Trạng thái đơn hàng
              </h3>

              <div className="relative pl-6">
                {trangThaiSteps.map((step, index) => (
                  <div key={step.key} className="flex items-start gap-3 mb-3">
                    <div>
                      {index <= currentStep ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <Package className="text-gray-300" size={20} />
                      )}
                    </div>

                    <p
                      className={
                        index <= currentStep
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    >
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Tổng tiền */}
            <div className="w-full md:w-1/3 text-right border-t md:border-t-0 md:border-l md:pl-6 pt-4 md:pt-0">
              <p>
                Tổng tiền hàng:{" "}
                {donHang.tong_tien_hang.toLocaleString("vi-VN")}₫
              </p>
              <p>
                Giảm giá: -{donHang.so_tien_giam.toLocaleString("vi-VN")}₫
              </p>
              <p className="text-lg font-semibold text-[#D33C3C]">
                Tổng thanh toán:{" "}
                {donHang.so_tien_thanh_toan.toLocaleString("vi-VN")}₫
              </p>
            </div>

          </div>
        </div>

      </div>
    </UserLayout>
  );
}

