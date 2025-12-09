
// // import { NextResponse } from "next/server";
// // import { v2 as cloudinary } from "cloudinary";
// // import {
// //   SanPhamModel,
// //   DanhMucModel,
// //   HinhModel,
// // } from "@/app/lib/models";

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });
// // export async function GET() {
// //   try {
// //     const list = await SanPhamModel.findAll({
// //       include: [
// //         { model: DanhMucModel, as: "danh_muc" },
// //         { model: HinhModel, as: "hinh_anh" },
// //       ],
// //       order: [["id", "DESC"]],
// //     });

// //     return NextResponse.json({
// //       success: true,
// //       data: list,
// //     });
// //   } catch (error) {
// //     console.error("❌ GET lỗi:", error);
// //     return NextResponse.json(
// //       { success: false, message: "Lỗi server" },
// //       { status: 500 }
// //     );
// //   }
// // }




// // export async function POST(req: Request) {
// //   console.log("Cloudinary config:", {
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// //   try {
// //     const form = await req.formData();

// //     // Lấy file từ form
// //     const file = form.get("hinh") as File | null;
// //     if (!file) {
// //       return NextResponse.json(
// //         { success: false, message: "Bạn chưa chọn hình chính" },
// //         { status: 410 }
// //       );
// //     }

// //     // 🔹 Convert File -> Base64
// //     const buffer = Buffer.from(await file.arrayBuffer());
// //     const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

// //     // 🔹 Upload thẳng lên Cloudinary
// //     const uploadResult = await cloudinary.uploader.upload(base64, {
// //       folder: "san_pham",
// //     });

// //     const hinhUrl = uploadResult.secure_url;

// //     // 🔹 Lấy các trường khác
// //     const bienTheRaw = form.get("bien_the")?.toString() || "[]";
// //     const bienThe = JSON.parse(bienTheRaw);

// //     const sanPham = await SanPhamModel.create({
// //       ten: form.get("ten")?.toString() || "",
// //       slug: form.get("slug")?.toString() || "",
// //       gia_goc: Number(form.get("gia_goc") || 0),
// //       mo_ta: form.get("mo_ta")?.toString() || "",
// //       an_hien: form.get("an_hien") === "true",
// //       tag: form.get("tag")?.toString() || "",
// //       phong_cach: form.get("phong_cach")?.toString() || "",
// //       trang_thai: form.get("trang_thai")?.toString() || "",
// //       id_danh_muc: Number(form.get("id_danh_muc") || 0),
// //       hinh: hinhUrl, 
// //       luot_xem: 0,
// //     });

// //     return NextResponse.json({ success: true, data: sanPham, bien_the: bienThe });
// //   } catch (err) {
// //     console.error("POST lỗi:", err);
// //     return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
// //   }
// // // }
// // import { NextResponse } from "next/server";
// // import { v2 as cloudinary } from "cloudinary";
// // import { SanPhamModel, DanhMucModel, HinhModel } from "@/app/lib/models";

// // // ✅ CONFIG CLOUDINARY CHUẨN NEXT 15 (KHÔNG dotenv)
// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // // =======================================
// // // ✅ GET — Lấy danh sách sản phẩm
// // // =======================================
// // export async function GET() {
// //   try {
// //     const list = await SanPhamModel.findAll({
// //       include: [
// //         { model: DanhMucModel, as: "danh_muc" },
// //         { model: HinhModel, as: "hinh_anh" },
// //       ],
// //       order: [["id", "DESC"]],
// //     });

// //     return NextResponse.json({
// //       success: true,
// //       data: list,
// //     });
// //   } catch (error: unknown) {
// //     console.error("❌ GET lỗi:", error);

// //     return NextResponse.json(
// //       { success: false, message: "Lỗi server" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // =======================================
// // // ✅ POST — Thêm sản phẩm (KHÔNG any)
// // // =======================================
// // export async function POST(req: Request) {
// //   try {
// //     console.log("Cloudinary config:", {
// //       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //       api_key: process.env.CLOUDINARY_API_KEY ? "✅ OK" : "❌ MISSING",
// //     });

// //     const form = await req.formData();

// //     // =============================
// //     // ✅ 1. ẢNH CHÍNH
// //     // =============================
// //     const fileRaw = form.get("hinh");

// //     if (!(fileRaw instanceof File)) {
// //       return NextResponse.json(
// //         { success: false, message: "Bạn chưa chọn hình chính" },
// //         { status: 400 }
// //       );
// //     }

// //     const buffer = Buffer.from(await fileRaw.arrayBuffer());
// //     const base64 = `data:${fileRaw.type};base64,${buffer.toString("base64")}`;

// //     const uploadResult = await cloudinary.uploader.upload(base64, {
// //       folder: "san_pham",
// //     });

// //     const hinhChinhUrl = uploadResult.secure_url;

// //     // =============================
// //     // ✅ 2. BIẾN THỂ (KHÔNG any)
// //     // =============================
// //     const bienTheRaw = form.get("bien_the");
// //     let bienThe: Array<{
// //       ten: string;
// //       gia_them?: number | null;
// //       trang_thai: number;
// //     }> = [];

