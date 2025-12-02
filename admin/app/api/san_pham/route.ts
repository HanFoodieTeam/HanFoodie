// // // import { NextResponse } from "next/server";
// // // import {
// // //   SanPhamModel,
// // //   DanhMucModel,
// // //   BienTheModel,
// // //   HinhModel,
// // // } from "@/app/lib/models";

// // // // 🔄 Convert file → Base64
// // // async function fileToBase64(file: File): Promise<string> {
// // //   const buffer = Buffer.from(await file.arrayBuffer());
// // //   return `data:${file.type};base64,${buffer.toString("base64")}`;
// // // }

// // // export async function GET() {
// // //   try {
// // //     const sanPham = await SanPhamModel.findAll({
// // //       include: [
// // //         {
// // //           model: DanhMucModel,
// // //           as: "danh_muc",
// // //           attributes: ["id", "ten"],
// // //         },
// // //         {
// // //           model: HinhModel,
// // //           as: "hinh_anh",
// // //           attributes: ["id", "hinh", "thu_tu"],
// // //         },
// // //         {
// // //           model: BienTheModel,
// // //           as: "bien_the",
// // //         },
// // //       ],
// // //       order: [["id", "DESC"]],
// // //     });

// // //     return NextResponse.json({ success: true, data: sanPham });
// // //   } catch (error) {
// // //     console.error("❌ Lỗi GET sản phẩm:", error);
// // //     return NextResponse.json(
// // //       { success: false, message: "Không lấy được danh sách sản phẩm" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // // export async function POST(req: Request) {
// // //   try {
// // //     const form = await req.formData();

// // //     const ten = form.get("ten") as string;
// // //     const slug = form.get("slug") as string;
// // //     const mo_ta = form.get("mo_ta") as string;
// // //     const gia_goc = Number(form.get("gia_goc"));
// // //     const id_danh_muc = Number(form.get("id_danh_muc"));
// // //     const an_hien = form.get("an_hien") === "true";
// // //     const tag = (form.get("tag") as string) || "";
// // //     const phong_cach = (form.get("phong_cach") as string) || "";

// // //     if (!ten || !gia_goc) {
// // //       return NextResponse.json(
// // //         { success: false, message: "Tên và giá gốc là bắt buộc" },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     const dm = await DanhMucModel.findByPk(id_danh_muc);
// // //     if (!dm) {
// // //       return NextResponse.json(
// // //         { success: false, message: "Danh mục không tồn tại" },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     // ➕ Tạo sản phẩm
// // //     const sp = await SanPhamModel.create({
// // //       ten,
// // //       slug,
// // //       mo_ta,
// // //       gia_goc,
// // //       id_danh_muc,
// // //       an_hien,
// // //       tag,
// // //       phong_cach,
// // //       luot_xem: 0,
// // //       hinh: null, // sẽ update sau
// // //     });

// // //     const spId = sp.getDataValue("id") as number;

// // //     // 🖼️ Lưu ảnh chính
// // //     const hinh_chinh = form.get("hinh_chinh");
// // //     if (hinh_chinh instanceof File && hinh_chinh.size > 0) {
// // //       const base64 = await fileToBase64(hinh_chinh);
// // //       await sp.update({ hinh: base64 });
// // //     }

// // //     // 🖼️ Lưu ảnh phụ
// // //     const hinh_phu = form.getAll("hinh_phu");
// // //     for (const h of hinh_phu) {
// // //       if (h instanceof File && h.size > 0) {
// // //         const base64 = await fileToBase64(h);
// // //         await HinhModel.create({
// // //           id_san_pham: spId,
// // //           hinh: base64,
// // //           thu_tu: 0,
// // //         });
// // //       }
// // //     }

// // //     // 📦 Biến thể
// // //     const bien_the_raw = form.get("bien_the") as string;
// // //     const bien_the = JSON.parse(bien_the_raw || "[]");

// // //     for (let bt of bien_the) {
// // //       await BienTheModel.create({
// // //         id_san_pham: spId,
// // //         ten: bt.ten,
// // //         gia_them: bt.gia_them,
// // //         trang_thai: bt.trang_thai ? 1 : 0,
// // //       });
// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       message: "Thêm sản phẩm thành công",
// // //       id: spId,
// // //     });

