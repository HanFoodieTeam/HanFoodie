// // // // // import { NextResponse } from "next/server";
// // // // // import { DanhGiaModel, NguoiDungModel, BienTheModel } from "@/app/lib/models";
// // // // // import { Op } from "sequelize";

// // // // // // 🔹 Lấy danh sách đánh giá theo id_san_pham hoặc id_bien_the
// // // // // export async function GET(req: Request) {
// // // // //   const { searchParams } = new URL(req.url);
// // // // //   const id_san_pham = searchParams.get("id_san_pham");
// // // // //   const id_bien_the = searchParams.get("id_bien_the");

// // // // //   try {
// // // // //     let where: any = {};
// // // // //     if (id_bien_the) where.id_bien_the = id_bien_the;
// // // // //     if (id_san_pham) {
// // // // //       where["$bien_the.san_pham.id$"] = id_san_pham;
// // // // //     }

// // // // //     const danhGia = await DanhGiaModel.findAll({
// // // // //       where,
// // // // //       include: [
// // // // //         {
// // // // //           model: NguoiDungModel,
// // // // //           as: "nguoi_dung",
// // // // //           attributes: ["id", "ho_ten", "tep_khach"],
// // // // //         },
// // // // //         {
// // // // //           model: BienTheModel,
// // // // //           as: "bien_the",
// // // // //           attributes: ["id", "ten", "id_san_pham"],
// // // // //         },
// // // // //       ],
// // // // //       order: [["id", "DESC"]],
// // // // //     });

// // // // //     return NextResponse.json({ success: true, data: danhGia });
// // // // //   } catch (err: any) {
// // // // //     return NextResponse.json({ success: false, message: err.message }, { status: 500 });
// // // // //   }
// // // // // }

// // // // // // 🔹 Thêm đánh giá mới
// // // // // export async function POST(req: Request) {
// // // // //   try {
// // // // //     const body = await req.json();
// // // // //     const { noi_dung, sao, id_nguoi_dung, id_bien_the } = body;

// // // // //     if (!id_nguoi_dung) {
// // // // //       return NextResponse.json(
// // // // //         { success: false, message: "Bạn cần đăng nhập để đánh giá." },
// // // // //         { status: 401 }
// // // // //       );
// // // // //     }

// // // // //     if (!sao || !noi_dung || !id_bien_the) {
// // // // //       return NextResponse.json(
// // // // //         { success: false, message: "Thiếu thông tin bắt buộc." },
// // // // //         { status: 400 }
// // // // //       );
// // // // //     }

// // // // //     const newDanhGia = await DanhGiaModel.create({
// // // // //       noi_dung,
// // // // //       sao,
// // // // //       id_nguoi_dung,
// // // // //       id_bien_the,
// // // // //       thoi_gian: new Date(),
// // // // //       an_hien: 1,
// // // // //     });

// // // // //     return NextResponse.json({ success: true, data: newDanhGia });
// // // // //   } catch (err: any) {
// // // // //     return NextResponse.json({ success: false, message: err.message }, { status: 500 });
// // // // //   }
// // // // // }
// // // // import { NextResponse } from "next/server";
// // // // import { DanhGiaModel, NguoiDungModel, BienTheModel } from "@/app/lib/models";

// // // // // 🔹 Lấy danh sách đánh giá
// // // // export async function GET(req: Request) {
// // // //   const { searchParams } = new URL(req.url);
// // // //   const id_san_pham = searchParams.get("id_san_pham");

// // // //   try {
// // // //     const danhGia = await DanhGiaModel.findAll({
// // // //       include: [
// // // //         {
// // // //           model: NguoiDungModel,
// // // //           as: "nguoi_dung",
// // // //           attributes: ["id", "ho_ten", "tep_khach"],
// // // //         },
// // // //         {
// // // //           model: BienTheModel,
// // // //           as: "bien_the",
// // // //           where: id_san_pham ? { id_san_pham } : undefined,
// // // //           attributes: ["id", "ten", "id_san_pham"],
// // // //         },
// // // //       ],
// // // //       order: [["id", "DESC"]],
// // // //     });

// // // //     return NextResponse.json({ success: true, data: danhGia });
// // // //   } catch (err: any) {
// // // //     return NextResponse.json(
// // // //       { success: false, message: err.message },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }

// // // // // 🔹 Thêm đánh giá mới
// // // // export async function POST(req: Request) {
// // // //   try {
// // // //     const body = await req.json();
// // // //     const { noi_dung, sao, id_nguoi_dung, id_bien_the, id_san_pham } = body;

