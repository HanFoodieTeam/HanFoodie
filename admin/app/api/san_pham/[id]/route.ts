// // // // // // // // // // // // import { NextResponse } from "next/server";
// // // // // // // // // // // // import { SanPhamModel } from "@/app/lib/models";

// // // // // // // // // // // // export async function GET(req: Request, { params }: { params: { id: string } }) {
// // // // // // // // // // // //   const id = Number(params.id);

// // // // // // // // // // // //   const sp = await SanPhamModel.findByPk(id);

// // // // // // // // // // // //   if (!sp) {
// // // // // // // // // // // //     return NextResponse.json({ success: false, message: "Không tìm thấy sản phẩm" }, { status: 404 });
// // // // // // // // // // // //   }

// // // // // // // // // // // //   return NextResponse.json({ success: true, data: sp });
// // // // // // // // // // // // }

// // // // // // // // // // // // export async function PATCH(req: Request, { params }: { params: { id: string } }) {
// // // // // // // // // // // //   const id = Number(params.id);
// // // // // // // // // // // //   const body = await req.json();

// // // // // // // // // // // //   const sp = await SanPhamModel.findByPk(id);
// // // // // // // // // // // //   if (!sp) {
// // // // // // // // // // // //     return NextResponse.json({ success: false, message: "Không tìm thấy sản phẩm" }, { status: 404 });
// // // // // // // // // // // //   }

// // // // // // // // // // // //   await sp.update(body);

// // // // // // // // // // // //   return NextResponse.json({ success: true, message: "Cập nhật thành công" });
// // // // // // // // // // // // }
// // // // // // // // // // // import { NextResponse } from "next/server";
// // // // // // // // // // // import { SanPhamModel, BienTheModel, DanhMucModel, HinhModel } from "@/app/lib/models";

// // // // // // // // // // // export async function GET(req: Request, { params }: { params: { id: string } }) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     const id = Number(params.id);

// // // // // // // // // // //     const sp = await SanPhamModel.findOne({
// // // // // // // // // // //       where: { id },
// // // // // // // // // // //       include: [
// // // // // // // // // // //         { model: BienTheModel, as: "bien_the" },
// // // // // // // // // // //         { model: DanhMucModel, as: "danh_muc", attributes: ["id", "ten", "slug"] },
// // // // // // // // // // //         { model: HinhModel, as: "hinh_anh" },
// // // // // // // // // // //       ],
// // // // // // // // // // //     });

// // // // // // // // // // //     if (!sp) {
// // // // // // // // // // //       return NextResponse.json(
// // // // // // // // // // //         { success: false, message: "Không tìm thấy sản phẩm" },
// // // // // // // // // // //         { status: 404 }
// // // // // // // // // // //       );
// // // // // // // // // // //     }

// // // // // // // // // // //     return NextResponse.json({ success: true, data: sp });
// // // // // // // // // // //   } catch (error) {
// // // // // // // // // // //     return NextResponse.json(
// // // // // // // // // // //       { success: false, message: "Lỗi server", error },
// // // // // // // // // // //       { status: 500 }
// // // // // // // // // // //     );
// // // // // // // // // // //   }
// // // // // // // // // // // }
// // // // // // // // // // import { NextResponse } from "next/server";
// // // // // // // // // // import { SanPhamModel, HinhModel, BienTheModel } from "@/app/lib/models";
// // // // // // // // // // import { ISanPham, IBienThe, IHinh } from "@/app/lib/cautrucdata";

// // // // // // // // // // // 🔄 Convert file → Base64
// // // // // // // // // // async function fileToBase64(file: File): Promise<string> {
// // // // // // // // // //   const buffer = Buffer.from(await file.arrayBuffer());
// // // // // // // // // //   return `data:${file.type};base64,${buffer.toString("base64")}`;
// // // // // // // // // // }

// // // // // // // // // // // ===== TYPE FORM =====
// // // // // // // // // // interface ISanPhamForm {
// // // // // // // // // //   ten?: string;
// // // // // // // // // //   slug?: string;
// // // // // // // // // //   mo_ta?: string;
// // // // // // // // // //   tag?: string;
// // // // // // // // // //   phong_cach?: string;
// // // // // // // // // //   trang_thai?: "active" | "inactive";
// // // // // // // // // //   gia_goc?: number;
// // // // // // // // // //   hinh_chinh?: File;
// // // // // // // // // //   hinh_phu?: File[];
// // // // // // // // // //   hinh_anh_ids?: number[];
// // // // // // // // // //   bien_the?: IBienThe[];
// // // // // // // // // // }

// // // // // // // // // // export async function PUT(
// // // // // // // // // //   req: Request,
// // // // // // // // // //   { params }: { params: { id: string } }
// // // // // // // // // // ) {
// // // // // // // // // //   try {
// // // // // // // // // //     const id = Number(params.id);

// // // // // // // // // //     const sp = await SanPhamModel.findByPk(id, {
// // // // // // // // // //       include: [
// // // // // // // // // //         { model: HinhModel, as: "hinh_anh" },
// // // // // // // // // //         { model: BienTheModel, as: "bien_the" },
// // // // // // // // // //       ],
// // // // // // // // // //     });

// // // // // // // // // //     if (!sp) {
// // // // // // // // // //       return NextResponse.json(
// // // // // // // // // //         { success: false, message: "Không tìm thấy sản phẩm" },
// // // // // // // // // //         { status: 404 }
// // // // // // // // // //       );
// // // // // // // // // //     }

// // // // // // // // // //     const formData = await req.formData();
// // // // // // // // // //     const form: ISanPhamForm = {
// // // // // // // // // //       ten: formData.get("ten") as string,
// // // // // // // // // //       slug: formData.get("slug") as string,
// // // // // // // // // //       mo_ta: formData.get("mo_ta") as string,
// // // // // // // // // //       tag: formData.get("tag") as string,
// // // // // // // // // //       phong_cach: formData.get("phong_cach") as string,
// // // // // // // // // //       trang_thai: (formData.get("trang_thai") as "active" | "inactive") || "active",
// // // // // // // // // //       gia_goc: formData.get("gia_goc") ? Number(formData.get("gia_goc")) : undefined,
// // // // // // // // // //       hinh_chinh: formData.get("hinh_chinh") as File,
// // // // // // // // // //       hinh_phu: formData.getAll("hinh_phu") as File[],
// // // // // // // // // //       hinh_anh_ids: (formData.getAll("hinh_anh_ids") as string[]).map(Number),
// // // // // // // // // //       bien_the: formData.get("bien_the")
// // // // // // // // // //         ? JSON.parse(formData.get("bien_the") as string)
// // // // // // // // // //         : [],
// // // // // // // // // //     };

