import { NextResponse } from "next/server";
import { DanhMucModel, SanPhamModel } from "@/app/lib/models";
import { Sequelize } from "sequelize";

export async function GET() {
  try {
    const danh_mucs = await DanhMucModel.findAll({
      attributes: [
        "id",
        "ten",
        "slug",
        "hinh",
        "an_hien",
        [Sequelize.literal("COUNT(`san_pham`.`id`)"), "so_san_pham"],

      ],
      include: [
        {
          model: SanPhamModel,
          as: "san_pham", 
          attributes: [],
          required: false,
          where: { an_hien: true }, 
        },
      ],
      where: { an_hien: true }, 
      group: ["DanhMuc.id"],
      order: [["id", "DESC"]],
    });

    return NextResponse.json(danh_mucs);
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh mục:", error);
    return NextResponse.json({ message: "Lỗi máy chủ", error: String(error) }, { status: 500 });
  }
}
