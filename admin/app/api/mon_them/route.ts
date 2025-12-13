
import { NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";
import { MonThemModel } from "@/lib/models";
import { IMonThem } from "@/lib/cautrucdata";

//  GET: Danh sách món thêm (lọc, tìm kiếm, phân trang) 
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 7);
    const offset = (page - 1) * limit;
    const search = searchParams.get("search") || "";
    const loai = searchParams.get("loai") || "all";

    const where: WhereOptions = {};

    if (search) {
      where["ten"] = { [Op.like]: `%${search}%` };
    }

    if (loai !== "all") {
      where["loai_mon"] = Number(loai);
    }

    const { count, rows } = await MonThemModel.findAndCountAll({
      where,
      order: [["id", "DESC"]],
      limit,
      offset,
    });

    const data: IMonThem[] = rows.map((row) => {
      const raw = row.toJSON() as IMonThem & { trang_thai: number | boolean };
      return {
        ...raw,
        trang_thai: !!raw.trang_thai,
      };
    });

    const totalPages = Math.ceil(count / limit);

    return NextResponse.json({
      success: true,
      data,
      totalPages,
      totalItems: count,
      currentPage: page,
    });
  } catch (error) {
    console.error(" Lỗi khi lấy danh sách món thêm:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy danh sách món thêm" },
      { status: 500 }
    );
  }
}

//  POST: Thêm món thêm 
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as IMonThem;

    if (!body.ten || body.gia_them == null) {
      return NextResponse.json(
        { success: false, message: "Thiếu tên hoặc giá thêm" },
        { status: 400 }
      );
    }

    const newItem = await MonThemModel.create({
      ten: body.ten,
      gia_them: body.gia_them,
      loai_mon: body.loai_mon ?? 0,
      trang_thai: body.trang_thai ? 1 : 0,
      het_mon: body.het_mon,
    });

    const created: IMonThem = {
      id: newItem.getDataValue("id"),
      ten: newItem.getDataValue("ten"),
      gia_them: newItem.getDataValue("gia_them"),
      loai_mon: newItem.getDataValue("loai_mon"),
      trang_thai: !!newItem.getDataValue("trang_thai"),
      het_mon: newItem.getDataValue("het_mon"),
    };

    return NextResponse.json({
      success: true,
      message: "Thêm món thêm thành công",
      data: created,
    });
  } catch (error) {
    console.error(" Lỗi thêm món thêm:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi thêm món thêm" },
      { status: 500 }
    );
  }
}
