import { Context } from 'koa';
import { PostService } from '../services/postService';
import { Post ,Comment} from '../models/post';

// 创建帖子

export const createPost = async (ctx: Context) => {
  try {
    // 使用 typescript 的类型断言，将 ctx.request.body 断言为 Post
    const { title, content } = ctx.request.body as Pick<Post, 'title' | 'content'>;

    if (!title || !content) {
      ctx.status = 400;
      ctx.body = { error: 'Title and content are required.' };
      return;
    }

    const post = await PostService.createPost({ title, content });
    ctx.status = 201;
    ctx.body = post;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error.' };
  }
};


// 获取所有帖子
export const getPosts = async (ctx: Context) => {
  try {
    const posts = await PostService.getAllPosts();
    ctx.status = 200;
    ctx.body = posts;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error.' };
  }
};

// 给某个帖子添加评论
export const createComment = async (ctx: Context) => {
  try {
    const { postId } = ctx.params;
    const { content } = ctx.request.body as Pick<Comment, 'content'>;

    if (!content) {
      ctx.status = 400;
      ctx.body = { error: 'Comment content is required.' };
      return;
    }

    const comment = await PostService.addComment(postId, content);
    ctx.status = 201;
    ctx.body = comment;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error.' };
  }
};

// 点赞帖子
export const likePost = async (ctx: Context) => {
  try {
    const { postId } = ctx.params;
    const updatedPost = await PostService.likePost(postId);
    ctx.status = 200;
    ctx.body = updatedPost;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error.' };
  }
};
