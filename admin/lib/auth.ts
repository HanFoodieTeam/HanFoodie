import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode("HanFoodieSecretKey123!");

export interface ITokenPayload {
  id: number;
  email: string;
  vai_tro: number;
  ho_ten:string;
}

export async function verifyToken(token: string): Promise<ITokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
return payload as unknown as ITokenPayload;
  } catch (error) {
    console.error("JWT VERIFY FAILED:", error);
    return null;
  }
}
