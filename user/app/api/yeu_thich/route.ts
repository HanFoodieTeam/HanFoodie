import { NextResponse } from "next/server";
import { YeuThichModel, SanPhamModel } from "@/lib/models";

// ================== GET: Lấy danh sách yêu thích của 1 user ==================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id_nguoi_dung = searchParams.get("id_nguoi_dung");

    if (!id_nguoi_dung) {
      return NextResponse.json({ success: false, message: "Thiếu id_nguoi_dung" }, { status: 400 });
    }

    const list = await YeuThichModel.findAll({
      where: { id_nguoi_dung },
      include: [
        {
          model: SanPhamModel,
          as: "san_pham",
          attributes: ["id", "ten", "hinh", "gia_goc", "slug"]
        }
      ]
    });

    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ================== POST: Thêm yêu thích ==================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id_nguoi_dung, id_san_pham } = body;

    if (!id_nguoi_dung || !id_san_pham) {
      return NextResponse.json({ success: false, message: "Thiếu dữ liệu" }, { status: 400 });
    }

    // Kiểm tra đã tồn tại chưa
    const existing = await YeuThichModel.findOne({
      where: { id_nguoi_dung, id_san_pham },
    });

    if (existing) {
      return NextResponse.json({ success: false, message: "Đã có trong yêu thích" }, { status: 400 });
    }

    const newYT = await YeuThichModel.create({ id_nguoi_dung, id_san_pham });

    return NextResponse.json({ success: true, data: newYT });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ================== DELETE: Xóa yêu thích ==================
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id_nguoi_dung = searchParams.get("id_nguoi_dung");
    const id_san_pham = searchParams.get("id_san_pham");

    if (!id_nguoi_dung || !id_san_pham) {
      return NextResponse.json({ success: false, message: "Thiếu dữ liệu" }, { status: 400 });
    }

    const deleted = await YeuThichModel.destroy({
      where: { id_nguoi_dung, id_san_pham },
    });

    return NextResponse.json({ success: true, deleted });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
