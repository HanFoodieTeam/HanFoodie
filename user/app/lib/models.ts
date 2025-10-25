
import { DataTypes } from "sequelize";
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


DanhMucModel.hasMany(SanPhamModel, {
  foreignKey: "id_danh_muc",
  as: "san_pham",
});

SanPhamModel.belongsTo(DanhMucModel, {
  foreignKey: "id_danh_muc",
  as: "danh_muc",
});


import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { INguoiDung } from "./cautrucdata";
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


