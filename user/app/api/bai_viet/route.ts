// File: app/api/bai_viet/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BaiVietModel, LoaiBaiVietModel } from "@/app/lib/models";
import { WhereOptions } from "sequelize";
import { IBaiViet } from "@/app/lib/cautrucdata";

// Kiểu raw dữ liệu từ Sequelize
interface BaiVietRaw extends Omit<IBaiViet, "an_hien" | "ngay_dang"> {
  an_hien: number | boolean;
  ngay_dang: string | Date | null;
}

// Hàm chuẩn hóa dữ liệu
function mapRawToBaiViet(raw: BaiVietRaw): IBaiViet {
  return {
    ...raw,
    an_hien: Boolean(raw.an_hien),
    ngay_dang: raw.ngay_dang ? new Date(raw.ngay_dang).toISOString() : null,
  };
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const id_loai = url.searchParams.get("id_loai");
    const page = Number(url.searchParams.get("page") ?? 1);
    const limit = Number(url.searchParams.get("limit") ?? 6);
    const offset = (page - 1) * limit;

    // Điều kiện tìm kiếm
    const whereClause: WhereOptions = { an_hien: 1 };
    if (id_loai) whereClause.id_loai_bv = Number(id_loai);

    // Lấy dữ liệu từ DB
    const { count, rows } = await BaiVietModel.findAndCountAll({
      where: whereClause,
      include: [{ model: LoaiBaiVietModel, as: "loai_bai_viet" }],
      order: [["ngay_dang", "DESC"]],
      limit,
      offset,
    });

    // Chuẩn hóa dữ liệu
    const data: IBaiViet[] = rows.map((bv) =>
      mapRawToBaiViet(bv.toJSON() as BaiVietRaw)
    );

    const totalPages = Math.ceil(count / limit);

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
        limit,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi server";
    console.error("🔥 Lỗi khi lấy danh sách bài viết:", message);

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
