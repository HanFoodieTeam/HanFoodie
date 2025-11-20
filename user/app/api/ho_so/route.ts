// // // // import { NextResponse } from "next/server";
// // // // import { NguoiDungModel } from "@/app/lib/models";
// // // // import jwt from "jsonwebtoken";

// // // // export async function POST(req: Request) {
// // // //   try {
// // // //     const authHeader = req.headers.get("authorization");
// // // //     if (!authHeader) {
// // // //       return NextResponse.json({ thong_bao: "Thiếu token" }, { status: 401 });
// // // //     }

// // // //     const token = authHeader.split(" ")[1];
// // // //     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";

// // // //     let userData;
// // // //     try {
// // // //       userData = jwt.verify(token, secret);
// // // //     } catch {
// // // //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 403 });
// // // //     }

// // // //     const { ho_ten, sdt, gioi_tinh, ngay_sinh } = await req.json();

// // // //     // Tìm user theo ID trong token
// // // //     const user = await NguoiDungModel.findOne({ where: { id: userData.id } });
// // // //     if (!user) {
// // // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// // // //     }

// // // //     // Cập nhật thông tin
// // // //     await user.update({
// // // //       ho_ten,
// // // //       sdt,
// // // //       ngay_sinh,
// // // //       tep_khach: gioi_tinh, // nếu bạn chưa có cột gioi_tinh, tạm lưu vào đây
// // // //     });

// // // //     return NextResponse.json({ thong_bao: "Cập nhật hồ sơ thành công!" });
// // // //   } catch (error) {
// // // //     console.error("Lỗi cập nhật hồ sơ:", error);
// // // //     return NextResponse.json(
// // // //       { thong_bao: "Lỗi server", chi_tiet: (error as Error).message },
// // // //       { status: 500 }
// // // //     );
// // // //   }
// // //   // }
// // // import { NextResponse } from "next/server";
// // // import jwt from "jsonwebtoken";
// // // import { NguoiDungModel } from "@/app/lib/models";

// // // // 🧩 Giải mã token và lấy ID người dùng
// // // function xacThucNguoiDung(req: Request) {
// // //   const authHeader = req.headers.get("authorization");
// // //   if (!authHeader) return null;

// // //   const token = authHeader.split(" ")[1];
// // //   const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// // //   try {
// // //     const userData = jwt.verify(token, secret) as { id: number };
// // //     return userData.id;
// // //   } catch {
// // //     return null;
// // //   }
// // // }

// // // /* 🟢 GET — Lấy thông tin người dùng */
// // // export async function GET(req: Request) {
// // //   try {
// // //     const userId = xacThucNguoiDung(req);
// // //     if (!userId) {
// // //       return NextResponse.json({ thong_bao: "Thiếu hoặc token không hợp lệ" }, { status: 401 });
// // //     }

// // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // //     if (!user) {
// // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// // //     }

// // //     const u = user.toJSON();
// // //     return NextResponse.json({
// // //       thong_bao: "Lấy thông tin thành công",
// // //       nguoi_dung: {
// // //         ho_ten: u.ho_ten,
// // //         email: u.email,
// // //         sdt: u.sdt,
// // //         ngay_sinh: u.ngay_sinh,
// // //       },
// // //     });
// // //   } catch (err) {
// // //     console.error("Lỗi lấy hồ sơ:", err);
// // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // //   }
// // // }

// // // /* 🟡 POST — Cập nhật thông tin người dùng */
// // // export async function POST(req: Request) {
// // //   try {
// // //     const userId = xacThucNguoiDung(req);
// // //     if (!userId) {
// // //       return NextResponse.json({ thong_bao: "Thiếu hoặc token không hợp lệ" }, { status: 401 });
// // //     }

// // //     const { ho_ten, sdt, ngay_sinh } = await req.json();

// // //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// // //     if (!user) {
// // //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// // //     }

// // //     await user.update({ ho_ten, sdt, ngay_sinh });

// // //     return NextResponse.json({ thong_bao: "Cập nhật hồ sơ thành công!" });
// // //   } catch (err) {
// // //     console.error("Lỗi cập nhật hồ sơ:", err);
// // //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// // //   }
// // // }

// // import { NextResponse } from "next/server";
// // import jwt from "jsonwebtoken";
// // import { promises as fs } from "fs";
// // import path from "path";
// // import { NguoiDungModel } from "@/app/lib/models";

