import { IOrderEmail } from "../../lib/cautrucdata";

export function orderEmailTemplate({
  hoTen,
  maDon,
  ngayDat,
  phuongThucThanhToan,
  sanPhamListHtml,
  tongTienHang,
  giamGia,
  tongThanhToan,
  urlDonHang,
}: IOrderEmail) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px;">
      
     <div style="text-align:center; margin-bottom:20px;">
        <img
          src="https://res.cloudinary.com/dsvfxehui/image/upload/v1765961064/logo-removebg-preview_gbz7wk.png"
          alt="HanFoodie"
          width="220"
          style=" display:block; margin:0 auto; max-width:220px; height:auto;"/>
      </div>


      <h2 style="text-align:center; color:#6A0A0A">XÁC NHẬN ĐẶT HÀNG THÀNH CÔNG</h2>    

      <p>Xin chào <strong>${hoTen}</strong></p>
      <p>Đơn hàng <strong>#${maDon}</strong> đã được đặt thành công lúc <strong>${ngayDat}</strong>.</p>

      <h3>Thông tin sản phẩm</h3>
      <div style="border-top: 1px solid #eee; padding-top: 10px;">
          ${sanPhamListHtml}
      </div>

      <div style="margin: 25px 0 15px; text-align: center;">
        <a href="${urlDonHang}" style="background: #F58220; color: #fff; 
           text-decoration: none; padding: 12px 22px; border-radius: 6px; 
           font-size: 16px; display: inline-block;">
          Xem đơn hàng của bạn
        </a>
      </div>

      <table width="100%" style="font-size: 15px; margin-top: 10px;">
          <tr>
              <td>Phương thức thanh toán:</td>
              <td style="text-align:right;"><strong>${phuongThucThanhToan}</strong></td>
          </tr>
          <tr>
              <td>Tổng tiền hàng:</td>
              <td style="text-align:right;">${tongTienHang.toLocaleString()}đ</td>
          </tr>
          <tr>
              <td>Giảm giá:</td>
              <td style="text-align:right; color:#d9534f;">-${giamGia.toLocaleString()}đ</td>
          </tr>
          <tr>
              <td><strong>Tổng thanh toán:</strong></td>
              <td style="text-align:right; font-size: 18px; color:#F58220; font-weight:bold;">
                ${tongThanhToan.toLocaleString()}đ
              </td>
          </tr>
      </table>

      <p style="margin-top: 20px; font-size: 13px; text-align: center; color: #888;">
          Cảm ơn bạn đã mua hàng tại HanFoodie 
      </p>
  </div>
`;
}
