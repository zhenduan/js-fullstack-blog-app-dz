import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useBlogStore from "../stores/blogStore";
import useLoadingStore from "../stores/loadingStore";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const BlogDetailPage = () => {
  const { fetchBlogById, blog, deleteBlog } = useBlogStore();
  const { isLoading, startLoading, stopLoading } = useLoadingStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      await deleteBlog(id, navigate);
    } catch (error) {
      console.error("Failed delete blog", error);
    }
  };

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

  console.log("user", user);
  return (
    <div className="container mx-auto p-4">
      {/* Title and Delete Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        {user?.userId && blog.author._id === user.userId && (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete
          </button>
        )}
      </div>
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
        src={blog.featuredImageUrl || "/blogPlaceholder.png"}
        alt={blog.title}
        className="w-full h-64 object-cover mb-6 rounded-lg shadow-md"
      />

      {/* Blog Content */}
      <div className="prose max-w-none">
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default BlogDetailPage;
