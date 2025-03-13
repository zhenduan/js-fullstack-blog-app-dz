import { create } from "zustand";
import api from "../utils/api";
import { toast } from "react-toastify";

const useBlogStore = create((set) => ({
  blogs: [],
  totalBlogs: 0, // Total number of blogs
  totalPages: 0, // Total number of pages
  page: 1, // Current page
  limit: process.env.REACT_APP_DEFAULT_FETCH_BLOGS_LIMIT, // Blogs per page
  searchQuery: "",
  blog: null,

  fetchBlogs: async (
    page = 1,
    limit = process.env.REACT_APP_DEFAULT_FETCH_BLOGS_LIMIT,
    searchQuery = ""
  ) => {
    try {
      const response = await api.get(
        `/blogs?page=${page}&limit=${limit}&search=${searchQuery}`
      );
      if (response.status === 200) {
        set({
          blogs: response.data.blogs,
          totalBlogs: response.data.totalBlogs,
          totalPages: response.data.totalPages,
          page: response.data.page,
          limit: response.data.limit,
          searchQuery,
        });
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  },
  fetchBlogById: async (id) => {
    try {
      const response = await api.get(`/blogs/${id}`);
      if (response.status === 200) {
        set({
          blog: response.data,
        });
      }
    } catch (error) {}
  },
  createBlog: async (blogData, navigate) => {
    try {
      const response = await api.post("/blogs", blogData, {
        headers: {
          Authorization: localStorage.getItem("js-fullstack-blog-app-token"),
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        toast.success("Blog created successfully");
        navigate("/");
        return response.data;
      }
    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  },
  deleteBlog: async (id, navigate) => {
    try {
      const response = await api.delete(`/blogs/${id}`, {
        Authorization: localStorage.getItem("js-fullstack-blog-app-token"),
      });
      if (response.status === 200) {
        toast.info("Blog deleted successfully");
        navigate("/");
      }
    } catch (error) {}
  },
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useBlogStore;