// // // // // // // // // //     // ===== CẬP NHẬT THÔNG TIN =====
// // // // // // // // // //     await sp.update({
// // // // // // // // // //       ten: form.ten,
// // // // // // // // // //       slug: form.slug,
// // // // // // // // // //       mo_ta: form.mo_ta,
// // // // // // // // // //       tag: form.tag,
// // // // // // // // // //       phong_cach: form.phong_cach,
// // // // // // // // // //       trang_thai: form.trang_thai,
// // // // // // // // // //       gia_goc: form.gia_goc,
// // // // // // // // // //     });

// // // // // // // // // //     // ===== HÌNH CHÍNH =====
// // // // // // // // // //     if (form.hinh_chinh && form.hinh_chinh.size > 0) {
// // // // // // // // // //       const base64 = await fileToBase64(form.hinh_chinh);
// // // // // // // // // //       await sp.update({ hinh: base64 });
// // // // // // // // // //     }

// // // // // // // // // //     // ===== HÌNH PHỤ =====
// // // // // // // // // //     // Xóa các hình phụ đã xóa
// // // // // // // // // //     if (form.hinh_anh_ids) {
// // // // // // // // // //       await HinhModel.destroy({
// // // // // // // // // //         where: {
// // // // // // // // // //           id_san_pham: id,
// // // // // // // // // //           id: { $notIn: form.hinh_anh_ids },
// // // // // // // // // //         },
// // // // // // // // // //       });
// // // // // // // // // //     }

// // // // // // // // // //     // Thêm hình phụ mới
// // // // // // // // // //     for (const file of form.hinh_phu || []) {
// // // // // // // // // //       if (file.size > 0) {
// // // // // // // // // //         const base64 = await fileToBase64(file);
// // // // // // // // // //         await HinhModel.create({
// // // // // // // // // //           id_san_pham: id,
// // // // // // // // // //           hinh: base64,
// // // // // // // // // //           thu_tu: 0,
// // // // // // // // // //         });
// // // // // // // // // //       }
// // // // // // // // // //     }

// // // // // // // // // //     // ===== BIẾN THỂ =====
// // // // // // // // // //     if (form.bien_the) {
// // // // // // // // // //       await BienTheModel.destroy({ where: { id_san_pham: id } });
// // // // // // // // // //       for (const bt of form.bien_the) {
// // // // // // // // // //         await BienTheModel.create({
// // // // // // // // // //           id_san_pham: id,
// // // // // // // // // //           ten: bt.ten,
// // // // // // // // // //           gia_them: bt.gia_them,
// // // // // // // // // //           trang_thai: bt.trang_thai ? 1 : 0,
// // // // // // // // // //         });
// // // // // // // // // //       }
// // // // // // // // // //     }

// // // // // // // // // //     return NextResponse.json({
// // // // // // // // // //       success: true,
// // // // // // // // // //       message: "Cập nhật sản phẩm thành công",
// // // // // // // // // //     });
// // // // // // // // // //   } catch (error) {
// // // // // // // // // //     console.error("❌ Lỗi PUT /api/san_pham/[id]:", error);
// // // // // // // // // //     return NextResponse.json(
// // // // // // // // // //       { success: false, message: "Lỗi server khi cập nhật sản phẩm", error },
// // // // // // // // // //       { status: 500 }
// // // // // // // // // //     );
// // // // // // // // // //   }
// // // // // // // // // // }
// // // // // // // // // import { NextResponse } from "next/server";
// // // // // // // // // import { SanPhamModel, HinhModel, BienTheModel, DanhMucModel } from "@/app/lib/models";
// // // // // // // // // import { ISanPham, IBienThe, IDanhMuc, IHinh } from "@/app/lib/cautrucdata";

// // // // // // // // // interface Params {
// // // // // // // // //   params: { id: string };
// // // // // // // // // }

// // // // // // // // // // ================= GET chi tiết sản phẩm =================
// // // // // // // // // export async function GET(req: Request, { params }: Params) {
// // // // // // // // //   try {
// // // // // // // // //     const id = Number(params.id);

// // // // // // // // //     const sp = await SanPhamModel.findOne({
// // // // // // // // //       where: { id },
// // // // // // // // //       include: [
// // // // // // // // //         { model: BienTheModel, as: "bien_the" },
// // // // // // // // //         { model: DanhMucModel, as: "danh_muc", attributes: ["id", "ten", "slug"] },
// // // // // // // // //         { model: HinhModel, as: "hinh_anh" },
// // // // // // // // //       ],
// // // // // // // // //     });

// // // // // // // // //     if (!sp) {
// // // // // // // // //       return NextResponse.json(
// // // // // // // // //         { success: false, message: "Không tìm thấy sản phẩm" },
// // // // // // // // //         { status: 404 }
// // // // // // // // //       );
// // // // // // // // //     }

// // // // // // // // //     const data: ISanPham & {
// // // // // // // // //       bien_the: IBienThe[];
// // // // // // // // //       danh_muc: IDanhMuc | null;
// // // // // // // // //       hinh_anh: IHinh[];
// // // // // // // // //     } = {
// // // // // // // // //       id: sp.id,
// // // // // // // // //       ten: sp.ten,
// // // // // // // // //       slug: sp.slug,
// // // // // // // // //       mo_ta: sp.mo_ta,
// // // // // // // // //       gia_goc: sp.gia_goc,
// // // // // // // // //       hinh: sp.hinh,
// // // // // // // // //       tag: sp.tag,
// // // // // // // // //       phong_cach: sp.phong_cach,
// // // // // // // // //       luot_xem: sp.luot_xem,
// // // // // // // // //       trang_thai: sp.trang_thai,
// // // // // // // // //       id_danh_muc: sp.id_danh_muc,
// // // // // // // // //       danh_muc: sp.danh_muc ?? null,
// // // // // // // // //       bien_the: sp.bien_the ?? [],
// // // // // // // // //       hinh_anh: sp.hinh_anh ?? [],
// // // // // // // // //     };

// // // // // // // // //     return NextResponse.json({ success: true, data });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("❌ Lỗi GET /san_pham/[id]:", error);
// // // // // // // // //     return NextResponse.json(
// // // // // // // // //       { success: false, message: "Lỗi server", error },
// // // // // // // // //       { status: 500 }
// // // // // // // // //     );
// // // // // // // // //   }
// // // // // // // // // }

