import { MaGiamGiaModel } from "@/app/lib/models";
import { NextResponse } from "next/server";


// Lấy thông tin mã giảm giá     theo id, method GET
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { params } = await context; 
  const id = Number((await params).id);

  const sp = await MaGiamGiaModel.findByPk(id);
  if (!sp)
    return NextResponse.json(
      { thong_bao: "Không tìm thấy mã giảm giá" },
      { status: 404 }
    );

  return NextResponse.json(sp);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const sp = await MaGiamGiaModel.findByPk(params.id);
  if (!sp)
    return NextResponse.json(
      { thong_bao: "Không tìm thấy sản phẩm" },
      { status: 404 }
    );

  await sp.destroy();
  return NextResponse.redirect(new URL("/ma_giam_gia", req.url));
  // return NextResponse.json({ thong_bao: "Xóa thành công" });
}

// cập nhật mã giảm giá 
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const {
      ten,
      gia_tri_giam,
      loai_giam_gia,
      gia_tri_toi_thieu,
      so_luong,
      bat_dau,
      ket_thuc,
      an_hien,
      ma_so,
      dieu_kien,
    } = body;

    // 🔍 Tìm mã giảm giá theo ID
    const maGiamGia = await MaGiamGiaModel.findByPk(params.id);
    if (!maGiamGia) {
      return NextResponse.json(
        { message: "Không tìm thấy mã giảm giá" },
        { status: 404 }
      );
    }

    // 📝 Cập nhật dữ liệu
    await maGiamGia.update({
      ten,
      gia_tri_giam,
      loai_giam_gia,
      gia_tri_toi_thieu,
      so_luong,
      bat_dau,
      ket_thuc,
      an_hien,
      ma_so,
      dieu_kien,
    });

    return NextResponse.json({ message: "Cập nhật thành công" });
  } catch (error: unknown) {
    console.error("Lỗi khi cập nhật mã giảm giá:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Lỗi khi cập nhật mã giảm giá", detail: errMsg },
      { status: 500 }
    );
  }
}


// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const { an_hien } = await req.json();

//     const maGiamGia = await MaGiamGiaModel.findByPk(params.id);
//     if (!maGiamGia) {
//       return NextResponse.json(
//         { message: "Không tìm thấy mã giảm giá" },
//         { status: 404 }
//       );
//     }

//     await maGiamGia.update({ an_hien });

//     return NextResponse.json({
//       message: "Cập nhật trạng thái thành công",
//       ma_giam_gia: maGiamGia,
//     });
//   } catch (error) {
//     console.error("Lỗi khi cập nhật trạng thái:", error);
//     return NextResponse.json(
//       { error: "Lỗi server khi cập nhật trạng thái" },
//       { status: 500 }
//     );
//   }
// }

// 🟢 Cập nhật ẩn/hiện nhanh
export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { params } = await context; // 🟢 chờ params
    const { an_hien } = await req.json();

    const mgg = await MaGiamGiaModel.findByPk((await params).id);
    if (!mgg)
      return NextResponse.json(
        { message: "Không tìm thấy mã giảm giá" },
        { status: 404 }
      );

    await mgg.update({ an_hien });
    return NextResponse.json({ message: "Cập nhật thành công", an_hien });
  } catch (err) {
    console.error("PATCH lỗi:", err);
    return NextResponse.json(
      { error: "Lỗi khi cập nhật trạng thái" },
      { status: 500 }
    );
  }
}



