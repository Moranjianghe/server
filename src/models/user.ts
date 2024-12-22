export interface User {
  id: number;
  username: string;
  password: string; // 加密后的密码
  email?: string;
  created_at?: Date;
  updated_at?: Date;
}
