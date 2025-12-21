// import { NextResponse, NextRequest } from "next/server";
// import { Op } from "sequelize";
// import { v2 as cloudinary } from "cloudinary";
// import {
//   SanPhamModel,
//   BienTheModel,
//   HinhModel,
// } from "@/lib/models";

// interface IBienTheInput {
//   id?: number;
//   ten: string;
//   trang_thai: string;
//   gia_them: number;
// }

// // ================= CLOUDINARY CONFIG =================
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Upload 1 file lên Cloudinary
// async function uploadCloud(file: File): Promise<string> {
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

//   const res = await cloudinary.uploader.upload(base64, {
//     folder: "san_pham",
//   });

//   return res.secure_url;
// }

// // =====================================================
// //                      GET
// // =====================================================
// export async function GET(
//   req: Request,
//   ctx: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await ctx.params;

//     const sp = await SanPhamModel.findOne({
//       where: { id: Number(id) },
//       include: [
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
//   } catch (err) {
//     return NextResponse.json(
//       { success: false, message: "Lỗi server" },
//       { status: 500 }
//     );
//   }
// }

// // =====================================================
// //                      PATCH
// // =====================================================
// export async function PATCH(
//   request: NextRequest,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await context.params;
//     const body = await request.json();

//     const het_mon_update =
//       body.het_mon === true
//         ? new Date()
//         : body.co_lai_mon === true
//         ? null
//         : undefined;

//     await SanPhamModel.update(
//       {
//         an_hien: body.an_hien,
//         het_mon: het_mon_update,
//       },
//       { where: { id } }
//     );

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.log("PATCH ERROR:", err);
//     return NextResponse.json({ success: false }, { status: 500 });
//   }
// }

// // =====================================================
// //                      PUT
// // =====================================================
// export async function PUT(
//   req: Request,
//   ctx: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await ctx.params;
//     const productId = Number(id);
//     const form = await req.formData();

//     // ---------------------------------------------------
//     // 1️⃣ HÌNH CHÍNH
//     // ---------------------------------------------------
//     let hinhChinh = form.get("hinh") as string | null;
//     const fileChinh = form.get("hinh_file");

//     if (fileChinh instanceof File && fileChinh.size > 0) {
//       hinhChinh = await uploadCloud(fileChinh);
//     }

//     // ---------------------------------------------------
//     // 2️⃣ CẬP NHẬT SẢN PHẨM
//     // ---------------------------------------------------
//     await SanPhamModel.update(
//       {
//         ten: form.get("ten"),
//         slug: form.get("slug"),
//         gia_goc: Number(form.get("gia_goc")),
//         mo_ta: form.get("mo_ta"),
//         phong_cach: form.get("phong_cach"),
//         tag: form.get("tag"),
//         id_danh_muc: Number(form.get("id_danh_muc")), // ✅ chỉ lưu ID
//         hinh: hinhChinh,
//       },
//       { where: { id: productId } }
//     );

//     // ---------------------------------------------------
//     // 3️⃣ HÌNH PHỤ
//     // ---------------------------------------------------
//     const oldImages = form.getAll("hinh_phu_old").map(String);
//     const newFiles = form
//       .getAll("hinh_phu_file")
//       .filter((v): v is File => v instanceof File && v.size > 0);

//     await HinhModel.destroy({ where: { id_san_pham: productId } });

//     let order = 1;

//     for (const url of oldImages) {
//       await HinhModel.create({
//         hinh: url,
//         thu_tu: order++,
//         id_san_pham: productId,
//       });
//     }

//     for (const file of newFiles) {
//       const url = await uploadCloud(file);
//       await HinhModel.create({
//         hinh: url,
//         thu_tu: order++,
//         id_san_pham: productId,
//       });
//     }

//     // ---------------------------------------------------
//     // 4️⃣ BIẾN THỂ
//     // ---------------------------------------------------
//     const raw = form.get("bien_the");
//     const bienTheList: IBienTheInput[] =
//       typeof raw === "string" ? JSON.parse(raw) : [];

//     const idsClient = bienTheList
//       .map((bt) => bt.id)
//       .filter((id): id is number => typeof id === "number");

