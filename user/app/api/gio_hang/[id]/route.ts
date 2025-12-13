import { NextRequest, NextResponse } from "next/server";
import { GioHangModel } from "@/lib/models";
import { getUserFromToken } from "@/lib/auth";
import { Model } from "sequelize";

interface IGioHangRecord extends Model {
  id: number;
  id_nguoi_dung: number;
  id_bien_the: number;
  so_luong: number;
  json_mon_them: string | null;
  json_tuy_chon: string | null;
  ghi_chu?: string | null;
}
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const user = getUserFromToken(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await context.params;
    const parsedId = Number(id);
    if (!parsedId)
      return NextResponse.json({ error: "Thiếu ID giỏ hàng" }, { status: 400 });

    const body = (await req.json()) as {
      id_bien_the?: number;
      so_luong?: number;
      json_mon_them?: { id: number; ten: string; gia_them?: number | null }[];
      json_tuy_chon?: Record<string, string>;
      ghi_chu?: string;
    };

    const gioHang = (await GioHangModel.findOne({
      where: { id: parsedId, id_nguoi_dung: user.id },
    })) as IGioHangRecord | null;

    if (!gioHang)
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm trong giỏ" },
        { status: 404 }
      );

    //  Cập nhật các trường có thể thay đổi
    const updatedData: Partial<IGioHangRecord> = {};

    if (body.id_bien_the !== undefined)
      updatedData.id_bien_the = body.id_bien_the;

    if (body.so_luong !== undefined)
      updatedData.so_luong = body.so_luong;

    if (body.json_mon_them !== undefined)
      updatedData.json_mon_them = JSON.stringify(body.json_mon_them);

    if (body.json_tuy_chon !== undefined)
      updatedData.json_tuy_chon = JSON.stringify(body.json_tuy_chon);

    if (body.ghi_chu !== undefined)
      updatedData.ghi_chu = body.ghi_chu;

    await gioHang.update(updatedData);


    await gioHang.reload({
      include: [
        {
          association: "bien_the",
          include: [{ association: "san_pham" }],
        },
      ],
    });

    const updated = gioHang.toJSON() as IGioHangRecord;

    return NextResponse.json({
      message: "Cập nhật thành công",
      data: {
        ...updated,
        json_mon_them: updated.json_mon_them
          ? JSON.parse(updated.json_mon_them)
          : [],
        json_tuy_chon: updated.json_tuy_chon
          ? JSON.parse(updated.json_tuy_chon)
          : {},
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi không xác định";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}



export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> } 
): Promise<NextResponse> {
  try {
    const { id } = await context.params; 
    const user = getUserFromToken(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const idNumber = Number(id);
    if (isNaN(idNumber))
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });

    const deleted = await GioHangModel.destroy({
      where: { id: idNumber, id_nguoi_dung: user.id },
    });

    if (!deleted)
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm cần xóa" },
        { status: 404 }
      );

    return NextResponse.json({ message: "Đã xóa sản phẩm khỏi giỏ hàng" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi không xác định";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
