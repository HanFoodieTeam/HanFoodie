// import { NextResponse } from "next/server";
// import { DanhGiaModel, BienTheModel, SanPhamModel } from "@/app/lib/models";
// import type { IThongKeDanhGia, IBienThe, ISanPham } from "@/app/lib/cautrucdata";

// // ✅ Interface dữ liệu trả về từ DB (đơn giản, không kế thừa)
// interface IDanhGiaDayDu {
//   id: number;
//   sao: number;
//   bien_the?: IBienThe & {
//     san_pham?: ISanPham;
//   };
// }

// export async function GET() {
//   try {
//     // 🧩 Lấy toàn bộ dữ liệu
//     const danhGiaList = (await DanhGiaModel.findAll({
//       include: [
//         {
//           model: BienTheModel,
//           as: "bien_the",
//           include: [{ model: SanPhamModel, as: "san_pham" }],
//         },
//       ],
//       raw: false,
//     })) as unknown as IDanhGiaDayDu[];

//     // 🧩 Gom nhóm theo sản phẩm
//     const map = new Map<number, IThongKeDanhGia>();

//     for (const dg of danhGiaList) {
//       const sanPham = dg.bien_the?.san_pham;
//       if (!sanPham) continue;

//       const id = sanPham.id;
//       if (!map.has(id)) {
//         map.set(id, {
//           san_pham_id: id,
//           ten: sanPham.ten,
//           hinh: sanPham.hinh || null,
//           tong_danh_gia: 0,
//           trung_binh: 0,
//           sao_1: 0,
//           sao_2: 0,
//           sao_3: 0,
//           sao_4: 0,
//           sao_5: 0,
//         });
//       }

//       const record = map.get(id)!;
//       record.tong_danh_gia += 1;
//       record.trung_binh += dg.sao;

//       const key = `sao_${dg.sao}` as keyof Pick<
//         IThongKeDanhGia,
//         "sao_1" | "sao_2" | "sao_3" | "sao_4" | "sao_5"
//       >;
//       record[key] += 1;
//     }

//     // 🧩 Tính trung bình
//     const result = Array.from(map.values()).map((sp) => ({
//       ...sp,
//       trung_binh:
//         sp.tong_danh_gia > 0
//           ? Number((sp.trung_binh / sp.tong_danh_gia).toFixed(1))
//           : 0,
//     }));

//     return NextResponse.json(result);
//   } catch (err) {
//     console.error("Lỗi khi thống kê đánh giá:", err);
//     return NextResponse.json([]);
//   }
// }


import { NextResponse } from "next/server";
import { DanhGiaModel, BienTheModel, SanPhamModel } from "@/app/lib/models";
import  { IThongKeDanhGia, IBienThe, ISanPham } from "@/app/lib/cautrucdata";

// Interface dữ liệu đánh giá sau khi lấy từ DB
interface IDanhGiaDayDu {
  id: number;
  sao: number;
  bien_the?: IBienThe & {
    san_pham?: ISanPham;
  };
}

export async function GET() {
  try {
    // 🧩 Lấy tất cả sản phẩm
    const sanPhams = (await SanPhamModel.findAll({
      raw: true,
    })) as unknown as ISanPham[];

    // 🧩 Lấy toàn bộ đánh giá (kèm sản phẩm qua biến thể)
    const danhGiaList = (await DanhGiaModel.findAll({
      where: { an_hien: 1 },
      include: [
        {
          model: BienTheModel,
          as: "bien_the",
          include: [{ model: SanPhamModel, as: "san_pham" }],
        },
      ],
      raw: false,
    })) as unknown as IDanhGiaDayDu[];

    // 🧩 Gom nhóm đánh giá theo sản phẩm
    const map = new Map<number, IThongKeDanhGia>();

    for (const sp of sanPhams) {
      map.set(sp.id, {
        san_pham_id: sp.id,
        ten: sp.ten,
        hinh: sp.hinh || null,
        tong_danh_gia: 0,
        trung_binh: 0,
        sao_1: 0,
        sao_2: 0,
        sao_3: 0,
        sao_4: 0,
        sao_5: 0,
      });
    }

    // 🧩 Cộng dồn dữ liệu đánh giá
    for (const dg of danhGiaList) {
      const sanPham = dg.bien_the?.san_pham;
      if (!sanPham) continue;

      const id = sanPham.id;
      const record = map.get(id);
      if (!record) continue;

      record.tong_danh_gia += 1;
      record.trung_binh += dg.sao;

      const key = `sao_${dg.sao}` as keyof Pick<
        IThongKeDanhGia,
        "sao_1" | "sao_2" | "sao_3" | "sao_4" | "sao_5"
      >;
      record[key] += 1;
    }

    // 🧩 Tính trung bình
    const result = Array.from(map.values()).map((sp) => ({
      ...sp,
      trung_binh:
        sp.tong_danh_gia > 0
          ? Number((sp.trung_binh / sp.tong_danh_gia).toFixed(1))
          : 0,
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("Lỗi khi thống kê đánh giá:", err);
    return NextResponse.json([]);
  }
}
