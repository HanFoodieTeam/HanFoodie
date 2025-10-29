// import { NextResponse } from "next/server";
// import {
//   SanPhamModel,
//   BienTheModel,
//   DanhGiaModel,
//   NguoiDungModel,
//   DanhMucModel,
// } from "@/app/lib/models";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const id = Number(params.id);
//   if (isNaN(id)) {
//     return NextResponse.json({ error: "ID sản phẩm không hợp lệ" }, { status: 400 });
//   }

//   try {
//     // 1️⃣ Lấy thông tin sản phẩm
//     const san_pham = await SanPhamModel.findByPk(id);
//     if (!san_pham) {
//       return NextResponse.json({ error: "Sản phẩm không tồn tại" }, { status: 404 });
//     }

//     // 2️⃣ Lấy các biến thể của sản phẩm
//     const bien_thes = await BienTheModel.findAll({
//       where: { id_san_pham: id },
//       order: [["id", "ASC"]],
//     });

//     // 3️⃣ Lấy các đánh giá (qua biến thể)
//     const danh_gias = await DanhGiaModel.findAll({
//       where: { an_hien: 1 },
//       include: [
//         {
//           model: NguoiDungModel,
//           as: "nguoi_dung",
//           attributes: ["ho_ten"],
//         },
//         {
//           model: BienTheModel,
//           as: "bien_the",
//           where: { id_san_pham: id },
//           attributes: [],
//         },
//       ],
//       order: [["id", "DESC"]],
//     });

//     // 4️⃣ Lấy sản phẩm liên quan (cùng danh mục, trừ chính nó)
//     const id_danh_muc = (san_pham as any).id_danh_muc;
//     const lien_quan = await SanPhamModel.findAll({
//       where: {
//         id_danh_muc,
//         id: { ["$ne$" as any]: id },
//       },
//       limit: 8,
//       order: [["id", "DESC"]],
//     });

//     // 5️⃣ Gộp dữ liệu trả về
//     const response = {
//       san_pham,
//       bien_thes,
//       danh_gias,
//       lien_quan,
//     };

//     return NextResponse.json(response);
//   } catch (error: any) {
//     console.error("Lỗi API chi tiết:", error);
//     return NextResponse.json(
//       { error: "Lỗi khi lấy dữ liệu sản phẩm", details: error.message },
//       { status: 500 }
//     );
// //   }
// import { NextRequest, NextResponse } from "next/server";
// import {
//   SanPhamModel,
//   BienTheModel,
//   DanhGiaModel,
//   NguoiDungModel,
// } from "@/app/lib/models";

// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const id = parseInt(params.id);
//     if (isNaN(id)) {
//       return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
//     }

//     // --- Lấy thông tin sản phẩm chính ---
//     const sanPham = await SanPhamModel.findByPk(id);
//     if (!sanPham) {
//       return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
//     }

//     // --- Biến thể sản phẩm ---
//     const bienThes = await BienTheModel.findAll({
//       where: { id_san_pham: id },
//     });

//     // --- Đánh giá chỉ của sản phẩm này ---
//     const danhGias = await DanhGiaModel.findAll({
//       where: { an_hien: 1 },
//       include: [
//         {
//           model: NguoiDungModel,
//           as: "nguoi_dung",
//           attributes: ["id", "ho_ten", "email", "tep_khach"],
//         },
//         {
//           model: BienTheModel,
//           as: "bien_the",
//           where: { id_san_pham: id }, // ✅ chỉ lấy đánh giá của sản phẩm này
//           attributes: [],
//         },
//       ],
//     });

//     // --- Sản phẩm liên quan cùng danh mục ---
//     const lienQuan = await SanPhamModel.findAll({
//       where: {
//         id_danh_muc: sanPham.getDataValue("id_danh_muc"),
//       },
//       limit: 8,
//     });

//     return NextResponse.json({
//       san_pham: sanPham,
//       bien_thes: bienThes,
//       danh_gias: danhGias,
//       lien_quan: lienQuan,
//     });
//   } catch (error) {
//     console.error("Lỗi API chi tiết sản phẩm:", error);
//     return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
//   }
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
} from "@/app/lib/models";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const productId = parseInt(id);

    if (isNaN(productId)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    // 1️⃣ Lấy sản phẩm + danh mục
    const sanPham = await SanPhamModel.findByPk(productId, {
      include: [
        {
          model: DanhMucModel,
          as: "danh_muc",
          attributes: ["id", "ten"],
        },
      ],
    });

    if (!sanPham) {
      return NextResponse.json(
        { error: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    const idDanhMuc = sanPham.getDataValue("id_danh_muc");

    // 2️⃣ Lấy biến thể của sản phẩm
    const bienThes = await BienTheModel.findAll({
      where: { id_san_pham: productId },
    });

    // 3️⃣ Lấy món thêm thông qua bảng phụ danh_muc_mon_them
    const danhMucMonThem = await DanhMucMonThemModel.findAll({
      where: { id_danh_muc: idDanhMuc },
      include: [
        {
          model: MonThemModel,
          as: "mon_them",
          attributes: ["id", "ten", "gia_them", "loai_mon", "trang_thai"],
        },
      ],
    });

    // Lọc ra danh sách món thêm thực tế
    const monThem = danhMucMonThem
      .map((item) => item.getDataValue("mon_them"))
      .filter((mt) => mt !== null);

    // 4️⃣ Lấy tùy chọn theo danh mục (qua bảng danh_muc_loai_tuy_chon)
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

    // 5️⃣ Lấy danh sách đánh giá cho sản phẩm (qua biến thể)
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

    // 6️⃣ Lấy sản phẩm liên quan cùng danh mục
    const lienQuan = await SanPhamModel.findAll({
      where: { id_danh_muc: idDanhMuc },
      limit: 8,
    });

    // ✅ 7️⃣ Trả kết quả đầy đủ
    return NextResponse.json({
      san_pham: sanPham,
      bien_thes: bienThes,
      mon_them: monThem,
      tuy_chon: danhMucTuyChon.map((t) => t.getDataValue("loai_tuy_chon")),
      danh_gia: danhGia,
      lien_quan: lienQuan,
    });
  } catch (error) {
    console.error("🔥 Lỗi API chi tiết sản phẩm:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
