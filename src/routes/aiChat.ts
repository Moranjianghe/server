// src/routes/chatRoutes.ts

import Router from 'koa-router';
import { authMiddleware } from '../middlewares/authMiddleware';
import { chatWithAI } from '../controllers/aiChat';

const router = new Router();

router.post('/chat', authMiddleware, chatWithAI); // 使用鉴权中间件

export default router;
