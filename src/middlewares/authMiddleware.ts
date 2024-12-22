import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';

export const authMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  const authHeader = ctx.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 从 "Bearer <token>" 中提取 token

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Authentication token is required' };
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // 替换为你的密钥
    const decodedToken = jwt.verify(token, secret); // 验证并解码 Token

    // 将用户信息存储在 ctx.state.user 中
    ctx.state.user = decodedToken; // decodedToken 通常包含用户 ID 和其他信息
    await next();
  } catch (err) {
    ctx.status = 403; // Forbidden
    ctx.body = { error: 'Invalid or expired token' };
  }
};
