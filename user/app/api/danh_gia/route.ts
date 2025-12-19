// import { NextResponse } from "next/server";
// import type { IDanhGia } from "@/lib/cautrucdata";
// import { DanhGiaModel, BienTheModel, NguoiDungModel } from "@/lib/models";
// import { uploadHinh } from "@/lib/uploadHinh"; // <-- dùng 1 hàm này

// export const runtime = "nodejs";

// interface ErrorWithMessage {
//   message: string;
// }

// // =====================
// // GET DANH SÁCH ĐÁNH GIÁ
// // =====================
// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const idSanPham = url.searchParams.get("id_san_pham");
//     const id_san_pham = idSanPham ? Number(idSanPham) : undefined;

//     const danhGiaInstances = await DanhGiaModel.findAll({
//       include: [
//         {
//           model: NguoiDungModel,
//           as: "nguoi_dung",
//           attributes: ["id", "ho_ten", "tep_khach"],
//         },
//         {
//           model: BienTheModel,
//           as: "bien_the",
//           where: id_san_pham ? { id_san_pham } : undefined,
//           attributes: ["id", "ten", "id_san_pham"],
//         },
//       ],
//       order: [["id", "DESC"]],
//     });

//     const danhGiaList = danhGiaInstances.map(
//       (item) => item.toJSON() as IDanhGia
//     );

//     return NextResponse.json({ success: true, data: danhGiaList });
//   } catch (err: unknown) {
//     const error = err as ErrorWithMessage;
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

// // =====================
// // POST TẠO ĐÁNH GIÁ
// // =====================
// export async function POST(req: Request) {
//   try {
//     const form = await req.formData();

//     const noi_dung = (form.get("noi_dung") as string | null)?.trim() ?? "";
//     const sao = Number(form.get("sao") ?? 0);
//     const id_nguoi_dung = Number(form.get("id_nguoi_dung") ?? 0);

//     const id_bien_the = form.get("id_bien_the")
//       ? Number(form.get("id_bien_the"))
//       : undefined;

//     const id_san_pham = form.get("id_san_pham")
//       ? Number(form.get("id_san_pham"))
//       : undefined;

//     // VALIDATION
//     if (!id_nguoi_dung)
//       return NextResponse.json(
//         { success: false, message: "Bạn cần đăng nhập để đánh giá." },
//         { status: 401 }
//       );

//     if (!noi_dung || !sao)
//       return NextResponse.json(
//         { success: false, message: "Thiếu nội dung hoặc số sao." },
//         { status: 400 }
//       );

//     // ===========================
//     // LẤY FILE — CHỈ 1 FILE
//     // ===========================
//     const hinhFile = form.get("hinh");
//     let hinhUrl: string | null = null;

//     if (hinhFile instanceof File && hinhFile.size > 0) {
//       hinhUrl = await uploadHinh(hinhFile);
//     }

//     // ===========================
//     // XỬ LÝ BIẾN THỂ
//     // ===========================
//     let bienTheId = id_bien_the;

//     if (!bienTheId && id_san_pham) {
//       const exist = await BienTheModel.findOne({ where: { id_san_pham } });

//       if (exist) {
//         bienTheId = Number(exist.getDataValue("id"));
//       } else {
//         const created = await BienTheModel.create({
//           ten: "Mặc định",
//           id_san_pham,
//           trang_thai: 1,
//         });
//         bienTheId = Number(created.getDataValue("id"));
//       }
//     }

//     // ===========================
//     // TẠO ĐÁNH GIÁ MỚI
//     // ===========================
//     const newDanhGia = await DanhGiaModel.create({
//       noi_dung,
//       sao,
//       id_nguoi_dung,
//       id_bien_the: bienTheId ?? null,
//       thoi_gian: new Date(),
//       an_hien: 1,
//       hinh: hinhUrl,   // <-- chỉ 1 hình
//       json_hinh: null, // <-- không dùng nữa
//     });

