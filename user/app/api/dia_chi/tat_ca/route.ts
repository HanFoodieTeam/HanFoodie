// import { NextRequest, NextResponse } from "next/server";
// import { DiaChiModel } from "@/app/lib/models";
// import { IDiaChi } from "@/app/lib/cautrucdata";
// import { getUserFromToken } from "@/app/lib/auth"; // 🔑 helper xác thực JWT

// export async function GET(req: NextRequest): Promise<NextResponse> {
//   try {
  
//     const user = getUserFromToken(req);
//     if (!user) {
//       return NextResponse.json(
//         { message: "Token không hợp lệ hoặc đã hết hạn" },
//         { status: 401 }
//       );
//     }

//     const diaChiRaw = await DiaChiModel.findAll({
//       where: { id_nguoi_dung: user.id },
//       order: [
//         ["mac_dinh", "DESC"], 
//         ["id", "ASC"],        
//       ],
//     });

//     //  Chuyển Model Sequelize → object thuần TypeScript
//     const danhSach = diaChiRaw.map((x) => x.toJSON()) as IDiaChi[];

//     return NextResponse.json(danhSach, { status: 200 });
//   } catch (error) {
//     console.error("❌ Lỗi lấy danh sách địa chỉ:", error);
//     return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
//   }
  // }
  import { NextRequest, NextResponse } from "next/server";
  import { DiaChiModel } from "@/lib/models";
  import { IDiaChi } from "@/lib/cautrucdata";
  import { getUserFromToken } from "@/lib/auth";

  export async function GET(req: NextRequest) {
    try {
      const user = getUserFromToken(req);

      //  Xác thực token
      if (!user || !user.id) {
        return NextResponse.json(
          { message: "Token không hợp lệ hoặc đã hết hạn" },
          { status: 401 }
        );
      }

      //  Lấy tất cả địa chỉ của user
      const diaChiRaw = await DiaChiModel.findAll({
        where: { id_nguoi_dung: user.id },
        order: [
          ["mac_dinh", "DESC"], // địa chỉ mặc định lên đầu
          ["id", "ASC"],        // còn lại theo thứ tự tạo
        ],
      });

      //  Nếu chưa có địa chỉ nào
      if (!diaChiRaw || diaChiRaw.length === 0) {
        return NextResponse.json(
          { message: "Người dùng chưa có địa chỉ nào", dia_chi: [] },
          { status: 200 }
        );
      }

      //  Chuyển sang JSON thuần
      const danhSach = diaChiRaw.map((item) => item.toJSON()) as IDiaChi[];

      return NextResponse.json(danhSach, { status: 200 });
    } catch (error) {
      console.error("❌ Lỗi lấy danh sách địa chỉ:", error);
      return NextResponse.json(
        { message: "Lỗi server", chi_tiet: (error as Error).message },
        { status: 500 }
      );
    }
  }
