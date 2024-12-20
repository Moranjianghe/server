import Router from 'koa-router';
import {
  createPost,
  getPosts,
  createComment,
  likePost,
} from '../controllers/post';

const router = new Router();

// 创建帖子
router.post('/post', createPost);

// 获取所有帖子
router.get('/posts', getPosts);

// 给某个帖子添加评论
router.post('/post/:postId/comment', createComment);

// 点赞帖子
router.post('/post/:postId/like', likePost);

export default router;
