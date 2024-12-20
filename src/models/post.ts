export interface Post {
    id: number;
    title: string;
    content: string;
    likes: number;
  }
  
  export interface Comment {
    id: number;
    postId: number;
    content: string;
  }