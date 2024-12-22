import { Context } from 'koa';
import { register, login } from '../services/user';
import { User } from '../models/user';
// 用户注册
export const registerUser = async (ctx: Context): Promise<void> => {
  try {
    console.log('Request body:', ctx.request.body);
    const { username, password, email } = ctx.request.body as User;
    const message = await register(username, password, email);
    ctx.body = { message };
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: (err as Error).message };
  }
};

// 用户登录
export const loginUser = async (ctx: Context): Promise<void> => {
  try {
    const { username, password } = ctx.request.body as User;
    const token = await login(username, password);
    ctx.body = { token }; // 返回 JWT Token
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: (err as Error).message };
  }
};
