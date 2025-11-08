
// // import { NextResponse } from "next/server";
// // import { DonHangModel, NguoiDungModel } from "@/app/lib/models";
// // import { IDonHang } from "@/app/lib/cautrucdata";
// // import { Op, WhereOptions, Sequelize } from "sequelize";

// // type RangeKey = "all" | "today" | "3days" | "week" | "month" | "year";

// // export async function GET(req: Request) {
// //   try {
// //     const { searchParams } = new URL(req.url);
// //     const trang_thai = searchParams.get("trang_thai");
// //     const page = Number(searchParams.get("page") || 1);
// //     const limit = Number(searchParams.get("limit") || 10);
// //     const search = searchParams.get("search")?.trim();
// //     const range = (searchParams.get("range") || "today") as RangeKey; 

// //     // ---- baseWhere: KHÔNG có trang_thai
// //     const baseWhere: WhereOptions<IDonHang> = {};

// //     // search theo mã đơn
// //     if (search) baseWhere.ma_don = { [Op.like]: `%${search}%` };

// //     // lọc thời gian
// //     if (range !== "all") {
// //       const now = new Date();
// //       let fromDate: Date | undefined;
// //       switch (range) {
// //         case "today":
// //           fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// //           break;
// //         case "3days":
// //           fromDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
// //           break;
// //         case "week":
// //           fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
// //           break;
// //         case "month":
// //           fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
// //           break;
// //         case "year":
// //           fromDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
// //           break;
// //       }
// //       if (fromDate) baseWhere.ngay_tao = { [Op.between]: [fromDate, now] };
// //     }

// //     // ---- queryWhere: CÓ trang_thai nếu tab ≠ tất cả
// //     const queryWhere: WhereOptions<IDonHang> =
// //       trang_thai && trang_thai !== "tat_ca"
// //         ? { ...baseWhere, trang_thai: trang_thai as IDonHang["trang_thai"] }
// //         : baseWhere;

// //     // danh sách + phân trang
// //     const { count, rows } = await DonHangModel.findAndCountAll({
// //       where: queryWhere,
// //       include: [{ model: NguoiDungModel, as: "nguoi_dung", attributes: ["ho_ten"] }],
// //       order: [["id", "desc"]],
// //       offset: (page - 1) * limit,
// //       limit,
// //     });

// //     // tổng tất cả theo range/search (không trạng thái)
// //     const totalAll = await DonHangModel.count({ where: baseWhere });

// //     // đếm theo trạng thái (theo range/search)
// //  const grouped = (await DonHangModel.findAll({
// //   attributes: [
// //     "trang_thai",
// //     [Sequelize.fn("COUNT", Sequelize.col("id")), "cnt"],
// //   ],
// //   where: baseWhere,
// //   group: ["trang_thai"],
// //   raw: true,
// // })) as unknown as Array<{ trang_thai: IDonHang["trang_thai"]; cnt: number }>;


// //     const countByStatus: Record<IDonHang["trang_thai"], number> = {
// //       cho_xac_nhan: 0, da_xac_nhan: 0, dang_giao: 0, da_giao: 0, da_huy: 0,
// //     };
// //     for (const r of grouped) {
// //       if (r.trang_thai) countByStatus[r.trang_thai] = Number(r.cnt) || 0;
// //     }

// //     return NextResponse.json({
// //       data: rows as IDonHang[],
// //       page,
// //       limit,
// //       totalItems: count,   // tổng của trang hiện tại (có trạng thái nếu đang ở tab)
// //       totalAll,            // tổng cho tab "Tất cả"
// //       totalPages: Math.ceil(count / limit),
// //       countByStatus,       //  luôn đúng theo range/search
// //     });
// //   } catch (e) {
// //     const msg = e instanceof Error ? e.message : String(e);
// //     return NextResponse.json({ error: "Lỗi khi lấy danh sách đơn hàng", detail: msg }, { status: 500 });
// //   }
// // }




// // import { NextResponse } from "next/server";
// // import { DonHangModel, NguoiDungModel } from "@/app/lib/models";
// // import { IDonHang } from "@/app/lib/cautrucdata";
// // import { Op, WhereOptions, Sequelize, literal, OrderItem } from "sequelize";

