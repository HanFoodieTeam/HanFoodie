import { IMaGiamGia } from "../lib/cautrucdata";
import Link from "next/link";

export default async function MaGiamGiaList() {
    const data = await fetch(`${process.env.APP_URL}/api/ma_giam_gia`);
    const mgg_arr: IMaGiamGia[] = await data.json();

    const hienThiLoaiGiamGia = (loai: boolean): string => {
        return loai ? "Phần trăm (%)" : "Số tiền cố định";
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div>
            <h1 className="text-xl p-2 bg-amber-300 font-bold uppercase">
                Danh sách Mã Giảm Giá
            </h1>

            <div className="flex justify-between mt-2">
                <input
                    type="text"
                    placeholder="Tìm mã giảm giá..."
                    className="border p-2 w-1/3"
                />
                <Link
                    href="/ma_giam_gia/them"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Thêm Mã Giảm Giá
                </Link>
            </div>

            <table className="table-auto w-full mt-4 border text-[0.9em]">
                <thead>
                    <tr className="bg-gray-300">
                        <th className="p-2">Tên/Mã số</th>
                        <th className="p-2">Giá trị giảm</th>
                        {/* <th className="p-2">Loại</th> */}
                        <th className="p-2">Tối thiểu</th>
                        <th className="p-2">Số lượng</th>
                        <th className="p-2">Bắt đầu/  <span>Kết thúc</span></th>
                        {/* <th className="p-2">Kết thúc</th> */}
                        <th className="p-2">Ẩn/Hiện</th>
                        <th className="p-2">Điều kiện</th>
                        <th className="p-2 ">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {mgg_arr.map((mgg) => {
                        const giaTriHienThi = mgg.loai_giam_gia
                            ? `${mgg.gia_tri_giam}%`
                            : `${Number(mgg.gia_tri_giam).toLocaleString("vi")} VNĐ`;

                        return (
                            <tr key={mgg.id} className="border-t hover:bg-gray-200">
                                <td className="p-2 font-semibold">
                                    {mgg.ten} <br />
                                    <span className="font-mono text-sm text-gray-600">
                                        ({mgg.ma_so})
                                    </span>
                                </td>
                                <td className="p-2 text-center  text-red-600">{giaTriHienThi}</td>
                                {/* <td className="p-2 text-center text-sm"> */}
                                {/* {hienThiLoaiGiamGia(mgg.loai_giam_gia)} */}
                                {/* chắc chắn không null  */}
                                {/* {hienThiLoaiGiamGia(mgg.loai_giam_gia ?? false)} */}

                                {/* </td> */}
                                <td className="p-2 text-right">
                                    {Number(mgg.gia_tri_toi_thieu).toLocaleString("vi")} VNĐ
                                </td>
                                <td className="p-2 text-center">{mgg.so_luong ?? "-"}</td>
                                <td className="p-2 text-center">{formatDate(mgg.bat_dau)} <br />
                                    <span className="text-red-500 ">
                                        {formatDate(mgg.ket_thuc)}
                                    </span>
                                </td>
                                {/* <td className="p-2 text-center">{formatDate(mgg.ket_thuc)}</td> */}
                                <td className="p-2 text-center">
                                    {mgg.an_hien ? "✅ " : "❌ "}
                                </td>
                                <td className=" text-center">{mgg.dieu_kien}</td>

                                <td className="p-2 text-center">
                                    <Link
                                        href={`/ma_giam_gia/${mgg.id}`}
                                        className="text-blue-500 hover:text-blue-700 mx-2 font-bold"
                                    >
                                        Sửa
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
