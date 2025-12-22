
// // export const runtime = "nodejs";

// // import { NextRequest, NextResponse } from "next/server";
// // import crypto from "crypto";
// // import qs from "qs";
// // import { DonHangModel } from "@/lib/models";

// // function sortObject(obj: Record<string, string>) {
// //   return Object.keys(obj)
// //     .sort()
// //     .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
// // }

// // export async function GET(req: NextRequest) {
// //   try {
// //     const url = new URL(req.url);
// //     const vnpParams: Record<string, string> = Object.fromEntries(url.searchParams);
// //     const secureHash = vnpParams["vnp_SecureHash"];

// //     delete vnpParams["vnp_SecureHash"];
// //     delete vnpParams["vnp_SecureHashType"];

// //     const sortedParams = sortObject(vnpParams);
// //     const signData = qs.stringify(sortedParams, {
// //       encode: true,
// //       format: "RFC1738",
// //     });


// //     const signed = crypto
// //       .createHmac("sha512", process.env.VNP_HASH_SECRET!)
// //       .update(signData)
// //       .digest("hex");

// //     if (secureHash !== signed) {
// //       return NextResponse.json({ RspCode: "97", Message: "Invalid Signature" });
// //     }

// //     const orderId = vnpParams["vnp_TxnRef"];
// //     const rspCode = vnpParams["vnp_ResponseCode"];

// //     const donHang = await DonHangModel.findOne({ where: { ma_don: orderId } });
// //     if (!donHang) {
// //       return NextResponse.json({ RspCode: "01", Message: "Order Not Found" });
// //     }

// //     if (rspCode === "00") {
// //       await donHang.update({
// //         trang_thai: "cho_xac_nhan",
// //         ngay_cap_nhat: new Date()
// //       });
// //     }

// //     return NextResponse.json({ RspCode: "00", Message: "Success" });
// //   } catch {
// //     return NextResponse.json({ RspCode: "99", Message: "Unknown Error" });
// //   }
// // }


// export const runtime = "nodejs";

// import { NextRequest, NextResponse } from "next/server";
// import crypto from "crypto";
// import { DonHangModel } from "@/lib/models";

// export async function GET(req: NextRequest) {
//   try {
//     const url = new URL(req.url);
//     const params = new URLSearchParams(url.searchParams);

//     const secureHash = params.get("vnp_SecureHash");
//     if (!secureHash) {
//       return NextResponse.json({ RspCode: "97", Message: "Missing SecureHash" });
//     }
//     params.delete("vnp_SecureHash");
//     params.delete("vnp_SecureHashType");

//     const sortedParams = new URLSearchParams(
//       [...params.entries()].sort(([a], [b]) => a.localeCompare(b))
//     );

//     const signData = sortedParams.toString();

//     const signed = crypto
//       .createHmac("sha512", process.env.VNP_HASH_SECRET!)
//       .update(signData)
//       .digest("hex");

//     if (signed !== secureHash) {
//       return NextResponse.json({ RspCode: "97", Message: "Invalid Signature" });
//     }

//     const maDon = sortedParams.get("vnp_TxnRef");
//     const rspCode = sortedParams.get("vnp_ResponseCode");
//     const transStatus = sortedParams.get("vnp_TransactionStatus");
//  console.log("rdpCode:", rspCode)
//     console.log("transStatus:", transStatus)

//     if (!maDon) {
//       return NextResponse.json({ RspCode: "01", Message: "Order Not Found" });
//     }

//     const donHang = await DonHangModel.findOne({ where: { ma_don: maDon } });
//     if (!donHang) {
//       return NextResponse.json({ RspCode: "01", Message: "Order Not Found" });
//     }

//     if (rspCode === "00" && transStatus === "00") {
//       await donHang.update({
//         trang_thai: "cho_xac_nhan",
//         ngay_cap_nhat: new Date(),
//       });
//     }

//     return NextResponse.json({ RspCode: "00", Message: "Success" });
//   } catch (err) {
//     console.error("VNPay IPN error:", err);
//     return NextResponse.json({ RspCode: "99", Message: "Unknown Error" });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import qs from "qs";
import { DonHangModel } from "@/lib/models";

export async function GET(req: NextRequest) {
  try {
    const vnpParams: Record<string, string> =
      Object.fromEntries(req.nextUrl.searchParams.entries());

    const secureHash = vnpParams["vnp_SecureHash"];
    if (!secureHash) {
      return NextResponse.json({ RspCode: "97", Message: "Missing SecureHash" });
    }

    delete vnpParams["vnp_SecureHash"];
    delete vnpParams["vnp_SecureHashType"];

    const sortedParams = Object.keys(vnpParams)
      .sort()
      .reduce((acc: any, key) => {
        acc[key] = vnpParams[key];
        return acc;
      }, {});

    const signData = qs.stringify(sortedParams, {
      encode: true,
      format: "RFC3986",
    });

    const signed = crypto
      .createHmac("sha512", process.env.VNP_HASH_SECRET!)
      .update(signData)
      .digest("hex");

    if (signed !== secureHash) {
      return NextResponse.json({ RspCode: "97", Message: "Invalid Signature" });
    }

    const maDon = sortedParams["vnp_TxnRef"];
    const rspCode = sortedParams["vnp_ResponseCode"];
    const transStatus = sortedParams["vnp_TransactionStatus"];

    const donHang = await DonHangModel.findOne({ where: { ma_don: maDon } });
    if (!donHang) {
      return NextResponse.json({ RspCode: "01", Message: "Order Not Found" });
    }

    if (rspCode === "00" && transStatus === "00") {
      await donHang.update({
        trang_thai: "cho_xac_nhan",
        ngay_cap_nhat: new Date(),
      });
    }

    return NextResponse.json({
      RspCode: "00",
      Message: "Confirm Success",
    });
  } catch (err) {
    console.error("VNPay IPN error:", err);
    return NextResponse.json({ RspCode: "99", Message: "Unknown Error" });
  }
}
