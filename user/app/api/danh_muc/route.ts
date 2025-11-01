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
        [
          // ⚠️ alias phải trùng với hasMany: "san_pham"
          Sequelize.fn("COUNT", Sequelize.col("san_pham.id")),
          "so_san_pham"
        ],
      ],
      include: [
        {
          model: SanPhamModel,
          as: "san_pham", // ✅ trùng alias
          attributes: [],
          required: false,
          where: { an_hien: 1 }, // chỉ đếm sản phẩm đang hiển thị
        },
      ],
      where: { an_hien: 1 }, // chỉ lấy danh mục đang hiển thị
      group: ["DanhMuc.id"],
      order: [["id", "DESC"]],
    });

    return NextResponse.json(danh_mucs);
  } catch (error) {
    console.error("❌ Lỗi khi lấy danh mục:", error);
    return NextResponse.json({ message: "Lỗi máy chủ", error: String(error) }, { status: 500 });
  }
}
