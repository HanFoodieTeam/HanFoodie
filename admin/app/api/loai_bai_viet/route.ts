import { NextRequest, NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";
import { LoaiBaiVietModel } from "@/app/lib/models";
import { ILoaiBaiViet } from "@/app/lib/cautrucdata";

// Raw từ DB
interface RawLoaiBaiViet extends Omit<ILoaiBaiViet, "an_hien"> {
  an_hien: number | boolean;
}

// GET + POST
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") || 1);
    const limit = Number(url.searchParams.get("limit") || 10);
    const offset = (page - 1) * limit;
    const search = url.searchParams.get("search") || "";
    const an_hien = url.searchParams.get("an_hien");

    const where: WhereOptions = {};

    if (search) where["ten_loai"] = { [Op.like]: `%${search}%` };
    if (an_hien === "0" || an_hien === "1") where["an_hien"] = Number(an_hien);

    const { count, rows } = await LoaiBaiVietModel.findAndCountAll({
      where,
      order: [["thu_tu", "ASC"]],
      limit,
      offset,
    });

    const data: ILoaiBaiViet[] = rows.map(row => {
      const raw = row.toJSON() as RawLoaiBaiViet;
      return { ...raw, an_hien: Boolean(raw.an_hien) };
    });

    return NextResponse.json({
      success: true,
      data,
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error("GET loai_bai_viet lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { ten_loai, slug = "", thu_tu = 0, an_hien = true } = body;

    if (!ten_loai?.trim()) {
      return NextResponse.json({ success: false, message: "Tên loại không được để trống" }, { status: 400 });
    }

    const newItem = await LoaiBaiVietModel.create({
      ten_loai,
      slug,
      thu_tu,
      an_hien: an_hien ? 1 : 0,
    });

    const created: ILoaiBaiViet = { 
      id: newItem.getDataValue("id"),
      ten_loai,
      slug,
      thu_tu,
      an_hien
    };

    return NextResponse.json({ success: true, message: "Thêm loại bài viết thành công", data: created });
  } catch (err) {
    console.error("POST loai_bai_viet lỗi:", err);
    return NextResponse.json({ success: false, message: "Lỗi server" }, { status: 500 });
  }
}
