// File: app/api/danh_muc/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";
import { DanhMucModel } from "@/lib/models";
import { IDanhMuc } from "@/lib/cautrucdata";
import { Buffer } from "buffer";
import { UploadApiResponse, UploadApiErrorResponse, v2 as cloudinary } from "cloudinary";

// Khởi tạo Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Loại bỏ any bằng kiểu JSON của Sequelize
interface DanhMucRaw extends Omit<IDanhMuc, "an_hien"> {
  an_hien: number | boolean;
}

// ========================= GET =========================
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    const page = Number(params.get("page") || 1);
    const limit = Number(params.get("limit") || 7);
    const offset = (page - 1) * limit;

    const search = params.get("search") || "";
    const an_hien = params.get("an_hien");

    const where: WhereOptions = {};

    if (search) {
      where["ten"] = { [Op.like]: `%${search}%` };
    }

    if (an_hien === "0" || an_hien === "1") {
      where["an_hien"] = Number(an_hien);
    }

    const { count, rows } = await DanhMucModel.findAndCountAll({
      where,
      order: [["thu_tu", "ASC"]],
      limit,
      offset,
    });

    const data: IDanhMuc[] = rows.map((row) => {
      const raw = row.toJSON() as DanhMucRaw;
      return { ...raw, an_hien: Boolean(raw.an_hien) };
    });

    return NextResponse.json({
      success: true,
      data,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Lỗi GET danh mục:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy danh sách danh mục" },
      { status: 500 }
    );
  }
}

// ========================= CLOUDINARY UPLOAD =========================
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

// ========================= POST =========================
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const form = await req.formData();

    const ten = form.get("ten") as string | null;
    const slug = (form.get("slug") as string) || "";
    const thu_tu = Number(form.get("thu_tu") || 0);
    const so_san_pham = Number(form.get("so_san_pham") || 0);
    const an_hien = form.get("an_hien") === "1";

    const file = form.get("hinh") as File | null;

    if (!ten) {
      return NextResponse.json(
        { success: false, message: "Tên danh mục không được để trống" },
        { status: 400 }
      );
    }

    let imageUrl: string | null = null;

    // Nếu có ảnh → upload Cloudinary
    if (file && file.size > 0) {
      const uploadResult = await uploadToCloudinary(file);
      if ("secure_url" in uploadResult) {
        imageUrl = uploadResult.secure_url;
      }
    }

    // Lưu vào DB
    const newItem = await DanhMucModel.create({
      ten,
      slug,
      thu_tu,
      so_san_pham,
      an_hien: an_hien ? 1 : 0,
      hinh: imageUrl,
    });

    const created: IDanhMuc = {
      id: newItem.getDataValue("id"),
      ten,
      slug,
      thu_tu,
      so_san_pham,
      hinh: imageUrl,
      an_hien,
    };

    return NextResponse.json({
      success: true,
      message: "Thêm danh mục thành công",
      data: created,
    });
  } catch (error) {
    console.error("Lỗi POST danh mục:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi thêm danh mục" },
      { status: 500 }
    );
  }
}
