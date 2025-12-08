


import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import qs from "qs";
import { DonHangModel } from "@/app/lib/models";

function sortObject(obj: Record<string, string>) {
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const vnpParams: Record<string, string> = Object.fromEntries(url.searchParams);
    const secureHash = vnpParams["vnp_SecureHash"];

    delete vnpParams["vnp_SecureHash"];
    delete vnpParams["vnp_SecureHashType"];

    const sortedParams = sortObject(vnpParams);
    const signData = qs.stringify(sortedParams, { encode: false });

    const signed = crypto
      .createHmac("sha512", process.env.VNP_HASH_SECRET!)
      .update(signData)
      .digest("hex");

    if (secureHash !== signed) {
      return NextResponse.json({ RspCode: "97", Message: "Invalid Signature" });
    }

    const orderId = vnpParams["vnp_TxnRef"];
    const rspCode = vnpParams["vnp_ResponseCode"];

    const donHang = await DonHangModel.findOne({ where: { ma_don: orderId } });
    if (!donHang) {
      return NextResponse.json({ RspCode: "01", Message: "Order Not Found" });
    }

    if (rspCode === "00") {
      await donHang.update({
trang_thai:"cho_xac_nhan",
        ngay_cap_nhat: new Date()
      });
    }

    return NextResponse.json({ RspCode: "00", Message: "Success" });
  } catch {
    return NextResponse.json({ RspCode: "99", Message: "Unknown Error" });
  }
}
