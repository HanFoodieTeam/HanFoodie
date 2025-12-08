// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
// import qs from "qs";
// import { DonHangModel, ChiTietDonHangModel, GioHangModel, BienTheModel, SanPhamModel, NguoiDungModel } from "@/app/lib/models";
// import { sendMail } from "@/app/GUI_EMAIL/guiemail_dh";
// import { orderEmailTemplate } from "@/app/GUI_EMAIL/orderEmail";

// export async function GET(req: NextRequest) {
//   const baseUrl = process.env.APP_URL ?? "http://localhost:3000";

//   try {
//     const url = new URL(req.url);
//     let vnp_Params: Record<string, string> = Object.fromEntries(url.searchParams.entries());

//     const secureHash = vnp_Params["vnp_SecureHash"];

//     delete vnp_Params["vnp_SecureHash"];
//     delete vnp_Params["vnp_SecureHashType"];
//     delete vnp_Params["vnp_Command"];

//     const sorted = Object.fromEntries(Object.entries(vnp_Params).sort(([a], [b]) => a.localeCompare(b)));
//     const signData = qs.stringify(sorted, { encode: false });

//     const signed = crypto
//       .createHmac("sha512", process.env.VNP_HASH_SECRET!)
//       .update(signData)
//       .digest("hex");

//     const maDon = vnp_Params["vnp_TxnRef"];
//     const respCode = vnp_Params["vnp_ResponseCode"];
//     const transStatus = vnp_Params["vnp_TransactionStatus"];

//     const thanhCong = respCode === "00" && transStatus === "00";
//     if (!thanhCong) {
//       return NextResponse.redirect(`${baseUrl}/ket_qua_thanh_toan?status=failed`);
//     }

//     const don = await DonHangModel.findOne({ where: { ma_don: maDon } });
//     if (!don) {
//       return NextResponse.redirect(`${baseUrl}/ket_qua_thanh_toan?status=notfound`);
//     }

//     await don.update({
//       trang_thai: "cho_xac_nhan",
//       phuong_thuc_thanh_toan: false,
//       ngay_cap_nhat: new Date(),
//     });

//     await don.reload();

//     const chiTiet = await ChiTietDonHangModel.findAll({
//       where: { id_don_hang: don.id },
//       include: [
//         {
//           model: BienTheModel,
//           as: "bien_the",
//           required: true,
//           include: [
//             {
//               model: SanPhamModel,
//               as: "san_pham",
//               required: true,
//             },
//           ],
//         },
//       ],
//     });

//     const sanPhamListHtml = chiTiet
//       .map((item) => {
//         const row = item.get({ plain: true });
//         const bienThe = row.bien_the;
//         const sp = bienThe?.san_pham;

//         return `
//         <div style="display:flex; margin-bottom:14px;">
//           <img src="${sp?.hinh ?? ""}" width="80" height="80" style="object-fit:cover; border-radius:6px; margin-right:12px;" />
//           <div>
//             <strong>${sp?.ten ?? "Sản phẩm"}</strong><br/>
//             ${bienThe?.ten ? `Biến thể: ${bienThe.ten}<br/>` : ""}
//             Số lượng: ${row.so_luong}<br/>
//             Giá: ${row.don_gia.toLocaleString()}đ
//           </div>
//         </div>`;
//       })
//       .join("");

//     const user = await NguoiDungModel.findByPk(don.id_nguoi_dung);

//     const urlDonHang = `${baseUrl}/chi_tiet_don_hang/${don.id}`;
//     const logoUrl = `${baseUrl}/logOut.png`;

//     // -------- GỬI EMAIL NGAY -----------
//     await sendMail(
//       user?.getDataValue("email") ?? "",
//       "Thanh toán thành công - HanFoodie",
//       orderEmailTemplate({
//         logoUrl,
//         hoTen: don.ho_ten_nguoi_nhan,
//         maDon,
//         ngayDat: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
//         phuongThucThanhToan: "Thanh toán online",
//         sanPhamListHtml,
//         tongTienHang: don.tong_tien_hang,
//         giamGia: don.so_tien_giam,
//         tongThanhToan: don.so_tien_thanh_toan,
//         urlDonHang,
//       })
//     );

//     // Xóa đúng sản phẩm khỏi giỏ
//     await GioHangModel.destroy({
//       where: { id_nguoi_dung: don.id_nguoi_dung },
//     });

//  return NextResponse.redirect(
//   `${baseUrl}/dat_hang?status=success&id=${don.id}&maDon=${maDon}`
// );



//   } catch (e) {
//     console.error(" Lỗi xử lý verify:", e);
//     return NextResponse.redirect(`${baseUrl}/ket_qua_thanh_toan?status=error`);
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import qs from "qs";
import { DonHangModel } from "@/app/lib/models";

export async function GET(req: NextRequest) {
  const baseUrl = process.env.APP_URL ?? "http://localhost:3000";

  try {
    const url = new URL(req.url);

    const vnpParams: Record<string, string> = Object.fromEntries(
      url.searchParams.entries()
    );

    const secureHash = vnpParams["vnp_SecureHash"];
    delete vnpParams["vnp_SecureHash"];
    delete vnpParams["vnp_SecureHashType"];
    delete vnpParams["vnp_Command"];

    const sortedParams = Object.fromEntries(
      Object.entries(vnpParams).sort(([a], [b]) => a.localeCompare(b))
    );

    const signData = qs.stringify(sortedParams, { encode: false });

    const signed = crypto
      .createHmac("sha512", process.env.VNP_HASH_SECRET!)
      .update(signData)
      .digest("hex");

    const maDon = vnpParams["vnp_TxnRef"];
    const respCode = vnpParams["vnp_ResponseCode"];
    const transStatus = vnpParams["vnp_TransactionStatus"];

    const thanhCong = respCode === "00" && transStatus === "00";
    if (!thanhCong) {
      return NextResponse.redirect(`${baseUrl}/dat_hang?status=failed`);
    }

    const don = await DonHangModel.findOne({ where: { ma_don: maDon } });
    if (!don) {
      return NextResponse.redirect(`${baseUrl}/dat_hang?status=notfound`);
    }

    // Cập nhật trạng thái đơn
    await don.update({
      trang_thai: "cho_xac_nhan",
      phuong_thuc_thanh_toan: false,
      ngay_cap_nhat: new Date(),
    });

    return NextResponse.redirect(
      `${baseUrl}/dat_hang?status=success&id=${don.id}&maDon=${maDon}`
    );

  } catch (error) {
    console.error("Lỗi xử lý xác thực VNPay:", error);
    return NextResponse.redirect(`${baseUrl}/dat_hang?status=error`);
  }
}
