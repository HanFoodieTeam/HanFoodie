// import { NextResponse } from "next/server";
// import { NguoiDungModel } from "@/app/lib/models";
// import bcrypt from "bcryptjs";
// import nodemailer from "nodemailer";

// /**
//  * 🔹 Hàm mã hóa mật khẩu
//  */
// function hashPassword(password: string) {
//   const salt = bcrypt.genSaltSync(10);
//   return bcrypt.hashSync(password, salt);
// }

// /**
//  * 🔹 Hàm gửi email (qua Gmail App Password)
//  */
// async function sendMail({
//   to,
//   subject,
//   text,
// }: {
//   to: string;
//   subject: string;
//   text: string;
// }) {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: `"HanFoodie" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text,
//   });
// }

// /**
//  * 🔹 API POST /api/quen_mat_khau
//  */
// export async function POST(req: Request) {
//   try {
//     const { email } = await req.json();

//     if (!email) {
//       return NextResponse.json(
//         { thong_bao: "Vui lòng nhập email" },
//         { status: 400 }
//       );
//     }

//     // 🔸 Kiểm tra người dùng có tồn tại
//     const user = await NguoiDungModel.findOne({ where: { email } });
//     if (!user) {
//       return NextResponse.json(
//         { thong_bao: "Email không tồn tại trong hệ thống" },
//         { status: 404 }
//       );
//     }

//     // 🔸 Tạo mật khẩu mới ngẫu nhiên
//     const newPassword = Math.random().toString(36).slice(-8);

//     // 🔸 Hash và cập nhật lại trong DB
//     const hashedPassword = hashPassword(newPassword);
//     await NguoiDungModel.update(
//       { mat_khau: hashedPassword },
//       { where: { email } }
//     );

//     // 🔸 Gửi mật khẩu qua email
//     await sendMail({
//       to: email,
//       subject: "Khôi phục mật khẩu - HanFoodie",
//       text: `Xin chào ${user.getDataValue("ho_ten") || "bạn"},\n\nMật khẩu mới của bạn là: ${newPassword}\n\nHãy đăng nhập và đổi mật khẩu ngay sau khi đăng nhập.`,
//     });

//     return NextResponse.json({
//       thong_bao: "Đã gửi mật khẩu mới qua email",
//     });
//   } catch (error) {
//     console.error("Lỗi khi khôi phục mật khẩu:", error);
//     return NextResponse.json(
//       { thong_bao: "Lỗi máy chủ", chi_tiet: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { NguoiDungModel } from "@/app/lib/models";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

/**
 * 🔹 Hàm mã hóa mật khẩu
 */
function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

/**
 * 🔹 Hàm gửi email (qua Gmail App Password)
 */
async function sendMail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"HanFoodie" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
}

/**
 * 🔹 API POST /api/quen_mat_khau
 */
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { thong_bao: "Vui lòng nhập email" },
        { status: 400 }
      );
    }

    // 🔸 Kiểm tra người dùng có tồn tại
    const user = await NguoiDungModel.findOne({ where: { email } });

    if (!user) {
      return NextResponse.json(
        { thong_bao: "Email không tồn tại trong hệ thống" },
        { status: 404 }
      );
    }

    // 🔸 Tạo mật khẩu mới ngẫu nhiên
    const newPassword = Math.random().toString(36).slice(-8);

    // 🔸 Hash và cập nhật lại trong DB
    const hashedPassword = hashPassword(newPassword);
    await NguoiDungModel.update(
      { mat_khau: hashedPassword },
      { where: { email } }
    );

    // 🔸 Gửi mật khẩu qua email
    await sendMail({
      to: email,
      subject: "Khôi phục mật khẩu - HanFoodie",
      text: `Xin chào ${user.getDataValue("ho_ten") || "bạn"},\n\nMật khẩu mới của bạn là: ${newPassword}\n\nHãy đăng nhập và đổi mật khẩu ngay sau khi đăng nhập.`,
    });

    return NextResponse.json({ thong_bao: "Đã gửi mật khẩu mới qua email" });
  } catch (error) {
    console.error("🔥 Lỗi khi khôi phục mật khẩu:", error);
    return NextResponse.json(
      { thong_bao: "Lỗi máy chủ", chi_tiet: (error as Error).message },
      { status: 500 }
    );
  }
}
