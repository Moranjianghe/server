import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

// 加载 .env 文件中的环境变量
dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT || "10"),
});

export default pool;
