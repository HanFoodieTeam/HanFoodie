// import { NextResponse } from "next/server";
// import { DanhGiaModel, NguoiDungModel, BienTheModel } from "@/app/lib/models";
// import { Op } from "sequelize";

// // 🔹 Lấy danh sách đánh giá theo id_san_pham hoặc id_bien_the
// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const id_san_pham = searchParams.get("id_san_pham");
//   const id_bien_the = searchParams.get("id_bien_the");

//   try {
//     let where: any = {};
//     if (id_bien_the) where.id_bien_the = id_bien_the;
//     if (id_san_pham) {
//       where["$bien_the.san_pham.id$"] = id_san_pham;
//     }

//     const danhGia = await DanhGiaModel.findAll({
//       where,
//       include: [
//         {
//           model: NguoiDungModel,
//           as: "nguoi_dung",
//           attributes: ["id", "ho_ten", "tep_khach"],
//         },
//         {
//           model: BienTheModel,
//           as: "bien_the",
//           attributes: ["id", "ten", "id_san_pham"],
//         },
//       ],
//       order: [["id", "DESC"]],
//     });

//     return NextResponse.json({ success: true, data: danhGia });
//   } catch (err: any) {
//     return NextResponse.json({ success: false, message: err.message }, { status: 500 });
//   }
// }

// // 🔹 Thêm đánh giá mới
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { noi_dung, sao, id_nguoi_dung, id_bien_the } = body;

//     if (!id_nguoi_dung) {
//       return NextResponse.json(
//         { success: false, message: "Bạn cần đăng nhập để đánh giá." },
//         { status: 401 }
//       );
//     }

//     if (!sao || !noi_dung || !id_bien_the) {
//       return NextResponse.json(
//         { success: false, message: "Thiếu thông tin bắt buộc." },
//         { status: 400 }
//       );
//     }

//     const newDanhGia = await DanhGiaModel.create({
//       noi_dung,
//       sao,
//       id_nguoi_dung,
//       id_bien_the,
//       thoi_gian: new Date(),
//       an_hien: 1,
//     });

//     return NextResponse.json({ success: true, data: newDanhGia });
//   } catch (err: any) {
//     return NextResponse.json({ success: false, message: err.message }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { DanhGiaModel, NguoiDungModel, BienTheModel } from "@/app/lib/models";

// 🔹 Lấy danh sách đánh giá
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id_san_pham = searchParams.get("id_san_pham");

  try {
    const danhGia = await DanhGiaModel.findAll({
      include: [
        {
          model: NguoiDungModel,
          as: "nguoi_dung",
          attributes: ["id", "ho_ten", "tep_khach"],
        },
        {
          model: BienTheModel,
          as: "bien_the",
          where: id_san_pham ? { id_san_pham } : undefined,
          attributes: ["id", "ten", "id_san_pham"],
        },
      ],
      order: [["id", "DESC"]],
    });

    return NextResponse.json({ success: true, data: danhGia });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

// 🔹 Thêm đánh giá mới
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { noi_dung, sao, id_nguoi_dung, id_bien_the, id_san_pham } = body;

    if (!id_nguoi_dung) {
      return NextResponse.json(
        { success: false, message: "Bạn cần đăng nhập để đánh giá." },
        { status: 401 }
      );
    }

    if (!sao || !noi_dung) {
      return NextResponse.json(
        { success: false, message: "Thiếu thông tin bắt buộc." },
        { status: 400 }
      );
    }

    let bienTheId = id_bien_the;

    // ✅ Nếu chưa có biến thể, tạo mặc định
    if (!bienTheId && id_san_pham) {
      const bienThe = await BienTheModel.findOne({ where: { id_san_pham } });
      if (!bienThe) {
        const newBienThe = await BienTheModel.create({
          ten: "Mặc định",
          id_san_pham,
          trang_thai: 1,
        });
        bienTheId = newBienThe.id;
      } else {
        bienTheId = bienThe.id;
      }
    }

    const newDanhGia = await DanhGiaModel.create({
      noi_dung,
      sao,
      id_nguoi_dung,
      id_bien_the: bienTheId,
      thoi_gian: new Date(),
      an_hien: 1,
    });

    return NextResponse.json({ success: true, data: newDanhGia });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
