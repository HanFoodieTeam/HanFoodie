// import { NextResponse } from "next/server";
// import {
//   ChiTietDonHangModel,
//   BienTheModel,
//   SanPhamModel,
// } from "@/app/lib/models";
// import { fn, col, literal } from "sequelize";
// import { ISanPham } from "@/app/lib/cautrucdata";

// export async function GET() {
//   try {
//     const records = await ChiTietDonHangModel.findAll({
//       attributes: [
//         "id_bien_the",
//         [fn("SUM", col("so_luong")), "tong_so_luong_ban"],
//       ],
//       include: [
//         {
//           model: BienTheModel,
//           as: "bien_the",
//           include: [
//             {
//               model: SanPhamModel,
//               as: "san_pham",
//             },
//           ],
//         },
//       ],
//       group: ["id_bien_the", "bien_the.id", "bien_the->san_pham.id"],
//       order: [[literal("tong_so_luong_ban"), "DESC"]],
//       limit: 8,
//     });

 
// const list: ISanPham[] = records
//   .filter((row) => row.dataValues.bien_the?.san_pham)
//   .map((row) => {
//     const sp = row.dataValues.bien_the.san_pham.dataValues;
//     return {
//       id: sp.id,
//       ten: sp.ten,
//       mo_ta: sp.mo_ta,
//       slug: sp.slug,
//       hinh: sp.hinh,
//       gia_goc: sp.gia_goc,
//       an_hien: sp.an_hien,
//       id_danh_muc: sp.id_danh_muc,
//       luot_xem: sp.luot_xem ?? 0,
//     } satisfies ISanPham;
//   })
//   .filter((sp, index, self) => 
//     index === self.findIndex((v) => v.id === sp.id)
//   )
//   .slice(0, 8);


//     return NextResponse.json(list);
//   } catch (error) {
//     console.error("Lỗi API SP mua nhiều:", error);
//     return NextResponse.json([], { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import {
  ChiTietDonHangModel,
  BienTheModel,
  SanPhamModel,
  DanhGiaModel,
} from "@/app/lib/models";
import { fn, col, literal, Sequelize } from "sequelize";
import { ISanPham } from "@/app/lib/cautrucdata";

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
            },
          ],
        },
      ],
      group: ["id_bien_the", "bien_the.id", "bien_the->san_pham.id"],
      order: [[literal("tong_so_luong_ban"), "DESC"]],
      limit: 20, // lấy dư để lọc trùng
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
          so_sao_tb: null, // 🚀 sẽ cập nhật sau
        } satisfies ISanPham;
      })
      // 🧹 loại trùng id sản phẩm
      .filter((sp, i, self) => i === self.findIndex((v) => v.id === sp.id))
      .slice(0, 8); // giới hạn cuối cùng

    // ⭐ Tính rating cho mỗi sản phẩm
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
