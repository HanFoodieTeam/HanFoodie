// File: app/api/loai_tuy_chon/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Op, WhereOptions } from "sequelize";
import { LoaiTuyChonModel } from "@/app/lib/models"; // Model Sequelize cho LoaiTuyChon
import { ILoaiTuyChon } from "@/app/lib/cautrucdata"; // Interface TypeScript

// Loại bỏ any bằng kiểu JSON của Sequelize
interface LoaiTuyChonRaw extends Omit<ILoaiTuyChon, "an_hien"> {
  an_hien: number | boolean;
}

// ========================= GET =========================
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    const page = Number(params.get("page") || 1);
    const limit = Number(params.get("limit") || 10);
    const offset = (page - 1) * limit;

    const search = params.get("search") || "";
    const an_hien = params.get("an_hien");

    const where: WhereOptions = {};

    if (search) {
      where["ten"] = { [Op.like]: `%${search}%` };
    }

    if (an_hien === "0" || an_hien === "1") {
      where["an_hien"] = Number(an_hien);
    }

    const { count, rows } = await LoaiTuyChonModel.findAndCountAll({
      where,
      order: [["thu_tu", "ASC"]],
      limit,
      offset,
    });

    const data: ILoaiTuyChon[] = rows.map((row) => {
      const raw = row.toJSON() as LoaiTuyChonRaw;
      return { ...raw, an_hien: Boolean(raw.an_hien) };
    });

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
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const ten = body.ten as string | undefined;
    const thu_tu = Number(body.thu_tu || 0);
    const an_hien = Boolean(body.an_hien);

    if (!ten) {
      return NextResponse.json(
        { success: false, message: "Tên loại tùy chọn không được để trống" },
        { status: 400 }
      );
    }

    // Tạo record mới
    const newItem = await LoaiTuyChonModel.create({
      ten,
      thu_tu,
      an_hien: an_hien ? 1 : 0,
    });

    const created: ILoaiTuyChon = {
      id: newItem.getDataValue("id"),
      ten,
      thu_tu,
      an_hien,
    };

    return NextResponse.json({
      success: true,
      message: "Thêm loại tùy chọn thành công",
      data: created,
    });
  } catch (error) {
    console.error("Lỗi POST loại tùy chọn:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi thêm loại tùy chọn" },
      { status: 500 }
    );
  }
}

// ========================= PATCH =========================
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const pathSegments = url.pathname.split("/").filter(Boolean);
    const idStr = pathSegments[pathSegments.length - 1];
    const id = Number(idStr);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, message: "ID không hợp lệ" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const an_hien = body.an_hien;

    if (typeof an_hien !== "boolean") {
      return NextResponse.json(
        { success: false, message: "Trạng thái an_hien phải là boolean" },
        { status: 400 }
      );
    }

    const item = await LoaiTuyChonModel.findByPk(id);
    if (!item) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy loại tùy chọn" },
        { status: 404 }
      );
    }

    await item.update({ an_hien: an_hien ? 1 : 0 });

    const updated: ILoaiTuyChon = {
      id: item.getDataValue("id"),
      ten: item.getDataValue("ten"),
      thu_tu: item.getDataValue("thu_tu"),
      an_hien,
    };

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: updated,
    });
  } catch (error) {
    console.error("Lỗi PATCH loại tùy chọn:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi khi cập nhật loại tùy chọn" },
      { status: 500 }
    );
  }
}