// // // // // // // // // // ================= PUT cập nhật sản phẩm =================
// // // // // // // // // export async function PUT(req: Request, { params }: Params) {
// // // // // // // // //   try {
// // // // // // // // //     const id = Number(params.id);
// // // // // // // // //     const body = await req.json();

// // // // // // // // //     const sp = await SanPhamModel.findByPk(id);
// // // // // // // // //     if (!sp) {
// // // // // // // // //       return NextResponse.json(
// // // // // // // // //         { success: false, message: "Không tìm thấy sản phẩm" },
// // // // // // // // //         { status: 404 }
// // // // // // // // //       );
// // // // // // // // //     }

// // // // // // // // //     // Cập nhật thông tin cơ bản
// // // // // // // // //     await sp.update({
// // // // // // // // //       ten: body.ten,
// // // // // // // // //       slug: body.slug,
// // // // // // // // //       mo_ta: body.mo_ta,
// // // // // // // // //       gia_goc: body.gia_goc,
// // // // // // // // //       tag: body.tag,
// // // // // // // // //       phong_cach: body.phong_cach,
// // // // // // // // //       luot_xem: body.luot_xem,
// // // // // // // // //       trang_thai: body.trang_thai,
// // // // // // // // //     });

// // // // // // // // //     // Cập nhật biến thể
// // // // // // // // //     if (Array.isArray(body.bien_the)) {
// // // // // // // // //       await BienTheModel.destroy({ where: { id_san_pham: id } });
// // // // // // // // //       for (const bt of body.bien_the) {
// // // // // // // // //         await BienTheModel.create({
// // // // // // // // //           id_san_pham: id,
// // // // // // // // //           ten: bt.ten,
// // // // // // // // //           gia_them: bt.gia_them,
// // // // // // // // //           trang_thai: bt.trang_thai ? 1 : 0,
// // // // // // // // //         });
// // // // // // // // //       }
// // // // // // // // //     }

// // // // // // // // //     // Cập nhật hình phụ
// // // // // // // // //     if (Array.isArray(body.hinh_anh)) {
// // // // // // // // //       await HinhModel.destroy({ where: { id_san_pham: id } });
// // // // // // // // //       for (const h of body.hinh_anh) {
// // // // // // // // //         await HinhModel.create({
// // // // // // // // //           id_san_pham: id,
// // // // // // // // //           hinh: h.hinh,
// // // // // // // // //           thu_tu: h.thu_tu ?? 0,
// // // // // // // // //         });
// // // // // // // // //       }
// // // // // // // // //     }

// // // // // // // // //     return NextResponse.json({ success: true, message: "Cập nhật thành công" });
// // // // // // // // //   } catch (error) {
// // // // // // // // //     console.error("❌ Lỗi PUT /san_pham/[id]:", error);
// // // // // // // // //     return NextResponse.json(
// // // // // // // // //       { success: false, message: "Lỗi server khi cập nhật", error },
// // // // // // // // //       { status: 500 }
// // // // // // // // //     );
// // // // // // // // //   }
// // // // // // // // // }
// // // // // // // // import { NextResponse } from "next/server";
// // // // // // // // import { SanPhamModel, BienTheModel, DanhMucModel, HinhModel } from "@/app/lib/models";
// // // // // // // // import { ISanPham, IBienThe, IDanhMuc, IHinh } from "@/app/lib/cautrucdata";

// // // // // // // // export async function GET(
// // // // // // // //   req: Request,
// // // // // // // //   { params }: { params: { id: string } }
// // // // // // // // ) {
// // // // // // // //   try {
// // // // // // // //     const id = Number(params.id);
// // // // // // // //     if (isNaN(id)) {
// // // // // // // //       return NextResponse.json(
// // // // // // // //         { success: false, message: "ID không hợp lệ" },
// // // // // // // //         { status: 400 }
// // // // // // // //       );
// // // // // // // //     }

// // // // // // // //     const sp = await SanPhamModel.findOne({
// // // // // // // //       where: { id },
// // // // // // // //       include: [
// // // // // // // //         { model: BienTheModel, as: "bien_the" },
// // // // // // // //         { model: DanhMucModel, as: "danh_muc", attributes: ["id", "ten", "slug"] },
// // // // // // // //         { model: HinhModel, as: "hinh_anh" },
// // // // // // // //       ],
// // // // // // // //     });

// // // // // // // //     if (!sp) {
// // // // // // // //       return NextResponse.json(
// // // // // // // //         { success: false, message: "Không tìm thấy sản phẩm" },
// // // // // // // //         { status: 404 }
// // // // // // // //       );
// // // // // // // //     }

// // // // // // // //     const spPlain = sp.get({ plain: true });

// // // // // // // //     const data: ISanPham & {
// // // // // // // //       bien_the: IBienThe[];
// // // // // // // //       danh_muc: IDanhMuc | null;
// // // // // // // //       hinh_anh: IHinh[];
// // // // // // // //     } = {
// // // // // // // //       id: spPlain.id,
// // // // // // // //       ten: spPlain.ten,
// // // // // // // //       slug: spPlain.slug,
// // // // // // // //       mo_ta: spPlain.mo_ta,
// // // // // // // //       gia_goc: spPlain.gia_goc,
// // // // // // // //       hinh: spPlain.hinh,
// // // // // // // //       tag: spPlain.tag,
// // // // // // // //       phong_cach: spPlain.phong_cach,
// // // // // // // //       luot_xem: spPlain.luot_xem,
// // // // // // // //       trang_thai: spPlain.trang_thai,
// // // // // // // //       an_hien: spPlain.an_hien, // 🔹 thêm property này
// // // // // // // //       id_danh_muc: spPlain.id_danh_muc,
// // // // // // // //       danh_muc: spPlain.danh_muc ?? null,
// // // // // // // //       bien_the: spPlain.bien_the ?? [],
// // // // // // // //       hinh_anh: spPlain.hinh_anh ?? [],
// // // // // // // //     };

// // // // // // // //     return NextResponse.json({ success: true, data });

// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("❌ Lỗi GET sản phẩm:", error);
// // // // // // // //     return NextResponse.json(
// // // // // // // //       { success: false, message: "Lỗi server", error },
// // // // // // // //       { status: 500 }
// // // // // // // //     );
// // // // // // // //   }
// // // // // // // // }
// // // // // // // import { NextResponse } from "next/server";
// // // // // // // import { SanPhamModel, BienTheModel, HinhModel } from "@/app/lib/models";
// // // // // // // import { ISanPham, IBienThe, IHinh } from "@/app/lib/cautrucdata";

