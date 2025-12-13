import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api")) return NextResponse.next();

  if (pathname.startsWith("/dang_nhap")) return NextResponse.next();

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/dang_nhap", req.url));
  }

  const user = await verifyToken(token);

  console.log("USER TRONG MIDDLEWARE =", user);

  if (!user || user.vai_tro !== 1) {
    return NextResponse.redirect(new URL("/dang_nhap", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg).*)",
  ],
};
