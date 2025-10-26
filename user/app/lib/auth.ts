import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  id: number;
  email: string;
  vai_tro: number;
}

export function getUserFromToken(req: NextRequest): AuthPayload | null {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "BAN_NHAP_SECRET_KEY_TAI_DAY";
    const decoded = jwt.verify(token, secret) as AuthPayload;
    return decoded;
  } catch {
    return null;
  }
}