// // // //     if (!id_nguoi_dung) {
// // // //       return NextResponse.json(
// // // //         { success: false, message: "Bạn cần đăng nhập để đánh giá." },
// // // //         { status: 401 }
// // // //       );
// // // //     }

// // // //     if (!sao || !noi_dung) {
// // // //       return NextResponse.json(
// // // //         { success: false, message: "Thiếu thông tin bắt buộc." },
// // // //         { status: 400 }
// // // //       );
// // // //     }

// // // //     let bienTheId = id_bien_the;

// // // //     // ✅ Nếu chưa có biến thể, tạo mặc định
// // // //     if (!bienTheId && id_san_pham) {
// // // //       const bienThe = await BienTheModel.findOne({ where: { id_san_pham } });
// // // //       if (!bienThe) {
// // // //         const newBienThe = await BienTheModel.create({
// // // //           ten: "Mặc định",
// // // //           id_san_pham,
// // // //           trang_thai: 1,
// // // //         });
// // // //         bienTheId = newBienThe.id;
// // // //       } else {
// // // //         bienTheId = bienThe.id;
// // // //       }
// // // //     }

// // // //     const newDanhGia = await DanhGiaModel.create({
// // // //       noi_dung,
// // // //       sao,
// // // //       id_nguoi_dung,
// // // //       id_bien_the: bienTheId,
// // // //       thoi_gian: new Date(),
// // // //       an_hien: 1,
// // // //     });

// // // //     return NextResponse.json({ success: true, data: newDanhGia });
// // // //   } catch (err: any) {
// // // //     return NextResponse.json(
// // // //       { success: false, message: err.message },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // // // }
// // // import { NextResponse } from "next/server";
// // // import { DanhGiaModel, NguoiDungModel, BienTheModel } from "@/app/lib/models";
// // // import { IDanhGia } from "@/app/lib/cautrucdata";

// // // // Định nghĩa kiểu lỗi có message
// // // interface ErrorWithMessage {
// // //   message: string;
// // // }

// // // // Dữ liệu body gửi khi POST
// // // interface RequestBody {
// // //   noi_dung: string;
// // //   sao: number;
// // //   id_nguoi_dung: number;
// // //   id_bien_the?: number;
// // //   id_san_pham?: number;
// // // }

// // // //  Lấy danh sách đánh giá
// // // export async function GET(req: Request) {
// // //   const { searchParams } = new URL(req.url);
// // //   const id_san_phamParam = searchParams.get("id_san_pham");
// // //   const id_san_pham = id_san_phamParam ? Number(id_san_phamParam) : undefined;

// // //   try {
// // //     const danhGiaInstances = await DanhGiaModel.findAll({
// // //       include: [
// // //         {
// // //           model: NguoiDungModel,
// // //           as: "nguoi_dung",
// // //           attributes: ["id", "ho_ten", "tep_khach"],
// // //         },
// // //         {
// // //           model: BienTheModel,
// // //           as: "bien_the",
// // //           where: id_san_pham ? { id_san_pham } : undefined,
// // //           attributes: ["id", "ten", "id_san_pham"],
// // //         },
// // //       ],
// // //       order: [["id", "DESC"]],
// // //     });

// // //     // ✅ Chuyển Model → plain object (IDanhGia)
// // //     const danhGiaList: IDanhGia[] = danhGiaInstances.map((item) =>
// // //       item.toJSON() as IDanhGia
// // //     );

// // //     return NextResponse.json<{ success: boolean; data: IDanhGia[] }>({
// // //       success: true,
// // //       data: danhGiaList,
// // //     });
// // //   } catch (err: unknown) {
// // //     const error = err as ErrorWithMessage;
// // //     return NextResponse.json(
// // //       { success: false, message: error.message ?? "Lỗi không xác định" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // // 🔹 Thêm đánh giá mới

// // // export async function POST(req: Request) {
// // //   try {
// // //     const body: RequestBody = await req.json();
// // //     const { noi_dung, sao, id_nguoi_dung, id_bien_the, id_san_pham } = body;

// // //     if (!id_nguoi_dung) {
// // //       return NextResponse.json(
// // //         { success: false, message: "Bạn cần đăng nhập để đánh giá." },
// // //         { status: 401 }
// // //       );
// // //     }

// // //     if (!sao || !noi_dung) {
// // //       return NextResponse.json(
// // //         { success: false, message: "Thiếu thông tin bắt buộc." },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     let bienTheId: number | undefined = id_bien_the;

// // //     // ✅ Nếu chưa có biến thể, tạo mặc định
// // //     if (!bienTheId && id_san_pham) {
// // //       const bienThe = await BienTheModel.findOne({ where: { id_san_pham } });

