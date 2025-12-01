
// // // import { NextRequest, NextResponse } from "next/server";
// // // import {
// // //   SanPhamModel,
// // //   BienTheModel,
// // //   DanhGiaModel,
// // //   NguoiDungModel,
// // //   DanhMucModel,
// // //   DanhMucMonThemModel,
// // //   MonThemModel,
// // //   DanhMucLoaiTuyChonModel,
// // //   LoaiTuyChonModel,
// // //   TuyChonModel,
// // //   HinhModel, 
// // // } from "@/app/lib/models";

// // // export async function GET(
// // //   req: NextRequest,
// // //   context: { params: Promise<{ id: string }> }
// // // ) {
// // //   try {
// // //     const { id } = await context.params;
// // //     const productId = parseInt(id);

// // //     if (isNaN(productId)) {
// // //       return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
// // //     }

// // //     // 1️ Lấy sản phẩm + danh mục
// // //     const sanPham = await SanPhamModel.findByPk(productId, {
// // //       include: [
// // //         {
// // //           model: DanhMucModel,
// // //           as: "danh_muc",
// // //           attributes: ["id", "ten"],
// // //         },
// // //       ],
// // //     });

// // //     if (!sanPham) {
// // //       return NextResponse.json(
// // //         { error: "Không tìm thấy sản phẩm" },
// // //         { status: 404 }
// // //       );
// // //     }

// // //     const idDanhMuc = sanPham.getDataValue("id_danh_muc");
// // //     const hinhPhu = await HinhModel.findAll({
// // //       where: { id_san_pham: productId },
// // //       order: [["thu_tu", "ASC"]],
// // //       attributes: ["id", "hinh"],
// // //     });

// // //     // 2️ Lấy biến thể của sản phẩm
// // //     const bienThe = await BienTheModel.findAll({
// // //       where: { id_san_pham: productId },
// // //     });

// // //     // 3️ Lấy món thêm thông qua bảng phụ danh_muc_mon_them sắp xếp giá giảm dần
// // //   const danhMucMonThem = await DanhMucMonThemModel.findAll({
// // //   where: { id_danh_muc: idDanhMuc },
// // //   include: [
// // //     {
// // //       model: MonThemModel,
// // //       as: "mon_them",
// // //       attributes: ["id", "ten", "gia_them", "loai_mon", "trang_thai"],
// // //     },
// // //   ],
// // //   order: [[{ model: MonThemModel, as: "mon_them" }, "gia_them", "ASC"]],
// // // });


// // //     // Lọc ra danh sách món thêm thực tế
// // //     const monThem = danhMucMonThem
// // //       .map((item) => item.getDataValue("mon_them"))
// // //       .filter((mt) => mt !== null);

// // //     // 4️Lấy tùy chọn theo danh mục (qua bảng danh_muc_loai_tuy_chon)
// // //     const danhMucTuyChon = await DanhMucLoaiTuyChonModel.findAll({
// // //       where: { id_danh_muc: idDanhMuc },
// // //       include: [
// // //         {
// // //           model: LoaiTuyChonModel,
// // //           as: "loai_tuy_chon",
// // //           attributes: ["id", "ten"],
// // //           include: [
// // //             {
// // //               model: TuyChonModel,
// // //               as: "tuy_chon",
// // //               attributes: ["id", "ten", "an_hien"],
// // //             },
// // //           ],
// // //         },
// // //       ],
// // //     });

// // //     // 5️ Lấy danh sách đánh giá cho sản phẩm (qua biến thể)
// // //     const danhGia = await DanhGiaModel.findAll({
// // //       where: { an_hien: 1 },
// // //       include: [
// // //         {
// // //           model: NguoiDungModel,
// // //           as: "nguoi_dung",
// // //           attributes: ["id", "ho_ten", "email", "tep_khach"],
// // //         },
// // //         {
// // //           model: BienTheModel,
// // //           as: "bien_the",
// // //           attributes: ["id", "id_san_pham"],
// // //           where: { id_san_pham: productId },
// // //         },
// // //       ],
// // //       order: [["id", "DESC"]],
// // //     });

