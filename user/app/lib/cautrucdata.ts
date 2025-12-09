// interfaces.ts

export interface IBaiViet {
  id: number;
  tieu_de: string;
  noi_dung: string;
  hinh?: string | null;
  id_loai_bv: number;
  luot_xem?: number;
  slug?: string;
  ngay_dang?: string | null;
  an_hien?: boolean;
}

export interface IBanner {
  id: number;
  hinh: string;
  mo_ta?: string | null;
  link?: string | null;
  thu_tu?: string | null;
}

export interface IBienThe {
  id: number;
  ten: string;
  trang_thai: boolean;
  gia_them?: number | null;
  id_san_pham: number;

  san_pham?: ISanPham;

}

export interface IOrderEmail {
  logoUrl: string;
  hoTen: string;
  maDon: string;
  ngayDat: string;
  phuongThucThanhToan: string;
  sanPhamListHtml: string;
  tongTienHang: number;
  giamGia: number;
  tongThanhToan: number;
  urlDonHang: string;
}
export interface IChiTietDonHang {
  id: number;
  don_gia: number;
  so_luong: number;
  json_tuy_chon?: string | null;
  json_mon_them?: string | null;
  id_don_hang: number;
  id_bien_the?: number | null;
  thanh_tien: number;
  ten_san_pham?: string;
}

export interface IDanhGia {
  id: number;
  noi_dung?: string | null;
  thoi_gian: string;
  sao: number;
  id_nguoi_dung: number;
  id_bien_the: number;
  an_hien?: boolean;
  an_ten?: boolean;


  hinh?: string | null;
}

export interface IDanhMuc {
  id: number;
  ten: string;
  slug?: string;
  an_hien: boolean;
  hinh?: string | null;
  thu_tu: number;
  so_san_pham: number;
}

export interface IDanhMucLoaiTuyChon {
  id: number;
  id_loai_tuy_chon?: number | null;
  id_danh_muc?: number | null;
}

export interface IDanhMucMonThem {
  id: number;
  id_mon_them?: number | null;
  id_danh_muc?: number | null;
}

export interface IDiaChi {
  id: number;
  id_nguoi_dung: number;
  ten_duong: string;
  phuong: string;
  tinh: string;
  mac_dinh: boolean | null;
  ho_ten: string;
  sdt: string;
}

// export interface IDonHang {
//   id: number;
//   ghi_chu?: string | null;
//   dia_chi: string;
//   id_ma_giam_gia: number;
//   id_nguoi_dung: number;
//   ho_ten_nguoi_nhan: string;
//   dia_chi_nguoi_nhan: string;
//   sdt_nguoi_nhan: number;
//   ngay_tao: string;
//   trang_thai?: string | null;
//   ma_don: string;
//   ngay_cap_nhat: string;
//   phuong_thuc_thanh_toan: boolean;
//   so_tien_thanh_toan: number;
// }

export type TrangThaiDonHang =
  | "cho_thanh_toan"
  | "cho_xac_nhan"
  | "da_xac_nhan"
  | "dang_giao"
  | "da_giao"
  | "da_huy";

export interface IDonHang {
  id: number;
  ghi_chu?: string | null;
  id_ma_giam_gia?: number | null;
  id_nguoi_dung: number;
  ho_ten_nguoi_nhan: string;
  dia_chi_nguoi_nhan: string;
  sdt_nguoi_nhan: number;
  trang_thai: TrangThaiDonHang;
  ma_don: string;
  ngay_tao: Date | string;
  ngay_cap_nhat: Date | string;
  phuong_thuc_thanh_toan: boolean; // false: online, true: thanh toán khi nhận hàng
  so_tien_thanh_toan: number;
  tong_tien_hang: number;
  so_tien_giam: number;
}
// export interface IDonHang {
//   id: number;
//   ghi_chu?: string | null; // varchar(255)
//   id_ma_giam_gia?: number | null; // int
//   id_nguoi_dung: number; // int
//   ho_ten_nguoi_nhan: string; // varchar(255)
//   dia_chi_nguoi_nhan: string; // varchar(255)
//   sdt_nguoi_nhan: number; // int(11)
//   ngay_tao: string; // datetime
//   trang_thai: TrangThaiDonHang; // enum
//   ma_don: string; // varchar(255)
//   ngay_cap_nhat: string; // datetime
//   phuong_thuc_thanh_toan: number; // tinyint(1) ✅ kiểu số (1: COD, 0: Online)
//   tong_tien_hang: number; // int
//   so_tien_giam: number; // int
//   so_tien_thanh_toan: number; // int
// }




export interface IGioHang {
  id: number;
  so_luong: number;
  json_mon_them?: IMonThem[] | null; // danh sách món thêm
  json_tuy_chon?: Record<string, string> | null; // key: loại tùy chọn, value: giá trị
  id_nguoi_dung: number;
  id_bien_the?: number | null;


  bien_the?: {
    id: number;
    ten: string;
    gia_them?: number | null;
    san_pham?: {
      id: number;
      ten: string;
      hinh: string;
      gia_goc: number;
    };
  };
}


export interface IHinh {
  id: number;
  hinh?: string | null;
  ngay_dang?: string | null;
  thu_tu?: number | null;
  id_san_pham: number;
}

export interface ILoaiBaiViet {
  id: number;
  ten_loai: string;
  an_hien: boolean;
  slug?: string | null;
  thu_tu: number;
}

export interface ILoaiTuyChon {
  id: number;
  ten: string;
  thu_tu?: number | null;
  an_hien?: boolean;
}

export interface IMaGiamGia {
  id: number;
  ten: string;
  gia_tri_giam: number;
  loai_giam_gia: boolean; // 0: giảm theo tiền, 1: giảm theo %
  gia_tri_toi_thieu: number;
  so_luong: number;
  bat_dau: Date;
  ket_thuc: Date;
  an_hien: boolean;
  ma_so: string;
  mo_ta?: string;
  gia_tri_giam_toi_da?: number | null;
}


export interface IMonThem {
  id: number;
  ten: string;
  gia_them: number;
  // loai_mon: number;
  trang_thai?: boolean;
}

// export interface INguoiDung {np
//   id?: number;
//   hinh?: string;
//   ho_ten: string;
//   sdt?: number | null;
//   email: string;
//   tep_khach?: string | null;
//   mat_khau: string;
//   trang_thai?: boolean;
//   ngay_sinh?: string | null;
//   token_kich_hoat?: string | null;
//   vai_tro?: boolean;
//   ngay_tao?:string |Date| null;
//   kich_hoat:boolean;
//   han_token:string | null;
// }

export interface INguoiDung {
  id?: number;
  hinh?: string | null;
  ho_ten: string;
  sdt?: number | null;
  email: string;
  tep_khach?: string | null;
  mat_khau: string;
  trang_thai?: boolean;
  ngay_sinh?: string | null | Date;
  token_kich_hoat?: string | null;
  vai_tro?: boolean;
  ngay_tao?: string | null | Date;
  kich_hoat: boolean;
  han_token: Date | string | null;
}


export interface ISanPham {
  id: number;
  ten: string;
  gia_goc: number;
  slug?: string | null;
  hinh: string;
  mo_ta: string;
  an_hien?: boolean;
  tag?: string | null;
  luot_xem?: number;
  phong_cach?: string | null;
  trang_thai?: string | null;
  id_danh_muc: number;

  so_sao_tb?: number | null;

}

export interface ITuyChon {
  id: number;
  ten: string;
  an_hien: boolean;
  id_loai_tuy_chon: number;
}

export interface IYeuThich {
  id: number;
  id_nguoi_dung: number;
  id_san_pham: number;
}
