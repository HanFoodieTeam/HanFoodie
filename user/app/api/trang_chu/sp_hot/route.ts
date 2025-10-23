import {  SanPhamModel } from "@/app/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
    const sp_arr = await SanPhamModel.findAll({
        order: [['luot_xem', 'desc']], limit :4,
       
    });
    return NextResponse.json(sp_arr);
}
