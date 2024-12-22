import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByUsername, createUser } from '../dao/user';
import { User } from '../models/user';

// 密码加密
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// 密码验证
const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// 生成 JWT
const generateToken = (user: User): string => {
  const payload = { id: user.id, username: user.username }; // JWT 中存放的用户信息
  const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // 在环境变量中存储密钥
  const options = { expiresIn: '1h' }; // Token 过期时间
  return jwt.sign(payload, secret, options);
};

// 用户注册
export const register = async (username: string, password: string, email?: string): Promise<string> => {
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    throw new Error('Username already exists');
  }
  const hashedPassword = await hashPassword(password);
  const userId = await createUser({ username, password: hashedPassword, email });
  return `User created with ID: ${userId}`;
};

// 用户登录
export const login = async (username: string, password: string): Promise<string> => {
  const user = await findUserByUsername(username);
  if (!user || !(await verifyPassword(password, user.password))) {
    throw new Error('Invalid username or password');
  }
  return generateToken(user); // 返回 Token
};
