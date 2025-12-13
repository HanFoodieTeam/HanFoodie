import { DonHangModel } from "@/lib/models";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function GET() {
  try {
    // Lấy thời gian hiện tại (VN)
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000);

    // Tìm đơn "chờ thanh toán" quá 5 phút
    const orders = await DonHangModel.findAll({
      where: {
        trang_thai: "cho_thanh_toan",
        ngay_tao: { [Op.lt]: fiveMinutesAgo },
        phuong_thuc_thanh_toan: false, // đơn COD hoặc chưa thanh toán online
      },
    });

    for (const dh of orders) {
      await dh.update({
        trang_thai: "da_huy",
        ngay_cap_nhat: now,
        ghi_chu: "Hệ thống tự hủy do quá thời gian thanh toán",
      });
    }

    return NextResponse.json({
      success: true,
      message: `Đã hủy ${orders.length} đơn quá hạn`,
    });
  } catch (error) {
    console.error("Cron error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
