import { NextRequest, NextResponse } from "next/server";
import { BienTheModel, GioHangModel, SanPhamModel } from "@/app/lib/models";
import { getUserFromToken } from "@/app/lib/auth";
import { IGioHang } from "@/app/lib/cautrucdata";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const user = getUserFromToken(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const gioHangList = await GioHangModel.findAll({
      where: { id_nguoi_dung: user.id },
      include: [
        {
          model: BienTheModel,
          as: "bien_the",
          include: [
            {
              model: SanPhamModel,
              as: "san_pham",
              attributes: ["id", "ten", "hinh", "gia_goc"],
            },
          ],
        },
      ],
      order: [["id", "desc"]],
    });

    const formatted: IGioHang[] = gioHangList.map((item) => {
      const plain = item.toJSON() as IGioHang & {
        json_mon_them?: string | object | null;
        json_tuy_chon?: string | object | null;
      };


      //  Parse an toàn: chỉ parse khi là string
      const parsed_mon_them =
        typeof plain.json_mon_them === "string" && plain.json_mon_them.trim() !== ""
          ? JSON.parse(plain.json_mon_them)
          : plain.json_mon_them ?? [];

      const parsed_tuy_chon =
        typeof plain.json_tuy_chon === "string" && plain.json_tuy_chon.trim() !== ""
          ? JSON.parse(plain.json_tuy_chon)
          : plain.json_tuy_chon ?? [];

      return {
        ...plain,
        json_mon_them: parsed_mon_them,
        json_tuy_chon: parsed_tuy_chon,
      };
    });

    return NextResponse.json(Array.isArray(formatted) ? formatted : []);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi không xác định";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {

    const user = getUserFromToken(req);
    if (!user) {
      return NextResponse.json(
        { message: "Bạn cần đăng nhập để thêm vào giỏ hàng." },
        { status: 401 }
      );
    }

    //  Nhận dữ liệu body từ client
    const body: IGioHang = await req.json();
    const { id_bien_the, so_luong, json_mon_them, json_tuy_chon, ghi_chu } =
      body;

    if (!id_bien_the) {
      return NextResponse.json(
        { message: "Thiếu thông tin sản phẩm hoặc số lượng." },
        { status: 400 }
      );
    }

    // Lưu vào DB (chưa có thanh_tien)
    const item = await GioHangModel.create({
      id_nguoi_dung: user.id,
      id_bien_the,
      so_luong,
      json_mon_them: JSON.stringify(json_mon_them || []),
      json_tuy_chon: JSON.stringify(json_tuy_chon || []),
      ghi_chu: ghi_chu,
    });

    return NextResponse.json({ message: "Đã thêm vào giỏ hàng!", data: item });
  } catch (error) {
    console.error(" Lỗi khi thêm vào giỏ:", error);
    return NextResponse.json(
      { message: "Lỗi server khi thêm vào giỏ hàng." },
      { status: 500 }
    );
  }
}
