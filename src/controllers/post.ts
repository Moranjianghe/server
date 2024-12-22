import { Context } from 'koa';
import { createNewPost, listPosts, likeOrUnlikePost } from '../services/post';
import { Post } from '../models/post';

export const createPost = async (ctx: Context): Promise<void> => {
  const { id: userId } = ctx.state.user;
  //const { user } = ctx.state;
  const { title, content } = ctx.request.body as Post;
  const postId = await createNewPost(userId, title, content);
  ctx.body = { message: 'Post created', postId };
};

export const getPosts = async (ctx: Context): Promise<void> => {
  const posts = await listPosts();
  ctx.body = posts;
};

export const likePost = async (ctx: Context): Promise<void> => {
  const { id: userId } = ctx.state.user;
  //const { user } = ctx.state;
  const { postId } = ctx.params;
  const message = await likeOrUnlikePost(userId, parseInt(postId));
  ctx.body = { message };
};
