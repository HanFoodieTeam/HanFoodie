import { NextRequest, NextResponse } from "next/server";
import { BannerModel, MaGiamGiaModel } from "@/lib/models";
import { IBanner, ICloudinaryUpload } from "@/lib/cautrucdata";

export async function GET(req?: Request) {
  try {
    const rows = await BannerModel.findAll({
      order: [["id", "desc"]],
      raw: true,
    });

    return NextResponse.json({
      data: rows,
      total: rows.length,
    });
  } catch (error) {
    console.error("Lỗi API GET /api/banner:", error);
    return NextResponse.json({ data: [], total: 0 }, { status: 500 });
  }
}




import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});


export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const hinhFile = form.get("hinh");

    if (!(hinhFile instanceof File)) {
      return NextResponse.json(
        { success: false, message: "Bạn chưa chọn hình banner" },
        { status: 400 }
      );
    }

    // Convert file → Base64 để upload
    const buffer = Buffer.from(await hinhFile.arrayBuffer());
    const base64 = `data:${hinhFile.type};base64,${buffer.toString("base64")}`;

    const upload = await cloudinary.uploader.upload(base64, {
      folder: "banner",
    });

    const hinhUrl = upload.secure_url;

    const newBanner = await BannerModel.create({
      hinh: hinhUrl,
      mo_ta: form.get("mo_ta")?.toString() ?? "",
      link: form.get("link")?.toString() ?? "",
      thu_tu: form.get("thu_tu")?.toString() ?? "1",
      loai: form.get("loai") === "1" ? 1 : 0,  
      an_hien: form.get("an_hien") === "1" ? 1 : 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thêm banner thành công",
        data: newBanner,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Lỗi không xác định";

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}