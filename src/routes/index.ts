import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa-cors'; // 引入 koa-cors 中间件
import userRoutes from './user';
import postRoutes from './post';
import commentRoutes from './comment';
import qwenRoutes from './qwen';
import aiChatRoutes from './aiChat';

const app = new Koa();
const router = new Router();

// 使用 koa-cors 中间件来处理跨域请求
app.use(cors({
  origin: 'http://localhost:5500',  // 允许来自 http://localhost:5500 的请求
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 确保OPTIONS请求被允许
  headers: ['Content-Type', 'Authorization']  // 允许特定的请求头
}));

// 路由配置
router.use('/users', userRoutes.routes());
router.use('/posts', postRoutes.routes());
router.use('/comment', commentRoutes.routes());
router.use('/qwen', qwenRoutes.routes());
router.use('/aichat', aiChatRoutes.routes());

app.use(router.routes()).use(router.allowedMethods());

export default app;
