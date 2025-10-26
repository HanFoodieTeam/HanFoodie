import { NextRequest, NextResponse } from "next/server";
import { GioHangModel } from "@/app/lib/models";
import { getUserFromToken } from "@/app/lib/auth";
import { Model } from "sequelize";

interface IGioHangRecord extends Model {
  id: number;
  id_nguoi_dung: number;
  id_bien_the: number;
  so_luong: number;
  json_mon_them: string | null;
  json_tuy_chon: string | null;
}


export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const user = getUserFromToken(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as {
      id_bien_the: number;
      so_luong: number;
      json_mon_them?: unknown[];
      json_tuy_chon?: Record<string, string>;
    };

    const newItem = await GioHangModel.create({
      id_nguoi_dung: user.id,
      id_bien_the: body.id_bien_the,
      so_luong: body.so_luong,
      json_mon_them: JSON.stringify(body.json_mon_them ?? []),
      json_tuy_chon: JSON.stringify(body.json_tuy_chon ?? {}),
    });

    const plain = newItem.toJSON() as IGioHangRecord;

    return NextResponse.json({
      message: "Đã thêm vào giỏ hàng",
      data: {
        ...plain,
        json_mon_them: plain.json_mon_them
          ? JSON.parse(plain.json_mon_them)
          : [],
        json_tuy_chon: plain.json_tuy_chon
          ? JSON.parse(plain.json_tuy_chon)
          : {},
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi không xác định";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


export async function PUT(req: NextRequest): Promise<NextResponse> {
  try {
    const user = getUserFromToken(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as {
      id: number;
      so_luong?: number;
      json_mon_them?: unknown[];
      json_tuy_chon?: Record<string, string>;
    };

    const gioHang = (await GioHangModel.findOne({
      where: { id: body.id, id_nguoi_dung: user.id },
    })) as IGioHangRecord | null;

    if (!gioHang)
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm trong giỏ" },
        { status: 404 }
      );

    // Đọc JSON gốc trong DB (nếu có)
    const oldMonThem = gioHang.json_mon_them
      ? JSON.parse(gioHang.json_mon_them)
      : [];
    const oldTuyChon = gioHang.json_tuy_chon
      ? JSON.parse(gioHang.json_tuy_chon)
      : {};

    await gioHang.update({
      so_luong: body.so_luong ?? gioHang.so_luong,
      json_mon_them: JSON.stringify(body.json_mon_them ?? oldMonThem),
      json_tuy_chon: JSON.stringify(body.json_tuy_chon ?? oldTuyChon),
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


export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const user = getUserFromToken(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await req.json()) as { id: number };

    const deleted = await GioHangModel.destroy({
      where: { id: body.id, id_nguoi_dung: user.id },
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
