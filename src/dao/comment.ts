import db from '../database';
import { Comment } from '../models/comment';

// 创建评论
export const createComment = async (comment: Comment): Promise<number> => {
  const { user_id, post_id, content } = comment;
  const [result]: any = await db.execute(
    'INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)',
    [user_id, post_id, content]
  );
  return result.insertId;
};

// 获取某个帖子的评论
export const getCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const [rows] = await db.execute('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at ASC', [postId]);
  return rows as Comment[];
};
