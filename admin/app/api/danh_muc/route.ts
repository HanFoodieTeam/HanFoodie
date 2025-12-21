import { NextRequest, NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";
import {
  DanhMucModel,
  DanhMucLoaiTuyChonModel,
  DanhMucMonThemModel,
  LoaiTuyChonModel,
  MonThemModel,
} from "@/lib/models";
import { IDanhMuc, ILoaiTuyChon, IMonThem } from "@/lib/cautrucdata";
import cloudinaryPkg from "cloudinary";
import { Buffer } from "buffer";

// ================= CLOUDINARY =================
const cloudinary = cloudinaryPkg.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

// ================= HELPER =================
const uploadImage = async (file: File): Promise<string> => {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "danh_muc",
        resource_type: "image",
      },
      (err, result) => {
        if (err || !result) {
          reject(err);
        } else {
          resolve(result.secure_url);
        }
      }
    ).end(buffer);
  });
};

// ================= GET =================
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    const limit = Number(url.searchParams.get("limit") ?? "7");
    const offset = (page - 1) * limit;
    const search = url.searchParams.get("search") ?? "";

    const where: WhereOptions = {};
    if (search) where["ten"] = { [Op.like]: `%${search}%` };

    const { count, rows } = await DanhMucModel.findAndCountAll({
      where,
      order: [["thu_tu", "ASC"]],
      limit,
      offset,
    });

    const danhMucIds = rows.map((r) => r.getDataValue("id"));

    // Loại tuỳ chọn
    const loaiMaps = await DanhMucLoaiTuyChonModel.findAll({
      where: { id_danh_muc: danhMucIds },
    });

    const loaiIds = loaiMaps.map((m) => m.getDataValue("id_loai_tuy_chon"));
    const loaiList = loaiIds.length
      ? await LoaiTuyChonModel.findAll({ where: { id: loaiIds } })
      : [];

    const loaiByDanhMuc: Record<number, ILoaiTuyChon[]> = {};
    loaiMaps.forEach((m) => {
      const dmId = m.getDataValue("id_danh_muc");
      const loai = loaiList.find(
        (l) => l.getDataValue("id") === m.getDataValue("id_loai_tuy_chon")
      );
      if (!loai) return;
      loaiByDanhMuc[dmId] ??= [];
      loaiByDanhMuc[dmId].push(loai.toJSON() as ILoaiTuyChon);
    });

    // Món thêm
    const monMaps = await DanhMucMonThemModel.findAll({
      where: { id_danh_muc: danhMucIds },
    });

    const monIds = monMaps.map((m) => m.getDataValue("id_mon_them"));
    const monList = monIds.length
      ? await MonThemModel.findAll({ where: { id: monIds } })
      : [];

    const monByDanhMuc: Record<number, IMonThem[]> = {};
    monMaps.forEach((m) => {
      const dmId = m.getDataValue("id_danh_muc");
      const mon = monList.find(
        (x) => x.getDataValue("id") === m.getDataValue("id_mon_them")
      );
      if (!mon) return;
      monByDanhMuc[dmId] ??= [];
      monByDanhMuc[dmId].push(mon.toJSON() as IMonThem);
    });

    const data: IDanhMuc[] = rows.map((row) => {
      const raw = row.toJSON() as IDanhMuc & { an_hien: number | boolean };
      return {
        ...raw,
        an_hien: Boolean(raw.an_hien),
        loai_tuy_chon: loaiByDanhMuc[raw.id] ?? [],
        mon_them: monByDanhMuc[raw.id] ?? [],
      };
    });

    return NextResponse.json({
      success: true,
      data,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error("GET danh_muc error:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy danh mục" },
      { status: 500 }
    );
  }
}

// ================= POST =================
export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const ten = form.get("ten") as string | null;
    if (!ten)
      return NextResponse.json(
        { success: false, message: "Tên danh mục không được trống" },
        { status: 400 }
      );

    const slug = (form.get("slug") as string) ?? "";
    const thu_tu = Number(form.get("thu_tu") ?? 0);
    const so_san_pham = Number(form.get("so_san_pham") ?? 0);
    const an_hien = form.get("an_hien") === "1";
    const file = form.get("hinh") as File | null;

    let hinh: string | null = null;
    if (file && file.size > 0) {
      hinh = await uploadImage(file); // ✅ KHÔNG TIMEOUT
    }

    const dm = await DanhMucModel.create({
      ten,
      slug,
      thu_tu,
      so_san_pham,
      an_hien: an_hien ? 1 : 0,
      hinh,
    });

    const danhMucId = dm.getDataValue("id");

    const loaiRaw = form.get("loai_tuy_chon_ids");
    if (typeof loaiRaw === "string") {
      const ids: number[] = JSON.parse(loaiRaw);
      await DanhMucLoaiTuyChonModel.bulkCreate(
        ids.map((id) => ({
          id_danh_muc: danhMucId,
          id_loai_tuy_chon: id,
        }))
      );
    }

    const monRaw = form.get("mon_them_ids");
    if (typeof monRaw === "string") {
      const ids: number[] = JSON.parse(monRaw);
      await DanhMucMonThemModel.bulkCreate(
        ids.map((id) => ({
          id_danh_muc: danhMucId,
          id_mon_them: id,
        }))
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thêm danh mục thành công",
    });
  } catch (err) {
    console.error("POST danh_muc error:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi thêm danh mục" },
      { status: 500 }
    );
  }
}
