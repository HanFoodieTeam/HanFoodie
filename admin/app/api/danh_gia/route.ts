// import { DanhGiaModel } from "@/app/lib/models";
// import { NextResponse } from "next/server";


// export async function GET() {
//     const sp_arr = await DanhGiaModel.findAll({
//         order: [['id', 'desc']],
//         limit: 6,
//     });
//     return NextResponse.json(sp_arr);
// }


import { NextResponse } from "next/server";
import { BienTheModel, DanhGiaModel, NguoiDungModel, SanPhamModel } from "../../lib/models";


export async function GET() {
    try {
        const danhGias = await DanhGiaModel.findAll({
            include: [
                {
                    model: NguoiDungModel,
                    as: "nguoi_dung",
                    attributes: ["ho_ten"],
                },
                {
                    model: BienTheModel,
                    as: "bien_the",
                    attributes: ["ten"],
                    include: [
                        {
                            model: SanPhamModel,
                            as: "san_pham",
                            attributes: ["ten", "hinh"],
                        }
                        ,
                    ],
                },
            ],
            order: [["id", "desc"]], limit:6,
        });

        return NextResponse.json(danhGias);
    } catch (error) {
        console.error("❌ Lỗi khi tải đánh giá:", error);
        return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
    }
}

