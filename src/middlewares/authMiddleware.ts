import jwt from 'jsonwebtoken';
import { Context, Next } from 'koa';

const getTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  return parts.length === 2 ? parts[1] : null; 
};

export const authMiddleware = async (ctx: Context, next: Next): Promise<void> => {
  const token = getTokenFromHeader(ctx.headers['authorization']);
  
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'Authentication token is required' };
    return;
  }

  try {
    const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // 使用环境变量
    const decodedToken = jwt.verify(token, secret) as { userId: string }; // 定义返回类型

    ctx.state.user = decodedToken;
    await next();
    
  } catch (err) {
    if ((err as jwt.JsonWebTokenError).name === 'JsonWebTokenError' || 
        (err as jwt.TokenExpiredError).name === 'TokenExpiredError') {
      ctx.status = 403; // Forbidden
      ctx.body = { error: 'Invalid or expired token' };
    } else {
      console.error('JWT verification error:', err);
      ctx.status = 500; // Internal Server Error
      ctx.body = { error: 'An error occurred while verifying token' };
    }
  }
};
