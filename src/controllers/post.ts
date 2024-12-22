import { Context } from 'koa';
import { createNewPost, listPosts, likeOrUnlikePost } from '../services/postService';

export const createPost = async (ctx: Context): Promise<void> => {
  const { user } = ctx.state;
  const { title, content } = ctx.request.body;
  const postId = await createNewPost(user.id, title, content);
  ctx.body = { message: 'Post created', postId };
};

export const getPosts = async (ctx: Context): Promise<void> => {
  const posts = await listPosts();
  ctx.body = posts;
};

export const likePost = async (ctx: Context): Promise<void> => {
  const { user } = ctx.state;
  const { postId } = ctx.params;
  const message = await likeOrUnlikePost(user.id, parseInt(postId));
  ctx.body = { message };
};
