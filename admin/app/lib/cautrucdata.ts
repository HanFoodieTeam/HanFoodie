export interface IMaGiamGia {
  id: number;
  ten: string;
  gia_tri_giam: number;
  loai_giam_gia: boolean | null;     // tinyint(1) → boolean trong JS
  gia_tri_toi_thieu: number;
  so_luong: number | null;      // có thể null
  bat_dau: string;              // kiểu DATE trong DB → string ISO
  ket_thuc: string;             // kiểu DATE trong DB → string ISO
  an_hien: boolean ;
  ma_so: string;
  mo_ta: string;
  gia_tri_giam_toi_da: number | null;
}

// export interface IDanhGia{
//   id: number;
//     noi_dung: string | null;
//     thoi_gian: string;
//     sao: number;
//     id_nguoi_dung: number;
//     id_bien_the: number;
//     an_hien: number | boolean;
//     hinh: string | null;
// }

export interface IDanhGia {
  id: number;
  noi_dung: string | null;
  thoi_gian: string;
  sao: number;
  id_nguoi_dung: number;
  id_bien_the: number;
  an_hien: boolean | number;
  hinh: string | null;
  nguoi_dung?: { ho_ten: string };
  bien_the?: {
    ten: string;
    san_pham?: { ten: string; hinh?: string };
  };
}

export interface ISanPham {
  id: number;
  ten: string;
  gia_goc: number;
  slug: string;
  hinh?: string | null;
  mo_ta?: string | null;
  an_hien: boolean;
  tag?: string | null;
  luot_xem: number;
  phong_cach?: string | null;
  trang_thai?: string | null;
  id_danh_muc: number;
}