// import { NextResponse } from "next/server";
// import {
//   SanPhamModel,
//   BienTheModel,
//   DanhMucLoaiTuyChonModel,
//   LoaiTuyChonModel,
//   TuyChonModel,
//   DanhMucMonThemModel,
//   MonThemModel,
// } from "@/lib/models";

// interface Params {
//   params: { id: string };
// }

// export async function GET(req: Request, { params }: Params) {
//   try {
//     const idSanPham = Number(params.id);
//     if (!idSanPham) {
//       return NextResponse.json({ message: "ID sản phẩm không hợp lệ" }, { status: 400 });
//     }

//     const sanPham = await SanPhamModel.findByPk(idSanPham);
//     if (!sanPham) {
//       return NextResponse.json({ message: "Không tìm thấy sản phẩm" }, { status: 404 });
//     }

//     const idDanhMuc = sanPham.getDataValue("id_danh_muc") as number;

//     const bienThe = await BienTheModel.findAll({
//       where: { id_san_pham: idSanPham, trang_thai: 1 },
//     });

//     const loaiTuyChonMap = await DanhMucLoaiTuyChonModel.findAll({
//       where: { id_danh_muc: idDanhMuc },
//       include: [
//         {
//           model: LoaiTuyChonModel,
//           as: "loai_tuy_chon",
//           where: { an_hien: 1 },
//           include: [
//             {
//               model: TuyChonModel,
//               as: "tuy_chon",
//               where: { an_hien: 1 },
//             },
//           ],
//         },
//       ],
//     });

//     const tuyChon = loaiTuyChonMap.map(
//       (item) => item.toJSON().loai_tuy_chon
//     );

//     const monThemMap = await DanhMucMonThemModel.findAll({
//       where: { id_danh_muc: idDanhMuc },
//       include: [
//         {
//           model: MonThemModel,
//           as: "mon_them",
//           where: { trang_thai: 1 },
//         },
//       ],
//     });

//     const monThem = monThemMap.map(
//       (item) => item.toJSON().mon_them
//     );

//     return NextResponse.json({
//       san_pham: sanPham,
//       bien_the: bienThe,
//       tuy_chon: tuyChon,
//       mon_them: monThem,
//     });
//   } catch (e) {
//     return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import { Op } from "sequelize";
import {
  SanPhamModel,
  BienTheModel,
  DanhMucLoaiTuyChonModel,
  LoaiTuyChonModel,
  TuyChonModel,
  DanhMucMonThemModel,
  MonThemModel,
} from "@/lib/models";



export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idSanPham = Number(id);

    if (!idSanPham) {
      return NextResponse.json(
        { message: "ID sản phẩm không hợp lệ" },
        { status: 400 }
      );
    }

    const sanPham = await SanPhamModel.findByPk(idSanPham);
    if (!sanPham) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    const idDanhMuc = sanPham.getDataValue("id_danh_muc") as number;

    /* ================= BIẾN THỂ ================= */
    const bienThe = await BienTheModel.findAll({
      where: {
        id_san_pham: idSanPham,
        [Op.or]: [{ trang_thai: 1 }, { trang_thai: true }],
        het_mon: { [Op.is]: null },
      },
    });

    /* ================= TUỲ CHỌN ================= */
    const loaiTuyChonMap = await DanhMucLoaiTuyChonModel.findAll({
      where: { id_danh_muc: idDanhMuc },
      include: [
        {
          model: LoaiTuyChonModel,
          as: "loai_tuy_chon",
          where: {
            [Op.or]: [{ an_hien: 1 }, { an_hien: true }],
          },
          include: [
            {
              model: TuyChonModel,
              as: "tuy_chon",
              where: {
                [Op.or]: [{ an_hien: 1 }, { an_hien: true }],
              },
            },
          ],
        },
      ],
    });

    const tuyChon = loaiTuyChonMap
      .map((item) => item.toJSON().loai_tuy_chon)
      .filter(Boolean);

    /* ================= MÓN THÊM ================= */
    const monThemMap = await DanhMucMonThemModel.findAll({
      where: { id_danh_muc: idDanhMuc },
      include: [
        {
          model: MonThemModel,
          as: "mon_them",
          where: {
            [Op.or]: [{ trang_thai: 1 }, { trang_thai: true }],
            het_mon: { [Op.is]: null },
          },
        },
      ],
    });

    const monThem = monThemMap
      .map((item) => item.toJSON().mon_them)
      .filter(Boolean);

    return NextResponse.json({
      san_pham: sanPham,
      bien_the: bienThe,
      tuy_chon: tuyChon,
      mon_them: monThem,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Lỗi server" },
      { status: 500 }
    );
  }
}
