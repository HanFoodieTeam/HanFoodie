import { NextRequest, NextResponse } from "next/server";
import {
  SanPhamModel,
  BienTheModel,
  DanhGiaModel,
  NguoiDungModel,
  DanhMucModel,
  DanhMucMonThemModel,
  MonThemModel,
  DanhMucLoaiTuyChonModel,
  LoaiTuyChonModel,
  TuyChonModel,
  HinhModel,
} from "@/lib/models";
import { ISanPham } from "@/lib/cautrucdata";

function cleanHetMon(value: string | null): string | null {
  if (!value || value === "0000-00-00") return null;
  return value;
}
/* ───────────────────────────────
GET: Lấy chi tiết sản phẩm
──────────────────────────────── */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const sanPham = await SanPhamModel.findByPk(productId, {
      attributes: [
        "id",
        "ten",
        "hinh",
        "gia_goc",
        "luot_xem",
        "tag",
        "phong_cach",
        "mo_ta",
        "het_mon", // ✅ Trả về trường het_mon
        "id_danh_muc",
      ],
      include: [
        { model: DanhMucModel, as: "danh_muc", attributes: ["id", "ten"] }
      ],
    });

    if (!sanPham) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    const idDanhMuc = sanPham.getDataValue("id_danh_muc");

    const hinhPhu = await HinhModel.findAll({
      where: { id_san_pham: productId },
      order: [["thu_tu", "ASC"]],
      attributes: ["id", "hinh"],
    });

    const bienTheRaw = await BienTheModel.findAll({
      where: {
        id_san_pham: productId,
        trang_thai: 1, // lọc ngay từ DB
      },
    });

    const bienThe = bienTheRaw.map((bt) => ({
      ...bt.toJSON(),
      trang_thai: true, // ép chuẩn boolean
    }));


    const danhMucMonThem = await DanhMucMonThemModel.findAll({
      where: { id_danh_muc: idDanhMuc },
      include: [
        {
          model: MonThemModel,
          as: "mon_them",
          attributes: ["id", "ten", "gia_them", "loai_mon", "trang_thai","het_mon"],
        },
      ],
      order: [[{ model: MonThemModel, as: "mon_them" }, "gia_them", "ASC"]],
    });

const monThem = danhMucMonThem
  .map((item) => {
    const mt = item.getDataValue("mon_them");
    if (!mt) return null;

    const data = mt.toJSON() as {
      id: number;
      ten: string;
      gia_them: number;
      loai_mon: number;
      trang_thai: number | boolean;
      het_mon: string | null;
    };

    data.het_mon = cleanHetMon(data.het_mon);

    if (!data.trang_thai ) return null;

    return {
      ...data,
      trang_thai: true, 
    };
  })
  .filter(Boolean);


    const danhMucTuyChon = await DanhMucLoaiTuyChonModel.findAll({
      where: { id_danh_muc: idDanhMuc },
      include: [
        {
          model: LoaiTuyChonModel,
          as: "loai_tuy_chon",
          attributes: ["id", "ten"],
          include: [
            {
              model: TuyChonModel,
              as: "tuy_chon",
              attributes: ["id", "ten", "an_hien"],
            },
          ],
        },
      ],
    });

    const danhGia = await DanhGiaModel.findAll({
      where: { an_hien: 1 },
      include: [
        {
          model: NguoiDungModel,
          as: "nguoi_dung",
          attributes: ["id", "ho_ten", "email", "tep_khach"],
        },
        {
          model: BienTheModel,
          as: "bien_the",
          attributes: ["id", "id_san_pham"],
          where: { id_san_pham: productId },
        },
      ],
      order: [["id", "DESC"]],
    });

    const lienQuan = await SanPhamModel.findAll({
      where: { id_danh_muc: idDanhMuc },
      limit: 8,
      attributes: [
        "id",
        "ten",
        "hinh",
        "gia_goc",
        "het_mon", 
        "id_danh_muc", 
      ],
    });
const tuyChon = danhMucTuyChon
  .map((item) => {
    const loai = item.getDataValue("loai_tuy_chon")?.toJSON();
    if (!loai) return null;

    const tuyChonHopLe = loai.tuy_chon?.filter(
      (tc: { an_hien: number | boolean }) => Boolean(tc.an_hien)
    );

    if (!tuyChonHopLe || tuyChonHopLe.length === 0) return null;

    return {
      ...loai,
      tuy_chon: tuyChonHopLe,
    };
  })
  .filter(Boolean);

    return NextResponse.json({
      san_pham: sanPham,
      bien_the: bienThe,
      mon_them: monThem,
      tuy_chon: tuyChon,
      danh_gia: danhGia,
      lien_quan: lienQuan,
      hinh_phu: hinhPhu,
    });
  } catch (error) {
    console.error("🔥 Lỗi GET API chi tiết sản phẩm:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

/* ───────────────────────────────
PUT: Tăng lượt xem sản phẩm
──────────────────────────────── */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const sanPham = await SanPhamModel.findByPk(productId);
    if (!sanPham) {
      return NextResponse.json({ error: "Không tìm thấy sản phẩm" }, { status: 404 });
    }

    const luot_xem_moi = (sanPham.getDataValue("luot_xem") || 0) + 1;

    await sanPham.update({ luot_xem: luot_xem_moi });

    return NextResponse.json({ luot_xem: luot_xem_moi });
  } catch (error) {
    console.error("🔥 Lỗi PUT API tăng lượt xem:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
