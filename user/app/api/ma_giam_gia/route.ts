import { NextRequest, NextResponse } from "next/server";
import { MaGiamGiaModel } from "@/app/lib/models";
import { Op } from "sequelize";
import { IMaGiamGia } from "@/app/lib/cautrucdata";

// ✅ Lấy danh sách mã giảm giá còn hiệu lực và đang hiển thị
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const today = new Date();

    const maGiamRaw = await MaGiamGiaModel.findAll({
      where: {
        an_hien: true, // chỉ lấy mã đang hiển thị
        bat_dau: { [Op.lte]: today }, // đã bắt đầu
        ket_thuc: { [Op.gte]: today }, // chưa kết thúc
        so_luong: { [Op.gt]: 0 }, // còn số lượng
      },
      order: [["id", "DESC"]],
    });

    const danhSach = maGiamRaw.map((item) => item.toJSON()) as IMaGiamGia[];

    return NextResponse.json(danhSach, { status: 200 });
  } catch (error) {
    console.error("❌ Lỗi khi lấy mã giảm giá còn hoạt động:", error);
    return NextResponse.json(
      { message: "Lỗi server khi lấy mã giảm giá" },
      { status: 500 }
    );
  }
}
