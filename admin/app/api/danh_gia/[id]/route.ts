
import { NextResponse } from "next/server";
import { DanhGiaModel, NguoiDungModel, BienTheModel, SanPhamModel } from "@/app/lib/models";
import { IDanhGia } from "@/app/lib/cautrucdata";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { searchParams } = new URL(req.url);
    const filterSao = Number(searchParams.get("filterSao") || 0);

    const sanPhamId = Number(id);
    if (isNaN(sanPhamId)) {
      return NextResponse.json(
        { success: false, message: "ID sản phẩm không hợp lệ" },
        { status: 400 }
      );
    }

    // Điều kiện lọc
    const whereCondition: Record<string, unknown> = {
      "$bien_the.san_pham.id$": sanPhamId,
      
    };

    // Nếu filterSao != 0 → lọc theo số sao
    if (filterSao >= 1 && filterSao <= 5) {
      whereCondition["sao"] = filterSao;
    }

    //  Trả về toàn bộ đánh giá - không phân trang
    const rows = await DanhGiaModel.findAll({
      where: whereCondition,
      include: [
        {
          model: BienTheModel,
          as: "bien_the",
          include: [
            {
              model: SanPhamModel,
              as: "san_pham",
              attributes: ["id", "ten"],
            },
          ],
        },
        {
          model: NguoiDungModel,
          as: "nguoi_dung",
          attributes: ["id", "ho_ten"],
        },
      ],
      order: [["id", "DESC"]],
    });

    const first = rows[0]?.toJSON() as IDanhGia & {
      bien_the?: { san_pham?: { ten?: string } };
    };

    const tenSanPham = first?.bien_the?.san_pham?.ten || "Không xác định";

    const data: IDanhGia[] = rows.map((r) => {
      const j = r.toJSON() as IDanhGia;
      return {
        ...j,
        an_hien: Boolean(j.an_hien),
        an_ten: Number(j.an_ten),
      };
    });

    return NextResponse.json({
      success: true,
      tenSanPham,
      totalItems: data.length,
      data,
    });
  } catch (error) {
    console.error(" Lỗi khi lấy đánh giá sản phẩm:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy đánh giá sản phẩm" },
      { status: 500 }
    );
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { an_hien } = await req.json();

    const dg = await DanhGiaModel.findByPk(id);
    if (!dg) {
      return NextResponse.json(
        { message: "Không tìm thấy đánh giá" },
        { status: 404 }
      );
    }

    await dg.update({ an_hien });

    return NextResponse.json({ message: "Cập nhật thành công", an_hien });
  } catch (err) {
    console.error("PATCH lỗi:", err);
    return NextResponse.json(
      { error: "Lỗi khi cập nhật trạng thái" },
      { status: 500 }
    );
  }
}
