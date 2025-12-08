

import { NextRequest, NextResponse } from "next/server";
import {
  NguoiDungModel,
  DiaChiModel,
  DonHangModel,
  ChiTietDonHangModel,
  BienTheModel,
  SanPhamModel,
} from "@/app/lib/models";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; 
    const userId = Number(id);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "ID không hợp lệ" },
        { status: 400 }
      );
    }

    const user = await NguoiDungModel.findByPk(userId, {
      attributes: [
        "id", "ho_ten", "email", "sdt", "hinh","ngay_sinh", "vai_tro", "trang_thai", "kich_hoat", "ngay_tao",
      ],
      include: [
        {
          model: DiaChiModel,
          as: "dia_chi",
        },
        {
          model: DonHangModel,
          as: "don_hang",
          include: [
            {
              model: ChiTietDonHangModel,
              as: "chi_tiet_don_hang",
              include: [
                {
                  model: BienTheModel,
                  as: "bien_the",
                  include: [
                    {
                      model: SanPhamModel,
                      as: "san_pham",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy người dùng" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error(" Lỗi GET /api/nguoi_dung/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Lỗi server" },
      { status: 500 }
    );
  }
}
