import { NextResponse } from "next/server";
import { BaiVietModel, LoaiBaiVietModel } from "@/app/lib/models";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id_loai = url.searchParams.get("id_loai"); // lọc theo loại bài viết

    const whereClause: any = { an_hien: 1 };
    if (id_loai) whereClause.id_loai_bv = Number(id_loai);

    const dsBaiViet = await BaiVietModel.findAll({
      where: whereClause,
      include: [{ model: LoaiBaiVietModel, as: "loai_bai_viet" }],
      order: [["ngay_dang", "DESC"]],
    });

    return NextResponse.json(dsBaiViet);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
