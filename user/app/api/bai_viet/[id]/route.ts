import { NextResponse } from "next/server";
import { BaiVietModel, LoaiBaiVietModel } from "@/app/lib/models";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // params.id bây giờ đã sẵn sàng trong context
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
    }

    const bvInstance = await BaiVietModel.findByPk(id, {
      include: [{ model: LoaiBaiVietModel, as: "loai_bai_viet" }],
    });

    if (!bvInstance || bvInstance.getDataValue("an_hien") === 0) {
      return NextResponse.json({ message: "Bài viết không tồn tại" }, { status: 404 });
    }

    // Tăng lượt xem 1 lần
    bvInstance.setDataValue(
      "luot_xem",
      (bvInstance.getDataValue("luot_xem") || 0) + 1
    );
    await bvInstance.save();

    return NextResponse.json(bvInstance);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
