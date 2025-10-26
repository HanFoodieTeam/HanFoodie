import mysql2 from "mysql2";
import { Sequelize } from "sequelize";

export const db = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false, // 🔇 Tắt log SQL
  dialectModule: mysql2,
  
  //  Cấu hình múi giờ Việt Nam
  timezone: "+07:00", //  Lưu và đọc theo giờ Việt Nam (UTC+7)
  dialectOptions: {
    dateStrings: true, // Trả về ngày giờ dạng chuỗi, không bị object Date lệch UTC
    typeCast: true,
  },
});
