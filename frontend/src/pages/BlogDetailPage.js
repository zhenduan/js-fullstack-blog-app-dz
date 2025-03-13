import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useBlogStore from "../stores/blogStore";
import useLoadingStore from "../stores/loadingStore";
import useAuthStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const BlogDetailPage = () => {
  const {
    fetchBlogById,
    blog,
    deleteBlog,
    fetchComments,
    comments,
    addComment,
    deleteComment,
  } = useBlogStore();
  const { isLoading, startLoading, stopLoading } = useLoadingStore();
  const [newComment, setNewComment] = useState(""); // State for the new comment
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async (id) => {
      try {
        startLoading();
        await fetchBlogById(id);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        stopLoading();
      }
    };
    fetchBlog(id);
    fetchComments(id);
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteBlog(id, navigate);
    } catch (error) {
      console.error("Failed delete blog", error);
    }
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await addComment(id, { content: newComment });
    setNewComment("");
    fetchComments(id);
  };

  const handleCommentDelete = async (e, commentId) => {
    e.preventDefault();
    await deleteComment(commentId);
    fetchComments(id);
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
      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>

        {/* Add Comment Field */}
        {user && (
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              required
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Comment
            </button>
          </form>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{comment.author.username}</span>
                  <span className="text-sm text-gray-600 ml-2">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {user?.userId === comment.author.id && (
                  <button
                    onClick={(e) => handleCommentDelete(e, comment._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                )}
              </div>
              <p className="mt-2 text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