// // //     // 6️ Lấy sản phẩm liên quan cùng danh mục
// // //     const lienQuan = await SanPhamModel.findAll({
// // //       where: { id_danh_muc: idDanhMuc },
// // //       limit: 8,
// // //     });

// // //     // Trả kết quả đầy đủ
// // //     return NextResponse.json({
// // //       san_pham: sanPham,
// // //       bien_the: bienThe,
// // //       mon_them: monThem,
// // //       tuy_chon: danhMucTuyChon.map((t) => t.getDataValue("loai_tuy_chon")),
// // //       danh_gia: danhGia,
// // //       lien_quan: lienQuan,
// // //       hinh_phu: hinhPhu,
// // //     });
// // //   } catch (error) {
// // //     console.error("🔥 Lỗi API chi tiết sản phẩm:", error);
// // //     return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
// // //   }
// // //  }
// // // // import { NextRequest, NextResponse } from "next/server";
// // // // import {
// // // //   SanPhamModel,
// // // //   BienTheModel,
// // // //   DanhGiaModel,
// // // //   NguoiDungModel,
// // // //   DanhMucModel,
// // // //   DanhMucMonThemModel,
// // // //   MonThemModel,
// // // //   DanhMucLoaiTuyChonModel,
// // // //   LoaiTuyChonModel,
// // // //   TuyChonModel,
// // // //   HinhModel, // 🔥 THÊM MODEL HÌNH
// // // // } from "@/app/lib/models";

// // // // export async function GET(
// // // //   req: NextRequest,
// // // //   context: { params: Promise<{ id: string }> }
// // // // ) {
// // // //   try {
// // // //     const { id } = await context.params;
// // // //     const productId = parseInt(id);

// // // //     if (isNaN(productId)) {
// // // //       return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
// // // //     }

// // // //     // Lấy sản phẩm
// // // //     const sanPham = await SanPhamModel.findByPk(productId, {
// // // //       include: [{ model: DanhMucModel, as: "danh_muc", attributes: ["id", "ten"] }],
// // // //     });

// // // //     if (!sanPham) {
// // // //       return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
// // // //     }

// // // //     const idDanhMuc = sanPham.getDataValue("id_danh_muc");

// // // //     // 🔥 Lấy hình phụ
// // // //     const hinhPhu = await HinhModel.findAll({
// // // //       where: { id_san_pham: productId },
// // // //       order: [["thu_tu", "ASC"]],
// // // //       attributes: ["id", "hinh"],
// // // //     });

// // // //     // Lấy biến thể
// // // //     const bienThe = await BienTheModel.findAll({
// // // //       where: { id_san_pham: productId },
// // // //     });

// // // //     // Lấy đánh giá
// // // //     const danhGia = await DanhGiaModel.findAll({
// // // //       where: { an_hien: 1 },
// // // //       include: [
// // // //         { model: NguoiDungModel, as: "nguoi_dung", attributes: ["id", "ho_ten", "tep_khach"] },
// // // //         { model: BienTheModel, as: "bien_the", attributes: ["id", "id_san_pham"] },
// // // //       ],
// // // //       order: [["id", "DESC"]],
// // // //     });

// // // //     // Sản phẩm liên quan
// // // //     const lienQuan = await SanPhamModel.findAll({
// // // //       where: { id_danh_muc: idDanhMuc },
// // // //       limit: 8,
// // // //     });

// // // //     return NextResponse.json({
// // // //       san_pham: sanPham,
// // // //       hinh_phu: hinhPhu,
// // // //       bien_the: bienThe,
// // // //       danh_gia: danhGia,
// // // //       lien_quan: lienQuan,
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("🔥 API lỗi:", error);
// // // //     return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
// // // //   }
// // // // }
// // import { NextRequest, NextResponse } from "next/server";
// // import {
// //   SanPhamModel,
// //   BienTheModel,
// //   DanhGiaModel,
// //   NguoiDungModel,
// //   DanhMucModel,
// //   DanhMucMonThemModel,
// //   MonThemModel,
// //   DanhMucLoaiTuyChonModel,
// //   LoaiTuyChonModel,
// //   TuyChonModel,
// //   HinhModel,
// // } from "@/app/lib/models";

