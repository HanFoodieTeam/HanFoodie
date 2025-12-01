import { NextResponse } from "next/server";
import { MaGiamGiaModel } from "@/app/lib/models";
import { Op } from "sequelize";

export async function GET(req?: Request) {
  try {
    // Lấy toàn bộ mã giảm giá, sắp theo id desc
    const rows = await MaGiamGiaModel.findAll({
      order: [["id", "desc"]],
      raw: true,
    });

    // Trả về dữ liệu full (client sẽ xử lý lọc + phân trang)
    return NextResponse.json({
      data: rows,
      total: rows.length,
    });
  } catch (error) {
    console.error("Lỗi API GET /api/ma_giam_gia:", error);
    return NextResponse.json({ data: [], total: 0 }, { status: 500 });
  }
}

// POST giữ nguyên như bạn có
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      ten,
      gia_tri_giam,
      loai_giam_gia,
      gia_tri_toi_thieu,
      gia_tri_giam_toi_da,
      so_luong,
      bat_dau,
      ket_thuc,
      an_hien,
      ma_so,
      mo_ta,
    } = data;

    await MaGiamGiaModel.create({
      ten,
      gia_tri_giam,
      loai_giam_gia,
      gia_tri_toi_thieu,
      gia_tri_giam_toi_da,
      so_luong,
      bat_dau,
      ket_thuc,
      an_hien,
      ma_so,
      mo_ta,
    });

    return NextResponse.json(
      { message: "Thêm mã giảm giá thành công" },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Lỗi khi thêm mã giảm giá:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Lỗi khi thêm mã giảm giá", detail: errMsg },
      { status: 500 }
    );
  }
}
