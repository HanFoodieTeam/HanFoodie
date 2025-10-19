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

// === NguoiDung ===
export const NguoiDung = db.define("nguoi_dung", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ho_ten: { type: DataTypes.STRING(255), allowNull: false },
  sdt: { type: DataTypes.INTEGER, allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false },
  tep_khach: { type: DataTypes.STRING(255), allowNull: true },
  mat_khau: { type: DataTypes.STRING(255), allowNull: false },
  trang_thai: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  ngay_sinh: { type: DataTypes.DATE, allowNull: true },
  ma_kich_hoat: { type: DataTypes.STRING(255), allowNull: true },
  vai_tro: { type: DataTypes.INTEGER, defaultValue: 0 },
  ngay_tao: { type: DataTypes.DATE, allowNull: true },
}, {
  tableName: "nguoi_dung",
  timestamps: false,
});

// === DanhGiaModel ===
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

// === BienThe ===
export const BienThe = db.define("bien_the", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ten: { type: DataTypes.STRING(255), allowNull: false },
  trang_thai: { type: DataTypes.BOOLEAN, defaultValue: 0 },
  gia_them: { type: DataTypes.INTEGER, allowNull: true },
  id_san_pham: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: "bien_the",
  timestamps: false,
});

// 1. Một người dùng có nhiều đánh giá
NguoiDung.hasMany(DanhGiaModel, {
  foreignKey: "id_nguoi_dung",
  as: "danh_gias",
});

// Mỗi đánh giá thuộc về 1 người dùng
DanhGiaModel.belongsTo(NguoiDung, {
  foreignKey: "id_nguoi_dung",
  as: "nguoi_dung",
});

// 2. Một biến thể có nhiều đánh giá
BienThe.hasMany(DanhGiaModel, {
  foreignKey: "id_bien_the",
  as: "danh_gias",
});

// Mỗi đánh giá thuộc về 1 biến thể
DanhGiaModel.belongsTo(BienThe, {
  foreignKey: "id_bien_the",
  as: "bien_the",
});




// === Đồng bộ DB nếu cần ===
export async function syncDatabase() {
  await db.sync({ alter: true });
  console.log("✅ Database synced successfully!");
}
