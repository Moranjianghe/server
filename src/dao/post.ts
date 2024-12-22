import db from '../database';
import { Post } from '../models/post';

// 创建帖子
export const createPost = async (post: Post): Promise<number> => {
  const { user_id, title, content } = post;
  const [result]: any = await db.execute(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [user_id, title, content]
  );
  return result.insertId;
};

// 获取帖子列表
export const getPosts = async (): Promise<Post[]> => {
  const [rows] = await db.execute('SELECT * FROM posts ORDER BY created_at DESC');
  return rows as Post[];
};

// 获取单个帖子
export const getPostById = async (postId: number): Promise<Post | null> => {
  const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [postId]);
  return rows.length ? (rows[0] as Post) : null;
};

// 更新点赞数
export const updatePostLikes = async (postId: number, increment: boolean): Promise<void> => {
  const query = increment
    ? 'UPDATE posts SET likes_count = likes_count + 1 WHERE id = ?'
    : 'UPDATE posts SET likes_count = likes_count - 1 WHERE id = ?';
  await db.execute(query, [postId]);
};
