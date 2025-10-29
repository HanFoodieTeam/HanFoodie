
import mysql2 from "mysql2";
import { Sequelize } from "sequelize";

export const db = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false, // Tắt log SQL
  dialectModule: mysql2,
});

