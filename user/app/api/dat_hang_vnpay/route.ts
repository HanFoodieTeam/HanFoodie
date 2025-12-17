

// import { NextRequest, NextResponse } from "next/server";
// import { VNPay, ProductCode, VnpLocale, HashAlgorithm } from "vnpay";
// import { DonHangModel, ChiTietDonHangModel, MaGiamGiaModel } from "@/app/lib/models";
// import { getUserFromToken } from "@/app/lib/auth";
// import { IMonThem } from "@/app/lib/cautrucdata";

// interface IChiTietSP {
//   id_bien_the: number;
//   so_luong: number;
//   don_gia: number;
//   id_gio_hang?: number;
//    json_tuy_chon?: Record<string, string> ;
//   json_mon_them?: IMonThem[] ;
// }

// interface IRequest {
//   ho_ten_nguoi_nhan: string;
//   dia_chi_nguoi_nhan: string;
//   sdt_nguoi_nhan: number;
//   ghi_chu?: string;
//   id_ma_giam_gia?: number;
//   so_tien_giam?: number;
//   danh_sach_san_pham: IChiTietSP[];
// }


// function formatVNPayDate(date: Date): number {
//   const d = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }));
//   return Number(
//     `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}${String(d.getSeconds()).padStart(2, "0")}`
//   );
// }

// export async function POST(req: NextRequest) {
//   try {
//     const user = getUserFromToken(req);
//     if (!user) return NextResponse.json({ success: false, message: "Unauthorized" });

//     const body: IRequest = await req.json();
//     const tongTien = body.danh_sach_san_pham.reduce(
//       (t, s) => t + s.don_gia * s.so_luong, 0
//     );

//     const maDon = `HD${Date.now()}`;
//     const now = new Date();
//     const {
//       ho_ten_nguoi_nhan,
//       dia_chi_nguoi_nhan,
//       sdt_nguoi_nhan,
//       ghi_chu,
//       id_ma_giam_gia,
//       so_tien_giam,
//       danh_sach_san_pham,
//     } = body;

//     // Tính lại giảm giá từ backend
//     let soTienGiam = 0;

//     if (id_ma_giam_gia) {
//       const ma = await MaGiamGiaModel.findByPk(id_ma_giam_gia);
//       if (ma) {
//         const now = new Date();
//         const ngayBatDau = new Date(ma.getDataValue("bat_dau"));
//         const ngayKetThuc = new Date(ma.getDataValue("ket_thuc"));

//         if (now >= ngayBatDau && now <= ngayKetThuc && ma.getDataValue("so_luong") > 0) {
//           const loai = ma.getDataValue("loai_giam_gia");
//           const giaTri = ma.getDataValue("gia_tri_giam");
//           const toiDa = ma.getDataValue("gia_tri_giam_toi_da");

//           soTienGiam =
//             loai === 0
//               ? giaTri
//               : Math.min((tongTien * giaTri) / 100, toiDa ?? Infinity);

//           await ma.update({ so_luong: ma.getDataValue("so_luong") - 1 });
//         }
//       }
//     }

//     const soTienThanhToan = Math.max(tongTien - soTienGiam, 0);



//     const donHang = await DonHangModel.create({
//       id_nguoi_dung: user.id,
//       ho_ten_nguoi_nhan,
//       dia_chi_nguoi_nhan,
//       sdt_nguoi_nhan,
//       tong_tien_hang: tongTien,
//       so_tien_giam: soTienGiam,
//       so_tien_thanh_toan: soTienThanhToan,
//       ghi_chu: ghi_chu ?? null,
//       id_ma_giam_gia: id_ma_giam_gia ?? null,
//       trang_thai: "cho_thanh_toan",
//       phuong_thuc_thanh_toan: false,
//       ma_don: maDon,
//       ngay_tao: now,
//       ngay_cap_nhat: now,
//     });

//     // Lưu chi tiết đơn hàng cho VNPay
//     for (const sp of danh_sach_san_pham) {
//       const thanh_tien = sp.don_gia * sp.so_luong;

