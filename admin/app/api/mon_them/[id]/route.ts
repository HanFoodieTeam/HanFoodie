import { NextResponse } from "next/server";
import { MonThemModel } from "@/lib/models";

//  LẤY THEO ID 
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const mon = await MonThemModel.findByPk(id);

    if (!mon)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy món thêm" },
        { status: 404 }
      );

    // Trả về dữ liệu đúng kiểu boolean
    const data = {
      ...mon.toJSON(),
      trang_thai: !!mon.getDataValue("trang_thai"),
    };

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi lấy dữ liệu món thêm" },
      { status: 500 }
    );
  }
}

//  CẬP NHẬT TOÀN BỘ 
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    if (!body.ten || body.gia_them == null)
      return NextResponse.json(
        { success: false, message: "Thiếu dữ liệu bắt buộc" },
        { status: 400 }
      );

    const mon = await MonThemModel.findByPk(id);
    if (!mon)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy món thêm" },
        { status: 404 }
      );

    await mon.update({
      ten: body.ten,
      gia_them: body.gia_them,
      loai_mon: body.loai_mon,
      trang_thai: body.trang_thai ? 1 : 0,
    });

    return NextResponse.json({
      success: true,
      message: "Cập nhật thành công",
      data: {
        ...mon.toJSON(),
        trang_thai: !!mon.getDataValue("trang_thai"),
      },
    });
  } catch (err) {
    console.error("PUT lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi cập nhật món thêm" },
      { status: 500 }
    );
  }
}


// export async function PATCH(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await context.params;
//     const { trang_thai } = (await req.json()) as { trang_thai: boolean };

//     if (typeof trang_thai !== "boolean") {
//       return NextResponse.json(
//         { success: false, message: "trang_thai phải là boolean" },
//         { status: 400 }
//       );
//     }

//     const monThem = await MonThemModel.findByPk(id);
//     if (!monThem) {
//       return NextResponse.json(
//         { success: false, message: "Không tìm thấy món thêm" },
//         { status: 404 }
//       );
//     }

//     //  Cập nhật trạng thái (true -> 1, false -> 0)
//     await monThem.update({ trang_thai: trang_thai ? 1 : 0 });

//     return NextResponse.json({
//       success: true,
//       message: "Cập nhật trạng thái thành công",
//       data: { id, trang_thai },
//     });
//   } catch (error) {
//     console.error(" Lỗi PATCH món thêm:", error);
//     return NextResponse.json(
//       { success: false, message: "Lỗi khi cập nhật trạng thái" },
//       { status: 500 }
//     );
//   }
// }

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const today = new Date().toISOString().split("T")[0];

    const mon = await MonThemModel.findByPk(id);
    if (!mon) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy món thêm" },
        { status: 404 }
      );
    }

    // Đánh dấu hết món hôm nay
    if (body.het_mon === true) {
      await mon.update({ het_mon: today });
    }

    // Có lại món trong hôm nay → xoá ngày hiện tại
    if (body.co_lai_mon === true) {
      await mon.update({ het_mon: null });
    }

    return NextResponse.json({
      success: true,
      message: "Cập nhật thành công",
      data: {
        id: mon.getDataValue("id"),
        ten: mon.getDataValue("ten"),
        het_mon: mon.getDataValue("het_mon"),
      },
    });
  } catch (err) {
    console.error("PATCH lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi cập nhật" },
      { status: 500 }
    );
  }
}
