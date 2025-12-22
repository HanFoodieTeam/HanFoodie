import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { NguoiDungModel } from "@/lib/models";
import { uploadHinh } from "@/lib/uploadHinh";

function xacThucNguoiDung(req: Request): number | null {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return null;

  try {
    const secret = process.env.JWT_SECRET || "HanFoodieSecretKey123!";
    const decode = jwt.verify(token, secret) as { id: number };
    return decode.id;
  } catch {
    return null;
  }
}

// ============================ GET ============================
export async function GET(req: Request) {
  try {
    const userId = xacThucNguoiDung(req);
    if (!userId)
      return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

    const user = await NguoiDungModel.findOne({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

    return NextResponse.json({
      thong_bao: "Lấy thông tin thành công",
      nguoi_dung: {
        id: user.id,
        ho_ten: user.ho_ten,
        email: user.email,
        sdt: user.sdt,
        ngay_sinh: user.ngay_sinh,
        hinh: user.hinh ?? "/avatar.png",
      },
    });
  } catch (err) {
    console.error("Lỗi GET hồ sơ:", err);
    return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
  }
}

// ============================ POST - UPDATE ============================
export async function POST(req: Request) {
  try {
    const userId = xacThucNguoiDung(req);
    if (!userId)
      return NextResponse.json({ thong_bao: "Token không hợp lệ" }, { status: 401 });

    const formData = await req.formData();

    const ho_ten = formData.get("ho_ten")?.toString().trim() || "";
    const sdt = formData.get("sdt")?.toString().trim() || "";
    const ngay_sinh = formData.get("ngay_sinh")?.toString().trim() || "";
    const file = formData.get("hinh") as File | null;

    // ================= VALIDATION =================

    if (ho_ten.length < 3)
      return NextResponse.json({ thong_bao: "Tên phải có ít nhất 3 ký tự" }, { status: 400 });

    if (sdt && !/^\d{9,11}$/.test(sdt))
      return NextResponse.json(
        { thong_bao: "Số điện thoại không hợp lệ (9-11 số)" },
        { status: 400 }
      );

    if (ngay_sinh && isNaN(Date.parse(ngay_sinh)))
      return NextResponse.json({ thong_bao: "Ngày sinh không hợp lệ" }, { status: 400 });

    // ================= LẤY USER =================
    const user = await NguoiDungModel.findOne({ where: { id: userId } });
    if (!user)
      return NextResponse.json({ thong_bao: "Không tìm thấy người dùng" }, { status: 404 });

    // ================= XỬ LÝ SĐT (string → number) =================

    let sdtUpdate: number | null = user.sdt ?? null;
    if (sdt && /^\d+$/.test(sdt)) {
      sdtUpdate = Number(sdt);
    }

    // ================= UPLOAD AVATAR =================

    let hinhUrl: string | undefined = user.hinh || undefined;

    if (file && file.size > 0) {
      const uploaded = await uploadHinh(file);
      if (uploaded) hinhUrl = uploaded;
    }

    // ================= CẬP NHẬT USER =================

    await user.update({
      ho_ten,
      sdt: sdtUpdate,
      ngay_sinh: ngay_sinh || user.ngay_sinh,
      hinh: hinhUrl,
    });

    return NextResponse.json({
      thong_bao: "Cập nhật hồ sơ thành công!",
      nguoi_dung: {
        id: user.id,
        ho_ten: user.ho_ten,
        email: user.email,
        sdt: user.sdt,
        ngay_sinh: user.ngay_sinh,
        hinh: hinhUrl,
      },
    });
  } catch (err) {
    console.error("Lỗi POST hồ sơ:", err);
    return NextResponse.json({ thong_bao: "Lỗi server" }, { status: 500 });
  }
}
