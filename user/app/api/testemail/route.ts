export const runtime = "nodejs";

import { sendEmail } from "@/lib/sendEmail";

export async function GET() {
  await sendEmail(
    "lauvanduc15724@gmail.com",
    "Test Resend OK",
    "<h1>Email Resend hoạt động</h1>"
  );
console.log("sendEmail:", sendEmail)
  return Response.json({ success: true });
}
