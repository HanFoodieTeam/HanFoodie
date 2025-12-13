import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  id: number;
  email: string;
  vai_tro: number;
}

export function getUserFromToken(req: NextRequest): AuthPayload | null {
  try {
  
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
const secret = process.env.JWT_SECRET || "HanFoodieSecretKey121113!@@f";
    const decoded = jwt.verify(token, secret) as AuthPayload;

    return decoded;
  } catch (error) {
    console.error("Lỗi xác thực JWT:", error);
    return null;
  }
}
