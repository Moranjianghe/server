import { Context } from 'koa';
import userService from '../services/user';

export const register = async (ctx: Context) => {
  const { username, password } = ctx.request.body as { username: string; password: string };
  const result = await userService.register(username, password);
  ctx.body = result;
};

export const login = async (ctx: Context) => {
  const { username, password } = ctx.request.body as { username: string; password: string };
  const result = await userService.login(username, password);
  ctx.body = result;
};
