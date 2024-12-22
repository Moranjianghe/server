import db from '../database'; // 参照第一个 dao
import { UserSession } from '../models/aiChat'; // 假设你已经定义了 UserSession 模型

// 获取用户会话
export const getUserSession = async (userId: string): Promise<UserSession | null> => { // 返回 UserSession 或 null
    const [rows]: any = await db.execute('SELECT * FROM conversations WHERE user_id = ?', [userId]);
    return rows.length > 0 ? rows[0] : null; // 返回第一条记录或 null
};

// 创建用户会话
export const createUserSession = async (userId: string, sessionId: string): Promise<void> => {
    await db.execute('INSERT INTO conversations (user_id, session_id) VALUES (?, ?)', [userId, sessionId]);
};
