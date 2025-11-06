// import { NextRequest, NextResponse } from "next/server";
// import { DiaChiModel } from "@/app/lib/models";
// import { getUserFromToken } from "@/app/lib/auth";

// //  GET: lấy tất cả địa chỉ của user
// export async function GET(req: NextRequest) {
//   try {
//     const user = getUserFromToken(req);
//     if (!user || !user.id) {
//       return NextResponse.json({ message: "Token không hợp lệ hoặc đã hết hạn" }, { status: 401 });
//     }

//     const diaChiRaw = await DiaChiModel.findAll({
//       where: { id_nguoi_dung: user.id },
//       order: [
//         ["mac_dinh", "DESC"],
//         ["id", "ASC"],
//       ],
//     });

//     const danhSach = diaChiRaw.map((x) => x.toJSON());
//     return NextResponse.json(danhSach, { status: 200 });
//   } catch (error) {
//     console.error("❌ Lỗi lấy danh sách địa chỉ:", error);
//     return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
//   }
// }

// //  POST: thêm địa chỉ mới
// export async function POST(req: NextRequest) {
//   try {
//     const user = getUserFromToken(req);
//     if (!user) {
//       return NextResponse.json({ message: "Token không hợp lệ hoặc đã hết hạn" }, { status: 401 });
//     }

//     const body = await req.json();
//     const { ten_duong, phuong, tinh, ho_ten, sdt, mac_dinh } = body;

//     if (!ten_duong || !phuong || !tinh || !ho_ten || !sdt) {
//       return NextResponse.json({ message: "Thiếu thông tin bắt buộc" }, { status: 400 });
//     }

//     const count = await DiaChiModel.count({ where: { id_nguoi_dung: user.id } });
//     let laMacDinh = count === 0 ? true : mac_dinh === true;

//     if (laMacDinh) {
//       await DiaChiModel.update({ mac_dinh: false }, { where: { id_nguoi_dung: user.id } });
//     }

//     const diaChiMoi = await DiaChiModel.create({
//       id_nguoi_dung: user.id,
//       ten_duong,
//       phuong,
//       tinh,
//       ho_ten,
//       sdt,
//       mac_dinh: laMacDinh,
//     });

//     return NextResponse.json({ message: "Thêm địa chỉ thành công", dia_chi: diaChiMoi });
//   } catch (error) {
//     console.error("🔥 Lỗi thêm địa chỉ:", error);
//     return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
//   }
// }

// //  PATCH: cập nhật địa chỉ
// export async function PATCH(req: NextRequest) {
//   try {
//     const user = getUserFromToken(req);
//     if (!user) {
//       return NextResponse.json({ message: "Token không hợp lệ hoặc đã hết hạn" }, { status: 401 });
//     }

//     const body = await req.json();
//     const { id, ten_duong, phuong, tinh, ho_ten, sdt, mac_dinh } = body;

//     if (!id) {
//       return NextResponse.json({ message: "Thiếu ID địa chỉ cần cập nhật" }, { status: 400 });
//     }

//     const diaChi = await DiaChiModel.findOne({
//       where: { id, id_nguoi_dung: user.id },
//     });

//     if (!diaChi) {
//       return NextResponse.json({ message: "Không tìm thấy địa chỉ" }, { status: 404 });
//     }

//     if (mac_dinh === true) {
//       await DiaChiModel.update({ mac_dinh: false }, { where: { id_nguoi_dung: user.id } });
//     }

//     await diaChi.update({ ten_duong, phuong, tinh, ho_ten, sdt, mac_dinh });

//     return NextResponse.json({ message: "Cập nhật địa chỉ thành công" });
//   } catch (error) {
//     console.error("🔥 Lỗi cập nhật địa chỉ:", error);
//     return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
//   }
// }

// //  DELETE: xóa địa chỉ
// export async function DELETE(req: NextRequest) {
//   try {
//     const user = getUserFromToken(req);
//     if (!user) {
//       return NextResponse.json({ message: "Token không hợp lệ hoặc đã hết hạn" }, { status: 401 });
//     }

//     const body = await req.json();
//     const { id } = body;

