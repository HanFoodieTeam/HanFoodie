import { NextResponse } from "next/server";
import { DonHangModel, NguoiDungModel, ChiTietDonHangModel, BienTheModel, SanPhamModel,
} from "@/app/lib/models";
import { IDonHang, TrangThaiDonHang } from "@/app/lib/cautrucdata";

//  Hàm parse ID hợp lệ
function parseId(id: string): number | null {
  const n = Number(id);
  return Number.isInteger(n) && n > 0 ? n : null;
}

//  Định nghĩa các trạng thái cho phép chuyển
const ALLOWED: Record<TrangThaiDonHang, TrangThaiDonHang[]> = {
  cho_xac_nhan: ["da_xac_nhan", "da_huy"], // có thể xác nhận hoặc hủy
  da_xac_nhan: ["dang_giao", "da_huy"],    // có thể giao hoặc hủy
  dang_giao: ["da_giao"],                  // chỉ có thể giao xong
  da_giao: [],                             // không thể đổi
  da_huy: [],                              // không thể đổi
};

type RouteParams = { params: Promise<{ id: string }> };


export async function GET(_req: Request, context: RouteParams) {
  try {
    const { id } = await context.params;
    const parsedId = parseId(id);
    if (!parsedId) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const don = await DonHangModel.findOne({
      where: { id: parsedId },
      include: [
        {
          model: NguoiDungModel,
          as: "nguoi_dung",
          attributes: ["id", "ho_ten", "email", "sdt"],
        },
        {
          model: ChiTietDonHangModel,
          as: "chi_tiet_don_hang",
          include: [
            {
              model: BienTheModel,
              as: "bien_the",
              attributes: ["id", "ten", "gia_them", "id_san_pham"],
              include: [
                {
                  model: SanPhamModel,
                  as: "san_pham",
                  attributes: ["id", "ten", "hinh", "gia_goc"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!don) {
      return NextResponse.json(
        { error: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );
    }

    const plain = don.get({ plain: true }) as unknown as IDonHang;
    return NextResponse.json({ data: plain });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("GET /api/don_hang/:id error:", msg);
    return NextResponse.json(
      { error: "Lỗi khi tải chi tiết đơn hàng", detail: msg },
      { status: 500 }
    );
  }
}



export async function PATCH(req: Request, context: RouteParams) {
  try {
    const { id } = await context.params;
    const parsedId = parseId(id);
    if (!parsedId) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const body = (await req.json()) as { trang_thai?: TrangThaiDonHang };
    const next = body.trang_thai;
    if (!next) {
      return NextResponse.json(
        { error: "Thiếu trường 'trang_thai'" },
        { status: 400 }
      );
    }

    //  Lấy đơn hàng hiện tại
    const don = await DonHangModel.findByPk(parsedId);
    if (!don) {
      return NextResponse.json(
        { error: "Không tìm thấy đơn hàng" },
        { status: 404 }
      );
    }

    const current = don.getDataValue("trang_thai") as TrangThaiDonHang;
    const allowedNext = ALLOWED[current] || [];

    //  Không được chuyển trạng thái không hợp lệ
    if (!allowedNext.includes(next)) {
      return NextResponse.json(
        {
          error: `Không thể chuyển từ trạng thái '${current}' sang '${next}'.`,
          allowed: allowedNext,
        },
        { status: 400 }
      );
    }

    //  Cập nhật trạng thái và thời gian
    await don.update({
      trang_thai: next,
      ngay_cap_nhat: new Date(),
    });

    return NextResponse.json({
      message: " Cập nhật trạng thái đơn hàng thành công",
      data: don,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("PATCH /api/don_hang/:id error:", msg);
    return NextResponse.json(
      { error: "Lỗi khi cập nhật trạng thái đơn hàng", detail: msg },
      { status: 500 }
    );
  }
}