// // //       if (!bienThe) {
// // //         const newBienThe = await BienTheModel.create({
// // //           ten: "Mặc định",
// // //           id_san_pham,
// // //           trang_thai: 1,
// // //         });
// // //         bienTheId = newBienThe.getDataValue("id");
// // //       } else {
// // //         bienTheId = bienThe.getDataValue("id");
// // //       }
// // //     }

// // //     // ✅ Tạo đánh giá mới
// // //     const newDanhGia = await DanhGiaModel.create({
// // //       noi_dung,
// // //       sao,
// // //       id_nguoi_dung,
// // //       id_bien_the: bienTheId!,
// // //       thoi_gian: new Date(),
// // //       an_hien: 1,
// // //     });

// // //     const danhGiaData = newDanhGia.toJSON() as IDanhGia;

// // //     return NextResponse.json<{ success: boolean; data: IDanhGia }>({
// // //       success: true,
// // //       data: danhGiaData,
// // //     });
// // //   } catch (err: unknown) {
// // //     const error = err as ErrorWithMessage;
// // //     return NextResponse.json(
// // //       { success: false, message: error.message ?? "Lỗi không xác định" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // // app/api/danh_gia/route.ts
// // import { NextResponse } from "next/server";
// // import type { IDanhGia } from "@/app/lib/cautrucdata";
// // import { DanhGiaModel, NguoiDungModel, BienTheModel } from "@/app/lib/models";
// // import { uploadNhieuHinh } from "@/app/lib/uploadnhieuHinh";

// // interface ErrorWithMessage {
// //   message: string;
// // }

// // export const runtime = "nodejs"; // cần nodejs để xử lý formData + cloudinary

// // // GET: lấy danh sách đánh giá (optionally filter theo id_san_pham)
// // export async function GET(req: Request) {
// //   try {
// //     const url = new URL(req.url);
// //     const idSanPhamParam = url.searchParams.get("id_san_pham");
// //     const id_san_pham = idSanPhamParam ? Number(idSanPhamParam) : undefined;

// //     const danhGiaInstances = await DanhGiaModel.findAll({
// //       include: [
// //         {
// //           model: NguoiDungModel,
// //           as: "nguoi_dung",
// //           attributes: ["id", "ho_ten", "tep_khach"],
// //         },
// //         {
// //           model: BienTheModel,
// //           as: "bien_the",
// //           where: id_san_pham ? { id_san_pham } : undefined,
// //           attributes: ["id", "ten", "id_san_pham"],
// //         },
// //       ],
// //       order: [["id", "DESC"]],
// //     });

// //     const danhGiaList = danhGiaInstances.map((item) => item.toJSON() as IDanhGia);

// //     return NextResponse.json({ success: true, data: danhGiaList });
// //   } catch (err: unknown) {
// //     const error = err as ErrorWithMessage;
// //     return NextResponse.json(
// //       { success: false, message: error?.message ?? "Lỗi không xác định" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // POST: tạo đánh giá mới + upload nhiều ảnh
// // export async function POST(req: Request) {
// //   try {
// //     const form = await req.formData();

// //     const noi_dung_raw = form.get("noi_dung");
// //     const sao_raw = form.get("sao");
// //     const id_nguoi_dung_raw = form.get("id_nguoi_dung");
// //     const id_bien_the_raw = form.get("id_bien_the");
// //     const id_san_pham_raw = form.get("id_san_pham");

// //     const noi_dung = typeof noi_dung_raw === "string" ? noi_dung_raw.trim() : "";
// //     const sao = sao_raw ? Number(sao_raw) : 0;
// //     const id_nguoi_dung = id_nguoi_dung_raw ? Number(id_nguoi_dung_raw) : 0;
// //     const id_bien_the = id_bien_the_raw ? Number(id_bien_the_raw) : undefined;
// //     const id_san_pham = id_san_pham_raw ? Number(id_san_pham_raw) : undefined;

// //     if (!id_nguoi_dung) {
// //       return NextResponse.json({ success: false, message: "Bạn cần đăng nhập để đánh giá." }, { status: 401 });
// //     }

// //     if (!noi_dung || !sao) {
// //       return NextResponse.json({ success: false, message: "Thiếu thông tin bắt buộc." }, { status: 400 });
// //     }

// //     // Lấy tất cả file input name="hinh"
// //     const files = form.getAll("hinh").filter((f): f is File => f instanceof File);

// //     // Upload nhiều hình (sử dụng uploadNhieuHinh)
// //     const uploadedUrls = files.length > 0 ? await uploadNhieuHinh(files) : [];