// // //   } catch (error) {
// // //     console.error("❌ Lỗi POST tạo sản phẩm:", error);
// // //     return NextResponse.json(
// // //       { success: false, message: "Lỗi server khi tạo sản phẩm" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }
// // import { NextResponse } from "next/server";
// // import {
// //   SanPhamModel,
// //   DanhMucModel,
// //   BienTheModel,
// //   HinhModel,
// // } from "@/app/lib/models";

// // // 🔄 Convert file → Base64
// // async function fileToBase64(file: File): Promise<string> {
// //   const buffer = Buffer.from(await file.arrayBuffer());
// //   return `data:${file.type};base64,${buffer.toString("base64")}`;
// // }

// // // =================== GET DANH SÁCH SẢN PHẨM ===================
// // export async function GET() {
// //   try {
// //     const sanPham = await SanPhamModel.findAll({
// //       include: [
// //         {
// //           model: DanhMucModel,
// //           as: "danh_muc",
// //           attributes: ["id", "ten"],
// //         },
// //         {
// //           model: HinhModel,
// //           as: "hinh_anh",
// //           attributes: ["id", "hinh", "thu_tu"],
// //         },
// //         {
// //           model: BienTheModel,
// //           as: "bien_the",
// //         },
// //       ],
// //       order: [["id", "DESC"]],
// //     });

// //     return NextResponse.json({ success: true, data: sanPham });
// //   } catch (error) {
// //     console.error("❌ Lỗi GET sản phẩm:", error);
// //     return NextResponse.json(
// //       { success: false, message: "Không lấy được danh sách sản phẩm" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // // =================== POST TẠO SẢN PHẨM ===================
// // export async function POST(req: Request) {
// //   try {
// //     const form = await req.formData();

// //     const ten = form.get("ten") as string;
// //     const slug = form.get("slug") as string;
// //     const mo_ta = form.get("mo_ta") as string;
// //     const gia_goc = Number(form.get("gia_goc"));
// //     const id_danh_muc = Number(form.get("id_danh_muc"));
// //     const an_hien = form.get("an_hien") === "true";
// //     const tag = (form.get("tag") as string) || "";
// //     const phong_cach = (form.get("phong_cach") as string) || "";

// //     if (!ten || !gia_goc) {
// //       return NextResponse.json(
// //         { success: false, message: "Tên và giá gốc là bắt buộc" },
// //         { status: 400 }
// //       );
// //     }

// //     // Kiểm tra danh mục tồn tại
// //     const dm = await DanhMucModel.findByPk(id_danh_muc);
// //     if (!dm) {
// //       return NextResponse.json(
// //         { success: false, message: "Danh mục không tồn tại" },
// //         { status: 400 }
// //       );
// //     }

// //     // ➕ Tạo sản phẩm
// //     const sp = await SanPhamModel.create({
// //       ten,
// //       slug,
// //       mo_ta,
// //       gia_goc,
// //       id_danh_muc,
// //       an_hien,
// //       tag,
// //       phong_cach,
// //       luot_xem: 0,
// //       hinh: null, // sẽ update sau
// //     });

// //     const spId = sp.getDataValue("id") as number;

// //     // 🖼️ Lưu ảnh chính
// //     const hinh_chinh = form.get("hinh_chinh");
// //     if (hinh_chinh instanceof File && hinh_chinh.size > 0) {
// //       const base64 = await fileToBase64(hinh_chinh);
// //       await sp.update({ hinh: base64 });
// //     }

// //     // 🖼️ Lưu nhiều ảnh phụ
// //     const hinh_phu = form.getAll("hinh_phu");
// //     for (const file of hinh_phu) {
// //       if (file instanceof File && file.size > 0) {
// //         const base64 = await fileToBase64(file);
// //         await HinhModel.create({
// //           id_san_pham: spId,
// //           hinh: base64,
// //           thu_tu: 0,
// //         });
// //       }
// //     }

// //     // 📦 Biến thể
// //     const bien_the_raw = form.get("bien_the") as string;
// //     const bien_the_list = JSON.parse(bien_the_raw || "[]");

// //     for (let bt of bien_the_list) {
// //       await BienTheModel.create({
// //         id_san_pham: spId,
// //         ten: bt.ten,
// //         gia_them: bt.gia_them,
// //         trang_thai: bt.trang_thai ? 1 : 0,
// //       });
// //     }

// //     return NextResponse.json({
// //       success: true,
// //       message: "Thêm sản phẩm thành công",
// //       id: spId,
// //     });

