import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';

export const authMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  const authHeader = ctx.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 从 "Bearer token" 获取 Token

  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Token is required' };
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret';
    const user = jwt.verify(token, secret); // 验证 Token
    ctx.state.user = user; // 存储解码后的用户信息
    await next();
  } catch (err) {
    ctx.status = 403;
    ctx.body = { error: 'Invalid or expired token' };
  }
};
