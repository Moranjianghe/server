import { createComment, getCommentsByPostId } from '../dao/comment';

export const addComment = async (userId: number, postId: number, content: string): Promise<number> => {
  return await createComment({ user_id: userId, post_id: postId, content });
};

export const listComments = async (postId: number) => {
  return await getCommentsByPostId(postId);
};
