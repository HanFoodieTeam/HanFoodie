// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verifyToken } from "@/lib/auth";

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // 1. Cho phép api & static
//   if (
//     pathname.startsWith("/api") ||
//     pathname.startsWith("/_next") ||
//     pathname === "/favicon.ico"
//   ) {
//     return NextResponse.next();
//   }

//   // 2. Cho phép trang đăng nhập
//   if (pathname === "/dang_nhap") {
//     return NextResponse.next();
//   }

//   // 3. CHỈ BẢO VỆ ADMIN ROUTE
//   if (!pathname.startsWith("/don_hang") &&
//       !pathname.startsWith("/san_pham") &&
//       !pathname.startsWith("/nguoi_dung") &&
//       !pathname.startsWith("/thong_ke")
//   ) {
//     return NextResponse.next();
//   }

//   // 4. Kiểm tra token
//   const token = req.cookies.get("token")?.value;
//   if (!token) {
//     return NextResponse.redirect(new URL("/dang_nhap", req.url));
//   }

//   const user = await verifyToken(token);
//   if (!user || user.vai_tro !== 1) {
//     return NextResponse.redirect(new URL("/dang_nhap", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/don_hang/:path*",
//     "/san_pham/:path*",
//     "/nguoi_dung/:path*",
//     "/thong_ke/:path*",
//     "/tong_quan/:path*",
//     "/bai_viet/:path*",
//     "/banner/:path*",
//     "/danh_muc/:path*",
//     "/loai_san_pham/:path*",
//     "/loai_bai_viet/:path*",
//     "/loai_tuy_chon/:path*",
//     "/ma_giam_gia/:path*",
//     "/mon_them/:path*",
//     "/settings/:path*",
//   ],
// };



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Chưa đăng nhập
  if (!token) {
    return NextResponse.redirect(new URL("/dang_nhap", req.url));
  }

  // Kiểm tra quyền
  const user = await verifyToken(token);
  if (!user || user.vai_tro !== 1) {
    return NextResponse.redirect(new URL("/dang_nhap", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/don_hang/:path*",
    "/san_pham/:path*",
    "/nguoi_dung/:path*",
    "/thong_ke/:path*",
    "/tong_quan/:path*",
    "/bai_viet/:path*",
    "/banner/:path*",
    "/danh_muc/:path*",
    "/loai_san_pham/:path*",
    "/loai_bai_viet/:path*",
    "/loai_tuy_chon/:path*",
    "/ma_giam_gia/:path*",
    "/mon_them/:path*",
    "/settings/:path*",
  ],
};
