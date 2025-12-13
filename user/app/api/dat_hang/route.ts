import { NextResponse, NextRequest } from "next/server";
import { DonHangModel, ChiTietDonHangModel, MaGiamGiaModel, GioHangModel, BienTheModel, SanPhamModel, NguoiDungModel } from "@/lib/models";
import { db } from "@/lib/database";
import { Transaction } from "sequelize";
import { getUserFromToken } from "@/lib/auth";
import { IChiTietDonHang } from "@/lib/cautrucdata";
import { sendMail } from "../../GUI_EMAIL/guiemail_dh";
import { orderEmailTemplate } from "@/app/GUI_EMAIL/orderEmail";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const t: Transaction = await db.transaction();

    try {

        const user = getUserFromToken(req);
        if (!user) {
            return NextResponse.json({ success: false, message: "Không xác thực được người dùng" }, { status: 401 });
        }
        // Kiểm tra người dùng đã kích hoạt hay chưa
        const userDB = await NguoiDungModel.findByPk(user.id);
        if (!userDB || !userDB.getDataValue("kich_hoat")) {
            return NextResponse.json(
                { success: false, message: "Tài khoản chưa được kích hoạt" },
                { status: 403 }
            );
        }


        const id_nguoi_dung = user.id;
        const body = await req.json();

        const {
            ho_ten_nguoi_nhan,
            dia_chi_nguoi_nhan,
            sdt_nguoi_nhan,
            ghi_chu,
            phuong_thuc_thanh_toan,
            id_ma_giam_gia,
            danh_sach_san_pham,
        }: {
            dia_chi?: string;
            ho_ten_nguoi_nhan: string;
            dia_chi_nguoi_nhan: string;
            sdt_nguoi_nhan: number;
            ghi_chu?: string | null;
            phuong_thuc_thanh_toan: boolean;
            id_ma_giam_gia?: number | null;
            danh_sach_san_pham: (Omit<IChiTietDonHang, "id" | "id_don_hang" | "thanh_tien"> & {
                id_gio_hang?: number;
            })[];
        } = body;



        if (!danh_sach_san_pham?.length) {
            return NextResponse.json({ success: false, message: "Không có sản phẩm nào trong đơn hàng" }, { status: 400 });
        }

        //  Tính tổng tiền hàng
        const tong_tien_hang = danh_sach_san_pham.reduce(
            (tong, sp) => tong + sp.don_gia * sp.so_luong, 0
        );

        //  Tính giảm giá
        let so_tien_giam = 0;
        if (id_ma_giam_gia) {
            const ma = await MaGiamGiaModel.findByPk(id_ma_giam_gia);
            if (ma) {
                const now = new Date();
                const ngayBatDau = new Date(ma.getDataValue("bat_dau"));
                const ngayKetThuc = new Date(ma.getDataValue("ket_thuc"));

                if (now >= ngayBatDau && now <= ngayKetThuc && ma.getDataValue("so_luong") > 0) {
                    const loai = ma.getDataValue("loai_giam_gia");
                    const giaTri = ma.getDataValue("gia_tri_giam");
                    const toiDa = ma.getDataValue("gia_tri_giam_toi_da");

                    so_tien_giam =
                        loai === 0
                            ? giaTri
                            : Math.min((tong_tien_hang * giaTri) / 100, toiDa ?? Infinity);

                    await ma.update({ so_luong: ma.getDataValue("so_luong") - 1 }, { transaction: t });
                }
            }
        }

        const so_tien_thanh_toan = Math.max(tong_tien_hang - so_tien_giam, 0);


        // Sinh mã đơn tự độnglấy từ tên sản phẩm thật trong DB
        let prefix = "SP";
        let idSanPham = 0;

        try {
            const idBienThe = danh_sach_san_pham[0]?.id_bien_the;
            if (idBienThe) {
                const bienThe = await BienTheModel.findByPk(idBienThe, {
                    include: [{ model: SanPhamModel, as: "san_pham" }],
                });

                const tenSanPham = bienThe?.getDataValue("san_pham")?.ten || "SP";
                idSanPham = bienThe?.getDataValue("san_pham")?.id || 0;

                const tenKhongDau = tenSanPham
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/đ/g, "d")
                    .replace(/Đ/g, "D");

                prefix = tenKhongDau.replace(/\s+/g, "").slice(0, 2).toUpperCase();
            }
        } catch {
            prefix = "SP";
        }



        const vnTime = new Date(
            new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
        );

        const day = String(vnTime.getDate()).padStart(2, "0");
        const month = String(vnTime.getMonth() + 1).padStart(2, "0");
        const year = String(vnTime.getFullYear()).slice(-2);
        const hour = String(vnTime.getHours()).padStart(2, "0");
        const minute = String(vnTime.getMinutes()).padStart(2, "0");
        const second = String(vnTime.getSeconds()).padStart(2, "0");

        const ma_don = `${idSanPham}${prefix}${day}${month}${hour}${minute}${second}${id_nguoi_dung}`;


        //  Lưu đơn hàng
        const donHang = await DonHangModel.create(
            {
                id_nguoi_dung,
                ho_ten_nguoi_nhan,
                dia_chi_nguoi_nhan,
                sdt_nguoi_nhan,
                ghi_chu: ghi_chu ?? null,
                phuong_thuc_thanh_toan,
                id_ma_giam_gia: id_ma_giam_gia ?? null,
                tong_tien_hang,
                so_tien_giam,
                so_tien_thanh_toan,
                ma_don,
                trang_thai: "cho_xac_nhan",
                ngay_tao: new Date(),
                ngay_cap_nhat: new Date(),
            },
            { transaction: t }
        );

        //  Lưu chi tiết đơn hàng
        for (const sp of danh_sach_san_pham) {
            const thanh_tien = sp.don_gia * sp.so_luong;

            await ChiTietDonHangModel.create(
                {
                    id_don_hang: donHang.id,
                    id_bien_the: sp.id_bien_the ?? null,
                    don_gia: sp.don_gia,
                    so_luong: sp.so_luong,
                    thanh_tien,
                    json_tuy_chon: sp.json_tuy_chon ?? null,
                    json_mon_them: sp.json_mon_them ?? null,
                },
                { transaction: t }
            );
        }
        // xóa sản phâm ở giỏ hàng theo id giỏ hagf

        const idGioHangDaDat = danh_sach_san_pham
            .map((sp) => sp.id_gio_hang)
            .filter((id): id is number => !!id);

        if (idGioHangDaDat.length > 0) {
            await GioHangModel.destroy({
                where: { id: idGioHangDaDat },
                transaction: t,
            });
        }
        await t.commit();




        // Lấy thông tin gửi email 
        const sanPhamListHtml: string = (
            await Promise.all(
                danh_sach_san_pham.map(async (sp) => {
                    if (!sp.id_bien_the) return "";

                    const bienThe = await BienTheModel.findByPk(sp.id_bien_the, {
                        include: [{ model: SanPhamModel, as: "san_pham" }],
                    });

                    const data = bienThe?.get({ plain: true }) as {
                        ten?: string;
                        san_pham?: { ten: string; hinh: string };
                    };

                    const tenSP = data?.san_pham?.ten ?? "Sản phẩm";
                    const tenBienThe = data?.ten ?? null;
                    const hinhSP = data?.san_pham?.hinh ?? "";

                    let textTuyChon = "";
                    if (sp.json_tuy_chon) {
                        const obj = JSON.parse(sp.json_tuy_chon);
                        textTuyChon = Object.entries(obj)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(", ");
                    }

                    let textMonThem = "";
                    if (sp.json_mon_them) {
                        const arr = JSON.parse(sp.json_mon_them);
                        if (Array.isArray(arr) && arr.length > 0) {
                            textMonThem = arr
                                .map(
                                    (m: { ten: string; gia_them?: number }) =>
                                        `${m.ten}`
                                )
                                .join(", ");
                        }
                    }

                    return `
                <div style="display:flex; margin-bottom:14px;">
                    <img src="${hinhSP}" width="80" height="80"
                        style="object-fit:cover; border-radius:6px; margin-right:12px;" />
                    <div>
                        <strong>${tenSP}</strong><br/>
                        ${tenBienThe ? `Biến thể: ${tenBienThe}<br/>` : ""}
                        ${textTuyChon ? `Tuỳ chọn: ${textTuyChon}<br/>` : ""}
                        ${textMonThem ? `Món thêm: ${textMonThem}<br/>` : ""}
                        ${ghi_chu ? `Ghi chú: ${ghi_chu}<br/>` : ""}
                        Số lượng: ${sp.so_luong}<br/>
                        Giá: ${sp.don_gia.toLocaleString()}đ
                    </div>
                </div>
            `;
                })
            )
        ).join("");



        const baseUrl = process.env.APP_URL ?? "http://localhost:3000";
        const urlDonHang = `${baseUrl}/chi_tiet_don_hang/${donHang.id}`;
        const logoUrl = `${baseUrl}/logOut.png`;
        // gửi email khi cod  
        if (phuong_thuc_thanh_toan === true) {
            await sendMail(
                user.email,
                "Đặt hàng thành công - HanFoodie",
                orderEmailTemplate({
                    logoUrl,
                    hoTen: ho_ten_nguoi_nhan,
                    maDon: donHang.ma_don,
                    ngayDat: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
                    phuongThucThanhToan: phuong_thuc_thanh_toan ? "Thanh toán khi nhận hàng" : "Thanh toán online",
                    sanPhamListHtml,
                    tongTienHang: tong_tien_hang,
                    giamGia: so_tien_giam,
                    tongThanhToan: so_tien_thanh_toan,
                    urlDonHang
                })
            );
        }


        return NextResponse.json({
            success: true,
            message: "Đặt hàng thành công!",
            data: {
                id: donHang.id,
                ma_don: donHang.ma_don,
                tong_tien_hang,
                so_tien_giam,
                so_tien_thanh_toan,
            },
        });
    } catch (error) {
        await t.rollback();
        console.error("Lỗi khi đặt hàng:", error);
        return NextResponse.json({ success: false, message: "Đặt hàng thất bại", error });
    }
}
