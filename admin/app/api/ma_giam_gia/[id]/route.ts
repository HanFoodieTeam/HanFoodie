import { MaGiamGiaModel } from "@/app/lib/models";
import { NextResponse } from "next/server";


// Lấy thông tin mã giảm giá     theo id, method GET
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const sp = await MaGiamGiaModel.findByPk(params.id); // lấy dữ liệu từ table
  if (!sp)
    return NextResponse.json(
      { thong_bao: "Không tìm thấy mã giảm giá" },
      { status: 404 }
    );
  return NextResponse.json(sp); // trả về kết quả
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
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData();

    const ten = formData.get("ten") as string;
    const gia_tri_giam = Number(formData.get("gia_tri_giam"));
    const loai_giam_gia = formData.get("loai_giam_gia") === "1";
    const gia_tri_toi_thieu = Number(formData.get("gia_tri_toi_thieu"));
    const so_luong = Number(formData.get("so_luong"));
    const bat_dau = formData.get("bat_dau") as string;
    const ket_thuc = formData.get("ket_thuc") as string;
    const an_hien = formData.get("an_hien") === "1";
    const ma_so = formData.get("ma_so") as string;
    const dieu_kien = formData.get("dieu_kien") as string;

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

    // 🔁 Chuyển hướng về danh sách mã giảm giá
    return NextResponse.redirect(new URL("/ma_giam_gia", req.url));
  } catch (error: unknown) {
    console.error("Lỗi khi cập nhật mã giảm giá:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Lỗi khi cập nhật mã giảm giá", detail: errMsg },
      { status: 500 }
    );
  }
}

