import { Context } from 'koa';
import { addComment, listComments } from '../services/comment';
import {Comment} from '../models/comment';
//import { Post } from '../models/post';

export const createComment = async (ctx: Context): Promise<void> => {
  const { id: userId } = ctx.state.user;
  //const { user } = ctx.state;
  const { post_id, content } = ctx.request.body as Comment;
  const commentId = await addComment(userId, post_id, content);
  ctx.body = { message: 'Comment added', commentId };
};

export const getComments = async (ctx: Context): Promise<void> => {
  const { postId } = ctx.params;
  const comments = await listComments(parseInt(postId));
  ctx.body = comments;
};
