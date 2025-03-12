import { create } from "zustand";
import api from "../utils/api";

const useBlogStore = create((set) => ({
  blogs: [],
  totalBlogs: 0, // Total number of blogs
  totalPages: 0, // Total number of pages
  page: 1, // Current page
  limit: 6, // Blogs per page

  fetchBlogs: async (page = 1, limit = 6) => {
    try {
      const response = await api.get(`/blogs?page=${page}&limit=${limit}`);
      set({
        blogs: response.data.blogs,
        totalBlogs: response.data.totalBlogs,
        totalPages: response.data.totalPages,
        page: response.data.page,
        limit: response.data.limit,
      });
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  },
}));

export default useBlogStore;
