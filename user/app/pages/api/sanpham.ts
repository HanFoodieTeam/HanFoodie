import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hanfoodie",
  });

  if (req.method === "GET") {
    const { id } = req.query;

    if (id) {
      // ✅ Khai báo kiểu dữ liệu cho rõ ràng
      const [rows]: any = await db.execute("SELECT * FROM san_pham WHERE id = ?", [id]);
      res.status(200).json(rows[0]); // ✅ rows là mảng
    } else {
      const [rows]: any = await db.execute("SELECT * FROM san_pham WHERE an_hien = 1");
      res.status(200).json(rows);
    }
  } else {
    res.status(405).json({ message: "Phương thức không được hỗ trợ" });
  }
}
