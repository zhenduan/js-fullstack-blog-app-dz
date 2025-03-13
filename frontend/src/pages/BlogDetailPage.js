import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useBlogStore from "../stores/blogStore";
import useLoadingStore from "../stores/loadingStore";

const BlogDetailPage = () => {
  const { fetchBlogById, blog } = useBlogStore();
  const { isLoading, startLoading, stopLoading } = useLoadingStore();

  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async (id) => {
      try {
        startLoading();
        await fetchBlogById(id);
        console.log("fetch blog");
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        stopLoading();
      }
    };
    fetchBlog(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center text-gray-600">Blog not found.</div>;
  }
  return (
    <div className="container mx-auto p-4">
      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {/* Author and Creation Date */}
      <div className="mb-6 text-sm text-gray-600">
        <span>
          By{" "}
          <span className="font-medium">
            {blog.author.username || "Unknown Author"}
          </span>{" "}
          • Published on {new Date(blog.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Featured Image */}
      <img
        src={blog.featuredImageUrl || "https://via.placeholder.com/800x400"}
        alt={blog.title}
        className="w-full h-64 object-cover mb-6 rounded-lg shadow-md"
      />

      {/* Blog Content */}
      <div className="prose max-w-none">
        <p className="text-gray-700">{blog.content}</p>
      </div>
    </div>
  );
};

export default BlogDetailPage;