// // // // // // // // 🔄 Convert file → Base64
// // // // // // // async function fileToBase64(file: File): Promise<string> {
// // // // // // //   const buffer = Buffer.from(await file.arrayBuffer());
// // // // // // //   return `data:${file.type};base64,${buffer.toString("base64")}`;
// // // // // // // }

// // // // // // // export async function PUT(req: Request) {
// // // // // // //   try {
// // // // // // //     const form = await req.formData();

// // // // // // //     const id = Number(form.get("id"));
// // // // // // //     if (isNaN(id)) {
// // // // // // //       return NextResponse.json(
// // // // // // //         { success: false, message: "ID sản phẩm không hợp lệ" },
// // // // // // //         { status: 400 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     const sp = await SanPhamModel.findByPk(id);
// // // // // // //     if (!sp) {
// // // // // // //       return NextResponse.json(
// // // // // // //         { success: false, message: "Sản phẩm không tồn tại" },
// // // // // // //         { status: 404 }
// // // // // // //       );
// // // // // // //     }

// // // // // // //     // 🔹 Cập nhật các trường cơ bản
// // // // // // //     const ten = form.get("ten") as string;
// // // // // // //     const slug = form.get("slug") as string;
// // // // // // //     const mo_ta = (form.get("mo_ta") as string) || "";
// // // // // // //     const gia_goc = Number(form.get("gia_goc"));
// // // // // // //     const tag = (form.get("tag") as string) || "";
// // // // // // //     const phong_cach = (form.get("phong_cach") as string) || "";
// // // // // // //     const luot_xem = Number(form.get("luot_xem")) || 0;
// // // // // // //     const trang_thai = (form.get("trang_thai") as string) || "inactive";
// // // // // // //     const an_hien = form.get("an_hien") === "true";
// // // // // // //     const id_danh_muc = Number(form.get("id_danh_muc"));

// // // // // // //     await sp.update({
// // // // // // //       ten,
// // // // // // //       slug,
// // // // // // //       mo_ta,
// // // // // // //       gia_goc,
// // // // // // //       tag,
// // // // // // //       phong_cach,
// // // // // // //       luot_xem,
// // // // // // //       trang_thai,
// // // // // // //       an_hien,
// // // // // // //       id_danh_muc,
// // // // // // //     });

// // // // // // //     // 🔹 Cập nhật hình chính
// // // // // // //     const hinh_chinh = form.get("hinh_chinh");
// // // // // // //     if (hinh_chinh instanceof File && hinh_chinh.size > 0) {
// // // // // // //       const base64 = await fileToBase64(hinh_chinh);
// // // // // // //       await sp.update({ hinh: base64 });
// // // // // // //     }

// // // // // // //     // 🔹 Cập nhật hình phụ
// // // // // // //     const hinh_phu_files = form.getAll("hinh_phu");
// // // // // // //     for (const file of hinh_phu_files) {
// // // // // // //       if (file instanceof File && file.size > 0) {
// // // // // // //         const base64 = await fileToBase64(file);
// // // // // // //         await HinhModel.create({
// // // // // // //           id_san_pham: id,
// // // // // // //           hinh: base64,
// // // // // // //           thu_tu: 0,
// // // // // // //         });
// // // // // // //       }
// // // // // // //     }

// // // // // // //     // 🔹 Cập nhật biến thể
// // // // // // //     const bien_the_raw = form.get("bien_the") as string;
// // // // // // //     const bien_the_list: IBienThe[] = JSON.parse(bien_the_raw || "[]");

// // // // // // //     // Xoá biến thể cũ để tránh trùng lặp
// // // // // // //     await BienTheModel.destroy({ where: { id_san_pham: id } });

// // // // // // //     for (const bt of bien_the_list) {
// // // // // // //       await BienTheModel.create({
// // // // // // //         id_san_pham: id,
// // // // // // //         ten: bt.ten,
// // // // // // //         gia_them: bt.gia_them || 0,
// // // // // // //         trang_thai: bt.trang_thai ? 1 : 0,
// // // // // // //       });
// // // // // // //     }

// // // // // // //     return NextResponse.json({ success: true, message: "Cập nhật thành công" });
// // // // // // //   } catch (error) {
// // // // // // //     console.error("❌ Lỗi PUT sản phẩm:", error);
// // // // // // //     return NextResponse.json(
// // // // // // //       { success: false, message: "Lỗi server khi cập nhật sản phẩm", error },
// // // // // // //       { status: 500 }
// // // // // // //     );
// // // // // // //   }
// // // // // // // }
// // // // // // import { NextResponse } from "next/server";
// // // // // // import { SanPhamModel, BienTheModel, HinhModel } from "@/app/lib/models";
// // // // // // import { IBienThe } from "@/app/lib/cautrucdata";

// // // // // // // Convert file → Base64
// // // // // // async function fileToBase64(file: File): Promise<string> {
// // // // // //   const buffer = Buffer.from(await file.arrayBuffer());
// // // // // //   return `data:${file.type};base64,${buffer.toString("base64")}`;
// // // // // // }


// // // // // // // ===== GET SAN PHAM =====
// // // // // // export async function GET(_req: Request, { params }: { params: { id: string } }) {
// // // // // //   try {
// // // // // //     const id = Number(params.id);

// // // // // //     if (isNaN(id)) {
// // // // // //       return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });
// // // // // //     }

// // // // // //     const sp = await SanPhamModel.findByPk(id, {
// // // // // //       include: [
// // // // // //         { model: BienTheModel, as: "bien_the" },
// // // // // //         { model: HinhModel, as: "hinh_anh" },
// // // // // //       ]
// // // // // //     });

// // // // // //     if (!sp) {
// // // // // //       return NextResponse.json({ success: false, message: "Không tìm thấy sản phẩm" }, { status: 404 });
// // // // // //     }

// // // // // //     return NextResponse.json({ success: true, data: sp });

// // // // // //   } catch (error) {
// // // // // //     console.error("❌ GET Error:", error);
// // // // // //     return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
// // // // // //   }
// // // // // // }



// // // // // // // ===== UPDATE SAN PHAM =====
// // // // // // export async function PUT(req: Request, { params }: { params: { id: string } }) {
// // // // // //   try {
// // // // // //     const id = Number(params.id);

// // // // // //     const form = await req.formData();

// // // // // //     const sp = await SanPhamModel.findByPk(id);
// // // // // //     if (!sp) return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" });

