import Router from 'koa-router';
import { createComment, getComments } from '../controllers/comment';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = new Router();

router.post('/comments', authMiddleware, createComment); // 添加评论
router.get('/posts/:postId/comments', getComments); // 获取帖子评论

export default router;
