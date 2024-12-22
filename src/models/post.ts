export interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  likes_count?: number;
  created_at?: Date;
  updated_at?: Date;
}
