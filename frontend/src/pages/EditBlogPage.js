import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useBlogStore from "../stores/blogStore";
import useLoadingStore from "../stores/loadingStore";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const EditBlogPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);

  const { fetchBlogById, blog, updateBlog } = useBlogStore();
  const { isLoading, startLoading, stopLoading } = useLoadingStore();

  const { user } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async (id) => {
      try {
        startLoading();
        const data = await fetchBlogById(id);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        stopLoading();
      }
    };
    fetchBlog(id);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBlog(id, { title, content, featuredImage }, navigate);
    } catch (error) {
      console.error("Failed to edit blog");
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
  if (blog.author._id !== user.userId) {
    navigate("/");
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="h-[400px] mb-14"
          />
        </div>

        {/* Featured Image Upload */}
        <div>
          <p className="text-sm font-medium text-gray-700">
            Current featured image:
          </p>
          <img className="w-20 h-20 mb-3" src={blog.featuredImageUrl} alt="" />
          <label
            htmlFor="featuredImage"
            className="block text-sm font-medium text-gray-700"
          >
            New Featured Image
          </label>
          <input
            type="file"
            id="featuredImage"
            onChange={(e) => setFeaturedImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? "Updating..." : "Edit Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPage;
