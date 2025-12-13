// // import { NextResponse } from "next/server";
// // import { v2 as cloudinary } from "cloudinary";

// // import {
// //   SanPhamModel,
// //   DanhMucModel,
// //   BienTheModel,
// //   HinhModel,
// // } from "@/app/lib/models";

// // // ======================================
// // // 🔧 CLOUDINARY CONFIG
// // // ======================================
// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // // ======================================
// // // 📤 Hàm upload cloudinary
// // // ======================================
// // async function uploadCloud(file: File): Promise<string> {
// //   const buffer = Buffer.from(await file.arrayBuffer());
// //   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

// //   const res = await cloudinary.uploader.upload(base64, {
// //     folder: "san_pham",
// //   });

// //   return res.secure_url;
// // }

// // // ======================================
// // // 📌 GET — Lấy chi tiết sản phẩm
// // // ======================================
// // export async function GET(
// //   req: Request,
// //   ctx: { params: Promise<{ id: string }> }
// // ) {
// //   try {
// //     const { id } = await ctx.params;
// //     const productId = Number(id);

// //     const sp = await SanPhamModel.findOne({
// //       where: { id: productId },
// //       include: [
// //         { model: DanhMucModel, as: "danh_muc" },
// //         { model: HinhModel, as: "hinh_anh" },
// //         { model: BienTheModel, as: "bien_the" },
// //       ],
// //     });

// //     if (!sp) {
// //       return NextResponse.json(
// //         { success: false, message: "Sản phẩm không tồn tại" },
// //         { status: 404 }
// //       );
// //     }

// //     return NextResponse.json({ success: true, data: sp });
// //   } catch (error) {
// //     console.error("GET ERROR:", error);
// //     return NextResponse.json(
// //       { success: false, message: "Lỗi server" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // ======================================
// // // ✏️ PUT — Cập nhật sản phẩm
// // // ======================================
// // export async function PUT(
// //   req: Request,
// //   ctx: { params: Promise<{ id: string }> }
// // ) {
// //   try {
// //     const { id } = await ctx.params;
// //     const productId = Number(id);

// //     const form = await req.formData();

// //     // ============================
// //     // 1️⃣ Hình chính
// //     // ============================
// //     let hinhChinh: string | null = form.get("hinh") as string | null;
// //     const fileChinh = form.get("hinh_file");

// //     if (fileChinh instanceof File && fileChinh.size > 0) {
// //       hinhChinh = await uploadCloud(fileChinh);
// //     }

// //     // ============================
// //     // 2️⃣ Update bảng sản phẩm
// //     // ============================
// //     await SanPhamModel.update(
// //       {
// //         ten: form.get("ten") as string,
// //         slug: form.get("slug") as string,
// //         gia_goc: Number(form.get("gia_goc")),
// //         mo_ta: form.get("mo_ta") as string,
// //         phong_cach: form.get("phong_cach") as string,
// //         tag: form.get("tag") as string,
// //         id_danh_muc: Number(form.get("id_danh_muc")),
// //         hinh: hinhChinh,
// //       },
// //       { where: { id: productId } }
// //     );

// //     // ============================
// //     // 3️⃣ Hình phụ (nếu có file mới)
// //     // ============================
// //     const rawList = form.getAll("hinh_phu");
// //     const newImages = rawList.filter(
// //       (item): item is File => item instanceof File && item.size > 0
// //     );

// //     if (newImages.length > 0) {
// //       await HinhModel.destroy({ where: { id_san_pham: productId } });

// //       for (let i = 0; i < newImages.length; i++) {
// //         const url = await uploadCloud(newImages[i]);

// //         await HinhModel.create({
// //           hinh: url,
// //           thu_tu: i + 1,
// //           id_san_pham: productId,
// //         });
// //       }
// //     }

// //     // ============================
// //     // 4️⃣ Biến thể — update + thêm mới
// //     // ============================
// //     const raw = form.get("bien_the");

// //     type BienTheItem = {
// //       id: number | null;
// //       ten: string;
// //       trang_thai: number;
// //       gia_them: number | null;
// //     };

// //     const bienTheList: BienTheItem[] =
// //       typeof raw === "string" ? JSON.parse(raw) : [];

// //     for (const bt of bienTheList) {
// //       if (bt.id) {
// //         await BienTheModel.update(
// //           {
// //             ten: bt.ten,
// //             trang_thai: bt.trang_thai,
// //             gia_them: bt.gia_them,
// //           },
// //           { where: { id: bt.id } }
// //         );
// //       } else {
// //         await BienTheModel.create({
// //           ten: bt.ten,
// //           trang_thai: bt.trang_thai,
// //           gia_them: bt.gia_them,
// //           id_san_pham: productId,
// //         });
// //       }
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       message: "Cập nhật sản phẩm thành công",
// //     });
// //   } catch (error) {
// //     console.error("PUT ERROR:", error);
// //     return NextResponse.json(
// //       {
// //         success: false,
// //         message: error instanceof Error ? error.message : "Lỗi cập nhật",
// //       },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// import {
//   SanPhamModel,
//   DanhMucModel,
//   BienTheModel,
//   HinhModel,
// } from "@/app/lib/models";

