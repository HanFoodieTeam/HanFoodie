import { MaGiamGiaModel } from "@/app/lib/models";
import { NextResponse } from "next/server";


export async function GET() {
    const sp_arr = await MaGiamGiaModel.findAll({
        order: [['id', 'desc']]
        
    });
    return NextResponse.json(sp_arr);
}


//thêm mã giảm giá
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const ten = formData.get("ten") as string;
    const gia_tri_giam = Number(formData.get("gia_tri_giam"));
    const gia_tri_toi_thieu = Number(formData.get("gia_tri_toi_thieu"));
    const so_luong = Number(formData.get("so_luong"));
    const bat_dau = formData.get("bat_dau") as string;
    const ket_thuc = formData.get("ket_thuc") as string;
    const an_hien = formData.get("an_hien") === "1";
    const ma_so = formData.get("ma_so") as string;
    const dieu_kien = formData.get("dieu_kien") as string;

    await MaGiamGiaModel.create({
      ten,
      gia_tri_giam,
      gia_tri_toi_thieu,
      so_luong,
      bat_dau,
      ket_thuc,
      an_hien,
      ma_so,
      dieu_kien,
    });

    //  Chuyển hướng sau khi thêm thành công
    return NextResponse.redirect("http://localhost:3002/api/ma_giam_gia");
  } catch (error: unknown) {
    console.error("Lỗi khi thêm mã giảm giá:", error);
    const errMsg = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Lỗi khi thêm mã giảm giá", detail: errMsg },
      { status: 500 }
    );
  }
}

