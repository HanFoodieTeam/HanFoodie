
import { NextResponse, NextRequest } from "next/server";
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

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; 
  try {
  
    const body = await request.json();

    const het_mon_update =
      body.het_mon === true ? new Date() : body.co_lai_mon === true ? null : undefined;

    const updated = await SanPhamModel.update(
      {
        an_hien: body.an_hien,
        het_mon: het_mon_update,
      },
      { where: { id } }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("PATCH ERROR:", err);
    return NextResponse.json({ success: false }, { status: 500 });
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

    const oldImages = form.getAll("hinh_phu_old").map((v) => String(v));

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

    // ---------------------------------------------------
    // 4️⃣ BIẾN THỂ
    // ---------------------------------------------------
    const raw = form.get("bien_the");

    let bienTheList: IBienTheInput[] = [];
    if (typeof raw === "string") {
      bienTheList = JSON.parse(raw) as IBienTheInput[];
    }

    const idsClient = bienTheList
      .map((bt) => bt.id)
      .filter((id): id is number => typeof id === "number");

    await BienTheModel.destroy({
      where: {
        id_san_pham: productId,
        id: {
          [Op.notIn]: idsClient.length ? idsClient : [0],
        },
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