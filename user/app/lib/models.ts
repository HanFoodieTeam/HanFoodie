
import { DataTypes, Optional } from "sequelize";
import { db } from "./database";

export const DanhMucModel = db.define(
  "DanhMuc",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ten: { type: DataTypes.STRING(255), allowNull: false },
    slug: { type: DataTypes.STRING(255), allowNull: true },
    an_hien: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 },
    hinh: { type: DataTypes.STRING(255), allowNull: true },
    thu_tu: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "danh_muc",
    timestamps: false,
  }
);

export const SanPhamModel = db.define(
  "SanPham",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ten: { type: DataTypes.STRING(255), allowNull: false },
    gia_goc: { type: DataTypes.INTEGER, allowNull: false },
    slug: { type: DataTypes.STRING(255), allowNull: true },
    hinh: { type: DataTypes.STRING(255), allowNull: false },
    mo_ta: { type: DataTypes.STRING(255), allowNull: true },
    an_hien: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 },
    tag: { type: DataTypes.STRING(255), allowNull: true },
    luot_xem: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    phong_cach: { type: DataTypes.STRING(255), allowNull: true },
    trang_thai: { type: DataTypes.STRING(255), allowNull: true },
    id_danh_muc: {
      type: DataTypes.INTEGER, allowNull: false, references:
      {
        model: "danh_muc",
        key: "id",
      },
    },
  },
  {
    tableName: "san_pham",
    timestamps: false,
  }
);


import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { IDonHang, INguoiDung } from "./cautrucdata";
export interface NguoiDungInstance
  extends Model<InferAttributes<NguoiDungInstance>, InferCreationAttributes<NguoiDungInstance>>,
  INguoiDung { }

export const NguoiDungModel = db.define<NguoiDungInstance>(
  "nguoi_dung",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ho_ten: { type: DataTypes.STRING(255), allowNull: false },
    sdt: { type: DataTypes.INTEGER, allowNull: true },
    email: { type: DataTypes.STRING(255), allowNull: false },
    tep_khach: { type: DataTypes.STRING(255), allowNull: true },
    mat_khau: { type: DataTypes.STRING(255), allowNull: false },
    trang_thai: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    ngay_sinh: { type: DataTypes.DATEONLY, allowNull: true },
    ma_kich_hoat: { type: DataTypes.STRING(255), allowNull: true },
    vai_tro: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    ngay_tao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // tự gán thời gian hiện tại nếu không truyền
    }
  },
  {
    tableName: "nguoi_dung",
    timestamps: false,
  }
);

export const GioHangModel = db.define(
  "gio_hang",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    so_luong: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1, },
    json_mon_them: { type: DataTypes.TEXT("long"), allowNull: true, },
    json_tuy_chon: { type: DataTypes.TEXT("long"), allowNull: true, },
    id_nguoi_dung: { type: DataTypes.INTEGER, allowNull: false, },
    id_bien_the: { type: DataTypes.INTEGER, allowNull: true, },
    ghi_chu: {
      type: DataTypes.STRING, allowNull: true,
    },
  },
  {
    tableName: "gio_hang",
    timestamps: false, // không tự tạo createdAt / updatedAt
  }
);


export const BienTheModel = db.define(
  "bien_the",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    ten: { type: DataTypes.STRING(255), allowNull: false, },
    trang_thai: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0, },
    gia_them: { type: DataTypes.INTEGER, allowNull: true, },
    id_san_pham: { type: DataTypes.INTEGER, allowNull: false, },
  },
  {
    tableName: "bien_the",
    timestamps: false,
  }
);


export const BaiVietModel = db.define(
  "bai_viet",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tieu_de: { type: DataTypes.STRING(255), allowNull: false },
    noi_dung: { type: DataTypes.STRING(255), allowNull: false },
    hinh: { type: DataTypes.STRING(255), allowNull: true },
    id_loai_bv: { type: DataTypes.INTEGER, allowNull: false },
    luot_xem: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    slug: { type: DataTypes.STRING(255), allowNull: true },
    ngay_dang: { type: DataTypes.DATEONLY, allowNull: true },
    an_hien: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
  },
  { tableName: "bai_viet", timestamps: false }
);


export const BannerModel = db.define(
  "banner",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hinh: { type: DataTypes.STRING(255), allowNull: false },
    mo_ta: { type: DataTypes.STRING(255), allowNull: true },
    link: { type: DataTypes.STRING(255), allowNull: true },
    thu_tu: { type: DataTypes.STRING(255), allowNull: true },
  },
  { tableName: "banner", timestamps: false }
);