//       await ChiTietDonHangModel.create({
//         id_don_hang: donHang.id,
//         id_bien_the: sp.id_bien_the,
//         so_luong: sp.so_luong,
//         don_gia: sp.don_gia,
//         thanh_tien,
//         json_tuy_chon: sp.json_tuy_chon,
//         json_mon_them: sp.json_mon_them,
//       });
//     }



//     const vnp = new VNPay({
//       tmnCode: process.env.VNP_TMN_CODE!,
//       secureSecret: process.env.VNP_HASH_SECRET!,
//       vnpayHost: "https://sandbox.vnpayment.vn",
//       testMode: true,
//       hashAlgorithm: HashAlgorithm.SHA512
//     });

//     const urlPay = await vnp.buildPaymentUrl({
//       vnp_Amount: soTienThanhToan,
//       vnp_IpAddr: "127.0.0.1",
//       vnp_TxnRef: maDon,
//       vnp_OrderInfo: `Thanh_toan_hoa_don:${maDon}`,
//       vnp_ReturnUrl: process.env.VNP_RETURN_URL!,
//       vnp_OrderType: ProductCode.Other,
//       vnp_Locale: VnpLocale.VN,
//       vnp_CreateDate: formatVNPayDate(now),
//       vnp_ExpireDate: formatVNPayDate(new Date(now.getTime() + 15 * 60000)),
//     });

//     console.log(" URL Gửi VNPay:", urlPay);

//     return NextResponse.json({ success: true, url: urlPay });

//   } catch (e) {
//     console.error("Lỗi VNPay:", e);
//     return NextResponse.json({ success: false });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { VNPay, ProductCode, VnpLocale, HashAlgorithm } from "vnpay";
import {
  DonHangModel,
  ChiTietDonHangModel,
  MaGiamGiaModel,
  BienTheModel,
  SanPhamModel,
} from "@/lib/models";
import { getUserFromToken } from "@/lib/auth";
import { IMonThem } from "@/lib/cautrucdata";

interface IChiTietSP {
  id_bien_the: number;
  so_luong: number;
  don_gia: number;
  id_gio_hang?: number;
  json_tuy_chon?: Record<string, string>;
  json_mon_them?: IMonThem[];
}

interface IRequest {
  ho_ten_nguoi_nhan: string;
  dia_chi_nguoi_nhan: string;
  sdt_nguoi_nhan: number;
  ghi_chu?: string;
  id_ma_giam_gia?: number;
  so_tien_giam?: number;
  danh_sach_san_pham: IChiTietSP[];
}