//     await BienTheModel.destroy({
//       where: {
//         id_san_pham: productId,
//         id: { [Op.notIn]: idsClient.length ? idsClient : [0] },
//       },
//     });

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
//           ...bt,
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
//       { success: false, message: "Lỗi cập nhật" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse, NextRequest } from "next/server";
import { Op } from "sequelize";
import { v2 as cloudinary } from "cloudinary";
import {
  SanPhamModel,
  BienTheModel,
  HinhModel,
  DanhMucModel,
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
//                      GET (ADMIN)
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
        { model: HinhModel, as: "hinh_anh" },
        { model: BienTheModel, as: "bien_the" },
      ],
    });

    if (!sp) {
      return NextResponse.json(
        { success: false, message: "Không tồn tại" },
        { status: 404 }
      );
    }

    // ✅ LẤY ĐẦY ĐỦ DANH MỤC (14)
    const danhMuc = await DanhMucModel.findAll({
      order: [["thu_tu", "ASC"]],
    });

    return NextResponse.json({
      success: true,
      data: sp,
      danh_muc: danhMuc,
    });
  } catch (err) {
    console.error("GET ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const today = new Date().toISOString().split("T")[0];
    
    const sp = await SanPhamModel.findByPk(id);
    if (!sp) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );
    }

    // 👁️ Ẩn / hiện
    if (body.an_hien !== undefined) {
      await sp.update({ an_hien: body.an_hien ? 1 : 0 });
    }

    // 🚫 Hết món
    if (body.het_mon === true) {
      await sp.update({ het_mon: today });
    }

    // 🔄 Có lại món
    if (body.co_lai_mon === true) {
      await sp.update({ het_mon: null });
    }

    return NextResponse.json({
      success: true,
      message: "Cập nhật thành công",
      data: {
        id: sp.getDataValue("id"),
        ten: sp.getDataValue("ten"),
        an_hien: !!sp.getDataValue("an_hien"),
        het_mon: sp.getDataValue("het_mon"),
      },
    });
  } catch (err) {
    console.error("PATCH ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi cập nhật" },
      { status: 500 }
    );
  }
}


// =====================================================
//                      PUT (ADMIN UPDATE)
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
    // 2️⃣ LƯỢT XEM (ADMIN SỬA)
    // ---------------------------------------------------
    const luotXemRaw = form.get("luot_xem");
    const luot_xem =
      typeof luotXemRaw === "string" && !isNaN(Number(luotXemRaw))
        ? Number(luotXemRaw)
        : undefined;

// ---------------------------------------------------
// 3️⃣ HẾT MÓN (null | string)
// ---------------------------------------------------
const hetMonRaw = form.get("het_mon");

let het_mon: string | null | undefined = undefined;

if (typeof hetMonRaw === "string") {
  if (hetMonRaw === "true") {
    // admin tick "Hết món" → set hôm nay
    het_mon = new Date().toISOString().split("T")[0];
  } else if (hetMonRaw === "false" || hetMonRaw === "") {
    // có lại món
    het_mon = null;
  } else {
    // gửi thẳng ngày YYYY-MM-DD
    het_mon = hetMonRaw;
  }
}

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

        ...(het_mon !== undefined && { het_mon }),
        ...(luot_xem !== undefined && { luot_xem }),
      },
      { where: { id: productId } }
    );


    const oldImages = form.getAll("hinh_phu_old").map(String);
    const newFiles = form
      .getAll("hinh_phu_file")
      .filter((v): v is File => v instanceof File && v.size > 0);

    await HinhModel.destroy({ where: { id_san_pham: productId } });

    let order = 1;

    for (const url of oldImages) {
      await HinhModel.create({
        hinh: url,
        thu_tu: order++,
        id_san_pham: productId,
      });
    }

    for (const file of newFiles) {
      const url = await uploadCloud(file);
      await HinhModel.create({
        hinh: url,
        thu_tu: order++,
        id_san_pham: productId,
      });
    }

    const raw = form.get("bien_the");
    const bienTheList: IBienTheInput[] =
      typeof raw === "string" ? JSON.parse(raw) : [];

    const idsClient = bienTheList
      .map((bt) => bt.id)
      .filter((id): id is number => typeof id === "number");

    await BienTheModel.destroy({
      where: {
        id_san_pham: productId,
        id: { [Op.notIn]: idsClient.length ? idsClient : [0] },
      },
    });

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
          ...bt,
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
      { success: false, message: "Lỗi cập nhật" },
      { status: 500 }
    );
  
  }

}