// //     if (typeof bienTheRaw === "string") {
// //       bienThe = JSON.parse(bienTheRaw);
// //     }

// //     // =============================
// //     // ✅ 3. TẠO SẢN PHẨM
// //     // =============================
// //     const sanPham = await SanPhamModel.create({
// //       ten: form.get("ten")?.toString() || "",
// //       slug: form.get("slug")?.toString() || "",
// //       gia_goc: Number(form.get("gia_goc") || 0),
// //       mo_ta: form.get("mo_ta")?.toString() || "",
// //       an_hien: form.get("an_hien") === "true",
// //       tag: form.get("tag")?.toString() || "",
// //       phong_cach: form.get("phong_cach")?.toString() || "",
// //       trang_thai: form.get("trang_thai")?.toString() || "",
// //       id_danh_muc: Number(form.get("id_danh_muc") || 0),
// //       hinh: hinhChinhUrl,
// //       luot_xem: 0,
// //     });

// //     // =============================
// //     // ✅ 4. ẢNH PHỤ (NHIỀU ẢNH)
// //     // =============================
// //     const hinhPhuList = form.getAll("hinh_phu");

// // const sanPhamId = sanPham.getDataValue("id") as number;

// // for (let i = 0; i < hinhPhuList.length; i++) {
// //   const file = hinhPhuList[i];

// //   if (file instanceof File && file.size > 0) {
// //     const buffer = Buffer.from(await file.arrayBuffer());
// //     const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

// //     const upload = await cloudinary.uploader.upload(base64, {
// //       folder: "san_pham",
// //     });

// //     await HinhModel.create({
// //       hinh: upload.secure_url,
// //       thu_tu: i + 1,
// //       id_san_pham: sanPhamId,
// //     });
// //   }
// // }

// //     // =============================
// //     // ✅ 5. TRẢ KẾT QUẢ
// //     // =============================
// //     return NextResponse.json({
// //       success: true,
// //       data: sanPham,
// //       bien_the: bienThe,
// //     });
// //   } catch (err: unknown) {
// //     console.error("POST lỗi:", err);

// //     if (err instanceof Error) {
// //       return NextResponse.json(
// //         { success: false, message: err.message },
// //         { status: 500 }
// //       );
// //     }

// //     return NextResponse.json(
// //       { success: false, message: "Lỗi server" },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";
// import {
//   SanPhamModel,
//   DanhMucModel,
//   HinhModel,
//   BienTheModel,
// } from "@/app/lib/models";

// // ================================
// // CONFIG CLOUDINARY
// // ================================
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ================================
// // GET — Lấy danh sách sản phẩm
// // ================================
// export async function GET() {
//   try {
//     const list = await SanPhamModel.findAll({
//       include: [
//         { model: DanhMucModel, as: "danh_muc" },
//         { model: HinhModel, as: "hinh_anh" },
//         { model: BienTheModel, as: "bien_the" },
//       ],
//       order: [["id", "DESC"]],
//     });

//     return NextResponse.json({
//       success: true,
//       data: list,
//     });
//   } catch (error) {
//     console.error("❌ GET lỗi:", error);
//     return NextResponse.json(
//       { success: false, message: "Lỗi server" },
//       { status: 500 }
//     );
//   }
// }

// // ================================
// // POST — Thêm sản phẩm
// // ================================
// export async function POST(req: Request) {
//   try {
//     const form = await req.formData();

//     const fileRaw = form.get("hinh");

//     if (!(fileRaw instanceof File)) {
//       return NextResponse.json(
//         { success: false, message: "Bạn chưa chọn hình chính" },
//         { status: 400 }
//       );
//     }

//     const buffer = Buffer.from(await fileRaw.arrayBuffer());
//     const base64 = `data:${fileRaw.type};base64,${buffer.toString("base64")}`;

//     const uploadResult = await cloudinary.uploader.upload(base64, {
//       folder: "san_pham",
//     });

//     const hinhChinhUrl = uploadResult.secure_url;

//     const bienTheRaw = form.get("bien_the");

//     let bienThe: Array<{
//       ten: string;
//       gia_them?: number | null;
//       trang_thai: number;
//     }> = [];

//     if (typeof bienTheRaw === "string") {
//       bienThe = JSON.parse(bienTheRaw);
//     }

//     const sanPham = await SanPhamModel.create({
//       ten: form.get("ten")?.toString() || "",
//       slug: form.get("slug")?.toString() || "",
//       gia_goc: Number(form.get("gia_goc") || 0),
//       mo_ta: form.get("mo_ta")?.toString() || "",
//       an_hien: form.get("an_hien") === "true",
//       tag: form.get("tag")?.toString() || "",
//       phong_cach: form.get("phong_cach")?.toString() || "",
//       trang_thai: form.get("trang_thai")?.toString() || "",
//       id_danh_muc: Number(form.get("id_danh_muc") || 0),
//       hinh: hinhChinhUrl,
//       luot_xem: 0,
//     });

