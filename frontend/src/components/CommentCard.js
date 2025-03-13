import React, { useState } from "react";
import useAuthStore from "../stores/authStore";
import useBlogStore from "../stores/blogStore";

const CommentCard = ({ comment, blogId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editComment, setEditComment] = useState(comment.content);
  const { user } = useAuthStore();

  const { deleteComment, fetchComments, updateComment } = useBlogStore();

  const handleCommentDelete = async (e, commentId) => {
    e.preventDefault();
    await deleteComment(commentId);
    fetchComments(blogId);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditComment(comment.content);
  };

  const handleSaveEdit = async () => {
    await updateComment(comment._id, { content: editComment });
    setIsEditing(false);
    fetchComments(blogId);
  };

  return (
    <div key={comment._id} className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div className="flex flex-col md:flex-row">
          <span className="font-medium">{comment.author.username}</span>
          <span className="text-sm text-gray-600 md:ml-2">
            {new Date(comment.createdAt).toLocaleDateString()}
          </span>
        </div>
        {user?.userId === comment.author.id && (
          <div className="flex gap-2 md:gap-4">
            {isEditing ? (
              <button
                onClick={() => setIsEditing(false)}
                className="text-blue-600 hover:text-blue-700"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={handleStartEditing}
                className="text-blue-600 hover:text-blue-700"
              >
                Edit
              </button>
            )}

            <button
              onClick={(e) => handleCommentDelete(e, comment._id)}
              className="text-red-600 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {isEditing ? (
        <div>
          <textarea
            className="border w-full p-2 mt-2"
            value={editComment}
            onChange={(e) => setEditComment(e.target.value)}
          />
          <button
            onClick={handleSaveEdit}
            className="text-blue-600 hover:text-blue-700"
          >
            Save Edit
          </button>
        </div>
      ) : (
        <p className="mt-2 text-gray-700">{comment.content}</p>
      )}
    </div>
  );
};

export default CommentCard;
