// File: app/api/danh_muc/[id]/route.ts

import { NextResponse } from "next/server";
import { DanhMucModel } from "@/app/lib/models";
import { IDanhMuc } from "@/app/lib/cautrucdata";

// ===== LẤY THEO ID =====
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const dm = await DanhMucModel.findByPk(id);

    if (!dm)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục" },
        { status: 404 }
      );

    const data: IDanhMuc = {
      ...dm.toJSON(),
      an_hien: !!dm.getDataValue("an_hien"),
    };

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET danh_muc lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy dữ liệu danh mục" },
      { status: 500 }
    );
  }
}

// ===== CẬP NHẬT TOÀN BỘ =====
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    if (!body.ten)
      return NextResponse.json(
        { success: false, message: "Thiếu tên danh mục" },
        { status: 400 }
      );

    const dm = await DanhMucModel.findByPk(id);
    if (!dm)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục" },
        { status: 404 }
      );

    await dm.update({
      ten: body.ten,
      slug: body.slug || "",
      hinh: body.hinh || null,
      thu_tu: body.thu_tu ?? 0,
      an_hien: body.an_hien ? 1 : 0,
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật danh mục thành công",
      data: {
        ...dm.toJSON(),
        an_hien: !!dm.getDataValue("an_hien"),
      },
    });
  } catch (err) {
    console.error("PUT danh_muc lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi cập nhật danh mục" },
      { status: 500 }
    );
  }
}

// ===== CẬP NHẬT TRẠNG THÁI ẨN/HIỆN =====
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { an_hien } = (await req.json()) as { an_hien: boolean };

    if (typeof an_hien !== "boolean") {
      return NextResponse.json(
        { success: false, message: "an_hien phải là boolean" },
        { status: 400 }
      );
    }

    const dm = await DanhMucModel.findByPk(id);
    if (!dm) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục" },
        { status: 404 }
      );
    }

    await dm.update({ an_hien: an_hien ? 1 : 0 });

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: { id, an_hien },
    });
  } catch (err) {
    console.error("PATCH danh_muc lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi cập nhật trạng thái" },
      { status: 500 }
    );
  }
}

// ===== XÓA =====
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const dm = await DanhMucModel.findByPk(id);

    if (!dm)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy danh mục" },
        { status: 404 }
      );

    await dm.destroy();

    return NextResponse.json({
      success: true,
      message: "Đã xóa danh mục thành công",
    });
  } catch (err) {
    console.error("DELETE danh_muc lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi xóa danh mục" },
      { status: 500 }
    );
  }
}
