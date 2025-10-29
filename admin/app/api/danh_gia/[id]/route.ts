import { DanhGiaModel } from "@/app/lib/models";
import { NextResponse } from "next/server";

// Cập nhật trạng thái ẩn/hiện đánh giá
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    //  Cần await ở đây
    const { id } = await params;

    const { an_hien } = await req.json();

    const dg = await DanhGiaModel.findByPk(id);
    if (!dg) {
      return NextResponse.json({ message: "Không tìm thấy đánh giá" }, { status: 404 });
    }

    await dg.update({ an_hien });

    return NextResponse.json({ message: "Cập nhật thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật đánh giá:", error);
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}