// // ========================
// // Cloudinary Config
// // ========================
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ========================
// // Upload Cloudinary
// // ========================
// async function uploadCloud(file: File): Promise<string> {
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

//   const res = await cloudinary.uploader.upload(base64, {
//     folder: "san_pham",
//   });

//   return res.secure_url;
// }

// // ========================
// // Kiểu dữ liệu biến thể
// // ========================
// interface IClientBienThe {
//   id: number | null;
//   ten: string;
//   trang_thai: number;
//   gia_them: number;
// }

// // ========================
// // GET
// // ========================
// export async function GET(
//   req: Request,
//   ctx: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await ctx.params;

//     const sp = await SanPhamModel.findOne({
//       where: { id: Number(id) },
//       include: [
//         { model: DanhMucModel, as: "danh_muc" },
//         { model: HinhModel, as: "hinh_anh" },
//         { model: BienTheModel, as: "bien_the" },
//       ],
//     });

//     if (!sp) {
//       return NextResponse.json(
//         { success: false, message: "Không tồn tại" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: sp });
//   } catch {
//     return NextResponse.json(
//       { success: false, message: "Lỗi server" },
//       { status: 500 }
//     );
//   }
// }

// // ========================
// // PUT
// // ========================
// export async function PUT(
//   req: Request,
//   ctx: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await ctx.params;
//     const productId = Number(id);

//     const form = await req.formData();

//     // ------------------------------
//     // 1️⃣ HÌNH CHÍNH
//     // ------------------------------
//     let hinhChinh: string | null = (form.get("hinh") as string) ?? null;
//     const fileChinh = form.get("hinh_file");

//     if (fileChinh instanceof File && fileChinh.size > 0) {
//       hinhChinh = await uploadCloud(fileChinh);
//     }

//     // ------------------------------
//     // 2️⃣ UPDATE SẢN PHẨM
//     // ------------------------------
//     await SanPhamModel.update(
//       {
//         ten: (form.get("ten") as string) ?? "",
//         slug: (form.get("slug") as string) ?? "",
//         gia_goc: Number(form.get("gia_goc")),
//         mo_ta: (form.get("mo_ta") as string) ?? "",
//         phong_cach: (form.get("phong_cach") as string) ?? "",
//         tag: (form.get("tag") as string) ?? "",
//         id_danh_muc: Number(form.get("id_danh_muc")),
//         hinh: hinhChinh,
//       },
//       { where: { id: productId } }
//     );

//     // ------------------------------
//     // 3️⃣ HÌNH PHỤ
//     // ------------------------------
//     const oldImages = form.getAll("hinh_phu_old") as string[];

//     const newImageFiles = form
//       .getAll("hinh_phu_file")
//       .filter(
//         (item): item is File => item instanceof File && item.size > 0
//       );

//     // Xóa hình phụ cũ
//     await HinhModel.destroy({ where: { id_san_pham: productId } });

//     let order = 1;

//     // Giữ hình cũ
//     for (const url of oldImages) {
//       await HinhModel.create({
//         hinh: url,
//         thu_tu: order++,
//         id_san_pham: productId,
//       });
//     }

//     // Upload hình mới
//     for (const file of newImageFiles) {
//       const url = await uploadCloud(file);

//       await HinhModel.create({
//         hinh: url,
//         thu_tu: order++,
//         id_san_pham: productId,
//       });
//     }

//     // ------------------------------
//     // 4️⃣ BIẾN THỂ
//     // ------------------------------
//     const rawBienThe = form.get("bien_the");
//     const bienTheList: IClientBienThe[] =
//       typeof rawBienThe === "string" ? JSON.parse(rawBienThe) : [];

//     // ID biến thể từ client gửi lên
//     const clientIDs = bienTheList
//       .map((bt) => bt.id)
//       .filter((id): id is number => typeof id === "number");

//     // XÓA biến thể không còn trong danh sách
//     await BienTheModel.destroy({
//       where: {
//         id_san_pham: productId,
//         id: {
//           notIn: clientIDs.length ? clientIDs : [0],
//         },
//       },
//     });

