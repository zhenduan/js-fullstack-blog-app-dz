import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={blog.featuredImageUrl || "./blogPlaceholder.png"}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>

        <p
          className="text-gray-700 mb-4"
          dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 100) }}
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            By {blog.author.username}
          </span>
          <Link
            to={`/blogs/${blog._id}`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
