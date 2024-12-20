//import { log } from 'console';
import pool from '../database';

const createUser = async (username: string, password: string) => {
  const [result] = await pool.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, password]
  );
  return result;
};

const findUser = async (username: string, password: string) => {
  const [rows] = await pool.query(
    'SELECT id FROM users WHERE username = ? AND password = ?',
    [username, password]
  );
  //console.log('rows=', rows); // rows 是查询结果数组
  return rows;

};


export default { createUser, findUser };
