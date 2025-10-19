import { DanhGiaModel } from "@/app/lib/models";
import { NextResponse } from "next/server";


export async function GET() {
    const sp_arr = await DanhGiaModel.findAll({
        order: [['id', 'desc']],
        limit: 6,
    });
    return NextResponse.json(sp_arr);
}

