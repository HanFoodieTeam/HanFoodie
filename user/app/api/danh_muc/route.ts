import { DanhMucModel } from "@/app/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
    const sp_arr = await DanhMucModel.findAll({
        order: [['id', 'desc']],
       
    });
    return NextResponse.json(sp_arr);
}
