export interface IDanhMuc {
  id?: number;       // khóa chính, tự tăng
  ten: string;       // tên danh mục
  slug?: string;     // đường dẫn thân thiện (slug)
  an_hien: boolean;  // ẩn/hiện
  hinh?: string;     // tên hình ảnh hoặc URL
  thu_tu: number;    // thứ tự hiển thị
}
export interface ISanPham {
  id?: number;
  ten: string;
  gia_goc: number;
  slug?: string;
  hinh: string;
  mo_ta?: string;
  an_hien: boolean;
  tag?: string;
  luot_xem?: number;
  phong_cach?: string;
  trang_thai?: string;
  id_danh_muc: number; // khóa ngoại liên kết với bảng danh_muc
}

export interface INguoiDung {
  id?: number; 
  ho_ten: string;
  sdt: number;
  email: string;
  tep_khach?: string | null;
  mat_khau: string;
  trang_thai?: number; // 0 là khóa, 1 là hiện
  ngay_sinh?: string | null; 
  ma_kich_hoat?: string | null;
  vai_tro?: number; // 0: user, 1: admin
  ngay_tao?: Date | null;
}
