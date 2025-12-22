import mysql from "mysql2/promise";

// Pool kết nối MySQL
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Generic query, trả về array các RowDataPacket
export async function query<T extends mysql.RowDataPacket>(
  sql: string,
  values?: any[]
): Promise<T[]> {
  const [rows] = await pool.query<T[]>(sql, values);
  return rows;
}
