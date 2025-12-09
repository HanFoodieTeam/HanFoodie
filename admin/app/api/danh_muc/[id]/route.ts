// File: app/api/danh_muc/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { DanhMucModel } from "@/app/lib/models";
import { IDanhMuc } from "@/app/lib/cautrucdata";
import { UploadApiResponse, UploadApiErrorResponse, v2 as cloudinary } from "cloudinary";

// ====================== Cloudinary Config ======================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ====================== Kiểu dữ liệu DB Raw ======================
interface RawDanhMuc extends Omit<IDanhMuc, "an_hien"> {
  an_hien: number | boolean | null;
}

// ====================== Body PUT ======================
interface UpdateDanhMucFields {
  ten: string;
  slug?: string;
  thu_tu?: number;
  so_san_pham?: number;
  an_hien: boolean;
  hinh?: string | null;
}

// ====================== Body PATCH ======================
interface PatchDanhMucBody {
  an_hien: boolean;
}

// ====================== UPLOAD CLOUDINARY ======================
async function uploadToCloudinary(
  file: File
): Promise<UploadApiResponse | UploadApiErrorResponse> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "danh_muc" }, (err, result) => {
        if (err || !result) reject(err);
        else resolve(result);
      })
      .end(buffer);
  });
}

// ====================== Format dữ liệu ======================
function formatDanhMuc(raw: RawDanhMuc): IDanhMuc {
  return {
    id: raw.id,
    ten: raw.ten,
    slug: raw.slug,
    hinh: raw.hinh,
    thu_tu: raw.thu_tu,
    so_san_pham: raw.so_san_pham,
    an_hien: Boolean(raw.an_hien),
  };
}

// ====================== GET ======================
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (isNaN(numericId))
      return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const dm = await DanhMucModel.findByPk(numericId);
    if (!dm)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      data: formatDanhMuc(dm.toJSON() as RawDanhMuc),
    });
  } catch (err) {
    console.error("GET danh_muc lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}

// ====================== PUT ======================
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (isNaN(numericId))
      return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const dm = await DanhMucModel.findByPk(numericId);
    if (!dm)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục" },
        { status: 404 }
      );

    const form = await req.formData();

    const ten = form.get("ten");
    if (typeof ten !== "string")
      return NextResponse.json(
        { success: false, message: "Thiếu tên danh mục" },
        { status: 400 }
      );

    const fields: UpdateDanhMucFields = {
      ten,
      slug: typeof form.get("slug") === "string" ? String(form.get("slug")) : undefined,
      thu_tu: typeof form.get("thu_tu") === "string" ? Number(form.get("thu_tu")) : undefined,
      so_san_pham: typeof form.get("so_san_pham") === "string" ? Number(form.get("so_san_pham")) : undefined,
      an_hien: form.get("an_hien") === "1",
    };

    let finalImage = dm.getDataValue("hinh") as string | null;

    // Nếu có file → upload Cloudinary
    const file = form.get("hinh");
    if (file instanceof File && file.size > 0) {
      const uploadResult = await uploadToCloudinary(file);

      if ("secure_url" in uploadResult) {
        finalImage = uploadResult.secure_url;
      }
    }

    await dm.update({
      ...fields,
      hinh: finalImage,
      an_hien: fields.an_hien ? 1 : 0,
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật thành công",
      data: formatDanhMuc(dm.toJSON() as RawDanhMuc),
    });
  } catch (err) {
    console.error("PUT danh_muc lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}

// ====================== PATCH ======================
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (isNaN(numericId))
      return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const body = (await req.json()) as PatchDanhMucBody;

    if (typeof body.an_hien !== "boolean")
      return NextResponse.json(
        { success: false, message: "an_hien phải là boolean" },
        { status: 400 }
      );

    const dm = await DanhMucModel.findByPk(numericId);
    if (!dm)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục" },
        { status: 404 }
      );

    await dm.update({ an_hien: body.an_hien ? 1 : 0 });

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: { id: numericId, an_hien: body.an_hien },
    });
  } catch (err) {
    console.error("PATCH danh_muc lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}

// ====================== DELETE ======================
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (isNaN(numericId))
      return NextResponse.json({ success: false, message: "ID không hợp lệ" });

    const dm = await DanhMucModel.findByPk(numericId);
    if (!dm)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục" },
        { status: 404 }
      );

    await dm.destroy();

    return NextResponse.json({
      success: true,
      message: "Xóa danh mục thành công",
    });
  } catch (err) {
    console.error("DELETE danh_muc lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}
