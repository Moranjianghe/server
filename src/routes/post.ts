import Router from 'koa-router';
import { createPost, getPosts, likePost } from '../controllers/post';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = new Router();

router.post('/posts', authMiddleware, createPost); // 创建帖子
router.get('/posts', getPosts); // 获取帖子列表
router.post('/posts/:postId/like', authMiddleware, likePost); // 点赞帖子

export default router;
