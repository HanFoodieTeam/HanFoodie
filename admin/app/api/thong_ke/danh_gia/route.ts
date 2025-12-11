import { NextRequest, NextResponse } from "next/server";

// Đây là dữ liệu giả lập, trong thực tế bạn fetch từ DB
const allDanhGia = [
  {
    id: 1,
    ten: "Gà Rán Phô Mai",
    hinh: null,
    ngay_tao: "2025-12-01",
    sao: 5,
    so_luong: 3,
  },
  {
    id: 2,
    ten: "Trà Đào Cam Sả",
    hinh: null,
    ngay_tao: "2025-12-01",
    sao: 4,
    so_luong: 1,
  },
  // ... thêm dữ liệu khác
];

function groupByProduct(data: typeof allDanhGia) {
  const map: Record<number, any> = {};
  data.forEach((item) => {
    if (!map[item.id]) {
      map[item.id] = {
        id: item.id,
        ten: item.ten,
        hinh: item.hinh,
        tong_danh_gia: 0,
        trung_binh: 0,
        sao_1: 0,
        sao_2: 0,
        sao_3: 0,
        sao_4: 0,
        sao_5: 0,
      };
    }
    map[item.id].tong_danh_gia += item.so_luong;
    map[item.id].trung_binh += item.so_luong * item.sao;
    if (item.sao === 1) map[item.id].sao_1 += item.so_luong;
    if (item.sao === 2) map[item.id].sao_2 += item.so_luong;
    if (item.sao === 3) map[item.id].sao_3 += item.so_luong;
    if (item.sao === 4) map[item.id].sao_4 += item.so_luong;
    if (item.sao === 5) map[item.id].sao_5 += item.so_luong;
  });

  // Tính trung bình
  Object.values(map).forEach((p: any) => {
    p.trung_binh = p.tong_danh_gia > 0 ? p.trung_binh / p.tong_danh_gia : 0;
  });

  return Object.values(map);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from") || "1970-01-01";
  const to = searchParams.get("to") || "2100-12-31";
  const filter = (searchParams.get("filter") || "ngay") as "ngay" | "thang" | "nam";

  // Lọc theo từ ngày → đến ngày
  let filtered = allDanhGia.filter((d) => d.ngay_tao >= from && d.ngay_tao <= to);

  // Gộp theo filter nếu cần (ngày/tháng/năm)
  if (filter !== "ngay") {
    filtered = filtered.map((d) => {
      let ngay = d.ngay_tao;
      if (filter === "thang") {
        ngay = ngay.slice(0, 7); // YYYY-MM
      } else if (filter === "nam") {
        ngay = ngay.slice(0, 4); // YYYY
      }
      return { ...d, ngay_tao: ngay };
    });
    // Có thể gộp thêm theo sản phẩm + ngày/tháng/năm nếu muốn
  }

  const result = groupByProduct(filtered);

  return NextResponse.json(result);
}