// // /* ───────────────────────────────
// // GET: Lấy chi tiết sản phẩm
// // ──────────────────────────────── */
// // export async function GET(
// //   req: NextRequest,
// //   context: { params: { id: string } }
// // ) {
// //   try {
// //     const { id } = context.params;
// //     const productId = parseInt(id);

// //     if (isNaN(productId)) {
// //       return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
// //     }

// //     const sanPham = await SanPhamModel.findByPk(productId, {
// //       include: [{ model: DanhMucModel, as: "danh_muc", attributes: ["id", "ten"] }],
// //     });

// //     if (!sanPham) {
// //       return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
// //     }

// //     const idDanhMuc = sanPham.getDataValue("id_danh_muc");

// //     const hinhPhu = await HinhModel.findAll({
// //       where: { id_san_pham: productId },
// //       order: [["thu_tu", "ASC"]],
// //       attributes: ["id", "hinh"],
// //     });

// //     const bienThe = await BienTheModel.findAll({ where: { id_san_pham: productId } });

// //     const danhMucMonThem = await DanhMucMonThemModel.findAll({
// //       where: { id_danh_muc: idDanhMuc },
// //       include: [{ model: MonThemModel, as: "mon_them", attributes: ["id", "ten", "gia_them", "loai_mon", "trang_thai"] }],
// //       order: [[{ model: MonThemModel, as: "mon_them" }, "gia_them", "ASC"]],
// //     });

// //     const monThem = danhMucMonThem
// //       .map((item) => item.getDataValue("mon_them"))
// //       .filter((mt) => mt !== null);

// //     const danhMucTuyChon = await DanhMucLoaiTuyChonModel.findAll({
// //       where: { id_danh_muc: idDanhMuc },
// //       include: [{
// //         model: LoaiTuyChonModel,
// //         as: "loai_tuy_chon",
// //         attributes: ["id", "ten"],
// //         include: [{ model: TuyChonModel, as: "tuy_chon", attributes: ["id", "ten", "an_hien"] }],
// //       }],
// //     });

// //     const danhGia = await DanhGiaModel.findAll({
// //       where: { an_hien: 1 },
// //       include: [
// //         { model: NguoiDungModel, as: "nguoi_dung", attributes: ["id", "ho_ten", "email", "tep_khach"] },
// //         { model: BienTheModel, as: "bien_the", attributes: ["id", "id_san_pham"], where: { id_san_pham: productId } },
// //       ],
// //       order: [["id", "DESC"]],
// //     });

// //     const lienQuan = await SanPhamModel.findAll({
// //       where: { id_danh_muc: idDanhMuc },
// //       limit: 8,
// //     });

// //     return NextResponse.json({
// //       san_pham: sanPham,
// //       bien_the: bienThe,
// //       mon_them: monThem,
// //       tuy_chon: danhMucTuyChon.map((t) => t.getDataValue("loai_tuy_chon")),
// //       danh_gia: danhGia,
// //       lien_quan: lienQuan,
// //       hinh_phu: hinhPhu,
// //     });
// //   } catch (error) {
// //     console.error("🔥 Lỗi GET API chi tiết sản phẩm:", error);
// //     return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
// //   }
// // }

// // /* ───────────────────────────────
// // PUT: Tăng lượt xem sản phẩm
// // ──────────────────────────────── */
// // export async function PUT(
// //   req: NextRequest,
// //   context: { params: { id: string } }
// // ) {
// //   try {
// //     const { id } = context.params;
// //     const productId = parseInt(id);

// //     if (isNaN(productId)) {
// //       return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
// //     }

// //     const sanPham = await SanPhamModel.findByPk(productId);
// //     if (!sanPham) {
// //       return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
// //     }

// //     // Tăng lượt xem
// //     sanPham.luot_xem = (sanPham.luot_xem || 0) + 1;
// //     await sanPham.save();

