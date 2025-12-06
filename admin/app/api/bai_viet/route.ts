// File: app/api/bai_viet/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";
import { BaiVietModel } from "@/app/lib/models";
import { IBaiViet } from "@/app/lib/cautrucdata";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// ========================= GET =========================
export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);

    const page = Number(url.searchParams.get("page") ?? "1");
    const limit = Number(url.searchParams.get("limit") ?? "6");
    const offset = (page - 1) * limit;

    const search = url.searchParams.get("search") ?? "";
    const an_hien = url.searchParams.get("an_hien") ?? "";

    const where: WhereOptions = {};

    if (search) {
      where["tieu_de"] = { [Op.like]: `%${search}%` };
    }

    if (an_hien === "0" || an_hien === "1") {
      where["an_hien"] = Number(an_hien);
    }

    const { count, rows } = await BaiVietModel.findAndCountAll({
      where,
      order: [["ngay_dang", "DESC"]],
      limit,
      offset,
    });

    const data: IBaiViet[] = rows.map((row) => {
      const raw = row.toJSON() as IBaiViet;

      return {
        ...raw,
        an_hien: Boolean(raw.an_hien),
        ngay_dang: raw.ngay_dang
          ? new Date(raw.ngay_dang).toISOString()
          : null,
      };
    });

    return NextResponse.json({
      success: true,
      data,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Lỗi GET danh sách bài viết:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy danh sách bài viết" },
      { status: 500 }
    );
  }
}

// ========================= POST =========================
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const form = await req.formData();

    const tieu_de = form.get("tieu_de") as string | null;
    const noi_dung = form.get("noi_dung") as string | null;
    const id_loai_bv_raw = form.get("id_loai_bv") as string | null;
    const slug = form.get("slug") as string | null;
    const an_hien_raw = form.get("an_hien") as string | null;
    const ngay_dang_raw = form.get("ngay_dang") as string | null;

    const file = form.get("hinh") as File | null;

    if (!tieu_de || !noi_dung || !id_loai_bv_raw) {
      return NextResponse.json(
        { success: false, message: "Thiếu tiêu đề, nội dung hoặc loại bài viết" },
        { status: 400 }
      );
    }

    const id_loai_bv = Number(id_loai_bv_raw);
    const an_hien = an_hien_raw === "1";

    const ngay_dang = ngay_dang_raw
      ? new Date(`${ngay_dang_raw}T00:00:00`)
      : new Date();

    let filePath: string | null = null;

    // ========================= Lưu file upload =========================
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = uuidv4() + "-" + file.name.replace(/\s+/g, "_");

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const fullPath = path.join(uploadDir, filename);

      await mkdir(uploadDir, { recursive: true });
      await writeFile(fullPath, buffer);

      filePath = "/uploads/" + filename;
    }

    // ========================= Lưu DB =========================
    const newItem = await BaiVietModel.create({
      tieu_de,
      noi_dung,
      hinh: filePath,
      id_loai_bv,
      luot_xem: 0,
      slug: slug ?? "",
      ngay_dang,
      an_hien: an_hien ? 1 : 0,
    });

    const rawDate = newItem.getDataValue("ngay_dang");

    const created: IBaiViet = {
      id: newItem.getDataValue("id"),
      tieu_de,
      noi_dung,
      hinh: filePath,
      id_loai_bv,
      luot_xem: 0,
      slug: slug ?? "",
      ngay_dang:
        rawDate instanceof Date ? rawDate.toISOString() : String(rawDate),
      an_hien,
    };

    return NextResponse.json({
      success: true,
      message: "Thêm bài viết thành công",
      data: created,
    });
  } catch (error) {
    console.error("Lỗi POST bài viết:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi thêm bài viết" },
      { status: 500 }
    );
  }
}
