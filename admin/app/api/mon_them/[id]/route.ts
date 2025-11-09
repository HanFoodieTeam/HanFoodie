// import { NextResponse } from "next/server";
// import { MonThemModel } from "@/app/lib/models";

// export async function PUT(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await context.params; 
//     const body = await req.json();

//     const monThem = await MonThemModel.findByPk(id);
//     if (!monThem) {
//       return NextResponse.json(
//         { success: false, message: "Không tìm thấy món thêm" },
//         { status: 404 }
//       );
//     }

//     await monThem.update(body);

//     return NextResponse.json({
//       success: true,
//       message: "Cập nhật món thêm thành công",
//       data: monThem,
//     });
//   } catch (error) {
//     console.error("Lỗi cập nhật món thêm:", error);
//     return NextResponse.json(
//       { success: false, message: "Lỗi khi cập nhật món thêm" },
//       { status: 500 }
//     );
//   }
// }

// // ====== XÓA MÓN THÊM ======
// export async function DELETE(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await context.params; 
//     const monThem = await MonThemModel.findByPk(id);
//     if (!monThem) {
//       return NextResponse.json(
//         { success: false, message: "Không tìm thấy món thêm" },
//         { status: 404 }
//       );
//     }

//     await monThem.destroy();

//     return NextResponse.json({
//       success: true,
//       message: "Xóa món thêm thành công",
//     });
//   } catch (error) {
//     console.error("Lỗi xóa món thêm:", error);
//     return NextResponse.json(
//       { success: false, message: "Lỗi khi xóa món thêm" },
//       { status: 500 }
//     );
//   }
// }



// //  Cập nhật trạng thái ẩn/hiện
// // export async function PATCH(
// //   req: Request,
// //   { params }: { params: Promise<{ id: string }> }
// // ) {
// //   try {
// //     const { id } = await params;
// //     const { an_hien } = await req.json();

// //     const mgg = await MonThemModel.findByPk(id);
// //     if (!mgg)
// //       return NextResponse.json(
// //         { message: "Không tìm thấy món thêm" },
// //         { status: 404 }
// //       );

// //     await mgg.update({ an_hien });
// //     return NextResponse.json({ message: "Cập nhật thành công", an_hien });
// //   } catch (err) {
// //     console.error("PATCH lỗi:", err);
// //     return NextResponse.json(
// //       { error: "Lỗi khi cập nhật trạng thái" },
// //       { status: 500 }
// //     );
// //   }
// // }

// export async function PATCH(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await context.params; // cần await vì Next 15
//     const { trang_thai } = await req.json();

//     // Kiểm tra giá trị hợp lệ
//     if (trang_thai !== 0 && trang_thai !== 1) {
//       return NextResponse.json(
//         { message: "Giá trị trạng_thai không hợp lệ (chỉ 0 hoặc 1)" },
//         { status: 400 }
//       );
//     }

//     // Tìm món thêm theo ID
//     const monThem = await MonThemModel.findByPk(id);
//     if (!monThem) {
//       return NextResponse.json(
//         { message: "Không tìm thấy món thêm" },
//         { status: 404 }
//       );
//     }

//     // Cập nhật trạng_thai
//     await monThem.update({ trang_thai });

//     return NextResponse.json({
//       success: true,
//       message: "Cập nhật trạng thái thành công",
//       data: { id, trang_thai },
//     });
//   } catch (err) {
//     console.error("PATCH lỗi:", err);
//     return NextResponse.json(
//       { success: false, message: "Lỗi khi cập nhật trạng thái" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { MonThemModel } from "@/app/lib/models";

// ===== LẤY THEO ID =====
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

// ===== CẬP NHẬT TOÀN BỘ =====
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

// ===== CHỈ CẬP NHẬT TRẠNG THÁI =====
// export async function PATCH(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await context.params;
//     const { trang_thai } = await req.json();

//     if (typeof trang_thai !== "boolean")
//       return NextResponse.json(
//         { success: false, message: "Dữ liệu trạng_thai không hợp lệ" },
//         { status: 400 }
//       );

//     const mon = await MonThemModel.findByPk(id);
//     if (!mon)
//       return NextResponse.json(
//         { success: false, message: "Không tìm thấy món thêm" },
//         { status: 404 }
//       );

//     await mon.update({ trang_thai: trang_thai ? 1 : 0 });

//     return NextResponse.json({
//       success: true,
//       message: "Cập nhật trạng thái thành công",
//       data: { id, trang_thai },
//     });
//   } catch (err) {
//     console.error("PATCH lỗi:", err);
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
    // ⚠️ Trong Next.js 15, cần await context.params
    const { id } = await context.params;
    const { trang_thai } = (await req.json()) as { trang_thai: boolean };

    if (typeof trang_thai !== "boolean") {
      return NextResponse.json(
        { success: false, message: "trang_thai phải là boolean" },
        { status: 400 }
      );
    }

    const monThem = await MonThemModel.findByPk(id);
    if (!monThem) {
      return NextResponse.json(
        { success: false, message: "Không tìm thấy món thêm" },
        { status: 404 }
      );
    }

    // ✅ Cập nhật trạng thái (true -> 1, false -> 0)
    await monThem.update({ trang_thai: trang_thai ? 1 : 0 });

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: { id, trang_thai },
    });
  } catch (error) {
    console.error("❌ Lỗi PATCH món thêm:", error);
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
    const mon = await MonThemModel.findByPk(id);

    if (!mon)
      return NextResponse.json(
        { success: false, message: "Không tìm thấy món thêm" },
        { status: 404 }
      );

    await mon.destroy();
    return NextResponse.json({
      success: true,
      message: "Đã xóa món thêm thành công",
    });
  } catch (err) {
    console.error("DELETE lỗi:", err);
    return NextResponse.json(
      { success: false, message: "Lỗi khi xóa món thêm" },
      { status: 500 }
    );
  }
}
