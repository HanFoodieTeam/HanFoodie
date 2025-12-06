// File: app/api/danh_muc/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";
import { DanhMucModel } from "@/app/lib/models";
import { IDanhMuc } from "@/app/lib/cautrucdata";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Loại bỏ any bằng cách khai báo kiểu JSON của Sequelize
interface DanhMucRaw extends Omit<IDanhMuc, "an_hien"> {
  an_hien: number | boolean;
}

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

    const { count, rows } = await DanhMucModel.findAndCountAll({
      where,
      order: [["thu_tu", "ASC"]],
      limit,
      offset,
    });

    // CHUẨN HÓA KIỂU TRẢ VỀ
    const data: IDanhMuc[] = rows.map((row) => {
      const raw = row.toJSON() as DanhMucRaw;

      return {
        ...raw,
        an_hien: Boolean(raw.an_hien),
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
    console.error("Lỗi GET danh mục:", error);

    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy danh sách danh mục" },
      { status: 500 }
    );
  }
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

    let filePath: string | null = null;

    // Nếu có file → lưu vào /public/uploads
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = uuidv4() + "-" + file.name.replace(/\s+/g, "_");

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      const fullPath = path.join(uploadDir, filename);

      await mkdir(uploadDir, { recursive: true });
      await writeFile(fullPath, buffer);

      filePath = "/uploads/" + filename;
    }

    // Lưu vào DB
    const newItem = await DanhMucModel.create({
      ten,
      slug,
      thu_tu,
      so_san_pham,
      an_hien: an_hien ? 1 : 0,
      hinh: filePath,
    });

    const created: IDanhMuc = {
      id: newItem.getDataValue("id"),
      ten,
      slug,
      thu_tu,
      so_san_pham,
      hinh: filePath,
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
