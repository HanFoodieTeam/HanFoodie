import { SanPhamModel } from "@/app/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
    const sp_arr = await SanPhamModel.findAll({
        order: [['id', 'desc']],
        limit: 10,
    });
    return NextResponse.json(sp_arr);
}