function formatVNPayDate(date: Date): number {
  const d = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
  return Number(
    `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
      d.getDate()
    ).padStart(2, "0")}${String(d.getHours()).padStart(2, "0")}${String(
      d.getMinutes()
    ).padStart(2, "0")}${String(d.getSeconds()).padStart(2, "0")}`
  );
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromToken(req);
    if (!user)
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });

    const body: IRequest = await req.json();
    const {
      ho_ten_nguoi_nhan,
      dia_chi_nguoi_nhan,
      sdt_nguoi_nhan,
      ghi_chu,
      id_ma_giam_gia,
      danh_sach_san_pham,
    } = body;

    const tongTien = danh_sach_san_pham.reduce(
      (t, s) => t + s.don_gia * s.so_luong,
      0
    );

    let prefix = "SP";
    let idSanPham = 0;

    try {
      const idBienThe = danh_sach_san_pham[0]?.id_bien_the;
      if (idBienThe) {
        const bienThe = await BienTheModel.findByPk(idBienThe, {
          include: [{ model: SanPhamModel, as: "san_pham" }],
        });

        const tenSanPham =
          (bienThe?.getDataValue("san_pham") as { ten?: string })?.ten ??
          "SP";
        idSanPham =
          (bienThe?.getDataValue("san_pham") as { id?: number })?.id ?? 0;

        const tenKhongDau = tenSanPham
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/đ/g, "d")
          .replace(/Đ/g, "D");

        prefix = tenKhongDau.replace(/\s+/g, "").slice(0, 2).toUpperCase();
      }
    } catch {
      prefix = "SP";
    }

    const vnTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    );
    const day = String(vnTime.getDate()).padStart(2, "0");
    const month = String(vnTime.getMonth() + 1).padStart(2, "0");
    const year = String(vnTime.getFullYear()).slice(-2); 
    const hour = String(vnTime.getHours()).padStart(2, "0");
    const minute = String(vnTime.getMinutes()).padStart(2, "0");
    const second = String(vnTime.getSeconds()).padStart(2, "0");

    const maDon = `${idSanPham}${prefix}${day}${month}${hour}${minute}${second}${user.id}`;

    const now = new Date();

    let soTienGiam = 0;

    if (id_ma_giam_gia) {
      const ma = await MaGiamGiaModel.findByPk(id_ma_giam_gia);
      if (ma) {
        const now = new Date();
        const ngayBatDau = new Date(ma.getDataValue("bat_dau"));
        const ngayKetThuc = new Date(ma.getDataValue("ket_thuc"));

        if (
          now >= ngayBatDau &&
          now <= ngayKetThuc &&
          ma.getDataValue("so_luong") > 0
        ) {
          const loai = ma.getDataValue("loai_giam_gia");
          const giaTri = ma.getDataValue("gia_tri_giam");
          const toiDa = ma.getDataValue("gia_tri_giam_toi_da");

          soTienGiam =
            loai === 0
              ? giaTri
              : Math.min((tongTien * giaTri) / 100, toiDa ?? Infinity);

          await ma.update({ so_luong: ma.getDataValue("so_luong") - 1 });
        }
      }
    }

    const soTienThanhToan = Math.max(tongTien - soTienGiam, 0);

    const donHang = await DonHangModel.create({
      id_nguoi_dung: user.id,
      ho_ten_nguoi_nhan,
      dia_chi_nguoi_nhan,
      sdt_nguoi_nhan,
      tong_tien_hang: tongTien,
      so_tien_giam: soTienGiam,
      so_tien_thanh_toan: soTienThanhToan,
      ghi_chu: ghi_chu ?? null,
      id_ma_giam_gia: id_ma_giam_gia ?? null,
      trang_thai: "cho_thanh_toan",
      phuong_thuc_thanh_toan: false,
      ma_don: maDon,
      ngay_tao: now,
      ngay_cap_nhat: now,
    });

    for (const sp of danh_sach_san_pham) {
      const thanh_tien = sp.don_gia * sp.so_luong;

      await ChiTietDonHangModel.create({
        id_don_hang: donHang.id,
        id_bien_the: sp.id_bien_the,
        so_luong: sp.so_luong,
        don_gia: sp.don_gia,
        thanh_tien,
        json_tuy_chon: sp.json_tuy_chon,
        json_mon_them: sp.json_mon_them,
      });
    }

    const vnp = new VNPay({
      tmnCode: process.env.VNP_TMN_CODE!,
      secureSecret: process.env.VNP_HASH_SECRET!,
      vnpayHost: "https://sandbox.vnpayment.vn",
      testMode: true,
      hashAlgorithm: HashAlgorithm.SHA512,
    });
    const ip =
      process.env.NODE_ENV === "development"
        ? "127.0.0.1"
        : req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";



    const urlPay = await vnp.buildPaymentUrl({
      vnp_Amount: soTienThanhToan,
      vnp_IpAddr: ip,
      vnp_TxnRef: maDon,
      vnp_OrderInfo: `Thanh_toan_hoa_don:${maDon}`,
      vnp_ReturnUrl: process.env.VNP_RETURN_URL!,
      vnp_OrderType: ProductCode.Other,
      vnp_Locale: VnpLocale.VN,
      vnp_CreateDate: formatVNPayDate(now),
      vnp_ExpireDate: formatVNPayDate(new Date(now.getTime() + 15 * 60000)),
    });

    console.log("URL Gửi VNPay:", urlPay);

    return NextResponse.json({ success: true, url: urlPay });
  } catch (e) {
    console.error("Lỗi VNPay:", e);
    return NextResponse.json({ success: false });
  }
}
