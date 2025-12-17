import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  to: string,
  subject: string,
  html: string
) {
  console.log("📨 sendEmail() CALLED →", to);

  const res = await resend.emails.send({
    from: "HanFoodie <no-reply@hanfoodie.io.vn>",
    to,
    subject,
    html,
  });

  console.log("📩 Resend API response:", res);
  return res;
}
