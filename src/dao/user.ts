import { Pool } from 'mysql2/promise';
import { User } from '../models/user';
import db from '../database'; // 假设你有一个 MySQL 连接池配置

// 查找用户（通过用户名）
export const findUserByUsername = async (username: string): Promise<User | null> => {
  const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows.length ? (rows[0] as User) : null;
};

// 创建用户
export const createUser = async (user: User): Promise<number> => {
  const { username, password, email } = user;
  const [result]: any = await db.execute(
    'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
    [username, password, email]
  );
  return result.insertId; // 返回新用户的 ID
};