// //   } catch (error) {
// //     console.error("❌ Lỗi POST tạo sản phẩm:", error);
// //     return NextResponse.json(
// //       { success: false, message: "Lỗi server khi tạo sản phẩm" },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { NextResponse } from "next/server";
// import {
//   SanPhamModel,
//   DanhMucModel,
//   BienTheModel,
//   HinhModel,
// } from "@/app/lib/models";

// // 🔄 Convert file → Base64
// async function fileToBase64(file: File): Promise<string> {
//   const buffer = Buffer.from(await file.arrayBuffer());
//   return `data:${file.type};base64,${buffer.toString("base64")}`;
// }

// // =================== GET ===================
// export async function GET(req: Request) {
//   try {

//     // 🟦 KIỂM TRA NẾU MUỐN LẤY DANH MỤC
//     const { searchParams } = new URL(req.url);
//     const type = searchParams.get("type");

//     if (type === "danh_muc") {
//       const danhMuc = await DanhMucModel.findAll({
//         attributes: ["id", "ten", "slug", "an_hien"],
//         order: [["id", "DESC"]],
//       });

//       return NextResponse.json({
//         success: true,
//         data: danhMuc,
//       });
//     }

//     // 🟩 MẶC ĐỊNH: LẤY DANH SÁCH SẢN PHẨM
//     const sanPham = await SanPhamModel.findAll({
//       include: [
//         {
//           model: DanhMucModel,
//           as: "danh_muc",
//           attributes: ["id", "ten"],
//         },
//         {
//           model: HinhModel,
//           as: "hinh_anh",
//           attributes: ["id", "hinh", "thu_tu"],
//         },
//         {
//           model: BienTheModel,
//           as: "bien_the",
//         },
//       ],
//       order: [["id", "DESC"]],
//     });

//     return NextResponse.json({ success: true, data: sanPham });
//   } catch (error) {
//     console.error("❌ Lỗi GET sản phẩm:", error);
//     return NextResponse.json(
//       { success: false, message: "Không lấy được danh sách sản phẩm" },
//       { status: 500 }
//     );
//   }
// }

// // =================== POST TẠO SẢN PHẨM ===================
// export async function POST(req: Request) {
//   try {
//     const form = await req.formData();

//     const ten = form.get("ten") as string;
//     const slug = form.get("slug") as string;
//     const mo_ta = form.get("mo_ta") as string;
//     const gia_goc = Number(form.get("gia_goc"));
//     const id_danh_muc = Number(form.get("id_danh_muc"));
//     const an_hien = form.get("an_hien") === "true";
//     const tag = (form.get("tag") as string) || "";
//     const phong_cach = (form.get("phong_cach") as string) || "";

//     if (!ten || !gia_goc) {
//       return NextResponse.json(
//         { success: false, message: "Tên và giá gốc là bắt buộc" },
//         { status: 400 }
//       );
//     }

//     // Kiểm tra danh mục tồn tại
//     const dm = await DanhMucModel.findByPk(id_danh_muc);
//     if (!dm) {
//       return NextResponse.json(
//         { success: false, message: "Danh mục không tồn tại" },
//         { status: 400 }
//       );
//     }

//     // ➕ Tạo sản phẩm
//     const sp = await SanPhamModel.create({
//       ten,
//       slug,
//       mo_ta,
//       gia_goc,
//       id_danh_muc,
//       an_hien,
//       tag,
//       phong_cach,
//       luot_xem: 0,
//       hinh: null,
//     });

//     const spId = sp.getDataValue("id") as number;

//     // 🖼️ Lưu ảnh chính
//     const hinh_chinh = form.get("hinh_chinh");
//     if (hinh_chinh instanceof File && hinh_chinh.size > 0) {
//       const base64 = await fileToBase64(hinh_chinh);
//       await sp.update({ hinh: base64 });
//     }

//     // 🖼️ Lưu nhiều ảnh phụ
//     const hinh_phu = form.getAll("hinh_phu");
//     for (const file of hinh_phu) {
//       if (file instanceof File && file.size > 0) {
//         const base64 = await fileToBase64(file);
//         await HinhModel.create({
//           id_san_pham: spId,
//           hinh: base64,
//           thu_tu: 0,
//         });
//       }
//     }

//     // 📦 Biến thể
//     const bien_the_raw = form.get("bien_the") as string;
//     const bien_the_list = JSON.parse(bien_the_raw || "[]");

