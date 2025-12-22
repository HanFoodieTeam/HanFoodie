import { NextRequest, NextResponse } from "next/server";
import { DanhGiaModel, BienTheModel, SanPhamModel } from "@/lib/models";
import { Op, Sequelize } from "sequelize";

// Dữ liệu thô từ DB
interface IRawDanhGia {
  id: number;
  ten: string;
  hinh: string | null;
  sao: number;
  so_luong: number;
}

// Kết quả thống kê
interface IThongKeDanhGia {
  id: number;
  ten: string;
  hinh: string | null;
  tong_danh_gia: number;
  trung_binh: number;
  sao_1: number;
  sao_2: number;
  sao_3: number;
  sao_4: number;
  sao_5: number;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from") || "1970-01-01";
    const to = searchParams.get("to") || "2100-12-31";

    // Lấy dữ liệu thô từ DB
    const rawData = await DanhGiaModel.findAll({
      attributes: [
        [Sequelize.col("bien_the.san_pham.id"), "id"],
        [Sequelize.col("bien_the.san_pham.ten"), "ten"],
        [Sequelize.col("bien_the.san_pham.hinh"), "hinh"],
        "sao",
        [Sequelize.fn("COUNT", Sequelize.col("danh_gia.id")), "so_luong"],
      ],
      include: [
        {
          model: BienTheModel,
          as: "bien_the",
          attributes: [],
          include: [
            {
              model: SanPhamModel,
              as: "san_pham",
              attributes: [],
            },
          ],
        },
      ],
      where: {
        thoi_gian: { [Op.between]: [from, to] },
      },
      group: [
        Sequelize.col("bien_the.san_pham.id"),
        Sequelize.col("bien_the.san_pham.ten"),
        Sequelize.col("bien_the.san_pham.hinh"),
        "sao",
      ],
      raw: true,
      order: [[Sequelize.col("bien_the.san_pham.id"), "ASC"]],
    }) as unknown as IRawDanhGia[]; // <- fix TypeScript

    const map: Record<number, IThongKeDanhGia> = {};

    rawData.forEach((item) => {
      const spId = Number(item.id);
      const sao = Number(item.sao);
      const soLuong = Number(item.so_luong);

      if (!map[spId]) {
        map[spId] = {
          id: spId,
          ten: item.ten,
          hinh: item.hinh,
          tong_danh_gia: 0,
          trung_binh: 0,
          sao_1: 0,
          sao_2: 0,
          sao_3: 0,
          sao_4: 0,
          sao_5: 0,
        };
      }

      const sp = map[spId];
      sp.tong_danh_gia += soLuong;
      sp.trung_binh += soLuong * sao;

      switch (sao) {
        case 1: sp.sao_1 += soLuong; break;
        case 2: sp.sao_2 += soLuong; break;
        case 3: sp.sao_3 += soLuong; break;
        case 4: sp.sao_4 += soLuong; break;
        case 5: sp.sao_5 += soLuong; break;
      }
    });

    // Tính trung bình
    Object.values(map).forEach((sp) => {
      sp.trung_binh = sp.tong_danh_gia > 0 ? sp.trung_binh / sp.tong_danh_gia : 0;
    });

    return NextResponse.json(Object.values(map));
  } catch (error) {
    console.error("Lỗi API thống kê đánh giá:", error);
    return NextResponse.json(
      { error: "Lỗi server khi lấy thống kê đánh giá" },
      { status: 500 }
    );
  }
}
