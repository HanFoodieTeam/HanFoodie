import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const subject = formData.get("subject")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Thiếu thông tin" },
        { status: 400 }
      );
    }

    const emailUser = (process.env.EMAIL_USER || process.env.EMAIL_USERNAME || "")
      .replace(/"/g, "")
      .trim();
    const emailPass = (process.env.EMAIL_PASS || process.env.EMAIL_APP_PASSWORD || "")
      .replace(/"/g, "")
      .trim();

    if (!emailUser || !emailPass) {
      console.error("EMAIL_USER/EMAIL_PASS chưa được cấu hình đúng.");
      return NextResponse.json(
        { success: false, error: "Cấu hình server chưa đúng" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from: `"HanFoodie Contact Form" <${emailUser}>`,
      to: emailUser,
      replyTo: email,
      subject: `Liên hệ mới: ${subject}`,
      text: `Tên: ${name}\nEmail: ${email}\nTiêu đề: ${subject}\nNội dung:\n${message}`,
    });

    console.log(`Mail từ ${email} đã gửi thành công!`);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Lỗi gửi mail:", message);
    return NextResponse.json(
      { success: false, error: "Lỗi server. Vui lòng thử lại!" },
      { status: 500 }
    );
  }
}