//     for (let bt of bien_the_list) {
//       await BienTheModel.create({
//         id_san_pham: spId,
//         ten: bt.ten,
//         gia_them: bt.gia_them,
//         trang_thai: bt.trang_thai ? 1 : 0,
//       });
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Thêm sản phẩm thành công",
//       id: spId,
//     });

//   } catch (error) {
//     console.error("❌ Lỗi POST tạo sản phẩm:", error);
//     return NextResponse.json(
//       { success: false, message: "Lỗi server khi tạo sản phẩm" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import {
  SanPhamModel,
  DanhMucModel,
  BienTheModel,
  HinhModel,
} from "@/app/lib/models";

// Convert FILE → Base64 string
async function fileToBase64(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

// =================== GET ===================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (type === "danh_muc") {
      const danhMuc = await DanhMucModel.findAll({
        attributes: ["id", "ten", "slug", "an_hien"],
        order: [["id", "DESC"]],
      });

      return NextResponse.json({ success: true, data: danhMuc });
    }

    const sanPham = await SanPhamModel.findAll({
      include: [
        {
          model: DanhMucModel,
          as: "danh_muc",
          attributes: ["id", "ten"],
        },
        {
          model: HinhModel,
          as: "hinh_anh",
          attributes: ["id", "hinh", "thu_tu"],
        },
        {
          model: BienTheModel,
          as: "bien_the",
        },
      ],
      order: [["id", "DESC"]],
    });

    return NextResponse.json({ success: true, data: sanPham });
  } catch (error) {
    console.error("❌ Lỗi GET sản phẩm:", error);
    return NextResponse.json(
      { success: false, message: "Không lấy được danh sách sản phẩm" },
      { status: 500 }
    );
  }
}

// =================== POST ===================
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const ten = form.get("ten") as string;
    const slug = form.get("slug") as string;
    const mo_ta = form.get("mo_ta") as string;
    const gia_goc = Number(form.get("gia_goc"));
    const id_danh_muc = Number(form.get("id_danh_muc"));
    const an_hien = form.get("an_hien") === "true";
    const tag = (form.get("tag") as string) || "";
    const phong_cach = (form.get("phong_cach") as string) || "";

    // ---------------- VALIDATE ----------------
    if (!ten || !gia_goc) {
      return NextResponse.json(
        { success: false, message: "Tên và giá gốc là bắt buộc" },
        { status: 400 }
      );
    }

    const hinh_chinh = form.get("hinh_chinh");

    if (!(hinh_chinh instanceof File) || hinh_chinh.size === 0) {
      return NextResponse.json(
        { success: false, message: "Ảnh chính là bắt buộc" },
        { status: 400 }
      );
    }

    // ---------------- CHECK DANH MỤC ----------------
    const dm = await DanhMucModel.findByPk(id_danh_muc);
    if (!dm) {
      return NextResponse.json(
        { success: false, message: "Danh mục không tồn tại" },
        { status: 400 }
      );
    }

    // ---------------- SAVE MAIN IMAGE ----------------
    const base64Main = await fileToBase64(hinh_chinh);

    const sp = await SanPhamModel.create({
      ten,
      slug,
      mo_ta,
      gia_goc,
      id_danh_muc,
      an_hien,
      tag,
      phong_cach,
      luot_xem: 0,
      hinh: base64Main, // 👈 KHÔNG BAO GIỜ null NỮA
    });

    const spId = sp.getDataValue("id") as number;

    // ---------------- SAVE SUB IMAGES ----------------
    const hinh_phu = form.getAll("hinh_phu");

    for (const img of hinh_phu) {
      if (img instanceof File && img.size > 0) {
        const base64 = await fileToBase64(img);
        await HinhModel.create({
          id_san_pham: spId,
          hinh: base64,
          thu_tu: 0,
        });
      }
    }

    // ---------------- SAVE VARIANTS ----------------
    const bien_the_raw = form.get("bien_the") as string;
    const bien_the_list = JSON.parse(bien_the_raw || "[]");

    for (const bt of bien_the_list) {
      await BienTheModel.create({
        id_san_pham: spId,
        ten: bt.ten,
        gia_them: bt.gia_them,
        trang_thai: bt.trang_thai ? 1 : 0,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thêm sản phẩm thành công",
      id: spId,
    });
  } catch (error) {
    console.error("❌ Lỗi POST tạo sản phẩm:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi server khi tạo sản phẩm" },
      { status: 500 }
    );
  }
}