// //     return NextResponse.json({ luot_xem: sanPham.luot_xem });
// //   } catch (error) {
// //     console.error("🔥 Lỗi PUT API tăng lượt xem:", error);
// //     return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
// //   }
// // }
// import { NextRequest, NextResponse } from "next/server";
// import {
//   SanPhamModel,
//   BienTheModel,
//   DanhGiaModel,
//   NguoiDungModel,
//   DanhMucModel,
//   DanhMucMonThemModel,
//   MonThemModel,
//   DanhMucLoaiTuyChonModel,
//   LoaiTuyChonModel,
//   TuyChonModel,
//   HinhModel,
// } from "@/app/lib/models";
// import { ISanPham } from "@/app/lib/cautrucdata";

// /* ───────────────────────────────
// GET: Lấy chi tiết sản phẩm
// ──────────────────────────────── */
// export async function GET(
//   req: NextRequest,
//   context: { params: { id: string } }
// ) {
//   try {
//     const { id } = context.params;
//     const productId = parseInt(id);

//     if (isNaN(productId)) {
//       return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
//     }

//     const sanPham = await SanPhamModel.findByPk(productId, {
//       include: [{ model: DanhMucModel, as: "danh_muc", attributes: ["id", "ten"] }],
//     });

//     if (!sanPham) {
//       return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
//     }

//     const idDanhMuc = sanPham.getDataValue("id_danh_muc");

//     const hinhPhu = await HinhModel.findAll({
//       where: { id_san_pham: productId },
//       order: [["thu_tu", "ASC"]],
//       attributes: ["id", "hinh"],
//     });

//     const bienThe = await BienTheModel.findAll({ where: { id_san_pham: productId } });

//     const danhMucMonThem = await DanhMucMonThemModel.findAll({
//       where: { id_danh_muc: idDanhMuc },
//       include: [
//         {
//           model: MonThemModel,
//           as: "mon_them",
//           attributes: ["id", "ten", "gia_them", "loai_mon", "trang_thai"],
//         },
//       ],
//       order: [[{ model: MonThemModel, as: "mon_them" }, "gia_them", "ASC"]],
//     });

//     const monThem = danhMucMonThem
//       .map((item) => item.getDataValue("mon_them"))
//       .filter((mt) => mt !== null);

//     const danhMucTuyChon = await DanhMucLoaiTuyChonModel.findAll({
//       where: { id_danh_muc: idDanhMuc },
//       include: [
//         {
//           model: LoaiTuyChonModel,
//           as: "loai_tuy_chon",
//           attributes: ["id", "ten"],
//           include: [{ model: TuyChonModel, as: "tuy_chon", attributes: ["id", "ten", "an_hien"] }],
//         },
//       ],
//     });

//     const danhGia = await DanhGiaModel.findAll({
//       where: { an_hien: 1 },
//       include: [
//         { model: NguoiDungModel, as: "nguoi_dung", attributes: ["id", "ho_ten", "email", "tep_khach"] },
//         { model: BienTheModel, as: "bien_the", attributes: ["id", "id_san_pham"], where: { id_san_pham: productId } },
//       ],
//       order: [["id", "DESC"]],
//     });

//     const lienQuan = await SanPhamModel.findAll({
//       where: { id_danh_muc: idDanhMuc },
//       limit: 8,
//     });

//     return NextResponse.json({
//       san_pham: sanPham,
//       bien_the: bienThe,
//       mon_them: monThem,
//       tuy_chon: danhMucTuyChon.map((t) => t.getDataValue("loai_tuy_chon")),
//       danh_gia: danhGia,
//       lien_quan: lienQuan,
//       hinh_phu: hinhPhu,
//     });
//   } catch (error) {
//     console.error("🔥 Lỗi GET API chi tiết sản phẩm:", error);
//     return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
//   }
// }

// /* ───────────────────────────────
// PUT: Tăng lượt xem sản phẩm
// ──────────────────────────────── */
// export async function PUT(
//   req: NextRequest,
//   context: { params: { id: string } }
// ) {
//   try {
//     const { id } = context.params;
//     const productId = parseInt(id);

//     if (isNaN(productId)) {
//       return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
//     }

//     const sanPham = await SanPhamModel.findByPk(productId);
//     if (!sanPham) {
//       return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
//     }

//     // Ép kiểu để TypeScript nhận có trường luot_xem
//     const sp = sanPham as unknown as ISanPham & { update: Function };

