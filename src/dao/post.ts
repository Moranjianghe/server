import pool from '../database';

export const PostDao = {
    async createPost(title: string, content: string) {
        const [result] = await pool.query(
            'INSERT INTO posts (title, content) VALUES (?, ?)',
            [title, content]
        );
        return { id: result.insertId, title, content };
    },

    async getAllPosts() {
        const [rows] = await pool.query('SELECT * FROM posts');
        return rows;
    },

    async addComment(postId: string, content: string) {
        const [result] = await pool.query(
            'INSERT INTO comments (postId, content) VALUES (?, ?)',
            [postId, content]
        );
        return { id: result.insertId, postId, content };
    },

    async likePost(postId: string) {
        await pool.query('UPDATE posts SET likes = likes + 1 WHERE id = ?', [postId]);
        const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [postId]);
        return rows[0];
    },
};
