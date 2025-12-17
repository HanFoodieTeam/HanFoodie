import { NextResponse } from "next/server";
import {
  ChiTietDonHangModel,
  BienTheModel,
  SanPhamModel,
  DanhGiaModel,
} from "@/lib/models";
import { fn, col, literal } from "sequelize";
import { ISanPham } from "@/lib/cautrucdata";

interface IRatingResult {
  so_sao_tb: number | null;
}

export async function GET() {
  try {
    const records = await ChiTietDonHangModel.findAll({
      attributes: [
        "id_bien_the",
        [fn("SUM", col("so_luong")), "tong_so_luong_ban"],
      ],
      include: [
        {
          model: BienTheModel,
          as: "bien_the",
          include: [
            {
              model: SanPhamModel,
              as: "san_pham",
              where: { an_hien: true },
            },
          ],
        },
      ],
      group: ["id_bien_the", "bien_the.id", "bien_the->san_pham.id"],
      order: [[literal("tong_so_luong_ban"), "DESC"]],
      limit: 20, 
    });

    let list: ISanPham[] = records
      .filter((r) => r.dataValues.bien_the?.san_pham)
      .map((r) => {
        const sp = r.dataValues.bien_the.san_pham.dataValues;
        return {
          id: sp.id,
          ten: sp.ten,
          mo_ta: sp.mo_ta,
          slug: sp.slug,
          hinh: sp.hinh,
          gia_goc: sp.gia_goc,
          an_hien: sp.an_hien,
          id_danh_muc: sp.id_danh_muc,
          luot_xem: sp.luot_xem ?? 0,
          so_sao_tb: null, 
        } satisfies ISanPham;
      })
      .filter((sp, i, self) => i === self.findIndex((v) => v.id === sp.id))
      .slice(0, 8); 

    for (const sp of list) {
      const rating = (await DanhGiaModel.findOne({
        attributes: [[fn("AVG", col("sao")), "so_sao_tb"]],
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
      })) as IRatingResult | null;

      sp.so_sao_tb = rating?.so_sao_tb ? Number(rating.so_sao_tb) : null;
    }

    return NextResponse.json(list);
  } catch (error) {
    console.error("Lỗi API SP mua nhiều:", error);
    return NextResponse.json([], { status: 500 });
  }
}
