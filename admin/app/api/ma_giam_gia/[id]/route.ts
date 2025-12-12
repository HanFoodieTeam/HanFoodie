import { MaGiamGiaModel } from "@/lib/models";
import { NextResponse } from "next/server";

//  Lấy 1 mã giảm giá theo ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sp = await MaGiamGiaModel.findByPk(Number(id));

  if (!sp)
    return NextResponse.json(
      { message: "Không tìm thấy mã giảm giá" },
      { status: 404 }
    );

  return NextResponse.json(sp);
}

//  Xóa mã giảm giá
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const sp = await MaGiamGiaModel.findByPk(id);

  if (!sp)
    return NextResponse.json(
      { thong_bao: "Không tìm thấy sản phẩm" },
      { status: 404 }
    );

  await sp.destroy();
  return NextResponse.redirect(new URL("/ma_giam_gia", req.url));
}

//  Cập nhật mã giảm giá
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const maGiamGia = await MaGiamGiaModel.findByPk(id);

    if (!maGiamGia)
      return NextResponse.json(
        { message: "Không tìm thấy mã giảm giá" },
        { status: 404 }
      );

    await maGiamGia.update(body);
    return NextResponse.json({ message: "Cập nhật thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật mã giảm giá:", error);
    return NextResponse.json(
      { error: "Lỗi khi cập nhật mã giảm giá" },
      { status: 500 }
    );
  }
}

//  Cập nhật trạng thái ẩn/hiện
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { an_hien } = await req.json();

    const mgg = await MaGiamGiaModel.findByPk(id);
    if (!mgg)
      return NextResponse.json(
        { message: "Không tìm thấy mã giảm giá" },
        { status: 404 }
      );

    await mgg.update({ an_hien });
    return NextResponse.json({ message: "Cập nhật thành công", an_hien });
  } catch (err) {
    console.error("PATCH lỗi:", err);
    return NextResponse.json(
      { error: "Lỗi khi cập nhật trạng thái" },
      { status: 500 }
    );
  }
}


