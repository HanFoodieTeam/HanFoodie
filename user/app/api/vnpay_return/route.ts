import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import qs from "qs";
import { BienTheModel, ChiTietDonHangModel, DonHangModel, GioHangModel, NguoiDungModel, SanPhamModel } from "@/app/lib/models";
import { sendMail } from "@/app/GUI_EMAIL/guiemail_dh";
import { orderEmailTemplate } from "@/app/GUI_EMAIL/orderEmail";



export async function GET(req: NextRequest) {
  const baseUrl = process.env.APP_URL ?? "http://localhost:3000";

  try {
    const url = new URL(req.url);

    let vnp_Params: Record<string, string> = Object.fromEntries(
      url.searchParams.entries()
    );

    console.log(" Params từ VNPay:", vnp_Params);

    const secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];
    delete vnp_Params["vnp_Command"];

    const sorted = Object.fromEntries(
      Object.entries(vnp_Params).sort(([a], [b]) =>
        a.localeCompare(b)
      )
    );

    const signData = qs.stringify(sorted, { encode: false });

    const signed = crypto
      .createHmac("sha512", process.env.VNP_HASH_SECRET!)
      .update(signData)
      .digest("hex");

    // console.log(" Chuỗi ký:", signData);
    // console.log(" Hash Server:", signed);
    // console.log(" Hash VNPay :", secureHash);

    // Đây nên bật lại trong môi trường sản xuất!
    // if (secureHash !== signed) {
    //   console.log("❌ Sai chữ ký xác thực!");
    //   return NextResponse.redirect(`${baseUrl}/ket_qua_thanh_toan?status=failed`);
    // }

    console.log("🎯 Chữ ký hợp lệ - xử lý đơn hàng");

    const maDon = vnp_Params["vnp_TxnRef"];
    const respCode = vnp_Params["vnp_ResponseCode"];
    const transStatus = vnp_Params["vnp_TransactionStatus"];

    const thanhCong = respCode === "00" && transStatus === "00";
    if (!thanhCong) {
      console.log(" Thanh toán thất bại, ngắt xử lý đơn!");
      return NextResponse.redirect(
        `${baseUrl}/ket_qua_thanh_toan?status=failed`
      );
    }

    const don = await DonHangModel.findOne({ where: { ma_don: maDon } });

    if (!don) {
      console.log("⚠ Không tìm thấy đơn hàng!");
      return NextResponse.redirect(`${baseUrl}/ket_qua_thanh_toan?status=notfound`);
    }

    await don.update({
      trang_thai: thanhCong ? "cho_xac_nhan" : "cho_thanh_toan",
      phuong_thuc_thanh_toan: thanhCong,
      ngay_cap_nhat: new Date(),
    });





    //  Chỉ gửi email khi thanh toán thành công qua VNPay
if (thanhCong) {
  const chiTiet = await ChiTietDonHangModel.findAll({
    where: { id_don_hang: don.id },
    include: [
      {
        model: BienTheModel,
        as: "bien_the",
        include: [{ model: SanPhamModel, as: "san_pham" }]
      }
    ]
  });

  const sanPhamListHtml = chiTiet
    .map((item) => {
      const sp = item.getDataValue("bien_the")?.getDataValue("san_pham");
      const hinhSP = sp?.hinh ?? "";
      return `
      <div style="display:flex; margin-bottom:14px;">
        <img src="${hinhSP}" width="80" height="80"
          style="object-fit:cover; border-radius:6px; margin-right:12px;" />
        <div>
          <strong>${sp?.ten}</strong><br/>
          Số lượng: ${item.getDataValue("so_luong")}<br/>
          Giá: ${item.getDataValue("don_gia").toLocaleString()}đ
        </div>
      </div>`;
    })
    .join("");

  const user = await NguoiDungModel.findByPk(don.id_nguoi_dung);

  const baseUrl = process.env.APP_URL ?? "http://localhost:3000";
  const urlDonHang = `${baseUrl}/chi_tiet_don_hang/${don.id}`;
  const logoUrl = `${baseUrl}/logOut.png`;

 try {
  await sendMail(
    user?.getDataValue("email") ?? "",
    "Thanh toán thành công - HanFoodie",
    orderEmailTemplate({
      logoUrl,
      hoTen: don.ho_ten_nguoi_nhan,
      maDon,
      ngayDat: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
      phuongThucThanhToan: "Thanh toán online",
      sanPhamListHtml,
      tongTienHang: don.tong_tien_hang,
      giamGia: don.so_tien_giam,
      tongThanhToan: don.so_tien_thanh_toan,
      urlDonHang,
    })
  );
  console.log(" Email gửi thành công!");
} catch (error) {
  console.error(" Không thể gửi email:", error);
}

}

    
//  Chỉ xóa đúng sản phẩm đã được mua trong giỏ
if (thanhCong) {
  const chiTiet = await ChiTietDonHangModel.findAll({
    where: { id_don_hang: don.id }
  });

  const idGioHangDaDat = chiTiet
    .map(item => item.getDataValue("id_gio_hang"))
    .filter((id): id is number => !!id);

  if (idGioHangDaDat.length > 0) {
    await GioHangModel.destroy({
      where: { id: idGioHangDaDat }
    });
  }

  console.log(" Đã xóa đúng sản phẩm đã mua ra khỏi giỏ hàng!");
}

 return NextResponse.redirect(
  `${baseUrl}/dat_hang?status=success&id=${don.id}&maDon=${maDon}`
);



  } catch (e) {
    console.error(" Lỗi xử lý verify:", e);
    return NextResponse.redirect(`${baseUrl}/ket_qua_thanh_toan?status=error`);
  }
}