// // type RangeKey = "all" | "today" | "3days" | "week" | "month" | "year";

// // export async function GET(req: Request) {
// //   try {
// //     const { searchParams } = new URL(req.url);
// //     const trang_thai = searchParams.get("trang_thai");
// //     const page = Number(searchParams.get("page") || 1);
// //     const limit = Number(searchParams.get("limit") || 10);
// //     const search = searchParams.get("search")?.trim();
// //     const range = (searchParams.get("range") || "today") as RangeKey;

// //     // ==== Base where (áp dụng cho tất cả tab) ====
// //     const baseWhere: WhereOptions<IDonHang> = {};

// //     // 🔍 Tìm theo mã đơn hàng
// //     if (search) baseWhere.ma_don = { [Op.like]: `%${search}%` };

// //     // 🕒 Lọc theo thời gian
// //     if (range !== "all") {
// //       const now = new Date();
// //       let fromDate: Date | undefined;

// //       switch (range) {
// //         case "today":
// //           fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
// //           break;
// //         case "3days":
// //           fromDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
// //           break;
// //         case "week":
// //           fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
// //           break;
// //         case "month":
// //           fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
// //           break;
// //         case "year":
// //           fromDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
// //           break;
// //       }

// //       if (fromDate) {
// //         baseWhere.ngay_tao = { [Op.between]: [fromDate, now] };
// //       }
// //     }

// //     // ==== Where cho từng tab ====
// //     const queryWhere: WhereOptions<IDonHang> =
// //       trang_thai && trang_thai !== "tat_ca"
// //         ? { ...baseWhere, trang_thai: trang_thai as IDonHang["trang_thai"] }
// //         : baseWhere;

// //     // ==== ORDER ====
// //     // Tab "Tất cả" → ưu tiên đơn "chờ xác nhận" rồi theo id DESC
// //     const orderCondition: OrderItem[] =
// //       trang_thai === "tat_ca" || !trang_thai
// //         ? [
// //             [literal(`CASE WHEN trang_thai = 'cho_xac_nhan' THEN 0 ELSE 1 END`), "ASC"] as unknown as OrderItem,
// //             ["id", "DESC"],
// //           ]
// //         : [["id", "DESC"]];

// //     // ==== Lấy danh sách + phân trang ====
// //     const { count, rows } = await DonHangModel.findAndCountAll({
// //       where: queryWhere,
// //       include: [
// //         {
// //           model: NguoiDungModel,
// //           as: "nguoi_dung",
// //           attributes: ["ho_ten"],
// //         },
// //       ],
// //       order: orderCondition,
// //       offset: (page - 1) * limit,
// //       limit,
// //     });

// //     // ==== Tổng đơn hàng (theo range, không theo trạng thái) ====
// //     const totalAll = await DonHangModel.count({ where: baseWhere });

// //     // ==== Đếm theo trạng thái ====
// //     const grouped = (await DonHangModel.findAll({
// //       attributes: [
// //         "trang_thai",
// //         [Sequelize.fn("COUNT", Sequelize.col("id")), "cnt"],
// //       ],
// //       where: baseWhere,
// //       group: ["trang_thai"],
// //       raw: true,
// //     })) as unknown as Array<{ trang_thai: IDonHang["trang_thai"]; cnt: number }>;

// //     const countByStatus: Record<IDonHang["trang_thai"], number> = {
// //       cho_xac_nhan: 0,
// //       da_xac_nhan: 0,
// //       dang_giao: 0,
// //       da_giao: 0,
// //       da_huy: 0,
// //     };

// //     for (const r of grouped) {
// //       if (r.trang_thai) countByStatus[r.trang_thai] = Number(r.cnt) || 0;
// //     }

