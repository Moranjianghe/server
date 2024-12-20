import Router from 'koa-router';
import userRoutes from './user';
import postRoutes from './post';

const router = new Router();

router.use('/users', userRoutes.routes());
router.use('/posts', postRoutes.routes());

export default router;
