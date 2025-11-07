

import { MaGiamGiaModel } from "../../lib/models";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search") || "";
  const status = (searchParams.get("status") || "all") as
    | "all"
    | "active"
    | "upcoming"
    | "expired";

  const limit = 7;
  const offset = (page - 1) * limit;

  // Tìm kiếm
  const whereSearch =
    search.trim() !== ""
      ? {
          [Op.or]: [
            { ten: { [Op.like]: `%${search}%` } },
            { ma_so: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

  // Lọc theo trạng thái ngày
  const now = new Date();
  let whereStatus = {};
  if (status === "upcoming") {
    whereStatus = { bat_dau: { [Op.gt]: now } };
  } else if (status === "active") {
    whereStatus = {
      bat_dau: { [Op.lte]: now },
      ket_thuc: { [Op.gte]: now },
    };
  } else if (status === "expired") {
    whereStatus = { ket_thuc: { [Op.lt]: now } };
  }

  const where = {
    [Op.and]: [whereSearch, whereStatus],
  };

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

// thêm mã giảm giá giữ nguyên như bạn đã có
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