// // // // // //     await sp.update({
// // // // // //       ten: String(form.get("ten") || ""),
// // // // // //       slug: String(form.get("slug") || ""),
// // // // // //       mo_ta: String(form.get("mo_ta") || ""),
// // // // // //       gia_goc: Number(form.get("gia_goc") || 0),
// // // // // //       tag: String(form.get("tag") || ""),
// // // // // //       phong_cach: String(form.get("phong_cach") || ""),
// // // // // //       luot_xem: Number(form.get("luot_xem") || 0),
// // // // // //       trang_thai: String(form.get("trang_thai") || "inactive"),
// // // // // //       an_hien: form.get("an_hien") === "true",
// // // // // //       id_danh_muc: Number(form.get("id_danh_muc") || 0),
// // // // // //     });

// // // // // //     // Hình chính
// // // // // //     const mainImg = form.get("hinh_chinh");
// // // // // //     if (mainImg instanceof File && mainImg.size > 0) {
// // // // // //       await sp.update({ hinh: await fileToBase64(mainImg) });
// // // // // //     }

// // // // // //     // Hình phụ mới
// // // // // //     const extraImages = form.getAll("hinh_phu");
// // // // // //     for (const f of extraImages) {
// // // // // //       if (f instanceof File && f.size > 0) {
// // // // // //         await HinhModel.create({
// // // // // //           id_san_pham: id,
// // // // // //           hinh: await fileToBase64(f),
// // // // // //           thu_tu: 0,
// // // // // //         });
// // // // // //       }
// // // // // //     }

// // // // // //     // Biến thể
// // // // // //     const bt = JSON.parse(String(form.get("bien_the") || "[]")) as IBienThe[];

// // // // // //     await BienTheModel.destroy({ where: { id_san_pham: id } });

// // // // // //     for (const item of bt) {
// // // // // //       await BienTheModel.create({
// // // // // //         id_san_pham: id,
// // // // // //         ten: item.ten,
// // // // // //         gia_them: item.gia_them || 0,
// // // // // //         trang_thai: item.trang_thai ? 1 : 0,
// // // // // //       });
// // // // // //     }

// // // // // //     return NextResponse.json({ success: true });

// // // // // //   } catch (error) {
// // // // // //     console.error("❌ PUT Error:", error);
// // // // // //     return NextResponse.json({ success: false, message: "Lỗi cập nhật" }, { status: 500 });
// // // // // //   }
// // // // // // }
// // // // // import { NextResponse } from "next/server";
// // // // // import { SanPhamModel, BienTheModel, HinhModel } from "@/app/lib/models";
// // // // // import { IBienThe } from "@/app/lib/cautrucdata";

// // // // // // Convert file → Base64
// // // // // async function fileToBase64(file: File): Promise<string> {
// // // // //   const buffer = Buffer.from(await file.arrayBuffer());
// // // // //   return `data:${file.type};base64,${buffer.toString("base64")}`;
// // // // // }


// // // // // // ================= GET =================
// // // // // export async function GET(_req: Request, { params }: { params: { id: string } }) {
// // // // //   try {
// // // // //     const id = Number(params.id);
// // // // //     if (isNaN(id)) return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });

// // // // //     const sp = await SanPhamModel.findByPk(id, {
// // // // //       include: [
// // // // //         { model: BienTheModel, as: "bien_the" },
// // // // //         { model: HinhModel, as: "hinh_anh" },
// // // // //       ],
// // // // //     });

// // // // //     if (!sp) return NextResponse.json({ success: false, message: "Không tìm thấy sản phẩm" }, { status: 404 });

// // // // //     return NextResponse.json({ success: true, data: sp });

// // // // //   } catch (error) {
// // // // //     console.error("❌ GET Error:", error);
// // // // //     return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
// // // // //   }
// // // // // }



// // // // // // ================= PUT =================
// // // // // export async function PUT(req: Request, { params }: { params: { id: string } }) {
// // // // //   try {
// // // // //     const id = Number(params.id);
// // // // //     const form = await req.formData();

// // // // //     const sp = await SanPhamModel.findByPk(id);
// // // // //     if (!sp) return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" });

// // // // //     // ---- Cập nhật thông tin ----
// // // // //     await sp.update({
// // // // //       ten: String(form.get("ten") ?? ""),
// // // // //       slug: String(form.get("slug") ?? ""),
// // // // //       mo_ta: String(form.get("mo_ta") ?? ""),
// // // // //       gia_goc: Number(form.get("gia_goc") ?? 0),
// // // // //       tag: String(form.get("tag") ?? ""),
// // // // //       phong_cach: String(form.get("phong_cach") ?? ""),
// // // // //       an_hien: form.get("an_hien") === "true",
// // // // //       trang_thai: String(form.get("trang_thai") ?? "inactive"),
// // // // //       id_danh_muc: Number(form.get("id_danh_muc") ?? 0),
// // // // //     });

// // // // //     // ---- Cập nhật hình chính ----
// // // // //     const mainImg = form.get("hinh_chinh");
// // // // //     if (mainImg instanceof File && mainImg.size > 0) {
// // // // //       await sp.update({ hinh: await fileToBase64(mainImg) });
// // // // //     }

// // // // //     // ---- Thêm ảnh phụ ----
// // // // //     const extraImages = form.getAll("hinh_phu");
// // // // //     for (const img of extraImages) {
// // // // //       if (img instanceof File && img.size > 0) {
// // // // //         await HinhModel.create({
// // // // //           id_san_pham: id,
// // // // //           hinh: await fileToBase64(img),
// // // // //           thu_tu: 0,
// // // // //         });
// // // // //       }
// // // // //     }

// // // // //     // ---- Cập nhật biến thể ----
// // // // //     const bienThe = JSON.parse(String(form.get("bien_the") || "[]")) as IBienThe[];

// // // // //     await BienTheModel.destroy({ where: { id_san_pham: id } });

// // // // //     for (const item of bienThe) {
// // // // //       await BienTheModel.create({
// // // // //         id_san_pham: id,
// // // // //         ten: item.ten,
// // // // //         gia_them: item.gia_them ?? 0,
// // // // //         trang_thai: item.trang_thai ? 1 : 0,
// // // // //       });
// // // // //     }

// // // // //     return NextResponse.json({ success: true, message: "Cập nhật thành công" });

