// import { DanhGiaModel } from "@/app/lib/models";
// import { NextResponse } from "next/server";


// export async function GET() {
//     const sp_arr = await DanhGiaModel.findAll({
//         order: [['id', 'desc']],
//         limit: 6,
//     });
//     return NextResponse.json(sp_arr);
// }


// import { BienTheModel, DanhGiaModel, NguoiDungModel, SanPhamModel } from "@/app/lib/models";
// import { NextResponse } from "next/server";
// // import { BienTheModel, DanhGiaModel, NguoiDungModel, SanPhamModel } from "../../lib/models";


// export async function GET() {
//     try {
//         const danhGias = await DanhGiaModel.findAll({
//             include: [
//                 {
//                     model: NguoiDungModel,
//                     as: "nguoi_dung",
//                     attributes: ["ho_ten"],
//                 },
//                 {
//                     model: BienTheModel,
//                     as: "bien_the",
//                     attributes: ["ten"],
//                     include: [
//                         {
//                             model: SanPhamModel,
//                             as: "san_pham",
//                             attributes: ["ten", "hinh"],
//                         }
//                         ,
//                     ],
//                 },
//             ],
//             order: [["id", "desc"]], limit:6,
//         });

//         return NextResponse.json(danhGias);
//     } catch (error) {
//         console.error("❌ Lỗi khi tải đánh giá:", error);
//         return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
//     }
// }


import { NextResponse } from "next/server";
import { DanhGiaModel, BienTheModel, SanPhamModel, NguoiDungModel } from "@/app/lib/models";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sanPhamId = searchParams.get("san_pham_id");

  try {
    const where: Record<string, unknown> = {};
    if (sanPhamId && sanPhamId !== "all") {
      where["$bien_the.san_pham.id$"] = Number(sanPhamId);
    }

    const danhGia = await DanhGiaModel.findAll({
      include: [
        {
          model: BienTheModel,
          as: "bien_the",
          include: [{ model: SanPhamModel, as: "san_pham" }],
        },
        { model: NguoiDungModel, as: "nguoi_dung" },
      ],
      where,
      order: [["id", "DESC"]],
    });

    return NextResponse.json(danhGia);
  } catch (error) {
    console.error("Lỗi khi lấy danh giá:", error);
    return NextResponse.json({ error: "Không thể tải dữ liệu" }, { status: 500 });
  }
}
