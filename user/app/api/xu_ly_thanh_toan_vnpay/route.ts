import { NextRequest, NextResponse } from "next/server";
import { GioHangModel, NguoiDungModel, DonHangModel } from "@/lib/models";
import { orderEmailTemplate } from "@/app/GUI_EMAIL/orderEmail";
import { sendEmail } from "@/lib/sendEmail";

interface IMonThem { ten: string; gia_them?: number }
interface IJsonTuyChon { [key: string]: string }

interface ISanPhamTam {
  id_gio_hang: number;
  so_luong: number;
  bien_the: {
    ten: string;
    gia_them?: number;
    san_pham: {
      ten: string;
      hinh?: string;
      gia_goc?: number;
    };
  };
  json_mon_them?: IMonThem[];
  json_tuy_chon?: IJsonTuyChon;
}

export async function POST(req: NextRequest) {
  try {
    const { idDon, maDon, idNguoiDung, danhSach } = await req.json() as {
      idDon: number;
      maDon: string;
      idNguoiDung: number;
      danhSach: ISanPhamTam[];
    };

    const don = await DonHangModel.findByPk(idDon);
    const user = await NguoiDungModel.findByPk(idNguoiDung);

    if (!don || !user) return NextResponse.json({ success: false });

    const sanPhamListHtml = danhSach.map(item => {
      const sp = item.bien_the.san_pham;
      const tenBienThe = item.bien_the.ten;

      const textTuyChon = item.json_tuy_chon
        ? Object.entries(item.json_tuy_chon).map(([k, v]) => `${k}: ${v}`).join(", ")
        : "";

      const textMonThem = item.json_mon_them
        ? item.json_mon_them.map(m => m.ten).join(", ")
        : "";

      return `
        <div style="display:flex; margin-bottom:14px;">
          <img src="${sp.hinh ?? ""}" width="80" height="80" style="object-fit:cover;border-radius:6px;margin-right:12px;" />
          <div>
            <strong>${sp.ten}</strong><br/>
            Biến thể: ${tenBienThe}<br/>
            ${textTuyChon ? `Tuỳ chọn: ${textTuyChon}<br/>` : ""}
            ${textMonThem ? `Món thêm: ${textMonThem}<br/>` : ""}
            Số lượng: ${item.so_luong}<br/>
            Giá: ${(
          (sp.gia_goc ?? 0) + (item.bien_the.gia_them ?? 0)
        ).toLocaleString()}đ
          </div>
        </div>`;
    }).join("");

    const baseUrl = process.env.SITE_URL;
    console.log(" Bắt đầu gửi mail tới:", user.email);
    const Urlimg =
      process.env.Urlimg ??
      "https://res.cloudinary.com/dsvfxehui/image/upload/v1765961064/logo-removebg-preview_gbz7wk.png";
    await sendEmail(
      user.email,
      "Đặt hàng thành công - HanFoodie",
      orderEmailTemplate({
        Urlimg,
        hoTen: don.ho_ten_nguoi_nhan,
        maDon,
        ngayDat: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
        phuongThucThanhToan: "Thanh toán online",
        sanPhamListHtml,
        tongTienHang: don.tong_tien_hang,
        giamGia: don.so_tien_giam,
        tongThanhToan: don.so_tien_thanh_toan,
        urlDonHang: `${baseUrl}/chi_tiet_don_hang/${idDon}`,
      })
    );
    console.log("✅ Gửi mail thành công");

    const idsXoa = danhSach.map(sp => sp.id_gio_hang);
    await GioHangModel.destroy({ where: { id: idsXoa } });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("LỖI:", error);
    return NextResponse.json({ success: false });
  }
}