// // // // //   } catch (error) {
// // // // //     console.error("❌ PUT Error:", error);
// // // // //     return NextResponse.json({ success: false, message: "Lỗi cập nhật" }, { status: 500 });
// // // // //   }
// // // // // }
// // // // import { NextResponse } from "next/server";
// // // // import { SanPhamModel, BienTheModel, HinhModel } from "@/app/lib/models";
// // // // import { IBienThe } from "@/app/lib/cautrucdata";

// // // // // Convert file to Base64
// // // // async function fileToBase64(file: Blob): Promise<string> {
// // // //   const arrayBuffer = await file.arrayBuffer();
// // // //   return `data:${file.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
// // // // }

// // // // export async function GET(_req: Request, context: any) {
// // // //   try {
// // // //     const params = await context.params;
// // // //     const id = Number(params.id);

// // // //     const sp = await SanPhamModel.findByPk(id, {
// // // //       include: [
// // // //         { model: BienTheModel, as: "bien_the" },
// // // //         { model: HinhModel, as: "hinh_anh" },
// // // //       ],
// // // //     });

// // // //     if (!sp) return NextResponse.json({ success: false, message: "Không tìm thấy sản phẩm" });

// // // //     return NextResponse.json({ success: true, data: sp });
// // // //   } catch (err) {
// // // //     console.log("GET Error:", err);
// // // //     return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
// // // //   }
// // // // }


// // // // export async function PUT(req: Request, context: any) {
// // // //   try {
// // // //     const params = await context.params;
// // // //     const id = Number(params.id);

// // // //     const form = await req.formData();
// // // //     const sp = await SanPhamModel.findByPk(id);

// // // //     if (!sp) return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" });


// // // //     // Update sản phẩm
// // // //     await sp.update({
// // // //       ten: String(form.get("ten") ?? ""),
// // // //       slug: String(form.get("slug") ?? ""),
// // // //       mo_ta: String(form.get("mo_ta") ?? ""),
// // // //       gia_goc: Number(form.get("gia_goc") ?? 0),
// // // //       tag: String(form.get("tag") ?? ""),
// // // //       phong_cach: String(form.get("phong_cach") ?? ""),
// // // //       an_hien: form.get("an_hien") === "true",
// // // //       trang_thai: String(form.get("trang_thai") ?? "inactive"),
// // // //       id_danh_muc: Number(form.get("id_danh_muc") ?? 0),
// // // //     });


// // // //     // Cập nhật hình chính nếu có
// // // //     const mainImg = form.get("hinh_chinh");
// // // //     if (mainImg instanceof Blob && mainImg.size > 0) {
// // // //       await sp.update({ hinh: await fileToBase64(mainImg) });
// // // //     }


// // // //     // Thêm hình phụ mới
// // // //     const extraImages = form.getAll("hinh_phu");
// // // //     for (const img of extraImages) {
// // // //       if (img instanceof Blob && img.size > 0) {
// // // //         await HinhModel.create({
// // // //           id_san_pham: id,
// // // //           hinh: await fileToBase64(img),
// // // //           thu_tu: 0,
// // // //         });
// // // //       }
// // // //     }


// // // //     // ---- UPDATE biến thể thay vì xóa ----

// // // //     const rawData = form.get("bien_the");
// // // //     const bienTheData: IBienThe[] = rawData ? JSON.parse(String(rawData)) : [];

// // // //     const oldBienThe = await BienTheModel.findAll({ where: { id_san_pham: id } });

// // // //     // update hoặc tạo mới
// // // //     for (const item of bienTheData) {
// // // //       const exists = oldBienThe.find(v => v.ten === item.ten);

// // // //       if (exists) {
// // // //         // update biến thể có dữ liệu liên kết
// // // //         await exists.update({
// // // //           gia_them: item.gia_them ?? exists.gia_them,
// // // //           trang_thai: item.trang_thai ? 1 : 0,
// // // //         });
// // // //       } else {
// // // //         // biến thể mới
// // // //         await BienTheModel.create({
// // // //           id_san_pham: id,
// // // //           ten: item.ten,
// // // //           gia_them: item.gia_them ?? 0,
// // // //           trang_thai: item.trang_thai ? 1 : 0,
// // // //         });
// // // //       }
// // // //     }

// // // //     // Biến thể bị xóa trong UI → chuyển trạng thái inactive
// // // //     for (const old of oldBienThe) {
// // // //       if (!bienTheData.some(v => v.ten === old.ten)) {
// // // //         await old.update({ trang_thai: 0 });
// // // //       }
// // // //     }

// // // //     return NextResponse.json({ success: true, message: "Cập nhật thành công!" });

// // // //   } catch (err) {
// // // //     console.log("❌ PUT Error:", err);
// // // //     return NextResponse.json({ success: false, message: "Lỗi cập nhật" }, { status: 500 });
// // // //   }
// // // // }
// // // import { NextResponse } from "next/server";
// // // import { SanPhamModel, BienTheModel, HinhModel } from "@/app/lib/models";
// // // import { IBienThe } from "@/app/lib/cautrucdata";

// // // // Convert file → Base64
// // // async function fileToBase64(file: File): Promise<string> {
// // //   const buffer = Buffer.from(await file.arrayBuffer());
// // //   return `data:${file.type};base64,${buffer.toString("base64")}`;
// // // }


// // // // ===== GET SAN PHAM =====
// // // export async function GET(_req: Request, { params }: { params: { id: string } }) {
// // //   try {
// // //     const id = Number(params.id);

// // //     if (isNaN(id)) {
// // //       return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });
// // //     }

// // //     const sp = await SanPhamModel.findByPk(id, {
// // //       include: [
// // //         { model: BienTheModel, as: "bien_the" },
// // //         { model: HinhModel, as: "hinh_anh" },
// // //       ]
// // //     });

// // //     if (!sp) {
// // //       return NextResponse.json({ success: false, message: "Không tìm thấy sản phẩm" }, { status: 404 });
// // //     }

// // //     return NextResponse.json({ success: true, data: sp });

// // //   } catch (error) {
// // //     return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
// // //   }
// // // }


// // // // ===== UPDATE SAN PHAM =====
// // // export async function PUT(req: Request, { params }: { params: { id: string } }) {
// // //   try {
// // //     const id = Number(params.id);
// // //     const form = await req.formData();

// // //     const sp = await SanPhamModel.findByPk(id);
// // //     if (!sp) return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" });

