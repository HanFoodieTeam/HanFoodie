import { NextResponse } from "next/server";
import { YeuThichModel, SanPhamModel } from "@/lib/models";
import jwt from "jsonwebtoken";

function getUserIdFromRequest(req: Request): number | null {
  const auth = req.headers.get("authorization");
  if (!auth) return null;

  const token = auth.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

  return decoded.id;
}

export async function GET(req: Request) {
  try {
    const id_nguoi_dung = getUserIdFromRequest(req);
    if (!id_nguoi_dung)
      return NextResponse.json({ success: false }, { status: 401 });

    const list = await YeuThichModel.findAll({
      where: { id_nguoi_dung },
      include: [{
        model: SanPhamModel,
        as: "san_pham",
      }],
    });

    return NextResponse.json({ success: true, data: list });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
export async function POST(req: Request) {
  const id_nguoi_dung = getUserIdFromRequest(req);
  if (!id_nguoi_dung)
    return NextResponse.json({ success: false }, { status: 401 });

  const { id_san_pham } = await req.json();

  const existing = await YeuThichModel.findOne({
    where: { id_nguoi_dung, id_san_pham },
  });

  if (existing)
    return NextResponse.json({ success: false });

  await YeuThichModel.create({ id_nguoi_dung, id_san_pham });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const id_nguoi_dung = getUserIdFromRequest(req);
  if (!id_nguoi_dung)
    return NextResponse.json({ success: false }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id_san_pham = searchParams.get("id_san_pham");

  await YeuThichModel.destroy({
    where: { id_nguoi_dung, id_san_pham },
  });

  return NextResponse.json({ success: true });
}

// export async function GET(req: Request) {
//   try {
//     const userId = req.user.id; // từ middleware

//     const list = await YeuThichModel.findAll({
//       where: { id_nguoi_dung: userId },
//       include: [
//         {
//           model: SanPhamModel,
//           as: "san_pham",
//           attributes: ["id", "ten", "hinh", "gia_goc", "slug"],
//         },
//       ],
//     });

//     return NextResponse.json({ success: true, data: list });
//   } catch (err) {
//     return NextResponse.json(
//       { success: false, message: "Lỗi server" },
//       { status: 500 }
//     );
//   }
// }
// export async function POST(req: Request) {
//   try {
//     const userId = req.user.id;
//     const { id_san_pham } = await req.json();

//     if (!id_san_pham) {
//       return NextResponse.json(
//         { success: false, message: "Thiếu id_san_pham" },
//         { status: 400 }
//       );
//     }

//     const existing = await YeuThichModel.findOne({
//       where: { id_nguoi_dung: userId, id_san_pham },
//     });

//     if (existing) {
//       return NextResponse.json(
//         { success: false, message: "Đã có trong yêu thích" },
//         { status: 400 }
//       );
//     }

//     const yt = await YeuThichModel.create({
//       id_nguoi_dung: userId,
//       id_san_pham,
//     });

//     return NextResponse.json({ success: true, data: yt });
//   } catch {
//     return NextResponse.json(
//       { success: false, message: "Lỗi server" },
//       { status: 500 }
//     );
//   }
// }
// export async function DELETE(req: Request) {
//   try {
//     const userId = req.user.id;
//     const { searchParams } = new URL(req.url);
//     const id_san_pham = searchParams.get("id_san_pham");

//     if (!id_san_pham) {
//       return NextResponse.json(
//         { success: false, message: "Thiếu id_san_pham" },
//         { status: 400 }
//       );
//     }

//     await YeuThichModel.destroy({
//       where: {
//         id_nguoi_dung: userId,
//         id_san_pham,
//       },
//     });

//     return NextResponse.json({ success: true });
//   } catch {
//     return NextResponse.json(
//       { success: false, message: "Lỗi server" },
//       { status: 500 }
//     );
//   }
// }
