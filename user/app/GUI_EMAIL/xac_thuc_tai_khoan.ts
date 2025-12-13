import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export async function xacthuc(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: `"HanFoodie " <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    html,
  });
}
