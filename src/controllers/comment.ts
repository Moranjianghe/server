import { Context } from 'koa';
import { addComment, listComments } from '../services/comment';

export const createComment = async (ctx: Context): Promise<void> => {
  const { user } = ctx.state;
  const { postId, content } = ctx.request.body;
  const commentId = await addComment(user.id, parseInt(postId), content);
  ctx.body = { message: 'Comment added', commentId };
};

export const getComments = async (ctx: Context): Promise<void> => {
  const { postId } = ctx.params;
  const comments = await listComments(parseInt(postId));
  ctx.body = comments;
};
