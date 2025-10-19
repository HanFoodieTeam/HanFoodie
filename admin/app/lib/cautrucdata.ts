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
  dieu_kien: string;
}

export interface IDanhGia{
  id: number;
    noi_dung: string | null;
    thoi_gian: string;
    sao: number;
    id_nguoi_dung: number;
    id_bien_the: number;
    an_hien: number | boolean;
    hinh: string | null;
}