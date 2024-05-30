/// <reference types="vite/client" />
type ImageObject = {
  secureUrl: string;
  publicId?: string;
};
declare type ClientData = {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  date: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
};
type Comments = {
  id: string;
  owner: ClientData;
  createdAt: Date;
  content: string;
};
declare type Post = {
  post_id: string;
  post_content: string;
  post_created_at: Date;
  post_updated_at: Date;
  owner: {
    id: string;
    name: string;
    email: string;
    bio: string;
    username: string;
    avatar: string
  };
  files: string;
  like_user_ids: [] | string[];
  comments: Array<T>;

};
