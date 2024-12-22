import { Pool } from 'mysql2/promise';
import { User } from '../models/user';
import db from '../database'; // 假设你有一个 MySQL 连接池配置
import { RowDataPacket } from 'mysql2/promise'; // 导入类型

// 查找用户（通过用户名）
export const findUserByUsername = async (username: string): Promise<User | null> => {
  try {
    console.debug('Executing findUserByUsername with username:', username); // 调试信息
    const [rows] = await db.execute<RowDataPacket[]>('SELECT * FROM users WHERE username = ?', [username]);
    console.debug('Query result for findUserByUsername:', rows); // 调试信息
    return rows.length ? (rows[0] as User) : null;
  } catch (error) {
    console.error('Error in findUserByUsername:', error); // 错误调试信息
    throw error; // 继续抛出错误以便进一步处理
  }
};

// 创建用户
export const createUser = async (user: User): Promise<number> => {
  const { username, password, email } = user;
  try {
    console.debug('Executing createUser with user:', user); // 调试信息
    const [result]: any = await db.execute(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, password, email]
    );
    console.debug('Query result for createUser:', result); // 调试信息
    return result.insertId; // 返回新用户的 ID
  } catch (error) {
    console.error('Error in createUser:', error); // 错误调试信息
    throw error; // 继续抛出错误以便进一步处理
  }
};