//     // Tăng lượt xem
//     const luot_xem_moi = (sp.luot_xem || 0) + 1;

//     // Lưu vào database
//     await sanPham.update({ luot_xem: luot_xem_moi });

//     return NextResponse.json({ luot_xem: luot_xem_moi });
//   } catch (error) {
//     console.error("🔥 Lỗi PUT API tăng lượt xem:", error);
//     return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import {
  SanPhamModel,
  BienTheModel,
  DanhGiaModel,
  NguoiDungModel,
  DanhMucModel,
  DanhMucMonThemModel,
  MonThemModel,
  DanhMucLoaiTuyChonModel,
  LoaiTuyChonModel,
  TuyChonModel,
  HinhModel,
} from "@/app/lib/models";
import { ISanPham } from "@/app/lib/cautrucdata";

/* ───────────────────────────────
GET: Lấy chi tiết sản phẩm
──────────────────────────────── */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const sanPham = await SanPhamModel.findByPk(productId, {
      include: [{ model: DanhMucModel, as: "danh_muc", attributes: ["id", "ten"] }],
    });

    if (!sanPham) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    const idDanhMuc = sanPham.getDataValue("id_danh_muc");

    const hinhPhu = await HinhModel.findAll({
      where: { id_san_pham: productId },
      order: [["thu_tu", "ASC"]],
      attributes: ["id", "hinh"],
    });

    const bienThe = await BienTheModel.findAll({
      where: { id_san_pham: productId },
    });

    const danhMucMonThem = await DanhMucMonThemModel.findAll({
      where: { id_danh_muc: idDanhMuc },
      include: [
        {
          model: MonThemModel,
          as: "mon_them",
          attributes: ["id", "ten", "gia_them", "loai_mon", "trang_thai"],
        },
      ],
      order: [[{ model: MonThemModel, as: "mon_them" }, "gia_them", "ASC"]],
    });

    const monThem = danhMucMonThem
      .map((item) => item.getDataValue("mon_them"))
      .filter((x) => x !== null);

    const danhMucTuyChon = await DanhMucLoaiTuyChonModel.findAll({
      where: { id_danh_muc: idDanhMuc },
      include: [
        {
          model: LoaiTuyChonModel,
          as: "loai_tuy_chon",
          attributes: ["id", "ten"],
          include: [
            {
              model: TuyChonModel,
              as: "tuy_chon",
              attributes: ["id", "ten", "an_hien"],
            },
          ],
        },
      ],
    });

    const danhGia = await DanhGiaModel.findAll({
      where: { an_hien: 1 },
      include: [
        {
          model: NguoiDungModel,
          as: "nguoi_dung",
          attributes: ["id", "ho_ten", "email", "tep_khach"],
        },
        {
          model: BienTheModel,
          as: "bien_the",
          attributes: ["id", "id_san_pham"],
          where: { id_san_pham: productId },
        },
      ],
      order: [["id", "DESC"]],
    });

    const lienQuan = await SanPhamModel.findAll({
      where: { id_danh_muc: idDanhMuc },
      limit: 8,
    });

    return NextResponse.json({
      san_pham: sanPham,
      bien_the: bienThe,
      mon_them: monThem,
      tuy_chon: danhMucTuyChon.map((item) =>
        item.getDataValue("loai_tuy_chon")
      ),
      danh_gia: danhGia,
      lien_quan: lienQuan,
      hinh_phu: hinhPhu,
    });
  } catch (error) {
    console.error("🔥 Lỗi GET API chi tiết sản phẩm:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

/* ───────────────────────────────
PUT: Tăng lượt xem sản phẩm
──────────────────────────────── */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const sanPham = await SanPhamModel.findByPk(productId);
    if (!sanPham) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    const sp = sanPham as unknown as ISanPham & { update: (x: unknown) => unknown };

    const luot_xem_moi = (sp.luot_xem || 0) + 1;

    await sanPham.update({ luot_xem: luot_xem_moi });

    return NextResponse.json({ luot_xem: luot_xem_moi });
  } catch (error) {
    console.error("🔥 Lỗi PUT API tăng lượt xem:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
