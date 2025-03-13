import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useBlogStore from "../stores/blogStore";
import { useNavigate } from "react-router-dom";
import useLoadingStore from "../stores/loadingStore";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const { createBlog } = useBlogStore();
  const { isLoading, startLoading, stopLoading } = useLoadingStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    startLoading();
    await createBlog({ title, content, featuredImage }, navigate);
    stopLoading();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create a New Blog</h1>

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
          <label
            htmlFor="featuredImage"
            className="block text-sm font-medium text-gray-700"
          >
            Featured Image
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
            {isLoading ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogPage;
