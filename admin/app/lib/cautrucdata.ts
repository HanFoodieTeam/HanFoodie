export interface IMaGiamGia { 
  id: number;
  ten: string;
  gia_tri_giam: number;
  gia_tri_toi_thieu: number;
  so_luong: number | null;      // có thể null
  bat_dau: string;              // kiểu DATE trong DB → string ISO
  ket_thuc: string;             // kiểu DATE trong DB → string ISO
  an_hien: boolean | null;      // tinyint(1) → boolean trong JS
  ma_so: string;
  dieu_kien: string;
}