// // //     await sp.update({
// // //       ten: String(form.get("ten")),
// // //       slug: String(form.get("slug")),
// // //       mo_ta: String(form.get("mo_ta") || ""),
// // //       gia_goc: Number(form.get("gia_goc") || 0),
// // //       tag: String(form.get("tag") || ""),
// // //       phong_cach: String(form.get("phong_cach") || ""),
// // //       luot_xem: Number(form.get("luot_xem") || 0),
// // //       trang_thai: String(form.get("trang_thai") || "inactive"),
// // //       an_hien: form.get("an_hien") === "true",
// // //       id_danh_muc: Number(form.get("id_danh_muc") || 0),
// // //     });

// // //     // Hình chính
// // //     const mainImg = form.get("hinh_chinh");
// // //     if (mainImg instanceof File && mainImg.size > 0) {
// // //       const imgBase64 = await fileToBase64(mainImg);
// // //       await sp.update({ hinh: imgBase64 });
// // //     }

// // //     // Hình phụ
// // //     const extraImages = form.getAll("hinh_phu");
// // //     for (const f of extraImages) {
// // //       if (f instanceof File && f.size > 0) {
// // //         await HinhModel.create({
// // //           id_san_pham: id,
// // //           hinh: await fileToBase64(f),
// // //           thu_tu: 0,
// // //         });
// // //       }
// // //     }

// // //     // Cập nhật biến thể
// // //     const variants = JSON.parse(String(form.get("bien_the") || "[]")) as IBienThe[];

// // //     await BienTheModel.destroy({ where: { id_san_pham: id } });

// // //     for (const v of variants) {
// // //       await BienTheModel.create({
// // //         id_san_pham: id,
// // //         ten: v.ten,
// // //         gia_them: v.gia_them || 0,
// // //         trang_thai: v.trang_thai ? 1 : 0,
// // //       });
// // //     }

// // //     return NextResponse.json({ success: true });

// // //   } catch {
// // //     return NextResponse.json({ success: false, message: "Lỗi cập nhật" }, { status: 500 });
// // //   }
// // // }
// // import { NextResponse } from "next/server";
// // import { SanPhamModel, BienTheModel, HinhModel } from "@/app/lib/models";
// // import { IBienThe } from "@/app/lib/cautrucdata";

// // // Convert Blob → Base64
// // async function fileToBase64(file: Blob): Promise<string> {
// //   const buffer = Buffer.from(await file.arrayBuffer());
// //   return `data:${(file as any).type};base64,${buffer.toString("base64")}`;
// // }

// // // ===== GET SAN PHAM =====
// // export async function GET(_req: Request, { params }: { params: { id: string } }) {
// //   try {
// //     const id = Number(params.id);
// //     if (isNaN(id)) return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });

// //     const sp = await SanPhamModel.findByPk(id, {
// //       include: [
// //         { model: BienTheModel, as: "bien_the" },
// //         { model: HinhModel, as: "hinh_anh" },
// //       ]
// //     });

// //     if (!sp) return NextResponse.json({ success: false, message: "Không tìm thấy sản phẩm" }, { status: 404 });

// //     return NextResponse.json({ success: true, data: sp });
// //   } catch (error) {
// //     console.error("GET /api/san_pham error:", error);
// //     return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
// //   }
// // }

// // // ===== UPDATE SAN PHAM =====
// // export async function PUT(req: Request, { params }: { params: { id: string } }) {
// //   try {
// //     const id = Number(params.id);
// //     if (isNaN(id)) return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });

// //     const form = await req.formData();
// //     const sp = await SanPhamModel.findByPk(id);
// //     if (!sp) return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" });

// //     // Cập nhật thông tin sản phẩm
// //     await sp.update({
// //       ten: String(form.get("ten") || sp.ten),
// //       slug: String(form.get("slug") || sp.slug),
// //       mo_ta: String(form.get("mo_ta") || ""),
// //       gia_goc: Number(form.get("gia_goc") || 0),
// //       tag: String(form.get("tag") || ""),
// //       phong_cach: String(form.get("phong_cach") || ""),
// //       luot_xem: Number(form.get("luot_xem") || 0),
// //       trang_thai: String(form.get("trang_thai") || "inactive"),
// //       an_hien: form.get("an_hien") === "true" || form.get("an_hien") === "1",
// //       id_danh_muc: Number(form.get("id_danh_muc") || 0),
// //     });

// //     // Hình chính
// //     const mainImg = form.get("hinh_chinh") as Blob | null;
// //     if (mainImg && mainImg.size > 0) {
// //       const imgBase64 = await fileToBase64(mainImg);
// //       await sp.update({ hinh: imgBase64 });
// //     }

// //     // Hình phụ
// //     const extraImages = form.getAll("hinh_phu") as Blob[];
// //     for (const f of extraImages) {
// //       if (f && f.size > 0) {
// //         await HinhModel.create({
// //           id_san_pham: id,
// //           hinh: await fileToBase64(f),
// //           thu_tu: 0,
// //         });
// //       }
// //     }

// //     // Biến thể
// //     const variants = JSON.parse(String(form.get("bien_the") || "[]")) as IBienThe[];
// //     await BienTheModel.destroy({ where: { id_san_pham: id } });
// //     for (const v of variants) {
// //       await BienTheModel.create({
// //         id_san_pham: id,
// //         ten: v.ten,
// //         gia_them: v.gia_them || 0,
// //         trang_thai: v.trang_thai ? 1 : 0,
// //       });
// //     }

// //     return NextResponse.json({ success: true });
// //   } catch (error) {
// //     console.error("PUT /api/san_pham error:", error);
// //     return NextResponse.json({ success: false, message: "Lỗi cập nhật" }, { status: 500 });
// //   }
// // }
// import { NextResponse } from "next/server";
// import { SanPhamModel, BienTheModel, HinhModel } from "@/app/lib/models";
// import { IBienThe } from "@/app/lib/cautrucdata";

// // Convert file → Base64
// async function fileToBase64(file: File): Promise<string> {
//   const buffer = Buffer.from(await file.arrayBuffer());
//   return `data:${file.type};base64,${buffer.toString("base64")}`;
// }

// // ===== GET SAN PHAM =====
// export async function GET(_req: Request, { params }: { params: { id: string } }) {
//   try {
//     const id = Number(params.id);
//     if (isNaN(id)) {
//       return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });
//     }

//     const sp = await SanPhamModel.findByPk(id, {
//       include: [
//         { model: BienTheModel, as: "bien_the" },
//         { model: HinhModel, as: "hinh_anh" },
//       ],
//     });

//     if (!sp) return NextResponse.json({ success: false, message: "Không tìm thấy sản phẩm" }, { status: 404 });

