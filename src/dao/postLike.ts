import db from '../database';

// 点赞帖子
export const likePost = async (userId: number, postId: number): Promise<void> => {
  await db.execute('INSERT INTO post_likes (user_id, post_id) VALUES (?, ?)', [userId, postId]);
};

// 取消点赞
export const unlikePost = async (userId: number, postId: number): Promise<void> => {
  await db.execute('DELETE FROM post_likes WHERE user_id = ? AND post_id = ?', [userId, postId]);
};

// 检查是否已点赞
export const hasLikedPost = async (userId: number, postId: number): Promise<boolean> => {
  const [rows]: any = await db.execute(
    'SELECT * FROM post_likes WHERE user_id = ? AND post_id = ?',
    [userId, postId]
  );
  return rows.length > 0;
};
