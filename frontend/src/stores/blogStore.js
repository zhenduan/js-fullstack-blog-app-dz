import { create } from "zustand";
import api from "../utils/api";

const useBlogStore = create((set) => ({
  blogs: [],

  fetchBlogs: async () => {
    try {
      const response = await api.get("/blogs");
      set({ blogs: response.data });
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  },
}));

export default useBlogStore;