//     // Lấy dữ liệu ra object
//     const data = {
//       id: sp.get("id"),
//       ten: sp.get("ten"),
//       slug: sp.get("slug"),
//       mo_ta: sp.get("mo_ta"),
//       gia_goc: sp.get("gia_goc"),
//       tag: sp.get("tag"),
//       phong_cach: sp.get("phong_cach"),
//       luot_xem: sp.get("luot_xem"),
//       trang_thai: sp.get("trang_thai"),
//       an_hien: sp.get("an_hien"),
//       id_danh_muc: sp.get("id_danh_muc"),
//       hinh: sp.get("hinh"),
//       bien_the: sp.get("bien_the"),
//       hinh_anh: sp.get("hinh_anh"),
//     };

//     return NextResponse.json({ success: true, data });

//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
//   }
// }

// // ===== UPDATE SAN PHAM =====
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//   try {
//     const id = Number(params.id);
//     const form = await req.formData();

//     const sp = await SanPhamModel.findByPk(id);
//     if (!sp) return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" });

//     // Cập nhật các trường chính
//     sp.set({
//       ten: String(form.get("ten") || ""),
//       slug: String(form.get("slug") || ""),
//       mo_ta: String(form.get("mo_ta") || ""),
//       gia_goc: Number(form.get("gia_goc") || 0),
//       tag: String(form.get("tag") || ""),
//       phong_cach: String(form.get("phong_cach") || ""),
//       luot_xem: Number(form.get("luot_xem") || 0),
//       trang_thai: String(form.get("trang_thai") || "inactive"),
//       an_hien: form.get("an_hien") === "true",
//       id_danh_muc: Number(form.get("id_danh_muc") || 0),
//     });

//     await sp.save();

//     // Hình chính
//     const mainImg = form.get("hinh_chinh");
//     if (mainImg instanceof File && mainImg.size > 0) {
//       const imgBase64 = await fileToBase64(mainImg);
//       sp.set({ hinh: imgBase64 });
//       await sp.save();
//     }

//     // Hình phụ
//     const extraImages = form.getAll("hinh_phu");
//     for (const f of extraImages) {
//       if (f instanceof File && f.size > 0) {
//         await HinhModel.create({
//           id_san_pham: id,
//           hinh: await fileToBase64(f),
//           thu_tu: 0,
//         });
//       }
//     }

//     // Biến thể
//     const variants = JSON.parse(String(form.get("bien_the") || "[]")) as IBienThe[];
//     await BienTheModel.destroy({ where: { id_san_pham: id } });
//     for (const v of variants) {
//       await BienTheModel.create({
//         id_san_pham: id,
//         ten: v.ten,
//         gia_them: v.gia_them || 0,
//         trang_thai: v.trang_thai ? 1 : 0,
//       });
//     }

//     return NextResponse.json({ success: true });

//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ success: false, message: "Lỗi cập nhật" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { SanPhamModel, BienTheModel, HinhModel } from "@/app/lib/models";
import { IBienThe } from "@/app/lib/cautrucdata";

// Convert file → Base64
async function fileToBase64(file: File): Promise<string> {
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

// ===================== GET =====================
export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // <-- lấy params đúng chuẩn Next.js 15

    const numId = Number(id);
    if (isNaN(numId)) {
      return NextResponse.json(
        { success: false, message: "ID không hợp lệ" },
        { status: 400 }
      );
    }

    const sp = await SanPhamModel.findByPk(numId, {
      include: [
        { model: BienTheModel, as: "bien_the" },
        { model: HinhModel, as: "hinh_anh" },
      ],
    });

    if (!sp)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy sản phẩm" },
        { status: 404 }
      );

    const data = {
      id: sp.get("id"),
      ten: sp.get("ten"),
      slug: sp.get("slug"),
      mo_ta: sp.get("mo_ta"),
      gia_goc: sp.get("gia_goc"),
      tag: sp.get("tag"),
      phong_cach: sp.get("phong_cach"),
      luot_xem: sp.get("luot_xem"),
      trang_thai: sp.get("trang_thai"),
      an_hien: sp.get("an_hien"),
      id_danh_muc: sp.get("id_danh_muc"),
      hinh: sp.get("hinh"),
      bien_the: sp.get("bien_the"),
      hinh_anh: sp.get("hinh_anh"),
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("❌ GET sản phẩm lỗi:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const numId = Number(id);
    if (isNaN(numId))
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });

    const form = await req.formData();
    const sp = await SanPhamModel.findByPk(numId);
    if (!sp) return NextResponse.json({ success: false, message: "Sản phẩm không tồn tại" });

    // Update các field cơ bản + hình (sử dụng sp.set)
    const mainImg = form.get("hinh_chinh");
    let hinhStr = sp.get("hinh") as string; // giữ hình cũ nếu không gửi hình mới
    if (mainImg instanceof File && mainImg.size > 0) {
      hinhStr = await fileToBase64(mainImg);
    }

    sp.set({
      ten: String(form.get("ten") || ""),
      slug: String(form.get("slug") || ""),
      mo_ta: String(form.get("mo_ta") || ""),
      gia_goc: Number(form.get("gia_goc") || 0),
      tag: String(form.get("tag") || ""),
      phong_cach: String(form.get("phong_cach") || ""),
      luot_xem: Number(form.get("luot_xem") || 0),
      trang_thai: String(form.get("trang_thai") || "inactive"),
      an_hien: form.get("an_hien") === "true",
      id_danh_muc: Number(form.get("id_danh_muc") || 0),
      hinh: hinhStr, // update hình chính
    });
    await sp.save();

    // Hình phụ
    const extraImages = form.getAll("hinh_phu");
    for (const f of extraImages) {
      if (f instanceof File && f.size > 0) {
        await HinhModel.create({
          id_san_pham: numId,
          hinh: await fileToBase64(f),
          thu_tu: 0,
        });
      }
    }

    // Biến thể
    const variants: IBienThe[] = JSON.parse(String(form.get("bien_the") || "[]"));
    for (const v of variants) {
      if (v.id) {
        await BienTheModel.update(
          { ten: v.ten, gia_them: v.gia_them || 0, trang_thai: v.trang_thai ? 1 : 0 },
          { where: { id: v.id } }
        );
      } else {
        await BienTheModel.create({
          id_san_pham: numId,
          ten: v.ten,
          gia_them: v.gia_them || 0,
          trang_thai: v.trang_thai ? 1 : 0,
        });
      }
    }

    return NextResponse.json({ success: true, message: "Cập nhật sản phẩm thành công" });
  } catch (error) {
    console.error("❌ PUT sản phẩm lỗi:", error);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
