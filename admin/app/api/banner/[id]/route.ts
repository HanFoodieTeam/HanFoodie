import { BannerModel } from "@/app/lib/models";
import { NextRequest, NextResponse } from "next/server";


import { v2 as cloudinary } from "cloudinary";
import { link } from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});



interface RouteParams {
  id: string;
}


export async function GET(
  _req: Request,
  context: { params: Promise<RouteParams> }
) {
  try {
    const { id } = await context.params;   
    const bannerId = Number(id);

    if (isNaN(bannerId)) {
      return NextResponse.json(
        { success: false, message: "ID không hợp lệ" },
        { status: 400 }
      );
    }

    const banner = await BannerModel.findOne({
      where: { id: bannerId },
      raw: true,
    });

    if (!banner) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy banner" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: banner,
    });
  } catch (err) {
    console.error("Lỗi API banner:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<RouteParams> }
) {
  try {
    const { id } = await context.params;
    const bannerId = Number(id);

    if (isNaN(bannerId)) {
      return NextResponse.json(
        { success: false, message: "ID không hợp lệ" },
        { status: 400 }
      );
    }

    const oldBanner = await BannerModel.findOne({ where: { id: bannerId } });

    if (!oldBanner) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy banner" },
        { status: 404 }
      );
    }

    const form = await req.formData();
    const link = (form.get("link") || "").toString();
    const mo_ta = (form.get("mo_ta") || "").toString();
    const thu_tu = (form.get("thu_tu") || "1").toString();
    const loai = Number(form.get("loai") || 0);
    const an_hien = Number(form.get("an_hien") || 0);
    const file = form.get("hinh");

    let hinhUrl: string = oldBanner.getDataValue("hinh"); 

    // Nếu có hình mới → upload Cloudinary
    if (file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const upload = await cloudinary.uploader.upload(base64, {
        folder: "banner",
      });

      hinhUrl = upload.secure_url;
    }

    await BannerModel.update(
      {
        link,
        mo_ta,
        thu_tu,
        loai,
        an_hien,
        hinh: hinhUrl, 
      },
      { where: { id: bannerId } }
    );

    return NextResponse.json({
      success: true,
      message: "Cập nhật banner thành công!",
    });
  } catch (error) {
    console.error("POST /api/banner/[id] error:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi cập nhật banner" },
      { status: 500 }
    );
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { an_hien } = await req.json();

    const mgg = await BannerModel.findByPk(id);
    if (!mgg)
      return NextResponse.json(
        { message: "Không tìm thấy mã giảm giá" },
        { status: 404 }
      );

    await mgg.update({ an_hien });
    return NextResponse.json({ message: "Cập nhật thành công", an_hien });
  } catch (err) {
    console.error("PATCH lỗi:", err);
    return NextResponse.json(
      { error: "Lỗi khi cập nhật trạng thái" },
      { status: 500 }
    );
  }
}