// //     // Nếu chưa có biến thể và có id_san_pham → tạo biến thể mặc định
// //     let bienTheId = id_bien_the;
// //     if (!bienTheId && id_san_pham) {
// //       const found = await BienTheModel.findOne({ where: { id_san_pham } });
// //       if (found) {
// //         bienTheId = found.getDataValue("id");
// //       } else {
// //         const created = await BienTheModel.create({
// //           ten: "Mặc định",
// //           id_san_pham,
// //           trang_thai: 1,
// //         });
// //         bienTheId = created.getDataValue("id");
// //       }
// //     }

// //     // Tạo đánh giá và lưu danh sách ảnh (JSON string) + trường hinh là ảnh đầu (nếu có)
// //     const newDanhGia = await DanhGiaModel.create({
// //       noi_dung,
// //       sao,
// //       id_nguoi_dung,
// //       id_bien_the: bienTheId ?? null,
// //       thoi_gian: new Date(),
// //       an_hien: 1,
// //       // trường `hinh` nếu model có; và `json_hinh` là mảng URL dưới dạng string
// //       hinh: uploadedUrls.length > 0 ? uploadedUrls[0] : null,
// //       json_hinh: uploadedUrls.length > 0 ? JSON.stringify(uploadedUrls) : null,
// //     });

// //     const result = newDanhGia.toJSON() as IDanhGia;

// //     return NextResponse.json({ success: true, data: result }, { status: 201 });
// //   } catch (err: unknown) {
// //     const error = err as ErrorWithMessage;
// //     console.error("POST /api/danh_gia error:", error?.message ?? err);
// //     return NextResponse.json(
// //       { success: false, message: error?.message ?? "Lỗi server" },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextResponse } from "next/server";
// import type { IDanhGia } from "@/app/lib/cautrucdata";
// import { DanhGiaModel, BienTheModel, NguoiDungModel } from "@/app/lib/models";
// import { uploadNhieuHinh } from "@/app/lib/uploadHinh";

// export const runtime = "nodejs";

// interface ErrorWithMessage {
//   message: string;
// }

// // LẤY DANH SÁCH ĐÁNH GIÁ
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

// // TẠO ĐÁNH GIÁ MỚI
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

//     // LẤY FILE
//     const files = form
//       .getAll("hinh")
//       .filter((item): item is File => item instanceof File);

//     // UPLOAD NHIỀU ẢNH
//     const uploadedUrls = await uploadNhieuHinh(files);

//     // XỬ LÝ BIẾN THỂ
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

//     // TẠO ĐÁNH GIÁ
//     const newDanhGia = await DanhGiaModel.create({
//       noi_dung,
//       sao,
//       id_nguoi_dung,
//       id_bien_the: bienTheId ?? null,
//       thoi_gian: new Date(),
//       an_hien: 1,
//       hinh: uploadedUrls[0] ?? null,
//       json_hinh: uploadedUrls.length ? JSON.stringify(uploadedUrls) : null,
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
import type { IDanhGia } from "@/app/lib/cautrucdata";
import { DanhGiaModel, BienTheModel, NguoiDungModel } from "@/app/lib/models";
import { uploadHinh } from "@/app/lib/uploadHinh"; // <-- dùng 1 hàm này

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

    // VALIDATION
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

    // ===========================
    // LẤY FILE — CHỈ 1 FILE
    // ===========================
    const hinhFile = form.get("hinh");
    let hinhUrl: string | null = null;

    if (hinhFile instanceof File && hinhFile.size > 0) {
      hinhUrl = await uploadHinh(hinhFile);
    }

    // ===========================
    // XỬ LÝ BIẾN THỂ
    // ===========================
    let bienTheId = id_bien_the;

    if (!bienTheId && id_san_pham) {
      const exist = await BienTheModel.findOne({ where: { id_san_pham } });

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

    // ===========================
    // TẠO ĐÁNH GIÁ MỚI
    // ===========================
    const newDanhGia = await DanhGiaModel.create({
      noi_dung,
      sao,
      id_nguoi_dung,
      id_bien_the: bienTheId ?? null,
      thoi_gian: new Date(),
      an_hien: 1,
      hinh: hinhUrl,   // <-- chỉ 1 hình
      json_hinh: null, // <-- không dùng nữa
    });

    return NextResponse.json(
      { success: true, data: newDanhGia.toJSON() as IDanhGia },
      { status: 201 }
    );
  } catch (err: unknown) {
    const error = err as ErrorWithMessage;
    console.error("Lỗi POST /api/danh_gia:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
