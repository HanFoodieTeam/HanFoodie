// File: app/api/loai_tuy_chon/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";
import { LoaiTuyChonModel } from "@/app/lib/models";

// ========================= GET =========================
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 7);
    const offset = (page - 1) * limit;

    const search = searchParams.get("search") || "";
    const an_hien = searchParams.get("an_hien");

    const where: WhereOptions = {};

    if (search) {
      where["ten"] = { [Op.like]: `%${search}%` };
    }

    if (an_hien === "0" || an_hien === "1") {
      where["an_hien"] = an_hien === "1" ? 1 : 0;
    }

    const { count, rows } = await LoaiTuyChonModel.findAndCountAll({
      where,
      order: [["thu_tu", "ASC"]],
      limit,
      offset,
    });

    const data = rows.map(row => ({
      id: row.getDataValue("id"),
      ten: row.getDataValue("ten"),
      thu_tu: row.getDataValue("thu_tu"),
      an_hien: Boolean(row.getDataValue("an_hien")),
    }));

    return NextResponse.json({
      success: true,
      data,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Lỗi GET loại tùy chọn:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy danh sách loại tùy chọn" },
      { status: 500 }
    );
  }
}

// ========================= POST =========================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const ten = body.ten?.trim();
    const thu_tu = Number(body.thu_tu || 0);
    const an_hien = body.an_hien === true || body.an_hien === 1;

    if (!ten) {
      return NextResponse.json(
        { success: false, message: "Tên loại không được để trống" },
        { status: 400 }
      );
    }

    const newItem = await LoaiTuyChonModel.create({
      ten,
      thu_tu,
      an_hien: an_hien ? 1 : 0,
    });

    return NextResponse.json({
      success: true,
      message: "Thêm loại tùy chọn thành công",
      data: {
        id: newItem.getDataValue("id"),
        ten,
        thu_tu,
        an_hien,
      },
    });
  } catch (error) {
    console.error("Lỗi POST loại tùy chọn:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi thêm loại tùy chọn" },
      { status: 500 }
    );
  }
}
