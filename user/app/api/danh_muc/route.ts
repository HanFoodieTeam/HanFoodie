import { NextResponse } from "next/server";
import { DanhMucModel, SanPhamModel } from "@/lib/models";
import { Sequelize, FindOptions } from "sequelize";

export async function GET() {
  try {
    const options: FindOptions = {
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
    };

    const danhMucs = await DanhMucModel.findAll(options);

    return NextResponse.json(danhMucs);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("❌ Lỗi khi lấy danh mục:", message);
    return NextResponse.json(
      { message: "Lỗi máy chủ", error: message },
      { status: 500 }
    );
  }
}
