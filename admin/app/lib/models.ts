import { DataTypes } from "sequelize";
import { db } from "./database";

// === MaGiamGiaModel ===
export const MaGiamGiaModel = db.define("ma_giam_gia", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ten: { type: DataTypes.STRING(255), allowNull: false },
  gia_tri_giam: { type: DataTypes.INTEGER, allowNull: false },
  loai_giam_gia: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  gia_tri_toi_thieu: { type: DataTypes.INTEGER, allowNull: false },
  so_luong: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  bat_dau: { type: DataTypes.DATEONLY, allowNull: false },
  ket_thuc: { type: DataTypes.DATEONLY, allowNull: false },
  an_hien: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  ma_so: { type: DataTypes.STRING(255), allowNull: false },
  dieu_kien: { type: DataTypes.STRING(255), allowNull: true },
}, {
  tableName: "ma_giam_gia",
  timestamps: false,
});

// // === NguoiDung ===
// export const NguoiDung = db.define("nguoi_dung", {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   ho_ten: { type: DataTypes.STRING(255), allowNull: false },
//   sdt: { type: DataTypes.INTEGER, allowNull: false },
//   email: { type: DataTypes.STRING(255), allowNull: false },
//   tep_khach: { type: DataTypes.STRING(255), allowNull: true },
//   mat_khau: { type: DataTypes.STRING(255), allowNull: false },
//   trang_thai: { type: DataTypes.BOOLEAN, defaultValue: 0 },
//   ngay_sinh: { type: DataTypes.DATE, allowNull: true },
//   ma_kich_hoat: { type: DataTypes.STRING(255), allowNull: true },
//   vai_tro: { type: DataTypes.INTEGER, defaultValue: 0 },
//   ngay_tao: { type: DataTypes.DATE, allowNull: true },
// }, {
//   tableName: "nguoi_dung",
//   timestamps: false,
// });

// // === DanhGiaModel ===
// export const DanhGiaModel = db.define("danh_gia", {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   noi_dung: { type: DataTypes.STRING(255), allowNull: true },
//   thoi_gian: { type: DataTypes.DATEONLY, allowNull: false },
//   sao: { type: DataTypes.INTEGER, allowNull: false },
//   id_nguoi_dung: { type: DataTypes.INTEGER, allowNull: false },
//   id_bien_the: { type: DataTypes.INTEGER, allowNull: false },
//   an_hien: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
//   hinh: { type: DataTypes.STRING(255), allowNull: true },
// }, {
//   tableName: "danh_gia",
//   timestamps: false,
// });

// // === BienThe ===
// export const BienThe = db.define("bien_the", {
//   id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//   ten: { type: DataTypes.STRING(255), allowNull: false },
//   trang_thai: { type: DataTypes.BOOLEAN, defaultValue: 0 },
//   gia_them: { type: DataTypes.INTEGER, allowNull: true },
//   id_san_pham: { type: DataTypes.INTEGER, allowNull: false },
// }, {
//   tableName: "bien_the",
//   timestamps: false,
// });


//  NguoiDungModel 
export const NguoiDungModel = db.define("nguoi_dung", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ho_ten: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false },
  mat_khau: { type: DataTypes.STRING(255), allowNull: false },
  vai_tro: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: "nguoi_dung",
  timestamps: false,
});

// SanPhamModel 
export const SanPhamModel = db.define("san_pham", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ten: { type: DataTypes.STRING(255), allowNull: false },
  gia_goc: { type: DataTypes.INTEGER, allowNull: true },
  slug: { type: DataTypes.STRING(255), allowNull: true },
  hinh: { type: DataTypes.STRING(255), allowNull: true },
  mo_ta: { type: DataTypes.STRING(255), allowNull: true },
  an_hien: { type: DataTypes.BOOLEAN, defaultValue: true },
  tag: { type: DataTypes.STRING(255), allowNull: true },
  luot_xem: { type: DataTypes.INTEGER, allowNull: true },
  phong_cach: { type: DataTypes.STRING(255), allowNull: true },
  trang_thai: { type: DataTypes.STRING(255), allowNull: true },
  id_danh_muc: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: "san_pham",
  timestamps: false,
});

//  BienThe 
export const BienTheModel = db.define("bien_the", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ten: { type: DataTypes.STRING(255), allowNull: false },
  trang_thai: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  gia_them: { type: DataTypes.INTEGER, allowNull: true },
  id_san_pham: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: "bien_the",
  timestamps: false,
});

//  DanhGia 
export const DanhGiaModel = db.define("danh_gia", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  noi_dung: { type: DataTypes.STRING(255), allowNull: true },
  thoi_gian: { type: DataTypes.DATEONLY, allowNull: false },
  sao: { type: DataTypes.INTEGER, allowNull: false },
  id_nguoi_dung: { type: DataTypes.INTEGER, allowNull: false },
  id_bien_the: { type: DataTypes.INTEGER, allowNull: false },
  an_hien: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: true },
  hinh: { type: DataTypes.STRING(255), allowNull: true },
}, {
  tableName: "danh_gia",
  timestamps: false,
});

//  Quan hệ
NguoiDungModel.hasMany(DanhGiaModel, { foreignKey: "id_nguoi_dung", as: "danh_gias" });
DanhGiaModel.belongsTo(NguoiDungModel, { foreignKey: "id_nguoi_dung", as: "nguoi_dung" });

SanPhamModel.hasMany(BienTheModel, { foreignKey: "id_san_pham", as: "bien_thes" });
BienTheModel.belongsTo(SanPhamModel, { foreignKey: "id_san_pham", as: "san_pham" });

BienTheModel.hasMany(DanhGiaModel, { foreignKey: "id_bien_the", as: "danh_gias" });
DanhGiaModel.belongsTo(BienTheModel, { foreignKey: "id_bien_the", as: "bien_the" });