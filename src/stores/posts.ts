import { create } from "zustand";
import Api from "../services/api";
import { apiVersion, serverHost } from "../constants";

interface PostStore {
  posts: [] | Post[];
  loading: boolean;
  setAction: ({ posts, loading }: { posts: []; loading: boolean }) => void;
  addPost: (payload: FormData) => Promise<void>;
  getPosts: (q?: number) => Promise<void>;
}
const { post, get: getFn } = new Api(serverHost);


export const usePostsStore = create<PostStore>((set, get) => ({
  posts: [],
  loading: false,
  setAction: ({ posts, loading }) => set({ posts, loading }),
  addPost: async (payload) => {
    set({ loading: false });
    try {
      const { status } = await post(`/${apiVersion}/posts`, payload);

      if (status !== 200) return set({ loading: false, posts: [] });

      const { getPosts } = get();

      await getPosts();
    } catch (err) {
      set({ posts: [] });
    } finally {
      set({ loading: false });
    }
  },
  getPosts: async (q = 15) => {
    set({ loading: false });
    try {
      const { status, data } = await getFn(`/${apiVersion}/posts?q=${q}`);

      if (status === 401) {
        set({ posts: [], loading: false });
        return;
      }

      set({ posts: data });
    } catch (err) {
      set({ posts: [], loading: false });
    } finally {
      set({ loading: false });
    }
  },
}));
