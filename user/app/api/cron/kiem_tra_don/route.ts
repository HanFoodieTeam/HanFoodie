import { NextResponse } from "next/server";
import { DonHangModel } from "@/app/lib/models";

export async function GET() {
  try {
    const DON_HANG_TIMEOUT = 15; // phút

    const now = new Date();
    const expireTime = new Date(now.getTime() - DON_HANG_TIMEOUT * 60000);

15    const updated = await DonHangModel.update(
      { trang_thai: "da_huy", ghi_chu: "Hệ thống tự hủy do quá hạn thanh toán" },
      {
        where: {
          trang_thai: "cho_thanh_toan",
          ngay_tao: { lt: expireTime },
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Cron job đã chạy",
      so_don_da_huy: updated[0],
    });
  } catch (err) {
    console.error("Cron error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
