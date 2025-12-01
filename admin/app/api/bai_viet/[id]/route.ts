// File: app/api/bai_viet/[id]/route.ts

import { NextResponse } from "next/server";
import { BaiVietModel } from "@/app/lib/models";
import { IBaiViet } from "@/app/lib/cautrucdata";

// ===== LẤY THEO ID =====
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const bv = await BaiVietModel.findByPk(id);

    if (!bv)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy bài viết" },
        { status: 404 }
      );

    const data: IBaiViet = {
      ...bv.toJSON(),
      an_hien: !!bv.getDataValue("an_hien"),
    };

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy dữ liệu bài viết" },
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

    if (!body.tieu_de || !body.noi_dung || !body.id_loai_bv)
      return NextResponse.json(
        { success: false, message: "Thiếu dữ liệu bắt buộc" },
        { status: 400 }
      );

    const bv = await BaiVietModel.findByPk(id);
    if (!bv)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy bài viết" },
        { status: 404 }
      );

    await bv.update({
     tieu_de: body.tieu_de,
      noi_dung: body.noi_dung,
      hinh: body.hinh || null,
      id_loai_bv: body.id_loai_bv,
      luot_xem: body.luot_xem ?? 0,
      slug: body.slug || "",
      ngay_dang: body.ngay_dang || new Date(),
      an_hien: body.an_hien ? 1 : 0,
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật thành công",
      data: {
        ...bv.toJSON(),
        an_hien: !!bv.getDataValue("an_hien"),
      },
    });
  } catch (err) {
    console.error("PUT lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi cập nhật bài viết" },
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

    const bv = await BaiVietModel.findByPk(id);
    if (!bv) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy bài viết" },
        { status: 404 }
      );
    }

    await bv.update({ an_hien: an_hien ? 1 : 0 });

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: { id, an_hien },
    });
  } catch (err) {
    console.error("PATCH lỗi:", err);
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
    const bv = await BaiVietModel.findByPk(id);

    if (!bv)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy bài viết" },
        { status: 404 }
      );

    await bv.destroy();

    return NextResponse.json({
      success: true,
      message: "Đã xóa bài viết thành công",
    });
  } catch (err) {
    console.error("DELETE lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi xóa bài viết" },
      { status: 500 }
    );
  }
}