// // // 🧩 Xác thực người dùng
// // function xacThucNguoiDung(req: Request) {
// //   const authHeader = req.headers.get("authorization");
// //   if (!authHeader) return null;

// //   const token = authHeader.split(" ")[1];
// //   const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
// //   try {
// //     const userData = jwt.verify(token, secret) as { id: number };
// //     return userData.id;
// //   } catch {
// //     return null;
// //   }
// // }

// // /* 🟢 GET — Lấy thông tin người dùng */
// // export async function GET(req: Request) {
// //   try {
// //     const userId = xacThucNguoiDung(req);
// //     if (!userId) {
// //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });
// //     }

// //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// //     if (!user) {
// //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// //     }

// //     const u = user.toJSON();
// //     return NextResponse.json({
// //       thong_bao: "Lấy thông tin thành công",
// //       nguoi_dung: {
// //         ho_ten: u.ho_ten,
// //         email: u.email,
// //         sdt: u.sdt,
// //         ngay_sinh: u.ngay_sinh,
// //         hinh: u.hinh ? `/uploads/avatars/${u.hinh}` : null,
// //       },
// //     });
// //   } catch (err) {
// //     console.error("Lỗi lấy hồ sơ:", err);
// //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// //   }
// // }

// // /* 🟡 POST — Cập nhật hồ sơ & ảnh */
// // export async function POST(req: Request) {
// //   try {
// //     const userId = xacThucNguoiDung(req);
// //     if (!userId) {
// //       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });
// //     }

// //     const formData = await req.formData();
// //     const ho_ten = formData.get("ho_ten")?.toString() || "";
// //     const sdt = formData.get("sdt")?.toString() || "";
// //     const ngay_sinh = formData.get("ngay_sinh")?.toString() || "";
// //     const file = formData.get("hinh") as File | null;

// //     const user = await NguoiDungModel.findOne({ where: { id: userId } });
// //     if (!user) {
// //       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
// //     }

// //     let tenFile: string | null = null;

// //     // 🔹 Nếu có upload file
// //     if (file && file.size > 0) {
// //       const buffer = Buffer.from(await file.arrayBuffer());
// //       const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
// //       await fs.mkdir(uploadDir, { recursive: true });

// //       tenFile = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
// //       const filePath = path.join(uploadDir, tenFile);
// //       await fs.writeFile(filePath, buffer);
// //     }

// //     // Cập nhật DB
// //     await user.update({
// //     ho_ten,
// //     sdt: sdt ? Number(sdt) : null, // ✅ ép kiểu sang number
// //     ngay_sinh,
// //     ...(tenFile ? { hinh: tenFile } : {}),
// //   });


// //     return NextResponse.json({ thong_bao: "Cập nhật hồ sơ thành công!" });
// //   } catch (err) {
// //     console.error("Lỗi cập nhật hồ sơ:", err);
// //     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
// //   }
// // }
// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { promises as fs } from "fs";
// import path from "path";
// import { NguoiDungModel } from "@/app/lib/models";

// // 🧩 Xác thực người dùng
// function xacThucNguoiDung(req: Request) {
//   const token = req.headers.get("authorization")?.split(" ")[1];
//   if (!token) return null;

//   try {
//     const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
//     const userData = jwt.verify(token, secret) as { id: number };
//     return userData.id;
//   } catch {
//     return null;
//   }
// }

// /* 🟢 GET — Lấy thông tin người dùng */
// export async function GET(req: Request) {
//   try {
//     const userId = xacThucNguoiDung(req);
//     if (!userId) {
//       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });
//     }

//     const user = await NguoiDungModel.findOne({ where: { id: userId } });
//     if (!user) {
//       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
//     }

//     const u = user.toJSON();
//     return NextResponse.json({
//       thong_bao: "Lấy thông tin thành công",
//       nguoi_dung: {
//         id: u.id,
//         ho_ten: u.ho_ten,
//         email: u.email,
//         sdt: u.sdt,
//         ngay_sinh: u.ngay_sinh,
//         hinh: u.hinh ? `/uploads/avatars/${u.hinh}` : null,
//       },
//     });
//   } catch (err) {
//     console.error("Lỗi lấy hồ sơ:", err);
//     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
//   }
// }

// /* 🟡 POST — Cập nhật hồ sơ & ảnh */
// export async function POST(req: Request) {
//   try {
//     const userId = xacThucNguoiDung(req);
//     if (!userId) {
//       return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });
//     }

