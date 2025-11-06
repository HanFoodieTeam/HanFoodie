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

// export interface IChiTietDonHang {
//   id: number;
//   don_gia: number;
//   so_luong: number;
//   san_pham: {
//     ten: string;
//     hinh_anh: string;
//   };
//   json_tuy_chon?: string | null;
//   json_mon_them?: string | null;
//   id_don_hang: number;
//   id_bien_the?: number | null;
//   thanh_tien: number;

//   ten_san_pham?: string;
// }


export interface IChiTietDonHang {
  id: number;
  don_gia: number;
  so_luong: number;
  json_tuy_chon?: string | null;
  json_mon_them?: string | null;
  id_don_hang: number;
  id_bien_the?: number | null;
  thanh_tien: number;

  // 🔹 Mối quan hệ với Biến Thể
  bien_the?: {
    id: number;
    ten: string;
    gia_them?: number | null;
    san_pham?: {
      id: number;
      ten: string;
      hinh?: string | null;
    };
  };
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

    chi_tiet_don_hang?: IChiTietDonHang[];

}




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




export interface IMonThem {
  id: number;
  ten: string;
  gia_them: number;
  loai_mon: number;
  trang_thai?: boolean;
}

export interface INguoiDung {
  id?: number;
  hinh?:string;
  ho_ten: string;
  sdt?: number | null;
  email: string;
  tep_khach?: string | null;
  mat_khau: string;
  trang_thai?: boolean;
  ngay_sinh?: string | null;
  ma_kich_hoat?: string | null;
  vai_tro?: boolean;
  ngay_tao?: Date | null;
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
