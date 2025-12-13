import { NextResponse } from "next/server";
import { Sequelize } from "sequelize";
import {
  SanPhamModel,
  DanhMucModel,
  BienTheModel,
  DanhGiaModel,
} from "@/lib/models";
import { ISanPham } from "@/lib/cautrucdata";

export async function GET() {
  try {
    const sanPhams = await SanPhamModel.findAll({
      where: { an_hien: true },
      order: [["luot_xem", "DESC"]],
      limit: 8,
    });

    const result: ISanPham[] = [];

    for (const sp of sanPhams) {
      const idSanPham = sp.get("id") as number;

      const trungBinh = (await DanhGiaModel.findOne({
        attributes: [[Sequelize.fn("AVG", Sequelize.col("sao")), "so_sao_tb"]],
        where: { an_hien: 1 },
        include: [
          {
            model: BienTheModel,
            as: "bien_the",
            attributes: [],
            where: { id_san_pham: idSanPham },
          },
        ],
        raw: true,
      })) as { so_sao_tb: number | null } | null;

      const so_sao_tb =
        trungBinh?.so_sao_tb != null ? Number(trungBinh.so_sao_tb) : null;

      const spJSON = sp.get({ plain: true }) as ISanPham;
      spJSON.so_sao_tb = so_sao_tb;

      result.push(spJSON);
    }

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}