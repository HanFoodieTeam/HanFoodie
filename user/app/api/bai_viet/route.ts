// File: app/api/bai_viet/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BaiVietModel, LoaiBaiVietModel } from "@/app/lib/models";
import { WhereOptions } from "sequelize";
import { IBaiViet } from "@/app/lib/cautrucdata";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id_loai = url.searchParams.get("id_loai"); // lọc theo loại bài viết

    // Chuẩn bị điều kiện tìm kiếm
    const whereClause: WhereOptions = { an_hien: 1 };
    if (id_loai) whereClause.id_loai_bv = Number(id_loai);

    // Lấy dữ liệu từ DB
    const dsBaiViet = await BaiVietModel.findAll({
      where: whereClause,
      include: [{ model: LoaiBaiVietModel, as: "loai_bai_viet" }],
      order: [["ngay_dang", "DESC"]],
    });

    // Chuẩn hóa dữ liệu trả về
    const data: IBaiViet[] = dsBaiViet.map(bv => {
      const raw = bv.toJSON() as IBaiViet & { an_hien: number | boolean };
      return {
        ...raw,
        an_hien: !!raw.an_hien,
        ngay_dang: raw.ngay_dang ? new Date(raw.ngay_dang).toISOString() : null,
      };
    });

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Lỗi server";
    console.error("🔥 Lỗi khi lấy danh sách bài viết:", message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