export const ChiTietDonHangModel = db.define(
  "chi_tiet_don_hang",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    don_gia: { type: DataTypes.INTEGER, allowNull: false },

    so_luong: { type: DataTypes.INTEGER, allowNull: false },
    json_tuy_chon: { type: DataTypes.TEXT("long"), allowNull: true },
    json_mon_them: { type: DataTypes.TEXT("long"), allowNull: true },
    id_don_hang: { type: DataTypes.INTEGER, allowNull: false },
    id_bien_the: { type: DataTypes.INTEGER, allowNull: true },
    thanh_tien: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "chi_tiet_don_hang", timestamps: false }
);


export const DanhGiaModel = db.define(
  "danh_gia",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    noi_dung: { type: DataTypes.STRING(255), allowNull: true },
    thoi_gian: { type: DataTypes.DATEONLY, allowNull: false },
    sao: { type: DataTypes.INTEGER, allowNull: false },
    id_nguoi_dung: { type: DataTypes.INTEGER, allowNull: false },
    id_bien_the: { type: DataTypes.INTEGER, allowNull: false },
    an_hien: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 1 },
    hinh: { type: DataTypes.STRING(255), allowNull: true },
  },
  { tableName: "danh_gia", timestamps: false }
);


export const DanhMucLoaiTuyChonModel = db.define(
  "danh_muc_loai_tuy_chon",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_loai_tuy_chon: { type: DataTypes.INTEGER, allowNull: true },
    id_danh_muc: { type: DataTypes.INTEGER, allowNull: true },
  },
  { tableName: "danh_muc_loai_tuy_chon", timestamps: false }
);


export const DanhMucMonThemModel = db.define(
  "danh_muc_mon_them",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_mon_them: { type: DataTypes.INTEGER, allowNull: true },
    id_danh_muc: { type: DataTypes.INTEGER, allowNull: true },
  },
  { tableName: "danh_muc_mon_them", timestamps: false }
);


export const DiaChiModel = db.define(
  "dia_chi",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_nguoi_dung: { type: DataTypes.INTEGER, allowNull: false },
    ten_duong: { type: DataTypes.STRING(255), allowNull: false },
    phuong: { type: DataTypes.STRING(255), allowNull: false },
    tinh: { type: DataTypes.STRING(255), allowNull: false },
    mac_dinh: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, },
    ho_ten: { type: DataTypes.STRING(50), allowNull: false, },
    sdt: { type: DataTypes.STRING(20), allowNull: false, },

  },
  { tableName: "dia_chi", timestamps: false }
);


// export const DonHangModel = db.define(
//   "don_hang",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     ghi_chu: { type: DataTypes.STRING(255), allowNull: true },
//     dia_chi: { type: DataTypes.STRING(255), allowNull: false },
//     id_ma_giam_gia: { type: DataTypes.INTEGER, allowNull: true },
//     id_nguoi_dung: { type: DataTypes.INTEGER, allowNull: false },
//     ho_ten_nguoi_nhan: { type: DataTypes.STRING(255), allowNull: false },
//     dia_chi_nguoi_nhan: { type: DataTypes.STRING(255), allowNull: false },
//     sdt_nguoi_nhan: { type: DataTypes.INTEGER, allowNull: false },
//     ngay_tao: { type: DataTypes.DATEONLY, allowNull: false },
//     trang_thai: { type: DataTypes.STRING(255), allowNull: true },
//     ma_don: { type: DataTypes.STRING(255), allowNull: false },
//     ngay_cap_nhat: { type: DataTypes.DATEONLY, allowNull: false },
//     phuong_thuc_thanh_toan: { type: DataTypes.INTEGER, allowNull: false },
//     so_tien_thanh_toan: { type: DataTypes.INTEGER, allowNull: false },
//   },
//   { tableName: "don_hang", timestamps: false }
// );






// Các trường có thể null hoặc tự động sinh
type DonHangCreationAttributes = Optional<
  IDonHang,
  "id" | "ghi_chu" | "id_ma_giam_gia" | "ngay_tao" | "ngay_cap_nhat"
>;

export class DonHangModel
  extends Model<IDonHang, DonHangCreationAttributes>
  implements IDonHang {
  declare id: number;
  declare ghi_chu: string | null;
  declare id_ma_giam_gia: number | null;
  declare id_nguoi_dung: number;
  declare ho_ten_nguoi_nhan: string;
  declare dia_chi_nguoi_nhan: string;
  declare sdt_nguoi_nhan: number;
  declare ngay_tao: Date;
  declare trang_thai: "cho_xac_nhan" | "da_xac_nhan" | "dang_giao" | "da_giao" | "da_huy";
  declare ma_don: string;
  declare ngay_cap_nhat: Date;
  declare phuong_thuc_thanh_toan: boolean;
  declare so_tien_thanh_toan: number;
  declare tong_tien_hang: number;
  declare so_tien_giam: number;
}

DonHangModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ghi_chu: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    id_ma_giam_gia: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_nguoi_dung: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ho_ten_nguoi_nhan: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dia_chi_nguoi_nhan: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sdt_nguoi_nhan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    trang_thai: {
      type: DataTypes.ENUM(
        "cho_xac_nhan",
        "da_xac_nhan",
        "dang_giao",
        "da_giao",
        "da_huy"
      ),
      allowNull: false,
      defaultValue: "cho_xac_nhan",
    },
    ma_don: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ngay_tao: { type: DataTypes.DATE, allowNull: false },
    ngay_cap_nhat: { type: DataTypes.DATE, allowNull: false },

    phuong_thuc_thanh_toan: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "1 là khi nhận hàng, 0 là thanh toán online",
    },
    tong_tien_hang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    so_tien_giam: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    so_tien_thanh_toan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db, // ✅ dùng sequelize chứ không phải db
    tableName: "don_hang",
    timestamps: false,
  }
);


export const HinhModel = db.define(
  "hinh",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hinh: { type: DataTypes.STRING(255), allowNull: true },
    ngay_dang: { type: DataTypes.DATEONLY, allowNull: true },
    thu_tu: { type: DataTypes.INTEGER, allowNull: true },
    id_san_pham: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "hinh", timestamps: false }
);


export const LoaiBaiVietModel = db.define(
  "loai_bai_viet",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ten_loai: { type: DataTypes.STRING(255), allowNull: false },
    an_hien: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    slug: { type: DataTypes.STRING(255), allowNull: true },
    thu_tu: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "loai_bai_viet", timestamps: false }
);

export const LoaiTuyChonModel = db.define(
  "loai_tuy_chon",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ten: { type: DataTypes.STRING(255), allowNull: false },
    thu_tu: { type: DataTypes.INTEGER, allowNull: true },
    an_hien: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
  },
  { tableName: "loai_tuy_chon", timestamps: false }
);


export const MaGiamGiaModel = db.define(
  "ma_giam_gia",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ten: { type: DataTypes.STRING(255), allowNull: false },
    gia_tri_giam: { type: DataTypes.INTEGER, allowNull: false },
    loai_giam_gia: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    gia_tri_toi_thieu: { type: DataTypes.INTEGER, allowNull: false },
    so_luong: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
    bat_dau: { type: DataTypes.DATEONLY, allowNull: false },
    ket_thuc: { type: DataTypes.DATEONLY, allowNull: false },
    an_hien: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    ma_so: { type: DataTypes.STRING(255), allowNull: false },
    mo_ta: { type: DataTypes.STRING(255), allowNull: true },
    gia_tri_giam_toi_da: { type: DataTypes.INTEGER, allowNull: true },
  },
  { tableName: "ma_giam_gia", timestamps: false }
);


export const MonThemModel = db.define(
  "mon_them",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ten: { type: DataTypes.STRING(255), allowNull: false },
    gia_them: { type: DataTypes.INTEGER, allowNull: false },
    loai_mon: { type: DataTypes.INTEGER, allowNull: false },
    trang_thai: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
  },
  { tableName: "mon_them", timestamps: false }
);





export const TuyChonModel = db.define(
  "tuy_chon",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ten: { type: DataTypes.STRING(255), allowNull: false },
    an_hien: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 0 },
    id_loai_tuy_chon: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "tuy_ chon", timestamps: false }
);

export const YeuThichModel = db.define(
  "yeu_thich",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_nguoi_dung: { type: DataTypes.INTEGER, allowNull: false },
    id_san_pham: { type: DataTypes.INTEGER, allowNull: false },
  },
  { tableName: "yeu_thich", timestamps: false }
);



// DanhMuc <-> SanPham
DanhMucModel.hasMany(SanPhamModel, { foreignKey: "id_danh_muc", as: "san_pham" });
SanPhamModel.belongsTo(DanhMucModel, { foreignKey: "id_danh_muc", as: "danh_muc" });

// SanPham <-> BienThe
SanPhamModel.hasMany(BienTheModel, { foreignKey: "id_san_pham", as: "bien_the" });
BienTheModel.belongsTo(SanPhamModel, { foreignKey: "id_san_pham", as: "san_pham" });

// BienThe <-> GioHang
BienTheModel.hasMany(GioHangModel, { foreignKey: "id_bien_the", as: "gio_hang" });
GioHangModel.belongsTo(BienTheModel, { foreignKey: "id_bien_the", as: "bien_the" });

// NguoiDung <-> GioHang
NguoiDungModel.hasMany(GioHangModel, { foreignKey: "id_nguoi_dung", as: "gio_hang" });
GioHangModel.belongsTo(NguoiDungModel, { foreignKey: "id_nguoi_dung", as: "nguoi_dung" });

// NguoiDung <-> DonHang
NguoiDungModel.hasMany(DonHangModel, { foreignKey: "id_nguoi_dung", as: "don_hang" });
DonHangModel.belongsTo(NguoiDungModel, { foreignKey: "id_nguoi_dung", as: "nguoi_dung" });

