import { NextRequest, NextResponse } from "next/server";
import {
  DanhMucModel,
  DanhMucLoaiTuyChonModel,
  DanhMucMonThemModel,
} from "@/lib/models";
import { v2 as cloudinary } from "cloudinary";

// ================= Cloudinary =================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ================= Utils =================
const toNumber = (id: string) => {
  const n = Number(id);
  return Number.isNaN(n) ? null : n;
};

const parseIds = (raw: FormDataEntryValue | null): number[] => {
  if (!raw || typeof raw !== "string") return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr)
      ? arr.map(Number).filter((n) => !Number.isNaN(n))
      : [];
  } catch {
    return [];
  }
};

const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "danh_muc" }, (err, result) => {
        if (err || !result) reject(err);
        else resolve(result.secure_url);
      })
      .end(buffer);
  });
};

// ====================== GET ======================
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = toNumber(id);
    if (!numericId)
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });

    const dm = await DanhMucModel.findByPk(numericId, {
      include: [
        { model: DanhMucLoaiTuyChonModel, as: "loai_tuy_chon_map", attributes: ["id_loai_tuy_chon"] },
        { model: DanhMucMonThemModel, as: "mon_them_map", attributes: ["id_mon_them"] },
      ],
    });

    if (!dm)
      return NextResponse.json({ success: false, message: "Không tìm thấy danh mục" }, { status: 404 });

    const raw = dm.toJSON() as any;

    return NextResponse.json({
      success: true,
      data: {
        id: raw.id,
        ten: raw.ten,
        slug: raw.slug,
        hinh: raw.hinh,
        thu_tu: raw.thu_tu,
        so_san_pham: raw.so_san_pham ?? 0,
        an_hien: Boolean(raw.an_hien),
        loai_tuy_chon_ids: raw.loai_tuy_chon_map?.map((i: { id_loai_tuy_chon: number }) => i.id_loai_tuy_chon) ?? [],
        mon_them_ids: raw.mon_them_map?.map((i: { id_mon_them: number }) => i.id_mon_them) ?? [],
      },
    });
  } catch (err) {
    console.error("GET danh_muc error:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ====================== PUT ======================
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = toNumber(id);
    if (!numericId)
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });

    const dm = await DanhMucModel.findByPk(numericId);
    if (!dm)
      return NextResponse.json({ success: false, message: "Không tìm thấy danh mục" }, { status: 404 });

    const form = await req.formData();
    const ten = form.get("ten");
    if (typeof ten !== "string" || !ten.trim())
      return NextResponse.json({ success: false, message: "Tên danh mục không hợp lệ" }, { status: 400 });

    const an_hien = form.get("an_hien") === "1";
    const loai_tuy_chon_ids = parseIds(form.get("loai_tuy_chon_ids"));
    const mon_them_ids = parseIds(form.get("mon_them_ids"));

    let finalImage = dm.getDataValue("hinh") as string | null;
    const file = form.get("hinh");
    if (file instanceof File && file.size > 0) finalImage = await uploadToCloudinary(file);

    await dm.update({
      ten,
      slug: typeof form.get("slug") === "string" ? form.get("slug") : null,
      thu_tu: Number(form.get("thu_tu")) || 0,
      so_san_pham: Number(form.get("so_san_pham")) || 0,
      an_hien: an_hien ? 1 : 0,
      hinh: finalImage,
    });

    await DanhMucLoaiTuyChonModel.destroy({ where: { id_danh_muc: numericId } });
    if (loai_tuy_chon_ids.length)
      await DanhMucLoaiTuyChonModel.bulkCreate(
        loai_tuy_chon_ids.map((id) => ({ id_danh_muc: numericId, id_loai_tuy_chon: id }))
      );

    await DanhMucMonThemModel.destroy({ where: { id_danh_muc: numericId } });
    if (mon_them_ids.length)
      await DanhMucMonThemModel.bulkCreate(
        mon_them_ids.map((id) => ({ id_danh_muc: numericId, id_mon_them: id }))
      );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("PUT danh_muc error:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

// ====================== PATCH ======================
// Chỉ toggle an_hien
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = toNumber(id);
    if (!numericId)
      return NextResponse.json({ success: false, message: "ID không hợp lệ" }, { status: 400 });

    const body = await req.json();
    if (typeof body.an_hien !== "boolean")
      return NextResponse.json({ success: false, message: "an_hien phải là boolean" }, { status: 400 });

    const dm = await DanhMucModel.findByPk(numericId);
    if (!dm)
      return NextResponse.json({ success: false, message: "Không tìm thấy danh mục" }, { status: 404 });

    await dm.update({ an_hien: body.an_hien ? 1 : 0 });

    return NextResponse.json({
      success: true,
      data: {
        id: dm.getDataValue("id"),
        an_hien: Boolean(dm.getDataValue("an_hien")),
      },
    });
  } catch (err) {
    console.error("PATCH danh_muc error:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
