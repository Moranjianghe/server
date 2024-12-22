import { createPost, getPosts, getPostById, updatePostLikes } from '../dao/post';
import { likePost, unlikePost, hasLikedPost } from '../dao/postlike';

export const createNewPost = async (userId: number, title: string, content: string): Promise<number> => {
  return await createPost({
    user_id: userId, title, content,
    id: 0
  });
};

export const listPosts = async () => {
  return await getPosts();
};

export const likeOrUnlikePost = async (userId: number, postId: number): Promise<string> => {
  const hasLiked = await hasLikedPost(userId, postId);
  if (hasLiked) {
    await unlikePost(userId, postId);
    await updatePostLikes(postId, false);
    return 'Post unliked';
  } else {
    await likePost(userId, postId);
    await updatePostLikes(postId, true);
    return 'Post liked';
  }
};