//     if (!id) {
//       return NextResponse.json({ message: "Thiếu ID địa chỉ cần xóa" }, { status: 400 });
//     }

//     const diaChi = await DiaChiModel.findOne({
//       where: { id, id_nguoi_dung: user.id },
//     });

//     if (!diaChi) {
//       return NextResponse.json({ message: "Không tìm thấy địa chỉ" }, { status: 404 });
//     }

//     await diaChi.destroy();
//     return NextResponse.json({ message: "Xóa địa chỉ thành công" });
//   } catch (error) {
//     console.error("🔥 Lỗi xóa địa chỉ:", error);
//     return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { DiaChiModel } from "@/app/lib/models";
import { getUserFromToken } from "@/app/lib/auth";
import { IDiaChi } from "@/app/lib/cautrucdata";

// 🟢 LẤY DANH SÁCH ĐỊA CHỈ
export async function GET(req: NextRequest) {
  try {
    const user = getUserFromToken(req);
    if (!user) return NextResponse.json({ message: "Token không hợp lệ" }, { status: 401 });

    const ds = await DiaChiModel.findAll({
      where: { id_nguoi_dung: user.id },
      order: [["mac_dinh", "DESC"], ["id", "ASC"]],
    });
    const danhSach = ds.map((x) => x.toJSON()) as IDiaChi[];

    return NextResponse.json(danhSach);
  } catch (error) {
    console.error("GET /api/dia_chi lỗi:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}

// 🟢 THÊM / CẬP NHẬT
export async function POST(req: NextRequest) {
  try {
    const user = getUserFromToken(req);
    if (!user) return NextResponse.json({ message: "Token không hợp lệ" }, { status: 401 });

    const body = await req.json();
    const { id, ten_duong, phuong, tinh, ho_ten, sdt, mac_dinh } = body;

    if (!ten_duong || !phuong || !tinh || !ho_ten || !sdt)
      return NextResponse.json({ message: "Thiếu thông tin" }, { status: 400 });

    let laMacDinh = false;

    // Nếu người dùng chưa có địa chỉ, đặt mặc định
    const count = await DiaChiModel.count({ where: { id_nguoi_dung: user.id } });
    if (count === 0) laMacDinh = true;
    else if (mac_dinh === true) laMacDinh = true;

    if (laMacDinh) {
      await DiaChiModel.update(
        { mac_dinh: false },
        { where: { id_nguoi_dung: user.id } }
      );
    }

    let diaChi;
    if (id) {
      // 🔵 CẬP NHẬT
      diaChi = await DiaChiModel.findOne({ where: { id, id_nguoi_dung: user.id } });
      if (!diaChi)
        return NextResponse.json({ message: "Không tìm thấy địa chỉ" }, { status: 404 });

      await diaChi.update({ ten_duong, phuong, tinh, ho_ten, sdt, mac_dinh: laMacDinh });
    } else {
      // 🟢 THÊM
      diaChi = await DiaChiModel.create({
        id_nguoi_dung: user.id,
        ten_duong,
        phuong,
        tinh,
        ho_ten,
        sdt,
        mac_dinh: laMacDinh,
      });
    }

    return NextResponse.json({
      message: id ? "Cập nhật thành công" : "Thêm địa chỉ thành công",
      dia_chi: diaChi,
    });
  } catch (error) {
    console.error("POST /api/dia_chi lỗi:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}

// 🔴 XOÁ ĐỊA CHỈ
export async function DELETE(req: NextRequest) {
  try {
    const user = getUserFromToken(req);
    if (!user) return NextResponse.json({ message: "Token không hợp lệ" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    if (!id) return NextResponse.json({ message: "Thiếu ID địa chỉ" }, { status: 400 });

    const diaChi = await DiaChiModel.findOne({ where: { id, id_nguoi_dung: user.id } });
    if (!diaChi)
      return NextResponse.json({ message: "Không tìm thấy địa chỉ" }, { status: 404 });

    await diaChi.destroy();

    return NextResponse.json({ message: "Đã xóa địa chỉ" });
  } catch (error) {
    console.error("DELETE /api/dia_chi lỗi:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
