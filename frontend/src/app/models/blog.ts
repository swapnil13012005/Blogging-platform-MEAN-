export interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: { _id?: string; username?: string; email?: string } | string;
}

export interface CreateBlogPayload {
  title: string;
  content: string;
}
