// File: app/api/bai_viet/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";
import { BaiVietModel } from "@/app/lib/models";
import { IBaiViet } from "@/app/lib/cautrucdata";

// ===== GET: Lấy danh sách bài viết =====
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "6");
    const offset = (page - 1) * limit;
    const search = searchParams.get("search") || "";
    const an_hien = searchParams.get("an_hien"); // "0" hoặc "1"

    const where: WhereOptions = {};

    if (search) {
      where["tieu_de"] = { [Op.like]: `%${search}%` };
    }

    if (an_hien === "0" || an_hien === "1") {
      where["an_hien"] = an_hien === "1" ? 1 : 0;
    }

    const { count, rows } = await BaiVietModel.findAndCountAll({
      where,
      order: [["ngay_dang", "DESC"]],
      limit,
      offset,
    });

    const data: IBaiViet[] = rows.map((row) => {
      const raw = row.toJSON() as Partial<IBaiViet> & { an_hien: number | boolean };

      return {
        id: raw.id!,
        tieu_de: raw.tieu_de || "",
        noi_dung: raw.noi_dung || "",
        hinh: raw.hinh || null,
        id_loai_bv: raw.id_loai_bv!,
        luot_xem: raw.luot_xem ?? 0,
        slug: raw.slug || "",
        an_hien: !!raw.an_hien,
        ngay_dang: raw.ngay_dang ? new Date(raw.ngay_dang).toISOString() : null,
      };
    });

    return NextResponse.json({
      success: true,
      data,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error: any) {
    console.error("❌ Lỗi lấy danh sách bài viết:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy danh sách bài viết" },
      { status: 500 }
    );
  }
}

// ===== POST: Thêm bài viết mới =====
export async function POST(req: NextRequest) {
  try {
    const body: Partial<IBaiViet> = await req.json();

    if (!body.tieu_de || !body.noi_dung || !body.id_loai_bv) {
      return NextResponse.json(
        { success: false, message: "Thiếu tiêu đề, nội dung hoặc loại bài viết" },
        { status: 400 }
      );
    }

    const newItem = await BaiVietModel.create({
      tieu_de: body.tieu_de,
      noi_dung: body.noi_dung,
      hinh: body.hinh || null,
      id_loai_bv: body.id_loai_bv,
      luot_xem: body.luot_xem ?? 0,
      slug: body.slug || "",
      ngay_dang: body.ngay_dang ? new Date(body.ngay_dang) : new Date(),
      an_hien: body.an_hien ? 1 : 0,
    });

    const created: IBaiViet = {
      id: newItem.getDataValue("id"),
      tieu_de: newItem.getDataValue("tieu_de"),
      noi_dung: newItem.getDataValue("noi_dung"),
      hinh: newItem.getDataValue("hinh"),
      id_loai_bv: newItem.getDataValue("id_loai_bv"),
      luot_xem: newItem.getDataValue("luot_xem"),
      slug: newItem.getDataValue("slug"),
      ngay_dang: newItem.getDataValue("ngay_dang")
        ? new Date(newItem.getDataValue("ngay_dang")).toISOString()
        : null,
      an_hien: !!newItem.getDataValue("an_hien"),
    };

    return NextResponse.json({
      success: true,
      message: "Thêm bài viết thành công",
      data: created,
    });
  } catch (error: any) {
    console.error("❌ Lỗi thêm bài viết:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi thêm bài viết" },
      { status: 500 }
    );
  }
}
