import { MaGiamGiaModel } from "@/app/lib/models";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";
  const limit = 7; // mỗi trang 5 item
  const offset = (page - 1) * limit;

  const where = search
    ? {
        [Op.or]: [
          { ten: { [Op.like]: `%${search}%` } },
          { ma_so: { [Op.like]: `%${search}%` } },
        ],
      }
    : {};

  const { rows, count } = await MaGiamGiaModel.findAndCountAll({
    where,
    order: [["id", "desc"]],
    limit,
    offset,
  });

  const totalPages = Math.ceil(count / limit);

  return NextResponse.json({
    data: rows,
    totalPages,
    currentPage: page,
  });
}



//thêm mã giảm giá
export async function POST(req: Request) {
  try {
    // Đọc dữ liệu JSON thay vì formData
    const data = await req.json();

    const {
      ten,
      gia_tri_giam,
      loai_giam_gia,
      gia_tri_toi_thieu,
      so_luong,
      bat_dau,
      ket_thuc,
      an_hien,
      ma_so,
      dieu_kien,
    } = data;

    await MaGiamGiaModel.create({
      ten,
      gia_tri_giam,
      loai_giam_gia,
      gia_tri_toi_thieu,
      so_luong,
      bat_dau,
      ket_thuc,
      an_hien,
      ma_so,
      dieu_kien,
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
