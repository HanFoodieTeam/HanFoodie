import { NextResponse, NextRequest } from "next/server";
import { DonHangModel, ChiTietDonHangModel, MaGiamGiaModel, GioHangModel } from "@/app/lib/models";
import { db } from "@/app/lib/database";
import { Transaction } from "sequelize";
import { getUserFromToken } from "@/app/lib/auth";
import { IChiTietDonHang } from "@/app/lib/cautrucdata";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const t: Transaction = await db.transaction();

    try {
        // ✅ Lấy người dùng từ token
        const user = getUserFromToken(req);
        if (!user) {
            return NextResponse.json({ success: false, message: "Không xác thực được người dùng" }, { status: 401 });
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
            danh_sach_san_pham: Omit<IChiTietDonHang, "id" | "id_don_hang" | "thanh_tien">[];
        } = body;

        if (!danh_sach_san_pham?.length) {
            return NextResponse.json({ success: false, message: "Không có sản phẩm nào trong đơn hàng" }, { status: 400 });
        }

        //  Tính tổng tiền hàng
        const tong_tien_hang = danh_sach_san_pham.reduce(
            (tong, sp) => tong + sp.don_gia * sp.so_luong,
            0
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
        const ma_don = "HD" + Date.now().toString().slice(-8);

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
        // xóa sản phâm ở giỏ hàng
        await GioHangModel.destroy({ where: { id_nguoi_dung }, transaction: t });
        await t.commit();

        return NextResponse.json({
            success: true,
            message: "Đặt hàng thành công!",
            data: {
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