//     const formData = await req.formData();
//     const ho_ten = formData.get("ho_ten")?.toString() || "";
//     const sdt = formData.get("sdt")?.toString() || "";
//     const ngay_sinh = formData.get("ngay_sinh")?.toString() || "";
//     const file = formData.get("hinh") as File | null;

//     const user = await NguoiDungModel.findOne({ where: { id: userId } });
//     if (!user) {
//       return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });
//     }

//     let tenFile = user.hinh; // mặc định giữ ảnh cũ

//     // ✅ Nếu có upload file mới
//     if (file && file.size > 0) {
//       const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
//       await fs.mkdir(uploadDir, { recursive: true });

//       // ❌ Xoá ảnh cũ (nếu có)
//       if (user.hinh) {
//         const oldPath = path.join(uploadDir, user.hinh);
//         try {
//           await fs.unlink(oldPath);
//         } catch {
//           /* ignore if not exist */
//         }
//       }

//       // ✅ Lưu ảnh mới
//       tenFile = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
//       const filePath = path.join(uploadDir, tenFile);
//       const buffer = Buffer.from(await file.arrayBuffer());
//       await fs.writeFile(filePath, buffer);
//     }

//     // ✅ Cập nhật DB
 
//     await user.update({
//       ho_ten: ho_ten || user.ho_ten,
//       sdt: sdt ? Number(sdt) : null,
//       ngay_sinh: ngay_sinh || user.ngay_sinh,
//       hinh: tenFile || user.hinh,
//     });

//     return NextResponse.json({
//       thong_bao: "✅ Cập nhật hồ sơ thành công!",
//       nguoi_dung: {
//         id: user.id,
//         ho_ten: user.ho_ten,
//         email: user.email,
//         sdt: user.sdt,
//         ngay_sinh: user.ngay_sinh,
//         hinh: tenFile ? `/uploads/avatars/${tenFile}` : null,
//       },
//     });
//   } catch (err) {
//     console.error("Lỗi cập nhật hồ sơ:", err);
//     return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { promises as fs } from "fs";
import path from "path";
import { NguoiDungModel } from "@/app/lib/models";

function xacThucNguoiDung(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return null;

  try {
    const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
    const userData = jwt.verify(token, secret) as { id: number };
    return userData.id;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  try {
    const userId = xacThucNguoiDung(req);
    if (!userId)
      return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

    const user = await NguoiDungModel.findOne({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

    const u = user.toJSON();
    return NextResponse.json({
      thong_bao: "Lấy thông tin thành công",
      nguoi_dung: {
        id: u.id,
        ho_ten: u.ho_ten,
        email: u.email,
        sdt: u.sdt,
        ngay_sinh: u.ngay_sinh,
        hinh: u.hinh ? `/uploads/avatars/${u.hinh}` : null,
      },
    });
  } catch (err) {
    console.error("Lỗi lấy hồ sơ:", err);
    return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const userId = xacThucNguoiDung(req);
    if (!userId)
      return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

    const formData = await req.formData();
    const ho_ten = formData.get("ho_ten")?.toString() || "";
    const sdt = formData.get("sdt")?.toString() || "";
    const ngay_sinh = formData.get("ngay_sinh")?.toString() || "";
    const file = formData.get("hinh") as File | null;

    const user = await NguoiDungModel.findOne({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

    let tenFile = user.hinh;

    if (file && file.size > 0) {
      const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");
      await fs.mkdir(uploadDir, { recursive: true });

      if (user.hinh) {
        const oldPath = path.join(uploadDir, user.hinh);
        try { await fs.unlink(oldPath); } catch {}
      }

      tenFile = `${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
      const filePath = path.join(uploadDir, tenFile);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(filePath, buffer);
    }

    await user.update({
      ho_ten: ho_ten || user.ho_ten,
       sdt: sdt ? Number(sdt) : null,
      ngay_sinh: ngay_sinh || user.ngay_sinh,
      hinh: tenFile || user.hinh,
    });

    return NextResponse.json({
      thong_bao: "✅ Cập nhật hồ sơ thành công!",
      nguoi_dung: {
        id: user.id,
        ho_ten: user.ho_ten,
        email: user.email,
        sdt: user.sdt,
        ngay_sinh: user.ngay_sinh,
        hinh: tenFile ? `/uploads/avatars/${tenFile}` : null,
      },
    });
  } catch (err) {
    console.error("Lỗi cập nhật hồ sơ:", err);
    return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
  }
}
