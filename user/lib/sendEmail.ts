// import { Resend } from "resend";

// export async function sendEmail(
//   to: string,
//   subject: string,
//   html: string
// ) {
//   console.log("📨 sendEmail() CALLED →", to);

//   const apiKey = process.env.RESEND_API_KEY;

//   if (!apiKey) {
//     throw new Error("RESEND_API_KEY is missing");
//   }

//   const resend = new Resend(apiKey);

//   const res = await resend.emails.send({
//     from: "HanFoodie <no-reply@hanfoodie.io.vn>",
//     to,
//     subject,
//     html,
//   });

//   console.log("📩 Resend API response:", res);
//   return res;
// }



import { Resend } from "resend";

  const resend = new Resend(process.env.RESEND_API_KEY!);

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
