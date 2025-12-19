import { NextResponse } from "next/server";
import { Sequelize } from "sequelize";
import {
  DanhMucModel,
  SanPhamModel,
  DanhGiaModel,
  BienTheModel,
} from "@/lib/models";
import { IDanhMuc, ISanPham } from "@/lib/cautrucdata";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const danhMucSlug = searchParams.get("danh_muc");

    const danhMucs = await DanhMucModel.findAll({
      where: {
        an_hien: true,
        ...(danhMucSlug ? { slug: danhMucSlug } : {}),
      },
      include: [
        {
          model: SanPhamModel,
          as: "san_pham",
          where: { an_hien: true },
        },
      ],
      order: [["id", "ASC"]],
    });

    const result: IDanhMuc[] = [];

    for (const dmInstance of danhMucs) {
      const dm = dmInstance.toJSON() as IDanhMuc & {
        san_pham?: ISanPham[];
      };

      if (dm.san_pham) {
        const sanPhams: ISanPham[] = [];

        for (const sp of dm.san_pham) {
          const trungBinh = (await DanhGiaModel.findOne({
            attributes: [
              [Sequelize.fn("AVG", Sequelize.col("sao")), "so_sao_tb"],
            ],
            where: { an_hien: 1 },
            include: [
              {
                model: BienTheModel,
                as: "bien_the",
                attributes: [],
                where: { id_san_pham: sp.id },
              },
            ],
            raw: true,
          })) as { so_sao_tb: number | null } | null;

          sanPhams.push({
            ...sp,
            so_sao_tb:
              trungBinh?.so_sao_tb !== null
                ? Number(trungBinh?.so_sao_tb)
                : null,
          });
        }

        dm.san_pham = sanPhams;
      }

      result.push(dm);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("🔥 Lỗi lấy sản phẩm:", error);
    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}
