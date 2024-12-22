// qwenRoutes.ts
import Router from 'koa-router';
import { QwenController } from '../controllers/qwen';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = new Router();

router.post('/qwen',authMiddleware,QwenController.getQwenResponse); // 接入 Qwen 接口

export default router;
