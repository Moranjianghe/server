import { PostDao } from '../dao/post';
import { Post, Comment } from '../models/post';

export const PostService = {
  async createPost(data: { title: string; content: string }): Promise<Post> {
    return await PostDao.createPost(data.title, data.content);
  },

  async getAllPosts(): Promise<Post[]> {
    return await PostDao.getAllPosts();
  },

  async addComment(postId: string, content: string): Promise<Comment> {
    return await PostDao.addComment(postId, content);
  },

  async likePost(postId: string): Promise<Post> {
    return await PostDao.likePost(postId);
  },
};
