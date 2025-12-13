import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") ?? "";
  const token = cookie.split("token=")[1]?.split(";")[0];

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const user = await verifyToken(token);

  return NextResponse.json({ user });
}