//     const sanPhamId = sanPham.getDataValue("id") as number;


//     if (bienThe.length > 0) {
//       for (const bt of bienThe) {
//         await BienTheModel.create({
//           ten: bt.ten,
//           gia_them: bt.gia_them || 0,
//           trang_thai: bt.trang_thai,
//           id_san_pham: sanPhamId,
//         });
//       }
//     }

//     const hinhPhuList = form.getAll("hinh_phu");

//     for (let i = 0; i < hinhPhuList.length; i++) {
//       const file = hinhPhuList[i];

//       if (file instanceof File && file.size > 0) {
//         const buffer = Buffer.from(await file.arrayBuffer());
//         const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

//         const upload = await cloudinary.uploader.upload(base64, {
//           folder: "san_pham",
//         });

//         await HinhModel.create({
//           hinh: upload.secure_url,
//           thu_tu: i + 1,
//           id_san_pham: sanPhamId,
//         });
//       }
//     }

//     // ----------------------------
//     // 6. RESPONSE
//     // ----------------------------
//     return NextResponse.json({
//       success: true,
//       message: "Thêm sản phẩm thành công",
//       data: sanPham,
//     });
//   } catch (err) {
//     console.error("❌ POST lỗi:", err);

//     if (err instanceof Error) {
//       return NextResponse.json(
//         { success: false, message: err.message },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(
//       { success: false, message: "Lỗi server" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import {
  SanPhamModel,
  DanhMucModel,
  HinhModel,
  BienTheModel,
} from "@/app/lib/models";
import { ISanPham } from "@/app/lib/cautrucdata";

// ================================
// CONFIG CLOUDINARY
// ================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ================================
// GET — Lấy danh sách sản phẩm
// ================================
export async function GET() {
  try {
    const list = await SanPhamModel.findAll({
      include: [
        { model: DanhMucModel, as: "danh_muc" },
        { model: HinhModel, as: "hinh_anh" },
        { model: BienTheModel, as: "bien_the" },
      ],
      order: [["id", "DESC"]],
    });

    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}

// ================================
// POST — Thêm sản phẩm
// ================================
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // ================= HÌNH CHÍNH =================
    const fileRaw = form.get("hinh");
    if (!(fileRaw instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Bạn chưa chọn hình chính" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await fileRaw.arrayBuffer());
    const base64 = `data:${fileRaw.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "san_pham",
    });

    const hinhChinhUrl = uploadResult.secure_url;

    // ================= BIẾN THỂ (KHÔNG ANY) =================
    interface BienTheInput {
      ten: string;
      gia_them: number;
      trang_thai: number;
    }

    let bienTheList: BienTheInput[] = [];
    const bienTheRaw = form.get("bien_the");

    if (typeof bienTheRaw === "string") {
      const parsed: BienTheInput[] = JSON.parse(bienTheRaw);

      bienTheList = parsed.map((bt) => ({
        ten: bt.ten,
        gia_them: Number(bt.gia_them ?? 0),
        trang_thai: Number(bt.trang_thai),
      }));
    }

    // ================= TẠO SẢN PHẨM =================
    const sanPham = await SanPhamModel.create({
      ten: form.get("ten")?.toString() ?? "",
      slug: form.get("slug")?.toString() ?? "",
      gia_goc: Number(form.get("gia_goc") ?? 0),
      mo_ta: form.get("mo_ta")?.toString() ?? "",
      an_hien: form.get("an_hien") === "true",
      tag: form.get("tag")?.toString() ?? "",
      phong_cach: form.get("phong_cach")?.toString() ?? "",
      trang_thai: form.get("trang_thai")?.toString() ?? "active",
      id_danh_muc: Number(form.get("id_danh_muc") ?? 0),
      hinh: hinhChinhUrl,
      luot_xem: 0,
    });

    const sanPhamId = sanPham.getDataValue("id");

    // ================= SAVE BIẾN THỂ =================
    for (const bt of bienTheList) {
      await BienTheModel.create({
        ten: bt.ten,
        gia_them: bt.gia_them,
        trang_thai: bt.trang_thai,
        id_san_pham: sanPhamId,
      });
    }

    // ================= HÌNH PHỤ =================
    const hinhPhu = form.getAll("hinh_phu");

    for (let i = 0; i < hinhPhu.length; i++) {
      const file = hinhPhu[i];
      if (file instanceof File) {
        const buff = Buffer.from(await file.arrayBuffer());
        const base64 = `data:${file.type};base64,${buff.toString("base64")}`;

        const upload = await cloudinary.uploader.upload(base64, {
          folder: "san_pham",
        });

        await HinhModel.create({
          hinh: upload.secure_url,
          thu_tu: i + 1,
          id_san_pham: sanPhamId,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thêm sản phẩm thành công",
      data: sanPham,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Lỗi server",
      },
      { status: 500 }
    );
  }
}
