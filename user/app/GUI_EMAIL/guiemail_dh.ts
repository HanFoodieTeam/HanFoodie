import nodemailer from "nodemailer";

export async function sendMail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME, 
      pass: process.env.EMAIL_APP_PASSWORD, 
    },
  });

  await transporter.sendMail({
    from: `"HanFoodie" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    html,
  });
}