//     return NextResponse.json(
//       { success: true, data: newDanhGia.toJSON() as IDanhGia },
//       { status: 201 }
//     );
//   } catch (err: unknown) {
//     const error = err as ErrorWithMessage;
//     console.error("Lỗi POST /api/danh_gia:", error.message);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import type { IDanhGia } from "@/lib/cautrucdata";
import { DanhGiaModel, BienTheModel, NguoiDungModel } from "@/lib/models";
import { uploadHinh } from "@/lib/uploadHinh"; // <-- dùng 1 hàm này

export const runtime = "nodejs";

interface ErrorWithMessage {
  message: string;
}

// =====================
// GET DANH SÁCH ĐÁNH GIÁ
// =====================
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const idSanPham = url.searchParams.get("id_san_pham");
    const id_san_pham = idSanPham ? Number(idSanPham) : undefined;

    const danhGiaInstances = await DanhGiaModel.findAll({
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

    const danhGiaList = danhGiaInstances.map(
      (item) => item.toJSON() as IDanhGia
    );

    return NextResponse.json({ success: true, data: danhGiaList });
  } catch (err: unknown) {
    const error = err as ErrorWithMessage;
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
// =====================
// POST TẠO ĐÁNH GIÁ
// =====================
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const noi_dung = (form.get("noi_dung") as string | null)?.trim() ?? "";
    const sao = Number(form.get("sao") ?? 0);
    const id_nguoi_dung = Number(form.get("id_nguoi_dung") ?? 0);

    const id_bien_the = form.get("id_bien_the")
      ? Number(form.get("id_bien_the"))
      : undefined;

    const id_san_pham = form.get("id_san_pham")
      ? Number(form.get("id_san_pham"))
      : undefined;

    // =====================
    // VALIDATION
    // =====================
    if (!id_nguoi_dung)
      return NextResponse.json(
        { success: false, message: "Bạn cần đăng nhập để đánh giá." },
        { status: 401 }
      );

    if (!noi_dung || !sao)
      return NextResponse.json(
        { success: false, message: "Thiếu nội dung hoặc số sao." },
        { status: 400 }
      );

    // =====================
    // XỬ LÝ BIẾN THỂ
    // =====================
    let bienTheId = id_bien_the;

    if (!bienTheId && id_san_pham) {
      const exist = await BienTheModel.findOne({
        where: { id_san_pham },
      });

      if (exist) {
        bienTheId = Number(exist.getDataValue("id"));
      } else {
        const created = await BienTheModel.create({
          ten: "Mặc định",
          id_san_pham,
          trang_thai: 1,
        });
        bienTheId = Number(created.getDataValue("id"));
      }
    }

    // =====================
    // CHECK ĐÃ ĐÁNH GIÁ CHƯA
    // =====================
    const daDanhGia = await DanhGiaModel.findOne({
      where: {
        id_nguoi_dung,
        id_bien_the: bienTheId ?? null,
      },
    });

    if (daDanhGia) {
      return NextResponse.json(
        { success: false, message: "Sản phẩm này đã được đánh giá." },
        { status: 400 }
      );
    }

    // =====================
    // UPLOAD HÌNH (1 FILE)
    // =====================
    const hinhFile = form.get("hinh");
    let hinhUrl: string | null = null;

    if (hinhFile instanceof File && hinhFile.size > 0) {
      hinhUrl = await uploadHinh(hinhFile);
    }

    // =====================
    // TẠO ĐÁNH GIÁ
    // =====================
    const newDanhGia = await DanhGiaModel.create({
      noi_dung,
      sao,
      id_nguoi_dung,
      id_bien_the: bienTheId ?? null,
      thoi_gian: new Date(),
      an_hien: 1,
      hinh: hinhUrl,
      json_hinh: null,
    });

    return NextResponse.json(
      { success: true, data: newDanhGia.toJSON() as IDanhGia },
      { status: 201 }
    );
      } catch (err: unknown) {
        console.error("Lỗi POST /api/danh_gia:", err);

        const message =
          err instanceof Error ? err.message : "Lỗi server không xác định";

        return NextResponse.json(
          { success: false, message },
          { status: 500 }
        );
      }

}
