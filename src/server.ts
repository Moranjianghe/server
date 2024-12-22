import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes';
import pool from './database'; // 导入数据库连接池
import { InternalServerError } from 'http-errors'; // 用于抛出数据库连接错误

const app = new Koa();

// 中间件
app.use(bodyParser());

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

// 数据库连接测试函数
async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping(); // 使用 ping 命令来检测连接
    console.log('数据库连接成功');
    connection.release(); // 释放连接
  } catch (error) {
    console.error('数据库连接失败:', error);
    throw new InternalServerError('数据库连接失败'); // 连接失败时抛出错误
  }
}

// 在服务器启动前进行数据库连接测试
testDatabaseConnection().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
  });
}).catch((err) => {
  console.error('无法启动服务器:', err.message);
  process.exit(1); // 如果数据库连接失败，退出进程
});