// //     // ==== Trả về kết quả ====
// //     return NextResponse.json({
// //       data: rows as IDonHang[],
// //       page,
// //       limit,
// //       totalItems: count, // tổng bản ghi tab hiện tại
// //       totalAll,          // tổng tất cả bản ghi (tab "tất cả")
// //       totalPages: Math.ceil(count / limit),
// //       countByStatus,     // đếm theo trạng thái
// //     });
// //   } catch (e) {
// //     const msg = e instanceof Error ? e.message : String(e);
// //     return NextResponse.json(
// //       { error: "Lỗi khi lấy danh sách đơn hàng", detail: msg },
// //       { status: 500 }
// //     );
// //   }
// // }

import { NextResponse } from "next/server";
import { DonHangModel, NguoiDungModel } from "@/app/lib/models";
import { IDonHang } from "@/app/lib/cautrucdata";
import { Op, WhereOptions, Sequelize, literal, OrderItem, col } from "sequelize";

type RangeKey = "all" | "today" | "3days" | "week" | "month" | "year";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const trang_thai = searchParams.get("trang_thai");
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const search = searchParams.get("search")?.trim();
    const range = (searchParams.get("range") || "today") as RangeKey;

    // ==== Bộ lọc cơ bản ====
    const baseWhere: WhereOptions<IDonHang> = {};

    //  Tìm theo mã đơn hàng
    if (search) baseWhere.ma_don = { [Op.like]: `%${search}%` };

    //  Lọc theo thời gian
    if (range !== "all") {
      const now = new Date();
      let fromDate: Date | undefined;

      switch (range) {
        case "today":
          fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case "3days":
          fromDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);
          break;
        case "week":
          fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case "month":
          fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case "year":
          fromDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
          break;
      }

      if (fromDate) {
        baseWhere.ngay_tao = { [Op.between]: [fromDate, now] };
      }
    }

    // ==== Where cho từng tab ====
    const queryWhere: WhereOptions<IDonHang> =
      trang_thai && trang_thai !== "tat_ca"
        ? { ...baseWhere, trang_thai: trang_thai as IDonHang["trang_thai"] }
        : baseWhere;



    // ==== ORDER ====
    // Tab "Tất cả" → Ưu tiên "Chờ xác nhận" trước, rồi id giảm dần
    const orderCondition: OrderItem[] =
      trang_thai === "tat_ca" || !trang_thai
        ? [
          //  CASE WHEN để đảm bảo đúng thứ tự
          [literal(`CASE WHEN DonHangModel.trang_thai = 'cho_xac_nhan' THEN 0 ELSE 1 END`), "ASC"] as unknown as OrderItem,
          [col("DonHangModel.id"), "DESC"],
        ]
        : [[col("DonHangModel.id"), "DESC"]];

    // ==== Lấy danh sách + phân trang ====
    const { count, rows } = await DonHangModel.findAndCountAll({
      where: queryWhere,
      include: [
        {
          model: NguoiDungModel,
          as: "nguoi_dung",
          attributes: ["ho_ten"],
        },
      ],
      order: orderCondition,
      offset: (page - 1) * limit,
      limit,
    });

    // ==== Tổng đơn hàng (không lọc trạng thái) ====
    const totalAll = await DonHangModel.count({ where: baseWhere });

    // ==== Đếm theo trạng thái ====
    const grouped = (await DonHangModel.findAll({
      attributes: [
        "trang_thai",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "cnt"],
      ],
      where: baseWhere,
      group: ["trang_thai"],
      raw: true,
    })) as unknown as Array<{ trang_thai: IDonHang["trang_thai"]; cnt: number }>;

    const countByStatus: Record<IDonHang["trang_thai"], number> = {
      cho_xac_nhan: 0,
      da_xac_nhan: 0,
      dang_giao: 0,
      da_giao: 0,
      da_huy: 0,
    };

    for (const r of grouped) {
      if (r.trang_thai) countByStatus[r.trang_thai] = Number(r.cnt) || 0;
    }

    // ==== Kết quả ====
    return NextResponse.json({
      data: rows as IDonHang[],
      page,
      limit,
      totalItems: count,
      totalAll,
      totalPages: Math.ceil(count / limit),
      countByStatus,
    });
  } catch (e) {
    console.error("🔥 Lỗi truy vấn đơn hàng:", e);
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: "Lỗi khi lấy danh sách đơn hàng", detail: msg },
      { status: 500 }
    );
  }
}
