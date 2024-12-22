import Router from 'koa-router';
import userRoutes from './user';
import postRoutes from './post';
import commentRoutes from './comment';
import qwenRoutes from './qwen';

const router = new Router();

router.use('/users', userRoutes.routes());
router.use('/posts', postRoutes.routes());
router.use('/comment', commentRoutes.routes());
router.use('/qwen', qwenRoutes.routes());

export default router;
