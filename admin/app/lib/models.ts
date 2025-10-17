import { DataTypes } from "sequelize";
import { db } from "./database";

export const MaGiamGiaModel = db.define("ma_giam_gia", {
  id: { 
    type: DataTypes.INTEGER, 
    autoIncrement: true, 
    primaryKey: true 
  },
  ten: { 
    type: DataTypes.STRING(255),
    allowNull: false 
  },
  gia_tri_giam: { 
    type: DataTypes.INTEGER,
    allowNull: false 
  },

   loai_giam_gia: { 
    type: DataTypes.BOOLEAN,   // TINYINT(1) <-> BOOLEAN
    allowNull: true,
    defaultValue: false
  }, 

  gia_tri_toi_thieu: { 
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  so_luong: { 
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0 
  },
  bat_dau: { 
    type: DataTypes.DATEONLY,
    allowNull: false 
  },
  ket_thuc: { 
    type: DataTypes.DATEONLY,
    allowNull: false 
  },
  an_hien: { 
    type: DataTypes.BOOLEAN,   // TINYINT(1) <-> BOOLEAN
    allowNull: true,
    defaultValue: false
  },  
  ma_so: { 
    type: DataTypes.STRING(255),
    allowNull: false 
  },
  dieu_kien: { 
    type: DataTypes.STRING(255),
    allowNull: false 
  },
}, {
  tableName: "ma_giam_gia",
  timestamps: false,
});

export async function syncDatabase() {
  await db.sync();
}
