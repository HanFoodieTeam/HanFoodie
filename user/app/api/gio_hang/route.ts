import { NextRequest, NextResponse } from "next/server";
import { GioHangModel, BienTheModel, SanPhamModel } from "@/app/lib/models";
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
    });

    const formatted: IGioHang[] = gioHangList.map((item) => {
      const plain = item.toJSON() as IGioHang & {
        bien_the?: {
          id: number;
          ten: string;
          gia_them?: number | null;
          san_pham?: {
            id: number;
            ten: string;
            hinh: string;
            gia_goc: number;
          };
        };
      };

      const parsed_mon_them =
        plain.json_mon_them ? JSON.parse(plain.json_mon_them) : [];
      const parsed_tuy_chon =
        plain.json_tuy_chon ? JSON.parse(plain.json_tuy_chon) : {};

      return {
        ...plain,
        json_mon_them: parsed_mon_them,
        json_tuy_chon: parsed_tuy_chon,
      };
    });

    return NextResponse.json(formatted);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Lỗi không xác định";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const user = getUserFromToken(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { id_bien_the, so_luong = 1, json_mon_them = null, json_tuy_chon = null } = body;

    const newItem = await GioHangModel.create({
      id_nguoi_dung: user.id,
      id_bien_the,
      so_luong,
      json_mon_them,
      json_tuy_chon,
    });

    return NextResponse.json(newItem);
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Lỗi không xác định" },
      { status: 500 }
    );
  }
}
