// File: app/api/danh_muc/route.ts

import { NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";
import { DanhMucModel } from "@/app/lib/models";
import { IDanhMuc } from "@/app/lib/cautrucdata";

// ===== GET: danh sách danh mục với phân trang, tìm kiếm =====
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const offset = (page - 1) * limit;
    const search = searchParams.get("search") || "";
    const an_hien = searchParams.get("an_hien"); // "0" hoặc "1"

    const where: WhereOptions = {};

    if (search) where["ten"] = { [Op.like]: `%${search}%` };
    if (an_hien === "0" || an_hien === "1") where["an_hien"] = an_hien === "1";

    const { count, rows } = await DanhMucModel.findAndCountAll({
      where,
      order: [["thu_tu", "ASC"]],
      limit,
      offset,
    });

    const data: IDanhMuc[] = rows.map((row) => {
      const raw = row.toJSON() as IDanhMuc & { an_hien: number | boolean };
      return {
        ...raw,
        an_hien: !!raw.an_hien,
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
    console.error("❌ Lỗi lấy danh sách danh mục:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy danh sách danh mục" },
      { status: 500 }
    );
  }
}

// ===== POST: Thêm danh mục mới =====
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as IDanhMuc;

    if (!body.ten) {
      return NextResponse.json(
        { success: false, message: "Thiếu tên danh mục" },
        { status: 400 }
      );
    }

    const newItem = await DanhMucModel.create({
      ten: body.ten,
      slug: body.slug || "",
      an_hien: body.an_hien ? 1 : 0,
      hinh: body.hinh || null,
      thu_tu: body.thu_tu ?? 0,
      so_san_pham: body.so_san_pham ?? 0,
    });

    const created: IDanhMuc = {
      id: newItem.getDataValue("id"),
      ten: newItem.getDataValue("ten"),
      slug: newItem.getDataValue("slug"),
      an_hien: !!newItem.getDataValue("an_hien"),
      hinh: newItem.getDataValue("hinh"),
      thu_tu: newItem.getDataValue("thu_tu"),
      so_san_pham: newItem.getDataValue("so_san_pham"),
    };

    return NextResponse.json({
      success: true,
      message: "Thêm danh mục thành công",
      data: created,
    });
  } catch (error) {
    console.error("❌ Lỗi thêm danh mục:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi thêm danh mục" },
      { status: 500 }
    );
  }
}