// DonHang <-> ChiTietDonHang
DonHangModel.hasMany(ChiTietDonHangModel, { foreignKey: "id_don_hang", as: "chi_tiet_don_hang" });
ChiTietDonHangModel.belongsTo(DonHangModel, { foreignKey: "id_don_hang", as: "don_hang" });

// BienThe <-> ChiTietDonHang
BienTheModel.hasMany(ChiTietDonHangModel, { foreignKey: "id_bien_the", as: "chi_tiet_don_hang" });
ChiTietDonHangModel.belongsTo(BienTheModel, { foreignKey: "id_bien_the", as: "bien_the" });

// SanPham <-> Hinh
SanPhamModel.hasMany(HinhModel, { foreignKey: "id_san_pham", as: "hinh_anh" });
HinhModel.belongsTo(SanPhamModel, { foreignKey: "id_san_pham", as: "san_pham" });

// NguoiDung <-> DanhGia
NguoiDungModel.hasMany(DanhGiaModel, { foreignKey: "id_nguoi_dung", as: "danh_gia" });
DanhGiaModel.belongsTo(NguoiDungModel, { foreignKey: "id_nguoi_dung", as: "nguoi_dung" });

// BienThe <-> DanhGia
BienTheModel.hasMany(DanhGiaModel, { foreignKey: "id_bien_the", as: "danh_gia" });
DanhGiaModel.belongsTo(BienTheModel, { foreignKey: "id_bien_the", as: "bien_the" });

// DanhMuc <-> DanhMucLoaiTuyChon (pivot)
DanhMucModel.hasMany(DanhMucLoaiTuyChonModel, { foreignKey: "id_danh_muc", as: "loai_tuy_chon_map" });
DanhMucLoaiTuyChonModel.belongsTo(DanhMucModel, { foreignKey: "id_danh_muc", as: "danh_muc" });

// LoaiTuyChon <-> DanhMucLoaiTuyChon (pivot)
LoaiTuyChonModel.hasMany(DanhMucLoaiTuyChonModel, { foreignKey: "id_loai_tuy_chon", as: "danh_muc_map" });
DanhMucLoaiTuyChonModel.belongsTo(LoaiTuyChonModel, { foreignKey: "id_loai_tuy_chon", as: "loai_tuy_chon" });

// DanhMuc <-> DanhMucMonThem (pivot)
DanhMucModel.hasMany(DanhMucMonThemModel, { foreignKey: "id_danh_muc", as: "mon_them_map" });
DanhMucMonThemModel.belongsTo(DanhMucModel, { foreignKey: "id_danh_muc", as: "danh_muc" });

// MonThem <-> DanhMucMonThem (pivot)
MonThemModel.hasMany(DanhMucMonThemModel, { foreignKey: "id_mon_them", as: "danh_muc_map" });
DanhMucMonThemModel.belongsTo(MonThemModel, { foreignKey: "id_mon_them", as: "mon_them" });

// SanPham <-> YeuThich
SanPhamModel.hasMany(YeuThichModel, { foreignKey: "id_san_pham", as: "yeu_thich" });
YeuThichModel.belongsTo(SanPhamModel, { foreignKey: "id_san_pham", as: "san_pham" });

// NguoiDung <-> YeuThich
NguoiDungModel.hasMany(YeuThichModel, { foreignKey: "id_nguoi_dung", as: "yeu_thich" });
YeuThichModel.belongsTo(NguoiDungModel, { foreignKey: "id_nguoi_dung", as: "nguoi_dung" });

// TuyChon <-> LoaiTuyChon
LoaiTuyChonModel.hasMany(TuyChonModel, { foreignKey: "id_loai_tuy_chon", as: "tuy_chon" });
TuyChonModel.belongsTo(LoaiTuyChonModel, { foreignKey: "id_loai_tuy_chon", as: "loai_tuy_chon" });

// BaiViet <-> LoaiBaiViet
LoaiBaiVietModel.hasMany(BaiVietModel, { foreignKey: "id_loai_bv", as: "bai_viet" });
BaiVietModel.belongsTo(LoaiBaiVietModel, { foreignKey: "id_loai_bv", as: "loai_bai_viet" });

// DonHang <-> MaGiamGia
MaGiamGiaModel.hasMany(DonHangModel, { foreignKey: "id_ma_giam_gia", as: "don_hang" });
DonHangModel.belongsTo(MaGiamGiaModel, { foreignKey: "id_ma_giam_gia", as: "ma_giam_gia" });

// DiaChi <-> NguoiDung
NguoiDungModel.hasMany(DiaChiModel, { foreignKey: "id_nguoi_dung", as: "dia_chi" });
DiaChiModel.belongsTo(NguoiDungModel, { foreignKey: "id_nguoi_dung", as: "nguoi_dung" });