//     // UPDATE / CREATE
//     for (const bt of bienTheList) {
//       if (bt.id) {
//         await BienTheModel.update(
//           {
//             ten: bt.ten,
//             trang_thai: bt.trang_thai,
//             gia_them: bt.gia_them,
//           },
//           { where: { id: bt.id } }
//         );
//       } else {
//         await BienTheModel.create({
//           ten: bt.ten,
//           trang_thai: bt.trang_thai,
//           gia_them: bt.gia_them,
//           id_san_pham: productId,
//         });
//       }
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Cập nhật thành công",
//     });
//   } catch (err) {
//     console.error("PUT ERROR:", err);
//     return NextResponse.json(
//       {
//         success: false,
//         message:
//           err instanceof Error ? err.message : "Lỗi cập nhật",
//       },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { Op } from "sequelize";
import { v2 as cloudinary } from "cloudinary";
import {
  SanPhamModel,
  DanhMucModel,
  BienTheModel,
  HinhModel,
} from "@/lib/models";
interface IBienTheInput {
  id?: number;
  ten: string;
  trang_thai: string;
  gia_them: number;
}


// ================= CLOUDINARY CONFIG =================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload 1 file lên Cloudinary
async function uploadCloud(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const res = await cloudinary.uploader.upload(base64, {
    folder: "san_pham",
  });

  return res.secure_url;
}

// =====================================================
//                      GET
// =====================================================
export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;

    const sp = await SanPhamModel.findOne({
      where: { id: Number(id) },
      include: [
        { model: DanhMucModel, as: "danh_muc" },
        { model: HinhModel, as: "hinh_anh" },
        { model: BienTheModel, as: "bien_the" },
      ],
    });

    if (!sp)
      return NextResponse.json(
        { success: false, message: "Không tồn tại" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, data: sp });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}

// =====================================================
//                      PUT
// =====================================================
export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const productId = Number(id);

    const form = await req.formData();

    // ---------------------------------------------------
    // 1️⃣ HÌNH CHÍNH
    // ---------------------------------------------------
    let hinhChinh = form.get("hinh") as string | null;
    const fileChinh = form.get("hinh_file");

    if (fileChinh instanceof File && fileChinh.size > 0) {
      hinhChinh = await uploadCloud(fileChinh);
    }

    // ---------------------------------------------------
    // 2️⃣ CẬP NHẬT SẢN PHẨM
    // ---------------------------------------------------
    await SanPhamModel.update(
      {
        ten: form.get("ten"),
        slug: form.get("slug"),
        gia_goc: Number(form.get("gia_goc")),
        mo_ta: form.get("mo_ta"),
        phong_cach: form.get("phong_cach"),
        tag: form.get("tag"),
        id_danh_muc: Number(form.get("id_danh_muc")),
        hinh: hinhChinh,
      },
      { where: { id: productId } }
    );

    // ---------------------------------------------------
    // 3️⃣ HÌNH PHỤ
    // ---------------------------------------------------

    // giữ lại hình cũ
    const oldImages = form.getAll("hinh_phu_old").map(v => String(v));

    // file hình mới
    const newFiles = form
      .getAll("hinh_phu_file")
      .filter((v): v is File => v instanceof File && v.size > 0);

    // Xóa toàn bộ hình phụ cũ
    await HinhModel.destroy({ where: { id_san_pham: productId } });

    let order = 1;

    // ghi lại hình cũ
    for (const url of oldImages) {
      await HinhModel.create({
        hinh: url,
        thu_tu: order++,
        id_san_pham: productId,
      });
    }

    // upload hình mới
    for (const file of newFiles) {
      const url = await uploadCloud(file);
      await HinhModel.create({
        hinh: url,
        thu_tu: order++,
        id_san_pham: productId,
      });
    }

    // ---------------------------------------------------
    // 4️⃣ BIẾN THỂ
    // ---------------------------------------------------
    const raw = form.get("bien_the");

    let bienTheList: IBienTheInput[] = [];

    if (typeof raw === "string") {
      bienTheList = JSON.parse(raw) as IBienTheInput[];
    }

    const idsClient = bienTheList
      .map(bt => bt.id)
      .filter((id): id is number => typeof id === "number");

    // XÓA biến thể bị xóa ở UI
    await BienTheModel.destroy({
  where: {
    id_san_pham: productId,
    id: {
      [Op.notIn]: idsClient.length ? idsClient : [0],
    },
  },
});

    // Cập nhật / Thêm mới
    for (const bt of bienTheList) {
      if (bt.id) {
        await BienTheModel.update(
          {
            ten: bt.ten,
            trang_thai: bt.trang_thai,
            gia_them: bt.gia_them,
          },
          { where: { id: bt.id } }
        );
      } else {
        await BienTheModel.create({
          ten: bt.ten,
          trang_thai: bt.trang_thai,
          gia_them: bt.gia_them,
          id_san_pham: productId,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Cập nhật thành công",
    });
  } catch (err) {
    console.error("PUT ERROR:", err);
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Lỗi cập nhật",
      },
      { status: 500 }
    );
  }
}
